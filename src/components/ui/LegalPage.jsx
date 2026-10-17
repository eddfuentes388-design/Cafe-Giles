import Seo from './Seo'

export default function LegalPage({ title, sections }) {
  return (
    <div className="container-app py-16 max-w-3xl">
      <Seo title={title} description={`${title} de Café Giles.`} />
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <div className="space-y-6">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-display text-xl font-semibold mb-2">{s.heading}</h2>
            <p className="text-coffee-700 dark:text-cream-200 leading-relaxed text-sm">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
