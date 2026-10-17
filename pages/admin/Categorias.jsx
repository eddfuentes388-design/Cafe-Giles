import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { categoriasMock } from '../../data/adminMocks'
import Modal from '../../components/ui/Modal'
import { useToast } from '../../context/ToastContext'

const emptyForm = { nombre: '', descripcion: '' }

export default function AdminCategorias() {
  const { showToast } = useToast()
  const [categorias, setCategorias] = useState(categoriasMock)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true) }
  const openEdit = (c) => { setEditing(c); setForm({ nombre: c.nombre, descripcion: c.descripcion }); setModalOpen(true) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      setCategorias((list) => list.map((c) => (c.id === editing.id ? { ...c, ...form } : c)))
      showToast('Categoría actualizada correctamente')
    } else {
      setCategorias((list) => [
        ...list,
        { id: Date.now(), slug: form.nombre.toLowerCase().replace(/\s+/g, '-'), productos: 0, ...form }
      ])
      showToast('Categoría creada correctamente')
    }
    setModalOpen(false)
  }

  const handleDelete = (id) => {
    setCategorias((list) => list.filter((c) => c.id !== id))
    showToast('Categoría eliminada', 'info')
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <button onClick={openCreate} className="btn-primary text-sm"><FiPlus /> Nueva categoría</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categorias.map((c) => (
          <div key={c.id} className="bg-white dark:bg-forest-700 rounded-2xl p-5 shadow-premium">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{c.nombre}</h3>
              <div className="flex gap-2">
                <button onClick={() => openEdit(c)} className="text-forest-600 dark:text-coffee-300"><FiEdit2 /></button>
                <button onClick={() => handleDelete(c.id)} className="text-red-500"><FiTrash2 /></button>
              </div>
            </div>
            <p className="text-sm text-coffee-600 dark:text-cream-300 mb-2">{c.descripcion}</p>
            <span className="text-xs bg-coffee-100 dark:bg-forest-600 px-3 py-1 rounded-full">{c.productos} productos</span>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar categoría' : 'Nueva categoría'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea rows={3} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="input-field" />
          </div>
          <button type="submit" className="btn-primary w-full justify-center">{editing ? 'Guardar cambios' : 'Crear categoría'}</button>
        </form>
      </Modal>
    </div>
  )
}
