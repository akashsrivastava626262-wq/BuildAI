import {
  AlertTriangle,
  Clock,
  DollarSign,
  Eye,
  FileSpreadsheet,
  Users,
} from 'lucide-react'

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'Workers who disappear mid-project',
    copy: 'No accountability when crews vanish or quality drops.',
  },
  {
    icon: DollarSign,
    title: 'Quotes that double without warning',
    copy: 'Hidden markups and vague estimates drain your savings.',
  },
  {
    icon: Eye,
    title: "You never know the real price",
    copy: "Retail vs wholesale? Labor vs materials? It's all a black box.",
  },
  {
    icon: FileSpreadsheet,
    title: '"How much will this actually cost?"',
    copy: "Spreadsheets and rough estimates can't plan a real build.",
  },
  {
    icon: Clock,
    title: 'Months lost to poor coordination',
    copy: 'Architects, contractors, and suppliers never align.',
  },
  {
    icon: Users,
    title: 'Juggling 10+ suppliers alone',
    copy: "Cement here, steel there — you're the project manager by default.",
  },
]

export default function ProblemSection() {
  return (
    <section className="bg-warm-gray py-16 md:py-20" aria-labelledby="problem-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="problem-heading"
            className="font-display text-3xl font-semibold text-navy md:text-4xl"
          >
            Construction shouldn&apos;t feel like a gamble.
          </h2>
          <p className="mt-4 text-lg text-slate">
            You&apos;ve seen it before — quotes that change overnight, workers who don&apos;t show
            up, and no one who can tell you what your project will actually cost until it&apos;s too
            late.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point) => (
            <article
              key={point.title}
              className="rounded-xl border border-mist border-l-4 border-l-terracotta bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-terracotta/10">
                <point.icon className="h-5 w-5 text-terracotta" />
              </div>
              <h3 className="font-display text-lg font-semibold text-navy">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{point.copy}</p>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-lg font-medium text-navy">
          You deserve to build with confidence — whether it&apos;s your first home, a school
          expansion, or a commercial space.
        </p>
      </div>
    </section>
  )
}
