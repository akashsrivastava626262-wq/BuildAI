import { Home, Sparkles } from 'lucide-react'

export default function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-gradient-to-r from-teal-dark via-teal to-teal-dark py-2.5 text-center text-sm text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4">
        <Home className="h-4 w-4 shrink-0 text-gold" />
        <span>
          <strong className="font-semibold">Building Homes, Building Trust</strong> — Be among our
          first homeowners.{' '}
          <a href="#cta" className="font-semibold underline decoration-gold/60 underline-offset-2 hover:text-gold">
            Enquire today →
          </a>
        </span>
        <Sparkles className="hidden h-4 w-4 text-gold sm:block" />
      </div>
    </div>
  )
}
