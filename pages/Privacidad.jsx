import LegalPage from '../components/ui/LegalPage'

const sections = [
  { heading: 'Datos que recopilamos', text: 'Recopilamos nombre, correo, teléfono y dirección únicamente para procesar tus pedidos y mejorar tu experiencia de compra.' },
  { heading: 'Uso de la información', text: 'No compartimos ni vendemos tus datos personales a terceros. La información se usa exclusivamente para fines operativos y de comunicación contigo.' },
  { heading: 'Cookies', text: 'Usamos cookies para recordar tu carrito de compras y preferencias de navegación, como el modo oscuro.' },
  { heading: 'Tus derechos', text: 'Puedes solicitar la actualización o eliminación de tus datos personales en cualquier momento escribiendo a contactenos@cafegiles.com.' }
]

export default function Privacidad() {
  return <LegalPage title="Política de Privacidad" sections={sections} />
}
