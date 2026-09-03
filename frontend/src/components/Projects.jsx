import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Github, ExternalLink, Star, ChevronRight } from 'lucide-react'
import { getProjects } from '../api.js'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setError('Could not load projects'))
  }, [])

  if (error) return <p className="text-red-400">{error}</p>

  return (
    <section id="projects" className="py-16">
      <h2 className="text-2xl font-bold text-white mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate(`/projects/${project.slug}`)}
            className="bg-slate-900 rounded-xl p-6 hover:ring-1 hover:ring-emerald-500 transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                {project.title}
              </h3>
              {project.featured && (
                <span className="flex items-center gap-1 text-xs bg-emerald-600 text-white px-2 py-1 rounded-full">
                  <Star size={12} /> Featured
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300"
                  >
                    <Github size={16} /> GitHub
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300"
                  >
                    <ExternalLink size={16} /> Live
                  </a>
                )}
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-emerald-400 group-hover:text-emerald-300">
                Details <ChevronRight size={16} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
