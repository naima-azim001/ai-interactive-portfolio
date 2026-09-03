import { useState } from 'react'
import { Send } from 'lucide-react'
import { sendContact } from '../api.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)
    setError(null)
    try {
      await sendContact(form)
      setStatus('Message sent successfully!')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      if (err.response?.status === 429) {
        setError('Too many requests. Please try again later.')
      } else if (err.response?.status === 400) {
        const detail = err.response.data
        setError(JSON.stringify(detail) || 'Please check your input.')
      } else {
        setError('Could not send message. Please try again.')
      }
    }
  }

  return (
    <section id="contact" className="py-16 pb-32">
      <h2 className="text-2xl font-bold text-white mb-8">Contact</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 bg-slate-900 p-6 rounded-xl">
        {status && (
          <div className="bg-cyan-900/50 text-cyan-300 px-4 py-3 rounded-lg text-sm">{status}</div>
        )}
        {error && (
          <div className="bg-red-900/50 text-red-300 px-4 py-3 rounded-lg text-sm">{error}</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            maxLength="100"
            value={form.name}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            maxLength="254"
            value={form.email}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          maxLength="200"
          value={form.subject}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
        />
        <textarea
          name="message"
          placeholder="Your message..."
          required
          maxLength="5000"
          rows="6"
          value={form.message}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
        >
          <Send size={16} /> Send Message
        </button>
      </form>
    </section>
  )
}
