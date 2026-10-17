export const categoriasMock = [
  { id: 1, nombre: 'Café en grano', slug: 'cafe-en-grano', descripcion: 'Cafés enteros para moler en casa', productos: 3 },
  { id: 2, nombre: 'Café molido', slug: 'cafe-molido', descripcion: 'Listos para preparar', productos: 2 },
  { id: 3, nombre: 'Ediciones especiales', slug: 'ediciones-especiales', descripcion: 'Microlotes y variedades exclusivas', productos: 1 }
]

export const usuariosMock = [
  { id: 1, nombre: 'Laura', apellido: 'Martínez', correo: 'laura@example.com', rol: 'cliente', activo: true, creado_en: '2026-05-12' },
  { id: 2, nombre: 'Carlos', apellido: 'Ramírez', correo: 'carlos@example.com', rol: 'cliente', activo: true, creado_en: '2026-06-02' },
  { id: 3, nombre: 'Admin', apellido: 'Cafe Giles', correo: 'admin@aromaandino.com', rol: 'admin', activo: true, creado_en: '2026-01-01' },
  { id: 4, nombre: 'Valentina', apellido: 'Suárez', correo: 'valentina@example.com', rol: 'cliente', activo: false, creado_en: '2026-04-20' }
]

export const pedidosMock = [
  { id: 1001, cliente: 'Laura Martínez', total: 87000, estado: 'entregado', creado_en: '2026-07-20' },
  { id: 1002, cliente: 'Carlos Ramírez', total: 45000, estado: 'enviado', creado_en: '2026-07-25' },
  { id: 1003, cliente: 'Valentina Suárez', total: 129000, estado: 'pagado', creado_en: '2026-07-29' },
  { id: 1004, cliente: 'Andrés Gómez', total: 42000, estado: 'pendiente', creado_en: '2026-08-01' },
  { id: 1005, cliente: 'Sofía López', total: 68000, estado: 'cancelado', creado_en: '2026-08-02' }
]

export const ventasPorMesMock = [
  { mes: 'Feb', ventas: 3200000 },
  { mes: 'Mar', ventas: 4100000 },
  { mes: 'Abr', ventas: 3800000 },
  { mes: 'May', ventas: 5200000 },
  { mes: 'Jun', ventas: 4700000 },
  { mes: 'Jul', ventas: 6100000 }
]

export const ventasPorOrigenMock = [
  { name: 'Huila', value: 32 },
  { name: 'Nariño', value: 24 },
  { name: 'Tolima', value: 18 },
  { name: 'Cauca', value: 14 },
  { name: 'Magdalena', value: 8 },
  { name: 'Antioquia', value: 4 }
]

export const estadoColors = {
  pendiente: '#c39a63',
  pagado: '#8a5e34',
  enviado: '#2f4a3c',
  entregado: '#1a2b23',
  cancelado: '#b91c1c'
}
