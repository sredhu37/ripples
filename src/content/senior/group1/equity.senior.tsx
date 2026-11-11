import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function CapTableDiagram({ step }: { step: number }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      role="img"
      aria-label="Cap table and equity dilution diagram"
    >
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f8fbfc"
        stroke="#1d3f47"
        strokeWidth="2"
      />
      <circle cx="120" cy="120" r="70" fill="#e3f2fd" stroke="#1971c2" strokeWidth="2.5" />
      <text x="120" y="125" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a7e">
        Founder 100%
      </text>

      {step >= 1 && (
        <g>
          <path
            d="M 120 120 L 120 50 A 70 70 0 0 1 190 120 Z"
            fill="#ffd43b"
            stroke="#f59f00"
            strokeWidth="2"
          />
          <text x="145" y="95" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#d9480f">
            25% Investor
          </text>
          <text x="100" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1971c2">
            75% Founder
          </text>
        </g>
      )}

      {step >= 2 && (
        <g>
          <rect
            x="230"
            y="55"
            width="145"
            height="130"
            rx="10"
            fill="#fff"
            stroke="#107569"
            strokeWidth="2"
          />
          <text x="302" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#107569">
            Valuation Growth
          </text>
          <text x="302" y="110" textAnchor="middle" fontSize="11" fill="#495057">
            Round 1: $1M Val
          </text>
          <text x="302" y="135" textAnchor="middle" fontSize="11" fill="#495057">
            Round 2: $10M Val
          </text>
          <text x="302" y="165" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2b8a3e">
            75% of $10M = $7.5M
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [rounds, setRounds] = useState(0);

  const valuation = rounds === 0 ? 1000000 : rounds === 1 ? 5000000 : 20000000;
  const founderEquity = rounds === 0 ? 100 : rounds === 1 ? 80 : 64;
  const founderWealth = (founderEquity / 100) * valuation;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Founder Ownership: {founderEquity}% | Company Valuation: ${valuation.toLocaleString()}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setRounds((r) => {
              const next = Math.min(2, r + 1);
              if (next >= 1) onDone?.();
              return next;
            });
          }}
        >
          Raise Next Funding Round (+1)
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => setRounds(0)}>
          Reset to Bootstrap
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: "#eef8ef",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        Founder Value: ${founderWealth.toLocaleString()}. Owning a smaller slice of a much larger
        pie creates enormous wealth!
      </div>
    </div>
  );
}

function EquityWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        If you sell 20% of your company for $200,000, what is the post-money valuation of your
        company?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        $200,000
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        $1,000,000 ($200,000 / 0.20)
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        $50,000
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "equity",
  story: [
    animatedBeat(
      [
        T(
          "Meet Kriti and Abhi. Together, they start an indie game studio to build a 2D pixel platformer game.",
          "Das ist Sophie und Leon. Zusammen gruenden sie ein kleines Studio fuer ein neues Pixel-Computerspiel.",
          "Poznaj Alicję i Antoniego. Razem zakładają niezależne studio gier, by stworzyć platformówkę w stylu pixel art.",
        ),
        T(
          "On day one, Kriti owns fifty percent and Abhi owns fifty percent of their studio *equity*.",
          "Am ersten Tag gehoeren Sophie 50% und Leon 50% der Firmenanteile (*Equity*).",
          "Pierwszego dnia Alicja ma pięćdziesiąt procent, a Antoni pięćdziesiąt procent udziałów w studiu (*equity*).",
        ),
        T(
          "Equity means true ownership: whoever holds equity decides game features and splits all future revenue.",
          "Anteile bedeuten echtes Eigentum: Wer Anteile haelt, bestimmt mit und teilt spaetere Gewinne.",
          "Udziały oznaczają prawdziwą własność: decydujesz o losach gry i dzielisz się wszystkimi przyszłymi zyskami.",
        ),
      ],
      CapTableDiagram,
    ),
    animatedBeat(
      [
        T(
          "Their game concept looks fantastic, but neither of them knows how to draw custom character animations.",
          "Die Spielidee ist genial, aber niemand von beiden kann tolle Charakter-Animationen zeichnen.",
          "Pomysł na grę jest świetny, ale żadne z nich nie potrafi płynnie rysować i animować postaci.",
        ),
        T(
          "They meet a brilliant digital artist who agrees to animate all thirty levels in exchange for twenty-five percent equity.",
          "Sie finden eine talentierte Zeichnerin, die alle 30 Level gestaltet, wenn sie dafuer 25% Anteile bekommt.",
          "Poznają utalentowaną ilustratorkę, która zgadza się stworzyć grafikę do trzydziestu poziomów w zamian za 25% udziałów.",
        ),
        T(
          "To welcome her as a co-owner, Kriti and Abhi each agree to lower their shares from fifty to 37.5 percent.",
          "Um sie aufzunehmen, reduzieren Sophie und Leon ihre Anteile jeweils von 50 auf 37,5 Prozent.",
          "Aby przyjąć ją do zespołu, Alicja i Antoni zgadzają się zmniejszyć swoje pakiety z pięćdziesięciu do 37,5 procent.",
        ),
      ],
      CapTableDiagram,
    ),
    animatedBeat(
      [
        T(
          "This sharing of ownership is called equity *dilution*.",
          "Diesen Prozess der Aufteilung nennt man *Verwaesserung* (Dilution).",
          "Ten proces dzielenia własności nazywa się *rozwodnieniem udziałów* (dilution).",
        ),
        T(
          "Even though Kriti and Abhi own a smaller slice of the pie, the pie itself just became ten times more delicious.",
          "Obwohl ihre Stuecke vom Kuchen kleiner werden, ist der Kuchen dank der Grafik zehnmal wertvoller.",
          "Mimo że ich kawałek tortu stał się nieco mniejszy, sam tort dzięki wspaniałej grafice zyskał ogromną wartość.",
        ),
        T(
          "Would you rather own one hundred percent of an empty sketch or thirty-seven percent of a hit game?",
          "Besitzt du lieber 100% einer leeren Skizze oder 37% eines echten Spiele-Hits?",
          "Wolisz mieć sto procent pustego szkicu na kartce czy 37 procent gry, w którą grają tysiące graczy?",
        ),
      ],
      CapTableDiagram,
    ),
    animatedBeat(
      [
        T(
          "Later, an online publisher offers twenty thousand dollars for cloud servers in exchange for ten percent of the studio.",
          "Spaeter zahlt ein Spiele-Publisher 20.000 Euro fuer Server im Tausch gegen 10 Prozent der Firma.",
          "Później wydawca gier oferuje osiemdziesiąt tysięcy złotych na szybkie serwery w zamian za 10 procent studia.",
        ),
        T(
          "All these ownership percentages are recorded in a master list called the *cap table*.",
          "Alle Eigentuemer und ihre Prozente werden in einer Tabelle erfasst: der *Cap Table*.",
          "Wszystkie udziały i nazwiska wspólników zapisuje się w oficjalnym wykazie zwanym *cap table*.",
        ),
        T(
          "Smart founders carefully guard their cap table so they never lose creative control of their dream.",
          "Kluge Gruender hueten ihre Anteile gut, um nie die Kontrolle ueber ihr Herzensprojekt zu verlieren.",
          "Mądrzy twórcy uważnie pilnują swoich udziałów, by nigdy nie oddać obcym kontroli nad własnym marzeniem.",
        ),
      ],
      CapTableDiagram,
    ),
    animatedBeat(
      [
        T(
          "When the game launches on app stores and sells one million copies, all four partners celebrate together.",
          "Als das Spiel im App Store erscheint und eine Million Mal geladen wird, feiern alle vier Partner.",
          "Gdy gra trafia do sklepów i sprzedaje się w milionie kopii, wszyscy wspólnicy świętują wspólny sukces.",
        ),
        T(
          "Every owner receives their exact mathematical share of the game profits directly in their bank accounts.",
          "Jeder Eigentuemer bekommt seinen prozentualen Gewinnanteil puenktlich aufs Konto.",
          "Każdy właściciel otrzymuje swój wyliczony procent zysku bezpośrednio na swoje konto bankowe.",
        ),
        T(
          "Understanding equity teaches you the difference between merely working for an hourly wage and owning the game.",
          "Anteile zu verstehen zeigt den Unterschied dazwischen, nur fuer Stundenlohn zu jobben oder Miteigentuemer zu sein.",
          "Zrozumienie equity uczy różnicy między pracą za zwykłą stawkę godzinową a byciem współwłaścicielem sukcesu.",
        ),
      ],
      CapTableDiagram,
    ),
  ],
  toyIntro: T(
    "Simulate equity rounds, dilution, and the expanding value of the founder's ownership.",
    "Simuliere Finanzierungsrunden, Verwaesserung und den wachsenden Wert der Gruenderanteile.",
    "Zasymuluj rundy finansowania, rozwodnienie i rosnącą wartość udziałów założyciela.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does equity dilution mean when new investors buy into a company?",
        "Was bedeutet Verwaesserung (Dilution), wenn neue Investoren Anteile kaufen?",
        "Co oznacza rozwodnienie kapitału (dilution), gdy nowi inwestorzy wchodzą do spółki?",
      ),
      options: [
        {
          text: T(
            "Existing shareholders own a smaller percentage of the total company",
            "Bestehende Eigentuemer besitzen einen kleineren Prozentsatz am Gesamtunternehmen",
            "Dotychczasowi właściciele mają mniejszy procentowy udział w całej spółce",
          ),
          correct: true,
        },
        {
          text: T(
            "The company pours water into its factory products",
            "Das Unternehmen verduennt seine physischen Produkte mit Wasser",
            "Przedsiębiorstwo dosłownie rozcieńcza swoje produkty wodą",
          ),
        },
        {
          text: T(
            "The government seizes fifty percent of corporate bank accounts",
            "Der Staat beschlagnahmt die Haelfte aller Bankkonten der Firma",
            "Państwo przejmuje połowę wszystkich kont bankowych firmy",
          ),
        },
      ],
      hint: T(
        "Your percentage share of the company's total pie decreases.",
        "Dein prozentualer Anteil am gesamten Unternehmenskuchen wird kleiner.",
        "Twój procentowy kawałek całego firmowego tortu staje się mniejszy.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why do founders accept equity dilution during venture funding?",
        "Warum akzeptieren Gruender eine Verwaesserung ihrer Anteile bei Finanzierungsrunden?",
        "Dlaczego założyciele godzą się na rozwodnienie udziałów przy pozyskiwaniu kapitału?",
      ),
      options: [
        {
          text: T(
            "Capital allows the business to grow faster, making a smaller percentage worth far more",
            "Das Kapital ermoeglicht schnelleres Wachstum, wodurch ein kleinerer Anteil viel mehr wert wird",
            "Kapitał pozwala na szybszy wzrost, dzięki czemu mniejszy udział staje się wart o wiele więcej",
          ),
          correct: true,
        },
        {
          text: T(
            "Investors force founders to work without salary permanently",
            "Investoren zwingen Gruender dauerhaft ohne Gehalt zu arbeiten",
            "Inwestorzy zmuszają założycieli do dożywotniej pracy bez pensji",
          ),
        },
        {
          text: T(
            "It is required to change the company logo every month",
            "Es ist gesetzlich vorgeschrieben, das Firmenlogo monatlich zu aendern",
            "Jest to wymóg konieczny do comiesięcznej zmiany logo spółki",
          ),
        },
      ],
      hint: T(
        "A smaller slice of a giant pie is much bigger than a whole crumb.",
        "Ein kleineres Stueck eines riesigen Kuchens ist groesser als ein ganzer Kruemel.",
        "Mniejszy kawałek ogromnego tortu jest znacznie większy niż całe małe ziarenko.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "If a digital game studio sells 20% ownership for $2,000, what is the whole studio worth?",
        "Wenn ein Spielestudio 20% Firmenanteile fuer 2.000 Euro verkauft, wie viel ist das ganze Studio wert?",
        "Jeśli studio gier sprzedaje 20% udziałów za 2 000 zł, ile warte jest całe studio?",
      ),
      Widget: EquityWidget,
      hint: T(
        "Divide $2,000 by 0.20 (or multiply $2,000 by 5).",
        "Teile 2.000 durch 0,20 (oder nimm 2.000 mal 5).",
        "Podziel 2 000 przez 0,20 (lub pomnóż 2 000 przez 5).",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Do they or their employer hold equity or stock options, and how does it work?",
    "Frage deine Eltern: Besitzen sie oder ihr Arbeitgeber Firmenanteile oder Mitarbeiteraktien und wie funktioniert das?",
    "Zapytaj rodziców: Czy oni lub ich pracodawca posiadają udziały lub opcje na akcje i jak to działa?",
  ),
  realLife: {
    title: T(
      "Real world: Tech startup cap tables and liquidity events",
      "Echte Welt: Beteiligungsstrukturen bei Start-ups und Boerseingaenge",
      "Prawdziwy świat: Struktura kapitałowa startupów i debiuty giełdowe",
    ),
    body: T(
      "Before going public, tech companies like Spotify, Airbnb, or Stripe go through multiple funding rounds (Seed, Series A, B, C). By tracking every option pool and preferred share class on a cap table, founders maintain corporate governance and plan for a future liquidity event like an acquisition or IPO.",
      "Vor dem Boersengang durchlaufen Technologieunternehmen wie Spotify oder Airbnb mehrere Finanzierungsrunden. Mit einer genauen Gesellschafterliste behalten Gruender die Kontrolle und bereiten den Boersengang vor.",
      "Przed wejściem na giełdę spółki technologiczne takie jak Spotify czy Airbnb przechodzą przez kolejne rundy finansowania. Dzięki dokładnej tabeli cap table założyciele zachowują kontrolę i przygotowują debiut na giełdzie.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The National Venture Capital Association (NVCA) publishes model legal agreements for startup equity financing rounds.",
          "Die National Venture Capital Association (NVCA) veroeffentlicht Mustervertraege fuer Beteiligungsrunden.",
          "Amerykańskie stowarzyszenie NVCA publikuje wzorcowe umowy prawne dla rund finansowania udziałowego w startupach.",
        ),
        source: "https://nvca.org/model-legal-documents/",
      },
      {
        text: T(
          "Post-money valuation is mathematically defined as investment amount divided by percentage equity acquired.",
          "Die Post-Money-Bewertung ist definiert als Investitionsbetrag geteilt durch den erworbenen Eigentumsanteil.",
          "Wycena post-money jest definiowana matematycznie jako kwota inwestycji podzielona przez nabyty udział procentowy.",
        ),
        source: "https://www.investopedia.com/terms/p/postmoneyvaluation.asp",
      },
      {
        text: T(
          "The European Investment Fund (EIF) supports venture capital ecosystems across European Union member states.",
          "Der Europaeische Investitionsfonds (EIF) foerdert Risikokapitalmaerkte in der Europaeischen Union.",
          "Europejski Fundusz Inwestycyjny (EFI) wspiera rynki kapitału wysokiego ryzyka w krajach Unii Europejskiej.",
        ),
        source: "https://www.eif.org/what_we_do/equity/index.htm",
      },
      {
        text: T(
          "Dilution occurs when a company issues additional stock, reducing the ownership percentage of existing shareholders.",
          "Verwaesserung tritt ein, wenn eine Firma neue Aktien ausgibt und damit den Anteil der Altaktionaere senkt.",
          "Rozwodnienie zachodzi, gdy spółka emituje dodatkowe akcje, zmniejszając udział dotychczasowych akcjonariuszy.",
        ),
        source: "https://www.sec.gov/oiea/investor-alerts-bulletins/ib_dilution",
      },
      {
        text: T(
          "German corporate law (GmbHG / AktG) governs shareholder registries and capital increases.",
          "Das deutsche Gesellschaftsrecht (GmbHG und AktG) regelt Gesellschafterlisten und Kapitalerhoehungen.",
          "Niemieckie prawo spółek handlowych reguluje listy udziałowców oraz procedury podwyższania kapitału.",
        ),
        source: "https://www.gesetze-im-internet.de/gmbhg/",
      },
    ],
    simplified: [
      T(
        "Complex convertible instruments such as SAFEs and liquidation preferences are represented via direct priced equity rounds.",
        "Komplexe Wandeldarlehen (SAFEs) und Liquidationspraeferenzen werden als direkte bewertete Eigenkapitalrunden dargestellt.",
        "Złożone instrumenty dłużne zamienne na udziały (SAFE) i preferencje likwidacyjne uproszczono do bezpośrednich wycenionych rund kapitałowych.",
      ),
    ],
  },
};
