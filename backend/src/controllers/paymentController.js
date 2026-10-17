import crypto from 'crypto'
import { pool } from '../config/db.js'

// Documentación de referencia: https://docs.wompi.co/docs/colombia/widget-checkout-web/
// El "Checkout Web" de Wompi requiere una firma de integridad para evitar que
// alguien manipule el monto desde el navegador. Esa firma SOLO puede calcularse
// en el backend, porque usa el WOMPI_INTEGRITY_SECRET (nunca debe ir al frontend).

// POST /api/pagos/wompi/iniciar   { pedidoId }
export async function iniciarPagoWompi(req, res, next) {
  try {
    const { pedidoId } = req.body

    const [[pedido]] = await pool.query(
      'SELECT id, total, usuario_id FROM pedidos WHERE id = ?',
      [pedidoId]
    )
    if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' })
    if (pedido.usuario_id !== req.user.id) {
      return res.status(403).json({ message: 'Este pedido no pertenece a tu cuenta' })
    }

    // Wompi trabaja el monto en CENTAVOS (multiplicamos por 100)
    const amountInCents = Math.round(Number(pedido.total) * 100)
    const currency = 'COP'
    // La referencia debe ser única por intento de pago; combinamos el id del
    // pedido con un timestamp para permitir reintentos si el primer pago falla.
    const reference = `PEDIDO-${pedido.id}-${Date.now()}`

    const signatureString = `${reference}${amountInCents}${currency}${process.env.WOMPI_INTEGRITY_SECRET}`
    const signature = crypto.createHash('sha256').update(signatureString).digest('hex')

    // Guardamos la referencia en el registro de pago para poder conciliar el webhook
    await pool.query(
      `UPDATE pagos SET referencia_transaccion = ? WHERE pedido_id = ? ORDER BY id DESC LIMIT 1`,
      [reference, pedido.id]
    )

    res.json({
      publicKey: process.env.WOMPI_PUBLIC_KEY,
      currency,
      amountInCents,
      reference,
      signature,
      redirectUrl: `${process.env.CLIENT_URL}/checkout/confirmacion`
    })
  } catch (error) {
    next(error)
  }
}

// POST /api/pagos/webhook  (configurado en el panel de Wompi como "Eventos")
// Wompi firma cada evento con un checksum que debemos validar antes de confiar
// en el contenido, para asegurarnos de que la notificación viene realmente de Wompi.
export async function webhookWompi(req, res, next) {
  try {
    const { event, data, signature, timestamp } = req.body

    if (event !== 'transaction.updated') {
      return res.status(200).json({ received: true })
    }

    const transaction = data.transaction
    const propertiesString = signature.properties
      .map((prop) => prop.split('.').reduce((obj, key) => obj[key], data))
      .join('')
    const checksumString = `${propertiesString}${timestamp}${process.env.WOMPI_EVENTS_SECRET}`
    const expectedChecksum = crypto.createHash('sha256').update(checksumString).digest('hex').toUpperCase()

    if (expectedChecksum !== signature.checksum.toUpperCase()) {
      return res.status(400).json({ message: 'Firma de webhook inválida' })
    }

    const [[pago]] = await pool.query(
      'SELECT * FROM pagos WHERE referencia_transaccion = ?',
      [transaction.reference]
    )
    if (!pago) return res.status(200).json({ received: true })

    const estadoPago = transaction.status === 'APPROVED' ? 'aprobado' : 'rechazado'
    const estadoPedido = transaction.status === 'APPROVED' ? 'pagado' : 'pendiente'

    await pool.query(
      'UPDATE pagos SET estado = ?, pagado_en = IF(? = "aprobado", NOW(), NULL) WHERE id = ?',
      [estadoPago, estadoPago, pago.id]
    )
    await pool.query('UPDATE pedidos SET estado = ? WHERE id = ?', [estadoPedido, pago.pedido_id])

    res.status(200).json({ received: true })
  } catch (error) {
    next(error)
  }
}

// GET /api/pagos/estado/:reference — el frontend consulta esto tras volver de Wompi
export async function estadoPago(req, res, next) {
  try {
    const [[pago]] = await pool.query(
      'SELECT p.estado, p.pedido_id, o.total FROM pagos p JOIN pedidos o ON o.id = p.pedido_id WHERE p.referencia_transaccion = ?',
      [req.params.reference]
    )
    if (!pago) return res.status(404).json({ message: 'Transacción no encontrada' })
    res.json(pago)
  } catch (error) {
    next(error)
  }
}
