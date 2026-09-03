export default function About() {
  return (
    <section id="about" className="py-16">
      <h2 className="text-2xl font-bold text-white mb-8">About Me</h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        MSc graduate in Computer Science specializing in Data Science and a Junior Software Engineer
        with experience developing AI-driven software solutions, machine learning applications,
        and full-stack systems. Skilled in Python, Odoo, SQL, and modern software development practices,
        with hands-on experience designing intelligent applications.
      </p>
      <p className="text-slate-400 leading-relaxed mb-6">
        Strong analytical and problem-solving abilities, complemented by research experience in digital
        twins, physics-informed machine learning, and predictive analytics. Passionate about building
        scalable, reliable, and impactful software that bridges research and industry.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-cyan-400 font-semibold mb-3">Expertise</h3>
          <ul className="text-slate-400 space-y-2">
            <li>• Website Design</li>
            <li>• Android GUI Design</li>
            <li>• Odoo ERP Development</li>
          </ul>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-cyan-400 font-semibold mb-3">Soft Skills</h3>
          <ul className="text-slate-400 space-y-2">
            <li>• Teamwork</li>
            <li>• Communication</li>
            <li>• Problem Solving</li>
            <li>• Punctuality</li>
          </ul>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-cyan-400 font-semibold mb-3">Languages</h3>
          <ul className="text-slate-400 space-y-2">
            <li>• Bengali (Native)</li>
            <li>• English (Fluent)</li>
            <li>• French (Basic - learning)</li>
            <li>• Finnish (Basic - learning)</li>
          </ul>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-cyan-400 font-semibold mb-3">Interests</h3>
          <ul className="text-slate-400 space-y-2">
            <li>• Sketching</li>
            <li>• Swimming</li>
            <li>• Researching</li>
            <li>• Mathematics</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
