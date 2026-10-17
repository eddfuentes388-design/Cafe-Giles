import { pool } from '../config/db.js'

export async function createOrder(req, res, next) {
  const conn = await pool.getConnection()
  try {
    const { items, direccionId, cuponCodigo, metodoPago } = req.body
    const usuarioId = req.user.id

    if (!['tarjeta', 'pse', 'nequi'].includes(metodoPago)) {
      return res.status(400).json({ message: 'Método de pago no válido' })
    }

    if (!items?.length) {
      return res.status(400).json({ message: 'El pedido debe tener al menos un producto' })
    }

    await conn.beginTransaction()

    let subtotal = 0
    const detalles = []
    for (const item of items) {
      const [[producto]] = await conn.query('SELECT precio FROM productos WHERE id = ?', [item.productoId])
      if (!producto) throw Object.assign(new Error('Producto no encontrado'), { status: 404 })
      const lineTotal = producto.precio * item.cantidad
      subtotal += lineTotal
      detalles.push({ productoId: item.productoId, cantidad: item.cantidad, precio: producto.precio, lineTotal })
    }

    let descuento = 0
    let cuponId = null
    if (cuponCodigo) {
      const [[cupon]] = await conn.query('SELECT * FROM cupones WHERE codigo = ? AND activo = TRUE', [cuponCodigo])
      if (cupon) {
        descuento = cupon.tipo === 'percent' ? subtotal * (cupon.valor / 100) : cupon.valor
        cuponId = cupon.id
      }
    }

    const base = Math.max(subtotal - descuento, 0)
    const iva = base * 0.19
    const costoEnvio = base >= 150000 ? 0 : 12000
    const total = base + iva + costoEnvio

    const [orderResult] = await conn.query(
      `INSERT INTO pedidos (usuario_id, direccion_id, cupon_id, subtotal, descuento, iva, costo_envio, total, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pendiente')`,
      [usuarioId, direccionId || null, cuponId, subtotal, descuento, iva, costoEnvio, total]
    )
    const pedidoId = orderResult.insertId

    for (const d of detalles) {
      await conn.query(
        'INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
        [pedidoId, d.productoId, d.cantidad, d.precio, d.lineTotal]
      )
      await conn.query(
        'UPDATE inventario SET stock = stock - ? WHERE producto_id = ?',
        [d.cantidad, d.productoId]
      )
    }

    await conn.query(
      'INSERT INTO pagos (pedido_id, metodo, estado, monto) VALUES (?, ?, ?, ?)',
      [pedidoId, metodoPago, 'pendiente', total]
    )

    await conn.commit()
    res.status(201).json({ pedidoId, total, message: 'Pedido creado correctamente' })
  } catch (error) {
    await conn.rollback()
    next(error)
  } finally {
    conn.release()
  }
}

export async function getUserOrders(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY creado_en DESC', [req.user.id])
    res.json(rows)
  } catch (error) {
    next(error)
  }
}

export async function getAllOrders(req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, u.nombre, u.apellido, u.correo
       FROM pedidos p JOIN usuarios u ON u.id = p.usuario_id
       ORDER BY p.creado_en DESC`
    )
    res.json(rows)
  } catch (error) {
    next(error)
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const { estado } = req.body
    await pool.query('UPDATE pedidos SET estado = ? WHERE id = ?', [estado, req.params.id])
    res.json({ message: 'Estado del pedido actualizado' })
  } catch (error) {
    next(error)
  }
}
