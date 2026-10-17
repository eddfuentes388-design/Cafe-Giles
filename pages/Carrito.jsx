import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiTrash2, FiMinus, FiPlus, FiTag, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

// Cupones de ejemplo válidos mientras no hay backend conectado
const DEMO_COUPONS = {
  ANDINO10: { code: 'ANDINO10', type: 'percent', value: 10 },
  BIENVENIDA15000: { code: 'BIENVENIDA15000', type: 'fixed', value: 15000 }
}

export default function Carrito() {
  const {
    items, removeItem, updateQuantity, clearCart,
    subtotal, discount, iva, shipping, total,
    coupon, applyCoupon, removeCoupon
  } = useCart()

  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')

  const handleApplyCoupon = () => {
    const found = DEMO_COUPONS[couponInput.trim().toUpperCase()]
    if (!found) {
      setCouponError('El cupón ingresado no es válido')
      return
    }
    applyCoupon(found)
    setCouponError('')
  }

  if (items.length === 0) {
    return (
      <div className="container-app py-24 text-center">
        <FiShoppingBag className="mx-auto text-6xl text-coffee-300 mb-6" />
        <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
        <p className="text-coffee-600 dark:text-cream-300 mb-6">Explora nuestra tienda y encuentra tu café ideal.</p>
        <Link to="/tienda" className="btn-primary">Ir a la tienda</Link>
      </div>
    )
  }

  return (
    <div className="container-app py-14">
      <h1 className="text-3xl font-bold mb-10">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        {/* Lista de productos */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.cartId} className="flex gap-4 bg-white dark:bg-forest-700 p-4 rounded-2xl shadow-premium items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover bg-coffee-100 dark:bg-forest-600" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-coffee-500 dark:text-cream-300">{item.weight} · {item.roast}</p>
                <p className="font-bold mt-1">{formatCOP(item.price)}</p>
              </div>
              <div className="flex items-center border border-coffee-200 dark:border-forest-600 rounded-full">
                <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="p-2" aria-label="Disminuir cantidad">
                  <FiMinus />
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="p-2" aria-label="Aumentar cantidad">
                  <FiPlus />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.cartId)}
                aria-label={`Eliminar ${item.name}`}
                className="text-red-500 hover:text-red-600 p-2"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button onClick={clearCart} className="text-sm text-red-500 hover:underline mt-2">
            Vaciar carrito
          </button>
        </div>

        {/* Resumen */}
        <div className="bg-white dark:bg-forest-700 rounded-2xl shadow-premium p-6 h-fit space-y-5">
          <h2 className="font-display text-xl font-semibold">Resumen del pedido</h2>

          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-1">
              <FiTag /> Cupón de descuento
            </label>
            {coupon ? (
              <div className="flex items-center justify-between bg-forest-50 dark:bg-forest-600 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium">{coupon.code}</span>
                <button onClick={removeCoupon} className="text-xs text-red-500">Quitar</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Ej: ANDINO10"
                  className="flex-1 px-3 py-2 rounded-lg border border-coffee-200 dark:border-forest-600 bg-transparent text-sm"
                />
                <button onClick={handleApplyCoupon} className="btn-secondary py-2 px-4 text-sm">Aplicar</button>
              </div>
            )}
            {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
          </div>

          <div className="space-y-2 text-sm border-t border-coffee-100 dark:border-forest-600 pt-4">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCOP(subtotal)}</span></div>
            {discount > 0 && (
              <div className="flex justify-between text-forest-600 dark:text-coffee-300">
                <span>Descuento</span><span>-{formatCOP(discount)}</span>
              </div>
            )}
            <div className="flex justify-between"><span>IVA (19%)</span><span>{formatCOP(iva)}</span></div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>{shipping === 0 ? 'Gratis' : formatCOP(shipping)}</span>
            </div>
          </div>

          <div className="flex justify-between text-lg font-bold border-t border-coffee-100 dark:border-forest-600 pt-4">
            <span>Total</span><span>{formatCOP(total)}</span>
          </div>

          <Link to="/checkout" className="btn-primary w-full justify-center">
            Continuar compra
          </Link>
          <Link to="/tienda" className="block text-center text-sm text-forest-600 dark:text-coffee-300 hover:underline">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  )
}
