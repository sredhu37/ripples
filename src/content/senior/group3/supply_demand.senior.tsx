import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function EquilibriumCurvesDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Supply and demand equilibrium curve diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      {/* Axes */}
      <line x1="60" y1="30" x2="60" y2="190" stroke="#94a3b8" strokeWidth="2" />
      <line x1="60" y1="190" x2="360" y2="190" stroke="#94a3b8" strokeWidth="2" />
      <text x="35" y="40" fontSize="11" fill="#94a3b8" fontWeight="bold">Price</text>
      <text x="350" y="210" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="bold">Quantity</text>

      {/* Demand Curve (Downward sloping) */}
      <line x1="80" y1="50" x2="320" y2="170" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
      <text x="325" y="175" fontSize="11" fill="#f43f5e" fontWeight="bold">Demand</text>

      {/* Supply Curve (Upward sloping) */}
      <line x1="80" y1="170" x2="320" y2="50" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
      <text x="325" y="55" fontSize="11" fill="#0ea5e9" fontWeight="bold">Supply</text>

      {/* Equilibrium point */}
      <circle cx="200" cy="110" r="6" fill="#facc15" stroke="#fff" strokeWidth="2" />
      <line x1="60" y1="110" x2="200" y2="110" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="200" y1="110" x2="200" y2="190" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="210" y="105" fontSize="11" fill="#facc15" fontWeight="bold">Equilibrium</text>

      {step >= 1 && (
        <g>
          {/* Artificial quota vertical line */}
          <line x1="130" y1="40" x2="130" y2="190" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="4 2" />
          <circle cx="130" cy="75" r="5" fill="#a855f7" />
          <text x="135" y="70" fontSize="10" fill="#c084fc" fontWeight="bold">Scarcity Price</text>
          <text x="130" y="210" textAnchor="middle" fontSize="10" fill="#c084fc">Quota Cap</text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [demandLevel, setDemandLevel] = useState<"normal" | "hyped">("normal");
  const [quotaApplied, setQuotaApplied] = useState(false);

  // Equilibrium logic
  const basePrice = demandLevel === "hyped" ? 180 : 100;
  const price = quotaApplied ? Math.round(basePrice * 1.8) : basePrice;
  const quantity = quotaApplied ? 30 : demandLevel === "hyped" ? 140 : 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1.05rem" }}>
        Market Price: ${price} | Volume: {quantity} units {quotaApplied ? "(Restricted)" : "(Equilibrium)"}
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setDemandLevel((d) => (d === "normal" ? "hyped" : "normal"))}
        >
          Demand: {demandLevel === "hyped" ? "Viral Craze" : "Standard"}
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
          {quotaApplied ? "Remove Quota (Free Market)" : "Enforce Artificial Quota"}
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
          ? "Artificial Scarcity: Restricting volume to 30 units drives the clearing price to $" + price + " (Scarcity Premium)!"
          : "Competitive Equilibrium: Prices adjust naturally so quantity supplied matches quantity demanded."}
      </div>
    </div>
  );
}

function SeniorSupplyDemandWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What defines a Veblen luxury good in economic theory?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Demand drops to zero when incomes rise</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Demand rises as price climbs because high cost signals exclusive social status</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>The product is legally prohibited from being advertised</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "supply_demand",
  story: [
    animatedBeat(
      [
        T("In free markets, prices act as information signals coordinating millions of independent buyers and sellers.", "In freien Maerkten wirken Preise als Informationssignale fuer Millionen von Kaeufern und Verkaeufern.", "Na wolnych rynkach ceny działają jak sygnały informacyjne koordynujące miliony kupujących i sprzedających."),
        T("Sellers willingly supply more units when prices rise: this produces the upward-sloping *supply curve*.", "Anbieter stellen bei steigenden Preisen mehr Waren her: Das erzeugt die steigende *Angebotskurve*.", "Sprzedawcy chętniej dostarczają towar przy wyższych cenach: to tworzy rosnącą *krzywą podaży*."),
        T("Conversely, buyers purchase fewer units as prices rise: this produces the downward-sloping *demand curve*.", "Kaeufer fragen bei hoeheren Preisen weniger nach: Das erzeugt die fallende *Nachfragekurve*.", "Z kolei kupujący nabywają mniej dóbr przy wyższych cenach: to tworzy opadającą *krzywą popytu*."),
      ],
      EquilibriumCurvesDiagram,
    ),
    animatedBeat(
      [
        T("Where these two fundamental curves intersect, markets establish the *market equilibrium price*.", "Wo sich beide Kurven schneiden, bildet sich der *Gleichgewichtspreis*.", "W punkcie przecięcia obu krzywych powstaje *cena równowagi rynkowej*."),
        T("At this exact price, the quantity producers wish to sell matches the quantity consumers wish to buy.", "Zu diesem Preis entspricht die angebotene Menge exakt der nachgefragten Menge.", "Przy tej cenie ilość dóbr oferowanych przez producentów odpowiada ilości pożądanej przez konsumentów."),
        T("If prices sit above equilibrium, unsold surplus accumulates; if prices sit below, painful shortages occur.", "Liegt der Preis darueber, droht Ueberschuss; liegt er darunter, entstehen Engpaesse.", "Jeśli cena jest powyżej równowagi, powstaje nadwyżka; jeśli poniżej, pojawiają się braki."),
      ],
      EquilibriumCurvesDiagram,
    ),
    animatedBeat(
      [
        T("Not all goods respond to price changes equally: economists measure this via *price elasticity*.", "Nicht alle Gueter reagieren gleich: Fachleute messen dies ueber die *Preiselastizitaet*.", "Nie wszystkie dobra reagują tak samo: ekonomiści mierzą to poprzez *elastyczność cenową*."),
        T("Necessities like life-saving insulin have *inelastic demand*: people must purchase them regardless of cost.", "Lebensnotwendige Medikamente haben eine *unelastische Nachfrage*: Man braucht sie um jeden Preis.", "Leki ratujące życie charakteryzują się *nieelastycznym popytem*: kupuje się je bez względu na cenę."),
        T("Non-essential luxuries have *elastic demand*: even modest price hikes prompt consumers to seek substitutes.", "Luxusartikel besitzen eine *elastische Nachfrage*: Bei Preisanstiegen weichen Kunden sofort aus.", "Zwykłe dobra luksusowe mają *elastyczny popyt*: przy wzroście cen konsumenci natychmiast szukają zamienników."),
      ],
      EquilibriumCurvesDiagram,
    ),
    animatedBeat(
      [
        T("Certain luxury houses deliberately subvert standard curves through *artificial scarcity*.", "Einige Luxushaeuser hebeln normale Kurven durch *kuenstliche Verknappung* gezielt aus.", "Niektóre domy mody celowo omijają standardowe krzywe przez *sztuczną rzadkość*."),
        T("Brands cap production of prestige watches and leather bags, creating multi-year waiting lists.", "Hersteller drosseln die Produktion von Uhren und Taschen, was jahrelange Wartelisten erzeugt.", "Marki ograniczają produkcję prestiżowych zegarków i torebek, tworząc wieloletnie listy oczekujących."),
        T("These items behave as *Veblen goods*: higher prices increase their perceived desirability and status.", "Solche Artikel wirken als *Veblen-Gueter*: Hoehere Preise steigern ihr gesellschaftliches Ansehen.", "Takie produkty działają jak *dobra Veblena*: wyższa cena zwiększa ich prestiż i pożądanie społeczne."),
      ],
      EquilibriumCurvesDiagram,
    ),
    animatedBeat(
      [
        T("Cartels also manufacture scarcity by colluding on strict *output quotas*.", "Kartelle schaffen kuenstliche Verknappung durch geheime Absprachen ueber *Foerderquoten*.", "Kartele wytwarzają sztuczną rzadkość poprzez zmowy i ścisłe *kwoty wydobycia*."),
        T("By restricting aggregate output, cartels extract monopoly rents from end consumers.", "Indem sie das Angebot beschraenken, schoepfen Kartelle kuenstlich hohe Monopolgewinne ab.", "Ograniczając łączną podaż, kartele wymuszają na konsumentach zawyżone renty monopolowe."),
        T("Recognizing the difference between natural cost and engineered scarcity is vital for investors.", "Fuer Investoren ist es entscheidend, echte Kosten von kuenstlicher Knappheit zu unterscheiden.", "Dla inwestorów kluczowe jest odróżnienie naturalnych kosztów od zaplanowanej sztucznej rzadkości."),
      ],
      EquilibriumCurvesDiagram,
    ),
  ],
  toyIntro: T(
    "Manipulate demand curves and impose production quotas to observe the creation of scarcity premiums.",
    "Verschiebe Nachfragekurven und setze Foerderquoten ein, um Knappheitsaufschlaege zu analysieren.",
    "Manipuluj krzywymi popytu i nakładaj kwoty produkcyjne, aby zaobserwować premie za rzadkość.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What happens in a market when the prevailing price is set far above the equilibrium level?",
        "Was geschieht auf einem Markt, wenn der Preis weit ueber dem Gleichgewichtspreis liegt?",
        "Co dzieje się na rynku, gdy cena ustala się znacznie powyżej poziomu równowagi?",
      ),
      options: [
        { text: T("Sellers produce more than buyers want, resulting in an unsold surplus", "Verkaeufer bieten mehr an als Kaeufer wollen, es entsteht ein Ueberschuss", "Sprzedawcy produkują więcej, niż kupujący chcą nabyć, co rodzi nadwyżkę"), correct: true },
        { text: T("Buyers rush to purchase infinite quantities instantly", "Kaeufer kaufen blitzschnell unbegrenzte Mengen auf", "Kupujący natychmiast wykupują nieskończone ilości towaru") },
        { text: T("All factories spontaneously transform into public libraries", "Alle Fabriken verwandeln sich spontan in oeffentliche Bibliotheken", "Wszystkie fabryki przekształcają się w biblioteki publiczne") },
      ],
      hint: T(
        "High prices incentivize excessive supply while discouraging buyers.",
        "Hohe Preise locken Anbieter an, schrecken aber Kaeufer ab.",
        "Wysokie ceny zachęcają do podaży, ale zniechęcają kupujących.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why do cartels restrict total industry output below free market capacity?",
        "Warum drosseln Kartelle die Gesamtproduktion unter das freie Marktniveau?",
        "Dlaczego kartele ograniczają łączną produkcję poniżej poziomu wolnego rynku?",
      ),
      options: [
        { text: T("To engineer artificial scarcity and force clearing prices significantly higher", "Um kuenstliche Knappheit zu erzeugen und die Preise deutlich nach oben zu treiben", "Aby wywołać sztuczną rzadkość i wymusić znacznie wyższe ceny na rynku"), correct: true },
        { text: T("To ensure every citizen gets a free sample by mail", "Damit jeder Buerger ein kostenloses Probeexemplar per Post erhaelt", "Aby każdy obywatel otrzymał darmową próbkę pocztą") },
        { text: T("Because their cargo ships refuse to travel on sunny days", "Weil ihre Frachtschiffe sich weigern, an sonnigen Tagen zu fahren", "Ponieważ ich statki towarowe nie chcą pływać w słoneczne dni") },
      ],
      hint: T(
        "Constraining supply shifts the equilibrium price upward along the demand curve.",
        "Das Verknappen des Angebots treibt den Preis auf der Nachfragekurve hoch.",
        "Ograniczenie podaży przesuwa cenę w górę wzdłuż krzywej popytu.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the economic definition of a Veblen luxury good.",
        "Waehle die oekonomische Definition eines Veblen-Luxusguts aus.",
        "Wskaż ekonomiczną definicję dobra luksusowego Veblena.",
      ),
      Widget: SeniorSupplyDemandWidget,
      hint: T(
        "High price serves as a conspicuous badge of social status.",
        "Ein hoher Preis dient als sichtbares Statussymbol.",
        "Wysoka cena służy jako widoczny symbol statusu społecznego.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Why do top luxury brands like Rolex or Hermès avoid holding end-of-season clearance sales?",
    "Frage deine Eltern: Warum verzichten Top-Luxusmarken wie Rolex oder Hermès auf saisonale Schlussverkaeufe?",
    "Zapytaj rodziców: Dlaczego topowe marki luksusowe unikają posezonowych wyprzedaży i obniżek cen?",
  ),
  realLife: {
    title: T(
      "Real world: Luxury waiting lists and allocation exclusivity",
      "Echte Welt: Wartelisten fuer Luxusuhren und Zuteilungsmodelle",
      "Prawdziwy świat: Listy oczekujących na zegarki i systemy przydziału",
    ),
    body: T(
      "Swiss luxury watchmakers produce fewer stainless steel sports timepieces than market demand dictates. Authorized dealers vet prospective clients, requiring extensive purchase histories before allocating a watch, ensuring secondary market values trade at significant premiums over official list prices.",
      "Schweizer Luxusuhrenbauer produzieren gezielt weniger Stahluhren als nachgefragt werden. Konzessionaere pruefen Kunden und verlangen Kaufhistorien vor einer Zuteilung, wodurch Gebrauchtpreise weit ueber dem Listenpreis liegen.",
      "Szwajcarscy producenci luksusowych zegarków celowo wytwarzają mniej modeli ze stali niż wynosi popyt rynkowy. Autoryzowani sprzedawcy weryfikują klientów i wymagają historii zakupów przed przydziałem zegarka, co winduje ceny na rynku wtórnym.",
    ),
  },
  factCard: {
    claims: [
      { text: T("Alfred Marshall formalized modern supply and demand curve models in Principles of Economics (1890).", "Alfred Marshall formalisierte moderne Angebots- und Nachfragekurven in Principles of Economics (1890).", "Alfred Marshall sformalizował współczesne modele krzywych podaży i popytu w Principles of Economics (1890)."), source: "https://www.gutenberg.org/ebooks/43453" },
      { text: T("Thorstein Veblen analyzed conspicuous leisure and status consumption in The Theory of the Leisure Class (1899).", "Thorstein Veblen analysierte demonstrativen Konsum in The Theory of the Leisure Class (1899).", "Thorstein Veblen zbadał ostentacyjną konsumpcję w The Theory of the Leisure Class (1899)."), source: "https://www.gutenberg.org/ebooks/833" },
      { text: T("Jean Tirole received the 2014 Nobel Prize in Economic Sciences for his analysis of market power and regulation of cartels.", "Jean Tirole erhielt 2014 den Wirtschaftsnobelpreis fuer seine Analysen zu Marktmacht und Kartellregulierung.", "Jean Tirole otrzymał Nagrodę Nobla w 2014 roku za analizę siły rynkowej i regulacji monopoli."), source: "https://www.nobelprize.org/prizes/economic-sciences/2014/summary/" },
      { text: T("The Sherman Antitrust Act of 1890 outlaws contracts, combinations, and conspiracies in restraint of interstate trade.", "Der Sherman Antitrust Act von 1890 verbietet wettbewerbswidrige Kartellabsprachen und Monopole in den USA.", "Ustawa Shermana z 1890 roku delegalizuje kartele, monopole i zmowy ograniczające handel międzystanowy."), source: "https://www.archives.gov/milestone-documents/sherman-anti-trust-act" },
      { text: T("Bain & Company's Global Luxury Market Report tracks controlled supply distribution across personal luxury categories.", "Der Luxusmarktbericht von Bain & Company analysiert kontrollierte Vertriebsstrategien der Luxusbranche.", "Raport rynku dóbr luksusowych Bain & Company analizuje strategie kontrolowanej podaży marek premium."), source: "https://www.bain.com/insights/topics/luxury-goods-worldwide-market-study/" },
    ],
    simplified: [
      T(
        "Complex non-linear consumer utility functions and game-theoretic cartel retaliation are modeled as direct quota constraints.",
        "Nicht-lineare Nutzenfunktionen und spieltheoretische Kartellstrafen wurden als direkte Foerderquoten modelliert.",
        "Nieliniowe funkcje użyteczności i teoriogrowe sankcje kartelowe uproszczono do bezpośrednich limitów kwotowych.",
      ),
    ],
  },
};
