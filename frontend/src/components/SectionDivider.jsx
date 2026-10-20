export default function SectionDivider() {
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <span className="h-1.5 w-1.5 rotate-45 bg-amber-500/70" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
    </div>
  )
}
