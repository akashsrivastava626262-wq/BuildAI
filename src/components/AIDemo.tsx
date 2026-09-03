import { useState } from 'react'
import { AlertCircle, ChevronDown, Loader2, Mail, Sparkles } from 'lucide-react'
import {
  ApiError,
  emailAIReport,
  type AIFullPlanResult,
  type ConstructionEstimatePayload,
} from '../lib/api'
import { generateLocalFullPlan } from '../lib/estimator/generate-plan'
import { MissingInputsError } from '../lib/estimator/errors'

type Phase = 'idle' | 'processing' | 'complete' | 'error'

const SQFT_PER_SQM = 10.7639

const steps = [
  'Reading your project details...',
  'Estimating built-up area & structure...',
  'Calculating cement, sand & steel...',
  'Computing brickwork & labour...',
  'Applying local material rates...',
  'Preparing cost breakdown...',
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

export default function AIDemo() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [stepIdx, setStepIdx] = useState(0)
  const [plotLengthFt, setPlotLengthFt] = useState('30')
  const [plotBreadthFt, setPlotBreadthFt] = useState('30')
  const [city, setCity] = useState('')
  const [numberOfFloors, setNumberOfFloors] = useState('1')
  const [projectType, setProjectType] = useState<string>(PROJECT_TYPE_OPTIONS[0].label)
  const [apartmentCount, setApartmentCount] = useState('4')
  const [result, setResult] = useState<AIFullPlanResult | null>(null)
  const [error, setError] = useState('')
  const [showBreakdown, setShowBreakdown] = useState(true)
  const [reportEmail, setReportEmail] = useState('')
  const [reportName, setReportName] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [emailError, setEmailError] = useState('')

  const selectedOption = PROJECT_TYPE_OPTIONS.find((option) => option.label === projectType)
  const showApartmentCount =
    selectedOption !== undefined &&
    'requiresApartmentCount' in selectedOption &&
    selectedOption.requiresApartmentCount === true

  const plotAreaSqFt = Number(plotLengthFt) * Number(plotBreadthFt)

  const buildPayload = (): ConstructionEstimatePayload => ({
    plotLengthFt: Number(plotLengthFt),
    plotBreadthFt: Number(plotBreadthFt),
    city: city.trim(),
    projectLabel: projectType,
    projectType: selectedOption?.apiType,
    numberOfFloors: Number(numberOfFloors) || 1,
    apartmentCount: showApartmentCount ? Number(apartmentCount) : undefined,
  })

  const run = async () => {
    if (!plotLengthFt || !plotBreadthFt || Number(plotLengthFt) <= 0 || Number(plotBreadthFt) <= 0) {
      setError('Please enter valid plot length and breadth in feet.')
      setPhase('error')
      return
    }
    if (!city.trim()) {
      setError('Please enter your city for local material rates.')
      setPhase('error')
      return
    }

    setPhase('processing')
    setStepIdx(0)
    setError('')
    setResult(null)

    const interval = setInterval(() => {
      setStepIdx((prev) => Math.min(prev + 1, steps.length - 1))
    }, 450)

    try {
      // Runs in-browser so the demo works without a live backend tunnel.
      const data = generateLocalFullPlan(buildPayload())
      clearInterval(interval)
      setStepIdx(steps.length - 1)
      setResult(data)
      setPhase('complete')
    } catch (err) {
      clearInterval(interval)
      if (err instanceof MissingInputsError) {
        setError(err.missingFields.map((f) => f.label).join(', ') + ' required.')
      } else {
        setError(err instanceof Error ? err.message : 'Could not calculate estimate. Please check your inputs.')
      }
      setPhase('error')
    }
  }

  const reset = () => {
    setPhase('idle')
    setStepIdx(0)
    setResult(null)
    setError('')
    setEmailStatus('idle')
    setEmailError('')
  }

  const sendReport = async () => {
    if (!reportEmail || !reportName.trim()) {
      setEmailError('Please enter your name and email.')
      setEmailStatus('error')
      return
    }
    setEmailStatus('sending')
    setEmailError('')
    try {
      await emailAIReport({
        ...buildPayload(),
        email: reportEmail,
        name: reportName,
        plotAreaSqFt,
      })
      setEmailStatus('sent')
    } catch (err) {
      setEmailStatus('error')
      setEmailError(err instanceof ApiError ? err.message : 'Could not send report.')
    }
  }

  const estimate = result?.budget.estimate
  const budget = result?.budget.totalEstimate ?? 0
  const timeline = result?.timeline.totalWeeks ?? 0

  return (
    <section id="demo" className="section-dark relative py-24 md:py-32">
      <div className="absolute inset-0 grid-fine opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Live Demo</p>
          <h2 className="headline-lg mt-4 text-white">
            AI <span className="text-gradient-accent">cost estimation</span>
          </h2>
          <p className="mt-4 text-white/50">
            Enter a few basic details — plot size, project type, and city. BuildFlow approximates
            the rest using standard engineering formulas for a quick demo estimate.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] glow-accent">
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-3 font-mono text-xs text-white/30">buildflow — demo qs engine</span>
          </div>

          <div className="grid lg:grid-cols-2">
            <div className="border-b border-white/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
              <p className="text-xs font-medium uppercase tracking-wider text-white/30">Quick inputs</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs text-white/40">Project type</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    disabled={phase === 'processing'}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent/50 focus:outline-none"
                  >
                    {PROJECT_TYPE_OPTIONS.map((o) => (
                      <option key={o.label} value={o.label}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {showApartmentCount && (
                  <div>
                    <label className="text-xs text-white/40">Apartments on plot</label>
                    <input
                      type="number"
                      min={1}
                      value={apartmentCount}
                      onChange={(e) => setApartmentCount(e.target.value)}
                      disabled={phase === 'processing'}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white focus:border-accent/50 focus:outline-none"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/40">Plot length (ft)</label>
                    <input
                      type="number"
                      value={plotLengthFt}
                      onChange={(e) => setPlotLengthFt(e.target.value)}
                      disabled={phase === 'processing'}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white focus:border-accent/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40">Plot breadth (ft)</label>
                    <input
                      type="number"
                      value={plotBreadthFt}
                      onChange={(e) => setPlotBreadthFt(e.target.value)}
                      disabled={phase === 'processing'}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white focus:border-accent/50 focus:outline-none"
                    />
                  </div>
                </div>

                {plotAreaSqFt > 0 && (
                  <p className="text-xs text-white/35">
                    Plot area: {plotAreaSqFt.toLocaleString('en-IN')} sq.ft ({(plotAreaSqFt / SQFT_PER_SQM).toFixed(1)} sq.m)
                  </p>
                )}

                <div>
                  <label className="text-xs text-white/40">City / location</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Kanpur"
                    disabled={phase === 'processing'}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/40">Number of floors (optional)</label>
                  <input
                    type="number"
                    min={1}
                    value={numberOfFloors}
                    onChange={(e) => setNumberOfFloors(e.target.value)}
                    disabled={phase === 'processing'}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white focus:border-accent/50 focus:outline-none"
                  />
                </div>

                <p className="text-xs text-white/30">
                  Demo mode uses approximate built-up area, foundation, and structure specs based on your project type.
                </p>

                {phase === 'idle' && (
                  <button type="button" onClick={run} className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm">
                    <Sparkles className="h-4 w-4" />
                    Calculate Construction Cost
                  </button>
                )}
                {phase === 'processing' && (
                  <div className="flex items-center justify-center gap-2 rounded-xl bg-accent/10 py-4 text-sm text-accent-bright">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Calculating...
                  </div>
                )}
                {(phase === 'complete' || phase === 'error') && (
                  <button type="button" onClick={reset} className="btn-secondary w-full rounded-xl py-4 text-sm">Reset</button>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-wider text-white/30">Cost breakdown</p>

              {phase === 'idle' && (
                <div className="mt-16 text-center">
                  <Sparkles className="mx-auto h-10 w-10 text-white/10" />
                  <p className="mt-4 text-sm text-white/30">Enter basic details and run the demo.</p>
                </div>
              )}

              {phase === 'processing' && (
                <div className="mt-6 space-y-3">
                  {steps.map((s, i) => (
                    <p key={s} className={`font-mono text-xs ${i <= stepIdx ? 'text-accent-bright' : 'text-white/20'}`}>
                      {i < stepIdx ? '✓' : i === stepIdx ? '→' : '○'} {s}
                    </p>
                  ))}
                </div>
              )}

              {phase === 'error' && (
                <div className="mt-8 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <div>
                    <p className="text-sm font-medium text-red-300">Cannot calculate</p>
                    <p className="mt-1 text-sm text-red-200/70">{error}</p>
                  </div>
                </div>
              )}

              {phase === 'complete' && result && estimate && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/40">Total cost</p>
                      <p className="font-mono text-lg font-medium text-white">₹{budget.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs text-white/40">Per sq.ft</p>
                      <p className="font-mono text-lg font-medium text-white">₹{estimate.summary.costPerSqFt.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/50">
                    <p>{projectType} · {estimate.city} ({estimate.cityTier}) · {estimate.summary.totalBuiltUpAreaSqFt.toLocaleString('en-IN')} sq.ft · {timeline} weeks</p>
                  </div>

                  {estimate.demoAssumptions && estimate.demoAssumptions.length > 0 && (
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                      <p className="text-xs font-medium text-amber-200/80">Demo approximations used:</p>
                      <ul className="mt-2 space-y-1">
                        {estimate.demoAssumptions.map((a) => (
                          <li key={a} className="text-xs text-amber-100/60">• {a}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-medium text-white/50">Materials</p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono text-white/70">
                      <p>Cement: {estimate.materialQuantities.cementBags} bags</p>
                      <p>Steel: {estimate.materialQuantities.steelKg.toLocaleString('en-IN')} kg</p>
                      <p>Sand: {estimate.materialQuantities.sandCum} m³</p>
                      <p>Bricks: {estimate.materialQuantities.bricks.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <button type="button" onClick={() => setShowBreakdown(!showBreakdown)} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                    Line items & formulas
                    <ChevronDown className={`h-4 w-4 transition-transform ${showBreakdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showBreakdown && (
                    <div className="max-h-48 space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      {estimate.lineItems.map((item) => (
                        <div key={`${item.component}-${item.material}`} className="rounded-lg bg-white/5 p-3 text-xs">
                          <p className="font-medium text-white/80">{item.material}</p>
                          <p className="mt-1 text-white/60">
                            {item.quantity} {item.unit} × ₹{item.unitRate.toLocaleString('en-IN')} = ₹{item.amount.toLocaleString('en-IN')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-medium text-white/50">Email report</p>
                    {emailStatus === 'sent' ? (
                      <p className="mt-2 text-sm text-accent-bright">Sent to {reportEmail}</p>
                    ) : (
                      <div className="mt-3 space-y-2">
                        <input value={reportName} onChange={(e) => setReportName(e.target.value)} placeholder="Your name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none" />
                        <input value={reportEmail} onChange={(e) => setReportEmail(e.target.value)} placeholder="Your email" type="email" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none" />
                        {emailError && <p className="text-xs text-red-300">{emailError}</p>}
                        <button type="button" onClick={sendReport} disabled={emailStatus === 'sending'} className="btn-accent flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm disabled:opacity-60">
                          {emailStatus === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                          Email Report
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
