import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { pool } from '../config/db.js'

function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.rol, email: user.correo },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

function toPublicUser(user) {
  return {
    id: user.id,
    firstName: user.nombre,
    lastName: user.apellido,
    email: user.correo,
    role: user.rol
  }
}

export async function register(req, res, next) {
  try {
    const { nombre, apellido, correo, password, celular } = req.body

    const [existing] = await pool.query('SELECT id FROM usuarios WHERE correo = ?', [correo])
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Ya existe una cuenta con este correo' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, apellido, correo, password_hash, celular, rol) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, correo, passwordHash, celular || null, 'cliente']
    )

    const user = {
      id: result.insertId,
      nombre,
      apellido,
      correo,
      rol: 'cliente'
    }

    const token = generateToken(user)
    res.status(201).json({ token, user: toPublicUser(user) })
  } catch (error) {
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ? AND activo = TRUE', [email])
    const user = rows[0]

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const token = generateToken(user)
    res.json({ token, user: toPublicUser(user) })
  } catch (error) {
    next(error)
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body
    const [rows] = await pool.query('SELECT id FROM usuarios WHERE correo = ?', [email])

    // Respuesta genérica siempre, para no revelar si el correo existe
    if (rows.length === 0) {
      return res.json({ message: 'Si el correo existe, enviaremos instrucciones de recuperación' })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 1000 * 60 * 30) // 30 minutos

    await pool.query(
      'UPDATE usuarios SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
      [resetToken, expires, rows[0].id]
    )

    // Aquí se integraría un proveedor de correo (SendGrid, SES, etc.)
    res.json({ message: 'Si el correo existe, enviaremos instrucciones de recuperación' })
  } catch (error) {
    next(error)
  }
}

export async function me(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, apellido, correo, rol FROM usuarios WHERE id = ?',
      [req.user.id]
    )
    if (!rows[0]) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json(toPublicUser(rows[0]))
  } catch (error) {
    next(error)
  }
}
