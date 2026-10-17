import { useState } from 'react'
import { useToast } from '../../context/ToastContext'

export default function AdminConfiguracion() {
  const { showToast } = useToast()
  const [form, setForm] = useState({
    nombreTienda: 'Café Giles',
    correoContacto: 'contactenos@cafegiles.com',
    telefono: '+57 313 465 9497',
    ivaPorcentaje: 19,
    envioGratisDesde: 150000,
    costoEnvio: 12000
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    showToast('Configuración guardada correctamente')
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-1">Configuración</h1>
      <p className="text-coffee-600 dark:text-cream-300 text-sm mb-6">Parámetros generales de la tienda</p>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-forest-700 rounded-2xl shadow-premium p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre de la tienda</label>
          <input value={form.nombreTienda} onChange={(e) => setForm({ ...form, nombreTienda: e.target.value })} className="input-field" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Correo de contacto</label>
            <input type="email" value={form.correoContacto} onChange={(e) => setForm({ ...form, correoContacto: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} className="input-field" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">IVA (%)</label>
            <input type="number" value={form.ivaPorcentaje} onChange={(e) => setForm({ ...form, ivaPorcentaje: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Envío gratis desde</label>
            <input type="number" value={form.envioGratisDesde} onChange={(e) => setForm({ ...form, envioGratisDesde: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Costo de envío</label>
            <input type="number" value={form.costoEnvio} onChange={(e) => setForm({ ...form, costoEnvio: e.target.value })} className="input-field" />
          </div>
        </div>
        <button type="submit" className="btn-primary">Guardar configuración</button>
      </form>
    </div>
  )
}
