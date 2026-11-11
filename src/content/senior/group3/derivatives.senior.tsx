import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function FarmerMillerContractDiagram({ lang, step }: DiagramProps) {
  const arjunName = lang === "pl" ? "Artur" : lang === "de" ? "Arno" : "Arjun";
  const label =
    lang === "pl"
      ? "Artur podpisuje kontrakt terminowy zabezpieczający cenę mąki"
      : lang === "de"
        ? "Arno sichert den Mehlpreis ueber einen Terminkontrakt ab"
        : "Arjun locking flour prices through a derivative contract";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#f59e0b"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#f59e0b" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#1e293b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#d97706"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fde68a">
          {arjunName}
        </text>
      </g>
      <g>
        <rect
          x="135"
          y="35"
          width="230"
          height="32"
          rx="6"
          fill="#1e293b"
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#fef3c7">
          📑{" "}
          {lang === "pl"
            ? "Instrument Pochodny: Wartość z Podłoża"
            : lang === "de"
              ? "Derivat: Wert abgeleitet vom Basiswert"
              : "Derivative: Value derived from underlying"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="135"
            y="80"
            width="230"
            height="52"
            rx="8"
            fill="#1e293b"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="18">
            🌾 🔒 🥖
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#fde68a"
          >
            {lang === "pl"
              ? "Cena mąki zablokowana na 6 miesięcy: 2 zł/kg"
              : lang === "de"
                ? "Mehlpreis fixiert auf 6 Monate: 0,50 €/kg"
                : "Wheat flour locked for 6 months at $200/ton"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#78350f" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Żadna susza ani krach nie zmienią ceny!"
              : lang === "de"
                ? "Weder Duerre noch Flut aendern diesen Preis!"
                : "Immune to crop failures or price spikes!"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#fef3c7">
            {lang === "pl"
              ? "Piekarnia może bezpiecznie planować produkcję"
              : lang === "de"
                ? "Die Baeckerei kalkuliert mit festen Kosten"
                : "Bakery plans ahead with 100% certainty"}
          </text>
        </g>
      )}
    </svg>
  );
}

function FuturesVsOptionsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Kontrakty Futures a Opcje: Obowiązek a Prawo wyboru"
      : lang === "de"
        ? "Futures vs Optionen: Verpflichtung oder Wahlrecht"
        : "Futures vs Options: mandatory obligation vs choice";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fafafa"
        stroke="#475569"
        strokeWidth="2"
      />
      <g>
        <rect
          x="35"
          y="45"
          width="150"
          height="85"
          rx="8"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
          Futures Contract
        </text>
        <text x="110" y="90" textAnchor="middle" fontSize="14">
          🤝 🔒
        </text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">
          Mandatory obligation
        </text>
        <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#2563eb">
          Both sides MUST trade at agreed price
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="215"
            y="45"
            width="150"
            height="85"
            rx="8"
            fill="#ecfdf5"
            stroke="#059669"
            strokeWidth="1.5"
          />
          <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
            Options Contract
          </text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">
            🎟️ 💡
          </text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#065f46">
            Right, but NOT obligation
          </text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#059669">
            Pay small premium to walk away
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#1e293b" />
          <text
            x="200"
            y="174"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Futures to sztywna obietnica, opcja to wykupiona polisa ubezpieczeniowa"
              : lang === "de"
                ? "Futures binden strikt, Optionen wirken wie eine flexible Versicherung"
                : "Futures lock in execution; options provide downside insurance with upside"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl"
              ? "Kupujący opcję ryzykuje jedynie wpłacone wadium (premię)"
              : lang === "de"
                ? "Der Optionskaeufer riskiert maximal die bezahlte Praemie"
                : "Buyer's loss is capped strictly at the upfront option premium"}
          </text>
        </g>
      )}
    </svg>
  );
}

function HedgingVsSpeculationDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Hedging (zabezpieczenie) a Spekulacja na rynku derywatów"
      : lang === "de"
        ? "Hedging (Absicherung) vs Spekulation mit Hebel"
        : "Hedging risk transfer vs speculative leverage";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fffbeb"
        stroke="#d97706"
        strokeWidth="2"
      />
      <g>
        <rect
          x="35"
          y="45"
          width="150"
          height="85"
          rx="8"
          fill="#ecfdf5"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
          Hedger (Airline)
        </text>
        <text x="110" y="90" textAnchor="middle" fontSize="14">
          ✈️ 🛡️
        </text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#065f46">
          Eliminates jet fuel risk
        </text>
        <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#047857">
          Protects business solvency
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="215"
            y="45"
            width="150"
            height="85"
            rx="8"
            fill="#fee2e2"
            stroke="#ef4444"
            strokeWidth="1.5"
          />
          <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">
            Speculator (Trader)
          </text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">
            ⚡ 🎲
          </text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">
            Takes on price risk
          </text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">
            Provides market liquidity
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#78350f" />
          <text
            x="200"
            y="174"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Derywaty przenoszą ryzyko z tych, którzy go nie chcą, na tych, którzy chcą je podjąć"
              : lang === "de"
                ? "Derivate uebertragen Risiken von Sicherheitsbeduerftigen auf risikofreudige Haendler"
                : "Derivatives transfer financial risk from risk-averse businesses to risk-seeking capital"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#fef3c7">
            {lang === "pl"
              ? "Bez spekulantów linie lotnicze nie miałyby komu sprzedać ryzyka paliwowego"
              : lang === "de"
                ? "Ohne Spekulanten faende eine Airline niemanden, der den Kerosinpreis garantiert"
                : "Speculators provide the vital liquidity enabling real-world industrial risk transfer"}
          </text>
        </g>
      )}
    </svg>
  );
}

function LeverageDoubleEdgedSwordDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Dźwignia finansowa (lewar): obosieczny miecz zysków i strat"
      : lang === "de"
        ? "Finanzieller Hebel (Leverage): Riesige Gewinne, fatale Risiken"
        : "Financial leverage: the double-edged sword";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fff1f2"
        stroke="#e11d48"
        strokeWidth="2"
      />
      <g>
        <rect
          x="50"
          y="40"
          width="300"
          height="40"
          rx="6"
          fill="#fff"
          stroke="#e11d48"
          strokeWidth="1.5"
        />
        <text x="200" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be123c">
          {lang === "pl"
            ? "10x Dźwignia: Wpłacasz 1 000 $, kontrolujesz 10 000 $"
            : lang === "de"
              ? "10x Hebel: 1.000 € Eigenkapital steuert 10.000 € Position"
              : "10x Leverage: $1,000 margin controls $10,000 asset"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="40"
            y="95"
            width="150"
            height="80"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="1.5"
          />
          <text x="115" y="118" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
            +10% Wzrost Ceny
          </text>
          <text x="115" y="142" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#166534">
            +100% Zysk!
          </text>
          <text x="115" y="160" textAnchor="middle" fontSize="8.5" fill="#15803d">
            Kapitał podwojony do $2k
          </text>

          <rect
            x="210"
            y="95"
            width="150"
            height="80"
            rx="8"
            fill="#fee2e2"
            stroke="#ef4444"
            strokeWidth="1.5"
          />
          <text x="285" y="118" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">
            -10% Spadek Ceny
          </text>
          <text x="285" y="142" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#991b1b">
            -100% Likwidacja!
          </text>
          <text x="285" y="160" textAnchor="middle" fontSize="8.5" fill="#b91c1c">
            Cały depozyt wyzerowany
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="35" y="190" width="330" height="28" rx="6" fill="#9f1239" />
          <text
            x="200"
            y="208"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Dźwignia może zniszczyć cały kapitał w ułamku sekundy, jeśli zabraknie dyscypliny"
              : lang === "de"
                ? "Fremdkapitalhebel fuehrt bei Gegenbewegungen zur sofortigen Totalpleite"
                : "Uncontrolled leverage triggers total liquidation on minor market fluctuations"}
          </text>
        </g>
      )}
    </svg>
  );
}

function GlobalRiskClearingDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Izby rozliczeniowe (CCP) eliminujące ryzyko niewypłacalności"
      : lang === "de"
        ? "Zentrale Kontrahenten (CCP) sichern globale Finanzmaerkte"
        : "Central Counterparty (CCP) clearing houses stabilizing financial system";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#faf5ff"
        stroke="#7e22ce"
        strokeWidth="2"
      />
      <circle cx="200" cy="95" r="42" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="200" y="90" textAnchor="middle" fontSize="20">
        🏛️ 🛡️
      </text>
      <text x="200" y="112" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#5b21b6">
        Clearing House
      </text>
      <g>
        <circle cx="85" cy="70" r="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="85" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
          Buyer
        </text>
        <text x="85" y="84" textAnchor="middle" fontSize="8" fill="#2563eb">
          Guaranteed
        </text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="315" cy="70" r="28" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="315" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
            Seller
          </text>
          <text x="315" y="84" textAnchor="middle" fontSize="8" fill="#065f46">
            Guaranteed
          </text>
          <circle cx="200" cy="165" r="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="200" y="163" textAnchor="middle" fontSize="14">
            ⚖️
          </text>
          <text x="200" y="179" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#92400e">
            Daily Margin
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text
            x="200"
            y="214"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Współczesne giełdy derywatów gwarantują rozliczenie każdej transakcji"
              : lang === "de"
                ? "Moderne Derivateboersen stellen sicher, dass jede vertragliche Pflicht erfuellt wird"
                : "Clearing houses step between every trade, eliminating systemic counterparty default"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [leverage, setLeverage] = useState(1);
  const priceChange = 5;
  const initialEquity = 1000;
  const pnlPercent = priceChange * leverage;
  const finalEquity = Math.round(initialEquity * (1 + pnlPercent / 100));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Market Move: +5% | Leverage: {leverage}x | Return: +{pnlPercent}% | Account Value: $
        {finalEquity}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setLeverage((l) => {
              const next = Math.min(20, l * 2);
              if (next >= 8) onDone?.();
              return next;
            });
          }}
        >
          Double Leverage (2x)
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => setLeverage(1)}>
          Reset to 1x (Unleveraged)
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: leverage >= 8 ? "#fff1f2" : "#eef8ef",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {leverage === 1
          ? "Unleveraged: A modest +5% market gain yields a safe +$50 profit."
          : `High Leverage (${leverage}x): A tiny 5% market swing generates an explosive +${pnlPercent}% return ($${finalEquity})! But remember: a 5% drop would wipe out ${pnlPercent}% of your life savings!`}
      </div>
    </div>
  );
}

function DerivativesWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        Why do commercial airlines buy crude oil futures derivatives contracts?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        To gamble and turn the airline into an offshore casino
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        To hedge against fuel price spikes and secure predictable operating costs for ticket sales
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Because governments require every plane to fly with barrels of oil in the cockpit
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "derivatives",
  story: [
    animatedBeat(
      [
        T(
          "Meet Arjun. His family operates a regional artisan sourdough bakery chain that bakes twenty thousand loaves of bread every morning.",
          "Das ist Arno. Seine Familie fuehrt eine regionale Handwerksbaeckerei, die jeden Morgen 20.000 frische Brote backt.",
          "Poznaj Artura. Jego rodzina prowadzi rzemieślniczą piekarnię, która każdego ranka wypieka dwadzieścia tysięcy bochenków chleba.",
        ),
        T(
          "Flour is their largest ongoing expense: if sudden droughts spike wheat prices, bread production could swing into massive operating losses.",
          "Mehl ist ihr groesster Kostenfaktor: Wenn eine Duerre den Weizenpreis hochtreibt, drohen der Baeckerei schwere Verluste.",
          "Mąka to ich największy stały wydatek: jeśli susza podbije ceny pszenicy, piekarnia może zacząć przynosić ogromne straty.",
        ),
        T(
          "Arjun visits a grain futures exchange to enter a *derivative contract* that locks in the purchase price of flour six months in advance.",
          "Arno nutzt die Warenterminboerse und schliesst ein *Derivat* ab, das den Mehlpreis fuer sechs Monate im Voraus festzurrt.",
          "Artur udaje się na giełdę towarową, by zawrzeć *kontrakt pochodny (derywat)* gwarantujący stałą cenę mąki na kolejne pół roku.",
        ),
      ],
      FarmerMillerContractDiagram,
    ),
    animatedBeat(
      [
        T(
          "A derivative is a financial contract whose market value is *derived* from an underlying asset, like wheat, oil, or currencies.",
          "Ein Derivat ist ein Finanzvertrag, dessen Wert vom Kurs eines *Basiswerts* (wie Weizen, Erdoel oder Waehrungen) abhaengt.",
          "Instrument pochodny to umowa finansowa, której wartość *pochodzi* od ceny aktywa bazowego, np. pszenicy, ropy czy walut.",
        ),
        T(
          "In a *futures contract*, both parties enter a strict legal obligation to buy and sell at the agreed locked price upon expiration.",
          "Bei einem *Futures-Kontrakt* verpflichten sich beide Seiten unwiderruflich, zum vereinbarten Preis zu liefern und zu bezahlen.",
          "W przypadku *kontraktu futures* obie strony przyjmują na siebie bezwzględny obowiązek kupna i sprzedaży po ustalonej z góry cenie.",
        ),
        T(
          "In an *options contract*, the buyer purchases the flexible right, but not the obligation, to execute the trade if favorable.",
          "Bei einer *Option* erwirbt der Kaeufer hingegen das Recht, aber nicht die Pflicht, das Geschaeft spaeter abzuschliessen.",
          "W przypadku *opcji* kupujący nabywa prawo, lecz nie obowiązek, przeprowadzenia transakcji, płacąc za to niewielką premię.",
        ),
      ],
      FuturesVsOptionsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Derivatives markets bring together two essential market participants: *hedgers* and *speculators*.",
          "Derivatemaerkte bringen zwei grundlegende Gruppen zusammen: *Hedger* (Absicherer) und *Spekulanten*.",
          "Rynki derywatów łączą dwie kluczowe grupy uczestników: podmioty zabezpieczające się (*hedgers*) oraz *spekulantów*.",
        ),
        T(
          "Arjun is a hedger: he is willing to forgo potential windfall drops in flour prices just to eliminate devastating catastrophic risk.",
          "Arno sichert Risiken ab: Er verzichtet auf moegliche Preissenkungen, um dafuer vor Existenzbedrohlichen Preisschueben sicher zu sein.",
          "Artur zabezpiecza ryzyko: woli zrezygnować z ewentualnych spadków cen mąki, byle zyskać stuprocentową pewność i spokój w biznesie.",
        ),
        T(
          "Traders absorb Arjun price risk, wagering their own capital so bakers can focus on baking bread.",
          "Finanzhaendler uebernehmen dieses Preisrisiko freiwillig, damit Baecker sich auf das Backen konzentrieren koennen.",
          "Spekulanci świadomie przejmują na siebie to ryzyko rynkowe, dzięki czemu piekarz może spokojnie piec chleb.",
        ),
      ],
      HedgingVsSpeculationDiagram,
    ),
    animatedBeat(
      [
        T(
          "Derivatives allow investors to control large underlying positions with tiny upfront deposits through *financial leverage*.",
          "Derivate erlauben es, mit geringem Kapitaleinsatz grosse Vermoegenswerte zu bewegen: durch den *Hebel* (Leverage).",
          "Derywaty umożliwiają kontrolowanie potężnych pozycji rynkowych przy użyciu niewielkiego depozytu dzięki *dźwigni finansowej*.",
        ),
        T(
          "With ten-to-one leverage, a five percent market price move generates an astonishing fifty percent return on deposited collateral.",
          "Bei einem 10-fachen Hebel verdoppelt eine Kursbewegung von nur fuenf Prozent den Gewinn auf das eingesetzte Guthaben.",
          "Przy dźwigni dziesięciokrotnej ruch ceny bazowej o zaledwie pięć procent przynosi spektakularny zysk pięćdziesięciu procent.",
        ),
        T(
          "However, leverage is a merciless double-edged sword: a minor five percent move against your position obliterates your entire investment.",
          "Doch der Hebel ist gnadenlos: faellt der Markt um fuenf Prozent gegen dich, verlierst du dein gesamtes Kapital auf einen Schlag.",
          "Dźwignia jest jednak obosiecznym mieczem: spadek ceny o pięć procent w złą stronę wymazuje natychmiast cały wpłacony depozyt.",
        ),
      ],
      LeverageDoubleEdgedSwordDiagram,
    ),
    animatedBeat(
      [
        T(
          "To stop panic collapses, modern exchanges settle contracts through *central clearing houses*.",
          "Um Kettenreaktionen und Ausfaelle zu verhindern, wickeln moderne Boersen alle Kontrakte ueber *Clearinghaeuser* ab.",
          "Aby zapobiec niewypłacalności i panice, współczesne giełdy rozliczają kontrakty przez *izby rozliczeniowe*.",
        ),
        T(
          "Clearing houses act like a trusted referee, making sure both sides keep their promises every day.",
          "Clearinghaeuser handeln wie ein Schiedsrichter und stellen taeglich sicher, dass jeder seine Pflichten erfuellt.",
          "Izby te działają jak zaufany sędzia, gwarantując każdego dnia dotrzymanie obietnic przez obie strony.",
        ),
        T(
          "When used responsibly, derivatives act as the sophisticated shock absorbers of modern global commerce.",
          "Verantwortungsvoll eingesetzt, sind Derivate die unersetzlichen Stossdaempfer des weltweiten Handels.",
          "Używane odpowiedzialnie, instrumenty pochodne stanowią zaawansowane amortyzatory chroniące stabilność globalnej gospodarki.",
        ),
      ],
      GlobalRiskClearingDiagram,
    ),
  ],
  toyIntro: T(
    "Experiment with financial leverage: adjust the leverage slider to see how magnification boosts returns while multiplying downside ruin risk.",
    "Experimentiere mit dem Hebel: Beobachte, wie Leverage Renditechancen vervielfacht, aber auch das Totalverlustrisiko vergroessert.",
    "Zbadaj działanie dźwigni finansowej: zobacz, jak mnożnik kapitału potęguje zyski, ale jednocześnie drastycznie zwiększa ryzyko bankructwa.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the fundamental difference between a futures contract and an options contract?",
        "Worin liegt der grundlegende Unterschied zwischen einem Futures-Kontrakt und einer Option?",
        "Jaka jest podstawowa różnica między kontraktem futures a opcją?",
      ),
      options: [
        {
          text: T(
            "Futures require trading, while options give the buyer a choice without obligation",
            "Futures verpflichten verbindlich, waehrend Optionen eine freie Wahl ohne Pflicht bieten",
            "Futures prawnie zobowiązują, a opcje dają wolny wybór bez przymusu",
          ),
          correct: true,
        },
        {
          text: T(
            "Futures are only traded underwater on submarine cables",
            "Futures duerfen nur auf Schiffen im Meer gehandelt werden",
            "Kontrakty futures są zawierane wyłącznie na pokładach okrętów podwodnych",
          ),
          correct: false,
        },
        {
          text: T(
            "Options can only be purchased by commercial real estate landlords",
            "Optionen stehen ausschliesslich Vermietern von Buerogebaeuden offen",
            "Opcje mogą kupować wyłącznie właściciele biurowców komercyjnych",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Focus on the word 'option': having an option means having a choice rather than a mandatory requirement.",
        "Achte auf das Wort 'Option': Es bedeutet Freiheit und Wahlmoeglichkeit statt starrem Zwang.",
        "Zwróć uwagę na słowo 'opcja': oznacza ono możliwość wyboru zamiast bezwzględnego przymusu.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why do businesses like farmers, airlines, and manufacturers engage in 'hedging'?",
        "Warum nutzen Industrieunternehmen, Landwirte und Fluggesellschaften 'Hedging' (Risikoabsicherung)?",
        "Dlaczego przedsiębiorstwa, rolnicy i linie lotnicze stosują transakcje zabezpieczające (hedging)?",
      ),
      options: [
        {
          text: T(
            "To lock in predictable ingredient prices and protect against unexpected cost spikes",
            "Um planbare Rohstoffpreise zu sichern und sich vor extremen Kostenschocks zu schuetzen",
            "Aby zapewnić przewidywalne ceny surowców i chronić się przed gwałtownymi podwyżkami",
          ),
          correct: true,
        },
        {
          text: T(
            "To avoid paying any salaries to their employees",
            "Um Gehaltszahlungen an Mitarbeiter vollstaendig einzusparen",
            "Aby uniknąć konieczności wypłacania pensji pracownikom",
          ),
          correct: false,
        },
        {
          text: T(
            "Because banks refuse to store fiat currency in checking accounts",
            "Weil Banken kein normales Guthaben auf Konten mehr akzeptieren",
            "Ponieważ banki nie przyjmują już tradycyjnych walut na rachunki bieżące",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about an airline wanting to know its fuel budget months before flying summer vacationers.",
        "Denke an eine Fluglinie, die Kerosinkosten fuer Fluege im naechsten Sommer fest kalkulieren will.",
        "Pomyśl o liniach lotniczych, które muszą skalkulować koszty paliwa na wakacyjne rejsy z wielomiesięcznym wyprzedzeniem.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the primary commercial purpose of purchasing derivative commodities contracts.",
        "Bestimme den wirtschaftlichen Hauptzweck von Warentermingeschaeften fuer Unternehmen.",
        "Wskaż główny cel gospodarczy zawierania terminowych kontraktów towarowych przez korporacje.",
      ),
      Widget: DerivativesWidget,
      hint: T(
        "Consider how airlines protect themselves from sudden oil price spikes.",
        "Ueberlege, wie Fluggesellschaften sich vor explodierenden Treibstoffkosten schuetzen.",
        "Zastanów się, w jaki sposób linie lotnicze zabezpieczają się przed nagłym wzrostem cen paliwa lotniczego.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Have they ever used fixed-rate mortgage terms or car insurance? (Both are everyday forms of hedging price and catastrophe risk!)",
    "Frage deine Eltern: Nutzen sie Kredite mit festem Zinssatz oder Kfz-Versicherungen? (Beides sind klassische Formen der Risikoabsicherung!)",
    "Zapytaj rodziców: Czy korzystają z kredytu o stałym oprocentowaniu lub ubezpieczenia AC? (Oba instrumenty to codzienne formy zabezpieczania się przed ryzykiem!)",
  ),
  realLife: {
    title: T(
      "Real world: Airline fuel hedging at Lufthansa and the CME Group clearinghouse",
      "Echte Welt: Kerosinabsicherung bei Lufthansa und das Clearing der CME Group",
      "Prawdziwy świat: Zabezpieczanie paliwa przez linie lotnicze i izby rozliczeniowe CME Group",
    ),
    body: T(
      "Major global airlines like Lufthansa or Delta consume millions of barrels of jet fuel per year. If crude oil prices jump 50% due to Middle Eastern geopolitical tensions, an unhedged airline could go bankrupt. Airlines systematically buy crude oil and jet fuel call options and futures up to two years ahead. Exchanges like CME Group guarantee these trades with billions in default guarantee funds.",
      "Fluggesellschaften wie die Lufthansa verbrauchen jaehrlich Millionen Fasser Kerosin. Steigt der Oelpreis durch Krisen um 50%, droht einer ungesicherten Airline die Insolvenz. Daher kaufen Fluglinien routinemaessig Terminkontrakte bis zu zwei Jahre im Voraus. Boersen wie die CME Group sichern die Erfuellung ueber zentrale Ausfallfonds ab.",
      "Globalne linie lotnicze, takie jak Lufthansa czy LOT, zużywają miliony baryłek paliwa rocznie. Nagły skok cen ropy o 50% mógłby doprowadzić niezabezpieczonego przewoźnika do upadłości. Linie kupują kontrakty terminowe na paliwo z wielomiesięcznym wyprzedzeniem, a izby giełdowe CME Group gwarantują wypłacalność stron.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Aristotle's Politics (c. 350 BCE) documents the earliest recorded derivative: philosopher Thales of Miletus buying options on olive presses ahead of a bumper harvest.",
          "Aristoteles dokumentiert in seiner 'Politik' (um 350 v. Chr.) das frueheste Optionsgeschaeft: Thales von Milet sicherte sich Nutzungsrechte an Olivenpressen.",
          "W 'Polityce' Arystotelesa (ok. 350 p.n.e.) opisano pierwszą znaną opcję: Tales z Miletu wykupił prawa do prasy oliwnej przed spodziewanym urodzajem oliwek.",
        ),
        source: "https://www.britannica.com/biography/Thales-of-Miletus",
      },
      {
        text: T(
          "The Bank for International Settlements (BIS) tracks over $600 trillion in gross notional amount of outstanding over-the-counter (OTC) derivatives globally.",
          "Die Bank fuer Internationalen Zahlungsausgleich (BIZ) erfasst weltweit ueber 600 Billionen US-Dollar an ausstehenden OTC-Derivatekontrakten.",
          "Bank Rozrachunków Międzynarodowych (BIS) monitoruje ponad 600 bilionów dolarów łącznej wartości nominalnej otwartych kontraktów pochodnych OTC na świecie.",
        ),
        source: "https://www.bis.org/statistics/derstats.htm",
      },
      {
        text: T(
          "Fischer Black and Myron Scholes published their Nobel Prize-winning option pricing model in the Journal of Political Economy in 1973.",
          "Fischer Black und Myron Scholes veroeffentlichten 1973 ihre nobelpreisgekroente mathematische Formel zur Bewertung von Finanzoptionen.",
          "Fischer Black i Myron Scholes opublikowali w 1973 roku uhonorowany Nagrodą Nobla model wyceny opcji finansowych.",
        ),
        source: "https://www.nobelprize.org/prizes/economic-sciences/1997/press-release/",
      },
      {
        text: T(
          "The European Market Infrastructure Regulation (EMIR) mandates centralized clearing through authorized central counterparties (CCPs) across the EU.",
          "Die Europaeische Marktinfrastruktur-Verordnung (EMIR) schreibt das zentrale Clearing von Standard-Derivaten in der EU verbindlich vor.",
          "Rozporządzenie EMIR Unii Europejskiej nakłada obowiązek centralnego rozliczania standardowych instrumentów pochodnych przez autoryzowane izby CCP.",
        ),
        source: "https://www.esma.europa.eu/regulation/post-trading/emir",
      },
      {
        text: T(
          "Eurex, operated by Deutsche Boerse AG, is Europe's largest international derivatives exchange by volume, trading over 1.9 billion contracts annually.",
          "Die zur Deutschen Boerse gehoerende Eurex ist mit ueber 1,9 Milliarden gehandelten Kontrakten jaehrlich Europas groesste Terminboerse.",
          "Eurex, zarządzany przez Deutsche Boerse AG, jest największą w Europie giełdą instrumentów pochodnych, rozliczającą ponad 1,9 miliarda kontraktów rocznie.",
        ),
        source: "https://www.eurex.com/ex-en/about-us",
      },
    ],
    simplified: [
      T(
        "Complex partial differential equations (Black-Scholes-Merton) and stochastic volatilities are simplified into intuitive contract guarantees and leverage lessons.",
        "Komplexe stochastische Berechnungen (Black-Scholes) wurden durch anschauliche Vergleiche zu Getreidevertraegen und Hebelwirkungen ersetzt.",
        "Równania różniczkowe cząstkowe wyceny derywatów uproszczono do czytelnych przykładów kontraktów na dostawę mąki i mechanizmów dźwigni finansowej.",
      ),
    ],
  },
};
