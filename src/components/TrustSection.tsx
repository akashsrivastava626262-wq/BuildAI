import { ArrowRight, Rocket, Shield, Sparkles, Target } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import { STATS } from '../constants'

const pillars = [
  {
    icon: Shield,
    title: 'Built on Trust',
    description:
      'Every professional and supplier on our platform will go through rigorous verification — licenses, identity checks, and background screening.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Target,
    title: 'Radical Transparency',
    description:
      'No hidden costs. Every material price, labor charge, and timeline milestone will be visible from day one — so you always know where your money goes.',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    icon: Sparkles,
    title: 'AI-First Approach',
    description:
      'Our AI engine generates accurate plans, budgets, and timelines in minutes — replacing weeks of back-and-forth with architects and contractors.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: Rocket,
    title: 'Launching Soon',
    description:
      'We are onboarding our first wave of professionals, suppliers, and early-access customers. Be among the first to experience the future of construction.',
    color: 'from-orange-500 to-amber-600',
  },
]

const commitments = [
  { label: 'Projects Completed', value: STATS.projects },
  { label: 'Verified Professionals', value: STATS.professionals },
  { label: 'Material Suppliers', value: STATS.suppliers },
  { label: 'Customer Savings', value: `₹${STATS.savings}` },
]

export default function TrustSection() {
  return (
    <section id="trust" className="relative py-20 md:py-28" aria-labelledby="trust-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white to-warm-gray" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto">
          <SectionHeader
            badge="Why BuildFlow"
            title="Enterprise-grade platform, built for everyone"
            subtitle="We're building the construction platform we wished existed — transparent, affordable, and powered by cutting-edge AI."
          />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center transition-all duration-300"
            >
              <p className="font-mono text-4xl font-bold stat-zero md:text-5xl">{stat.value}</p>
              <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-blue to-teal" />
              <p className="mt-3 text-sm font-medium text-slate">{stat.label}</p>
              <p className="mt-1 text-xs text-slate/60">Launching soon</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg shadow-navy/5 ring-1 ring-mist transition-all duration-300 hover:shadow-xl"
            >
              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} shadow-lg transition-transform group-hover:scale-110`}
              >
                <pillar.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-slate">{pillar.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-navy-light to-navy p-8 md:p-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-teal/20 px-4 py-1.5 text-xs font-semibold text-teal-300">
                <Rocket className="h-3.5 w-3.5" />
                Early Access
              </span>
              <h3 className="font-display mt-4 text-2xl font-bold text-white md:text-3xl">
                Be among our first builders
              </h3>
              <p className="mt-3 max-w-xl text-white/60">
                Join our waitlist today and get priority access when we launch. Early customers
                receive complimentary AI plan generation and dedicated onboarding support.
              </p>
            </div>
            <a
              href="#cta"
              className="btn-glow btn-primary inline-flex shrink-0 items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white"
            >
              Join Waitlist
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {[
            'Data Security First',
            'Verified Network',
            'Transparent Pricing',
            'AI-Powered',
            'Made in India',
          ].map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-mist bg-white px-5 py-2.5 text-xs font-semibold text-slate shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
