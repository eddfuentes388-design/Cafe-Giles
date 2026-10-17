export const blogPosts = [
  {
    id: 1,
    slug: 'indicador-cafetero-octubre-2026',
    title: 'Indicador cafetero: precio de referencia de la FNC',
    category: 'indicadores',
    excerpt: 'La última publicación consultada, del 16 de octubre de 2026, fijó en $2.160.000 COP la carga de 125 kg de café pergamino seco (FR 94).',
    detail: 'La misma publicación informó un cierre del contrato C de Nueva York de 305,60 centavos de dólar por libra y un precio de referencia de $12.000 COP por kilo de pasilla. La FNC explica que el precio interno depende de la cotización en Nueva York, la tasa de cambio y el diferencial del café colombiano. Es un precio al productor por café pergamino; no es el precio minorista de una bolsa de café tostado.',
    indicator: 'FNC · 16 oct 2026 · $2.160.000 por carga de 125 kg',
    sourceUrl: 'https://federaciondecafeteros.org/app/uploads/2026/03/precio_cafe.pdf',
    sourceLabel: 'Consultar publicación de la FNC',
    image: '/images/hero-tolima.png',
    date: '2026-10-16T12:00:00-05:00'
  },
  {
    id: 2,
    slug: 'pasilla-precio-referencia-septiembre-2026',
    title: 'La referencia de compra de la pasilla llegó a $12.000 por kilo',
    category: 'noticias',
    excerpt: 'En septiembre de 2026, la Federación anunció un aumento de 20% en la referencia de compra de la pasilla, de $10.000 a $12.000 por kilo.',
    detail: 'La medida busca ofrecer un piso de compra para este grano. El precio del café que recibe el productor cambia con el mercado internacional y la tasa de cambio; el efecto sobre el precio al consumidor no es inmediato ni equivalente.',
    sourceUrl: 'https://elpais.com/america-colombia/2026-09-26/la-federacion-de-cafeteros-aumenta-un-20-el-precio-de-la-pasilla-el-cafe-de-segunda-que-se-toma-en-colombia.html',
    sourceLabel: 'Leer la noticia en EL PAÍS',
    image: '/images/blog/coffee-sorting.png',
    date: '2026-09-26T12:00:00-05:00'
  },
  {
    id: 3,
    slug: 'receta-cafe-v60',
    title: 'Prepara café en V60: una receta sencilla',
    category: 'recetas',
    excerpt: 'Una preparación manual para una taza limpia y aromática. Ajusta la molienda y la cantidad de agua a tu gusto.',
    ingredients: ['15 g de café molido medio', '250 ml de agua caliente (92–96 °C)', 'Filtro de papel y gotero V60'],
    steps: ['Enjuaga el filtro con agua caliente y descarta esa agua.', 'Agrega el café y vierte 30 ml de agua. Espera 30 segundos.', 'Vierte el resto del agua en círculos lentos, hasta completar 250 ml.', 'Deja que termine el filtrado; busca un tiempo total cercano a 2:30–3:00 minutos.'],
    image: '/images/blog/v60.png',
    date: '2026-10-17T12:00:00-05:00'
  },
  {
    id: 4,
    slug: 'receta-cold-brew-casero',
    title: 'Cold brew casero: café frío por extracción lenta',
    category: 'recetas',
    excerpt: 'Prepara una jarra para servir con hielo. La extracción en frío necesita tiempo, pero casi ningún equipo.',
    ingredients: ['60 g de café molido grueso', '1 litro de agua fría', 'Un frasco con tapa y un filtro fino'],
    steps: ['Mezcla el café y el agua en el frasco.', 'Tapa y deja reposar en la nevera entre 12 y 16 horas.', 'Filtra lentamente y conserva la bebida refrigerada.', 'Sirve con hielo. Diluye con agua o leche si prefieres un sabor más suave.'],
    image: '/images/blog/cold-brew.png',
    date: '2026-10-17T12:00:00-05:00'
  }
]

export const blogCategories = [
  { key: 'todos', label: 'Todos' },
  { key: 'indicadores', label: 'Indicadores' },
  { key: 'noticias', label: 'Noticias' },
  { key: 'recetas', label: 'Recetas' }
]
