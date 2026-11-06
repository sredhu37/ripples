import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function LaborAndAssetScarcityDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Labor and asset scarcity curve diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2" />

      {step === 0 && (
        <g>
          {/* Labor supply curve elasticity */}
          <line x1="50" y1="30" x2="50" y2="190" stroke="#94a3b8" strokeWidth="2" />
          <line x1="50" y1="190" x2="360" y2="190" stroke="#94a3b8" strokeWidth="2" />
          <text x="30" y="40" fontSize="11" fill="#94a3b8" fontWeight="bold">Wage</text>
          <text x="350" y="210" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="bold">Workers</text>

          {/* Elastic supply (flat line) */}
          <line x1="60" y1="150" x2="340" y2="135" stroke="#64748b" strokeWidth="2.5" />
          <text x="345" y="135" fontSize="10" fill="#94a3b8">Elastic (Generalist)</text>

          {/* Inelastic supply (steep line) */}
          <line x1="120" y1="180" x2="160" y2="40" stroke="#38bdf8" strokeWidth="3" />
          <text x="170" y="50" fontSize="11" fill="#38bdf8" fontWeight="bold">Inelastic (Scarce Specialists)</text>
          <text x="200" y="100" fontSize="11" fill="#facc15">Steep Supply = Bidding Wars!</text>
        </g>
      )}

      {step === 1 && (
        <g>
          {/* Stock to Flow comparison */}
          <text x="200" y="45" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f8fafc">Stock-to-Flow Ratio (Asset Scarcity)</text>
          {/* Gold: huge stock, tiny flow */}
          <rect x="60" y="70" width="120" height="110" rx="8" fill="#eab308" />
          <text x="120" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#422006">Gold Stock</text>
          <text x="120" y="125" textAnchor="middle" fontSize="11" fill="#713f12">212,500 Tons</text>
          <rect x="60" y="185" width="120" height="15" rx="3" fill="#fef08a" />
          <text x="120" y="196" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#713f12">Flow: +1.5% / year</text>

          {/* Industrial metal: small stock, massive flow */}
          <rect x="220" y="120" width="120" height="60" rx="8" fill="#64748b" />
          <text x="280" y="150" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f8fafc">Copper Stock</text>
          <rect x="220" y="185" width="120" height="15" rx="3" fill="#94a3b8" />
          <text x="280" y="196" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">Flow: +85% / year</text>
        </g>
      )}

      {step >= 2 && (
        <g>
          {/* Human capital compounding */}
          <rect x="50" y="40" width="300" height="150" rx="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <text x="200" y="70" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#60a5fa">Compound Human Capital</text>
          <text x="200" y="100" textAnchor="middle" fontSize="11" fill="#e2e8f0">Rare domain intersection: AI + Medicine + Law</text>
          <circle cx="140" cy="140" r="28" fill="#3b82f6" fillOpacity="0.4" stroke="#60a5fa" strokeWidth="1.5" />
          <circle cx="200" cy="140" r="28" fill="#10b981" fillOpacity="0.4" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="260" cy="140" r="28" fill="#f59e0b" fillOpacity="0.4" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="200" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f8fafc">Peak Pricing Power</text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [yearsOfStudy, setYearsOfStudy] = useState(3);
  const [assetClass, setAssetClass] = useState<"fiat" | "gold">("gold");

  // Calculations
  const salary = Math.round(35000 + Math.pow(yearsOfStudy, 1.8) * 6500);
  const scarcityLevel = yearsOfStudy >= 8 ? "Extreme (Top 0.5%)" : yearsOfStudy >= 5 ? "High (Top 5%)" : "Moderate";
  const stockToFlow = assetClass === "gold" ? "High (65 years of production in stock)" : "Low (Continuous dilution)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1.05rem" }}>
        Market Compensation: ${salary.toLocaleString()} / year ({scarcityLevel})
      </p>

      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            const next = yearsOfStudy >= 9 ? 2 : yearsOfStudy + 2;
            setYearsOfStudy(next);
            if (next >= 7) onDone?.();
          }}
        >
          Specialization Barrier: {yearsOfStudy} Years
        </button>

        <button
          type="button"
          className="btn"
          onClick={() => {
            setAssetClass((a) => (a === "gold" ? "fiat" : "gold"));
            onDone?.();
          }}
        >
          Asset Type: {assetClass === "gold" ? "Physical Gold" : "Fiat Paper"}
        </button>
      </div>

      <div
        style={{
          padding: "12px",
          background: yearsOfStudy >= 6 ? "#f0fdf4" : "#f8fafc",
          border: `1px solid ${yearsOfStudy >= 6 ? "#86efac" : "#cbd5e1"}`,
          borderRadius: "10px",
          maxWidth: "380px",
          textAlign: "center",
          fontSize: "0.9rem",
        }}
      >
        Asset Resilience: {stockToFlow}.
        <br />
        Labor Dynamics: High barriers to entry make labor supply inelastic, forcing employers to bid for scarce human capital!
      </div>
    </div>
  );
}

function SeniorScarcityWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Why does physical gold exhibit superior purchasing power preservation over long horizons?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Because governments guarantee free gold storage in every bank</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Because its high stock-to-flow ratio prevents rapid supply dilution from new mining</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Because gold bars magically multiply overnight</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "scarcity_prices",
  story: [
    animatedBeat(
      [
        T("In classical economic theory, wages are determined by the *marginal revenue product of labor*.", "In der Wirtschaftstheorie bestimmen Loehne das *Grenzerloesprodukt der Arbeit*.", "W teorii ekonomii płace odzwierciedlają *krańcowy przychód z produktu pracy*."),
        T("This represents the incremental value a worker creates multiplied by the difficulty of replacing them.", "Es beziffert den Mehrwert eines Mitarbeiters multipliziert mit seiner Ersetzbarkeit.", "Oznacza to wartość dodaną generowaną przez pracownika pomnożoną przez trudność jego zastąpienia."),
        T("For roles requiring general skills, labor supply is highly *elastic*: higher wages attract floods of candidates.", "Fuer einfache Rollen ist das Angebot *elastisch*: Hoehere Loehne locken sofort Massen an.", "Dla prostych ról podaż pracy jest wysoce *elastyczna*: wyższe płace przyciągają tłumy chętnych."),
      ],
      LaborAndAssetScarcityDiagram,
    ),
    animatedBeat(
      [
        T("When an occupation demands a decade of rigorous training, labor supply becomes nearly *inelastic*.", "Erfordert ein Beruf jahrelange Spezialausbildung, wird das Arbeitsangebot *unelastisch*.", "Gdy zawód wymaga dekady trudnej nauki, podaż pracy staje się niemal *nieelastyczna*."),
        T("Examples include semiconductor lithography engineers, neurosurgeons, and quantitative researchers.", "Beispiele sind Halbleiter-Ingenieure, Neurochirurgen oder quantitative Forscher.", "Przykłady to inżynierowie litografii półprzewodników, neurochirurdzy czy badacze modeli ilościowych."),
        T("Because qualified personnel are strictly scarce, institutions engage in intense bidding wars to secure talent.", "Da Experten rar sind, liefern sich Unternehmen Bieterwettbewerbe um die besten Koepfe.", "Ponieważ eksperci są ściśle reglamentowani, firmy toczą wojny przetargowe o najlepsze talenty."),
      ],
      LaborAndAssetScarcityDiagram,
    ),
    animatedBeat(
      [
        T("The exact same scarcity mechanics determine the enduring value of monetary assets like *gold*.", "Exakt dieselbe Knappheitsmechanik bestimmt den Wert von Geldwerten wie *Gold*.", "Dokładnie ta sama mechanika rzadkości determinuje trwałą wartość aktywów takich jak *złoto*."),
        T("Gold possesses an extraordinary *stock-to-flow ratio*: annual mined flow is merely 1.5% of total existing stock.", "Gold hat ein extrem hohes *Stock-to-Flow-Verhaeltnis*: Die Jahresfoerderung betraegt nur 1,5 Prozent des Bestands.", "Złoto cechuje niezwykły *wskaźnik stock-to-flow*: roczne wydobycie to zaledwie 1,5 procent istniejących zasobów."),
        T("Unlike fiat paper currency, no sovereign authority or central bank can arbitrarily inflate the gold supply.", "Anders als Fiatgeld kann keine Notenbank die Goldmenge nach Belieben aufblaehen.", "W przeciwieństwie do walut fiducjarnych, żaden bank centralny nie może z dnia na dzień zwiększyć podaży złota."),
      ],
      LaborAndAssetScarcityDiagram,
    ),
    animatedBeat(
      [
        T("In equity markets, scarcity is governed by a corporation's *public free float*.", "An den Aktienmaerkten steuert der *Streubesitz* (Free Float) die Verfuegbarkeit.", "Na rynkach akcji dostępnością zarządza wskaźnik *akcji w wolnym obrocie* (free float)."),
        T("When a high-growth company lists on an exchange, only a small percentage of total shares circulate freely.", "Geht eine Wachstumsfirma an die Boerse, wird oft nur ein kleiner Bruchteil der Aktien frei gehandelt.", "Gdy spółka wchodzi na giełdę, często tylko niewielki ułamek jej akcji trafia do swobodnego obrotu."),
        T("Vast institutional capital chasing a restricted share float commands enormous valuation multiples.", "Riesige Pensionsfonds, die wenige Aktien jagen, treiben Bewertungsaufschlaege an.", "Wielkie fundusze emerytalne rywalizujące o wąską pulę akcji windują mnożniki wyceny."),
      ],
      LaborAndAssetScarcityDiagram,
    ),
    animatedBeat(
      [
        T("Your greatest economic asset during youth is not financial capital, but your *human capital*.", "Dein wertvollstes wirtschaftliches Gut der Jugend ist dein eigenes *Humankapital*.", "Twoim najcenniejszym aktywem ekonomicznym za młodu nie jest kapitał finansowy, lecz *kapitał ludzki*."),
        T("Acquiring rare, high-leverage technical capabilities protects you against economic cycles and automation.", "Seltene technische Faehigkeiten schuetzen dich vor Krisen und Automatisierung.", "Zdobycie rzadkich, wysokomarżowych umiejętności technicznych chroni cię przed kryzysami i automatyzacją."),
        T("Positioning yourself where demand is high and skill supply is scarce guarantees enduring leverage.", "Dich dort zu positionieren, wo Nachfrage hoch und Angebot knapp ist, sichert langfristigen Erfolg.", "Ustawienie się w miejscu, gdzie popyt jest ogromny, a podaż talentu rzadka, zapewnia trwałą przewagę."),
      ],
      LaborAndAssetScarcityDiagram,
    ),
  ],
  toyIntro: T(
    "Test how specialization barriers shift labor supply inelasticity and investigate asset stock-to-flow ratios.",
    "Untersuche, wie Ausbildungsbarrieren das Angebot verknappen und pruefe Stock-to-Flow-Verhaeltnisse.",
    "Zbadaj, jak bariery wejścia ograniczają podaż pracy i przeanalizuj wskaźniki stock-to-flow dla aktywów.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why do specialized professions with steep educational barriers command significant wage premiums?",
        "Warum erzielen Berufe mit hohen Ausbildungsbarrieren deutliche Lohnaufschlaege?",
        "Dlaczego zawody z wysokimi barierami edukacyjnymi osiągają znaczne premie płacowe?",
      ),
      options: [
        { text: T("Labor supply is highly inelastic, forcing employers to bid competitively for scarce talent", "Das Arbeitsangebot ist hochgradig unelastisch, was Arbeitgeber zu Bieterkaempfen zwingt", "Podaż pracy jest wysoce nieelastyczna, co zmusza pracodawców do walki o rzadkie talenty"), correct: true },
        { text: T("Because they are legally required to accept all salary in frozen strawberries", "Weil sie gesetzlich verpflichtet sind, Gehaelter in Erdbeeren anzunehmen", "Ponieważ prawo nakazuje im przyjmowanie pensji w mrożonych truskawkach") },
        { text: T("Because their job requires zero hours of mental effort per year", "Weil ihre Taetigkeit keinerlei geistigen Aufwand im Jahr erfordert", "Ponieważ ich praca nie wymaga żadnego wysiłku umysłowego w ciągu roku") },
      ],
      hint: T(
        "Inelastic supply means small changes in demand cause large swings in compensation.",
        "Unelastisches Angebot bedeutet, dass Nachfrageverschiebungen die Gehaelter stark bewegen.",
        "Nieelastyczna podaż oznacza, że zmiany popytu powodują gwałtowne ruchy płac."),
    },
    {
      kind: "choice",
      prompt: T(
        "How does a high stock-to-flow ratio protect gold against monetary devaluation?",
        "Wie schuetzt ein hohes Stock-to-Flow-Verhaeltnis Gold vor Entwertung?",
        "W jaki sposób wysoki wskaźnik stock-to-flow chroni złoto przed dewaluacją?",
      ),
      options: [
        { text: T("Annual new production is tiny relative to existing reserves, preventing sudden supply shocks", "Die Jahresfoerderung ist winzig im Vergleich zum Bestand, was Angebotsschocks verhindert", "Roczna produkcja jest znikoma wobec istniejących rezerw, co zapobiega szokom podażowym"), correct: true },
        { text: T("By allowing anyone to print gold certificates on home paper printers", "Indem jeder Buerger Goldzertifikate zu Hause auf Papier ausdrucken darf", "Pozwalając każdemu drukować certyfikaty złota na domowej drukarce") },
        { text: T("By turning all gold coins into lightweight helium balloons", "Indem alle Goldmuenzen in schwebende Heliumballons umgewandelt werden", "Przekształcając wszystkie złote monety w balony z helem") },
      ],
      hint: T(
        "Low flow relative to stock anchors scarcity over decades.",
        "Geringe Zufuhr im Verhaeltnis zum Gesamtbestand stabilisiert den Wert.",
        "Niski dopływ w relacji do całego zasobu stabilizuje rynkową rzadkość."),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify why physical gold maintains its purchasing power over centuries.",
        "Waehle aus, warum Gold seine Kaufkraft ueber Jahrhunderte bewahrt.",
        "Wskaż, dlaczego fizyczne złoto utrzymuje swoją siłę nabywczą przez stulecia.",
      ),
      Widget: SeniorScarcityWidget,
      hint: T(
        "High stock-to-flow anchors gold against supply shocks.",
        "Das hohe Stock-to-Flow-Verhaeltnis schuetzt Gold vor Angebotsschocks.",
        "Wysoki wskaźnik stock-to-flow chroni złoto przed nagłym napływem podaży."),
    },
  ],
  askDad: T(
    "Ask your parent: How does having deep specialized expertise protect an employee's negotiating power during an economic downturn?",
    "Frage deine Eltern: Wie schuetzt tiefes Spezialwissen die Verhandlungsposition eines Mitarbeiters in Krisenzeiten?",
    "Zapytaj rodziców: Jak głęboka wiedza specjalistyczna chroni pozycję przetargową pracownika w czasie kryzysu gospodarczego?",
  ),
  realLife: {
    title: T(
      "Real world: ASML photolithography and quantitative finance",
      "Echte Welt: ASML-Lithografie und quantitative Finanzmodelle",
      "Prawdziwy świat: Litografia ASML i finanse ilościowe",
    ),
    body: T(
      "The Dutch company ASML is the sole manufacturer of Extreme Ultraviolet (EUV) photolithography machines required to manufacture sub-3nm computer chips. Because mastering this optical physics discipline is extraordinarily scarce, ASML commands near-absolute pricing power across the global technology supply chain.",
      "Das niederlaendische Unternehmen ASML ist weltweiter Alleinhersteller von EUV-Lithografiemaschinen fuer modernste Computerchips. Weil dieses physikalische Spezialwissen extrem rar ist, besitzt ASML nahezu uneingeschraenkte Preissetzungsmacht.",
      "Holenderska firma ASML jest jedynym na świecie producentem maszyn fotolitograficznych EUV do wytwarzania procesorów poniżej 3 nm. Ponieważ ta wiedza z fizyki optycznej jest niezwykle rzadka, ASML posiada niemal absolutną siłę cenową w globalnym łańcuchu dostaw.",
    ),
  },
  factCard: {
    claims: [
      { text: T("Gary Becker analyzed human capital investments and formal education wage returns in Human Capital (1964).", "Gary Becker untersuchte Humankapitalinvestitionen und Bildungsrenditen in Human Capital (1964).", "Gary Becker zbadał inwestycje w kapitał ludzki i stopy zwrotu z edukacji w Human Capital (1964)."), source: "https://www.nber.org/books-and-chapters/human-capital-theoretical-and-empirical-analysis-special-reference-education-first-edition" },
      { text: T("The World Gold Council reports annual global gold mine production averages approximately 3,600 metric tons against total stocks of 212,500 metric tons.", "Der World Gold Council meldet jaehrlich ca. 3.600 Tonnen Goldfoerderung bei einem Weltbestand von 212.500 Tonnen.", "World Gold Council raportuje roczne wydobycie złota na poziomie ok. 3600 ton wobec światowych zasobów 212 500 ton."), source: "https://www.gold.org/goldhub/research/gold-demand-trends" },
      { text: T("David Ricardo formulated the Law of Rent in 1817, showing how scarce fertile resources capture differential economic surplus.", "David Ricardo formulierte 1817 das Grundrentenprinzip fuer knappe natuerliche Ressourcen.", "David Ricardo sformułował w 1817 roku teorię renty gruntowej dla ograniczonych zasobów naturalnych."), source: "https://www.gutenberg.org/ebooks/33310" },
      { text: T("Eugene Fama and Kenneth French documented the effect of market capitalization and free float on equity asset returns in 1992.", "Eugene Fama und Kenneth French belegten 1992 den Einfluss von Streubesitz und Marktkapitalisierung auf Aktienrenditen.", "Eugene Fama i Kenneth French wykazali w 1992 roku wpływ kapitalizacji i akcji w wolnym obrocie na stopy zwrotu z akcji."), source: "https://www.jstor.org/stable/2329112" },
      { text: T("The US Bureau of Labor Statistics Occupational Employment Statistics confirms specialized STEM careers earn over double the national median wage.", "Die US-Arbeitsstatistik belegt fuer MINT-Spezialisten mehr als das Doppelte des nationalen Mediangehalts.", "Amerykańskie Biuro Statystyki Pracy potwierdza, że specjaliści STEM zarabiają ponad dwukrotność mediany krajowej."), source: "https://www.bls.gov/oes/current/oes_nat.htm" },
    ],
    simplified: [
      T(
        "Complex multi-asset portfolio covariance and structural wage bargaining institutions are abstracted into fundamental scarcity principles.",
        "Mehrdimensionale Portfoliomodelle und Tarifstrukturen wurden auf fundamentale Knappheitsprinzipien vereinfacht.",
        "Wielowymiarowe modele portfelowe i instytucje układów zbiorowych uproszczono do fundamentalnych zasad rzadkości.",
      ),
    ],
  },
};
