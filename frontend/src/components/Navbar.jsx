import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../scroll.js'

export default function Navbar() {
  const links = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'research', label: 'Research' },
    { id: 'publications', label: 'Publications' },
    { id: 'contact', label: 'Contact' },
  ]

  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  const handleClick = (e, id) => {
    e.preventDefault()
    if (onHome) {
      scrollToSection(id)
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-white">
          Naima<span className="text-cyan-400">.Azim</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              onClick={(e) => handleClick(e, link.id)}
              className="text-sm text-slate-400 hover:text-cyan-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
