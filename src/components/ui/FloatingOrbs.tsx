export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="orb orb-1 absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue/20 blur-3xl" />
      <div className="orb orb-2 absolute -right-20 top-40 h-80 w-80 rounded-full bg-teal/15 blur-3xl" />
      <div className="orb orb-3 absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
      <div className="orb orb-4 absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
    </div>
  )
}
