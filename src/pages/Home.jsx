import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTruck, FiCoffee, FiHeart, FiMapPin } from 'react-icons/fi'
import ProductCard from '../components/ui/ProductCard'
import Seo from '../components/ui/Seo'
import { products } from '../data/products'

const benefits = [
  { icon: FiMapPin, title: 'Origen tolimense', text: 'Café cultivado en Tolima; Café Giles tiene sus raíces en San Antonio.' },
  { icon: FiCoffee, title: 'Cuatro presentaciones', text: 'Molido, en grano, especial y formato institucional.' },
  { icon: FiTruck, title: 'De Tolima para Colombia', text: 'Consulta las opciones de envío al hacer tu pedido.' },
  { icon: FiHeart, title: 'Emprendimiento 100% colombiano', text: 'Café Giles nació en 2026 con raíces en el Tolima.' }
]

export default function Home() {
  return (
    <div>
      <Seo
        title="Inicio"
        description="Café colombiano cultivado en Tolima. Conoce las presentaciones de Café Giles, emprendimiento nacido en 2026 en San Antonio."
      />
      {/* Hero */}
      <section className="relative min-h-[620px] flex items-center overflow-hidden bg-forest-900">
        <img
          src="/images/hero-tolima.png"
          alt="Recolección de café en una finca de Tolima"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/90 via-forest-900/70 to-forest-900/15" />
        <div className="container-app relative z-10 text-cream-50">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.3em] text-coffee-200 text-sm mb-4"
          >
            Origen · Tradición · Sabor
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold max-w-2xl leading-tight"
          >
            Del Tolima a tu mesa, café colombiano de origen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-cream-100/90 text-lg"
          >
            Café colombiano cultivado en Tolima. Un emprendimiento colombiano nacido en 2026.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8"
          >
            <Link to="/tienda" className="btn-primary">
              Comprar ahora
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="container-app py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center p-6 rounded-2xl hover:shadow-premium transition-shadow">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-coffee-100 dark:bg-forest-700 flex items-center justify-center text-2xl text-forest-600 dark:text-coffee-300">
                <Icon />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-coffee-700/80 dark:text-cream-200/80">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="bg-coffee-50 dark:bg-forest-900 py-20">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Productos Destacados</h2>
            <p className="text-coffee-700/80 dark:text-cream-200/80 mt-2">
              Cuatro presentaciones para disfrutar o compartir
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-800 py-16">
        <div className="container-app text-center text-cream-50">
          <p className="uppercase tracking-[0.2em] text-coffee-300 text-sm mb-3">San Antonio · Tolima</p>
          <h2 className="text-3xl font-bold mb-4">Un emprendimiento colombiano, hecho desde el origen</h2>
          <p className="max-w-2xl mx-auto text-cream-100/80 mb-7">
            Conoce la historia de Café Giles y el café que cultivamos en nuestra tierra.
          </p>
          <Link to="/nosotros" className="btn-secondary">Conócenos</Link>
        </div>
      </section>
    </div>
  )
}
