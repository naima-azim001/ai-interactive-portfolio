import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="pt-32 pb-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl sm:text-8xl font-bold text-amber-400 mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Page Not Found</h2>
      <p className="text-slate-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-900 rounded-lg transition-colors"
      >
        Go Home
      </Link>
    </section>
  )
}
