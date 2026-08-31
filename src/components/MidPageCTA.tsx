import { ArrowRight } from 'lucide-react'

export default function MidPageCTA() {
  return (
    <section className="bg-navy py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
          Ready to stop guessing and start building?
        </h2>
        <p className="mt-4 text-lg text-white/70">
          Join thousands of families and businesses who plan smarter, spend less, and build with
          confidence.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-navy transition-colors hover:bg-warm-white"
          >
            Start Your Project
            <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Book a Free Consultation
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-2 border-navy bg-gradient-to-br from-blue/40 to-teal/40"
              />
            ))}
          </div>
          <p className="text-sm text-white/60">2,400+ active projects</p>
        </div>
      </div>
    </section>
  )
}
