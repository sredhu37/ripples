import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function CompoundInterestDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Compound interest exponential growth diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      <path d="M 50 190 L 350 190" stroke="#868e96" strokeWidth="1.5" />
      <path d="M 50 190 L 50 30" stroke="#868e96" strokeWidth="1.5" />

      {/* Linear simple interest */}
      <path d="M 50 190 L 350 130" stroke="#adb5bd" strokeWidth="2.5" strokeDasharray="4,4" />
      <text x="310" y="120" fontSize="10" fill="#868e96">Simple: Linear</text>

      {step >= 1 && (
        <g>
          {/* Exponential curve */}
          <path d="M 50 190 Q 200 180, 350 45" fill="none" stroke="#2b8a3e" strokeWidth="3" />
          <text x="270" y="40" fontSize="11" fontWeight="bold" fill="#2b8a3e">Compound: Exponential</text>
        </g>
      )}

      {step >= 2 && (
        <g>
          <circle cx="210" cy="155" r="5" fill="#f59f00" />
          <text x="210" y="145" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#784e03">Inflection Point</text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [rate, setRate] = useState(7);
  const yearsToDouble = Math.round(72 / rate);
  const principal = 1000;
  const balanceAfter30 = Math.round(principal * Math.pow(1 + rate / 100, 30));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Annual Return: {rate}% | Doubles in ~{yearsToDouble} yrs | $1k in 30 yrs: ${balanceAfter30.toLocaleString()}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setRate((r) => {
              const next = r === 7 ? 10 : r === 10 ? 4 : 7;
              if (next === 10) onDone?.();
              return next;
            });
          }}
        >
          Toggle Return ({rate === 7 ? "10%" : rate === 10 ? "4%" : "7%"})
        </button>
      </div>
      <div style={{ padding: "12px", background: "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        Rule of 72: 72 divided by {rate}% means your money doubles every {yearsToDouble} years!
      </div>
    </div>
  );
}

function InterestWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Using the Rule of 72, approximately how long does it take an investment earning 8% annually to double?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>36 years</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>9 years (72 divided by 8)</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>72 years</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "interest",
  story: [
    animatedBeat(
      [
        T("Interest is the rental fee paid for the use of borrowed capital over time.", "Zinsen sind die Leihgebuehr fuer die zeitweise Nutzung von fremdem Kapital.", "Odsetki to opłata za wypożyczenie kapitału w określonym czasie."),
        T("When money is left untouched to grow, it follows one of two mathematical paths.", "Bleibt Geld unberuehrt zum Wachsen liegen, folgt es einem von zwei Rechenwegen.", "Gdy pieniądze pracują nienaruszone, podlegają jednej z dwóch ścieżek matematycznych."),
        T("The first path is *simple interest*, where interest is calculated strictly on the original principal.", "Der erste Pfad sind *einfache Zinsen*: Zinsen fallen rein auf das Anfangskapital an.", "Pierwsza ścieżka to *procent prosty*, gdzie odsetki naliczane są wyłącznie od kwoty początkowej."),
      ],
      CompoundInterestDiagram,
    ),
    animatedBeat(
      [
        T("The second path is *compound interest*, where you earn interest on your principal and on all previous interest.", "Der zweite Pfad sind *Zinseszinsen*: Du erhaeltst Zinsen auf Kapital und alte Zinsen.", "Druga ścieżka to *procent składany*: zarabiasz odsetki od kapitału i od wcześniejszych odsetek."),
        T("Compound interest creates an exponential mathematical hockey stick curve.", "Der Zinseszins erzeugt eine exponentielle Kurve wie ein Hockeyschlaeger.", "Procent składany tworzy wykres przypominający kij hokejowy: gwałtowny wzrost wykładniczy."),
        T("In the early years, the growth seems modest and gradual.", "In den ersten Jahren wirkt das Wachstum noch bescheiden und unauffaellig.", "W pierwszych latach wzrost wydaje się skromny i powolny."),
      ],
      CompoundInterestDiagram,
    ),
    animatedBeat(
      [
        T("Over two or three decades, the reinvested gains begin to dwarf your initial contribution.", "Nach zwei oder drei Dekaden ueberfluegeln die Ertraege die eigene Einzahlung voellig.", "Po dwóch czy trzech dekadach reinwestowane zyski wielokrotnie przewyższają wkład początkowy."),
        T("Albert Einstein reportedly praised compounding as a wonder of the mathematical world.", "Albert Einstein ruehmte den Zinseszins angeblich als mathematisches Wunderwerk.", "Albert Einstein miał rzekomo nazwać procent składany cudem świata matematyki."),
        T("Time is the ultimate engine of compounding: starting ten years earlier can quadruple your final result.", "Zeit ist der Motor: Zehn Jahre frueher anzufangen kann das Endergebnis vervierfachen.", "Czas to kluczowy motor: rozpoczęcie inwestowania dziesięć lat wcześniej może czterokrotnie zwiększyć wynik."),
      ],
      CompoundInterestDiagram,
    ),
    animatedBeat(
      [
        T("Financiers use a mental shortcut called the *Rule of 72*.", "Finanzprofis nutzen die gedankliche Abkuerzung der *72er-Regel*.", "Inwestorzy stosują szybką regułę pamięciową zwaną *regułą 72*."),
        T("Divide 72 by your annual percentage return to calculate roughly how many years it takes your money to double.", "Teile 72 durch die Rendite, um zu wissen, in wie vielen Jahren sich das Geld verdoppelt.", "Podziel 72 przez roczną stopę zwrotu, by dowiedzieć się, po ilu latach podwoisz swój kapitał."),
        T("At eight percent annual return, your capital doubles approximately every nine years.", "Bei acht Prozent Jahresrendite verdoppelt sich dein Kapital etwa alle neun Jahre.", "Przy ośmiu procentach zysku rocznie Twój kapitał podwaja się w przybliżeniu co dziewięć lat."),
      ],
      CompoundInterestDiagram,
    ),
    animatedBeat(
      [
        T("Always compare *nominal return* against inflation to determine your *real return*.", "Vergleiche immer die *Nominalrendite* mit der Inflation fuer die *Realrendite*.", "Zawsze zestawiaj *stopę nominalną* z inflacją, aby obliczyć rzeczywistą *stopę realną*."),
        T("If an account yields 4% but inflation is 3%, your real purchasing power expands by only 1%.", "Liefert ein Konto 4% bei 3% Inflation, waechst die reale Kaufkraft nur um 1%.", "Gdy konto daje 4%, ale inflacja wynosi 3%, realna siła nabywcza rośnie o zaledwie 1%."),
        T("Harness compounding early in life, reinvest gains patiently, and avoid negative compounding debt.", "Nutze den Zinseszins frueh, reinvestiere geduldig und meide teure Konsumschulden.", "Korzystaj z procentu składanego od młodości, cierpliwie reinwestuj i unikaj długów konsumpcyjnych."),
      ],
      CompoundInterestDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how compound interest and the Rule of 72 accelerate wealth over thirty years.",
    "Untersuche, wie Zinseszins und die 72er-Regel den Vermoegensaufbau ueber dreissig Jahre beschleunigen.",
    "Zobacz, jak procent składany i reguła 72 przyspieszają wzrost majątku w horyzoncie trzydziestu lat.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the core distinction between simple interest and compound interest?",
        "Was ist der Kernunterschied zwischen einfachen Zinsen und Zinseszinsen?",
        "Jaka jest kluczowa różnica między procentem prostym a procentem składanym?",
      ),
      options: [
        { text: T("Compound interest earns return on both original principal and previously accumulated gains", "Zinseszins verzinst sowohl das Startkapital als auch zuvor aufgelaufene Zinsen", "Procent składany nalicza zysk zarówno od kapitału początkowego, jak i od wcześniejszych odsetek"), correct: true },
        { text: T("Simple interest is paid only in gold bars", "Einfache Zinsen werden nur in Goldbarren gezahlt", "Procent prosty jest wypłacany wyłącznie w sztabkach złota") },
        { text: T("Compound interest stops functioning after five months", "Zinseszins verfaellt nach genau fuenf Monaten", "Procent składany przestaje działać po upływie pięciu miesięcy") },
      ],
      hint: T(
        "Gains generate further gains in an ongoing cycle.",
        "Ertraege erzeugen fortlaufend weitere Ertraege.",
        "Zyski generują kolejne zyski w powtarzającym się cyklu.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How is real interest rate calculated in finance?",
        "Wie berechnet sich der Realzins in den Finanzwissenschaften?",
        "Jak oblicza się realną stopę procentową w finansach?",
      ),
      options: [
        { text: T("Nominal interest rate minus the inflation rate", "Nominaler Zinssatz abzueglich der Inflationsrate", "Nominalna stopa procentowa minus wskaźnik inflacji"), correct: true },
        { text: T("Dividing your bank account balance by your age", "Teilen des Kontostands durch das eigene Lebensalter", "Podzielenie salda konta przez wiek właściciela") },
        { text: T("Adding twenty percent to any government fee", "Hinzurechnen von zwanzig Prozent auf jede Staatsgebuehr", "Dodanie dwudziestu procent do każdej opłaty urzędowej") },
      ],
      hint: T(
        "Real return accounts for the erosion of buying power.",
        "Der Realzins beruecksichtigt den Kaufkraftverlust des Geldes.",
        "Stopa realna uwzględnia spadek siły nabywczej pieniądza.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Use the Rule of 72 to calculate the doubling time at 8% annual return.",
        "Wende die 72er-Regel an, um die Verdopplungszeit bei 8% Rendite zu bestimmen.",
        "Zastosuj regułę 72, aby obliczyć czas podwojenia kapitału przy 8% zwrotu.",
      ),
      Widget: InterestWidget,
      hint: T(
        "Divide 72 by the annual percentage rate (8).",
        "Teile 72 durch den ganzzahligen Prozentsatz (8).",
        "Podziel liczbę 72 przez roczną stopę procentową (8).",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: At what age did they begin saving or investing, and what would they do differently?",
    "Frage deine Eltern: In welchem Alter haben sie mit Sparen oder Anlegen begonnen und was wuerden sie heute anders machen?",
    "Zapytaj rodziców: W jakim wieku zaczęli oszczędzać lub inwestować i co zrobiliby inaczej z perspektywy czasu?",
  ),
  realLife: {
    title: T(
      "Real world: S&P 500 long-term historical compounding",
      "Echte Welt: Langfristiges Wachstum des US-Aktienmarktes S&P 500",
      "Prawdziwy świat: Długoterminowy procent składany indeksu S&P 500",
    ),
    body: T(
      "Over the past century, a broad index of the 500 largest American corporations has produced an average annual nominal return around 10% (approximately 7% real return after inflation). Reinvesting all cash dividends through compound growth has turned modest monthly contributions into multi-million dollar retirement nest eggs.",
      "Im letzten Jahrhundert erzielte der Index der 500 groessten US-Konzerne rund 10% jaehrliche Nominalrendite (ca. 7% real nach Inflation). Die Wiederanlage aller Dividenden durch den Zinseszins schuf enorme Altersvermoegen.",
      "W ciągu minionego stulecia indeks 500 największych amerykańskich spółek przynosił średnioroczny zwrot nominalny na poziomie ok. 10% (ok. 7% realnie po odliczeniu inflacji). Reinwestowanie dywidend przekształcało regularne wpłaty w wielomilionowe kapitały emerytalne.",
    ),
  },
  factCard: {
    claims: [
      { text: T("The mathematical formula for compound interest A = P(1 + r/n)^(nt) dates to ancient Babylonian and medieval merchants.", "Die Zinseszinsformel geht auf historische Kaufmannsberechnungen zurueck.", "Wzór matematyczny na procent składany wywodzi się z obliczeń dawnych kupców babilońskich i średniowiecznych."), source: "https://www.britannica.com/money/compound-interest" },
      { text: T("The US Securities and Exchange Commission (SEC) provides public compound interest calculators to demonstrate time horizons.", "Die US-Boersenaufsicht SEC bietet oeffentliche Zinseszinsrechner zur Veranschaulichung von Zeithorizonten an.", "Amerykańska SEC udostępnia oficjalne kalkulatory procentu składanego, obrazujące wagę długiego horyzontu czasowego."), source: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
      { text: T("The Rule of 72 was published by Franciscan friar Luca Pacioli in his 1494 mathematical work Summa de arithmetica.", "Die 72er-Regel wurde 1494 von Luca Pacioli in seiner Summa de arithmetica beschrieben.", "Reguła 72 została opublikowana przez mnicha Luca Pacioli w jego dziele matematycznym Summa de arithmetica z 1494 roku."), source: "https://www.maa.org/press/periodicals/convergence/mathematical-treasure-luca-pacioli-summa-de-arithmetica" },
      { text: T("Deutsche Bundesbank illustrates nominal versus inflation-adjusted real returns in consumer financial education publications.", "Die Deutsche Bundesbank erlaeutert Nominal- und Realzinsen in ihren Bildungsberichten.", "Deutsche Bundesbank objaśnia różnicę między stopami nominalnymi a realnymi w swoich publikacjach edukacyjnych."), source: "https://www.bundesbank.de/en/service/financial-education" },
      { text: T("S&P Dow Jones Indices documents total return compounding including reinvested dividends across 50-year spans.", "S&P Dow Jones Indices dokumentiert den Gesamtertrag aus Kursgewinnen und wiederangelegten Dividenden ueber 50 Jahre.", "S&P Dow Jones Indices dokumentuje całkowity zwrot obejmujący wzrost kursu i reinwestycję dywidend na przestrzeni 50 lat."), source: "https://www.spglobal.com/spdji/en/indices/equity/sp-500/" },
    ],
    simplified: [
      T(
        "Continuous logarithmic compounding models are simplified to annual discrete compounding intervals for accessible computation.",
        "Kontinuierliche stetige Zinsmodelle werden auf jaehrliche Zinsperioden fuer leichtere Berechenbarkeit vereinfacht.",
        "Ciągłe modele kapitalizacji logarytmicznej uproszczono do rocznych okresów naliczania dla łatwiejszego zrozumienia.",
      ),
    ],
  },
};
