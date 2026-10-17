import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import Tienda from './pages/Tienda'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import ConfirmacionPago from './pages/ConfirmacionPago'
import Login from './pages/Login'
import Registro from './pages/Registro'
import RecuperarPassword from './pages/RecuperarPassword'
import Contacto from './pages/Contacto'
import Blog from './pages/Blog'
import Cuenta from './pages/Cuenta'
import Politicas from './pages/Politicas'
import Terminos from './pages/Terminos'
import Privacidad from './pages/Privacidad'
import NotFound from './pages/NotFound'

import AdminDashboard from './pages/admin/Dashboard'
import AdminProductos from './pages/admin/Productos'
import AdminCategorias from './pages/admin/Categorias'
import AdminUsuarios from './pages/admin/Usuarios'
import AdminPedidos from './pages/admin/Pedidos'
import AdminInventario from './pages/admin/Inventario'
import AdminVentas from './pages/admin/Ventas'
import AdminConfiguracion from './pages/admin/Configuracion'
import ProtectedRoute from './components/layout/ProtectedRoute'
import AdminLayout from './components/layout/AdminLayout'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/tienda/:slug" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/confirmacion" element={<ConfirmacionPago />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-password" element={<RecuperarPassword />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route
          path="/cuenta"
          element={
            <ProtectedRoute>
              <Cuenta />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="productos" element={<AdminProductos />} />
        <Route path="categorias" element={<AdminCategorias />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="pedidos" element={<AdminPedidos />} />
        <Route path="inventario" element={<AdminInventario />} />
        <Route path="ventas" element={<AdminVentas />} />
        <Route path="configuracion" element={<AdminConfiguracion />} />
      </Route>
    </Routes>
  )
}
