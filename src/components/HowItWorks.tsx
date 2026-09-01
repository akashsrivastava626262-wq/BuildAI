import { useState } from 'react'
import {
  ArrowRight,
  Camera,
  ClipboardList,
  LayoutDashboard,
  ShoppingCart,
  Sparkles,
  UserPlus,
  Users,
} from 'lucide-react'
import SectionHeader from './ui/SectionHeader'

const steps = [
  {
    num: 1,
    title: 'Create your account',
    desc: 'Free signup in under 2 minutes',
    icon: UserPlus,
    visual: 'account',
  },
  {
    num: 2,
    title: 'Upload your space',
    desc: 'Add dimensions, photos, and site details',
    icon: Camera,
    visual: 'upload',
  },
  {
    num: 3,
    title: 'Describe your project',
    desc: 'Home, room addition, school, commercial — tell us your vision',
    icon: ClipboardList,
    visual: 'describe',
  },
  {
    num: 4,
    title: 'Get AI-generated plans',
    desc: 'Layouts, structural designs, interiors, materials, timeline & budget',
    icon: Sparkles,
    visual: 'ai',
  },
  {
    num: 5,
    title: 'Connect with verified pros',
    desc: 'Architects, engineers, contractors matched to your project',
    icon: Users,
    visual: 'pros',
  },
  {
    num: 6,
    title: 'Purchase materials at wholesale',
    desc: 'Compare live prices; buy direct from verified suppliers',
    icon: ShoppingCart,
    visual: 'materials',
  },
  {
    num: 7,
    title: 'Track to completion',
    desc: 'Milestones, payments, and progress in one dashboard',
    icon: LayoutDashboard,
    visual: 'track',
  },
]

function StepVisual({ type }: { type: string }) {
  const visuals: Record<string, React.ReactNode> = {
    account: (
      <div className="space-y-3 p-6">
        <div className="h-10 w-10 rounded-full bg-blue/20" />
        <div className="h-3 w-3/4 rounded bg-mist" />
        <div className="h-3 w-1/2 rounded bg-mist" />
        <div className="mt-4 h-10 rounded-lg bg-blue text-center text-sm leading-10 text-white">
          Sign Up Free
        </div>
      </div>
    ),
    upload: (
      <div className="flex items-center justify-center p-6">
        <div className="relative h-40 w-32 rounded-xl border-2 border-dashed border-blue bg-blue/5">
          <Camera className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-blue" />
          <span className="absolute bottom-2 left-0 right-0 text-center font-mono text-xs text-navy">
            14m × 10m
          </span>
        </div>
      </div>
    ),
    describe: (
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {['Home', 'Room Addition', 'School', 'Commercial'].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 h-20 rounded-lg bg-warm-gray p-3 text-xs text-slate">
          3BHK with open kitchen, 2 balconies, and covered parking...
        </div>
      </div>
    ),
    ai: (
      <div className="grid grid-cols-2 gap-3 p-6">
        <div className="rounded-lg bg-white p-2 shadow-sm">
          <svg viewBox="0 0 60 60" className="h-full w-full">
            <rect x="2" y="2" width="56" height="56" fill="none" stroke="#2D6CDF" strokeWidth="1.5" />
            <line x1="30" y1="2" x2="30" y2="58" stroke="#2D6CDF" strokeWidth="1" />
          </svg>
        </div>
        <div className="space-y-2">
          <div className="rounded bg-sage/10 px-2 py-1 font-mono text-xs text-sage">₹36.2L</div>
          <div className="rounded bg-blue/10 px-2 py-1 text-xs text-blue">18 weeks</div>
          <div className="rounded bg-teal/10 px-2 py-1 text-xs text-teal">42 materials</div>
        </div>
      </div>
    ),
    pros: (
      <div className="space-y-3 p-6">
        {[
          { name: 'Arjun M.', role: 'Architect', rating: '4.9' },
          { name: 'Priya S.', role: 'Structural Engineer', rating: '4.8' },
        ].map((pro) => (
          <div key={pro.name} className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-navy/10" />
            <div className="flex-1">
              <p className="text-sm font-medium text-navy">{pro.name}</p>
              <p className="text-xs text-slate">{pro.role}</p>
            </div>
            <span className="rounded-full bg-teal/10 px-2 py-0.5 text-xs text-teal">✓ Verified</span>
          </div>
        ))}
      </div>
    ),
    materials: (
      <div className="p-6">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-slate">
              <th className="pb-2">Material</th>
              <th className="pb-2">Best Price</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            <tr>
              <td className="py-1 text-slate">Cement 50kg</td>
              <td className="text-sage">₹328</td>
            </tr>
            <tr>
              <td className="py-1 text-slate">TMT Steel</td>
              <td className="text-sage">₹62,000</td>
            </tr>
            <tr>
              <td className="py-1 text-slate">Red Bricks</td>
              <td className="text-sage">₹8,500</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    track: (
      <div className="space-y-3 p-6">
        {['Foundation', 'Structure', 'Roofing', 'Interiors'].map((milestone, i) => (
          <div key={milestone} className="flex items-center gap-3">
            <div
              className={`h-3 w-3 rounded-full ${i < 2 ? 'bg-teal' : 'bg-mist'}`}
            />
            <span className={`text-sm ${i < 2 ? 'text-navy font-medium' : 'text-slate'}`}>
              {milestone}
            </span>
            {i < 2 && <span className="ml-auto text-xs text-teal">Complete</span>}
          </div>
        ))}
      </div>
    ),
  }

  return (
    <div className="min-h-[200px] rounded-xl bg-warm-gray">
      {visuals[type] || visuals.account}
    </div>
  )
}

export default function HowItWorks() {
  const [active, setActive] = useState(0)

  return (
    <section id="how-it-works" className="relative py-20 md:py-28" aria-labelledby="how-heading">
      <div className="absolute inset-0 bg-white" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto">
          <SectionHeader
            badge="How It Works"
            title="From idea to keys in hand — one platform"
            subtitle="Seven simple steps. Full transparency. You're always in control."
          />
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="space-y-2">
            {steps.map((step, i) => (
              <button
                key={step.num}
                type="button"
                onClick={() => setActive(i)}
                className={`group flex w-full items-start gap-4 rounded-2xl p-5 text-left transition-all duration-300 ${
                  active === i
                    ? 'bg-gradient-to-r from-blue/10 to-teal/5 shadow-lg shadow-blue/10 ring-2 ring-blue/30'
                    : 'hover:bg-warm-gray'
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                    active === i
                      ? 'bg-gradient-to-br from-blue to-teal text-white shadow-lg shadow-blue/30'
                      : 'bg-mist text-slate group-hover:bg-blue/10 group-hover:text-blue'
                  }`}
                >
                  {step.num}
                </span>
                <div>
                  <p className="font-display font-bold text-navy">{step.title}</p>
                  <p className="mt-1 text-sm text-slate">{step.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="gradient-border rounded-3xl p-1">
            <div className="overflow-hidden rounded-3xl bg-white p-2">
              <StepVisual type={steps[active].visual} />
              <div className="p-4">
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:text-blue-dark"
                >
                  Enquire Now — It&apos;s Free
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
