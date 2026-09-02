import { useState } from 'react'
import { AlertCircle, Loader2, Sparkles } from 'lucide-react'
import { ApiError, generateFullPlan, type AIFullPlanResult } from '../lib/api'

type Phase = 'idle' | 'processing' | 'complete' | 'error'

const SQFT_PER_SQM = 10.7639
const FEET_PER_METER = 3.28084

const steps = [
  'Analyzing plot dimensions & topography...',
  'Generating optimized floor plan...',
  'Calculating structural requirements...',
  'Building material quantity schedule...',
  'Optimizing cost estimate...',
  'Generating project timeline...',
]

export const PROJECT_TYPE_OPTIONS = [
  { label: '1 BHK', apiType: 'RESIDENTIAL' },
  { label: '2 BHK', apiType: 'RESIDENTIAL' },
  { label: '3 BHK', apiType: 'RESIDENTIAL' },
  { label: '4 BHK', apiType: 'RESIDENTIAL' },
  { label: 'Plot / Land', apiType: 'LAND' },
  { label: 'Single Room', apiType: 'RESIDENTIAL' },
  { label: 'Land to Apartment', apiType: 'LAND_TO_APARTMENT', requiresApartmentCount: true },
] as const

function sqftToMeters(value: number) {
  return value / FEET_PER_METER
}

export default function AIDemo() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [stepIdx, setStepIdx] = useState(0)
  const [dims, setDims] = useState({ length: '40', breadth: '30' })
  const [projectType, setProjectType] = useState<string>(PROJECT_TYPE_OPTIONS[2].label)
  const [apartmentCount, setApartmentCount] = useState('4')
  const [result, setResult] = useState<AIFullPlanResult | null>(null)
  const [error, setError] = useState('')

  const selectedOption = PROJECT_TYPE_OPTIONS.find((option) => option.label === projectType)
  const showApartmentCount =
    selectedOption !== undefined &&
    'requiresApartmentCount' in selectedOption &&
    selectedOption.requiresApartmentCount === true
  const plotAreaSqFt = Number(dims.length) * Number(dims.breadth)

  const run = async () => {
    const lengthSqFt = Number(dims.length)
    const breadthSqFt = Number(dims.breadth)

    if (!lengthSqFt || !breadthSqFt || lengthSqFt <= 0 || breadthSqFt <= 0) {
      setError('Please enter valid length and breadth in square feet.')
      setPhase('error')
      return
    }

    if (showApartmentCount) {
      const units = Number(apartmentCount)
      if (!units || units <= 0 || !Number.isInteger(units)) {
        setError('Please enter how many apartments can be built on this land.')
        setPhase('error')
        return
      }
    }

    setPhase('processing')
    setStepIdx(0)
    setError('')
    setResult(null)

    const interval = setInterval(() => {
      setStepIdx((prev) => Math.min(prev + 1, steps.length - 1))
    }, 500)

    const description = showApartmentCount
      ? `${projectType} — ${apartmentCount} apartments on ${plotAreaSqFt.toLocaleString('en-IN')} sq.ft plot`
      : `${projectType} — ${plotAreaSqFt.toLocaleString('en-IN')} sq.ft plot`

    try {
      const response = await generateFullPlan({
        plotLength: sqftToMeters(lengthSqFt),
        plotWidth: sqftToMeters(breadthSqFt),
        projectType: selectedOption?.apiType ?? 'RESIDENTIAL',
        description,
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
          : 'Unable to reach the AI engine. The server may be starting up — please try again in a minute.'
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

  const costPerSqFt =
    selectedOption?.apiType === 'LAND_TO_APARTMENT'
      ? 4200
      : selectedOption?.apiType === 'LAND'
        ? 1800
        : 2800
  const budget =
    result?.budget.totalEstimate ?? Math.round(plotAreaSqFt * costPerSqFt)
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
            Select your project type, enter plot dimensions in square feet, and watch BuildFlow
            generate a complete construction intelligence package in real time.
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
                    {PROJECT_TYPE_OPTIONS.map((option) => (
                      <option key={option.label} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {showApartmentCount && (
                  <div>
                    <label className="text-xs text-white/40">
                      How many apartments can be built?
                    </label>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={apartmentCount}
                      onChange={(e) => setApartmentCount(e.target.value)}
                      disabled={phase === 'processing'}
                      placeholder="e.g. 8"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none disabled:opacity-50"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/40">Length (sq.ft)</label>
                    <input
                      type="number"
                      min={1}
                      value={dims.length}
                      onChange={(e) => setDims({ ...dims, length: e.target.value })}
                      disabled={phase === 'processing'}
                      placeholder="e.g. 40"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40">Breadth (sq.ft)</label>
                    <input
                      type="number"
                      min={1}
                      value={dims.breadth}
                      onChange={(e) => setDims({ ...dims, breadth: e.target.value })}
                      disabled={phase === 'processing'}
                      placeholder="e.g. 30"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                {Number(dims.length) > 0 && Number(dims.breadth) > 0 && (
                  <p className="text-xs text-white/35">
                    Total plot area:{' '}
                    <span className="font-mono text-white/55">
                      {plotAreaSqFt.toLocaleString('en-IN')} sq.ft
                    </span>{' '}
                    ({(plotAreaSqFt / SQFT_PER_SQM).toFixed(1)} sq.m)
                  </p>
                )}

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
                    <p className="mt-1 text-xs text-white/30">
                      {projectType}
                      {showApartmentCount ? ` · ${apartmentCount} apartments` : ''} ·{' '}
                      {plotAreaSqFt.toLocaleString('en-IN')} sq.ft
                    </p>
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
