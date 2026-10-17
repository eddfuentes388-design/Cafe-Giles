import { Router } from 'express'
import { getUsers, updateUser, deleteUser } from '../controllers/userController.js'
import { verifyToken, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.get('/', verifyToken, requireAdmin, getUsers)
router.put('/:id', verifyToken, requireAdmin, updateUser)
router.delete('/:id', verifyToken, requireAdmin, deleteUser)

export default router
