import { useState } from 'react'
import { pedidosMock, estadoColors } from '../../data/adminMocks'
import { useToast } from '../../context/ToastContext'

const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

const estados = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado']

export default function AdminPedidos() {
  const { showToast } = useToast()
  const [pedidos, setPedidos] = useState(pedidosMock)

  const changeEstado = (id, estado) => {
    setPedidos((list) => list.map((p) => (p.id === id ? { ...p, estado } : p)))
    showToast(`Pedido #${id} actualizado a "${estado}"`)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Pedidos</h1>
      <p className="text-coffee-600 dark:text-cream-300 text-sm mb-6">{pedidos.length} pedidos registrados</p>

      <div className="bg-white dark:bg-forest-700 rounded-2xl shadow-premium overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-coffee-500 dark:text-cream-300 border-b border-coffee-100 dark:border-forest-600">
              <th className="px-5 py-3">Pedido</th>
              <th className="px-5 py-3">Cliente</th>
              <th className="px-5 py-3">Fecha</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id} className="border-b border-coffee-50 dark:border-forest-600/50">
                <td className="px-5 py-3 font-medium">#{p.id}</td>
                <td className="px-5 py-3">{p.cliente}</td>
                <td className="px-5 py-3">{new Date(p.creado_en).toLocaleDateString('es-CO')}</td>
                <td className="px-5 py-3">{formatCOP(p.total)}</td>
                <td className="px-5 py-3">
                  <select
                    value={p.estado}
                    onChange={(e) => changeEstado(p.id, e.target.value)}
                    style={{ color: estadoColors[p.estado] }}
                    className="bg-transparent border border-coffee-200 dark:border-forest-600 rounded-lg px-2 py-1 text-sm font-medium capitalize"
                  >
                    {estados.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
