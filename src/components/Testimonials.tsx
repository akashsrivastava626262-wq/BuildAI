const testimonials = [
  {
    quote:
      'The construction industry has been waiting for this level of intelligence. BuildFlow brings the rigor of enterprise software to home building.',
    role: 'Residential Architect',
    context: 'Early Access Program',
  },
  {
    quote:
      'Cost transparency alone could transform how families build homes in India. The AI planning engine is remarkably accurate for early-stage estimates.',
    role: 'Construction Consultant',
    context: 'Industry Advisor',
  },
  {
    quote:
      'Integrating material procurement with project management in one platform solves the coordination problem that delays 67% of projects.',
    role: 'Project Manager',
    context: 'Beta Partner',
  },
]

export default function Testimonials() {
  return (
    <section className="section-light py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            Trusted Voices
          </p>
          <h2 className="headline-lg mt-4 text-gradient-light">
            What industry leaders are saying
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.role}
              className="feature-card-light flex flex-col rounded-2xl p-8"
            >
              <p className="flex-1 text-base leading-relaxed text-text-muted">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-8 border-t border-border-light pt-6">
                <p className="font-display font-semibold text-text">{t.role}</p>
                <p className="mt-1 text-xs text-text-subtle">{t.context}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
