import { useEffect, useState } from 'react'
import { FiLogOut, FiUser, FiPackage } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

const estadoLabels = {
  pendiente: 'Pendiente', pagado: 'Pagado', enviado: 'Enviado', entregado: 'Entregado', cancelado: 'Cancelado'
}

export default function Cuenta() {
  const { user, logout } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/pedidos/mios')
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container-app py-14">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-forest-600 text-cream-50 flex items-center justify-center">
            <FiUser />
          </div>
          <div>
            <h1 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h1>
            <p className="text-sm text-coffee-600 dark:text-cream-300">{user?.email}</p>
          </div>
        </div>
        <button onClick={logout} className="btn-secondary text-sm">
          <FiLogOut /> Cerrar sesión
        </button>
      </div>

      <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
        <FiPackage /> Mis pedidos
      </h2>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-16" />)}
        </div>
      ) : orders.length === 0 ? (
        <p className="text-coffee-600 dark:text-cream-300">Aún no tienes pedidos realizados.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="flex items-center justify-between bg-white dark:bg-forest-700 p-4 rounded-xl shadow-premium">
              <div>
                <p className="font-semibold">Pedido #{o.id}</p>
                <p className="text-xs text-coffee-500 dark:text-cream-300">{new Date(o.creado_en).toLocaleDateString('es-CO')}</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-coffee-100 dark:bg-forest-600">{estadoLabels[o.estado] || o.estado}</span>
              <span className="font-bold">{formatCOP(o.total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
