import { FiDollarSign, FiShoppingBag, FiUsers, FiBox } from 'react-icons/fi'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { products } from '../../data/products'
import { pedidosMock, usuariosMock, ventasPorMesMock, ventasPorOrigenMock } from '../../data/adminMocks'

const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

const COLORS = ['#8a5e34', '#2f4a3c', '#c39a63', '#553823', '#a97b45', '#1a2b23']

const kpis = [
  { label: 'Ventas del mes', value: formatCOP(6100000), icon: FiDollarSign, delta: '+18% vs. mes anterior' },
  { label: 'Pedidos totales', value: pedidosMock.length, icon: FiShoppingBag, delta: '2 pendientes por procesar' },
  { label: 'Clientes registrados', value: usuariosMock.filter((u) => u.rol === 'cliente').length, icon: FiUsers, delta: '+2 esta semana' },
  { label: 'Productos activos', value: products.length, icon: FiBox, delta: '1 con stock bajo' }
]

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-coffee-600 dark:text-cream-300 mb-8">Resumen general de la tienda</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {kpis.map(({ label, value, icon: Icon, delta }) => (
          <div key={label} className="bg-white dark:bg-forest-700 rounded-2xl p-6 shadow-premium">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-coffee-500 dark:text-cream-300">{label}</span>
              <Icon className="text-forest-600 dark:text-coffee-300 text-xl" />
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-coffee-500 dark:text-cream-300 mt-1">{delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-6">
        <div className="bg-white dark:bg-forest-700 rounded-2xl p-6 shadow-premium">
          <h2 className="font-display font-semibold mb-4">Ventas por mes</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={ventasPorMesMock}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5d9c3" />
              <XAxis dataKey="mes" stroke="#8a5e34" />
              <YAxis stroke="#8a5e34" tickFormatter={(v) => `${v / 1000000}M`} />
              <Tooltip formatter={(v) => formatCOP(v)} />
              <Line type="monotone" dataKey="ventas" stroke="#2f4a3c" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-forest-700 rounded-2xl p-6 shadow-premium">
          <h2 className="font-display font-semibold mb-4">Ventas por origen</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={ventasPorOrigenMock} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {ventasPorOrigenMock.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-forest-700 rounded-2xl p-6 shadow-premium mt-6">
        <h2 className="font-display font-semibold mb-4">Últimos pedidos</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-coffee-500 dark:text-cream-300 border-b border-coffee-100 dark:border-forest-600">
              <th className="pb-2">Pedido</th>
              <th className="pb-2">Cliente</th>
              <th className="pb-2">Fecha</th>
              <th className="pb-2">Total</th>
              <th className="pb-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidosMock.slice(0, 5).map((p) => (
              <tr key={p.id} className="border-b border-coffee-50 dark:border-forest-600/50">
                <td className="py-3 font-medium">#{p.id}</td>
                <td className="py-3">{p.cliente}</td>
                <td className="py-3">{new Date(p.creado_en).toLocaleDateString('es-CO')}</td>
                <td className="py-3">{formatCOP(p.total)}</td>
                <td className="py-3 capitalize">{p.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
