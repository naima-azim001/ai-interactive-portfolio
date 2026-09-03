import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Github, ExternalLink, Star, Calendar, ArrowRight } from 'lucide-react'
import { getProjectBySlug, getProjects } from '../api.js'
import Gallery from './Gallery.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [related, setRelated] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    setProject(null)
    setError(null)
    setRelated([])

    getProjectBySlug(slug)
      .then((data) => {
        setProject(data)
        return getProjects().then((all) => ({ all, current: data }))
      })
      .then(({ all, current }) => {
        const others = all.filter((p) => p.id !== current.id)
        const scored = others.map((p) => {
          const shared = p.technologies.filter((t) => current.technologies.includes(t)).length
          return { project: p, score: shared }
        })
        scored.sort((a, b) => b.score - a.score)
        setRelated(
          scored
            .filter((s) => s.score > 0)
            .slice(0, 3)
            .map((s) => s.project)
        )
      })
      .catch(() => setError('Could not load this project.'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  if (error) {
    return (
      <div className="pt-32 pb-16 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <Link to="/" className="text-cyan-400 hover:text-cyan-300">
          ← Back to projects
        </Link>
      </div>
    )
  }

  if (!project) {
    return <div className="pt-32 pb-16 text-center text-slate-400">Loading project...</div>
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <div className="pt-32 pb-16">
      <Link to="/#projects" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-cyan-300 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <div className="bg-slate-900 rounded-2xl p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{project.title}</h1>
          {project.featured && (
            <span className="flex items-center gap-1 text-xs bg-cyan-600 text-white px-2 py-1 rounded-full">
              <Star size={12} /> Featured
            </span>
          )}
        </div>

        <p className="text-slate-400 mb-4">{project.description}</p>

        {(project.start_date || project.end_date) && (
          <p className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Calendar size={16} />
            {formatDate(project.start_date)}
            {project.end_date ? ` — ${formatDate(project.end_date)}` : ' — Present'}
          </p>
        )}

        <div className="flex flex-wrap gap-4 mb-8">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              <Github size={18} /> View on GitHub
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
            >
              <ExternalLink size={18} /> Live Demo
            </a>
          )}
        </div>

        <div className="mb-8">
          <Gallery images={project.gallery} />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs bg-slate-800 text-cyan-300 px-3 py-1.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.long_description && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">About this project</h2>
            <p className="text-slate-400 leading-relaxed">{project.long_description}</p>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.slug}`}
                className="bg-slate-900 rounded-xl p-6 hover:ring-1 hover:ring-cyan-500 transition-all group"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 mb-3 line-clamp-2">{p.description}</p>
                <span className="inline-flex items-center gap-1 text-sm text-cyan-400 group-hover:text-cyan-300">
                  View details <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
