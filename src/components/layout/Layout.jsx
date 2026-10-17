import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from '../ui/WhatsAppButton'
import BackToTop from '../ui/BackToTop'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 dark:bg-forest-800 text-coffee-900 dark:text-cream-100">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] bg-forest-600 text-cream-50 px-4 py-2 rounded-lg"
      >
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="contenido-principal" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  )
}
