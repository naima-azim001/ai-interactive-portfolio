import { useEffect, useState } from 'react'
import { getSkills } from '../api.js'

const categoryOrder = [
  'Programming',
  'AI/ML',
  'Frontend',
  'Backend',
  'Databases',
  'Tools',
]

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [grouped, setGrouped] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getSkills()
      .then((data) => {
        setSkills(data)
        const groups = categoryOrder
          .map((cat) => ({
            category: cat,
            items: data
              .filter((s) => s.category === cat)
              .sort((a, b) => b.proficiency - a.proficiency),
          }))
          .filter((g) => g.items.length > 0)
        setGrouped(groups)
      })
      .catch(() => setError('Could not load skills'))
  }, [])

  return (
    <section id="skills" className="py-8">
      <h2 className="text-2xl font-bold text-white mb-8">Technical Skills</h2>
      {error && <p className="text-slate-500 text-sm mb-6">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {grouped.map((group) => (
          <div key={group.category} className="bg-slate-900 rounded-xl p-6">
            <h3 className="text-amber-400 font-semibold mb-4">{group.category}</h3>
            <div className="space-y-3">
              {group.items.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-300">{skill.name}</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
