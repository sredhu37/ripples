import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function BondContractLaunchDiagram({ lang, step }: DiagramProps) {
  const karanName = lang === "pl" ? "Kamil" : lang === "de" ? "Klaus" : "Karan";
  const label = lang === "pl" ? "Kamil analizuje obligację komunalną na budowę mostu" : lang === "de" ? "Klaus prueft eine Kommunalanleihe fuer einen Brueckenbau" : "Karan inspecting municipal infrastructure bond certificate";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#10b981" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#1e293b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#059669" stroke="#10b981" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#34d399">{karanName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#a7f3d0">
          📜 {lang === "pl" ? "Obligacja: Prawna Umowa Pożyczki" : lang === "de" ? "Anleihe: Fester Schuldschein" : "Bond: Formal Debt Contract"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#059669" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">🏛️ 🌉 💶</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#6ee7b7">
            {lang === "pl" ? "Wartość nominalna: 1 000 zł | Kupon: 5% rocznie" : lang === "de" ? "Nennwert: 1.000 € | Kupon: 5% p.a." : "Principal: $1,000 | Coupon: 5% annual"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#047857" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Jesteś wierzycielem, nie udziałowcem!" : lang === "de" ? "Du bist Glaeubiger, nicht Miteigentuemer!" : "You are a lender, not an owner!"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#d1fae5">
            {lang === "pl" ? "Miasto ma prawny obowiązek spłaty odsetek" : lang === "de" ? "Feste Zinsgarantie bis zum Faelligkeitstag" : "Legal obligation to repay principal at maturity"}
          </text>
        </g>
      )}
    </svg>
  );
}

function BondAnatomyDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Budowa obligacji: nominał, kupon i termin zapadalności" : lang === "de" ? "Anatomie einer Anleihe: Nennwert, Kupon und Faelligkeit" : "Anatomy of a bond: principal, coupon rate, and maturity date";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="95" height="85" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="82" y="70" textAnchor="middle" fontSize="14">💵</text>
        <text x="82" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af">Nominal</text>
        <text x="82" y="108" textAnchor="middle" fontSize="9" fill="#1e40af">$1,000 Par</text>
        <text x="82" y="120" textAnchor="middle" fontSize="8" fill="#2563eb">Borrowed sum</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="152" y="45" width="95" height="85" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="200" y="70" textAnchor="middle" fontSize="14">📅</text>
          <text x="200" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065f46">Coupon</text>
          <text x="200" y="108" textAnchor="middle" fontSize="9" fill="#065f46">$50 / year</text>
          <text x="200" y="120" textAnchor="middle" fontSize="8" fill="#059669">5% regular cash</text>

          <rect x="270" y="45" width="95" height="85" rx="8" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5" />
          <text x="317" y="70" textAnchor="middle" fontSize="14">🏁</text>
          <text x="317" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">Maturity</text>
          <text x="317" y="108" textAnchor="middle" fontSize="9" fill="#92400e">10 Years</text>
          <text x="317" y="120" textAnchor="middle" fontSize="8" fill="#d97706">Full principal returned</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="35" y="150" width="330" height="55" rx="8" fill="#1e293b" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Obligacja to stały dochód (Fixed Income) z przewidywalnym harmonogramem spłat" : lang === "de" ? "Anleihen bieten feste Zinsertraege mit planbaren Rueckzahlungen" : "Bonds are known as Fixed Income: predictable and legally senior to stocks"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl" ? "W razie problemów firmy pożyczkodawcy otrzymują pieniądze przed akcjonariuszami" : lang === "de" ? "Glaeubiger werden im Insolvenzfall vor den Aktionaeren bedient" : "Lenders stand first in line before equity owners in liquidation"}
          </text>
        </g>
      )}
    </svg>
  );
}

function InterestRateSeesawDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Huśtawka stóp procentowych i cen obligacji" : lang === "de" ? "Die Zinswippe: Steigen Zinsen, fallen bestehende Anleihekurse" : "The bond seesaw: interest rates rise, bond prices fall";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
      <g>
        <line x1="80" y1="80" x2="320" y2="160" stroke="#e11d48" strokeWidth="6" strokeLinecap="round" />
        <polygon points="200,120 185,160 215,160" fill="#334155" />
        <circle cx="80" cy="80" r="24" fill="#fee2e2" stroke="#be123c" strokeWidth="2" />
        <text x="80" y="78" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be123c">Rates</text>
        <text x="80" y="92" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9f1239">▲ 6%</text>

        <circle cx="320" cy="160" r="24" fill="#fee2e2" stroke="#be123c" strokeWidth="2" />
        <text x="320" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be123c">Price</text>
        <text x="320" y="172" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9f1239">▼ $850</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="60" y="25" width="280" height="30" rx="6" fill="#fff" stroke="#e11d48" strokeWidth="1.5" />
          <text x="200" y="45" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#9f1239">
            {lang === "pl" ? "Stara obligacja 3% traci na wartości, gdy nowe dają 6%" : lang === "de" ? "Aeltere 3%-Papiere verlieren an Wert, wenn neue 6% bieten" : "Existing 3% bonds drop in value when new bonds pay 6%"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="25" rx="4" fill="#be123c" />
          <text x="200" y="212" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Ceny obligacji i rynkowe stopy procentowe zawsze poruszają się w przeciwnych kierunkach" : lang === "de" ? "Anleihekurse und Marktzinsen bewegen sich stets entgegengesetzt" : "Bond prices and market interest rates always move in opposite directions"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CreditRatingSpectrumDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Ratingi kredytowe od AAA do obligacji wysokodochodowych (Junk)" : lang === "de" ? "Bonitaetsnoten von AAA (Bundesanleihen) bis High-Yield" : "Credit rating spectrum from AAA sovereign to High Yield";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="150" height="85" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">AAA Sovereign (Bunds)</text>
        <text x="110" y="90" textAnchor="middle" fontSize="14">🛡️ 🏛️</text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#166534">Lowest default risk</text>
        <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#15803d">Lower coupon yield (2.5%)</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="150" height="85" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">High Yield (BB/B Junk)</text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">⚠️ 💥</text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">Real risk of default</text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">Demands 9% coupon spread</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#1e293b" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Im wyższe ryzyko bankructwa dłużnika, tym wyższy kupon odsetkowy musi zaoferować" : lang === "de" ? "Je hoeher das Ausfallrisiko, desto mehr Zinsaufschlag verlangen Anleger" : "Credit spread: Higher default risk demands higher coupon compensation"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl" ? "Agencje ratingowe (Moody's, S&P, Fitch) oceniają wiarygodność emitentów" : lang === "de" ? "Ratingagenturen bewerten die Rueckzahlungsfaehigkeit weltweit" : "Independent agencies evaluate borrower solvency and balance sheet health"}
          </text>
        </g>
      )}
    </svg>
  );
}

function RoleInPortfolioDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Rola obligacji w portfelu: stabilizacja i amortyzacja spadków" : lang === "de" ? "Rolle von Anleihen: Stabilitaetsanker im Portfolio" : "Bonds as portfolio shock absorber and capital preserver";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <circle cx="200" cy="95" r="42" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="200" y="90" textAnchor="middle" fontSize="22">⚓ 🛡️</text>
      <text x="200" y="112" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#15803d">Shock Absorber</text>
      <g>
        <circle cx="85" cy="70" r="28" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="85" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Stocks (60%)</text>
        <text x="85" y="84" textAnchor="middle" fontSize="8" fill="#1e40af">Engine</text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="315" cy="70" r="28" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="315" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">Bonds (40%)</text>
          <text x="315" y="84" textAnchor="middle" fontSize="8" fill="#065f46">Anchor</text>
          <circle cx="200" cy="165" r="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="200" y="163" textAnchor="middle" fontSize="14">🧘</text>
          <text x="200" y="179" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#92400e">Smooth Ride</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#15803d" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Obligacje przynoszą spokój i gotówkę, gdy rynki akcji przeżywają burzę" : lang === "de" ? "Anleihen daempfen Schwankungen und liefern berechenbare Zinszufluesse" : "Bonds cushion drawdown shocks and provide guaranteed liquidity in market storms"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [interestRate, setInterestRate] = useState(3);
  const coupon = 40;
  const bondPrice = Math.round((coupon / (interestRate / 100)));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Market Interest Rate: {interestRate}% | Existing Bond Price: ${bondPrice} (Original $1,000 Par)
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setInterestRate((r) => {
              const next = Math.min(8, r + 1);
              if (next >= 6) onDone?.();
              return next;
            });
          }}
        >
          Hike Interest Rate (+1%)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setInterestRate((r) => Math.max(1, r - 1))}
        >
          Cut Interest Rate (-1%)
        </button>
      </div>
      <div style={{ padding: "12px", background: interestRate >= 5 ? "#fee2e2" : "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {interestRate > 4
          ? `Rates rose to ${interestRate}%! Newly issued bonds pay higher yields, so your older 4% bond dropped to $${bondPrice}.`
          : interestRate < 4
          ? `Rates dropped to ${interestRate}%! Your generous 4% coupon bond is in huge demand, trading at a premium price of $${bondPrice}!`
          : "Market rates match your coupon rate: bond trades exactly at $1,000 par."}
      </div>
    </div>
  );
}

function BondsWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>If prevailing market interest rates rise across the economy, what happens to the market price of existing fixed-rate bonds?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Their prices immediately rise because higher rates make everything expensive</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Their prices fall because newly issued bonds offer higher, more attractive interest rates</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>All existing bonds are automatically canceled by the government</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "bonds",
  story: [
    animatedBeat(
      [
        T("Meet Karan. His city plans to build a new light rail bridge across the river to reduce traffic jams.", "Das ist Klaus. Seine Stadt will eine neue Bruecke fuer die Strassenbahn bauen, um den Verkehr zu entlasten.", "Poznaj Kamila. Jego miasto planuje budowę nowego mostu tramwajowego na rzece, aby rozładować korki uliczne."),
        T("Rather than raising taxes immediately, the city government issues municipal *bonds* to fund the multi-million dollar construction.", "Statt sofort Steuern zu erhoehen, gibt die Stadt *Anleihen* aus, um den millionenschweren Bau zu finanzieren.", "Zamiast natychmiast podnosić podatki, władze miasta emitują *obligacje komunalne*, by sfinansować kosztowną inwestycję."),
        T("Karan buys one bond for one thousand dollars, lending his money directly to the city in exchange for legally guaranteed interest.", "Klaus kauft eine Anleihe fuer 1.000 Euro: Er leiht der Stadt sein Geld gegen gesetzlich garantierte Zinszahlungen.", "Kamil kupuje jedną obligację za tysiąc złotych, pożyczając pieniądze miastu w zamian za gwarantowane odsetki."),
      ],
      BondContractLaunchDiagram,
    ),
    animatedBeat(
      [
        T("Every bond consists of three core terms: the *principal* (face value), the *coupon rate*, and the *maturity date*.", "Jede Anleihe basiert auf drei Kernbegriffen: dem *Nennwert*, dem *Kupongszins* und dem *Faelligkeitsdatum*.", "Każda obligacja opiera się na trzech kluczowych parametrach: *wartości nominalnej*, *oprocentowaniu kuponowym* oraz *terminie zapadalności*."),
        T("The coupon pays Karan fifty dollars in cash each year (a five percent yield), mailed or transferred directly to his account.", "Der Kupon zahlt Klaus verlaesslich 50 Euro pro Jahr (fuenf Prozent Zins), direkt auf sein Bankkonto.", "Kupon gwarantuje Kamilowi wypłatę pięćdziesięciu złotych rocznie (pięcioprocentowy zysk), przelewanych regularnie na konto."),
        T("At maturity in ten years, the city is legally obligated to return his full one thousand dollars principal.", "Nach genau zehn Jahren muss die Stadt ihm den vollstaendigen Nennwert von 1.000 Euro zurueckzahlen.", "W dniu wykupu po dziesięciu latach miasto ma prawny obowiązek zwrócić mu cały wniesiony kapitał tysiąca złotych."),
      ],
      BondAnatomyDiagram,
    ),
    animatedBeat(
      [
        T("If Karan wants to sell his bond before ten years are up, he enters the dynamic secondary bond market.", "Moechte Klaus seine Anleihe vor Ablauf der zehn Jahre verkaufen, bietet er sie am freien Rentenmarkt an.", "Jeśli Kamil zechce odsprzedać obligację przed upływem dziesięciu lat, wystawia ją na wtórnym rynku długu."),
        T("Here, bond prices and prevailing interest rates move like a seesaw in opposite directions.", "Dort bewegen sich Anleihekurse und Marktzinsen wie eine Wippe stets gegenlaeufig zueinander.", "Tutaj ceny obligacji i rynkowe stopy procentowe zachowują się jak dziecięca huśtawka: poruszają się w przeciwnych kierunkach."),
        T("When central banks hike interest rates to seven percent, older bonds paying only five percent drop in price to attract buyers.", "Hebt die Zentralbank die Leitzinsen auf sieben Prozent an, sinkt der Kurs aelterer 5%-Anleihen, um Kaeufer zu locken.", "Gdy bank centralny podnosi stopy procentowe do siedmiu procent, stare obligacje z pięcioprocentowym kuponem tanieją na giełdzie."),
      ],
      InterestRateSeesawDiagram,
    ),
    animatedBeat(
      [
        T("Not all borrowers are equally reliable: bond markets evaluate borrower trustworthiness through *credit ratings*.", "Nicht jeder Schuldner ist gleich solvent: Ratingagenturen vergeben strenge *Bonitaetsnoten* von AAA bis Junk.", "Nie każdy dłużnik jest tak samo wiarygodny: rynki obligacji oceniają wypłacalność za pomocą *ratingów kredytowych*."),
        T("German government Bunds carry AAA ratings with almost zero default risk, accepting lower coupon yields for safety.", "Deutsche Bundesanleihen besitzen die Bestnote AAA: fast kein Ausfallrisiko, dafuer aber moderate Zinsen.", "Obligacje rządu Niemiec mają najwyższą notę AAA i niemal zerowe ryzyko niewypłacalności, oferując umiarkowany kupon."),
        T("Struggling speculative corporations issue *high-yield (junk) bonds*, paying nine or ten percent to compensate lenders for substantial default hazard.", "Riskante Unternehmen muessen fuer Hochzinsanleihen (Junk Bonds) neun oder zehn Prozent Zins bieten, um das Pleiterisiko auszugleichen.", "Ryzykowne korporacje emitują *obligacje śmieciowe (high-yield)*, oferując wysokie odsetki, aby zrekompensować inwestorom widmo bankructwa."),
      ],
      CreditRatingSpectrumDiagram,
    ),
    animatedBeat(
      [
        T("In a balanced investment portfolio, bonds act as the vital shock-absorbing anchor alongside volatile equities.", "In einem ausgewogenen Portfolio wirken Anleihen wie ein ruhiger Sicherheitsanker neben schwankenden Aktien.", "W zrównoważonym portfelu inwestycyjnym obligacje pełnią rolę amortyzatora i stabilizatora obok zmiennych akcji."),
        T("When stock markets crash during recessions, high-quality government bonds preserve principal and generate steady cash.", "Wenn Aktienmaerkte in einer Krise einbrechen, schuetzen solide Staatsanleihen das Vermoegen und bringen verlaessliche Ertraege.", "Gdy rynki akcji załamują się w czasie recesji, obligacje skarbowe chronią kapitał i przynoszą nieprzerwany dopływ gotówki."),
        T("Mastering bonds teaches you how the world immense multi-trillion dollar debt machinery powers economies and finances civil infrastructure.", "Wer Anleihen versteht, begreift das globale Kreditsystem, das Staaten finanziert und Bruecken, Bahnlinien und Schulen ermoeglicht.", "Zrozumienie rynku obligacji pozwala pojąć, jak wielobilionowy mechanizm dłużny napędza inwestycje infrastrukturalne państw i miast."),
      ],
      RoleInPortfolioDiagram,
    ),
  ],
  toyIntro: T(
    "Operate the interest rate seesaw: raise and cut market interest rates to see how existing bond trading prices react.",
    "Bediene die Zinswippe: Hebe und senke das Zinsniveau, um zu sehen, wie die Kurse bestehender Anleihen schwanken.",
    "Sprawdź działanie huśtawki stóp procentowych: podnoś i obniżaj stopy rynkowe, obserwując reakcję cen wyemitowanych obligacji."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why do prices of existing fixed-rate bonds drop when prevailing market interest rates increase?",
        "Warum fallen die Kurse bestehender Festzinsanleihen, wenn die Zinsen am Gesamtmarkt steigen?",
        "Dlaczego rynkowe ceny dotychczas wyemitowanych obligacji o stałym kuponie spadają, gdy rosną stopy procentowe?",
      ),
      options: [
        { text: T("Because newly issued bonds in the market offer higher coupon yields, making older lower-rate bonds less attractive unless discounted", "Weil neu ausgegebene Anleihen hoehere Zinsen bieten und aeltere Papiere nur mit Kursabschlag Kaeufer finden", "Ponieważ nowo emitowane obligacje oferują wyższe odsetki, przez co starsze papiery stają się atrakcyjne dopiero po obniżeniu ich ceny"), correct: true },
        { text: T("Because the printing ink on older paper bond certificates begins to fade", "Weil die Drucktinte auf den aelteren Papierurkundenn langsam verblasst", "Ponieważ tusz drukarski na starszych dokumentach dłużnych zaczyna blaknąć"), correct: false },
        { text: T("Because governments force banks to close all existing bond accounts", "Weil Staaten die Banken zwingen, alle Anleihekonten sofort aufzuloesen", "Ponieważ rządy nakazują bankom natychmiastowe zamknięcie wszystkich rachunków obligacyjnych"), correct: false },
      ],
      hint: T(
        "Compare an old bond paying 3% against a brand new bond paying 6%. Which one would an investor buy at full price?",
        "Vergleiche ein altes Papier mit 3% Zins mit einem brandneuen zu 6%. Welches wuerdest du zum vollen Preis kaufen?",
        "Porównaj starą obligację dającą 3% z nową dającą 6%. Którą z nich kupiłby inwestor po cenie nominalnej?"),
    },
    {
      kind: "choice",
      prompt: T(
        "What legal standing does a bondholder hold in a corporation compared to a common stockholder?",
        "Welche rechtliche Position hat ein Anleiheglaeubiger im Vergleich zu einem Aktionaer?",
        "Jaka jest pozycja prawna posiadacza obligacji w porównaniu z akcjonariuszem korporacji?",
      ),
      options: [
        { text: T("The bondholder is a creditor with senior legal priority for repayment before stockholders receive any residual assets", "Der Anleiheinhaber ist ein vorrangiger Glaeubiger, der vor den Aktionaeren bedient werden muss", "Posiadacz obligacji jest wierzycielem mającym ustawowe pierwszeństwo spłaty długu przed akcjonariuszami"), correct: true },
        { text: T("The bondholder is personally responsible for paying all employee salaries", "Der Anleiheinhaber haftet persoenlich fuer saemtliche Gehaelter der Angestellten", "Posiadacz obligacji odpowiada osobiście własnym majątkiem za wypłaty pracowników"), correct: false },
        { text: T("The bondholder must clean the corporate headquarters once a week", "Der Anleiheinhaber muss einmal pro Woche das Firmengebaeude reinigen", "Posiadacz obligacji ma obowiązek sprzątania siedziby firmy raz w tygodniu"), correct: false },
      ],
      hint: T(
        "Remember the fundamental difference between lending debt money vs owning equity risk.",
        "Denke an den Unterschied zwischen geliehenem Fremdkapital (Glaeubiger) und Eigenkapital (Miteigentuemer).",
        "Pamiętaj o fundamentalnej różnicy między udzieleniem pożyczki (dług) a ryzykiem współwłasności (kapitał własny)."),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the relationship between interest rate changes and existing bond valuations.",
        "Bestimme den Zusammenhang zwischen Marktzinsen und den Kursen bestehender Anleihen.",
        "Wskaż zależność między zmianami stóp procentowych a wyceną wyemitowanych obligacji.",
      ),
      Widget: BondsWidget,
      hint: T(
        "Remember the seesaw: when one side goes up, the opposite side must go down.",
        "Denke an die Wippe: Geht die eine Seite hoch, bewegt sich die andere zwingend nach unten.",
        "Pamiętaj o huśtawce: gdy jedno ramię idzie w górę, drugie natychmiast opada."),
    },
  ],
  askDad: T(
    "Ask your parent: Do they hold fixed-income bonds or bond index funds in their savings portfolio to protect against stock market volatility?",
    "Frage deine Eltern: Halten sie Staats- oder Unternehmensanleihen in ihrem Depot, um Boersenschwankungen abzufedern?",
    "Zapytaj rodziców: Czy posiadają w portfelu obligacje skarbowe lub fundusze obligacji, by amortyzować spadki na giełdzie?"),
  realLife: {
    title: T(
      "Real world: German Bundesanleihen and Poland's retail treasury savings bonds",
      "Echte Welt: Deutsche Bundesanleihen und polnische Staats-Sparbriefe",
      "Prawdziwy świat: Niemieckie obligacje skarbowe (Bunds) i polskie obligacje detaliczne (COI/EDO)",
    ),
    body: T(
      "Germany issues benchmark 10-year Bunds that serve as the risk-free rate reference for all European debt markets. Meanwhile, the Polish Ministry of Finance offers popular multi-year inflation-indexed retail bonds (like 4-year COI and 10-year EDO) directly to citizens, guaranteeing an interest coupon that floats above official annual CPI inflation plus a fixed margin.",
      "Deutschland emittiert 10-Jaehrige Bundesanleihen, die europaweit als Massstab fuer risikolosen Zins gelten. In Polen bietet das Finanzministerium inflationsgeschuetzte Sparbriefe (wie 4-Jaehrige COI oder 10-Jaehrige EDO) direkt Buergern an, die einen Zins ueber der amtlichen Teuerungsrate garantieren.",
      "Niemcy emitują 10-letnie obligacje federalne (Bunds), będące punktem odniesienia dla bezpiecznej stopy procentowej w Europie. Z kolei w Polsce Ministerstwo Finansów oferuje popularne obligacje indeksowane inflacją (np. 4-letnie COI i 10-letnie EDO), gwarantujące zysk powyżej wskaźnika inflacji powiększony o marżę."),
  },
  factCard: {
    claims: [
      { text: T("The Bank of England issued the first modern perpetual sovereign bonds (Consols) in 1751 to consolidate British national debt.", "Die Bank of England legte 1751 mit den 'Consols' die ersten modernen ewigen Staatsanleihen zur Umschuldung auf.", "Bank Anglii wyemitował w 1751 roku obligacje wieczyste (Consols) w celu konsolidacji długu publicznego Wielkiej Brytanii."), source: "https://www.bankofengland.co.uk/explainers/what-are-gilts" },
      { text: T("The International Capital Market Association (ICMA) estimated the global bond market size exceeded $130 trillion USD in 2023.", "Die International Capital Market Association (ICMA) schaetzt das globale Anleihevolumen auf ueber 130 Billionen US-Dollar (2023).", "Międzynarodowe Stowarzyszenie Rynków Kapitałowych (ICMA) oszacowało globalną wartość rynku obligacji na ponad 130 bilionów dolarów w 2023 roku."), source: "https://www.icmagroup.org/market-practice-and-regulatory-policy/secondary-markets/bond-market-size/" },
      { text: T("The German Federal Republic's Finance Agency (Finanzagentur) manages the issuance of sovereign Bunds and Bobls on behalf of the federal government.", "Die Bundesrepublik Deutschland Finanzagentur GmbH steuert im Auftrag des Bundes die Emission von Bundesanleihen.", "Niemiecka Agencja Finansowa (Finanzagentur) zarządza emisją federalnych obligacji skarbowych (Bunds i Bobls)."), source: "https://www.deutsche-finanzagentur.de/en/federal-securities" },
      { text: T("Poland's Ministry of Finance issues inflation-linked retail treasury savings bonds with coupons linked directly to GUS CPI inflation metrics.", "Das polnische Finanzministerium emittiert inflationsindexierte Sparbriefe mit direkter Kopplung an die amtliche Teuerungsrate.", "Ministerstwo Finansów RP oferuje detaliczne obligacje skarbowe, których oprocentowanie jest wprost powiązane z inflacją CPI publikowaną przez GUS."), source: "https://www.obligacjeskarbowe.pl/" },
      { text: T("Frederick Macaulay formulated the concept of bond duration in 1938 to measure the sensitivity of a bond's price to interest rate fluctuations.", "Frederick Macaulay entwickelte 1938 das Konzept der Duration zur Messung der Zinsreagibilitaet von Anleihekursen.", "Frederick Macaulay sformułował w 1938 roku pojęcie duration (czasu trwania), mierzące wrażliwość ceny obligacji na zmiany stóp procentowych."), source: "https://www.nber.org/books-and-chapters/movements-interest-rates-bond-yields-and-stock-prices-united-states-1856" },
    ],
    simplified: [
      T(
        "Complex yield-to-maturity (YTM) calculus and convexities are simplified into an intuitive seesaw relationship between price and interest rates.",
        "Komplexe Renditeberechnungen (Yield to Maturity) und Konvexitaeten wurden anhand der intuitiven Zinswippe veranschaulicht.",
        "Złożone obliczenia rentowności do wykupu (YTM) i wypukłości uproszczono do intuicyjnej zasady huśtawki cen i stóp procentowych."),
    ],
  },
};
