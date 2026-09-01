import { Home, Sparkles } from 'lucide-react'

export default function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-charcoal py-2.5 text-center text-sm text-white/90">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-2 px-4">
        <Home className="h-4 w-4 shrink-0 text-gold" />
        <span>
          <strong className="font-semibold text-white">Premium Home Building</strong> — Be among our
          first homeowners.{' '}
          <a href="#cta" className="font-semibold text-gold underline decoration-gold/40 underline-offset-2 hover:text-amber-glow">
            Enquire today →
          </a>
        </span>
        <Sparkles className="hidden h-4 w-4 text-gold sm:block" />
      </div>
    </div>
  )
}
