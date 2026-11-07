import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function PowerTriangleLaunchDiagram({ lang, step }: DiagramProps) {
  const aishName = lang === "pl" ? "Ania" : lang === "de" ? "Anna" : "Aish";
  const label = lang === "pl" ? "Ania analizuje trójkąt równowagi władzy: Obywatele, Rynek i Państwo" : lang === "de" ? "Anna analysiert das Machtdreieck: Buerger, Markt und Staat" : "Aish analyzing the power triangle equilibrium between Citizens, Market, and State";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#6366f1" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#312e81" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#4f46e5" stroke="#6366f1" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a5b4fc">{aishName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#c7d2fe">
          🔺 {lang === "pl" ? "Trójkąt Władzy: Trwała Równowaga" : lang === "de" ? "Das Macht-Dreieck: Lebendige Balance" : "The Power Triangle Equilibrium"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">🧑‍🤝‍🧑 🏢 🏛️</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#818cf8">
            {lang === "pl" ? "Obywatele • Przedsiębiorstwa • Państwo" : lang === "de" ? "Buerger • Unternehmen • Staat" : "Citizens • Enterprises • Government"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#3730a3" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Gdy jedna siła dominuje, wolność ginie" : lang === "de" ? "Dominanz einer Ecke zerstoert die Freiheit" : "Monopoly by any single pillar breeds collapse"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#e0e7ff">
            {lang === "pl" ? "Dynamiczne napięcie gwarantuje sprawiedliwość" : lang === "de" ? "Konstruktive Spannung sichert Wohlstand" : "Dynamic tension guarantees liberty & progress"}
          </text>
        </g>
      )}
    </svg>
  );
}

function TriangularInteractionsDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Wzajemne powiązania w trójkącie władzy: podatki, praca, prawo i głosy" : lang === "de" ? "Gegenseitige Beziehungen im Machtdreieck: Steuern, Arbeit, Recht und Wahlen" : "Interconnected flows in the power triangle: labor, taxes, regulation, and votes";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <circle cx="70" cy="140" r="32" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="70" y="135" textAnchor="middle" fontSize="18">🧑‍🤝‍🧑</text>
        <text x="70" y="155" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#1e40af">Citizens</text>

        <circle cx="330" cy="140" r="32" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <text x="330" y="135" textAnchor="middle" fontSize="18">🏭</text>
        <text x="330" y="155" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#065f46">Business</text>

        <circle cx="200" cy="55" r="32" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="200" y="50" textAnchor="middle" fontSize="18">🏛️</text>
        <text x="200" y="70" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#92400e">State</text>

        <line x1="95" y1="125" x2="175" y2="70" stroke="#94a3b8" strokeWidth="2" />
        <line x1="305" y1="125" x2="225" y2="70" stroke="#94a3b8" strokeWidth="2" />
        <line x1="105" y1="140" x2="295" y2="140" stroke="#94a3b8" strokeWidth="2" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="185" width="320" height="36" rx="6" fill="#1e293b" />
          <text x="200" y="202" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#38bdf8">
            Citizens vote & work • Business pays wages & innovates • State enforces fair laws
          </text>
          <text x="200" y="214" textAnchor="middle" fontSize="8" fill="#94a3b8">
            {lang === "pl" ? "Żaden filar nie może istnieć samodzielnie bez pozostałych dwóch" : lang === "de" ? "Keine Saeule kann ohne die anderen beiden existieren" : "Each pillar relies indispensably upon the reciprocal vitality of the others"}
          </text>
        </g>
      )}
    </svg>
  );
}

function PathologicalImbalancesDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Trzy patologie zachwiania równowagi: autorytaryzm, korporacjonizm i anarchia" : lang === "de" ? "Drei Fehlentwicklungen: Autoritarismus, Monopolherrschaft und Anarchie" : "Three systemic failure modes: authoritarian tyranny, corporatocracy, and anarchy";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
      <g>
        <rect x="30" y="45" width="100" height="75" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="80" y="70" textAnchor="middle" fontSize="16">🏛️ 🛑</text>
        <text x="80" y="90" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#991b1b">State Monolith</text>
        <text x="80" y="105" textAnchor="middle" fontSize="7" fill="#b91c1c">Totalitarian control</text>

        <rect x="150" y="45" width="100" height="75" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="200" y="70" textAnchor="middle" fontSize="16">🏭 💰</text>
        <text x="200" y="90" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#991b1b">Robber Barons</text>
        <text x="200" y="105" textAnchor="middle" fontSize="7" fill="#b91c1c">Oligarchic capture</text>

        <rect x="270" y="45" width="100" height="75" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="320" y="70" textAnchor="middle" fontSize="16">🔥 💥</text>
        <text x="320" y="90" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#991b1b">State Collapse</text>
        <text x="320" y="105" textAnchor="middle" fontSize="7" fill="#b91c1c">Chaos & lawlessness</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#881337" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Dominance by any single node destroys the institutional architecture
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#fecdd3">
            {lang === "pl" ? "Jeśli państwo dławi rynek, powstaje nędza; jeśli korporacje kupują państwo, ginie demokracja" : lang === "de" ? "Drosselt der Staat den Markt, droht Armut; kaufen Konzerne den Staat, stirbt Demokratie" : "If the state crushes markets, poverty spreads; if monopolies buy the state, democracy dies"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Zdrowy ustrój wymaga ciągłego wzajemnego ograniczania sił" : lang === "de" ? "Eine gesunde Ordnung verlangt stetige gegenseitige Kontrolle" : "Sustainable prosperity requires eternal triangular checks and counter-balances"}
          </text>
        </g>
      )}
    </svg>
  );
}

function RobustEquilibriumMatrixDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Dynamiczna równowaga: trójkąt wzajemnej kontroli i zaufania" : lang === "de" ? "Dynamisches Gleichgewicht: Dreieck gegenseitiger Kontrolle und Zusammenarbeit" : "Dynamic equilibrium: reciprocal checks, balances, and institutional trust";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <g>
        <circle cx="200" cy="85" r="35" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fontSize="20">⚖️ 🤝</text>
        <text x="200" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803d">Tripartite Balance</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="44" rx="6" fill="#14532d" />
          <text x="200" y="153" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            Neither total laissez-faire nor authoritarian state command
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8.5" fill="#bbf7d0">
            {lang === "pl" ? "Wzajemne zaufanie i rządy prawa chronią wolność jednostki i rozwój firm" : lang === "de" ? "Rechtsstaatlichkeit und Vertrauen ermoeglichen persoenliche Freiheit und Wohlstand" : "The constitutional rule of law aligns personal freedom with flourishing private enterprise"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Instytucjonalna równowaga to największe osiągnięcie nowożytnej cywilizacji" : lang === "de" ? "Institutionelle Gewaltenteilung ist der Hoehepunkt moderner Zivilisation" : "Institutional tripartite balance represents the crown jewel of modern civilization"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CivilSocietyGuardianDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Społeczeństwo obywatelskie jako strażnik równowagi i wolności" : lang === "de" ? "Die Zivilgesellschaft als Hueterin von Balance und Freiheit" : "Civil society as the vigilant guardian of equilibrium and liberty";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <g>
        <circle cx="200" cy="85" r="35" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fontSize="20">🌟 🛡️</text>
        <text x="200" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#581c87">Active Citizens</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="135" width="300" height="42" rx="6" fill="#581c87" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            "Power tends to corrupt, and absolute power corrupts absolutely"
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8.5" fill="#e9d5ff">
            Lord Acton (1887)
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Świadomi obywatele sprawdzają zarówno polityków, jak i kartele biznesowe" : lang === "de" ? "Engagierte Buerger kontrollieren sowohl Politiker als auch Wirtschaftskartelle" : "Educated, vocal citizens hold both state ministries and corporate cartels accountable"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [citizens, setCitizens] = useState(50);
  const [business, setBusiness] = useState(50);
  const [government, setGovernment] = useState(50);

  const avg = (citizens + business + government) / 3;
  const spread = Math.max(Math.abs(citizens - avg), Math.abs(business - avg), Math.abs(government - avg));
  const isEquilibrium = spread <= 15 && citizens >= 40 && business >= 40 && government >= 40;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Citizens: {citizens} | Business: {business} | Government: {government} | State: {isEquilibrium ? "Dynamic Equilibrium" : "Imbalanced"}
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setCitizens(50);
            setBusiness(50);
            setGovernment(50);
            onDone?.();
          }}
        >
          Balance All Three (50/50/50)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setGovernment(90);
            setBusiness(10);
            setCitizens(10);
          }}
        >
          Authoritarian Overreach (90 Gov)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setBusiness(90);
            setGovernment(10);
            setCitizens(10);
          }}
        >
          Corporate Oligopoly (90 Biz)
        </button>
      </div>
      <div style={{ padding: "12px", background: isEquilibrium ? "#eef8ef" : "#fef2f2", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {isEquilibrium
          ? "Harmonious Equilibrium: A vibrant civil society votes in honest elections, competitive companies create prosperity, and a transparent state defends rights!"
          : "Systemic Imbalance: One corner dominates without restraint, risking tyranny, consumer price gouging, or civil disorder."}
      </div>
    </div>
  );
}

function PowerTriangleWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What happens to a society when one corner of the Power Triangle completely dominates?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>The town clock begins chiming in alphabetical order</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Balance collapses into tyranny or unfair rules because nobody can push back</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Potholes in roadways are immediately filled with strawberry jam</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "powertriangle",
  story: [
    animatedBeat(
      [
        T("Meet Aish. She observes how a free city functions and sketches a three-cornered diagram in her notebook.", "Das ist Anna. Sie beobachtet das Zusammenspiel im Land und skizziert ein Dreieck mit drei Kraeften in ihr Notizbuch.", "Poznaj Anię. Obserwuje funkcjonowanie nowoczesnego państwa i rysuje w notesie trójkąt symbolizujący trzy wielkie siły."),
        T("At one corner stand *Citizens and civil society*: voters, families, independent journalists, and community associations.", "An einer Ecke stehen die *Buerger und die Zivilgesellschaft*: Waehler, Familien, freie Journalisten und Vereine.", "Przy jednym rogu stoją *Obywatele i społeczeństwo obywatelskie*: wyborcy, rodziny, dziennikarze i stowarzyszenia."),
        T("At the second corner stand *Enterprises and markets*: small businesses, innovators, and investors.", "An der zweiten Ecke stehen *Unternehmen und Maerkte*: Handwerker, Gruender, Betriebe und Investoren.", "Przy drugim rogu stoją *Przedsiębiorstwa i rynek*: drobni rzemieślnicy, startupy, fabryki i inwestorzy."),
      ],
      PowerTriangleLaunchDiagram,
    ),
    animatedBeat(
      [
        T("At the third corner stands the *Government and public institutions*: elected parliaments, courts, police, and ministries.", "An der dritten Ecke stehen der *Staat und oeffentliche Institutionen*: Parlamente, Gerichte, Polizei und Behoerden.", "Przy trzecim rogu stoi *Państwo i instytucje publiczne*: wybrany parlament, niezawisłe sądy, policja i urzędy."),
        T("These three institutional forces do not live in sealed silos; they are joined in a perpetual, dynamic cycle of exchange.", "Diese drei Kraefte arbeiten nicht isoliert, sondern stehen in einem lebendigen, staendigen Austausch.", "Te trzy siły nie działają w próżni; łączy je nieustanny obieg wzajemnej współpracy i kontroli."),
        T("Citizens work for enterprises and vote in elections; enterprises pay taxes and innovate; the state enforces equal laws and builds infrastructure.", "Buerger arbeiten in Betrieben und waehlen Politiker; Firmen zahlen Steuern und entwickeln Produkte; der Staat sichert Recht und Strassen.", "Obywatele pracują w firmach i głosują w wyborach; firmy płacą podatki i tworzą innowacje; państwo dba o równe prawo i buduje drogi."),
      ],
      TriangularInteractionsDiagram,
    ),
    animatedBeat(
      [
        T("History demonstrates the terrifying danger that occurs when any single corner expands unchecked to swallow the other two.", "Die Weltgeschichte beweist die toedliche Gefahr, wenn eine einzelne Ecke ungebremst die anderen beiden verschlingt.", "Historia świata dowodzi, jak śmiertelne niebezpieczeństwo powstaje, gdy jeden róg trójkąta rośnie bez kontroli, pożerając pozostałe dwa."),
        T("If Government crushes markets and citizens, totalitarian dictatorship and poverty follow.", "Ueberrollt der Staat Buerger und Maerkte, enden wir in totalitaerer Diktatur und Mangelwirtschaft.", "Gdy Państwo zdławi rynek i obywateli, powstaje totalitarna dyktatura i powszechna nędza."),
        T("If a single big company bribes politicians and silences workers, greedy bosses capture the town; if law and order breaks down, chaos erupts.", "Kaufen Grosskonzerne die Politik und beuten Arbeiter aus, herrscht Willkuer; bricht die Ordnung zusammen, herrscht Chaos.", "Gdy wielki Biznes kupuje polityków i wyzyskuje pracowników, rodzi się niesprawiedliwość; gdy upada praworządność, wybucha anarchia."),
      ],
      PathologicalImbalancesDiagram,
    ),
    animatedBeat(
      [
        T("Enduring liberty and human prosperity emerge only when all three corners remain in healthy balance.", "Dauerhafte Freiheit und Wohlstand entstehen ausschliesslich aus einem gesunden Gleichgewicht der Kraefte.", "Trwała wolność i rozwój rodzą się wyłącznie ze zdrowej równowagi wszystkich trzech sił."),
        T("Citizens maintain independent unions, free press, and ballot initiatives to keep both corporate monopolies and state bureaucracies honest.", "Buerger nutzen freie Medien, Gerichte und Wahlen, um Monopole und staatliche Buerokratie in Schach zu halten.", "Obywatele korzystają z wolnych mediów, sądów i kart do głosowania, by kontrolować zarówno państwo, jak i kartele biznesowe."),
        T("Enterprises provide the technical vitality and wealth that fund public institutions, while the state ensures competition remains open and fair.", "Firmen liefern den wirtschaftlichen Motor fuer Steuern und Fortschritt, waehrend der Staat faire Spielregeln schuetzt.", "Firmy tworzą bogactwo finansujące szpitale i szkoły, a państwo pilnuje, by konkurencja była uczciwa i chroniła przyrodę."),
      ],
      RobustEquilibriumMatrixDiagram,
    ),
    animatedBeat(
      [
        T("The Power Triangle is not a rigid statue; it is a flexible, moving tightrope requiring active civic vigilance from every generation.", "Das Macht-Dreieck ist kein starres Denkmal, sondern eine taegliche Balance, die Wachsamkeit aller Buerger verlangt.", "Trójkąt Władzy to nie martwy pomnik, lecz nieustanny taniec równowagi na linie, wymagający zaangażowania każdego pokolenia."),
        T("Democracy thrives when citizens participate in community boards, evaluate facts critically, and demand accountability from both executives and ministers.", "Demokratie lebt davon, dass Menschen sich vor Ort engagieren, Fakten pruefen und Verantwortung einfordern.", "Demokracja rozkwita, gdy świadomi obywatele angażują się lokalnie, krytycznie weryfikują fakty i rozliczają zarówno prezesów korporacji, jak i ministrów."),
        T("Understanding this fundamental equilibrium empowers you to protect the institutions that defend human freedom, innovation, and shared prosperity.", "Wer diese Balance versteht, kann unsere freien Institutionen schuetzen, die menschliche Wuerde und Wohlstand sichern.", "Zrozumienie tej fundamentalnej równowagi pozwala świadomie chronić instytucje, które stoją na straży ludzkiej godności, wolności i rozwoju."),
      ],
      CivilSocietyGuardianDiagram,
    ),
  ],
  toyIntro: T(
    "Calibrate the Power Triangle: adjust civic engagement, business dynamism, and government oversight to keep all three sides in healthy balance.",
    "Balanciere das Macht-Dreieck: Justiere Buergerbeteiligung, Wirtschaft und Staat fuer ein gesundes Gleichgewicht.",
    "Zarządzaj Trójkątem Władzy: dostosuj aktywność obywatelską, biznes i państwo, by utrzymać harmonijną równowagę sił."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is an unchecked monopoly of power by any single corner of the Power Triangle catastrophic for society?",
        "Warum ist ein unkontrolliertes Machtmonopol einer einzelnen Ecke des Machtdreiecks fatal fuer die Gesellschaft?",
        "Dlaczego skupienie absolutnej władzy w rękach jednego bieguna Trójkąta Władzy jest zgubne dla społeczeństwa?",
      ),
      options: [
        { text: T("Without independent balance, unchecked power easily turns into unfair tyranny or abuse", "Ohne Gegenwicht fuehrt unbegrenzte Macht unausweichlich zu Willkuer und Ungerechtigkeit", "Bez niezależnej równowagi niekontrolowana władza łatwo zamienia się w tyranię i wyzysk"), correct: true },
        { text: T("Because triangles with uneven sides are mathematically forbidden by city zoning boards", "Weil ungleichseitige Dreiecke im Baurecht strengstens verboten sind", "Ponieważ trójkąty różnoboczne są surowo zabronione przez miejskie plany zagospodarowania"), correct: false },
        { text: T("Because desk lamps in government offices only shine light at 90-degree angles", "Weil Schreibtischlampen in Amtsstuben nur in rechten Winkeln leuchten", "Ponieważ lampki na biurkach w ministerstwach świecą wyłącznie pod kątem prostym"), correct: false },
      ],
      hint: T(
        "Remember Lord Acton's famous maxim: power tends to corrupt, and absolute power corrupts absolutely.",
        "Denke an das beruehmte Zitat von Lord Acton: Macht neigt dazu zu korrumpieren, absolute Macht korrumpiert absolut.",
        "Przypomnij sobie słynną zasadę lorda Actona: każda władza deprawuje, a władza absolutna deprawuje absolutnie."),
    },
    {
      kind: "choice",
      prompt: T(
        "How do active citizens and civil society help maintain equilibrium within the Power Triangle?",
        "Wie sichert eine engagierte Zivilgesellschaft das Gleichgewicht im Machtdreieck?",
        "W jaki sposób aktywni obywatele i społeczeństwo obywatelskie utrzymują równowagę w Trójkącie Władzy?",
      ),
      options: [
        { text: T("By participating in elections, supporting investigative journalism, organizing civic associations, and holding both politicians and corporate monopolies accountable", "Durch Teilnahme an Wahlen, freie Medien, Vereinsarbeit und die Kontrolle von Politikern und Firmenkartellen", "Biorąc udział w wyborach, wspierając wolne media, działając w stowarzyszeniach i rozliczając z nadużyć zarówno polityków, jak i kartele biznesowe"), correct: true },
        { text: T("By painting their garden mailboxes silver every spring equinox", "Durch das jaehrliche Streichen aller Briefkaesten in Silber zur Fruehlings-Tagundnachtgleiche", "Malując skrzynki pocztowe na srebrno podczas wiosennej równonocy"), correct: false },
        { text: T("By refusing to look at road signs during leap years", "Durch das Ignorieren von Strassenschildern in Schaltjahren", "Ignorując znaki drogowe w latach przestępnych"), correct: false },
      ],
      hint: T(
        "Look for the mechanisms of democratic participation, watchdog journalism, and institutional checks.",
        "Achte auf buergerschaftliches Engagement, kritische Oeffentlichkeit und institutionelle Aufsicht.",
        "Zwróć uwagę na mechanizmy zaangażowania obywatelskiego, niezależnej kontroli mediów i nadzoru nad władzą."),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze what happens to societal stability when the Power Triangle falls into extreme imbalance.",
        "Analysiere die Folgen fuer die gesellschaftliche Stabilitaet, wenn das Macht-Dreieck aus der Balance geraet.",
        "Przeanalizuj skutki dla stabilności państwa, gdy Trójkąt Władzy ulega skrajnemu zachwianiu równowagi.",
      ),
      Widget: PowerTriangleWidget,
      hint: T(
        "Focus on how the loss of independent institutional checks leads to authoritarian control or corporate exploitation.",
        "Achte darauf, wie das Fehlen von Kontrollgewalten zu Diktatur oder Ausbeutung fuehrt.",
        "Zwróć uwagę na to, jak brak niezależnych bezpieczników instytucjonalnych prowadzi do tyranii lub wyzysku."),
    },
  ],
  askDad: T(
    "Ask your parent: Which corner of our society's Power Triangle (citizens, businesses, or government) feels like it has the most influence today?",
    "Frage deine Eltern: Welche Ecke unseres Machtdreiecks (Buerger, Wirtschaft oder Staat) hat heute ihrer Meinung nach den staerksten Einfluss?",
    "Zapytaj rodziców: Który róg Trójkąta Władzy (obywatele, biznes czy państwo) ma Waszym zdaniem największy wpływ na nasze codzienne życie?"),
  realLife: {
    title: T(
      "Real world: Daron Acemoglu and James Robinson's 'The Narrow Corridor' of liberty",
      "Echte Welt: Daron Acemoglu und James Robinson ueber den 'schmalen Korridor' der Freiheit",
      "Prawdziwy świat: Daron Acemoğlu i James Robinson o 'Wąskim korytarzu' wolności",
    ),
    body: T(
      "In their groundbreaking 2019 political economy study 'The Narrow Corridor', Nobel laureates Daron Acemoglu and James Robinson demonstrated that genuine human freedom exists only within a narrow corridor between two fatal extremes: the despotic state (Leviathan dominating society) and the absent state (lawless chaos where warlords rule). Liberty requires a 'Shackled Leviathan': a strong, capable state constantly checked and balanced by an energetic, mobilized, and vigilant civil society.",
      "In ihrem Werk 'Der schmale Korridor' (2019) zeigen die Nobelpreistraeger Daron Acemoglu und James Robinson: Echte Freiheit existiert nur in einem schmalen Korridor zwischen zwei Abgruenden: dem despotischen Staat (Leviathan) und der Gesetzlosigkeit. Freiheit braucht den 'gezaehmten Leviathan': einen starken, handlungsfaehigen Staat, der durch eine wachsame, mobilisierte Buergergesellschaft in Schranken gehalten wird.",
      "W przełomowej książce 'Wąski korytarz' (2019) nobliści Daron Acemoğlu i James Robinson wykazali, że prawdziwa wolność istnieje tylko w wąskim pasie między dwiema skrajnościami: państwem despotycznym (Lewiatanem) a anarchią i bezprawiem. Wolność wymaga 'spętanego Lewiatana': sprawnego państwa poddanego nieustannej kontroli zorganizowanego i czujnego społeczeństwa obywatelskiego."),
  },
  factCard: {
    claims: [
      { text: T("Lord Acton wrote his famous observation 'Power tends to corrupt, and absolute power corrupts absolutely' in a letter to Bishop Creighton on April 5, 1887.", "Lord Acton formulierte am 5. April 1887 seinen beruehmten Satz ueber die korrumpierende Wirkung von Macht.", "Lord Acton sformułował słynną maksymę o korumpującej naturze władzy w liście do biskupa Creightona z 5 kwietnia 1887 r."), source: "https://oll.libertyfund.org/quote/lord-acton-writes-to-bishop-creighton-that-the-same-moral-standards-should-be-applied-to-all-men-political-and-religious-leaders-included-especially-since-power-tends-to-corrupt-and-absolute-power-corrupts-absolutely-1887" },
      { text: T("Daron Acemoglu and James Robinson published 'The Narrow Corridor: States, Societies, and the Fate of Liberty' in September 2019.", "Daron Acemoglu und James Robinson veroeffentlichten 2019 'The Narrow Corridor' ueber das Gleichgewicht von Staat und Gesellschaft.", "Daron Acemoğlu i James Robinson opublikowali we wrześniu 2019 r. 'Wąski korytarz' poświęcony równowadze państwa i społeczeństwa."), source: "https://www.penguinrandomhouse.com/books/555400/the-narrow-corridor-by-daron-acemoglu-and-james-a-robinson/" },
      { text: T("Daron Acemoglu, Simon Johnson, and James Robinson were awarded the 2024 Nobel Memorial Prize in Economic Sciences for studies on how institutions form and affect prosperity.", "Acemoglu, Johnson und Robinson erhielten 2024 den Wirtschaftsnobelpreis fuer ihre Forschungen zu Institutionen und Wohlstand.", "Acemoğlu, Johnson i Robinson otrzymali Nagrodę Nobla z ekonomii w 2024 r. za badania nad wpływem instytucji na dobrobyt narodów."), source: "https://www.nobelprize.org/prizes/economic-sciences/2024/press-release/" },
      { text: T("Alexis de Tocqueville published 'Democracy in America' in 1835, emphasizing how voluntary civic associations counterbalance centralized administrative power.", "Alexis de Tocqueville betonte 1835 in 'Ueber die Demokratie in Amerika' die Rolle freier Buergervereinigungen als Gegengewicht zum Staat.", "Alexis de Tocqueville opublikował w 1835 r. 'O demokracji w Ameryce', wskazując rolę stowarzyszeń obywatelskich jako przeciwwagi dla władzy."), source: "https://www.gutenberg.org/ebooks/815" },
      { text: T("The World Justice Project publishes the annual Rule of Law Index measuring constraints on government powers, fundamental rights, and regulatory enforcement across 142 nations.", "Das World Justice Project bewertet im Rule of Law Index jaehrlich Schranken fuer Regierungsmacht in 142 Laendern.", "World Justice Project publikuje coroczny Wskaźnik Praworządności mierzący ograniczenia władzy rządu i swobody obywatelskie w 142 państwach."), source: "https://worldjusticeproject.org/rule-of-law-index/" },
    ],
    simplified: [
      T(
        "Complex institutional matrix equations, game-theoretic triadic bargaining protocols, and sociological power distribution vectors are translated into interactive three-corner equilibrium sliders and accessible checks-and-balances scenarios.",
        "Komplexe spieltheoretische Verhandlungsprotokolle und soziologische Machtmatrizen wurden durch interaktive Gleichgewichtsregler und anschauliche Szenarien verstaendlich gemacht.",
        "Skomplikowane modele teorii gier, trójstronne protokoły negocjacyjne i wektory rozkładu sił społecznych przedstawiono za pomocą czytelnych suwaków równowagi i zrozumiałych scenariuszy ustrojowych."),
    ],
  },
};
