import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/**
 * Beat 1: Meet Anjali. Earns $15/wk delivering newsletters, dreams of $800 gaming PC, friends invite to $5 boba tea.
 * Step 1: Anjali earning weekend cash.
 * Step 2: The $800 custom gaming PC dream.
 * Step 3: Daily temptation: friends invite to $5 boba tea snacks.
 */
function BobaTemptationDiagram({ lang, step }: DiagramProps) {
  const anjaliName = lang === "pl" ? "Maja" : lang === "de" ? "Lena" : "Anjali";
  const label = lang === "pl" ? "Maja zarabia na gazetkach i marzy o komputerze" : lang === "de" ? "Lena spart fuer PC waehrend Freunde Bubble Tea trinken" : "Anjali saving for PC vs buying boba tea";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fdfbf7" stroke="#b45309" strokeWidth="2" />

      {/* Anjali avatar */}
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#23383f" strokeWidth="2" />
        <path d="M 52 110 C 52 75 108 75 108 110" fill="#78350f" />
        <circle cx="72" cy="107" r="2.5" fill="#23383f" />
        <circle cx="88" cy="107" r="2.5" fill="#23383f" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#23383f" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#f59e0b" stroke="#23383f" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">{anjaliName}</text>
      </g>

      {/* Step 1: Earning newsletters */}
      <g>
        <rect x="135" y="40" width="105" height="50" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="187" y="60" textAnchor="middle" fontSize="14">📰 🚴</text>
        <text x="187" y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
          {lang === "pl" ? "+60 zł / tydz." : lang === "de" ? "+15 € / Woche" : "+$15 / week"}
        </text>
      </g>

      {/* Step 2: Gaming PC Dream */}
      {step >= 2 && (
        <g>
          <rect x="265" y="40" width="115" height="75" rx="8" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="322" y="68" textAnchor="middle" fontSize="20">🖥️ 🎮</text>
          <text x="322" y="88" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#3730a3">
            {lang === "pl" ? "Cel: 3 000 zł" : lang === "de" ? "Ziel: 800 €" : "Goal: $800"}
          </text>
          <text x="322" y="103" textAnchor="middle" fontSize="9" fill="#4338ca">Gaming PC</text>
        </g>
      )}

      {/* Step 3: Daily $5 boba temptation */}
      {step >= 3 && (
        <g>
          <rect x="135" y="125" width="245" height="80" rx="8" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
          <text x="257" y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be123c">
            {lang === "pl" ? "Pokusa: Codzienna Boba Tea 🧋 (-20 zł)" : lang === "de" ? "Verlockung: Bubble Tea 🧋 (-5 €)" : "Temptation: Daily Boba Tea 🧋 (-$5)"}
          </text>
          <text x="257" y="170" textAnchor="middle" fontSize="10.5" fill="#9f1239">
            {lang === "pl" ? "3 herbaty w tygodniu = znikają wszystkie oszczędności!" : lang === "de" ? "3 Tees pro Woche = der gesamte Wochenlohn ist weg!" : "3 drinks a week = whole weekly paycheck gone!"}
          </text>
          <text x="257" y="190" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e11d48">
            {lang === "pl" ? "Natychmiastowa przyjemność vs Wielki cel" : lang === "de" ? "Sofortiger Spass vs Grosses Ziel" : "Instant Pleasure vs Big Dream"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 2: High time preference vs Low time preference.
 * Step 1: High time preference: Spend today, empty wallet tomorrow.
 * Step 2: Low time preference: Wait a little bit, achieve something massive.
 * Step 3: Patience is a financial superpower.
 */
function TimePreferenceDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Wysoka i niska preferencja czasowa" : lang === "de" ? "Hohe und niedrige Zeitpraeferenz" : "High vs Low time preference";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />

      {/* Step 1: High Time Preference */}
      <g>
        <rect x="35" y="40" width="155" height="150" rx="10" fill="#fff5f5" stroke="#ef4444" strokeWidth="1.5" />
        <rect x="45" y="50" width="135" height="24" rx="4" fill="#fee2e2" />
        <text x="112" y="66" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#b91c1c">
          {lang === "pl" ? "Wysoka preferencja" : lang === "de" ? "Hohe Zeitpraeferenz" : "High Time Preference"}
        </text>
        <text x="112" y="105" textAnchor="middle" fontSize="22">🧋 🍿 🍟</text>
        <text x="112" y="130" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dc2626">
          {lang === "pl" ? "Wydaj dzisiaj" : lang === "de" ? "Heute verprassen" : "Spend Today"}
        </text>
        <rect x="50" y="145" width="125" height="30" rx="4" fill="#fca5a5" />
        <text x="112" y="164" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#7f1d1d">
          {lang === "pl" ? "Pusty portfel" : lang === "de" ? "Morgen 0 €" : "0 Runway Tomorrow"}
        </text>
      </g>

      {/* Step 2: Low Time Preference */}
      {step >= 2 && (
        <g>
          <rect x="210" y="40" width="155" height="150" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
          <rect x="220" y="50" width="135" height="24" rx="4" fill="#dcfce7" />
          <text x="287" y="66" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#15803d">
            {lang === "pl" ? "Niska preferencja" : lang === "de" ? "Niedrige Zeitpraeferenz" : "Low Time Preference"}
          </text>
          <text x="287" y="105" textAnchor="middle" fontSize="22">⏳ 🖥️ 🚀</text>
          <text x="287" y="130" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#16a34a">
            {lang === "pl" ? "Odkładaj cierpliwie" : lang === "de" ? "Geduldig aufbauen" : "Save Patiently"}
          </text>
          <rect x="225" y="145" width="125" height="30" rx="4" fill="#86efac" />
          <text x="287" y="164" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#14532d">
            {lang === "pl" ? "Własny PC i wolność" : lang === "de" ? "Echter PC & Freiheit" : "Custom PC & Assets"}
          </text>
        </g>
      )}

      {/* Step 3: Superpower pill */}
      {step >= 3 && (
        <g>
          <rect x="70" y="16" width="260" height="22" rx="4" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
          <text x="200" y="31" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#6d28d9">
            {lang === "pl" ? "Cierpliwość to ekonomiczna supermoc" : lang === "de" ? "Geduld ist die groesste Finanz-Superkraft" : "Patience is a financial superpower"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 3: Skip 2 drinks = $10 saved toward PC + $50 emergency buffer protects against flat tire.
 * Step 1: Skipping 2 drinks redirects $10 to PC fund.
 * Step 2: $50 mini emergency buffer formed.
 * Step 3: Flat bike tire happens: buffer absorbs it instantly with zero stress.
 */
function EmergencyBufferDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Poduszka awaryjna chroni cel przed nagłymi wydatkami" : lang === "de" ? "Notfallpuffer schuetzt Ersparnisse vor Pannen" : "Emergency buffer protects savings progress";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f4fbf7" stroke="#16a34a" strokeWidth="2" />

      {/* Step 1: Weekly $10 saved */}
      <g>
        <rect x="35" y="40" width="155" height="85" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="112" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">
          {lang === "pl" ? "Skarbonka PC" : lang === "de" ? "Gaming-PC Kasse" : "PC Build Fund"}
        </text>
        <text x="112" y="90" textAnchor="middle" fontSize="16">🖥️ +$10/wk</text>
        <text x="112" y="110" textAnchor="middle" fontSize="9.5" fill="#0284c7">
          {lang === "pl" ? "2 pominięte herbaty" : lang === "de" ? "2 Drinks weggelassen" : "2 skipped drinks"}
        </text>
      </g>

      {/* Step 2: Emergency Buffer */}
      {step >= 2 && (
        <g>
          <rect x="210" y="40" width="155" height="85" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="287" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
            {lang === "pl" ? "Bufor awaryjny: 200 zł" : lang === "de" ? "Notgroschen: 50 €" : "Emergency Buffer: $50"}
          </text>
          <text x="287" y="90" textAnchor="middle" fontSize="16">🛡️ 💰</text>
          <text x="287" y="110" textAnchor="middle" fontSize="9.5" fill="#b45309">
            {lang === "pl" ? "Nienaruszalna rezerwa" : lang === "de" ? "Ruecklage fuer Notfaelle" : "Reserved for shocks"}
          </text>
        </g>
      )}

      {/* Step 3: Flat tire incident handled */}
      {step >= 3 && (
        <g>
          <rect x="35" y="145" width="330" height="70" rx="10" fill="#fff" stroke="#16a34a" strokeWidth="2" />
          <text x="60" y="172" fontSize="12" fontWeight="bold" fill="#15803d">
            {lang === "pl" ? "Pęknięta dętka w rowerze? Żaden problem!" : lang === "de" ? "Platter Reifen am Fahrrad? Kein Problem!" : "Flat bike tire? Minor inconvenience!"}
          </text>
          <text x="60" y="195" fontSize="10.5" fill="#4b5563">
            {lang === "pl" ? "Bufor opłaca naprawę od ręki • Skarbonka na PC pozostaje w 100% bezpieczna" : lang === "de" ? "Puffer zahlt Reparatur sofort • Das PC-Sparkonto bleibt komplett unangetastet" : "Buffer pays $15 repair instantly • PC savings goal stays 100% untouched"}
          </text>
          <text x="340" y="180" textAnchor="end" fontSize="20">🚲✅</text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 4: Dollars are mechanical employees working quietly for your future options.
 * Step 1: Mindless leakage stopped.
 * Step 2: Every saved dollar becomes a little helper.
 * Step 3: Freedom and options compound.
 */
function MechanicalEmployeesDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Oszczędności jako mali mechaniczni pracownicy" : lang === "de" ? "Ersparnisse als kleine mechanische Helfer" : "Savings as mechanical employees for freedom";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2" />

      {/* Center Vault */}
      <rect x="150" y="35" width="100" height="70" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="22">🏦 💰</text>
      <text x="200" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5b21b6">
        {lang === "pl" ? "Rezerwuar" : lang === "de" ? "Reservoir" : "Reservoir"}
      </text>

      {/* Step 1: No leak banner */}
      <g>
        <rect x="50" y="125" width="300" height="26" rx="6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
        <text x="200" y="142" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#6b21a8">
          {lang === "pl" ? "Koniec z bezmyślnym wyciekiem drobnych kwot" : lang === "de" ? "Kein gedankenloses Verpuffen von Kleingeld" : "Conscious choice: Stop leaking cash on small stuff"}
        </text>
      </g>

      {/* Step 2: Dollars as helpers */}
      {step >= 2 && (
        <g>
          <circle cx="80" cy="70" r="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="80" y="74" textAnchor="middle" fontSize="12">🤖 $</text>

          <circle cx="320" cy="70" r="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="320" y="74" textAnchor="middle" fontSize="12">🤖 $</text>
        </g>
      )}

      {/* Step 3: Freedom banner */}
      {step >= 3 && (
        <g>
          <rect x="40" y="165" width="320" height="50" rx="8" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
          <text x="200" y="186" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
            {lang === "pl" ? "Każda zaoszczędzona moneta buduje Twoją przyszłą wolność" : lang === "de" ? "Jeder gesparte Euro schenkt dir kuenftig Entscheidungsfreiheit" : "Every saved dollar works quietly to buy your future options"}
          </text>
          <text x="200" y="202" textAnchor="middle" fontSize="9.5" fill="#047857">
            {lang === "pl" ? "Możesz wybierać wielkie projekty, zamiast żyć z dnia na dzień" : lang === "de" ? "Echte Moeglichkeiten statt kurzlebiger Konsum" : "Real freedom to invest, build, and choose"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 5: By summer, Anjali orders her dream gaming PC!
 * Step 1: Parts arrive in boxes: GPU, CPU, monitors.
 * Step 2: Friends amazed at her incredible setup.
 * Step 3: The secret: small streams of daily discipline create massive reservoirs.
 */
function DreamDeliveredDiagram({ lang, step }: DiagramProps) {
  const anjaliName = lang === "pl" ? "Maja" : lang === "de" ? "Lena" : "Anjali";
  const label = lang === "pl" ? "Maja składa wymarzony komputer dzięki oszczędnościom" : lang === "de" ? "Lena baut ihren Traum-PC dank geduldigen Sparens" : "Anjali builds dream PC from patient savings";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />

      {/* Top Banner */}
      <rect x="60" y="18" width="280" height="26" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="200" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
        {lang === "pl" ? "🎉 Cel osiągnięty: Komputer marzeń!" : lang === "de" ? "🎉 Ziel erreicht: Der Traum-Gaming-PC!" : "🎉 Goal Achieved: Custom Gaming PC!"}
      </text>

      {/* Step 1: PC Hardware Boxes */}
      <g>
        <rect x="40" y="60" width="80" height="60" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="80" y="85" textAnchor="middle" fontSize="16">⚡</text>
        <text x="80" y="105" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#991b1b">GPU Card</text>

        <rect x="135" y="60" width="80" height="60" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="175" y="85" textAnchor="middle" fontSize="16">🧠</text>
        <text x="175" y="105" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1e40af">CPU Chip</text>

        <rect x="230" y="60" width="130" height="60" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="295" y="85" textAnchor="middle" fontSize="16">🖥️✨</text>
        <text x="295" y="105" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#92400e">Monitors & Case</text>
      </g>

      {/* Step 2: Friends amazed */}
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="34" rx="6" fill="#ffffff" stroke="#16a34a" strokeWidth="1" />
          <text x="200" y="151" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#15803d">
            {lang === "pl" ? "Znajomi pytają: Jak udało Ci się to kupić bez pomocy?!" : lang === "de" ? "Freunde staunen: Wie hast du dir das bloss leisten koennen?!" : "Friends ask: How did you afford this epic setup on your own?!"}
          </text>
        </g>
      )}

      {/* Step 3: The Secret formula */}
      {step >= 3 && (
        <g>
          <rect x="40" y="174" width="320" height="50" rx="8" fill="#15803d" />
          <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Małe codzienne strumienie tworzą wielkie rezerwuary" : lang === "de" ? "Kleine taegliche Stroeme fuellen gewaltige Reservoirs" : "Small daily streams fill massive patient reservoirs"}
          </text>
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fill="#bbf7d0">
            {lang === "pl" ? `${anjaliName} zamieniła zbędne herbatki w potężne stanowisko do gier!` : lang === "de" ? `${anjaliName} tauschte Snacks gegen ein Traumlabor!` : `${anjaliName} turned skipped boba teas into an unstoppable gaming battle station!`}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [months, setMonths] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Emergency Runway: {months} months of expenses saved ($ {months * 1200})
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setMonths((m) => {
              const next = Math.min(6, m + 1);
              if (next >= 4) onDone?.();
              return next;
            });
          }}
        >
          Save Monthly Surplus (+1 Mo)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setMonths(1)}
        >
          Spend Surplus
        </button>
      </div>
      <div style={{ padding: "12px", background: "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {months >= 3 ? "Resilient: You can survive unexpected crises without taking high-interest loans." : "Vulnerable: Any minor emergency forces emergency borrowing."}
      </div>
    </div>
  );
}

function SavingsWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What is an emergency fund primarily designed to achieve?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Speculate on volatile high-risk assets</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Cover 3 to 6 months of essential living costs during shocks</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Lock money away until retirement age</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "savings",
  story: [
    animatedBeat(
      [
        T("Meet Anjali. She earns fifteen dollars a week delivering local weekend neighborhood newsletters.", "Das ist Lena. Sie verdient 15 Euro die Woche mit dem Austragen von Wochenendzeitungen.", "Poznaj Maję. Zarabia sześćdziesiąt złotych tygodniowo na roznoszeniu lokalnych gazetek."),
        T("Her dream is to save eight hundred dollars to build her own fast custom gaming computer.", "Ihr Traum ist es, 800 Euro fuer einen schnellen Gaming-PC zusammenzusparen.", "Jej marzeniem jest odłożenie trzech tysięcy złotych na szybki komputer do gier."),
        T("Every single afternoon, friends invite her to get sweet boba tea and snacks costing five dollars a cup.", "Jeden Nachmittag laden Freunde sie zu Bubble Tea und Snacks fuer 5 Euro ein.", "Codziennie znajomi zapraszają ją na modną herbatę boba i przekąski za dwadzieścia złotych."),
      ],
      BobaTemptationDiagram,
    ),
    animatedBeat(
      [
        T("Economists call this choice *time preference*.", "Oekonomen nennen diesen Konflikt *Zeitpraeferenz*.", "Ekonomiści nazywają ten wybór *preferencją czasową*."),
        T("High time preference means grabbing quick instant pleasure today, leaving your wallet empty tomorrow.", "Hohe Zeitpraeferenz bedeutet sofortigen Spass heute, aber morgen ein leeres Portemonnaie.", "Wysoka preferencja czasowa to natychmiastowa drobna przyjemność dziś, ale pusty portfel jutro."),
        T("Low time preference is the superpower of waiting a little bit so you can achieve something truly big.", "Niedrige Zeitpraeferenz ist die Superkraft zu warten, um wirklich grosse Ziele zu erreichen.", "Niska preferencja czasowa to supermoc cierpliwości, by zrealizować wielkie, wspaniałe marzenie."),
      ],
      TimePreferenceDiagram,
    ),
    animatedBeat(
      [
        T("When Anjali skips two sugary drinks each week, she banks ten dollars toward her PC build.", "Wenn Lena zwei Drinks die Woche auslaesst, spart sie 10 Euro fuer ihren Gaming-PC.", "Gdy Maja rezygnuje z dwóch drogich napojów w tygodniu, odkłada czterdzieści złotych na swój komputer."),
        T("She also keeps a fifty-dollar mini *emergency buffer* so a flat bike tire never derails her progress.", "Sie haelt auch 50 Euro als *Notgroschen* bereit, damit ein platter Fahrradreifen sie nicht stoppt.", "Trzyma też dwieście złotych jako *bufor awaryjny*, by pęknięta dętka w rowerze nie zrujnowała jej planu."),
        T("Savings turn stressful unexpected emergencies into minor, easy inconveniences.", "Ein Ersparnispuffer verwandelt echte Notfaelle in harmlose Kleinigkeiten.", "Oszczędności zamieniają stresujące, nagłe kłopoty w drobne, łatwe do rozwiązania sytuacje."),
      ],
      EmergencyBufferDiagram,
    ),
    animatedBeat(
      [
        T("Saving money is not about depriving yourself of joy or never having fun with friends.", "Beim Sparen geht es nicht darum, sich jeden Spass mit Freunden zu verbieten.", "W oszczędzaniu nie chodzi o odmawianie sobie wszelkiej radości czy wyjść z przyjaciółmi."),
        T("It is about deciding what actually matters to you instead of leaking cash on things you forget by bedtime.", "Es geht darum zu entscheiden, was dir wirklich wichtig ist, statt Geld gedankenlos zu verstreuen.", "Chodzi o świadome wybieranie tego, co naprawdę ma znaczenie, zamiast bezmyślnego rozrzucania drobnych kwot."),
        T("Every dollar you save is a little mechanical employee working quietly to build your future options.", "Jeder gesparte Euro ist ein kleiner stiller Helfer, der dir spaeter echte Freiheit schenkt.", "Każdy zaoszczędzony grosz to mały pomocnik, który po cichu buduje Twoją przyszłą niezależność."),
      ],
      MechanicalEmployeesDiagram,
    ),
    animatedBeat(
      [
        T("By summer, Anjali orders her graphics card, processor, and monitors in shining original boxes.", "Im Sommer bestellt Lena Grafikkarte, Prozessor und Bildschirm im funkelnden Karton.", "Przed wakacjami Maja z dumą zamawia nową kartę graficzną, procesor i monitor."),
        T("Her friends wonder how she managed to buy such an incredible gaming setup.", "Ihre Freunde staunen, wie sie sich dieses tolle Setup leisten konnte.", "Jej znajomi nie mogą wyjść z podziwu, jak udało jej się złożyć tak niesamowity sprzęt."),
        T("The secret was simply directing small everyday streams of money into a reservoir of patient savings.", "Das Geheimnis war simpel: kleine taegliche Ausgaben in geduldiges Sparen umzulenken.", "Tajemnica była prosta: zamiana drobnych, codziennych wydatków w cierpliwie odkładane oszczędności."),
      ],
      DreamDeliveredDiagram,
    ),
  ],
  toyIntro: T(
    "Experiment with building an emergency cash runway of monthly expenses.",
    "Experimentiere mit dem Aufbau eines Notfallpolsters aus Monatsausgaben.",
    "Poeksperymentuj z budową poduszki finansowej na kolejne miesiące wydatków.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does an economist mean by low time preference?",
        "Was meint ein Oekonom mit niedriger Zeitpraeferenz?",
        "Co ekonomista ma na myśli, mówiąc o niskiej preferencji czasowej?",
      ),
      options: [
        { text: T("A willingness to postpone spending now for greater future benefits", "Die Bereitschaft, Ausgaben fuer groesseren Zukunftsnutzen aufzuschieben", "Gotowość do odłożenia wydatków teraz dla większych korzyści w przyszłości"), correct: true },
        { text: T("Arriving late to financial appointments", "Zu spaet zu Finanzterminen zu erscheinen", "Spóźnianie się na spotkania finansowe") },
        { text: T("Spending all earnings within twenty-four hours", "Sein gesamtes Gehalt innerhalb eines Tages auszugeben", "Wydanie całego wynagrodzenia w ciągu jednej doby") },
      ],
      hint: T(
        "It involves patience and prioritizing tomorrow over today.",
        "Es erfordert Geduld und den Vorzug des Morgigen gegenueber dem Heutigen.",
        "Wymaga cierpliwości i przedkładania jutra nad dzień dzisiejszy.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is keeping all lifetime savings purely as physical cash risky over decades?",
        "Warum ist es riskant, alle Ersparnisse jahrzehntelang als Bargeld zu halten?",
        "Dlaczego trzymanie całych oszczędności przez dekady wyłącznie w gotówce jest ryzykowne?",
      ),
      options: [
        { text: T("Inflation erodes the purchasing power of cash over time", "Inflation mindert die Kaufkraft des Geldes im Zeitverlauf", "Inflacja z czasem obniża siłę nabywczą gotówki"), correct: true },
        { text: T("Cash automatically turns into digital credits after ten years", "Bargeld verwandelt sich nach zehn Jahren automatisch in Digitalguthaben", "Gotówka automatycznie zamienia się w punkty cyfrowe po dziesięciu latach") },
        { text: T("Physical currency notes naturally dissolve if untouched", "Geldscheine loesen sich bei Nichtbenutzung von selbst auf", "Banknoty ulegają samoistnemu rozpuszczeniu, gdy nikt ich nie dotyka") },
      ],
      hint: T(
        "Think of what happens to the prices of everyday goods over long periods.",
        "Bedenke, wie sich Preise von Alltagsguetern ueber lange Zeit entwickeln.",
        "Zastanów się, co dzieje się z cenami codziennych towarów w długim okresie.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the primary objective of an emergency fund.",
        "Waehle das Hauptziel eines Notfallfonds aus.",
        "Wskaż główny cel posiadania poduszki finansowej.",
      ),
      Widget: SavingsWidget,
      hint: T(
        "It serves as a buffer against real life shocks.",
        "Er dient als Puffer gegen Schlaege des Lebens.",
        "Służy jako amortyzator przed nieprzewidzianymi wstrząsami życiowymi.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: How many months of expenses do they keep in their emergency buffer, and why?",
    "Frage deine Eltern: Wie viele Monatsausgaben halten sie in ihrem Notfallpuffer und warum?",
    "Zapytaj rodziców: Ile miesięcy wydatków trzymają w swojej poduszce finansowej i z jakiego powodu?",
  ),
  realLife: {
    title: T(
      "Real world: Corporate cash runway and burn rates",
      "Echte Welt: Liquiditaetsreichweite und Burn-Rate von Firmen",
      "Prawdziwy świat: Płynność finansowa i tempo wypalania gotówki w firmach",
    ),
    body: T(
      "Startups and large corporations measure their financial survival in runway: the number of months a company can operate before running out of liquid cash at its current burn rate. Companies with zero runway risk immediate bankruptcy during revenue downturns.",
      "Start-ups und Grosskonzerne messen ihr finanzielles Ueberleben in Reichweite: Wie viele Monate das Geld bei den aktuellen Ausgaben reicht. Unternehmen ohne Puffer riskieren bei Einbruechen die sofortige Insolvenz.",
      "Startupy i duże korporacje mierzą swoje przetrwanie finansowe w miesiącach płynności: ile czasu firma może działać przy bieżących kosztach. Przedsiębiorstwa bez poduszki ryzykują natychmiastowe bankructwo przy spadku przychodów.",
    ),
  },
  factCard: {
    claims: [
      { text: T("Eugen von Boehm-Bawerk formulated the theory of time preference and interest in capital theory.", "Eugen von Boehm-Bawerk formulierte die Theorie der Zeitpraeferenz und des Zinses.", "Eugen von Böhm-Bawerk sformułował teorię preferencji czasowej oraz procentu w teorii kapitału."), source: "https://www.econlib.org/library/YPDBooks/BohmBawerk/bbCP.html" },
      { text: T("The US Financial Industry Regulatory Authority (FINRA) advises holding 3 to 6 months of living expenses in liquid reserves.", "Die US-Finanzaufsicht FINRA empfiehlt eine liquide Reserve von 3 bis 6 Monatsausgaben.", "Amerykański regulator FINRA zaleca utrzymywanie płynnej rezerwy na poziomie od 3 do 6 miesięcy kosztów życia."), source: "https://www.finra.org/investors/insights/emergency-fund" },
      { text: T("German financial regulator BaFin emphasizes the role of emergency liquidity in personal solvency protection.", "Die BaFin betont die Bedeutung von Notfallliquiditaet zum Schutz der persoenlichen Zahlungsfaehigkeit.", "Niemiecki regulator BaFin podkreśla rolę płynności awaryjnej w ochronie wypłacalności osobistej."), source: "https://www.bafin.de/EN/Verbraucher/Finanzwissen/Geldanlage/geldanlage_node_en.html" },
      { text: T("The Polish Financial Supervision Authority (KNF) warns about the risk of debt spirals caused by lacking emergency savings.", "Die polnische Finanzaufsicht KNF warnt vor Schuldenspiralen durch fehlende Notfallruecklagen.", "Komisja Nadzoru Finansowego (KNF) ostrzega przed spiralą zadłużenia spowodowaną brakiem oszczędności awaryjnych."), source: "https://www.knf.gov.pl/en/CONSUMERS/Information_for_consumers" },
      { text: T("Opportunity cost measures the loss of potential gain from other alternatives when one alternative is chosen.", "Opportunitaetskosten messen den entgangenen Nutzen anderer Alternativen bei einer Entscheidung.", "Koszt alternatywny mierzy utraconą korzyść z innych możliwości przy wyborze danej opcji."), source: "https://www.britannica.com/money/opportunity-cost" },
    ],
    simplified: [
      T(
        "Complex portfolio asset allocation models are simplified into the baseline division between cash buffers and investments.",
        "Komplexe Portfolio-Allokationsmodelle werden auf die grundlegende Teilung zwischen Notgroschen und Anlage vereinfacht.",
        "Złożone modele alokacji portfelowej uproszczono do podstawowego podziału na bufor gotówkowy i inwestycje.",
      ),
    ],
  },
};
