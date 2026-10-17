import { useState } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import { products } from '../../data/products'
import { useToast } from '../../context/ToastContext'

export default function AdminInventario() {
  const { showToast } = useToast()
  const [stock, setStock] = useState(products.map((p) => ({ ...p, stockMinimo: 10 })))

  const updateStock = (id, value) => {
    setStock((list) => list.map((p) => (p.id === id ? { ...p, stock: Number(value) } : p)))
  }

  const saveStock = (product) => {
    showToast(`Stock de "${product.name}" actualizado a ${product.stock} unidades`)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Inventario</h1>
      <p className="text-coffee-600 dark:text-cream-300 text-sm mb-6">Controla el stock disponible de cada producto</p>

      <div className="bg-white dark:bg-forest-700 rounded-2xl shadow-premium overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-coffee-500 dark:text-cream-300 border-b border-coffee-100 dark:border-forest-600">
              <th className="px-5 py-3">Producto</th>
              <th className="px-5 py-3">Stock actual</th>
              <th className="px-5 py-3">Stock mínimo</th>
              <th className="px-5 py-3">Estado</th>
              <th className="px-5 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((p) => (
              <tr key={p.id} className="border-b border-coffee-50 dark:border-forest-600/50">
                <td className="px-5 py-3 font-medium">{p.name}</td>
                <td className="px-5 py-3">
                  <input
                    type="number"
                    value={p.stock}
                    onChange={(e) => updateStock(p.id, e.target.value)}
                    className="w-20 input-field py-1"
                  />
                </td>
                <td className="px-5 py-3">{p.stockMinimo}</td>
                <td className="px-5 py-3">
                  {p.stock <= p.stockMinimo ? (
                    <span className="flex items-center gap-1 text-red-500 text-xs font-medium">
                      <FiAlertTriangle /> Stock bajo
                    </span>
                  ) : (
                    <span className="text-forest-600 dark:text-coffee-300 text-xs font-medium">Suficiente</span>
                  )}
                </td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => saveStock(p)} className="text-forest-600 dark:text-coffee-300 text-xs font-semibold underline">
                    Guardar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
