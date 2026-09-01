import type { ReactNode } from 'react'

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  light?: boolean
  align?: 'left' | 'center'
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  light = false,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {badge && (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${
            light
              ? 'bg-white/10 text-gold ring-1 ring-white/20'
              : 'bg-terracotta/10 text-terracotta ring-1 ring-terracotta/20'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-gold' : 'bg-terracotta'} animate-pulse`} />
          {badge}
        </span>
      )}
      <h2
        className={`font-display mt-5 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/70' : 'text-slate'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function GradientText({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-terracotta via-gold to-teal bg-clip-text text-transparent">
      {children}
    </span>
  )
}
