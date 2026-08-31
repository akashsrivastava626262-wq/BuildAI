import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const stats = [
  { value: '₹12L+', label: 'Average savings per residential project' },
  { value: '500+', label: 'Verified construction professionals' },
  { value: '200+', label: 'Verified material suppliers' },
  { value: '98%', label: 'On-time milestone completion rate' },
]

const badges = [
  'ISO 27001 Compliant',
  'Verified Supplier Network',
  'Licensed Professional Partners',
  'Secure Payments',
]

const testimonials = [
  {
    quote:
      'We were quoted ₹45L by a local contractor with no breakdown. BuildFlow gave us a full AI plan and wholesale material list for ₹36L — and we found our architect through the platform.',
    tag: 'Residential · 3BHK · Bangalore',
    name: 'Priya & Rajesh M.',
    role: 'Homeowners',
    savings: '₹8.4L',
  },
  {
    quote:
      'Coordinating our school expansion used to mean 15 phone calls a week. Now materials, engineers, and timelines live in one dashboard.',
    tag: 'Institutional · School · Hyderabad',
    name: 'Anita K.',
    role: 'School Administrator',
    savings: '₹15.2L',
  },
  {
    quote:
      'The price comparison alone paid for itself. I buy steel and cement at wholesale and pass savings to clients.',
    tag: 'Commercial · Contractor · Chennai',
    name: 'Vikram S.',
    role: 'Contractor',
    savings: '₹6.8L',
  },
]

export default function TrustSection() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section id="trust" className="py-16 md:py-20" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-7xl px-6">
        <h2 id="trust-heading" className="sr-only">
          Trust and credibility
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-4xl font-medium text-navy md:text-5xl">{stat.value}</p>
              <div className="mx-auto mt-2 h-0.5 w-12 bg-teal" />
              <p className="mt-3 text-sm text-slate">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-mist bg-white px-5 py-2 text-xs font-medium text-slate"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="relative mt-16">
          <div className="overflow-hidden rounded-2xl border border-mist bg-white p-8 md:p-12">
            <Quote className="h-8 w-8 text-blue/30" />
            <blockquote className="mt-4 text-lg leading-relaxed text-navy md:text-xl">
              &ldquo;{testimonials[current].quote}&rdquo;
            </blockquote>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
                  {testimonials[current].tag}
                </span>
                <p className="mt-3 font-display font-semibold text-navy">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-slate">{testimonials[current].role}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate">Saved on materials</p>
                <p className="font-mono text-2xl font-medium text-sage">
                  {testimonials[current].savings}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-mist p-2 text-slate hover:bg-warm-gray"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-6 bg-blue' : 'w-2 bg-mist'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="rounded-full border border-mist p-2 text-slate hover:bg-warm-gray"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-mist bg-warm-gray p-8 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-navy">
              Case Study: 2BHK home built 4 months faster
            </h3>
            <p className="mt-2 text-sm text-slate">
              22% cost reduction · 18-week timeline · 3 verified pros engaged
            </p>
          </div>
          <a
            href="#cta"
            className="mt-4 inline-block text-sm font-semibold text-blue hover:underline md:mt-0"
          >
            Read Full Case Study →
          </a>
        </div>
      </div>
    </section>
  )
}
