import { Router } from 'express'
import { iniciarPagoWompi, webhookWompi, estadoPago } from '../controllers/paymentController.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

router.post('/wompi/iniciar', verifyToken, iniciarPagoWompi)
router.get('/estado/:reference', verifyToken, estadoPago)
// El webhook lo llama Wompi directamente, sin JWT, por eso no lleva verifyToken.
// Su seguridad depende de la validación del checksum dentro del controlador.
router.post('/webhook', webhookWompi)

export default router
