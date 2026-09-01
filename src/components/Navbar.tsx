import { useEffect, useState } from 'react'
import { Home, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home Types', href: '#home-types' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'AI Demo', href: '#ai-demo' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-[42px] z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-light shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <a href="#" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-wood to-gold shadow-lg shadow-black/30 transition-transform group-hover:scale-105">
            <Home className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span
              className={`font-display text-xl font-bold transition-colors ${
                scrolled ? 'text-navy' : 'text-white'
              }`}
            >
              BuildFlow
            </span>
            <span
              className={`block text-[10px] font-semibold uppercase tracking-widest transition-colors ${
                scrolled ? 'text-wood' : 'text-gold'
              }`}
            >
              Home Builders
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                scrolled
                  ? 'text-slate hover:bg-wood/5 hover:text-wood'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#cta"
            className="btn-glow btn-primary rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
          >
            Enquire Now
          </a>
        </div>

        <button
          type="button"
          className={`rounded-xl p-2.5 ring-1 md:hidden ${
            scrolled ? 'text-navy ring-mist' : 'text-white ring-white/20'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-mist bg-white/95 px-6 py-4 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-lg py-3 text-sm font-medium text-slate hover:text-wood"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="btn-primary mt-3 block w-full rounded-xl py-3.5 text-center text-sm font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Enquire Now
          </a>
        </div>
      )}
    </header>
  )
}
