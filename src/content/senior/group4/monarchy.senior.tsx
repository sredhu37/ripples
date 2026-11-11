import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function DynasticCrownLaunchDiagram({ lang, step }: DiagramProps) {
  const karanName = lang === "pl" ? "Kamil" : lang === "de" ? "Klaus" : "Karan";
  const label =
    lang === "pl"
      ? "Kamil analizuje historię monarchii dynastycznych i konstytucyjnych"
      : lang === "de"
        ? "Klaus analysiert die Entwicklung von absoluten zu konstitutionellen Monarchien"
        : "Karan studying the historical evolution of dynastic and constitutional monarchies";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#d97706"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#d97706" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#451a03" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#b45309"
          stroke="#d97706"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fde68a">
          {karanName}
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
          stroke="#d97706"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#fef3c7">
          👑{" "}
          {lang === "pl"
            ? "Monarchia: Władza Dziedziczna"
            : lang === "de"
              ? "Monarchie: Erbliche Herrschaft"
              : "Monarchy: Hereditary Power & Crowns"}
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
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="18">
            🏰 👑 📜 ⚖️
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#fcd34d"
          >
            {lang === "pl"
              ? "Od boskiego prawa królów po rządy prawa"
              : lang === "de"
                ? "Vom Gottesgnadentum zur Herrschaft des Rechts"
                : "From divine right absolutism to rule of law"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#78350f" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Ryzyko loterii urodzenia (sukcesja)"
              : lang === "de"
                ? "Das Risiko der Erbfolge-Lotterie"
                : "The biological gamble of royal succession"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#fef3c7">
            {lang === "pl"
              ? "Nowoczesne monarchie konstytucyjne: symbol, nie władza"
              : lang === "de"
                ? "Moderne konstitutionelle Monarchen: Repraesentation"
                : "Modern constitutional royals: symbol without coercion"}
          </text>
        </g>
      )}
    </svg>
  );
}

function AbsoluteVsConstitutionalDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Porównanie: monarchia absolutna a konstytucyjna"
      : lang === "de"
        ? "Vergleich: Absolute versus konstitutionelle Monarchie"
        : "Comparison between absolute and constitutional monarchy";

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
          x="30"
          y="45"
          width="160"
          height="95"
          rx="8"
          fill="#fee2e2"
          stroke="#dc2626"
          strokeWidth="1.5"
        />
        <text x="110" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">
          Absolute Monarchy
        </text>
        <text x="110" y="92" textAnchor="middle" fontSize="18">
          👑 ⚔️ 🏰
        </text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#7f1d1d">
          Total unconstrained executive decree
        </text>
        <text x="110" y="125" textAnchor="middle" fontSize="8" fill="#b91c1c">
          No parliament or court review
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="210"
            y="45"
            width="160"
            height="95"
            rx="8"
            fill="#eff6ff"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          <text x="290" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">
            Constitutional Monarchy
          </text>
          <text x="290" y="92" textAnchor="middle" fontSize="18">
            🏛️ 📜 👑
          </text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#1e3a8a">
            Elected parliament holds legislative power
          </text>
          <text x="290" y="125" textAnchor="middle" fontSize="8" fill="#1d4ed8">
            Crown acts as non-partisan head of state
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="155" width="320" height="52" rx="8" fill="#1e293b" />
          <text x="200" y="177" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Magna Carta (1215) i Bill of Rights (1689) podporządkowały koronę prawu"
              : lang === "de"
                ? "Magna Carta (1215) & Bill of Rights (1689) unterwarfen die Krone dem Recht"
                : "Magna Carta (1215) & Bill of Rights (1689) subordinated royal fiat to statutory law"}
          </text>
          <text x="200" y="194" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl"
              ? "Dzisiejsi monarchowie w UK, Hiszpanii, Szwecji czy Japonii panują, lecz nie rządzą"
              : lang === "de"
                ? "Monarchen in Grossbritannien, Spanien und Japan repraesentieren, regieren aber nicht"
                : "Monarchs in the UK, Japan, Sweden, and Spain reign as cultural anchors without ruling"}
          </text>
        </g>
      )}
    </svg>
  );
}

function SuccessionGambleDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Loteria sukcesji dynastycznej: mądry król kontra nieodpowiedzialny spadkobierca"
      : lang === "de"
        ? "Die Erbfolge-Lotterie: Weiser Herrscher versus unfaehiger Erbe"
        : "The biological gamble: visionary ruler versus incompetent heir";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fffbeb"
        stroke="#f59e0b"
        strokeWidth="2"
      />
      <g>
        <circle cx="110" cy="95" r="35" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="110" y="90" textAnchor="middle" fontSize="18">
          👑 📜
        </text>
        <text x="110" y="110" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#14532d">
          Generation 1: Wise King
        </text>
        <circle cx="290" cy="95" r="35" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
        <text x="290" y="90" textAnchor="middle" fontSize="18">
          👑 🎲
        </text>
        <text x="290" y="110" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#7f1d1d">
          Generation 2: Reckless Heir
        </text>
        <path d="M 155 95 L 245 95" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrow)" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="145" width="300" height="40" rx="6" fill="#78350f" />
          <text
            x="200"
            y="163"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Zdolności przywódcze, empatia i mądrość nie są dziedziczone w genach"
              : lang === "de"
                ? "Weisheit, Integritaet und Fuehrungstalent vererben sich nicht automatisch im Blut"
                : "Wisdom, integrity, and sound economic judgment do not transmit predictably in DNA"}
          </text>
          <text x="200" y="177" textAnchor="middle" fontSize="8.5" fill="#fde68a">
            {lang === "pl"
              ? "Gdy monarcha jest słaby lub okrutny, obywatele w monarchii absolutnej nie mają pokojowej drogi zmiany"
              : lang === "de"
                ? "Fehlt die Abwahlmoeglichkeit, fuehren Missernten und Kriege zu buergerkriegsaehnlichen Zustaenden"
                : "Without democratic recall, bad rulers drive nations toward ruin and violent revolts"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#1e293b" />
          <text
            x="200"
            y="214"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "To właśnie to ryzyko doprowadziło do powstania konstytucjonalizmu i republik"
              : lang === "de"
                ? "Dieses existenzielle Risiko gebar den modernen Konstitutionalismus"
                : "This structural vulnerability prompted the global rise of constitutional democracies"}
          </text>
        </g>
      )}
    </svg>
  );
}

function MagnaCartaPillarDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Magna Carta i poddanie władcy prawu stanowionemu"
      : lang === "de"
        ? "Die Magna Carta und die Bindung des Herrschers an das Gesetz"
        : "Magna Carta: subjection of sovereign power to statutory charters";

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
          x="130"
          y="45"
          width="140"
          height="90"
          rx="8"
          fill="#ede9fe"
          stroke="#7c3aed"
          strokeWidth="2"
        />
        <text x="200" y="75" textAnchor="middle" fontSize="22">
          📜 ⚖️
        </text>
        <text x="200" y="98" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4c1d95">
          Magna Carta
        </text>
        <text x="200" y="115" textAnchor="middle" fontSize="9" fill="#5b21b6">
          Runnymede 1215
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="145" width="320" height="42" rx="6" fill="#1e293b" />
          <text
            x="200"
            y="163"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Żaden król nie stoi ponad prawem: początek procesu due process i niezawisłych sądów"
              : lang === "de"
                ? "Niemand steht ueber dem Gesetz: Grundstein fuer unabhaengige Gerichte"
                : "No monarch stands above the law: founding cornerstone of judicial due process"}
          </text>
          <text x="200" y="177" textAnchor="middle" fontSize="8.5" fill="#a5b4fc">
            {lang === "pl"
              ? "Zakaz nakładania podatków bez zgody rady baronów (późniejszego parlamentu)"
              : lang === "de"
                ? "Keine Steuern ohne Zustimmung des Rates der Barone (Vorlaeufer des Parlaments)"
                : "Prohibited levying extraordinary revenue without consultative council consent"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#4c1d95" />
          <text
            x="200"
            y="214"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Kamień węgielny zachodniej tradycji wolności obywatelskich i praworządności"
              : lang === "de"
                ? "Grundpfeiler moderner buergerlicher Freiheiten und Rechtsstaatlichkeit"
                : "Foundational legal bedrock of Western constitutionalism and civil rights"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ModernCeremonialBalanceDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Monarchia we współczesnym świecie: jedność kulturowa bez monopolu władzy"
      : lang === "de"
        ? "Die moderne parlamentarische Monarchie: Kulturelle Einheit ohne Machtmonopol"
        : "Modern constitutional monarchy: cultural unity without coercive monopoly";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#faf5ff"
        stroke="#9333ea"
        strokeWidth="2"
      />
      <g>
        <rect
          x="40"
          y="45"
          width="140"
          height="75"
          rx="8"
          fill="#f5f3ff"
          stroke="#7c3aed"
          strokeWidth="1.5"
        />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#581c87">
          Constitutional Monarch
        </text>
        <text x="110" y="90" textAnchor="middle" fontSize="16">
          👑 🤝 🕊️
        </text>
        <text x="110" y="108" textAnchor="middle" fontSize="8" fill="#6b21a8">
          Non-partisan head of state
        </text>

        <rect
          x="220"
          y="45"
          width="140"
          height="75"
          rx="8"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
          Elected Prime Minister
        </text>
        <text x="290" y="90" textAnchor="middle" fontSize="16">
          🏛️ 🗳️ 💼
        </text>
        <text x="290" y="108" textAnchor="middle" fontSize="8" fill="#1d4ed8">
          Head of executive government
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="45" rx="6" fill="#581c87" />
          <text
            x="200"
            y="153"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Monarcha reprezentuje ciągłość państwa ponad partyjnymi podziałami"
              : lang === "de"
                ? "Der Monarch repraesentiert die Kontinuitaet des Staates ueber Parteistreitigkeiten"
                : "The crown embodies non-partisan national continuity above political turbulence"}
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8.5" fill="#e9d5ff">
            {lang === "pl"
              ? "Wszelkie ustawy uchwala parlament wybrany przez obywateli w powszechnych wyborach"
              : lang === "de"
                ? "Alle Gesetze und Steuern beschliesst das frei gewaehlte Parlament"
                : "Every tax and statutory law is debated and enacted solely by the elected legislature"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Równowaga tradycji i demokracji chroni wolność obywatelską"
              : lang === "de"
                ? "Die Balance aus Tradition und Demokratie schuetzt die buergerliche Freiheit"
                : "Balancing historical heritage with robust representative democracy preserves liberty"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [parliamentPower, setParliamentPower] = useState(30);
  const isConstitutional = parliamentPower >= 70;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Parliamentary Authority: {parliamentPower}% | System:{" "}
        {isConstitutional ? "Constitutional Monarchy" : "Absolute Monarchy"}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setParliamentPower((p) => {
              const next = Math.min(100, p + 25);
              if (next >= 75) onDone?.();
              return next;
            });
          }}
        >
          Enforce Rule of Law (+25% Parliament)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setParliamentPower(20);
          }}
        >
          Revert to Royal Decrees (Reset)
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: isConstitutional ? "#eef8ef" : "#fef3c7",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {isConstitutional
          ? "Constitutional Order Established: The monarch acts as a ceremonial symbol of national heritage, while elected representatives control taxes and pass laws!"
          : "Absolute Rule: The monarch exercises unchecked power over taxes, courts, and war with no democratic accountability."}
      </div>
    </div>
  );
}

function MonarchyWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        What is the defining distinction between an absolute monarchy and a constitutional monarchy?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Absolute monarchs only wear gold crowns, whereas constitutional monarchs wear silver tiaras
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        In a constitutional monarchy the crown's authority is bound by written law and parliament
        governs, while an absolute monarch holds unchecked power
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Constitutional monarchies only exist on tropical islands with palm trees
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "monarchy",
  story: [
    animatedBeat(
      [
        T(
          "Meet Karan. He visits an ancient stone fortress whose high towers once housed hereditary kings and queens.",
          "Das ist Klaus. Er besichtigt eine uralte Festung, in der einst Koenige und Koeniginnen ueber das Land herrschten.",
          "Poznaj Kamila. Zwiedza potężny kamienny zamek, którego wysokie baszty były niegdyś siedzibą dziedzicznych królów i królowych.",
        ),
        T(
          "In school history classes, he learned that for thousands of years, most humans lived under monarchies where power passed down by birthright.",
          "Im Geschichtsunterricht lernte er, dass die Menschheit jahrhundertelang unter erblicher Herrschaft lebte.",
          "Na lekcjach historii dowiedział się, że przez tysiąclecia większość ludzkości żyła w monarchiach, gdzie władza przechodziła z rodziców na dzieci.",
        ),
        T(
          "A *monarchy* is a political system where the sovereign head of state holds office for life, usually through biological succession.",
          "Eine *Monarchie* ist ein System, in dem das Staatsoberhaupt sein Amt lebenslang durch Erbfolge innehat.",
          "W ustroju *monarchii* głowa państwa sprawuje władzę dożywotnio, najczęściej na mocy dynastycznego prawa sukcesji.",
        ),
      ],
      DynasticCrownLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "Political philosophers distinguish between two vastly different forms: *absolute monarchy* and *constitutional monarchy*.",
          "In der Staatslehre unterscheidet man zwei grundverschiedene Formen: die *absolute* und die *konstitutionelle Monarchie*.",
          "Politologia i historia prawa wyróżniają dwa zupełnie odmienne modele: *monarchię absolutną* oraz *monarchię konstytucyjną*.",
        ),
        T(
          "In an absolute monarchy, the ruler exercises total executive decree without courts, written constitutions, or elections to restrain them.",
          "In einer absoluten Monarchie herrscht der Koenig uneingeschraenkt: ohne Parlament, ohne freie Gerichte und ohne Gesetzesgrenzen.",
          "W monarchii absolutnej władca skupia pełnię nieskrępowanej władzy: nie ograniczają go sądy, konstytucja ani parlament.",
        ),
        T(
          "In a constitutional monarchy, codified laws and an elected parliament govern the nation, while the crown serves as a non-partisan ceremonial figurehead.",
          "In einer konstitutionellen Monarchie regiert das gewaehlte Parlament nach Recht und Gesetz, waehrend die Krone repraesentiert.",
          "W monarchii konstytucyjnej państwem rządzi wybrany parlament na podstawie konstytucji, podczas gdy monarcha pełni funkcję reprezentacyjną.",
        ),
      ],
      AbsoluteVsConstitutionalDiagram,
    ),
    animatedBeat(
      [
        T(
          "The fundamental vulnerability of hereditary succession is the biological gamble of royal birth.",
          "Die zentrale Schwachstelle der Erbmonarchie ist die unberechenbare Lotterie des Stammbaums.",
          "Fundamentalną wadą dziedzicznej sukcesji jest biologiczna loteria narodzin na królewskim dworze.",
        ),
        T(
          "A visionary king might build aqueducts and promote science, but his heir might be arrogant, corrupt, or completely unsuited to govern.",
          "Ein kluger Herrscher baut Spitaeler und Strassen, doch sein leiblicher Thronfolger ist vielleicht herrschsuechtig oder unfaehig.",
          "Mądry władca może budować drogi, uniwersytety i szpitale, lecz jego syn może okazać się lekkomyślny, okrutny lub niezdolny do rządzenia.",
        ),
        T(
          "Because subjects in an absolute monarchy cannot vote an incompetent leader out of office, dynastic failures historically provoked ruinous civil wars.",
          "Weil Buerger einen unfaehigen Monarchen nicht abwaehlen koennen, endeten Herrscherkrisen frueher oft in blutigen Buergerkriegen.",
          "Ponieważ poddani nie mogą odwołać monarchy przy urnie wyborczej, kryzysy dynastyczne kończyły się dawniej niszczycielskimi wojnami domowymi.",
        ),
      ],
      SuccessionGambleDiagram,
    ),
    animatedBeat(
      [
        T(
          "The historic turning point came in 1215 at Runnymede, where rebellious English barons forced King John to seal the *Magna Carta*.",
          "Der historische Wendepunkt ereignete sich 1215 in Runnymede: Aufstaendische Barone zwangen Koenig Johann zur Unterzeichnung der *Magna Carta*.",
          "Przełomowym momentem w dziejach był rok 1215 na łąkach Runnymede, gdzie zbuntowani baronowie zmusili króla Jana bez Ziemi do podpisania *Wielkiej Karty Swobód* (Magna Carta).",
        ),
        T(
          "For the first time in European history, the charter established that even the king was subject to the rule of law and could not seize property arbitrarily.",
          "Erstmals wurde festgeschrieben, dass selbst der Koenig an Recht und Gesetz gebunden ist und Eigentum nicht willkuerlich beschlagnahmen darf.",
          "Po raz pierwszy w Europie formalnie ustalono, że nawet monarcha podlega prawu i nie może bezprawnie odbierać majątku ani więzić ludzi bez wyroku.",
        ),
        T(
          "This pivotal legal breakthrough laid the foundations for independent courts, due process, and parliamentary democracy worldwide.",
          "Dieser juristische Durchbruch legte das Fundament fuer unabhaengige Gerichte, faire Prozesse und parlamentarische Demokratien weltweit.",
          "Ten epokowy akt stał się kamieniem węgielnym niezawisłego sądownictwa, uczciwego procesu i parlamentaryzmu na całym świecie.",
        ),
      ],
      MagnaCartaPillarDiagram,
    ),
    animatedBeat(
      [
        T(
          "Today, constitutional monarchies flourish in stable democracies like the United Kingdom, Spain, the Netherlands, Norway, and Japan.",
          "Heute praegen moderne konstitutionelle Monarchien stabile Demokratien wie Grossbritannien, Spanien, die Niederlande und Japan.",
          "Współcześnie monarchie konstytucyjne funkcjonują w stabilnych demokracjach, takich jak Wielka Brytania, Hiszpania, Holandia, Norwegia czy Japonia.",
        ),
        T(
          "Modern monarchs embody national heritage and unity across party lines, while elected prime ministers and legislators run the state.",
          "Die Monarchen verkoerpern Kultur und Einheit ueber Parteigrenzen hinweg, waehrend gewaehlte Ministerpraesidenten die Gesetze fuehren.",
          "Współcześni monarchowie stanowią symbol tożsamości i ciągłości państwa ponad partyjnymi sporami, podczas gdy realną władzę sprawuje rząd i parlament.",
        ),
        T(
          "Studying the transformation of monarchies reveals how humanity learned to harness state power under the supreme authority of written law.",
          "Die Entwicklung der Monarchie zeigt eindrucksvoll, wie die Menschheit lernte, Macht durch die Herrschaft des geschriebenen Rechts zu zaehmen.",
          "Dzieje monarchii ukazują fascynującą drogę, jaką przebyła ludzkość, by podporządkować rządy jednostki nadrzędnej sile prawa i konstytucji.",
        ),
      ],
      ModernCeremonialBalanceDiagram,
    ),
  ],
  toyIntro: T(
    "Calibrate the balance of power: expand parliamentary authority and constitutional rights to transform an absolute monarchy into a rule-of-law democracy.",
    "Justiere die Machtbalance: Staerke das Parlament und die Grundrechte, um eine absolute Monarchie in eine konstitutionelle Demokratie zu wandeln.",
    "Zarządzaj równowagą sił: wzmacniaj kompetencje parlamentu i prawa obywatelskie, przekształcając monarchię absolutną w nowoczesne państwo prawa.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did absolute hereditary monarchies prove so inherently vulnerable throughout history?",
        "Warum erwiesen sich absolute Erbmonarchien in der Geschichte als strukturell anfaellig?",
        "Dlaczego dziedziczne monarchie absolutne okazywały się w historii tak niestabilne?",
      ),
      options: [
        {
          text: T(
            "Because leadership ability and moral wisdom are not guaranteed to pass down genetically, leaving citizens trapped under incompetent or tyrannical rulers without peaceful recall",
            "Weil Faehigkeiten und Weisheit nicht genetisch vererbt werden und Buerger unfaehige Herrscher ohne Wahlen nicht friedlich abloesen konnten",
            "Ponieważ zdolności przywódcze i mądrość nie są dziedziczone w genach, a obywatele nie mieli pokojowej drogi odwołania nieudolnego monarchy",
          ),
          correct: true,
        },
        {
          text: T(
            "Because castle drawbridges constantly jammed during afternoon rainstorms",
            "Weil Burgbruecken bei Regen regelmaessig quietschten",
            "Ponieważ mosty zwodzone na zamkach zacinały się podczas deszczu",
          ),
          correct: false,
        },
        {
          text: T(
            "Because royal cloaks required too many silk weavers from neighboring continents",
            "Weil Koenigsgewaender zu viele Schneider aus Nachbarlaendern erforderten",
            "Ponieważ królewskie płaszcze wymagały zbyt wielu krawców z zagranicy",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about what happens when an incompetent heir inherits the throne and cannot be voted out.",
        "Denke daran, was geschieht, wenn ein unfaehiger Erbe den Thron besteigt und keine Wahlen existieren.",
        "Zastanów się, co dzieje się, gdy tron obejmuje nieudolny następca, a poddani nie mogą przeprowadzić wyborów.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What fundamental constitutional principle did the Magna Carta establish in 1215?",
        "Welches verfassungsrechtliche Grundprinzip begruendete die Magna Carta im Jahr 1215?",
        "Jaką fundamentalną zasadę ustrojową ustanowiła Magna Carta w 1215 roku?",
      ),
      options: [
        {
          text: T(
            "That even the sovereign monarch is subordinate to the law and cannot arbitrarily seize property or imprison citizens without due legal process",
            "Dass selbst der Monarch an das Gesetz gebunden ist und Eigentum nicht willkuerlich beschlagnahmen oder Menschen ohne Urteil inhaftieren darf",
            "Że nawet panujący monarcha podlega prawu i nie może samowolnie konfiskować mienia ani więzić obywateli bez wyroku sądowego",
          ),
          correct: true,
        },
        {
          text: T(
            "That royal horses must be fed three loaves of sourdough bread each morning",
            "Dass Pferde der Koenigsgarde taeglich frisches Brot erhalten muessen",
            "Że konie gwardii królewskiej muszą codziennie zjadać bochenek chleba",
          ),
          correct: false,
        },
        {
          text: T(
            "That gold crowns must be polished exclusively with river sand on Mondays",
            "Dass Goldkronen nur montags mit Flusssand poliert werden duerfen",
            "Że złote korony wolno polerować wyłącznie piaskiem rzecznym w poniedziałki",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Recall the core breakthrough: placing limits on royal authority and creating the rule of law.",
        "Erinnere dich an den Kern: Schranken fuer koenigliche Macht und Vorrang des Rechts.",
        "Przypomnij sobie najważniejsze osiągnięcie: wyznaczenie granic władzy monarchy i nadrzędność prawa.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze the defining institutional difference between an absolute monarchy and a constitutional monarchy.",
        "Analysiere den grundlegenden institutionellen Unterschied zwischen absoluter und konstitutioneller Monarchie.",
        "Przeanalizuj kluczową różnicę ustrojową między monarchią absolutną a konstytucyjną.",
      ),
      Widget: MonarchyWidget,
      hint: T(
        "Focus on whether sovereign power is bound by written law and shared with an elected parliament.",
        "Achte darauf, ob die koenigliche Macht durch Gesetze begrenzt und mit einem gewaehlten Parlament geteilt wird.",
        "Zwróć uwagę na to, czy władza monarchy jest ograniczona konstytucją i poddana kontroli wybranego parlamentu.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Why do countries like the UK, Spain, and Japan still keep royal families today even though their parliaments make all the laws?",
    "Frage deine Eltern: Warum behalten Laender wie Grossbritannien, Spanien oder Japan ihre Koenigsfamilien, obwohl gewaehlte Parlamente alle Gesetze beschliessen?",
    "Zapytaj rodziców: Dlaczego kraje takie jak Wielka Brytania, Hiszpania czy Japonia wciąż utrzymują monarchów, choć wszystkie prawa uchwala parlament?",
  ),
  realLife: {
    title: T(
      "Real world: King John sealing Magna Carta in 1215 and the Glorious Revolution of 1688",
      "Echte Welt: Koenig Johann siegelt die Magna Carta 1215 und die Glorious Revolution von 1688",
      "Prawdziwy świat: Pieczęć króla Jana na Magna Carta w 1215 r. oraz Chwalebna Rewolucja z 1688 r.",
    ),
    body: T(
      "On June 15, 1215, English barons confronted King John at Runnymede meadow and forced him to grant the Magna Carta, guaranteeing protection against illegal imprisonment and unlawful taxation. Four centuries later, the English Glorious Revolution of 1688 and the 1689 Bill of Rights permanently established parliamentary supremacy over the crown, creating the template for modern constitutional monarchies and democratic legislatures worldwide.",
      "Am 15. Juni 1215 unterzeichnete Koenig Johann Ohneland in Runnymede die Magna Carta, die Schutz vor willkuerlicher Verhaftung und Besteuerung garantierte. Vier Jahrhunderte spaeter besiegelten die Glorious Revolution von 1688 und die Bill of Rights von 1689 den endgueltigen Vorrang des Parlaments vor der Krone und schufen die Blaupause fuer moderne parlamentarische Demokratien weltweit.",
      "15 czerwca 1215 roku na łące Runnymede baronowie wymusili na królu Janie bez Ziemi wydanie Wielkiej Karty Swobód, gwarantującej ochronę przed bezprawnym uwięzieniem i podatkami. Cztery stulecia później Chwalebna Rewolucja z 1688 r. i Deklaracja Praw z 1689 r. ostatecznie ugruntowały wyższość parlamentu nad monarchą, tworząc fundament nowoczesnej demokracji.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "King John affixed the Great Seal to the Magna Carta at Runnymede on June 15, 1215, establishing the legal precedent that the monarch is bound by law.",
          "Koenig Johann siegelte die Magna Carta am 15. Juni 1215 in Runnymede und stellte den Herrscher erstmals unter das Recht.",
          "Król Jan opatrzył pieczęcią Wielką Kartę Swobód w Runnymede 15 czerwca 1215 r., podporządkowując władcę prawu.",
        ),
        source: "https://www.bl.uk/magna-carta",
      },
      {
        text: T(
          "The English Bill of Rights was enacted by Parliament on December 16, 1689, codifying freedom of speech in parliament and regular elections.",
          "Die englische Bill of Rights vom 16. Dezember 1689 begruendete die Parlamentssouveraenitaet und Redefreiheit im Parlament.",
          "Deklaracja Praw z 16 grudnia 1689 r. zagwarantowała suwerenność parlamentu i wolność debaty publicznej w Anglii.",
        ),
        source:
          "https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/collections/collections-glorious-revolution/billofrights/",
      },
      {
        text: T(
          "The Constitution of Japan, enacted on May 3, 1947, explicitly defines the Emperor as 'the symbol of the State and of the unity of the People', devoid of governing power.",
          "Die japanische Verfassung von 1947 definiert den Kaiser ausschliesslich als Symbol des Staates ohne Regierungsbefugnis.",
          "Konstytucja Japonii z 1947 r. określa Cesarza wyłącznie jako 'symbol państwa i jedności narodu', pozbawiony realnej władzy rządu.",
        ),
        source:
          "https://japan.kantei.go.jp/constitution_and_government_of_japan/constitution_e.html",
      },
      {
        text: T(
          "The Spanish Constitution of 1978 established Spain as a parliamentary monarchy, with King Juan Carlos I facilitating the democratic transition.",
          "Die spanische Verfassung von 1978 verankerte Spanien als parlamentarische Monarchie nach dem Ende der Diktatur.",
          "Konstytucja Hiszpanii z 1978 r. ustanowiła monarchię parlamentarną, przypieczętowując demokratyczną transformację kraju.",
        ),
        source: "https://www.boe.es/legislacion/documentos/ConstitucionINGLES.pdf",
      },
      {
        text: T(
          "The United Nations Universal Declaration of Human Rights (1948) traces its core legal principles of due process directly back to historical constitutional limits on sovereign power.",
          "Die Allgemeine Erklaerung der Menschenrechte von 1948 fusst auf historischen Schranken gegen absolutistische Macht.",
          "Powszechna Deklaracja Praw Człowieka ONZ (1948) wywodzi swoje zasady praworządności z historycznych ograniczeń władzy absolutnej.",
        ),
        source: "https://www.un.org/en/about-us/universal-declaration-of-human-rights",
      },
    ],
    simplified: [
      T(
        "Complex feudal tenure laws, divine right treatises, and statutory royal prerogative doctrines are translated into clear castle power dials and constitutional balance diagrams.",
        "Komplexe Feudalrechte und Herrschaftstheorien wurden durch anschauliche Machtregler und Verfassungsdiagramme verstaendlich gemacht.",
        "Złożone prawo feudalne, teologię władzy z boskiego nadania oraz prerogatywy monarsze wyjaśniono za pomocą czytelnych suwaków władzy i schematów ustrojowych.",
      ),
    ],
  },
};
