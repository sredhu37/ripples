import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function GoldVaultLaunchDiagram({ lang, step }: DiagramProps) {
  const anjaliName = lang === "pl" ? "Alicja" : lang === "de" ? "Anna" : "Anjali";
  const label = lang === "pl" ? "Alicja bada skarbiec banku centralnego ze złotem" : lang === "de" ? "Anna besichtigt den Goldtresor der Zentralbank" : "Anjali inspecting central bank gold bullion vault";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#eab308" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#eab308" strokeWidth="2" />
        <path d="M 52 110 C 52 70 108 70 108 110" fill="#1e1b4b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#ca8a04" stroke="#eab308" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fde047">{anjaliName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#fef08a">
          🪙 {lang === "pl" ? "Sztaba Złota: Próba 999.9" : lang === "de" ? "Goldbarren: 99,99% Reinheit" : "Good Delivery Gold Bar 99.99%"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">🏛️ 🔐 ⏳</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#fde047">
            {lang === "pl" ? "5000 lat historii: nie rdzewieje, nie niszczeje" : lang === "de" ? "5.000 Jahre Werterhalt: rostet und zerfaellt nie" : "5,000 years: never corrodes or decays"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#854d0e" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Zasób o absolutnej rzadkości fizycznej" : lang === "de" ? "Absolute natuerliche Knappheit" : "Strict Physical Scarcity"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#fef9c3">
            {lang === "pl" ? "Niemożliwe do dodrukowania dekretem rządu" : lang === "de" ? "Kann von keinem Staat gedruckt werden" : "Cannot be printed by government decree"}
          </text>
        </g>
      )}
    </svg>
  );
}

function PurchasingPowerDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Złoto a siła nabywcza w starożytnym Rzymie i dziś" : lang === "de" ? "Gold und Kaufkraft: Vom antiken Rom bis heute" : "Gold purchasing power from ancient Rome to modern era";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="35" y="40" width="155" height="135" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
        <text x="112" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#854d0e">
          {lang === "pl" ? "Rzym 2000 lat temu" : lang === "de" ? "Rom vor 2.000 Jahren" : "Ancient Rome (1 oz gold)"}
        </text>
        <text x="112" y="95" textAnchor="middle" fontSize="22">🏛️ 🏺 🥋</text>
        <text x="112" y="120" textAnchor="middle" fontSize="10" fill="#713f12">
          {lang === "pl" ? "Kupowało wełnianą togę i pas" : lang === "de" ? "Kaufte Toga, Guertel & Sandalen" : "Bought fine woolen toga & belt"}
        </text>
        <rect x="45" y="135" width="135" height="30" rx="4" fill="#fef08a" />
        <text x="112" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#854d0e">
          1 uncja = Garnitur VIP
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="210" y="40" width="155" height="135" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="287" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
            {lang === "pl" ? "Dzisiaj (2026 rok)" : lang === "de" ? "Heute (Jahr 2026)" : "Modern Era (1 oz gold)"}
          </text>
          <text x="287" y="95" textAnchor="middle" fontSize="22">👔 👞 💼</text>
          <text x="287" y="120" textAnchor="middle" fontSize="10" fill="#047857">
            {lang === "pl" ? "Kupuje wysokiej klasy garnitur" : lang === "de" ? "Kauft massgeschneiderten Anzug" : "Buys bespoke tailored suit"}
          </text>
          <rect x="220" y="135" width="135" height="30" rx="4" fill="#a7f3d0" />
          <text x="287" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#065f46">
            1 uncja ≈ 2,500 $ / €
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="35" y="195" width="330" height="25" rx="4" fill="#334155" />
          <text x="200" y="212" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Waluty papierowe tracą wartość, ale złoto chroni realną siłę nabywczą przez stulecia" : lang === "de" ? "Papierwaehrungen schmelzen ab, doch Gold bewahrt reale Kaufkraft ueber Jahrhunderte" : "Paper fiat currencies devalue while gold preserves real purchasing power across centuries"}
          </text>
        </g>
      )}
    </svg>
  );
}

function StockToFlowDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Wskaźnik stock-to-flow i coroczny przyrost złota" : lang === "de" ? "Stock-to-Flow-Verhaeltnis: Hoher Bestand, kleine Foerderung" : "Stock-to-flow ratio and low annual inflation rate of gold";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fffbeb" stroke="#ca8a04" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="180" height="90" rx="8" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
        <text x="130" y="75" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#713f12">Stock (Zasób naziemny)</text>
        <text x="130" y="98" textAnchor="middle" fontSize="12" fill="#854d0e">~210,000 Ton Złota</text>
        <text x="130" y="120" textAnchor="middle" fontSize="10" fill="#a16207">Wydobyte w całej historii ludzkości</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="240" y="45" width="120" height="90" rx="8" fill="#fef9c3" stroke="#eab308" strokeWidth="1.5" />
          <text x="300" y="75" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#854d0e">Flow (Wydobycie)</text>
          <text x="300" y="98" textAnchor="middle" fontSize="12" fill="#a16207">~3,500 T/rok</text>
          <text x="300" y="120" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#15803d">+1.6% rocznie</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="155" width="320" height="50" rx="8" fill="#713f12" />
          <text x="200" y="178" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#fef08a">
            {lang === "pl" ? "Wskaźnik Stock-to-Flow ~60 lat: Niewykonalne zalanie rynku nową podażą" : lang === "de" ? "Stock-to-Flow ~60 Jahre: Es dauert 60 Jahre Foerderung, den Bestand zu doppeln" : "Stock-to-Flow ratio ~60 years: immune to sudden supply flooding"}
          </text>
          <text x="200" y="196" textAnchor="middle" fontSize="9.5" fill="#fde68a">
            {lang === "pl" ? "Najwyższy wskaźnik rzadkości ze wszystkich metali na świecie" : lang === "de" ? "Hoechste Knappheitsgarantie aller physischen Metalle" : "Highest monetary scarcity ratio of any physical element"}
          </text>
        </g>
      )}
    </svg>
  );
}

function GoldVsProductiveAssetsDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Złoto jako magazyn wartości a aktywa produktywne" : lang === "de" ? "Gold als Wertspeicher im Vergleich zu produktiven Vermoegenswerten" : "Gold as store of value vs productive cash-flowing assets";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <rect x="35" y="45" width="150" height="85" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#854d0e">Gold Bullion</text>
      <text x="110" y="90" textAnchor="middle" fontSize="14">🛡️ 🪙</text>
      <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#713f12">0% Dividend / 0% Interest</text>
      <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#a16207">Pure defense & insurance</text>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="150" height="85" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Productive Businesses</text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">🏭 📈</text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">Reinvests profits & grows</text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#2563eb">Compounding engine</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#1e293b" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Złoto to polisa ubezpieczeniowa, akcje to silnik budowy majątku" : lang === "de" ? "Gold ist eine Versicherungspolice, Unternehmen schaffen neuen Wohlstand" : "Gold protects against collapse; businesses compound real wealth"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl" ? "Sztaba złota po 50 latach nadal jest sztabą złota bez kuponu" : lang === "de" ? "Ein Goldbarren zahlt keine Zinsen, schuetzt aber vorwaerts vor Waehrungskrisen" : "A gold bar produces no output, but cannot go bankrupt or hyperinflate"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CentralBankReservesDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Rezerwy złota w bankach centralnych (NBP, Bundesbank)" : lang === "de" ? "Goldreserven der Zentralbanken als ultimer Anker" : "Central bank gold reserves as sovereign safety anchor";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <circle cx="200" cy="95" r="42" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="200" y="90" textAnchor="middle" fontSize="22">🏛️ ⚖️</text>
      <text x="200" y="112" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#5b21b6">Sovereign Vault</text>
      <g>
        <circle cx="85" cy="70" r="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="85" y="68" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">NBP</text>
        <text x="85" y="84" textAnchor="middle" fontSize="8.5" fill="#2563eb">400+ T</text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="315" cy="70" r="28" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="315" y="68" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">Buba</text>
          <text x="315" y="84" textAnchor="middle" fontSize="8.5" fill="#b45309">3,300+ T</text>
          <circle cx="200" cy="165" r="26" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="200" y="163" textAnchor="middle" fontSize="14">🌐</text>
          <text x="200" y="179" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#15803d">No Counterparty</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Złoto to jedyne aktywo rezerwowe wolne od ryzyka niewypłacalności emitenta" : lang === "de" ? "Gold ist die einzige Reserve ohne Ausfallrisiko einer Drittpartei" : "Gold carries zero counterparty risk: it is nobody else's liability"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [inflationRounds, setInflationRounds] = useState(0);
  const paperCash = Math.max(10, Math.round(100 * Math.pow(0.5, inflationRounds)));
  const goldPurchasingPower = 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Decades Elapsed: {inflationRounds * 10} yrs | Paper Cash Value: ${paperCash} | 1 oz Gold Value: ${goldPurchasingPower}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setInflationRounds((r) => {
              const next = r + 1;
              if (next >= 3) onDone?.();
              return next;
            });
          }}
        >
          Simulate 10 Years of Inflation (+Debasement)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setInflationRounds(0)}
        >
          Reset Time
        </button>
      </div>
      <div style={{ padding: "12px", background: inflationRounds > 0 ? "#fef9c3" : "#f1f5f9", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {inflationRounds === 0
          ? "Start: $100 paper cash and $100 worth of gold buy the exact same grocery basket."
          : `After ${inflationRounds * 10} years: Paper cash purchasing power dropped to $${paperCash}, while gold still buys the exact full basket!`}
      </div>
    </div>
  );
}

function GoldWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Why has gold functioned as a premier store of value across human history?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>It produces annual cash dividends paid into your bank account</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>It is physically scarce, chemically indestructible, and impossible to arbitrarily inflate</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Every government guarantees to buy it for exactly one million dollars</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "gold",
  story: [
    animatedBeat(
      [
        T("Meet Anjali. She visits a high-security vault deep beneath a European central bank where thousands of shimmering gold bars line the shelves.", "Das ist Anna. Sie besucht den Hochsicherheitstresor einer Zentralbank, in dem tausende schwere Goldbarren lagern.", "Poznaj Alicję. Odwiedza skarbiec banku centralnego, w którym na pancernych regałach spoczywają tysiące lśniących sztab złota."),
        T("Each standard forty-ounce ingot bears an official refinery stamp certifying 99.99% pure elemental gold.", "Jeder Barren traegt den offiziellen Praegestempel einer zertifizierten Scheideanstalt fuer 99,99% reines Feingold.", "Każda standardowa sztaba waży około dwunastu kilogramów i ma wybity znak menniczy potwierdzający czystość kruszcu 999.9."),
        T("For over five thousand years, civilizations from Babylon to modern Frankfurt have revered gold as the bedrock of monetary confidence.", "Seit mehr als 5.000 Jahren schaetzen Kulturen von Babylon bis zur Moderne Gold als festes Fundament fuer Vertrauen.", "Od ponad pięciu tysięcy lat, od starożytnego Babilonu po współczesny Frankfurt, ludzkość uważa złoto za fundament zaufania finansowego."),
      ],
      GoldVaultLaunchDiagram,
    ),
    animatedBeat(
      [
        T("Gold unique superpower is its ability to preserve *real purchasing power* across centuries of monetary devaluation.", "Golds besondere Staerke liegt darin, die *reale Kaufkraft* ueber Generationen und Waehrungskrisen hinweg zu bewahren.", "Niezwykłą cechą złota jest zdolność do ochrony *realnej siły nabywczej* przez stulecia dewaluacji pieniądza."),
        T("Two thousand years ago in ancient Rome, an ounce of gold purchased a fine hand-spun woolen toga, leather sandals, and an artisan belt.", "Vor 2.000 Jahren kaufte man im antiken Rom fuer eine Unze Gold eine edle Wolltoga, Ledersandalen und einen Guertel.", "Dwa tysiące lat temu w starożytnym Rzymie jedna uncja złota pozwalała kupić wełnianą togę, skórzane sandały i ozdobny pas."),
        T("Today in 2026, that exact same single ounce of gold still buys a premium bespoke Italian wool suit and handmade leather shoes.", "Heute im Jahr 2026 kauft exakt dieselbe Unze Gold weiterhin einen massgeschneiderten italienischen Wollanzug und Lederschuhe.", "Dziś, w 2026 roku, ta sama jedna uncja złota wciąż pozwala nabyć wysokiej klasy garnitur szyty na miarę oraz eleganckie skórzane buty."),
      ],
      PurchasingPowerDiagram,
    ),
    animatedBeat(
      [
        T("Gold price stability rests on its exceptionally high *stock-to-flow ratio*.", "Die Preisstabilitaet von Gold beruht auf seinem extrem hohen Verhaeltnis von Bestand zu Neubeschaffung (*Stock-to-Flow*).", "Stabilność wartości złota wynika z wyjątkowo wysokiego wskaźnika zasobu do rocznego przyrostu (*stock-to-flow*)."),
        T("Around two hundred ten thousand tons of gold have been mined in all human history, while miners extract only about 1.6% new supply per year.", "Weltweit existieren rund 210.000 Tonnen gehoertes Gold, waehrend Minen den Bestand jaehrlich um nur etwa 1,6% erweitern.", "W całej historii ludzkości wydobyto około 210 tysięcy ton złota, a kopalnie zwiększają ten zasób zaledwie o 1,6% rocznie."),
        T("Because new annual production is a tiny drop in a deep ocean, sudden technological breakthroughs cannot trigger runaway supply inflation.", "Weil die Jaehrliche Foerderung so klein im Vergleich zum Gesamtbestand ist, kann kein Ploetzliches Ueberangebot den Wert vernichten.", "Ponieważ roczne wydobycie to zaledwie kropla w morzu istniejących zasobów, złoto jest odporne na nagłe zalanie rynku nową podażą."),
      ],
      StockToFlowDiagram,
    ),
    animatedBeat(
      [
        T("Yet gold has a fundamental limitation: it is an inert element that pays zero dividends and zero interest.", "Dennoch hat Gold eine klare Grenze: Es ist ein stummes Metall, das weder Zinsen noch Dividenden erwirtschaftet.", "Złoto ma jednak istotne ograniczenie: to bezwładny metal, który nie wypłaca dywidend ani odsetek."),
        T("A bar of bullion locked in a vault will never innovate, hire engineers, build software, or generate operating profits.", "Ein Barren im Safe erfindet keine Software, stellt keine Mitarbeiter ein und erzielt keinen operativen Gewinn.", "Sztaba złota zamknięta w sejfie nie stworzy oprogramowania, nie zatrudni inżynierów ani nie wypracuje zysku operacyjnego."),
        T("Gold functions as monetary disaster insurance, whereas productive businesses compound human wealth over generations.", "Gold dient als Schutzschild gegen Waehrungsverfall, waehrend produktive Unternehmen Wohlstand durch Wachstum vermehren.", "Złoto jest polisą ubezpieczeniową chroniącą majątek przed katastrofą walutową, podczas gdy rozwijające się firmy pomnażają kapitał."),
      ],
      GoldVsProductiveAssetsDiagram,
    ),
    animatedBeat(
      [
        T("Modern central banks from Warsaw to Frankfurt continue purchasing hundreds of tons of gold bullion each year.", "Moderne Zentralbanken von Warschau bis Frankfurt kaufen weiterhin jaehrlich hunderte Tonnen physisches Gold.", "Nowoczesne banki centralne od Warszawy po Frankfurt kupują rocznie setki ton fizycznego złota."),
        T("They hold gold because it represents the ultimate reserve: a real coin in hand with no promises to break.", "Sie schaetzen Gold als letzte Reserve: ein physischer Sachwert, der von keiner fremden Regierung fuer ungueltig erklaert werden kann.", "Gromadzą kruszec jako rezerwę strategiczną: prawdziwe złoto w dłoni, które nie zależy od cudzych obietnic."),
        T("Understanding gold teaches you the critical difference between decaying paper promissory notes and enduring physical scarcity.", "Wer Gold versteht, begreift den Unterschied zwischen schwindenden Papierversprechen und bestaendiger Knappheit.", "Zrozumienie fenomenu złota uczy odróżniać ulotne papierowe obietnice rządowe od trwałej, niezmiennej rzadkości fizycznej."),
      ],
      CentralBankReservesDiagram,
    ),
  ],
  toyIntro: T(
    "Fast forward through decades of paper fiat currency debasement and compare cash purchasing power against physical gold.",
    "Reise durch Jahrzehnte schleichender Geldentwertung und vergleiche Papiergeld mit der bestaendigen Kaufkraft von Gold.",
    "Zobacz wpływ inflacji na przestrzeni kolejnych dekad i porównaj siłę nabywczą papierowej gotówki z fizycznym złotem."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is physical gold said to have no risk of broken promises?",
        "Warum traegt physisches Gold kein Risiko gebrochener Versprechen?",
        "Dlaczego fizyczne złoto nie niesie ryzyka złamanych obietnic?",
      ),
      options: [
        { text: T("Its value lives in the metal itself, not in promises of a bank", "Sein Wert liegt im Metall selbst und haengt von keinem Schuldner ab", "Jego wartość tkwi w samym metalu, a nie w obietnicy banku"), correct: true },
        { text: T("You can legally exchange one gold coin for twenty airline tickets at any airport", "Man kann jede Goldmuenze an jedem Flughafen gesetzlich gegen Flugtickets eintauschen", "Każdą monetę można z mocy prawa wymienić na lotnisku na dwadzieścia biletów"), correct: false },
        { text: T("Gold bars dissolve automatically if not polished every month", "Goldbarren loesen sich auf, wenn sie nicht monatlich poliert werden", "Sztaby złota rozpuszczają się same, jeśli nie są czyszczone co miesiąc"), correct: false },
      ],
      hint: T(
        "A gold coin in your hand does not depend on anyone else staying solvent.",
        "Eine Goldmuenze in deiner Hand haengt von keiner Bank ab.",
        "Złota moneta w Twojej dłoni nie zależy od wypłacalności żadnego banku.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why does gold not compound like an equity share in a productive company?",
        "Warum vermehrt sich Gold Vermoegen nicht wie Anteile an einem wachsenden Unternehmen?",
        "Dlaczego złoto nie pomnaża kapitału tak jak akcje przedsiębiorstwa?",
      ),
      options: [
        { text: T("It is an inert metal that produces no profits, hires no talent, and pays no corporate dividends", "Es ist ein ruhendes Metall, das keine Gewinne erwirtschaftet, niemanden beschaeftigt und keine Dividenden Schuettet", "Jest bezwładnym metalem, który nie wytwarza zysków, nie zatrudnia pracowników i nie wypłaca dywidend"), correct: true },
        { text: T("Gold mines are strictly forbidden by United Nations maritime law", "Goldminen sind durch UN-Seerecht weltweit verboten", "Kopalnie złota są całkowicie zakazane przez prawo morskie ONZ"), correct: false },
        { text: T("Gold loses half its physical weight every ten years through radioactive decay", "Gold verliert alle zehn Jahre die Haelfte seines Gewichts durch Zerfall", "Złoto traci połowę swojej masy co dekadę na skutek rozpadu promieniotwórczego"), correct: false },
      ],
      hint: T(
        "Consider whether a gold bar locked in a safe generates cash flows or products over time.",
        "Denke darueber nach, ob ein Barren im Tresor von allein Produkte erzeugt oder Erloese generiert.",
        "Pomyśl, czy sztabka złota w sejfie wytwarza produkty albo przynosi comiesięczny dochód."),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the primary characteristic that makes gold an enduring global monetary asset.",
        "Bestimme die wesentliche Eigenschaft, die Gold zum dauerhaften Wertspeicher macht.",
        "Wskaż kluczową cechę, która czyni złoto trwałym nośnikiem wartości w historii cywilizacji.",
      ),
      Widget: GoldWidget,
      hint: T(
        "Look for chemical durability, physical rarity, and independence from government printing presses.",
        "Achte auf chemische Unzerstoerbarkeit, Seltenheit und Unabhaengigkeit von Notenpressen.",
        "Zwróć uwagę na niezniszczalność chemiczną, rzadkość w przyrodzie i niezależność od polityki banków centralnych."),
    },
  ],
  askDad: T(
    "Ask your parent: Have they ever considered holding gold as an insurance hedge against severe inflation or stock market crashes?",
    "Frage deine Eltern: Haben sie schon einmal darueber nachgedacht, Gold als Schutz vor Inflation oder Boersencrashs zu halten?",
    "Zapytaj rodziców: Czy brali kiedyś pod uwagę zakup złota jako ubezpieczenia na wypadek kryzysu walutowego lub krachu na giełdzie?"),
  realLife: {
    title: T(
      "Real world: Central bank bullion accumulation and the London Gold Fixing",
      "Echte Welt: Goldkaeufe der Zentralbanken und das Londoner Goldfixing",
      "Prawdziwy świat: Zakupy złota przez banki centralne i London Gold Fixing",
    ),
    body: T(
      "In recent years, central banks across Poland (NBP), Germany (Bundesbank), and emerging nations have bought hundreds of metric tons of gold to diversify foreign exchange reserves away from dollar and euro debt. The global spot price is benchmarked twice daily through the London Bullion Market Association (LBMA) electronic auction, balancing institutional buy and sell orders globally.",
      "In den letzten Jahren kauften Zentralbanken in Polen (NBP), Deutschland (Bundesbank) und Asien hunderte Tonnen Gold, um Reserven krisenfest aufzustellen. Der weltweite Referenzpreis wird zweimal taeglich bei der London Bullion Market Association (LBMA) in einem Auktionsverfahren festgesetzt.",
      "W ostatnich latach banki centralne w Polsce (NBP), Niemczech (Bundesbank) i na rynkach wschodzących zakupiły setki ton złota, dywersyfikując rezerwy walutowe. Globalna cena rozliczeniowa jest ustalana dwa razy dziennie na aukcjach London Bullion Market Association (LBMA)."),
  },
  factCard: {
    claims: [
      { text: T("The World Gold Council estimates total historical above-ground gold stocks at approximately 212,582 metric tonnes as of 2024.", "Der World Gold Council schaetzt den historischen Gesamtbestand an gefoerdertem Gold auf rund 212.582 Tonnen (Stand 2024).", "World Gold Council szacuje łączną ilość wydobytego w historii złota na około 212 582 tony metryczne (stan na 2024 rok)."), source: "https://www.gold.org/goldhub/data/how-much-gold" },
      { text: T("The London Bullion Market Association (LBMA) Good Delivery Rules define standard 400 troy ounce gold wholesale bars with a minimum purity of 99.5%.", "Die LBMA-Good-Delivery-Standards schreiben fuer Grosshandelsbarren ein Mindestgewicht von 400 Feinunzen und 99,5% Reinheit vor.", "Standardy LBMA Good Delivery określają hurtowe sztaby złota o wadze około 400 uncji trojańskich i minimalnej próbie 995."), source: "https://www.lbma.org.uk/good-delivery/rules" },
      { text: T("The Deutsche Bundesbank holds over 3,350 tonnes of sovereign gold reserves, stored in Frankfurt, New York, and London.", "Die Deutsche Bundesbank haelt ueber 3.350 Tonnen staatliche Goldreserven in Frankfurt, New York und London.", "Deutsche Bundesbank zarządza ponad 3350 tonami państwowych rezerw złota ulokowanych we Frankfurcie, Nowym Jorku i Londynie."), source: "https://www.bundesbank.de/de/aufgaben/unbarer-zahlungsverkehr/auslandsreserven/gold" },
      { text: T("Narodowy Bank Polski (NBP) expanded Poland's official gold reserves beyond 400 tonnes in 2024 to reinforce sovereign financial security.", "Die polnische Zentralbank NBP baute ihre Goldreserven 2024 auf ueber 400 Tonnen aus, um die Stabilitaet des Zloty abzusichern.", "Narodowy Bank Polski powiększył oficjalne rezerwy złota powyżej 400 ton w 2024 roku, wzmacniając bezpieczeństwo finansowe państwa."), source: "https://nbp.pl/en/monetary-policy/official-reserve-assets/" },
      { text: T("Roy Jastram's historical landmark study 'The Golden Constant' demonstrated that gold purchasing power remained stable across multiple centuries in Britain and the US.", "Roy Jastrams Langzeitstudie 'The Golden Constant' belegte die bemerkenswerte Kaufkraftstabilitaet von Gold ueber Jahrhunderte.", "Przełomowe studium historyczne Roya Jastrama 'The Golden Constant' dowiodło, że siła nabywcza złota w Anglii i USA pozostawała stabilna na przestrzeni kilku stuleci."), source: "https://www.e-elgar.com/shop/gbp/the-golden-constant-9781847202611.html" },
    ],
    simplified: [
      T(
        "Complex lease rates and gold futures backwardation mechanics are presented through simple comparisons of purchasing power over time.",
        "Leasingraten fuer Gold und Terminkontraktmechaniken wurden auf anschauliche Vergleiche der realen Kaufkraft reduziert.",
        "Skomplikowane stopy leasingu kruszcu i mechanizmy backwardation na rynku terminowym uproszczono do porównań realnej siły nabywczej."),
    ],
  },
};
