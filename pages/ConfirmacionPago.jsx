import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi'

const statusConfig = {
  APPROVED: { icon: FiCheckCircle, color: 'text-forest-600 dark:text-coffee-300', title: '¡Pago aprobado!', text: 'Tu pedido fue confirmado y ya lo estamos preparando.' },
  DECLINED: { icon: FiXCircle, color: 'text-red-500', title: 'Pago rechazado', text: 'Tu banco o Wompi rechazó la transacción. Puedes intentar de nuevo con otro medio de pago.' },
  PENDING: { icon: FiClock, color: 'text-coffee-500', title: 'Pago en proceso', text: 'Estamos esperando la confirmación del pago. Te avisaremos por correo apenas se confirme.' },
  ERROR: { icon: FiXCircle, color: 'text-red-500', title: 'Ocurrió un error', text: 'No pudimos verificar el estado de tu pago. Contáctanos si el cobro fue realizado.' }
}

export default function ConfirmacionPago() {
  const [searchParams] = useSearchParams()
  const transactionId = searchParams.get('id')
  const [status, setStatus] = useState('PENDING')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!transactionId) {
      setLoading(false)
      return
    }
    // Wompi expone la consulta de una transacción por id como endpoint público de solo lectura.
    // Usamos el ambiente sandbox por defecto; en producción cambia a production.wompi.co.
    fetch(`https://sandbox.wompi.co/v1/transactions/${transactionId}`)
      .then((res) => res.json())
      .then((json) => setStatus(json.data?.status || 'ERROR'))
      .catch(() => setStatus('ERROR'))
      .finally(() => setLoading(false))
  }, [transactionId])

  if (loading) {
    return (
      <div className="container-app py-24 text-center">
        <div className="skeleton h-16 w-16 rounded-full mx-auto mb-6" />
        <p className="text-coffee-600 dark:text-cream-300">Verificando el estado de tu pago...</p>
      </div>
    )
  }

  const { icon: Icon, color, title, text } = statusConfig[status] || statusConfig.ERROR

  return (
    <div className="container-app py-24 text-center max-w-lg mx-auto">
      <Icon className={`mx-auto text-6xl mb-6 ${color}`} />
      <h1 className="text-3xl font-bold mb-3">{title}</h1>
      <p className="text-coffee-700 dark:text-cream-200 mb-8">{text}</p>
      <div className="flex gap-3 justify-center">
        <Link to="/tienda" className="btn-secondary">Seguir comprando</Link>
        <Link to="/cuenta" className="btn-primary">Ver mis pedidos</Link>
      </div>
    </div>
  )
}
