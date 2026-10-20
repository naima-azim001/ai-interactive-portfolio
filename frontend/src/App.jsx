import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout.jsx'

const Home = lazy(() => import('./Home.jsx'))
const ProjectDetail = lazy(() => import('./components/ProjectDetail.jsx'))
const NotFound = lazy(() => import('./components/NotFound.jsx'))

function LoadingFallback() {
  return (
    <div className="pt-32 pb-16 min-h-[60vh] flex items-center justify-center text-slate-400">
      Loading...
    </div>
  )
}

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

  return (
    <BrowserRouter basename={basename}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
