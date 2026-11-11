import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function AuthoritarianWarningLaunchDiagram({ lang, step }: DiagramProps) {
  const anjaliName = lang === "pl" ? "Alicja" : lang === "de" ? "Anna" : "Anjali";
  const label =
    lang === "pl"
      ? "Alicja analizuje mechanizmy dyktatury i autorytaryzmu"
      : lang === "de"
        ? "Anna untersucht die Mechanismen von Diktatur und Autoritarismus"
        : "Anjali analyzing the political mechanisms of dictatorship and authoritarianism";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#dc2626"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#dc2626" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#450a0a" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#991b1b"
          stroke="#dc2626"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fca5a5">
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
          stroke="#dc2626"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#fecaca">
          ⚠️{" "}
          {lang === "pl"
            ? "Dyktatura: Monopol Władzy i Strach"
            : lang === "de"
              ? "Diktatur: Machtmonopol & Zensur"
              : "Dictatorship: Authoritarian Power"}
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
            stroke="#ef4444"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="18">
            🔒 🚫 📺 ⛓️
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#f87171"
          >
            {lang === "pl"
              ? "Cenzura prasy, likwidacja sądów i brak wyborów"
              : lang === "de"
                ? "Zensur freier Medien und Verbot der Opposition"
                : "Censorship, secret police, and fake elections"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#7f1d1d" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Pętla ślepoty informacyjnej dyktatora"
              : lang === "de"
                ? "Die Informationsfalle des Autokraten"
                : "The dictator's fatal information trap"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#fee2e2">
            {lang === "pl"
              ? "Gdy prawda jest karana, nikt nie zgłasza błędów"
              : lang === "de"
                ? "Wer Fehler meldet, wird bestraft: Systemversagen"
                : "When truth is treason, systems rot from within"}
          </text>
        </g>
      )}
    </svg>
  );
}

function SilencedChannelsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Likwidacja instytucjonalnych bezpieczników w dyktaturze"
      : lang === "de"
        ? "Beseitigung institutioneller Schutzmechanismen in der Diktatur"
        : "Dismantling institutional safeguards under dictatorship";

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
          width="100"
          height="75"
          rx="6"
          fill="#fee2e2"
          stroke="#dc2626"
          strokeWidth="1.5"
        />
        <text x="80" y="70" textAnchor="middle" fontSize="16">
          📰 🚫
        </text>
        <text x="80" y="90" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b">
          Free Press
        </text>
        <text x="80" y="105" textAnchor="middle" fontSize="7.5" fill="#b91c1c">
          Muzzled / state TV
        </text>

        <rect
          x="150"
          y="45"
          width="100"
          height="75"
          rx="6"
          fill="#fee2e2"
          stroke="#dc2626"
          strokeWidth="1.5"
        />
        <text x="200" y="70" textAnchor="middle" fontSize="16">
          ⚖️ 🚫
        </text>
        <text x="200" y="90" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b">
          Courts
        </text>
        <text x="200" y="105" textAnchor="middle" fontSize="7.5" fill="#b91c1c">
          Purged of critics
        </text>

        <rect
          x="270"
          y="45"
          width="100"
          height="75"
          rx="6"
          fill="#fee2e2"
          stroke="#dc2626"
          strokeWidth="1.5"
        />
        <text x="320" y="70" textAnchor="middle" fontSize="16">
          🗳️ 🚫
        </text>
        <text x="320" y="90" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b">
          Elections
        </text>
        <text x="320" y="105" textAnchor="middle" fontSize="7.5" fill="#b91c1c">
          Sham / rigged results
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#1e293b" />
          <text
            x="200"
            y="153"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#f87171"
          >
            Totalitarian control: eliminates any legal channel for dissent
          </text>
          <text x="200" y="167" textAnchor="middle" fontSize="9" fill="#94a3b8">
            {lang === "pl"
              ? "Wszelka krytyka jest traktowana jako zdrada państwa"
              : lang === "de"
                ? "Jede Form von Widerspruch wird als Staatsverrat verfolgt"
                : "Political opposition is declared criminal and ruthlessly suppressed"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="34" rx="6" fill="#7f1d1d" />
          <text x="200" y="206" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Bez wolnej prasy korupcja i marnotrawstwo rozrastają się bez przeszkód"
              : lang === "de"
                ? "Ohne freie Presse bluehen Korruption und Fehlentscheidungen im Verborgenen"
                : "Without an independent press, corruption metastasizes without daylight"}
          </text>
          <text x="200" y="218" textAnchor="middle" fontSize="8.5" fill="#fca5a5">
            {lang === "pl"
              ? "Światło prawdy jest jedynym lekarstwem na bezprawie"
              : lang === "de"
                ? "Transparenz ist der einzige Schutz vor Willkuer"
                : "Sunlight and open scrutiny are the sole guarantees of integrity"}
          </text>
        </g>
      )}
    </svg>
  );
}

function InformationCascadeFailureDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Katastrofa pętli informacyjnej: pochlebcy ukrywają prawdę przed autokratą"
      : lang === "de"
        ? "Die Informationsfalle: Schmeichler verschweigen dem Herrscher die Realitaet"
        : "Information cascade failure: sycophants concealing catastrophic reality";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fff1f2"
        stroke="#e11d48"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="85" r="30" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.5" />
        <text x="80" y="80" textAnchor="middle" fontSize="14">
          👷 🌊
        </text>
        <text x="80" y="98" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#9f1239">
          Engineers see leak
        </text>
        <circle cx="200" cy="85" r="30" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.5" />
        <text x="200" y="80" textAnchor="middle" fontSize="14">
          🤐 📁
        </text>
        <text x="200" y="98" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#9f1239">
          Bureaucrats censor
        </text>
        <circle cx="320" cy="85" r="30" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.5" />
        <text x="320" y="80" textAnchor="middle" fontSize="14">
          👑 🕶️
        </text>
        <text x="320" y="98" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#9f1239">
          Dictator misled
        </text>
        <path d="M 115 85 L 165 85" stroke="#e11d48" strokeWidth="2" />
        <path d="M 235 85 L 285 85" stroke="#e11d48" strokeWidth="2" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="135" width="300" height="42" rx="6" fill="#881337" />
          <text
            x="200"
            y="153"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Ponieważ posłaniec złych wiadomości jest karany, każdy kłamie, że wszystko działa świetnie"
              : lang === "de"
                ? "Weil Ueberbringer schlechter Nachrichten bestraft werden, melden alle nur Erfolge"
                : "When bearers of bad news are purged, subordinates fabricate fictitious triumphs"}
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8.5" fill="#fecdd3">
            {lang === "pl"
              ? "Tama pęka, most runie, a gospodarka załamuje się w fałszywym poczuciu sukcesu"
              : lang === "de"
                ? "Dämme brechen und Ernten verfaulen, waehrend Jubelberichte die Wahrheit verdraengen"
                : "Dams burst and harvests fail while glossy reports deceive the isolated regime"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Wolność słowa to nie luksus, lecz niezbędny termometr systemowy"
              : lang === "de"
                ? "Freie Rede ist der unverzichtbare Fehlersensor jeder Gesellschaft"
                : "Free speech is the indispensable sensor network of a functional civilization"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DemocraticSafeguardsMeshDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Instytucjonalne tarcze chroniące przed tyranią"
      : lang === "de"
        ? "Institutionelle Schutzschilde gegen die Tyrannei"
        : "Institutional armor against autocratic creep";

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
          width="95"
          height="75"
          rx="6"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <text x="82" y="70" textAnchor="middle" fontSize="16">
          🏛️ ⚖️
        </text>
        <text x="82" y="90" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">
          Supreme Court
        </text>
        <text x="82" y="105" textAnchor="middle" fontSize="7.5" fill="#2563eb">
          Judicial review
        </text>

        <rect
          x="152"
          y="45"
          width="95"
          height="75"
          rx="6"
          fill="#ecfdf5"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <text x="199" y="70" textAnchor="middle" fontSize="16">
          🗳️ ⏱️
        </text>
        <text x="199" y="90" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#065f46">
          Term Limits
        </text>
        <text x="199" y="105" textAnchor="middle" fontSize="7.5" fill="#059669">
          Regular elections
        </text>

        <rect
          x="270"
          y="45"
          width="95"
          height="75"
          rx="6"
          fill="#fdf4ff"
          stroke="#c084fc"
          strokeWidth="1.5"
        />
        <text x="317" y="70" textAnchor="middle" fontSize="16">
          📡 🛡️
        </text>
        <text x="317" y="90" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7e22ce">
          Free Press
        </text>
        <text x="317" y="105" textAnchor="middle" fontSize="7.5" fill="#9333ea">
          Investigative audit
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="44" rx="6" fill="#1e293b" />
          <text
            x="200"
            y="153"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#38bdf8"
          >
            Checks & balances prevent any single branch from seizing absolute control
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8.5" fill="#94a3b8">
            {lang === "pl"
              ? "Konstytucja ogranicza każdego przywódcę niezależnie od jego popularności"
              : lang === "de"
                ? "Die Verfassung bindet jeden Machthaber, unabhaengig von seiner Popularitaet"
                : "Codified rights place personal freedom beyond the whim of any temporary majority"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#0f766e" />
          <text x="200" y="212" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Ceną wolności jest nieustanna czujność obywatelska"
              : lang === "de"
                ? "Ewige Wachsamkeit ist der Preis der Freiheit"
                : "Eternal civic vigilance is the non-negotiable cost of liberty"}
          </text>
        </g>
      )}
    </svg>
  );
}

function UniversalDignityFlourishDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Społeczeństwo otwarte: godność jednostki i pokój społeczny"
      : lang === "de"
        ? "Offene Gesellschaft: Menschenwuerde, Pluralismus und Frieden"
        : "The open society: individual dignity, human rights, and social peace";

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
        <circle cx="200" cy="85" r="35" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fontSize="20">
          🕊️ 🌍
        </text>
        <text x="200" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#581c87">
          Human Dignity
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="135" width="300" height="42" rx="6" fill="#581c87" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            "Democracy is the worst form of government, except for all the others"
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8.5" fill="#e9d5ff">
            Winston S. Churchill
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Demokracja umożliwia pokojową zmianę władzy bez rozlewu krwi"
              : lang === "de"
                ? "Demokratien ermoeglichen den friedlichen Machtwechsel ohne Blutvergiessen"
                : "Democracy guarantees the peaceful transfer of power without firing a single bullet"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [pressFreedom, setPressFreedom] = useState(20);
  const [judicialIndependence, setJudicialIndependence] = useState(20);
  const safetyScore = pressFreedom + judicialIndependence;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Press Freedom: {pressFreedom}% | Independent Courts: {judicialIndependence}% | Resilience:{" "}
        {safetyScore}/200
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setPressFreedom((p) => {
              const next = Math.min(100, p + 25);
              if (next + judicialIndependence >= 150) onDone?.();
              return next;
            });
          }}
        >
          Protect Investigative Journalism (+25%)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setJudicialIndependence((j) => {
              const next = Math.min(100, j + 25);
              if (pressFreedom + next >= 150) onDone?.();
              return next;
            });
          }}
        >
          Strengthen Judicial Independence (+25%)
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: safetyScore >= 150 ? "#eef8ef" : "#fef2f2",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {safetyScore >= 150
          ? "Robust Open Society: Whistleblowers can speak out without fear, corrupt politicians are exposed in print, and judges protect universal human rights!"
          : "Vulnerable to Autocracy: Weak press protections and compliant courts allow ambitious leaders to silence critics and seize unchecked power."}
      </div>
    </div>
  );
}

function DictatorshipWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        Why do authoritarian dictatorships almost always suffer catastrophic administrative
        failures?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Because rulers don't have enough computers in their office
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        Because suppressing dissent terrifies subordinates into hiding mistakes, cutting off the
        leader from accurate reality
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Because ink cartridges run out faster under single-party rule
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "dictatorship",
  story: [
    animatedBeat(
      [
        T(
          "Meet Anjali. She reads an international human rights report documenting how an autocrat in another country dismantled democracy piece by piece.",
          "Das ist Anna. Sie liest einen internationalen Menschenrechtsbericht darueber, wie ein Autokrat Stueck fuer Stueck die Demokratie zerlegte.",
          "Poznaj Alicję. Czyta raport organizacji praw człowieka opisujący, jak pewien autokrata krok po kroku zdemontował instytucje demokratyczne.",
        ),
        T(
          "The leader started with attractive promises: rapid decisions, zero political arguing, and swift national unity.",
          "Der Machthaber begann mit verfuehrerischen Versprechen: schnelle Beschluesse, kein Parteienstreit und pure Effizienz.",
          "Przywódca zaczął od chwytliwych obietnic: błyskawicznych decyzji, zakończenia kłótni polityków i pełnej jedności narodowej.",
        ),
        T(
          "A *dictatorship* is a political system where an individual or tight ruling clique holds absolute power, unchecked by law, independent judges, or genuine elections.",
          "Eine *Diktatur* ist ein System, in dem ein Machthaber oder eine Junta absolute Kontrolle ohne freie Gerichte oder Wahlen ausuebt.",
          "W ustroju *dyktatury* jednostka lub wąska junta wojskowa skupia absolutną władzę, niepodlegającą kontroli sądów, prawa ani uczciwych wyborów.",
        ),
      ],
      AuthoritarianWarningLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "To consolidate total control, authoritarian regimes systematically shut down every institutional safeguard that protects citizens.",
          "Um ihre Macht zu zementieren, schalten Diktatoren systematisch alle demokratischen Schutzschilde aus.",
          "Aby ugruntować władzę absolutną, reżim autorytarny systematycznie niszczy wszelkie instytucjonalne bezpieczniki chroniące obywateli.",
        ),
        T(
          "Independent newspapers, radio stations, and websites are seized or outlawed, replacing honest reporting with synchronized state propaganda.",
          "Unabhaengige Zeitungen, Radiosender und Blogs werden verboten und durch gleichgeschaltete Staatspropaganda ersetzt.",
          "Niezależne gazety, stacje radiowe i portale internetowe są likwidowane lub cenzurowane, a ich miejsce zajmuje państwowa propaganda.",
        ),
        T(
          "Opposition candidates are disqualified or jailed, independent judges are replaced with party loyalists, and public protests are broken up by riot police.",
          "Oppositionelle werden verhaftet, freie Richter entlassen und friedliche Demonstrationen durch Polizeigewalt erstickt.",
          "Działacze opozycji trafiają do więzień, uczciwi sędziowie są zastępowani lojalistami, a pokojowe demonstracje są brutalnie pacyfikowane.",
        ),
      ],
      SilencedChannelsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Paradoxically, absolute power produces terrible administrative blindness known as the *dictator's information trap*.",
          "Paradoxerweise fuehrt absolute Macht zu fataler administrativer Blindheit: der *Informationsfalle des Autokraten*.",
          "Paradoksalnie władza absolutna prowadzi do zgubnej ślepoty decyzyjnej, zwanej *pułapką informacyjną dyktatora*.",
        ),
        T(
          "When an autocrat ruthlessly executes, imprisons, or fires anyone who delivers unpleasant news, subordinates learn to tell the ruler only flattering lies.",
          "Wenn ein Herrscher jeden bestraft, der schlechte Nachrichten bringt, lernen Untergebene, Probleme zu vertuschen und Erfolge zu erfinden.",
          "Gdy przywódca karze każdego, kto przynosi złe wiadomości, urzędnicy i generałowie uczą się fałszować raporty i mówić tylko to, co władca chce usłyszeć.",
        ),
        T(
          "Flawed dams, failing harvest quotas, leaking toxic pipes, and corrupt supply chains are hidden away until catastrophe strikes the entire nation.",
          "Geborstene Rohre, Missernten und verrottende Infrastruktur bleiben im Verborgenen, bis das ganze Land in die Katastrophe schlittert.",
          "Pękające tamy, sfałszowane zbiory zbóż i gnijąca infrastruktura są ukrywane w tajemnicy, dopóki kraj nie stanie w obliczu katastrofy.",
        ),
      ],
      InformationCascadeFailureDiagram,
    ),
    animatedBeat(
      [
        T(
          "To safeguard human dignity, democratic societies weave robust institutional defenses directly into codified constitutions.",
          "Um die Freiheit dauerhaft zu sichern, verankern Demokratien wehrhafte Schutzschilde fest in ihrer Verfassung.",
          "Aby chronić godność człowieka, wolne społeczeństwa wprowadzają do konstytucji żelazne mechanizmy obronne.",
        ),
        T(
          "Constitutional courts possess the authority to strike down unlawful government decrees, while strictly enforced term limits prevent leaders from ruling indefinitely.",
          "Verfassungsgerichte koennen unrechtmaessige Erlasse kippen, und feste Amtszeitbegrenzungen verhindern Machtkonzentration.",
          "Trybunały konstytucyjne mają moc uchylania bezprawnych dekretów, a kadencyjność uniemożliwia przywódcom dożywotnie trzymanie się władzy.",
        ),
        T(
          "An energetic free press and investigative whistleblowers ensure that wrongdoing inside ministries is dragged into public sunlight.",
          "Eine unerschrockene freie Presse und Whistleblower zerren Amtsmissbrauch und Korruption unnachgiebig ans Tageslicht.",
          "Niezależne media i dziennikarze śledczy sprawiają, że wszelkie nadużycia władzy są natychmiast ujawniane opinii publicznej.",
        ),
      ],
      DemocraticSafeguardsMeshDiagram,
    ),
    animatedBeat(
      [
        T(
          "Freedom of speech is not merely an abstract moral philosophy; it is the vital sensory nervous system of an adaptable civilization.",
          "Meinungsfreiheit ist kein theoretischer Luxus, sondern das unverzichtbare Nervensystem einer lebendigen Zivilisation.",
          "Wolność słowa to nie abstrakcyjny luksus, lecz niezbędny układ nerwowy zdrowego i rozwijającego się społeczeństwa.",
        ),
        T(
          "In democracies, elections provide a regular, peaceful mechanism to fire failing politicians without bloodshed, barricades, or civil wars.",
          "In Demokratien ermoeglichen Wahlen die friedliche Abwahl schlechter Politiker ganz ohne Buergerkrieg und Gewalt.",
          "W demokracji wybory zapewniają regularną, w pełni pokojową możliwość wymiany nieudolnych przywódców bez rozlewu krwi i wojen domowych.",
        ),
        T(
          "Understanding how dictatorships seize power reminds every generation that democracy is not automatic: it requires active defense and constant participation.",
          "Das Verstaendnis autoritaerer Gefahren erinnert uns daran: Freiheit ist nicht selbstverstaendlich, sondern muss taeglich gelebt und geschuetzt werden.",
          "Zrozumienie mechanizmów autorytaryzmu przypomina każdemu pokoleniu, że demokracja nie jest dana raz na zawsze: wymaga zaangażowania i stałej obrony praworządności.",
        ),
      ],
      UniversalDignityFlourishDiagram,
    ),
  ],
  toyIntro: T(
    "Defend the open society: invest in free investigative journalism and judicial independence to protect the constitutional republic from authoritarian takeover.",
    "Verteidige die offene Gesellschaft: Staerke freien Journalismus und unabhaengige Gerichte, um die Republik vor autoritaerer Vereinnahmung zu bewahren.",
    "Broń otwartego społeczeństwa: inwestuj w niezależne dziennikarstwo śledcze i niezawisłe sądy, chroniąc republikę przed pokusami autorytaryzmu.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the 'dictator's information trap' in authoritarian governance?",
        "Was versteht man unter der 'Informationsfalle des Autokraten'?",
        "Czym jest 'pułapka informacyjna dyktatora' w ustrojach autorytarnych?",
      ),
      options: [
        {
          text: T(
            "Because subordinates fear severe punishment for reporting problems, they hide failures and report flattering lies, leaving the leader blind to mounting crises",
            "Weil Untergebene aus Angst vor Strafen Probleme verschweigen und nur Erfolge melden, bleibt der Herrscher blind fuer reale Krisen",
            "Ponieważ podwładni boją się kar za złe wiadomości, ukrywają błędy i składają fałszywe meldunki, pozbawiając władcę wiedzy o narastających problemach",
          ),
          correct: true,
        },
        {
          text: T(
            "The dictator drops their secret decoder ring down an elevator shaft",
            "Der Diktator verliert seinen geheimen Schluessel im Aufzugschacht",
            "Dyktator gubi tajny klucz szyfrujący w szybie windy",
          ),
          correct: false,
        },
        {
          text: T(
            "Government computers automatically delete all email attachments on Fridays",
            "Behoerdencomputer loeschen jeden Freitag automatisch alle Dateianhaenge",
            "Komputery w ministerstwach usuwają w piątki wszystkie załączniki",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about what happens to honest feedback when telling the truth gets you arrested.",
        "Ueberlege, was mit ehrlicher Rueckmeldung geschieht, wenn die Wahrheit ins Gefaengnis fuehrt.",
        "Pomyśl o tym, co dzieje się ze szczerymi raportami, gdy za mówienie prawdy grozi więzienie.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Which constitutional mechanism is essential for preventing power from concentrating permanently in one person?",
        "Welcher verfassungsrechtliche Mechanismus verhindert dauerhaft die Machtkonzentration in einer Person?",
        "Jaki mechanizm konstytucyjny skutecznie zapobiega trwałej koncentracji władzy w jednych rękach?",
      ),
      options: [
        {
          text: T(
            "Codified term limits, separation of powers with independent judicial review, and regularly scheduled competitive elections",
            "Feste Amtszeitbegrenzungen, Gewaltenteilung mit unabhaengigen Verfassungsgerichten und regelmaessige freie Wahlen",
            "Sztywne ograniczenia kadencyjności, trójpodział władzy z niezawisłymi sądami oraz regularne, uczciwe wybory",
          ),
          correct: true,
        },
        {
          text: T(
            "Painting all administrative buildings bright neon orange",
            "Das Streichen aller Behoerdengebaeude in leuchtendem Orange",
            "Pomalowanie wszystkich gmachów rządowych na jaskrawy pomarańcz",
          ),
          correct: false,
        },
        {
          text: T(
            "Distributing free caramel popcorn to city bus passengers on weekends",
            "Das Verteilen von suessem Popcorn an Buspassagiere am Wochenende",
            "Rozdawanie darmowego popcornu pasażerom autobusów miejskich",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Look for the legal safeguards that limit how long leaders rule and subject their actions to court review.",
        "Achte auf rechtliche Schranken, die Amtszeiten begrenzen und Erlasse gerichtlich pruefen.",
        "Zwróć uwagę na prawne bezpieczniki, które ograniczają czas sprawowania urzędu i poddają decyzje kontroli sądowej.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze why the systematic suppression of dissent causes administrative systems to fail.",
        "Analysiere, warum die systematische Unterdrueckung von Kritik zum Scheitern von Staaten fuehrt.",
        "Przeanalizuj, dlaczego tłumienie krytyki prowadzi do paraliżu i upadku struktur państwowych.",
      ),
      Widget: DictatorshipWidget,
      hint: T(
        "Focus on how fear corrupts internal reporting, eliminating error correction.",
        "Achte darauf, wie Angst Fehlerberichte verhindert und Systemkorrekturen zerstoert.",
        "Zwróć uwagę na to, jak strach niszczy rzetelny przepływ informacji i uniemożliwia naprawę błędów.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Why is a free and energetic press often called the 'Fourth Estate' in a constitutional democracy?",
    "Frage deine Eltern: Warum wird eine freie Presse in Demokratien oft als 'Vierte Gewalt' bezeichnet?",
    "Zapytaj rodziców: Dlaczego wolne i niezależne media są w demokracji nazywane 'czwartą władzą'?",
  ),
  realLife: {
    title: T(
      "Real world: The Chernobyl nuclear catastrophe of 1986 and the collapse of totalitarian secrecy",
      "Echte Welt: Die Reaktorkatastrophe von Tschernobyl 1986 und das Scheitern totalitaerer Zensur",
      "Prawdziwy świat: Katastrofa w Czarnobylu w 1986 r. i upadek totalitarnej blokady informacyjnej",
    ),
    body: T(
      "On April 26, 1986, Reactor No. 4 at the Chernobyl nuclear plant exploded. Because Soviet officials prioritized state prestige and political secrecy over human life, the regime initially concealed the catastrophe, refusing to evacuate nearby families or warn European neighbors until Swedish monitoring stations detected massive radiation clouds 1,100 km away. The deadly tragedy exposed the mortal dangers of state censorship and accelerated Soviet leader Mikhail Gorbachev's adoption of 'Glasnost' (openness), demonstrating that suppressing truth destroys societal resilience.",
      "Am 26. April 1986 explodierte Reaktor 4 im Atomkraftwerk Tschernobyl. Weil das Sowjetregime Geheimhaltung und Parteiprestige ueber Menschenleben stellte, vertuschte Moskau die Katastrophe tagelang, bis schwedische Messstationen radioaktive Wolken meldeten. Die toedliche Tragoedie fuehrte Michail Gorbatschow vor Augen, wie toedlich Zensur ist, und beschleunigte seine Politik der 'Glasnost' (Offenheit), die schliesslich zum Ende des totalitaeren Systems beitrug.",
      "26 kwietnia 1986 r. eksplodował czwarty reaktor elektrowni w Czarnobylu. Władze sowieckie stawiały prestiż i tajemnicę ponad życie obywateli, ukrywając wybuch przed światem, dopóki stacje pomiarowe w Szwecji nie wykryły chmury radioaktywnej. Tragedia ta ukazała śmiertelne skutki cenzury i skłoniła Michaiła Gorbaczowa do ogłoszenia polityki 'Głasnosti' (jawności), dowodząc, że tłumienie prawdy niszczy państwo od środka.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Hannah Arendt published 'The Origins of Totalitarianism' in 1951, analyzing how state terror and propaganda dismantle civic institutions.",
          "Hannah Arendt veroeffentlichte 1951 'Elemente und Urspruenge totaler Herrschaft' ueber die Zerstoerung freier Gesellschaften.",
          "Hannah Arendt opublikowała w 1951 r. dzieło 'Korzenie totalitaryzmu', analizując niszczenie instytucji przez terror i propagandę.",
        ),
        source:
          "https://www.penguinrandomhouse.com/books/4405/the-origins-of-totalitarianism-by-hannah-arendt/",
      },
      {
        text: T(
          "Freedom House has published annual 'Freedom in the World' comparative assessments of global civil liberties and political rights since 1973.",
          "Freedom House bewertet seit 1973 im Jahresbericht 'Freedom in the World' den globalen Zustand von Freiheitsrechten.",
          "Freedom House publikuje od 1973 roku coroczny raport 'Freedom in the World' badający stan swobód obywatelskich na świecie.",
        ),
        source: "https://freedomhouse.org/report/freedom-world",
      },
      {
        text: T(
          "Article 19 of the Universal Declaration of Human Rights guarantees the right to freedom of opinion and expression across all borders.",
          "Artikel 19 der UN-Menschenrechtserklaerung garantiert die Freiheit der Meinung und des Informationsflusses.",
          "Artykuł 19 Powszechnej Deklaracji Praw Człowieka gwarantuje prawo do wolności poglądów i swobodnego rozpowszechniania informacji.",
        ),
        source: "https://www.un.org/en/about-us/universal-declaration-of-human-rights",
      },
      {
        text: T(
          "The 22nd Amendment to the United States Constitution, ratified in 1951, codified formal two-term limits on executive presidential power.",
          "Der 22. Verfassungszusatz der USA von 1951 begrenzte die Praesidentschaft auf maximal zwei Amtszeiten.",
          "22. Poprawka do Konstytucji USA, ratyfikowana w 1951 r., formalnie ograniczyła sprawowanie urzędu prezydenta do dwóch kadencji.",
        ),
        source: "https://constitution.congress.gov/constitution/amendment-22/",
      },
      {
        text: T(
          "Reporters Without Borders (RSF) publishes the annual World Press Freedom Index evaluating journalistic autonomy and censorship across 180 countries.",
          "Reporter ohne Grenzen veroeffentlicht jaehrlich die Rangliste der Pressefreiheit fuer 180 Staaten.",
          "Reporterzy bez Granic (RSF) publikują doroczny Światowy Indeks Wolności Prasy oceniający cenzurę w 180 państwach.",
        ),
        source: "https://rsf.org/en/index",
      },
    ],
    simplified: [
      T(
        "Complex totalitarian surveillance frameworks, political police doctrines, and authoritarian legal codes are translated into intuitive institutional defense sliders and feedback loop diagrams.",
        "Komplexe Ueberwachungsapparate und autoritaere Rechtslehren wurden durch Schutzschilde und Informationskreislaeufe verstaendlich gemacht.",
        "Skomplikowane mechanizmy inwigilacji, cenzury i doktryny państwa policyjnego wyjaśniono za pomocą przejrzystych suwaków wolności mediów i schematów obiegu informacji.",
      ),
    ],
  },
};
