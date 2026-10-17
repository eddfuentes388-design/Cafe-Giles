import { Router } from 'express'
import { body } from 'express-validator'
import { register, login, forgotPassword, me } from '../controllers/authController.js'
import { validate } from '../middleware/validate.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

router.post(
  '/register',
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').trim().notEmpty().withMessage('El apellido es obligatorio'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres')
  ],
  validate,
  register
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Correo inválido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
  ],
  validate,
  login
)

router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Correo inválido')],
  validate,
  forgotPassword
)

router.get('/me', verifyToken, me)

export default router
