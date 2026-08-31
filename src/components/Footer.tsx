import { Check, Mail, Phone } from 'lucide-react'

const platformLinks = ['How It Works', 'Features', 'Pricing', 'Material Marketplace', 'Help Center']
const proLinks = ['Join as Architect', 'Join as Contractor', 'Supplier Portal']

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <Check className="h-5 w-5 text-teal" strokeWidth={3} />
              </div>
              <span className="font-display text-xl font-bold text-white">BuildFlow</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed">
              Build smarter. Build together. The AI-powered construction platform for homes,
              businesses, and institutions.
            </p>
            <div className="mt-6 flex gap-4">
              {['LinkedIn', 'Twitter', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs font-medium text-white/50 transition-colors hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">Platform</h3>
            <ul className="mt-4 space-y-2">
              {platformLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">For Professionals</h3>
            <ul className="mt-4 space-y-2">
              {proLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:support@buildflow.ai"
                  className="flex items-center gap-2 text-sm hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  support@buildflow.ai
                </a>
              </li>
              <li>
                <a
                  href="tel:+911800000000"
                  className="flex items-center gap-2 text-sm hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  +91 1800-XXX-XXXX
                </a>
              </li>
              <li className="text-sm">Mon–Sat 9am–7pm IST</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
          <p>© 2026 BuildFlow Technologies Pvt. Ltd. · RERA-compliant project tracking</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'].map(
              (link) => (
                <a key={link} href="#" className="hover:text-white">
                  {link}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
