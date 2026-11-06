import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function InflationBasketDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Consumer price index and purchasing power diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      <rect x="35" y="55" width="140" height="130" rx="10" fill="#fff" stroke="#107569" strokeWidth="2" />
      <text x="105" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#107569">Year 2000 Basket</text>
      <text x="105" y="115" textAnchor="middle" fontSize="11" fill="#495057">Groceries + Gas</text>
      <text x="105" y="145" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#2b8a3e">$100 Cost</text>

      {step >= 1 && (
        <g>
          <rect x="225" y="55" width="140" height="130" rx="10" fill="#fff" stroke="#d9480f" strokeWidth="2" />
          <text x="295" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#d9480f">Year 2025 Basket</text>
          <text x="295" y="115" textAnchor="middle" fontSize="11" fill="#495057">Identical Items</text>
          <text x="295" y="145" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#c92a2a">$185 Cost</text>
        </g>
      )}

      {step >= 2 && (
        <g>
          <path d="M 175 120 L 225 120" stroke="#d9480f" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="200" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#d9480f">+85% CPI</text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [inflationRate, setInflationRate] = useState(3);
  const initialCash = 10000;
  // Purchasing power after 20 years at inflationRate: cash / (1 + r)^20
  const realPower20 = Math.round(initialCash / Math.pow(1 + inflationRate / 100, 20));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Annual Inflation: {inflationRate}% | $10k Cash in 20 Yrs: ${realPower20.toLocaleString()} Buying Power
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setInflationRate((r) => {
              const next = r === 3 ? 6 : r === 6 ? 2 : 3;
              if (next === 6) onDone?.();
              return next;
            });
          }}
        >
          Change Inflation ({inflationRate === 3 ? "6%" : inflationRate === 6 ? "2%" : "3%"})
        </button>
      </div>
      <div style={{ padding: "12px", background: inflationRate >= 5 ? "#ffe3e3" : "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {inflationRate >= 5 ? "High inflation cuts purchasing power by more than half over 20 years!" : "Low, steady inflation still requires productive investing to beat."}
      </div>
    </div>
  );
}

function InflationWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>If prices rise across the economy while your paycheck remains unchanged, what happens to your purchasing power?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Your purchasing power expands and you can buy more</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Your purchasing power shrinks because each dollar buys fewer goods</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>There is absolutely no change to your living standard</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "inflation",
  story: [
    animatedBeat(
      [
        T("Have you ever heard grandparents talk about candy bars or movie tickets costing pennies in their youth?", "Hast du deine Grosseltern schon erzaehlen hoeren, wie billig Kino frueher war?", "Czy słyszałeś kiedyś, jak dziadkowie opowiadali o biletach do kina za kilka groszy?"),
        T("Prices have not risen because modern popcorn is made of solid gold.", "Preise sind nicht gestiegen, weil Popcorn heute aus purem Gold waere.", "Ceny nie wzrosły dlatego, że dzisiejszy popcorn robi się ze złota."),
        T("They rose because of *inflation*: a broad, sustained increase in the overall price level of goods and services.", "Sie stiegen wegen *Inflation*: dem dauerhaften Anstieg des allgemeinen Preisniveaus.", "Wzrosły przez *inflację*: trwały i powszechny wzrost ogólnego poziomu cen towarów i usług."),
      ],
      InflationBasketDiagram,
    ),
    animatedBeat(
      [
        T("When inflation occurs, every unit of currency purchases fewer real goods than before.", "Bei Inflation kauft jeder Geldschein weniger reale Gueter als zuvor.", "Podczas inflacji każda jednostka waluty kupuje mniej realnych dóbr niż wcześniej."),
        T("This erosion of what your money can buy is called a loss of *purchasing power*.", "Diesen Verlust an Kaufkraft nennt man schwindende *Kaufkraft* des Geldes.", "Ten spadek ilości towarów, jakie możesz kupić, to utrata *siły nabywczej*."),
        T("Governments measure inflation using the *Consumer Price Index* (CPI).", "Staaten messen die Inflation mit dem *Verbraucherpreisindex* (VPI / CPI).", "Rządy mierzą inflację za pomocą *wskaźnika cen towarów i usług konsumpcyjnych* (CPI)."),
      ],
      InflationBasketDiagram,
    ),
    animatedBeat(
      [
        T("Statistical agencies construct a representative basket of hundreds of goods: bread, electricity, rent, haircuts, and laptops.", "Statistikbehoerden schnueren einen Warenkorb aus Brot, Strom, Miete und Laptops.", "Urzędy statystyczne tworzą koszyk setek dóbr: chleb, prąd, czynsz, fryzjer czy laptopy."),
        T("They track the total cost of this basket month after month.", "Sie erfassen die Gesamtkosten dieses Korbes Monat fuer Monat.", "Śledzą łączny koszt tego samego koszyka miesiąc po miesiącu."),
        T("If the basket cost rises from 100 dollars to 104 dollars over a year, the annual inflation rate is 4%.", "Steigt der Preis von 100 auf 104 Dollar in einem Jahr, liegt die Inflation bei 4%.", "Jeśli koszt koszyka rośnie ze 100 do 104 dolarów w rok, roczna stopa inflacji wynosi 4%."),
      ],
      InflationBasketDiagram,
    ),
    animatedBeat(
      [
        T("Inflation can be triggered by *demand-pull*: too much money chasing too few available goods.", "Inflation entsteht durch *Nachfrageueberhang*: zu viel Geld jagt zu wenige Gueter.", "Inflacja może wynikać z *presji popytowej*: zbyt dużo pieniędzy ugania się za zbyt małą ilością dóbr."),
        T("It can also be caused by *cost-push*: supply chain shocks, oil embargoes, or crop failures that spike production costs.", "Oder durch *Kostendruck*: Lieferkettenkrisen oder Ernteausfaelle treiben die Kosten.", "Może też wynikać z *presji kosztowej*: kryzysy surowcowe czy nieurodzaj drastycznie podnoszą koszty."),
        T("Holding vast cash under a mattress during inflation is a guaranteed slow loss.", "Bargeld waehrend der Inflation unter der Matratze zu horten garantiert Verluste.", "Trzymanie gotówki w materacu w czasie inflacji to gwarancja powolnej, pewnej straty."),
      ],
      InflationBasketDiagram,
    ),
    animatedBeat(
      [
        T("To protect wealth against purchasing power erosion, investors hold *real assets*.", "Um Vermoegen vor Kaufkraftverlust zu schuetzen, halten Anleger *Sachwerte*.", "Aby chronić majątek przed utratą siły nabywczej, inwestorzy lokują kapitał w *aktywa realne*."),
        T("Real productive companies can raise prices to keep pace with inflation.", "Produzierende Unternehmen koennen ihre Preise an die Inflation anpassen.", "Dobre spółki produkcyjne mogą podnosić ceny swoich produktów wraz z inflacją."),
        T("A moderate, predictable inflation target around 2% is considered ideal by central banks to encourage investment over hoarding.", "Eine maessige Zielinflation um 2% gilt Zentralbanken als ideal gegen Stillstand.", "Umiarkowany cel inflacyjny na poziomie ok. 2% jest uznawany przez banki centralne za optymalny."),
      ],
      InflationBasketDiagram,
    ),
  ],
  toyIntro: T(
    "Observe how various inflation rates erode purchasing power over a twenty-year horizon.",
    "Beobachte, wie unterschiedliche Inflationsraten die Kaufkraft ueber zwanzig Jahre aushuehlen.",
    "Zobacz, jak różne stopy inflacji uszczuplają siłę nabywczą w horyzoncie dwudziestu lat.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "How is the Consumer Price Index (CPI) calculated by statistical offices?",
        "Wie berechnen Statistikbehoerden den Verbraucherpreisindex (VPI)?",
        "W jaki sposób urzędy statystyczne obliczają wskaźnik cen konsumpcyjnych (CPI)?",
      ),
      options: [
        { text: T("Tracking the price changes of a standardized representative basket of consumer goods over time", "Durch die Beobachtung der Preisentwicklung eines repraesentativen Warenkorbs ueber die Zeit", "Śledząc zmiany cen ustandaryzowanego, reprezentatywnego koszyka dóbr konsumpcyjnych w czasie"), correct: true },
        { text: T("Counting the total number of paper banknotes printed in one afternoon", "Durch Zaehlen der an einem Nachmittag gedruckten Geldscheine", "Licząc liczbę papierowych banknotów wydrukowanych w jedno popołudnie") },
        { text: T("Asking three famous chefs how much salt costs", "Indem drei Spitzenkoeche nach dem Salzpreis gefragt werden", "Pytając trzech znanych szefów kuchni o aktualną cenę soli") },
      ],
      hint: T(
        "It relies on an index basket reflecting typical household spending.",
        "Er basiert auf einem Warenkorb typischer Haushaltsausgaben.",
        "Opiera się na koszyku odzwierciedlającym typowe wydatki gospodarstw domowych.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is high inflation particularly damaging to individuals holding only cash savings?",
        "Warum schadet hohe Inflation Menschen mit reinen Bargeldersparnissen besonders?",
        "Dlaczego wysoka inflacja jest szczególnie dotkliwa dla osób trzymających oszczędności wyłącznie w gotówce?",
      ),
      options: [
        { text: T("The nominal dollar amount stays the same while the real purchasing power shrinks", "Der Nennbetrag bleibt gleich, waehrend die reale Kaufkraft schrumpft", "Nominalna liczba pieniędzy pozostaje taka sama, podczas gdy realna siła nabywcza maleje"), correct: true },
        { text: T("Paper bills literally catch fire when inflation exceeds five percent", "Geldscheine fangen ab fuenf Prozent Inflation spontan Feuer", "Banknoty dosłownie stają w płomieniach, gdy wskaźnik przekroczy pięć procent") },
        { text: T("Cash disappears from bank computers automatically every month", "Bargeld loescht sich monatlich automatisch von Bankcomputern", "Pieniądze co miesiąc samoczynnie znikają z bankowych systemów komputerowych") },
      ],
      hint: T(
        "Your balance number does not change, but what it can buy drops.",
        "Dein Kontostand bleibt gleich, aber du bekommst weniger dafuer.",
        "Stan Twojego konta się nie zmienia, ale możesz za niego kupić znacznie mniej.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Evaluate what happens to purchasing power when prices rise faster than wages.",
        "Bewerte, was mit der Kaufkraft geschieht, wenn Preise schneller als die Loehne steigen.",
        "Oceń, co dzieje się z siłą nabywczą, gdy ceny rosną szybciej niż pensje.",
      ),
      Widget: InflationWidget,
      hint: T(
        "Each unit of money commands fewer goods and services.",
        "Jede Geldeinheit kauft weniger Gueter und Dienstleistungen.",
        "Każda jednostka pieniądza pozwala na zakup mniejszej liczby dóbr i usług.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Which everyday expenses (like rent, food, or electronics) have changed the most in price over their lifetime?",
    "Frage deine Eltern: Welche Alltagskosten (wie Miete, Essen oder Elektronik) haben sich in ihrem Leben am staerksten veraendert?",
    "Zapytaj rodziców: Jakie codzienne wydatki (jak czynsz, jedzenie czy elektronika) zmieniły się najbardziej za ich życia?",
  ),
  realLife: {
    title: T(
      "Real world: Harmonised Index of Consumer Prices (HICP) in Europe",
      "Echte Welt: Harmonisierter Verbraucherpreisindex (HVPI) in Europa",
      "Prawdziwy świat: Zharmonizowany Wskaźnik Cen Konsumpcyjnych (HICP) w Europie",
    ),
    body: T(
      "Eurostat measures price stability across the eurozone using the Harmonised Index of Consumer Prices (HICP). If inflation drifts above the European Central Bank's 2% target, policymakers adjust interest rates to cool aggregate demand and stabilize living costs for 350 million citizens.",
      "Eurostat misst die Preisstabilitaet im Euroraum mit dem HVPI. Steigt die Inflation ueber das 2%-Ziel der EZB, heben die Waehrungshueter die Zinsen an, um die Nachfrage zu daempfen und die Lebenshaltungskosten zu sichern.",
      "Eurostat mierzy stabilność cen w strefie euro za pomocą wskaźnika HICP. Gdy inflacja przekracza 2-procentowy cel EBC, decydenci podnoszą stopy procentowe, aby ostudzić popyt i ustabilizować koszty życia obywateli.",
    ),
  },
  factCard: {
    claims: [
      { text: T("The US Bureau of Labor Statistics (BLS) surveys thousands of retail establishments monthly to compute CPI inflation.", "Das US Bureau of Labor Statistics erhebt monatlich Preise in Tausenden Geschaeften fuer den CPI.", "Amerykańskie Biuro Statystyki Pracy bada co miesiąc ceny w tysiącach sklepów, by obliczać wskaźnik CPI."), source: "https://www.bls.gov/cpi/" },
      { text: T("Eurostat publishes the Harmonised Index of Consumer Prices (HICP) to ensure comparable inflation data across EU nations.", "Eurostat veroeffentlicht den HVPI fuer vergleichbare Inflationsdaten in der gesamten EU.", "Eurostat publikuje Zharmonizowany Wskaźnik Cen Konsumpcyjnych (HICP) w celu zapewnienia porównywalności danych o inflacji w UE."), source: "https://ec.europa.eu/eurostat/web/hicp" },
      { text: T("The German Federal Statistical Office (Destatis) categorizes over 700 specific goods and services in its official inflation basket.", "Destatis erfasst ueber 700 konkrete Gueter und Dienstleistungen im deutschen Warenkorb.", "Niemiecki Federalny Urząd Statystyczny (Destatis) uwzględnia ponad 700 pozycji towarów i usług w oficjalnym koszyku inflacyjnym."), source: "https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/_inhalt.html" },
      { text: T("Milton Friedman famously asserted that inflation is always and everywhere a monetary phenomenon in its source.", "Milton Friedman praegte die These, dass Inflation immer und ueberall ein monetaeres Phaenomen ist.", "Milton Friedman sformułował słynną tezę, że inflacja jest zawsze i wszędzie zjawiskiem monetarnym."), source: "https://www.hoover.org/research/inflation-always-and-everywhere-monetary-phenomenon" },
      { text: T("Demand-pull inflation describes price increases resulting from aggregate demand outstripping aggregate supply capacity.", "Nachfrageinflation beschreibt Preissteigerungen, wenn die Gesamtnachfrage das Angebot uebersteigt.", "Inflacja popytowa opisuje wzrost cen wynikający z przewagi popytu nad możliwościami produkcyjnymi gospodarki."), source: "https://www.britannica.com/money/inflation" },
    ],
    simplified: [
      T(
        "Hedonic quality adjustments and geometric weighting variations are simplified into standard price basket comparisons.",
        "Hedonische Qualitaetsanpassungen und geometrische Gewichtungen werden auf den direkten Warenkorbvergleich vereinfacht.",
        "Korekty jakościowe metodą hedoniczną i wagi geometryczne uproszczono do czytelnego porównania koszyka cenowego.",
      ),
    ],
  },
};
