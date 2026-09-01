import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Connect your project',
    description:
      'Upload plot dimensions, photos, and project requirements. Our AI ingests your data in seconds.',
  },
  {
    num: '02',
    title: 'AI generates your plan',
    description:
      'Floor plans, structural designs, material lists, budgets, and timelines — all generated automatically.',
  },
  {
    num: '03',
    title: 'Optimize & procure',
    description:
      'Compare real-time material prices, select verified professionals, and purchase at wholesale rates.',
  },
  {
    num: '04',
    title: 'Build with intelligence',
    description:
      'Track every milestone, predict delays, manage payments, and monitor progress from one dashboard.',
  },
]

export default function ProcessSection() {
  const [active, setActive] = useState(0)

  return (
    <section id="process" className="section-light py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
              How It Works
            </p>
            <h2 className="headline-lg mt-4 text-gradient-light">
              From plot to keys —
              <br />
              fully automated
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Four steps. Zero guesswork. Enterprise-grade project intelligence from day one.
            </p>

            <div className="mt-12 space-y-2">
              {steps.map((step, i) => (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex w-full items-start gap-5 rounded-2xl p-5 text-left transition-all ${
                    active === i
                      ? 'bg-white shadow-lg ring-1 ring-black/5'
                      : 'hover:bg-white/60'
                  }`}
                >
                  <span
                    className={`font-mono text-sm font-medium ${
                      active === i ? 'text-accent' : 'text-text-subtle'
                    }`}
                  >
                    {step.num}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-text">{step.title}</p>
                    <p
                      className={`mt-1 text-sm ${
                        active === i ? 'text-text-muted' : 'text-text-subtle'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <a
              href="#cta"
              className="btn-accent mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative">
            <div className="sticky top-32 overflow-hidden rounded-3xl bg-ink p-8 md:p-10">
              <div className="absolute inset-0 grid-fine opacity-30" />
              <div className="relative">
                <p className="font-mono text-xs text-white/30">STEP {steps[active].num}</p>
                <h3 className="font-display mt-4 text-2xl font-semibold text-white">
                  {steps[active].title}
                </h3>
                <p className="mt-4 text-white/50">{steps[active].description}</p>

                <div className="mt-10 space-y-3">
                  {steps.map((s, i) => (
                    <div key={s.num} className="flex items-center gap-3">
                      <div
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i <= active ? 'bg-accent' : 'bg-white/10'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse-soft" />
                    <span className="text-xs text-white/50">AI Processing</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      'Analyzing plot dimensions',
                      'Generating structural model',
                      'Calculating material quantities',
                      'Optimizing cost estimate',
                    ]
                      .slice(0, active + 2)
                      .map((line) => (
                        <p key={line} className="font-mono text-xs text-white/40">
                          → {line}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
