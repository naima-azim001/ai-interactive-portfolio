import { Mail, MapPin } from 'lucide-react'

export default function Hero() {
  return (
    <section id="top" className="pt-32 pb-16">
      <div className="flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-5xl font-bold text-white mb-6 shadow-lg shadow-cyan-500/20">
          NA
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Naima Azim
        </h1>
        <p className="text-xl text-cyan-400 mb-2">
          Data Scientist & Full-Stack Developer
        </p>
        <p className="max-w-2xl text-slate-400 mb-6">
          MSc graduate in Computer Science specializing in Data Science and a Junior Software Engineer
          with experience developing AI-driven software solutions, machine learning applications,
          and full-stack systems.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 mb-8">
          <span className="flex items-center gap-2">
            <MapPin size={16} className="text-cyan-500" /> Uttara, Dhaka, Bangladesh
          </span>
          <span className="flex items-center gap-2">
            <Mail size={16} className="text-cyan-500" /> naimaazim2@gmail.com
          </span>
        </div>
        <div className="flex gap-4">
          <a
            href="#contact"
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
          >
            Get in Touch
          </a>
          <a
            href="#projects"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  )
}
