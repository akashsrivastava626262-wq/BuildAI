import { useMemo, useState } from 'react'
import { AlertCircle, ChevronDown, Loader2, Mail, Sparkles } from 'lucide-react'
import {
  ApiError,
  emailAIReport,
  generateFullPlan,
  type AIFullPlanResult,
  type ConstructionEstimatePayload,
  type MissingField,
} from '../lib/api'

type Phase = 'idle' | 'processing' | 'complete' | 'error'

const SQFT_PER_SQM = 10.7639

const steps = [
  'Validating engineering inputs...',
  'Calculating concrete volumes...',
  'Estimating cement, sand & aggregate...',
  'Computing steel quantities...',
  'Calculating brickwork & plaster...',
  'Applying unit rates & labor costs...',
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

type FormState = {
  plotLengthFt: string
  plotBreadthFt: string
  city: string
  builtUpAreaPerFloorSqFt: string
  numberOfFloors: string
  floorHeightFt: string
  foundationType: 'isolated_footing' | 'strip_footing' | 'raft'
  foundationDepthFt: string
  footingLengthFt: string
  footingWidthFt: string
  columnCount: string
  columnSizeInches: string
  stripFootingWidthFt: string
  raftThicknessMm: string
  slabThicknessMm: string
  beamLengthPerFloorFt: string
  beamWidthInches: string
  beamDepthInches: string
  totalMasonryWallAreaSqFt: string
  wallThicknessInches: string
  plasterThicknessMm: string
  concreteGradeFoundation: 'M20' | 'M25'
  concreteGradeStructure: 'M20' | 'M25'
  numberOfBathrooms: string
  finishingLevel: 'basic' | 'standard' | 'premium'
  pccThicknessMm: string
}

const initialForm: FormState = {
  plotLengthFt: '40',
  plotBreadthFt: '30',
  city: '',
  builtUpAreaPerFloorSqFt: '',
  numberOfFloors: '1',
  floorHeightFt: '10',
  foundationType: 'isolated_footing',
  foundationDepthFt: '5',
  footingLengthFt: '',
  footingWidthFt: '',
  columnCount: '',
  columnSizeInches: '9',
  stripFootingWidthFt: '',
  raftThicknessMm: '',
  slabThicknessMm: '125',
  beamLengthPerFloorFt: '',
  beamWidthInches: '9',
  beamDepthInches: '12',
  totalMasonryWallAreaSqFt: '',
  wallThicknessInches: '9',
  plasterThicknessMm: '12',
  concreteGradeFoundation: 'M25',
  concreteGradeStructure: 'M20',
  numberOfBathrooms: '1',
  finishingLevel: 'standard',
  pccThicknessMm: '75',
}

function parseNum(value: string): number | undefined {
  const n = Number(value)
  return value.trim() !== '' && !Number.isNaN(n) && n > 0 ? n : undefined
}

function Field({
  label,
  name,
  value,
  onChange,
  unit,
  placeholder,
  disabled,
  highlight,
  type = 'text',
}: {
  label: string
  name: string
  value: string
  onChange: (name: string, value: string) => void
  unit?: string
  placeholder?: string
  disabled?: boolean
  highlight?: boolean
  type?: string
}) {
  return (
    <div>
      <label className="text-xs text-white/40">
        {label}
        {unit ? ` (${unit})` : ''}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-xl border px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50 ${
          highlight
            ? 'border-amber-500/60 bg-amber-500/10 focus:border-amber-400'
            : 'border-white/10 bg-white/5 focus:border-accent/50'
        }`}
      />
    </div>
  )
}

export default function AIDemo() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [stepIdx, setStepIdx] = useState(0)
  const [form, setForm] = useState<FormState>(initialForm)
  const [projectType, setProjectType] = useState<string>(PROJECT_TYPE_OPTIONS[0].label)
  const [apartmentCount, setApartmentCount] = useState('4')
  const [result, setResult] = useState<AIFullPlanResult | null>(null)
  const [error, setError] = useState('')
  const [missingFields, setMissingFields] = useState<MissingField[]>([])
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

  const plotAreaSqFt = Number(form.plotLengthFt) * Number(form.plotBreadthFt)
  const missingFieldNames = useMemo(() => new Set(missingFields.map((f) => f.field)), [missingFields])

  const updateForm = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setMissingFields((prev) => prev.filter((f) => f.field !== name))
  }

  const buildPayload = (): ConstructionEstimatePayload => ({
    plotLengthFt: parseNum(form.plotLengthFt),
    plotBreadthFt: parseNum(form.plotBreadthFt),
    builtUpAreaPerFloorSqFt: parseNum(form.builtUpAreaPerFloorSqFt),
    numberOfFloors: parseNum(form.numberOfFloors),
    floorHeightFt: parseNum(form.floorHeightFt),
    foundationType: form.foundationType,
    foundationDepthFt: parseNum(form.foundationDepthFt),
    footingLengthFt: parseNum(form.footingLengthFt),
    footingWidthFt: parseNum(form.footingWidthFt),
    columnCount: parseNum(form.columnCount),
    columnSizeInches: parseNum(form.columnSizeInches),
    stripFootingWidthFt: parseNum(form.stripFootingWidthFt),
    raftThicknessMm: parseNum(form.raftThicknessMm),
    slabThicknessMm: parseNum(form.slabThicknessMm),
    beamLengthPerFloorFt: parseNum(form.beamLengthPerFloorFt),
    beamWidthInches: parseNum(form.beamWidthInches),
    beamDepthInches: parseNum(form.beamDepthInches),
    totalMasonryWallAreaSqFt: parseNum(form.totalMasonryWallAreaSqFt),
    wallThicknessInches: Number(form.wallThicknessInches) as 4.5 | 9,
    plasterThicknessMm: parseNum(form.plasterThicknessMm),
    concreteGradeFoundation: form.concreteGradeFoundation,
    concreteGradeStructure: form.concreteGradeStructure,
    numberOfBathrooms: parseNum(form.numberOfBathrooms),
    finishingLevel: form.finishingLevel,
    city: form.city.trim() || undefined,
    pccThicknessMm: parseNum(form.pccThicknessMm),
    projectType: selectedOption?.apiType,
    apartmentCount: showApartmentCount ? parseNum(apartmentCount) : undefined,
  })

  const run = async () => {
    setPhase('processing')
    setStepIdx(0)
    setError('')
    setMissingFields([])
    setResult(null)

    const interval = setInterval(() => {
      setStepIdx((prev) => Math.min(prev + 1, steps.length - 1))
    }, 500)

    try {
      const response = await generateFullPlan(buildPayload())
      clearInterval(interval)
      setStepIdx(steps.length - 1)
      setResult(response.data)
      setPhase('complete')
    } catch (err) {
      clearInterval(interval)
      if (err instanceof ApiError && err.code === 'MISSING_INPUTS' && err.missingFields) {
        setMissingFields(err.missingFields)
        setError('Please provide the missing engineering details below for an accurate cost estimate.')
        setPhase('error')
        return
      }
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to reach the estimation engine. The backend server may be offline — please try again in a few minutes or contact us via Book a Demo.',
      )
      setPhase('error')
    }
  }

  const reset = () => {
    setPhase('idle')
    setStepIdx(0)
    setResult(null)
    setError('')
    setMissingFields([])
    setEmailStatus('idle')
    setEmailError('')
  }

  const sendReport = async () => {
    if (!reportEmail || !reportName.trim()) {
      setEmailError('Please enter your name and email to receive the report.')
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
        projectLabel: projectType,
        plotAreaSqFt,
      })
      setEmailStatus('sent')
    } catch (err) {
      setEmailStatus('error')
      setEmailError(err instanceof ApiError ? err.message : 'Could not send report by email.')
    }
  }

  const estimate = result?.budget.estimate
  const budget = result?.budget.totalEstimate ?? 0
  const timeline = result?.timeline.totalWeeks ?? 0

  const inputCls = (field: string) => missingFieldNames.has(field)

  return (
    <section id="demo" className="section-dark relative py-24 md:py-32">
      <div className="absolute inset-0 grid-fine opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Cost Engine</p>
          <h2 className="headline-lg mt-4 text-white">
            Engineering-based <span className="text-gradient-accent">cost estimation</span>
          </h2>
          <p className="mt-4 text-white/50">
            Uses standard quantity estimation formulas for cement, sand, steel, bricks, concrete,
            labour, and finishing. No assumed values — all critical inputs must be provided.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] glow-accent">
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-3 font-mono text-xs text-white/30">buildflow — qs engine v2.0</span>
          </div>

          <div className="grid lg:grid-cols-2">
            <div className="border-b border-white/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
              <p className="text-xs font-medium uppercase tracking-wider text-white/30">Project inputs</p>

              {missingFields.length > 0 && (
                <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                  <p className="text-sm font-medium text-amber-200">Missing information required:</p>
                  <ul className="mt-2 space-y-1">
                    {missingFields.map((f) => (
                      <li key={f.field} className="text-xs text-amber-100/80">
                        • {f.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <p className="text-xs font-medium text-white/40">Plot & location</p>
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
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Plot length" name="plotLengthFt" value={form.plotLengthFt} onChange={updateForm} unit="ft" highlight={inputCls('plotLengthFt')} disabled={phase === 'processing'} type="number" />
                    <Field label="Plot breadth" name="plotBreadthFt" value={form.plotBreadthFt} onChange={updateForm} unit="ft" highlight={inputCls('plotBreadthFt')} disabled={phase === 'processing'} type="number" />
                  </div>
                  <Field label="City / location" name="city" value={form.city} onChange={updateForm} placeholder="e.g. Lucknow" highlight={inputCls('city')} disabled={phase === 'processing'} />
                  {plotAreaSqFt > 0 && (
                    <p className="text-xs text-white/35">Plot area: {plotAreaSqFt.toLocaleString('en-IN')} sq.ft ({(plotAreaSqFt / SQFT_PER_SQM).toFixed(1)} sq.m)</p>
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-medium text-white/40">Building</p>
                  <Field label="Built-up area per floor" name="builtUpAreaPerFloorSqFt" value={form.builtUpAreaPerFloorSqFt} onChange={updateForm} unit="sq.ft" highlight={inputCls('builtUpAreaPerFloorSqFt')} disabled={phase === 'processing'} type="number" />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Number of floors" name="numberOfFloors" value={form.numberOfFloors} onChange={updateForm} highlight={inputCls('numberOfFloors')} disabled={phase === 'processing'} type="number" />
                    <Field label="Floor height" name="floorHeightFt" value={form.floorHeightFt} onChange={updateForm} unit="ft" highlight={inputCls('floorHeightFt')} disabled={phase === 'processing'} type="number" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Bathrooms" name="numberOfBathrooms" value={form.numberOfBathrooms} onChange={updateForm} highlight={inputCls('numberOfBathrooms')} disabled={phase === 'processing'} type="number" />
                    <div>
                      <label className="text-xs text-white/40">Finishing level</label>
                      <select value={form.finishingLevel} onChange={(e) => updateForm('finishingLevel', e.target.value)} disabled={phase === 'processing'} className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent/50 focus:outline-none">
                        <option value="basic">Basic</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>
                  </div>
                  {showApartmentCount && (
                    <Field label="Apartments on plot" name="apartmentCount" value={apartmentCount} onChange={(_, v) => setApartmentCount(v)} disabled={phase === 'processing'} type="number" />
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-medium text-white/40">Foundation</p>
                  <div>
                    <label className="text-xs text-white/40">Foundation type</label>
                    <select value={form.foundationType} onChange={(e) => updateForm('foundationType', e.target.value)} disabled={phase === 'processing'} className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent/50 focus:outline-none">
                      <option value="isolated_footing">Isolated footing</option>
                      <option value="strip_footing">Strip footing</option>
                      <option value="raft">Raft foundation</option>
                    </select>
                  </div>
                  <Field label="Foundation depth" name="foundationDepthFt" value={form.foundationDepthFt} onChange={updateForm} unit="ft" highlight={inputCls('foundationDepthFt')} disabled={phase === 'processing'} type="number" />
                  {form.foundationType === 'isolated_footing' && (
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Footing length" name="footingLengthFt" value={form.footingLengthFt} onChange={updateForm} unit="ft" highlight={inputCls('footingLengthFt')} disabled={phase === 'processing'} type="number" />
                      <Field label="Footing width" name="footingWidthFt" value={form.footingWidthFt} onChange={updateForm} unit="ft" highlight={inputCls('footingWidthFt')} disabled={phase === 'processing'} type="number" />
                      <Field label="Column count" name="columnCount" value={form.columnCount} onChange={updateForm} highlight={inputCls('columnCount')} disabled={phase === 'processing'} type="number" />
                      <Field label="Column size" name="columnSizeInches" value={form.columnSizeInches} onChange={updateForm} unit="in" highlight={inputCls('columnSizeInches')} disabled={phase === 'processing'} type="number" />
                    </div>
                  )}
                  {form.foundationType === 'strip_footing' && (
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Strip footing width" name="stripFootingWidthFt" value={form.stripFootingWidthFt} onChange={updateForm} unit="ft" highlight={inputCls('stripFootingWidthFt')} disabled={phase === 'processing'} type="number" />
                      <Field label="Column count" name="columnCount" value={form.columnCount} onChange={updateForm} highlight={inputCls('columnCount')} disabled={phase === 'processing'} type="number" />
                      <Field label="Column size" name="columnSizeInches" value={form.columnSizeInches} onChange={updateForm} unit="in" highlight={inputCls('columnSizeInches')} disabled={phase === 'processing'} type="number" />
                    </div>
                  )}
                  {form.foundationType === 'raft' && (
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Raft thickness" name="raftThicknessMm" value={form.raftThicknessMm} onChange={updateForm} unit="mm" highlight={inputCls('raftThicknessMm')} disabled={phase === 'processing'} type="number" />
                      <Field label="Column count" name="columnCount" value={form.columnCount} onChange={updateForm} highlight={inputCls('columnCount')} disabled={phase === 'processing'} type="number" />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-medium text-white/40">Structure & masonry</p>
                  <Field label="RCC slab thickness" name="slabThicknessMm" value={form.slabThicknessMm} onChange={updateForm} unit="mm" highlight={inputCls('slabThicknessMm')} disabled={phase === 'processing'} type="number" />
                  <Field label="Total beam length per floor" name="beamLengthPerFloorFt" value={form.beamLengthPerFloorFt} onChange={updateForm} unit="ft" highlight={inputCls('beamLengthPerFloorFt')} disabled={phase === 'processing'} type="number" />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Beam width" name="beamWidthInches" value={form.beamWidthInches} onChange={updateForm} unit="in" highlight={inputCls('beamWidthInches')} disabled={phase === 'processing'} type="number" />
                    <Field label="Beam depth" name="beamDepthInches" value={form.beamDepthInches} onChange={updateForm} unit="in" highlight={inputCls('beamDepthInches')} disabled={phase === 'processing'} type="number" />
                  </div>
                  <Field label="Masonry wall area (one face)" name="totalMasonryWallAreaSqFt" value={form.totalMasonryWallAreaSqFt} onChange={updateForm} unit="sq.ft" highlight={inputCls('totalMasonryWallAreaSqFt')} disabled={phase === 'processing'} type="number" />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-white/40">Wall thickness (in)</label>
                      <select value={form.wallThicknessInches} onChange={(e) => updateForm('wallThicknessInches', e.target.value)} disabled={phase === 'processing'} className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent/50 focus:outline-none">
                        <option value="4.5">4.5</option>
                        <option value="9">9</option>
                      </select>
                    </div>
                    <Field label="Plaster thickness" name="plasterThicknessMm" value={form.plasterThicknessMm} onChange={updateForm} unit="mm" highlight={inputCls('plasterThicknessMm')} disabled={phase === 'processing'} type="number" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-white/40">Foundation concrete</label>
                      <select value={form.concreteGradeFoundation} onChange={(e) => updateForm('concreteGradeFoundation', e.target.value)} disabled={phase === 'processing'} className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent/50 focus:outline-none">
                        <option value="M20">M20</option>
                        <option value="M25">M25</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-white/40">Structure concrete</label>
                      <select value={form.concreteGradeStructure} onChange={(e) => updateForm('concreteGradeStructure', e.target.value)} disabled={phase === 'processing'} className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent/50 focus:outline-none">
                        <option value="M20">M20</option>
                        <option value="M25">M25</option>
                      </select>
                    </div>
                  </div>
                </div>

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
                  <p className="mt-4 text-sm text-white/30">Fill all engineering inputs to calculate cost.</p>
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
                    <p className="text-sm font-medium text-red-300">Cannot calculate yet</p>
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
                      <p className="text-xs text-white/40">Cost per sq.ft</p>
                      <p className="font-mono text-lg font-medium text-white">₹{estimate.summary.costPerSqFt.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/50">
                    <p>{estimate.city} ({estimate.cityTier} rates) · {estimate.summary.totalBuiltUpAreaSqFt.toLocaleString('en-IN')} sq.ft built-up · {timeline} weeks</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-medium text-white/50">Material quantities</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono text-white/70">
                      <p>Cement: {estimate.materialQuantities.cementBags} bags</p>
                      <p>Steel: {estimate.materialQuantities.steelKg.toLocaleString('en-IN')} kg</p>
                      <p>Sand: {estimate.materialQuantities.sandCum} m³</p>
                      <p>Aggregate: {estimate.materialQuantities.aggregateCum} m³</p>
                      <p className="col-span-2">Bricks: {estimate.materialQuantities.bricks.toLocaleString('en-IN')} nos</p>
                    </div>
                  </div>

                  <button type="button" onClick={() => setShowBreakdown(!showBreakdown)} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                    Detailed line items (formulas & rates)
                    <ChevronDown className={`h-4 w-4 transition-transform ${showBreakdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showBreakdown && (
                    <div className="max-h-64 space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      {estimate.lineItems.map((item) => (
                        <div key={`${item.component}-${item.material}`} className="rounded-lg bg-white/5 p-3 text-xs">
                          <p className="font-medium text-white/80">{item.component} — {item.material}</p>
                          <p className="mt-1 font-mono text-white/40">{item.formula}</p>
                          <p className="mt-1 text-white/60">
                            {item.quantity} {item.unit} × ₹{item.unitRate.toLocaleString('en-IN')} = <span className="text-accent-bright">₹{item.amount.toLocaleString('en-IN')}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-medium text-white/50">Email full report</p>
                    {emailStatus === 'sent' ? (
                      <p className="mt-3 text-sm text-accent-bright">Report sent to {reportEmail}</p>
                    ) : (
                      <div className="mt-3 space-y-2">
                        <input value={reportName} onChange={(e) => setReportName(e.target.value)} placeholder="Your name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none" />
                        <input value={reportEmail} onChange={(e) => setReportEmail(e.target.value)} placeholder="Your email" type="email" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none" />
                        {emailError && <p className="text-xs text-red-300">{emailError}</p>}
                        <button type="button" onClick={sendReport} disabled={emailStatus === 'sending'} className="btn-accent flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm disabled:opacity-60">
                          {emailStatus === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                          Email Full Report
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
