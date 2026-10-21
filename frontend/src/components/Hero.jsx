import { Mail, MapPin, Download, Github, Linkedin } from 'lucide-react'

export default function Hero() {
  return (
    <section id="top" className="pt-32 pb-8">
      <div className="flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-5xl font-bold text-neutral-900 mb-6 shadow-lg shadow-amber-500/20">
          NA
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Naima Azim
        </h1>
        <p className="text-xl text-amber-400 mb-2">
          Software Engineer
        </p>
        <p className="max-w-2xl text-slate-400 mb-6">
          MSc graduate in Computer Science specializing in Data Science and a Software Engineer
          with experience developing custom Odoo ERP modules and software solutions. Skilled in Python,
          Odoo, SQL, and modern software development practices.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 mb-6">
          <span className="flex items-center gap-2">
            <MapPin size={16} className="text-amber-500" /> Dhaka, Bangladesh
          </span>
          <span className="flex items-center gap-2">
            <Mail size={16} className="text-amber-500" /> naimaazim2@gmail.com
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/naima-azim001"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/naima-azim-9b7868416"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
          <a
            href="/portfolio/assets/Naima Azim CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-900 rounded-lg transition-colors"
          >
            <Download size={18} /> Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}
