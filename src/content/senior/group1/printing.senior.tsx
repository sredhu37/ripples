import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function PrintingDebasementDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Money printing and hyperinflation spiral diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      <rect x="35" y="55" width="140" height="130" rx="10" fill="#fff" stroke="#107569" strokeWidth="2" />
      <text x="105" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#107569">Real Economy</text>
      <text x="105" y="115" textAnchor="middle" fontSize="11" fill="#495057">100 Loaves of Bread</text>
      <text x="105" y="145" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2b8a3e">$100 Money Supply</text>
      <text x="105" y="165" textAnchor="middle" fontSize="11" fill="#2b8a3e">Price = $1 / loaf</text>

      {step >= 1 && (
        <g>
          <rect x="225" y="55" width="140" height="130" rx="10" fill="#fff" stroke="#d9480f" strokeWidth="2" />
          <text x="295" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#d9480f">Print Double Money</text>
          <text x="295" y="115" textAnchor="middle" fontSize="11" fill="#495057">Still 100 Loaves</text>
          <text x="295" y="145" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#d9480f">$200 Money Supply</text>
          <text x="295" y="165" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c92a2a">Price jumps to $2</text>
        </g>
      )}

      {step >= 2 && (
        <g>
          <path d="M 175 120 L 225 120" stroke="#d9480f" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="200" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#d9480f">Zero Gain</text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [moneyPrinted, setMoneyPrinted] = useState(1);
  const breadCount = 100;
  const totalMoney = 100 * moneyPrinted;
  const loafPrice = moneyPrinted;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Money Supply: ${totalMoney} | Bread in Town: {breadCount} | Price Per Loaf: ${loafPrice}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setMoneyPrinted((m) => {
              const next = m * 2;
              if (next >= 8) onDone?.();
              return next;
            });
          }}
        >
          Print 2x More Currency
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setMoneyPrinted(1)}
        >
          Reset Supply
        </button>
      </div>
      <div style={{ padding: "12px", background: moneyPrinted >= 4 ? "#ffe3e3" : "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {moneyPrinted >= 4 ? "Runaway printing created zero new bread: prices merely multiplied proportionally!" : "Balanced supply: Money accurately matches the real volume of produced goods."}
      </div>
    </div>
  );
}

function PrintingWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Why cannot a government simply print trillions of dollars to make all citizens wealthy?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Ink cartridges are too expensive for the national mint</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Printing paper does not create real goods; it simply debases the currency and drives prices up</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Banknote paper degrades in humid weather</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "printing",
  story: [
    animatedBeat(
      [
        T("When governments face immense budget deficits, why can they not simply print trillions of banknotes to solve the problem?", "Wenn Staaten Schulden haben: Warum drucken sie nicht einfach Billionen Geldscheine?", "Gdy rządy borykają się z deficytem, dlaczego po prostu nie wydrukują bilionów banknotów?"),
        T("It is tempting to think of money as synonymous with wealth.", "Es ist verlockend, Geld mit echtem Wohlstand gleichzusetzen.", "Kuszące jest utożsamianie pieniądza z rzeczywistym bogactwem."),
        T("True economic wealth consists of real goods: food, homes, technology, medical care, and clean energy.", "Echter Wohlstand besteht aus Guetern: Essen, Wohnungen, Medizin und Energie.", "Prawdziwe bogactwo stanowią realne dobra: żywność, mieszkania, technologia, leczenie i energia."),
      ],
      PrintingDebasementDiagram,
    ),
    animatedBeat(
      [
        T("Money is merely the claim check on those real goods and services.", "Geld ist lediglich der Anspruchsschein auf diese realen Gueter.", "Pieniądz to zaledwie żeton roszczeniowy na te realne dobra i usługi."),
        T("If an economy produces one hundred loaves of bread and the money supply is one hundred dollars, each loaf costs one dollar.", "Gibt es 100 Brote und 100 Dollar Geldmenge, kostet jedes Brot einen Dollar.", "Jeśli gospodarka produkuje 100 bochenków chleba i w obiegu jest 100 dolarów, chleb kosztuje dolara."),
        T("If the state prints one hundred extra dollars overnight without baking any new bread, nothing real was created.", "Druckt der Staat ueber Nacht 100 Dollar ohne neues Brot, entsteht kein neuer Wert.", "Gdyby państwo dodrukowało 100 dolarów bez upieczenia nowego chleba, nie powstałaby żadna nowa wartość."),
      ],
      PrintingDebasementDiagram,
    ),
    animatedBeat(
      [
        T("Now two hundred dollars chase the exact same one hundred loaves.", "Nun jagen zweihundert Dollar exakt dieselben einhundert Brote.", "Wtedy dwieście dolarów ugania się za dokładnie tymi samymi stu bochenkami."),
        T("The price of bread doubles to two dollars, and the purchasing power of every saved dollar is cut in half.", "Der Brotpreis verdoppelt sich auf zwei Dollar; die Kaufkraft alter Ersparnisse halbiert sich.", "Cena chleba rośnie dwukrotnie do dwóch dolarów, a siła nabywcza starych oszczędności spada o połowę."),
        T("This phenomenon is known as currency *debasement*.", "Dieses Phaenomen nennt man *Waehrungsentwertung* (Debasement).", "To zjawisko nazywa się *psuciem pieniądza* (debasement)."),
      ],
      PrintingDebasementDiagram,
    ),
    animatedBeat(
      [
        T("When governments lose all fiscal discipline and flood the financial system with newly created currency, trust evaporates.", "Verliert ein Staat die Disziplin und druckt hemmungslos, zerfaellt das Vertrauen.", "Gdy rząd traci dyscyplinę fiskalną i zalewa rynek nowym pieniądzem, zaufanie wyparowuje."),
        T("Citizens realize their money loses value by the hour, rushing to spend cash immediately.", "Buerger merken den stuendlichen Verfall und geben Geld panisch sofort aus.", "Obywatele widzą spadek wartości z godziny na godzinę i w popłochu pozbywają się gotówki."),
        T("This triggers *hyperinflation*, where prices surge by more than 50% in a single month.", "Das fuehrt zur *Hyperinflation*, bei der Preise um mehr als 50% im Monat explodieren.", "To wywołuje *hiperinflację*, w której ceny rosną o ponad 50% w skali pojedynczego miesiąca."),
      ],
      PrintingDebasementDiagram,
    ),
    animatedBeat(
      [
        T("History shows catastrophic hyperinflations: Weimar Germany in 1923, Hungary in 1946, and Zimbabwe in 2008.", "Die Geschichte zeigt verheerende Hyperinflationen: Weimar 1923, Ungarn 1946 oder Simbabwe 2008.", "Historia zna tragiczne hiperinflacje: Niemcy Weimarskie w 1923, Węgry w 1946 czy Zimbabwe w 2008 roku."),
        T("During hyperinflation, wheelbarrows of cash were required just to buy a daily meal.", "In der Hyperinflation brauchte man Schubkarren voll Geld fuer ein einziges Mittagessen.", "W warunkach hiperinflacji potrzebne były taczki banknotów, by kupić zwykły obiad."),
        T("Sound monetary policy requires protecting currency credibility and resisting the temptation to print unbacked money.", "Solide Geldpolitik muss Waehrungsglaubwuerdigkeit schuetzen und dem Gelddrucken widerstehen.", "Zdrowa polityka monetarna wymaga ochrony wiarygodności waluty i opierania się pokusie pustego dodruku."),
      ],
      PrintingDebasementDiagram,
    ),
  ],
  toyIntro: T(
    "Experiment with printing additional money and watch how the price per loaf adjusts.",
    "Experimentiere mit dem Drucken von zusaetzlichem Geld und beobachte die Preisreaktion.",
    "Poeksperymentuj z dodrukiem pieniędzy i zobacz, jak cena bochenka chleba natychmiast rośnie.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the economic definition of hyperinflation?",
        "Was ist die oekonomische Definition von Hyperinflation?",
        "Jaka jest ekonomiczna definicja hiperinflacji?",
      ),
      options: [
        { text: T("An extremely rapid, out-of-control inflation exceeding 50% per month", "Eine extrem schnelle, ausufernde Inflation von ueber 50 Prozent im Monat", "Niezwykle szybka, wymykająca się spod kontroli inflacja przekraczająca 50% w skali miesiąca"), correct: true },
        { text: T("A computer operating system that calculates bank account fees", "Ein Computer-Betriebssystem, das Bankgebuehren berechnet", "Komputerowy system operacyjny naliczający opłaty bankowe") },
        { text: T("A legal requirement to buy foreign currency on weekends", "Eine Pflicht, an Wochenenden auslaendische Waehrungen zu kaufen", "Ustawowy obowiązek kupowania obcych walut w weekendy"), },
      ],
      hint: T(
        "It involves runaway price increases where money rapidly loses all value.",
        "Preise steigen unkontrolliert und Geld verliert rasant seinen Wert.",
        "Oznacza lawinowy wzrost cen, w którym pieniądz błyskawicznie traci jakąkolwiek wartość.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why does printing more paper banknotes fail to generate real societal wealth?",
        "Warum schafft das Drucken von Papiergeld keinen realen gesellschaftlichen Wohlstand?",
        "Dlaczego drukowanie papierowych banknotów nie tworzy realnego bogactwa społecznego?",
      ),
      options: [
        { text: T("Wealth consists of actual goods and productive services, not pieces of paper", "Wohlstand besteht aus realen Guetern und Diensten, nicht aus bedrucktem Papier", "Bogactwo składa się z realnych dóbr i usług, a nie z zadrukowanych kartek papieru"), correct: true },
        { text: T("Banknotes can only be printed in black and white ink", "Banknoten duerfen gesetzlich nur in Schwarz-Weiss gedruckt werden", "Banknoty wolno drukować prawnie wyłącznie czarnym tuszem") },
        { text: T("Paper currency dissolves when exposed to natural sunlight", "Papiergeld loest sich bei Sonnenlicht innerhalb weniger Minuten auf", "Papierowe banknoty rozpadają się pod wpływem naturalnego światła słonecznego") },
      ],
      hint: T(
        "Paper money is a claim on wealth, not the physical wealth itself.",
        "Papiergeld ist nur ein Anspruch auf Gueter, nicht das Gut selbst.",
        "Pieniądz papierowy to roszczenie do dóbr, a nie samo dobro fizyczne.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Examine why printing trillions of units of currency does not eliminate poverty.",
        "Erkenne, warum das Drucken von Billionen an Waehrungseinheiten keine Armut beseitigt.",
        "Zbadaj, dlaczego wydrukowanie bilionów jednostek waluty nie likwiduje ubóstwa.",
      ),
      Widget: PrintingWidget,
      hint: T(
        "Without increasing real production, expanding money simply debases prices.",
        "Ohne Mehrproduktion treibt mehr Geld einfach nur die Preise nach oben.",
        "Bez zwiększenia produkcji dodruk pieniądza po prostu winduje ceny w górę.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Have they ever traveled to a country undergoing currency devaluation or rapid inflation?",
    "Frage deine Eltern: Sind sie je in ein Land mit Waehrungsabwertung oder schneller Inflation gereist?",
    "Zapytaj rodziców: Czy podróżowali kiedyś do kraju zmagającego się z dewaluacją waluty lub szybką inflacją?",
  ),
  realLife: {
    title: T(
      "Real world: Historical hyperinflations and monetary reforms",
      "Echte Welt: Historische Hyperinflationen und Waehrungsreformen",
      "Prawdziwy świat: Historyczne hiperinflacje i reformy walutowe",
    ),
    body: T(
      "In Weimar Germany in November 1923, a loaf of bread cost 200 billion marks. The crisis was halted only when the government instituted the Rentenmark, backed by mortgages on agricultural and industrial land, demonstrating that restoring monetary trust requires strict legal limits on money supply creation.",
      "Im November 1923 kostete ein Brot in Deutschland 200 Milliarden Mark. Erst die Einfuehrung der Rentenmark beendete das Chaos durch strikte Deckung und Waehrungsdisziplin.",
      "W Niemczech Weimarskich w listopadzie 1923 roku bochenek chleba kosztował 200 miliardów marek. Kryzys zażegnano dopiero po wprowadzeniu Rentenmarki opartej na zabezpieczeniu majątkowym, co dowodzi, że zaufanie wymaga żelaznej dyscypliny emisji pieniądza.",
    ),
  },
  factCard: {
    claims: [
      { text: T("Phillip Cagan defined hyperinflation in 1956 as beginning when monthly inflation exceeds 50 percent.", "Phillip Cagan definierte Hyperinflation 1956 als Preissteigerung von ueber 50 Prozent im Monat.", "Phillip Cagan zdefiniował hiperinflację w 1956 roku jako sytuację, w której miesięczna stopa inflacji przekracza 50 procent."), source: "https://www.jstor.org/stable/1826548" },
      { text: T("The Deutsche Bundesbank Historical Archive documents the monetary collapse of the Weimar Papiermark in 1923.", "Das Historische Archiv der Bundesbank dokumentiert den Waehrungskollaps der Papiermark 1923.", "Archiwum Historyczne Deutsche Bundesbank dokumentuje załamanie marki papierowej w 1923 roku."), source: "https://www.bundesbank.de/en/tasks/topics/100-years-of-hyperinflation-917712" },
      { text: T("The Reserve Bank of Zimbabwe issued a 100-trillion-dollar banknote in 2008 during its monetary crisis.", "Die Zentralbank von Simbabwe gab 2008 waehrend der Waehrungskrise eine 100-Billionen-Dollar-Note heraus.", "Bank Rezerw Zimbabwe wyemitował w 2008 roku banknot o nominale 100 bilionów dolarów w szczycie kryzysu walutowego."), source: "https://www.imf.org/en/News/Articles/2015/09/28/04/53/socar032409a" },
      { text: T("The quantity theory of money (MV = PY) posits that increasing money supply (M) directly impacts nominal price levels (P).", "Die Quantitaetstheorie des Geldes besagt, dass eine Ausweitung der Geldmenge das Preisniveau treibt.", "Ilościowa teoria pieniądza (MV = PY) zakłada, że zwiększenie podaży pieniądza bezpośrednio wpływa na poziom cen."), source: "https://www.britannica.com/money/quantity-theory-of-money" },
      { text: T("Hungary in July 1946 experienced the highest recorded monthly inflation rate in human history (over 40,000 trillion percent).", "Ungarn erlebte im Juli 1946 mit ueber 40 Billiarden Prozent die hoechste je gemessene Monatsinflation.", "Węgry w lipcu 1946 roku doświadczyły najwyższej odnotowanej stopy inflacji miesięcznej w historii (ponad 40 biliardów procent)."), source: "https://www.cato.org/cato-journal/fall-2012/hanke-krus-hyperinflation-table" },
    ],
    simplified: [
      T(
        "Foreign exchange market currency pegs and black market exchange spreads are abstracted to the fundamental relationship between currency supply and real output.",
        "Devisenmaerkte und Schwarzmarkt-Wechselkurse werden auf das Grundverhaeltnis von Geldmenge und Gueterproduktion vereinfacht.",
        "Czarnorynkowe kursy walutowe i spready dewizowe uproszczono do podstawowej relacji podaży pieniądza i produkcji dóbr.",
      ),
    ],
  },
};
