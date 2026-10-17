import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { FiCreditCard, FiCheckCircle, FiSmartphone } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { departamentos, listaDepartamentos } from '../data/colombia'
import api from '../services/api'

const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

const paymentMethods = [
  { id: 'tarjeta', label: 'Tarjeta de crédito/débito', icon: FiCreditCard },
  { id: 'pse', label: 'PSE', icon: FiCreditCard },
  { id: 'nequi', label: 'Nequi', icon: FiSmartphone },
]

const initialForm = {
  nombre: '', apellido: '', correo: '', celular: '',
  direccion: '', ciudad: '', departamento: '', codigoPostal: '',
  metodoPago: 'tarjeta'
}

export default function Checkout() {
  const { items, subtotal, discount, iva, shipping, total, clearCart, coupon } = useCart()
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    ...initialForm,
    nombre: user?.firstName || '',
    apellido: user?.lastName || '',
    correo: user?.email || ''
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(null)

  if (items.length === 0 && !confirmed) {
    return <Navigate to="/tienda" replace />
  }

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Requerido'
    if (!form.apellido.trim()) e.apellido = 'Requerido'
    if (!/^\S+@\S+\.\S+$/.test(form.correo)) e.correo = 'Correo inválido'
    if (!/^3\d{9}$/.test(form.celular)) e.celular = 'Celular colombiano inválido (ej: 3001234567)'
    if (!form.direccion.trim()) e.direccion = 'Requerido'
    if (!form.departamento) e.departamento = 'Selecciona un departamento'
    if (!form.ciudad) e.ciudad = 'Selecciona una ciudad'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      if (isAuthenticated) {
        const payload = {
          items: items.map((i) => ({ productoId: i.id, cantidad: i.quantity })),
          cuponCodigo: coupon?.code,
          metodoPago: form.metodoPago
        }
        const { data } = await api.post('/pedidos', payload)

        // Tarjeta, PSE o Nequi: el cobro real lo procesa Wompi.
        // Pedimos al backend la firma de integridad y redirigimos al Checkout Web de Wompi.
        const { data: wompi } = await api.post('/pagos/wompi/iniciar', { pedidoId: data.pedidoId })
        clearCart()
        redirectToWompi(wompi)
      } else {
        // Checkout como invitado: sin backend de sesión, generamos una referencia local
        setConfirmed({ orderId: `INV-${Date.now()}`, total })
        clearCart()
      }
    } catch (err) {
      setErrors({ general: err.response?.data?.message || 'No pudimos procesar tu pedido. Intenta de nuevo.' })
    } finally {
      setSubmitting(false)
    }
  }

  const redirectToWompi = ({ publicKey, currency, amountInCents, reference, signature, redirectUrl }) => {
    const params = new URLSearchParams({
      'public-key': publicKey,
      currency,
      'amount-in-cents': amountInCents,
      reference,
      'signature:integrity': signature,
      'redirect-url': redirectUrl
    })
    window.location.href = `https://checkout.wompi.co/p/?${params.toString()}`
  }

  if (confirmed) {
    return (
      <div className="container-app py-24 text-center max-w-lg mx-auto">
        <FiCheckCircle className="mx-auto text-6xl text-forest-600 dark:text-coffee-300 mb-6" />
        <h1 className="text-3xl font-bold mb-3">¡Gracias por tu compra!</h1>
        <p className="text-coffee-700 dark:text-cream-200 mb-1">
          Pedido <strong>#{confirmed.orderId}</strong> confirmado por {formatCOP(confirmed.total)}.
        </p>
        <p className="text-coffee-600 dark:text-cream-300 mb-8">
          Te enviaremos un correo con el detalle y el estado de tu envío.
        </p>
        <Link to="/tienda" className="btn-primary">Seguir comprando</Link>
      </div>
    )
  }

  return (
    <div className="container-app py-14">
      <h1 className="text-3xl font-bold mb-10">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-8">
          <section className="bg-white dark:bg-forest-700 rounded-2xl shadow-premium p-6">
            <h2 className="font-display text-xl font-semibold mb-5">Datos de contacto y envío</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nombre" error={errors.nombre}>
                <input value={form.nombre} onChange={(e) => update('nombre', e.target.value)} className="input-field" />
              </Field>
              <Field label="Apellido" error={errors.apellido}>
                <input value={form.apellido} onChange={(e) => update('apellido', e.target.value)} className="input-field" />
              </Field>
              <Field label="Correo" error={errors.correo}>
                <input type="email" value={form.correo} onChange={(e) => update('correo', e.target.value)} className="input-field" />
              </Field>
              <Field label="Celular" error={errors.celular}>
                <input value={form.celular} onChange={(e) => update('celular', e.target.value)} placeholder="3001234567" className="input-field" />
              </Field>
              <Field label="Dirección" error={errors.direccion} full>
                <input value={form.direccion} onChange={(e) => update('direccion', e.target.value)} className="input-field" />
              </Field>
              <Field label="Departamento" error={errors.departamento}>
                <select
                  value={form.departamento}
                  onChange={(e) => update('departamento', e.target.value)}
                  className="input-field"
                >
                  <option value="">Selecciona...</option>
                  {listaDepartamentos.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Ciudad" error={errors.ciudad}>
                <select
                  value={form.ciudad}
                  onChange={(e) => update('ciudad', e.target.value)}
                  disabled={!form.departamento}
                  className="input-field"
                >
                  <option value="">Selecciona...</option>
                  {(departamentos[form.departamento] || []).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Código postal (opcional)">
                <input value={form.codigoPostal} onChange={(e) => update('codigoPostal', e.target.value)} className="input-field" />
              </Field>
            </div>
          </section>

          <section className="bg-white dark:bg-forest-700 rounded-2xl shadow-premium p-6">
            <h2 className="font-display text-xl font-semibold mb-5">Método de pago</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentMethods.map(({ id, label, icon: Icon }) => (
                <label
                  key={id}
                  className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-colors ${
                    form.metodoPago === id ? 'border-forest-600 bg-forest-50 dark:bg-forest-600' : 'border-coffee-200 dark:border-forest-600'
                  }`}
                >
                  <input type="radio" name="metodoPago" checked={form.metodoPago === id} onChange={() => update('metodoPago', id)} className="accent-forest-600" />
                  <Icon className="text-lg" />
                  <span className="text-sm font-medium">{label}</span>
                </label>
              ))}
            </div>
          </section>

          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
        </div>

        {/* Resumen del pedido */}
        <div className="bg-white dark:bg-forest-700 rounded-2xl shadow-premium p-6 h-fit space-y-4">
          <h2 className="font-display text-xl font-semibold">Resumen del pedido</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.cartId} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>{formatCOP(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm border-t border-coffee-100 dark:border-forest-600 pt-4">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCOP(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-forest-600 dark:text-coffee-300"><span>Descuento</span><span>-{formatCOP(discount)}</span></div>}
            <div className="flex justify-between"><span>IVA (19%)</span><span>{formatCOP(iva)}</span></div>
            <div className="flex justify-between"><span>Envío</span><span>{shipping === 0 ? 'Gratis' : formatCOP(shipping)}</span></div>
          </div>
          <div className="flex justify-between text-lg font-bold border-t border-coffee-100 dark:border-forest-600 pt-4">
            <span>Total</span><span>{formatCOP(total)}</span>
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-50">
            {submitting ? 'Procesando...' : 'Ir a pagar con Wompi'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, error, children, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
