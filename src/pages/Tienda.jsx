import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ui/ProductCard'
import ProductCardSkeleton from '../components/ui/ProductCardSkeleton'
import ProductFilters from '../components/ui/ProductFilters'
import Seo from '../components/ui/Seo'

export default function Tienda() {
  const [filters, setFilters] = useState({})
  const [search, setSearch] = useState('')
  const { data: products, loading } = useProducts({ ...filters, q: search })

  return (
    <div className="container-app py-14">
      <Seo
        title="Tienda"
        description="Explora nuestra selección de café colombiano de especialidad: filtra por origen, tostión, tipo y precio."
      />
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">Nuestra Tienda</h1>
        <p className="text-coffee-700/80 dark:text-cream-200/80 mt-2">
          Café cultivado en Tolima. Elige la presentación y la molienda que prefieres.
        </p>
      </div>

      <div className="relative max-w-xl mx-auto mb-10">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar café por nombre..."
          className="w-full pl-11 pr-4 py-3 rounded-full border border-coffee-200 dark:border-forest-600 bg-white dark:bg-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <ProductFilters filters={filters} onChange={setFilters} onReset={() => setFilters({})} />

        <div>
          <p className="text-sm text-coffee-600 dark:text-cream-300 mb-4">
            {loading ? 'Buscando productos...' : `${products.length} producto(s) encontrado(s)`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          {!loading && products.length === 0 && (
            <p className="text-center text-coffee-600 dark:text-cream-300 py-16">
              No encontramos productos con esos filtros. Intenta ajustarlos.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
