import { useEffect, useState } from 'react'
import api from '../services/api'
import { products as mockProducts } from '../data/products'

// Mapea el objeto que devuelve la API (snake_case en español) al shape que
// usan los componentes del frontend.
function mapApiProduct(p) {
  return {
    id: p.id,
    name: p.nombre,
    slug: p.slug,
    price: Number(p.precio),
    weight: p.peso,
    type: p.tipo_cafe,
    roast: p.nivel_tostion,
    origin: p.origen,
    stock: p.stock ?? 0,
    description: p.descripcion,
    shortDescription: p.descripcion_corta,
    image: p.imagenes?.[0] || '/images/products/placeholder.jpg',
    gallery: p.imagenes || [],
    rating: p.rating || null,
    nutrition: p.valor_nutricional,
    reviews: p.opiniones || []
  }
}

export function useProducts(filters = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)

    api
      .get('/productos', { params: filters })
      .then((res) => {
        if (!active) return
        setData((res.data.data || []).map(mapApiProduct))
        setUsingFallback(false)
      })
      .catch(() => {
        if (!active) return
        // Backend no disponible: filtramos los datos mock localmente
        setData(applyLocalFilters(mockProducts, filters))
        setUsingFallback(true)
      })
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [JSON.stringify(filters)])

  return { data, loading, error, usingFallback }
}

function applyLocalFilters(items, filters) {
  return items.filter((p) => {
    if (filters.origen && p.origin !== filters.origen) return false
    if (filters.tostion && p.roast !== filters.tostion) return false
    if (filters.tipo && p.type !== filters.tipo) return false
    if (filters.precioMin && p.price < Number(filters.precioMin)) return false
    if (filters.precioMax && p.price > Number(filters.precioMax)) return false
    if (filters.q && !p.name.toLowerCase().includes(filters.q.toLowerCase())) return false
    return true
  })
}

export function useProduct(slug) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)

    api
      .get(`/productos/${slug}`)
      .then((res) => active && setData(mapApiProduct(res.data)))
      .catch(() => {
        if (!active) return
        setData(mockProducts.find((p) => p.slug === slug) || null)
      })
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [slug])

  return { data, loading }
}
