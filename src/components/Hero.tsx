import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="hero-cinematic absolute inset-0" />
      <div className="hero-overlay absolute inset-0" />
      <div className="hero-overlay-side absolute inset-0 lg:block hidden" />
      <div className="absolute inset-0 grid-fine opacity-50" />

      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-24 pt-32 lg:px-8">
        <div className="max-w-3xl animate-fade-up">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright animate-pulse-soft" />
            AI-Powered Home Building Platform
            <span className="text-white/40">·</span>
            <span className="text-accent-bright">Launching Soon</span>
          </div>

          <h1 className="headline-xl text-white">
            The intelligence layer for{' '}
            <span className="text-gradient-accent">modern home construction</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            BuildFlow integrates AI across every stage of home building — from intelligent design
            and cost optimization to predictive project management and automated construction
            workflows.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#cta"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#demo"
              className="btn-secondary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base"
            >
              <Play className="h-4 w-4" />
              Book a Demo
            </a>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-10">
            {[
              { value: 'AI', label: 'Design Automation' },
              { value: 'Real-time', label: 'Cost Optimization' },
              { value: 'End-to-end', label: 'Project Intelligence' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-display text-lg font-semibold text-white">{item.value}</p>
                <p className="text-sm text-white/40">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </section>
  )
}
