import { useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'

type Phase = 'idle' | 'processing' | 'complete'

const steps = [
  'Analyzing plot dimensions & topography...',
  'Generating optimized floor plan...',
  'Calculating structural requirements...',
  'Building material quantity schedule...',
  'Optimizing cost estimate...',
  'Generating project timeline...',
]

export default function AIDemo() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [stepIdx, setStepIdx] = useState(0)
  const [dims, setDims] = useState({ l: '12', w: '10' })

  const run = () => {
    setPhase('processing')
    setStepIdx(0)
    let i = 0
    const interval = setInterval(() => {
      i++
      setStepIdx(i)
      if (i >= steps.length) {
        clearInterval(interval)
        setPhase('complete')
      }
    }, 600)
  }

  return (
    <section id="demo" className="section-dark relative py-24 md:py-32">
      <div className="absolute inset-0 grid-fine opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Live Demo
          </p>
          <h2 className="headline-lg mt-4 text-white">
            Experience the <span className="text-gradient-accent">AI engine</span>
          </h2>
          <p className="mt-4 text-white/50">
            Enter your plot dimensions and watch BuildFlow generate a complete construction
            intelligence package in real time.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] glow-accent">
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-3 font-mono text-xs text-white/30">buildflow — ai engine v1.0</span>
          </div>

          <div className="grid md:grid-cols-2">
            <div className="border-b border-white/10 p-8 md:border-b-0 md:border-r">
              <p className="text-xs font-medium uppercase tracking-wider text-white/30">Input</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs text-white/40">Project Type</label>
                  <select
                    disabled={phase === 'processing'}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent/50 focus:outline-none disabled:opacity-50"
                  >
                    <option>3BHK Residential Villa</option>
                    <option>2BHK Apartment</option>
                    <option>Commercial Space</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/40">Length (m)</label>
                    <input
                      type="number"
                      value={dims.l}
                      onChange={(e) => setDims({ ...dims, l: e.target.value })}
                      disabled={phase === 'processing'}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white focus:border-accent/50 focus:outline-none disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40">Width (m)</label>
                    <input
                      type="number"
                      value={dims.w}
                      onChange={(e) => setDims({ ...dims, w: e.target.value })}
                      disabled={phase === 'processing'}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white focus:border-accent/50 focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>
                {phase === 'idle' && (
                  <button
                    type="button"
                    onClick={run}
                    className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm"
                  >
                    <Sparkles className="h-4 w-4" />
                    Run AI Analysis
                  </button>
                )}
                {phase === 'processing' && (
                  <div className="flex items-center justify-center gap-2 rounded-xl bg-accent/10 py-4 text-sm text-accent-bright">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </div>
                )}
                {phase === 'complete' && (
                  <button
                    type="button"
                    onClick={() => {
                      setPhase('idle')
                      setStepIdx(0)
                    }}
                    className="btn-secondary w-full rounded-xl py-4 text-sm"
                  >
                    Run Again
                  </button>
                )}
              </div>
            </div>

            <div className="p-8">
              <p className="text-xs font-medium uppercase tracking-wider text-white/30">Output</p>
              {phase === 'idle' && (
                <div className="mt-16 text-center">
                  <Sparkles className="mx-auto h-10 w-10 text-white/10" />
                  <p className="mt-4 text-sm text-white/30">Awaiting input...</p>
                </div>
              )}
              {phase === 'processing' && (
                <div className="mt-6 space-y-3">
                  {steps.map((s, i) => (
                    <p
                      key={s}
                      className={`font-mono text-xs ${
                        i <= stepIdx ? 'text-accent-bright' : 'text-white/20'
                      }`}
                    >
                      {i < stepIdx ? '✓' : i === stepIdx ? '→' : '○'} {s}
                    </p>
                  ))}
                </div>
              )}
              {phase === 'complete' && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-white/40">Floor Plan Generated</p>
                    <svg viewBox="0 0 120 80" className="mt-3 w-full">
                      <rect x="2" y="2" width="116" height="76" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                      <line x1="60" y1="2" x2="60" y2="78" stroke="#60a5fa" strokeWidth="1" />
                      <line x1="2" y1="40" x2="60" y2="40" stroke="#60a5fa" strokeWidth="1" />
                    </svg>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/40">Est. Budget</p>
                      <p className="font-mono text-lg font-medium text-white">
                        ₹{(Number(dims.l) * Number(dims.w) * 28000).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/40">Timeline</p>
                      <p className="font-mono text-lg font-medium text-white">16–20 wks</p>
                    </div>
                  </div>
                  <a href="#cta" className="btn-accent block rounded-xl py-3 text-center text-sm">
                    Get Full Report →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
