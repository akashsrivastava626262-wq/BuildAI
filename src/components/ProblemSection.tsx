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
    copy: 'No accountability when crews vanish or quality drops.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: DollarSign,
    title: 'Quotes that double without warning',
    copy: 'Hidden markups and vague estimates drain your savings.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Eye,
    title: "You never know the real price",
    copy: "Retail vs wholesale? Labor vs materials? It's all a black box.",
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FileSpreadsheet,
    title: '"How much will this actually cost?"',
    copy: "Spreadsheets and rough estimates can't plan a real build.",
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Clock,
    title: 'Months lost to poor coordination',
    copy: 'Architects, contractors, and suppliers never align.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Juggling 10+ suppliers alone',
    copy: "Cement here, steel there — you're the project manager by default.",
    color: 'from-rose-500 to-red-500',
  },
]

export default function ProblemSection() {
  return (
    <section className="relative py-20 md:py-28" aria-labelledby="problem-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-warm-gray to-warm-white" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto">
          <SectionHeader
            badge="The Problem"
            title="Construction shouldn't feel like a gamble"
            subtitle="You've seen it before — quotes that change overnight, workers who don't show up, and no one who can tell you what your project will actually cost until it's too late."
          />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point, i) => (
            <article
              key={point.title}
              className="glass-card group relative overflow-hidden rounded-2xl p-7 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${point.color} shadow-lg`}
              >
                <point.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-navy">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{point.copy}</p>
              <div
                className={`absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${point.color} opacity-5 transition-opacity group-hover:opacity-10`}
              />
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-r from-navy to-navy-light p-8 text-center md:p-12">
          <p className="font-display text-xl font-semibold text-white md:text-2xl">
            You deserve to build with confidence — whether it&apos;s your first home, a school
            expansion, or a commercial space.
          </p>
          <a
            href="#cta"
            className="mt-6 inline-block text-sm font-semibold text-teal-300 hover:text-teal-200"
          >
            We&apos;re building the solution →
          </a>
        </div>
      </div>
    </section>
  )
}
