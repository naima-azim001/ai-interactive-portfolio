import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { getResearch } from '../api.js'

export default function Research() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getResearch()
      .then(setItems)
      .catch(() => setError('Could not load research'))
  }, [])

  return (
    <section id="research" className="py-8">
      <h2 className="text-2xl font-bold text-white mb-8">Research</h2>
      {error && <p className="text-slate-500 text-sm mb-6">{error}</p>}
      <div className="grid grid-cols-1 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-900 rounded-xl p-6 hover:ring-1 hover:ring-amber-500 transition-all">
            <div className="flex flex-wrap items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <span className="text-xs bg-amber-500 text-neutral-900 px-2 py-1 rounded-full">
                {item.status}
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-3">{item.description}</p>
            {item.methodology && (
              <p className="text-sm text-slate-500 mb-3">
                <span className="text-slate-300 font-medium">Methodology: </span>
                {item.methodology}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((tech) => (
                <span key={tech} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
