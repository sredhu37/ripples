interface OttoProps {
  size?: number;
  mood?: "happy" | "think";
}

/** Otto the otter. Flat shapes only; idle bob and blink are CSS (see styles.css). */
export function Otto({ size = 140, mood = "happy" }: OttoProps) {
  return (
    <svg
      className="otto"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label="Otto the otter"
    >
      <g className="otto-bob">
        {/* tail */}
        <path d="M128 168 C170 168 186 150 182 128 C168 142 150 146 128 146 Z" fill="#7a4b2f" />
        {/* body */}
        <ellipse cx="100" cy="150" rx="46" ry="40" fill="#8d5a3b" />
        <ellipse cx="100" cy="156" rx="30" ry="30" fill="#ecd3ab" />
        {/* arms */}
        <ellipse cx="62" cy="150" rx="11" ry="20" fill="#8d5a3b" transform="rotate(14 62 150)" />
        <ellipse cx="138" cy="150" rx="11" ry="20" fill="#8d5a3b" transform="rotate(-14 138 150)" />
        {/* ears */}
        <circle cx="64" cy="48" r="13" fill="#8d5a3b" />
        <circle cx="136" cy="48" r="13" fill="#8d5a3b" />
        <circle cx="64" cy="49" r="6" fill="#ecd3ab" />
        <circle cx="136" cy="49" r="6" fill="#ecd3ab" />
        {/* head */}
        <ellipse cx="100" cy="82" rx="50" ry="44" fill="#8d5a3b" />
        {/* muzzle */}
        <ellipse cx="100" cy="100" rx="30" ry="21" fill="#ecd3ab" />
        <ellipse cx="100" cy="91" rx="8" ry="5.5" fill="#2d1b12" />
        {/* eyes */}
        <g className="otto-eyes">
          <circle cx="80" cy="74" r="7" fill="#2d1b12" />
          <circle cx="120" cy="74" r="7" fill="#2d1b12" />
          <circle cx="82.5" cy="71.5" r="2.4" fill="#fff" />
          <circle cx="122.5" cy="71.5" r="2.4" fill="#fff" />
        </g>
        {/* brows for thinking */}
        {mood === "think" && (
          <g stroke="#2d1b12" strokeWidth="3" strokeLinecap="round">
            <path d="M70 60 L90 63" />
            <path d="M130 60 L110 63" />
          </g>
        )}
        {/* mouth */}
        {mood === "happy" ? (
          <path d="M90 100 Q100 110 110 100" stroke="#2d1b12" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M92 103 L108 103" stroke="#2d1b12" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
        {/* whiskers */}
        <g stroke="#2d1b12" strokeWidth="1.8" strokeLinecap="round" opacity="0.55">
          <path d="M72 98 L52 94" />
          <path d="M72 103 L52 106" />
          <path d="M128 98 L148 94" />
          <path d="M128 103 L148 106" />
        </g>
      </g>
    </svg>
  );
}
