import { pool } from '../config/db.js'

function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// GET /api/productos?origen=&tostion=&tipo=&precioMin=&precioMax=&q=
export async function getProducts(req, res, next) {
  try {
    const { origen, tostion, tipo, precioMin, precioMax, q, page = 1, limit = 12 } = req.query
    const conditions = ['1=1']
    const params = []

    if (origen) { conditions.push('p.origen = ?'); params.push(origen) }
    if (tostion) { conditions.push('p.nivel_tostion = ?'); params.push(tostion) }
    if (tipo) { conditions.push('p.tipo_cafe = ?'); params.push(tipo) }
    if (precioMin) { conditions.push('p.precio >= ?'); params.push(precioMin) }
    if (precioMax) { conditions.push('p.precio <= ?'); params.push(precioMax) }
    if (q) { conditions.push('(p.nombre LIKE ? OR p.descripcion LIKE ?)'); params.push(`%${q}%`, `%${q}%`) }

    const offset = (Number(page) - 1) * Number(limit)
    const whereClause = conditions.join(' AND ')

    const [rows] = await pool.query(
      `SELECT p.*, i.stock, c.nombre AS categoria
       FROM productos p
       LEFT JOIN inventario i ON i.producto_id = p.id
       LEFT JOIN categorias c ON c.id = p.categoria_id
       WHERE ${whereClause}
       ORDER BY p.creado_en DESC
       LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    )

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM productos p WHERE ${whereClause}`,
      params
    )

    res.json({ data: rows, total, page: Number(page), limit: Number(limit) })
  } catch (error) {
    next(error)
  }
}

export async function getProductBySlug(req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, i.stock, c.nombre AS categoria
       FROM productos p
       LEFT JOIN inventario i ON i.producto_id = p.id
       LEFT JOIN categorias c ON c.id = p.categoria_id
       WHERE p.slug = ?`,
      [req.params.slug]
    )
    if (!rows[0]) return res.status(404).json({ message: 'Producto no encontrado' })

    const [images] = await pool.query(
      'SELECT url FROM producto_imagenes WHERE producto_id = ? ORDER BY orden',
      [rows[0].id]
    )
    const [reviews] = await pool.query(
      `SELECT o.calificacion, o.comentario, o.creado_en, u.nombre
       FROM opiniones o JOIN usuarios u ON u.id = o.usuario_id
       WHERE o.producto_id = ? ORDER BY o.creado_en DESC`,
      [rows[0].id]
    )

    res.json({ ...rows[0], imagenes: images.map((i) => i.url), opiniones: reviews })
  } catch (error) {
    next(error)
  }
}

export async function createProduct(req, res, next) {
  try {
    const {
      nombre, descripcion, descripcionCorta, precio, peso, tipoCafe,
      nivelTostion, origen, categoriaId, valorNutricional, stockInicial = 0
    } = req.body

    const slug = slugify(nombre)
    const [result] = await pool.query(
      `INSERT INTO productos
       (categoria_id, nombre, slug, descripcion, descripcion_corta, precio, peso, tipo_cafe, nivel_tostion, origen, valor_nutricional)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [categoriaId || null, nombre, slug, descripcion, descripcionCorta, precio, peso, tipoCafe, nivelTostion, origen, JSON.stringify(valorNutricional || {})]
    )

    await pool.query('INSERT INTO inventario (producto_id, stock) VALUES (?, ?)', [result.insertId, stockInicial])

    res.status(201).json({ id: result.insertId, slug, message: 'Producto creado correctamente' })
  } catch (error) {
    next(error)
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params
    const fields = req.body
    const allowed = ['nombre', 'descripcion', 'descripcion_corta', 'precio', 'peso', 'tipo_cafe', 'nivel_tostion', 'origen', 'disponible', 'destacado', 'categoria_id']

    const updates = Object.entries(fields).filter(([key]) => allowed.includes(key))
    if (updates.length === 0) return res.status(400).json({ message: 'No hay campos válidos para actualizar' })

    const setClause = updates.map(([key]) => `${key} = ?`).join(', ')
    const values = updates.map(([, value]) => value)

    await pool.query(`UPDATE productos SET ${setClause} WHERE id = ?`, [...values, id])
    res.json({ message: 'Producto actualizado correctamente' })
  } catch (error) {
    next(error)
  }
}

export async function deleteProduct(req, res, next) {
  try {
    await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id])
    res.json({ message: 'Producto eliminado correctamente' })
  } catch (error) {
    next(error)
  }
}
