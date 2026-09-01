import { ArrowRight, Home, Mail, Phone } from 'lucide-react'
import { CONTACT } from '../constants'

export default function MidPageCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 texture-brick" />
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta/10 via-cream to-teal/10" />
      <div className="absolute inset-0 home-silhouette-pattern opacity-40" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-terracotta to-brick text-3xl shadow-xl shadow-terracotta/30">
          🏠
        </div>

        <h2 className="font-display text-3xl font-bold text-navy md:text-5xl">
          Ready to plan your dream home?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate">
          We&apos;re launching soon. Register your interest and be the first to get AI-powered home
          plans, wholesale material prices, and verified builders on one platform.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#cta"
            className="btn-glow btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white"
          >
            Plan My Home
            <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href={`tel:+91${CONTACT.phone}`}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-teal/30 bg-white px-8 py-4 text-base font-semibold text-teal-dark shadow-sm transition-all hover:border-teal hover:shadow-md"
          >
            <Phone className="h-5 w-5" />
            Call Us
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2 text-sm text-slate transition-colors hover:text-terracotta"
          >
            <Mail className="h-4 w-4 text-terracotta" />
            {CONTACT.email}
          </a>
          <a
            href={`tel:+91${CONTACT.phone}`}
            className="flex items-center gap-2 text-sm text-slate transition-colors hover:text-terracotta"
          >
            <Phone className="h-4 w-4 text-terracotta" />
            {CONTACT.phoneDisplay}
          </a>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-slate">
          <Home className="h-4 w-4 text-teal" />
          Serving homeowners across India
        </p>
      </div>
    </section>
  )
}
