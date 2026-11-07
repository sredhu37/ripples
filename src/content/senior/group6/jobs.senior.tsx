import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function CreativeDestructionSchumpeterDiagram({ lang, step }: DiagramProps) {
  const name = lang === "pl" ? "Kamil" : lang === "de" ? "Klaus" : "Karan";
  const label = lang === "pl" ? "Karan i twórcza destrukcja: jak innowacje technologiczne przekształcają rynek pracy" : lang === "de" ? "Klaus und schoepferische Zerstoerung: Wie Innovationen den Arbeitsmarkt wandeln" : "Karan and creative destruction: how technological innovation transforms labor markets";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#eab308" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#eab308" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#713f12" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#ca8a04" stroke="#eab308" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fef08a">{name}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fef9c3">
          🔄 {lang === "pl" ? "Twórcza Destrukcja i Praca" : lang === "de" ? "Schoepferische Zerstoerung" : "Creative Destruction"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="16">📉 ❌ ➡️ 🚀 ✨</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#facc15">
            {lang === "pl" ? "Stare zawody znikają • Powstają nowe" : lang === "de" ? "Alte Berufe weichen • Neue entstehen" : "Old Roles Fade • New Careers Emerge"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#713f12" />
          <text x="250" y="170" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Lump of Labor to mit ekonomiczny" : lang === "de" ? "Arbeit geht niemals aus" : "Lump of Labor Fallacy"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#fef08a">
            {lang === "pl" ? "Liczba miejsc pracy nie jest stałą pulą" : lang === "de" ? "Der Bedarf an menschlichen Diensten waechst" : "Human wants and aspirations expand infinitely"}
          </text>
        </g>
      )}
    </svg>
  );
}

function HistoricalLaborTransitionsDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Historyczne przesunięcia zatrudnienia: od rolnictwa po sektor usług i technologii" : lang === "de" ? "Historischer Strukturwandel: Von der Landwirtschaft zu Dienstleistungen" : "Historical labor transitions: from 80% agriculture to services and tech";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="140" height="65" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="14">🌾 🚜</text>
        <text x="110" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#92400e">1800: 80% in Farms</text>
        <text x="110" y="102" textAnchor="middle" fontSize="8" fill="#b45309">Subsistence agriculture</text>

        <rect x="220" y="45" width="140" height="65" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="290" y="70" textAnchor="middle" fontSize="14">💻 🏥</text>
        <text x="290" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1e40af">Today: &lt;2% in Farms</text>
        <text x="290" y="102" textAnchor="middle" fontSize="8" fill="#1d4ed8">Medicine, software, design</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#1e293b" />
          <text x="200" y="150" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#60a5fa">
            Mechanization Liberated Billions of Minds
          </text>
          <text x="200" y="165" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl" ? "Gdyby w 1800 r. zakazano traktorów, 80% z nas nadal musiałoby kopać ziemię" : lang === "de" ? "Ohne Traktoren muessten 80% der Menschen heute noch auf dem Acker schuften" : "Without tractors and harvesters, humanity could not sustain modern medicine or science"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#166534" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Uwolniona praca zasiliła edukację, naukę i sztukę" : lang === "de" ? "Freigesetzte Arbeitskraft schuf Raum fuer Kultur und Wissenschaft" : "Freed human energy created modern healthcare, education, and research"}
          </text>
        </g>
      )}
    </svg>
  );
}

function NewProfessionsEmergenceDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Narodziny nowych profesji: inżynierowie chmury, bioinformatycy i analitycy danych" : lang === "de" ? "Entstehung neuer Berufe: Cloud-Architekten und Datenanalysten" : "Emergence of new professions: cloud engineers, bioinformaticians, and data architects";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <circle cx="80" cy="85" r="26" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="80" y="82" textAnchor="middle" fontSize="12">🕯️</text>
        <text x="80" y="98" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#991b1b">Lamplighter</text>

        <circle cx="160" cy="85" r="26" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="160" y="82" textAnchor="middle" fontSize="12">🐎</text>
        <text x="160" y="98" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#991b1b">Farrier</text>

        <circle cx="240" cy="85" r="26" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="240" y="82" textAnchor="middle" fontSize="12">☁️</text>
        <text x="240" y="98" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#166534">Cloud DevOps</text>

        <circle cx="320" cy="85" r="26" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="320" y="82" textAnchor="middle" fontSize="12">🧬</text>
        <text x="320" y="98" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#166534">Bioinformatician</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#38bdf8">
            60% of Jobs Today Did Not Exist in 1940
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#e2e8f0">
            {lang === "pl" ? "Większość dzisiejszych stanowisk pracy byłaby całkowicie niezrozumiała dla naszych pradziadków" : lang === "de" ? "Die meisten heutigen Berufe waeren fuer unsere Urgrosseltern unvorstellbar gewesen" : "Economic research shows the majority of current employment is in brand-new job categories"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#0369a1" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Każda fala technologiczna tworzy nieprzewidziane gałęzie gospodarki" : lang === "de" ? "Jede Innovationswelle schafft neue Branchen und Karrieren" : "Technological revolutions expand the frontier of human endeavor"}
          </text>
        </g>
      )}
    </svg>
  );
}

function FrictionOfTransitionRetrainingDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Koszty transformacji i przekwalifikowanie: wsparcie dla pracowników" : lang === "de" ? "Uebergangskosten und Weiterbildung: Schutz fuer Beschaeftigte" : "Transition friction and active labor market retraining programs";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fdf4ff" stroke="#a21caf" strokeWidth="2" />
      <g>
        <circle cx="100" cy="85" r="30" fill="#fae8ff" stroke="#a21caf" strokeWidth="2" />
        <text x="100" y="80" textAnchor="middle" fontSize="18">🛡️ 🎓</text>
        <text x="100" y="100" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#701a75">Safety Net</text>

        <rect x="230" y="60" width="130" height="55" rx="6" fill="#701a75" />
        <text x="295" y="83" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">Lifelong Learning</text>
        <text x="295" y="100" textAnchor="middle" fontSize="8" fill="#f5d0fe">Nordic flexicurity model</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f472b6">
            Protect the Worker, Not the Obsolete Job
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl" ? "Społeczeństwo musi wspierać ludzi finansowo i edukacyjnie podczas zmiany branży" : lang === "de" ? "Menschen muessen bei Umschulungen sozial und finanziell abgesichert sein" : "Enabling workers to adapt smoothly through funded training and transitional cushions"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#86198f" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Elastyczność połączona z bezpieczeństwem socjalnym" : lang === "de" ? "Flexibilitaet kombiniert mit verlaesslicher Sicherheit" : "Flexicurity harmonizes rapid technological adoption with social dignity"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ContinuousAdaptabilityDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Ciągła adaptacja: elastyczność umysłowa i uczenie się przez całe życie" : lang === "de" ? "Lebenslanges Lernen: Anpassungsfaehigkeit und Neugierde" : "Lifelong adaptability: curiosity, continuous learning, and resilience";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <g>
        <circle cx="200" cy="80" r="34" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">🌱 🚀</text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#15803d">Lifelong Agility</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#15803d" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            The Most Valuable Skill is Learning How to Learn
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#bbf7d0">
            {lang === "pl" ? "Gotowość do poznawania nowych narzędzi chroni przed technologicznym wykluczeniem" : lang === "de" ? "Die Faehigkeit, Neues zu lernen, ist der beste Schutz vor Wandel" : "Curiosity and cognitive agility turn technology from a threat into an accelerator"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Praca jutra będzie wymagała wyobraźni, empatii i współpracy" : lang === "de" ? "Zukuenftige Berufe fordern Kreativitaet, Empathie und Urteilsvermoegen" : "Future careers will reward synthesis, human warmth, and judgment"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [retrainingLevel, setRetrainingLevel] = useState(1);
  const employedNewTech = retrainingLevel * 20;
  const isTransitionComplete = retrainingLevel >= 5;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Workforce Transition Index: Level {retrainingLevel}/5 | New Tech Employment: {employedNewTech}%
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            const next = Math.min(5, retrainingLevel + 1);
            setRetrainingLevel(next);
            if (next >= 5) onDone?.();
          }}
        >
          Fund STEM Reskilling & Transition Safety Nets
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setRetrainingLevel(1)}
        >
          Block Innovation (Defend Obsolete Roles)
        </button>
      </div>
      <div style={{ padding: "12px", background: isTransitionComplete ? "#eef8ef" : "#fef9c3", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {isTransitionComplete
          ? "Successful Structural Transition: Rather than enduring permanent joblessness, workers transitioned into high-wage positions in software engineering, green energy, and biotechnology!"
          : "Frictional Transition: Workers in declining legacy industries face disruption without proactive education and retraining support."}
      </div>
    </div>
  );
}

function JobsWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What is the 'Lump of Labor' fallacy, and why does historical economic evidence disprove the fear that technology permanently eliminates human work?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>It claims that people only work to earn money to purchase chocolate shoes</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>It is the false assumption that there is a fixed quantity of work to be done in an economy; in reality, automation frees up labor and capital, spawning entirely new industries, desires, and careers that never existed before</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>It argues that machines will force all human beings to live in deep ocean caves</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "jobs",
  story: [
    animatedBeat(
      [
        T("Meet Karan. He looks at an old black-and-white photograph of hundreds of telephone operators manually plugging switchboard cables into wooden boards.", "Das ist Klaus. Er betrachtet ein Foto aus dem Jahr 1920: Hunderte Telefonistinnen stecken per Hand Kabel in Schalttafeln.", "Poznaj Karana. Przygląda się czarno-białej fotografii z 1920 roku: setki telefonistek ręcznie przełączają kable w drewnianych centralach telefonicznych."),
        T("Whenever a revolutionary technology arrives, from mechanical looms and steam tractors to personal computers and artificial intelligence, people fear that human work will vanish.", "Wann immer eine bahnbrechende Technik entsteht, waechst die Angst, dass menschliche Arbeit fuer immer verschwindet.", "Za każdym razem, gdy pojawia się przełomowa technologia, od mechanicznych krosien po sztuczną inteligencję, ludzi ogarnia lęk, że praca na zawsze zniknie."),
        T("Yet throughout two centuries of relentless industrial and digital automation, overall employment has continuously expanded rather than contracted.", "Doch in zweihundert Jahren industrieller Automation ist die Beschaeftigung weltweit gewachsen statt geschrumpft.", "Tymczasem w ciągu dwustu lat nieustannego rozwoju przemysłu i cyfryzacji ogólna liczba miejsc pracy stale rosła, zamiast maleć."),
      ],
      CreativeDestructionSchumpeterDiagram,
    ),
    animatedBeat(
      [
        T("Economist Joseph Schumpeter termed this dynamic process 'Creative Destruction'.", "Der Oekonom Joseph Schumpeter nannte diesen Prozess 'Schoepferische Zerstoerung'.", "Ekonomista Joseph Schumpeter nazwał ten dynamiczny proces 'twórczą destrukcją'."),
        T("Innovative technologies inevitably dismantle outdated companies and render specific physical tasks obsolete, but they liberate human effort for higher-value activities.", "Neue Technologien verdraengen alte Berufe, befreien aber menschliche Schaffenskraft fuer hoeherwertige Aufgaben.", "Innowacje nieuchronnie wypierają przestarzałe zawody, lecz uwalniają ludzką energię do podejmowania bardziej wartościowych wyzwań."),
        T("In the year 1800, over 80% of workers in Europe and America labored in grueling subsistence agriculture simply to feed the population.", "Im Jahr 1800 schufteten ueber 80% der Menschen in harter Landwirtschaft, nur um die Grundernaehrung zu sichern.", "W 1800 roku ponad 80% społeczeństwa pracowało w wyczerpującym rolnictwie, by zapewnić żywność."),
      ],
      HistoricalLaborTransitionsDiagram,
    ),
    animatedBeat(
      [
        T("Today, thanks to tractors, synthetic fertilizers, and combine harvesters, less than 2% of the workforce produces a vast food surplus.", "Heute genuegen dank Traktoren und Erntemaschinen weniger als 2% der Erwerbstaetigen fuer riesige Nahrungsmittelueberschuesse.", "Dziś, dzięki ciągnikom i kombajnom, mniej niż 2% pracowników wytwarza nadwyżki żywności dla całych narodów."),
        T("The millions of people liberated from fieldwork did not become permanently unemployed; they became doctors, electrical engineers, architects, and scientists.", "Die freigesetzten Millionen wurden nicht arbeitslos: Sie wurden Aerzte, Ingenieure, Kuenstler und Forscher.", "Miliony ludzi zwolnionych z pracy na roli nie zostały bezrobotne: stali się lekarzami, inżynierami, architektami i naukowcami."),
        T("Economic studies show that over 60% of jobs performed by workers today did not even exist in the year 1940.", "Studien belegen: Ueber 60% der heutigen Berufsfelder gab es im Jahr 1940 noch ueberhaupt nicht.", "Badania wykazują, że ponad 60% dzisiejszych profesji nie istniało w 1940 roku."),
      ],
      NewProfessionsEmergenceDiagram,
    ),
    animatedBeat(
      [
        T("However, economists emphasize that the 'friction of transition' is deeply real and requires compassionate social policy.", "Dennoch betonen Oekonomen: Dieser Strukturwandel ist schmerzhaft und erfordert kluge Sozialpolitik.", "Ekonomiści podkreślają jednak, że koszty transformacji są bolesne i wymagają mądrej polityki społecznej."),
        T("When an automobile factory closes or switchboard operators are replaced, middle-aged workers cannot instantly transform into software developers overnight.", "Wenn eine Fabrik schliesst, kann ein Facharbeiter nicht ueber Nacht zum Softwareentwickler umschulen.", "Gdy zamyka się tradycyjna fabryka, wykwalifikowany robotnik nie stanie się z dnia na dzień programistą chmurowym."),
        T("Forward-looking societies invest heavily in active labor retraining, educational safety nets, and portable benefits to cushion structural transitions.", "Weitsichtige Staaten investieren massiv in Weiterbildung, Bildungsurlaub und soziale Fangnetze.", "Dalekowzroczne państwa inwestują w programy przekwalifikowania i osłony socjalne, pomagając pracownikom adaptować się do zmian."),
      ],
      FrictionOfTransitionRetrainingDiagram,
    ),
    animatedBeat(
      [
        T("In the modern automated economy, the most resilient skill you can develop is the capacity for lifelong learning.", "In einer automatisierten Welt ist lebenslanges Lernen die wichtigste Faehigkeit ueberhaupt.", "W zautomatyzowanej gospodarce najważniejszą umiejętnością staje się zdolność ciągłego uczenia się przez całe życie."),
        T("Instead of mastering a single static manual task for forty years, professionals continually adopt new digital tools and adapt to evolving paradigms.", "Statt vierzig Jahre denselben Handgriff zu tun, erlernen Fachkraefte staendig neue digitale Werkzeuge.", "Zamiast wykonywać tę samą czynność przez czterdzieści lat, specjaliści nieustannie poznają nowe narzędzia cyfrowe."),
        T("By cultivating intellectual curiosity and adaptability, you position technology as your lifelong career partner rather than an adversary.", "Wer neugierig und anpassungsfaehig bleibt, nutzt Technologie als verlaesslichen Partner fuer den eigenen Erfolg.", "Pielęgnując ciekawość świata i elastyczność umysłu, czynisz z technologii sprzymierzeńca na swojej ścieżce zawodowej."),
      ],
      ContinuousAdaptabilityDiagram,
    ),
  ],
  toyIntro: T(
    "Guide the workforce transition: invest in active retraining and social safety nets to help displaced workers transition into thriving technology careers.",
    "Steuere den Arbeitsmarktwandel: Investiere in Weiterbildung und Sicherheitsnetze, um Fachkraefte fuer Zukunftsberufe zu qualifizieren.",
    "Zarządzaj transformacją rynku pracy: inwestuj w programy przekwalifikowania i osłony socjalne, by pomóc pracownikom wejść do nowoczesnych sektorów gospodarki."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why do economists reject the 'Lump of Labor' fallacy which claims that automation permanently reduces the total number of jobs?",
        "Warum lehnen Oekonomen die 'Lump-of-Labor'-Theorie ab, nach der Technik dauerhaft Arbeitsplaetze vernichtet?",
        "Dlaczego ekonomiści odrzucają mit o stałej puli pracy (Lump of Labor fallacy), według którego automatyzacja trwale niszczy zatrudnienie?",
      ),
      options: [
        { text: T("Because human desires and needs are not fixed; as productivity lowers the cost of necessities, capital and purchasing power are freed to build entirely new industries and professions", "Weil menschliche Beduerfnisse grenzenlos sind: Sinken die Kosten fuer Grundbedarf, entsteht Kaufkraft fuer voellig neue Wirtschaftszweige", "Ponieważ ludzkie potrzeby nie są ograniczone: gdy wydajność obniża ceny podstawowych dóbr, kapitał i siła nabywcza tworzą zupełnie nowe branże i zawody"), correct: true },
        { text: T("Because every displaced worker is immediately hired as a private gardener for the moon", "Weil alle freigesetzten Arbeiter sofort als Gaertner auf dem Mond angestellt werden", "Ponieważ każdy zwolniony pracownik zostaje natychmiast zatrudniony jako ogrodnik na Księżycu"), correct: false },
        { text: T("Because robots are legally prohibited from working on Tuesdays, Thursdays, and bank holidays", "Weil Roboter an Dienstagen und Feiertagen laut Gesetz nicht arbeiten duerfen", "Ponieważ robotom prawnie zakazano pracy we wtorki, czwartki i święta państwowe"), correct: false },
      ],
      hint: T(
        "Think about what happened to the 80% of workers who used to farm: did they become jobless, or did new professions emerge?",
        "Denke an den Wandel der Landwirtschaft: Was tun die frueheren 80% Bauern heute?",
        "Przypomnij sobie los 80% dawnych rolników: czy zostali bezrobotni, czy zasilili nowe zawody?"),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is government and civic investment in active labor retraining critical during periods of rapid technological disruption?",
        "Warum sind staatliche Investitionen in Weiterbildung waehrend technologischer Umbrueche unverzichtbar?",
        "Dlaczego publiczne inwestycje w przekwalifikowanie pracowników są kluczowe w okresach gwałtownych zmian technologicznych?",
      ),
      options: [
        { text: T("Because transitions create acute real-world friction; displaced workers need funded financial cushions and training to bridge the gap into emerging economic sectors", "Weil der Strukturwandel Reibungsverluste erzeugt: Betroffene brauchen soziale Absicherung und Foerderung fuer neue Branchen", "Ponieważ transformacja wiąże się z bolesnymi kosztami; pracownicy potrzebują osłon finansowych i szkoleń, by odnaleźć się w nowych branżach"), correct: true },
        { text: T("Because teachers must be trained to instruct classroom students in 17th-century sword fighting", "Weil Lehrer darin geschult werden muessen, Schuelern Fechten mit Holzschwertern beizubringen", "Ponieważ nauczyciele muszą przejść szkolenie z szermierki siedemnastowieczną szablą"), correct: false },
        { text: T("Because governments want to ban all mechanical tools and return to stone axes", "Weil Regierungen alle Maschinen verbieten und zu Steinzeitkeulen zurueckkehren wollen", "Ponieważ rządy planują zakazać maszyn i nakazać powrót do kamiennych siekier"), correct: false },
      ],
      hint: T(
        "Think about protecting the person and facilitating their retraining rather than artificially preserving an obsolete job.",
        "Achte darauf, den Menschen zu schuetzen und weiterzubilden, statt veraltete Posten kuenstlich zu erhalten.",
        "Zwróć uwagę na ochronę człowieka i pomoc w nauce nowych umiejętności zamiast sztucznego dotowania przestarzałych stanowisk."),
    },
    {
      kind: "widget",
      prompt: T(
        "Examine why technological automation historically expands the overall frontier of human employment and productivity.",
        "Untersuche, warum technologische Automation historisch die Beschaeftigung und den Wohlstand ausgeweitet hat.",
        "Zbadaj, dlaczego automatyzacja w perspektywie historycznej poszerza granice ludzkiego zatrudnienia i dobrobytu.",
      ),
      Widget: JobsWidget,
      hint: T(
        "Focus on creative destruction, non-fixed labor pools, productivity gains, and new industries.",
        "Achte auf schoepferische Zerstoerung, unbegrenzte Beduerfnisse und neue Berufsfelder.",
        "Skup się na twórczej destrukcji, elastyczności rynku pracy i powstawaniu nieznanych wcześniej sektorów gospodarki."),
    },
  ],
  askDad: T(
    "Ask your parent: Which job that exists today would have seemed completely impossible or like pure science fiction when you were in school?",
    "Frage deine Eltern: Welcher heutige Beruf haette in eurer Schulzeit noch wie reine Science-Fiction geklungen?",
    "Zapytaj rodziców: Jaki zawód istniejący dzisiaj wydawałby się czystym science fiction, gdy chodziliście do szkoły?"),
  realLife: {
    title: T(
      "Real world: David Autor's Landmark Study on the Evolution of Work (1940-2018)",
      "Echte Welt: David Autors bahnbrechende Arbeitsmarktstudie (1940-2018)",
      "Prawdziwy świat: Przełomowe badanie Davida Autora nad ewolucją pracy (1940-2018)",
    ),
    body: T(
      "In a landmark 2024 National Bureau of Economic Research study, MIT labor economist David Autor and his co-authors analyzed United States Census occupational data spanning eight decades. Their astonishing finding was that more than 60 percent of employment in 2018 was in job specialties that did not exist in 1940, including pediatric oncologists, software architects, wind turbine technicians, and digital imaging specialists. Technology did not destroy employment; it elevated work from manual drudgery into specialized, high-skill cognitive careers.",
      "In einer wegweisenden Studie des NBER analysierte MIT-Oekonom David Autor Berufsdaten aus acht Jahrzehnten. Das verblueffende Ergebnis: Ueber 60 Prozent der Arbeitsplaetze des Jahres 2018 existierten 1940 noch gar nicht, darunter Bioinformatiker, Windkraft-Techniker und Software-Architekten. Technik vernichtete keine Arbeit, sondern verwandelte monotone Schufterei in anspruchsvolle, spezialisierte Berufe.",
      "W przełomowej pracy dla National Bureau of Economic Research (NBER) ekonomista z MIT David Autor przeanalizował dane ze spisów powszechnych USA z ośmiu dekad. Wykazał, że ponad 60 procent stanowisk pracy w 2018 roku należało do specjalności, które w 1940 roku w ogóle nie istniały, takich jak technicy turbin wiatrowych, programiści czy radiolodzy cyfrowi. Technologia nie zniszczyła miejsc pracy, lecz zastąpiła fizyczny znój specjalistyczną pracą intelektualną."),
  },
  factCard: {
    claims: [
      { text: T("Joseph Schumpeter coined and popularized 'Creative Destruction' in 'Capitalism, Socialism and Democracy' in 1942.", "Joseph Schumpeter praegte den Begriff der 'Schoepferischen Zerstoerung' 1942 in seinem Hauptwerk.", "Joseph Schumpeter spopularyzował pojęcie 'twórczej destrukcji' w książce 'Kapitalizm, socjalizm, demokracja' w 1942 r."), source: "https://www.routledge.com/Capitalism-Socialism-and-Democracy/Schumpeter/p/book/9780415107624" },
      { text: T("David Autor et al. published NBER Working Paper 32101 in 2024 finding that 60% of modern jobs did not exist in 1940.", "David Autor und sein Team belegten 2024 im NBER-Papier 32101, dass 60% heutiger Berufe 1940 nicht existierten.", "David Autor i współpracownicy wykazali w raporcie NBER nr 32101 (2024), że 60% współczesnych zawodów nie istniało w 1940 r."), source: "https://www.nber.org/papers/w32101" },
      { text: T("The US Department of Agriculture reported agricultural employment declined from 41% of the workforce in 1900 to under 1.5% in 2020.", "Das US-Landwirtschaftsministerium dokumentierte den Rueckgang der Agrarbevoelkerung von 41% (1900) auf unter 1,5% (2020).", "Departament Rolnictwa USA odnotował spadek zatrudnienia w rolnictwie z 41% w 1900 r. do poniżej 1,5% w 2020 r."), source: "https://www.ers.usda.gov/data-products/chart-gallery/gallery/chart-detail/?chartId=58282" },
      { text: T("The Danish Ministry of Employment developed the 'Flexicurity' model combining labor flexibility with high social security and retraining.", "Daenemark entwickelte das 'Flexicurity'-Modell, das Arbeitsmarktflexibilitaet mit starker sozialer Absicherung vereint.", "Dania wdrożyła model 'flexicurity', łączący elastyczność zatrudnienia z wysokimi osłonami socjalnymi i powszechnym przekwalifikowaniem."), source: "https://bm.dk/arbejdsomraader/aktuelle-fokusomraader/den-danske-model/flexicurity/" },
      { text: T("The World Economic Forum Future of Jobs Report 2023 estimated 69 million new jobs would be created by green and technological transitions.", "Das Weltwirtschaftsforum prognostizierte 2023 das Entstehen von 69 Millionen neuen Berufen durch die Transformation.", "Raport Światowego Forum Ekonomicznego (WEF) z 2023 r. oszacował powstanie 69 milionów nowych miejsc pracy w zielonej i cyfrowej gospodarce."), source: "https://www.weforum.org/reports/the-future-of-jobs-report-2023/" },
    ],
    simplified: [
      T(
        "Dynamic general equilibrium labor models, structural macro-reallocation shocks, and wage-skill elasticity equations are translated into hands-on workforce retraining simulations and clear historical career patterns.",
        "Strukturelle Arbeitsmarkt-Gleichgewichtsmodelle und Lohnelastizitaeten wurden in intuitive Umschulungsspiele und verstaendliche Wirtschaftsgeschichte uebersetzt.",
        "Modele równowagi ogólnej rynku pracy i elastyczności płacowej przedstawiono w postaci przystępnych symulatorów transformacji zawodowej i zrozumiałej historii rozwoju gospodarczego."),
    ],
  },
};
