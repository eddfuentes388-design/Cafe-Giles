import { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { usuariosMock } from '../../data/adminMocks'
import { useToast } from '../../context/ToastContext'

export default function AdminUsuarios() {
  const { showToast } = useToast()
  const [usuarios, setUsuarios] = useState(usuariosMock)

  const toggleActivo = (id) => {
    setUsuarios((list) => list.map((u) => (u.id === id ? { ...u, activo: !u.activo } : u)))
    showToast('Estado del usuario actualizado')
  }

  const changeRole = (id, rol) => {
    setUsuarios((list) => list.map((u) => (u.id === id ? { ...u, rol } : u)))
    showToast('Rol actualizado correctamente')
  }

  const remove = (id) => {
    setUsuarios((list) => list.filter((u) => u.id !== id))
    showToast('Usuario eliminado', 'info')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Usuarios</h1>
      <p className="text-coffee-600 dark:text-cream-300 text-sm mb-6">{usuarios.length} usuarios registrados</p>

      <div className="bg-white dark:bg-forest-700 rounded-2xl shadow-premium overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-coffee-500 dark:text-cream-300 border-b border-coffee-100 dark:border-forest-600">
              <th className="px-5 py-3">Nombre</th>
              <th className="px-5 py-3">Correo</th>
              <th className="px-5 py-3">Rol</th>
              <th className="px-5 py-3">Estado</th>
              <th className="px-5 py-3">Registrado</th>
              <th className="px-5 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-b border-coffee-50 dark:border-forest-600/50">
                <td className="px-5 py-3 font-medium">{u.nombre} {u.apellido}</td>
                <td className="px-5 py-3">{u.correo}</td>
                <td className="px-5 py-3">
                  <select value={u.rol} onChange={(e) => changeRole(u.id, e.target.value)} className="bg-transparent border border-coffee-200 dark:border-forest-600 rounded-lg px-2 py-1 text-sm">
                    <option value="cliente">Cliente</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleActivo(u.id)}
                    className={`text-xs px-3 py-1 rounded-full ${u.activo ? 'bg-forest-100 text-forest-700 dark:bg-forest-600 dark:text-cream-100' : 'bg-red-100 text-red-600'}`}
                  >
                    {u.activo ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td className="px-5 py-3">{new Date(u.creado_en).toLocaleDateString('es-CO')}</td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => remove(u.id)} className="text-red-500" aria-label={`Eliminar ${u.nombre}`}>
                    <FiTrash2 />
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
