import { useEffect, useState } from "react";
import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Person } from "../components/icons";
import { ActionPrompt, CheckButton, Stage } from "../lesson/toolkit";
import type { Lang } from "../progress";

export interface BakeryState {
  price: number; // 2 or 3 or 4 coins
  hasHoneyOrSesame: boolean;
}

export function calcCompetitionOutcome(bea: BakeryState, luca: BakeryState) {
  const beaQuality = bea.hasHoneyOrSesame ? 2 : 0;
  const lucaQuality = luca.hasHoneyOrSesame ? 2 : 0;

  const beaPriceAdvantage = 4 - bea.price; // 2 coins -> 2, 3 coins -> 1, 4 coins -> 0
  const lucaPriceAdvantage = 4 - luca.price;

  const beaScore = beaQuality + beaPriceAdvantage;
  const lucaScore = lucaQuality + lucaPriceAdvantage;

  let beaCustomers = 5;
  if (beaScore > lucaScore) {
    beaCustomers = Math.min(9, 5 + (beaScore - lucaScore));
  } else if (lucaScore > beaScore) {
    beaCustomers = Math.max(1, 5 - (lucaScore - beaScore));
  }
  const lucaCustomers = 10 - beaCustomers;

  return { beaCustomers, lucaCustomers, beaScore, lucaScore };
}

