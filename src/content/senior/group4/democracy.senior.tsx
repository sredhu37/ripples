import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function ThreeBranchesLaunchDiagram({ lang, step }: DiagramProps) {
  const kritiName = lang === "pl" ? "Kasia" : lang === "de" ? "Klara" : "Kriti";
  const label =
    lang === "pl"
      ? "Kasia analizuje konstytucyjny trójpodział władzy"
      : lang === "de"
        ? "Klara untersucht die verfassungsrechtliche Gewaltenteilung"
        : "Kriti exploring the constitutional separation of powers";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#10b981"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#10b981" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#064e3b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#059669"
          stroke="#10b981"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6ee7b7">
          {kritiName}
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
          stroke="#10b981"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#a7f3d0">
          🏛️{" "}
          {lang === "pl"
            ? "Trójpodział Władzy"
            : lang === "de"
              ? "Die Drei Staatsgewalten"
              : "Three Branches of Governance"}
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
            stroke="#059669"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="18">
            📜 💼 ⚖️
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#34d399"
          >
            {lang === "pl"
              ? "Ustawodawcza, Wykonawcza, Sądownicza"
              : lang === "de"
                ? "Legislative, Exekutive, Judikative"
                : "Legislative, Executive, Judicial"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#065f46" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Nikt nie stoi ponad prawem"
              : lang === "de"
                ? "Niemand steht ueber dem Gesetz"
                : "No individual stands above the law"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#d1fae5">
            {lang === "pl"
              ? "Wzajemna kontrola chroni wolność obywateli"
              : lang === "de"
                ? "Gewaltenteilung verhindert Tyrannei"
                : "Checks and balances preserve freedom"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ChecksAndBalancesDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Mechanizmy równoważenia władz (Checks and Balances)"
      : lang === "de"
        ? "Gegenseitige Kontrolle der Gewalten (Checks and Balances)"
        : "Interlocking constitutional checks and balances";

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
        <circle cx="90" cy="75" r="34" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="90" y="70" textAnchor="middle" fontSize="18">
          📜
        </text>
        <text x="90" y="88" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#1e40af">
          Parliament
        </text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="310" cy="75" r="34" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="310" y="70" textAnchor="middle" fontSize="18">
            💼
          </text>
          <text x="310" y="88" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#065f46">
            President/PM
          </text>

          <circle cx="200" cy="165" r="34" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="200" y="160" textAnchor="middle" fontSize="18">
            ⚖️
          </text>
          <text x="200" y="178" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#92400e">
            Supreme Court
          </text>

          <line
            x1="124"
            y1="75"
            x2="276"
            y2="75"
            stroke="#64748b"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <line
            x1="105"
            y1="105"
            x2="175"
            y2="145"
            stroke="#64748b"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <line
            x1="295"
            y1="105"
            x2="225"
            y2="145"
            stroke="#64748b"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="35" y="200" width="330" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="217" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Żadna pojedyncza gałąź nie ma władzy absolutnej nad państwem"
              : lang === "de"
                ? "Keine Gewalt kann eigenmaechtig alle Macht an sich reissen"
                : "Ambition counteracts ambition: each branch bounds the others"}
          </text>
        </g>
      )}
    </svg>
  );
}

function IndependentJudiciaryDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Niezawisłe sądownictwo jako tarcza praw obywatelskich"
      : lang === "de"
        ? "Die unabhaengige Justiz als Schutzschild der Grundrechte"
        : "Independent judiciary protecting citizen rights from overreach";

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
      <g>
        <rect
          x="40"
          y="45"
          width="145"
          height="85"
          rx="8"
          fill="#fee2e2"
          stroke="#ef4444"
          strokeWidth="1.5"
        />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">
          Captured Courts
        </text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">
          ⛓️ 🤐
        </text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">
          Judges take orders
        </text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">
          Opposition jailed illegally
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="215"
            y="45"
            width="145"
            height="85"
            rx="8"
            fill="#ecfdf5"
            stroke="#059669"
            strokeWidth="1.5"
          />
          <text x="287" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
            Independent Courts
          </text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">
            ⚖️ 🛡️
          </text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#065f46">
            Tenured for life / fixed
          </text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#047857">
            Strikes down unlawful acts
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#78350f" />
          <text
            x="200"
            y="174"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Sędzia musi być wolny od politycznych nacisków i gróźb utraty pracy"
              : lang === "de"
                ? "Richter muessen frei von politischem Druck und Entlassungsdrohungen sein"
                : "Judicial tenure guarantees that trials are governed by law, not politicians"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#fde68a">
            {lang === "pl"
              ? "Trybunał Konstytucyjny ma prawo unieważnić bezprawne ustawy"
              : lang === "de"
                ? "Verfassungsgerichte koennen verfassungswidrige Gesetze fuer nichtig erklaeren"
                : "Constitutional courts strike down legislation that violates core human rights"}
          </text>
        </g>
      )}
    </svg>
  );
}

function FourthEstateDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Czwarta władza: wolne media i przejrzystość publiczna"
      : lang === "de"
        ? "Die vierte Gewalt: Freie Presse und oeffentliche Transparenz"
        : "The Fourth Estate: free investigative press and civic transparency";

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
      <circle cx="200" cy="95" r="42" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="200" y="90" textAnchor="middle" fontSize="22">
        📰 🎙️
      </text>
      <text x="200" y="112" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1e40af">
        Free Press
      </text>
      <g>
        <circle cx="85" cy="70" r="28" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="85" y="68" textAnchor="middle" fontSize="12">
          🔍
        </text>
        <text x="85" y="84" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#5b21b6">
          Investigate
        </text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="315" cy="70" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="315" y="68" textAnchor="middle" fontSize="12">
            📢
          </text>
          <text x="315" y="84" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#15803d">
            Expose
          </text>
          <circle cx="200" cy="165" r="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="200" y="163" textAnchor="middle" fontSize="12">
            🛡️
          </text>
          <text x="200" y="179" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#92400e">
            Whistleblow
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
              ? "Światło dzienne jest najlepszym środkiem dezynfekującym nadużycia władzy"
              : lang === "de"
                ? "Sonnenlicht ist das beste Desinfektionsmittel gegen Machtmissbrauch"
                : "Sunlight and open journalism remain the greatest disinfectants for corruption"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ConstitutionalLibertyDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Stabilna konstytucja chroniąca prawa mniejszości i wolność"
      : lang === "de"
        ? "Eine weitsichtige Verfassung schuetzt Minderheitenrechte und Freiheit"
        : "Enduring constitutional design protecting individual rights";

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
        <rect
          x="50"
          y="40"
          width="300"
          height="50"
          rx="8"
          fill="#ede9fe"
          stroke="#7c3aed"
          strokeWidth="1.5"
        />
        <text x="200" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#581c87">
          {lang === "pl"
            ? "Konstytucja: Najwyższe Prawo Rzeczypospolitej"
            : lang === "de"
              ? "Das Grundgesetz: Hoechste Norm des Staates"
              : "The Constitution: Supreme Law of the Land"}
        </text>
        <text x="200" y="78" textAnchor="middle" fontSize="9" fill="#7e22ce">
          {lang === "pl"
            ? "Nawet 90% większości parlamentarnej nie może odebrać podstawowych praw"
            : lang === "de"
              ? "Selbst eine 90%-Mehrheit darf fundamentale Grundrechte niemals antasten"
              : "Fundamental human rights cannot be voted away by fleeting majorities"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="40"
            y="105"
            width="150"
            height="75"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="1.5"
          />
          <text x="115" y="130" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
            Rule of Law
          </text>
          <text x="115" y="152" textAnchor="middle" fontSize="14">
            📜 🏛️
          </text>
          <text x="115" y="168" textAnchor="middle" fontSize="8.5" fill="#166534">
            Clear due process
          </text>

          <rect
            x="210"
            y="105"
            width="150"
            height="75"
            rx="8"
            fill="#eff6ff"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          <text x="285" y="130" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
            Bill of Rights
          </text>
          <text x="285" y="152" textAnchor="middle" fontSize="14">
            🕊️ 🛡️
          </text>
          <text x="285" y="168" textAnchor="middle" fontSize="8.5" fill="#1d4ed8">
            Free speech & faith
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
              ? "Podział władzy sprawia, że wolność przetrwa nawet trudne kryzysy"
              : lang === "de"
                ? "Geteilte Macht schuetzt die Freiheit der Buerger dauerhaft vor Tyrannei"
                : "Separated power ensures human dignity outlasts political storms"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [vetoActive, setVetoActive] = useState(false);
  const [courtReview, setCourtReview] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Law Status:{" "}
        {vetoActive
          ? "Vetoed by President 🚫"
          : courtReview
            ? "Declared Unconstitutional ⚖️"
            : "Enacted by Parliament 📜"}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setVetoActive((v) => !v);
            onDone?.();
          }}
        >
          {vetoActive ? "Override Presidential Veto" : "Presidential Veto"}
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setCourtReview((c) => !c);
            onDone?.();
          }}
        >
          {courtReview ? "Dismiss Judicial Challenge" : "Judicial Constitutional Review"}
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: vetoActive || courtReview ? "#fff1f2" : "#eef8ef",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {vetoActive
          ? "Executive Check: The President refuses to sign a poorly drafted law, returning it to parliament!"
          : courtReview
            ? "Judicial Check: The Supreme Court rules the law violates the Bill of Rights and nullifies it!"
            : "Cooperative Lawmaking: Parliament passed a bill with broad multi-partisan oversight!"}
      </div>
    </div>
  );
}

function BranchesWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        What is the main function of the Judicial Branch (Supreme Court and courts)?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        To command the army in wartime
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        To impartially interpret laws and strike down government actions that violate the
        constitution
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        To design and print paper currency
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "democracy",
  story: [
    animatedBeat(
      [
        T(
          "Meet Kriti. She is reading history books and notices a grim pattern: whenever all government power is concentrated in one single king or dictator, disaster follows.",
          "Das ist Klara. Sie liest Geschichtsbuecher und bemerkt ein duesteres Muster: Wann immer alle Macht bei einem Herrscher liegt, folgt Tyrannei.",
          "Poznaj Kasię. Czyta podręczniki historii i zauważa ponurą prawidłowość: ilekroć cała władza skupiała się w rękach jednego króla lub dyktatora, kończyło się to katastrofą.",
        ),
        T(
          "Absolute monarchs made laws at breakfast, executed them at lunch, and sentenced critics to prison before dinner with zero appeal.",
          "Absolute Monarchen erliessen morgens Gesetze, fuehrten sie mittags aus und warfen Kritiker abends willkuerlich ins Verlies.",
          "Absolutni władcy rano uchwalali dekrety, w południe je egzekwowali, a wieczorem bez sądu wtrącali oponentów do lochów.",
        ),
        T(
          "To safeguard human liberty, political philosophers devised the *separation of powers*: dividing government into three distinct, co-equal branches.",
          "Um die Freiheit dauerhaft zu schuetzen, erfanden Denker die *Gewaltenteilung*: die Aufteilung des Staates in drei unabhaengige Gewalten.",
          "Aby chronić wolność człowieka, myśliciele oświecenia stworzyli *trójpodział władzy*: rozdzielenie państwa na trzy niezależne, równoważące się filary.",
        ),
      ],
      ThreeBranchesLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "The first branch is the *Legislature* (parliament, congress, or diet), elected by citizens to debate and write statutes.",
          "Die erste Gewalt ist die *Legislative* (Parlament), die von den Buergern gewaehlt wird, um Gesetze oeffentlich zu beraten und zu beschliessen.",
          "Pierwszą władzą jest *Legislatywa* (parlament lub sejm), wybierana przez obywateli do tworzenia i uchwalania ustaw.",
        ),
        T(
          "The second branch is the *Executive* (prime minister, president, cabinet, and civil ministries), responsible for administering public programs and enforcing the law.",
          "Die zweite Gewalt ist die *Exekutive* (Regierung, Kanzler, Ministerien), die den Staat fuehrt, Gesetze umsetzt und die Polizei leitet.",
          "Drugą władzą jest *Egzekutywa* (rząd, premier, prezydent i urzędy), odpowiedzialna za wdrażanie ustaw i zarządzanie krajem.",
        ),
        T(
          "The third branch is the *Judiciary* (independent courts and judges), which impartially interprets statutes and adjudicates legal controversies.",
          "Die dritte Gewalt ist die *Judikative* (unabhaengige Gerichte), die Gesetze neutral auslegt und Streitfaelle nach Recht und Gesetz entscheidet.",
          "Trzecią władzą jest *Judykatura* (niezawisłe sądy i trybunały), bezstronnie interpretująca prawo i rozstrzygająca spory.",
        ),
      ],
      ChecksAndBalancesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Separation alone is not enough: the branches must possess *checks and balances* to prevent any single faction from dominating the state.",
          "Trennung allein genuegt nicht: Die Gewalten muessen sich durch *Checks and Balances* gegenseitig kontrollieren und einbremsen.",
          "Sam podział nie wystarcza: gałęzie władzy muszą dysponować systemem *hamulców i równowagi* (checks and balances).",
        ),
        T(
          "If a prime minister abuses power, parliament can pass a vote of no confidence or launch impeachment proceedings.",
          "Missbraucht ein Regierungschef sein Amt, kann das Parlament ein Misstrauensvotum einleiten oder ihn anklagen.",
          "Jeśli premier nadużywa stanowiska, parlament może uchwalić wotum nieufności lub postawić go przed Trybunałem Stanu.",
        ),
        T(
          "Meanwhile, independent constitutional courts can strike down laws passed by parliament if they violate fundamental human rights guaranteed in the constitution.",
          "Verfassungsgerichte wiederum koennen Parlamentsgesetze fuer nichtig erklaeren, wenn diese die Grundrechte verletzen.",
          "Z kolei Trybunał Konstytucyjny może unieważnić ustawę uchwaloną przez sejm, jeśli narusza ona podstawowe prawa zapisane w konstytucji.",
        ),
      ],
      IndependentJudiciaryDiagram,
    ),
    animatedBeat(
      [
        T(
          "In modern open societies, an independent investigative press acts as the vital *Fourth Estate*.",
          "In einer offenen Gesellschaft fungieren freie investigative Medien als unverzichtbare *vierte Gewalt*.",
          "We współczesnym otwartym społeczeństwie wolne i niezależne media pełnią rolę *czwartej władzy*.",
        ),
        T(
          "Journalists scrutinize government spending, uncover bribery, interview whistleblowers, and bring hidden abuses into the daylight of public debate.",
          "Journalisten decken Korruption auf, pruefen Haushaltsausgaben und bringen geheime Fehltritte ans Tageslicht.",
          "Dziennikarze śledczy prześwietlają wydatki rządu, tropią korupcję, rozmawiają z sygnalistami i wyciągają nadużycia na światło dzienne.",
        ),
        T(
          "Without freedom of the press and open information access, corrupt officials can quietly disable constitutional checks in the shadows.",
          "Ohne freie Berichterstattung koennen unredliche Beamte die demokratischen Kontrollen heimlich im Schatten aushebeln.",
          "Bez wolności słowa i dostępu do informacji publicznej skorumpowani urzędnicy mogliby po cichu demontować mechanizmy kontroli.",
        ),
      ],
      FourthEstateDiagram,
    ),
    animatedBeat(
      [
        T(
          "A constitution is not just old parchment: it is an operational architecture designed to preserve freedom across centuries.",
          "Eine Verfassung ist kein altes Papier: Sie ist ein Schutzschild, der die Freiheit ueber Jahrhunderte verteidigt.",
          "Konstytucja to nie tylko zapis historyczny: to żywa architektura państwa, zaprojektowana by strzec wolności kolejnych pokoleń.",
        ),
        T(
          "By dividing authority, encouraging transparent debate, and giving independent judges the spine to uphold civil liberties, societies remain free.",
          "Durch Machtaufteilung, oeffentliche Debatten und mutige, freie Richter bleiben freie Buerger vor Despotismus geschuetzt.",
          "Dzięki podziałowi kompetencji, otwartości debaty i odważnym, bezstronnym sędziom obywatele mogą czuć się bezpieczni przed samowolą władzy.",
        ),
        T(
          "Understanding checks and balances empowers you to protect the institutions that defend human dignity and equal justice.",
          "Wer Checks and Balances versteht, kann die Institutionen verteidigen, die Menschenwuerde und Gerechtigkeit sichern.",
          "Zrozumienie mechanizmów kontroli i równowagi władzy pozwala świadomie bronić instytucji strzegących godności i sprawiedliwości.",
        ),
      ],
      ConstitutionalLibertyDiagram,
    ),
  ],
  toyIntro: T(
    "Test constitutional checks: simulate a presidential veto or judicial constitutional review to observe how power checks power.",
    "Erprobe die Gewaltenteilung: Simuliere ein praesidentielles Veto oder eine Richterpruefung, um zu sehen, wie Macht begrenzt wird.",
    "Przetestuj mechanizmy kontroli władzy: zasymuluj weto prezydenckie lub kontrolę konstytucyjną sądu, aby zobaczyć, jak władza hamuje władzę.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is an independent judiciary essential for a free society?",
        "Warum ist eine unabhaengige Justiz fuer eine freie Gesellschaft unverzichtbar?",
        "Dlaczego niezawisłe sądownictwo jest niezbędne dla wolnego społeczeństwa?",
      ),
      options: [
        {
          text: T(
            "It ensures judges rule based on established law and constitutions without fear of being fired or retaliated against by politicians",
            "Sie gewaehrleistet, dass Richter nach Gesetz und Verfassung urteilen, ohne Angst vor Entlassung oder politischer Rache haben zu muessen",
            "Gwarantuje, że sędziowie orzekają na podstawie ustaw i konstytucji bez lęku przed zwolnieniem z pracy czy zemstą ze strony polityków",
          ),
          correct: true,
        },
        {
          text: T(
            "It gives judges the right to paint all courthouse walls neon yellow",
            "Sie erlaubt es Richtern, saemtliche Gerichtssaele neongelb zu streichen",
            "Daje sędziom prawo do przemalowywania sal rozpraw na kolor jaskrawożółty",
          ),
          correct: false,
        },
        {
          text: T(
            "It allows courts to cancel winter vacations for all school teachers",
            "Sie ermoeglicht es Gerichten, den Winterurlaub fuer Lehrer zu streichen",
            "Pozwala sądom na odwoływanie ferii zimowych dla wszystkich nauczycieli",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about what happens to a citizen in court if the judge can be dismissed the next morning by the president they are suing.",
        "Ueberlege, was vor Gericht geschieht, wenn der Richter am naechsten Tag vom Praesidenten entlassen werden kann, gegen den geklagt wird.",
        "Zastanów się, jakie szanse ma obywatel w sądzie, jeśli orzekający sędzia może zostać nazajutrz odwołany przez premiera, z którym obywatel toczy spór.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What are 'checks and balances' in constitutional law?",
        "Was versteht man unter 'Checks and Balances' im Verfassungsrecht?",
        "Czym są 'checks and balances' (hamulce i równowaga) w prawie konstytucyjnym?",
      ),
      options: [
        {
          text: T(
            "Constitutional powers given to each branch of government to oversee, limit, and counterbalance the actions of the other branches",
            "Verfassungsrechtliche Befugnisse jeder Staatsgewalt, die Handlungen der anderen Gewalten zu kontrollieren und einzuschraenken",
            "Konstytucyjne uprawnienia każdej z władz do nadzorowania, hamowania i równoważenia działań pozostałych gałęzi państwa",
          ),
          correct: true,
        },
        {
          text: T(
            "Checking bank account balances every Friday afternoon before closing",
            "Die Pruefung des Kontostands am Freitagnachmittag vor Bankschluss",
            "Sprawdzanie salda na rachunku bankowym w każdy piątkowy wieczór",
          ),
          correct: false,
        },
        {
          text: T(
            "Balancing stacks of paper on top of parliamentary desks",
            "Das Balancieren von Papierstapeln auf Parlamentsschreibtischen",
            "Ustawianie stosów dokumentów na biurkach poselskich w celu utrzymania równowagi",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about the veto power, impeachment, and judicial constitutional review.",
        "Denke an Vetorechte, Amtsenthebungsverfahren und die gerichtliche Normenkontrolle.",
        "Pomyśl o prawie weta, procedurze impeachmentu oraz kontroli konstytucyjności ustaw przez trybunał.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the primary duty of the judicial branch in a constitutional democracy.",
        "Bestimme die Hauptaufgabe der Judikative in einer Verfassungsdemokratie.",
        "Wskaż podstawową rolę władzy sądowniczej w demokratycznym państwie prawnym.",
      ),
      Widget: BranchesWidget,
      hint: T(
        "Focus on statutory interpretation, civil dispute resolution, and constitutional review.",
        "Achte auf Rechtsauslegung, Streitschlichtung und Normenkontrolle.",
        "Zwróć uwagę na wykładnię prawa, rozstrzyganie sporów oraz badanie zgodności ustaw z konstytucją.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Can they name an example where a high court struck down an unlawful government policy or law?",
    "Frage deine Eltern: Kennen sie ein historisches Beispiel, bei dem ein oberstes Gericht ein rechtswidriges Regierungsgesetz gekippt hat?",
    "Zapytaj rodziców: Czy pamiętają wyrok sądu najwyższego lub trybunału konstytucyjnego, który uchylił bezprawną ustawę rządu?",
  ),
  realLife: {
    title: T(
      "Real world: Montesquieu's Spirit of the Laws (1748) and the German Basic Law's 'Ewigkeitsklausel'",
      "Echte Welt: Montesquieus Geist der Gesetze und die Ewigkeitsklausel des deutschen Grundgesetzes",
      "Prawdziwy świat: Duch praw Monteskiusza i 'klauzula wieczności' w Konstytucji Niemiec",
    ),
    body: T(
      "In 1748, French philosopher Baron de Montesquieu published 'The Spirit of the Laws', warning that when legislative and executive powers are united in the same person, there can be no liberty. In 1949, post-war Germany encoded this lesson into Article 79(3) of its Basic Law (the 'Eternity Clause'), making the separation of powers and fundamental human dignity permanently immune to constitutional amendments, even by unanimous parliamentary vote.",
      "1748 veroeffentlichte Montesquieu 'Vom Geist der Gesetze' und mahnte: Wenn gesetzgebende und vollziehende Gewalt zusammenfallen, gibt es keine Freiheit. 1949 verankerte die Bundesrepublik Deutschland diese Lehre in Artikel 79 Absatz 3 des Grundgesetzes (Ewigkeitsklausel): Die Gewaltenteilung und die Menschenwuerde koennen selbst durch einen einstimmigen Parlamentsbeschluss niemals abgeschafft werden.",
      "W 1748 roku Monteskiusz opublikował 'O duchu praw', dowodząc, że połączenie władzy ustawodawczej i wykonawczej prowadzi nieuchronnie do tyranii. W 1949 roku Niemcy wpisały tę zasadę do art. 79 ust. 3 Ustawy Zasadniczej jako tzw. 'klauzulę wieczności' (Ewigkeitsklausel): podział władz oraz godność człowieka nigdy nie mogą zostać zmienione, nawet jednogłośną decyzją parlamentu.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Baron de Montesquieu articulated the tripartite separation of powers in 'De l'esprit des lois' (The Spirit of the Laws) in 1748.",
          "Montesquieu formulierte die dreiteilige Gewaltenteilung 1748 in seinem Werk 'De l'esprit des lois'.",
          "Monteskiusz sformułował klasyczną koncepcję trójpodziału władzy w dziele 'O duchu praw' w 1748 roku.",
        ),
        source: "https://www.britannica.com/biography/Montesquieu",
      },
      {
        text: T(
          "James Madison famously argued in Federalist No. 51 (1788) that 'Ambition must be made to counteract ambition' to prevent government tyranny.",
          "James Madison erklaerte 1788 in 'Federalist No. 51', dass Ehrgeiz dem Ehrgeiz entgegenwirken muss, um Machtmissbrauch zu verhindern.",
          "James Madison napisał w 'Federalist No. 51' (1788), że 'ambicja musi równoważyć ambicję', aby zapobiec monopolizacji władzy.",
        ),
        source: "https://avalon.law.yale.edu/18th_century/fed51.asp",
      },
      {
        text: T(
          "Chief Justice John Marshall established the doctrine of judicial review in the landmark 1803 US Supreme Court case Marbury v. Madison.",
          "Der US Supreme Court begruendete 1803 im Praezedenzfall Marbury v. Madison das Recht der Verfassungsgerichtsbarkeit.",
          "Sędzia John Marshall ugruntował prawo sądów do badania zgodności ustaw z konstytucją w przełomowej sprawie Marbury v. Madison z 1803 roku.",
        ),
        source: "https://www.oyez.org/cases/1789-1850/5us137",
      },
      {
        text: T(
          "Article 79, Paragraph 3 of the German Basic Law permanently prohibits any constitutional amendment that abolishes the separation of powers.",
          "Artikel 79 Absatz 3 des Grundgesetzes untersagt jede Aenderung, welche die Gewaltenteilung antastet.",
          "Artykuł 79 ust. 3 Ustawy Zasadniczej RFN bezwzględnie zakazuje jakichkolwiek zmian konstytucji znoszących podział władz.",
        ),
        source: "https://www.gesetze-im-internet.de/gg/art_79.html",
      },
      {
        text: T(
          "The European Court of Human Rights enforces Article 6 of the European Convention on Human Rights, guaranteeing an independent and impartial tribunal established by law.",
          "Der Europaeische Gerichtshof fuer Menschenrechte sichert gemaess Artikel 6 EMRK das Recht auf ein unabhaengiges Gericht.",
          "Europejski Trybunał Praw Człowieka stoi na straży art. 6 Europejskiej Konwencji Praw Człowieka, gwarantującego prawo do bezstronnego i niezawisłego sądu.",
        ),
        source: "https://www.echr.coe.int/documents/d/echr/convention_ENG",
      },
    ],
    simplified: [
      T(
        "Complex institutional checks and balances and constitutional court doctrines are translated through intuitive triangle balance diagrams and practical scenarios.",
        "Komplexe staatsrechtliche Pruefverfahren und Verfassungsrechtssaetze wurden in uebersichtlichen Schaubildern und lebensnahen Beispielen dargestellt.",
        "Złożone procedury kontroli konstytucyjnej i wzajemnego hamowania władz przedstawiono w postaci czytelnych diagramów i praktycznych przykładów.",
      ),
    ],
  },
};
