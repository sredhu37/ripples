import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function AssemblyLineFlowDiagram({ lang, step }: DiagramProps) {
  const name = lang === "pl" ? "Alicja" : lang === "de" ? "Anna" : "Anjali";
  const label = lang === "pl" ? "Alicja i taśma montażowa: ciągły przepływ i standaryzacja części" : lang === "de" ? "Anna und das Fliessband: Kontinuierlicher Materialfluss und Standardisierung" : "Anjali and the moving assembly line: continuous flow and standardized parts";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#0284c7" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#0369a1" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#0ea5e9" stroke="#0284c7" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#bae6fd">{name}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#0284c7" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e0f2fe">
          🚗 {lang === "pl" ? "Produkcja Masowa" : lang === "de" ? "Die Fliessbandfertigung" : "Moving Assembly Line"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#0284c7" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="16">⚙️ ➡️ 🛞 ➡️ 🏎️</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#38bdf8">
            {lang === "pl" ? "Praca płynie do człowieka, nie człowiek do pracy" : lang === "de" ? "Die Arbeit kommt zum Menschen" : "Work flows to the worker"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#0369a1" />
          <text x="250" y="170" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Z 12 godzin do 93 minut na auto" : lang === "de" ? "Von 12 Stunden auf 93 Minuten pro Auto" : "From 12.5 hours to 93 minutes"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#e0f2fe">
            {lang === "pl" ? "Wysokie płace i tani produkt dla każdego" : lang === "de" ? "Hoehere Loehne und drastisch sinkende Preise" : "Lower prices paired with higher real wages"}
          </text>
        </g>
      )}
    </svg>
  );
}

function InterchangeablePartsDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Wymienne części: od rzemieślniczego dopasowywania do precyzyjnych tolerancji" : lang === "de" ? "Austauschbare Teile: Von individueller Feilarbeit zu Praezisionstoleranzen" : "Interchangeable parts: precision machining replacing hand filing";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="140" height="65" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="14">🔨 📐</text>
        <text x="110" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#991b1b">Custom Hand-Fitted</text>
        <text x="110" y="102" textAnchor="middle" fontSize="8" fill="#b91c1c">Unique part: cannot swap</text>

        <rect x="220" y="45" width="140" height="65" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="290" y="70" textAnchor="middle" fontSize="14">📏 🔩</text>
        <text x="290" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#166534">Interchangeable Parts</text>
        <text x="290" y="102" textAnchor="middle" fontSize="8" fill="#15803d">Identical micron tolerance</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#1e293b" />
          <text x="200" y="150" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4ade80">
            Standardization Eradicates Hand Assembly Bottlenecks
          </text>
          <text x="200" y="165" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl" ? "Żaden mechanik nie musiał już spiłowywać części; każdy moduł pasował od razu" : lang === "de" ? "Kein Feilen und Anpassen mehr: Jedes Teil greift exakt ineinander" : "Eliminated filing and bespoke adjusting, enabling instant sub-assembly"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#15803d" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Naprawy i wymiana podzespołów stały się tanie i natychmiastowe" : lang === "de" ? "Wartung und Ersatzteiltausch wurden schnell und guenstig" : "Repair and maintenance became rapid, affordable, and modular"}
          </text>
        </g>
      )}
    </svg>
  );
}

function FordModelTPriceCollapseDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Załamanie ceny Forda T: spadek z 850 do 260 dolarów" : lang === "de" ? "Preiseinbruch des Ford Modell T: Von 850 auf 260 Dollar" : "Ford Model T price collapse: from $850 down to $260";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <line x1="60" y1="60" x2="340" y2="120" stroke="#0284c7" strokeWidth="3" />
        <circle cx="60" cy="60" r="6" fill="#ef4444" />
        <text x="60" y="45" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b">1908: $850</text>
        <circle cx="340" cy="120" r="6" fill="#16a34a" />
        <text x="340" y="140" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803d">1925: $260</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="140" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#38bdf8">
            Economies of Scale in Action
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="8" fill="#e2e8f0">
            {lang === "pl" ? "Samochód przestał być luksusową zabawką bogaczy; stał się narzędziem pracy rodzin" : lang === "de" ? "Vom Luxusgut fuer Millionaere zum alltaeglichen Gebrauchsgegenstand" : "Transformed the automobile from a rich person's luxury to universal utility"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#0369a1" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Wyprodukowano ponad 15 milionów egzemplarzy Forda T" : lang === "de" ? "Ueber 15 Millionen Exemplare des Modells T veraenderten die Welt" : "Over 15 million Model T cars built, reshaping global transportation"}
          </text>
        </g>
      )}
    </svg>
  );
}

function FiveDollarDayWageDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Płaca 5 dolarów dziennie: tworzenie klasy średniej i rynku konsumenckiego" : lang === "de" ? "Der 5-Dollar-Tag: Entstehung der Mittelschicht und Kaufkraft" : "The 5-dollar day: creating purchasing power and the middle class";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fdf4ff" stroke="#a21caf" strokeWidth="2" />
      <g>
        <circle cx="100" cy="85" r="30" fill="#fae8ff" stroke="#a21caf" strokeWidth="2" />
        <text x="100" y="80" textAnchor="middle" fontSize="18">💰 ⏱️</text>
        <text x="100" y="100" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#701a75">$5 / 8hr Day</text>

        <rect x="230" y="60" width="130" height="55" rx="6" fill="#701a75" />
        <text x="295" y="83" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">Worker-Consumers</text>
        <text x="295" y="100" textAnchor="middle" fontSize="8" fill="#f5d0fe">Can buy their own cars</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f472b6">
            Doubling Wages Slashed Costly Employee Turnover
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl" ? "Rotacja pracowników spadła z 370% rocznie do ułamka; fabryka działała bez przestojów" : lang === "de" ? "Personalfluktuation sank dramatisch; loyale Arbeiter steigerten Qualitaet" : "Slashed 370% annual worker turnover, creating stable factory discipline"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#86198f" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Robotnicy fabryczni stali się zamożną klasą średnią" : lang === "de" ? "Arbeiter wurden Teil einer wohlhabenden, kaufkraeftigen Mittelschicht" : "Industrial workers evolved into an empowered, consuming middle class"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ModernLeanJustInTimeDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Współczesna produkcja: szczupłe wytwarzanie i Toyota Production System" : lang === "de" ? "Moderne Fertigung: Lean Management und Toyota-Produktionssystem" : "Modern manufacturing: lean systems and Toyota production methods";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
      <g>
        <circle cx="200" cy="80" r="34" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">⚡ 📦</text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#065f46">Lean & Just-in-Time</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#065f46" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Continuous Improvement (Kaizen) and Zero Waste
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#a7f3d0">
            {lang === "pl" ? "Każdy pracownik ma prawo zatrzymać linię, jeśli zauważy wadę jakościową" : lang === "de" ? "Jeder Mitarbeiter darf das Band stoppen, um Fehler sofort abzustellen" : "Every operator has the authority to halt the line to resolve root defects"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Produkcja masowa stała się elastyczna, cyfrowa i ultraprecyzyjna" : lang === "de" ? "Massenfertigung wurde flexibel, hochpraezise und kundenorientiert" : "Mass production evolved into flexible, high-precision, digital supply webs"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [speedSetting, setSpeedSetting] = useState(1);
  const minutesPerCar = Math.round(750 / (speedSetting * 1.5));
  const isHighSpeedLine = speedSetting >= 5;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Assembly Line Optimization: Level {speedSetting}/5 | Assembly Time: {minutesPerCar} Minutes
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            const next = Math.min(5, speedSetting + 1);
            setSpeedSetting(next);
            if (next >= 5) onDone?.();
          }}
        >
          Accelerate Moving Line & Synchronize Feed
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setSpeedSetting(1)}
        >
          Reset to Stationary Workshop (12.5 hrs)
        </button>
      </div>
      <div style={{ padding: "12px", background: isHighSpeedLine ? "#eef8ef" : "#f0f9ff", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {isHighSpeedLine
          ? "Highland Park Line Perfected: Chassis assembly time collapsed to 93 minutes! Retail car prices fall to $260, enabling millions of working families to own modern transportation."
          : "Stationary Craft Assembly: Mechanics walk around individual chassis carrying tools, taking 12.5 hours per vehicle."}
      </div>
    </div>
  );
}

function MassProductionWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What was the transformative economic principle behind Henry Ford's introduction of the moving assembly line in 1913?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Cars were made out of solid chocolate so they could be eaten if they broke down</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Standardized interchangeable parts and bringing the work continuously to the worker reduced chassis build time from 12.5 hours to 93 minutes, collapsing retail costs while doubling worker wages</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Automobiles were outlawed in favor of wooden unicycles</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "massproduction",
  story: [
    animatedBeat(
      [
        T("Meet Anjali. She watches a modern automated conveyor system glide smoothly across a manufacturing plant floor.", "Das ist Anna. Sie beobachtet, wie ein modernes Montageband lautlos und praezise durch die Fabrikhalle gleitet.", "Poznaj Anjali. Obserwuje, jak nowoczesna taśma montażowa przesuwa się płynnie i bezgłośnie przez halę fabryczną."),
        T("Before the twentieth century, assembling complex machinery like an automobile was slow, artisanal, and prohibitively expensive.", "Vor dem zwanzigsten Jahrhundert war der Bau komplexer Maschinen wie Autos eine langsame und unbezahlbare Handarbeit.", "Przed dwudziestym wiekiem budowa skomplikowanych maszyn, takich jak samochody, była powolna, rzemieślnicza i zaporowo droga."),
        T("A team of master craftsmen walked around a stationary wooden buck, hand-filing individual brass fittings and bolts until each piece fit.", "Meister gingen um ein stehendes Fahrgestell herum und feilten jedes einzelne Metallteil per Hand zurecht.", "Zespół rzemieślników krążył wokół nieruchomego podwozia, mozolnie spiłowując każdą śrubę i tuleję pilnikiem."),
      ],
      AssemblyLineFlowDiagram,
    ),
    animatedBeat(
      [
        T("The fundamental prerequisite of mass production was interchangeable parts, pioneered by early firearms armories.", "Die unverzichtbare Voraussetzung fuer die Massenfertigung waren voellig identische, austauschbare Bauteile.", "Fundamentem produkcji masowej stały się wymienne części, rozwinięte pierwotnie w zbrojowniach wojskowych."),
        T("By enforcing rigorous engineering tolerances down to thousandths of an inch, every component became completely identical.", "Dank strengster Fertigungstoleranzen im Mikrometerbereich passte jedes Bauteil auf Anhieb in jede Baugruppe.", "Dzięki rygorystycznym tolerancjom inżynieryjnym mierzonym w tysięcznych częściach cala każdy podzespół stał się w pełni identyczny."),
        T("Workers no longer needed years of apprenticeship to file parts; components slotted together instantly and reliably on the line.", "Arbeiter mussten Bauteile nicht mehr muehsam anpassen; jedes Stueck griff sofort und fehlerfrei ineinander.", "Robotnicy nie musieli już latami uczyć się rzemiosła, by dopasowywać elementy; części łączyły się ze sobą natychmiast i bezbłędnie."),
      ],
      InterchangeablePartsDiagram,
    ),
    animatedBeat(
      [
        T("In 1913, at the Highland Park plant in Michigan, Henry Ford installed the world's first moving automobile assembly line.", "1913 installierte Henry Ford im Werk Highland Park das weltweit erste bewegliche Fliessband fuer Autos.", "W 1913 roku w fabryce Highland Park w Michigan Henry Ford uruchomił pierwszą na świecie ruchomą taśmę montażową samochodów."),
        T("Instead of workers walking across the factory to fetch parts, gravity slides and motorized conveyor chains brought the car chassis directly to them.", "Statt weite Wege zu laufen, brachte eine motorisierte Foerderkette das Fahrgestell direkt zum Arbeitsplatz jedes Mitarbeiters.", "Zamiast zmuszać robotników do chodzenia po narzędzia, mechaniczna taśma transportowa dostarczała podwozie wprost przed ich ręce."),
        T("The time required to assemble a Model T chassis plummeted from twelve and a half hours down to ninety-three minutes.", "Die Montagezeit fuer ein Modell-T-Fahrgestell stuerzte von zwoelfeinhalb Stunden auf atemberaubende 93 Minuten ab.", "Czas potrzebny do złożenia ramy Forda T skurczył się z dwunastu i pół godziny do zaledwie dziewięćdziesięciu trzech minut."),
      ],
      FordModelTPriceCollapseDiagram,
    ),
    animatedBeat(
      [
        T("In January 1914, Ford shocked corporate executives worldwide by introducing the five-dollar, eight-hour workday.", "Im Januar 1914 schockierte Ford die Wirtschaftswelt mit der Einfuehrung des Fuenf-Dollar-Tages bei acht Stunden Arbeit.", "W styczniu 1914 roku Ford zszokował świat biznesu, wprowadzając stawkę pięciu dolarów za ośmiogodzinny dzień pracy."),
        T("This more than doubled typical factory wages while cutting daily hours from nine to eight, instantly eliminating crippling labor turnover.", "Er verdoppelte die ueblichen Loehne, senkte die Arbeitszeit und stoppte die teure Personalfluktuation im Handumdrehen.", "Było to ponad dwukrotne podniesienie ówczesnych stawek przy skróceniu dnia pracy z dziewięciu do ośmiu godzin, co zlikwidowało rotację załogi."),
        T("Crucially, Ford recognized that high-productivity factory workers had to earn enough money to become consumers of their own products.", "Vor allem erkannte Ford: Produktive Fabrikarbeiter muessen genug verdienen, um ihre eigenen Produkte auch kaufen zu koennen.", "Co najważniejsze, Ford zrozumiał, że wydajni robotnicy muszą zarabiać na tyle dobrze, by móc sami kupować produkowane przez siebie towary."),
      ],
      FiveDollarDayWageDiagram,
    ),
    animatedBeat(
      [
        T("Mass production evolved into the sophisticated Lean Manufacturing and Just-In-Time systems pioneered by Toyota.", "Aus der Massenfertigung entstanden spaeter hochflexible Lean-Systeme wie das Toyota-Produktionssystem.", "Z klasycznej linii montażowej wyrosły z czasem zaawansowane systemy Lean i Just-In-Time rozwinięte przez Toyotę."),
        T("Rather than piling up warehouses full of unsold inventory, modern factories pull supplies in real time to match exact customer demand.", "Statt teure Lagerhallen vollzustellen, produzieren moderne Fabriken praezise im Takt der tatsaechlichen Kundennachfrage.", "Zamiast gromadzić gigantyczne zapasy w magazynach, nowoczesne zakłady zamawiają podzespoły dokładnie na czas, odpowiadając na zamówienia."),
        T("Mass production dismantled the scarcity of goods, transforming household appliances, electronics, and medicine into everyday abundance.", "Die Massenfertigung besiegte den Mangel und machte Geraete, Elektronik und Medizin fuer Milliarden Menschen zugaenglich.", "Produkcja masowa przezwyciężyła odwieczny niedobór dóbr, czyniąc sprzęt domowy, elektronikę i lekarstwa powszechnie dostępnymi."),
      ],
      ModernLeanJustInTimeDiagram,
    ),
  ],
  toyIntro: T(
    "Operate the Highland Park conveyor: accelerate line speed and synchronize component delivery to collapse vehicle assembly time to 93 minutes.",
    "Bediene das Fliessband von Highland Park: Optimiere den Takt und senke die Montagezeit eines Autos auf 93 Minuten.",
    "Zarządzaj taśmą w Highland Park: przyspieszaj takt i synchronizuj dostawy części, by skrócić montaż auta do 93 minut."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why was the moving assembly line capable of reducing automobile assembly time from over 12 hours to 93 minutes?",
        "Warum konnte das bewegliche Fliessband die Montagezeit eines Autos von ueber 12 Stunden auf 93 Minuten senken?",
        "Dlaczego ruchoma taśma montażowa zdołała skrócić czas montażu samochodu z ponad 12 godzin do 93 minut?",
      ),
      options: [
        { text: T("Because bringing the work directly to stationary workers performing specialized repetitive tasks eliminated thousands of hours of wasted walking and fetching", "Weil der kontinuierliche Transport zum spezialisierten Arbeiter unzaehlige Stunden unproduktiver Laufwege einsparte", "Ponieważ dostarczenie pracy bezpośrednio do wyspecjalizowanych robotników wyeliminowało tysiące godzin marnowanych na chodzenie i szukanie części"), correct: true },
        { text: T("Because Henry Ford hired magical cheetahs to run along the factory rafters", "Weil Henry Ford schnelle Geparden einstellte, die ueber das Fabrikdach rannten", "Ponieważ Henry Ford zatrudnił oswojone gepardy biegające po belkach pod sufitem"), correct: false },
        { text: T("Because the cars were made out of compressed papier-mâché that dried instantly in the sun", "Weil die Autos aus Pappmache bestanden, das in fuenf Minuten in der Sonne trocknete", "Ponieważ auta budowano ze sprasowanego papieru schnącego błyskawicznie na słońcu"), correct: false },
      ],
      hint: T(
        "Think about what happens when work flows to the person instead of the person chasing parts.",
        "Achte darauf, wie vermiedene Laufwege die effektive Arbeitszeit pro Minute maximieren.",
        "Zwróć uwagę na oszczędność czasu, gdy to element przesuwa się przed ręce pracownika."),
    },
    {
      kind: "choice",
      prompt: T(
        "What was the economic insight behind Henry Ford's famous 1914 decision to pay factory workers $5 per day?",
        "Welche oekonomische Erkenntnis steckte hinter Fords beruehmter 5-Dollar-Tageslohn-Entscheidung von 1914?",
        "Jaka idea ekonomiczna stała za słynną decyzją Henry'ego Forda o podniesieniu dniówki do 5 dolarów w 1914 roku?",
      ),
      options: [
        { text: T("Doubling wages stopped crippling employee turnover and transformed blue-collar industrial workers into affluent consumers capable of buying Model T cars", "Die Verdopplung der Loehne beendete die teure Fluktuation und machte Arbeiter zu kaufkraeftigen Kunden fuer das Modell T", "Podwojenie pensji powstrzymało paraliżującą rotację pracowników i przekształciło robotników w klientów mogących kupić produkowane przez siebie auta"), correct: true },
        { text: T("The United States government forced Ford to pay in chocolate gold coins", "Die US-Regierung zwang Ford, seine Loehne in Schokoladentalern auszuzahlen", "Rząd Stanów Zjednoczonych nakazał wypłacanie pensji w czekoladowych monetach"), correct: false },
        { text: T("Ford wanted all his workers to immediately retire and move to Hawaii", "Ford wollte, dass alle Mitarbeiter sofort kuendigen und nach Hawaii auswandern", "Ford chciał, aby wszyscy pracownicy natychmiast odeszli na emeryturę i wyjechali na Hawaje"), correct: false },
      ],
      hint: T(
        "Think about worker retention, productivity, and consumer demand in a mass market.",
        "Denke an Mitarbeiterbindung, Produktivitaet und Kaufkraft fuer Massenprodukte.",
        "Pomyśl o lojalności załogi, wydajności i sile nabywczej na rynku masowym."),
    },
    {
      kind: "widget",
      prompt: T(
        "Examine the core manufacturing breakthroughs that enabled the collapse of the Model T price from $850 down to $260.",
        "Untersuche die fertigungstechnischen Meilensteine, die den Preis des Modells T von 850 auf 260 Dollar senkten.",
        "Zbadaj przełomowe innowacje technologiczne, które umożliwiły spadek ceny Forda T z 850 do 260 dolarów.",
      ),
      Widget: MassProductionWidget,
      hint: T(
        "Focus on standardized parts, conveyor lines, scale economies, and wages.",
        "Achte auf austauschbare Teile, Fliessbaender, Skaleneffekte und Loehne.",
        "Skup się na wymiennych częściach, taśmie montażowej, korzyściach skali i zarobkach."),
    },
  ],
  askDad: T(
    "Ask your parent: What is a product in your home that would have cost a fortune before mass production?",
    "Frage deine Eltern: Welcher Gegenstand bei uns zu Hause waere ohne industrielle Massenfertigung unbezahlbar teuer?",
    "Zapytaj rodziców: Jaki przedmiot codziennego użytku w Waszym domu byłby bez produkcji masowej luksusem dla najbogatszych?"),
  realLife: {
    title: T(
      "Real world: Henry Ford's Highland Park Assembly Plant (1913)",
      "Echte Welt: Henry Fords Montagehalle in Highland Park (1913)",
      "Prawdziwy świat: Zakłady montażowe Henry'ego Forda w Highland Park (1913)",
    ),
    body: T(
      "On December 1, 1913, Henry Ford and his lead engineers, Charles Sorensen and Clarence Avery, tested an endless rope tow conveyor on the chassis line at Highland Park, Michigan. Within a few months, the moving assembly line slashed the labor hours required to assemble a car by nearly 88%. By 1927, Ford had produced more than 15 million Model Ts, fundamentally transforming city geography, road networks, and global consumer society.",
      "Am 1. Dezember 1913 testete Henry Ford mit seinen Ingenieuren das erste durchgehende Seilzug-Fliessband in Highland Park, Michigan. Binnen weniger Monate sank der Arbeitsaufwand fuer ein Auto um fast 88%. Bis 1927 baute Ford ueber 15 Millionen Exemplare des Modells T und praegte damit Staedtebau, Strassennetze und die globale Konsumgesellschaft.",
      "1 grudnia 1913 roku Henry Ford wraz ze swoimi głównymi inżynierami przetestował ruchomą taśmę montażową w zakładach Highland Park w Michigan. W ciągu kilku miesięcy czas montażu auta spadł o blisko 88%. Do 1927 roku z taśm zjechało ponad 15 milionów egzemplarzy Forda T, na zawsze przekształcając układ miast, infrastrukturę drogową i nowoczesne społeczeństwo konsumpcyjne."),
  },
  factCard: {
    claims: [
      { text: T("Henry Ford introduced the moving assembly line for Model T chassis production at Highland Park on December 1, 1913.", "Henry Ford startete das bewegliche Fliessband fuer das Modell T am 1. Dezember 1913 in Highland Park.", "Henry Ford uruchomił ruchomą taśmę montażową podwozi Forda T 1 grudnia 1913 r. w zakładach Highland Park."), source: "https://www.thehenryford.org/explore/stories-of-innovation/press-room/moving-assembly-line-press-kit/" },
      { text: T("On January 5, 1914, Ford announced the $5 per day wage for an eight-hour shift, doubling prevailing factory wages.", "Am 5. Januar 1914 kuendigte Ford den 5-Dollar-Tag fuer acht Stunden Schichtarbeit an.", "5 stycznia 1914 r. Ford ogłosił stawkę 5 dolarów za 8-godzinny dzień pracy, podwajając dotychczasowe zarobki."), source: "https://www.thehenryford.org/explore/stories-of-innovation/press-room/five-dollar-day-press-kit/" },
      { text: T("The retail price of the Ford Model T touring car fell from $850 in 1908 down to $260 in 1925 due to manufacturing economies of scale.", "Der Verkaufspreis des Modells T sank durch Skaleneffekte von 850 Dollar im Jahr 1908 auf 260 Dollar im Jahr 1925.", "Cena Forda T spadła dzięki korzyściom skali z 850 dolarów w 1908 r. do 260 dolarów w 1925 r."), source: "https://www.britannica.com/technology/Model-T" },
      { text: T("Taiichi Ohno developed the Toyota Production System (TPS) and Just-in-Time concepts at Toyota Motor Corporation between 1948 and 1975.", "Taiichi Ohno entwickelte zwischen 1948 und 1975 das Toyota-Produktionssystem und die Just-in-Time-Philosophie.", "Taiichi Ohno stworzył system produkcyjny Toyoty (TPS) i metodologię Just-in-Time w latach 1948-1975."), source: "https://global.toyota/en/company/vision-philosophy/production-system/" },
      { text: T("By the conclusion of Model T production on May 26, 1927, Ford had manufactured 15,007,033 vehicles.", "Bis zum Produktionsende am 26. Mai 1927 stellte Ford exakt 15.007.033 Fahrzeuge des Modells T her.", "Do zakończenia produkcji 26 maja 1927 r. Ford wyprodukował dokładnie 15 007 033 sztuki modelu T."), source: "https://www.history.com/this-day-in-history/ford-manufactures-its-15-millionth-model-t" },
    ],
    simplified: [
      T(
        "Complex queuing theory equations, conveyor belt cycle times, and dynamic marginal cost curves are translated into hands-on assembly line simulations and straightforward economic principles.",
        "Komplexe Warteschlangentheorien und Grenzkostenkurven wurden in interaktive Montageband-Simulationen und klare oekonomische Grundregeln uebersetzt.",
        "Złożone modele teorii kolejek i krzywe kosztów krańcowych przedstawiono w formie przystępnych symulatorów taśmy montażowej i zrozumiałych praw ekonomicznych."),
    ],
  },
};
