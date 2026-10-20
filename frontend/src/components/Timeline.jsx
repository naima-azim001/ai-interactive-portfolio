import { useEffect, useState } from 'react'
import { getTimeline } from '../api.js'

export default function Timeline() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const activeDate = (item) => new Date(item.end_date || item.start_date)
    getTimeline()
      .then((data) => setItems([...data].sort((a, b) => activeDate(b) - activeDate(a))))
      .catch(() => setError('Could not load timeline'))
  }, [])

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <section id="timeline" className="py-8">
      <h2 className="text-2xl font-bold text-white mb-8">Timeline</h2>
      {error && <p className="text-slate-500 text-sm mb-6">{error}</p>}
      <div className="relative border-l border-slate-800 ml-4">
        {items.map((item) => (
          <div key={item.id} className="mb-8 pl-8 relative">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500" />
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <span className="text-sm text-slate-500">
                {formatDate(item.start_date)}
                {item.end_date ? ` - ${formatDate(item.end_date)}` : ' - Present'}
              </span>
            </div>
            {item.organization && (
              <p className="text-sm text-amber-400 mb-2">{item.organization}</p>
            )}
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-full capitalize">
              {item.item_type.replace('_', ' ')}
            </span>
            <p className="text-sm text-slate-400 mt-3">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
