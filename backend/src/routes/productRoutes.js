import { Router } from 'express'
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js'
import { verifyToken, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.get('/', getProducts)
router.get('/:slug', getProductBySlug)
router.post('/', verifyToken, requireAdmin, createProduct)
router.put('/:id', verifyToken, requireAdmin, updateProduct)
router.delete('/:id', verifyToken, requireAdmin, deleteProduct)

export default router
