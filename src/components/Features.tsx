import { BadgeCheck, Brain, Home, LayoutDashboard, TrendingDown } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import { STATS } from '../constants'

export default function Features() {
  return (
    <section id="features" className="relative py-20 md:py-28" aria-labelledby="features-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light to-teal-dark" />
      <div className="absolute inset-0 texture-blueprint opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto">
          <SectionHeader
            badge="Platform Features"
            title="Everything to build your home — in one place"
            subtitle="From the first blueprint to the last brick, we've got your family's home covered."
            light
          />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-terracotta/20 to-gold/10 p-8 ring-1 ring-white/10 md:col-span-2 lg:p-10">
            <div className="absolute -right-16 -top-16 text-[120px] opacity-5">🏠</div>
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-gold">
                  <Brain className="h-4 w-4" />
                  AI Home Planner
                </div>
                <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                  AI that designs your home — and prices every brick
                </h3>
                <p className="mt-4 leading-relaxed text-white/65">
                  Upload your plot photo and dimensions. Get a complete floor plan, 3D layout,
                  material list, labour estimate, and timeline — in minutes, not weeks.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Floor Plans', '3D Layout', 'Material List', 'Budget', 'Timeline'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-terracotta/30 text-2xl">
                    📷
                  </div>
                  <div className="ai-shimmer h-1 flex-1 rounded-full" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-teal/30 text-2xl">
                    🏠
                  </div>
                </div>
                <p className="mt-4 text-center text-xs font-medium text-gold">
                  Plot Photo → AI Design → Complete Home Plan
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:bg-white/10">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal to-teal-dark shadow-lg">
              <BadgeCheck className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">Verified Home Builders</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Architects, engineers, and contractors — all verified, licensed, and rated by real
              homeowners.
            </p>
            <div className="mt-6 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-xs text-white/50">Builders on platform</p>
              <p className="font-mono text-3xl font-bold text-gold">{STATS.professionals}</p>
              <p className="text-xs text-white/40">Onboarding at launch</p>
            </div>
          </article>

          <article className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:bg-white/10">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sage to-teal shadow-lg">
              <TrendingDown className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">Wholesale Material Prices</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              See live prices for cement, steel, bricks, tiles — and buy direct from verified
              suppliers at wholesale rates.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5">
                  <tr className="text-left text-xs text-white/50">
                    <th className="px-4 py-2.5">Material</th>
                    <th className="px-4 py-2.5">Retail</th>
                    <th className="px-4 py-2.5">Wholesale</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs text-white/80">
                  {[
                    { name: 'Cement 50kg', retail: '₹380', wholesale: '₹328' },
                    { name: 'TMT Steel/t', retail: '₹68,500', wholesale: '₹62,000' },
                    { name: 'Bricks/1000', retail: '₹10,200', wholesale: '₹8,500' },
                  ].map((row) => (
                    <tr key={row.name} className="border-t border-white/5">
                      <td className="px-4 py-2.5">{row.name}</td>
                      <td className="px-4 py-2.5 line-through opacity-40">{row.retail}</td>
                      <td className="px-4 py-2.5 font-semibold text-gold">{row.wholesale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm md:col-span-2">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-terracotta shadow-lg">
                  <LayoutDashboard className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Track Your Home Build — Every Step
                </h3>
                <p className="mt-3 leading-relaxed text-white/60">
                  Foundation poured? Roof done? Tiles laid? See every milestone, payment, and
                  delivery in one beautiful dashboard.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <Home className="h-5 w-5 text-gold" />
                  <span className="text-sm text-white/60">Built for homeowners, not contractors</span>
                </div>
              </div>
              <div className="space-y-3 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                {[
                  { label: '🏗️ Foundation & Structure', status: 'Ready' },
                  { label: '🧱 Walls & Roofing', status: 'Ready' },
                  { label: '🎨 Interiors & Finishing', status: 'Ready' },
                  { label: '✅ Handover & Keys', status: 'Ready' },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between">
                    <span className="text-sm text-white/80">{m.label}</span>
                    <span className="rounded-full bg-teal/20 px-3 py-1 text-xs font-semibold text-teal-300">
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
