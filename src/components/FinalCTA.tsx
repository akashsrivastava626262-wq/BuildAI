import { useState } from 'react'
import { ArrowRight, ChevronDown, Phone } from 'lucide-react'

export default function FinalCTA() {
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="cta"
      className="bg-gradient-to-b from-[#eef2ff]/40 to-warm-white py-16 md:py-24"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          id="cta-heading"
          className="font-display text-3xl font-semibold text-navy md:text-4xl"
        >
          Your project deserves a better way to build.
        </h2>
        <p className="mt-4 text-lg text-slate">
          Upload your space today. Get your AI plan, budget, and timeline in minutes — free.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#ai-demo"
            className="animate-pulse-glow inline-flex items-center gap-2 rounded-lg bg-blue px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-blue-dark"
          >
            Start Your Project
            <ArrowRight className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setFormOpen(!formOpen)}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-blue px-8 py-4 text-base font-semibold text-blue transition-colors hover:bg-blue/5"
          >
            <Phone className="h-5 w-5" />
            Talk to a Construction Advisor
          </button>
        </div>

        <p className="mt-6 text-sm text-slate">
          Free to start · No credit card · Plans generated in under 10 minutes
        </p>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => setFormOpen(!formOpen)}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue hover:underline"
          >
            Get a callback
            <ChevronDown
              className={`h-4 w-4 transition-transform ${formOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {formOpen && (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-6 max-w-md rounded-xl border border-mist bg-white p-6 text-left shadow-lg"
            >
              {submitted ? (
                <p className="text-center font-medium text-teal">
                  Thank you! We&apos;ll call you within 24 hours.
                </p>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="mt-1 w-full rounded-lg border border-mist px-3 py-2.5 text-sm focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        className="mt-1 w-full rounded-lg border border-mist px-3 py-2.5 text-sm focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="project" className="block text-sm font-medium text-slate">
                        Project Type
                      </label>
                      <select
                        id="project"
                        className="mt-1 w-full rounded-lg border border-mist px-3 py-2.5 text-sm focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
                      >
                        <option>Residential Home</option>
                        <option>Room Addition</option>
                        <option>Commercial Building</option>
                        <option>School / Institution</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 w-full rounded-lg bg-blue py-3 text-sm font-semibold text-white hover:bg-blue-dark"
                  >
                    Request Callback
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
