import type { DiagramProps } from "../lesson/types";

export function IsolatedTapesDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Odosobnione komputery przed powstaniem sieci"
      : lang === "de"
      ? "Isolierte Computer vor dem Netzwerk"
      : "Isolated Computers Before the Network";

  const roomA = lang === "pl" ? "Pokój A" : lang === "de" ? "Raum A" : "Room A";
  const roomB = lang === "pl" ? "Pokój B" : lang === "de" ? "Raum B" : "Room B";

  const sub =
    lang === "pl"
      ? "Komputery nie mogły się ze sobą komunikować bez ludzi przenoszących ciężkie szpule z taśmą magnetyczną"
      : lang === "de"
      ? "Computer konnten nicht sprechen, ohne dass Menschen Magnetbaender trugen"
      : "Computers could not talk to each other without humans carrying magnetic tape reels";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Isolated Computers and Tape Reels">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        {title}
      </text>

      {/* Computer A */}
      <rect x="70" y="90" width="80" height="65" rx="6" fill="#334155" />
      <rect x="80" y="100" width="60" height="40" rx="3" fill="#64748b" />
      <circle cx="95" cy="120" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
      <circle cx="125" cy="120" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
      <text x="110" y="170" textAnchor="middle" fontSize="10" fill="#475569">{roomA}</text>

      {/* Barrier wall */}
      <line x1="200" y1="85" x2="200" y2="175" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 4" />

      {/* Computer B */}
      <rect x="250" y="90" width="80" height="65" rx="6" fill="#334155" />
      <rect x="260" y="100" width="60" height="40" rx="3" fill="#64748b" />
      <circle cx="275" cy="120" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
      <circle cx="305" cy="120" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
      <text x="290" y="170" textAnchor="middle" fontSize="10" fill="#475569">{roomB}</text>

      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function PacketSlicingDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Komutacja pakietów: dzielenie wiadomości"
      : lang === "de"
      ? "Paketvermittlung: Die Nachricht zerlegen"
      : "Packet Switching: Slicing the Message";

  const p1 = lang === "pl" ? "Pakiet 1/3" : lang === "de" ? "Paket 1/3" : "Packet 1/3";
  const p2 = lang === "pl" ? "Pakiet 2/3" : lang === "de" ? "Paket 2/3" : "Packet 2/3";
  const p3 = lang === "pl" ? "Pakiet 3/3" : lang === "de" ? "Paket 3/3" : "Packet 3/3";

  const sub =
    lang === "pl"
      ? "Wiadomości są dzielone na ponumerowane paczki cyfrowe, które podróżują niezależnie"
      : lang === "de"
      ? "Nachrichten werden in nummerierte Paeckchen zerlegt, die getrennt reisen"
      : "Messages are sliced into numbered digital parcels that travel independently";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Packet Switching Envelopes">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="58" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e40af">
        {title}
      </text>

      {/* Original message banner */}
      <rect x="120" y="80" width="160" height="28" rx="6" fill="#1d4ed8" />
      <text x="200" y="98" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
        &quot;HELLO WORLD&quot;
      </text>

      {/* 3 Digital Packets */}
      <g transform="translate(60, 125)">
        <rect x="0" y="0" width="75" height="40" rx="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
        <text x="37" y="18" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">{p1}</text>
        <text x="37" y="32" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#0f172a">&quot;HEL&quot;</text>
      </g>

      <g transform="translate(162, 125)">
        <rect x="0" y="0" width="75" height="40" rx="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
        <text x="37" y="18" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">{p2}</text>
        <text x="37" y="32" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#0f172a">&quot;LO &quot;</text>
      </g>

      <g transform="translate(265, 125)">
        <rect x="0" y="0" width="75" height="40" rx="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
        <text x="37" y="18" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">{p3}</text>
        <text x="37" y="32" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#0f172a">&quot;WORLD&quot;</text>
      </g>

      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function NetworkRoutersDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Rozproszony routing po wielu ścieżkach"
      : lang === "de"
      ? "Verteiltes Routing ueber mehrere Wege"
      : "Distributed Routing Across Multiple Paths";

  const senderLabel = lang === "pl" ? "Nadawca" : lang === "de" ? "Sender" : "Sender";
  const receiverLabel = lang === "pl" ? "Odbiorca" : lang === "de" ? "Empfaenger" : "Receiver";
  const northLabel = lang === "pl" ? "Północ" : lang === "de" ? "Nord" : "North";
  const centralLabel = lang === "pl" ? "Środek" : lang === "de" ? "Zentral" : "Central";
  const southLabel = lang === "pl" ? "Południe" : lang === "de" ? "Sued" : "South";

  const sub =
    lang === "pl"
      ? "Jeśli jedna trasa jest przeciążona lub uszkodzona, pakiety automatycznie omijają przeszkodę"
      : lang === "de"
      ? "Ist eine Leitung blockiert, weichen Pakete automatisch auf freie Wege aus"
      : "If one route gets congested or damaged, packets automatically reroute safely";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Routers and Distributed Network">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {title}
      </text>

      {/* Sender node */}
      <circle cx="80" cy="120" r="22" fill="#22c55e" />
      <text x="80" y="124" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">{senderLabel}</text>

      {/* Routers North, Central, South */}
      <rect x="180" y="70" width="55" height="25" rx="4" fill="#3b82f6" />
      <text x="207" y="86" textAnchor="middle" fontSize="9" fill="#ffffff">{northLabel}</text>

      <rect x="180" y="110" width="55" height="25" rx="4" fill="#3b82f6" />
      <text x="207" y="126" textAnchor="middle" fontSize="9" fill="#ffffff">{centralLabel}</text>

      <rect x="180" y="150" width="55" height="25" rx="4" fill="#3b82f6" />
      <text x="207" y="166" textAnchor="middle" fontSize="9" fill="#ffffff">{southLabel}</text>

      {/* Connecting lines */}
      <line x1="102" y1="120" x2="180" y2="82" stroke="#86efac" strokeWidth="2" />
      <line x1="102" y1="120" x2="180" y2="122" stroke="#86efac" strokeWidth="2" />
      <line x1="102" y1="120" x2="180" y2="162" stroke="#86efac" strokeWidth="2" />

      {/* Receiver node */}
      <circle cx="320" cy="120" r="22" fill="#15803d" />
      <text x="320" y="124" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">{receiverLabel}</text>

      <line x1="235" y1="82" x2="298" y2="120" stroke="#86efac" strokeWidth="2" />
      <line x1="235" y1="122" x2="298" y2="120" stroke="#86efac" strokeWidth="2" />
      <line x1="235" y1="162" x2="298" y2="120" stroke="#86efac" strokeWidth="2" />

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function TimBernersLeeWebDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Tim Berners-Lee: World Wide Web (CERN, 1989)"
      : lang === "de"
      ? "Tim Berners-Lee: Das World Wide Web (CERN, 1989)"
      : "Tim Berners-Lee: The World Wide Web (CERN, 1989)";

  const projTitle =
    lang === "pl"
      ? "Projekt World Wide Web"
      : lang === "de"
      ? "Das World Wide Web Projekt"
      : "The World Wide Web Project";

  const link1 =
    lang === "pl"
      ? "Kliknij tutaj po informacje"
      : lang === "de"
      ? "Hier klicken fuer Informationen"
      : "Click here for Information";

  const link2 =
    lang === "pl"
      ? "Przeglądaj wspólne strony naukowe"
      : lang === "de"
      ? "Gemeinsame Forschungsberichte oeffnen"
      : "Browse shared research pages";

  const sub =
    lang === "pl"
      ? "Hiperłącza połączyły biblioteki świata w jedną wspólną sieć wiedzy"
      : lang === "de"
      ? "Hyperlinks verbanden Bibliotheken der Welt zu einem Netz des Wissens"
      : "Hyperlinks connected the world libraries into one shared web of knowledge";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="World Wide Web Browser and Links">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6b21a8">
        {title}
      </text>

      {/* Browser window */}
      <rect x="80" y="75" width="240" height="95" rx="6" fill="#ffffff" stroke="#c084fc" strokeWidth="2" />
      <rect x="80" y="75" width="240" height="22" fill="#f3e8ff" />
      <circle cx="92" cy="86" r="3.5" fill="#ef4444" />
      <circle cx="102" cy="86" r="3.5" fill="#eab308" />
      <circle cx="112" cy="86" r="3.5" fill="#22c55e" />
      <rect x="125" y="79" width="180" height="14" rx="3" fill="#ffffff" stroke="#e9d5ff" />
      <text x="135" y="90" fontSize="8" fontFamily="monospace" fill="#7e22ce">https://info.cern.ch</text>

      {/* Web content with hyperlinks */}
      <text x="95" y="115" fontSize="11" fontWeight="bold" fill="#0f172a">{projTitle}</text>
      <text x="95" y="135" fontSize="9" fill="#2563eb" textDecoration="underline">{link1}</text>
      <text x="95" y="152" fontSize="9" fill="#2563eb" textDecoration="underline">{link2}</text>

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#581c87">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function UnderseaFiberCablesDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Impulsy światła na dnie oceanów"
      : lang === "de"
      ? "Lichtblitze auf dem Meeresgrund"
      : "Light Pulses Under the Ocean Floors";

  const americaLabel = lang === "pl" ? "Ameryka" : lang === "de" ? "Amerika" : "America";
  const europeLabel = lang === "pl" ? "Europa" : lang === "de" ? "Europa" : "Europe";

  const sub =
    lang === "pl"
      ? "Kable światłowodowe przesyłają błyski lasera po dnie oceanu w setne części sekundy"
      : lang === "de"
      ? "Glasfaserkabel senden Laserpulse im Bruchteil einer Sekunde ueber Ozeane"
      : "Glass fiber cables flash laser pulses across ocean beds in hundredths of a second";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Undersea Fiber Optic Cables">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#38bdf8">
        {title}
      </text>

      {/* Continents outlines */}
      <path d="M60 90 Q85 75 110 95 Q100 130 80 145 Z" fill="#1e293b" stroke="#475569" />
      <text x="85" y="115" fontSize="9" fill="#94a3b8">{americaLabel}</text>

      <path d="M280 85 Q325 70 335 105 Q310 145 285 130 Z" fill="#1e293b" stroke="#475569" />
      <text x="305" y="110" fontSize="9" fill="#94a3b8">{europeLabel}</text>

      {/* Glowing fiber cable across ocean */}
      <path d="M105 115 Q200 160 285 110" stroke="#06b6d4" strokeWidth="4" fill="none" />
      <path d="M105 115 Q200 160 285 110" stroke="#a5f3fc" strokeWidth="1.5" fill="none" strokeDasharray="6 4" />

      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#bae6fd">
          {sub}
        </text>
      )}
    </svg>
  );
}
