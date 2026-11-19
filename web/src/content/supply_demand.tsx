import { useState } from "react";
import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function MarketScaleDiagram({ step }: { step: number }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      role="img"
      aria-label="Supply and demand scale diagram"
    >
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f8fafc"
        stroke="#1d3f47"
        strokeWidth="2"
      />
      {/* Central Fulcrum */}
      <polygon points="200,170 180,210 220,210" fill="#64748b" />
      <circle cx="200" cy="170" r="5" fill="#0f172a" />

      {step === 0 && (
        <g>
          {/* Level beam */}
          <line
            x1="80"
            y1="165"
            x2="320"
            y2="165"
            stroke="#334155"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <rect x="90" y="125" width="60" height="40" rx="6" fill="#38bdf8" />
          <text x="120" y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0c4a7e">
            Supply
          </text>
          <rect x="250" y="125" width="60" height="40" rx="6" fill="#f472b6" />
          <text x="280" y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#831843">
            Demand
          </text>
          <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
            Market Balance (Fair Price)
          </text>
        </g>
      )}

      {step === 1 && (
        <g>
          {/* Tilted beam: high demand sinks right, low supply rises left */}
          <line
            x1="80"
            y1="130"
            x2="320"
            y2="200"
            stroke="#334155"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <rect x="90" y="90" width="60" height="40" rx="6" fill="#38bdf8" />
          <text x="120" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0c4a7e">
            Few Items
          </text>
          <rect x="250" y="160" width="60" height="40" rx="6" fill="#f472b6" />
          <text x="280" y="185" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#831843">
            Many Kids!
          </text>
          <rect
            x="130"
            y="40"
            width="140"
            height="40"
            rx="8"
            fill="#fef08a"
            stroke="#ca8a04"
            strokeWidth="2"
          />
          <text x="200" y="65" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e">
            Price Shoots UP!
          </text>
        </g>
      )}

      {step >= 2 && (
        <g>
          {/* Tilted beam: surplus supply sinks left, demand rises right */}
          <line
            x1="80"
            y1="200"
            x2="320"
            y2="130"
            stroke="#334155"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <rect x="90" y="160" width="60" height="40" rx="6" fill="#38bdf8" />
          <text x="120" y="185" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0c4a7e">
            Too Many
          </text>
          <rect x="250" y="90" width="60" height="40" rx="6" fill="#f472b6" />
          <text x="280" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#831843">
            Few Buyers
          </text>
          <rect
            x="130"
            y="40"
            width="140"
            height="40"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="200" y="65" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">
            Clearance Sale!
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [supply, setSupply] = useState(5);
  const [demand, setDemand] = useState(5);

  const price = Math.round(10 * (demand / supply));
  const isShortage = demand > supply;
  const isSurplus = supply > demand;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1.05rem" }}>
        Market Price: {price} Coins{" "}
        {isShortage ? "(Scarcity Spike!)" : isSurplus ? "(Clearance Discount!)" : "(Balanced)"}
      </p>

      <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            Supply (Toys in Shop): {supply}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                const next = Math.max(2, supply - 2);
                setSupply(next);
                if (demand > next) onDone?.();
              }}
            >
              - Less
            </button>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                const next = Math.min(18, supply + 2);
                setSupply(next);
                if (next > demand) onDone?.();
              }}
            >
              + More
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            Demand (Eager Kids): {demand}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                const next = Math.max(2, demand - 2);
                setDemand(next);
                if (supply > next) onDone?.();
              }}
            >
              - Fewer
            </button>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                const next = Math.min(18, demand + 2);
                setDemand(next);
                if (next > supply) onDone?.();
              }}
            >
              + More
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "10px 14px",
          background: isShortage ? "#fff3bf" : isSurplus ? "#e3f2fd" : "#d3f9d8",
          borderRadius: "10px",
          textAlign: "center",
          fontSize: "0.9rem",
          maxWidth: "360px",
        }}
      >
        {isShortage && "Scarcity: When toys are scarce, buyers offer higher prices to win one!"}
        {isSurplus && "Surplus: When too many toys sit on shelves, shops drop prices to sell them!"}
        {!isShortage && !isSurplus && "Balance: Supply matches demand at a stable, fair price."}
      </div>
    </div>
  );
}

function SupplyDemandWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        If a toy shop orders 200 teddy bears but only 10 kids want one, what happens to the price?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        The price doubles to 50 coins
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        The price drops in a clearance sale to attract buyers
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        The teddy bears turn into gold statues
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
          "Imagine your favorite toy shop receives just five shiny dragon trading cards.",
          "Stell dir vor, dein Lieblingsladen bekommt nur fuenf seltene Drachenkarten.",
          "Wyobraź sobie, że twój ulubiony sklep z zabawkami dostaje tylko pięć błyszczących kart ze smokami.",
        ),
        T(
          "Outside the door, fifty excited kids are waiting in line, each clutching pocket money.",
          "Draussen warten fuenfzig aufgeregte Kinder mit ihrem Taschengeld.",
          "Przed drzwiami w kolejce stoi pięćdziesięcioro dzieci z kieszonkowym w dłoniach.",
        ),
        T(
          "When *demand* is huge and *supply* is tiny, buyers gladly pay more to get one.",
          "Wenn die *Nachfrage* riesig ist und das *Angebot* winzig, zahlen Kaeufer mehr.",
          "Gdy *popyt* jest olbrzymi, a *podaż* znikoma, kupujący chętnie płacą więcej.",
        ),
        T(
          "The seller can raise the price tag because people compete for the few available cards.",
          "Der Verkaeufer kann den Preis erhoehen, weil alle um die wenigen Karten wetteifern.",
          "Sprzedawca może podnieść cenę, bo wszyscy rywalizują o nieliczne dostępne karty.",
        ),
      ],
      MarketScaleDiagram,
    ),
    animatedBeat(
      [
        T(
          "Now consider the opposite situation: a toy maker crafts ten thousand robotic frogs.",
          "Nun das Gegenteil: Ein Spielzeughersteller baut zehntausend Roboterfroesche.",
          "A teraz odwrotna sytuacja: producent zabawek tworzy dziesięć tysięcy robotów-żabek.",
        ),
        T(
          "After a week, only three children have bought one, and huge cardboard boxes fill the aisles.",
          "Nach einer Woche haben erst drei Kinder einen Frosch gekauft, Kisten stapeln sich.",
          "Po tygodniu tylko troje dzieci kupiło żabkę, a wielkie kartony zagracają alejki.",
        ),
        T(
          "When *supply* is much higher than *demand*, the shop faces an unsold *surplus*.",
          "Ist das *Angebot* viel groesser als die *Nachfrage*, entsteht ein unverkaufter *Ueberschuss*.",
          "Gdy *podaż* znacznie przewyższa *popyt*, w sklepie powstaje niesprzedana *nadwyżka*.",
        ),
        T(
          "To free up shelf space and recover cash, the owner slashes prices with a discount sticker.",
          "Um Platz zu schaffen und Geld zu retten, senkt der Ladenbesitzer die Preise drastisch.",
          "Aby zwolnić miejsce na półkach i odzyskać gotówkę, właściciel obniża ceny wyprzedażą.",
        ),
      ],
      MarketScaleDiagram,
    ),
    animatedBeat(
      [
        T(
          "When the quantity sellers offer equals the quantity buyers want, prices steady out.",
          "Wenn angebotene Menge und gewuenschte Menge uebereinstimmen, stabilisiert sich der Preis.",
          "Gdy oferowana ilość zabawek odpowiada potrzebom kupujących, ceny się stabilizują.",
        ),
        T(
          "Economists call this point *market balance* or the clearing price.",
          "Fachleute nennen diesen Punkt *Marktgleichgewicht* oder Raeumungspreis.",
          "Eksperci nazywają ten stan *równowagą rynkową* lub ceną czyszczącą rynek.",
        ),
        T(
          "Nobody walks away empty-handed, and no unwanted boxes gather dust in the warehouse.",
          "Niemand geht leer aus und keine Kisten verstauben ungenutzt im Lager.",
          "Nikt nie odchodzi z pustymi rękami, a w magazynie nie zalegają niechciane kartony.",
        ),
      ],
      MarketScaleDiagram,
    ),
    animatedBeat(
      [
        T(
          "Some companies restrict supply on purpose: this is called *artificial scarcity*.",
          "Manche Firmen verknappen Waren absichtlich: Das heisst *kuenstliche Verknappung*.",
          "Niektóre firmy celowo ograniczają dostawy towaru: to *sztuczna rzadkość*.",
        ),
        T(
          "Diamond cartels keep gemstones locked in vaults so diamonds feel scarce and costly.",
          "Diamantenkartelle halten Edelsteine in Tresoren, damit sie selten und teuer bleiben.",
          "Kartele diamentowe trzymają kamienie w skarbcach, aby sprawiały wrażenie rzadkich i drogich.",
        ),
        T(
          "Luxury fashion brands produce tiny batches of designer sneakers so collectors pay thousands.",
          "Luxusmarken stellen nur Miniauflagen von Sneakern her, damit Sammler Tausende zahlen.",
          "Luksusowe marki tworzą limitowane serie butów, by kolekcjonerzy płacili fortunę.",
        ),
      ],
      MarketScaleDiagram,
    ),
    animatedBeat(
      [
        T(
          "Smart savers understand the dance of supply and demand before opening their wallets.",
          "Kluge Sparer verstehen das Spiel von Angebot und Nachfrage, bevor sie Geld ausgeben.",
          "Mądrzy oszczędzający rozumieją grę podaży i popytu, zanim wyciągną portfel.",
        ),
        T(
          "Waiting for the initial craze to fade often rewards you with fair, sensible prices.",
          "Wartet man ab, bis der Hype verfliegt, bekommt man oft faire Preise.",
          "Czekając, aż opadnie pierwszy szał, często zyskujesz uczciwą, rozsądną cenę.",
        ),
        T(
          "Recognizing artificial scarcity helps you see through hype and protect your piggy bank.",
          "Kuenstliche Verknappung zu erkennen schuetzt dein Sparschwein vor teuren Modetrends.",
          "Dostrzeganie sztucznej rzadkości chroni twoją skarbonkę przed drogimi modami.",
        ),
      ],
      MarketScaleDiagram,
    ),
  ],
  toyIntro: T(
    "Slide supply and demand to see how prices climb with scarcity and drop with surplus.",
    "Bewege Angebot und Nachfrage, um zu sehen, wie Preise bei Knappheit steigen und bei Ueberschuss fallen.",
    "Przesuwaj suwaki podaży i popytu, aby zobaczyć, jak ceny rosną przy rzadkości i spadają przy nadwyżce.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What typically happens to the price of an item when many people want it, but very few exist?",
        "Was passiert typischerweise mit dem Preis, wenn viele etwas wollen, es aber kaum Exemplare gibt?",
        "Co zazwyczaj dzieje się z ceną przedmiotu, gdy wielu ludzi go chce, ale jest go bardzo mało?",
      ),
      options: [
        {
          text: T(
            "The price rises because buyers compete for the scarce items",
            "Der Preis steigt, weil Kaeufer um die knappen Exemplare konkurrieren",
            "Cena rośnie, ponieważ kupujący rywalizują o rzadkie egzemplarze",
          ),
          correct: true,
        },
        {
          text: T(
            "The price drops to zero and the store gives them away for free",
            "Der Preis faellt auf null und der Laden verschenkt alles kostenlos",
            "Cena spada do zera, a sklep rozdaje wszystko za darmo",
          ),
        },
        {
          text: T(
            "The item instantly dissolves into sparkling water",
            "Der Gegenstand loest sich sofort in Sprudelwasser auf",
            "Przedmiot natychmiast rozpuszcza się w wodzie gazowanej",
          ),
        },
      ],
      hint: T(
        "Scarcity gives sellers the power to ask for higher prices.",
        "Knappheit erlaubt es Verkaeufern, hoehere Preise zu verlangen.",
        "Rzadkość pozwala sprzedawcom żądać wyższych cen.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why do some luxury brands deliberately make only a few copies of a shoe or handbag?",
        "Warum stellen Luxusmarken absichtlich nur wenige Exemplare einer Tasche her?",
        "Dlaczego niektóre luksusowe marki celowo produkują tylko kilka sztuk torebki lub butów?",
      ),
      options: [
        {
          text: T(
            "To create artificial scarcity, making the item feel rare and prestigious",
            "Um kuenstliche Verknappung zu erzeugen, damit der Artikel selten und exklusiv wirkt",
            "Aby stworzyć sztuczną rzadkość, dzięki czemu rzecz wydaje się unikatowa i prestiżowa",
          ),
          correct: true,
        },
        {
          text: T(
            "Because their sewing machines can only run for five minutes a year",
            "Weil ihre Naehmaschinen nur fuenf Minuten im Jahr funktionieren",
            "Ponieważ ich maszyny do szycia mogą pracować tylko pięć minut w roku",
          ),
        },
        {
          text: T(
            "Because they forgot how to make additional copies",
            "Weil sie vergessen haben, wie man weitere Exemplare herstellt",
            "Ponieważ zapomnieli, jak uszyć kolejne egzemplarze",
          ),
        },
      ],
      hint: T(
        "Exclusivity makes buyers feel special and willing to spend extra.",
        "Exklusivitaet laesst Kunden sich besonders fuehlen und mehr bezahlen.",
        "Ekskluzywność sprawia, że klienci czują się wyjątkowo i płacą więcej.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify what happens when a store has way more items than buyers wanting them.",
        "Finde heraus, was passiert, wenn ein Laden viel mehr Waren als Kaeufer hat.",
        "Wskaż, co się dzieje, gdy sklep ma znacznie więcej towaru niż chętnych klientów.",
      ),
      Widget: SupplyDemandWidget,
      hint: T(
        "Shops discount overstocked items to clear shelf space.",
        "Geschaefte reduzieren Preise, um ueberfuellte Regale zu leeren.",
        "Sklepy przeceniają nadmiar towaru, by zwolnić miejsce na półkach.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Have you ever seen the price of concert tickets or airline flights jump when everyone wanted them at once?",
    "Frage deine Eltern: Habt ihr schon erlebt, wie Konzertkarten oder Fluege teurer wurden, als alle gleichzeitig buchen wollten?",
    "Zapytaj rodziców: Czy widzieliście, jak bilety na koncert lub loty drożały, gdy wszyscy chcieli je kupić w tym samym czasie?",
  ),
  realLife: {
    title: T(
      "Real world: Sneaker drops and diamond vaults",
      "Echte Welt: Sneaker-Drops und Diamantentresore",
      "Prawdziwy świat: Dropy sneakersów i skarbce diamentów",
    ),
    body: T(
      "When streetwear brands announce a limited sneaker drop, thousands of buyers register online for the chance to buy one pair. Seconds after selling out, pairs appear on resale platforms at triple the original retail price because supply was capped while demand remained intense.",
      "Wenn Modemarken limitierte Sneaker herausbringen, registrieren sich Tausende fuer wenige Paare. Sekunden nach Verkaufsstart werden sie im Internet zum dreifachen Preis weiterverkauft, weil das Angebot kuenstlich knapp gehalten wurde.",
      "Gdy znane marki ogłaszają limitowany drop butów, tysiące chętnych zapisuje się na losowanie. Chwilę po wyprzedaniu pary trafiają na portale aukcyjne za trzykrotność ceny sklepowej, ponieważ podaż była ściśle ograniczona przy ogromnym popycie.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Adam Smith detailed market price determination through supply and effectual demand in The Wealth of Nations (1776).",
          "Adam Smith beschrieb die Preisbildung durch Angebot und Nachfrage im Wohlstand der Nationen (1776).",
          "Adam Smith opisał kształtowanie cen przez podaż i popyt w Dziele Bogactwo Narodów (1776).",
        ),
        source: "https://www.gutenberg.org/ebooks/3300",
      },
      {
        text: T(
          "Thorstein Veblen introduced the concept of conspicuous consumption and prestige goods in 1899.",
          "Thorstein Veblen praegte 1899 das Konzept des demonstrativen Konsums und der Prestigegueter.",
          "Thorstein Veblen wprowadził pojęcie ostentacyjnej konsumpcji i dóbr prestiżowych w 1899 roku.",
        ),
        source: "https://www.gutenberg.org/ebooks/833",
      },
      {
        text: T(
          "The De Beers diamond cartel controlled over 80% of world rough diamond distribution during the 20th century to regulate supply.",
          "Das De-Beers-Kartell kontrollierte im 20. Jahrhundert ueber 80 Prozent des weltweiten Rohdiamantenhandels.",
          "Kartel De Beers kontrolował w XX wieku ponad 80 procent światowego handlu surowymi diamentami.",
        ),
        source: "https://www.justice.gov/archive/atr/public/press_releases/2004/204732.htm",
      },
      {
        text: T(
          "The US Federal Trade Commission enforces rules against deceptive artificial scarcity claims under Section 5 of the FTC Act.",
          "Die US-Wettbewerbsbehoerde FTC verbietet irrefuehrende falsche Verknappungshinweise im Onlinehandel.",
          "Amerykańska FTC ściga wprowadzające w błąd deklaracje o sztucznej rzadkości na mocy art. 5 ustawy FTC Act.",
        ),
        source: "https://www.ftc.gov/legal-library/browse/statutes/federal-trade-commission-act",
      },
      {
        text: T(
          "The global athletic footwear resale market grew past six billion dollars by 2021 driven by limited-edition drops.",
          "Der weltweite Zweitmarkt fuer Sammlersneaker ueberschritt 2021 sechs Milliarden Dollar durch limitierte Drops.",
          "Światowy rynek wtórny rzadkich butów sportowych przekroczył 6 miliardów dolarów do 2021 roku.",
        ),
        source:
          "https://www.statista.com/statistics/1109968/sneaker-resale-market-value-worldwide/",
      },
    ],
    simplified: [
      T(
        "Complex auction mechanics and resale trading bots are simplified into a direct price balancer.",
        "Komplexe Auktionsmechanismen und Handelsbots wurden zu einer uebersichtlichen Preiswaage vereinfacht.",
        "Złożone mechanizmy aukcyjne i boty zakupowe uproszczono do przejrzystej wagi cenowej.",
      ),
    ],
  },
};
