import { BadgeCheck, Brain, LayoutDashboard, TrendingDown } from 'lucide-react'

export default function Features() {
  return (
    <section id="features" className="bg-warm-gray py-16 md:py-20" aria-labelledby="features-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="features-heading"
            className="font-display text-3xl font-semibold text-navy md:text-4xl"
          >
            Everything you need. Nothing you don&apos;t.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* AI Design - spans full width on md */}
          <article className="rounded-2xl border border-mist bg-white p-8 md:col-span-2">
            <div className="mb-1 h-1 w-16 rounded-full bg-gradient-to-r from-blue to-teal" />
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10">
                  <Brain className="h-6 w-6 text-blue" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-navy">
                  AI that plans like an architect — and prices like a contractor
                </h3>
                <p className="mt-3 leading-relaxed text-slate">
                  Upload dimensions and photos; get floor plans, structural layouts, interior
                  suggestions, material lists, timelines, and itemized budgets in minutes.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-xl bg-warm-gray p-6">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 shrink-0 rounded-lg bg-gradient-to-br from-blue/30 to-teal/30" />
                  <div className="ai-shimmer h-1 w-8 rounded" />
                  <div className="h-20 flex-1 rounded-lg border border-blue/30 bg-white p-2">
                    <svg viewBox="0 0 80 60" className="h-full w-full">
                      <rect x="2" y="2" width="76" height="56" fill="none" stroke="#2D6CDF" strokeWidth="1.5" />
                      <line x1="40" y1="2" x2="40" y2="58" stroke="#2D6CDF" strokeWidth="1" />
                      <line x1="2" y1="30" x2="40" y2="30" stroke="#0D9488" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs font-medium text-blue">
                  Photo → AI Processing → Full Plan Package
                </p>
              </div>
            </div>
          </article>

          {/* Verified Pros */}
          <article className="rounded-2xl border border-mist bg-white p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10">
              <BadgeCheck className="h-6 w-6 text-teal" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy">
              Build with pros you can trust
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Every architect, engineer, and contractor is identity-verified, license-checked, and
              rated by real project owners.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { name: 'Ravi K.', role: 'Architect', spec: 'Residential' },
                { name: 'Meera D.', role: 'Contractor', spec: 'Commercial' },
              ].map((pro) => (
                <div key={pro.name} className="flex items-center gap-3 rounded-lg bg-warm-gray p-3">
                  <div className="h-10 w-10 rounded-full bg-navy/10" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-navy">{pro.name}</p>
                    <p className="text-xs text-slate">
                      {pro.role} · {pro.spec}
                    </p>
                  </div>
                  <span className="text-xs text-amber-500">★ 4.9</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Licensed', 'Background Checked', 'Project-Verified'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
          </article>

          {/* Real-time Pricing */}
          <article className="rounded-2xl border border-mist bg-white p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sage/10">
              <TrendingDown className="h-6 w-6 text-sage" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy">
              See what cement, steel, and bricks actually cost — right now
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Live price comparison across verified suppliers and wholesalers. No middleman markup.
            </p>
            <div className="mt-6 overflow-hidden rounded-lg border border-mist">
              <table className="w-full text-sm">
                <thead className="bg-warm-gray">
                  <tr className="text-left text-xs text-slate">
                    <th className="px-4 py-2">Material</th>
                    <th className="px-4 py-2">Supplier A</th>
                    <th className="px-4 py-2">Supplier B</th>
                    <th className="px-4 py-2">Best</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  <tr className="border-t border-mist">
                    <td className="px-4 py-2.5 text-slate">Cement 50kg</td>
                    <td className="px-4 py-2.5">₹340</td>
                    <td className="px-4 py-2.5">₹355</td>
                    <td className="px-4 py-2.5 font-semibold text-sage">₹328</td>
                  </tr>
                  <tr className="border-t border-mist">
                    <td className="px-4 py-2.5 text-slate">TMT Steel/t</td>
                    <td className="px-4 py-2.5">₹64,200</td>
                    <td className="px-4 py-2.5">₹63,800</td>
                    <td className="px-4 py-2.5 font-semibold text-sage">₹62,000</td>
                  </tr>
                  <tr className="border-t border-mist">
                    <td className="px-4 py-2.5 text-slate">Red Bricks/1k</td>
                    <td className="px-4 py-2.5">₹9,200</td>
                    <td className="px-4 py-2.5">₹8,900</td>
                    <td className="px-4 py-2.5 font-semibold text-sage">₹8,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          {/* Project Management */}
          <article className="rounded-2xl border border-mist bg-white p-8 md:col-span-2">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10">
                  <LayoutDashboard className="h-6 w-6 text-navy" />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy">
                  One dashboard. Every milestone.
                </h3>
                <p className="mt-3 leading-relaxed text-slate">
                  Track approvals, material deliveries, payments, and site progress from planning
                  through handover.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Planning & Permits', pct: 100 },
                  { label: 'Foundation', pct: 100 },
                  { label: 'Structure', pct: 75 },
                  { label: 'Roofing', pct: 40 },
                  { label: 'Interiors', pct: 10 },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-navy">{m.label}</span>
                      <span className="font-mono text-xs text-teal">{m.pct}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-mist">
                      <div
                        className="h-full rounded-full bg-teal transition-all"
                        style={{ width: `${m.pct}%` }}
                      />
                    </div>
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
