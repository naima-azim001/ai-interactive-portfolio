import axios from 'axios'
import {
  fallbackProjects,
  fallbackProjectBySlug,
  fallbackSkills,
  fallbackPublications,
  fallbackResearch,
  fallbackTimeline,
} from './fallbackData.js'

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:8000/api' : '/api')

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
})

const withFallback = (request, fallback) => () =>
  request().catch(() => fallback())

export const getProjects = withFallback(
  () => api.get('/projects/').then((r) => r.data),
  fallbackProjects,
)

export const getProjectBySlug = (slug) =>
  api
    .get(`/projects/${slug}/`)
    .then((r) => r.data)
    .catch(() => {
      const project = fallbackProjectBySlug(slug)
      if (project) return project
      return Promise.reject(new Error('Project not found'))
    })

export const getSkills = withFallback(
  () => api.get('/skills/').then((r) => r.data),
  fallbackSkills,
)

export const getPublications = withFallback(
  () => api.get('/publications/').then((r) => r.data),
  fallbackPublications,
)

export const getResearch = withFallback(
  () => api.get('/research/').then((r) => r.data),
  fallbackResearch,
)

export const getTimeline = withFallback(
  () => api.get('/timeline/').then((r) => r.data),
  fallbackTimeline,
)

export const getEducation = () => api.get('/education/').then((r) => r.data)
export const sendChat = (message) => api.post('/ai/chat/', { message }).then((r) => r.data)
export const sendContact = (data) => api.post('/contact/', data).then((r) => r.data)

export default api
