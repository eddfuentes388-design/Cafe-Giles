import { pool } from '../config/db.js'

export async function getUsers(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, apellido, correo, celular, rol, activo, creado_en FROM usuarios ORDER BY creado_en DESC'
    )
    res.json(rows)
  } catch (error) {
    next(error)
  }
}

export async function updateUser(req, res, next) {
  try {
    const { rol, activo } = req.body
    const fields = []
    const values = []
    if (rol) { fields.push('rol = ?'); values.push(rol) }
    if (typeof activo === 'boolean') { fields.push('activo = ?'); values.push(activo) }
    if (fields.length === 0) return res.status(400).json({ message: 'Nada para actualizar' })

    await pool.query(`UPDATE usuarios SET ${fields.join(', ')} WHERE id = ?`, [...values, req.params.id])
    res.json({ message: 'Usuario actualizado correctamente' })
  } catch (error) {
    next(error)
  }
}

export async function deleteUser(req, res, next) {
  try {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id])
    res.json({ message: 'Usuario eliminado correctamente' })
  } catch (error) {
    next(error)
  }
}
