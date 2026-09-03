const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export function animateScrollTo(targetY, duration = 700) {
  const startY = window.pageYOffset
  const maxY = document.documentElement.scrollHeight - window.innerHeight
  const endY = Math.max(0, Math.min(targetY, maxY))
  const distance = endY - startY
  const startTime = performance.now()

  const step = (now) => {
    const elapsed = Math.min(1, (now - startTime) / duration)
    const eased = easeInOutCubic(elapsed)
    window.scrollTo(0, startY + distance * eased)
    if (elapsed < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

export function scrollToSection(sectionId, offset = 90) {
  const el = document.getElementById(sectionId)
  if (!el) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const rect = el.getBoundingClientRect()
  const targetY = window.pageYOffset + rect.top - offset
  animateScrollTo(targetY, 800)
}
