import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function BallotBoxLaunchDiagram({ lang, step }: DiagramProps) {
  const anjaliName = lang === "pl" ? "Alicja" : lang === "de" ? "Anna" : "Anjali";
  const label =
    lang === "pl"
      ? "Alicja bierze udział w demokratycznych wyborach do rady młodzieżowej"
      : lang === "de"
        ? "Anna nimmt an der Wahl zum Jugendrat teil"
        : "Anjali participating in democratic student council election";

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
        <path d="M 52 110 C 52 70 108 70 108 110" fill="#1e1b4b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#7c3aed"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c4b5fd">
          {anjaliName}
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
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ddd6fe">
          🗳️{" "}
          {lang === "pl"
            ? "Wybory: Głos jako Władza"
            : lang === "de"
              ? "Freie Wahlen: Deine Stimme zaehlt"
              : "Free Elections: The Citizen's Power"}
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
          <text x="250" y="102" textAnchor="middle" fontSize="18">
            📋 🔒 👥
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#a78bfa"
          >
            {lang === "pl"
              ? "Tajne, równe i powszechne głosowanie"
              : lang === "de"
                ? "Geheim, gleich und allgemein"
                : "Secret, equal, and universal ballot"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#581c87" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Pokojowa zmiana władzy przy urnie"
              : lang === "de"
                ? "Friedlicher Machtwechsel an der Urne"
                : "Peaceful transfer of political power"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#f3e8ff">
            {lang === "pl"
              ? "Rządzący odpowiadają przed obywatelami"
              : lang === "de"
                ? "Politiker haften bei den Waehlern"
                : "Representatives held accountable to voters"}
          </text>
        </g>
      )}
    </svg>
  );
}

function VotingSystemsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Systemy wyborcze: większościowy (FPTP) a proporcjonalny"
      : lang === "de"
        ? "Wahlsysteme: Mehrheitswahl vs Verhaeltniswahl"
        : "Electoral systems: first-past-the-post vs proportional representation";

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
          First-Past-The-Post
        </text>
        <text x="110" y="90" textAnchor="middle" fontSize="14">
          🏁 🥇
        </text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">
          Winner takes the seat
        </text>
        <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#2563eb">
          Stable two-party majorities
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
            Proportional System
          </text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">
            🍰 🤝
          </text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#065f46">
            Seats mirror vote share
          </text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#047857">
            Encourages coalition pacts
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
              ? "Wybór ordynacji kształtuje liczbę partii i kulturę kompromisu"
              : lang === "de"
                ? "Das Wahlsystem bestimmt Parteienlandschaft und Kompromissfaehigkeit"
                : "Electoral rules define parliament representation and coalition dynamics"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl"
              ? "Niemcy i Polska stosują ordynacje proporcjonalne z progami wyborczymi"
              : lang === "de"
                ? "Deutschland und Polen nutzen Verhaeltniswahlen mit 5%-Sperrklausel"
                : "Germany and Poland combine proportional seats with minimum thresholds"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DemocraticAccountabilityDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Demokratyczna odpowiedzialność i kadencyjność władzy"
      : lang === "de"
        ? "Demokratische Rechenschaftspflicht und regelmaessige Wahlen"
        : "Democratic accountability and regular term limits";

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
      <circle cx="200" cy="95" r="42" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="200" y="90" textAnchor="middle" fontSize="22">
        🔄 ⏳
      </text>
      <text x="200" y="112" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#92400e">
        Every 4-5 Years
      </text>
      <g>
        <circle cx="85" cy="70" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="85" y="68" textAnchor="middle" fontSize="12">
          👍
        </text>
        <text x="85" y="84" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#15803d">
          Re-elect
        </text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="315" cy="70" r="28" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="315" y="68" textAnchor="middle" fontSize="12">
            👎
          </text>
          <text x="315" y="84" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b91c1c">
            Vote Out
          </text>
          <circle cx="200" cy="165" r="26" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="200" y="163" textAnchor="middle" fontSize="12">
            🛡️
          </text>
          <text x="200" y="179" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e40af">
            Opposition
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#78350f" />
          <text
            x="200"
            y="214"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Wybory to najskuteczniejszy mechanizm pokojowego usuwania złych przywódców"
              : lang === "de"
                ? "Wahlen sind das bewaehrte Mittel, schlechte Regierende friedlich abzuwaehlen"
                : "Elections provide a peaceful mechanism to dismiss underperforming leaders"}
          </text>
        </g>
      )}
    </svg>
  );
}

function GerrymanderingAndFairnessDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Sprawiedliwe granice okręgów a manipulacja wyborcza (Gerrymandering)"
      : lang === "de"
        ? "Faire Wahlkreise und das Verhindern von Gerrymandering"
        : "Fair district boundary lines vs partisan gerrymandering";

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
        <rect
          x="35"
          y="45"
          width="150"
          height="85"
          rx="8"
          fill="#fee2e2"
          stroke="#ef4444"
          strokeWidth="1.5"
        />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">
          Gerrymandered
        </text>
        <text x="110" y="90" textAnchor="middle" fontSize="14">
          🐍 ✂️
        </text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">
          Distorted borders
        </text>
        <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">
          Minority party wins majority
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
            Independent Comm.
          </text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">
            📐 ⚖️
          </text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#065f46">
            Natural geographic districts
          </text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#047857">
            Voters choose politicians
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
              ? "W demokracji to obywatele powinni wybierać polityków, a nie politycy swoich wyborców"
              : lang === "de"
                ? "Waehler muessen sich Politiker aussuchen, nicht Politiker ihre Waehler"
                : "Voters should choose their representatives, not politicians choosing their voters"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl"
              ? "Niezależne komisje wyborcze gwarantują uczciwość i transparentność"
              : lang === "de"
                ? "Unabhaengige Wahlleiter garantieren Neutralitaet und Glaubwuerdigkeit"
                : "Independent electoral commissions protect the integrity of the vote"}
          </text>
        </g>
      )}
    </svg>
  );
}

function InformedCitizenParticipationDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Świadome uczestnictwo w wyborach jako filar wolności"
      : lang === "de"
        ? "Informierte Buergerbeteiligung als Staerke der Demokratie"
        : "Informed voter participation as guardian of civil liberties";

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
        <circle cx="200" cy="90" r="38" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fontSize="20">
          🕊️ 🗳️
        </text>
        <text x="200" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">
          Active Voter
        </text>
        <rect
          x="40"
          y="45"
          width="105"
          height="65"
          rx="6"
          fill="#fdf4ff"
          stroke="#c084fc"
          strokeWidth="1"
        />
        <text x="92" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">
          Informed Debate
        </text>
        <text x="92" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">
          Critical thinking
        </text>
        <rect
          x="255"
          y="45"
          width="105"
          height="65"
          rx="6"
          fill="#fdf4ff"
          stroke="#c084fc"
          strokeWidth="1"
        />
        <text x="307" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">
          Civic Duty
        </text>
        <text x="307" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">
          Defending rights
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="50"
            y="140"
            width="300"
            height="42"
            rx="6"
            fill="#ede9fe"
            stroke="#a855f7"
            strokeWidth="1"
          />
          <text x="200" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#581c87">
            "Democracy cannot succeed unless those who express their choice are prepared"
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="8.5" fill="#7e22ce">
            Franklin D. Roosevelt
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
              ? "Wolność i demokracja nie są dane raz na zawsze, wymagają zaangażowania każdego pokolenia"
              : lang === "de"
                ? "Demokratie ist keine Selbstverstaendlichkeit, sondern die Aufgabe jeder Generation"
                : "Democratic self-governance is an ongoing responsibility for every rising generation"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [votesA, setVotesA] = useState(3);
  const [votesB, setVotesB] = useState(2);
  const total = votesA + votesB;
  const pctA = Math.round((votesA / total) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Civic Project Vote: Park Renovations ({votesA}) vs Community Tech Lab ({votesB})
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setVotesA((v) => {
              const next = v + 1;
              if (next + votesB >= 8) onDone?.();
              return next;
            });
          }}
        >
          Vote for Park (+1)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setVotesB((v) => {
              const next = v + 1;
              if (votesA + next >= 8) onDone?.();
              return next;
            });
          }}
        >
          Vote for Tech Lab (+1)
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: "#eef8ef",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        Total Ballots Cast: {total} | Park: {pctA}% | Tech Lab: {100 - pctA}%
        <br />
        Current Winner:{" "}
        {votesA > votesB
          ? "Park Renovation Project"
          : votesB > votesA
            ? "Community Tech Lab Project"
            : "Dead Heat Tie!"}
      </div>
    </div>
  );
}

function ElectionsWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        Why is the secret ballot an indispensable foundation of free and fair democratic elections?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Because writing in secret saves printer paper
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        It protects citizens from intimidation, blackmail, or retaliation by employers or powerful
        rulers
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Because voting booths are only allowed to have one light bulb
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "elections",
  story: [
    animatedBeat(
      [
        T(
          "Meet Anjali. Her high school organizes a referendum to decide whether to allocate the annual budget to a science makerspace or an outdoor sports track.",
          "Das ist Anna. Ihre Schule stimmt ab, ob das Schuelerbudget fuer ein Techniklabor oder eine neue Sportanlage genutzt wird.",
          "Poznaj Alicję. W jej szkole odbywa się referendum, w którym uczniowie decydują, czy przeznaczyć budżet na pracownię robotyki, czy na bieżnię lekkoatletyczną.",
        ),
        T(
          "Instead of a loud shouting contest or fistfight, students cast secret ballots into a locked, tamper-proof wooden ballot box.",
          "Statt eines lauten Streits werfen alle Schueler verdeckte Stimmzettel in eine versiegelte Wahlurne.",
          "Zamiast głośnych kłótni i przepychanek każdy uczeń wrzuca anonimowy głos do zapieczętowanej urny wyborczej.",
        ),
        T(
          "Elections are civilization crowning invention for resolving passionate disputes and allocating power peacefully.",
          "Freie Wahlen sind die grossartigste Erfindung der Zivilisation, um Meinungsverschiedenheiten friedlich beizulegen.",
          "Wybory są jednym z najwspanialszych osiągnięć cywilizacji, umożliwiającym pokojowe rozstrzyganie sporów i wybór władzy.",
        ),
      ],
      BallotBoxLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "Across democratic nations, citizens choose representatives through different *electoral systems*.",
          "In Demokratien waehlen Buerger ihre Volksvertreter nach unterschiedlichen *Wahlsystemen*.",
          "W państwach demokratycznych obywatele wybierają swoich reprezentantów w różnych *systemach wyborczych*.",
        ),
        T(
          "In single-member plurality systems (First-Past-The-Post), the single candidate with the most local votes wins the entire district seat.",
          "Bei der Mehrheitswahl gewinnt der Kandidat mit den meisten Stimmen im Wahlkreis das Direktmandat.",
          "W systemie większościowym (JOW) kandydat z największą liczbą głosów w okręgu zdobywa jedyny dostępny mandat.",
        ),
        T(
          "In *proportional representation* systems, parliaments allocate seats to parties according to their overall percentage share of the national popular vote.",
          "Bei der *Verhaeltniswahl* spiegeln die Parlamentssitze die prozentualen Stimmenanteile der Parteien wider.",
          "W *systemie proporcjonalnym* podział mandatów w parlamencie ściśle odzwierciedla odsetek głosów oddanych na poszczególne ugrupowania.",
        ),
      ],
      VotingSystemsDiagram,
    ),
    animatedBeat(
      [
        T(
          "The fundamental virtue of regular elections is *democratic accountability*.",
          "Der groesste Vorteil regelmaessiger Wahlen ist die *demokratische Rechenschaftspflicht*.",
          "Fundamentalną zaletą cyklicznych wyborów jest *odpowiedzialność polityczna* rządzących przed obywatelami.",
        ),
        T(
          "If elected mayors or prime ministers waste public funds, pass corrupt laws, or fail to fix infrastructure, voters can peaceably remove them from office.",
          "Wenn Regierende Steuergelder verschwenden oder versagen, koennen Buerger sie nach Ablauf der Amtszeit friedlich abwaehlen.",
          "Jeśli ministrowie marnotrawią podatki, tolerują korupcję lub zaniedbują państwo, wyborcy mogą ich bez rozlewu krwi odwołać przy urnie.",
        ),
        T(
          "Knowing that election day arrives every four or five years forces politicians to listen to the everyday concerns of ordinary families.",
          "Das Wissen um den naechsten Wahltag zwingt Politiker dazu, die Sorgen normaler Familien ernst zu nehmen.",
          "Świadomość zbliżających się wyborów co cztery lub pięć lat dyscyplinuje władzę i nakazuje jej liczyć się ze zdaniem obywateli.",
        ),
      ],
      DemocraticAccountabilityDiagram,
    ),
    animatedBeat(
      [
        T(
          "To ensure fairness, free elections require independent electoral commissions and transparent district boundaries.",
          "Damit Wahlen fair bleiben, braucht es unabhaengige Wahlbehoerden und neutrale Wahlkreisgrenzen.",
          "Uczciwe wybory wymagają niezależnych komisji wyborczych oraz bezstronnego wyznaczania granic okręgów.",
        ),
        T(
          "Corrupt regimes attempt *gerrymandering*, drawing bizarre, convoluted electoral map boundaries so the ruling faction wins seats even with a minority of votes.",
          "Manche Machthaber versuchen durch *Gerrymandering* Wahlbezirke so zuzuschneiden, dass sie trotz Minderheit gewinnen.",
          "Niedemokratyczne władze uciekają się do manipulacji granicami okręgów (*gerrymandering*), by zapewnić sobie większość mimo mniejszości głosów.",
        ),
        T(
          "In true democracies, strict constitutional rules ensure that voters choose their politicians, not politicians choosing their voters.",
          "In einer echten Demokratie waehlen die Buerger ihre Abgeordneten, und nicht die Abgeordneten ihre genehmen Waehler.",
          "W prawdziwej demokracji to obywatele wybierają polityków, a nie politycy dopasowują sobie wygodnych wyborców.",
        ),
      ],
      GerrymanderingAndFairnessDiagram,
    ),
    animatedBeat(
      [
        T(
          "Voting is not merely a legal right: it is a sacred civic responsibility that protects our cherished freedoms.",
          "Waehlen ist nicht nur ein Recht, sondern eine Buergerpflicht zum Schutz unserer gemeinsamen Freiheit.",
          "Głosowanie to nie tylko uprawnienie konstytucyjne: to obywatelski obowiązek stania na straży wolności.",
        ),
        T(
          "When informed citizens study policy platforms, scrutinize candidates, and cast thoughtful ballots, democracy thrives.",
          "Wenn informierte Buerger Parteiprogramme vergleichen, Argumente pruefen und zur Wahl gehen, erstarkt die Demokratie.",
          "Gdy świadomi obywatele analizują programy wyborcze, zadają trudne pytania i idą do urn, demokracja kwitnie.",
        ),
        T(
          "Your vote is your equal share in the steering wheel of the nation.",
          "Deine Stimme ist dein unersetzliches Stimmrecht am Steuerrad unseres Landes.",
          "Twój głos przy urnie to Twój równy udział w decydowaniu o przyszłości całego kraju.",
        ),
      ],
      InformedCitizenParticipationDiagram,
    ),
  ],
  toyIntro: T(
    "Cast democratic ballots: add votes for competing community initiatives and observe how majority rule delivers a clear decision.",
    "Gib deine Stimme ab: Waehle zwischen Projekten und beobachte, wie die Mehrheitsentscheidung ein klares Ergebnis liefert.",
    "Oddaj głos w głosowaniu: poprzyj wybrany projekt społeczny i zobacz, jak reguła większości wyłania zwycięskie rozwiązanie.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is democratic accountability through regular elections vital for society?",
        "Warum ist die Rechenschaftspflicht durch regelmaessige Wahlen so wichtig fuer die Gesellschaft?",
        "Dlaczego odpowiedzialność demokratyczna poprzez regularne wybory jest kluczowa dla społeczeństwa?",
      ),
      options: [
        {
          text: T(
            "It enables citizens to peacefully dismiss ineffective or corrupt politicians from office without revolution or violence",
            "Sie erlaubt es den Buergern, schlechte oder korrupte Regierende friedlich ohne Gewalt abzuwaehlen",
            "Umożliwia obywatelom pokojowe odsunięcie od władzy skorumpowanych lub nieudolnych polityków bez konieczności rewolucji",
          ),
          correct: true,
        },
        {
          text: T(
            "It automatically triples the speed of public buses for a month",
            "Sie verdoppelt automatisch die Geschwindigkeit aller Linienbusse fuer vier Wochen",
            "Automatycznie zwiększa prędkość autobusów miejskich na okres miesiąca",
          ),
          correct: false,
        },
        {
          text: T(
            "It requires all citizens to wear the same colored hat on Mondays",
            "Sie schreibt allen Buergern vor, montags dieselbe Muetze zu tragen",
            "Nakazuje wszystkim obywatelom noszenie czapek w tym samym kolorze w poniedziałki",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about what happens to a bad government if citizens have no peaceful way to vote them out.",
        "Ueberlege, was mit einer schlechten Regierung passiert, wenn es keine Moeglichkeit gibt, sie friedlich abzuberufen.",
        "Zastanów się, co dzieje się ze złym rządem, gdy obywatele nie mają żadnej możliwości pokojowej zmiany władzy.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What does 'Proportional Representation' mean in parliamentary elections?",
        "Was versteht man unter 'Verhaeltniswahl' bei Parlamentswahlen?",
        "Co oznacza 'ordynacja proporcjonalna' w wyborach parlamentarnych?",
      ),
      options: [
        {
          text: T(
            "Parties receive a percentage of seats in parliament that closely matches their percentage of the total popular vote",
            "Parteien erhalten Parlamentssitze entsprechend ihrem prozentualen Anteil an den abgegebenen Gesamtstimmen",
            "Partie otrzymują liczbę mandatów w parlamencie proporcjonalną do odsetka głosów zdobytych w skali całego kraju",
          ),
          correct: true,
        },
        {
          text: T(
            "The tallest candidate automatically wins all the parliamentary seats",
            "Der koerperlich groesste Kandidat bekommt saemtliche Sitze zugesprochen",
            "Kandydat o najwyższym wzroście automatycznie otrzymuje wszystkie miejsca w parlamencie",
          ),
          correct: false,
        },
        {
          text: T(
            "Only people who own two houses are allowed to cast a ballot",
            "Nur Besitzer von mindestens zwei Haeusern duerfen waehlen",
            "Prawo głosu przysługuje wyłącznie właścicielom co najmniej dwóch domów",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about a party getting 25% of all votes: in a proportional system, they should receive roughly 25% of the seats.",
        "Denke an eine Partei mit 25% der Waehlerstimmen: Bei Verhaeltniswahl erhaelt sie rund 25% der Abgeordnetensitze.",
        "Pomyśl o partii zdobywającej 25% głosów: w systemie proporcjonalnym powinna otrzymać około 25% miejsc w parlamencie.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the core democratic rationale behind the secret ballot.",
        "Bestimme den wesentlichen Grund fuer das geheime Wahlrecht in einer Demokratie.",
        "Wskaż kluczowy powód stosowania tajnego głosowania w wyborach demokratycznych.",
      ),
      Widget: ElectionsWidget,
      hint: T(
        "Focus on protecting voters from employer intimidation, bribes, or physical threats.",
        "Achte auf den Schutz der Waehler vor Erpressung, Einschuechterung oder Repressalien.",
        "Zwróć uwagę na ochronę obywateli przed naciskami pracodawców, korupcją i szantażem politycznym.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: What was the first national or local election they ever voted in, and how did they research the candidates?",
    "Frage deine Eltern: An welcher Wahl haben sie zum ersten Mal teilgenommen, und wie haben sie sich ueber die Kandidaten informiert?",
    "Zapytaj rodziców: W jakich pierwszych wyborach parlamentarnych lub samorządowych wzięli udział, i jak zbierali informacje o kandydatach?",
  ),
  realLife: {
    title: T(
      "Real world: The Australian Ballot and mixed-member proportional representation in Germany and New Zealand",
      "Echte Welt: Das geheime australische Wahlsystem und die personalisierte Verhaeltniswahl in Deutschland",
      "Prawdziwy świat: Australijska tajna karta do głosowania i personalizowany system proporcjonalny w Niemczech",
    ),
    body: T(
      "In the 1850s, the state of Victoria in Australia invented the modern government-printed secret ballot (the 'Australian Ballot') to stop vote-buying and street intimidation. Today, nations like Germany and New Zealand utilize Mixed-Member Proportional (MMP) systems, giving voters two votes: one for a local district representative and a second vote for a party list, guaranteeing that final parliamentary seats strictly reflect proportional national vote totals.",
      "In den 1850er Jahren erfand der australische Bundesstaat Victoria die geheime amtliche Wahlkarte ('Australian Ballot'), um Stimmenkauf und Einschuechterung zu stoppen. Heute nutzen Staaten wie Deutschland die personalisierte Verhaeltniswahl: Waehler haben zwei Stimmen (Erst- und Zweitstimme), wodurch lokale Abgeordnete gewaehlt werden und zugleich die Gesamtsitzverteilung das Bundeswahlergebnis exakt widerspiegelt.",
      "W latach 50. XIX wieku w australijskim stanie Wiktoria wprowadzono urzędowe karty do tajnego głosowania, aby wyeliminować kupowanie głosów i zastraszanie wyborców. Dziś w Niemczech i Nowej Zelandii stosuje się system mieszany (MMP), w którym obywatele oddają dwa głosy: na kandydata w okręgu oraz na listę partyjną, co łączy reprezentację lokalną z proporcjonalnym składem parlamentu.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The secret ballot was pioneered in Tasmania and Victoria, Australia in 1856 to eliminate intimidation and coercion in public voting.",
          "Die geheime Stimmabgabe wurde 1856 in Australien eingefuehrt, um Schikane und oeffentlichen Druck auf Waehler zu beenden.",
          "Tajna karta do głosowania została po raz pierwszy wprowadzona w Australii w 1856 roku, kładąc kres zastraszaniu wyborców.",
        ),
        source: "https://www.britannica.com/topic/Australian-ballot",
      },
      {
        text: T(
          "Kenneth Arrow proved his mathematical Impossibility Theorem in 1951, demonstrating no ranked-order voting system can perfectly satisfy all fair social choice criteria simultaneously.",
          "Kenneth Arrow bewies 1951 sein Unmoeglichkeitstheorem ueber die mathematischen Grenzen von Wahlsystemen.",
          "Kenneth Arrow sformułował w 1951 roku twierdzenie o niemożności, dowodząc matematycznych ograniczeń systemów wyborczych.",
        ),
        source: "https://www.nobelprize.org/prizes/economic-sciences/1972/arrow/facts/",
      },
      {
        text: T(
          "Maurice Duverger formulated 'Duverger's Law' in 1954, observing that single-member simple-plurality electoral systems naturally favor two-party dominance.",
          "Maurice Duverger zeigte 1954 in 'Duvergers Gesetz', dass reine Mehrheitswahlsysteme gesetzmaessig zu einem Zweiparteiensystem fuehren.",
          "Maurice Duverger sformułował w 1954 roku prawo Duvergera, wykazując, że jednomandatowe okręgi większościowe sprzyjają systemom dwupartyjnym.",
        ),
        source: "https://www.britannica.com/topic/Duvergers-law",
      },
      {
        text: T(
          "The Federal Constitutional Court of Germany (Bundesverfassungsgericht) actively reviews election laws to uphold proportional representation and voting equality.",
          "Das deutsche Bundesverfassungsgericht wacht streng ueber die Einhaltung der Wahlrechtsgrundsaetze und Chancengleichheit.",
          "Federalny Trybunał Konstytucyjny w Niemczech regularnie bada ordynacje wyborcze pod kątem równości i proporcjonalności praw wyborczych.",
        ),
        source:
          "https://www.bundesverfassungsgericht.de/DE/Das-Gericht/Gegenstand-der-Entscheidungen/Wahlpruefung/wahlpruefung_node.html",
      },
      {
        text: T(
          "The Venice Commission of the Council of Europe establishes the Code of Good Practice in Electoral Matters, defining European standards for free and fair elections.",
          "Die Venedig-Kommission des Europarats setzt mit dem 'Code of Good Practice' europaweite Mindeststandards fuer freie Wahlen.",
          "Komisja Wenecka Rady Europy opracowała Kodeks dobrej praktyki w sprawach wyborczych, wyznaczający standardy uczciwych wyborów w Europie.",
        ),
        source: "https://www.venice.coe.int/WebForms/pages/?p=02_elections",
      },
    ],
    simplified: [
      T(
        "Complex mathematical paradoxes (Condorcet cycles and Arrow theorem) are simplified into understandable comparisons between majoritarian and proportional voting principles.",
        "Komplexe wahlorganisatorische Paradoxien (Condorcet und Arrow) wurden anhand greifbarer Vergleiche zwischen Mehrheits- und Verhaeltniswahl erklaert.",
        "Skomplikowane paradoksy wyboru społecznego (paradoks Condorceta, twierdzenie Arrowa) uproszczono do czytelnych zasad ordynacji większościowej i proporcjonalnej.",
      ),
    ],
  },
};
