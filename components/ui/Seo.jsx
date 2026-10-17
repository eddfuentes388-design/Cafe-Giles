import { useEffect } from 'react'

export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Café Giles` : 'Café Giles | Café Colombiano Premium'
    document.title = fullTitle

    const setMeta = (name, content, attr = 'name') => {
      if (!content) return
      let tag = document.querySelector(`meta[${attr}="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
  }, [title, description])

  return null
}
