import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi'
import { products as initialProducts, origins, roasts, types } from '../../data/products'
import Modal from '../../components/ui/Modal'
import { useToast } from '../../context/ToastContext'

const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

const emptyForm = {
  name: '', price: '', weight: '', type: types[0], roast: roasts[0], origin: origins[0],
  stock: '', description: ''
}

export default function AdminProductos() {
  const { showToast } = useToast()
  const [productos, setProductos] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = productos.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (product) => {
    setEditing(product)
    setForm({
      name: product.name, price: product.price, weight: product.weight, type: product.type,
      roast: product.roast, origin: product.origin, stock: product.stock, description: product.description
    })
    setModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      setProductos((list) =>
        list.map((p) => (p.id === editing.id ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p))
      )
      showToast('Producto actualizado correctamente')
    } else {
      const newProduct = {
        ...form,
        id: Date.now(),
        slug: form.name.toLowerCase().replace(/\s+/g, '-'),
        price: Number(form.price),
        stock: Number(form.stock),
        rating: 0,
        image: '/images/products/placeholder.jpg',
        gallery: ['/images/products/placeholder.jpg'],
        shortDescription: form.description.slice(0, 80)
      }
      setProductos((list) => [newProduct, ...list])
      showToast('Producto creado correctamente')
    }
    setModalOpen(false)
  }

  const handleDelete = (id) => {
    setProductos((list) => list.filter((p) => p.id !== id))
    setConfirmDelete(null)
    showToast('Producto eliminado', 'info')
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Productos</h1>
          <p className="text-coffee-600 dark:text-cream-300 text-sm">{productos.length} productos en catálogo</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm">
          <FiPlus /> Nuevo producto
        </button>
      </div>

      <div className="relative max-w-sm mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar producto..."
          className="input-field pl-10"
        />
      </div>

      <div className="bg-white dark:bg-forest-700 rounded-2xl shadow-premium overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-coffee-500 dark:text-cream-300 border-b border-coffee-100 dark:border-forest-600">
              <th className="px-5 py-3">Producto</th>
              <th className="px-5 py-3">Origen</th>
              <th className="px-5 py-3">Tostión</th>
              <th className="px-5 py-3">Precio</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-coffee-50 dark:border-forest-600/50">
                <td className="px-5 py-3 font-medium">{p.name}</td>
                <td className="px-5 py-3">{p.origin}</td>
                <td className="px-5 py-3">{p.roast}</td>
                <td className="px-5 py-3">{formatCOP(p.price)}</td>
                <td className="px-5 py-3">
                  <span className={p.stock < 10 ? 'text-red-500 font-medium' : ''}>{p.stock}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => openEdit(p)} className="text-forest-600 dark:text-coffee-300" aria-label={`Editar ${p.name}`}>
                      <FiEdit2 />
                    </button>
                    <button onClick={() => setConfirmDelete(p)} className="text-red-500" aria-label={`Eliminar ${p.name}`}>
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar producto' : 'Nuevo producto'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Precio (COP)</label>
              <input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Peso</label>
              <input required value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} placeholder="340g" className="input-field" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                {types.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tostión</label>
              <select value={form.roast} onChange={(e) => setForm({ ...form, roast: e.target.value })} className="input-field">
                {roasts.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Origen</label>
              <select value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} className="input-field">
                {origins.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock disponible</label>
            <input type="number" required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" />
          </div>
          <button type="submit" className="btn-primary w-full justify-center">
            {editing ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </form>
      </Modal>

      <Modal open={Boolean(confirmDelete)} onClose={() => setConfirmDelete(null)} title="Confirmar eliminación">
        <p className="text-coffee-700 dark:text-cream-200 mb-6">
          ¿Seguro que deseas eliminar <strong>{confirmDelete?.name}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1 justify-center">Cancelar</button>
          <button onClick={() => handleDelete(confirmDelete.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-cream-50 rounded-full font-semibold">
            Eliminar
          </button>
        </div>
      </Modal>
    </div>
  )
}
