import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSun, FiMoon, FiSearch } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/tienda', label: 'Tienda' },
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('cgl_theme') === 'dark')
  const { itemCount } = useCart()
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('cgl_theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/95 dark:bg-forest-800/95 backdrop-blur shadow-premium'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-app flex items-center justify-between h-20">
        <Link to="/" className="flex items-center shrink-0" aria-label="Cafe Giles - Inicio">
          <img
            src="/images/logo-cafe-giles.jpg"
            alt="Cafe Giles - El sabor que nace en Colombia"
            className="h-14 w-14 rounded-full object-cover shadow-sm"
          />
          <span className="sr-only">Cafe Giles</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8 font-medium">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `transition-colors hover:text-forest-600 dark:hover:text-coffee-300 ${
                    isActive ? 'text-forest-600 dark:text-coffee-300' : 'text-coffee-800 dark:text-cream-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link to="/tienda" aria-label="Buscar" className="hidden sm:block text-xl">
            <FiSearch />
          </Link>
          <button
            aria-label="Cambiar tema"
            onClick={() => setDark((d) => !d)}
            className="text-xl"
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>
          <Link to={isAuthenticated ? '/cuenta' : '/login'} aria-label="Cuenta" className="text-xl flex items-center gap-1">
            <FiUser />
            {isAuthenticated && <span className="hidden xl:inline text-sm">{user?.firstName}</span>}
          </Link>
          <Link to="/carrito" aria-label="Carrito" className="relative text-xl">
            <FiShoppingCart />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-forest-600 text-cream-50 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="lg:hidden text-2xl" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <FiMenu />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-cream-50 dark:bg-forest-800 p-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Link to="/" onClick={() => setOpen(false)} aria-label="Cafe Giles - Inicio">
                <img
                  src="/images/logo-cafe-giles.jpg"
                  alt="Cafe Giles"
                  className="h-16 w-16 rounded-full object-cover"
                />
              </Link>
              <div className="flex justify-end">
                <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="text-2xl">
                  <FiX />
                </button>
              </div>
            </div>
            <ul className="flex flex-col gap-6 mt-10 text-xl font-display">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} onClick={() => setOpen(false)}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
