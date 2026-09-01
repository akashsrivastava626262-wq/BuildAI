const partners = [
  'ConstructAI',
  'BuildOS',
  'MaterialX',
  'ArchiFlow',
  'ProjectIQ',
  'SteelChain',
]

export default function PartnerLogos() {
  return (
    <section className="section-dark border-y border-white/5 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-white/30">
          Built for the future of construction technology
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((name) => (
            <span
              key={name}
              className="logo-muted font-display text-lg font-semibold tracking-tight text-white"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
