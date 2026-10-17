import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'

const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-forest-700 rounded-2xl overflow-hidden shadow-premium flex flex-col"
    >
      <Link to={`/tienda/${product.slug}`} className="block aspect-square bg-coffee-100 dark:bg-forest-600 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <span className="text-xs uppercase tracking-wide text-forest-600 dark:text-coffee-300 font-semibold">
          {product.origin} · {product.type}
        </span>
        <Link to={`/tienda/${product.slug}`} className="font-display text-lg font-semibold hover:text-forest-600 dark:hover:text-coffee-300">
          {product.name}
        </Link>
        <p className="text-sm text-coffee-700/80 dark:text-cream-200/80 line-clamp-2">{product.description}</p>
        {product.rating > 0 && (
          <div className="flex items-center gap-1 text-amber-500 text-sm">
            {product.rating.toFixed(1)} / 5
          </div>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <div>
            <p className="font-bold text-lg">{formatCOP(product.price)}</p>
            <p className="text-xs text-coffee-600/70 dark:text-cream-300/70">{product.weight}</p>
          </div>
          <button
            onClick={() => addItem(product, 1)}
            disabled={product.stock === 0}
            aria-label={`Agregar ${product.name} al carrito`}
            className="bg-forest-600 hover:bg-forest-700 disabled:opacity-40 text-cream-50 p-3 rounded-full transition-colors"
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
