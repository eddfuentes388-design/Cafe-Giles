const noReviews = []

export const products = [
  {
    id: 1,
    name: 'Café molido Café Giles',
    slug: 'cafe-molido-500g',
    price: 44900,
    weight: '500 g',
    type: 'Molido',
    roast: 'Artesanal',
    origin: 'Tolima',
    stock: 20,
    description: 'Café colombiano cultivado en Tolima, molido y listo para preparar en casa o en el trabajo. Presentación de 500 g.',
    shortDescription: 'Café del Tolima molido, en presentación de 500 g.',
    image: '/images/products/cafe-molido-500.png',
    gallery: ['/images/products/cafe-molido-500.png'],
    features: ['Contenido neto: 500 g', 'Presentación: molido', 'Origen: Tolima', 'Tostión artesanal'],
    reviews: noReviews
  },
  {
    id: 2,
    name: 'Café en grano Café Giles',
    slug: 'cafe-en-grano-500g',
    price: 44900,
    weight: '500 g',
    type: 'En grano',
    roast: 'Artesanal',
    origin: 'Tolima',
    stock: 20,
    description: 'Café colombiano cultivado en Tolima, tostado y empacado en grano para conservarlo hasta el momento de moler. Presentación de 500 g.',
    shortDescription: 'Café del Tolima en grano, presentación de 500 g.',
    image: '/images/products/cafe-grano-500.jpeg',
    gallery: ['/images/products/cafe-grano-500.jpeg'],
    features: ['Contenido neto: 500 g', 'Presentación: grano entero', 'Origen: Tolima', 'Tostión artesanal'],
    reviews: noReviews
  },
  {
    id: 3,
    name: 'Café especial Café Giles',
    slug: 'cafe-especial-500g',
    price: 59900,
    weight: '500 g',
    type: 'Especial',
    roast: 'Artesanal',
    origin: 'Tolima',
    stock: 12,
    description: 'Presentación especial Café Giles de 500 g, elaborada con café colombiano cultivado en Tolima. Una opción premium para disfrutar y compartir.',
    shortDescription: 'Presentación premium de café del Tolima, 500 g.',
    image: '/images/products/cafe-especial-500.png',
    gallery: ['/images/products/cafe-especial-500.png'],
    features: ['Contenido neto: 500 g', 'Presentación especial premium', 'Origen: Tolima', 'Tostión artesanal'],
    reviews: noReviews
  },
  {
    id: 4,
    name: 'Café para empresas Café Giles',
    slug: 'cafe-para-empresas-25kg',
    price: 129900,
    weight: '2,5 kg',
    type: 'Empresarial',
    roast: 'Artesanal',
    origin: 'Tolima',
    stock: 20,
    description: 'Presentación institucional de mayor volumen para oficinas, empresas y negocios. Café colombiano cultivado en Tolima, en bolsa de 2,5 kg. Para pedidos mayores, solicita una cotización.',
    shortDescription: 'Presentación institucional de 2,5 kg para empresas y negocios.',
    image: '/images/products/cafe-empresas-saco.jpeg',
    gallery: ['/images/products/cafe-empresas-saco.jpeg'],
    features: ['Contenido neto: 2,5 kg', 'Presentación institucional', 'Origen: Tolima', 'Precio de referencia para esta presentación'],
    reviews: noReviews
  }
]

export const origins = [...new Set(products.map((p) => p.origin))]
export const roasts = [...new Set(products.map((p) => p.roast))]
export const types = [...new Set(products.map((p) => p.type))]
