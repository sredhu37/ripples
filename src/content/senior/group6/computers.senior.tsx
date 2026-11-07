import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function BinaryLogicSwitchesDiagram({ lang, step }: DiagramProps) {
  const name = lang === "pl" ? "Adam" : lang === "de" ? "Arne" : "Abhi";
  const label = lang === "pl" ? "Abhi i logika binarna: reprezentacja informacji za pomocą zer i jedynek" : lang === "de" ? "Arne und binaere Logik: Information als Nullen und Einsen" : "Abhi and binary logic: representing truth and numbers with zeros and ones";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#3b82f6" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#1e3a8a" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#2563eb" stroke="#3b82f6" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#bfdbfe">{name}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dbeafe">
          💻 {lang === "pl" ? "Logika Binarna i Przełączniki" : lang === "de" ? "Binaere Logik und Schalter" : "Binary Logic & Switches"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#2563eb" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="16">0 ➡️ 1 ➡️ ⚡ ➡️ 🧮</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#60a5fa">
            {lang === "pl" ? "Bramki logiczne: AND, OR, NOT" : lang === "de" ? "Logikgatter: UND, ODER, NICHT" : "Logic Gates: AND, OR, NOT"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#1e3a8a" />
          <text x="250" y="170" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Matematyka staje się fizycznym prądem" : lang === "de" ? "Mathematik wird zu elektrischem Strom" : "Mathematics Becomes Physical Voltage"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#dbeafe">
            {lang === "pl" ? "Miliony operacji na sekundę bez pomyłek" : lang === "de" ? "Millionen fehlerfreie Berechnungen pro Sekunde" : "Millions of exact calculations per second"}
          </text>
        </g>
      )}
    </svg>
  );
}

function VacuumTubesToTransistorsDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Od lamp elektronowych do tranzystorów krzemowych" : lang === "de" ? "Von Vakuumroehren zu Silizium-Transistoren" : "From glowing vacuum tubes to silicon transistors";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="140" height="65" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="14">💡 ♨️</text>
        <text x="110" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#991b1b">Vacuum Tube (1940s)</text>
        <text x="110" y="102" textAnchor="middle" fontSize="8" fill="#b91c1c">Hot, fragile, burns out fast</text>

        <rect x="220" y="45" width="140" height="65" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="290" y="70" textAnchor="middle" fontSize="14">🔲 ⚡</text>
        <text x="290" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1e40af">Transistor (1947)</text>
        <text x="290" y="102" textAnchor="middle" fontSize="8" fill="#1d4ed8">Solid state, cold, eternal</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#1e293b" />
          <text x="200" y="150" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#60a5fa">
            Solid-State Physics Overcomes the Heat Barrier
          </text>
          <text x="200" y="165" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl" ? "ENIAC zużywał 150 kW energii; tranzystor działa na mikrowatach" : lang === "de" ? "ENIAC fraß 150 kW Strom; Transistoren laufen mit Mikrowatt" : "Replaced fragile glass filaments with microscopic semiconductor switches"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#1d4ed8" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Narodziny Doliny Krzemowej i układów scalonych" : lang === "de" ? "Geburtsstunde des Silicon Valley und integrierter Schaltkreise" : "Enabled integrated circuits containing billions of switches"}
          </text>
        </g>
      )}
    </svg>
  );
}

function MooresLawExponentialCurveDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Prawo Moore'a: podwajanie gęstości tranzystorów co dwa lata" : lang === "de" ? "Mooresches Gesetz: Verdopplung der Transistoren alle zwei Jahre" : "Moore's Law: transistor count doubling every two years";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <path d="M 60 170 Q 200 165 280 90 Q 320 50 340 35" fill="none" stroke="#2563eb" strokeWidth="3" />
        <circle cx="60" cy="170" r="5" fill="#2563eb" />
        <text x="60" y="190" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#475569">1971: 2,300</text>
        <circle cx="340" cy="35" r="5" fill="#16a34a" />
        <text x="310" y="25" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#15803d">2024: 100 Billion+</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#60a5fa">
            Exponential Compounding Slashes Compute Costs to Zero
          </text>
          <text x="200" y="162" textAnchor="middle" fontSize="8" fill="#e2e8f0">
            {lang === "pl" ? "Moc obliczeniowa w kieszeni przewyższa superkomputery sprzed 30 lat" : lang === "de" ? "Jedes Smartphone uebertrifft die Supercomputer der 1980er" : "A modern smartphone possesses vastly more compute than Apollo guidance systems"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#0f766e" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Najszybsza deflacja cenowa w historii cywilizacji" : lang === "de" ? "Die groesste Deflation von Rechenkosten in der Menschheitsgeschichte" : "The steepest deflation in unit computational costs in human history"}
          </text>
        </g>
      )}
    </svg>
  );
}

function TuringArchitectureVonNeumannDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Architektura von Neumanna: pamięć, procesor i magistrala" : lang === "de" ? "Von-Neumann-Architektur: Speicher, CPU und Datenbus" : "Von Neumann architecture: memory, CPU, and shared data bus";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fdf4ff" stroke="#a21caf" strokeWidth="2" />
      <g>
        <rect x="50" y="60" width="100" height="60" rx="6" fill="#fae8ff" stroke="#a21caf" strokeWidth="2" />
        <text x="100" y="85" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#701a75">CPU</text>
        <text x="100" y="102" textAnchor="middle" fontSize="8" fill="#86198f">ALU & Control</text>

        <rect x="250" y="60" width="100" height="60" rx="6" fill="#fae8ff" stroke="#a21caf" strokeWidth="2" />
        <text x="300" y="85" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#701a75">Memory</text>
        <text x="300" y="102" textAnchor="middle" fontSize="8" fill="#86198f">Code & Data</text>

        <line x1="150" y1="90" x2="250" y2="90" stroke="#a21caf" strokeWidth="3" strokeDasharray="4 4" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="44" rx="6" fill="#701a75" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            General-Purpose Hardware Runs Infinite Software
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#f5d0fe">
            {lang === "pl" ? "Ten sam układ scalony może liczyć podatki, grać w szachy lub renderować film" : lang === "de" ? "Derselbe Chip berechnet Steuern, spielt Schach oder rendert Videos" : "Stored programs allow a single physical chip to execute infinite diverse applications"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Oprogramowanie staje się głównym nośnikiem innowacji" : lang === "de" ? "Software wird zum universellen Werkzeug menschlicher Ideen" : "Software became the universal substrate for human creativity"}
          </text>
        </g>
      )}
    </svg>
  );
}

function GlobalInformationSocietyDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Społeczeństwo informacyjne: cyfryzacja nauki, medycyny i logistyki" : lang === "de" ? "Informationsgesellschaft: Digitalisierung von Wissenschaft und Medizin" : "Information society: digitizing scientific inquiry and global systems";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <g>
        <circle cx="200" cy="80" r="34" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">🌐 🧠</text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#15803d">Digital Knowledge</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#15803d" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Zero Marginal Cost Information Distribution
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#bbf7d0">
            {lang === "pl" ? "Wiedza, podręczniki i algorytmy mogą być kopiowane bez dodatkowego kosztu" : lang === "de" ? "Wissen und Programme koennen fast kostenlos weltweit geteilt werden" : "Digital bits can be replicated infinitely without material degradation"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Komputery przekształciły ludzki mózg w narzędzie globalnej skali" : lang === "de" ? "Computer erweitern den menschlichen Verstand ueber alle Grenzen" : "Computing expanded human cognitive reach across planetary dimensions"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [transistorExponent, setTransistorExponent] = useState(3);
  const count = Math.pow(10, transistorExponent);
  const isSuperChip = transistorExponent >= 8;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Microchip Density: 10^{transistorExponent} Transistors ({count.toLocaleString()} Gates)
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            const next = Math.min(8, transistorExponent + 1);
            setTransistorExponent(next);
            if (next >= 8) onDone?.();
          }}
        >
          Advance Moore's Law (+Shrink Nanometers)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setTransistorExponent(3)}
        >
          Reset to Intel 4004 (1971)
        </button>
      </div>
      <div style={{ padding: "12px", background: isSuperChip ? "#eef8ef" : "#eff6ff", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {isSuperChip
          ? "Modern Silicon Microarchitecture Achieved: Over 100 Million micro-transistors per square millimeter enable real-time neural networks, 4K rendering, and scientific simulation!"
          : "Early Silicon Era: Basic 4-bit calculator arithmetic running at kilohertz frequencies."}
      </div>
    </div>
  );
}

function ComputersWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What was the profound engineering advantage of replacing glass vacuum tubes with solid-state silicon transistors in the mid-20th century?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Transistors smelled like vanilla cookies whenever complex equations were solved</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Transistors eliminated fragile glowing filaments, consumed minimal electrical wattage, generated negligible heat, and could be miniaturized onto silicon chips by the billions</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Vacuum tubes were declared illegal by the United Nations Postal Service</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "computers",
  story: [
    animatedBeat(
      [
        T("Meet Abhi. He looks at a sleek silicon microchip no larger than a fingernail, humming with billions of microscopic switches.", "Das ist Arne. Er betrachtet einen Siliziumchip, kaum groesser als ein Fingernagel, auf dem Milliarden Schalter arbeiten.", "Poznaj Abhi. Przygląda się krzemowemu procesorowi nie większemu od paznokcia, na którym pracują miliardy mikroskopijnych przełączników."),
        T("At its most fundamental level, all digital computing is grounded in the elegant simplicity of binary arithmetic: zeros and ones.", "Auf tiefster Ebene basiert die gesamte digitale Welt auf der einfachen Sprache der Binaermathematik: Nullen und Einsen.", "Na najbardziej elementarnym poziomie cały świat cyfrowy opiera się na genialnej prostocie logiki binarnej: zer i jedynek."),
        T("By combining physical voltage states, high voltage for one and zero voltage for zero, engineers construct logical operators like AND, OR, and NOT.", "Durch elektrische Spannungszustaende konstruieren Ingenieure Logikgatter wie UND, ODER und NICHT fuer komplexe Berechnungen.", "Łącząc poziomy napięcia elektrycznego, wysokie dla jedynki i zerowe dla zera, inżynierowie tworzą bramki logiczne, takie jak AND, OR i NOT."),
      ],
      BinaryLogicSwitchesDiagram,
    ),
    animatedBeat(
      [
        T("In the 1940s, early digital computers like ENIAC relied on thousands of glowing, red-hot glass vacuum tubes.", "In den 1940er Jahren bestanden erste Grossrechner wie ENIAC aus tausenden gluehenden, anfaelligen Vakuumroehren.", "W latach 40. XX wieku pierwsze komputery cyfrowe, takie jak ENIAC, wykorzystywały tysiące rozżarzonych lamp elektronowych."),
        T("They consumed 150 kilowatts of electricity, filled entire warehouse rooms, and frequently broke down as fragile filaments burned out.", "Sie schluckten 150 Kilowatt Strom, fuellten riesige Saele und fielen staendig aus, weil Faden durchbrannten.", "Pożerały 150 kilowatów prądu, zajmowały całe hale i ulegały ciągłym awariom z powodu przepalających się żarników."),
        T("The invention of the point-contact transistor at Bell Labs in 1947 by Bardeen, Brattain, and Shockley changed computing forever.", "Die Erfindung des Transistors 1947 in den Bell Labs revolutionierte die Welt und ersetzte Glas durch Halbleiter.", "Wynalezienie tranzystora w Bell Labs w 1947 roku przez Bardeena, Brattaina i Shockleya na zawsze odmieniło bieg historii."),
      ],
      VacuumTubesToTransistorsDiagram,
    ),
    animatedBeat(
      [
        T("Solid-state semiconductors eliminated hot filaments, operating as durable electronic switches using tiny fractions of a watt.", "Halbleiter brauchten keine Gluehfaeden mehr; sie schalten verlaesslich mit minimalen Bruchteilen eines Watts.", "Tranzystory półprzewodnikowe wyeliminowały żarniki, działając jako trwałe przełączniki zużywające mikroskopijne ułamki wata."),
        T("In 1965, Intel co-founder Gordon Moore observed that the number of transistors packed onto a silicon chip doubled roughly every two years.", "1965 formulierte Gordon Moore seine beruehmte Beobachtung: Die Zahl der Transistoren verdoppelt sich alle zwei Jahre.", "W 1965 roku współzałożyciel Intela Gordon Moore zaobserwował, że liczba tranzystorów na płytce krzemu podwaja się co około dwa lata."),
        T("Moore's Law drove fifty years of continuous exponential growth, collapsing the cost of computation to nearly zero.", "Dieses Mooresche Gesetz ermoeglichte fuenfzig Jahre exponentiellen Fortschritt und liess Rechenkosten kollabieren.", "Prawo Moore'a napędzało pół wieku wykładniczego rozwoju, sprawiając, że koszt operacji obliczeniowej spadł niemal do zera."),
      ],
      MooresLawExponentialCurveDiagram,
    ),
    animatedBeat(
      [
        T("Mathematician John von Neumann formulated the universal computing architecture that powers nearly all modern microprocessors.", "John von Neumann entwarf die fundamentale Computerarchitektur, die bis heute fast jeden Prozessor antreibt.", "Matematyk John von Neumann sformułował uniwersalną architekturę komputerową, na której opierają się współczesne procesory."),
        T("By storing program instructions in the very same memory banks as numerical data, computers became fully programmable.", "Indem Programmbefehle und Nutzdaten im selben Speicher liegen, wurden Rechner universell programmierbar.", "Dzięki przechowywaniu instrukcji programu w tej samej pamięci operacyjnej co dane, komputery stały się w pełni uniwersalne."),
        T("A single silicon chip can calculate payroll taxes, simulate aerodynamics, play orchestral symphonies, or edit high-resolution video.", "Ein einziger Chip kann Steuern berechnen, Flugzeuge simulieren, Musik komponieren oder Videos schneiden.", "Ten sam chip krzemowy potrafi rozliczać podatki, symulować aerodynamikę skrzydeł, grać symfonię lub montować film."),
      ],
      TuringArchitectureVonNeumannDiagram,
    ),
    animatedBeat(
      [
        T("Computing fundamentally liberated human minds from tedious, repetitive clerical calculations.", "Computer befreiten den menschlichen Verstand von stupiden, fehleranfaelligen Rechen- und Schreibarbeiten.", "Komputery wyzwoliły ludzki umysł z monotonnych, żmudnych obliczeń rachunkowych i księgowych."),
        T("Complex scientific discoveries, from decoding the human genome to forecasting global weather patterns, became computationally feasible.", "Wissenschaftliche Durchbrueche wie die Entschluesselung des Genoms oder Praezisionswetterberichte wurden moeglich.", "Przełomy naukowe, od rozszyfrowania ludzkiego genomu po prognozowanie klimatu, stały się możliwe dzięki mocy cyfrowej."),
        T("By transforming information into an abundant, instantaneously accessible resource, computers built the scaffolding of our modern world.", "Indem sie Information allgegenwaertig machten, schufen Computer das unsichtbare Rueckgrat unserer Zivilisation.", "Czyniąc informację zasobem powszechnym i natychmiast dostępnym, komputery zbudowały fundament współczesnego świata."),
      ],
      GlobalInformationSocietyDiagram,
    ),
  ],
  toyIntro: T(
    "Experience exponential Moore's Law scaling: advance silicon fabrication nodes to pack over 100 million transistors per square millimeter onto a microchip.",
    "Erlebe das Mooresche Gesetz: Verkleinere die Halbleiterstrukturen und packe ueber 100 Millionen Transistoren auf einen Quadratmillimeter.",
    "Doświadcz wykładniczego prawa Moore'a: miniaturyzuj proces technologiczny i umieszczaj ponad 100 milionów tranzystorów na milimetrze kwadratowym."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why was Gordon Moore's 1965 projection regarding transistor density considered so economically extraordinary?",
        "Warum war Gordon Moores Vorhersage von 1965 zur Transistordichte oekonomisch so aussergewoehnlich?",
        "Dlaczego prognoza Gordona Moore'a z 1965 roku dotycząca gęstości tranzystorów była tak niezwykła z ekonomicznego punktu widzenia?",
      ),
      options: [
        { text: T("Computing performance doubled while microchip costs fell by half every two years", "Rechenleistung verdoppelte sich, waehrend Chipkosten alle zwei Jahre halbiert wurden", "Wydajność komputerów podwajała się, a koszty chipów spadały o połowę co dwa lata"), correct: true },
        { text: T("It promised that computers would eventually be made of biodegradable cheese wheels", "Sie versprach, dass Rechner bald aus biologisch abbaubaren Kaeselaiben gebaut wuerden", "Obiecywała, że komputery będą w przyszłości budowane z biodegradowalnego sera"), correct: false },
        { text: T("It required all computer programmers to write code using feather quills and squid ink", "Sie verlangte von Programmierern, Software ausschliesslich mit Gansefedern zu schreiben", "Wymagała od programistów pisania kodu gęsim piórem i atramentem z mątwy"), correct: false },
      ],
      hint: T(
        "Think about what exponential doubling does to cost and processing power over 50 years.",
        "Denke an die Wirkung exponentieller Verdopplung auf Rechenleistung und Kosten ueber Jahrzehnte.",
        "Pomyśl o skutkach wykładniczego podwajania mocy obliczeniowej i spadku kosztów przez pół wieku."),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the defining characteristic of the von Neumann computer architecture?",
        "Was ist das zentrale Merkmal der Von-Neumann-Computerarchitektur?",
        "Co jest kluczową cechą architektury komputerowej von Neumanna?",
      ),
      options: [
        { text: T("Storing code and data in shared memory so hardware can run any software", "Programmcode und Daten teilen Speicher, sodass Hardware jede Software ausfuehren kann", "Przechowywanie kodu i danych w tej samej pamięci, by uruchamiać dowolne oprogramowanie"), correct: true },
        { text: T("Computers must be submerged in salted warm milk to prevent arithmetic errors", "Rechner muessen in warme Salzmilch getaucht werden, um Rechenfehler zu vermeiden", "Konieczność zanurzania komputera w ciepłym mleku z solą w celu uniknięcia błędów"), correct: false },
        { text: T("Each computer can only ever perform a single calculation before needing to be thrown away", "Jeder Rechner darf nur eine einzige Rechnung durchfuehren und muss dann entsorgt werden", "Komputer może wykonać tylko jedno obliczenie, po czym należy go wyrzucić"), correct: false },
      ],
      hint: T(
        "Think about why your laptop can run games, spreadsheets, and web browsers on the exact same CPU.",
        "Achte darauf, warum derselbe Prozessor voellig unterschiedliche Programme ausfuehren kann.",
        "Zastanów się, dlaczego ten sam procesor może uruchamiać gry, arkusze kalkulacyjne i przeglądarki."),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze why solid-state semiconductor transistors enabled modern microelectronics while vacuum tubes could not.",
        "Analysiere, warum Halbleitertransistoren die moderne Mikroelektronik ermoeglichten und Vakuumroehren nicht.",
        "Zbadaj, dlaczego półprzewodnikowe tranzystory umożliwiły rozwój mikroelektroniki, czego nie mogły zapewnić lampy elektronowe.",
      ),
      Widget: ComputersWidget,
      hint: T(
        "Focus on heat dissipation, filament burnout, power wattage, and micro-scale fabrication.",
        "Achte auf Waermeentwicklung, Stromverbrauch, Haltbarkeit und Miniaturisierbarkeit.",
        "Skup się na wydzielaniu ciepła, zużyciu energii, niezawodności i miniaturyzacji."),
    },
  ],
  askDad: T(
    "Ask your parent: What was the very first computer you ever owned or worked with, and how much memory did it have?",
    "Frage deine Eltern: Was war der allererste Computer, den ihr je benutzt habt, und wie viel Speicher hatte er?",
    "Zapytaj rodziców: Jaki był pierwszy komputer, z jakiego korzystaliście, i ile pamięci operacyjnej posiadał?"),
  realLife: {
    title: T(
      "Real world: The Bell Labs Transistor Breakthrough (December 1947)",
      "Echte Welt: Der Transistor-Durchbruch der Bell Labs (Dezember 1947)",
      "Prawdziwy świat: Przełom tranzystorowy w Bell Labs (grudzień 1947)",
    ),
    body: T(
      "On December 23, 1947, physicists John Bardeen and Walter Brattain, working under William Shockley at Bell Telephone Laboratories in Murray Hill, New Jersey, successfully demonstrated the first working point-contact transistor using Germanium crystals. The device amplified electrical speech signals by eighteen times without needing vacuum filaments. Their breakthrough earned the 1956 Nobel Prize in Physics and laid the physical groundwork for every smartphone, data center, and computer in existence today.",
      "Am 23. Dezember 1947 praesentierten John Bardeen und Walter Brattain in den Bell Labs den ersten funktionierenden Spitzentransistor aus Germanium. Das Bauteil verstaerkte Tonsignale um das 18-Fache ohne jede Roehrentechnik. Dafuer erhielten sie 1956 den Nobelpreis fuer Physik. Diese Entdeckung schuf das physikalische Fundament fuer jedes Smartphone und Rechenzentrum der Gegenwart.",
      "23 grudnia 1947 roku fizycy John Bardeen i Walter Brattain w Bell Labs w New Jersey z powodzeniem zaprezentowali pierwszy działający tranzystor ostrzowy z kryształu germanu. Urządzenie wzmacniało sygnał elektryczny osiemnastokrotnie bez potrzeby stosowania próżniowych żarników. Ich odkrycie uhonorowano Nagrodą Nobla z fizyki w 1956 roku, kładąc podwaliny pod każdy smartfon, procesor i serwer współczesnego świata."),
  },
  factCard: {
    claims: [
      { text: T("John Bardeen, Walter Brattain, and William Shockley invented the point-contact transistor at Bell Laboratories in December 1947.", "Bardeen, Brattain und Shockley erfanden im Dezember 1947 den ersten Transistor in den Bell Labs.", "Bardeen, Brattain i Shockley wynaleźli tranzystor ostrzowy w Bell Laboratories w grudniu 1947 r."), source: "https://www.nobelprize.org/prizes/physics/1956/summary/" },
      { text: T("Gordon Moore published his observation on exponential component growth in Electronics magazine on April 19, 1965.", "Gordon Moore veroeffentlichte sein Gesetz am 19. April 1965 im Magazin Electronics.", "Gordon Moore opublikował obserwację dotyczącą wykładniczego wzrostu liczby elementów 19 kwietnia 1965 r. w czasopiśmie 'Electronics'."), source: "https://newsroom.intel.com/wp-content/uploads/sites/11/2018/05/moores-law-electronics.pdf" },
      { text: T("John von Neumann described the stored-program computer architecture in the 'First Draft of a Report on the EDVAC' on June 30, 1945.", "John von Neumann beschrieb die speicherprogrammierbare Architektur am 30. Juni 1945 im EDVAC-Bericht.", "John von Neumann opisał architekturę komputera z programem w pamięci 30 czerwca 1945 r. w raporcie o maszynie EDVAC."), source: "https://archive.org/details/firstdraftofrepo00vonm" },
      { text: T("Intel launched the 4004, the world's first single-chip commercial microprocessor, on November 15, 1971, containing 2,300 transistors.", "Intel brachte am 15. November 1971 mit dem 4004 den ersten Ein-Chip-Mikroprozessor mit 2.300 Transistoren heraus.", "Intel wprowadził 15 listopada 1971 r. procesor 4004, czyli pierwszy komercyjny mikroprocesor na jednym chipie, liczący 2 300 tranzystorów."), source: "https://www.intel.com/content/www/us/en/history/museum-story-of-intel-4004.html" },
      { text: T("Modern commercial graphic processors and system-on-chips exceed 100 billion transistors manufactured on sub-3-nanometer semiconductor process nodes.", "Moderne Hochleistungsprozessoren enthalten ueber 100 Milliarden Transistoren auf 3-Nanometer-Strukturen.", "Współczesne zaawansowane układy scalone i procesory graficzne przekraczają 100 miliardów tranzystorów wytwarzanych w procesach poniżej 3 nanometrów."), source: "https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_3nm" },
    ],
    simplified: [
      T(
        "Quantum tunneling mechanics, photolithography extreme ultraviolet physics, and Boolean switching matrices are made concrete through interactive chip density scaling and clear engineering stories.",
        "Quantenmechanische Tunneleffekte und EUV-Lithografie wurden in spielerische Halbleiter-Skalierungen und klare historische Erzaehlungen uebersetzt.",
        "Zjawiska tunelowania kwantowego, fizyka litografii EUV i bramki logiczne zostały przedstawione w formie intuicyjnych symulatorów mikroprocesorów i zrozumiałej historii inżynierii."),
    ],
  },
};
