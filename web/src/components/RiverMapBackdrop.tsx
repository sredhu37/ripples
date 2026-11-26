/**
 * River landscape background for the trail map in Design C.
 * Pure flat SVG code with river banks, water ripples, pine trees, and coastal village markers.
 * Zero external assets, zero emojis.
 */
export function RiverMapBackdrop() {
  return (
    <svg
      className="river-svg-bg"
      viewBox="0 0 800 1200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Soft river gradient */}
        <linearGradient id="riverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#cde8ed" />
          <stop offset="35%" stopColor="#b4dce5" />
          <stop offset="70%" stopColor="#9fcfe0" />
          <stop offset="100%" stopColor="#87c0d6" />
        </linearGradient>
        {/* River banks sand edge */}
        <linearGradient id="bankGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#eae0ce" />
          <stop offset="100%" stopColor="#dfd2bc" />
        </linearGradient>
      </defs>

      {/* Outer river bank sand layer */}
      <path
        d="M 380 0
           C 520 180, 180 340, 240 540
           C 300 740, 640 880, 440 1100
           C 360 1180, 420 1200, 420 1200
           L 320 1200
           C 260 1140, 180 1020, 280 880
           C 440 700, 140 540, 80 380
           C 40 220, 240 60, 240 0
           Z"
        fill="url(#bankGrad)"
        opacity="0.6"
      />

      {/* Main winding river body */}
      <path
        d="M 370 0
           C 500 180, 190 350, 250 540
           C 310 730, 620 880, 430 1100
           C 370 1170, 410 1200, 410 1200
           L 330 1200
           C 280 1150, 200 1030, 290 890
           C 430 710, 160 550, 100 390
           C 60 230, 250 70, 250 0
           Z"
        fill="url(#riverGrad)"
      />

      {/* River water current lines */}
      <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" fill="none">
        <path d="M 300 90 Q 320 120 310 150" />
        <path d="M 350 140 Q 370 170 360 200" />
        <path d="M 220 390 Q 200 420 210 450" />
        <path d="M 260 440 Q 250 480 270 510" />
        <path d="M 360 700 Q 400 730 420 770" />
        <path d="M 430 780 Q 470 820 450 860" />
        <path d="M 380 960 Q 360 1000 370 1040" />
        <path d="M 350 1060 Q 360 1100 350 1140" />
      </g>

      {/* Landmark: Pine Woods (geometric evergreen trees) */}
      <g fill="#4a7c59" opacity="0.8">
        {/* Tree 1 */}
        <polygon points="120,180 105,210 135,210" />
        <polygon points="120,195 100,230 140,230" />
        <rect x="117" y="230" width="6" height="12" fill="#7a4b2f" />

        {/* Tree 2 */}
        <polygon points="160,220 148,245 172,245" />
        <polygon points="160,235 142,265 178,265" />
        <rect x="157" y="265" width="6" height="10" fill="#7a4b2f" />

        {/* Tree 3 (East bank) */}
        <polygon points="680,420 665,450 695,450" />
        <polygon points="680,435 660,470 700,470" />
        <rect x="677" y="470" width="6" height="12" fill="#7a4b2f" />

        {/* Tree 4 */}
        <polygon points="720,460 708,485 732,485" />
        <polygon points="720,475 702,505 738,505" />
        <rect x="717" y="505" width="6" height="10" fill="#7a4b2f" />
      </g>

      {/* Landmark: Coastal Village houses (flat vector shapes) */}
      <g opacity="0.75">
        {/* House 1 */}
        <rect
          x="620"
          y="620"
          width="36"
          height="26"
          fill="#f5eeda"
          stroke="#181a2e"
          strokeWidth="1.5"
        />
        <polygon
          points="616,620 638,602 660,620"
          fill="#d05d3d"
          stroke="#181a2e"
          strokeWidth="1.5"
        />
        <rect x="633" y="632" width="10" height="14" fill="#181a2e" />

        {/* House 2 */}
        <rect
          x="670"
          y="640"
          width="40"
          height="28"
          fill="#fdf8f0"
          stroke="#181a2e"
          strokeWidth="1.5"
        />
        <polygon
          points="665,640 690,622 715,640"
          fill="#1c5d67"
          stroke="#181a2e"
          strokeWidth="1.5"
        />
        <rect x="684" y="652" width="12" height="16" fill="#181a2e" />
      </g>

      {/* Landmark: Harbor boat at river mouth */}
      <g opacity="0.8">
        <path
          d="M 330 1140 C 350 1155, 370 1155, 390 1140 Z"
          fill="#7a4b2f"
          stroke="#181a2e"
          strokeWidth="1.5"
        />
        <line x1="360" y1="1140" x2="360" y2="1115" stroke="#181a2e" strokeWidth="2" />
        <polygon
          points="360,1118 382,1130 360,1134"
          fill="#fdf8f0"
          stroke="#181a2e"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
