import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { scrollToSection } from '../scroll.js'

export default function Navbar() {
  const links = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'research', label: 'Research' },
    { id: 'publications', label: 'Publications' },
  ]

  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e, id) => {
    e.preventDefault()
    setIsOpen(false)
    if (onHome) {
      scrollToSection(id)
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b1220]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-white" onClick={() => setIsOpen(false)}>
          <span className="text-amber-400">Portfolio</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleClick(e, link.id)}
              className="text-sm text-slate-400 hover:text-amber-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#0b1220]/95 backdrop-blur-md border-b border-slate-800">
          <div className="px-4 py-2 space-y-1">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                className="block px-3 py-2 text-sm text-slate-300 hover:text-amber-300 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
