import { ArrowRight, Mail, Phone, Sparkles } from 'lucide-react'
import FloatingOrbs from './ui/FloatingOrbs'
import { CONTACT } from '../constants'

export default function MidPageCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="gradient-mesh absolute inset-0" />
      <FloatingOrbs />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-white/80">
          <Sparkles className="h-4 w-4 text-teal-300" />
          Limited Early Access
        </div>

        <h2 className="font-display mt-6 text-3xl font-bold text-white md:text-5xl">
          Ready to build the future?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/60">
          We&apos;re launching soon. Register your interest today and be the first to experience
          AI-powered construction planning, wholesale material pricing, and verified professionals.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#cta"
            className="btn-glow btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white"
          >
            Enquire Now
            <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            <Mail className="h-5 w-5" />
            Email Us
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4 text-teal-300" />
            {CONTACT.email}
          </a>
          <a
            href={`tel:+91${CONTACT.phone}`}
            className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4 text-teal-300" />
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
