import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import AIChat from './AIChat.jsx'
import { scrollToSection } from '../scroll.js'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => scrollToSection(id, 90), 100)
      } else {
        window.scrollTo(0, 0)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-800 py-8 mt-12 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Naima Azim · Built with React, Django & local AI
      </footer>
      <AIChat />
    </div>
  )
}
