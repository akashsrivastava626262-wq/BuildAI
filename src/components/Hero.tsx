import { ArrowRight, CheckCircle, Play, Sparkles, Zap } from 'lucide-react'
import FloatingOrbs from './ui/FloatingOrbs'
import { GradientText } from './ui/SectionHeader'
import { STATS } from '../constants'

const trustItems = [
  'AI-Powered Planning',
  'Wholesale Material Prices',
  'Verified Professionals',
  'End-to-End Tracking',
]

const marqueeItems = [
  'AI Floor Plans',
  'Budget Estimation',
  'Material Marketplace',
  'Verified Contractors',
  'Structural Design',
  'Timeline Planning',
  'Wholesale Pricing',
  'Project Dashboard',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="gradient-mesh absolute inset-0" />
      <div className="absolute inset-0 grid-blueprint opacity-30" />
      <FloatingOrbs />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 md:pt-44 lg:pb-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-white/90">
              <Sparkles className="h-4 w-4 text-teal-300" />
              <span>India&apos;s Next-Gen Construction Platform</span>
              <span className="rounded-full bg-teal/30 px-2 py-0.5 text-xs font-semibold text-teal-200">
                Launching Soon
              </span>
            </div>

            <h1 className="font-display mt-8 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              Build Your Dream{' '}
              <GradientText>With Confidence</GradientText>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              The all-in-one AI construction ecosystem — from architectural plans and budgets to
              verified professionals and wholesale materials. Transparent. Affordable. Stress-free.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#cta"
                className="btn-glow btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white"
              >
                Start Your Project
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#ai-demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <Play className="h-5 w-5" />
                Try AI Demo
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/80 ring-1 ring-white/10"
                >
                  <CheckCircle className="h-3.5 w-3.5 shrink-0 text-teal-300" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="font-mono text-3xl font-bold text-white">{STATS.projects}</p>
                <p className="text-sm text-white/50">Projects Completed</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-teal-300">{STATS.professionals}</p>
                <p className="text-sm text-white/50">Verified Professionals</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-white">{STATS.suppliers}</p>
                <p className="text-sm text-white/50">Material Suppliers</p>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-gold">Be the First</p>
                  <p className="text-xs text-white/50">Early access open</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-up relative lg:pl-8" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue/20 via-teal/20 to-cyan-500/20 blur-2xl" />

            <div className="relative gradient-border rounded-2xl p-1">
              <div className="rounded-2xl bg-navy-light/90 p-5 backdrop-blur-xl md:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-sage animate-pulse" />
                    <span className="text-xs font-medium uppercase tracking-wider text-white/60">
                      AI Project Command Center
                    </span>
                  </div>
                  <span className="rounded-full bg-teal/20 px-3 py-1 text-xs font-semibold text-teal-300 ring-1 ring-teal/30">
                    Preview
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/40">
                      Site Upload
                    </p>
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-blue/30 to-teal/20">
                      <div className="absolute inset-3 rounded border-2 border-dashed border-white/30" />
                      <div className="absolute bottom-2 left-2 rounded-md bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur">
                        12m × 8m
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/40">
                      AI Floor Plan
                    </p>
                    <div className="aspect-square rounded-lg bg-white/10 p-2">
                      <svg viewBox="0 0 100 100" className="h-full w-full">
                        <rect x="5" y="5" width="90" height="90" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                        <line x1="50" y1="5" x2="50" y2="95" stroke="#60a5fa" strokeWidth="1" />
                        <line x1="5" y1="50" x2="50" y2="50" stroke="#2dd4bf" strokeWidth="1" />
                        <rect x="55" y="55" width="35" height="35" fill="none" stroke="#2dd4bf" strokeWidth="1" />
                        <text x="25" y="30" fontSize="6" fill="#94a3b8" textAnchor="middle">Living</text>
                        <text x="25" y="72" fontSize="6" fill="#94a3b8" textAnchor="middle">Bedroom</text>
                        <text x="72" y="72" fontSize="6" fill="#94a3b8" textAnchor="middle">Kitchen</text>
                      </svg>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/40">
                      Live Pricing
                    </p>
                    <div className="space-y-2.5">
                      {[
                        { name: 'Cement', price: '₹328' },
                        { name: 'Steel', price: '₹62K' },
                        { name: 'Bricks', price: '₹8.5K' },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <span className="text-[10px] text-white/50">{item.name}</span>
                          <span className="font-mono text-[10px] font-medium text-teal-300">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-float absolute -bottom-6 -left-6 rounded-2xl glass px-5 py-4 shadow-2xl">
              <p className="text-xs text-white/60">Platform Status</p>
              <p className="font-display text-lg font-bold text-white">Launching Soon</p>
            </div>

            <div className="animate-float-reverse absolute -right-4 -top-4 rounded-2xl bg-white px-5 py-4 shadow-2xl">
              <p className="text-xs text-slate">AI Plans Generated</p>
              <p className="font-mono text-2xl font-bold stat-zero">{STATS.projects}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-navy/50 py-4 backdrop-blur-sm">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 gap-8 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-2 text-sm font-medium text-white/40"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-teal/60" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
