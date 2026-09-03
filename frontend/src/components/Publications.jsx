import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { getPublications } from '../api.js'

export default function Publications() {
  const [publications, setPublications] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getPublications()
      .then(setPublications)
      .catch(() => setError('Could not load publications'))
  }, [])

  if (error) return <p className="text-red-400">{error}</p>

  return (
    <section id="publications" className="py-16">
      <h2 className="text-2xl font-bold text-white mb-8">Publications</h2>
      <div className="space-y-6">
        {publications.map((pub) => (
          <div key={pub.id} className="bg-slate-900 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">{pub.title}</h3>
            <p className="text-sm text-emerald-400 mb-2">{pub.authors}</p>
            <p className="text-sm text-slate-500 mb-3">
              {pub.venue} · {pub.year}
            </p>
            {pub.abstract && (
              <p className="text-sm text-slate-400 mb-4">{pub.abstract}</p>
            )}
            {(pub.publication_url || pub.doi) && (
              <a
                href={pub.publication_url || `https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300"
              >
                <ExternalLink size={16} /> View Publication
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
