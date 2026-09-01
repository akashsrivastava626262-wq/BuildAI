export default function HouseIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b85c38" />
          <stop offset="100%" stopColor="#8b4519" />
        </linearGradient>
        <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef7ed" />
          <stop offset="100%" stopColor="#f5ede4" />
        </linearGradient>
        <linearGradient id="doorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5e3c" />
          <stop offset="100%" stopColor="#6b4423" />
        </linearGradient>
        <pattern id="brickPat" width="16" height="8" patternUnits="userSpaceOnUse">
          <rect width="16" height="8" fill="#f5ede4" />
          <rect x="0" y="0" width="7" height="3.5" fill="#e8d5c4" opacity="0.6" />
          <rect x="8" y="4" width="7" height="3.5" fill="#e8d5c4" opacity="0.6" />
        </pattern>
      </defs>

      {/* Ground */}
      <ellipse cx="200" cy="295" rx="160" ry="18" fill="#2d6a4f" opacity="0.15" />

      {/* Main house body */}
      <rect x="80" y="140" width="240" height="150" rx="4" fill="url(#wallGrad)" stroke="#d6d3d1" strokeWidth="2" />
      <rect x="80" y="140" width="240" height="150" fill="url(#brickPat)" opacity="0.4" />

      {/* Roof */}
      <polygon points="200,60 320,150 80,150" fill="url(#roofGrad)" />
      <polygon points="200,60 320,150 80,150" fill="none" stroke="#6b3410" strokeWidth="1.5" opacity="0.3" />

      {/* Chimney */}
      <rect x="260" y="90" width="28" height="60" fill="#a04d2e" rx="2" />
      <rect x="256" y="86" width="36" height="8" fill="#8b4519" rx="2" />

      {/* Windows */}
      {[
        { x: 110, y: 175 },
        { x: 170, y: 175 },
        { x: 230, y: 175 },
        { x: 290, y: 175 },
      ].map((w, i) => (
        <g key={i}>
          <rect x={w.x} y={w.y} width="44" height="50" rx="3" fill="#87ceeb" opacity="0.5" stroke="#3b7c8c" strokeWidth="1.5" />
          <line x1={w.x + 22} y1={w.y} x2={w.x + 22} y2={w.y + 50} stroke="#3b7c8c" strokeWidth="1" />
          <line x1={w.x} y1={w.y + 25} x2={w.x + 44} y2={w.y + 25} stroke="#3b7c8c" strokeWidth="1" />
        </g>
      ))}

      {/* Door */}
      <rect x="168" y="220" width="64" height="70" rx="4" fill="url(#doorGrad)" />
      <circle cx="220" cy="258" r="4" fill="#d4a574" />

      {/* Porch */}
      <rect x="155" y="285" width="90" height="8" rx="2" fill="#8b5e3c" />
      <rect x="160" y="278" width="6" height="15" fill="#8b5e3c" />
      <rect x="234" y="278" width="6" height="15" fill="#8b5e3c" />

      {/* Trees */}
      <ellipse cx="50" cy="250" rx="25" ry="35" fill="#2d6a4f" opacity="0.7" />
      <rect x="46" y="270" width="8" height="25" fill="#8b5e3c" />
      <ellipse cx="350" cy="245" rx="30" ry="40" fill="#40916c" opacity="0.6" />
      <rect x="346" y="268" width="8" height="28" fill="#8b5e3c" />

      {/* Fence */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={30 + i * 14} y={275} width="6" height="20" fill="#d4a574" rx="1" />
      ))}

      {/* Sun */}
      <circle cx="340" cy="50" r="28" fill="#fbbf24" opacity="0.8" />
      <circle cx="340" cy="50" r="35" fill="#fbbf24" opacity="0.15" />
    </svg>
  )
}
