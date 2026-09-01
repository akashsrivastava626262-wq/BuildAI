import { Sparkles } from 'lucide-react'

export default function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-gradient-to-r from-navy via-[#1e3a6e] to-navy py-2.5 text-center text-sm text-white/90">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4">
        <Sparkles className="h-4 w-4 shrink-0 text-teal-300" />
        <span>
          <strong className="font-semibold text-white">Now Launching</strong> — Be among our first
          builders.{' '}
          <a href="#cta" className="underline decoration-teal-300/50 underline-offset-2 hover:text-white">
            Enquire today →
          </a>
        </span>
      </div>
    </div>
  )
}
