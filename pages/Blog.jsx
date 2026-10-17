import { useState } from 'react'
import { motion } from 'framer-motion'
import { blogPosts, blogCategories } from '../data/blog'
import Seo from '../components/ui/Seo'

export default function Blog() {
  const [category, setCategory] = useState('todos')
  const filtered = category === 'todos' ? blogPosts : blogPosts.filter((p) => p.category === category)

  return (
    <div className="container-app py-14">
      <Seo
        title="Blog"
        description="Noticias del café colombiano, recetas de preparación y consejos para disfrutar cada taza al máximo."
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold">Blog Cafe Giles</h1>
        <p className="text-coffee-700/80 dark:text-cream-200/80 mt-2">Indicadores cafeteros, noticias y recetas de preparación</p>
      </div>

      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {blogCategories.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              category === c.key ? 'bg-forest-600 text-cream-50' : 'bg-coffee-100 dark:bg-forest-700 text-coffee-700 dark:text-cream-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((post) => (
          <motion.article
            key={post.id}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-forest-700 rounded-2xl overflow-hidden shadow-premium"
          >
            <div className="aspect-video bg-coffee-100 dark:bg-forest-600">
              <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <span className="text-xs uppercase tracking-wide text-forest-600 dark:text-coffee-300 font-semibold">
                {blogCategories.find((item) => item.key === post.category)?.label || post.category}
              </span>
              <h2 className="font-display font-semibold text-lg mt-2 mb-2">{post.title}</h2>
              <p className="text-sm text-coffee-700/80 dark:text-cream-200/80 line-clamp-2">{post.excerpt}</p>
              {post.indicator && (
                <p className="mt-4 rounded-xl bg-coffee-50 dark:bg-forest-800 p-3 text-sm font-semibold text-forest-700 dark:text-cream-100">
                  {post.indicator}
                </p>
              )}
              {(post.detail || post.ingredients) && (
                <details className="mt-4 text-sm text-coffee-700 dark:text-cream-200">
                  <summary className="cursor-pointer font-semibold text-forest-700 dark:text-coffee-300">
                    {post.ingredients ? 'Ver receta' : 'Leer resumen'}
                  </summary>
                  {post.detail && <p className="mt-3 leading-relaxed">{post.detail}</p>}
                  {post.ingredients && (
                    <>
                      <h3 className="font-semibold mt-3">Ingredientes</h3>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {post.ingredients.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                      <h3 className="font-semibold mt-3">Preparación</h3>
                      <ol className="list-decimal pl-5 mt-1 space-y-1">
                        {post.steps.map((step) => <li key={step}>{step}</li>)}
                      </ol>
                    </>
                  )}
                  {post.sourceUrl && (
                    <a href={post.sourceUrl} target="_blank" rel="noreferrer" className="inline-block mt-3 underline text-forest-700 dark:text-coffee-300">
                      {post.sourceLabel}
                    </a>
                  )}
                </details>
              )}
              <p className="text-xs text-coffee-500 dark:text-cream-300 mt-3">
                {new Date(post.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
