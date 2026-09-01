import { useState } from 'react'
import { AlertCircle, Loader2, Sparkles } from 'lucide-react'
import { ApiError, generateFullPlan, type AIFullPlanResult } from '../lib/api'

type Phase = 'idle' | 'processing' | 'complete' | 'error'

const steps = [
  'Analyzing plot dimensions & topography...',
  'Generating optimized floor plan...',
  'Calculating structural requirements...',
  'Building material quantity schedule...',
  'Optimizing cost estimate...',
  'Generating project timeline...',
]

const projectTypeMap: Record<string, string> = {
  '3BHK Residential Villa': 'RESIDENTIAL',
  '2BHK Apartment': 'RESIDENTIAL',
  'Commercial Space': 'COMMERCIAL',
}

export default function AIDemo() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [stepIdx, setStepIdx] = useState(0)
  const [dims, setDims] = useState({ l: '12', w: '10' })
  const [projectType, setProjectType] = useState('3BHK Residential Villa')
  const [result, setResult] = useState<AIFullPlanResult | null>(null)
  const [error, setError] = useState('')

  const run = async () => {
    const plotLength = Number(dims.l)
    const plotWidth = Number(dims.w)

    if (!plotLength || !plotWidth || plotLength <= 0 || plotWidth <= 0) {
      setError('Please enter valid plot dimensions.')
      setPhase('error')
      return
    }

    setPhase('processing')
    setStepIdx(0)
    setError('')
    setResult(null)

    const interval = setInterval(() => {
      setStepIdx((prev) => Math.min(prev + 1, steps.length - 1))
    }, 500)

    try {
      const response = await generateFullPlan({
        plotLength,
        plotWidth,
        projectType: projectTypeMap[projectType] ?? 'RESIDENTIAL',
      })

      clearInterval(interval)
      setStepIdx(steps.length - 1)
      setResult(response.data)
      setPhase('complete')
    } catch (err) {
      clearInterval(interval)
      const message =
        err instanceof ApiError
          ? err.message
          : 'Unable to reach the AI engine. Please try again.'
      setError(message)
      setPhase('error')
    }
  }

  const reset = () => {
    setPhase('idle')
    setStepIdx(0)
    setResult(null)
    setError('')
  }

  const budget = result?.budget.totalEstimate ?? Number(dims.l) * Number(dims.w) * 28000
  const timeline = result?.timeline.totalWeeks ?? 16

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
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
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
                {(phase === 'complete' || phase === 'error') && (
                  <button
                    type="button"
                    onClick={reset}
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
              {phase === 'error' && (
                <div className="mt-8 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <div>
                    <p className="text-sm font-medium text-red-300">Analysis failed</p>
                    <p className="mt-1 text-sm text-red-200/70">{error}</p>
                  </div>
                </div>
              )}
              {phase === 'complete' && result && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-white/40">Floor Plan Generated</p>
                    <div
                      className="mt-3 w-full [&_svg]:w-full"
                      dangerouslySetInnerHTML={{ __html: result.floorPlan.svgLayout }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/40">Est. Budget</p>
                      <p className="font-mono text-lg font-medium text-white">
                        ₹{budget.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/40">Timeline</p>
                      <p className="font-mono text-lg font-medium text-white">
                        {timeline} weeks
                      </p>
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
