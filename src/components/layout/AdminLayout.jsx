import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  FiGrid, FiBox, FiTag, FiUsers, FiShoppingBag, FiArchive,
  FiTrendingUp, FiSettings, FiArrowLeft
} from 'react-icons/fi'

const links = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/productos', label: 'Productos', icon: FiBox },
  { to: '/admin/categorias', label: 'Categorías', icon: FiTag },
  { to: '/admin/usuarios', label: 'Usuarios', icon: FiUsers },
  { to: '/admin/pedidos', label: 'Pedidos', icon: FiShoppingBag },
  { to: '/admin/inventario', label: 'Inventario', icon: FiArchive },
  { to: '/admin/ventas', label: 'Ventas', icon: FiTrendingUp },
  { to: '/admin/configuracion', label: 'Configuración', icon: FiSettings }
]

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-cream-100 dark:bg-forest-900 text-coffee-900 dark:text-cream-100">
      <aside className="w-64 shrink-0 bg-forest-800 text-cream-100 flex flex-col">
        <div className="px-6 py-6 border-b border-cream-50/10">
          <span className="font-display text-xl font-bold">Cafe Giles</span>
          <p className="text-xs text-cream-200/60">Panel Administrador</p>
        </div>
        <nav className="flex-1 py-4">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  isActive ? 'bg-forest-700 text-cream-50 border-r-4 border-coffee-300' : 'text-cream-200/70 hover:bg-forest-700/50'
                }`
              }
            >
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>
        <Link to="/" className="flex items-center gap-2 px-6 py-4 text-sm text-cream-200/70 border-t border-cream-50/10 hover:text-cream-50">
          <FiArrowLeft /> Volver al sitio
        </Link>
      </aside>
      <main className="flex-1 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  )
}
