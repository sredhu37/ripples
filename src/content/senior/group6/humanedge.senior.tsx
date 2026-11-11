import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function HumanEdgeEmpathyCreativityDiagram({ lang, step }: DiagramProps) {
  const name = lang === "pl" ? "Adam" : lang === "de" ? "Arne" : "Aarav";
  const label =
    lang === "pl"
      ? "Aarav i ludzka przewaga: empatia, wyobraźnia, etyka i zmysł krytyczny"
      : lang === "de"
        ? "Arne und der menschliche Vorteil: Empathie, Kreativitaet, Ethik und Urteilskraft"
        : "Aarav and the human edge: empathy, imagination, ethics, and critical judgment";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#ec4899"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#ec4899" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#831843" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#db2777"
          stroke="#ec4899"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fbcfe8">
          {name}
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
          stroke="#ec4899"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fdf2f8">
          🌟{" "}
          {lang === "pl"
            ? "Ludzka Przewaga"
            : lang === "de"
              ? "Der menschliche Vorteil"
              : "The Human Edge"}
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
            stroke="#db2777"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="16">
            ❤️ 🎨 ⚖️ 🧭
          </text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f472b6">
            {lang === "pl"
              ? "Empatia • Twórczość • Etyka • Odpowiedzialność"
              : lang === "de"
                ? "Empathie • Kreativitaet • Ethik • Verantwortung"
                : "Empathy • Creativity • Ethics • Accountability"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#831843" />
          <text
            x="250"
            y="170"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Algorytmy liczą, ludzie nadają sens"
              : lang === "de"
                ? "Maschinen rechnen, Menschen geben Sinn"
                : "Machines Compute, Humans Give Meaning"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#fdf2f8">
            {lang === "pl"
              ? "Moralny kompas steruje potężną technologią"
              : lang === "de"
                ? "Moralischer Kompass lenkt maechtige Werkzeuge"
                : "Moral judgment steers powerful technological tools"}
          </text>
        </g>
      )}
    </svg>
  );
}

function MoravecParadoxDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Paradoks Moraveca: co trudne dla człowieka, łatwe dla AI, i odwrotnie"
      : lang === "de"
        ? "Moravec-Paradox: Was Menschen schwer faellt, ist leicht fuer KI, und umgekehrt"
        : "Moravec's paradox: what is hard for humans is easy for AI, and vice versa";

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
          x="40"
          y="45"
          width="140"
          height="65"
          rx="8"
          fill="#dbeafe"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <text x="110" y="70" textAnchor="middle" fontSize="14">
          ♟️ 🧮
        </text>
        <text x="110" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1e40af">
          Hard for Humans
        </text>
        <text x="110" y="102" textAnchor="middle" fontSize="8" fill="#1d4ed8">
          Chess, math, raw memory (Easy for AI)
        </text>

        <rect
          x="220"
          y="45"
          width="140"
          height="65"
          rx="8"
          fill="#fce7f3"
          stroke="#db2777"
          strokeWidth="1.5"
        />
        <text x="290" y="70" textAnchor="middle" fontSize="14">
          🫂 🍼
        </text>
        <text x="290" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#9d174d">
          Easy for Humans
        </text>
        <text x="290" y="102" textAnchor="middle" fontSize="8" fill="#be185d">
          Empathy, care, nuance (Hard for AI)
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#1e293b" />
          <text x="200" y="150" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f472b6">
            Evolution Endowed Humans With Millions of Years of Social Wisdom
          </text>
          <text x="200" y="165" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl"
              ? "Pocieszenie zmartwionego przyjaciela wymaga miliarda lat ewolucyjnej intuicji społecznej"
              : lang === "de"
                ? "Echtes Mitgefuehl beruht auf Millionen Jahren sozialer Evolution"
                : "Comforting a grieving person requires deep emotional resonance beyond statistical correlation"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#be185d" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Relacje międzyludzkie pozostają sercem naszego świata"
              : lang === "de"
                ? "Menschliche Beziehungen bleiben das Herzstueck unserer Gesellschaft"
                : "Genuine interpersonal connection remains irreplaceable"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CentaurChessKasparovDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Szachy centaurów (model Kasparowa): człowiek plus komputer pokonuje sam superkomputer"
      : lang === "de"
        ? "Zentauren-Schach: Mensch plus Maschine schlaegt reinen Supercomputer"
        : "Centaur chess (Kasparov model): human plus computer outperforming pure AI";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f8fafc"
        stroke="#334155"
        strokeWidth="2"
      />
      <g>
        <circle cx="100" cy="85" r="30" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
        <text x="100" y="80" textAnchor="middle" fontSize="18">
          🧠 💡
        </text>
        <text x="100" y="100" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#9d174d">
          Human Intuition
        </text>

        <circle cx="300" cy="85" r="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <text x="300" y="80" textAnchor="middle" fontSize="18">
          💻 ⚡
        </text>
        <text x="300" y="100" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1e40af">
          Machine Brute Force
        </text>

        <circle cx="200" cy="85" r="18" fill="#fdf2f8" stroke="#ec4899" strokeWidth="2" />
        <text x="200" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#831843">
          +
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#60a5fa">
            Kasparov's Law: Human + Process + Machine Wins
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#e2e8f0">
            {lang === "pl"
              ? "Przeciętny gracz z dobrym programem pokonał najlepszy samodzielny superkomputer"
              : lang === "de"
                ? "Ein durchschnittlicher Spieler mit guter Software schlaegt den staerksten Supercomputer"
                : "A weak human plus a machine and a superior process consistently dominates standalone AI"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#0369a1" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Najpotężniejsza synergia to partnerstwo, nie zastępowanie"
              : lang === "de"
                ? "Die groesste Kraft liegt in der Symbiose, nicht im Ersetzen"
                : "The future belongs to collaborative centaur teams across all fields"}
          </text>
        </g>
      )}
    </svg>
  );
}

function EthicalLeadershipAccountabilityDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Etyczne przywództwo i odpowiedzialność: maszyny nie mogą ponosić odpowiedzialności moralnej"
      : lang === "de"
        ? "Ethische Fuehrung: Maschinen koennen keine moralische Verantwortung tragen"
        : "Ethical leadership and accountability: machines cannot bear moral responsibility";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fdf4ff"
        stroke="#a21caf"
        strokeWidth="2"
      />
      <g>
        <circle cx="100" cy="85" r="30" fill="#fae8ff" stroke="#a21caf" strokeWidth="2" />
        <text x="100" y="80" textAnchor="middle" fontSize="18">
          ⚖️ 🏛️
        </text>
        <text x="100" y="100" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#701a75">
          Human Judge
        </text>

        <rect x="230" y="60" width="130" height="55" rx="6" fill="#701a75" />
        <text x="295" y="83" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
          Moral Accountability
        </text>
        <text x="295" y="100" textAnchor="middle" fontSize="8" fill="#f5d0fe">
          Humans answer for choices
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f472b6">
            A Computer Can Never Be Held Accountable
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl"
              ? "Możesz wyłączyć komputer, ale nie możesz postawić go przed sądem; odpowiedzialność spoczywa na człowieku"
              : lang === "de"
                ? "Man kann einen Rechner abschalten, aber nur Menschen tragen rechtliche Verantwortung"
                : "Legal and moral responsibility cannot be outsourced to software code"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#86198f" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Człowiek decyduje o wartościach, celach i sprawiedliwości"
              : lang === "de"
                ? "Menschen bestimmen Werte, Ziele und Gerechtigkeit"
                : "Humans determine civilizational values, purposes, and justice"}
          </text>
        </g>
      )}
    </svg>
  );
}

function FutureCentaurFlourishingDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Rozkwit cywilizacji: technologia jako mnożnik ludzkiej mądrości"
      : lang === "de"
        ? "Zukunft der Menschheit: Technologie als Verstaerker humaner Weisheit"
        : "Flourishing future: technology as the ultimate multiplier of human wisdom";

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
        <circle cx="200" cy="80" r="34" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">
          🌱 🚀 🌟
        </text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#15803d">
          Human Flourishing
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#15803d" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Technology Multiplies; Human Wisdom Steers
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#bbf7d0">
            {lang === "pl"
              ? "Odwaga, współczucie i twórcza iskra to nasze niezbywalne skarby"
              : lang === "de"
                ? "Mut, Mitgefuehl und Schoepferkraft sind unsere unersetzlichen Schaetze"
                : "Courage, compassion, curiosity, and artistic vision define our distinct human edge"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Świat jutra należy do ludzi, którzy potrafią mądrze współtworzyć z technologią"
              : lang === "de"
                ? "Die Zukunft gehoert jenen, die Technik mit Herz und Verstand fuehren"
                : "The future belongs to those who pair profound tools with deep humanity"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [centaurTeamLevel, setCentaurTeamLevel] = useState(1);
  const synergyScore = centaurTeamLevel * 20;
  const isMasterCentaur = centaurTeamLevel >= 5;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Human + AI Centaur Synergy: Level {centaurTeamLevel}/5 | Problem-Solving Power:{" "}
        {synergyScore}/100
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            const next = Math.min(5, centaurTeamLevel + 1);
            setCentaurTeamLevel(next);
            if (next >= 5) onDone?.();
          }}
        >
          Combine AI Compute With Human Empathy & Ethics
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => setCentaurTeamLevel(1)}>
          Rely Exclusively on Raw Algorithmic Output
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: isMasterCentaur ? "#eef8ef" : "#fdf2f8",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {isMasterCentaur
          ? "Master Centaur Synthesis Achieved: Human ethical framing, emotional resonance, and critical oversight pair with high-speed AI processing to deliver groundbreaking medical and civic breakthroughs!"
          : "Unintegrated Workflow: Raw algorithmic output lacks human ethical discernment, contextual nuance, and compassionate warmth."}
      </div>
    </div>
  );
}

function HumanEdgeWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        What is Moravec's Paradox in robotics and cognitive science, and what does it reveal about
        the enduring human advantage?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        It proves that humans are simply slow calculators made out of oatmeal
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        It demonstrates that high-level abstract tasks like chess and complex arithmetic are
        computationally easy for machines, whereas basic human physical dexterity, emotional
        perception, and empathy, evolved over millions of years, are extraordinarily difficult for
        AI to replicate
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        It requires every robot to learn how to play the clarinet before being turned on
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "humanedge",
  story: [
    animatedBeat(
      [
        T(
          "Meet Aarav. He reflects on his journey across the entire history of technology, from flint axes and steam engines to microchips and artificial intelligence.",
          "Das ist Arne. Er blickt zurueck auf die Geschichte der Technik: von Faustkeilen und Dampfmaschinen bis zu Mikrochips und kuenstlicher Intelligenz.",
          "Poznaj Aarava. Patrzy wstecz na fascynującą podróż przez dzieje technologii: od kamiennych pięściaków i silników parowych po mikroprocesory i sztuczną inteligencję.",
        ),
        T(
          "With algorithms now capable of scoring in the 99th percentile on bar exams and generating photorealistic digital art in seconds, young people often ask: what is left for humans?",
          "Wenn KI juristische Pruefungen besteht und Kunstwerke in Sekunden malt, fragen sich viele: Was bleibt fuer uns Menschen?",
          "Gdy algorytmy zdają egzaminy prawnicze z najlepszymi wynikami i generują fotorealistyczne obrazy w ułamku sekundy, młodzi ludzie pytają: co pozostaje dla człowieka?",
        ),
        T(
          "The answer lies in understanding the profound distinction between raw computational processing and genuine human consciousness.",
          "Die Antwort liegt im tiefen Unterschied zwischen reiner Rechenleistung und echtem menschlichen Bewusstsein.",
          "Odpowiedź tkwi w zrozumieniu fundamentalnej różnicy między bezduszną mocą obliczeniową a prawdziwą ludzką świadomością.",
        ),
      ],
      HumanEdgeEmpathyCreativityDiagram,
    ),
    animatedBeat(
      [
        T(
          "Robots can beat grandmasters at chess in seconds, but still struggle to carefully hold an egg without cracking it.",
          "Roboter schlagen Grossmeister im Schach in Sekunden, zerbrechen aber oft noch rohe Eier mit ihren Greifern.",
          "Roboty pokonują arcymistrzów w szachach w ułamku sekundy, ale wciąż mają kłopot z delikatnym podniesieniem surowego jajka.",
        ),
        T(
          "Tasks that require decades of human academic study, like advanced calculus, grandmaster chess, and financial ledger accounting, are computationally trivial for machines.",
          "Dinge, die Menschen schwer fallen, wie hoehere Mathematik, Schach oder Buchhaltung, sind fuer Rechner verblueffend einfach.",
          "Zadania wymagające od człowieka lat nauki, takie jak analiza matematyczna, szachy arcymistrzowskie czy księgowość, są dla komputerów dziecinnie proste.",
        ),
        T(
          "Conversely, capabilities that every human toddler masters effortlessly, interpreting a quivering smile, comforting a crying friend, or grasping a paper cup without crushing it, are monumentally difficult for algorithms.",
          "Umgekehrt sind Dinge, die jedes Kleinkind beherrscht, ein Laecheln deuten, troesten oder einen Pappbecher greifen, fuer Roboter extrem schwer.",
          "Z kolei umiejętności, które każde małe dziecko opanowuje bez trudu, odczytanie smutku w oczach, pocieszenie przyjaciela czy chwycenie kubka bez jego zgniecenia, stanowią dla algorytmów gigantyczne wyzwanie.",
        ),
      ],
      MoravecParadoxDiagram,
    ),
    animatedBeat(
      [
        T(
          "Following his defeat to IBM's Deep Blue in 1997, world chess champion Garry Kasparov pioneered 'Centaur Chess'.",
          "Nach seiner Niederlage gegen Deep Blue 1997 erfand Schachweltmeister Garry Kasparow das sogenannte Zentauren-Schach.",
          "Po porażce z superkomputerem Deep Blue w 1997 roku mistrz świata Garri Kasparow stworzył 'szachy centaurów'.",
        ),
        T(
          "In these open tournaments, human players competed with the assistance of computer chess engines.",
          "In diesen Turnieren traten Teams aus Menschen und Schachprogrammen gemeinsam an.",
          "W turniejach tych zawodnicy grali przy bezpośrednim wsparciu programów komputerowych.",
        ),
        T(
          "Kasparov formulated a profound law: a weak human player paired with a machine and a superior collaborative process beats a lone supercomputer.",
          "Kasparow formulierte ein Gesetz: Ein durchschnittlicher Spieler mit guter Software und klugem Prozess schlaegt den staerksten Supercomputer.",
          "Kasparow sformułował fundamentalne prawo: przeciętny człowiek grający z komputerem i świetnym procesem współpracy pokonuje najpotężniejszy samodzielny superkomputer.",
        ),
      ],
      CentaurChessKasparovDiagram,
    ),
    animatedBeat(
      [
        T(
          "Furthermore, computers cannot possess moral agency, civic conscience, or legal accountability.",
          "Zudem koennen Maschinen niemals moralisches Gewissen oder rechtliche Verantwortung besitzen.",
          "Co więcej, maszyny nigdy nie będą posiadały sumienia, wrażliwości etycznej ani odpowiedzialności prawnej.",
        ),
        T(
          "An algorithm can optimize flight trajectories or suggest chemotherapy regimens, but it cannot care about human suffering or choose justice over expediency.",
          "Ein Algorithmus kann Krebstherapien vorschlagen, aber er empfindet kein Mitleid und kennt keine Gerechtigkeit.",
          "Algorytm może zaproponować dawkowanie leku lub trasę samolotu, ale nie odczuwa empatii wobec cierpienia i nie rozumie pojęcia sprawiedliwości.",
        ),
        T(
          "As a famous 1979 IBM training slide reminded engineers: 'A computer can never be held accountable; therefore, a computer must never make a management decision.'",
          "Eine beruehmte IBM-Folie von 1979 mahnte: 'Ein Computer kann nicht zur Rechenschaft gezogen werden; daher darf er keine Leitungsentscheidung treffen.'",
          "Słynny slajd szkoleniowy IBM z 1979 roku przypominał: 'Komputer nie może ponosić odpowiedzialności, dlatego komputer nigdy nie może podejmować ostatecznych decyzji zarządczych'.",
        ),
      ],
      EthicalLeadershipAccountabilityDiagram,
    ),
    animatedBeat(
      [
        T(
          "The future does not belong to machines alone, nor does it belong to humans who reject technological tools.",
          "Die Zukunft gehoert weder Maschinen allein noch Menschen, die Technik verweigern.",
          "Przyszłość nie należy do samych maszyn ani do ludzi odrzucających postęp technologiczny.",
        ),
        T(
          "The future belongs to 'centaurs': creative, compassionate human thinkers who wield transformative technologies to amplify their highest ideals.",
          "Die Zukunft gehoert den 'Zentauren': kreativen, einfuehlsamen Menschen, die Technik nutzen, um ihre Werte zu verwirklichen.",
          "Przyszłość należy do 'centaurów': twórczych, empatycznych ludzi, którzy wykorzystują potężne narzędzia do realizacji najszlachetniejszych celów.",
        ),
        T(
          "Your empathy, your courage, your moral imagination, and your love for others are not obsolete; they are the true guiding light of human civilization.",
          "Deine Empathie, dein Mut, deine Fantasie und deine Menschlichkeit sind unersetzlich: Sie sind der wahre Kompass unserer Zivilisation.",
          "Twoja empatia, odwaga, wyobraźnia moralna i życzliwość wobec innych nie są przestarzałe; to one stanowią prawdziwy kompas całej ludzkości.",
        ),
      ],
      FutureCentaurFlourishingDiagram,
    ),
  ],
  toyIntro: T(
    "Synthesize centaur intelligence: combine AI computational horsepower with human ethical judgment, empathy, and strategic intuition to unlock maximum problem-solving synergy.",
    "Forme eine Zentauren-Symbiose: Verbinde KI-Rechenkraft mit menschlicher Empathie, Ethik und Urteilskraft fuer optimale Ergebnisse.",
    "Stwórz synergię centaura: połącz moc obliczeniową AI z ludzką empatią, etyką i intuicją strategiczną, osiągając najwyższą skuteczność w rozwiązywaniu problemów.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the core insight of Moravec's Paradox regarding the distribution of human and artificial capabilities?",
        "Was ist die Kernaussage des Moravec-Paradoxons ueber menschliche und maschinelle Faehigkeiten?",
        "Jaka jest kluczowa myśl paradoksu Moraveca dotycząca zdolności ludzkich i sztucznych?",
      ),
      options: [
        {
          text: T(
            "High-level abstract reasoning like logic, chess, and mathematics requires very little computational effort for computers, whereas basic sensorimotor skills, physical dexterity, and empathy require immense evolutionary adaptation that machines struggle to match",
            "Komplexe Logik und Mathematik fallen Rechnern leicht, waehrend unbewusste menschliche Ur-Faehigkeiten wie Empathie, Motorik und Wahrnehmung fuer KI extrem schwer sind",
            "Złożone logiczne operacje, takie jak szachy i matematyka, wymagają od komputerów minimalnego wysiłku, podczas gdy ludzka motoryka, percepcja zmysłowa i empatia, kształtowane przez miliony lat ewolucji, są dla maszyn niezwykle trudne do odtworzenia",
          ),
          correct: true,
        },
        {
          text: T(
            "Computers prefer playing chess exclusively while submerged in boiling tomato soup",
            "Computer spielen Schach am liebsten in kochender Tomatensuppe",
            "Komputery wolą grać w szachy wyłącznie zanurzone w gorącej zupie pomidorowej",
          ),
          correct: false,
        },
        {
          text: T(
            "Humans lose all ability to speak whenever they use a calculator on a Tuesday",
            "Menschen verlieren an Dienstagen die Sprache, wenn sie einen Taschenrechner beruehren",
            "Ludzie tracą zdolność mówienia za każdym razem, gdy użyją kalkulatora we wtorek",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about what required millions of years of biological evolution versus abstract symbol manipulation.",
        "Denke an Jahrmillionen biologischer Evolution gegenueber einfacher Symbolverarbeitung.",
        "Pomyśl o milionach lat ewolucji biologicznej w porównaniu z prostym przetwarzaniem symboli matematycznych.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is Garry Kasparov's 'Centaur' model so influential in modern human-AI collaboration theory?",
        "Warum ist Garry Kasparows 'Zentauren'-Modell fuer die Mensch-KI-Zusammenarbeit so bedeutend?",
        "Dlaczego koncepcja 'centaurów' Garriego Kasparowa jest tak ważna dla nowoczesnej teorii współpracy człowieka z AI?",
      ),
      options: [
        {
          text: T(
            "It demonstrated that human intuition and strategic framing combined with computer tactical calculation and a superior process consistently outperforms both human-alone and machine-alone systems",
            "Es bewies, dass menschliche Intuition verbunden mit maschineller Rechenkraft und gutem Prozess staerker ist als Mensch oder Maschine allein",
            "Wykazała, że ludzka intuicja i planowanie strategiczne w połączeniu z mocą obliczeniową komputera i dobrym procesem przewyższa zarówno samego człowieka, jak i samotny superkomputer",
          ),
          correct: true,
        },
        {
          text: T(
            "It showed that chess players should dress up as mythological half-horse creatures during tournaments",
            "Es verlangte, dass Schachspieler im Turnier als Fabelwesen mit Pferderumpf antreten",
            "Nakazywała szachistom przebieranie się za mityczne pół-konie podczas zawodów",
          ),
          correct: false,
        },
        {
          text: T(
            "It required chess engines to run exclusively on steam-powered gears",
            "Es zwang Schachprogramme, mit Dampf und Zahnraedern betrieben zu werden",
            "Wymagała, aby silniki szachowe były napędzane wyłącznie parą i kołami zębatymi",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about Kasparov's formula: Human + Machine + Better Process > Strongest Standalone Machine.",
        "Erinnere dich an Kasparows Formel: Mensch + Maschine + kluger Prozess besiegt reine Rechenmonster.",
        "Przypomnij sobie wzór Kasparowa: człowiek + maszyna + lepszy proces pokonuje najpotężniejszą samodzielną maszynę.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze why human empathy, moral judgment, and accountability constitute an unassailable advantage over artificial intelligence.",
        "Analysiere, warum menschliche Empathie, Urteilskraft und Verantwortung den unersetzlichen Vorteil gegenueber KI bilden.",
        "Zbadaj, dlaczego ludzka empatia, wrażliwość moralna i odpowiedzialność stanowią niezbywalną przewagę nad sztuczną inteligencją.",
      ),
      Widget: HumanEdgeWidget,
      hint: T(
        "Focus on Moravec's paradox, ethical accountability, centaur synergy, and civilizational values.",
        "Achte auf das Moravec-Paradox, ethische Verantwortung, Zentauren-Synergie und Werte.",
        "Skup się na paradoksie Moraveca, odpowiedzialności moralnej, synergii centaura i ludzkich wartościach.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: What is one human quality or experience in your life that no algorithm or machine could ever replace?",
    "Frage deine Eltern: Welche menschliche Eigenschaft oder Erfahrung in eurem Leben koennte keine Maschine jemals ersetzen?",
    "Zapytaj rodziców: Jaka ludzka cecha, relacja lub przeżycie w Waszym życiu jest czymś, czego żaden algorytm ani maszyna nigdy nie zastąpi?",
  ),
  realLife: {
    title: T(
      "Real world: Garry Kasparov and the Birth of Advanced 'Centaur' Chess (1998)",
      "Echte Welt: Garry Kasparow und die Geburtsstunde des Zentauren-Schachs (1998)",
      "Prawdziwy świat: Garri Kasparow i narodziny zaawansowanych szachów centaurów (1998)",
    ),
    body: T(
      "In June 1998 in León, Spain, following his historic 1997 defeat to IBM's Deep Blue, Garry Kasparov organized the first official 'Advanced Chess' match, where human players were granted unrestricted real-time access to commercial chess database software. Kasparov discovered that when human grandmasters operated with digital assistants, blunders vanished and games achieved unprecedented artistic and tactical perfection. In freestyle open tournaments, amateur players with smart search processes and laptops repeatedly defeated both grandmasters and multi-million-dollar supercomputers operating alone.",
      "Im Juni 1998 veranstaltete Garry Kasparow im spanischen León das erste 'Advanced Chess'-Turnier, bei dem Spieler live auf Computerdatenbanken zugreifen durften. Das Ergebnis verblueffte die Fachwelt: Taktische Einsteller verschwanden, und die Partien erreichten nie gesehene Schoenheit. Bei freien Turnieren schlugen spaeter Amateure mit Laptops und klugem Suchprozess sowohl Weltklasse-Grossmeister als auch isolierte Supercomputer.",
      "W czerwcu 1998 roku w León w Hiszpanii Garri Kasparow zorganizował pierwszy oficjalny mecz szachów zaawansowanych ('Advanced Chess'), w którym zawodnicy mieli nieograniczony dostęp do komputerowych baz danych w czasie partii. Kasparow odkrył, że przy wsparciu cyfrowych asystentów zniknęły proste błędy, a pojedynki osiągnęły niespotykany dotąd kunszt taktyczny. W turniejach dowolnych amatorzy z laptopami i świetnie zorganizowanym procesem wielokrotnie pokonywali zarówno arcymistrzów, jak i potężne superkomputery działające bez człowieka.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Hans Moravec outlined Moravec's Paradox in his 1988 book 'Mind Children: The Future of Robot and Human Intelligence'.",
          "Hans Moravec formulierte sein Paradoxon 1988 in 'Mind Children: The Future of Robot and Human Intelligence'.",
          "Hans Moravec opisał swój paradoks w książce 'Mind Children: The Future of Robot and Human Intelligence' w 1988 r.",
        ),
        source: "https://www.hup.harvard.edu/books/9780674576186",
      },
      {
        text: T(
          "Garry Kasparov played Veselin Topalov in the first Advanced 'Centaur' Chess match in León, Spain, on June 27, 1998.",
          "Garry Kasparow trug am 27. Juni 1998 in León das erste offizielle Zentauren-Schachmatch gegen Topalow aus.",
          "Garri Kasparow rozegrał z Weselinem Topałowem pierwszy oficjalny mecz szachów centaurów 27 czerwca 1998 r. w León.",
        ),
        source: "https://en.chessbase.com/post/ten-years-of-advanced-chess",
      },
      {
        text: T(
          "Garry Kasparov formulated his law of collaboration in 'Deep Thinking: Where Machine Intelligence Ends and Human Creativity Begins' (2017).",
          "Kasparow formulierte sein Gesetz der Mensch-Maschine-Kollaboration 2017 in 'Deep Thinking'.",
          "Garri Kasparow sformułował prawo synergii człowieka i maszyny w książce 'Deep Thinking' w 2017 r.",
        ),
        source:
          "https://www.publicaffairsbooks.com/titles/garry-kasparov/deep-thinking/9781610397872/",
      },
      {
        text: T(
          "Joseph Weizenbaum published 'Computer Power and Human Reason: From Judgment to Calculation' in 1976 on moral limits of computing.",
          "Joseph Weizenbaum warnte 1976 in 'Computer Power and Human Reason' vor der Uebertragung moralischer Urteile an Maschinen.",
          "Joseph Weizenbaum opublikował w 1976 r. pracę 'Computer Power and Human Reason', przestrzegając przed powierzaniem maszynom decyzji moralnych.",
        ),
        source: "https://archive.org/details/computerpowerhum00weiz",
      },
      {
        text: T(
          "The IEEE Global Initiative on Ethics of Autonomous and Intelligent Systems published 'Ethically Aligned Design' in 2019.",
          "Das IEEE veroeffentlichte 2019 die globalen Richtlinien fuer ethisches Design autonomer Systeme.",
          "Organizacja IEEE opublikowała w 2019 r. globalne wytyczne 'Ethically Aligned Design' dotyczące etyki systemów autonomicznych.",
        ),
        source: "https://standards.ieee.org/industry-connections/ec/autonomous-systems/",
      },
    ],
    simplified: [
      T(
        "Evolutionary cognitive neurology, game-theoretic human-machine centaur equilibrium, and normative ethical frameworks are translated into hands-on synergy toys and empowering life lessons.",
        "Evolutionaere Kognitionsforschung, spieltheoretische Zentauren-Modelle und ethische Leitplanken wurden in spielerische Kooperations-Simulationen und inspirierende Lebenslektionen uebersetzt.",
        "Badania ewolucyjnej kognitywistyki, teoria gier w modelach centaurów i normatywne ramy etyczne zostały przedstawione w formie intuicyjnych symulacji współpracy i inspirujących wniosków na przyszłość.",
      ),
    ],
  },
};
