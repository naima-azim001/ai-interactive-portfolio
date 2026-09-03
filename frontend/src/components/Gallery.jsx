import { useState } from 'react'
import { X, ImageOff } from 'lucide-react'

export default function Gallery({ images }) {
  const [active, setActive] = useState(null)
  const list = (images || []).filter(Boolean)

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-3">Project Gallery</h2>

      {list.length === 0 ? (
        <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center text-slate-500">
          <ImageOff size={32} className="mx-auto mb-2 text-slate-600" />
          <p>No images added yet.</p>
          <p className="text-xs mt-1">
            Images will appear here once you add them to this project's gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {list.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className="group overflow-hidden rounded-xl bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <img
                src={src}
                alt={`Project image ${idx + 1}`}
                loading="lazy"
                className="w-full h-40 sm:h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </button>
          ))}
        </div>
      )}

      {active !== null && list[active] && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            onClick={() => setActive(null)}
            aria-label="Close image"
          >
            <X size={32} />
          </button>
          <img
            src={list[active]}
            alt={`Project image ${active + 1}`}
            className="max-w-full max-h-[90vh] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
