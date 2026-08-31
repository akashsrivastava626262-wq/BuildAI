import { ArrowRight, CheckCircle, Play } from 'lucide-react'

const trustItems = [
  'Verified pros',
  'Wholesale prices',
  'AI estimates',
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 grid-blueprint" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef2ff]/60 via-warm-white to-warm-white" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fade-up">
          <span className="inline-flex items-center rounded-full bg-teal/10 px-4 py-1.5 text-sm font-medium text-teal">
            AI-Powered Construction Platform
          </span>

          <h1 className="font-display mt-6 text-4xl font-bold leading-tight tracking-tight text-navy md:text-5xl lg:text-[3.5rem]">
            Build your home with clarity — not chaos.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
            From floor plans to final brick, get AI-generated designs, real wholesale material
            prices, and verified architects and contractors in one place. No more guesswork. No
            more inflated quotes.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#cta"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-dark"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue px-7 py-3.5 text-base font-semibold text-blue transition-colors hover:bg-blue/5"
            >
              <Play className="h-5 w-5" />
              See How It Works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {trustItems.map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-slate">
                <CheckCircle className="h-4 w-4 text-teal" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-8 border-t border-mist pt-8">
            <div>
              <p className="font-mono text-2xl font-medium text-navy">2,400+</p>
              <p className="text-sm text-slate">projects planned</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-medium text-teal">₹12L</p>
              <p className="text-sm text-slate">avg. savings per home</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-medium text-navy">500+</p>
              <p className="text-sm text-slate">verified professionals</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-up relative" style={{ animationDelay: '0.15s' }}>
          <div className="rounded-2xl border border-mist bg-white p-4 shadow-xl shadow-navy/8 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-slate">
                AI Project Dashboard
              </span>
              <span className="rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal">
                Live
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-warm-gray p-3">
                <p className="mb-2 text-xs font-medium text-slate">Uploaded Space</p>
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-blue/20 to-teal/20">
                  <div className="absolute inset-4 border-2 border-dashed border-blue/40 rounded" />
                  <div className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-0.5 font-mono text-[10px] text-navy">
                    12m × 8m
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-warm-gray p-3">
                <p className="mb-2 text-xs font-medium text-slate">AI Floor Plan</p>
                <div className="relative aspect-square rounded-lg bg-white p-2">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <rect x="5" y="5" width="90" height="90" fill="none" stroke="#2D6CDF" strokeWidth="1.5" />
                    <line x1="50" y1="5" x2="50" y2="95" stroke="#2D6CDF" strokeWidth="1" />
                    <line x1="5" y1="50" x2="50" y2="50" stroke="#2D6CDF" strokeWidth="1" />
                    <rect x="55" y="55" width="35" height="35" fill="none" stroke="#0D9488" strokeWidth="1" />
                    <text x="25" y="30" fontSize="6" fill="#5C6678" textAnchor="middle">Living</text>
                    <text x="25" y="72" fontSize="6" fill="#5C6678" textAnchor="middle">Bedroom</text>
                    <text x="72" y="72" fontSize="6" fill="#5C6678" textAnchor="middle">Kitchen</text>
                  </svg>
                </div>
              </div>

              <div className="rounded-xl bg-warm-gray p-3 md:col-span-1">
                <p className="mb-2 text-xs font-medium text-slate">Budget Breakdown</p>
                <div className="space-y-2">
                  {[
                    { name: 'Cement', wholesale: 328, retail: 380 },
                    { name: 'Steel', wholesale: 62000, retail: 68500 },
                    { name: 'Bricks', wholesale: 8500, retail: 10200 },
                  ].map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate">{item.name}</span>
                        <span className="font-mono text-sage">₹{item.wholesale.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-mist">
                        <div
                          className="h-full rounded-full bg-sage"
                          style={{ width: `${(item.wholesale / item.retail) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-xl border border-mist bg-white px-4 py-3 shadow-lg">
            <p className="text-xs text-slate">You save</p>
            <p className="font-mono text-lg font-medium text-sage">₹4.2L</p>
          </div>
        </div>
      </div>
    </section>
  )
}
