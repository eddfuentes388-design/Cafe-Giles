import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/573134659497?text=Hola%2C%20quiero%20más%20información%20sobre%20Café%20Aroma%20Andino"
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-premium hover:scale-110 transition-transform"
    >
      <FaWhatsapp />
    </a>
  )
}
