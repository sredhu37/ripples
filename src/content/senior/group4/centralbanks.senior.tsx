import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function CentralBankTowerLaunchDiagram({ lang, step }: DiagramProps) {
  const arjunName = lang === "pl" ? "Artur" : lang === "de" ? "Arno" : "Arjun";
  const label = lang === "pl" ? "Artur odwiedza bank centralny i analizuje politykę monetarną" : lang === "de" ? "Arno besichtigt die Zentralbank und analysiert Geldpolitik" : "Arjun exploring the central bank headquarters and monetary policy";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#3b82f6" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#172554" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#2563eb" stroke="#3b82f6" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#93c5fd">{arjunName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#bfdbfe">
          🏦 {lang === "pl" ? "Bank Centralny: Strażnik Waluty" : lang === "de" ? "Zentralbank: Waechter des Geldes" : "Central Bank: Currency Custodian"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#2563eb" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">🎯 ⚖️ 📉</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#60a5fa">
            {lang === "pl" ? "Stabilność cen i cel inflacyjny 2%" : lang === "de" ? "Preisstabilitaet und 2% Inflationsziel" : "Price stability and 2% inflation target"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#1e40af" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Stopy procentowe jako termostat gospodarki" : lang === "de" ? "Leitzins als Thermostat der Wirtschaft" : "Interest rate as economic thermostat"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#dbeafe">
            {lang === "pl" ? "Niezależność od bieżącej polityki wyborczej" : lang === "de" ? "Unabhaengigkeit von der Tagespolitik" : "Operational independence from political cycles"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DualMandateThermostatDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Stopy procentowe jako termostat chłodzący lub rozgrzewający rynek" : lang === "de" ? "Der Zins-Thermostat: Kuehlen bei Inflation, Heizen bei Flaute" : "Interest rate thermostat: cooling inflation vs stimulating growth";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="145" height="85" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">High Inflation</text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">🔥 📈 🧊</text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">Raise interest rates</text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">Cools demand and borrowing</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="145" height="85" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="287" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Recession Slump</text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">❄️ 📉 🚀</text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">Lower interest rates</text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#2563eb">Encourages hiring & loans</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#1e293b" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Bank centralny balansuje między stabilnością cen a poziomem zatrudnienia" : lang === "de" ? "Die Notenbank steuert das Gleichgewicht aus stabilen Preisen und Beschaeftigung" : "Central banks navigate the delicate balance of price stability and full employment"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl" ? "Wzrost stóp podraża kredyty, zachęcając ludzi i firmy do oszczędzania" : lang === "de" ? "Hoehere Zinsen verteuern Kredite und belohnen das Sparen" : "Higher rates make loans expensive, curbing overheated spending"}
          </text>
        </g>
      )}
    </svg>
  );
}

function LenderOfLastResortDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Pożyczkodawca ostatniej instancji powstrzymuje panikę bankową" : lang === "de" ? "Kreditgeber letzter Instanz stoppt Panik bei Banken" : "Lender of last resort halting systemic bank runs";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="145" height="85" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">Bank Run Panic</text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">🏃 🏃 🏦 💥</text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">All depositors withdraw</text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">Illiquid bank collapses</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="145" height="85" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="287" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">Central Bank Liquidity</text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">🛡️ 💰 🤝</text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#065f46">Emergency bridge loans</text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#047857">Solvent banks saved</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#78350f" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Płynność ratuje wypłacalne banki przed nagłą śmiercią w panice" : lang === "de" ? "Notfallkredite gegen gute Sicherheiten verhindern einen Dominoeffekt" : "Emergency liquidity against sound collateral prevents catastrophic contagion"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#fde68a">
            {lang === "pl" ? "Zasada Bagehota: pożyczaj hojnie na wysoki procent pod pewny zastaw" : lang === "de" ? "Bagehots Diktum: Grosszuegig leihen zu hohem Zins auf gute Pfänder" : "Bagehot's rule: lend freely at penalty rates against good collateral"}
          </text>
        </g>
      )}
    </svg>
  );
}

function InstitutionalIndependenceDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Niezależność instytucjonalna banku centralnego" : lang === "de" ? "Unabhaengigkeit der Zentralbank schuetzt die Waehrung" : "Central bank independence shielding long-term purchasing power";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <circle cx="120" cy="90" r="38" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="120" y="85" textAnchor="middle" fontSize="20">🏦 🛡️</text>
        <text x="120" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">Central Bank</text>

        <circle cx="280" cy="90" r="38" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
        <text x="280" y="85" textAnchor="middle" fontSize="20">🗳️ 📢</text>
        <text x="280" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#b91c1c">Election Cycle</text>

        <line x1="160" y1="90" x2="240" y2="90" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 4" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="145" width="300" height="40" rx="6" fill="#1e293b" />
          <text x="200" y="163" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Brak prawa polityków do nakazywania 'dodruku pieniędzy'" : lang === "de" ? "Politiker duerfen nicht einfach Gelddrucken befehlen" : "No political orders to print money for pre-election giveaways"}
          </text>
          <text x="200" y="177" textAnchor="middle" fontSize="8.5" fill="#94a3b8">
            {lang === "pl" ? "Długie, nieodwołalne kadencje chronią wartość oszczędności obywateli" : lang === "de" ? "Feste Amtszeiten schuetzen die Ersparnisse der Bevoelkerung" : "Long non-renewable tenures protect consumer savings from hyperinflation"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#0369a1" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Doświadczenie uczy: niezależne banki zapewniają niższą i stabilniejszą inflację" : lang === "de" ? "Erfahrung zeigt: Unabhaengige Notenbanken sichern niedrige Inflation" : "Empirical evidence: independent central banks consistently deliver lower inflation"}
          </text>
        </g>
      )}
    </svg>
  );
}

function SoundMoneyAnchorDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Stabilna waluta jako fundament zaufania społecznego" : lang === "de" ? "Stabile Waehrung als Fundament gesellschaftlichen Vertrauens" : "Sound currency anchor anchoring societal trust and commerce";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <g>
        <circle cx="200" cy="90" r="38" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fontSize="20">💶 ⚓</text>
        <text x="200" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">Sound Money</text>
        <rect x="40" y="45" width="105" height="65" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1" />
        <text x="92" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">Retirement</text>
        <text x="92" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">Safe pensions</text>
        <rect x="255" y="45" width="105" height="65" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1" />
        <text x="307" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">Long Contracts</text>
        <text x="307" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">Predictable loans</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="140" width="300" height="42" rx="6" fill="#ede9fe" stroke="#a855f7" strokeWidth="1" />
          <text x="200" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#581c87">
            "Inflation is always and everywhere a monetary phenomenon"
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="8.5" fill="#7e22ce">
            Milton Friedman
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Utrzymanie siły nabywczej pieniądza chroni najsłabszych przed ukrytym podatkiem inflacyjnym" : lang === "de" ? "Preisstabilitaet schuetzt Sparer und Schwaechere vor der heimlichen Enteignung" : "Defending purchasing power shields working families from the stealth tax of inflation"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [benchmarkRate, setBenchmarkRate] = useState(3.0);
  const inflation = Math.max(1.0, Math.round((7.0 - benchmarkRate * 0.9) * 10) / 10);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Policy Interest Rate: {benchmarkRate.toFixed(1)}% | National CPI Inflation: {inflation.toFixed(1)}%
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setBenchmarkRate((r) => {
              const next = Math.min(8.0, r + 0.5);
              if (Math.abs(7.0 - next * 0.9 - 2.0) <= 0.6) onDone?.();
              return next;
            });
          }}
        >
          Hike Interest Rate (+0.5%)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setBenchmarkRate((r) => {
              const next = Math.max(0.5, r - 0.5);
              if (Math.abs(7.0 - next * 0.9 - 2.0) <= 0.6) onDone?.();
              return next;
            });
          }}
        >
          Cut Interest Rate (-0.5%)
        </button>
      </div>
      <div style={{ padding: "12px", background: Math.abs(inflation - 2.0) <= 0.5 ? "#eef8ef" : "#fff1f2", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {inflation > 3.5
          ? "Overheating Economy: Groceries and rent surge fast! Consumers lose purchasing power rapidly."
          : inflation < 1.5
          ? "Stagnation Risk: Interest rates too high! Businesses delay new factory hires and economic growth slows."
          : "Goldilocks Target (~2% Inflation): Predictable prices protect household savings while keeping borrowing healthy!"}
      </div>
    </div>
  );
}

function CentralBanksWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Why are central bank governors intentionally made independent of everyday election campaigns?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Because central bankers prefer working in total darkness without any phone connection</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>To prevent politicians from ordering artificial money printing before elections, which causes catastrophic hyperinflation</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Because central bank chairs are selected by lottery among high school math teachers</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "centralbanks",
  story: [
    animatedBeat(
      [
        T("Meet Arjun. He reads about grocery prices rising across the country and hears on the evening news that the central bank just adjusted interest rates.", "Das ist Arno. Er hoert in den Nachrichten, dass die Lebensmittelpreise steigen und die Zentralbank den Leitzins angehoben hat.", "Poznaj Artura. Słyszy w wieczornych wiadomościach, że ceny żywności w sklepach rosną, a bank centralny właśnie podniósł stopy procentowe."),
        T("He wonders: what is this mysterious institution, and why do its decisions directly impact home mortgage payments and consumer loan rates?", "Er fragt sich: Was ist diese maechtige Institution, und warum bestimmt ihr Beschluss ueber Baukredite und Sparzinsen?", "Zastanawia się: czym jest ta potężna instytucja i dlaczego jej decyzje bezpośrednio wpływają na raty kredytów hipotecznych i oszczędności obywateli?"),
        T("The central bank is the monetary bedrock of modern nations, tasked with safeguarding the purchasing power of money.", "Die Notenbank ist das monetaere Fundament des Landes mit dem Auftrag, die Kaufkraft des Geldes stabil zu halten.", "Bank centralny to monetarne serce każdego kraju, powołane do obrony siły nabywczej narodowego pieniądza."),
      ],
      CentralBankTowerLaunchDiagram,
    ),
    animatedBeat(
      [
        T("Unlike commercial banks that open accounts for consumers, the central bank operates as the *bankers' bank*.", "Im Gegensatz zu normalen Geschaeftsbanken eroeffnet die Zentralbank Konten nur fuer Banken und den Staat.", "W odróżnieniu od banków komercyjnych prowadzących rachunki dla obywateli, bank centralny jest *bankiem banków*."),
        T("Its primary tool is setting the *benchmark policy interest rate*, the rate at which commercial banks borrow overnight funds.", "Ihr wichtigstes Werkzeug ist der *Leitzins*, zu dem sich Geschaeftsbanken kurzfristig Geld leihen koennen.", "Jego podstawowym narzędziem jest *referencyjna stopa procentowa*, czyli koszt, po jakim banki komercyjne pożyczają od niego pieniądze."),
        T("This interest rate acts like an economic thermostat: raising rates cools overheated borrowing and inflation, while lowering rates sparks investment during recessions.", "Dieser Zins wirkt wie ein Thermostat: Erhoehungen bremsen Inflation, waehrend Zinssenkungen Flaute ueberwinden helfen.", "Stopa ta działa jak termostat gospodarki: jej podniesienie studzi inflację i nadmierny popyt, a obniżenie pobudza inwestycje w kryzysie."),
      ],
      DualMandateThermostatDiagram,
    ),
    animatedBeat(
      [
        T("During sudden financial panics, the central bank serves as the critical *lender of last resort*.", "Bei ploetzlichen Finanzpaniken agiert die Zentralbank als *Kreditgeber der letzten Instanz* (Lender of Last Resort).", "W czasie nagłych kryzysów finansowych bank centralny pełni kluczową rolę *pożyczkodawcy ostatniej instancji*."),
        T("If terrified depositors all rush to pull out cash at once in a bank run, even healthy banks can instantly fail because their funds are tied up in mortgages.", "Wenn verunsicherte Kunden gleichzeitig ihre Einlagen abziehen, geraten selbst gesunde Banken in Liquiditaetsnot.", "Gdy spanikowani klienci masowo rzucają się do okienek, by wypłacić gotówkę, nawet zdrowy bank może upaść przez brak płynności."),
        T("By injecting emergency liquidity against sound collateral, the central bank stops contagious financial collapses before they wreck the real economy.", "Durch Notfall-Liquiditaet gegen solide Sicherheiten stoppt die Notenbank Bankenbeben, bevor sie Firmen mitreissen.", "Pożyczając bankom płynną gotówkę pod zastaw pewnych aktywów, bank centralny gasi panikę, zanim zrujnuje ona gospodarkę."),
      ],
      LenderOfLastResortDiagram,
    ),
    animatedBeat(
      [
        T("A fundamental pillar of modern monetary economics is *central bank operational independence*.", "Eine tragende Saeule moderner Geldpolitik ist die *institutionelle Unabhaengigkeit* der Notenbank.", "Fundamentalnym filarem nowoczesnej bankowości centralnej jest jej *niezależność od bieżącej polityki*."),
        T("History demonstrates that if politicians control the printing press, they face intense temptation to print money to fund flashy projects right before election day.", "Wann immer Regierende die Druckerpresse kontrollierten, druckten sie Geld fuer Wahlgeschenke und loesten Hyperinflation aus.", "Historia dowodzi, że gdy politycy przejmują kontrolę nad mennicą, natychmiast drukują pusty pieniądz na przedwyborcze obietnice."),
        T("By shielding central bank governors with long, fixed tenures, democracies protect the currency from short-sighted political interference.", "Durch lange, unkuendbare Amtszeiten der Notenbankchefs schuetzt die Demokratie die Waehrung vor politischer Kurzsichtigkeit.", "Chroniąc prezesów banków centralnych długimi, nieodwołalnymi kadencjami, państwa strzegą waluty przed hiperinflacją."),
      ],
      InstitutionalIndependenceDiagram,
    ),
    animatedBeat(
      [
        T("Sound money is not an abstract spreadsheet entry: it is the quiet guardian of every citizen's life savings and dignity.", "Geldwertstabilitaet ist kein abstraktes Rechenspiel: Sie schuetzt die Lebensersparnisse und Lebensleistung der Menschen.", "Stabilna waluta to nie tylko wykres ekonomiczny: to strażnik oszczędności życia i godności każdego pracującego człowieka."),
        T("When inflation is low and predictable around 2%, workers can plan for retirement, businesses can sign multi-year contracts, and young people can save for homes.", "Bei verlaesslichen 2% Inflation koennen Familien fuer die Rente sparen, Betriebe planen und junge Menschen Wohnungen bauen.", "Gdy inflacja jest niska i wynosi około 2%, rodziny mogą spokojnie oszczędzać na emeryturę, a firmy planować inwestycje."),
        T("Understanding monetary policy shows you how central banks defend the trust that keeps global commerce moving.", "Wer Geldpolitik versteht, erkennt, wie Zentralbanken das Vertrauen bewahren, das unsere Wirtschaft zusammenhaelt.", "Zrozumienie polityki monetarnej pozwala docenić rolę zaufania, które stanowi fundament nowoczesnego handlu i dobrobytu."),
      ],
      SoundMoneyAnchorDiagram,
    ),
  ],
  toyIntro: T(
    "Calibrate central bank monetary policy: adjust interest rates to rein in hot inflation without pushing the economy into stagnation.",
    "Steuere die Zinspolitik: Justiere den Leitzins, um Inflation einzudaemmen, ohne die Realwirtschaft abzuwuergen.",
    "Zarządzaj stopami procentowymi: podnoś lub obniżaj stopy banku centralnego, aby utrzymać cel inflacyjny 2% bez wywoływania recesji."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is central bank independence from short-term election campaigns so essential?",
        "Warum ist die Unabhaengigkeit der Notenbank von kurzfristigen Wahlkaempfen so unverzichtbar?",
        "Dlaczego niezależność banku centralnego od bieżącej walki wyborczej jest tak istotna?",
      ),
      options: [
        { text: T("It prevents politicians from artificially printing money to finance election promises, which leads to damaging inflation and currency debasement", "Sie verhindert, dass Politiker fuer kurzfristige Wahlgeschenke die Druckerpresse anwerfen und so schwere Inflation ausloesen", "Zapobiega sztucznemu dodrukowywaniu pieniędzy przez polityków na obietnice wyborcze, co prowadzi do niszczącej hiperinflacji"), correct: true },
        { text: T("It allows central bankers to take month-long sailing holidays in the Antarctic without notice", "Sie erlaubt es Bankern, unangekuendigt vierwoechige Segeltouren in der Antarktis zu unternehmen", "Pozwala zarządowi banku na miesięczne wakacje żeglarskie na Antarktydzie bez uprzedzenia"), correct: false },
        { text: T("It requires all banknotes to be signed in purple sparkly gel pen", "Sie schreibt vor, dass Geldscheine nur mit glitzerndem Gelstift signiert werden", "Wymaga podpisywania banknotów wyłącznie fioletowym brokatowym długopisem"), correct: false },
      ],
      hint: T(
        "Think about what happens to consumer price stability when politicians can freely print trillions right before voting day.",
        "Ueberlege, was mit den Preisen passiert, wenn Politiker kurz vor der Wahl beliebig Billionen drucken duerfen.",
        "Pomyśl, co stałoby się z cenami chleba i paliwa, gdyby rządzący mogli bez ograniczeń dodrukować miliardy tuż przed wyborami."),
    },
    {
      kind: "choice",
      prompt: T(
        "What does the central bank do when functioning as the 'lender of last resort'?",
        "Was tut die Zentralbank in ihrer Funktion als 'Kreditgeber der letzten Instanz'?",
        "Co robi bank centralny, pełniąc funkcję 'pożyczkodawcy ostatniej instancji'?",
      ),
      options: [
        { text: T("It provides emergency liquidity loans against sound collateral to solvent commercial banks experiencing sudden bank runs", "Sie vergibt Notfallkredite gegen solide Sicherheiten an zahlungsfaehige Banken, die von ploetzlichen Einlagenabzuegen bedroht sind", "Udziela awaryjnych pożyczek płynnościowych pod pewny zastaw wypłacalnym bankom komercyjnym, które dotknęła nagła panika depozytowa"), correct: true },
        { text: T("It buys every broken bicycle in the capital city for ten thousand euros each", "Sie kauft saemtliche kaputten Fahrraeder der Hauptstadt fuer jeweils zehntausend Euro auf", "Kupuje wszystkie uszkodzone rowery w stolicy po dziesięć tysięcy euro za sztukę"), correct: false },
        { text: T("It orders all automatic teller machines to distribute chocolate cookies instead of cash", "Sie weist Geldautomaten an, Schokokekse statt Bargeld auszugeben", "Wydaje polecenie bankomatom, by zamiast banknotów wypłacały ciastka czekoladowe"), correct: false },
      ],
      hint: T(
        "Think about halting bank run contagions before they drag down the broader economy.",
        "Denke an das Stoppen von Panikwellen, bevor sie die reale Wirtschaft laehmen.",
        "Pomyśl o powstrzymaniu fali paniki bankowej, zanim doprowadzi ona do zamknięcia fabryk i sklepów."),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze why central banks are insulated from direct political pressure.",
        "Analysiere, warum Zentralbanken vor direktem politischem Einfluss geschuetzt werden.",
        "Przeanalizuj, dlaczego banki centralne są chronione przed bezpośrednimi naciskami politycznymi.",
      ),
      Widget: CentralBanksWidget,
      hint: T(
        "Focus on avoiding pre-election monetary expansions that debase purchasing power.",
        "Achte auf die Gefahr vorwahlzeitlicher Geldmengenausweitungen und Geldentwertung.",
        "Zwróć uwagę na ryzyko przedwyborczego pompowania podaży pieniądza niszczącego wartość waluty."),
    },
  ],
  askDad: T(
    "Ask your parent: How do changes in the central bank's benchmark interest rate affect your family's savings account or mortgage payments?",
    "Frage deine Eltern: Wie wirken sich Aenderungen des Leitzinses auf euer Sparkonto oder die monatliche Kreditrate fuers Haus aus?",
    "Zapytaj rodziców: Jak zmiany stóp procentowych banku centralnego przekładają się na oprocentowanie lokat bankowych lub ratę kredytu na mieszkanie?"),
  realLife: {
    title: T(
      "Real world: Paul Volcker conquering 1970s stagflation and the European Central Bank's price stability mandate",
      "Echte Welt: Paul Volcker besiegt die Inflation der 1970er und das Mandat der EZB",
      "Prawdziwy świat: Paul Volcker w walce z wielką inflacją i mandat Europejskiego Banku Centralnego",
    ),
    body: T(
      "In 1979, US Federal Reserve Chair Paul Volcker confronted double-digit inflation by courageously hiking benchmark rates up to 20%, enduring intense political outcry to successfully break inflation expectations and lay the foundation for decades of non-inflationary growth. In Europe, the Treaty on European Union granted the European Central Bank (ECB) in Frankfurt complete statutory independence with a primary constitutional mandate: maintaining price stability.",
      "1979 stemmte sich US-Notenbankchef Paul Volcker gegen zweistellige Inflationsraten, indem er den Leitzins mutig auf bis zu 20% anhob. Trotz heftiger Proteste brach er die Inflationsspirale und schuf das Fundament fuer Jahrzehnte stabilen Wachstums. In Europa garantiert der EU-Vertrag der Europaeischen Zentralbank (EZB) in Frankfurt strikte Unabhaengigkeit mit dem Hauptziel der Preisstabilitaet.",
      "W 1979 roku szef Rezerwy Federalnej USA Paul Volcker stawił czoła dwucyfrowej inflacji, podnosząc stopy procentowe aż do 20%. Mimo ogromnej presji politycznej złamał oczekiwania inflacyjne i stworzył warunki dla dekad stabilnego rozwoju. W Europie traktaty unijne zapewniły Europejskiemu Bankowi Centralnemu (EBC) we Frankfurcie pełną niezależność z głównym celem: ochroną stabilności cen."),
  },
  factCard: {
    claims: [
      { text: T("Walter Bagehot codified the classic central banking principle of 'lender of last resort' in 'Lombard Street' (1873).", "Walter Bagehot formulierte 1873 in 'Lombard Street' das klassische Prinzip der Notenbank als Kreditgeber letzter Instanz.", "Walter Bagehot sformułował klasyczną doktrynę pożyczkodawcy ostatniej instancji w dziele 'Lombard Street' w 1873 roku."), source: "https://www.britannica.com/biography/Walter-Bagehot" },
      { text: T("The European Central Bank (ECB) was established by the Treaty of Amsterdam in 1998, with the primary objective to maintain price stability defined as 2% inflation over the medium term.", "Die EZB wurde 1998 gegruendet, mit dem vorrangigen Ziel der Preisstabilitaet bei 2% mittelfristiger Inflation.", "Europejski Bank Centralny powstał w 1998 roku, a jego nadrzędnym statutowym celem jest utrzymanie inflacji na poziomie 2% w średnim okresie."), source: "https://www.ecb.europa.eu/ecb/tasks/html/index.en.html" },
      { text: T("Milton Friedman and Anna Schwartz demonstrated in 'A Monetary History of the United States' (1963) how monetary contractions worsened the Great Depression.", "Milton Friedman und Anna Schwartz belegten 1963 den Einfluss fehlerhafter Geldmengenpolitik auf die Weltwirtschaftskrise.", "Milton Friedman i Anna Schwartz w 'Monetarnej historii Stanów Zjednoczonych' (1963) wykazali wpływ błędów polityki pieniężnej na Wielki Kryzys."), source: "https://press.princeton.edu/books/paperback/9780691003542/a-monetary-history-of-the-united-states-1867-1960" },
      { text: T("Alberto Alesina and Lawrence Summers published empirical evidence in 1993 showing that central bank independence is strongly correlated with lower and more stable inflation.", "Alesina und Summers bewiesen 1993 empirisch, dass Notenbank-Unabhaengigkeit zu dauerhaft niedrigerer Inflation fuehrt.", "Alberto Alesina i Lawrence Summers w 1993 roku udowodnili empirycznie, że niezależność banków centralnych gwarantuje niższą i bardziej stabilną inflację."), source: "https://www.jstor.org/stable/2117793" },
      { text: T("The Federal Reserve Act of 1913 created the US central banking system following the devastating Panic of 1907.", "Der Federal Reserve Act von 1913 schuf nach der Bankenpanik von 1907 das US-Zentralbanksystem.", "Ustawa o Rezerwie Federalnej z 1913 roku powołała system bankowości centralnej w USA po dotkliwej panice giełdowej w 1907 roku."), source: "https://www.federalreserve.gov/aboutthefed/fract.htm" },
    ],
    simplified: [
      T(
        "Complex monetary aggregate transmission channels and reserve requirements are distilled into intuitive thermostat analogies and clear bank-run protection principles.",
        "Komplexe transmissionspolitische Kanaele und Mindestreservesysteme wurden durch einleuchtende Thermostat- und Schutzschild-Vergleiche fassbar gemacht.",
        "Skomplikowane mechanizmy transmisji monetarnej i stóp rezerwy obowiązkowej wyjaśniono za pomocą czytelnej metafory termostatu oraz tarczy chroniącej banki przed paniką."),
    ],
  },
};
