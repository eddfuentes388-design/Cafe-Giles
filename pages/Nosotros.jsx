import { motion } from 'framer-motion'
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi'
import Seo from '../components/ui/Seo'

const valores = [
  { title: 'Origen tolimense', text: 'Nuestro café se cultiva en San Antonio, Tolima.' },
  { title: 'Emprendimiento 100% colombiano', text: 'Café Giles nació en 2026 como un proyecto colombiano.' },
  { title: 'Café para cada momento', text: 'Ofrecemos café molido, en grano, especial y en presentación institucional.' },
  { title: 'Cercanía con nuestros clientes', text: 'Queremos compartir el café de nuestra tierra con hogares, empresas y negocios.' }
]

const equipo = [
  { name: 'Omaira Gil Ducuara', role: 'Gerente y desarrolladora' },
  { name: 'Eduar Giovanny Fuentes Ardila', role: 'Desarrollador' }
]

export default function Nosotros() {
  return (
    <div>
      <Seo
        title="Nosotros"
        description="Conoce el origen tolimense de Café Giles, un emprendimiento colombiano nacido en 2026."
      />

      <section className="relative h-[50vh] min-h-[380px] flex items-center overflow-hidden">
        <img src="/images/about-hero.png" alt="Cosecha de café en Tolima" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-forest-800/70" />
        <div className="container-app relative z-10 text-cream-50">
          <h1 className="text-4xl sm:text-5xl font-bold">Nuestra historia</h1>
          <p className="mt-4 max-w-xl text-cream-100/90">Un emprendimiento colombiano con raíces en San Antonio, Tolima.</p>
        </div>
      </section>

      <section className="container-app py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-4">Cómo empezamos</h2>
          <p className="text-coffee-700 dark:text-cream-200 leading-relaxed mb-4">
            Café Giles nació en 2026 como un emprendimiento colombiano. Nuestra sede está en
            la vereda Tetuancito, finca El Recreo, municipio de San Antonio, Tolima. Desde allí
            queremos compartir con hogares, empresas y negocios el café cultivado en el Tolima.
          </p>
          <p className="text-coffee-700 dark:text-cream-200 leading-relaxed">
            Empezamos con cuatro presentaciones: café molido de 500 g, café en grano de 500 g,
            café especial de 500 g y una opción institucional de mayor volumen. Queremos crecer
            junto a quienes disfrutan y valoran el café colombiano.
          </p>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          src="/images/about-story.jpeg"
          alt="Vista de la finca cafetera Café Giles en San Antonio, Tolima"
          className="rounded-2xl shadow-premium w-full aspect-[4/3] object-cover"
        />
      </section>

      <section className="bg-coffee-50 dark:bg-forest-900 py-20">
        <div className="container-app grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-forest-700 rounded-2xl p-8 shadow-premium">
            <FiTarget className="text-3xl text-forest-600 dark:text-coffee-300 mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">Misión</h3>
            <p className="text-coffee-700 dark:text-cream-200 text-sm leading-relaxed">
              Acercar el café cultivado en Tolima a hogares, empresas y negocios, con opciones
              para distintas formas de prepararlo y compartirlo.
            </p>
          </div>
          <div className="bg-white dark:bg-forest-700 rounded-2xl p-8 shadow-premium">
            <FiEye className="text-3xl text-forest-600 dark:text-coffee-300 mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">Visión</h3>
            <p className="text-coffee-700 dark:text-cream-200 text-sm leading-relaxed">
              Consolidar a Café Giles como un emprendimiento tolimense reconocido por el café
              de su tierra y la cercanía con sus clientes.
            </p>
          </div>
          <div className="bg-white dark:bg-forest-700 rounded-2xl p-8 shadow-premium">
            <FiHeart className="text-3xl text-forest-600 dark:text-coffee-300 mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">Valores</h3>
            <p className="text-coffee-700 dark:text-cream-200 text-sm leading-relaxed">
              El origen tolimense, el compromiso y la atención cercana guían nuestro trabajo.
            </p>
          </div>
        </div>
      </section>

      <section className="container-app py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestros valores en acción</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {valores.map((v) => (
            <div key={v.title} className="p-6 rounded-2xl border border-coffee-100 dark:border-forest-600">
              <h3 className="font-semibold mb-2 text-forest-600 dark:text-coffee-300">{v.title}</h3>
              <p className="text-sm text-coffee-700 dark:text-cream-200">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-forest-800 py-20">
        <div className="container-app">
          <h2 className="text-3xl font-bold text-center text-cream-50 mb-12">Nuestro equipo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {equipo.map((m) => (
              <div key={m.name} className="text-center bg-forest-700/60 rounded-2xl p-8">
                <div aria-hidden="true" className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-coffee-300 bg-forest-600 text-3xl font-bold text-cream-50">
                  {m.name.split(' ').map((part) => part[0]).join('')}
                </div>
                <h3 className="font-semibold text-cream-50">{m.name}</h3>
                <p className="text-sm text-cream-200/70">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
