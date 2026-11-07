import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function EmergencyRescueLaunchDiagram({ lang, step }: DiagramProps) {
  const abhiName = lang === "pl" ? "Tymon" : lang === "de" ? "Tim" : "Abhi";
  const label = lang === "pl" ? "Tymon bada problem pakietów ratunkowych i pokusy nadużycia" : lang === "de" ? "Tim analysiert staatliche Rettungspakete und Moral Hazard" : "Abhi inspecting emergency financial bailouts and moral hazard dilemma";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#ec4899" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#ec4899" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#831843" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#db2777" stroke="#ec4899" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#f472b6">{abhiName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#fbcfe8">
          🛟 {lang === "pl" ? "Pakiety Ratunkowe: Dylemat" : lang === "de" ? "Staatliche Rettungspakete" : "Bailouts: The Systemic Dilemma"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#db2777" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">🏢 💥 🚑</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#f472b6">
            {lang === "pl" ? "Zbyt duży, by upaść (Too Big to Fail)" : lang === "de" ? "Systemrelevant: Too Big to Fail" : "Too interconnected to allow to fail"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#9d174d" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Prywatyzacja zysków, nacjonalizacja strat?" : lang === "de" ? "Gewinne privat, Verluste verstaatlicht?" : "Privatized profits, socialized losses?"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#fce7f3">
            {lang === "pl" ? "Problem pokusy nadużycia (Moral Hazard)" : lang === "de" ? "Das Moral-Hazard-Problem" : "The danger of moral hazard"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ContagionDominoDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Efekt domina w systemie finansowym" : lang === "de" ? "Der Domino-Effekt im Finanzsystem" : "Financial domino chain reaction and systemic contagion";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="35" y="65" width="45" height="100" rx="4" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" transform="rotate(15 45 100)" />
        <rect x="105" y="65" width="45" height="100" rx="4" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" transform="rotate(25 115 100)" />
        <rect x="175" y="65" width="45" height="100" rx="4" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" transform="rotate(35 185 100)" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="255" y="55" width="45" height="110" rx="4" fill="#10b981" stroke="#059669" strokeWidth="2" />
          <text x="277" y="115" textAnchor="middle" fontSize="18">🛡️</text>
          <text x="277" y="140" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#065f46">Firewall</text>

          <rect x="325" y="55" width="45" height="110" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
          <text x="347" y="115" textAnchor="middle" fontSize="14">🏪</text>
          <text x="347" y="140" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ffffff">Payroll</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="185" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="202" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Upadek megabanku zamraża wypłaty pensji dla milionów zwykłych firm" : lang === "de" ? "Kippt eine Grossbank, koennen normale Firmen keine Loehne mehr zahlen" : "A mega-bank failure freezes credit and payrolls for innocent small businesses"}
          </text>
          <text x="200" y="218" textAnchor="middle" fontSize="9" fill="#94a3b8">
            {lang === "pl" ? "Interwencja ratuje sieć płatniczą, a nie chciwych menedżerów" : lang === "de" ? "Die Rettung schuetzt den Wirtschaftskreislauf, nicht unfaehige Manager" : "The bailout protects economic circulation, not reckless executives"}
          </text>
        </g>
      )}
    </svg>
  );
}

function MoralHazardTrapDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Pułapka pokusy nadużycia (Moral Hazard)" : lang === "de" ? "Die Moral-Hazard-Falle: Uebermut durch Sicherheitsnetz" : "The moral hazard trap: reckless risk-taking behind safety nets";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="145" height="85" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">Guaranteed Rescue</text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">🎰 🍾 📈</text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">Heads I win billions</text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">Tails the taxpayer pays</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="145" height="85" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="287" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">Strict Discipline</text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">📉 👔 🚪</text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#065f46">Wipe out shareholders</text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#047857">Fire executives & claw back</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#78350f" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Jeśli wiesz, że ktoś zawsze spłaci twoje długi, podejmujesz szaleńcze ryzyko" : lang === "de" ? "Wer weiss, dass der Staat einspringt, zockt ruecksichtslos weiter" : "If losses are always subsidized, executives take ever more reckless gambles"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#fde68a">
            {lang === "pl" ? "Prawdziwa pomoc musi boleśnie uderzyć w akcjonariuszy i kierownictwo" : lang === "de" ? "Rettung erfordert Totalverlust fuer Eigentuemer und Rauswurf des Managements" : "Credible bailouts require wiping out equity and replacing management"}
          </text>
        </g>
      )}
    </svg>
  );
}

function LivingWillsResolutionDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Przymusowa restrukturyzacja (Bail-in) i testamenty bankowe" : lang === "de" ? "Bankenabwicklung (Bail-in) und Notfall-Testamente" : "Living wills and statutory bail-in resolution mechanisms";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <circle cx="120" cy="90" r="38" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="120" y="85" textAnchor="middle" fontSize="20">📜 ⚖️</text>
        <text x="120" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">Living Will</text>

        <circle cx="280" cy="90" r="38" fill="#fdf4ff" stroke="#c084fc" strokeWidth="2" />
        <text x="280" y="85" textAnchor="middle" fontSize="20">🛡️ ✂️</text>
        <text x="280" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7e22ce">Bail-In Haircut</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="145" width="300" height="40" rx="6" fill="#1e293b" />
          <text x="200" y="163" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Wierzyciele i obligatariusze ponoszą straty zamiast podatników" : lang === "de" ? "Glaeubiger und Eigentuemer haften zuerst, nicht die Steuerzahler" : "Bondholders and creditors absorb losses before public funds are touched"}
          </text>
          <text x="200" y="177" textAnchor="middle" fontSize="8.5" fill="#94a3b8">
            {lang === "pl" ? "Basel III: Wyższe rezerwy kapitałowe wymuszają ostrożność" : lang === "de" ? "Basel III: Hoehere Eigenkapitalpuffer schuetzen vor Zusammenbruechen" : "Basel III rules mandate robust capital buffers to absorb shocks"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#0369a1" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Banki muszą być zorganizowane tak, by mogły bezpiecznie zbankrutować bez paraliżu państwa" : lang === "de" ? "Banken muessen so gebaut sein, dass sie scheitern koennen ohne das Land zu laehmen" : "Institutions must be resolvable without threatening economic stability"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ResilientEconomyDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Odporny system finansowy służący gospodarce realnej" : lang === "de" ? "Ein widerstandsfaehiges Finanzsystem fuer die Realwirtschaft" : "Resilient financial framework serving the real production economy";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <g>
        <circle cx="200" cy="90" r="38" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fontSize="20">🏗️ 🤝</text>
        <text x="200" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">Real Economy</text>
        <rect x="40" y="45" width="105" height="65" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1" />
        <text x="92" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">Capital Rules</text>
        <text x="92" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">Safe reserves</text>
        <rect x="255" y="45" width="105" height="65" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1" />
        <text x="307" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">Market Discipline</text>
        <text x="307" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">No free passes</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="140" width="300" height="42" rx="6" fill="#ede9fe" stroke="#a855f7" strokeWidth="1" />
          <text x="200" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#581c87">
            "Capitalism without bankruptcy is like Christianity without hell"
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="8.5" fill="#7e22ce">
            Frank Borman
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Zdrowy rynek nagradza innowacje, ale zmusza do ponoszenia konsekwencji własnych błędów" : lang === "de" ? "Ein gesunder Markt belohnt Weitsicht, laesst aber schlechte Risiken scheitern" : "Fair markets reward sound enterprise while ensuring bad gambles bear consequences"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [reserveRatio, setReserveRatio] = useState(10);
  const failureRisk = Math.max(2, Math.round((25 - reserveRatio * 1.5) * 10) / 10);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Mandatory Equity Buffer: {reserveRatio}% | Systemic Collapse Probability: {failureRisk}%
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setReserveRatio((r) => {
              const next = Math.min(20, r + 2);
              if (next >= 14 && next <= 18) onDone?.();
              return next;
            });
          }}
        >
          Tighten Capital Buffer (+2%)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setReserveRatio((r) => {
              const next = Math.max(4, r - 2);
              if (next >= 14 && next <= 18) onDone?.();
              return next;
            });
          }}
        >
          Loosen Reserve Rules (-2%)
        </button>
      </div>
      <div style={{ padding: "12px", background: reserveRatio >= 14 ? "#eef8ef" : "#fff1f2", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {reserveRatio < 8
          ? "Excessive Vulnerability: A tiny housing dip sparks systemic insolvency, forcing taxpayers into multi-billion rescue bailouts!"
          : reserveRatio > 18
          ? "Ultra-Conservative Regulation: Banks keep so much cash locked in vaults that credit for small businesses becomes scarce."
          : "Optimal Resilience: Substantial equity buffers force bank shareholders to absorb loan losses before touching public money!"}
      </div>
    </div>
  );
}

function BailoutsWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What is 'moral hazard' in the context of government financial bailouts?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>When executives forget to wear matching ties on Monday morning meetings</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>When financial institutions take reckless, extreme gambles because they expect taxpayers will rescue them if their bets collapse</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>When banks give free piggy banks to school children</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "bailouts",
  story: [
    animatedBeat(
      [
        T("Meet Abhi. He is watching news reports about a massive bank that took dangerous gambles and is now facing collapse.", "Das ist Tim. Er sieht in den Nachrichten, dass eine riesige Bank sich gefaehrlich verspekuliert hat und nun vor dem Kollaps steht.", "Poznaj Tymona. Ogląda wiadomości o potężnym banku, który podejmował niebezpieczne spekulacje i znalazł się na skraju upadku."),
        T("Citizens are outraged: why should ordinary taxpayers spend billions to save wealthy bankers who pocketed multi-million bonuses during the good years?", "Buerger sind empoert: Warum sollen Steuerzahler Banker retten, die in guten Zeiten Millionenboni kassierten?", "Obywatele są oburzeni: dlaczego zwykli podatnicy mieliby wykładać miliardy na ratowanie bankierów, którzy w latach prosperity zgarniali wielomilionowe premie?"),
        T("Yet if the bank closes its doors tonight, ATMs could shut down and payrolls for hundreds of thousands of ordinary workers could freeze tomorrow morning.", "Doch wenn die Bank schliesst, streiken morgen Geldautomaten und unzaehlige Betriebe koennen keine Loehne zahlen.", "A jednak jeśli bank zbankrutuje dziś wieczorem, jutro staną bankomaty, a setki tysięcy uczciwych firm nie wypłacą pracownikom pensji."),
      ],
      EmergencyRescueLaunchDiagram,
    ),
    animatedBeat(
      [
        T("This terrible trap is known as *Too Big to Fail*.", "Diese gefaehrliche Zwickmuehle nennt man *Too Big to Fail* (Zu gross zum Scheitern).", "Ta pułapka w gospodarce nosi miano instytucji *zbyt dużych, by upaść* (Too Big to Fail)."),
        T("Modern financial systems resemble a row of standing dominoes: giant banks lend tens of billions to each other every single night.", "Das moderne Finanzsystem gleicht einer Reihe Dominosteinen: Grosse Institute leihen sich taeglich Milliarden untereinander.", "Nowoczesny system finansowy przypomina rząd klocków domina: największe banki pożyczają sobie wzajemnie dziesiątki miliardów każdej nocy."),
        T("If one giant pillar collapses, its unpaid debts drag down sibling banks, paralyzing the commercial credit pipelines that keep supermarkets stocked and factories running.", "Faellt ein Riese um, reisst er Partnerbanken mit und laehmt den Warenverkehr sowie Zulieferketten der Realwirtschaft.", "Jeśli upadnie jeden kolos, pociąga za sobą kolejne instytucje, paraliżując kredyty handlowe dla fabryk i dostawców żywności."),
      ],
      ContagionDominoDiagram,
    ),
    animatedBeat(
      [
        T("Rescuing failing institutions creates the unfair problem of *moral hazard*.", "Gleichzeitig schafft jede staatliche Rettung das unfaire Problem des *Moral Hazard* (Fehlanreize).", "Ratowanie upadających banków rodzi jednak niesprawiedliwe zjawisko zwane *pokusą nadużycia* (moral hazard)."),
        T("If bank executives believe the government will always rescue them, they take wild risks: winning gives them bonuses, but losing is paid by taxpayers.", "Wissen Manager, dass der Staat sie immer rettet, zocken sie hemmungslos: Gewinne gehoeren ihnen, Verluste zahlen Buerger.", "Gdy bankierzy wiedzą, że państwo zawsze ich uratuje, podejmują szalone ryzyko: zyski biorą dla siebie, a straty zrzucają na podatników."),
        T("Without strict consequences, guaranteed bailouts incentivize ever more reckless, destabilizing financial gambling.", "Ohne harte Konsequenzen verleitet eine Rettungsgarantie zu immer groesseren, gefaehrlichen Spekulationsblasen.", "Brak surowych konsekwencji sprawia, że gwarancja pomocy zachęca do jeszcze bardziej niebezpiecznych spekulacji w przyszłości."),
      ],
      MoralHazardTrapDiagram,
    ),
    animatedBeat(
      [
        T("To fix this after the 2008 global financial crisis, leaders invented *bail-ins*.", "Nach der Finanzkrise 2008 entwickelten internationale Regulierer das Instrument der *Bankenabwicklung (Bail-in)*.", "Aby rozwiązać ten problem po kryzysie 2008 roku, stworzono mechanizm *przymusowej restrukturyzacji* (bail-in)."),
        T("Under modern rules, bank shareholders are completely wiped out first, executive leadership is dismissed without severance, and wealthy bondholders absorb losses before a single public euro is spent.", "Heute werden bei Schieflage zuerst die Eigentuemer enteignet, das Management entlassen und Glaeubiger zur Kasse gebeten.", "Zgodnie z nowymi przepisami w pierwszej kolejności kapitał akcjonariuszy jest zerowany, zarząd zwalniany, a obligatariusze ponoszą straty."),
        T("Banks are also required to maintain massive *capital buffers* under Basel III rules and write legally binding *living wills* mapping out how they can be safely wound down.", "Zudem muessen Banken nach Basel III hohe *Eigenkapitalpuffer* halten und *Abwicklungstestamente* fuer den Notfall vorlegen.", "Banki muszą także utrzymywać grube *poduszki kapitałowe* zgodnie z pakietem Bazylea III i przygotowywać precyzyjne plany upadłościowe."),
      ],
      LivingWillsResolutionDiagram,
    ),
    animatedBeat(
      [
        T("A truly free and resilient market economy cannot exist without the discipline of failure.", "Eine freie und gesunde Marktwirtschaft kann ohne das Risiko des Scheiterns nicht funktionieren.", "Prawdziwa i zdrowa gospodarka rynkowa nie może istnieć bez nieuchronności bankructwa za złe decyzje."),
        T("By enforcing strict capital rules, preventing monopolies, and holding financial gamblers personally accountable, society protects both ordinary depositors and honest taxpayers.", "Durch strenge Kapitalregeln, Haftung der Verursacher und Einlagensicherung schuetzt die Gesellschaft Sparer und Steuerzahler.", "Wprowadzając rygorystyczne normy kapitałowe i pociągając spekulantów do odpowiedzialności, państwo chroni i oszczędności obywateli, i podatki."),
        T("Understanding systemic risk equips you to see past Wall Street panics and champion rules that make economies sturdy and fair.", "Wer Systemrisiken versteht, durchschaut Finanzkrisen und unterstuetzt faire Regeln fuer stabilen Wohlstand.", "Zrozumienie ryzyka systemowego pozwala przejrzeć mechanizmy kryzysów finansowych i wspierać sprawiedliwe reguły gry gospodarczej."),
      ],
      ResilientEconomyDiagram,
    ),
  ],
  toyIntro: T(
    "Set the bank equity buffer: adjust mandatory reserve requirements to protect the public from bailouts while enabling healthy business lending.",
    "Bestimme den Eigenkapitalpuffer: Justiere die Mindestreserven, um Steuerzahler vor Rettungspaketen zu schuetzen.",
    "Ustal wymogi kapitałowe dla banków: reguluj wysokość rezerw, aby chronić podatników przed kosztami ratowania instytucji finansowych."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does 'Too Big to Fail' mean in modern financial economics?",
        "Was bedeutet 'Too Big to Fail' in der modernen Finanzwirtschaft?",
        "Co oznacza pojęcie 'Too Big to Fail' (zbyt duży, by upaść) we współczesnej gospodarce?",
      ),
      options: [
        { text: T("A financial institution is so large and interconnected that its sudden disorderly collapse would freeze credit pipelines and trigger catastrophic nationwide economic recession", "Ein Institut ist so gross und vernetzt, dass sein unkontrollierter Zusammenbruch den gesamten Zahlungsverkehr laehmen und schwere Krisen ausloesen wuerde", "Instytucja finansowa jest tak potężna i powiązana z innymi, że jej niekontrolowany upadek zamroziłby kredyty i wywołał ogólnokrajowy kryzys"), correct: true },
        { text: T("A cruise ship that is too wide to fit through the Panama Canal locks", "Ein Kreuzfahrtschiff, das zu breit fuer die Schleusen des Panamakanals ist", "Statek wycieczkowy, który jest zbyt szeroki, by zmieścić się w śluzach Kanału Panamskiego"), correct: false },
        { text: T("A student backpack packed with too many heavy encyclopedia volumes", "Ein Schuelerrucksack, der mit zu vielen dicken Lexika vollgestopft ist", "Plecak szkolny wypchany zbyt wieloma tomami encyklopedii"), correct: false },
      ],
      hint: T(
        "Think about systemic domino effects where one bank failure freezes payroll for innocent companies everywhere.",
        "Denke an Dominoeffekte, bei denen der Ausfall einer Bank dazu fuehrt, dass unbeteiligte Firmen keine Gehaelter mehr ueberweisen koennen.",
        "Pomyśl o reakcji łańcuchowej, w której upadek jednego banku uniemożliwia niewinnym firmom wypłatę wynagrodzeń pracownikom."),
    },
    {
      kind: "choice",
      prompt: T(
        "How do modern 'bail-in' rules protect ordinary taxpayers during a bank failure?",
        "Wie schuetzt das moderne 'Bail-in'-Verfahren normale Steuerzahler bei einer Bankenpleite?",
        "W jaki sposób nowoczesna procedura 'bail-in' chroni podatników podczas upadłości banku?",
      ),
      options: [
        { text: T("Shareholders and institutional bondholders absorb losses first by seeing their investments erased or converted, before any taxpayer money is touched", "Zuerst haften Aktionaere und institutionelle Glaeubiger mit ihren Geldern, bevor auch nur ein einziger Steuer-Euro fliesst", "W pierwszej kolejności to akcjonariusze i inwestorzy instytucjonalni tracą kapitał, zanim państwo wyłoży chociaż jedno euro z podatków"), correct: true },
        { text: T("Taxpayers are forced to buy pizza for all bank directors every evening", "Steuerzahler werden verpflichtet, den Bankchefs jeden Abend Pizza zu spendieren", "Podatnicy mają obowiązek kupować pizzę wszystkim dyrektorom banku każdego wieczoru"), correct: false },
        { text: T("The government gives every citizen a new gold ring to wear on their thumb", "Der Staat schenkt jedem Buerger einen neuen goldenen Daumenring", "Rząd rozdaje każdemu obywatelowi złoty pierścień do noszenia na kciuku"), correct: false },
      ],
      hint: T(
        "Remember that the risk should fall on the investors who bought the bank's stock and bonds, not on nurses or bus drivers.",
        "Bedenke: Das Verlustrisiko soll diejenigen treffen, die Aktien und Anleihen der Bank hielten, nicht Krankenschwestern oder Busfahrer.",
        "Pamiętaj: ryzyko strat powinno obciążać inwestorów kupujących akcje i obligacje banku, a nie pielęgniarki czy kierowców autobusów."),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify why public bailouts create moral hazard in the financial industry.",
        "Bestimme, warum staatliche Rettungsaktionen Moral Hazard im Finanzsektor ausloesen.",
        "Wskaż przyczynę powstawania pokusy nadużycia (moral hazard) w wyniku państwowych pakietów ratunkowych.",
      ),
      Widget: BailoutsWidget,
      hint: T(
        "Focus on asymmetric incentives: privatizing profits while socializing downside losses.",
        "Achte auf asymmetrische Anreize: Gewinne privat einstreichen, aber Risiken auf die Allgemeinheit abwaelzen.",
        "Zwróć uwagę na asymetrię zysków i strat: prywatne korzyści w zyskach i przerzucanie ryzyka strat na podatników."),
    },
  ],
  askDad: T(
    "Ask your parent: Do they remember the 2008 global financial crisis, and what was their reaction when governments spent billions bailing out banks?",
    "Frage deine Eltern: Koennen sie sich an die Finanzkrise von 2008 erinnern, und was dachten sie damals ueber die Milliardenhilfen fuer Banken?",
    "Zapytaj rodziców: Czy pamiętają kryzys finansowy z 2008 roku, i jakie były ich odczucia, gdy rządy pompowały miliardy w ratowanie banków?"),
  realLife: {
    title: T(
      "Real world: The collapse of Lehman Brothers in 2008 and the emergency UBS takeover of Credit Suisse in 2023",
      "Echte Welt: Die Lehman-Brothers-Pleite 2008 und die Notuebernahme der Credit Suisse durch die UBS 2023",
      "Prawdziwy świat: Upadek banku Lehman Brothers w 2008 r. i awaryjne przejęcie Credit Suisse przez UBS w 2023 r.",
    ),
    body: T(
      "In September 2008, the US government allowed investment bank Lehman Brothers to fail, triggering immediate worldwide panic, freezing credit markets, and forcing Congress to pass the 700-billion-dollar TARP bailout. In March 2023, when centuries-old Credit Suisse faced a massive depositor flight, the Swiss National Bank orchestrated an emergency takeover by UBS, wiping out 17 billion dollars worth of risky AT1 bonds (bail-in) to shield Swiss taxpayers from direct loss.",
      "Im September 2008 liessen die USA die Investmentbank Lehman Brothers pleitegehen, was Schockwellen um den Globus schickte und ein 700-Milliarden-Dollar-Rettungspaket (TARP) noetig machte. Im Maerz 2023 organisierte die Schweizerische Nationalbank nach massiven Mittelabzuegen die Notuebernahme der Credit Suisse durch die UBS, wobei riskante AT1-Anleihen im Wert von 17 Milliarden Dollar komplett abgeschrieben wurden (Bail-in).",
      "We wrześniu 2008 roku rząd USA pozwolił na upadek banku Lehman Brothers, co wywołało panikę na światowych rynkach i zmusiło Kongres do uchwalenia wartego 700 miliardów dolarów programu ratunkowego TARP. W marcu 2023 roku, gdy Credit Suisse stanął w obliczu masowego odpływu depozytów, Narodowy Bank Szwajcarii doprowadził do przejęcia go przez UBS, odpisując do zera 17 miliardów dolarów ryzykownych obligacji AT1 (bail-in), by chronić podatników."),
  },
  factCard: {
    claims: [
      { text: T("The US Congress passed the Emergency Economic Stabilization Act of 2008, authorizing the 700 billion dollar Troubled Asset Relief Program (TARP).", "Der US-Kongress verabschiedete 2008 das 700-Milliarden-Dollar schwere Bankenrettungsprogramm TARP.", "Kongres USA uchwalił w 2008 roku ustawę o nadzwyczajnej stabilizacji gospodarczej, tworząc program TARP o wartości 700 mld dolarów."), source: "https://www.treasury.gov/initiatives/financial-stability/TARP-Programs/Pages/default.aspx" },
      { text: T("The Basel Committee on Banking Supervision formulated the Basel III framework in 2010 to strengthen bank capital requirements and liquidity ratios.", "Der Basler Ausschuss fuer Bankenaufsicht beschloss 2010 Basel III zur Verschaerfung der Eigenkapital- und Liquiditaetsvorschriften.", "Bazylejski Komitet Nadzoru Bankowego przyjął w 2010 roku porozumienie Bazylea III, zaostrzające wymogi kapitałowe i płynnościowe dla banków."), source: "https://www.bis.org/bcbs/basel3.htm" },
      { text: T("Ben Bernanke, Douglas Diamond, and Philip Dybvig were awarded the 2022 Nobel Memorial Prize in Economic Sciences for research on banks and financial crises.", "Ben Bernanke, Douglas Diamond und Philip Dybvig erhielten 2022 den Wirtschaftsnobelpreis fuer ihre Forschung zu Banken und Krisen.", "Ben Bernanke, Douglas Diamond i Philip Dybvig otrzymali w 2022 roku Nagrodę Nobla za badania nad bankami i kryzysami finansowymi."), source: "https://www.nobelprize.org/prizes/economic-sciences/2022/press-release/" },
      { text: T("The European Union established the Single Resolution Mechanism (SRM) and Bank Recovery and Resolution Directive (BRRD) in 2014 to enforce statutory bail-ins.", "Die Europaeische Union schuf 2014 den einheitlichen Bankenabwicklungsmechanismus (SRM) fuer geordnete Glaeubigerbeteiligungen.", "Unia Europejska przyjęła w 2014 roku dyrektywę BRRD oraz Jednolity Mechanizm Restrukturyzacji i Uporządkowanej Likwidacji (SRM)."), source: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0059" },
      { text: T("The Financial Stability Board (FSB), established by the G20 in 2009, designates Global Systemically Important Banks (G-SIBs) subject to extra loss-absorbency rules.", "Der Finanzstabilitaetsrat (FSB) der G20 identifiziert global systemrelevante Banken mit erhoehten Risikopuffern.", "Rada Stabilności Finansowej (FSB) przy grupie G20 wyznacza globalne instytucje o znaczeniu systemowym (G-SIB), nakładając na nie dodatkowe bufory kapitałowe."), source: "https://www.fsb.org/work-of-the-fsb/financial-stability-surveillance/macroprudential-policy/g-sibs/" },
    ],
    simplified: [
      T(
        "Complex systemic contagion equations and tier-one capital ratio metrics are made intuitive using physical falling domino models and firebreak safety analogies.",
        "Komplexe Ansteckungsrisiken und Kernkapitalquoten wurden durch anschauliche fallende Dominosteine und Brandschutz-Vergleiche erlaeutert.",
        "Skomplikowane modele transmisji ryzyka systemowego i współczynniki kapitałowe Tier 1 wyjaśniono za pomocą fizycznej metafory klocków domina i pasów przeciwpożarowych."),
    ],
  },
};
