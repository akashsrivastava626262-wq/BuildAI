import { CONTACT } from '../constants'

const links = {
  Product: [
    { label: 'Platform', href: '#platform' },
    { label: 'How It Works', href: '#process' },
    { label: 'AI Demo', href: '#demo' },
    { label: 'Results', href: '#results' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#cta' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="section-dark border-t border-white/5 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <span className="font-display text-sm font-bold text-ink">B</span>
              </div>
              <span className="font-display text-lg font-semibold text-white">BuildFlow</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              The AI intelligence layer for modern home construction. Enterprise-grade planning,
              procurement, and project management — built for India.
            </p>
            <div className="mt-6">
              <a
                href="#cta"
                className="btn-accent inline-flex rounded-full px-6 py-2.5 text-sm"
              >
                Get Started
              </a>
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30">
                {title}
              </h3>
              <ul className="mt-4 space-y-3">
                {items.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:+91${CONTACT.phone}`} className="hover:text-white">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/30 sm:flex-row">
          <p>© 2026 BuildFlow Technologies. All rights reserved.</p>
          <p>AI-Powered Home Building · India</p>
        </div>
      </div>
    </footer>
  )
}
