import { ArrowRight, CheckCircle, Home, Play, Sparkles } from 'lucide-react'
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
      {/* Luxury home photo background */}
      <div className="hero-luxury-bg absolute inset-0 scale-105" />
      <div className="hero-luxury-overlay absolute inset-0" />
      <div className="hero-luxury-glow absolute inset-0" />

      {/* Subtle vignette at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:pt-40 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content — over dark overlay */}
          <div className="animate-fade-up max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 text-sm text-white/90">
              <Home className="h-4 w-4 text-gold" />
              <span className="font-medium">Luxury Home Building, Simplified</span>
              <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-bold text-gold">
                Launching Soon
              </span>
            </div>

            <h1 className="font-display mt-7 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
              Build a Home You&apos;re{' '}
              <GradientText>Proud Of</GradientText>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Modern architecture. Transparent pricing. AI-powered plans. Connect with verified
              builders and buy materials at wholesale — all from one trusted platform.
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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <Play className="h-5 w-5" />
                Try AI Planner
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl glass-dark px-3 py-2.5 text-xs font-medium text-white/85"
                >
                  <CheckCircle className="h-3.5 w-3.5 shrink-0 text-gold" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-6 border-t border-white/15 pt-8">
              <div>
                <p className="font-mono text-3xl font-bold text-white">{STATS.projects}</p>
                <p className="text-sm text-white/50">Homes Built</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-gold">{STATS.professionals}</p>
                <p className="text-sm text-white/50">Verified Builders</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-white">{STATS.suppliers}</p>
                <p className="text-sm text-white/50">Material Suppliers</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl glass-dark px-4 py-2">
                <Sparkles className="h-5 w-5 text-gold" />
                <div>
                  <p className="text-sm font-bold text-gold">Be the First</p>
                  <p className="text-xs text-white/50">Early access open</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — floating info cards over the visible house */}
          <div className="animate-fade-up relative hidden lg:block" style={{ animationDelay: '0.15s' }}>
            <div className="ml-auto max-w-sm space-y-4">
              <div className="glass-dark-card rounded-2xl p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                  AI Home Planner
                </p>
                <p className="font-display mt-2 text-2xl font-bold text-white">
                  Your plot → Dream home
                </p>
                <p className="mt-2 text-sm text-white/60">
                  Upload dimensions, get floor plans, budgets &amp; timelines in minutes.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { label: 'Plot', value: '12×10m' },
                    { label: 'Budget', value: 'AI Est.' },
                    { label: 'Timeline', value: '16 wks' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-white/10 p-3 text-center ring-1 ring-white/10">
                      <p className="text-[10px] uppercase tracking-wider text-white/40">{item.label}</p>
                      <p className="mt-1 font-mono text-xs font-bold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-float flex items-center gap-4 rounded-2xl glass-dark-card p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20 text-2xl">
                  🏠
                </div>
                <div>
                  <p className="text-xs text-white/50">Platform Status</p>
                  <p className="font-display text-lg font-bold text-white">Launching Soon</p>
                </div>
              </div>

              <div className="animate-float-reverse rounded-2xl border border-gold/30 bg-gold/10 px-5 py-3 backdrop-blur-sm">
                <p className="text-xs font-semibold text-gold">✓ Premium AI-Verified Plans</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/40 py-4 backdrop-blur-md">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 gap-10 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={`${item}-${i}`} className="text-sm font-medium text-white/50">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
