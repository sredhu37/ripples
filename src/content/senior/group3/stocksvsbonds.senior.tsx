import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function CapitalStructureLaunchDiagram({ lang, step }: DiagramProps) {
  const aaravName = lang === "pl" ? "Adam" : lang === "de" ? "Arne" : "Aarav";
  const label = lang === "pl" ? "Adam i Ania analizują strukturę kapitałową spółki" : lang === "de" ? "Arne und Anna analysieren die Kapitalstruktur" : "Aarav and Anjali analyzing corporate capital structure";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#6366f1" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#1e293b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#4f46e5" stroke="#6366f1" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a5b4fc">{aaravName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#c7d2fe">
          ⚖️ {lang === "pl" ? "Akcje kontra Obligacje: Wybór Inwestora" : lang === "de" ? "Aktien vs. Anleihen: Das Anleger-Dilemma" : "Stocks vs Bonds: The Investor's Choice"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">📈 🆚 🛡️</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#818cf8">
            {lang === "pl" ? "Nieograniczony zysk czy prawna ochrona kapitału?" : lang === "de" ? "Unbegrenztes Wachstum oder fester Zins?" : "Unbounded upside vs guaranteed contractual safety"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#312e81" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Dwa filary nowoczesnych rynków kapitałowych" : lang === "de" ? "Die zwei Saeulen der globalen Finanzmaerkte" : "The Twin Pillars of Global Capital Markets"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#c7d2fe">
            {lang === "pl" ? "Właściciel ryzykuje zyskiem, wierzyciel żąda spłaty długu" : lang === "de" ? "Eigentuemer haften, Glaeubiger verlangen Zins" : "Owners absorb business risk; lenders enforce debt claims"}
          </text>
        </g>
      )}
    </svg>
  );
}

function PriorityWaterfallsDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Hierarchia spłaty (Waterfall) w bilansie spółki" : lang === "de" ? "Die Zahlungskaskade: Wer bekommt bei Pleiten zuerst Geld?" : "Liquidation priority waterfall: debt vs equity";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="40" y="40" width="320" height="42" rx="6" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <text x="60" y="66" fontSize="18">1️⃣</text>
        <text x="90" y="60" fontSize="11" fontWeight="bold" fill="#065f46">Senior Bondholders (Creditors)</text>
        <text x="90" y="74" fontSize="9" fill="#047857">Paid first in full from all liquidated company assets</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="92" width="320" height="42" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="60" y="118" fontSize="18">2️⃣</text>
          <text x="90" y="112" fontSize="11" fontWeight="bold" fill="#b91c1c">Common Stockholders (Equity Owners)</text>
          <text x="90" y="126" fontSize="9" fill="#991b1b">Residual claimants: receive only whatever cash is left over (often $0)</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="148" width="320" height="58" rx="8" fill="#1e293b" />
          <text x="200" y="172" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Obligatariusz ma tarczę prawną, akcjonariusz ma potencjał wzrostu" : lang === "de" ? "Glaeubiger geniessen gesetzlichen Schutz, Aktionaere das Gewinnpotenzial" : "Bonds carry legal seniority; stocks capture compounding expansion"}
          </text>
          <text x="200" y="192" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl" ? "W zamian za bezpieczeństwo obligacja ma ściśle ograniczony sufit zysku" : lang === "de" ? "Fuer hoehere Sicherheit verzichten Anleihen auf Gewinnbeteiligungen" : "Bonds cap your maximum upside in exchange for downside contractual safety"}
          </text>
        </g>
      )}
    </svg>
  );
}

function RiskReturnProfileDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Profil ryzyka i zysku: obligacje a akcje" : lang === "de" ? "Risiko-Rendite-Profil: Aktien vs Anleihen ueber Zeit" : "Risk-return trade-off: fixed yield vs volatile equity compounding";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="150" height="85" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Equities (Stocks)</text>
        <text x="110" y="90" textAnchor="middle" fontSize="14">🚀 🎢</text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">~8-10% Long-term return</text>
        <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#2563eb">High volatility (±30% drops)</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="150" height="85" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">Fixed Income (Bonds)</text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">🛡️ ⚓</text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#065f46">~3-5% Predictable yield</text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#059669">Low drawdowns & steady cash</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#1e293b" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Młodzi inwestorzy wybierają akcje, emeryci przeważają obligacje" : lang === "de" ? "Junge Sparer setzen auf Aktien, Ruhestaendler auf Anleihen" : "Young savers compound via stocks; retirees preserve cash flow via bonds"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl" ? "Horyzont czasowy decyduje o idealnych proporcjach portfela" : lang === "de" ? "Der Anlagehorizont bestimmt die optimale Vermoegensaufteilung" : "Your investment horizon dictates your strategic asset allocation balance"}
          </text>
        </g>
      )}
    </svg>
  );
}

function SixtyFortyPortfolioDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Klasyczny portfel 60/40 i rebalansowanie" : lang === "de" ? "Das klassische 60/40-Portfolio und Rebalancing" : "Classic 60/40 portfolio and rebalancing mechanics";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <circle cx="200" cy="95" r="42" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="200" y="90" textAnchor="middle" fontSize="22">⚖️ 🔄</text>
      <text x="200" y="112" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#15803d">60/40 Balance</text>
      <g>
        <circle cx="85" cy="70" r="28" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="85" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">60% Stocks</text>
        <text x="85" y="84" textAnchor="middle" fontSize="8" fill="#1e40af">Growth Engine</text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="315" cy="70" r="28" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="315" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">40% Bonds</text>
          <text x="315" y="84" textAnchor="middle" fontSize="8" fill="#065f46">Stability Anchor</text>
          <circle cx="200" cy="165" r="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="200" y="163" textAnchor="middle" fontSize="14">🎯</text>
          <text x="200" y="179" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#92400e">Rebalancing</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#15803d" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Rebalansowanie zmusza do automatycznego kupowania tanio i sprzedawania drogo" : lang === "de" ? "Rebalancing zwingt mathematisch zu antizyklischem Kaufen und Verkaufen" : "Rebalancing systematically forces you to buy low and sell high across cycles"}
          </text>
        </g>
      )}
    </svg>
  );
}

function LifecycleAllocationDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Alokacja cyklu życia: od agresywnego wzrostu do ochrony kapitału" : lang === "de" ? "Lebenszyklus-Strategie: Vom Vermoegensaufbau zum Vermoegensschutz" : "Lifecycle asset glidepath: wealth accumulation to capital preservation";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="95" height="85" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="87" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5b21b6">Age 25</text>
        <text x="87" y="90" textAnchor="middle" fontSize="14">🎒 ⚡</text>
        <text x="87" y="110" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#6d28d9">90% Stocks</text>
        <text x="87" y="122" textAnchor="middle" fontSize="8" fill="#7c3aed">10% Bonds</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="152" y="45" width="95" height="85" rx="8" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1.5" />
          <text x="200" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7e22ce">Age 45</text>
          <text x="200" y="90" textAnchor="middle" fontSize="14">💼 🏡</text>
          <text x="200" y="110" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7e22ce">70% Stocks</text>
          <text x="200" y="122" textAnchor="middle" fontSize="8" fill="#9333ea">30% Bonds</text>

          <rect x="265" y="45" width="95" height="85" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="312" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5b21b6">Age 65+</text>
          <text x="312" y="90" textAnchor="middle" fontSize="14">🏖️ ☕</text>
          <text x="312" y="110" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4c1d95">40% Stocks</text>
          <text x="312" y="122" textAnchor="middle" fontSize="8" fill="#6d28d9">60% Bonds</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#581c87" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Połącz silnik akcji z kotwicą obligacji, by stworzyć niezniszczalny portfel" : lang === "de" ? "Kombiniere den Aktienmotor mit dem Anleiheanker fuer dein Lebenswerk" : "Combine equity horsepower with fixed income stability for lifelong financial independence"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#f3e8ff">
            {lang === "pl" ? "Żadna pojedyncza klasa aktywów nie wygrywa w każdych warunkach gospodarczych" : lang === "de" ? "Keine einzelne Anlageklasse glaenzt in allen Konjunkturphasen allein" : "No single asset class dominates across all economic regimes"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [stockWeight, setStockWeight] = useState(60);
  const bondWeight = 100 - stockWeight;
  const portfolioReturn = (stockWeight * 0.09 + bondWeight * 0.04).toFixed(1);
  const maxDrawdown = (stockWeight * 0.35 + bondWeight * 0.05).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Portfolio: {stockWeight}% Stocks / {bondWeight}% Bonds | Expected Return: ~{portfolioReturn}% | Crash Drawdown: -{maxDrawdown}%
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setStockWeight((s) => {
              const next = Math.min(100, s + 20);
              if (next >= 80) onDone?.();
              return next;
            });
          }}
        >
          More Stocks (+Growth)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setStockWeight((s) => Math.max(0, s - 20))}
        >
          More Bonds (+Stability)
        </button>
      </div>
      <div style={{ padding: "12px", background: stockWeight >= 80 ? "#fff1f2" : "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {stockWeight >= 80
          ? `Aggressive Growth: High potential return (~${portfolioReturn}%), but bear markets will drop your balance by -${maxDrawdown}%!`
          : stockWeight <= 20
          ? `Capital Preservation: Extremely stable in crises (-${maxDrawdown}%), but modest long-term return (~${portfolioReturn}%).`
          : `Balanced Engine: The sweet spot (~${portfolioReturn}% return) with cushioned drawdown risk during crashes.`}
      </div>
    </div>
  );
}

function StocksVsBondsWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>If a company files for bankruptcy, who legally gets paid back first from the remaining company assets?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Common stockholders who own shares</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Bondholders and lenders who hold debt claims</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Social media followers with the most likes</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "stocksvsbonds",
  story: [
    animatedBeat(
      [
        T("Meet Aarav and Anjali. Both have saved five thousand dollars to invest for the future, but they face a fundamental choice.", "Das ist Arne und Anna. Beide haben 5.000 Euro gespart, stehen nun aber vor einer grundlegenden Entscheidung.", "Poznaj Adama i Alicję. Oboje zaoszczędzili po dwadzieścia tysięcy złotych na przyszłość, lecz stają przed fundamentalnym wyborem."),
        T("Aarav wants maximum long-term growth and buys shares of common *stocks* in a diversified basket of innovating companies.", "Arne will maximales langfristiges Vermoegenswachstum und investiert in einen weltweiten Korb von *Aktien*.", "Adam pragnie maksymalnego pomnożenia majątku w długim terminie i kupuje *akcje* innowacyjnych firm z całego świata."),
        T("Anjali prioritizes safety and predictable cash flow, purchasing government and high-grade corporate *bonds*.", "Anna setzt auf Kapitalschutz und berechenbare Zinszufluesse und kauft erstklassige *Anleihen*.", "Alicja stawia na bezpieczeństwo kapitału i przewidywalne dochody z odsetek, wybierając bezpieczne *obligacje* skarbowe."),
      ],
      CapitalStructureLaunchDiagram,
    ),
    animatedBeat(
      [
        T("The fundamental legal distinction between stocks and bonds is *equity* versus *debt*.", "Der rechtliche Kernunterschied zwischen Aktien und Anleihen lautet *Eigenkapital* gegen *Fremdkapital*.", "Podstawowa różnica prawna pomiędzy akcjami a obligacjami to *kapitał własny (udziałowy)* kontra *kapitał dłużny*."),
        T("If a business experiences hard times and enters bankruptcy liquidation, the legal payment waterfall is absolute.", "Geraet ein Unternehmen in Schieflage und meldet Insolvenz an, greift die gesetzliche Rangfolge der Auszahlungen.", "Jeśli spółka popadnie w tarapaty finansowe i zostanie zlikwidowana, prawo ściśle określa kolejność spłaty."),
        T("Bondholders are senior creditors paid first from remaining equipment and real estate, while common stockholders are residual claimants who often walk away with zero.", "Anleiheinhaber als Glaeubiger erhalten ihr Geld zuerst aus den Restwerten, waehrend Aktionaere meist leer ausgehen.", "Obligatariusze jako wierzyciele otrzymują zwrot środków w pierwszej kolejności, podczas gdy akcjonariusze często tracą cały wkład."),
      ],
      PriorityWaterfallsDiagram,
    ),
    animatedBeat(
      [
        T("In exchange for bearing greater catastrophic downside risk, equity shareholders receive unlimited upside participation.", "Als Gegenleistung fuer das Verlustrisiko geniessen Aktieninhaber unbegrenzte Chancen auf kuenftige Gewinne.", "W zamian za podjęcie większego ryzyka spadków, akcjonariusze zyskują prawo do nieograniczonego udziału w przyszłych zyskach."),
        T("Over rolling thirty-year horizons, equities historically generate roughly eight to ten percent annualized returns.", "Ueber rollierende 30-Jahres-Perioden erzielten Aktien historisch rund acht bis zehn Prozent Rendite pro Jahr.", "W 30-letnich horyzontach inwestycyjnych akcje przynosiły historycznie średnio od ośmiu do dziesięciu procent rocznie."),
        T("Bonds deliver lower returns, typically three to five percent, but their fixed coupon payments cushion portfolios during economic downturns.", "Anleihen werfen weniger ab (drei bis fuenf Prozent), doch ihre verlaesslichen Zinsen federn Krisen hervorragend ab.", "Obligacje oferują skromniejszy zysk (trzy do pięciu procent), lecz gwarantowany kupon odsetkowy chroni portfel w czasach recesji."),
      ],
      RiskReturnProfileDiagram,
    ),
    animatedBeat(
      [
        T("Generations of institutional investors have combined both assets into the celebrated *60/40 balanced portfolio*.", "Generationen professioneller Vermoegensverwalter kombinieren beide Klassen im bewaehrten *60/40-Portfolio*.", "Pokolenia profesjonalnych inwestorów łączyły obie te klasy w klasyczny *portfel zrównoważony 60/40*."),
        T("Sixty percent stocks provide the compounding horsepower, while forty percent bonds deliver steady liquidity and serenity.", "60 Prozent Aktien dienen als Wachstumsmotor, waehrend 40 Prozent Anleihen fuer Stabilitaet und Liquiditaet sorgen.", "Sześćdziesiąt procent w akcjach stanowi silnik wzrostu, podczas gdy czterdzieści procent w obligacjach zapewnia stabilność i spokój."),
        T("Annual *rebalancing* forces an investor to systematically sell expensive appreciating assets to buy cheaper distressed assets automatically.", "Jaehrliches *Rebalancing* zwingt Anleger mathematisch dazu, teure Gewinner zu stutzen und guenstige Nachzuegler zuzukaufen.", "Coroczne *rebalansowanie* portfela wymusza automatyczną realizację zysków z drożejących aktywów na rzecz tańszych, przecenionych pozycji."),
      ],
      SixtyFortyPortfolioDiagram,
    ),
    animatedBeat(
      [
        T("Your optimal asset allocation shifts naturally across your lifecycle from youth to retirement.", "Die ideale Mischung passt sich im Laufe des Lebens vom Berufsstart bis zum Ruhestand dynamisch an.", "Idealne proporcje akcji i obligacji w Twoim portfelu zmieniają się wraz z upływem lat i cyklem życia."),
        T("In your twenties, with decades of salary ahead, heavy equity exposure harnesses the power of multi-decade compound interest.", "Mit zwanzig Jahren nutzt ein hoher Aktienanteil den Zinseszins ueber Jahrzehnte voll aus, weil Zeit Kursschwaechen heilt.", "Mając dwadzieścia lat i całe życie zawodowe przed sobą, warto przeważać akcje, by maksymalnie wykorzystać procent składany."),
        T("As retirement approaches, increasing bond weights locks in accumulated wealth and ensures dependable living expenses.", "Kurz vor der Rente sichert ein hoeherer Anleiheanteil das Ersparte ab und finanziert verlaesslich den Lebensunterhalt.", "W miarę zbliżania się do emerytury zwiększenie udziału obligacji chroni zgromadzony majątek i gwarantuje comiesięczną wypłatę odsetek."),
      ],
      LifecycleAllocationDiagram,
    ),
  ],
  toyIntro: T(
    "Construct your asset allocation: shift weights between stocks and bonds to see how return potential trades off against crisis drawdown risk.",
    "Stelle dein Portfolio zusammen: Verschiebe Gewichte zwischen Aktien und Anleihen, um Renditepotenzial gegen Verlustrisiko abzuwaegen.",
    "Skomponuj własną alokację aktywów: zmieniaj wagi akcji i obligacji, obserwując zależność między oczekiwanym zyskiem a ryzykiem obsunięcia kapitału."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why do corporate bondholders get repaid before common stockholders during corporate bankruptcy liquidation?",
        "Warum werden Anleiheglaeubiger bei einer Firmeninsolvenz vor den Stammaktionaeren bedient?",
        "Dlaczego obligatariusze spółki otrzymują zwrot środków przed akcjonariuszami zwykłymi w przypadku likwidacji upadłościowej?",
      ),
      options: [
        { text: T("Bonds represent legally enforceable debt with senior creditor status, whereas stock shares represent subordinate residual equity ownership", "Anleihen sind rechtlich verbindliche Schulden mit Vorrang, waehrend Aktien nachrangiges Eigenkapital darstellen", "Obligacje stanowią prawnie wiążące zobowiązanie dłużne z pierwszeństwem spłaty, podczas gdy akcje to kapitał własny o najniższym priorytecie zaspokojenia"), correct: true },
        { text: T("Because bond certificates are printed on heavier, waterproof cotton paper", "Weil Anleiheurkunden auf schwererem, wasserfestem Papier gedruckt sind", "Ponieważ certyfikaty obligacji są drukowane na grubszym, wodoodpornym papierze"), correct: false },
        { text: T("Stockholders are automatically exempt from all bankruptcy court hearings", "Aktionaere sind von Insolvenzverfahren gesetzlich immer ausgenommen", "Akcjonariusze są ustawowo zwolnieni z udziału w postępowaniach upadłościowych"), correct: false },
      ],
      hint: T(
        "Remember the difference between being a lender who loaned money vs a business owner who took entrepreneurial risk.",
        "Denke an den Unterschied zwischen einem Geldgeber, der Kredit gewaehrt, und einem Eigentuemer, der das unternehmerische Risiko traegt.",
        "Pamiętaj o różnicy między wierzycielem pożyczającym kapitał a właścicielem podejmującym ryzyko biznesowe."),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the mathematical benefit of 'portfolio rebalancing' across stocks and bonds over decades?",
        "Welcher mathematische Vorteil entsteht durch regelmaessiges Rebalancing zwischen Aktien und Anleihen?",
        "Jaka jest matematyczna korzyść z okresowego 'rebalansowania portfela' akcji i obligacji na przestrzeni lat?",
      ),
      options: [
        { text: T("It enforces disciplined profit-taking on rallying assets and buys undervalued declining assets, maintaining intended risk levels", "Es zwingt diszipliniert zu Gewinnmitnahmen bei teuren Werten und kauft guenstig nach, um das Risikoprofil stabil zu halten", "Wymusza dyscyplinę w realizacji zysków z drożejących aktywów i dokupowaniu przecenionych pozycji, utrzymując pożądany poziom ryzyka"), correct: true },
        { text: T("It completely guarantees that a portfolio can never lose money in any single month", "Es garantiert, dass ein Depot in keinem einzigen Monat jemals einen Cent verliert", "Daje stuprocentową gwarancję, że portfel nie straci ani grosza w żadnym pojedynczym miesiącu"), correct: false },
        { text: T("It cancels all international currency exchange rates forever", "Es hebt saemtliche weltweiten Wechselkurse fuer immer auf", "Całkowicie znosi wahania wszystkich kursów walutowych na świecie"), correct: false },
      ],
      hint: T(
        "Think about what you do when stocks double in value: you sell a bit of stocks to buy cheaper bonds.",
        "Ueberlege, was passiert, wenn Aktien stark steigen: Du verkaufst einen Teil der Gewinne und kaufst guenstige Anleihen.",
        "Zastanów się, co robisz, gdy akcje gwałtownie drożeją: sprzedajesz część z nich, by dokupić tańsze obligacje."),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the legal priority order between debt holders and equity holders in corporate finance.",
        "Bestimme die rechtliche Rangfolge von Fremdkapital und Eigenkapital bei Zahlungsverzug.",
        "Wskaż ustawową hierarchię zaspokojenia roszczeń wierzycieli i akcjonariuszy spółki.",
      ),
      Widget: StocksVsBondsWidget,
      hint: T(
        "Think about who loaned money to the company versus who owns the company.",
        "Ueberlege, wer dem Unternehmen Geld geliehen hat und wer das Unternehmen besitzt.",
        "Pomyśl, kto pożyczył firmie pieniądze na procent, a kto jest jej współwłaścicielem."),
    },
  ],
  askDad: T(
    "Ask your parent: What percentage split between stocks and bonds do they target in their investments, and how often do they rebalance?",
    "Frage deine Eltern: Welche prozentuale Aufteilung zwischen Aktien und Anleihen streben sie an, und wie oft bringen sie das Depot wieder ins Gleichgewicht?",
    "Zapytaj rodziców: Jaki podział procentowy między akcje a obligacje stosują w swoich oszczędnościach i jak często dokonują rebalansowania portfela?"),
  realLife: {
    title: T(
      "Real world: Norway's Government Pension Fund Global (Oil Fund) allocation",
      "Echte Welt: Die Vermoegensaufteilung des staatlichen norwegischen Oelfonds",
      "Prawdziwy świat: Alokacja aktywów w Norweskim Państwowym Funduszu Emerytalnym (NBIM)",
    ),
    body: T(
      "Norway's sovereign wealth fund (Norges Bank Investment Management), managing over 1.6 trillion dollars for future generations, adheres to a strict statutory asset allocation: roughly 70% in global public equities, 27% in fixed income bonds, and 3% in real estate and renewable infrastructure. When stock markets drop during recessions, the fund methodically sells stable bonds to buy discounted world shares, capturing historic rebound windfalls.",
      "Der staatliche Oelfonds Norwegens verwaltet ueber 1,6 Billionen Dollar fuer kommende Generationen nach einer klaren Formel: rund 70% Weltaktien, 27% erstklassige Anleihen und 3% Immobilien und Infrastruktur. In Boersenkrisen verkauft der Fonds Anleihen, um guenstige Aktien nachzukaufen, und profitiert so maximal vom spaeteren Aufschwung.",
      "Norweski Państwowy Fundusz Emerytalny (NBIM), zarządzający kapitałem ponad 1,6 biliona dolarów na rzecz przyszłych pokoleń, stosuje precyzyjną alokację: ok. 70% w globalnych akcjach, 27% w obligacjach i 3% w nieruchomościach oraz OZE. W czasie krachu na giełdach fundusz systematycznie sprzedaje obligacje, dokupując tanie akcje, co przynosi potężne zyski w fazie ożywienia."),
  },
  factCard: {
    claims: [
      { text: T("Harry Markowitz founded Modern Portfolio Theory in his seminal 1952 Journal of Finance paper, demonstrating mathematical risk reduction through asset diversification.", "Harry Markowitz begruendete 1952 die Moderne Portfoliotheorie und bewies mathematisch die Risikominimierung durch Streuung unkorrelierter Anlageklassen.", "Harry Markowitz stworzył Nowoczesną Teorię Portfelową w pracy z 1952 roku, udowadniając matematycznie spadek ryzyka dzięki dywersyfikacji aktywów."), source: "https://www.jstor.org/stable/2975974" },
      { text: T("Norges Bank Investment Management (NBIM) manages Norway's Government Pension Fund Global with a legally bound mandate allocating 70% equities and 30% fixed income.", "Norges Bank Investment Management steuert den norwegischen Staatsfonds mit einer gesetzlichen Zielquote von 70% Aktien und rund 30% Anleihen.", "Norges Bank Investment Management zarządza Norweskim Funduszem Naftowym w oparciu o ustawowy mandat nakazujący utrzymywanie 70% akcji i 30% obligacji."), source: "https://www.nbim.no/en/the-fund/how-we-invest/investment-mandate/" },
      { text: T("The Credit Suisse (now UBS) Global Investment Returns Yearbook documents long-term real annual returns of 5.3% for world equities vs 2.0% for world bonds from 1900 to 2023.", "Das UBS Global Investment Returns Yearbook belegt reale Renditen von 5,3% p.a. fuer Weltaktien gegenueber 2,0% fuer Staatsanleihen von 1900 bis 2023.", "UBS Global Investment Returns Yearbook wykazuje, że w latach 1900-2023 globalne akcje przynosiły realnie 5,3% rocznie wobec 2,0% z obligacji skarbowych."), source: "https://www.ubs.com/global/en/wealth-management/our-approach/market-news/article.1611762.html" },
      { text: T("Standard corporate bankruptcy insolvency codes (such as US Chapter 11 and German Insolvenzordnung) establish strict absolute priority rules favoring secured and senior debt over common equity.", "Insolvenzordnungen (wie die deutsche InsO oder US Chapter 11) schreiben den gesetzlichen Vorrang von Fremdkapital vor Eigenkapital strikt vor.", "Przepisy prawa upadłościowego w Polsce, Niemczech i USA bezwzględnie nakazują zaspokojenie roszczeń wierzycieli dłużnych przed wypłatą środków akcjonariuszom."), source: "https://www.gesetze-im-internet.de/inso/" },
      { text: T("The Vanguard Group's historical research on portfolio rebalancing shows systematic annual threshold rebalancing improves risk-adjusted returns (Sharpe ratio) over multi-decade cycles.", "Studien der Vanguard Group belegen, dass diszipliniertes Rebalancing das Chance-Risiko-Verhaeltnis (Sharpe Ratio) ueber Dekaden messbar steigert.", "Badania Vanguard Group dowodzą, że systematyczne rebalansowanie portfela podnosi wskaźnik Sharpe'a (relację zysku do ryzyka) na przestrzeni dekad."), source: "https://corporate.vanguard.com/content/dam/corp/research/pdf/rebalancing-a-survey-of-strategies.pdf" },
    ],
    simplified: [
      T(
        "Complex capital structures with preferred equity, convertible notes, mezzanine financing, and subordinated tranches are framed through the clear senior bondholder vs common stockholder dichotomy.",
        "Komplexe Mezzanine- und Wandelanleihestrukturen wurden auf den grundlegenden Kontrast zwischen vorrangigen Glaeubigern und Aktionaeren fokussiert.",
        "Skomplikowane struktury długu podporządkowanego, obligacji zamiennych i kapitału hybrydowego uproszczono do czytelnego zestawienia pozycji wierzyciela i akcjonariusza."),
    ],
  },
};
