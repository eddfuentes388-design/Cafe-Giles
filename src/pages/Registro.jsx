import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCoffee } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Registro() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', apellido: '', correo: '', celular: '', password: '', confirmar: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }
    if (form.password !== form.confirmar) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    try {
      await register({
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        celular: form.celular,
        password: form.password
      })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'No pudimos crear tu cuenta. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-app py-20 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-forest-700 rounded-2xl shadow-premium p-8"
      >
        <div className="text-center mb-8">
          <FiCoffee className="mx-auto text-4xl text-forest-600 dark:text-coffee-300 mb-3" />
          <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
          <p className="text-coffee-600 dark:text-cream-300 text-sm mt-1">Únete a la comunidad de Cafe Giles</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input required value={form.nombre} onChange={(e) => update('nombre', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Apellido</label>
              <input required value={form.apellido} onChange={(e) => update('apellido', e.target.value)} className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Correo</label>
            <input type="email" required value={form.correo} onChange={(e) => update('correo', e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Celular</label>
            <input required value={form.celular} onChange={(e) => update('celular', e.target.value)} placeholder="3001234567" className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input type="password" required value={form.password} onChange={(e) => update('password', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirmar</label>
              <input type="password" required value={form.confirmar} onChange={(e) => update('confirmar', e.target.value)} className="input-field" />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
            {loading ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>

        <p className="text-center text-sm text-coffee-600 dark:text-cream-300 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-forest-600 dark:text-coffee-300 font-medium hover:underline">
            Inicia sesión
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
