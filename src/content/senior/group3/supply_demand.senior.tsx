import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function EquilibriumCurvesDiagram({ step }: { step: number }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      role="img"
      aria-label="Limited edition sneaker supply and demand curve diagram"
    >
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#334155"
        strokeWidth="2"
      />
      {/* Axes */}
      <line x1="60" y1="30" x2="60" y2="190" stroke="#94a3b8" strokeWidth="2" />
      <line x1="60" y1="190" x2="360" y2="190" stroke="#94a3b8" strokeWidth="2" />
      <text x="35" y="40" fontSize="11" fill="#94a3b8" fontWeight="bold">
        Price
      </text>
      <text x="350" y="210" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="bold">
        Pairs
      </text>

      {/* Demand Curve (Downward sloping) */}
      <line
        x1="80"
        y1="50"
        x2="320"
        y2="170"
        stroke="#f43f5e"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text x="325" y="175" fontSize="11" fill="#f43f5e" fontWeight="bold">
        Demand
      </text>

      {/* Supply Curve (Upward sloping) */}
      <line
        x1="80"
        y1="170"
        x2="320"
        y2="50"
        stroke="#0ea5e9"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text x="325" y="55" fontSize="11" fill="#0ea5e9" fontWeight="bold">
        Supply
      </text>

      {/* Equilibrium point */}
      <circle cx="200" cy="110" r="6" fill="#facc15" stroke="#fff" strokeWidth="2" />
      <line
        x1="60"
        y1="110"
        x2="200"
        y2="110"
        stroke="#facc15"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <line
        x1="200"
        y1="110"
        x2="200"
        y2="190"
        stroke="#facc15"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <text x="210" y="105" fontSize="11" fill="#facc15" fontWeight="bold">
        Fair Balance
      </text>

      {step >= 1 && (
        <g>
          {/* Artificial drop quota vertical line */}
          <line
            x1="130"
            y1="40"
            x2="130"
            y2="190"
            stroke="#a855f7"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
          <circle cx="130" cy="75" r="5" fill="#a855f7" />
          <text x="135" y="70" fontSize="10" fill="#c084fc" fontWeight="bold">
            Drop Price Spikes
          </text>
          <text x="130" y="210" textAnchor="middle" fontSize="10" fill="#c084fc">
            500-Pair Drop Cap
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [demandLevel, setDemandLevel] = useState<"normal" | "hyped">("normal");
  const [quotaApplied, setQuotaApplied] = useState(false);

  const basePrice = demandLevel === "hyped" ? 180 : 100;
  const price = quotaApplied ? Math.round(basePrice * 1.8) : basePrice;
  const quantity = quotaApplied ? 30 : demandLevel === "hyped" ? 140 : 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1.05rem" }}>
        Sneaker Drop Price: ${price} | Pairs Available: {quantity}{" "}
        {quotaApplied ? "(Strict Drop Cap)" : "(Open Market)"}
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setDemandLevel((d) => (d === "normal" ? "hyped" : "normal"))}
        >
          Hype Level: {demandLevel === "hyped" ? "Viral Video Trend" : "Standard"}
        </button>

        <button
          type="button"
          className="btn"
          onClick={() => {
            setQuotaApplied((q) => {
              const next = !q;
              if (next) onDone?.();
              return next;
            });
          }}
        >
          {quotaApplied ? "Remove Drop Limit (Full Supply)" : "Enforce Limited 500-Pair Drop"}
        </button>
      </div>

      <div
        style={{
          padding: "12px",
          background: quotaApplied ? "#fdf2f8" : "#f0fdf4",
          border: `1px solid ${quotaApplied ? "#f472b6" : "#86efac"}`,
          borderRadius: "10px",
          maxWidth: "380px",
          textAlign: "center",
          fontSize: "0.9rem",
        }}
      >
        {quotaApplied
          ? "Artificial Scarcity: Capping the shoe run to 30 pairs sends resale bids soaring to $" +
            price +
            "!"
          : "Natural Equilibrium: Sellers produce enough pairs to meet buyer demand at a steady, fair price."}
      </div>
    </div>
  );
}

function SeniorSupplyDemandWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        Why do sneaker brands deliberately manufacture only 5,000 pairs of a hyped shoe instead of
        500,000?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        They ran out of shoelace thread worldwide
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        Limiting supply builds immense exclusivity, brand hype, and resale demand
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Rubber factories are only allowed to run on Mondays
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "supply_demand",
  story: [
    animatedBeat(
      [
        T(
          "Meet Arjun. He designs custom hand-painted retro high-top sneakers in his bedroom studio.",
          "Das ist Lukas. Er gestaltet handbemalte Retro-Sneaker in seiner kleinen Werkstatt.",
          "Poznaj Jana. W swoim pokoju projektuje ręcznie malowane buty w stylu retro.",
        ),
        T(
          "When he puts a pair online for eighty dollars, twenty kids want to buy it immediately.",
          "Als er ein Paar fuer 80 Euro online anbietet, wollen es sofort zwanzig Jugendliche kaufen.",
          "Gdy wystawia parę w sieci za trzysta złotych, natychmiast chce ją kupić dwudziestu chętnych.",
        ),
        T(
          "Because so many people want his shoes, Arjun raises the price to one hundred and fifty dollars.",
          "Weil die Nachfrage so gross ist, erhoeht Lukas den Preis auf 150 Euro.",
          "Widząc tak duże zainteresowanie, Jan podnosi cenę na sześćset złotych.",
        ),
      ],
      EquilibriumCurvesDiagram,
    ),
    animatedBeat(
      [
        T(
          "At one hundred and fifty dollars, only three customers are ready to pay.",
          "Bei 150 Euro wollen ploetzlich nur noch drei Kaeufer zuschlagen.",
          "Przy sześciuset złotych chętnych zostaje już tylko trzech.",
        ),
        T(
          "Arjun finds the sweet spot: at one hundred and ten dollars, exactly ten pairs are wanted and made.",
          "Lukas findet den optimalen Punkt: Bei 110 Euro gibt es genau zehn Kaeufer fuer seine zehn Paar Schuhe.",
          "Jan znajduje idealny punkt równowagi: przy czterystu złotych sprzedaje dokładnie tyle par, ile zdołał uszyć.",
        ),
        T(
          "This meeting point where buyer demand equals seller supply is called the *market equilibrium*.",
          "Diesen Treffpunkt, an dem Angebot und Nachfrage perfekt zusammenpassen, nennt man *Marktgleichgewicht*.",
          "Punkt spotkania, w którym chęci kupujących spotykają się z możliwościami twórcy, to *równowaga rynkowa*.",
        ),
      ],
      EquilibriumCurvesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Prices are not set by government decrees; they act as living signals between buyers and creators.",
          "Preise werden nicht von Behoerden befohlen; sie sind lebendige Signale zwischen Kaeufern und Machern.",
          "Ceny nie powstają z urzędowego dekretu; są żywym sygnałem porozumienia między kupującymi a twórcami.",
        ),
        T(
          "If a game console is too expensive, boxes sit gathering dust on shelves, forcing stores to offer discounts.",
          "Sind Konsolen zu teuer, verstauben sie im Regal und Laeden muessen Rabatte geben.",
          "Gdy konsole są za drogie, kurzą się na półkach, zmuszając sklepy do obniżek.",
        ),
        T(
          "If a concert ticket is too cheap, thousands of eager fans line up and tickets vanish in five seconds.",
          "Sind Konzertkarten zu billig, sind sie in fuenf Sekunden vergriffen und Tausende gehen leer aus.",
          "Gdy bilety na koncert są zbyt tanie, znikają w pięć sekund, a tysiące fanów odchodzi z kwitkiem.",
        ),
      ],
      EquilibriumCurvesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Famous streetwear and sneaker labels use a clever tactic called *artificial scarcity*.",
          "Bekannte Modemarken nutzen einen raffinierten Trick: die *kuenstliche Verknappung*.",
          "Słynne marki odzieżowe stosują sprytny zabieg zwany *sztuczną rzadkością*.",
        ),
        T(
          "Even though they could easily press fifty thousand pairs of shoes in an afternoon, they only make five thousand.",
          "Obwohl sie 50.000 Paar an einem Nachmittag drucken koennten, stellen sie nur 5.000 her.",
          "Choć mogłyby wytłoczyć pięćdziesiąt tysięcy par butów w jedno popołudnie, produkują tylko pięć tysięcy.",
        ),
        T(
          "The engineered shortage turns the sneaker into a status symbol, driving collectors into wild bidding wars.",
          "Diese kuenstliche Knappheit macht den Schuh zum Statussymbol und loest Bieterkaempfe aus.",
          "Sztuczny brak towaru zamienia buty w symbol prestiżu, wywołując szalone licytacje wśród kolekcjonerów.",
        ),
      ],
      EquilibriumCurvesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Understanding supply and demand gives you real eyes to see how the world works.",
          "Angebot und Nachfrage zu verstehen oeffnet dir die Augen fuer die echte Welt.",
          "Zrozumienie podaży i popytu pozwala przejrzeć mechanizmy współczesnego świata.",
        ),
        T(
          "Whenever you see a price jump, ask yourself: did supply drop, or did hype and demand surge?",
          "Wenn ein Preis springt, frage dich: Wurde das Angebot knapp oder ist der Hype explodiert?",
          "Gdy widzisz skok ceny, zadaj sobie pytanie: czy zabrakło towaru, czy to popyt i moda wystrzeliły w kosmos?",
        ),
        T(
          "Price is the language the whole global marketplace uses to talk to itself.",
          "Der Preis ist die gemeinsame Sprache, mit der die weltweite Wirtschaft taeglich spricht.",
          "Cena to wspólny język, za pomocą którego codziennie porozumiewa się cały światowy rynek.",
        ),
      ],
      EquilibriumCurvesDiagram,
    ),
  ],
  toyIntro: T(
    "Experiment with sneaker hype and artificial production caps to see how auction prices react.",
    "Experimentiere mit Sneaker-Hype und kuenstlichen Limits, um Preisschwankungen zu beobachten.",
    "Poeksperymentuj z modą na buty i limitami produkcji, by zobaczyć reakcję cen na rynku.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What happens in a sneaker store when shoe prices are set way too high?",
        "Was passiert in einem Sneakerladen, wenn die Preise viel zu hoch angesetzt sind?",
        "Co dzieje się w sklepie z butami, gdy ceny zostaną ustalone na zbyt wysokim poziomie?",
      ),
      options: [
        {
          text: T(
            "Customers refuse to buy, leaving boxes piling up as an unsold surplus until prices drop",
            "Kunden weigern sich zu kaufen; Kisten stapeln sich als Ueberschuss, bis Preise sinken",
            "Klienci rezygnują z zakupu; pudełka zalegają na magazynie jako nadwyżka, aż ceny spadną",
          ),
          correct: true,
        },
        {
          text: T(
            "Shoppers buy every single shoe in less than ten seconds",
            "Kaeufer kaufen alle Schuhe in weniger als zehn Sekunden leer",
            "Klienci wykupują wszystkie pary w mniej niż dziesięć sekund",
          ),
          correct: false,
        },
        {
          text: T(
            "The shoe boxes turn into chocolate cake",
            "Die Schuhkartons verwandeln sich in Schokoladenkuchen",
            "Pudełka na buty zamieniają się w tort czekoladowy",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about what happens when an item is too expensive for normal buyers.",
        "Denke daran, was passiert, wenn ein Produkt fuer normale Kaeufer zu teuer ist.",
        "Pomyśl o tym, co się dzieje, gdy towar jest za drogi dla zwykłych klientów.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why do streetwear companies intentionally limit sneaker production to just a few thousand pairs?",
        "Warum begrenzen Modemarken ihre Sneaker-Produktion absichtlich auf wenige tausend Paar?",
        "Dlaczego marki streetwearowe celowo ograniczają produkcję butów do zaledwie kilku tysięcy par?",
      ),
      options: [
        {
          text: T(
            "Artificial scarcity creates extreme hype, status, and high resale prices",
            "Kuenstliche Verknappung erzeugt riesigen Hype, Statussymbole und hohe Wiederverkaufspreise",
            "Sztuczna rzadkość tworzy ogromny prestiż, szum medialny i wysokie ceny na rynku wtórnym",
          ),
          correct: true,
        },
        {
          text: T(
            "Because rubber soles are completely illegal in summer",
            "Weil Gummisohlen im Sommer gesetzlich verboten sind",
            "Ponieważ gumowe podeszwy są latem nielegalne",
          ),
          correct: false,
        },
        {
          text: T(
            "To make sure shoes only fit dogs",
            "Damit Schuhe nur noch Hunden passen",
            "By buty pasowały wyłącznie na psy",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about why limited edition drops sell out instantly.",
        "Ueberlege, warum limitierte Editionen sofort ausverkauft sind.",
        "Zastanów się, dlaczego limitowane serie wyprzedają się w ułamku sekundy.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Test your understanding of exclusive sneaker drops.",
        "Pruefe dein Wissen ueber limitierte Sneaker-Drops.",
        "Sprawdź swoją wiedzę o limitowanych seriach butów.",
      ),
      Widget: SeniorSupplyDemandWidget,
      hint: T(
        "Scarcity boosts perceived value.",
        "Knappheit steigert das Ansehen.",
        "Rzadkość podnosi postrzeganą wartość.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Have you ever waited in a long queue or set an alarm just to buy a limited release item?",
    "Frage deine Eltern: Habt ihr schon mal Schlange gestanden oder euch einen Wecker gestellt, um ein limitiertes Produkt zu ergattern?",
    "Zapytaj rodziców: Czy staliście kiedyś w kolejce lub nastawialiście budzik, by zdążyć kupić rzecz z limitowanej serii?",
  ),
  realLife: {
    title: T(
      "Real world: Nike Air Jordan Drops and the Resale Market",
      "Echte Welt: Nike Air Jordan Drops und der Wiederverkaufsmarkt",
      "Prawdziwy świat: Premiery butów Nike Air Jordan i rynek odsprzedaży",
    ),
    body: T(
      "When Nike releases retro Air Jordan drops via raffle apps, millions of buyers enter for only a few thousand pairs. Lucky winners who purchase shoes for two hundred dollars can immediately flip them on secondary platforms like StockX for eight hundred dollars or more, pure proof of supply and demand at work.",
      "Wenn Nike begehrte Retro Air Jordans ueber Verlosungs-Apps veroeffentlicht, bewerben sich Millionen Fans auf wenige tausend Paare. Wer fuer 200 Euro ein Paar erhaelt, kann es auf Boersen wie StockX oft fuer 800 Euro weiterverkaufen: Angebot und Nachfrage in Reinform.",
      "Gdy Nike wypuszcza limitowane buty Air Jordan w aplikacjach losujących, miliony chętnych rywalizują o kilka tysięcy par. Szczęśliwcy kupujący parę za osiemset złotych mogą natychmiast odsprzedać ją na giełdach typu StockX za trzy tysiące: to czysta zasada podaży i popytu w praktyce.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Alfred Marshall formalized modern supply and demand curve models in Principles of Economics (1890).",
          "Alfred Marshall formalisierte moderne Angebots- und Nachfragekurven in Principles of Economics (1890).",
          "Alfred Marshall sformalizował współczesne modele krzywych podaży i popytu w Principles of Economics (1890).",
        ),
        source: "https://www.gutenberg.org/ebooks/43453",
      },
      {
        text: T(
          "Thorstein Veblen analyzed conspicuous leisure and status consumption in The Theory of the Leisure Class (1899).",
          "Thorstein Veblen analysierte demonstrativen Konsum in The Theory of the Leisure Class (1899).",
          "Thorstein Veblen zbadał ostentacyjną konsumpcję w The Theory of the Leisure Class (1899).",
        ),
        source: "https://www.gutenberg.org/ebooks/833",
      },
      {
        text: T(
          "Jean Tirole received the 2014 Nobel Prize in Economic Sciences for his analysis of market power and regulation of cartels.",
          "Jean Tirole erhielt 2014 den Wirtschaftsnobelpreis fuer seine Analysen zu Marktmacht und Kartellregulierung.",
          "Jean Tirole otrzymał Nagrodę Nobla w 2014 roku za analizę siły rynkowej i regulacji monopoli.",
        ),
        source: "https://www.nobelprize.org/prizes/economic-sciences/2014/summary/",
      },
      {
        text: T(
          "The Sherman Antitrust Act of 1890 outlaws contracts, combinations, and conspiracies in restraint of interstate trade.",
          "Der Sherman Antitrust Act von 1890 verbietet wettbewerbswidrige Kartellabsprachen und Monopole in den USA.",
          "Ustawa Shermana z 1890 roku delegalizuje kartele, monopole i zmowy ograniczające handel międzystanowy.",
        ),
        source: "https://www.archives.gov/milestone-documents/sherman-anti-trust-act",
      },
      {
        text: T(
          "Bain & Company's Global Luxury Market Report tracks controlled supply distribution across personal luxury categories.",
          "Der Luxusmarktbericht von Bain & Company analysiert kontrollierte Vertriebsstrategien der Luxusbranche.",
          "Raport rynku dóbr luksusowych Bain & Company analizuje strategie kontrolowanej podaży marek premium.",
        ),
        source: "https://www.bain.com/insights/topics/luxury-goods-worldwide-market-study/",
      },
    ],
    simplified: [
      T(
        "Complex retail supply distribution and dynamic pricing algorithms are modeled as direct supply-demand curves.",
        "Komplexe Vertriebsstrukturen wurden als direkte Angebots- und Nachfragekurven dargestellt.",
        "Złożone łańcuchy dostaw i algorytmy cenowe przedstawiono za pomocą czytelnych krzywych podaży i popytu.",
      ),
    ],
  },
};
