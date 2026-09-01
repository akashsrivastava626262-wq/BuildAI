import { Home, Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT } from '../constants'

const platformLinks = [
  { label: 'Home Types', href: '#home-types' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'AI Demo', href: '#ai-demo' },
]

const proLinks = [
  { label: 'Join as Architect', href: '#cta' },
  { label: 'Join as Contractor', href: '#cta' },
  { label: 'Material Supplier', href: '#cta' },
]

export default function Footer() {
  return (
    <footer className="relative bg-navy text-white/60">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-terracotta via-gold to-teal" />
      <div className="absolute inset-0 texture-blueprint opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-terracotta to-brick shadow-lg">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white">BuildFlow</span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-gold">
                  Home Builders
                </span>
              </div>
            </a>
            <p className="mt-5 text-sm leading-relaxed">
              India&apos;s AI-powered home building platform. Helping families turn their plot into
              a dream home — with transparency, trust, and technology.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal/15 px-3 py-1.5 text-xs font-semibold text-teal-300 ring-1 ring-teal/20">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse" />
              Launching Soon
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Platform
            </h3>
            <ul className="mt-5 space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm transition-colors hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              For Professionals
            </h3>
            <ul className="mt-5 space-y-3">
              {proLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm transition-colors hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-start gap-3 text-sm transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                  <span className="break-all">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+91${CONTACT.phone}`}
                  className="flex items-center gap-3 text-sm transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-terracotta" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 shrink-0 text-terracotta" />
                India
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mt-12" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
          <p>© 2026 BuildFlow. Building homes, building trust. 🏠</p>
          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-gold">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
