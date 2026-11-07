import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function HarborCommonsLaunchDiagram({ lang, step }: DiagramProps) {
  const aaravName = lang === "pl" ? "Adam" : lang === "de" ? "Arne" : "Aarav";
  const label = lang === "pl" ? "Adam bada port i latarnię morską jako dobro publiczne" : lang === "de" ? "Arne untersucht Hafen und Leuchtturm als oeffentliches Gut" : "Aarav inspecting municipal harbor and lighthouse as public good";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#1e293b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#0284c7" stroke="#0ea5e9" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7dd3fc">{aaravName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#bae6fd">
          🗼 {lang === "pl" ? "Latarnia Morska: Dobro Publiczne" : lang === "de" ? "Leuchtturm: Reines oeffentliches Gut" : "Lighthouse: Pure Public Good"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#0284c7" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">💡 🚢 🌊</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#7dd3fc">
            {lang === "pl" ? "Niewykluczalne i nierywalizacyjne światło" : lang === "de" ? "Nicht-Ausschliessbar & Nicht-Rivalisierend" : "Non-excludable & non-rivalrous light beam"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#0369a1" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Dlaczego rynek sam jej nie wybuduje?" : lang === "de" ? "Warum baut der Markt sie nicht allein?" : "Why markets fail to fund it alone"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#e0f2fe">
            {lang === "pl" ? "Problem pasażera na gapę (Free-Rider Problem)" : lang === "de" ? "Das klassische Trittbrettfahrer-Problem" : "The free-rider dilemma requires collective action"}
          </text>
        </g>
      )}
    </svg>
  );
}

function FreeRiderProblemDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Problem pasażera na gapę przy dobrach publicznych" : lang === "de" ? "Das Trittbrettfahrer-Problem bei oeffentlichen Guetern" : "Free-rider problem and tragedy of uncoordinated action";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="150" height="85" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">Free Riders</text>
        <text x="110" y="90" textAnchor="middle" fontSize="14">🚢 🙈</text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">Enjoy light for free</text>
        <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#b91c1c">Refuse to donate voluntary coins</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="150" height="85" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Rule of Law / State</text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">🏛️ ⚖️</text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">Fair public funding</text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#2563eb">Guarantees safety for all ships</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#1e293b" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Bez państwa dobra wspólne ulegają degradacji lub w ogóle nie powstają" : lang === "de" ? "Ohne Staat verkümmern oeffentliche Gueter durch egoistisches Abwarten" : "Without government, essential public infrastructure remains unbuilt"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl" ? "Drogi, sądownictwo i obrona narodowa wymagają zorganizowanej koordynacji" : lang === "de" ? "Strassen, Justiz und Sicherheit erfordern verbindliche Kooperation" : "Roads, courts, and defense demand binding collective coordination"}
          </text>
        </g>
      )}
    </svg>
  );
}

function TragedyOfCommonsDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Tragedia wspólnego pastwiska (Tragedy of the Commons)" : lang === "de" ? "Die Tragoedie der Allmende: Uebernutzung freier Ressourcen" : "Tragedy of the commons: overexploitation of unmanaged pastures";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="150" height="85" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">Unregulated Pasture</text>
        <text x="110" y="90" textAnchor="middle" fontSize="14">🐄 🐄 🐄 🏜️</text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">Overgrazed to dirt</text>
        <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">Every shepherd adds extra cows</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="150" height="85" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">Managed Commons</text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">🌿 🛡️ 📜</text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#065f46">Clear quotas & rules</text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#047857">Preserves lush grass forever</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#78350f" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Gdy zasób należy do wszystkich i do nikogo, każdy ma pokusę go wyeksploatować" : lang === "de" ? "Was allen gehoert, gehoert niemandem: Raubbau droht ohne klare Regeln" : "What belongs to everyone is cared for by no one without enforced governance"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#fde68a">
            {lang === "pl" ? "Prawa własności i regulacje ratują łowiska, lasy i czyste powietrze" : lang === "de" ? "Eigentumsrechte und Regeln schuetzen Fischbestaende und saubere Luft" : "Property rights and environmental caps protect fisheries and clean air"}
          </text>
        </g>
      )}
    </svg>
  );
}

function SocialContractDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Umowa społeczna: wolność chroniona przez prawo" : lang === "de" ? "Der Gesellschaftsvertrag: Freiheit durch verbindliches Recht" : "The social contract: mutual protection under the rule of law";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <circle cx="200" cy="95" r="42" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="200" y="90" textAnchor="middle" fontSize="22">📜 ⚖️</text>
      <text x="200" y="112" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1e40af">Social Contract</text>
      <g>
        <circle cx="85" cy="70" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="85" y="68" textAnchor="middle" fontSize="12">🛡️</text>
        <text x="85" y="84" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#15803d">Protection</text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="315" cy="70" r="28" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="315" y="68" textAnchor="middle" fontSize="12">🤝</text>
          <text x="315" y="84" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#92400e">Fair Taxes</text>
          <circle cx="200" cy="165" r="26" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="200" y="163" textAnchor="middle" fontSize="12">🏛️</text>
          <text x="200" y="179" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#5b21b6">Civil Courts</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#1e293b" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Praworządność zastępuje prawo silniejszego pokojowym rozstrzyganiem sporów" : lang === "de" ? "Rechtsstaatlichkeit ersetzt das Recht des Staerkeren durch friedliche Justiz" : "The rule of law replaces the law of the jungle with impartial justice"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ProsperousCivicsDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Harmonijne państwo: dobrobyt, prawa obywatelskie i rozwój" : lang === "de" ? "Ein funktionierender Staat als Basis fuer Wohlstand und Entfaltung" : "Prosperous civic order enabling human flourishing";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <g>
        <rect x="50" y="40" width="300" height="50" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="200" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#581c87">
          {lang === "pl" ? "Rząd istnieje, by służyć obywatelom" : lang === "de" ? "Der Staat existiert, um den Buergern zu dienen" : "Government exists to serve citizens"}
        </text>
        <text x="200" y="78" textAnchor="middle" fontSize="9" fill="#7e22ce">
          {lang === "pl" ? "Ochrona praw jednostki, czysta woda, bezpieczne drogi i edukacja" : lang === "de" ? "Schutz der Grundrechte, Infrastruktur, Schulen und Gesundheit" : "Protecting human rights, property, healthcare, and education"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="105" width="150" height="75" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="115" y="130" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">Accountability</text>
          <text x="115" y="152" textAnchor="middle" fontSize="14">🗳️ 👁️</text>
          <text x="115" y="168" textAnchor="middle" fontSize="8.5" fill="#166534">Free press & elections</text>

          <rect x="210" y="105" width="150" height="75" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="285" y="130" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Economic Freedom</text>
          <text x="285" y="152" textAnchor="middle" fontSize="14">🚀 🏪</text>
          <text x="285" y="168" textAnchor="middle" fontSize="8.5" fill="#1d4ed8">Enforceable contracts</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Dobre instytucje to najważniejsza różnica między bogatymi a biednymi narodami" : lang === "de" ? "Starke Institutionen machen den Unterschied zwischen Armut und Wohlstand" : "Inclusive institutions explain why nations succeed and prosper"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [rulesLevel, setRulesLevel] = useState(50);
  const state = rulesLevel < 25 ? "chaos" : rulesLevel > 75 ? "gridlock" : "smooth";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Governance Level: {rulesLevel}% | Public Order State: {state.toUpperCase()}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setRulesLevel((r) => {
              const next = Math.min(100, r + 25);
              if (next >= 50 && next <= 75) onDone?.();
              return next;
            });
          }}
        >
          More Rules & Oversight (+25%)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setRulesLevel((r) => Math.max(0, r - 25))}
        >
          Fewer Rules (-25%)
        </button>
      </div>
      <div style={{ padding: "12px", background: state === "smooth" ? "#eef8ef" : "#fff1f2", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {state === "chaos"
          ? "No Rules (Anarchy): Without traffic laws or police, boats collide and pirates loot the docks!"
          : state === "gridlock"
          ? "Excessive Bureaucracy: 5 mandatory permit checkpoints block every fishing boat from leaving the dock!"
          : "Balanced Rule of Law: Clear rules protect property and contracts while letting people trade and thrive!"}
      </div>
    </div>
  );
}

function WhyGovernmentWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What makes a public good like a lighthouse or national highway different from an apple?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>An apple costs one million dollars to grow</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>A public good is non-excludable (anyone can see the light) and non-rivalrous (one ship using it does not diminish light for others)</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Lighthouses can only be built out of pure solid gold</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "whygovernment",
  story: [
    animatedBeat(
      [
        T("Meet Aarav. He lives in a coastal town where dozens of fishing boats navigate rocky shoals every foggy midnight.", "Das ist Arne. Er lebt in einer Kuestenstadt, in der Fischerboote jede Nacht durch gefaehrliche Felsen steuern muessen.", "Poznaj Adama. Mieszka w nadmorskim miasteczku, w którym kutry rybackie co noc lawirują między zdradliwymi skałami."),
        T("To prevent deadly shipwrecks, the town needs a lighthouse perched on the rocky promontory.", "Um toedliche Schiffbrueche zu verhindern, braucht der Ort einen weithin sichtbaren Leuchtturm auf der Klippe.", "Aby zapobiec katastrofom morskim, miasteczko potrzebuje potężnej latarni morskiej na skalistym przylądku."),
        T("A lighthouse is the classic economic definition of a *public good*: once turned on, its beam protects every sailor equally.", "Ein Leuchtturm ist das klassische Beispiel fuer ein *oeffentliches Gut*: Sein Lichtkegel schuetzt jedes Schiff gleichermassen.", "Latarnia morska to klasyczny przykład *dobra publicznego*: gdy jej snop światła rozbłyśnie, chroni każdego żeglarza bez wyjątku."),
      ],
      HarborCommonsLaunchDiagram,
    ),
    animatedBeat(
      [
        T("When captains try passing a hat to pay for fuel voluntarily, private markets suffer from the *free-rider problem*.", "Als die Kapitaene freiwillig Geld fuer Lampenoel sammeln wollen, scheitert der Versuch am *Trittbrettfahrer-Problem*.", "Gdy kapitanowie próbują zorganizować dobrowolną zbiórkę na paliwo do lampy, pojawia się *problem pasażera na gapę*."),
        T("Selfish shipowners realize they can keep their coins in their pockets and still navigate safely by the light funded by neighbors.", "Schlaue Reeder merken rasch: Sie koennen ihr Geld sparen und trotzdem vom Licht profitieren, das die Nachbarn bezahlen.", "Sprytni armatorzy orientują się, że mogą schować złoto do kieszeni i płynąć bezpiecznie w świetle opłaconym przez innych."),
        T("Because too many sailors free-ride, voluntary donations collapse and the lighthouse goes dark, leading to collective disaster.", "Weil sich zu viele auf Kosten anderer ausruhen, trocknen die Spenden ein, der Turm erlischt und Schiffe zerschellen.", "Ponieważ zbyt wielu próbuje płynąć za darmo, zbiórka upada, latarnia gaśnie, a kolejne kutry rozbijają się o skały."),
      ],
      FreeRiderProblemDiagram,
    ),
    animatedBeat(
      [
        T("Unregulated common shared resources suffer a parallel fate known as the *tragedy of the commons*.", "Frei zugaengliche Gemeinschaftsressourcen erleiden oft dasselbe Schicksal: die *Tragoedie der Allmende*.", "Wspólne zasoby bez gospodarza spotyka równie smutny los, zwany *tragedią wspólnego pastwiska*."),
        T("If a village pasture or coastal fishery has zero rules, every individual farmer rushes to graze extra cattle or catch extra fish.", "Gibt es auf einer Weide oder im Meer keine Regeln, treibt jeder Bauer mehr Kuehe hinaus und fischt ohne Mass.", "Jeśli na gminnej łące lub w zatoce rybnej nie ma żadnych reguł, każdy pasterz dokłada krów, a rybak łowi bez opamiętania."),
        T("Soon the grass is eaten to bare dirt, the fish stock collapses, and everyone starves because no individual had an incentive to conserve.", "Bald ist die Wiese kahlgefressen, die Fische sterben aus und alle hungern, weil niemand den Anfang beim Schonen machen wollte.", "Wkrótce łąka zamienia się w pustynię, ryby wyginą, a cała społeczność cierpi głód, bo nikomu nie opłacało się powściągać chciwości."),
      ],
      TragedyOfCommonsDiagram,
    ),
    animatedBeat(
      [
        T("Civilized human society solves these coordination failures through the *social contract* and democratic government.", "Die menschliche Zivilisation loest solche Koordinationsprobleme durch den *Gesellschaftsvertrag* und den Staat.", "Cywilizowane społeczeństwo rozwiązuje te dylematy poprzez *umowę społeczną* i demokratyczne państwo prawa."),
        T("Citizens agree to pool resources through fair taxation to fund universal infrastructure, defense, courts, and clean water.", "Buerger vereinbaren, faire Steuern zu zahlen, um Strassen, Justiz, Sicherheit und sauberes Wasser fuer alle zu finanzieren.", "Obywatele godzą się płacić podatki, by wspólnie budować infrastrukturę, sądy, szpitale i gwarantować bezpieczeństwo."),
        T("The *rule of law* replaces brute physical force with impartial, predictable civil justice and enforceable property rights.", "Die *Rechtsstaatlichkeit* ersetzt das Faustrecht durch unabhaengige Gerichte und verlaessliche Eigentumsrechte.", "*Rządy prawa* zastępują prawo silniejszego bezstronnym wymiarem sprawiedliwości i ochroną praw własności."),
      ],
      SocialContractDiagram,
    ),
    animatedBeat(
      [
        T("Government is not an alien oppressor: in healthy democracies, it is the collective tool citizens use to accomplish together what no one can achieve alone.", "Der Staat ist kein fremder Beherrscher: In einer gesunden Demokratie ist er das Werkzeug, mit dem freie Buerger gemeinsam Grosses schaffen.", "Państwo nie jest wrogim zaborcą: w zdrowej demokracji to wspólne narzędzie obywateli do celów, których nikt nie zrealizuje w pojedynkę."),
        T("From eradicating diseases to launching space satellites and building high-speed rail, strong inclusive institutions drive human flourishing.", "Vom Besiegen toedlicher Seuchen ueber die Raumfahrt bis zum Schienennetz: Starke Institutionen schaffen echten Fortschritt.", "Od zwalczania epidemii po loty kosmiczne i budowę kolei: silne i przejrzyste instytucje stanowią fundament dobrobytu."),
        T("Understanding why government exists helps you become an engaged, informed citizen who holds leaders accountable.", "Wer versteht, wozu ein Staat da ist, kann sich einmischen und Politiker an ihren Taten messen.", "Zrozumienie sensu istnienia państwa pomaga stać się świadomym obywatelem, który potrafi rozliczać władzę z jej obietnic."),
      ],
      ProsperousCivicsDiagram,
    ),
  ],
  toyIntro: T(
    "Balance the dials of public order: see how anarchy leads to chaotic collisions while heavy tyranny chokes freedom, finding the sweet spot of the rule of law.",
    "Finde die Balance der Ordnung: Erlebe, wie Gesetzlosigkeit im Chaos endet und Schikane die Freiheit erstickt, waehrend der Rechtsstaat blueht.",
    "Znajdź równowagę porządku prawnego: zobacz, jak brak zasad prowadzi do chaosu, a nadmiar nakazów paraliżuje życie, odkrywając siłę rządów prawa."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the 'free-rider problem' in economics and public goods?",
        "Was versteht man unter dem 'Trittbrettfahrer-Problem' bei oeffentlichen Guetern?",
        "Czym jest 'problem pasażera na gapę' (free-rider problem) w ekonomii dóbr publicznych?",
      ),
      options: [
        { text: T("When individuals consume a non-excludable good without contributing to its cost, hoping others will pay for it", "Wenn Personen den Nutzen eines Gutes geniessen, ohne sich an den Kosten zu beteiligen, weil niemand ausgeschlossen werden kann", "Sytuacja, w której jednostki korzystają z dobra bez płacenia za nie, licząc na to, że inni pokryją koszty jego utrzymania"), correct: true },
        { text: T("When skateboarders ride on public trains without buying tickets during winter", "Wenn Skateboarder im Winter ohne Ticket auf U-Bahn-Daechern mitfahren", "Jazda deskorolką po peronach kolejowych bez biletu w czasie zimy"), correct: false },
        { text: T("When restaurants give away free napkins to customers who order soup", "Wenn Restaurants kostenlose Servietten an Suppenesser verteilen", "Rozdawanie darmowych serwetek gościom zamawiającym zupę w restauracji"), correct: false },
      ],
      hint: T(
        "Think about people enjoying the lighthouse beam without paying a dime toward the fuel.",
        "Denke an Schiffe, die sich am Licht des Leuchtturms orientieren, aber keinen Cent fuers Oel spenden.",
        "Pomyśl o statkach korzystających ze światła latarni morskiej, których właściciele odmawiają zrzutki na paliwo."),
    },
    {
      kind: "choice",
      prompt: T(
        "What defines the 'Tragedy of the Commons'?",
        "Was beschreibt die 'Tragoedie der Allmende'?",
        "Co opisuje 'tragedia wspólnego pastwiska' (tragedy of the commons)?",
      ),
      options: [
        { text: T("Unregulated shared resources get depleted and destroyed because each user acts in short-term self-interest to maximize their own extraction", "Gemeinsam genutzte freie Ressourcen werden zerstoert, weil jeder Einzelne seinen persoenlichen Ertrag kurzfristig maximiert", "Wspólne zasoby bez nadzoru ulegają wyeksploatowaniu i zniszczeniu, bo każdy użytkownik dąży do maksymalizacji własnych korzyści kosztem całości"), correct: true },
        { text: T("When an actor forgets their lines during a Shakespeare play in a city park", "Wenn ein Theaterschauspieler seinen Text im Stadtpark vergisst", "Sytuacja, w której aktor zapomina tekstu w czasie spektaklu szekspirowskiego w parku"), correct: false },
        { text: T("When a public swimming pool runs out of towels on Saturday morning", "Wenn im Freibad am Samstagvormittag die Handtuecher ausgehen", "Brak ręczników na miejskim basenie w sobotni poranek"), correct: false },
      ],
      hint: T(
        "Think about overfishing the ocean when there are no quotas or boundaries.",
        "Denke an die Ueberfischung der Weltmeere, wenn es keine Fangquoten oder Schutzgebiete gibt.",
        "Pomyśl o przełowieniu oceanów, gdy nie obowiązują żadne limity połowowe ani strefy ochronne."),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the core economic characteristics of a pure public good.",
        "Bestimme die wesentlichen oekonomischen Merkmale eines echten oeffentlichen Gutes.",
        "Wskaż kluczowe cechy ekonomiczne czystego dobra publicznego.",
      ),
      Widget: WhyGovernmentWidget,
      hint: T(
        "Focus on non-excludability and non-rivalrous consumption.",
        "Achte auf Nicht-Ausschliessbarkeit und Nicht-Rivalitaet im Konsum.",
        "Zwróć uwagę na brak możliwości wykluczenia z konsumpcji oraz brak rywalizacji o dobro."),
    },
  ],
  askDad: T(
    "Ask your parent: Which public services provided by the government (clean water, fire department, paved roads, courts) do they appreciate most every day?",
    "Frage deine Eltern: Welche staatlichen Leistungen (sauberes Trinkwasser, Feuerwehr, Strassennetz, Justiz) schaetzen sie im Alltag am meisten?",
    "Zapytaj rodziców: Jakie usługi publiczne świadczone przez państwo (czysta woda w kranie, straż pożarna, asfaltowe drogi, sądownictwo) cenią w życiu codziennym najbardziej?"),
  realLife: {
    title: T(
      "Real world: Elinor Ostrom and managing the commons without total state ownership",
      "Echte Welt: Elinor Ostrom und das erfolgreiche Verwalten der Allmende",
      "Prawdziwy świat: Elinor Ostrom i zarządzanie dobrami wspólnymi bez przymusu państwa",
    ),
    body: T(
      "In 2009, Elinor Ostrom became the first woman to win the Nobel Prize in Economic Sciences. Her field research in Switzerland, Spain, and the Philippines proved that local communities can successfully govern shared irrigation systems, pastures, and forests without top-down government takeover or private fences, by designing clear collective rules, graduated sanctions, and trusted local monitoring.",
      "2009 erhielt Elinor Ostrom als erste Frau den Wirtschaftsnobelpreis. Ihre Feldforschung in den Schweizer Alpen, Spanien und Asien bewies: Lokale Gemeinschaften koennen Bewaesserungssysteme, Weiden und Waelder durch transparente Regeln und gegenseitige Kontrolle nachhaltig schuetzen, ohne dass ein allmaechtiger Staat alles enteignen muss.",
      "W 2009 roku Elinor Ostrom jako pierwsza kobieta w historii otrzymała Nagrodę Nobla w dziedzinie ekonomii. Jej badania w Szwajcarii, Hiszpanii i Azji udowodniły, że lokalne społeczności potrafią skutecznie zarządzać wspólnymi pastwiskami, lasami i kanałami nawadniającymi bez przymusowej nacjonalizacji, tworząc przejrzyste reguły i wzajemny nadzór."),
  },
  factCard: {
    claims: [
      { text: T("Thomas Hobbes argued in Leviathan (1651) that without a common governing power, human life would be 'solitary, poor, nasty, brutish, and short'.", "Thomas Hobbes beschrieb 1651 im 'Leviathan', dass das Leben ohne staatliche Ordnung 'einsam, armselig, ekelhaft, tierisch und kurz' waere.", "Thomas Hobbes pisał w 'Lewiatanie' (1651), że bez władzy państwowej życie człowieka w stanie natury byłoby 'samotne, biedne, bezecne, zwierzęce i krótkie'."), source: "https://www.britannica.com/topic/Leviathan-by-Hobbes" },
      { text: T("Garrett Hardin published his famous ecological paper 'The Tragedy of the Commons' in Science in 1968.", "Garrett Hardin veroeffentlichte 1968 in der Fachzeitschrift Science seinen einflussreichen Aufsatz 'The Tragedy of the Commons'.", "Garrett Hardin opublikował w 1968 roku na łamach czasopisma 'Science' głośny artykuł 'Tragedia wspólnego pastwiska'."), source: "https://www.science.org/doi/10.1126/science.162.3859.1243" },
      { text: T("Elinor Ostrom won the Nobel Prize in Economics in 2009 for analyzing economic governance and demonstrating community-based commons management.", "Elinor Ostrom erhielt 2009 den Nobelpreis fuer Wirtschaftswissenschaften fuer ihre Analyse der Verwaltung oeffentlicher Gueter.", "Elinor Ostrom otrzymała w 2009 roku Nagrodę Nobla za wykazanie skuteczności oddolnego zarządzania dobrami wspólnymi przez społeczności lokalne."), source: "https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/facts/" },
      { text: T("Paul Samuelson mathematically defined the criteria for pure public goods (non-rivalry and non-excludability) in 1954 in The Review of Economics and Statistics.", "Paul Samuelson formulierte 1954 die mathematischen Bedingungen fuer reine oeffentliche Gueter (Nicht-Rivalitaet und Nicht-Ausschliessbarkeit).", "Paul Samuelson sformułował matematyczne kryteria czystych dóbr publicznych w 1954 roku w czasopiśmie 'The Review of Economics and Statistics'."), source: "https://www.jstor.org/stable/1925895" },
      { text: T("Daron Acemoglu and James Robinson showed in 'Why Nations Fail' (2012) that inclusive political and economic institutions are the decisive driver of long-term national wealth.", "Daron Acemoglu und James Robinson belegten in 'Warum Nationen scheitern' (2012), dass inklusive Institutionen der Schluessel zu Wohlstand sind.", "Daron Acemoglu i James Robinson w dziele 'Dlaczego narody przegrywają' (2012) wykazali, że inkluzywne instytucje polityczne i prawne decydują o bogactwie narodów."), source: "https://www.penguinrandomhouse.com/books/206584/why-nations-fail-by-daron-acemoglu-and-james-robinson/" },
    ],
    simplified: [
      T(
        "Complex game-theoretic Nash equilibriums and public choice models are framed through clear lighthouse and shared pasture metaphors.",
        "Komplexe spieltheoretische Nash-Gleichgewichte wurden durch anschauliche Leuchtturm- und Weide-Beispiele zugaenglich gemacht.",
        "Złożone modele teorii gier i równowagi Nasha przedstawiono za pomocą czytelnych metafor latarni morskiej i wspólnego pastwiska."),
    ],
  },
};
