export function notFoundHandler(req, res) {
  res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` })
}

export function errorHandler(err, req, res, next) {
  console.error(err.stack)
  const status = err.status || 500
  res.status(status).json({
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  })
}
