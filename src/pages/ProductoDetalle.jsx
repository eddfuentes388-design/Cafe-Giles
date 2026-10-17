import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiStar, FiShoppingCart, FiCheck, FiMinus, FiPlus } from 'react-icons/fi'
import { useProduct } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { products as allProducts } from '../data/products'
import ProductCard from '../components/ui/ProductCard'

const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

export default function ProductoDetalle() {
  const { slug } = useParams()
  const { data: product, loading } = useProduct(slug)
  const { addItem } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState('descripcion')
  const [added, setAdded] = useState(false)

  if (loading) {
    return (
      <div className="container-app py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="skeleton aspect-square" />
          <div className="space-y-4">
            <div className="skeleton h-6 w-1/3" />
            <div className="skeleton h-10 w-2/3" />
            <div className="skeleton h-24 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-app py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <Link to="/tienda" className="btn-secondary">Volver a la tienda</Link>
      </div>
    )
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image]
  const related = allProducts.filter((p) => p.origin === product.origin && p.slug !== product.slug).slice(0, 4)

  const handleAdd = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="container-app py-14">
      {/* Migas de pan */}
      <nav className="text-sm text-coffee-600 dark:text-cream-300 mb-8">
        <Link to="/">Inicio</Link> / <Link to="/tienda">Tienda</Link> / <span className="text-coffee-900 dark:text-cream-50">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galería */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-coffee-100 dark:bg-forest-700 mb-4">
            <img src={gallery[activeImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-3">
            {gallery.map((img, idx) => (
              <button
                key={img + idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  activeImage === idx ? 'border-forest-600' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`${product.name} vista ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-xs uppercase tracking-wide text-forest-600 dark:text-coffee-300 font-semibold">
            {product.origin} · {product.type}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-3">{product.name}</h1>
          {product.rating > 0 && (
            <div className="flex items-center gap-2 text-amber-500 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className={i < Math.round(product.rating) ? 'fill-current' : ''} />
              ))}
              <span className="text-coffee-600 dark:text-cream-300 text-sm">({product.rating})</span>
            </div>
          )}
          <p className="text-coffee-700 dark:text-cream-200 mb-6">{product.shortDescription}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">{formatCOP(product.price)}</span>
            <span className="text-coffee-500 dark:text-cream-300 text-sm">/ {product.weight}</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (
              <span className="flex items-center gap-1 text-forest-600 dark:text-coffee-300 text-sm font-medium">
                <FiCheck /> Disponible ({product.stock} unidades)
              </span>
            ) : (
              <span className="text-red-500 text-sm font-medium">Agotado</span>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-coffee-300 dark:border-forest-600 rounded-full">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3" aria-label="Disminuir cantidad">
                <FiMinus />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="p-3" aria-label="Aumentar cantidad">
                <FiPlus />
              </button>
            </div>
            <button onClick={handleAdd} disabled={product.stock === 0} className="btn-primary flex-1 justify-center disabled:opacity-40">
              <FiShoppingCart /> {added ? 'Agregado ✓' : 'Agregar al carrito'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: descripción, características, valor nutricional, opiniones */}
      <div className="mt-16">
        <div className="flex gap-6 border-b border-coffee-200 dark:border-forest-600 mb-8 overflow-x-auto">
          {[
            { key: 'descripcion', label: 'Descripción' },
            { key: 'caracteristicas', label: 'Características' },
            ...(product.nutrition ? [{ key: 'nutricion', label: 'Valor nutricional' }] : []),
            { key: 'opiniones', label: `Opiniones (${product.reviews?.length || 0})` }
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`pb-3 whitespace-nowrap font-medium border-b-2 transition-colors ${
                tab === t.key ? 'border-forest-600 text-forest-600 dark:text-coffee-300' : 'border-transparent text-coffee-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'descripcion' && <p className="max-w-3xl text-coffee-700 dark:text-cream-200 leading-relaxed">{product.description}</p>}

        {tab === 'caracteristicas' && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
            {(product.features || []).map((f) => (
              <li key={f} className="flex items-center gap-2 text-coffee-700 dark:text-cream-200">
                <FiCheck className="text-forest-600 dark:text-coffee-300" /> {f}
              </li>
            ))}
          </ul>
        )}

        {tab === 'nutricion' && product.nutrition && (
          <div className="max-w-md bg-white dark:bg-forest-700 rounded-2xl shadow-premium overflow-hidden">
            {Object.entries(product.nutrition).map(([key, value]) => (
              <div key={key} className="flex justify-between px-6 py-3 border-b border-coffee-100 dark:border-forest-600 last:border-0">
                <span className="capitalize text-coffee-600 dark:text-cream-300">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'opiniones' && (
          <div className="space-y-6 max-w-2xl">
            {(product.reviews || []).length === 0 && <p className="text-coffee-600 dark:text-cream-300">Aún no hay opiniones para este producto.</p>}
            {(product.reviews || []).map((r, idx) => (
              <div key={idx} className="bg-white dark:bg-forest-700 p-5 rounded-2xl shadow-premium">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{r.name}</span>
                  <span className="flex text-amber-500 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar key={i} className={i < r.rating ? 'fill-current' : ''} />
                    ))}
                  </span>
                </div>
                <p className="text-coffee-700 dark:text-cream-200 text-sm">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Productos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
