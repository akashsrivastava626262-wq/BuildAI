import { Building, Home, Layers, Warehouse } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'

const homeTypes = [
  {
    icon: Home,
    title: 'Dream Home',
    subtitle: '2BHK · 3BHK · Villa',
    description:
      'Build the home your family deserves — with AI floor plans, transparent budgets, and verified contractors.',
    features: ['Custom layouts', 'Interior design', 'Garden planning'],
    color: 'from-terracotta to-brick',
    accent: 'bg-terracotta/10 text-terracotta',
  },
  {
    icon: Building,
    title: 'Apartments & Flats',
    subtitle: 'Multi-storey · G+2',
    description:
      'From duplexes to apartment blocks — plan every unit with precision and manage materials at scale.',
    features: ['Multi-unit plans', 'Shared amenities', 'Bulk materials'],
    color: 'from-blue to-teal',
    accent: 'bg-blue/10 text-blue',
  },
  {
    icon: Layers,
    title: 'Room Addition',
    subtitle: 'Extension · Renovation',
    description:
      'Adding a room, floor, or balcony? Get accurate cost estimates and timelines before you break ground.',
    features: ['Space optimization', 'Structural check', 'Quick estimates'],
    color: 'from-gold to-terracotta',
    accent: 'bg-gold/20 text-wood',
  },
  {
    icon: Warehouse,
    title: 'Commercial & Institutional',
    subtitle: 'Shops · Schools · Offices',
    description:
      'Schools, shops, warehouses, and offices — enterprise-grade planning for business owners and institutions.',
    features: ['Commercial layouts', 'Compliance ready', 'Project management'],
    color: 'from-teal to-sage',
    accent: 'bg-teal/10 text-teal-dark',
  },
]

export default function HomeShowcase() {
  return (
    <section
      id="home-types"
      className="relative py-20 md:py-28"
      aria-labelledby="home-types-heading"
    >
      <div className="absolute inset-0 texture-wood" />
      <div className="absolute inset-0 home-silhouette-pattern opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto">
          <SectionHeader
            badge="What You Can Build"
            title="Every home dream, one platform"
            subtitle="Whether you're building your first home, adding a room, or constructing a commercial space — we make it simple, transparent, and stress-free."
          />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeTypes.map((type, i) => (
            <article
              key={type.title}
              className="home-card group overflow-hidden rounded-3xl"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`h-2 bg-gradient-to-r ${type.color}`} />
              <div className="p-7">
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${type.color} shadow-lg`}
                >
                  <type.icon className="h-7 w-7 text-white" />
                </div>
                <p className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${type.accent}`}>
                  {type.subtitle}
                </p>
                <h3 className="font-display mt-3 text-xl font-bold text-navy">{type.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{type.description}</p>
                <ul className="mt-5 space-y-2 border-t border-mist pt-5">
                  {type.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs font-medium text-slate">
                      <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-navy-light to-teal-dark p-8 md:p-10">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">
                For Every Indian Family
              </p>
              <h3 className="font-display mt-2 text-2xl font-bold text-white md:text-3xl">
                Your plot. Your budget. Your dream home — built right.
              </h3>
              <p className="mt-3 text-white/70">
                No more relying on guesswork. Upload your plot dimensions, describe your vision, and
                let AI create a complete plan you can trust.
              </p>
            </div>
            <a
              href="#cta"
              className="btn-glow btn-primary shrink-0 rounded-xl px-8 py-4 text-sm font-semibold text-white"
            >
              Plan My Home →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
