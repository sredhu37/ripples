import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function WhyHistoryCyclesDiagram({ lang, step }: DiagramProps) {
  const aaravName = lang === "pl" ? "Adam" : lang === "de" ? "Arne" : "Aarav";
  const label =
    lang === "pl"
      ? "Adam bada cykle historii: powtarzające się wzorce baniek, kryzysów i odnowy instytucji"
      : lang === "de"
        ? "Arne analysiert historische Zyklen: Wiederkehrende Muster von Spekulationsblasen, Krisen und Institutionen"
        : "Aarav analyzing historical cycles: recurring patterns of asset bubbles, systemic crises, and institutional renewal";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#8b5cf6"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#8b5cf6" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#4c1d95" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#7c3aed"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ddd6fe">
          {aaravName}
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
          stroke="#8b5cf6"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ede9fe">
          🕰️{" "}
          {lang === "pl"
            ? "Dlaczego Historia Ma Znaczenie"
            : lang === "de"
              ? "Warum Geschichte wichtig ist"
              : "Why History Matters: Systemic Patterns"}
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
            stroke="#7c3aed"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="16">
            🔄 📉 💡
          </text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#a78bfa">
            {lang === "pl"
              ? "Cykle gospodarcze • Pamięć instytucjonalna"
              : lang === "de"
                ? "Wirtschaftszyklen • Institutionelles Gedaechtnis"
                : "Economic Cycles • Institutional Memory"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#4c1d95" />
          <text
            x="250"
            y="170"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Historia nie powtarza się, lecz rymuje"
              : lang === "de"
                ? "Geschichte wiederholt sich nicht, sie reimt sich"
                : "History does not repeat, but it rhymes"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#ddd6fe">
            {lang === "pl"
              ? "Kto zapomina o przeszłości, powtarza jej błędy"
              : lang === "de"
                ? "Wer die Vergangenheit vergisst, wiederholt ihre Fehler"
                : "Those who forget the past are condemned to repeat it"}
          </text>
        </g>
      )}
    </svg>
  );
}

function FinancialManiaBubblePatternDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Anatomia bańki spekulacyjnej: od tulipomanii z 1637 po krach z 2008 roku"
      : lang === "de"
        ? "Anatomie einer Finanzblase: Von der Tulpenmanie 1637 bis zum Crash 2008"
        : "Anatomy of an asset bubble: from the 1637 tulip mania to the 2008 financial crash";

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
        <path
          d="M 50 150 Q 150 140 220 50 Q 250 40 270 160 L 350 155"
          fill="none"
          stroke="#dc2626"
          strokeWidth="3"
        />
        <circle cx="235" cy="45" r="5" fill="#dc2626" />
        <text x="235" y="30" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#991b1b">
          Peak Euphoria: "This time is different!"
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f87171">
            Tulip Mania (1637), South Sea (1720), 1929, Dot-Com (2000), 2008
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl"
              ? "Każde pokolenie ulega złudzeniu, że stare prawa ryzyka już nie obowiązują"
              : lang === "de"
                ? "Jede Generation glaubt faelschlicherweise, alte Risikogesetze gelten nicht mehr"
                : "Every generation falsely assumes that basic laws of risk and leverage are obsolete"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#991b1b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Zrozumienie historii finansów chroni przed rujnującymi decyzjami"
              : lang === "de"
                ? "Finanzgeschichte schuetzt vor existenziellen Fehlentscheidungen"
                : "Studying financial history shields investors and citizens from ruin"}
          </text>
        </g>
      )}
    </svg>
  );
}

function InstitutionalResilienceDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Instytucje jako nośnik mądrości: konstytucje, wolne banki centralne i rządy prawa"
      : lang === "de"
        ? "Institutionen als Speicher kollektiver Klugheit: Verfassungen und Rechtsstaat"
        : "Institutions as repositories of collective wisdom: constitutions and rule of law";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#eff6ff"
        stroke="#2563eb"
        strokeWidth="2"
      />
      <g>
        <circle cx="100" cy="90" r="34" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <text x="100" y="85" textAnchor="middle" fontSize="18">
          🏛️ 📚
        </text>
        <text x="100" y="105" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1e40af">
          Historical Memory
        </text>

        <rect x="230" y="65" width="130" height="55" rx="6" fill="#1e40af" />
        <text x="295" y="88" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
          Constitutional Brakes
        </text>
        <text x="295" y="104" textAnchor="middle" fontSize="8" fill="#dbeafe">
          Preventing demagogues
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#60a5fa">
            Laws and safeguards are written in the ink of past disasters
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#e2e8f0">
            {lang === "pl"
              ? "Regulacje bankowe i prawa obywatelskie powstały po to, by koszmary się nie powtórzyły"
              : lang === "de"
                ? "Bankenaufsicht und Buergerrechte entstanden aus bitteren Erfahrungen"
                : "Safety regulations and human rights safeguards reflect hard-learned lessons of past catastrophes"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1d4ed8" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Demontaż zabezpieczeń prawnych zawsze poprzedza powrót kryzysu"
              : lang === "de"
                ? "Der Abbau von Schranken ebnet den Weg fuer die naechste Krise"
                : "Weakening institutional safeguards invariably invites the return of systemic crisis"}
          </text>
        </g>
      )}
    </svg>
  );
}

function TechnologyAndMoralityDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Technologia i etyka: maszyny parowe, energia jądrowa i sztuczna inteligencja"
      : lang === "de"
        ? "Technologie und Moral: Dampfkraft, Atomenergie und Kuenstliche Intelligenz"
        : "Technology and moral choice: steam engines, atomic energy, and artificial intelligence";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f0fdf4"
        stroke="#16a34a"
        strokeWidth="2"
      />
      <g>
        <circle cx="100" cy="90" r="32" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="100" y="85" textAnchor="middle" fontSize="18">
          ⚙️ 🚀
        </text>
        <text x="100" y="105" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#15803d">
          Tech Innovation
        </text>

        <circle cx="300" cy="90" r="32" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="300" y="85" textAnchor="middle" fontSize="18">
          ⚖️ 🧠
        </text>
        <text x="300" y="105" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#15803d">
          Human Wisdom
        </text>

        <line x1="135" y1="90" x2="265" y2="90" stroke="#16a34a" strokeWidth="2.5" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#14532d" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Tools change at lightspeed; human psychology remains ancient
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#bbf7d0">
            {lang === "pl"
              ? "Ludzkie emocje (chciwość, lęk, odwaga) są takie same jak w starożytnym Rzymie"
              : lang === "de"
                ? "Menschliche Motive wie Gier und Angst sind seit Jahrtausenden unveraendert"
                : "Fear, greed, empathy, and ambition remain constant across millennia"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Historia dostarcza nam etycznego kompasu do zarządzania nowymi technologiami"
              : lang === "de"
                ? "Geschichte liefert den moralischen Kompass fuer neue Technologien"
                : "History provides the essential moral compass for governing transformative tools"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ActiveCitizenCompassDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Świadomy obywatel: korzystanie z historii do budowania lepszej przyszłości"
      : lang === "de"
        ? "Der aufgeklaerte Buerger: Mit historischem Wissen die Zukunft gestalten"
        : "The informed citizen: harnessing historical insight to construct a freer future";

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
      <g>
        <circle cx="200" cy="80" r="34" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">
          🌟 🧭
        </text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#581c87">
          Civic Compass
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#581c87" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            History is not a list of dusty dates; it is the source code of civilization
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#e9d5ff">
            {lang === "pl"
              ? "Pozwala dostrzec manipulacje, bronić wolności i docenić owoce pokoju"
              : lang === "de"
                ? "Sie laesst uns Propaganda durchschauen und die Fruechte des Friedens schuetzen"
                : "It trains you to detect demagogues, defend civil liberties, and safeguard peace"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Przyszłość nie jest z góry zapisana; kształtują ją nasze codzienne wybory"
              : lang === "de"
                ? "Die Zukunft ist offen: Unsere taeglichen Entscheidungen schreiben sie"
                : "The future is unwritten; it is authored by our conscious civic choices"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [studiesHistory, setStudiesHistory] = useState(false);
  const [testsSafeguards, setTestsSafeguards] = useState(false);
  const insightScore = (studiesHistory ? 50 : 0) + (testsSafeguards ? 50 : 0);
  const isEnlightened = studiesHistory && testsSafeguards;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Civic Insight Score: {insightScore}/100 | State:{" "}
        {isEnlightened ? "History-Informed Vigilance" : "Vulnerable to Repeat Failures"}
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setStudiesHistory(true);
            setTestsSafeguards(true);
            onDone?.();
          }}
        >
          Study Historical Patterns & Reinforce Safeguards
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setStudiesHistory(false);
            setTestsSafeguards(false);
          }}
        >
          Ignore Historical Memory ("This Time is Different")
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: isEnlightened ? "#eef8ef" : "#fef2f2",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {isEnlightened
          ? "Historical Wisdom Engaged: Recognizing recurring cycles of debt mania, authoritarian erosion, and trade protectionism enables citizens to defend liberty and prosperity!"
          : "Historical Amnesia: Societies that discard past lessons sleepwalk into predictable cycles of financial collapse, hyperinflation, and conflict."}
      </div>
    </div>
  );
}

function WhyHistoryWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        What is the primary value of studying economic and political history for young citizens
        today?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        To memorize lists of dead kings' favorite sandwich toppings
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        To identify recurring systemic patterns of financial euphoria, debt bubbles, and
        institutional fragility so we can protect constitutional checks, avoid systemic panics, and
        preserve human freedom
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        To build time machines out of hollowed-out tree stumps
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "whyhistory",
  story: [
    animatedBeat(
      [
        T(
          "Meet Aarav. He closes his historical notebooks and reflects on a single profound question: why does the study of history matter so urgently today?",
          "Das ist Arne. Er schliesst seine Geschichtshefte und stellt sich eine grundlegende Frage: Warum ist das Studium der Geschichte heute so wichtig?",
          "Poznaj Adama. Zamyka swoje notesy historyczne i zadaje sobie najważniejsze pytanie: dlaczego badanie przeszłości ma dziś tak fundamentalne znaczenie?",
        ),
        T(
          "History is not a dry cemetery of memorized dates and royal genealogies; it is the living source code of modern civilization.",
          "Geschichte ist keine staubige Sammlung von Jahreszahlen, sondern der lebendige Quellcode unserer heutigen Gesellschaft.",
          "Historia nie jest cmentarzyskiem wykutych na pamięć dat i rodowodów królów; to żywy kod źródłowy współczesnej cywilizacji.",
        ),
        T(
          "Every legal right you enjoy, every currency you spend, and every democratic institution that shields your freedom was forged through painful historical trials.",
          "Jedes Grundrecht, jede verlaessliche Waehrung und jedes freie Parlament wurden in schmerzhaften historischen Krisen erkämpft.",
          "Każde prawo obywatelskie, zaufana waluta i demokratyczna instytucja chroniąca Twoją wolność zostały okupione bolesnymi doświadczeniami przeszłości.",
        ),
      ],
      WhyHistoryCyclesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Across centuries, human beings predictably repeat psychological patterns of financial greed and panic.",
          "Ueber Jahrhunderte hinweg wiederholen Menschen verlaesslich dieselben Muster aus Gier und Panik.",
          "Na przestrzeni stuleci ludzie z zadziwiającą regularnością powtarzają te same błędy chciwości i paniki.",
        ),
        T(
          "From the Dutch Tulip Mania of 1637 and the South Sea Bubble of 1720 to the Wall Street Crash of 1929 and the Subprime Crisis of 2008, the rhythm is identical.",
          "Von der Tulpenblase 1637 ueber den Boersencrash 1929 bis zur Finanzkrise 2008 laeuft das Drama nach demselben Drehbuch ab.",
          "Od tulipomanii z 1637 r., przez krach na Wall Street w 1929 r., aż po kryzys finansowy z 2008 r., mechanizm bańki pozostaje niezmienny.",
        ),
        T(
          "In every era, speculators proclaim 'this time is different!', only to discover that the fundamental laws of risk, debt, and gravity cannot be suspended.",
          "Jedes Mal rufen Spekulanten: 'Diesmal ist alles anders!', nur um festzustellen, dass fundamentale Risikogesetze ewig gelten.",
          "Za każdym razem spekulanci głoszą: 'tym razem będzie inaczej!', po czym okazuje się, że podstawowe prawa ryzyka i długu są nieubłagane.",
        ),
      ],
      FinancialManiaBubblePatternDiagram,
    ),
    animatedBeat(
      [
        T(
          "Civilizations endure because they capture hard-won historical lessons into resilient political and financial institutions.",
          "Erfolgreiche Gesellschaften ueberleben, weil sie historische Erfahrungen in kluge Institutionen giessen.",
          "Cywilizacje trwają, ponieważ potrafią przekształcić bolesne lekcje w trwałe instytucje prawne i finansowe.",
        ),
        T(
          "Constitutions separate executive, legislative, and judicial powers because history proved that unchecked rulers always abuse power.",
          "Verfassungen teilen die Gewalten, weil die Geschichte bewiesen hat: Unkontrollierte Herrscher missbrauchen ihre Macht stets.",
          "Konstytucje rozdzielają władzę wykonawczą, ustawodawczą i sądowniczą, bo historia dowiodła, że władza absolutna zawsze prowadzi do ucisku.",
        ),
        T(
          "Independent central banks and bank deposit insurance exist because historical bank runs and hyperinflations wiped out families' life savings.",
          "Unabhaengige Zentralbanken und Einlagensicherungen schuetzen Ersparnisse vor verheerenden Entwertungen und Bankenpleiten.",
          "Niezależne banki centralne i gwarancje depozytów powstały po to, by panika bankowa i hiperinflacja nie pozbawiały ludzi dorobku całego życia.",
        ),
      ],
      InstitutionalResilienceDiagram,
    ),
    animatedBeat(
      [
        T(
          "Technological power advances at breathtaking exponential speed, yet human biology and psychological instincts remain unchanged.",
          "Technologischer Fortschritt explodiert rasant, doch die menschliche Psyche bleibt seit Jahrtausenden dieselbe.",
          "Potęga technologii rozwija się w tempie wykładniczym, lecz ludzka psychika i emocje pozostają od tysiącleci niezmienne.",
        ),
        T(
          "From steam power and atomic energy to generative artificial intelligence, transformative inventions can be utilized to heal or to oppress.",
          "Von der Dampfmaschine ueber Atomkraft bis zur Kuenstlichen Intelligenz koennen Werkzeuge heilen oder zerstoeren.",
          "Od silnika parowego i energii atomowej po sztuczną inteligencję, każda wielka technologia może służyć do budowania albo ucisku.",
        ),
        T(
          "Without a profound historical and ethical anchor, societies risk deploying immense scientific capability in service of ancient tribal hatreds and tyranny.",
          "Ohne historischen und ethischen Kompass drohen Gesellschaften, maechtige Technik fuer alten Hass und Diktatur zu missbrauchen.",
          "Bez głębokiego zakorzenienia w historii i etyce społeczeństwa ryzykują użycie nowoczesnych narzędzi do starych tyranii i konfliktów.",
        ),
      ],
      TechnologyAndMoralityDiagram,
    ),
    animatedBeat(
      [
        T(
          "Studying history transforms you from a passive passenger into an active, discerning guardian of your democracy.",
          "Das Studium der Geschichte macht dich vom passiven Zuschauer zum wachsamen Hueter unserer Demokratie.",
          "Poznanie historii zmienia Cię z biernego widza w świadomego, czujnego strażnika wolności i demokracji.",
        ),
        T(
          "It equips you to see through populist propaganda, recognize early warning signs of democratic decay, and demand transparency from leaders.",
          "Es ruetet dich, Demagogie zu entlarven, Fruehwarnzeichen fuer Krisen zu erkennen und Rechenschaft einzufordern.",
          "Pozwala przejrzeć manipulacje populistów, w porę rozpoznać objawy erozji praworządności i rozliczać przywódców z ich obietnic.",
        ),
        T(
          "By understanding the path mankind walked to build our free world, you hold the wisdom needed to guide our shared future toward lasting prosperity.",
          "Wer den langen Weg der Menschheit zur Freiheit versteht, besitzt die Klugheit, unsere Zukunft friedlich und wohlhabend zu gestalten.",
          "Zrozumienie długiej drogi ludzkości ku wolności daje Ci mądrość niezbędną do budowania lepszej, bezpiecznej i sprawiedliwej przyszłości.",
        ),
      ],
      ActiveCitizenCompassDiagram,
    ),
  ],
  toyIntro: T(
    "Engage historical civic memory: examine past cycles of financial euphoria and institutional failure to build foresight and resilience against future panics.",
    "Nutze das historische Gedaechtnis: Analysiere vergangene Spekulationsblasen und institutionelle Krisen fuer mehr Weitsicht und Stabilitaet.",
    "Uruchom pamięć historyczną: zbadaj dawne bańki spekulacyjne i kryzysy instytucji, by budować dalekowzroczność i odporność na przyszłe zawirowania.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why do financial asset bubbles repeatedly recur across centuries despite advances in mathematics and technology?",
        "Warum wiederholen sich Finanzblasen ueber Jahrhunderte hinweg trotz modernster Mathematik und Technologie?",
        "Dlaczego bańki spekulacyjne powtarzają się na przestrzeni stuleci mimo rozwoju matematyki i technologii?",
      ),
      options: [
        {
          text: T(
            "Because human psychological tendencies toward greed, fear of missing out, and collective euphoria remain constant, leading market participants to ignore historical risks",
            "Weil menschliche Reflexe wie Gier und Herdentrieb unveraendert bleiben und Anleger historische Warnsignale ueber Bord werfen",
            "Ponieważ ludzkie emocje, takie jak chciwość, strach przed pominięciem okazji i owczy pęd, są niezmienne, skłaniając uczestników rynku do ignorowania ryzyka",
          ),
          correct: true,
        },
        {
          text: T(
            "Because computer monitors emit secret rays that cause investors to forget arithmetic",
            "Weil Computerbildschirme geheime Strahlen aussenden, die das Kopfrechnen laehmen",
            "Ponieważ ekrany komputerów emitują promienie sprawiające, że ludzie zapominają tabliczkę mnożenia",
          ),
          correct: false,
        },
        {
          text: T(
            "Because the International Monetary Fund changes the spelling of the word 'money' every decade",
            "Weil der IWF alle zehn Jahre die Rechtschreibung des Wortes 'Geld' aendert",
            "Ponieważ Międzynarodowy Fundusz Walutowy co dziesięć lat zmienia pisownię słowa 'pieniądz'",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about what Carmen Reinhart and Kenneth Rogoff titled their book: 'This Time Is Different'.",
        "Denke an den beruehmten Buchtitel von Rogoff und Reinhart: 'Dieses Mal ist alles anders'.",
        "Przypomnij sobie słynny tytuł książki Reinhart i Rogoffa: 'Tym razem będzie inaczej'.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why are modern democratic institutions like constitutions, judicial review, and independent central banks often described as 'historical memories'?",
        "Warum werden moderne demokratische Institutionen oft als 'gespeichertes historisches Gedaechtnis' bezeichnet?",
        "Dlaczego nowoczesne instytucje demokratyczne, takie jak konstytucje i niezależne sądy, nazywa się 'zapisaną pamięcią historyczną'?",
      ),
      options: [
        {
          text: T(
            "Because their rules and separation of powers were deliberately designed to prevent specific abuses of power, hyperinflations, and tyrannies that devastated societies in the past",
            "Weil ihre Gewaltenteilung gezielt geschaffen wurde, um historische Tyranneien und Waehrungszerfaelle fuer die Zukunft zu verhindern",
            "Ponieważ ich reguły i podział władz zostały celowo zaprojektowane, by zapobiegać tyranii, samowoli i hiperinflacji, które niszczyły państwa w przeszłości",
          ),
          correct: true,
        },
        {
          text: T(
            "Because parliament buildings are made out of recycled textbook pages",
            "Weil Parlamentsgebaeude aus alten Schulbuchseiten gemauert sind",
            "Ponieważ gmachy parlamentów buduje się ze starych kartek podręczników",
          ),
          correct: false,
        },
        {
          text: T(
            "Because supreme court judges are required to speak exclusively in Latin rhyming riddles",
            "Weil Verfassungsrichter nur in lateinischen Reimen sprechen duerfen",
            "Ponieważ sędziowie trybunałów konstytucyjnych mają obowiązek rymować po łacinie",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Focus on how institutional safeguards protect against repeating past systemic disasters.",
        "Achte darauf, wie institutionelle Schranken vor der Wiederholung alter Fehler schuetzen.",
        "Zwróć uwagę na to, jak bezpieczniki instytucjonalne chronią przed powtórką dawnych katastrof.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Examine why the study of historical patterns is indispensable for active citizenship.",
        "Untersuche, warum das Verstaendnis historischer Muster fuer muendige Buerger unersetzlich ist.",
        "Zbadaj, dlaczego znajomość procesów historycznych jest niezbędna dla każdego świadomego obywatela.",
      ),
      Widget: WhyHistoryWidget,
      hint: T(
        "Focus on recognizing cyclical euphoria, institutional vulnerability, and preserving civil liberties.",
        "Achte auf das Erkennen von Zyklen, institutioneller Verwundbarkeit und Buergerrechten.",
        "Skup się na rozpoznawaniu cykli kryzysowych, kruchości instytucji i obronie wolności obywatelskich.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Which lesson from history do you think our society needs to remember most carefully right now?",
    "Frage deine Eltern: Welche historische Lektion sollte unsere Gesellschaft gerade heute am aufmerksamsten beherzigen?",
    "Zapytaj rodziców: Jaka lekcja z historii jest Waszym zdaniem najważniejsza do zapamiętania dla współczesnego społeczeństwa?",
  ),
  realLife: {
    title: T(
      "Real world: Carmen Reinhart and Kenneth Rogoff's 'This Time Is Different: Eight Centuries of Financial Folly'",
      "Echte Welt: Reinhart und Rogoffs 'Dieses Mal ist alles anders: Acht Jahrhunderte Finanzkrisen'",
      "Prawdziwy świat: Reinhart i Rogoff i 'Tym razem będzie inaczej: Osiem wieków finansowej głupoty'",
    ),
    body: T(
      "In their definitive 2009 quantitative historical study 'This Time Is Different', Harvard economists Carmen Reinhart and Kenneth Rogoff examined eight centuries of sovereign debt defaults, banking panics, and currency collapses across 66 nations. Their landmark finding was that the universal precursor to catastrophic systemic crisis is the hubristic belief among elites that modern financial innovations or government competence have rendered old economic laws obsolete.",
      "In ihrer umfassenden Studie 'Dieses Mal ist alles anders' (2009) untersuchten die Harvard-Oekonomen Carmen Reinhart und Kenneth Rogoff 800 Jahre Finanzkrisen in 66 Laendern. Ihr zentrales Ergebnis: Vor jedem grossen Crash glauben Politik und Maerkte arrogant, die Gesetze der Oekonomie ausgehebelt zu haben. Historisches Wissen ist das wirksamste Gegengift gegen diese Hybris.",
      "W przełomowej książce 'Tym razem będzie inaczej' (2009) ekonomiści z Harvardu Carmen Reinhart i Kenneth Rogoff zbadali 800 lat kryzysów zadłużenia, panik bankowych i załamań walutowych w 66 krajach. Wykazali, że uniwersalnym zwiastunem każdego krachu jest pyszne przekonanie elit, że nowoczesne innowacje unieważniły stare prawa ryzyka i długu.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Carmen M. Reinhart and Kenneth S. Rogoff published 'This Time Is Different: Eight Centuries of Financial Folly' with Princeton University Press in 2009.",
          "Reinhart und Rogoffs Standardwerk erschien 2009 bei Princeton University Press.",
          "Książka Reinhart i Rogoffa 'This Time Is Different' ukazała się w 2009 r. nakładem Princeton University Press.",
        ),
        source: "https://press.princeton.edu/books/paperback/9780691152646/this-time-is-different",
      },
      {
        text: T(
          "Philosopher George Santayana wrote in 1905: 'Those who cannot remember the past are condemned to repeat it' in 'The Life of Reason'.",
          "George Santayana praegte 1905 den beruehmten Satz ueber das Vergessen der Vergangenheit in 'The Life of Reason'.",
          "Filozof George Santayana sformułował w 1905 r. w 'The Life of Reason' słynną myśl: 'Kto nie pamięta przeszłości, jest skazany na jej powtarzanie'.",
        ),
        source: "https://www.gutenberg.org/ebooks/15000",
      },
      {
        text: T(
          "Charles P. Kindleberger published 'Manias, Panics, and Crashes: A History of Financial Crises' in 1978, detailing the recurring anatomy of speculative manias.",
          "Charles Kindleberger analysierte 1978 in 'Manias, Panics, and Crashes' die Anatomie von Spekulationskrisen.",
          "Charles P. Kindleberger w klasycznej pracy 'Manias, Panics, and Crashes' (1978) opisał powtarzalny cykl manii spekulacyjnych i paniki.",
        ),
        source: "https://link.springer.com/book/10.1057/9780230365353",
      },
      {
        text: T(
          "Daron Acemoglu and James A. Robinson published 'Why Nations Fail: The Origins of Power, Prosperity, and Poverty' in 2012, highlighting inclusive vs extractive institutions.",
          "Acemoglu und Robinson zeigten 2012 in 'Why Nations Fail' die Rolle inklusiver Institutionen fuer langfristigen Wohlstand.",
          "Acemoğlu i Robinson w książce 'Why Nations Fail' (2012) wykazali kluczową rolę inkluzywnych instytucji politycznych i prawnych w budowie dobrobytu.",
        ),
        source:
          "https://www.penguinrandomhouse.com/books/206977/why-nations-fail-by-daron-acemoglu-and-james-a-robinson/",
      },
      {
        text: T(
          "The tulip mania in the Dutch Republic peaked in February 1637, where single contracts for rare bulbs changed hands for more than 10 times the annual wage of a skilled craftsman.",
          "Die Tulpenmanie erreichte im Februar 1637 ihren Hoehepunkt mit astronomischen Preisen fuer einzelne Zwiebeln.",
          "Holenderska tulipomania osiągnęła apogeum w lutym 1637 r., gdy pojedyncze cebulki wyceniano na ponad dziesięciokrotność rocznego zarobku rzemieślnika.",
        ),
        source: "https://www.rijksmuseum.nl/en/collection/stories/the-tulip-mania",
      },
    ],
    simplified: [
      T(
        "Complex multi-century econometric time series, debt-to-GDP sovereign default thresholds, and cyclical institutional decay models are translated into accessible historical pattern toys and clear civic guidance.",
        "Komplexe historische Schuldenstatistiken und oekonometrische Zeitreihen wurden in interaktive Musterspiele und lebensnahe Buergertipps verstaendlich uebersetzt.",
        "Skomplikowane wielowiekowe szeregi czasowe długu publicznego i modele upadku instytucji przedstawiono w formie czytelnych symulatorów cykli gospodarczych i przystępnych wskazówek obywatelskich.",
      ),
    ],
  },
};
