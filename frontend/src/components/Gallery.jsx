import { useState } from 'react'
import { X, ImageOff, Play } from 'lucide-react'

const isVideo = (src) => {
  if (!src) return false
  const lower = src.toLowerCase()
  return lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov')
}

export default function Gallery({ images, layout = 'phones' }) {
  const [active, setActive] = useState(null)
  const [dims, setDims] = useState({})
  const list = (images || []).filter(Boolean)

  const setDim = (idx, w, h) =>
    setDims((d) => (d[idx] ? d : { ...d, [idx]: { w, h } }))

  const renderMedia = (src, idx, imgClassName, contain = false) => {
    if (isVideo(src)) {
      return (
        <>
          <video
            src={src}
            muted
            playsInline
            onLoadedMetadata={(e) =>
              setDim(idx, e.currentTarget.videoWidth, e.currentTarget.videoHeight)
            }
            className={`${imgClassName} object-cover`}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="w-12 h-12 rounded-full bg-amber-500/90 flex items-center justify-center">
              <Play size={24} className="text-neutral-900 ml-1" />
            </div>
          </div>
        </>
      )
    }
    return (
      <img
        src={src}
        alt={`Project image ${idx + 1}`}
        loading="lazy"
        onLoad={(e) =>
          setDim(idx, e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)
        }
        className={`${imgClassName} ${contain ? 'object-contain' : 'object-cover'} transition-transform duration-300 group-hover:scale-105`}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    )
  }

  const showcase = layout === 'showcase'

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
      ) : showcase ? (
        <div>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => setActive(0)}
              className="group flex-1 min-w-0 h-64 md:h-[26rem] overflow-hidden rounded-xl border border-slate-700 bg-black shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 relative"
            >
              {renderMedia(list[0], 0, 'w-full h-full', true)}
            </button>
            {list[1] && (
              <button
                onClick={() => setActive(1)}
                className="group w-full md:w-72 lg:w-80 h-64 md:h-[26rem] shrink-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 relative"
              >
                {renderMedia(list[1], 1, 'w-full h-full object-cover')}
              </button>
            )}
          </div>
          {list.length > 2 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {list.slice(2).map((src, i) => {
                const idx = i + 2
                return (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    className="group aspect-video overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 relative"
                  >
                    {renderMedia(src, idx, 'w-full h-full object-cover')}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap items-start gap-5">
          {list.map((src, idx) => {
            const d = dims[idx]
            const wide = d && d.w >= d.h

            return (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                style={wide ? { aspectRatio: `${d.w} / ${d.h}` } : undefined}
                className={
                  wide
                    ? 'group w-72 sm:w-96 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 relative'
                    : 'group w-40 sm:w-44 aspect-[9/19.5] overflow-hidden rounded-[1.75rem] border border-slate-700 bg-slate-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 relative'
                }
              >
                {renderMedia(src, idx, 'w-full h-full object-cover')}
              </button>
            )
          })}
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
            aria-label="Close"
          >
            <X size={32} />
          </button>
          {isVideo(list[active]) ? (
            <video
              src={list[active]}
              controls
              autoPlay
              className="max-w-full max-h-[90vh] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={list[active]}
              alt={`Project image ${active + 1}`}
              className="max-w-full max-h-[90vh] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  )
}
