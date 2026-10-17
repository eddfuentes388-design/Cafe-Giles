import { Router } from 'express'
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js'
import { verifyToken, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.post('/', verifyToken, createOrder)
router.get('/mios', verifyToken, getUserOrders)
router.get('/', verifyToken, requireAdmin, getAllOrders)
router.put('/:id/estado', verifyToken, requireAdmin, updateOrderStatus)

export default router
