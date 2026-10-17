import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

import { testConnection } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Café Giles API' }))
app.use('/api/auth', authRoutes)
app.use('/api/productos', productRoutes)
app.use('/api/pedidos', orderRoutes)
app.use('/api/usuarios', userRoutes)
app.use('/api/pagos', paymentRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

testConnection().then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`))
})
