import { STATS } from '../constants'

const industryStats = [
  { value: '$12T+', label: 'Global construction market size', accent: false },
  { value: '30%', label: 'Average cost overrun on projects', accent: true },
  { value: '67%', label: 'Projects delayed due to poor coordination', accent: false },
  { value: `${STATS.projects}`, label: 'Homes built on BuildFlow (launching)', accent: true },
]

export default function StatsSection() {
  return (
    <section id="results" className="section-elevated relative py-24 md:py-32">
      <div className="absolute inset-0 grid-fine opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Industry Impact
          </p>
          <h2 className="headline-lg mt-4 text-white">
            Construction needs a{' '}
            <span className="text-gradient-accent">fundamental upgrade</span>
          </h2>
          <p className="mt-4 text-white/50">
            BuildFlow applies enterprise-grade AI to solve the industry&apos;s most expensive
            problems — starting with residential home building in India.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {industryStats.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel p-8 text-center transition-colors hover:bg-white/[0.04]"
            >
              <p
                className={`font-mono text-4xl font-medium md:text-5xl ${
                  stat.accent ? 'stat-highlight-accent' : 'stat-highlight'
                }`}
              >
                {stat.value}
              </p>
              <p className="mt-3 text-sm text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
