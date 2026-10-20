import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Timeline from './components/Timeline.jsx'
import Research from './components/Research.jsx'
import Publications from './components/Publications.jsx'
import SectionDivider from './components/SectionDivider.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Timeline />
      <SectionDivider />
      <Research />
      <SectionDivider />
      <Publications />
    </>
  )
}
