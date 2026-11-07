import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function LiquidityDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Liquidity and exchange diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      <circle cx="90" cy="80" r="35" fill="#fef3d6" stroke="#d4920b" strokeWidth="2.5" />
      <text x="90" y="85" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#784e03">Illiquid Good</text>

      <circle cx="310" cy="80" r="35" fill="#e3f3ff" stroke="#1971c2" strokeWidth="2.5" />
      <text x="310" y="85" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a7e">Specialist</text>

      {step >= 1 && (
        <g>
          <path d="M 130 80 L 270 80" stroke="#d4503f" strokeWidth="3" strokeDasharray="5,5" />
          <text x="200" y="65" textAnchor="middle" fontSize="11" fill="#d4503f" fontWeight="bold">Barter Fails</text>
        </g>
      )}

      {step >= 2 && (
        <g>
          <circle cx="200" cy="170" r="38" fill="#d3f9d8" stroke="#2b8a3e" strokeWidth="3" />
          <text x="200" y="168" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2b8a3e">Universal</text>
          <text x="200" y="184" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2b8a3e">Money</text>
          <path d="M 115 105 L 175 145" stroke="#2b8a3e" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <path d="M 225 145 L 285 105" stroke="#2b8a3e" strokeWidth="2.5" markerEnd="url(#arrow)" />
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [hasCoin, setHasCoin] = useState(false);
  const [swaps, setSwaps] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        {hasCoin ? "Liquid exchange: Money trades instantly with everyone!" : "Friction: Barter requires matching needs."}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setHasCoin(true);
            setSwaps((s) => s + 1);
            if (swaps >= 1) onDone?.();
          }}
        >
          Use Liquid Currency
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setHasCoin(false);
            setSwaps((s) => s + 1);
          }}
        >
          Try Direct Barter
        </button>
      </div>
      <div style={{ padding: "12px", background: hasCoin ? "#eef8ef" : "#fdf2e9", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {hasCoin ? "Trade completed with 0 search cost." : "Swap rejected: Double coincidence of wants not met."}
      </div>
    </div>
  );
}

function MoneyWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Which asset is the most liquid?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>A rare collectable comic book</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>A commercial warehouse</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Government currency notes</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "money",
  story: [
    animatedBeat(
      [
        T("Meet Aish. Aish builds custom website scripts after school.", "Das ist Mia. Mia programmiert nach der Schule Website-Skripte.", "Poznaj Zofię. Zofia po szkole tworzy skrypty na strony internetowe."),
        T("She wants guitar lessons from a local music teacher.", "Sie moechte Gitarrenunterricht bei einem Musiklehrer nehmen.", "Chce brać lekcje gry na gitarze u lokalnego nauczyciela muzyki."),
        T("Aish offers to trade two website scripts for guitar lessons.", "Mia bietet an, zwei Skripte gegen Gitarrenunterricht zu tauschen.", "Zofia proponuje wymianę dwóch skryptów na lekcje gitary."),
      ],
      LiquidityDiagram,
    ),
    animatedBeat(
      [
        T("The music teacher says no. He does not own a website and needs a bicycle instead.", "Der Musiklehrer lehnt ab. Er hat keine Website und braucht ein Fahrrad.", "Nauczyciel muzyki odmawia. Nie ma strony internetowej i potrzebuje roweru."),
        T("Trading goods directly is called *barter*.", "Der direkte Tausch von Waren heisst *Tauschhandel*.", "Bezpośrednia wymiana towarów to *handel wymienny*."),
        T("Barter requires a *double coincidence of wants*: both people must want what the other has.", "Tauschhandel erfordert *doppelte Beduerfnisuebereinstimmung*: Beide muessen wollen, was der andere hat.", "Taki handel wymaga *podwójnej zbieżności potrzeb*: obie strony muszą chcieć tego, co ma druga."),
      ],
      LiquidityDiagram,
    ),
    animatedBeat(
      [
        T("Aish would have to find a bicycle owner who happens to need website code.", "Mia muesste jemanden mit Fahrrad finden, der Website-Code sucht.", "Zofia musiałaby znaleźć kogoś z rowerem, kto potrzebuje kodu do strony."),
        T("This creates immense search costs and trade friction.", "Das verursacht enorme Suchkosten und Handelshemmnisse.", "To tworzy ogromne koszty poszukiwań i utrudnienia w handlu."),
        T("Economies overcome this by adopting a universal medium of exchange: *money*.", "Wirtschaften loesen dies mit einem universellen Tauschmittel: *Geld*.", "Gospodarki rozwiązują to, przyjmując uniwersalny środek wymiany: *pieniądz*."),
      ],
      LiquidityDiagram,
    ),
    animatedBeat(
      [
        T("Money has three primary functions: medium of exchange, unit of account, and store of value.", "Geld hat drei Funktionen: Tauschmittel, Recheneinheit und Wertspeicher.", "Pieniądz ma trzy funkcje: środek wymiany, jednostka rozliczeniowa i miernik wartości."),
        T("Its defining economic property is *liquidity*: how fast it can be traded without losing value.", "Seine Schluesseleigenschaft ist *Liquiditaet*: Wie schnell es ohne Wertverlust tauschbar ist.", "Jego kluczową cechą jest *płynność*: jak szybko można go wymienić bez utraty wartości."),
        T("Cash is fully liquid, while real estate or code scripts are illiquid.", "Bargeld ist vollkommen liquide, waehrend Immobilien oder Code illiquide sind.", "Gotówka jest w pełni płynna, podczas gdy nieruchomości czy skrypty są niepłynne."),
      ],
      LiquidityDiagram,
    ),
    animatedBeat(
      [
        T("Aish sells her script for cash to a dentist who needs an appointment tool.", "Mia verkauft ihr Skript fuer Geld an einen Zahnarzt fuer Terminbuchungen.", "Zofia sprzedaje swój skrypt za gotówkę dentyście na system rezerwacji."),
        T("She uses the cash to pay the guitar teacher, who buys his bicycle.", "Mit dem Geld bezahlt sie den Gitarrenlehrer, der sich sein Fahrrad kauft.", "Za gotówkę opłaca nauczyciela gitary, a ten kupuje swój rower."),
        T("Money eliminates friction and lets people specialize in what they do best.", "Geld beseitigt Reibung und erlaubt Menschen, sich zu spezialisieren.", "Pieniądz usuwa bariery i pozwala ludziom specjalizować się w tym, co robią najlepiej."),
      ],
      LiquidityDiagram,
    ),
  ],
  toyIntro: T(
    "Test how liquidity and universal currency eliminate barter friction.",
    "Teste, wie Liquiditaet und universelles Geld Tauschhindernisse beseitigen.",
    "Sprawdź, jak płynność i uniwersalny pieniądz usuwają bariery wymiany.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the term for when two traders must simultaneously desire each other's goods?",
        "Wie nennt man es, wenn zwei Haendler gleichzeitig die Gueter des anderen wollen muessen?",
        "Jak nazywa się sytuacja, w której dwaj handlowcy muszą jednocześnie chcieć swoich towarów?",
      ),
      options: [
        { text: T("Double coincidence of wants", "Doppelte Beduerfnisuebereinstimmung", "Podwójna zbieżność potrzeb"), correct: true },
        { text: T("Equilibrium pricing", "Gleichgewichtspreis", "Cena równowagi") },
        { text: T("Monetary inflation", "Monetaere Inflation", "Inflacja monetarna") },
      ],
      hint: T(
        "Both parties must have matching needs at the same moment.",
        "Beide Seiten muessen im selben Moment passende Beduerfnisse haben.",
        "Obie strony muszą mieć dopasowane potrzeby w tym samym momencie.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What does liquidity measure in economics?",
        "Was misst Liquiditaet in der Wirtschaft?",
        "Co mierzy płynność w ekonomii?",
      ),
      options: [
        { text: T("How fast an asset can be converted into cash without losing value", "Wie schnell ein Gut ohne Wertverlust in Geld getauscht werden kann", "Jak szybko aktywo można zamienić na gotówkę bez utraty wartości"), correct: true },
        { text: T("The physical weight of minted gold coins", "Das physische Gewicht gepraegter Goldmuenzen", "Fizyczną wagę wybitych monet ze złota") },
        { text: T("The amount of tax owed on capital gains", "Die Hoehe der faelligen Kapitalertragsteuer", "Wysokość podatku od zysków kapitałowych") },
      ],
      hint: T(
        "Think of how easily and quickly you can spend it right away.",
        "Denke daran, wie leicht und schnell du es sofort ausgeben kannst.",
        "Pomyśl o tym, jak łatwo i szybko możesz go od razu wydać.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the most liquid asset among the choices.",
        "Bestimme den fluessigsten Vermoegenswert unter den Auswahlmoeglichkeiten.",
        "Wskaż najbardziej płynne aktywo spośród dostępnych wyborów.",
      ),
      Widget: MoneyWidget,
      hint: T(
        "Government money is accepted everywhere immediately.",
        "Staatliches Geld wird ueberall sofort akzeptiert.",
        "Państwowy pieniądz jest akceptowany wszędzie od ręki.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Why do new digital currencies or assets sometimes struggle to act as a stable unit of account?",
    "Frage deine Eltern: Warum tun sich neue digitale Waehrungen oft schwer, als stabile Recheneinheit zu dienen?",
    "Zapytaj rodziców: Dlaczego nowym walutom cyfrowym trudno służyć jako stabilna jednostka rozliczeniowa?",
  ),
  realLife: {
    title: T(
      "Real world: High liquidity vs illiquid capital",
      "Echte Welt: Hohe Liquiditaet im Vergleich zu illiquidem Kapital",
      "Prawdziwy świat: Wysoka płynność a niepłynny kapitał",
    ),
    body: T(
      "Financial markets rank assets on a liquidity spectrum. Central bank reserves and checking accounts sit at the top, while private corporate equity, real estate, and fine art require weeks or months to convert into spendable money.",
      "Finanzmaerkte ordnen Vermoegen auf einer Liquiditaetsskala ein. Zentralbankguthaben und Girokonten stehen ganz oben, waehrend Unternehmensbeteiligungen, Immobilien und Kunst Wochen oder Monate fuer den Verkauf brauchen.",
      "Rynki finansowe klasyfikują aktywa na skali płynności. Środki w banku centralnym i na kontach bieżących są na szczycie, podczas gdy udziały w firmach, nieruchomości czy dzieła sztuki wymagają tygodni lub miesięcy na sprzedaż.",
    ),
  },
  factCard: {
    claims: [
      { text: T("William Stanley Jevons formulated the concept of the double coincidence of wants in 1875.", "William Stanley Jevons formulierte 1875 das Konzept der doppelten Beduerfnisuebereinstimmung.", "William Stanley Jevons sformułował koncepcję podwójnej zbieżności potrzeb w 1875 roku."), source: "https://www.econlib.org/library/YPDBooks/Jevons/jvnMM.html" },
      { text: T("The Bank of England defines money by its three roles: medium of exchange, store of value, and unit of account.", "Die Bank of England definiert Geld ueber seine drei Rollen: Tauschmittel, Wertspeicher und Recheneinheit.", "Bank Anglii definiuje pieniądz przez jego trzy role: środek wymiany, miernik wartości i jednostkę rozliczeniową."), source: "https://www.bankofengland.co.uk/explainers/what-is-money" },
      { text: T("Liquidity describes how easily an asset converts into the standard medium of exchange without loss.", "Liquiditaet beschreibt, wie leicht ein Gut ohne Wertverlust in das Standardtauschmittel umgewandelt wird.", "Płynność opisuje, jak łatwo aktywo zamienia się na standardowy środek wymiany bez straty."), source: "https://www.imf.org/en/Publications/fandd/issues/Series/Back-to-Basics/Liquidity" },
      { text: T("Federal Reserve data categorizes money supply into M1 and M2 based on asset liquidity degrees.", "Daten der Federal Reserve teilen die Geldmenge nach Liquiditaetsgraden in M1 und M2 ein.", "Dane Rezerwy Federalnej dzielą podaż pieniądza na agregaty M1 i M2 według stopnia płynności aktywów."), source: "https://www.federalreserve.gov/releases/h6/current/default.htm" },
      { text: T("Transaction costs and search friction in barter economies reduce aggregate economic output.", "Transaktionskosten und Suchhindernisse in Tauschwirtschaften senken die wirtschaftliche Gesamtleistung.", "Koszty transakcyjne i bariery poszukiwań w gospodarce towarowej obniżają całkowitą produkcję gospodarczą."), source: "https://www.ecb.europa.eu/explainers/tell-me/html/what-is-money.en.html" },
    ],
    simplified: [
      T(
        "Advanced financial instruments like derivatives and money market funds are simplified to the core concept of currency liquidity.",
        "Fortgeschrittene Finanzinstrumente wie Derivate werden auf das Kernkonzept der Geldliquiditaet vereinfacht.",
        "Zaawansowane instrumenty finansowe uproszczono do kluczowej koncepcji płynności waluty.",
      ),
    ],
  },
};
