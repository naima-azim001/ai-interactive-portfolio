import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getProjects = () => api.get('/projects/').then((r) => r.data)
export const getProjectBySlug = (slug) => api.get(`/projects/${slug}/`).then((r) => r.data)
export const getSkills = () => api.get('/skills/').then((r) => r.data)
export const getPublications = () => api.get('/publications/').then((r) => r.data)
export const getResearch = () => api.get('/research/').then((r) => r.data)
export const getTimeline = () => api.get('/timeline/').then((r) => r.data)
export const getEducation = () => api.get('/education/').then((r) => r.data)
export const sendChat = (message) => api.post('/ai/chat/', { message }).then((r) => r.data)
export const sendContact = (data) => api.post('/contact/', data).then((r) => r.data)

export default api