export function CompetitionToy({
  lang,
  onDone,
  isWidget,
  onWidgetAnswer,
}: {
  lang: Lang;
  onDone?: () => void;
  isWidget?: boolean;
  onWidgetAnswer?: (correct: boolean) => void;
}) {
  const [bea, setBea] = useState<BakeryState>(
    isWidget
      ? { price: 3, hasHoneyOrSesame: false }
      : { price: 3, hasHoneyOrSesame: false },
  );
  const [luca, setLuca] = useState<BakeryState>(
    isWidget
      ? { price: 4, hasHoneyOrSesame: false }
      : { price: 3, hasHoneyOrSesame: true },
  );

  const [testedPrice, setTestedPrice] = useState(false);
  const [testedQuality, setTestedQuality] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<"bea" | "luca" | null>(null);

  const outcome = calcCompetitionOutcome(bea, luca);

  useEffect(() => {
    if (!isWidget && testedPrice && testedQuality) {
      onDone?.();
    }
  }, [testedPrice, testedQuality, onDone, isWidget]);

  const toggleBeaQuality = () => {
    setBea((prev) => ({ ...prev, hasHoneyOrSesame: !prev.hasHoneyOrSesame }));
    if (!isWidget) setTestedQuality(true);
  };

  const setBeaPriceVal = (p: number) => {
    setBea((prev) => ({ ...prev, price: p }));
    if (!isWidget) setTestedPrice(true);
  };

  const toggleLucaQuality = () => {
    setLuca((prev) => ({ ...prev, hasHoneyOrSesame: !prev.hasHoneyOrSesame }));
    if (!isWidget) setTestedQuality(true);
  };

  const setLucaPriceVal = (p: number) => {
    setLuca((prev) => ({ ...prev, price: p }));
    if (!isWidget) setTestedPrice(true);
  };

  const stageLabel =
    lang === "pl"
      ? "Rywalizacja piekarni na ulicy"
      : lang === "de"
      ? "Bäckerei-Wettbewerb"
      : "Bakery street competition";

  const canvasLabel =
    lang === "pl"
      ? "Bea i Luca rywalizują o 10 klientów"
      : lang === "de"
      ? "Bea und Luca werben um 10 Kunden"
      : "Bea and Luca compete for 10 customers";

  const coinsLabel =
    lang === "pl" ? "monet" : lang === "de" ? "Münzen" : "coins";

  const townPlazaLabel =
    lang === "pl"
      ? "Rynek (10 kupujących)"
      : lang === "de"
      ? "Marktplatz (10 Käufer)"
      : "Town Plaza (10 Buyers)";

  const outcomeNote =
    outcome.beaCustomers > outcome.lucaCustomers
      ? lang === "pl"
        ? "Więcej kupujących wybiera Beę!"
        : lang === "de"
        ? "Mehr Kunden wählen Bea!"
        : "More buyers prefer Bea!"
      : outcome.lucaCustomers > outcome.beaCustomers
      ? lang === "pl"
        ? "Więcej kupujących wybiera Lucę!"
        : lang === "de"
        ? "Mehr Kunden wählen Luca!"
        : "More buyers prefer Luca!"
      : lang === "pl"
      ? "Równy podział klientów!"
      : lang === "de"
      ? "Gleichmäßige Aufteilung!"
      : "Equal customer choice!";

  const promptText = !testedQuality
    ? lang === "pl"
      ? "Wypróbuj ulepszenie przepisu u Bei lub Luci, aby zobaczyć, jak wysoka jakość przyciąga klientów!"
      : lang === "de"
      ? "Probiere ein Rezept-Upgrade für Bea oder Luca aus, um zu sehen, wie Qualität Kunden anzieht!"
      : "Try upgrading the recipe for Bea or Luca to see quality attract more customers!"
    : !testedPrice
    ? lang === "pl"
      ? "Teraz zmień cenę, aby sprawdzić, jak kupujący reagują na tańsze wypieki!"
      : lang === "de"
      ? "Ändere nun den Preis, um zu sehen, wie Kunden auf günstigere Brötchen reagieren!"
      : "Now try changing the price to see how shoppers react to cheaper bread!"
    : lang === "pl"
    ? "Zobacz, jak konkurencja motywuje obu piekarzy do oferowania lepszego pieczywa w uczciwych cenach!"
    : lang === "de"
    ? "Siehst du, wie Wettbewerb beide Bäcker dazu bringt, besseres Brot zu fairen Preisen anzubieten!"
    : "Notice how competition drives both bakers to offer better bread at fair prices!";

  return (
    <div className="competition-wrap">
      <Stage label={stageLabel}>
        <DiagramCanvas label={canvasLabel}>
          {/* Bea's Bakery */}
          <Pop x={20} y={35}>
            <rect x="0" y="0" width="180" height="185" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <Person {...CAST.Bea} x={45} y={10} size={90} />
            <text className="diagram-name" x={90} y={115} textAnchor="middle">
              Bea
            </text>
            <rect x="15" y="125" width="150" height="48" rx="8" fill="#fef3c7" />
            <text x="90" y="145" textAnchor="middle" fill="#b45309" fontSize={12} fontWeight="bold">
              {bea.hasHoneyOrSesame
                ? lang === "pl"
                  ? "Chleb miodowy (+Jakość)"
                  : lang === "de"
                  ? "Honigbrot (+Qualität)"
                  : "Honey Bread (+Quality)"
                : lang === "pl"
                ? "Zwykły chleb"
                : lang === "de"
                ? "Einfaches Brot"
                : "Plain Bread"}
            </text>
            <text x="90" y="163" textAnchor="middle" fill="#78350f" fontSize={11}>
              {bea.price} {coinsLabel}
            </text>
          </Pop>

          {/* Center Plaza with Customers */}
          <Pop x={220} y={35}>
            <rect x="0" y="0" width="200" height="185" rx="14" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
            <text x="100" y="25" textAnchor="middle" fill="#334155" fontSize={12} fontWeight="bold">
              {townPlazaLabel}
            </text>

            <g transform="translate(15, 45)">
              <rect x="0" y="0" width="80" height="60" rx="8" fill="#dcfce7" />
              <text x="40" y="24" textAnchor="middle" fill="#15803d" fontSize={11} fontWeight="bold">
                Bea
              </text>
              <text x="40" y="48" textAnchor="middle" fill="#15803d" fontSize={18} fontWeight="bold">
                {outcome.beaCustomers}
              </text>

              <rect x="90" y="0" width="80" height="60" rx="8" fill="#dbeafe" />
              <text x="130" y="24" textAnchor="middle" fill="#1d4ed8" fontSize={11} fontWeight="bold">
                Luca
              </text>
              <text x="130" y="48" textAnchor="middle" fill="#1d4ed8" fontSize={18} fontWeight="bold">
                {outcome.lucaCustomers}
              </text>
            </g>

            <text x="100" y="135" textAnchor="middle" fill="#64748b" fontSize={11}>
              {outcomeNote}
            </text>
          </Pop>

          {/* Luca's Bakery */}
          <Pop x={440} y={35}>
            <rect x="0" y="0" width="180" height="185" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <Person {...CAST.Luca} x={45} y={10} size={90} />
            <text className="diagram-name" x={90} y={115} textAnchor="middle">
              Luca
            </text>
            <rect x="15" y="125" width="150" height="48" rx="8" fill="#dbeafe" />
            <text x="90" y="145" textAnchor="middle" fill="#1d4ed8" fontSize={12} fontWeight="bold">
              {luca.hasHoneyOrSesame
                ? lang === "pl"
                  ? "Bułki sezamowe (+Jakość)"
                  : lang === "de"
                  ? "Sesambrötchen (+Qualität)"
                  : "Sesame Rolls (+Quality)"
                : lang === "pl"
                ? "Suche bułki"
                : lang === "de"
                ? "Trockene Brötchen"
                : "Dry Rolls"}
            </text>
            <text x="90" y="163" textAnchor="middle" fill="#1e3a8a" fontSize={11}>
              {luca.price} {coinsLabel}
            </text>
          </Pop>
        </DiagramCanvas>
      </Stage>

      {!isWidget && (
        <div className="competition-controls">
          <div className="competition-shop-controls">
            <strong>
              {lang === "pl"
                ? "Stoisko Bei:"
                : lang === "de"
                ? "Beas Stand:"
                : "Bea's Stall:"}
            </strong>
            <div className="row">
              <button
                type="button"
                className={`choice-btn ${bea.hasHoneyOrSesame ? "selected" : ""}`}
                onClick={toggleBeaQuality}
              >
                {bea.hasHoneyOrSesame
                  ? lang === "pl"
                    ? "Przepis miodowy (aktywny)"
                    : lang === "de"
                    ? "Honig-Rezept (Aktiv)"
                    : "Honey Recipe (Active)"
                  : lang === "pl"
                  ? "Piecz z miodem"
                  : lang === "de"
                  ? "Honig-Rezept backen"
                  : "Add Honey Recipe"}
              </button>
              <button
                type="button"
                className={`choice-btn ${bea.price === 2 ? "selected" : ""}`}
                onClick={() => setBeaPriceVal(2)}
              >
                {lang === "pl"
                  ? "Cena: 2 monety"
                  : lang === "de"
                  ? "Preis: 2 Münzen"
                  : "Price: 2 coins"}
              </button>
              <button
                type="button"
                className={`choice-btn ${bea.price === 3 ? "selected" : ""}`}
                onClick={() => setBeaPriceVal(3)}
              >
                {lang === "pl"
                  ? "Cena: 3 monety"
                  : lang === "de"
                  ? "Preis: 3 Münzen"
                  : "Price: 3 coins"}
              </button>
            </div>
          </div>

          <div className="competition-shop-controls">
            <strong>
              {lang === "pl"
                ? "Stoisko Luci:"
                : lang === "de"
                ? "Lucas Stand:"
                : "Luca's Stall:"}
            </strong>
            <div className="row">
              <button
                type="button"
                className={`choice-btn ${luca.hasHoneyOrSesame ? "selected" : ""}`}
                onClick={toggleLucaQuality}
              >
                {luca.hasHoneyOrSesame
                  ? lang === "pl"
                    ? "Przepis sezamowy (aktywny)"
                    : lang === "de"
                    ? "Sesam-Rezept (Aktiv)"
                    : "Sesame Recipe (Active)"
                  : lang === "pl"
                  ? "Piecz z sezamem"
                  : lang === "de"
                  ? "Sesam-Rezept backen"
                  : "Add Sesame Recipe"}
              </button>
              <button
                type="button"
                className={`choice-btn ${luca.price === 2 ? "selected" : ""}`}
                onClick={() => setLucaPriceVal(2)}
              >
                {lang === "pl"
                  ? "Cena: 2 monety"
                  : lang === "de"
                  ? "Preis: 2 Münzen"
                  : "Price: 2 coins"}
              </button>
              <button
                type="button"
                className={`choice-btn ${luca.price === 3 ? "selected" : ""}`}
                onClick={() => setLucaPriceVal(3)}
              >
                {lang === "pl"
                  ? "Cena: 3 monety"
                  : lang === "de"
                  ? "Preis: 3 Münzen"
                  : "Price: 3 coins"}
              </button>
            </div>
          </div>

          <ActionPrompt lang={lang}>{promptText}</ActionPrompt>
        </div>
      )}

      {isWidget && (
        <div className="competition-widget-controls">
          <div className="row">
            <button
              type="button"
              className={`choice-btn ${selectedWinner === "bea" ? "selected" : ""}`}
              onClick={() => setSelectedWinner("bea")}
            >
              {lang === "pl"
                ? "Bea (3 monety, ciepły chleb miodowy)"
                : lang === "de"
                ? "Bea (3 Münzen, warmes Honigbrot)"
                : "Bea (3 coins, warm honey bread)"}
            </button>
            <button
              type="button"
              className={`choice-btn ${selectedWinner === "luca" ? "selected" : ""}`}
              onClick={() => setSelectedWinner("luca")}
            >
              {lang === "pl"
                ? "Luca (4 monety, suchy chleb)"
                : lang === "de"
                ? "Luca (4 Münzen, trockenes Brot)"
                : "Luca (4 coins, dry bread)"}
            </button>
          </div>
          {onWidgetAnswer && (
            <div className="row nav">
              <CheckButton
                lang={lang}
                onClick={() => onWidgetAnswer(selectedWinner === "bea")}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
