import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Trash2, Loader2 } from 'lucide-react'
import { sendChat } from '../api.js'

const EXAMPLE_QUESTIONS = [
  'What machine learning projects have you worked on?',
  'What research areas do you focus on?',
  'What technologies do you use?',
  'Which projects involve computer vision?',
]

const MAX_LENGTH = 500

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text) => {
    const message = (text ?? input).trim()
    if (!message || loading) return

    setMessages((prev) => [...prev, { role: 'user', content: message }])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const data = await sendChat(message)
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }])
    } catch (err) {
      let errorMsg
      if (err.response?.status === 429) {
        errorMsg = 'Rate limit reached. Please try again later.'
      } else if (err.response?.status === 503) {
        errorMsg = 'AI assistant is unavailable. Please make sure Ollama is running.'
      } else if (err.response?.status === 400) {
        errorMsg = 'Invalid message. Please try a different question.'
      } else {
        errorMsg = 'Something went wrong. Please try again.'
      }
      setError(errorMsg)
      setMessages((prev) => [
        ...prev,
        { role: 'error', content: errorMsg },
      ])
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    setError(null)
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-900 flex items-center justify-center shadow-lg transition-all"
        aria-label="Toggle AI chat"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[520px] bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-amber-600 px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-neutral-900">Portfolio Assistant</p>
              <p className="text-xs text-amber-900">Ask me about Naima's work</p>
            </div>
            <button
              onClick={clearChat}
              className="text-neutral-800 hover:text-neutral-900 transition-colors"
              title="Clear conversation"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0b1220]">
            {messages.length === 0 && !loading && (
              <div className="text-center py-6">
                <p className="text-slate-400 text-sm mb-4">
                  Ask me anything about Naima's portfolio!
                </p>
                <div className="space-y-2">
                  {EXAMPLE_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="w-full text-left text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-neutral-900 ml-8'
                    : msg.role === 'error'
                    ? 'bg-red-900/50 text-red-300 mr-8'
                    : 'bg-slate-800 text-slate-200 mr-8'
                } rounded-lg px-3 py-2 text-sm whitespace-pre-wrap`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-sm mr-8">
                <Loader2 size={16} className="animate-spin" />
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-slate-800 bg-slate-900">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_LENGTH))}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                maxLength={MAX_LENGTH}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading}
                className="px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-900 transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-slate-600 mt-1">
              {input.length}/{MAX_LENGTH} characters · AI answers only from approved portfolio content
            </p>
          </div>
        </div>
      )}
    </>
  )
}
