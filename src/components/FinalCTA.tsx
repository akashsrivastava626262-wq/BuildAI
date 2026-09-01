import { useState } from 'react'
import { ChevronDown, Mail, MapPin, Phone, Send } from 'lucide-react'
import { CONTACT } from '../constants'

export default function FinalCTA() {
  const [formOpen, setFormOpen] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name')
    const email = data.get('email')
    const phone = data.get('phone')
    const project = data.get('project')
    const message = data.get('message')

    const subject = encodeURIComponent(`BuildFlow Enquiry — ${project}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProject Type: ${project}\n\nMessage:\n${message}`,
    )
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section
      id="cta"
      className="relative py-20 md:py-28"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-warm-gray to-warm-white" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue">
              Get In Touch
            </span>
            <h2
              id="cta-heading"
              className="font-display mt-5 text-3xl font-bold text-navy md:text-4xl lg:text-5xl"
            >
              Let&apos;s build your <span className="text-gradient">dream home</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              Whether you&apos;re planning your dream home, a commercial space, or an institutional
              project — reach out and we&apos;ll help you get started with AI-powered planning.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-md shadow-navy/5 ring-1 ring-mist transition-all hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue to-blue-dark shadow-lg shadow-blue/30">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate">Email</p>
                  <p className="font-medium text-navy group-hover:text-blue">{CONTACT.email}</p>
                </div>
              </a>

              <a
                href={`tel:+91${CONTACT.phone}`}
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-md shadow-navy/5 ring-1 ring-mist transition-all hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-teal-dark shadow-lg shadow-teal/30">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate">Phone</p>
                  <p className="font-medium text-navy group-hover:text-teal">{CONTACT.phoneDisplay}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-md shadow-navy/5 ring-1 ring-mist">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-light shadow-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate">Status</p>
                  <p className="font-medium text-navy">Launching Soon — India</p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm text-slate">
              Free to enquire · No commitment · Response within 24 hours
            </p>
          </div>

          <div className="gradient-border rounded-3xl p-1">
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-navy">Send an Enquiry</h3>
                <button
                  type="button"
                  onClick={() => setFormOpen(!formOpen)}
                  className="rounded-lg p-1 text-slate hover:bg-warm-gray lg:hidden"
                  aria-label="Toggle form"
                >
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${formOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              {(formOpen) && (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  {submitted ? (
                    <div className="rounded-2xl bg-teal/10 p-6 text-center">
                      <p className="font-semibold text-teal-dark">Thank you for your enquiry!</p>
                      <p className="mt-2 text-sm text-slate">
                        Your email client should open shortly. If not, email us directly at{' '}
                        <a href={`mailto:${CONTACT.email}`} className="font-medium text-blue hover:underline">
                          {CONTACT.email}
                        </a>
                      </p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-navy">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="mt-2 w-full rounded-xl border border-mist bg-warm-gray/50 px-4 py-3 text-sm transition-all focus:border-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue/20"
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-navy">
                            Email *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-2 w-full rounded-xl border border-mist bg-warm-gray/50 px-4 py-3 text-sm transition-all focus:border-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue/20"
                            placeholder="you@email.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-navy">
                            Phone *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            className="mt-2 w-full rounded-xl border border-mist bg-warm-gray/50 px-4 py-3 text-sm transition-all focus:border-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue/20"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="project" className="block text-sm font-semibold text-navy">
                          Project Type
                        </label>
                        <select
                          id="project"
                          name="project"
                          className="mt-2 w-full rounded-xl border border-mist bg-warm-gray/50 px-4 py-3 text-sm transition-all focus:border-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue/20"
                        >
                          <option>Residential Home</option>
                          <option>Room Addition</option>
                          <option>Commercial Building</option>
                          <option>School / Institution</option>
                          <option>Apartment Complex</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-navy">
                          Tell us about your project
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          className="mt-2 w-full resize-none rounded-xl border border-mist bg-warm-gray/50 px-4 py-3 text-sm transition-all focus:border-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue/20"
                          placeholder="Plot size, location, budget range, timeline..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-glow btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold text-white"
                      >
                        <Send className="h-4 w-4" />
                        Send Enquiry
                      </button>
                    </>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
