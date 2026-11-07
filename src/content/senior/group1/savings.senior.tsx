import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function SavingsDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Savings runway and time preference diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      <rect x="40" y="60" width="140" height="130" rx="10" fill="#fff" stroke="#868e96" strokeWidth="2" />
      <text x="110" y="90" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#495057">High Time Pref</text>
      <text x="110" y="115" textAnchor="middle" fontSize="12" fill="#868e96">Spend Today</text>
      <text x="110" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#d9480f">0 Mo Runway</text>

      {step >= 1 && (
        <g>
          <rect x="220" y="60" width="140" height="130" rx="10" fill="#eef7f8" stroke="#107569" strokeWidth="2.5" />
          <text x="290" y="90" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#107569">Low Time Pref</text>
          <text x="290" y="115" textAnchor="middle" fontSize="12" fill="#1d3f47">Build Capital</text>
          <text x="290" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2b8a3e">6 Mo Runway</text>
        </g>
      )}

      {step >= 2 && (
        <path d="M 180 125 L 220 125" stroke="#107569" strokeWidth="3" markerEnd="url(#arrow)" />
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [months, setMonths] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Emergency Runway: {months} months of expenses saved ($ {months * 1200})
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setMonths((m) => {
              const next = Math.min(6, m + 1);
              if (next >= 4) onDone?.();
              return next;
            });
          }}
        >
          Save Monthly Surplus (+1 Mo)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setMonths(1)}
        >
          Spend Surplus
        </button>
      </div>
      <div style={{ padding: "12px", background: "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {months >= 3 ? "Resilient: You can survive unexpected crises without taking high-interest loans." : "Vulnerable: Any minor emergency forces emergency borrowing."}
      </div>
    </div>
  );
}

function SavingsWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What is an emergency fund primarily designed to achieve?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Speculate on volatile high-risk assets</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Cover 3 to 6 months of essential living costs during shocks</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Lock money away until retirement age</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "savings",
  story: [
    animatedBeat(
      [
        T("Meet Anjali. She earns fifteen dollars a week delivering local weekend neighborhood newsletters.", "Das ist Lena. Sie verdient 15 Euro die Woche mit dem Austragen von Wochenendzeitungen.", "Poznaj Maję. Zarabia sześćdziesiąt złotych tygodniowo na roznoszeniu lokalnych gazetek."),
        T("Her dream is to save eight hundred dollars to build her own fast custom gaming computer.", "Ihr Traum ist es, 800 Euro fuer einen schnellen Gaming-PC zusammenzusparen.", "Jej marzeniem jest odłożenie trzech tysięcy złotych na szybki komputer do gier."),
        T("Every single afternoon, friends invite her to get sweet boba tea and snacks costing five dollars a cup.", "Jeden Nachmittag laden Freunde sie zu Bubble Tea und Snacks fuer 5 Euro ein.", "Codziennie znajomi zapraszają ją na modną herbatę boba i przekąski za dwadzieścia złotych."),
      ],
      SavingsDiagram,
    ),
    animatedBeat(
      [
        T("Economists call this choice *time preference*.", "Oekonomen nennen diesen Konflikt *Zeitpraeferenz*.", "Ekonomiści nazywają ten wybór *preferencją czasową*."),
        T("High time preference means grabbing quick instant pleasure today, leaving your wallet empty tomorrow.", "Hohe Zeitpraeferenz bedeutet sofortigen Spass heute, aber morgen ein leeres Portemonnaie.", "Wysoka preferencja czasowa to natychmiastowa drobna przyjemność dziś, ale pusty portfel jutro."),
        T("Low time preference is the superpower of waiting a little bit so you can achieve something truly big.", "Niedrige Zeitpraeferenz ist die Superkraft zu warten, um wirklich grosse Ziele zu erreichen.", "Niska preferencja czasowa to supermoc cierpliwości, by zrealizować wielkie, wspaniałe marzenie."),
      ],
      SavingsDiagram,
    ),
    animatedBeat(
      [
        T("When Anjali skips two sugary drinks each week, she banks ten dollars toward her PC build.", "Wenn Lena zwei Drinks die Woche auslaesst, spart sie 10 Euro fuer ihren Gaming-PC.", "Gdy Maja rezygnuje z dwóch drogich napojów w tygodniu, odkłada czterdzieści złotych na swój komputer."),
        T("She also keeps a fifty-dollar mini *emergency buffer* so a flat bike tire never derails her progress.", "Sie haelt auch 50 Euro als *Notgroschen* bereit, damit ein platter Fahrradreifen sie nicht stoppt.", "Trzyma też dwieście złotych jako *bufor awaryjny*, by pęknięta dętka w rowerze nie zrujnowała jej planu."),
        T("Savings turn stressful unexpected emergencies into minor, easy inconveniences.", "Ein Ersparnispuffer verwandelt echte Notfaelle in harmlose Kleinigkeiten.", "Oszczędności zamieniają stresujące, nagłe kłopoty w drobne, łatwe do rozwiązania sytuacje."),
      ],
      SavingsDiagram,
    ),
    animatedBeat(
      [
        T("Saving money is not about depriving yourself of joy or never having fun with friends.", "Beim Sparen geht es nicht darum, sich jeden Spass mit Freunden zu verbieten.", "W oszczędzaniu nie chodzi o odmawianie sobie wszelkiej radości czy wyjść z przyjaciółmi."),
        T("It is about deciding what actually matters to you instead of leaking cash on things you forget by bedtime.", "Es geht darum zu entscheiden, was dir wirklich wichtig ist, statt Geld gedankenlos zu verstreuen.", "Chodzi o świadome wybieranie tego, co naprawdę ma znaczenie, zamiast bezmyślnego rozrzucania drobnych kwot."),
        T("Every dollar you save is a little mechanical employee working quietly to build your future options.", "Jeder gesparte Euro ist ein kleiner stiller Helfer, der dir spaeter echte Freiheit schenkt.", "Każdy zaoszczędzony grosz to mały pomocnik, który po cichu buduje Twoją przyszłą niezależność."),
      ],
      SavingsDiagram,
    ),
    animatedBeat(
      [
        T("By summer, Anjali orders her graphics card, processor, and monitors in shining original boxes.", "Im Sommer bestellt Lena Grafikkarte, Prozessor und Bildschirm im funkelnden Karton.", "Przed wakacjami Maja z dumą zamawia nową kartę graficzną, procesor i monitor."),
        T("Her friends wonder how she managed to buy such an incredible gaming setup.", "Ihre Freunde staunen, wie sie sich dieses tolle Setup leisten konnte.", "Jej znajomi nie mogą wyjść z podziwu, jak udało jej się złożyć tak niesamowity sprzęt."),
        T("The secret was simply directing small everyday streams of money into a reservoir of patient savings.", "Das Geheimnis war simpel: kleine taegliche Ausgaben in geduldiges Sparen umzulenken.", "Tajemnica była prosta: zamiana drobnych, codziennych wydatków w cierpliwie odkładane oszczędności."),
      ],
      SavingsDiagram,
    ),
  ],
  toyIntro: T(
    "Experiment with building an emergency cash runway of monthly expenses.",
    "Experimentiere mit dem Aufbau eines Notfallpolsters aus Monatsausgaben.",
    "Poeksperymentuj z budową poduszki finansowej na kolejne miesiące wydatków.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does an economist mean by low time preference?",
        "Was meint ein Oekonom mit niedriger Zeitpraeferenz?",
        "Co ekonomista ma na myśli, mówiąc o niskiej preferencji czasowej?",
      ),
      options: [
        { text: T("A willingness to postpone spending now for greater future benefits", "Die Bereitschaft, Ausgaben fuer groesseren Zukunftsnutzen aufzuschieben", "Gotowość do odłożenia wydatków teraz dla większych korzyści w przyszłości"), correct: true },
        { text: T("Arriving late to financial appointments", "Zu spaet zu Finanzterminen zu erscheinen", "Spóźnianie się na spotkania finansowe") },
        { text: T("Spending all earnings within twenty-four hours", "Sein gesamtes Gehalt innerhalb eines Tages auszugeben", "Wydanie całego wynagrodzenia w ciągu jednej doby") },
      ],
      hint: T(
        "It involves patience and prioritizing tomorrow over today.",
        "Es erfordert Geduld und den Vorzug des Morgigen gegenueber dem Heutigen.",
        "Wymaga cierpliwości i przedkładania jutra nad dzień dzisiejszy.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is keeping all lifetime savings purely as physical cash risky over decades?",
        "Warum ist es riskant, alle Ersparnisse jahrzehntelang als Bargeld zu halten?",
        "Dlaczego trzymanie całych oszczędności przez dekady wyłącznie w gotówce jest ryzykowne?",
      ),
      options: [
        { text: T("Inflation erodes the purchasing power of cash over time", "Inflation mindert die Kaufkraft des Geldes im Zeitverlauf", "Inflacja z czasem obniża siłę nabywczą gotówki"), correct: true },
        { text: T("Cash automatically turns into digital credits after ten years", "Bargeld verwandelt sich nach zehn Jahren automatisch in Digitalguthaben", "Gotówka automatycznie zamienia się w punkty cyfrowe po dziesięciu latach") },
        { text: T("Physical currency notes naturally dissolve if untouched", "Geldscheine loesen sich bei Nichtbenutzung von selbst auf", "Banknoty ulegają samoistnemu rozpuszczeniu, gdy nikt ich nie dotyka") },
      ],
      hint: T(
        "Think of what happens to the prices of everyday goods over long periods.",
        "Bedenke, wie sich Preise von Alltagsguetern ueber lange Zeit entwickeln.",
        "Zastanów się, co dzieje się z cenami codziennych towarów w długim okresie."),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the primary objective of an emergency fund.",
        "Waehle das Hauptziel eines Notfallfonds aus.",
        "Wskaż główny cel posiadania poduszki finansowej.",
      ),
      Widget: SavingsWidget,
      hint: T(
        "It serves as a buffer against real life shocks.",
        "Er dient als Puffer gegen Schlaege des Lebens.",
        "Służy jako amortyzator przed nieprzewidzianymi wstrząsami życiowymi.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: How many months of expenses do they keep in their emergency buffer, and why?",
    "Frage deine Eltern: Wie viele Monatsausgaben halten sie in ihrem Notfallpuffer und warum?",
    "Zapytaj rodziców: Ile miesięcy wydatków trzymają w swojej poduszce finansowej i z jakiego powodu?",
  ),
  realLife: {
    title: T(
      "Real world: Corporate cash runway and burn rates",
      "Echte Welt: Liquiditaetsreichweite und Burn-Rate von Firmen",
      "Prawdziwy świat: Płynność finansowa i tempo wypalania gotówki w firmach",
    ),
    body: T(
      "Startups and large corporations measure their financial survival in runway: the number of months a company can operate before running out of liquid cash at its current burn rate. Companies with zero runway risk immediate bankruptcy during revenue downturns.",
      "Start-ups und Grosskonzerne messen ihr finanzielles Ueberleben in Reichweite: Wie viele Monate das Geld bei den aktuellen Ausgaben reicht. Unternehmen ohne Puffer riskieren bei Einbruechen die sofortige Insolvenz.",
      "Startupy i duże korporacje mierzą swoje przetrwanie finansowe w miesiącach płynności: ile czasu firma może działać przy bieżących kosztach. Przedsiębiorstwa bez poduszki ryzykują natychmiastowe bankructwo przy spadku przychodów.",
    ),
  },
  factCard: {
    claims: [
      { text: T("Eugen von Boehm-Bawerk formulated the theory of time preference and interest in capital theory.", "Eugen von Boehm-Bawerk formulierte die Theorie der Zeitpraeferenz und des Zinses.", "Eugen von Böhm-Bawerk sformułował teorię preferencji czasowej oraz procentu w teorii kapitału."), source: "https://www.econlib.org/library/YPDBooks/BohmBawerk/bbCP.html" },
      { text: T("The US Financial Industry Regulatory Authority (FINRA) advises holding 3 to 6 months of living expenses in liquid reserves.", "Die US-Finanzaufsicht FINRA empfiehlt eine liquide Reserve von 3 bis 6 Monatsausgaben.", "Amerykański regulator FINRA zaleca utrzymywanie płynnej rezerwy na poziomie od 3 do 6 miesięcy kosztów życia."), source: "https://www.finra.org/investors/insights/emergency-fund" },
      { text: T("German financial regulator BaFin emphasizes the role of emergency liquidity in personal solvency protection.", "Die BaFin betont die Bedeutung von Notfallliquiditaet zum Schutz der persoenlichen Zahlungsfaehigkeit.", "Niemiecki regulator BaFin podkreśla rolę płynności awaryjnej w ochronie wypłacalności osobistej."), source: "https://www.bafin.de/EN/Verbraucher/Finanzwissen/Geldanlage/geldanlage_node_en.html" },
      { text: T("The Polish Financial Supervision Authority (KNF) warns about the risk of debt spirals caused by lacking emergency savings.", "Die polnische Finanzaufsicht KNF warnt vor Schuldenspiralen durch fehlende Notfallruecklagen.", "Komisja Nadzoru Finansowego (KNF) ostrzega przed spiralą zadłużenia spowodowaną brakiem oszczędności awaryjnych."), source: "https://www.knf.gov.pl/en/CONSUMERS/Information_for_consumers" },
      { text: T("Opportunity cost measures the loss of potential gain from other alternatives when one alternative is chosen.", "Opportunitaetskosten messen den entgangenen Nutzen anderer Alternativen bei einer Entscheidung.", "Koszt alternatywny mierzy utraconą korzyść z innych możliwości przy wyborze danej opcji."), source: "https://www.britannica.com/money/opportunity-cost" },
    ],
    simplified: [
      T(
        "Complex portfolio asset allocation models are simplified into the baseline division between cash buffers and investments.",
        "Komplexe Portfolio-Allokationsmodelle werden auf die grundlegende Teilung zwischen Notgroschen und Anlage vereinfacht.",
        "Złożone modele alokacji portfelowej uproszczono do podstawowego podziału na bufor gotówkowy i inwestycje.",
      ),
    ],
  },
};
