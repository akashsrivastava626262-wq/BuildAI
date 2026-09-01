import { ArrowRight, CheckCircle, Home, Play, Sparkles } from 'lucide-react'
import HouseIllustration from './ui/HouseIllustration'
import { GradientText } from './ui/SectionHeader'
import { STATS } from '../constants'

const trustItems = [
  'AI Home Planning',
  'Wholesale Materials',
  'Verified Builders',
  'Budget Transparency',
]

const marqueeItems = [
  '🏠 Dream Homes',
  '🏗️ Villa Construction',
  '📐 AI Floor Plans',
  '🧱 Cement & Steel Prices',
  '👷 Verified Contractors',
  '🏢 Commercial Buildings',
  '🌿 Room Additions',
  '💰 Budget Planning',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="hero-home-bg absolute inset-0" />
      <div className="absolute inset-0 texture-brick opacity-40" />
      <div className="absolute inset-0 texture-blueprint opacity-50" />
      <div className="absolute inset-0 home-silhouette-pattern" />

      {/* Warm decorative blobs */}
      <div className="orb-1 absolute -left-20 top-32 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl" />
      <div className="orb-2 absolute -right-16 top-48 h-64 w-64 rounded-full bg-teal/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:pt-40 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/20 bg-white/80 px-4 py-2 text-sm shadow-sm backdrop-blur-sm">
              <Home className="h-4 w-4 text-terracotta" />
              <span className="font-medium text-navy">Your Home, Built Right</span>
              <span className="rounded-full bg-teal/15 px-2.5 py-0.5 text-xs font-bold text-teal-dark">
                Launching Soon
              </span>
            </div>

            <h1 className="font-display mt-7 text-4xl font-bold leading-[1.1] tracking-tight text-navy md:text-5xl lg:text-[3.5rem]">
              Turn Your Plot Into a{' '}
              <GradientText>Dream Home</GradientText>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
              Planning a home shouldn&apos;t be stressful. Get AI-generated floor plans, real material
              prices, and connect with verified architects &amp; contractors — all from one trusted
              platform.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#cta"
                className="btn-glow btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white"
              >
                Plan My Home
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#ai-demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-terracotta/30 bg-white/80 px-8 py-4 text-base font-semibold text-terracotta shadow-sm backdrop-blur-sm transition-all hover:border-terracotta hover:bg-white"
              >
                <Play className="h-5 w-5" />
                Try AI Planner
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-mist/80 bg-white/70 px-3 py-2.5 text-xs font-medium text-navy shadow-sm backdrop-blur-sm"
                >
                  <CheckCircle className="h-3.5 w-3.5 shrink-0 text-teal" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-6 border-t border-terracotta/15 pt-8">
              <div>
                <p className="font-mono text-3xl font-bold stat-zero">{STATS.projects}</p>
                <p className="text-sm text-slate">Homes Built</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold stat-zero">{STATS.professionals}</p>
                <p className="text-sm text-slate">Verified Builders</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold stat-zero">{STATS.suppliers}</p>
                <p className="text-sm text-slate">Material Suppliers</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-teal/10 px-4 py-2">
                <Sparkles className="h-5 w-5 text-teal" />
                <div>
                  <p className="text-sm font-bold text-teal-dark">Be the First</p>
                  <p className="text-xs text-slate">Early access open</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-up relative" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-terracotta/15 via-gold/10 to-teal/15 blur-2xl" />

            <div className="relative gradient-border rounded-3xl p-1">
              <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-terracotta/10">
                <HouseIllustration className="w-full" />

                <div className="border-t border-mist bg-gradient-to-r from-cream to-sand p-5">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Plot Size', value: '12m × 10m' },
                      { label: 'Est. Budget', value: 'AI Generated' },
                      { label: 'Timeline', value: '16–20 wks' },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl bg-white p-3 text-center shadow-sm ring-1 ring-mist">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate">
                          {item.label}
                        </p>
                        <p className="mt-1 font-mono text-xs font-bold text-navy">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-float absolute -bottom-5 -left-5 rounded-2xl border border-mist bg-white px-5 py-4 shadow-xl">
              <p className="text-xs text-slate">🏠 Home Plans</p>
              <p className="font-mono text-2xl font-bold stat-zero">{STATS.projects}</p>
              <p className="text-[10px] text-slate">Launching soon</p>
            </div>

            <div className="animate-float-reverse absolute -right-3 top-8 rounded-2xl border border-teal/20 bg-teal/10 px-5 py-3 shadow-lg backdrop-blur-sm">
              <p className="text-xs font-semibold text-teal-dark">✓ AI Verified Plans</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-terracotta/10 bg-white/60 py-4 backdrop-blur-sm">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 gap-10 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={`${item}-${i}`} className="text-sm font-medium text-slate">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
