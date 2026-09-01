import {
  AlertTriangle,
  Clock,
  DollarSign,
  Eye,
  FileSpreadsheet,
  Users,
} from 'lucide-react'
import SectionHeader from './ui/SectionHeader'

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'Workers who disappear mid-project',
    copy: 'Your home build stops when crews vanish — leaving you stranded with half-built walls.',
    emoji: '😤',
  },
  {
    icon: DollarSign,
    title: 'Quotes that double without warning',
    copy: 'That ₹25L estimate becomes ₹40L — with no clear breakdown of where your money went.',
    emoji: '💸',
  },
  {
    icon: Eye,
    title: "You never know the real price",
    copy: 'Cement, steel, labour — every item is marked up. You pay retail when wholesale exists.',
    emoji: '🔍',
  },
  {
    icon: FileSpreadsheet,
    title: '"How much will my home cost?"',
    copy: 'No architect gives you a straight answer. Spreadsheets and guesses aren\'t a plan.',
    emoji: '📊',
  },
  {
    icon: Clock,
    title: 'Years lost to poor coordination',
    copy: 'Architect, contractor, supplier — none of them talk to each other. You become the manager.',
    emoji: '⏳',
  },
  {
    icon: Users,
    title: 'Juggling 10+ suppliers alone',
    copy: 'Cement from one shop, steel from another, tiles from a third. It\'s exhausting.',
    emoji: '🏗️',
  },
]

export default function ProblemSection() {
  return (
    <section className="relative py-20 md:py-28" aria-labelledby="problem-heading">
      <div className="absolute inset-0 texture-concrete" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto">
          <SectionHeader
            badge="Sound Familiar?"
            title="Building a home shouldn't feel like a gamble"
            subtitle="Every Indian family building a home faces the same frustrations. You deserve better."
          />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point) => (
            <article
              key={point.title}
              className="glass-card group relative overflow-hidden rounded-2xl p-7"
            >
              <span className="text-3xl">{point.emoji}</span>
              <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta/10">
                <point.icon className="h-5 w-5 text-terracotta" />
              </div>
              <h3 className="font-display mt-4 text-lg font-bold text-navy">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{point.copy}</p>
              <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-terracotta/5 transition-transform group-hover:scale-150" />
            </article>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl texture-brick p-8 text-center md:p-12">
          <p className="font-display text-xl font-bold text-navy md:text-2xl">
            🏠 Your family deserves a home built with honesty, clarity, and care.
          </p>
          <p className="mt-3 text-slate">
            That&apos;s exactly what we&apos;re building BuildFlow for.
          </p>
          <a
            href="#how-it-works"
            className="mt-6 inline-block text-sm font-bold text-terracotta hover:underline"
          >
            See how we solve this →
          </a>
        </div>
      </div>
    </section>
  )
}
