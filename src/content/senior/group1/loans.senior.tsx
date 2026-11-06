import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function LoanDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Debt leverage and default risk diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      <rect x="40" y="50" width="140" height="140" rx="10" fill="#fff" stroke="#107569" strokeWidth="2" />
      <text x="110" y="75" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#107569">Productive Leverage</text>
      <text x="110" y="105" textAnchor="middle" fontSize="11" fill="#495057">Buy Van: $30,000</text>
      <text x="110" y="130" textAnchor="middle" fontSize="11" fill="#495057">Earns: $12k / yr</text>
      <text x="110" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2b8a3e">ROI exceeds interest</text>

      {step >= 1 && (
        <g>
          <rect x="220" y="50" width="140" height="140" rx="10" fill="#fff" stroke="#d9480f" strokeWidth="2" />
          <text x="290" y="75" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#d9480f">Consumer Debt</text>
          <text x="290" y="105" textAnchor="middle" fontSize="11" fill="#495057">Vacation: $5,000</text>
          <text x="290" y="130" textAnchor="middle" fontSize="11" fill="#495057">Earns: $0</text>
          <text x="290" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#d9480f">Default risk rises</text>
        </g>
      )}

      {step >= 2 && (
        <path d="M 180 120 L 220 120" stroke="#868e96" strokeWidth="2" strokeDasharray="4,4" />
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [leverage, setLeverage] = useState(1);

  const capital = 10000;
  const totalAssets = capital * leverage;
  const debt = totalAssets - capital;
  const returnOnAssets = totalAssets * 0.15;
  const interestCost = debt * 0.06;
  const netEarnings = returnOnAssets - interestCost;
  const returnOnEquity = Math.round((netEarnings / capital) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Leverage: {leverage}x | Debt: ${debt.toLocaleString()} | Return on Capital: {returnOnEquity}%
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setLeverage((l) => {
              const next = Math.min(4, l + 1);
              if (next >= 3) onDone?.();
              return next;
            });
          }}
        >
          Increase Leverage (+1x)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setLeverage(1)}
        >
          Reset to 1x (No Debt)
        </button>
      </div>
      <div style={{ padding: "12px", background: leverage > 2 ? "#fff9db" : "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {leverage > 2 ? "High leverage amplifies gains when things go well, but magnifies downside risk during downturns!" : "Prudent balance: Debt service is comfortably covered by earnings."}
      </div>
    </div>
  );
}

function LoanWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What defines productive leverage compared to bad debt?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Borrowing at 25% APR for designer clothes</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Borrowing to acquire productive assets whose cash flow exceeds the debt cost</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Never repaying borrowed funds</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "loans",
  story: [
    animatedBeat(
      [
        T("A loan is a contractual agreement where a lender provides capital today in exchange for future repayment with interest.", "Ein Darlehen ist ein Vertrag, bei dem ein Kreditgeber heute Kapital gegen spaetere Rueckzahlung mit Zinsen bereitstellt.", "Pożyczka to umowa, w której pożyczkodawca udostępnia kapitał dzisiaj w zamian za późniejszą spłatę wraz z odsetkami."),
        T("The initial amount borrowed is called the *principal*.", "Der urspruenglich geliehene Betrag heisst *Kreditbetrag* oder Tilgungsstamm.", "Pierwotna kwota długu nazywana jest *kapitałem głównym*."),
        T("The schedule of periodic repayments is known as *amortization*.", "Der feste Plan zur schrittweisen Abzahlung nennt sich *Amortisation*.", "Harmonogram stopniowej spłaty zadłużenia w ratach to *amortyzacja długu*."),
      ],
      LoanDiagram,
    ),
    animatedBeat(
      [
        T("In business, debt is frequently utilized as financial *leverage*.", "In der Wirtschaft wird Fremdkapital haeufig als finanzieller *Hebel* (Leverage) eingesetzt.", "W biznesie dług jest powszechnie stosowany jako *dźwignia finansowa*."),
        T("Imagine you own ten thousand dollars. You can buy one delivery vehicle.", "Stell dir vor, du hast zehntausend Dollar. Du kannst damit ein Lieferfahrzeug kaufen.", "Wyobraź sobie, że masz dziesięć tysięcy dolarów. Możesz kupić jeden pojazd dostawczy."),
        T("If you borrow forty thousand dollars at five percent interest, you can acquire five vehicles simultaneously.", "Leihst du dir vierzigtausend Dollar zu fuenf Prozent, kannst du fuenf Fahrzeuge gleichzeitig erwerben.", "Jeśli pożyczysz czterdzieści tysięcy dolarów na pięć procent, możesz kupić od razu pięć pojazdów."),
      ],
      LoanDiagram,
    ),
    animatedBeat(
      [
        T("If each vehicle generates strong cash flow that easily covers its loan payment, your return on equity multiplies.", "Erwirtschaftet jedes Fahrzeug Gewinne weit ueber den Kreditraten, vervielfacht sich deine Eigenkapitalrendite.", "Jeśli każdy pojazd generuje zyski przewyższające raty pożyczki, Twoja rentowność kapitału własnego rośnie."),
        T("This is *productive debt*: borrowing to fund assets that produce economic returns higher than the cost of capital.", "Das ist *produktive Verschuldung*: Kredite fuer Vermoegenswerte, deren Ertrag hoeher ist als die Zinsen.", "To jest *dług produktywny*: pożyczanie na aktywa generujące stopę zwrotu wyższą niż koszt kapitału."),
        T("Productive debt helps build infrastructure, factories, and technological innovations.", "Produktive Kredite ermoeglichen den Bau von Infrastruktur, Fabriken und Technologien.", "Produktywny dług umożliwia budowę infrastruktury, fabryk i nowoczesnych technologii."),
      ],
      LoanDiagram,
    ),
    animatedBeat(
      [
        T("Conversely, using credit cards to fund expensive holidays or luxury clothing is *unproductive consumer debt*.", "Dahingegen sind Konsumkredite fuer Urlaube oder Kleidung *unproduktive Schulden*.", "Z kolei używanie kart kredytowych na drogie wakacje czy ubrania to *nieproduktywny dług konsumpcyjny*."),
        T("Consumer purchases generate zero future cash flow to pay back the loan.", "Konsumgueter erzeugen keinen zukuenftigen Geldzufluss zur Tilgung.", "Zakupy konsumpcyjne nie generują w przyszłości żadnych przepływów pieniężnych na spłatę rat."),
        T("If your revenue drops or you lose your job, inability to service debt leads to *default risk* and bankruptcy.", "Sinken die Einnahmen, fuehrt die Unfaehigkeit zur Zinszahlung zu *Zahlungsausfall* und Insolvenz.", "Gdy dochody spadną, niemożność obsługi długu prowadzi do *niewypłacalności* i bankructwa."),
      ],
      LoanDiagram,
    ),
    animatedBeat(
      [
        T("Leverage is a double-edged sword: it magnifies profits on the way up, but crushes equity on the way down.", "Hebelwirkung ist zweischneidig: Sie vergroessert Gewinne im Boom, vernichtet aber Kapital im Abschwung.", "Dźwignia to miecz obosieczny: powiększa zyski przy wzroście, ale niszczy kapitał własny przy załamaniu."),
        T("Lenders often require *collateral*: assets the bank can seize if you fail to repay.", "Kreditgeber fordern oft *Sicherheiten*: Gueter, die die Bank bei Nichtzahlung pfaenden darf.", "Pożyczkodawcy często wymagają *zabezpieczenia*: majątku, który bank może przejąć przy braku spłaty."),
        T("Respect debt, manage risk prudently, and never borrow for depreciating toys.", "Respektiere Schulden, sichere Risiken ab und leihe niemals Geld fuer wertlosen Konsum.", "Szanuj dług, ostrożnie zarządzaj ryzykiem i nigdy nie pożyczaj na tracące wartość zabawki."),
      ],
      LoanDiagram,
    ),
  ],
  toyIntro: T(
    "Experiment with leverage ratios and observe how debt magnifies capital returns and risks.",
    "Experimentiere mit dem Verschuldungsgrad und beobachte, wie Fremdkapital Rendite und Risiko hebelt.",
    "Poeksperymentuj ze wskaźnikami dźwigni i zobacz, jak dług zwielokrotnia zyski oraz ryzyko.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the definition of the loan principal?",
        "Was ist die Definition der Kreditsumme (Tilgungsstamm)?",
        "Jaka jest definicja kapitału głównego pożyczki (principal)?",
      ),
      options: [
        { text: T("The original amount of money borrowed before interest charges", "Der urspruenglich geliehene Geldbetrag vor Anfall von Zinsen", "Pierwotna pożyczona kwota pieniędzy przed naliczeniem odsetek"), correct: true },
        { text: T("The monthly penalty fee charged by the bank", "Die monatliche Mahngebuehr der Bank", "Miesięczna opłata karna naliczana przez bank") },
        { text: T("The total tax paid to the local government", "Die gesamte an die Gemeinde gezahlte Steuer", "Całkowity podatek zapłacony władzom lokalnym") },
      ],
      hint: T(
        "It is the baseline sum you received on day one.",
        "Es ist die Basissumme, die du am ersten Tag erhalten hast.",
        "To bazowa suma, którą otrzymałeś w pierwszym dniu umowy.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is financial leverage described as a double-edged sword?",
        "Warum wird der finanzielle Hebel als zweischneidiges Schwert bezeichnet?",
        "Dlaczego dźwignia finansowa jest nazywana mieczem obosiecznym?",
      ),
      options: [
        { text: T("It amplifies both potential percentage gains and potential catastrophic losses", "Es verstaerkt sowohl prozentuale Gewinne als auch verheerende Verluste", "Powiększa zarówno potencjalne zyski procentowe, jak i dotkliwe straty"), correct: true },
        { text: T("It is manufactured from polished titanium and steel", "Es wird aus poliertem Titan und Stahl geschmiedet", "Jest produkowana z polerowanego tytanu i stali") },
        { text: T("It cuts tax payments exactly in half", "Es halbiert die Steuerzahlungen exakt", "Obcina płatności podatkowe dokładnie o połowę") },
      ],
      hint: T(
        "Debt magnifies results in both positive and negative directions.",
        "Schulden verstaerken Ergebnisse sowohl nach oben als auch nach unten.",
        "Dług zwielokrotnia wyniki zarówno na korzyść, jak i na niekorzyść.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify what distinguishes productive leverage from consumer borrowing.",
        "Waehle aus, was produktiven Hebel von reinem Konsumkredit unterscheidet.",
        "Wskaż, co odróżnia dźwignię produktywną od pożyczki konsumpcyjnej.",
      ),
      Widget: LoanWidget,
      hint: T(
        "The asset must generate returns exceeding the cost of capital.",
        "Der Vermoegenswert muss Ertraege ueber den Kapitalkosten abwerfen.",
        "Aktywo musi przynosić dochody przewyższające koszt kapitału.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: What is the difference between a fixed-rate mortgage and a variable-rate loan?",
    "Frage deine Eltern: Was ist der Unterschied zwischen einem Festzinsdarlehen und einem variablen Kredit?",
    "Zapytaj rodziców: Jaka jest różnica między kredytem hipotecznym o stałym a zmiennym oprocentowaniu?",
  ),
  realLife: {
    title: T(
      "Real world: Corporate bonds and credit rating agencies",
      "Echte Welt: Unternehmensanleihen und Ratingagenturen",
      "Prawdziwy świat: Obligacje korporacyjne i agencje ratingowe",
    ),
    body: T(
      "Global corporations borrow billions of dollars by issuing debt bonds. Credit rating agencies (like Moody's, S&P, and Fitch) evaluate the borrower's default risk, assigning credit grades from AAA (ultra-safe) down to junk status, which dictates the interest rate the company must pay to investors.",
      "Globale Konzerne leihen Milliarden ueber Unternehmensanleihen. Ratingagenturen bewerten das Ausfallrisiko und vergeben Noten von AAA bis Ramsch-Status, was die Hoehe der Zinsen bestimmt.",
      "Globalne korporacje pożyczają miliardy, emitując obligacje. Agencje ratingowe oceniają ryzyko niewypłacalności i przyznają oceny od AAA do poziomu spekulacyjnego, co decyduje o wysokości płaconych odsetek.",
    ),
  },
  factCard: {
    claims: [
      { text: T("The World Bank tracks global sovereign and corporate debt levels to monitor systemic financial stability.", "Die Weltbank erfasst weltweite Staats- und Unternehmensschulden zur Ueberwachung der Stabilitaet.", "Bank Światowy monitoruje globalne zadłużenie publiczne i przedsiębiorstw w celu oceny stabilności finansowej."), source: "https://www.worldbank.org/en/topic/debt" },
      { text: T("Amortization schedules outline the division of each debt payment between interest and principal reduction.", "Tilgungsplaene stellen die Aufteilung jeder Kreditrate in Zins und Tilgungsanteil dar.", "Plany amortyzacji rozpisują podział każdej raty kredytowej na odsetki i spłatę kapitału."), source: "https://www.consumerfinance.gov/ask-cfpb/what-is-an-amortization-schedule-en-193/" },
      { text: T("Deutsche Bundesbank reports on credit standards and collateral requirements in European lending operations.", "Die Deutsche Bundesbank berichtet ueber Kreditrichtlinien und Besicherungsstandards im europaeischen Bankengeschaeft.", "Niemiecki Bank Federalny (Bundesbank) raportuje o standardach kredytowych i wymogach dotyczących zabezpieczeń w Europie."), source: "https://www.bundesbank.de/en/tasks/monetary-policy/bank-lending-survey" },
      { text: T("The International Monetary Fund (IMF) analyzes financial leverage and debt sustainability across world economies.", "Der Internationale Waehrungsfonds (IWF) analysiert Verschuldungsgrade und Schuldentragfaehigkeit weltweit.", "Międzynarodowy Fundusz Walutowy (MFW) analizuje poziom dźwigni finansowej i stabilność zadłużenia w gospodarkach świata."), source: "https://www.imf.org/en/Publications/GFSR" },
      { text: T("Default risk represents the probability that a borrower fails to meet contractual principal and interest commitments.", "Ausfallrisiko beschreibt die Wahrscheinlichkeit, dass ein Schuldner Zins- und Tilgungspflichten nicht erfuellt.", "Ryzyko niewypłacalności oznacza prawdopodobieństwo, że pożyczkobiorca nie wywiąże się z umownych zobowiązań odsetkowych i kapitałowych."), source: "https://www.britannica.com/money/default-risk" },
    ],
    simplified: [
      T(
        "Complex debt covenants, subordinated tranches, and cross-default clauses are modeled through fundamental loan leverage mechanics.",
        "Komplexe Kreditvereinbarungen und nachrangige Tranchen werden ueber grundlegende Hebelmechaniken abgebildet.",
        "Złożone klauzule kredytowe i transze długu podporządkowanego uproszczono do fundamentalnych mechanizmów dźwigni finansowej.",
      ),
    ],
  },
};
