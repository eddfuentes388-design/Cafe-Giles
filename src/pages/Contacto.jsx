import { useState } from 'react'
import { FiMail, FiPhone, FiClock, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import Seo from '../components/ui/Seo'
import { useToast } from '../context/ToastContext'

const initialForm = { nombre: '', correo: '', telefono: '', mensaje: '' }

export default function Contacto() {
  const { showToast } = useToast()
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí se conectaría a POST /api/contacto en el backend
    setSent(true)
    showToast('Mensaje enviado. Te responderemos pronto.')
    setForm(initialForm)
  }

  return (
    <div className="container-app py-14">
      <Seo
        title="Contacto"
        description="Escríbenos por WhatsApp, correo o el formulario. Conoce nuestro horario de atención y ubicación."
      />

      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold">Hablemos de café</h1>
        <p className="text-coffee-700/80 dark:text-cream-200/80 mt-2">Estamos aquí para resolver tus dudas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-forest-700 rounded-2xl shadow-premium p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Correo</label>
            <input type="email" required value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono (opcional)</label>
            <input value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mensaje</label>
            <textarea required rows={5} value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} className="input-field" />
          </div>
          <button type="submit" className="btn-primary w-full justify-center">Enviar mensaje</button>
          {sent && <p className="text-sm text-forest-600 dark:text-coffee-300 text-center">¡Gracias! Te contactaremos pronto.</p>}
        </form>

        {/* Info + mapa */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-forest-700 rounded-2xl shadow-premium p-6 space-y-4">
            <div className="flex items-center gap-3">
              <FiMapPin className="text-forest-600 dark:text-coffee-300 text-xl" />
              <span>Vereda Tetuancito, finca El Recreo, municipio de San Antonio, Tolima, Colombia</span>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-forest-600 dark:text-coffee-300 text-xl" />
              <a href="tel:+573134659497" className="hover:underline">+57 313 465 9497</a>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="text-forest-600 dark:text-coffee-300 text-xl" />
              <a href="mailto:contactenos@cafegiles.com" className="hover:underline">contactenos@cafegiles.com</a>
            </div>
            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-[#25D366] text-xl" />
              <a href="https://wa.me/573134659497" target="_blank" rel="noreferrer" className="hover:underline">
                Escríbenos por WhatsApp
              </a>
            </div>
            <div className="flex items-start gap-3">
              <FiClock className="text-forest-600 dark:text-coffee-300 text-xl mt-0.5" />
              <div className="text-sm">
                <p>Lunes a viernes: 8:00 a.m. – 6:00 p.m.</p>
                <p>Sábados: 9:00 a.m. – 2:00 p.m.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-premium h-72">
            <iframe
              title="Ubicación Café Giles"
              src="https://www.google.com/maps?q=Vereda%20Tetuancito%2C%20Finca%20El%20Recreo%2C%20San%20Antonio%2C%20Tolima%2C%20Colombia&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
