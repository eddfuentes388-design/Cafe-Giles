import LegalPage from '../components/ui/LegalPage'

const sections = [
  { heading: 'Aceptación de los términos', text: 'Al usar este sitio y realizar compras en él, aceptas los presentes términos y condiciones en su totalidad.' },
  { heading: 'Uso del sitio', text: 'El contenido de este sitio es propiedad de Café Giles y no puede ser reproducido sin autorización previa.' },
  { heading: 'Precios y disponibilidad', text: 'Los precios están expresados en pesos colombianos (COP) e incluyen IVA. Nos reservamos el derecho de modificar precios y disponibilidad de productos sin previo aviso.' },
  { heading: 'Responsabilidad', text: 'Café Giles no se hace responsable por retrasos en la entrega ocasionados por causas de fuerza mayor ajenas a nuestro control.' }
]

export default function Terminos() {
  return <LegalPage title="Términos y Condiciones" sections={sections} />
}
