import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function IncomeStatementDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Income statement and profit margins diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      <rect x="30" y="40" width="340" height="35" rx="6" fill="#e3f2fd" stroke="#1971c2" strokeWidth="2" />
      <text x="200" y="62" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a7e">Total Revenue ($100,000)</text>

      {step >= 1 && (
        <g>
          <rect x="30" y="85" width="220" height="35" rx="6" fill="#fff3bf" stroke="#f59f00" strokeWidth="2" />
          <text x="140" y="107" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#784e03">Gross Profit (-$40k COGS)</text>
          <text x="310" y="107" textAnchor="middle" fontSize="11" fill="#868e96">60% Gross Margin</text>
        </g>
      )}

      {step >= 2 && (
        <g>
          <rect x="30" y="130" width="120" height="35" rx="6" fill="#d3f9d8" stroke="#2b8a3e" strokeWidth="2" />
          <text x="90" y="152" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2b8a3e">Net Profit</text>
          <text x="260" y="152" textAnchor="middle" fontSize="11" fill="#2b8a3e">-$40k OpEx = $20,000 Net (20% Margin)</text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [price, setPrice] = useState(20);
  const costPerUnit = 8;
  const fixedCosts = 500;
  const units = 100;

  const revenue = price * units;
  const variableCosts = costPerUnit * units;
  const grossProfit = revenue - variableCosts;
  const netProfit = grossProfit - fixedCosts;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Price: ${price} | Revenue: ${revenue} | Net Profit: ${netProfit}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setPrice((p) => {
              const next = p + 5;
              if (next >= 30) onDone?.();
              return next;
            });
          }}
        >
          Increase Price (+$5)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setPrice(20)}
        >
          Reset Baseline
        </button>
      </div>
      <div style={{ padding: "12px", background: netProfit > 0 ? "#eef8ef" : "#ffe3e3", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        Gross Margin: {Math.round((grossProfit / revenue) * 100)}% | Net Margin: {Math.round((netProfit / revenue) * 100)}%
      </div>
    </div>
  );
}

function BusinessWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>If a company makes $1,000,000 in sales but spends $950,000 in total expenses, what is its net profit?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>$950,000</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>$50,000 (a 5% net margin)</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>$1,000,000</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "business",
  story: [
    animatedBeat(
      [
        T("Starting a business is the process of organizing capital, labor, and tools to solve a problem profitably.", "Ein Unternehmen zu gruenden bedeutet, Kapital, Arbeit und Werkzeuge gewinnbringend zu buendeln.", "Założenie firmy oznacza połączenie kapitału, pracy i narzędzi w celu zyskownego rozwiązywania problemów."),
        T("Many beginners focus entirely on *revenue*: the total money received from customers.", "Viele Anfaenger schauen nur auf den *Umsatz*: das gesamte von Kunden eingenommene Geld.", "Wielu początkujących skupia się wyłącznie na *przychodach*: łącznej kwocie wpłaconej przez klientów."),
        T("However, high revenue without profit is an illusion that leads to bankruptcy.", "Doch hoher Umsatz ohne Gewinn ist eine Taeuschung, die in die Insolvenz fuehrt.", "Jednak wysoki przychód bez zysku to złudzenie, które prowadzi wprost do bankructwa."),
      ],
      IncomeStatementDiagram,
    ),
    animatedBeat(
      [
        T("To understand a business, we look at its *income statement*.", "Um ein Unternehmen zu verstehen, betrachten wir die *Gewinn- und Verlustrechnung*.", "Aby zrozumieć działanie firmy, analizujemy jej *rachunek zysków i strat*."),
        T("First comes *cost of goods sold* (COGS): the direct materials and labor needed to produce each unit.", "Zuerst kommen die *direkten Herstellungskosten*: Material und Arbeit je verkaufter Einheit.", "Najpierw pojawia się *koszt własny sprzedaży*: bezpośrednie materiały i praca na każdą sztukę."),
        T("Subtracting COGS from revenue gives your *gross profit*.", "Zieht man die direkten Kosten vom Umsatz ab, erhaelt man den *Rohertrag*.", "Odjęcie tych bezpośrednich kosztów od przychodu daje *zysk brutto na sprzedaży*."),
      ],
      IncomeStatementDiagram,
    ),
    animatedBeat(
      [
        T("Next come *operating expenses* (OpEx): software tools, marketing, office rent, and management salaries.", "Danach folgen die *Betriebskosten*: Software, Marketing, Miete und feste Gehaelter.", "Następnie dochodzą *koszty operacyjne*: oprogramowanie, marketing, biuro i wynagrodzenia."),
        T("After paying operating expenses, interest, and corporate taxes, what remains is *net profit*.", "Nach Betriebskosten, Zinsen und Steuern bleibt der *Reingewinn* uebrig.", "Po opłaceniu kosztów operacyjnych, odsetek i podatków pozostaje czysty *zysk netto*."),
        T("Net profit is the actual wealth generated that can be reinvested or paid out to owners.", "Der Reingewinn ist das echte erwirtschaftete Vermoegen zur Reinvestition oder Ausschuettung.", "Zysk netto to rzeczywiste wypracowane bogactwo, które można reinwestować lub wypłacić właścicielom."),
      ],
      IncomeStatementDiagram,
    ),
    animatedBeat(
      [
        T("A software company might have a high gross margin of 80% because copying code costs almost zero.", "Eine Softwarefirma hat oft 80% Rohmarge, weil das Kopieren von Code kaum etwas kostet.", "Firma programistyczna może mieć marżę brutto rzędu 80%, bo powielanie kodu nic nie kosztuje."),
        T("A grocery store might have a tight net margin of 2% due to perishable goods and real estate costs.", "Ein Supermarkt hat oft nur 2% Reinmarge wegen verderblicher Ware und hoher Mietkosten.", "Supermarket ma często marżę netto na poziomie zaledwie 2% z powodu psucia się towarów i kosztów najmu."),
        T("Understanding *unit economics* determines whether a business model can scale sustainably.", "Die *Einheitsoekonomie* entscheidet darueber, ob ein Geschaeftsmodell tragfaehig wachsen kann.", "Zrozumienie *ekonomiki jednostkowej* decyduje o tym, czy dany model biznesowy może stabilnie rosnąć."),
      ],
      IncomeStatementDiagram,
    ),
    animatedBeat(
      [
        T("Great entrepreneurs focus relentlessly on value creation for customers.", "Erfolgreiche Gruender konzentrieren sich unermuedlich auf den Mehrwert fuer Kunden.", "Wybitni przedsiębiorcy nieustannie koncentrują się na tworzeniu wartości dla klientów."),
        T("If your product solves a painful problem, customers gladly pay more than your production cost.", "Loest dein Produkt ein echtes Problem, zahlen Kunden gerne mehr als deine Herstellungskosten.", "Jeśli produkt rozwiązuje bolesny problem, klienci chętnie zapłacą więcej niż koszt wytworzenia."),
        T("Profit is the market's certificate that you created more value than the resources you consumed.", "Gewinn ist das Zertifikat des Marktes, dass du mehr Wert geschaffen als Ressourcen verbraucht hast.", "Zysk to rynkowe potwierdzenie, że stworzyłeś większą wartość niż zużyte na to zasoby."),
      ],
      IncomeStatementDiagram,
    ),
  ],
  toyIntro: T(
    "Adjust prices and see how gross margin and net margin respond.",
    "Passe Preise an und beobachte, wie Rohmarge und Nettomarge reagieren.",
    "Dostosuj ceny i zobacz, jak reagują marża brutto oraz marża netto.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the difference between revenue and net profit?",
        "Was ist der Unterschied zwischen Umsatz und Reingewinn?",
        "Jaka jest różnica między przychodem a zyskiem netto?",
      ),
      options: [
        { text: T("Revenue is total sales; net profit is what remains after all costs and taxes", "Umsatz ist die Gesamteinnahme; Reingewinn bleibt nach allen Kosten und Steuern", "Przychód to łączna sprzedaż; zysk netto to kwota po odliczeniu wszystkich kosztów i podatków"), correct: true },
        { text: T("Revenue is always smaller than net profit", "Umsatz ist immer kleiner als der Reingewinn", "Przychód jest zawsze mniejszy niż zysk netto") },
        { text: T("Net profit only includes physical cash in the cash register", "Reingewinn umfasst nur Bargeld in der Ladenkasse", "Zysk netto obejmuje wyłącznie gotówkę w kasie fiskalnej") },
      ],
      hint: T(
        "Profit accounts for all expenses incurred to generate that revenue.",
        "Gewinn beruecksichtigt alle Ausgaben zur Erzielung des Umsatzes.",
        "Zysk uwzględnia wszystkie wydatki poniesione na wygenerowanie przychodu.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why can software companies often achieve higher gross margins than supermarkets?",
        "Warum erzielen Softwarefirmen oft hoehere Rohmargen als Supermaerkte?",
        "Dlaczego firmy technologiczne osiągają wyższe marże brutto niż supermarkety?",
      ),
      options: [
        { text: T("Digital products have near-zero marginal replication and material costs", "Digitale Produkte haben nahezu keine Grenzkosten fuer Kopie und Material", "Produkty cyfrowe nie generują niemal żadnych kosztów kopiowania ani materiałów"), correct: true },
        { text: T("Software companies are legally forbidden from paying taxes", "Softwarefirmen muessen gesetzlich keine Steuern zahlen", "Firmom informatycznym prawo zabrania płacenia podatków") },
        { text: T("Supermarkets never sell food items at a markup", "Supermaerkte verkaufen Lebensmittel nie mit Aufschlag", "Supermarkety nigdy nie nakładają marży na sprzedawaną żywność") },
      ],
      hint: T(
        "Distributing code to another user costs almost nothing extra.",
        "Code an einen weiteren Nutzer auszuliefern kostet fast nichts zusaetzlich.",
        "Wysłanie kodu kolejnemu użytkownikowi praktycznie nic dodatkowo nie kosztuje.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Calculate the net profit from the given sales and expense figures.",
        "Berechne den Reingewinn aus den angegebenen Umsatz- und Kostenzahlen.",
        "Oblicz zysk netto na podstawie podanych danych o sprzedaży i kosztach.",
      ),
      Widget: BusinessWidget,
      hint: T(
        "Subtract total expenses from total revenue.",
        "Ziehe die Gesamtkosten vom Gesamtumsatz ab.",
        "Odejmij łączne koszty od całkowitych przychodów.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: What are the main operating expenses in their workplace or industry?",
    "Frage deine Eltern: Was sind die wichtigsten Betriebskosten in ihrem Unternehmen oder ihrer Branche?",
    "Zapytaj rodziców: Jakie są główne koszty operacyjne w ich miejscu pracy lub branży?",
  ),
  realLife: {
    title: T(
      "Real world: Public company quarterly 10-Q earnings reports",
      "Echte Welt: Quartalsberichte oeffentlicher Aktiengesellschaften",
      "Prawdziwy świat: Kwartalne raporty finansowe spółek giełdowych",
    ),
    body: T(
      "Publicly traded companies like Apple, Microsoft, or BMW must publish audited financial statements every three months. Wall Street analysts dissect gross margin, operating margin, and free cash flow to evaluate whether executive management is deploying capital efficiently.",
      "Boersennotierte Firmen wie Apple, Microsoft oder BMW muessen alle drei Monate gepruefte Finanzberichte veroeffentlichen. Analysten pruefen Rohmargen, operative Margen und den freien Cashflow genau, um die Kapitaleffizienz zu bewerten.",
      "Spółki giełdowe takie jak Apple, Microsoft czy BMW muszą co kwartał publikować audytowane sprawozdania finansowe. Analitycy drobiazgowo badają marżę brutto, marżę operacyjną i przepływy pieniężne, aby ocenić efektywność zarządu.",
    ),
  },
  factCard: {
    claims: [
      { text: T("The US Securities and Exchange Commission (SEC) mandates standardized income statements under GAAP accounting rules.", "Die US-Boersenaufsicht SEC schreibt standardisierte Gewinn- und Verlustrechnungen nach GAAP vor.", "Amerykańska Komisja Papierów Wartościowych i Giełd (SEC) wymaga ustandaryzowanych rachunków zysków i strat według zasad GAAP."), source: "https://www.sec.gov/fast-answers/answers-readahtm.html" },
      { text: T("International Financial Reporting Standards (IFRS) provide global frameworks for reporting revenue and profit margins.", "Die IFRS-Standards bieten weltweite Richtlinien zur Erfassung von Umsaetzen und Gewinnmargen.", "Międzynarodowe Standardy Sprawozdawczości Finansowej (MSSF/IFRS) wyznaczają globalne ramy raportowania przychodów i marż zysku."), source: "https://www.ifrs.org/issued-standards/list-of-standards/" },
      { text: T("Destatis records corporate profit margin distributions across the German manufacturing and services sectors.", "Destatis erfasst die Verteilung von Unternehmensgewinnmargen in Industrie und Dienstleistung in Deutschland.", "Destatis rejestruje rozkład marż zysku przedsiębiorstw w niemieckim sektorze przemysłowym i usługowym."), source: "https://www.destatis.de/DE/Themen/Wirtschaft/Unternehmen/_inhalt.html" },
      { text: T("Unit economics evaluates revenues and costs associated with an individual business unit or customer.", "Die Einheitsoekonomie bewertet Erloese und Kosten bezogen auf eine einzelne Produkteinheit oder einen Kunden.", "Ekonomika jednostkowa analizuje przychody i koszty powiązane z pojedynczą sztuką towaru lub pojedynczym klientem."), source: "https://hbr.org/2021/04/how-to-calculate-customer-lifetime-value" },
      { text: T("Gross margin is calculated as gross profit divided by net sales revenue multiplied by one hundred.", "Die Rohertragsmarge berechnet sich aus dem Rohertrag geteilt durch den Nettoumsatz mal einhundert.", "Marżę brutto oblicza się, dzieląc zysk brutto przez przychody ze sprzedaży i mnożąc przez sto."), source: "https://www.britannica.com/money/gross-margin" },
    ],
    simplified: [
      T(
        "Complex non-cash accounting adjustments like depreciation schedules and stock-based compensation are simplified to standard OpEx deductions.",
        "Komplexe buchhalterische Posten wie Abschreibungen und aktienbasierte Verguetungen werden auf regulaere Betriebsausgaben vereinfacht.",
        "Złożone pozycje księgowe bezgotówkowe, takie jak amortyzacja i wynagrodzenia w akcjach, uproszczono do standardowych kosztów operacyjnych.",
      ),
    ],
  },
};
