import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function RecuperarPassword() {
  const { requestPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await requestPasswordReset(email)
      setSent(true)
    } catch {
      // Por seguridad mostramos el mismo mensaje de éxito aunque falle,
      // salvo que sea un error de red/servidor genuino
      setSent(true)
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
        {sent ? (
          <div className="text-center">
            <FiCheckCircle className="mx-auto text-4xl text-forest-600 dark:text-coffee-300 mb-4" />
            <h1 className="text-xl font-bold mb-2">Revisa tu correo</h1>
            <p className="text-coffee-600 dark:text-cream-300 text-sm">
              Si <strong>{email}</strong> está registrado, te enviamos instrucciones para restablecer tu contraseña.
            </p>
            <Link to="/login" className="btn-secondary mt-6 inline-flex">Volver a iniciar sesión</Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Recuperar contraseña</h1>
              <p className="text-coffee-600 dark:text-cream-300 text-sm mt-1">
                Ingresa tu correo y te enviaremos instrucciones
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  className="input-field pl-10"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
                {loading ? 'Enviando...' : 'Enviar instrucciones'}
              </button>
            </form>
            <p className="text-center text-sm text-coffee-600 dark:text-cream-300 mt-6">
              <Link to="/login" className="text-forest-600 dark:text-coffee-300 font-medium hover:underline">
                Volver a iniciar sesión
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </div>
  )
}
