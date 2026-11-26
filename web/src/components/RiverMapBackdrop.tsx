/**
 * River landscape background for the trail map matching Ripples-2.pdf Page 1.
 * Pure flat vector SVG code with organic winding cyan river (#74C7E6),
 * sand bank margins (#D9CDA9), dashed navigation centerline, and 4 scenic
 * landmarks: Otto's Den, Market Square, Town Hall, and Harbor.
 * Zero external assets, zero emojis.
 */
export function RiverMapBackdrop() {
  return (
    <svg
      className="river-svg-bg"
      viewBox="0 0 800 1600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* River water gradient */}
        <linearGradient id="riverWater" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#74C7E6" />
          <stop offset="30%" stopColor="#64BCDC" />
          <stop offset="70%" stopColor="#54B0D2" />
          <stop offset="100%" stopColor="#45A3C7" />
        </linearGradient>

        {/* Sand river bank margin */}
        <linearGradient id="sandMargin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D9CDA9" />
          <stop offset="50%" stopColor="#CFC199" />
          <stop offset="100%" stopColor="#C4B58B" />
        </linearGradient>

        {/* Rolling hills gradient */}
        <linearGradient id="meadowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DCE8C8" />
          <stop offset="100%" stopColor="#CAD8B2" />
        </linearGradient>

        {/* Drop shadow for landmark badge banners */}
        <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="0" floodColor="#C3B9A5" floodOpacity="0.8" />
        </filter>
      </defs>

      {/* Landscape Meadow Backdrops / Soft Hills */}
      <ellipse cx="140" cy="220" rx="200" ry="120" fill="url(#meadowGrad)" opacity="0.6" />
      <ellipse cx="680" cy="560" rx="220" ry="140" fill="url(#meadowGrad)" opacity="0.55" />
      <ellipse cx="120" cy="980" rx="240" ry="150" fill="url(#meadowGrad)" opacity="0.6" />
      <ellipse cx="700" cy="1380" rx="260" ry="160" fill="url(#meadowGrad)" opacity="0.5" />

      {/* Outer Sand River Bank */}
      <path
        d="M 380 0
           C 540 180, 180 360, 240 560
           C 300 760, 660 920, 480 1140
           C 340 1300, 560 1480, 420 1600
           L 290 1600
           C 410 1480, 220 1300, 360 1140
           C 520 940, 180 760, 120 560
           C 60 360, 420 180, 260 0
           Z"
        fill="url(#sandMargin)"
        opacity="0.85"
      />

      {/* Main Cyan River Body */}
      <path
        d="M 370 0
           C 520 180, 200 360, 255 560
           C 310 750, 640 915, 465 1135
           C 335 1295, 545 1475, 410 1600
           L 305 1600
           C 425 1475, 235 1295, 375 1135
           C 535 935, 195 755, 135 555
           C 75 355, 405 180, 275 0
           Z"
        fill="url(#riverWater)"
      />

      {/* Dashed Center Navigation Trail Line */}
      <path
        d="M 322 0
           C 462 180, 197 358, 195 558
           C 252 752, 587 925, 420 1135
           C 285 1295, 485 1475, 357 1600"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeDasharray="10 10"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* River Current & Water Ripple Accent Strokes */}
      <g stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" fill="none">
        <path d="M 310 100 Q 335 130 325 160" />
        <path d="M 360 150 Q 380 180 370 210" />
        <path d="M 230 420 Q 210 450 220 480" />
        <path d="M 270 470 Q 260 510 280 540" />
        <path d="M 380 780 Q 420 810 440 850" />
        <path d="M 450 860 Q 490 900 470 940" />
        <path d="M 400 1180 Q 380 1220 390 1260" />
        <path d="M 360 1280 Q 380 1320 370 1360" />
        <path d="M 380 1480 Q 370 1520 360 1560" />
      </g>

      {/* Scenic Evergreen Trees Cluster 1 (Upper Trail) */}
      <g fill="#3A6B4C" opacity="0.85">
        <polygon points="120,120 105,150 135,150" />
        <polygon points="120,135 98,170 142,170" />
        <rect x="117" y="170" width="6" height="12" fill="#7A4B2F" />

        <polygon points="160,150 148,175 172,175" />
        <polygon points="160,165 142,195 178,195" />
        <rect x="157" y="195" width="6" height="10" fill="#7A4B2F" />
      </g>

      {/* LANDMARK 1: Otto's Den (Upper East Bank) */}
      <g transform="translate(560, 160)">
        {/* Den earth mound */}
        <ellipse cx="70" cy="80" rx="65" ry="38" fill="#CBB693" stroke="#A8926F" strokeWidth="2" />
        {/* Entrance arch */}
        <path d="M 52 86 C 52 70, 88 70, 88 86 Z" fill="#2E231C" />
        {/* Den trees */}
        <polygon points="40,30 25,60 55,60" fill="#2D543C" />
        <polygon points="40,45 20,80 60,80" fill="#3A6B4C" />
        <polygon points="100,20 85,50 115,50" fill="#2D543C" />
        <polygon points="100,35 80,70 120,70" fill="#3A6B4C" />

        {/* Landmark Signpost Badge */}
        <g filter="url(#badgeShadow)">
          <rect
            x="10"
            y="95"
            width="120"
            height="32"
            rx="16"
            fill="#FFFFFF"
            stroke="#D5CDC3"
            strokeWidth="1.5"
          />
          <circle cx="28" cy="111" r="7" fill="#F2A838" />
          <text
            x="72"
            y="116"
            fontFamily="'Nunito', sans-serif"
            fontWeight="800"
            fontSize="13"
            fill="#2E231C"
            textAnchor="middle"
          >
            Otto's Den
          </text>
        </g>
      </g>

      {/* LANDMARK 2: Market Square (Mid West Bank) */}
      <g transform="translate(40, 580)">
        {/* Meadow ground */}
        <ellipse cx="80" cy="70" rx="75" ry="36" fill="#D2E0BD" />
        {/* Stall 1 (Terracotta) */}
        <rect x="25" y="45" width="34" height="20" rx="3" fill="#C44525" />
        <rect x="25" y="60" width="34" height="8" rx="2" fill="#B0865C" />
        {/* Stall 2 (Amber) */}
        <rect x="65" y="40" width="34" height="20" rx="3" fill="#F2A838" />
        <rect x="65" y="55" width="34" height="8" rx="2" fill="#B0865C" />
        {/* Stall 3 (Teal) */}
        <rect x="105" y="45" width="34" height="20" rx="3" fill="#1D6A76" />
        <rect x="105" y="60" width="34" height="8" rx="2" fill="#B0865C" />
        {/* Apple Crates */}
        <circle cx="42" cy="72" r="3" fill="#C44525" />
        <circle cx="48" cy="72" r="3" fill="#C44525" />

        {/* Landmark Signpost Badge */}
        <g filter="url(#badgeShadow)">
          <rect
            x="15"
            y="85"
            width="130"
            height="32"
            rx="16"
            fill="#FFFFFF"
            stroke="#D5CDC3"
            strokeWidth="1.5"
          />
          <circle cx="34" cy="101" r="7" fill="#C44525" />
          <text
            x="84"
            y="106"
            fontFamily="'Nunito', sans-serif"
            fontWeight="800"
            fontSize="13"
            fill="#2E231C"
            textAnchor="middle"
          >
            Market Square
          </text>
        </g>
      </g>

      {/* LANDMARK 3: Town Hall (Lower East Bank) */}
      <g transform="translate(580, 960)">
        {/* Foundation hill */}
        <ellipse cx="70" cy="75" rx="65" ry="34" fill="#CAD8B2" />
        {/* Municipal building */}
        <rect
          x="35"
          y="40"
          width="70"
          height="35"
          rx="4"
          fill="#F4EFE6"
          stroke="#2E231C"
          strokeWidth="1.5"
        />
        {/* Roof */}
        <polygon points="30,40 70,16 110,40" fill="#C44525" stroke="#8A2714" strokeWidth="1.5" />
        {/* Bell Tower */}
        <rect
          x="62"
          y="4"
          width="16"
          height="16"
          fill="#F4EFE6"
          stroke="#2E231C"
          strokeWidth="1.5"
        />
        <polygon points="59,4 70,-8 81,4" fill="#1D6A76" />
        <circle cx="70" cy="12" r="3.5" fill="#F2A838" />

        {/* Landmark Signpost Badge */}
        <g filter="url(#badgeShadow)">
          <rect
            x="12"
            y="88"
            width="120"
            height="32"
            rx="16"
            fill="#FFFFFF"
            stroke="#D5CDC3"
            strokeWidth="1.5"
          />
          <circle cx="30" cy="104" r="7" fill="#1D6A76" />
          <text
            x="74"
            y="109"
            fontFamily="'Nunito', sans-serif"
            fontWeight="800"
            fontSize="13"
            fill="#2E231C"
            textAnchor="middle"
          >
            Town Hall
          </text>
        </g>
      </g>

      {/* LANDMARK 4: Harbor (Bottom Estuary) */}
      <g transform="translate(50, 1380)">
        {/* Pier dock */}
        <rect
          x="80"
          y="50"
          width="70"
          height="14"
          rx="2"
          fill="#8B6F4E"
          stroke="#5E462F"
          strokeWidth="1.5"
        />
        <line x1="95" y1="64" x2="95" y2="82" stroke="#5E462F" strokeWidth="2.5" />
        <line x1="125" y1="64" x2="125" y2="82" stroke="#5E462F" strokeWidth="2.5" />
        <line x1="145" y1="64" x2="145" y2="82" stroke="#5E462F" strokeWidth="2.5" />

        {/* Sailboat 1 */}
        <path
          d="M 160 85 C 175 98, 205 98, 220 85 Z"
          fill="#C44525"
          stroke="#8A2714"
          strokeWidth="1.5"
        />
        <line x1="190" y1="85" x2="190" y2="48" stroke="#2E231C" strokeWidth="2" />
        <polygon points="190,50 216,74 190,74" fill="#FFFFFF" stroke="#D5CDC3" strokeWidth="1" />

        {/* Sailboat 2 */}
        <path
          d="M 230 115 C 242 125, 268 125, 280 115 Z"
          fill="#1D6A76"
          stroke="#13444C"
          strokeWidth="1.5"
        />
        <line x1="255" y1="115" x2="255" y2="85" stroke="#2E231C" strokeWidth="2" />
        <polygon points="255,87 275,106 255,106" fill="#FFFFFF" stroke="#D5CDC3" strokeWidth="1" />

        {/* Landmark Signpost Badge */}
        <g filter="url(#badgeShadow)">
          <rect
            x="20"
            y="95"
            width="110"
            height="32"
            rx="16"
            fill="#FFFFFF"
            stroke="#D5CDC3"
            strokeWidth="1.5"
          />
          <circle cx="38" cy="111" r="7" fill="#74C7E6" />
          <text
            x="76"
            y="116"
            fontFamily="'Nunito', sans-serif"
            fontWeight="800"
            fontSize="13"
            fill="#2E231C"
            textAnchor="middle"
          >
            Harbor
          </text>
        </g>
      </g>
    </svg>
  );
}
