import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function NationalDashboardLaunchDiagram({ lang, step }: DiagramProps) {
  const karanName = lang === "pl" ? "Kamil" : lang === "de" ? "Klaus" : "Karan";
  const label = lang === "pl" ? "Kamil analizuje wskaźnik PKB (Produkt Krajowy Brutto)" : lang === "de" ? "Klaus analysiert das Bruttoinlandsprodukt (BIP)" : "Karan analyzing Gross Domestic Product (GDP) macroeconomic dashboard";

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
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a5b4fc">{karanName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#c7d2fe">
          📊 {lang === "pl" ? "PKB: Miara Wielkości Gospodarki" : lang === "de" ? "BIP: Massstab der Wirtschaftsleistung" : "GDP: Measuring Economic Output"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">🏭 🚗 💻 🩺</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#818cf8">
            {lang === "pl" ? "Wszystkie dobra i usługi w ciągu 1 roku" : lang === "de" ? "Gesamtwert aller Gueter & Dienste eines Jahres" : "Total value of finished goods & services in 1 year"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#3730a3" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Wzrost realny a nominalny (inflacja)" : lang === "de" ? "Reales vs nominales Wachstum" : "Real vs nominal output (inflation)"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#e0e7ff">
            {lang === "pl" ? "Czego PKB NIE mierzy: środowisko i zdrowie" : lang === "de" ? "Grenzen des BIP: Umwelt und Wohlbefinden" : "What GDP misses: leisure, health, clean air"}
          </text>
        </g>
      )}
    </svg>
  );
}

function GdpExpenditureEquationDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Równanie wydatków PKB: C + I + G + (X - M)" : lang === "de" ? "BIP-Verwendungsrechnung: C + I + G + (X - M)" : "GDP expenditure formula: Consumption + Investment + Government + Net Exports";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="25" y="45" width="75" height="75" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="62" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">C</text>
        <text x="62" y="88" textAnchor="middle" fontSize="12">🛒</text>
        <text x="62" y="105" textAnchor="middle" fontSize="7.5" fill="#1e40af">Consumer</text>

        <rect x="115" y="45" width="75" height="75" rx="6" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <text x="152" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#065f46">I</text>
        <text x="152" y="88" textAnchor="middle" fontSize="12">🏭</text>
        <text x="152" y="105" textAnchor="middle" fontSize="7.5" fill="#065f46">Investment</text>

        <rect x="205" y="45" width="75" height="75" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="242" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">G</text>
        <text x="242" y="88" textAnchor="middle" fontSize="12">🏫</text>
        <text x="242" y="105" textAnchor="middle" fontSize="7.5" fill="#92400e">Government</text>

        <rect x="295" y="45" width="75" height="75" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1.5" />
        <text x="332" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7e22ce">NX</text>
        <text x="332" y="88" textAnchor="middle" fontSize="12">🚢</text>
        <text x="332" y="105" textAnchor="middle" fontSize="7.5" fill="#7e22ce">X - M</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="140" width="300" height="34" rx="6" fill="#1e293b" />
          <text x="200" y="162" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#38bdf8">
            GDP = Consumption + Investment + Government + Net Exports
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="185" width="320" height="42" rx="6" fill="#334155" />
          <text x="200" y="202" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Konsumpcja gospodarstw domowych (C) stanowi zwykle 55-70% całego PKB" : lang === "de" ? "Privater Konsum (C) macht meist 55% bis 70% der gesamten Wirtschaftsleistung aus" : "Household consumer purchases represent the largest engine of market economies"}
          </text>
          <text x="200" y="218" textAnchor="middle" fontSize="9" fill="#94a3b8">
            {lang === "pl" ? "Inwestycje w maszyny i fabryki (I) budują przyszłą wydajność pracy" : lang === "de" ? "Unternehmensinvestitionen (I) schaffen die Produktivitaet von morgen" : "Business capital investment fuels long-term labor productivity growth"}
          </text>
        </g>
      )}
    </svg>
  );
}

function RealVsNominalGdpDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "PKB realny a nominalny: odliczenie efektu inflacji cenowej" : lang === "de" ? "Reales vs nominales BIP: Bereinigung um die Preisinflation" : "Real vs nominal GDP: stripping out the distortion of price inflation";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="145" height="85" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">Nominal GDP</text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">🏷️ 📈 🎈</text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">Current sticker prices</text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">Includes price inflation illusion</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="145" height="85" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="287" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">Real GDP</text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">📦 🏭 🔬</text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#065f46">Constant base-year prices</text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#047857">Measures actual physical output</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#78350f" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Jeśli ceny wzrosną o 10%, a fabryki wyprodukują tyle samo aut, realne bogactwo się NIE zmieniło!" : lang === "de" ? "Steigen Preise um 10%, aber Autos bleiben gleich, ist kein realer Wohlstand entstanden!" : "If prices double while physical car production is flat, society is not twice as wealthy!"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#fde68a">
            {lang === "pl" ? "Tylko realny PKB pozwala porównać faktyczny postęp gospodarczy w czasie" : lang === "de" ? "Nur das reale BIP zeigt echten Wohlstandszuwachs ueber die Jahre" : "Only real GDP reveals genuine physical gains in human living standards"}
          </text>
        </g>
      )}
    </svg>
  );
}

function LimitsOfGdpDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Czego PKB nie mierzy: czas wolny, środowisko, praca opiekuńcza" : lang === "de" ? "Was das BIP nicht misst: Freizeit, Umwelt und unbezahlte Pflege" : "What GDP fails to measure: leisure, environmental health, caregiving";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <circle cx="120" cy="90" r="38" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="120" y="85" textAnchor="middle" fontSize="20">📊 🏭</text>
        <text x="120" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">Counted in GDP</text>

        <circle cx="280" cy="90" r="38" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="280" y="85" textAnchor="middle" fontSize="20">🌲 👶 📖</text>
        <text x="280" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803d">Omitted from GDP</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="145" width="300" height="40" rx="6" fill="#1e293b" />
          <text x="200" y="163" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "PKB liczy wydatki na leczenie po wypadku, ale nie liczy czystego powietrza w lesie" : lang === "de" ? "Das BIP zaehlt Reparaturen nach Katastrophen, aber keine saubere Atemluft" : "GDP counts oil spill cleanups, but assigns zero value to untouched ancient forests"}
          </text>
          <text x="200" y="177" textAnchor="middle" fontSize="8.5" fill="#94a3b8">
            {lang === "pl" ? "Wychowanie dzieci w domu i wolontariat nie mają ceny rynkowej, choć są bezcenne" : lang === "de" ? "Kindererziehung zu Hause und Ehrenamt fehlen im BIP, obwohl unbezahlbar" : "Parenting and volunteering have no invoice, yet form the moral spine of society"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#0369a1" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "PKB to przydatna miara produkcji, ale nie cel sam w sobie" : lang === "de" ? "Das BIP ist ein Werkzeug fuer Produktion, kein Mass fuer Glueck" : "GDP is an essential production gauge, not a complete measure of human happiness"}
          </text>
        </g>
      )}
    </svg>
  );
}

function FlourishingCivilizationDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Holistyczny dobrobyt: zdrowie, edukacja, wolność i kapitał ludzki" : lang === "de" ? "Ganzheitlicher Wohlstand: Bildung, Gesundheit und Lebensqualitaet" : "Holistic prosperity: human development index, education and freedom";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <g>
        <circle cx="200" cy="90" r="38" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fontSize="20">🌟 🌿</text>
        <text x="200" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">Well-being</text>
        <rect x="40" y="45" width="105" height="65" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1" />
        <text x="92" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">Longevity</text>
        <text x="92" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">Clean health</text>
        <rect x="255" y="45" width="105" height="65" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1" />
        <text x="307" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">Education</text>
        <text x="307" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">Knowledge & arts</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="140" width="300" height="42" rx="6" fill="#ede9fe" stroke="#a855f7" strokeWidth="1" />
          <text x="200" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#581c87">
            "The GDP measures everything in short, except that which makes life worthwhile"
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="8.5" fill="#7e22ce">
            Robert F. Kennedy
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Prawdziwym celem gospodarki jest umożliwienie człowiekowi godnego, szczęśliwego życia" : lang === "de" ? "Das wahre Ziel des Wirtschaftens ist ein gutes, freies und erfuelltes Leben" : "The ultimate purpose of production is empowering humans to lead meaningful lives"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [consumption, setConsumption] = useState(600);
  const [investment, setInvestment] = useState(200);
  const totalGdp = consumption + investment + 300;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Consumption: {consumption} B€ | Investment: {investment} B€ | Total GDP: {totalGdp} B€
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setInvestment((i) => {
              const next = i + 50;
              if (next >= 300) onDone?.();
              return next;
            });
          }}
        >
          Boost Business Investment (+50 B€)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setConsumption((c) => {
              const next = c + 50;
              if (investment >= 250) onDone?.();
              return next;
            });
          }}
        >
          Boost Consumer Spending (+50 B€)
        </button>
      </div>
      <div style={{ padding: "12px", background: totalGdp >= 1200 ? "#eef8ef" : "#eff6ff", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {investment >= 300
          ? "High Capital Accumulation: Advanced clean robotics, fast trains, and AI servers will boost labor productivity for decades!"
          : "Steady Economic Output: Robust household consumption drives retail jobs and services across the country!"}
      </div>
    </div>
  );
}

function GdpWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Why do economists always adjust nominal GDP for inflation to calculate 'Real GDP'?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Because nominal GDP numbers take up too many megabytes on computer hard drives</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>To measure actual increases in physical goods and services produced, rather than false growth caused by price inflation</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Because base year calculations are legally required by calendar printing factories</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "gdp",
  story: [
    animatedBeat(
      [
        T("Meet Karan. He reads a breaking financial notification on his tablet announcing that the nation's GDP grew by 2.4% over the last fiscal year.", "Das ist Klaus. Er liest eine Eilmeldung auf seinem Tablet: Das Bruttoinlandsprodukt (BIP) seines Landes wuchs im letzten Jahr um 2,4%.", "Poznaj Kamila. Czyta powiadomienie gospodarcze na tablecie informujące, że PKB kraju wzrosło w ubiegłym roku o 2,4%."),
        T("News anchors celebrate the number, corporate executives cheer on television, and stock markets rally across Europe.", "Nachrichtensprecher jubeln, Firmenlenker laecheln im Studio und die Boerse schliesst im deutlichen Plus.", "Prezenterzy telewizyjni mówią o sukcesie, prezesi firm zacierają ręce, a giełdy w całej Europie notują wzrosty."),
        T("GDP stands for *Gross Domestic Product*: the single most famous scorekeeper of national economic activity ever created.", "Das BIP (Bruttoinlandsprodukt) ist der bekannteste Gesamtindex fuer die wirtschaftliche Leistungsfaehigkeit einer Nation.", "PKB to *Produkt Krajowy Brutto*: najważniejszy i najbardziej znany wskaźnik mierzący wielkość gospodarki narodowej."),
      ],
      NationalDashboardLaunchDiagram,
    ),
    animatedBeat(
      [
        T("GDP measures the total monetary market value of all finished goods and services produced within a country's borders during a single year.", "Das BIP misst den gesamten Marktwert aller Endprodukte und Dienstleistungen, die ein Land in einem Jahr herstellt.", "PKB mierzy łączną wartość rynkową wszystkich dóbr i usług finalnych wytworzonych na terytorium danego kraju w ciągu jednego roku."),
        T("To avoid double counting, national accountants only measure *finished goods*: the final laptop purchased by a student, not the individual transistors inside it.", "Um Doppelzaehlungen zu vermeiden, zaehlt nur das *Endprodukt*, der fertige Laptop im Laden, nicht jede Schraube einzeln.", "Aby uniknąć podwójnego liczenia, statystycy uwzględniają wyłącznie *dobra finalne*, czyli gotowego laptopa kupionego w sklepie, a nie pojedyncze tranzystory wewnątrz obudowy."),
        T("Economists calculate GDP using the classic expenditure formula: *Consumption (C) + Investment (I) + Government Spending (G) + Net Exports (X - M)*.", "Berechnet wird das BIP meist ueber die Ausgabenformel: *Konsum (C) + Investitionen (I) + Staatsausgaben (G) + Nettoexporte (X - M)*.", "W ujęciu wydatkowym PKB opisuje klasyczny wzór: *Konsumpcja (C) + Inwestycje (I) + Wydatki państwa (G) + Eksport netto (X - M)*."),
      ],
      GdpExpenditureEquationDiagram,
    ),
    animatedBeat(
      [
        T("A critical distinction in macroeconomic analysis is between *nominal GDP* and *real GDP*.", "Der entscheidende Unterschied in der Makrooekonomie liegt zwischen *nominalem* und *realem BIP*.", "Fundamentalnym rozróżnieniem w makroekonomii jest podział na *nominalny* oraz *realny PKB*."),
        T("If a nation manufactures exactly 1,000 electric cars at 30,000 euros each, its vehicle GDP is 30 million euros.", "Baut ein Land 1.000 Elektroautos zu je 30.000 Euro, betraegt der Fahrzeugbeitrag zum BIP 30 Millionen Euro.", "Jeśli w kraju powstaje 1000 aut elektrycznych po 30 tysięcy euro każde, ich wkład do PKB wynosi 30 milionów euro."),
        T("If severe inflation doubles the price of those cars to 60,000 euros next year while factories still produce only 1,000 cars, nominal GDP doubles to 60 million, but real GDP growth is zero.", "Verdoppelt Inflation den Preis auf 60.000 Euro bei gleicher Automenge, verdoppelt sich das nominale BIP, doch das reale Wachstum ist null.", "Gdyby wysoka inflacja podwoiła cenę auta do 60 tysięcy euro przy tej samej produkcji 1000 sztuk, nominalny PKB podwoi się, ale realny wzrost wyniesie zero."),
      ],
      RealVsNominalGdpDiagram,
    ),
    animatedBeat(
      [
        T("While GDP is a brilliant measuring tape for physical factory output, it has profound built-in limitations.", "Obwohl das BIP ein unverzichtbares Messinstrument ist, besitzt es gravierende blinde Flecken.", "Mimo że PKB jest genialnym miernikiem produkcji przemysłowej, posiada poważne ograniczenia."),
        T("GDP counts expenditures on cancer treatments, car crash repairs, and security fences, yet assigns zero monetary value to clean breathing air or intact ancient rainforests.", "Das BIP erfasst Reparaturen nach Unfaellen oder Klinikbehandlungen, bewertet aber saubere Luft und intakte Waelder mit null Euro.", "PKB zlicza wydatki na naprawę aut po wypadkach czy leczenie chorób, lecz nie przypisuje żadnej wartości czystemu powietrzu czy dziewiczym lasom."),
        T("Crucial human labor, such as parents raising children at home, neighbors helping elderly citizens, and open-source software, is entirely invisible in GDP tables.", "Entscheidende Lebensleistungen wie Kindererziehung zu Hause, Nachbarschaftshilfe oder Open-Source-Code tauchen im BIP nirgends auf.", "Bezcenne wysiłki społeczne, jak wychowywanie dzieci, opieka nad dziadkami czy programy open-source, są dla PKB całkowicie niewidoczne."),
      ],
      LimitsOfGdpDiagram,
    ),
    animatedBeat(
      [
        T("Modern economists complement GDP with richer metrics like the *Human Development Index* (HDI), measuring life expectancy, literacy, and environmental sustainability.", "Moderne Oekonomen ergaenzen das BIP daher um den *Index der menschlichen Entwicklung* (HDI) fuer Gesundheit und Bildung.", "Dlatego nowocześni ekonomiści uzupełniają PKB o wskaźniki takie jak *Wskaźnik Rozwoju Społecznego* (HDI), mierzący długość życia i edukację."),
        T("Economic production is not an end in itself: factories and software exist to empower human flourishing, dignity, and creative expression.", "Wirtschaftsleistung ist kein Selbstzweck: Gueter und Wohlstand existieren, um Menschen ein freies und erfuelltes Leben zu schenken.", "Wytwórczość gospodarcza nie jest celem samym w sobie: istnieje po to, by dawać ludziom wolność, zdrowie i szansę na samorealizację."),
        T("Understanding what GDP measures, and what it leaves out, empowers you to evaluate national progress with nuance and wisdom.", "Wer versteht, was das BIP misst und was es verschweigt, blickt mit Weitsicht auf den wahren Fortschritt einer Nation.", "Zrozumienie, co mierzy PKB, a czego w nim brakuje, pozwala mądrze i krytycznie oceniać prawdziwy rozwój społeczeństwa."),
      ],
      FlourishingCivilizationDiagram,
    ),
  ],
  toyIntro: T(
    "Balance the national expenditure components: allocate capital between business investment and consumer purchases to expand real economic capacity.",
    "Balanciere die Ausgabenkomponenten des BIP: Verteile Mittel auf Investitionen und Konsum, um nachhaltige Produktivitaet zu schaffen.",
    "Zarządzaj składowymi wydatków PKB: dziel strumienie kapitału między inwestycje a konsumpcję, by budować nowoczesną gospodarkę."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the difference between Nominal GDP and Real GDP?",
        "Was ist der Unterschied zwischen nominalem und realem Bruttoinlandsprodukt (BIP)?",
        "Jaka jest różnica między PKB nominalnym a PKB realnym?",
      ),
      options: [
        { text: T("Nominal GDP is calculated using current unadjusted prices, whereas Real GDP adjusts for price inflation to measure actual physical changes in output", "Nominales BIP nutzt aktuelle Preise, waehrend reales BIP um die Inflation bereinigt wird, um die tatsaechliche Guetermenge zu erfassen", "PKB nominalny jest liczony w cenach bieżących, podczas gdy PKB realny koryguje dane o inflację, mierząc rzeczywistą ilość wytworzonych dóbr"), correct: true },
        { text: T("Nominal GDP only counts items bought on Sundays, while Real GDP counts items bought on Tuesdays", "Nominales BIP zaehlt nur Kaeufe am Sonntag, waehrend reales BIP Kaeufe am Dienstag erfasst", "PKB nominalny liczy tylko zakupy niedzielne, a PKB realny wyłącznie zakupy wtorkowe"), correct: false },
        { text: T("Real GDP is measured exclusively in kilograms of freshly harvested potatoes", "Reales BIP wird ausschliesslich in Kilogramm frisch geernteter Kartoffeln gemessen", "PKB realny mierzy się wyłącznie w kilogramach świeżo wykopanych ziemniaków"), correct: false },
      ],
      hint: T(
        "Remember the car factory example: prices doubled, but the number of real cars built stayed the same.",
        "Denke an das Beispiel der Autofabrik: Die Preise verdoppelten sich, aber die Zahl der real gebauten Autos blieb gleich.",
        "Przypomnij sobie przykład z fabryką samochodów: ceny uległy podwojeniu, lecz liczba wyprodukowanych aut nie wzrosła."),
    },
    {
      kind: "choice",
      prompt: T(
        "Which valuable societal activity is famously NOT captured in standard national GDP accounting?",
        "Welche wertvolle gesellschaftliche Taetigkeit wird im klassischen BIP NICHT erfasst?",
        "Jaka wartościowa działalność społeczna NIE jest uwzględniana w standardowym rachunku PKB?",
      ),
      options: [
        { text: T("Unpaid caregiving, parenting children at home, neighborhood volunteering, and environmental conservation", "Unbezahlte Pflegearbeit, Kindererziehung zu Hause, Nachbarschaftshilfe und der Erhalt unberuehrter Natur", "Nieodpłatna opieka domowa, wychowywanie dzieci, wolontariat sąsiedzki i ochrona dziewiczej przyrody"), correct: true },
        { text: T("Buying a commercial airliner from a European aerospace manufacturer", "Der Kauf eines Verkehrsflugzeugs bei einem europaeischen Flugzeugbauer", "Zakup samolotu pasażerskiego u europejskiego producenta"), correct: false },
        { text: T("Paying for a dentist visit to fill a tooth cavity", "Die Bezahlung einer Zahnbehandlung beim Zahnarzt", "Opłacenie wizyty u dentysty i założenia plomby"), correct: false },
      ],
      hint: T(
        "Think about non-market goods that have no retail receipt or formal invoice.",
        "Denke an wertvolle Leistungen, fuer die es keine Rechnung und keinen Kassenbon gibt.",
        "Pomyśl o bezcennych działaniach, za które nikt nie wystawia faktury ani paragonu fiskalnego."),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze why inflation adjustments are mandatory for understanding real economic growth.",
        "Analysiere, warum die Inflationsbereinigung unverzichtbar ist, um echtes Wirtschaftswachstum zu verstehen.",
        "Przeanalizuj, dlaczego uwzględnienie inflacji jest niezbędne do oceny realnego wzrostu gospodarczego.",
      ),
      Widget: GdpWidget,
      hint: T(
        "Focus on distinguishing between price tag inflation and genuine physical increases in goods and services.",
        "Achte auf den Unterschied zwischen reinen Preiserhoehungen und echtem Gueterzuwachs.",
        "Zwróć uwagę na odróżnienie iluzji wzrostu cen od rzeczywistego powiększenia wolumenu wyprodukowanych towarów i usług."),
    },
  ],
  askDad: T(
    "Ask your parent: When news reports say 'the economy is growing', does that always match how everyday family budgets feel in grocery stores?",
    "Frage deine Eltern: Wenn die Nachrichten von 'Wirtschaftswachstum' sprechen, deckt sich das immer mit dem Gefuehl an der Supermarktkasse?",
    "Zapytaj rodziców: Gdy wiadomości informują, że 'gospodarka rozwija się dynamicznie', czy zawsze pokrywa się to z ich odczuciami przy kasie w sklepie?"),
  realLife: {
    title: T(
      "Real world: Simon Kuznets inventing GDP in 1934 and Bhutan's Gross National Happiness index",
      "Echte Welt: Simon Kuznets erfindet das BIP 1934 und das Bruttonationalglueck in Bhutan",
      "Prawdziwy świat: Simon Kuznets i stworzenie wskaźnika PKB w 1934 r. oraz Szczęście Narodowe Brutto w Bhutanie",
    ),
    body: T(
      "In 1934, economist Simon Kuznets presented the first standardized national income accounts to the US Congress to help navigate the Great Depression, earning the Nobel Prize in 1971. Yet Kuznets himself presciently warned Congress: 'The welfare of a nation can scarcely be inferred from a measure of national income'. In 1972, the Himalayan Kingdom of Bhutan took this to heart, creating 'Gross National Happiness' (GNH) to formally balance economic growth with cultural preservation, psychological well-being, and ecological health.",
      "1934 entwickelte Simon Kuznets im Auftrag des US-Kongresses die volkswirtschaftliche Gesamtrechnung zur Bewaeltigung der Weltwirtschaftskrise (Nobelpreis 1971). Doch Kuznets mahnte selbst: 'Das Wohlergehen einer Nation kann kaum an einem solchen Massstab abgelesen werden'. Das Koenigreich Bhutan fuehrte 1972 das 'Bruttonationalglueck' ein, um materiellen Wohlstand mit seelischem Wohlbefinden und Umweltschutz zu verbinden.",
      "W 1934 roku Simon Kuznets przedstawił w Kongresie USA pierwszy ustandaryzowany rachunek dochodu narodowego, za co w 1971 r. otrzymał Nagrodę Nobla. Sam Kuznets ostrzegał jednak: 'Dobrobytu narodu nie sposób oceniać jedynie miarą dochodu narodowego'. W 1972 roku Królestwo Bhutanu poszło krok dalej, wprowadzając wskaźnik 'Szczęścia Narodowego Brutto' (GNH), łączący wzrost gospodarczy ze zdrowiem psychicznym i ekologią."),
  },
  factCard: {
    claims: [
      { text: T("Simon Kuznets presented his pioneering report 'National Income, 1929 to 1932' to the US Senate in January 1934, establishing the foundation of modern GDP.", "Simon Kuznets legte im Januar 1934 dem US-Senat den ersten Bericht zum Volkseinkommen vor und begruendete das moderne BIP.", "Simon Kuznets przedłożył w Senacie USA w styczniu 1934 r. raport 'Dochód narodowy 1929-1932', tworząc podstawy rachunku PKB."), source: "https://www.nber.org/system/files/chapters/c2258/c2258.pdf" },
      { text: T("Simon Kuznets was awarded the 1971 Nobel Memorial Prize in Economic Sciences for his empirical interpretation of economic growth.", "Simon Kuznets erhielt 1971 den Wirtschaftsnobelpreis fuer seine bahnbrechende Erforschung des Wirtschaftswachstums.", "Simon Kuznets otrzymał Nagrodę Nobla w 1971 roku za badania nad empiryczną interpretacją wzrostu gospodarczego."), source: "https://www.nobelprize.org/prizes/economic-sciences/1971/kuznets/facts/" },
      { text: T("Robert F. Kennedy delivered his famous address at the University of Kansas on March 18, 1968, critiquing the limitations of Gross National Product.", "Robert F. Kennedy hielt am 18. Maerz 1968 seine beruehmte Rede an der University of Kansas ueber die Grenzen des Bruttosozialprodukts.", "Robert F. Kennedy wygłosił 18 marca 1968 roku głośne przemówienie na Uniwersytecie Kansas, wskazując ograniczenia rachunku PKB."), source: "https://www.jfklibrary.org/learn/about-jfk/the-kennedy-family/robert-f-kennedy/robert-f-kennedy-speeches/remarks-at-the-university-of-kansas-march-18-1968" },
      { text: T("The United Nations Development Programme (UNDP) published the first Human Development Index (HDI) in 1990, created by Mahbub ul Haq and Amartya Sen.", "Das Entwicklungsprogramm der Vereinten Nationen (UNDP) fuehrte 1990 den Index der menschlichen Entwicklung (HDI) ein.", "Program Narodów Zjednoczonych ds. Rozwoju (UNDP) opublikował w 1990 roku pierwszy wskaźnik HDI stworzony przez Mahbuba ul Haqa i Amartyę Sena."), source: "https://hdr.undp.org/data-center/human-development-index#/indicies/HDI" },
      { text: T("The System of National Accounts (SNA 2008), sponsored by the UN, IMF, OECD, and World Bank, sets global statistical standards for GDP compilation.", "Das System of National Accounts (SNA) von UNO, IWF und Weltbank regelt die weltweiten Standards fuer die BIP-Erfassung.", "System Rachunków Narodowych (SNA 2008) ONZ, MFW i Banku Światowego wyznacza globalne standardy statystyczne obliczania PKB."), source: "https://unstats.un.org/unsd/nationalaccount/sna.asp" },
    ],
    simplified: [
      T(
        "Complex input-output tables and chained Laspeyres volume deflators are translated into straightforward electric vehicle factory comparisons and intuitive dashboard component cards.",
        "Komplexe Input-Output-Tabellen und Kettenpreisindizes wurden durch Elektroautofabriken und uebersichtliche Dashboard-Karten verstaendlich gemacht.",
        "Skomplikowane tablice przepływów międzygałęziowych i deflatory cenowe łańcuchowe wyjaśniono za pomocą porównania produkcji aut elektrycznych i czytelnych kafelków makroekonomicznych."),
    ],
  },
};
