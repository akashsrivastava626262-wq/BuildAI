import { useState } from 'react'
import { Loader2, Sparkles, Upload } from 'lucide-react'

type DemoPhase = 'idle' | 'uploading' | 'analyzing' | 'generating' | 'complete'

const analysisSteps = [
  'Analyzing room dimensions...',
  'Detecting structural requirements...',
  'Calculating material quantities...',
  'Generating floor plan layout...',
  'Estimating labor & timeline...',
  'Building itemized budget...',
]

export default function AIDemo() {
  const [phase, setPhase] = useState<DemoPhase>('idle')
  const [stepIndex, setStepIndex] = useState(0)
  const [projectType, setProjectType] = useState('3BHK Home')
  const [dimensions, setDimensions] = useState({ length: '12', width: '10' })

  const runDemo = () => {
    setPhase('uploading')
    setStepIndex(0)

    setTimeout(() => {
      setPhase('analyzing')
      let i = 0
      const interval = setInterval(() => {
        i++
        setStepIndex(i)
        if (i >= analysisSteps.length - 1) {
          clearInterval(interval)
          setTimeout(() => setPhase('generating'), 600)
        }
      }, 500)

      setTimeout(() => {
        clearInterval(interval)
        setPhase('complete')
      }, 4000)
    }, 1200)
  }

  const reset = () => {
    setPhase('idle')
    setStepIndex(0)
  }

  return (
    <section id="ai-demo" className="py-16 md:py-20" aria-labelledby="ai-demo-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-4 py-1.5 text-sm font-medium text-blue">
            <Sparkles className="h-4 w-4" />
            Try the AI Planner
          </span>
          <h2
            id="ai-demo-heading"
            className="font-display mt-4 text-3xl font-semibold text-navy md:text-4xl"
          >
            See AI build your plan in seconds
          </h2>
          <p className="mt-4 text-lg text-slate">
            Enter your project details and watch our AI generate a floor plan, material list, and
            budget estimate — live.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-mist bg-white shadow-xl shadow-navy/8">
          <div className="border-b border-mist bg-navy px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-4 text-sm text-white/70">BuildFlow AI Planner</span>
            </div>
          </div>

          <div className="grid gap-0 md:grid-cols-2">
            {/* Input Panel */}
            <div className="border-b border-mist p-6 md:border-b-0 md:border-r">
              <h3 className="font-display font-semibold text-navy">Your Project</h3>

              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="project-type" className="block text-sm font-medium text-slate">
                    Project Type
                  </label>
                  <select
                    id="project-type"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    disabled={phase !== 'idle'}
                    className="mt-1 w-full rounded-lg border border-mist bg-warm-white px-3 py-2.5 text-sm focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20 disabled:opacity-60"
                  >
                    <option>3BHK Home</option>
                    <option>2BHK Apartment</option>
                    <option>Room Addition</option>
                    <option>Commercial Space</option>
                    <option>School Building</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="length" className="block text-sm font-medium text-slate">
                      Length (m)
                    </label>
                    <input
                      id="length"
                      type="number"
                      value={dimensions.length}
                      onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                      disabled={phase !== 'idle'}
                      className="mt-1 w-full rounded-lg border border-mist bg-warm-white px-3 py-2.5 text-sm focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label htmlFor="width" className="block text-sm font-medium text-slate">
                      Width (m)
                    </label>
                    <input
                      id="width"
                      type="number"
                      value={dimensions.width}
                      onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                      disabled={phase !== 'idle'}
                      className="mt-1 w-full rounded-lg border border-mist bg-warm-white px-3 py-2.5 text-sm focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate">Site Photo</label>
                  <div className="mt-1 flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-mist bg-warm-gray">
                    <div className="text-center">
                      <Upload className="mx-auto h-6 w-6 text-slate" />
                      <p className="mt-1 text-xs text-slate">Sample plot uploaded</p>
                    </div>
                  </div>
                </div>

                {phase === 'idle' ? (
                  <button
                    type="button"
                    onClick={runDemo}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate AI Plan
                  </button>
                ) : phase === 'complete' ? (
                  <button
                    type="button"
                    onClick={reset}
                    className="w-full rounded-lg border-2 border-blue py-3 text-sm font-semibold text-blue transition-colors hover:bg-blue/5"
                  >
                    Try Again
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-blue/10 py-3 text-sm font-medium text-blue">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI is working...
                  </div>
                )}
              </div>
            </div>

            {/* Output Panel */}
            <div className="relative min-h-[360px] bg-warm-gray p-6">
              {phase === 'idle' && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Sparkles className="h-12 w-12 text-mist" />
                  <p className="mt-4 text-sm text-slate">
                    Click &quot;Generate AI Plan&quot; to see the magic
                  </p>
                </div>
              )}

              {(phase === 'uploading' || phase === 'analyzing' || phase === 'generating') && (
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg bg-white p-4">
                    <div
                      className="absolute left-0 right-0 h-0.5 bg-blue ai-shimmer"
                      style={{ animation: 'scan-line 2s ease-in-out infinite' }}
                    />
                    <p className="text-sm font-medium text-navy">Processing your project...</p>
                    <ul className="mt-4 space-y-2">
                      {analysisSteps.map((step, i) => (
                        <li
                          key={step}
                          className={`flex items-center gap-2 text-xs ${
                            i <= stepIndex ? 'text-teal' : 'text-mist'
                          }`}
                        >
                          {i < stepIndex ? '✓' : i === stepIndex ? '→' : '○'} {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {phase === 'complete' && (
                <div className="space-y-4 animate-fade-up">
                  <div className="rounded-lg bg-white p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate">
                      AI Floor Plan — {projectType}
                    </p>
                    <svg viewBox="0 0 120 90" className="mt-3 w-full">
                      <rect x="2" y="2" width="116" height="86" fill="none" stroke="#2D6CDF" strokeWidth="2" />
                      <line x1="60" y1="2" x2="60" y2="86" stroke="#2D6CDF" strokeWidth="1.5" />
                      <line x1="2" y1="45" x2="60" y2="45" stroke="#2D6CDF" strokeWidth="1.5" />
                      <rect x="65" y="50" width="48" height="35" fill="none" stroke="#0D9488" strokeWidth="1.5" />
                      <text x="30" y="28" fontSize="7" fill="#5C6678" textAnchor="middle">Living</text>
                      <text x="30" y="68" fontSize="7" fill="#5C6678" textAnchor="middle">Bedroom 1</text>
                      <text x="89" y="68" fontSize="7" fill="#5C6678" textAnchor="middle">Kitchen</text>
                      <text x="89" y="28" fontSize="7" fill="#5C6678" textAnchor="middle">Bedroom 2</text>
                    </svg>
                    <p className="mt-2 font-mono text-xs text-slate">
                      {dimensions.length}m × {dimensions.width}m · {Number(dimensions.length) * Number(dimensions.width)} sq.m
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white p-3">
                      <p className="text-xs text-slate">Total Budget</p>
                      <p className="font-mono text-lg font-medium text-sage">₹{(Number(dimensions.length) * Number(dimensions.width) * 28000).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                      <p className="text-xs text-slate">Timeline</p>
                      <p className="font-mono text-lg font-medium text-blue">16–20 weeks</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-3">
                    <p className="text-xs font-medium text-slate">Top Materials</p>
                    <div className="mt-2 space-y-1 font-mono text-xs">
                      <div className="flex justify-between">
                        <span>Cement (bags)</span>
                        <span className="text-navy">{Math.round(Number(dimensions.length) * Number(dimensions.width) * 8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TMT Steel (tons)</span>
                        <span className="text-navy">{(Number(dimensions.length) * Number(dimensions.width) * 0.12).toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bricks (thousands)</span>
                        <span className="text-navy">{(Number(dimensions.length) * Number(dimensions.width) * 0.8).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#cta"
                    className="block w-full rounded-lg bg-teal py-2.5 text-center text-sm font-semibold text-white hover:bg-teal/90"
                  >
                    Save Plan & Get Full Report →
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
