import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/**
 * Beat 1: Meet Aish. She codes apps and tools for local shops on her computer.
 * Step 1: Meet Aish at her desk.
 * Step 2: Code editor / laptop appears with apps.
 * Step 3: Happy local shops celebrate her tools.
 */
function MeetAishDiagram({ lang, step }: DiagramProps) {
  const name = lang === "pl" ? "Zofia" : lang === "de" ? "Mia" : "Aish";
  const hobby = lang === "pl" ? "Pasja: Kodowanie" : lang === "de" ? "Hobby: Programmieren" : "Hobby: Coding Code";
  const label = lang === "pl" ? "Zofia tworzy oprogramowanie dla lokalnych sklepów" : lang === "de" ? "Mia programmiert Apps fuer Geschaefte" : "Aish building software for local stores";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />

      {/* Desk and chair */}
      <rect x="50" y="180" width="300" height="12" rx="4" fill="#a86f3c" />
      <rect x="70" y="192" width="16" height="36" rx="2" fill="#8a5a36" />
      <rect x="314" y="192" width="16" height="36" rx="2" fill="#8a5a36" />

      {/* Step 1: Aish */}
      {step >= 1 && (
        <g>
          {/* Head & face */}
          <circle cx="130" cy="110" r="30" fill="#f3cfa6" stroke="#23383f" strokeWidth="2.5" />
          {/* Hair */}
          <path d="M 100 110 C 100 70 160 70 160 110 C 150 85 110 85 100 110" fill="#3b2413" />
          {/* Smile and eyes */}
          <circle cx="120" cy="106" r="3" fill="#23383f" />
          <circle cx="140" cy="106" r="3" fill="#23383f" />
          <path d="M 124 122 Q 130 130 136 122" stroke="#23383f" strokeWidth="2" fill="none" />
          {/* Body */}
          <path d="M 102 180 L 108 140 Q 130 135 152 140 L 158 180 Z" fill="#6366f1" stroke="#23383f" strokeWidth="2" />
          {/* Badge */}
          <rect x="90" y="52" width="80" height="22" rx="6" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="130" y="67" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#3730a3">{name}</text>
        </g>
      )}

      {/* Step 2: Laptop and Code */}
      {step >= 2 && (
        <g>
          {/* Laptop base and screen */}
          <rect x="210" y="125" width="80" height="52" rx="4" fill="#334155" stroke="#1e293b" strokeWidth="2" />
          <rect x="215" y="130" width="70" height="42" rx="2" fill="#0f172a" />
          {/* Code lines */}
          <line x1="222" y1="140" x2="250" y2="140" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="228" y1="148" x2="274" y2="148" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="228" y1="156" x2="260" y2="156" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="222" y1="164" x2="245" y2="164" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="202,177 298,177 304,180 196,180" fill="#94a3b8" />
          {/* Hobby Pill */}
          <rect x="200" y="52" width="140" height="22" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="270" y="67" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">{hobby}</text>
        </g>
      )}

      {/* Step 3: Happy store feedback */}
      {step >= 3 && (
        <g>
          <path d="M 285 105 L 340 75" stroke="#16a34a" strokeWidth="2" strokeDasharray="3,3" />
          <rect x="280" y="90" width="105" height="32" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="332" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">
            {lang === "pl" ? "Sklepy zachwycone!" : lang === "de" ? "Geschaefte begeistert!" : "Stores Love It!"}
          </text>
          <text x="332" y="117" textAnchor="middle" fontSize="9" fill="#b45309">⭐⭐⭐⭐⭐</text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 2: Aish wants electric guitar lessons and offers custom website code to the music teacher.
 * Step 1: Aish dreams of playing electric guitar.
 * Step 2: Visits music teacher.
 * Step 3: Proposes trade: website code for guitar lessons.
 */
function GuitarOfferDiagram({ lang, step }: DiagramProps) {
  const aishName = lang === "pl" ? "Zofia" : lang === "de" ? "Mia" : "Aish";
  const teacherName = lang === "pl" ? "Nauczyciel" : lang === "de" ? "Musiklehrer" : "Music Teacher";
  const label = lang === "pl" ? "Zofia proponuje stronę w zamian za lekcje muzyki" : lang === "de" ? "Mia bietet Website fuer Gitarrenunterricht an" : "Aish offers website code for guitar lessons";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />

      {/* Left: Aish */}
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#23383f" strokeWidth="2" />
        <path d="M 52 110 C 52 75 108 75 108 110" fill="#3b2413" />
        <circle cx="72" cy="107" r="2.5" fill="#23383f" />
        <circle cx="88" cy="107" r="2.5" fill="#23383f" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#23383f" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#6366f1" stroke="#23383f" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e1b4b">{aishName}</text>
      </g>

      {/* Step 1: Guitar Dream Bubble */}
      {step >= 1 && (
        <g>
          {/* Thought cloud circles */}
          <circle cx="115" cy="72" r="5" fill="#e0e7ff" />
          <circle cx="125" cy="58" r="8" fill="#e0e7ff" />
          <rect x="110" y="20" width="100" height="34" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="160" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#5b21b6">
            {lang === "pl" ? "Chcę grać!" : lang === "de" ? "E-Gitarre!" : "Learn Guitar!"}
          </text>
          <text x="160" y="48" textAnchor="middle" fontSize="10" fill="#6d28d9">🎸 🎵</text>
        </g>
      )}

      {/* Step 2: Music Teacher appears */}
      {step >= 2 && (
        <g>
          <circle cx="320" cy="110" r="28" fill="#fed7aa" stroke="#23383f" strokeWidth="2" />
          {/* Teacher hair / glasses */}
          <path d="M 292 105 C 295 72 345 72 348 105" fill="#64748b" />
          <circle cx="312" cy="107" r="5" fill="none" stroke="#23383f" strokeWidth="1.5" />
          <circle cx="328" cy="107" r="5" fill="none" stroke="#23383f" strokeWidth="1.5" />
          <line x1="317" y1="107" x2="323" y2="107" stroke="#23383f" strokeWidth="1.5" />
          <path d="M 315 122 Q 320 126 325 122" stroke="#23383f" strokeWidth="2" fill="none" />
          {/* Teacher body */}
          <path d="M 296 185 L 302 140 Q 320 135 338 140 L 344 185 Z" fill="#0284c7" stroke="#23383f" strokeWidth="2" />
          <text x="320" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0c4a6e">{teacherName}</text>
        </g>
      )}

      {/* Step 3: Trade proposal arrow */}
      {step >= 3 && (
        <g>
          <path d="M 115 140 L 280 140" stroke="#4f46e5" strokeWidth="2.5" strokeDasharray="4,4" />
          <polygon points="280,140 270,135 270,145" fill="#4f46e5" />
          <rect x="145" y="118" width="110" height="22" rx="6" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1" />
          <text x="200" y="133" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#312e81">
            {lang === "pl" ? "Kod za lekcje?" : lang === "de" ? "Website fuer Unterricht?" : "Code for Lessons?"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 3: Direct trade fails! Barter requires matching desires. Teacher wants a bicycle, not code.
 * Step 1: Barter term defined.
 * Step 2: Teacher declines: Needs bicycle.
 * Step 3: Double coincidence of wants rule illustrated.
 */
function BarterFailsDiagram({ lang, step }: DiagramProps) {
  const barterTitle = lang === "pl" ? "Handel wymienny (Barter)" : lang === "de" ? "Direkter Tauschhandel (Barter)" : "Direct Barter";
  const teacherSpeech = lang === "pl" ? "Nie potrzebuję strony! Chcę rower!" : lang === "de" ? "Kein Bedarf! Ich brauche ein Fahrrad!" : "No thanks! I need a bicycle!";
  const mismatchNote = lang === "pl" ? "Wymiana zablokowana: Potrzeby się nie zgadzają!" : lang === "de" ? "Tausch blockiert: Beduerfnisse passen nicht!" : "Trade Blocked: Desires Do Not Match!";
  const label = lang === "pl" ? "Handel wymienny zawodzi: Nauczyciel potrzebuje roweru" : lang === "de" ? "Tauschhandel scheitert: Lehrer braucht Fahrrad" : "Direct barter fails: Teacher needs bicycle";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fff5f5" stroke="#f03e3e" strokeWidth="2" />

      {/* Header Banner */}
      <rect x="100" y="20" width="200" height="26" rx="8" fill="#ffe3e3" stroke="#e03131" strokeWidth="1.5" />
      <text x="200" y="37" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c92a2a">{barterTitle}</text>

      {/* Left: Aish puzzled */}
      <circle cx="80" cy="115" r="28" fill="#f3cfa6" stroke="#23383f" strokeWidth="2" />
      <path d="M 52 115 C 52 80 108 80 108 115" fill="#3b2413" />
      <circle cx="72" cy="112" r="2.5" fill="#23383f" />
      <circle cx="88" cy="112" r="2.5" fill="#23383f" />
      <line x1="74" y1="126" x2="86" y2="126" stroke="#23383f" strokeWidth="2" />
      <path d="M 56 185 L 62 145 Q 80 140 98 145 L 104 185 Z" fill="#6366f1" stroke="#23383f" strokeWidth="2" />
      <text x="80" y="205" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#495057">
        {lang === "pl" ? "Oferuje: Kod" : lang === "de" ? "Bietet: Code" : "Offers: Code"}
      </text>

      {/* Center: Blocked red X */}
      <g>
        <line x1="140" y1="120" x2="260" y2="120" stroke="#fa5252" strokeWidth="3" strokeDasharray="5,5" />
        <circle cx="200" cy="120" r="18" fill="#ffe3e3" stroke="#e03131" strokeWidth="2" />
        <text x="200" y="127" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#c92a2a">✕</text>
      </g>

      {/* Right: Teacher wants bicycle */}
      <circle cx="320" cy="115" r="28" fill="#fed7aa" stroke="#23383f" strokeWidth="2" />
      <path d="M 292 110 C 295 77 345 77 348 110" fill="#64748b" />
      <circle cx="312" cy="112" r="4" fill="none" stroke="#23383f" strokeWidth="1.5" />
      <circle cx="328" cy="112" r="4" fill="none" stroke="#23383f" strokeWidth="1.5" />
      <path d="M 314 126 Q 320 120 326 126" stroke="#23383f" strokeWidth="2" fill="none" />
      <path d="M 296 185 L 302 145 Q 320 140 338 145 L 344 185 Z" fill="#0284c7" stroke="#23383f" strokeWidth="2" />

      {/* Step 2: Teacher Speech bubble */}
      {step >= 2 && (
        <g>
          <rect x="235" y="54" width="150" height="30" rx="8" fill="#ffffff" stroke="#c92a2a" strokeWidth="1.5" />
          <polygon points="310,84 315,96 325,84" fill="#ffffff" stroke="#c92a2a" strokeWidth="1.5" />
          <rect x="307" y="82" width="20" height="4" fill="#ffffff" />
          <text x="310" y="73" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#b02525">
            {teacherSpeech}
          </text>
          <text x="320" y="205" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#495057">
            {lang === "pl" ? "Chce: Rower" : lang === "de" ? "Sucht: Fahrrad" : "Wants: Bike"}
          </text>
        </g>
      )}

      {/* Step 3: Explanatory bottom footer */}
      {step >= 3 && (
        <g>
          <rect x="50" y="212" width="300" height="20" rx="4" fill="#ffe3e3" />
          <text x="200" y="226" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#c92a2a">
            {mismatchNote}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 4: Searching person after person takes forever. Money solves this because EVERYONE accepts it.
 * Step 1: Endless searching through the crowd.
 * Step 2: People get frustrated.
 * Step 3: The Golden Key: Money accepted universally.
 */
function SearchAndSolutionDiagram({ lang, step }: DiagramProps) {
  const searchBanner = lang === "pl" ? "Szukanie wymiany bez końca..." : lang === "de" ? "Endloses Suchen nach passendem Tausch..." : "Searching Person After Person...";
  const solutionBanner = lang === "pl" ? "Rozwiązanie: Pieniądze akceptowane przez wszystkich!" : lang === "de" ? "Die Loesung: Geld wird von allen akzeptiert!" : "The Invention: Money Accepted By Everyone!";
  const label = lang === "pl" ? "Pieniądz jako powszechny środek wymiany" : lang === "de" ? "Geld als universelles Tauschmittel" : "Money as universal medium of exchange";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8f9fa" stroke="#343a40" strokeWidth="2" />

      {/* Step 1 & 2: Search frustration */}
      {step < 3 && (
        <g>
          <rect x="60" y="22" width="280" height="26" rx="6" fill="#e9ecef" stroke="#adb5bd" strokeWidth="1" />
          <text x="200" y="39" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#495057">{searchBanner}</text>

          {/* Crowd of people saying no */}
          <g transform="translate(60, 70)">
            <circle cx="20" cy="20" r="16" fill="#e9ecef" stroke="#868e96" strokeWidth="1.5" />
            <text x="20" y="24" textAnchor="middle" fontSize="11">👨</text>
            <text x="20" y="50" textAnchor="middle" fontSize="9" fill="#868e96">{lang === "pl" ? "Nie ma roweru" : lang === "de" ? "Kein Fahrrad" : "No bike"}</text>
          </g>

          <g transform="translate(150, 70)">
            <circle cx="20" cy="20" r="16" fill="#e9ecef" stroke="#868e96" strokeWidth="1.5" />
            <text x="20" y="24" textAnchor="middle" fontSize="11">👩</text>
            <text x="20" y="50" textAnchor="middle" fontSize="9" fill="#868e96">{lang === "pl" ? "Nie chce kodu" : lang === "de" ? "Will keinen Code" : "Wants apples"}</text>
          </g>

          <g transform="translate(240, 70)">
            <circle cx="20" cy="20" r="16" fill="#e9ecef" stroke="#868e96" strokeWidth="1.5" />
            <text x="20" y="24" textAnchor="middle" fontSize="11">👴</text>
            <text x="20" y="50" textAnchor="middle" fontSize="9" fill="#868e96">{lang === "pl" ? "Brak dopasowania" : lang === "de" ? "Kein Match" : "No match"}</text>
          </g>

          {step >= 2 && (
            <g>
              <rect x="70" y="150" width="260" height="50" rx="8" fill="#fff3bf" stroke="#fab005" strokeWidth="1.5" />
              <text x="200" y="172" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#d9480f">
                {lang === "pl" ? "Męczące i czasochłonne!" : lang === "de" ? "Frustrierend und zeitraubend!" : "Exhausting and takes days!"}
              </text>
              <text x="200" y="190" textAnchor="middle" fontSize="10" fill="#e67700">
                {lang === "pl" ? "Musi być lepszy sposób..." : lang === "de" ? "Es muss einfacher gehen..." : "There must be an easier way..."}
              </text>
            </g>
          )}
        </g>
      )}

      {/* Step 3: Money is born! */}
      {step >= 3 && (
        <g>
          <rect x="30" y="20" width="340" height="28" rx="8" fill="#d3f9d8" stroke="#2b8a3e" strokeWidth="1.5" />
          <text x="200" y="38" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2b8a3e">{solutionBanner}</text>

          {/* Central Money Medallion */}
          <circle cx="200" cy="120" r="42" fill="#ffe066" stroke="#f59f00" strokeWidth="3" />
          <circle cx="200" cy="120" r="34" fill="#ffd43b" stroke="#fab005" strokeWidth="1.5" />
          <text x="200" y="128" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#d9480f">$</text>

          {/* Radiating arrows to all citizens */}
          <g>
            <path d="M 150 120 L 70 120" stroke="#2b8a3e" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <circle cx="45" cy="120" r="20" fill="#e7f5ff" stroke="#1971c2" strokeWidth="1.5" />
            <text x="45" y="124" textAnchor="middle" fontSize="12">👩</text>

            <path d="M 250 120 L 330 120" stroke="#2b8a3e" strokeWidth="2.5" />
            <circle cx="355" cy="120" r="20" fill="#e7f5ff" stroke="#1971c2" strokeWidth="1.5" />
            <text x="355" y="124" textAnchor="middle" fontSize="12">👨</text>
          </g>

          <rect x="70" y="185" width="260" height="26" rx="6" fill="#ebfbee" stroke="#40c057" strokeWidth="1" />
          <text x="200" y="202" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2b8a3e">
            {lang === "pl" ? "Wszyscy chętnie przyjmują gotówkę" : lang === "de" ? "Jeder nimmt Bargeld mit Freude an" : "Everyone agrees to take cash"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 5: Money closes the circle! Aish gets paid by dentist, pays guitar teacher, teacher buys bicycle.
 * Step 1: Dentist pays Aish cash for code.
 * Step 2: Aish pays teacher cash for guitar lessons.
 * Step 3: Teacher buys bicycle with cash. Everyone happy!
 */
function MoneySolvesAllDiagram({ lang, step }: DiagramProps) {
  const aishName = lang === "pl" ? "Zofia" : lang === "de" ? "Mia" : "Aish";
  const teacherName = lang === "pl" ? "Nauczyciel" : lang === "de" ? "Musiklehrer" : "Teacher";
  const dentistName = lang === "pl" ? "Dentysta" : lang === "de" ? "Zahnarzt" : "Dentist";
  const bikeStore = lang === "pl" ? "Sklep rowerowy" : lang === "de" ? "Fahrradladen" : "Bike Shop";
  const label = lang === "pl" ? "Gotówka rozwiązuje problem: Wszyscy otrzymują to, czego potrzebują" : lang === "de" ? "Bargeld loest das Problem: Alle bekommen was sie wollen" : "Money solves trade: Everyone gets what they need";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f4fbf7" stroke="#2b8a3e" strokeWidth="2" />

      {/* Top Banner */}
      <rect x="80" y="16" width="240" height="24" rx="6" fill="#d3f9d8" stroke="#2b8a3e" strokeWidth="1" />
      <text x="200" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2b8a3e">
        {lang === "pl" ? "Gotówka ułatwia wszystko!" : lang === "de" ? "Bargeld macht alles moeglich!" : "Cash Solves The Trade!"}
      </text>

      {/* Node 1: Dentist */}
      <g>
        <circle cx="60" cy="90" r="24" fill="#e3fafc" stroke="#1098ad" strokeWidth="1.5" />
        <text x="60" y="94" textAnchor="middle" fontSize="14">🦷</text>
        <text x="60" y="125" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0b7285">{dentistName}</text>
      </g>

      {/* Node 2: Aish */}
      <g>
        <circle cx="160" cy="90" r="24" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
        <text x="160" y="94" textAnchor="middle" fontSize="14">💻</text>
        <text x="160" y="125" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3730a3">{aishName}</text>
      </g>

      {/* Step 1: Dentist pays Aish cash */}
      {step >= 1 && (
        <g>
          <line x1="88" y1="90" x2="132" y2="90" stroke="#2b8a3e" strokeWidth="2" />
          <rect x="94" y="74" width="32" height="15" rx="3" fill="#ffe066" stroke="#f59f00" strokeWidth="1" />
          <text x="110" y="85" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#d9480f">$50</text>
        </g>
      )}

      {/* Node 3: Music Teacher */}
      <g>
        <circle cx="260" cy="90" r="24" fill="#f3f0ff" stroke="#7950f2" strokeWidth="2" />
        <text x="260" y="94" textAnchor="middle" fontSize="14">🎸</text>
        <text x="260" y="125" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5f3dc4">{teacherName}</text>
      </g>

      {/* Step 2: Aish pays Teacher cash for guitar lessons */}
      {step >= 2 && (
        <g>
          <line x1="188" y1="90" x2="232" y2="90" stroke="#2b8a3e" strokeWidth="2" />
          <rect x="194" y="74" width="32" height="15" rx="3" fill="#ffe066" stroke="#f59f00" strokeWidth="1" />
          <text x="210" y="85" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#d9480f">$50</text>
        </g>
      )}

      {/* Node 4: Bike Shop */}
      {step >= 2 && (
        <g>
          <circle cx="340" cy="90" r="24" fill="#fff4e6" stroke="#fd7e14" strokeWidth="1.5" />
          <text x="340" y="94" textAnchor="middle" fontSize="14">🚲</text>
          <text x="340" y="125" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#d9480f">{bikeStore}</text>
        </g>
      )}

      {/* Step 3: Teacher pays Bike Shop */}
      {step >= 3 && (
        <g>
          <line x1="288" y1="90" x2="312" y2="90" stroke="#2b8a3e" strokeWidth="2" />
          <rect x="290" y="74" width="24" height="15" rx="3" fill="#ffe066" stroke="#f59f00" strokeWidth="1" />
          <text x="302" y="85" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#d9480f">$</text>

          {/* Celebration footer */}
          <rect x="40" y="150" width="320" height="60" rx="10" fill="#ebfbee" stroke="#40c057" strokeWidth="1.5" />
          <text x="200" y="174" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2b8a3e">
            {lang === "pl" ? "🎉 Wszyscy zadowoleni bez uciążliwego barteru!" : lang === "de" ? "🎉 Alle gluecklich ganz ohne direkten Tausch!" : "🎉 Everyone gets what they need without bartering!"}
          </text>
          <text x="200" y="194" textAnchor="middle" fontSize="10" fill="#2f9e44">
            {lang === "pl" ? "Aish ma lekcje gitary • Nauczyciel ma rower • Dentysta ma kod" : lang === "de" ? "Mia hat Musik • Lehrer hat Fahrrad • Zahnarzt hat App" : "Aish has guitar • Teacher has bicycle • Dentist has code"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [hasCoin, setHasCoin] = useState(false);
  const [swaps, setSwaps] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        {hasCoin ? "Success: Everyone accepts cash happily!" : "Stuck: Direct trade only works if needs match."}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setHasCoin(true);
            setSwaps((s) => s + 1);
            if (swaps >= 1) onDone?.();
          }}
        >
          Pay with Cash ($)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setHasCoin(false);
            setSwaps((s) => s + 1);
          }}
        >
          Try Direct Trade
        </button>
      </div>
      <div style={{ padding: "12px", background: hasCoin ? "#eef8ef" : "#fdf2e9", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {hasCoin ? "Lesson booked: The teacher takes the cash to buy a bike." : "Trade declined: The guitar teacher doesn't need computer code!"}
      </div>
    </div>
  );
}

function MoneyWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Which item can you spend instantly at any store?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>A rare collectable trading card</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>An electric scooter</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Paper cash or bank card</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "money",
  story: [
    animatedBeat(
      [
        T("Let's meet Aish. Aish loves working with computers.", "Das ist Mia. Mia beschaeftigt sich leidenschaftlich gern mit Computern.", "Poznaj Zofię. Zofia uwielbia pracować przy komputerze."),
        T("Her hobby is writing custom website code and apps for local shops after school.", "Ihr Hobby ist es, nach der Schule Websites und kleine Apps fuer Geschaefte zu programmieren.", "Jej pasją jest tworzenie stron internetowych i aplikacji dla lokalnych sklepów po lekcjach."),
        T("She is really good at it, and shops love the tools she builds.", "Sie kann das richtig gut und die Geschaefte freuen sich ueber ihre Hilfe.", "Robi to świetnie, a właściciele sklepów bardzo cenią jej narzędzia."),
      ],
      MeetAishDiagram,
    ),
    animatedBeat(
      [
        T("Now Aish wants to learn how to play the electric guitar.", "Jetzt moechte Mia lernen, wie man E-Gitarre spielt.", "Teraz Zofia bardzo chce nauczyć się grać na gitarze elektrycznej."),
        T("She visits a local music teacher to ask for weekly guitar lessons.", "Sie fragt einen Musiklehrer im Viertel nach regelmaessigem Gitarrenunterricht.", "Idzie do lokalnego nauczyciela muzyki, by poprosić o cotygodniowe lekcje."),
        T("Aish offers to build a new website for him in exchange for guitar lessons.", "Mia bietet an, ihm eine moderne Website zu bauen, wenn er ihr dafuer Unterricht gibt.", "Zofia proponuje, że stworzy dla niego stronę internetową w zamian za lekcje muzyki."),
      ],
      GuitarOfferDiagram,
    ),
    animatedBeat(
      [
        T("Trading things directly without any money is called *barter*.", "Dinge direkt ohne Geld gegeneinander zu tauschen heisst *Tauschhandel*.", "Bezpośrednia wymiana rzeczy bez użycia pieniędzy to *handel wymienny*."),
        T("But the guitar teacher says: No thanks! I do not need a website. I need a new bicycle.", "Doch der Lehrer sagt: Nein danke! Ich brauche keine Website. Ich brauche ein Fahrrad.", "Lecz nauczyciel odpowiada: Dziękuję, ale nie potrzebuję strony. Potrzebuję nowego roweru."),
        T("Direct trade only works when both people happen to want what the other person has.", "Direkter Tausch klappt nur, wenn beide zufaellig genau das wollen, was der andere hat.", "Taka wymiana działa tylko wtedy, gdy obie osoby przypadkiem potrzebują dokładnie tego, co ma ta druga."),
      ],
      BarterFailsDiagram,
      "think",
    ),
    animatedBeat(
      [
        T("Aish would have to hunt all week to find someone with a bicycle who also needs website code.", "Mia muesste ewig suchen, um jemanden mit Fahrrad zu finden, der auch Website-Code sucht.", "Zofia musiałaby szukać całymi dniami kogoś z rowerem, kto akurat potrzebuje strony w sieci."),
        T("Searching and asking person after person takes forever and gets frustrating.", "Jeden einzeln zu fragen kostet unendlich viel Zeit und nervt gewaltig.", "Pytanie każdego po kolei zajmuje mnóstwo czasu i bywa bardzo męczące."),
        T("That is why societies invented *money*. Money is something that *everyone* agrees to accept.", "Deshalb haben Menschen *Geld* erfunden. Geld ist etwas, das *alle* gerne annehmen.", "Dlatego ludzie wymyślili *pieniądze*. Pieniądz to coś, co *wszyscy* chętnie przyjmują."),
      ],
      SearchAndSolutionDiagram,
    ),
    animatedBeat(
      [
        T("Now Aish builds an appointment tool for a dentist who pays her fifty dollars in cash.", "Nun programmiert Mia ein Termintool fuer einen Zahnarzt, der sie bar mit 50 Euro bezahlt.", "Teraz Zofia tworzy system rezerwacji dla dentysty, który płaci jej dwieście złotych w gotówce."),
        T("Aish hands the cash to the guitar teacher for her lessons. The teacher uses that cash to buy his bicycle.", "Mia gibt das Geld dem Lehrer fuer den Unterricht. Der Lehrer kauft sich davon sein Fahrrad.", "Zofia przekazuje gotówkę nauczycielowi za lekcje. Nauczyciel kupuje za te pieniądze swój rower."),
        T("Everyone gets exactly what they need, and nobody had to trade directly!", "Jeder bekommt genau das, was er braucht, ganz ohne muehsamen Tauschhandel!", "Każdy dostaje dokładnie to, czego potrzebował, bez żadnego uciążliwego handlu wymiennego!"),
      ],
      MoneySolvesAllDiagram,
    ),
  ],
  toyIntro: T(
    "See how money lets you trade with anyone, while direct swapping gets stuck.",
    "Sieh selbst, wie Geld das Handeln einfach macht, waehrend direkter Tausch oft scheitert.",
    "Zobacz, jak pieniądze ułatwiają wymianę, podczas gdy bezpośredni handel często staje w miejscu.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did trading code for guitar lessons fail between Aish and the teacher?",
        "Warum scheiterte der direkte Tausch zwischen Mia und dem Musiklehrer?",
        "Dlaczego bezpośrednia wymiana nie udała się między Zofią a nauczycielem?",
      ),
      options: [
        { text: T("The music teacher did not need a website, he needed a bicycle", "Der Musiklehrer brauchte keine Website, sondern ein Fahrrad", "Nauczyciel muzyki nie potrzebował strony internetowej, lecz roweru"), correct: true },
        { text: T("Guitar lessons can only be taught on weekends", "Gitarrenunterricht darf nur am Wochenende stattfinden", "Lekcje gry na gitarze mogą odbywać się wyłącznie w weekendy") },
        { text: T("The computer broke down before the trade", "Der Computer ging vor dem Tausch kaputt", "Komputer popsuł się przed dokonaniem wymiany") },
      ],
      hint: T(
        "Remember what the guitar teacher said when Aish offered her code.",
        "Erinnere dich daran, was der Lehrer zu Mias Angebot gesagt hat.",
        "Przypomnij sobie, co nauczyciel odpowiedział na propozycję Zofii.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What makes money so useful compared to trading items directly?",
        "Was macht Geld so viel praktischer als das direkte Tauschen von Gegenstaenden?",
        "Co sprawia, że pieniądze są o wiele wygodniejsze niż bezpośrednia wymiana przedmiotów?",
      ),
      options: [
        { text: T("Everyone agrees to accept it, so you can buy whatever you need", "Alle nehmen es an, sodass man jederzeit kaufen kann, was man braucht", "Wszyscy chętnie je przyjmują, więc możesz kupić to, czego akurat potrzebujesz"), correct: true },
        { text: T("It is heavier to carry around in your backpack", "Es ist schwerer im Rucksack zu tragen", "Są cięższe do noszenia w plecaku") },
        { text: T("It only works inside a single classroom", "Es funktioniert nur in einem einzigen Klassenzimmer", "Działają tylko w jednej sali lekcyjnej") },
      ],
      hint: T(
        "Think about why stores and teachers are happy to take cash from anyone.",
        "Denke darueber nach, warum Geschaefte und Lehrer gerne Geld annehmen.",
        "Pomyśl o tym, dlaczego sklepy i nauczyciele chętnie przyjmują gotówkę od każdego.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Choose the item that can be spent instantly anywhere.",
        "Waehle den Gegenstand, den du ueberall sofort ausgeben kannst.",
        "Wybierz rzecz, którą możesz od razu zapłacić w dowolnym sklepie.",
      ),
      Widget: MoneyWidget,
      hint: T(
        "Stores do not take trading cards at the checkout, but they always take cash.",
        "Supermaerkte nehmen an der Kasse keine Sammelkarten, aber immer Geld.",
        "Sklepy nie przyjmują kart kolekcjonerskich przy kasie, ale zawsze przyjmują gotówkę.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Have you ever tried to trade something directly with a friend, and did it work?",
    "Frage deine Eltern: Habt ihr schon mal etwas direkt mit Freunden getauscht und hat das geklappt?",
    "Zapytaj rodziców: Czy próbowaliście kiedyś wymienić się czymś ze znajomym i czy to się udało?",
  ),
  realLife: {
    title: T(
      "Real world: Why cash beats trading stuff",
      "Echte Welt: Warum Geld praktischer ist als Tauschen",
      "Prawdziwy świat: Dlaczego pieniądze wygrywają z wymianą rzeczy",
    ),
    body: T(
      "Imagine if you had to pay for your school lunch with a skateboard or a video game. The cafeteria might not want what you have! With money, everybody agrees on the same helper. You can buy lunch, and the cafeteria can use that money to buy fresh vegetables.",
      "Stell dir vor, du muesstest dein Schulessen mit einem Skateboard oder Computerspiel bezahlen. Die Kantine will das vielleicht gar nicht haben! Mit Geld haben alle denselben Helfer. Du kaufst dein Essen und die Kueche kauft davon frisches Gemuese.",
      "Wyobraź sobie, że musisz zapłacić za obiad w szkole deskorolką lub grą wideo. Stołówka może wcale tego nie chcieć! Dzięki pieniądzom wszyscy korzystają z tego samego ułatwienia. Ty kupujesz obiad, a stołówka kupuje za te pieniądze świeże warzywa.",
    ),
  },
  factCard: {
    claims: [
      { text: T("William Stanley Jevons formulated the concept of the double coincidence of wants in 1875.", "William Stanley Jevons formulierte 1875 das Konzept der doppelten Beduerfnisuebereinstimmung.", "William Stanley Jevons sformułował koncepcję podwójnej zbieżności potrzeb w 1875 roku."), source: "https://www.econlib.org/library/YPDBooks/Jevons/jvnMM.html" },
      { text: T("The Bank of England defines money by its three roles: medium of exchange, store of value, and unit of account.", "Die Bank of England definiert Geld ueber seine drei Rollen: Tauschmittel, Wertspeicher und Recheneinheit.", "Bank Anglii definiuje pieniądz przez jego trzy role: środek wymiany, miernik wartości i jednostkę rozliczeniową."), source: "https://www.bankofengland.co.uk/explainers/what-is-money" },
      { text: T("Liquidity describes how easily an asset converts into the standard medium of exchange without loss.", "Liquiditaet beschreibt, wie leicht ein Gut ohne Wertverlust in das Standardtauschmittel umgewandelt wird.", "Płynność opisuje, jak łatwo aktywo zamienia się na standardowy środek wymiany bez straty."), source: "https://www.imf.org/en/Publications/fandd/issues/Series/Back-to-Basics/Liquidity" },
      { text: T("Federal Reserve data categorizes money supply into M1 and M2 based on asset liquidity degrees.", "Daten der Federal Reserve teilen die Geldmenge nach Liquiditaetsgraden in M1 und M2 ein.", "Dane Rezerwy Federalnej dzielą podaż pieniądza na agregaty M1 i M2 według stopnia płynności aktywów."), source: "https://www.federalreserve.gov/releases/h6/current/default.htm" },
      { text: T("Transaction costs and search friction in barter economies reduce aggregate economic output.", "Transaktionskosten und Suchhindernisse in Tauschwirtschaften senken die wirtschaftliche Gesamtleistung.", "Koszty transakcyjne i bariery poszukiwań w gospodarce towarowej obniżają całkowitą produkcję gospodarczą."), source: "https://www.ecb.europa.eu/explainers/tell-me/html/what-is-money.en.html" },
    ],
    simplified: [
      T(
        "Complex economic terms like double coincidence of wants and liquidity are explained through trading computer code and guitar lessons.",
        "Komplexe Fachbegriffe wie doppelte Beduerfnisuebereinstimmung werden am Beispiel von Programmieren und Gitarrenunterricht erklaert.",
        "Złożone pojęcia ekonomiczne, takie jak podwójna zbieżność potrzeb, wyjaśniono na przykładzie programowania i lekcji gitary.",
      ),
    ],
  },
};
