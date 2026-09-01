import { useState } from 'react'
import { ArrowRight, Mail, Phone, Send } from 'lucide-react'
import { CONTACT } from '../constants'

export default function FinalCTA() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const subject = encodeURIComponent('BuildFlow Demo Request')
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nCompany: ${data.get('company')}\nMessage: ${data.get('message')}`,
    )
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="cta" className="section-dark relative py-24 md:py-32">
      <div className="absolute inset-0 grid-fine opacity-20" />
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 glow-line" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Get Started
            </p>
            <h2 className="headline-lg mt-4 text-white">
              Ready to transform how you{' '}
              <span className="text-gradient-accent">build homes?</span>
            </h2>
            <p className="mt-4 text-lg text-white/50">
              Join our early access program. Book a demo and see how BuildFlow&apos;s AI can
              optimize your next construction project from day one.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/[0.08]"
              >
                <Mail className="h-5 w-5 text-accent-bright" />
                <div>
                  <p className="text-xs text-white/40">Email</p>
                  <p className="text-sm text-white">{CONTACT.email}</p>
                </div>
              </a>
              <a
                href={`tel:+91${CONTACT.phone}`}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/[0.08]"
              >
                <Phone className="h-5 w-5 text-accent-bright" />
                <div>
                  <p className="text-xs text-white/40">Phone</p>
                  <p className="text-sm text-white">{CONTACT.phoneDisplay}</p>
                </div>
              </a>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 md:p-10">
            <h3 className="font-display text-xl font-semibold text-white">Book a Demo</h3>
            <p className="mt-2 text-sm text-white/40">
              Tell us about your project. We&apos;ll respond within 24 hours.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl bg-accent/10 p-6 text-center">
                <p className="font-medium text-accent-bright">Thank you!</p>
                <p className="mt-2 text-sm text-white/50">
                  Your email client should open. Or reach us at {CONTACT.email}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <input
                  name="name"
                  required
                  placeholder="Full name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Work email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none"
                />
                <input
                  name="company"
                  placeholder="Company / Project type"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none"
                />
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about your project..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm"
                >
                  <Send className="h-4 w-4" />
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
