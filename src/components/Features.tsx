import { BadgeCheck, Brain, LayoutDashboard, Shield, TrendingDown, Zap } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'

export default function Features() {
  return (
    <section id="features" className="relative py-20 md:py-28" aria-labelledby="features-heading">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 grid-blueprint opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto">
          <SectionHeader
            badge="Platform Features"
            title="Everything you need to build — in one place"
            subtitle="A complete construction ecosystem powered by AI, designed for transparency and trust."
            light
          />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue/20 to-teal/10 p-8 ring-1 ring-white/10 md:col-span-2 lg:p-10">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue/10 blur-3xl transition-all group-hover:bg-blue/20" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue/20 px-4 py-1.5 text-xs font-semibold text-blue-200">
                  <Brain className="h-4 w-4" />
                  Core Technology
                </div>
                <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                  AI that plans like an architect — and prices like a contractor
                </h3>
                <p className="mt-4 leading-relaxed text-white/60">
                  Upload dimensions and photos; get floor plans, structural layouts, interior
                  suggestions, material lists, timelines, and itemized budgets in minutes.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {['Floor Plans', 'Budgets', 'Timelines', 'Material Lists'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 shrink-0 rounded-xl bg-gradient-to-br from-blue/40 to-teal/40" />
                  <div className="ai-shimmer h-1 w-10 rounded-full" />
                  <div className="h-20 flex-1 rounded-xl border border-white/20 bg-white/10 p-2">
                    <svg viewBox="0 0 80 60" className="h-full w-full">
                      <rect x="2" y="2" width="76" height="56" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                      <line x1="40" y1="2" x2="40" y2="58" stroke="#60a5fa" strokeWidth="1" />
                      <line x1="2" y1="30" x2="40" y2="30" stroke="#2dd4bf" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs font-medium text-teal-300">
                  Photo → AI Processing → Full Plan Package
                </p>
              </div>
            </div>
          </article>

          <article className="glass-card rounded-3xl p-8 transition-all duration-300">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal to-cyan-500 shadow-lg shadow-teal/30">
              <BadgeCheck className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-navy">Verified Professional Network</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Every architect, engineer, and contractor will be identity-verified, license-checked,
              and rated by real project owners.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Licensed', 'Background Checked', 'Skill Verified'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-teal/10 px-3 py-1.5 text-xs font-semibold text-teal-dark"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-warm-gray p-4">
              <p className="text-xs font-medium text-slate">Network Status</p>
              <p className="mt-1 font-mono text-2xl font-bold stat-zero">0</p>
              <p className="text-xs text-slate">Professionals onboarding at launch</p>
            </div>
          </article>

          <article className="glass-card rounded-3xl p-8 transition-all duration-300">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sage to-emerald-500 shadow-lg shadow-sage/30">
              <TrendingDown className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-navy">Real-Time Material Pricing</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Live price comparison across verified suppliers and wholesalers. No middleman markup.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-mist">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-navy to-navy-light">
                  <tr className="text-left text-xs text-white/70">
                    <th className="px-4 py-3">Material</th>
                    <th className="px-4 py-3">Market</th>
                    <th className="px-4 py-3">Wholesale</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  {[
                    { name: 'Cement 50kg', market: '₹380', wholesale: '₹328' },
                    { name: 'TMT Steel/t', market: '₹68,500', wholesale: '₹62,000' },
                    { name: 'Red Bricks/1k', market: '₹10,200', wholesale: '₹8,500' },
                  ].map((row) => (
                    <tr key={row.name} className="border-t border-mist">
                      <td className="px-4 py-3 text-slate">{row.name}</td>
                      <td className="px-4 py-3 text-slate line-through opacity-50">{row.market}</td>
                      <td className="px-4 py-3 font-semibold text-sage">{row.wholesale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="glass-card rounded-3xl p-8 transition-all duration-300 md:col-span-2">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-blue shadow-lg">
                  <LayoutDashboard className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-navy">
                  One Dashboard. Every Milestone.
                </h3>
                <p className="mt-3 leading-relaxed text-slate">
                  Track approvals, material deliveries, payments, and site progress from planning
                  through handover — all in one place.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Shield className="h-5 w-5 text-blue" />
                  <span className="text-sm text-slate">Bank-grade security & data protection</span>
                </div>
              </div>
              <div className="space-y-4 rounded-2xl bg-gradient-to-br from-warm-gray to-white p-6">
                {[
                  { label: 'Planning & Design', status: 'Ready' },
                  { label: 'Material Procurement', status: 'Ready' },
                  { label: 'Construction Tracking', status: 'Ready' },
                  { label: 'Payment Management', status: 'Ready' },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="h-4 w-4 text-teal" />
                      <span className="text-sm font-medium text-navy">{m.label}</span>
                    </div>
                    <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal-dark">
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
