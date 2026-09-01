import {
  BarChart3,
  Bot,
  Brain,
  Calculator,
  Layers,
  LineChart,
  Shield,
  Workflow,
  Zap,
} from 'lucide-react'

const capabilities = [
  {
    icon: Brain,
    title: 'Intelligent Design',
    description:
      'AI generates optimized floor plans, structural layouts, and interior recommendations from plot dimensions and photos — in minutes, not weeks.',
    tag: 'Design AI',
  },
  {
    icon: Calculator,
    title: 'Cost Optimization',
    description:
      'Real-time material pricing, automated BOQ generation, and wholesale procurement — eliminating hidden markups and budget surprises.',
    tag: 'Finance AI',
  },
  {
    icon: LineChart,
    title: 'Predictive Analytics',
    description:
      'Machine learning models forecast project timelines, identify delay risks, and recommend corrective actions before problems escalate.',
    tag: 'Analytics',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'End-to-end construction workflows — from permits to handover — orchestrated automatically with milestone tracking and alerts.',
    tag: 'Automation',
  },
  {
    icon: Bot,
    title: 'Smart Recommendations',
    description:
      'Context-aware suggestions for materials, contractors, and design choices based on your budget, location, and project type.',
    tag: 'Intelligence',
  },
  {
    icon: Shield,
    title: 'Verified Network',
    description:
      'Every architect, engineer, and contractor is identity-verified, license-checked, and performance-rated on the platform.',
    tag: 'Trust',
  },
]

const benefits = [
  {
    icon: Zap,
    title: '10× faster planning',
    stat: 'Minutes vs. weeks',
    description: 'AI replaces months of architect back-and-forth with instant, accurate plans.',
  },
  {
    icon: BarChart3,
    title: 'Up to 22% cost savings',
    stat: 'Wholesale materials',
    description: 'Direct supplier pricing eliminates middleman markups on every material.',
  },
  {
    icon: Layers,
    title: 'Single source of truth',
    stat: 'One dashboard',
    description: 'Design, budget, materials, contractors, and progress — unified.',
  },
]

export default function Features() {
  return (
    <section id="platform" className="section-dark relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Platform</p>
          <h2 className="headline-lg mt-4 text-white">
            AI that transforms every stage of{' '}
            <span className="text-gradient-accent">home building</span>
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Enterprise-grade intelligence applied to residential construction — from the first
            blueprint to the final inspection.
          </p>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <article key={cap.title} className="feature-card group rounded-2xl p-8">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-all group-hover:bg-accent/10 group-hover:ring-accent/30">
                  <cap.icon className="h-5 w-5 text-white/70 group-hover:text-accent-bright" />
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/30">
                  {cap.tag}
                </span>
              </div>
              <h3 className="font-display mt-6 text-xl font-semibold text-white">{cap.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/45">{cap.description}</p>
            </article>
          ))}
        </div>

        {/* Benefits row */}
        <div className="mt-24 glow-accent rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Business Impact
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="text-center md:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 md:mx-0">
                  <b.icon className="h-6 w-6 text-accent-bright" />
                </div>
                <p className="mt-4 font-mono text-sm font-medium text-accent-bright">{b.stat}</p>
                <h3 className="font-display mt-2 text-lg font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm text-white/45">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
