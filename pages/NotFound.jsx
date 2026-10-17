import { Link } from 'react-router-dom'
import { FiCoffee } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="container-app py-32 text-center">
      <FiCoffee className="mx-auto text-6xl text-coffee-300 mb-6" />
      <h1 className="text-4xl font-bold mb-3">404</h1>
      <p className="text-coffee-700 dark:text-cream-200 mb-8">
        Esta página se nos derramó como un café mal servido. No la encontramos.
      </p>
      <Link to="/" className="btn-primary">Volver al inicio</Link>
    </div>
  )
}
