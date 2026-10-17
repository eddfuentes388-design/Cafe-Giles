import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { ventasPorMesMock, pedidosMock } from '../../data/adminMocks'

const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

export default function AdminVentas() {
  const totalVentas = pedidosMock.filter((p) => p.estado !== 'cancelado').reduce((sum, p) => sum + p.total, 0)
  const ticketPromedio = totalVentas / pedidosMock.length

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Ventas</h1>
      <p className="text-coffee-600 dark:text-cream-300 text-sm mb-6">Análisis de ingresos de la tienda</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-forest-700 rounded-2xl p-6 shadow-premium">
          <p className="text-sm text-coffee-500 dark:text-cream-300">Ventas totales (histórico)</p>
          <p className="text-2xl font-bold mt-1">{formatCOP(totalVentas)}</p>
        </div>
        <div className="bg-white dark:bg-forest-700 rounded-2xl p-6 shadow-premium">
          <p className="text-sm text-coffee-500 dark:text-cream-300">Ticket promedio</p>
          <p className="text-2xl font-bold mt-1">{formatCOP(ticketPromedio)}</p>
        </div>
        <div className="bg-white dark:bg-forest-700 rounded-2xl p-6 shadow-premium">
          <p className="text-sm text-coffee-500 dark:text-cream-300">Pedidos completados</p>
          <p className="text-2xl font-bold mt-1">{pedidosMock.filter((p) => p.estado === 'entregado').length}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-forest-700 rounded-2xl p-6 shadow-premium">
        <h2 className="font-display font-semibold mb-4">Ingresos mensuales</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={ventasPorMesMock}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5d9c3" />
            <XAxis dataKey="mes" stroke="#8a5e34" />
            <YAxis stroke="#8a5e34" tickFormatter={(v) => `${v / 1000000}M`} />
            <Tooltip formatter={(v) => formatCOP(v)} />
            <Bar dataKey="ventas" fill="#8a5e34" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
