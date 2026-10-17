import LegalPage from '../components/ui/LegalPage'

const sections = [
  { heading: 'Política de envíos', text: 'Realizamos envíos a todo el territorio colombiano en un plazo de 2 a 5 días hábiles según la ciudad de destino. El envío es gratuito en compras superiores a $150.000 COP.' },
  { heading: 'Política de devoluciones', text: 'Aceptamos devoluciones dentro de los 5 días hábiles posteriores a la entrega, siempre que el producto no haya sido abierto y conserve su empaque original.' },
  { heading: 'Política de cambios', text: 'Si recibiste un producto equivocado o defectuoso, contáctanos dentro de las 48 horas siguientes a la entrega para gestionar el cambio sin costo adicional.' },
  { heading: 'Garantía de calidad', text: 'Si no quedas satisfecho con el perfil de tu café, escríbenos: buscamos siempre una solución justa para nuestros clientes.' }
]

export default function Politicas() {
  return <LegalPage title="Políticas" sections={sections} />
}
