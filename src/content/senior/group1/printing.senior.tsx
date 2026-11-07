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
        T("Meet Karan. In his favorite online gaming community, players trade rare potion bottles and armor for shiny gold coins.", "Das ist Felix. In seiner Lieblings-Online-Spielewelt handeln Spieler mit Tränken, Rüstungen und Goldmünzen.", "Poznaj Aleksandra. W jego ulubionej grze sieciowej gracze wymieniają magiczne mikstury i zbroje za lśniące złote monety."),
        T("Normally, rare enchanted armor costs fifty gold coins, taking a player ten days of monster hunting to save.", "Normalerweise kostet eine magische Ruestung 50 Goldmuenzen, wofuer man zehn Tage Quests spielt.", "Zwykle cenna zbroja kosztuje pięćdziesiąt monet, na co gracz musi polować na potwory przez dziesięć dni."),
        T("One night, a game administrator accidentally types extra zeros and generates ten million new gold coins for everyone.", "Eines Abends tippt ein Spiel-Admin versehentlich zusaetzliche Nullen ein und verteilt zehn Millionen Goldmuenzen.", "Pewnej nocy administrator gry przez pomyłkę dopisuje kilka zer i rozdaje wszystkim graczom dziesięć milionów monet."),
      ],
      PrintingDebasementDiagram,
    ),
    animatedBeat(
      [
        T("At first, players cheer because everyone feels like an instant billionaire.", "Zuerst jubeln alle Spieler, weil sich ploetzlich jeder wie ein reicher Koenig fuehlt.", "Początkowo gracze wiwatują z radości, czując się jak milionerzy z pełnymi kieszeniami."),
        T("But the game world still only has the exact same ten sets of enchanted armor in town.", "Doch in den Shops gibt es immer noch genau dieselben zehn magischen Ruestungen wie vorher.", "Ale w całym świecie gry wciąż jest dokładnie te same dziesięć sztuk rzadkiej zbroi co wcześniej."),
        T("Within twenty minutes, armor sellers raise their prices from fifty coins to two hundred thousand coins.", "Nach zwanzig Minuten verlangen die Haendler statt 50 Muenzen ploetzlich zweihunderttausend Gold.", "W ciągu dwudziestu minut handlarze podnoszą cenę z pięćdziesięciu monet do dwustu tysięcy złotych monet."),
      ],
      PrintingDebasementDiagram,
    ),
    animatedBeat(
      [
        T("This catastrophic spiral is called *hyperinflation*.", "Diesen Zerstoerungswirbel nennt man *Hyperinflation*.", "Tę niszczycielską lawinę cenową nazywa się *hiperinflacją*."),
        T("Real history saw the exact same disaster in Weimar Germany in 1923 and Zimbabwe in 2008.", "Genau dieselbe Katastrophe passierte 1923 in Deutschland und 2008 in Simbabwe.", "Dokładnie taka sama katastrofa wydarzyła się w Niemczech w 1923 roku i w Zimbabwe w roku 2008."),
        T("When governments printed trillions of paper bills to pay debts, people brought wheelbarrows of cash just to buy one loaf of bread.", "Als Staaten Billionen Scheine druckten, brauchten Buerger Schubkarren voll Geld fuer ein einziges Brot.", "Gdy rządy drukowały biliony banknotów na spłatę długów, ludzie wozili taczki gotówki, by kupić bochenek chleba."),
      ],
      PrintingDebasementDiagram,
    ),
    animatedBeat(
      [
        T("Why does printing currency never make a society wealthy?", "Warum macht das Drucken von Scheinen ein Land niemals reicher?", "Dlaczego dodrukowywanie pustego pieniądza nigdy nie czyni społeczeństwa bogatszym?"),
        T("Because paper notes and digital numbers do not bake real pizzas, code game graphics, or build fast trains.", "Weil bunte Zettel weder echte Pizza backen, noch Spielgrafiken coden oder Zuege bauen.", "Ponieważ papierki i cyfry na ekranie nie pieką chleba, nie tworzą grafiki do gier ani nie budują pociągów."),
        T("Real wealth only comes from producing real goods and services that make life better.", "Echter Reichtum kommt nur von nuetzlichen Dingen und Diensten, die das Leben bereichern.", "Prawdziwe bogactwo bierze się wyłącznie z wytwarzania realnych rzeczy i usług ułatwiających życie."),
      ],
      PrintingDebasementDiagram,
    ),
    animatedBeat(
      [
        T("To protect currency, modern central banks are kept legally independent from politicians.", "Um das Geld zu schuetzen, handeln Notenbanken unabhaengig von Politikern und Wahlen.", "Aby chronić walutę, banki centralne są prawnie niezależne od polityków i obietnic wyborczych."),
        T("Strict limits on money creation ensure that everyone savings retain their hard-earned purchasing power.", "Strenge Regeln sorgen dafuer, dass hart verdientes Erspartes seine Kaufkraft behaelt.", "Ścisłe reguły chronią ciężko zapracowane oszczędności obywateli przed nagłą utratą wartości."),
        T("Money only works when its scarcity is respected and defended with mathematical discipline.", "Geld funktioniert nur, wenn seine Knappheit mit mathematischer Disziplin verteidigt wird.", "Pieniądz ma wartość tylko wtedy, gdy jego rzadkość jest chroniona z żelazną dyscypliną."),
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
