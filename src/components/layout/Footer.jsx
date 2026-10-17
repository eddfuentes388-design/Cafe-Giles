import { Link } from 'react-router-dom'
import { FiFacebook, FiInstagram, FiYoutube, FiLinkedin } from 'react-icons/fi'
import { SiTiktok } from 'react-icons/si'

const social = [
  { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: SiTiktok, href: 'https://tiktok.com', label: 'TikTok' },
  { icon: FiYoutube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' }
]

const columns = [
  {
    title: 'Mapa del sitio',
    links: [
      { to: '/', label: 'Inicio' },
      { to: '/nosotros', label: 'Nosotros' },
      { to: '/tienda', label: 'Tienda' },
      { to: '/blog', label: 'Blog' },
      { to: '/contacto', label: 'Contacto' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { to: '/politicas', label: 'Políticas' },
      { to: '/terminos', label: 'Términos y condiciones' },
      { to: '/privacidad', label: 'Privacidad' }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-forest-800 text-cream-100 mt-24">
      <div className="container-app py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl font-bold mb-3">Café Giles</h3>
          <p className="text-cream-200/80 text-sm leading-relaxed">
            Café colombiano cultivado en Tolima, con presentaciones para disfrutarlo en casa,
            compartirlo o llevarlo a tu negocio.
          </p>
          <div className="flex gap-4 mt-5 text-xl">
            {social.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="hover:text-coffee-300 transition-colors">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-2 text-cream-200/80 text-sm">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-coffee-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-semibold mb-4">Métodos de pago</h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {['Visa', 'Mastercard', 'PSE', 'Nequi'].map((m) => (
              <span key={m} className="bg-cream-50/10 px-3 py-1 rounded-full">{m}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-cream-50/10 py-5 text-center text-xs text-cream-200/70">
        © {new Date().getFullYear()} Café Giles. Todos los derechos reservados.
      </div>
    </footer>
  )
}
