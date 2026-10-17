import { origins, roasts, types } from '../../data/products'

export default function ProductFilters({ filters, onChange, onReset }) {
  const update = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <aside className="bg-white dark:bg-forest-700 rounded-2xl p-6 shadow-premium space-y-6 h-fit">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Filtros</h3>
        <button onClick={onReset} className="text-xs text-forest-600 dark:text-coffee-300 underline">
          Limpiar
        </button>
      </div>

      <div>
        <p className="font-medium mb-2 text-sm">Precio máximo</p>
        <input
          type="range"
          min="30000"
          max="130000"
          step="1000"
          value={filters.precioMax || 130000}
          onChange={(e) => update('precioMax', e.target.value)}
          className="w-full accent-forest-600"
        />
        <p className="text-xs text-coffee-600 dark:text-cream-300 mt-1">
          Hasta {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(filters.precioMax || 130000)}
        </p>
      </div>

      <div>
        <p className="font-medium mb-2 text-sm">Tipo de café</p>
        <div className="space-y-1">
          {types.map((t) => (
            <label key={t} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="tipo"
                checked={filters.tipo === t}
                onChange={() => update('tipo', filters.tipo === t ? '' : t)}
                className="accent-forest-600"
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-medium mb-2 text-sm">Origen</p>
        <div className="space-y-1">
          {origins.map((o) => (
            <label key={o} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="origen"
                checked={filters.origen === o}
                onChange={() => update('origen', filters.origen === o ? '' : o)}
                className="accent-forest-600"
              />
              {o}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-medium mb-2 text-sm">Nivel de tostión</p>
        <div className="flex flex-wrap gap-2">
          {roasts.map((r) => (
            <button
              key={r}
              onClick={() => update('tostion', filters.tostion === r ? '' : r)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                filters.tostion === r
                  ? 'bg-forest-600 text-cream-50 border-forest-600'
                  : 'border-coffee-300 text-coffee-700 dark:text-cream-200 dark:border-coffee-500'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
