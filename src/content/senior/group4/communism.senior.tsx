import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function CentralPlanningLaunchDiagram({ lang, step }: DiagramProps) {
  const arjunName = lang === "pl" ? "Artur" : lang === "de" ? "Arno" : "Arjun";
  const label = lang === "pl" ? "Artur bada historię gospodarek centralnie planowanych i komunizmu" : lang === "de" ? "Arno untersucht die Geschichte von Planwirtschaft und Kommunismus" : "Arjun examining the history and economics of central planning and communism";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#b91c1c" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#b91c1c" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#450a0a" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#991b1b" stroke="#b91c1c" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fca5a5">{arjunName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#b91c1c" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#fecaca">
          🏭 {lang === "pl" ? "Komunizm: Centralne Planowanie" : lang === "de" ? "Planwirtschaft: Das Wissensproblem" : "Communism: The Knowledge Problem"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">🏢 📋 🚫 🍞</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#f87171">
            {lang === "pl" ? "Urzędowe kwoty zamiast sygnałów cenowych" : lang === "de" ? "Staatliche Quoten statt freier Marktpreise" : "State quotas replace price signals"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#7f1d1d" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Chroniczne braki w sklepach i kolejki" : lang === "de" ? "Chronischer Mangel und Warteschlangen" : "Chronic shortages and rationing lines"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#fecaca">
            {lang === "pl" ? "Brak bodźców do innowacji i dbałości o kapitał" : lang === "de" ? "Fehlende Innovationsanreize und Ineffizienz" : "Erosion of individual work incentives"}
          </text>
        </g>
      )}
    </svg>
  );
}

function LocalKnowledgeProblemDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Problem wiedzy lokalnej Hayeka: centralny planista nie zna potrzeb milionów ludzi" : lang === "de" ? "Hayeks Wissensproblem: Die Planungszentrale kennt lokale Beduerfnisse nicht" : "Hayek's local knowledge problem: central planners cannot coordinate dispersed information";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="100" height="80" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="85" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">Mountain</text>
        <text x="85" y="90" textAnchor="middle" fontSize="16">❄️ 🧥</text>
        <text x="85" y="108" textAnchor="middle" fontSize="8" fill="#b91c1c">Needs 60 coats</text>
        <text x="85" y="120" textAnchor="middle" fontSize="7.5" fill="#7f1d1d">Gets 33 from quota</text>

        <rect x="150" y="45" width="100" height="80" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="200" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">Capital Desk</text>
        <text x="200" y="90" textAnchor="middle" fontSize="16">🏢 📋</text>
        <text x="200" y="108" textAnchor="middle" fontSize="8" fill="#1d4ed8">Guesses 33 each</text>
        <text x="200" y="120" textAnchor="middle" fontSize="7.5" fill="#1e3a8a">No local data</text>

        <rect x="265" y="45" width="100" height="80" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="315" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">Coastal Port</text>
        <text x="315" y="90" textAnchor="middle" fontSize="16">☀️ 👕</text>
        <text x="315" y="108" textAnchor="middle" fontSize="8" fill="#b91c1c">Needs 0 coats</text>
        <text x="315" y="120" textAnchor="middle" fontSize="7.5" fill="#7f1d1d">33 rotting in shed</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="145" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="163" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#f87171">
            Central bureaucracies cannot aggregate fragmented tacit knowledge
          </text>
          <text x="200" y="177" textAnchor="middle" fontSize="8.5" fill="#94a3b8">
            {lang === "pl" ? "Urzędnik nie wie, czy w górach spadł śnieg, czy pękła rura, czy zmieniła się pogoda" : lang === "de" ? "Ferne Planer wissen nichts von ploetzlichem Schnee oder kaputten Werkzeugen" : "Bureaucrats cannot observe changing weather, localized soil quality, or urgent tool repairs"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#7f1d1d" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "W rezultacie powstają góry niechcianych towarów i dotkliwy brak artykułów pierwszej potrzeby" : lang === "de" ? "Das Ergebnis: Berge unbrauchbarer Gueter bei gleichzeitigem Mangel an Lebensmitteln" : "Result: warehouses of unwanted junk alongside acute shortages of bread and medicine"}
          </text>
        </g>
      )}
    </svg>
  );
}

function PriceSignalsVsDeadQuotasDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Sygnały cenowe a martwe kwoty urzędowe" : lang === "de" ? "Preissignale versus stumme Planungsquoten" : "Dynamic price signals versus rigid bureaucratic quotas";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="140" height="85" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">Market Prices</text>
        <text x="110" y="92" textAnchor="middle" fontSize="16">📡 ⚡ 🔀</text>
        <text x="110" y="112" textAnchor="middle" fontSize="8.5" fill="#14532d">Instantly signal scarcity</text>
        <text x="110" y="124" textAnchor="middle" fontSize="7.5" fill="#166534">Directs supply automatically</text>

        <rect x="220" y="45" width="140" height="85" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">Command Quotas</text>
        <text x="290" y="92" textAnchor="middle" fontSize="16">🔒 🛑 🧱</text>
        <text x="290" y="112" textAnchor="middle" fontSize="8.5" fill="#7f1d1d">Fixed by 5-year decree</text>
        <text x="290" y="124" textAnchor="middle" fontSize="7.5" fill="#991b1b">Blind to consumer demand</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="145" width="320" height="42" rx="6" fill="#14532d" />
          <text x="200" y="163" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Cena rynkowa jest jak telegraf: bez centrali informuje miliony ludzi o brakach" : lang === "de" ? "Preise wirken wie ein Telegraf: Sie kommunizieren Knappheit blitzschnell" : "Prices act like a planetary telegraph transmitting scarcity data in milliseconds"}
          </text>
          <text x="200" y="177" textAnchor="middle" fontSize="8.5" fill="#bbf7d0">
            {lang === "pl" ? "Gdy rząd zamraża ceny i narzuca plany, zrywa przewody komunikacyjne gospodarki" : lang === "de" ? "Werden Preise verboten, kappt man das Nervensystem der Volkswirtschaft" : "Abolishing prices cuts the nervous system of production and resource allocation"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#1e293b" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Bez wolnych cen racjonalne gospodarowanie jest matematycznie niemożliwe (Mises)" : lang === "de" ? "Ohne echte Preise ist Wirtschaftsrechnung unmoeglich (Ludwig von Mises)" : "Without free market pricing, rational economic calculation is impossible"}
          </text>
        </g>
      )}
    </svg>
  );
}

function IncentiveCollapseDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Upadek motywacji i syndrom fikcyjnej pracy: 'My udajemy, że pracujemy...'" : lang === "de" ? "Der Zusammenbruch der Arbeitsmoral: 'Sie tun, als ob sie uns bezahlen...'" : "The collapse of individual incentive structures under state ownership";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <g>
        <circle cx="200" cy="85" r="35" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fontSize="20">🥱 🛑</text>
        <text x="200" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#92400e">Zero Reward</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="45" rx="6" fill="#78350f" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            "They pretend to pay us, and we pretend to work"
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8.5" fill="#fde68a">
            Famous Soviet workers' proverb
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Brak prawa do własności i zysków niszczy kreatywność i staranność" : lang === "de" ? "Ohne Eigentumsrechte und individuellen Lohn erstirbt jeder Erfindergeist" : "Eliminating individual rewards predictably snuffs out innovation and diligence"}
          </text>
        </g>
      )}
    </svg>
  );
}

function MarketReconnectionSynthesisDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Wnioski historyczne: dlaczego decentralizacja informacji i wolność rynkowa wygrały" : lang === "de" ? "Historische Lehren: Warum dezentrale Information und Marktwirtschaft siegten" : "Historical verdict: why decentralized coordination and liberty outperformed command";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <circle cx="200" cy="85" r="35" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fontSize="20">🌐 🤝</text>
        <text x="200" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4c1d95">Decentralized Order</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#38bdf8">
            Millions of decentralized choices outperform the smartest central bureau
          </text>
          <text x="200" y="167" textAnchor="middle" fontSize="8.5" fill="#94a3b8">
            {lang === "pl" ? "Upadek Muru Berlińskiego w 1989 r. zakończył tragiczny eksperyment gospodarki nakazowej" : lang === "de" ? "Der Fall der Berliner Mauer 1989 besiegelte das Ende der sozialistischen Planwirtschaft" : "The fall of the Berlin Wall in 1989 marked the historical conclusion of command economics"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#065f46" />
          <text x="200" y="212" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Prawdziwy dobrobyt rodzi się z wolności gospodarczej, bodźców i rządów prawa" : lang === "de" ? "Wohlstand entsteht durch wirtschaftliche Freiheit, Initiative und Rechtsstaatlichkeit" : "Abundance emerges from economic freedom, decentralized coordination, and property rights"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [allocation, setAllocation] = useState(33);
  const [shortageResolved, setShortageResolved] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Mountain Winter Coat Quota: {allocation} coats (Actual Need: 60)
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setAllocation((a) => {
              const next = Math.min(60, a + 15);
              if (next >= 60) {
                setShortageResolved(true);
                onDone?.();
              }
              return next;
            });
          }}
        >
          Adjust to Real Local Need (+15 coats)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setAllocation(33);
            setShortageResolved(false);
          }}
        >
          Revert to Uniform Central Plan (33)
        </button>
      </div>
      <div style={{ padding: "12px", background: shortageResolved ? "#eef8ef" : "#fef2f2", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {shortageResolved
          ? "Local Need Satisfied: Mountain families get warm winter coats, while coastal ports receive light shirts instead of wasted parkas!"
          : "Central Planning Failure: Rigid bureaucratic quotas leave mountain citizens freezing in snowdrifts while coastal warehouses rot with unneeded coats."}
      </div>
    </div>
  );
}

function CommunismWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What is Friedrich Hayek's famous 'Local Knowledge Problem' in central planning?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Planning offices don't have enough filing cabinets to store carbon copies of laws</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Economic information is dispersed across millions of individuals on the ground, making it impossible for a central planning bureau to calculate what should be produced</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Factories in cold climates run out of tea leaves during winter snowstorms</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "communism",
  story: [
    animatedBeat(
      [
        T("Meet Arjun. He reads about 20th-century history and discovers that across Eastern Europe and Asia, whole nations abolished private enterprise.", "Das ist Arno. Er liest ueber die Geschichte des 20. Jahrhunderts und erfaehrt, dass ganze Staaten das Privateigentum abschafften.", "Poznaj Artura. Czyta o historii XX wieku i dowiaduje się, że w wielu krajach Europy Środkowo-Wschodniej i Azji całkowicie zakazano prywatnej przedsiębiorczości."),
        T("Under the banner of *communism*, governments declared that all land, factories, bakeries, and mines belonged to the collective state.", "Im Namen des *Kommunismus* verkuendeten Staaten, dass saemtliche Fabriken, Hoefe und Bergwerke dem Kollektiv gehoerten.", "Pod hasłami *komunizmu* rządy ogłosiły, że wszelka ziemia, fabryki, kopalnie i warsztaty stają się wspólną własnością państwa."),
        T("Instead of millions of independent consumers and businesses trading freely, a monolithic government bureau was tasked with directing the entire economy.", "Statt freier Maerkte sollte eine riesige staatliche Planungsbehoerde die gesamte Produktion und Verteilung lenken.", "Zamiast milionów niezależnych kupujących i sprzedawców całą gospodarką miało odgórnie zarządzać Centralne Biuro Planowania."),
      ],
      CentralPlanningLaunchDiagram,
    ),
    animatedBeat(
      [
        T("Planners in capital city offices attempted to calculate the exact production of every nail, winter shoe, loaf of bread, and tractor for five years in advance.", "Beamte in den Hauptstaedten versuchten, fuer fuenf Jahre im Voraus die Stueckzahl jedes Nagels, Schuhs und Brotes zu berechnen.", "Urzędnicy w odległych stolicach próbowali planować na pięć lat naprzód dokładną liczbę wyprodukowanych gwoździ, butów, bochenków chleba i traktorów."),
        T("This colossal undertaking ran headlong into what Nobel laureate Friedrich Hayek called the *local knowledge problem*.", "Dieses gewaltige Vorhaben scheiterte am sogenannten *Wissensproblem*, das Nobelpreistraeger Friedrich Hayek praegte.", "To gigantyczne zadanie zderzyło się ze zjawiskiem, które noblista Friedrich Hayek nazwał *problemem wiedzy lokalnej*."),
        T("Crucial economic information, such as a sudden frost destroying apples in an orchard or a cracked water valve in a steel mill, is scattered among local workers and cannot be transmitted to distant committees.", "Wichtiges Wissen ueber Frost, kaputte Maschinenteile oder lokalen Bedarf existiert nur vor Ort und laesst sich nicht zentral erfassen.", "Kluczowe informacje gospodarcze, jak nagły mróz niszczący sady czy pęknięty zawór w hucie, są rozproszone wśród ludzi w terenie i nie da się ich przesłać do centrali w tabelkach."),
      ],
      LocalKnowledgeProblemDiagram,
    ),
    animatedBeat(
      [
        T("In free markets, flexible prices communicate scarcity instantaneously like a planetary nervous system.", "In freien Maerkten signalisieren dynamische Preise Knappheit blitzschnell wie ein globales Nervensystem.", "Na wolnym rynku elastyczne ceny informują o brakach błyskawicznie niczym sprawny układ nerwowy gospodarki."),
        T("When timber is scarce, wood prices climb automatically, signaling furniture makers to economize and forestry teams to harvest more logs.", "Wird Holz knapp, steigen Preise, sodass Schreinereien sparen und Forstbetriebe mehr Baeume faellen.", "Gdy brakuje drewna, jego cena rośnie, dając stolarzom sygnał do oszczędzania surowca, a leśnikom do zwiększenia wycinki."),
        T("Because communist regimes abolished market prices and decreed fixed official rates, planning bureaus were flying completely blind, causing catastrophic gluts of useless products alongside heartbreaking shortages of meat and milk.", "Weil Planwirtschaften Preise staatlich festsetzten, flogen Planer blind: Es gab Berge nutzloser Waren bei gleichzeitigem Mangel an Milch und Fleisch.", "Ponieważ reżim komunistyczny zamroził ceny, planiści działali po omacku: magazyny pękały od niepotrzebnych bubli, podczas gdy w sklepach brakowało mięsa, masła i papieru toaletowego."),
      ],
      PriceSignalsVsDeadQuotasDiagram,
    ),
    animatedBeat(
      [
        T("State ownership also caused a catastrophic collapse of personal work incentives.", "Zudem zerstoerte das staatliche Monopol die persoenliche Arbeitsmotivation der Menschen.", "Upaństwowienie gospodarki doprowadziło także do katastrofalnego upadku motywacji do rzetelnej pracy."),
        T("When an employee earned the exact same meager wage regardless of whether they worked brilliantly or slept at their desk, effort plummeted.", "Wenn ein Arbeiter denselben kargen Lohn erhielt, egal ob er Spitzenleistung brachte oder faulenzte, sank die Einsatzbereitschaft rapide.", "Gdy robotnik otrzymywał tę samą skromną pensję bez względu na to, czy pracował sumiennie, czy zbijał bąki, wydajność gwałtownie spadała."),
        T("Factories produced heavy, unusable boots simply to meet raw tonnage quotas, giving rise to the famous cynical worker saying: 'They pretend to pay us, and we pretend to work'.", "Fabriken bauten uebermaessig schwere Stiefel, nur um Tonnenquoten zu erfuellen, gemaess dem Spruch: 'Sie tun, als ob sie uns bezahlen, und wir tun, als ob wir arbeiten'.", "Huty i fabryki produkowały ciężkie, bezużyteczne obuwie tylko po to, by wyrobić plan w tonach, co podsumowywało cyniczne powiedzenie: 'Czy się stoi, czy się leży... '."),
      ],
      IncentiveCollapseDiagram,
    ),
    animatedBeat(
      [
        T("By the late 1980s, the economic stagnation, environmental degradation, and absence of civil liberties led to the peaceful collapse of communist regimes across Europe.", "Ende der 1980er Jahre fuehrten wirtschaftlicher Stillstand, Umweltzerstoerung und fehlende Freiheit zum Zusammenbruch der Systeme in Europa.", "Pod koniec lat 80. zastój gospodarczy, degradacja środowiska i brak podstawowych swobód doprowadziły do pokojowego upadku komunizmu w Europie."),
        T("The fall of the Berlin Wall in 1989 proved that sustainable human prosperity requires individual liberty, voluntary cooperation, and decentralized market coordination.", "Der Fall der Berliner Mauer 1989 bewies: Wahrer Wohlstand braucht persoenliche Freiheit, Eigentum und freie Kooperation.", "Upadek Muru Berlińskiego w 1989 r. ostatecznie dowiódł, że trwały dobrobyt wymaga wolności osobistej, praw własności i mechanizmów rynkowych."),
        T("Studying the tragic economic experiments of the 20th century teaches us to respect how decentralized markets solve coordination problems that no committee can master.", "Die Lehren des 20. Jahrhunderts zeigen uns, wie maechtig dezentrale Maerkte Probleme loesen, die kein Planungsbuero bewaeltigen kann.", "Lekcja XX wieku uczy nas pokory wobec złożoności procesów gospodarczych, z którymi żaden odgórny komitet planistyczny nie jest w stanie sobie poradzić."),
      ],
      MarketReconnectionSynthesisDiagram,
    ),
  ],
  toyIntro: T(
    "Experience the challenge of the central planner: try to match regional production quotas to actual local needs without market price signals.",
    "Erlebe das Dilemma des Planers: Versuche, Produktionsquoten ohne Marktpreise an den realen Bedarf vor Ort anzupassen.",
    "Doświadcz dylematów centralnego planisty: spróbuj dopasować urzędowe plany do rzeczywistych potrzeb mieszkańców bez pomocy sygnałów cenowych."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did centralized economic planning consistently produce severe shortages in consumer stores?",
        "Warum fuehrte die zentrale Planwirtschaft regelmaessig zu akutem Mangel in den Geschaeften?",
        "Dlaczego gospodarka centralnie planowana nieustannie prowadziła do pustych półek w sklepach?",
      ),
      options: [
        { text: T("Because central planning bureaus in distant capitals lacked the localized, real-time knowledge needed to anticipate changing supply, weather, and consumer needs", "Weil zentrale Behoerden das dezentrale, taeglich wechselnde Wissen vor Ort ueber Bedarf, Wetter und Stoerungen unmoeglich erfassen konnten", "Ponieważ urzędnicy w odległych stolicach nie mieli rozproszonej, bieżącej wiedzy o zmieniających się warunkach, pogodzie i potrzebach ludzi"), correct: true },
        { text: T("Because cargo trucks in the 20th century were forbidden from having headlights", "Weil Lastwagen damals keine Scheinwerfer haben durften", "Ponieważ ciężarówkom zabraniano jazdy z włączonymi reflektorami"), correct: false },
        { text: T("Because cash registers only accepted round bronze coins stamped on Saturdays", "Weil Registrierkassen nur samstags gepraegte Muenzen annahmen", "Ponieważ kasy sklepowe przyjmowały wyłącznie monety wybijane w soboty"), correct: false },
      ],
      hint: T(
        "Think about Friedrich Hayek's insight regarding fragmented, dispersed local information.",
        "Denke an Friedrich Hayeks Erkenntnis ueber dezentral verstreutes lokales Wissen.",
        "Przypomnij sobie teorię Friedricha Hayeka o rozproszonej wiedzy lokalnej, której nie sposób zebrać w jednym urzędzie."),
    },
    {
      kind: "choice",
      prompt: T(
        "What essential role do flexible market prices play in allocating resources across an economy?",
        "Welche unverzichtbare Rolle spielen Marktpreise bei der Verteilung von Guetern und Ressourcen?",
        "Jaką fundamentalną rolę pełnią ceny rynkowe w podziale zasobów w gospodarce?",
      ),
      options: [
        { text: T("They act as a dynamic communication network, instantly signaling scarcity or abundance so producers and consumers adjust their behavior without coercion", "Sie wirken als blitzschnelles Signalsystem fuer Knappheit oder Fuelle, sodass Anbieter und Nachfrager ihr Handeln freiwillig anpassen", "Działają jak dynamiczny system łączności, informując o rzadkości lub obfitości dóbr, dzięki czemu ludzie dostosowują swoje decyzje bez przymusu"), correct: true },
        { text: T("They are decorative labels designed to make supermarket display shelves look colorful", "Sie dienen lediglich als Dekoration, um Verkaufsregale bunter zu gestalten", "Stanowią jedynie kolorową ozdobę półek w sklepach samoobsługowych"), correct: false },
        { text: T("They dictate what clothing colors citizens are legally required to wear on holidays", "Sie schreiben Buergern die Kleiderfarben fuer Feiertage vor", "Ustalają odgórnie, jakie kolory ubrań należy zakładać w dni świąteczne"), correct: false },
      ],
      hint: T(
        "Remember how prices act like a planetary telegraph transmitting scarcity data across the globe.",
        "Erinnere dich an den Vergleich mit dem weltweiten Telegrafen, der Knappheitssignale uebertraegt.",
        "Pomyśl o cenach jako o globalnym telegrafie przekazującym informacje o dostępności towarów."),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze Friedrich Hayek's 'Local Knowledge Problem' in command economies.",
        "Analysiere Friedrich Hayeks 'Wissensproblem' in staatlichen Planwirtschaften.",
        "Przeanalizuj 'problem wiedzy lokalnej' Friedricha Hayeka w odniesieniu do gospodarek nakazowych.",
      ),
      Widget: CommunismWidget,
      hint: T(
        "Focus on how decentralized knowledge cannot be collected into a single government planning office.",
        "Achte darauf, warum dezentrales Alltagswissen niemals vollstaendig in einer Behoerde gebuendelt werden kann.",
        "Zwróć uwagę na to, dlaczego wiedza milionów ludzi żyjących w terenie nie może zostać zgromadzona przy jednym urzędniczym biurku."),
    },
  ],
  askDad: T(
    "Ask your parent: Did anyone in your family ever experience standing in queue lines or using ration coupons in past decades?",
    "Frage deine Eltern: Hat jemand in unserer Familie frueher Warteschlangen oder Lebensmittelkarten in der Planwirtschaft erlebt?",
    "Zapytaj rodziców: Czy w Waszej rodzinie ktoś pamięta stanie w kilometrowych kolejkach albo zakupy na kartki w czasach PRL lub NRD?"),
  realLife: {
    title: T(
      "Real world: The Trabant automobile waiting lists in East Germany (GDR) and the fall of the Berlin Wall in 1989",
      "Echte Welt: Die Trabant-Wartelisten in der DDR und der Fall der Berliner Mauer 1989",
      "Prawdziwy świat: Kilkunastoletnie kolejki po Trabanta w NRD i upadek Muru Berlińskiego w 1989 r.",
    ),
    body: T(
      "In communist East Germany (GDR), private automotive competition was illegal. The state car monopoly produced the tiny plastic-bodied 'Trabant'. Because central planners fixed the production quota regardless of demand, citizens who submitted an application to buy a Trabant routinely waited 12 to 15 years for delivery. When the Berlin Wall fell on November 9, 1989, thousands of East Germans drove their smoking Trabants across open borders into West Berlin, celebrating the end of command rationing and reuniting with the open society.",
      "In der DDR war unternehmerischer Wettbewerb im Autobau verboten. Der Staatsbetrieb baute den Kleinwagen 'Trabant' aus Duroplast. Weil Planer feste Stueckzahlen vorgaben, betrug die Wartezeit nach Bestellung 12 bis 15 Jahre. Als am 9. November 1989 die Berliner Mauer fiel, rollten Tausende knatternde Trabanten nach West-Berlin: das sichtbare Ende der Mangelwirtschaft und die Wiedervereinigung in Freiheit.",
      "W komunistycznej NRD prywatny przemysł samochodowy był zakazany, a państwowy monopol produkował Trabanta z duroplastu. Ponieważ planiści ustalali sztywne limity produkcji, na odbiór upragnionego auta czekało się od 12 do nawet 15 lat. Gdy 9 listopada 1989 roku runął Mur Berliński, tysiące Trabantów wjechało do Berlina Zachodniego, symbolizując koniec gospodarki niedoboru i powrót do wolnego świata."),
  },
  factCard: {
    claims: [
      { text: T("Friedrich Hayek published 'The Use of Knowledge in Society' in the American Economic Review in September 1945, demonstrating the local knowledge problem.", "Friedrich Hayek veroeffentlichte im September 1945 seinen epochemachenden Aufsatz 'The Use of Knowledge in Society' ueber dezentrales Wissen.", "Friedrich Hayek opublikował we wrześniu 1945 r. przełomowy esej 'The Use of Knowledge in Society', definiując problem wiedzy lokalnej."), source: "https://www.aeaweb.org/aer/top20/35.4.519-530.pdf" },
      { text: T("Ludwig von Mises formulated the 'Economic Calculation Problem' in 1920, proving that socialism cannot allocate capital rationally without market prices.", "Ludwig von Mises bewies 1920 mit dem 'Wirtschaftsrechnungsproblem', dass Sozialismus ohne Marktpreise zwangslaeufig fehlplant.", "Ludwig von Mises sformułował w 1920 r. 'problem kalkulacji ekonomicznej', wykazując niemożność racjonalnego planowania bez wolnych cen."), source: "https://mises.org/library/economic-calculation-socialist-commonwealth" },
      { text: T("Janos Kornai published 'Economics of Shortage' in 1980, mathematically analyzing systemic soft budget constraints and chronic queues in socialist economies.", "Janos Kornai analysierte 1980 in 'Economics of Shortage' die Gesetzmaessigkeiten des chronischen Mangels im Sozialismus.", "János Kornai opublikował w 1980 r. 'Ekonomię niedoboru', analizując mechanizmy powstawania permanentnych braków rynkowych w socjalizmie."), source: "https://www.sciencedirect.com/book/9780444860590/economics-of-shortage" },
      { text: T("The Berlin Wall, erected on August 13, 1961, was breached on November 9, 1989, initiating the reunification of Germany and collapse of European command systems.", "Die am 13. August 1961 gebaute Berliner Mauer fiel am 9. November 1989 und besiegelte das Ende der Teilung Europas.", "Mur Berliński, wzniesiony 13 sierpnia 1961 r., runął 9 listopada 1989 r., pieczętując upadek bloku wschodniego i zjednoczenie Niemiec."), source: "https://www.stiftung-berliner-mauer.de/en/berlin-wall" },
      { text: T("The World Bank and IMF documented the economic transition of Central and Eastern European nations from command quotas to market pricing during the 1990s.", "Weltbank und IWF dokumentierten in den 1990er Jahren den erfolgreichen Uebergang Mittel- und Osteuropas zur Marktwirtschaft.", "Bank Światowy i MFW szczegółowo udokumentowały transformację ustrojową krajów Europy Środkowo-Wschodniej od gospodarki nakazowej do rynkowej."), source: "https://www.imf.org/external/pubs/ft/fandd/2014/09/roaf.htm" },
    ],
    simplified: [
      T(
        "Complex input-output matrices, Soviet Gosplan five-year balancing directives, and shadow price linear programs are translated into relatable winter coat shortages and interactive quota adjustment dials.",
        "Komplexe Input-Output-Tabellen und sowjetische Fuenfjahresplaene wurden durch verstaendliche Wintermaentel und Schieberegler anschaulich erklaert.",
        "Skomplikowane tablice przepływów międzygałęziowych, plany pięcioletnie i programowanie liniowe cen cieniowych wyjaśniono za pomocą przykładu zimowych płaszczy i czytelnych suwaków kwot produkcyjnych."),
    ],
  },
};
