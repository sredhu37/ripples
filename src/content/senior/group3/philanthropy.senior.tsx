import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function FoundationLaunchDiagram({ lang, step }: DiagramProps) {
  const kritiName = lang === "pl" ? "Kasia" : lang === "de" ? "Klara" : "Kriti";
  const label = lang === "pl" ? "Kasia zakłada fundację stypendialną dla młodych naukowców" : lang === "de" ? "Klara gruendet eine gemeinnuetzige Stiftung fuer Bildungsstipendien" : "Kriti launching philanthropic endowment foundation for education";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#ec4899" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#ec4899" strokeWidth="2" />
        <path d="M 52 110 C 52 70 108 70 108 110" fill="#3b0764" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#db2777" stroke="#ec4899" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#f472b6">{kritiName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#fbcfe8">
          🏛️ {lang === "pl" ? "Fundacja Wieczysta: Kapitał Żelazny" : lang === "de" ? "Gemeinnuetzige Stiftung: Stiftungsvermoegen" : "Philanthropic Perpetual Endowment"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#db2777" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">🎓 🔬 ❤️</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#f472b6">
            {lang === "pl" ? "Kapitał nie jest wydawany, pracują zyski!" : lang === "de" ? "Kapital bleibt erhalten, nur Ertraege fliessen!" : "Principal untouched: only earnings fund grants!"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#831843" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Wieczne wsparcie dla kolejnych pokoleń" : lang === "de" ? "Ewige Foerderung fuer kommende Generationen" : "Perpetual Impact for Future Generations"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#fce7f3">
            {lang === "pl" ? "Strategiczna filantropia zamiast jednorazowych datków" : lang === "de" ? "Strategische Foerderung statt Einmalspenden" : "Catalytic capital solving systemic challenges"}
          </text>
        </g>
      )}
    </svg>
  );
}

function EndowmentEngineDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Mechanizm kapitału żelaznego (Endowment): zasada 4% rocznie" : lang === "de" ? "Die Mechanik eines Stiftungsvermoegens: Die 4%-Regel" : "Endowment flywheel: the sustainable 4% spending rule";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="150" height="85" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Endowment Core</text>
        <text x="110" y="90" textAnchor="middle" fontSize="14">🏦 📈</text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">$1,000,000 Invested</text>
        <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#2563eb">Grows at ~7% per year</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="150" height="85" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">Annual Grants (4%)</text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">🎓 🏥</text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#166534">$40,000 Grants</text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#15803d">Paid out every year forever</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#1e293b" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Pozostałe 3% zysków chroni kapitał przed inflacją" : lang === "de" ? "Die restlichen 3% Zuwachs schlagen die Inflation" : "Remaining 3% covers inflation to keep real purchasing power intact"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl" ? "Fundacja może wypłacać stypendia przez 100, 200 lub 500 lat" : lang === "de" ? "Die Stiftung finanziert Stipendien ueber 100 Jahre und laenger" : "The foundation can fund scholarships sustainably for centuries"}
          </text>
        </g>
      )}
    </svg>
  );
}

function EffectiveAltruismDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Efektywny altruizm: pomiar wpływu każdego wydanego dolara" : lang === "de" ? "Effektiver Altruismus: Maximaler Nutzen je Euro Spende" : "Effective altruism and cost-effective philanthropic impact";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="150" height="85" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">Vague Charity</text>
        <text x="110" y="90" textAnchor="middle" fontSize="14">🎪 🎈</text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#92400e">High overhead gala costs</text>
        <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#b45309">Unmeasured real outcome</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="150" height="85" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">Evidence-Based Action</text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">🦟 💊 💉</text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#065f46">Anti-malaria bed nets ($5 ea)</text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#047857">Measurable lives saved directly</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#78350f" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Filantropia naukowa mierzy liczbę uratowanych istnień na każdego wydanego dolara" : lang === "de" ? "Wissenschaftliche Philanthropie misst gerettete Menschenleben je Euro" : "Evidence-based philanthropy optimizes dollars per life saved"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#fde68a">
            {lang === "pl" ? "Dobre serce wymaga analitycznego umysłu, by nie marnować zasobów" : lang === "de" ? "Ein gutes Herz braucht klaren Verstand, um maximale Wirkung zu entfalten" : "Good intentions combined with rigorous economics produce 100x greater impact"}
          </text>
        </g>
      )}
    </svg>
  );
}

function EradicationVaccinesDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Eradykacja chorób zakaźnych (polio, ospa) dzięki kapitałowi filantropijnemu" : lang === "de" ? "Ausrottung toedlicher Seuchen durch gezielte Foerderung" : "Disease eradication through catalytic foundation funding";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <circle cx="200" cy="95" r="42" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="200" y="90" textAnchor="middle" fontSize="22">💉 🌍</text>
      <text x="200" y="112" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#15803d">Polio -99.9%</text>
      <g>
        <circle cx="85" cy="70" r="28" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="85" y="68" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c">Year 1988</text>
        <text x="85" y="84" textAnchor="middle" fontSize="8" fill="#b91c1c">350,000 cases</text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="315" cy="70" r="28" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="315" y="68" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065f46">Year 2026</text>
          <text x="315" y="84" textAnchor="middle" fontSize="8" fill="#065f46">&lt; 30 cases</text>
          <circle cx="200" cy="165" r="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="200" y="163" textAnchor="middle" fontSize="14">🤝</text>
          <text x="200" y="179" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#92400e">Gavi Alliance</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#15803d" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Filantropia podejmuje ryzyko tam, gdzie rządy działają zbyt wolno" : lang === "de" ? "Philanthropie uebernimmt Risiken dort, wo Staaten zu traege handeln" : "Foundations provide catalytic risk capital where public bureaucracies hesitate"}
          </text>
        </g>
      )}
    </svg>
  );
}

function LegacyGivingDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Długoterminowe dziedzictwo i The Giving Pledge" : lang === "de" ? "Lebenswerk und das Giving-Pledge-Versprechen" : "Philanthropic legacy and the Giving Pledge commitment";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <g>
        <circle cx="200" cy="90" r="38" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fontSize="20">🤝 ❤️</text>
        <text x="200" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">Giving Pledge</text>
        <rect x="40" y="45" width="105" height="65" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1" />
        <text x="92" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">Andrew Carnegie</text>
        <text x="92" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">2,500+ Public Libraries</text>
        <rect x="255" y="45" width="105" height="65" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1" />
        <text x="307" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">Alfred Nobel</text>
        <text x="307" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">Nobel Prizes Forever</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="140" width="300" height="42" rx="6" fill="#ede9fe" stroke="#a855f7" strokeWidth="1" />
          <text x="200" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#581c87">
            "The man who dies rich dies disgraced" (Carnegie)
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="8.5" fill="#7e22ce">
            Wealth as a sacred trust to empower society
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Prawdziwe bogactwo mierzy się tym, jak wiele dobra po sobie pozostawiasz" : lang === "de" ? "Wahrer Wohlstand bemisst sich daran, wie viel Gutes man der Welt hinterlaesst" : "The ultimate measure of accumulated wealth is how effectively it uplifts humanity"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [endowment, setEndowment] = useState(1000000);
  const [year, setYear] = useState(0);
  const [totalGrants, setTotalGrants] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Year: {year} | Endowment Principal: ${endowment.toLocaleString()} | Cumulative Grants Given: ${totalGrants.toLocaleString()}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            const grant = Math.round(endowment * 0.04);
            const growth = Math.round(endowment * 0.07);
            setEndowment((e) => e + growth - grant);
            setTotalGrants((g) => g + grant);
            setYear((y) => {
              const next = y + 5;
              if (next >= 15) onDone?.();
              return next;
            });
          }}
        >
          Advance 5 Years of Giving
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setEndowment(1000000);
            setYear(0);
            setTotalGrants(0);
          }}
        >
          Reset Foundation
        </button>
      </div>
      <div style={{ padding: "12px", background: year >= 15 ? "#eef8ef" : "#f1f5f9", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {year === 0
          ? "Initial Setup: $1,000,000 foundation endowment launched."
          : `Year ${year}: Foundation has granted $${totalGrants.toLocaleString()} to schools and clinics, while the principal grew to $${endowment.toLocaleString()}!`}
      </div>
    </div>
  );
}

function PhilanthropyWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>How does a perpetual endowment foundation sustain its charitable donations forever without running out of money?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>By spending 100% of all bank balances within the first 30 days</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>By investing the principal assets and spending only a modest percentage (around 4-5%) of annual investment earnings</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>By forcing all grant recipients to pay heavy monthly taxes back to the founder</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "philanthropy",
  story: [
    animatedBeat(
      [
        T("Meet Kriti. She reads the inspiring biography of Alfred Nobel, the inventor who dedicated his vast industrial wealth to establish the Nobel Prizes.", "Das ist Klara. Sie liest die Biographie von Alfred Nobel, der sein Industrieerbe fuer die Stiftung der beruehmten Nobelpreise stiftete.", "Poznaj Kasię. Czyta biografię Alfreda Nobla, wynalazcy, który przekazał swój majątek przemysłowy na utworzenie wieczystego funduszu Nagród Nobla."),
        T("Kriti realizes that financial acumen is not just about accumulating wealth: it is about deploying capital to solve civilization greatest dilemmas.", "Klara erkennt: Kluges Finanzwissen dient nicht nur dem Selbstzweck, sondern loest die draengendsten Probleme der Welt.", "Kasia dochodzi do wniosku, że prawdziwy sens wiedzy finansowej leży w wykorzystaniu kapitału do rozwiązywania problemów ludzkości."),
        T("She establishes a student-run philanthropic foundation with a perpetual *endowment* fund to finance science education for underprivileged girls.", "Sie gruendet eine gemeinnuetzige Bildungsstiftung mit einem *Stiftungsvermoegen*, um Maedchen in Naturwissenschaften zu foerdern.", "Zakłada uczniowską fundację ze stałym *kapitałem żelaznym (endowment)*, finansując stypendia naukowe dla uzdolnionej młodzieży."),
      ],
      FoundationLaunchDiagram,
    ),
    animatedBeat(
      [
        T("An endowment operates on an elegant mathematical principle: preserve the core capital while funding annual operations purely from investment returns.", "Ein Stiftungsvermoegen folgt einer eleganten Regel: Das Grundkapital bleibt unangetastet, nur die Ertraege finanzieren Projekte.", "Kapitał żelazny opiera się na eleganckiej zasadzie: nienaruszony kapitał bazowy pracuje na rynku, a cele statutowe finansowane są wyłącznie z wypracowanych zysków."),
        T("By adopting the prudent *four percent spending rule*, a one million dollar endowment provides forty thousand dollars in annual scholarships indefinitely.", "Nach der bewaehrten *4-Prozent-Regel* schuettet ein Vermoegen von einer Million Euro dauerhaft 40.000 Euro Stipendien jedes Jahr aus.", "Stosując ostrożną *zasadę czterech procent*, kapitał w wysokości miliona złotych generuje czterdzieści tysięcy złotych na stypendia rocznie przez pokolenia."),
        T("Because global market growth averages seven percent, the remaining three percent growth automatically shields the foundation against inflation.", "Weil der Markt im Schnitt sieben Prozent zulegt, gleichen die verbleibenden drei Prozent Wachstum die jaehrliche Teuerung aus.", "Ponieważ globalny portfel przynosi średnio siedem procent rocznie, pozostałe trzy procent automatycznie chroni kapitał przed inflacją."),
      ],
      EndowmentEngineDiagram,
    ),
    animatedBeat(
      [
        T("Modern strategic giving embraces *effective altruism*: evaluating charities not on emotional appeals, but on verified cost-per-life-saved.", "Moderne Geberkultur setzt auf *Effektiven Altruismus*: Spenden fliessen dorthin, wo sie messbar die groesste Wirkung erzielen.", "Nowoczesna filantropia opiera się na zasadach *efektywnego altruizmu*: ocenia organizacje nie na podstawie emocji, lecz twardych danych i kosztu uratowanego życia."),
        T("While glamorous black-tie galas often burn half their budget on catering, distributing five-dollar insecticide-treated mosquito bed nets prevents millions of malaria infections.", "Waehrend teure Gala-Abende viel Geld verschlingen, retten guenstige, mit Insektiziden behandelte Moskitonetze fuer fuenf Euro tausende Kinder vor Malaria.", "Podczas gdy wystawne gale charytatywne marnują fundusze na catering, proste moskitiery antymalaryczne za kilkanaście złotych ratują życie tysiącom dzieci."),
        T("Applying rigorous financial discipline to charitable giving magnifies the humanitarian impact of every contributed dollar a hundredfold.", "Wer wirtschaftliche Analyse auf das Spendenwesen anwendet, vervielfacht den humanitaeren Nutzen jedes einzelnen gespendeten Euros.", "Zastosowanie rygorystycznej analizy ekonomicznej do działalności charytatywnej stukrotnie zwiększa realną pomoc niesioną potrzebującym."),
      ],
      EffectiveAltruismDiagram,
    ),
    animatedBeat(
      [
        T("Philanthropic risk capital can tackle long-shot moonshots where private markets see no profit and government bureaucracies hesitate.", "Philanthropisches Risikokapital wagt Innovationen dort, wo kein schneller Profit lockt und staatliche Behoerden zoegern.", "Filantropijny kapitał wysokiego ryzyka podejmuje wyzwania tam, gdzie brakuje komercyjnego zysku, a państwowa biurokracja obawia się porażki."),
        T("The Global Polio Eradication Initiative, backed by private foundations and the Gavi Vaccine Alliance, reduced global polio cases by 99.9%.", "Die weltweite Initiative zur Ausrottung der Kinderlaehmung drueckte dank privater Stiftungen die Polio-Faelle weltweit um 99,9%.", "Globalna Inicjatywa na rzecz Eradykacji Polio, wspierana przez prywatne fundacje i sojusz Gavi, zredukowała zachorowania na polio o ponad 99,9%."),
        T("Catalytic philanthropy acts as civilization discovery engine, proving new medical treatments and educational technologies that governments later scale universally.", "Katalytische Philanthropie wirkt als Impulsgeber: Sie erprobt neue Impfstoffe und Schulen, die Staaten spaeter flaechendeckend uebernehmen.", "Filantropia katalizująca jest poligonem doświadczalnym cywilizacji: testuje szczepionki i innowacje edukacyjne, które rządy mogą wdrożyć w całym kraju."),
      ],
      EradicationVaccinesDiagram,
    ),
    animatedBeat(
      [
        T("Through initiatives like *The Giving Pledge*, modern entrepreneurs commit the vast majority of their fortunes to public good.", "Mit Initiativen wie dem *Giving Pledge* verpflichten sich Vermoegende, den Grossteil ihres Reichtums gemeinnuetzigen Zielen zu widmen.", "Dzięki inicjatywom takim jak *The Giving Pledge* współcześni przedsiębiorcy zobowiązują się przekazać większość majątku na cele społeczne."),
        T("Just as Andrew Carnegie funded twenty-five hundred free public libraries across English-speaking nations, enduring legacies are carved in human progress.", "So wie Andrew Carnegie 2.500 oeffentliche Bibliotheken baute, hinterlaesst wahrhaftiger Reichtum Spuren im Fortschritt der Menschheit.", "Podobnie jak Andrew Carnegie ufundował ponad 2500 bezpłatnych bibliotek publicznych, trwały ślad w historii pozostawia wsparcie ludzkiego rozwoju."),
        T("Mastering money is complete only when you learn how to transform financial prosperity into enduring social good for the world.", "Finanzielle Bildung ist erst dann vollstaendig, wenn du verstehst, wie Vermoegen das Leben anderer Menschen nachhaltig verbessert.", "Edukacja finansowa osiąga pełnię dopiero wtedy, gdy zrozumiesz, jak przekuć sukces materialny w trwałe dobro dla społeczeństwa."),
      ],
      LegacyGivingDiagram,
    ),
  ],
  toyIntro: T(
    "Manage a perpetual endowment fund: watch how the 4% spending rule delivers scholarships year after year while capital compounds continuously.",
    "Steuere ein Stiftungsvermoegen: Sieh zu, wie die 4%-Regel jaehrlich Foerdergelder ausschuettet, waehrend das Grundkapital staendig waechst.",
    "Zarządzaj kapitałem żelaznym fundacji: sprawdź, jak reguła 4% pozwala wypłacać stypendia rok po roku przy jednoczesnym wzroście kapitału głównego."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why do perpetual university and charitable endowments follow the 4-5% annual spending rule?",
        "Warum beschraenken Stiftungen und Universitaeten ihre jaehrlichen Ausschuettungen auf rund 4 bis 5 Prozent?",
        "Dlaczego fundacje wieczyste i uniwersyteckie kapitały żelazne ograniczają coroczne wypłaty do 4-5% wartości aktywów?",
      ),
      options: [
        { text: T("To ensure total spending does not exceed real net investment returns after inflation, allowing the fund to survive and grant aid forever", "Damit die Foerdermittel die inflationsbereinigte Rendite nicht uebersteigen und die Stiftung auf ewig bestehen kann", "Aby roczne wydatki nie przekraczały realnego zysku ponad inflację, co pozwala fundacji działać i wypłacać środki przez stulecia"), correct: true },
        { text: T("Because banks automatically confiscate 95% of all charity money every December", "Weil Banken jeden Dezember 95% aller Spendenkonten gesetzlich beschlagnahmen", "Ponieważ banki co roku w grudniu przejmują 95% oszczędności fundacji"), correct: false },
        { text: T("Because spending more than $10,000 per year on school books is illegal under European copyright law", "Weil das Urheberrecht den Kauf von mehr als 100 Schulbuechern im Jahr verbietet", "Ponieważ prawo autorskie zabrania zakupu podręczników za kwotę wyższą niż 10 tysięcy euro"), correct: false },
      ],
      hint: T(
        "Think about what happens to a bank account if you withdraw more money than it earns in interest each year.",
        "Ueberlege, was mit einem Konto passiert, von dem man jaehrlich mehr abhebt, als Zinsen nachwachsen.",
        "Zastanów się, co stanie się z kontem, z którego co roku wypłaca się więcej, niż wynosi roczny zysk z odsetek."),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the core philosophy behind 'Effective Altruism'?",
        "Was ist der Leitgedanke des 'Effektiven Altruismus'?",
        "Jaka jest główna idea przyświecająca 'Efektywnemu Altruizmowi'?",
      ),
      options: [
        { text: T("Using rigorous empirical evidence, cost-effectiveness analysis, and data to maximize the positive humanitarian impact per dollar given", "Durch wissenschaftliche Daten und Kosten-Nutzen-Analysen den groesstmoeglichen Nutzen je gespendetem Euro zu erzielen", "Wykorzystanie badań naukowych, danych empirycznych i analizy kosztów w celu maksymalizacji realnego dobra niesionego za każdą przekazaną złotówkę"), correct: true },
        { text: T("Giving money exclusively to political advertising campaigns during elections", "Geld ausschliesslich fuer Wahlkampfwerbung im Fernsehen auszugeben", "Wpłacanie pieniędzy wyłącznie na spoty wyborcze w trakcie kampanii"), correct: false },
        { text: T("Refusing to ever donate any money until you turn 100 years old", "Bis zum 100. Geburtstag jede Hilfe fuer andere Menschen strikt zu verweigern", "Odmowa niesienia jakiejkolwiek pomocy przed ukończeniem setnego roku życia"), correct: false },
      ],
      hint: T(
        "Think about measuring how many children are protected from deadly diseases per dollar spent.",
        "Denke an den konkreten Nachweis, wie viele Kinder pro gespendetem Euro vor Krankheiten geschuetzt werden.",
        "Pomyśl o precyzyjnym mierzeniu liczby dzieci uchronionych przed chorobami za każdą wydaną sumę."),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify how an endowment foundation achieves permanent financial self-sustainability.",
        "Bestimme, wie eine Stiftung dauerhafte finanzielle Unabhaengigkeit erreicht.",
        "Wskaż, w jaki sposób fundacja wieczysta osiąga trwałą samowystarczalność finansową.",
      ),
      Widget: PhilanthropyWidget,
      hint: T(
        "Focus on preserving the principal capital and spending only conservative investment earnings.",
        "Achte darauf, das Grundvermoegen unangetastet zu lassen und nur vorsichtige Renditen auszuschuetten.",
        "Zwróć uwagę na nienaruszalność kapitału żelaznego i wydatkowanie jedynie umiarkowanych zysków z inwestycji."),
    },
  ],
  askDad: T(
    "Ask your parent: Which causes or charities does your family support, and how do you evaluate whether they use donations transparently?",
    "Frage deine Eltern: Welche gemeinnuetzigen Organisationen unterstuetzt ihr, und woran erkennt man transparente und wirksame Spendenprojekte?",
    "Zapytaj rodziców: Jakie organizacje społeczne lub fundacje wspieracie w domu, i w jaki sposób sprawdzacie, czy przekazywane środki są wykorzystywane rzetelnie?"),
  realLife: {
    title: T(
      "Real world: The Nobel Foundation endowment and GiveWell charity recommendations",
      "Echte Welt: Das Stiftungsvermoegen der Nobel-Stiftung und GiveWell-Analysen",
      "Prawdziwy świat: Kapitał żelazny Fundacji Nobla i rankingi skuteczności GiveWell",
    ),
    body: T(
      "When Alfred Nobel died in 1896, he left 31 million Swedish kronor. Invested across conservative bonds and global equities, the Nobel Foundation has awarded thousands of prestigious prizes for over 120 years, while its endowment grew to over 5.5 billion kronor. In modern giving, meta-charity evaluators like GiveWell independently audit non-profits worldwide, identifying top-rated interventions (like vitamin A supplementation and anti-malaria bed nets) where just $3,500 to $5,000 reliably saves a human child's life.",
      "Als Alfred Nobel 1896 starb, hinterliess er 31 Millionen Kronen. Klug investiert in Aktien und Anleihen, finanziert die Stiftung seit ueber 120 Jahren Nobelpreise, waehrend das Stiftungsvermoegen auf ueber 5,5 Milliarden Kronen anwuchs. Organisationen wie GiveWell pruefen heute Hilfswerke unabhaengig und weisen nach, dass rund 3.500 bis 5.000 Euro in Spitzenprojekten (z.B. Moskitonetze) statistisch ein Kinderleben retten.",
      "Gdy Alfred Nobel zmarł w 1896 roku, pozostawił 31 milionów koron. Zainwestowane w bezpieczne obligacje i globalne akcje, ufundowały tysiące nagród przez ponad 120 lat, a sam fundusz wzrósł do ponad 5,5 miliarda koron. Dziś niezależny audytor GiveWell bada fundacje na całym świecie, wykazując, że w najlepszych programach (np. moskitiery i suplementacja witaminy A) koszt uratowania życia dziecka wynosi zaledwie 3,5-5 tys. dolarów."),
  },
  factCard: {
    claims: [
      { text: T("Alfred Nobel's 1895 will directed that the capital from his estate be converted into an endowment fund and invested in safe securities to award annual prizes in perpetuity.", "Alfred Nobels Testament von 1895 verfuegte, dass sein Nachlass in einem Stiftungsvermoegen angelegt wird, um auf ewig Nobelpreise zu finanzieren.", "Testament Alfreda Nobla z 1895 roku nakazał przekazanie majątku na fundusz żelazny inwestowany w bezpieczne papiery wartościowe w celu wieczystego finansowania nagród."), source: "https://www.nobelprize.org/alfred-nobel/alfred-nobels-will/" },
      { text: T("Andrew Carnegie's 1889 essay 'The Gospel of Wealth' argued that surplus wealth should be administered during one's lifetime to advance the public good.", "Andrew Carnegies Essay 'The Gospel of Wealth' von 1889 forderte, Vermoegen zu Lebzeiten fuer das Wohl der Allgemeinheit einzusetzen.", "Esej Andrew Carnegiego 'Ewangelia bogactwa' z 1889 roku głosił, że nadwyżki majątkowe powinny być za życia przeznaczane na pożytek całego społeczeństwa."), source: "https://www.carnegie.org/about/our-history/gospelofwealth/" },
      { text: T("GiveWell publishes rigorous quantitative cost-effectiveness analyses evaluating how top global health charities save lives per dollar spent.", "GiveWell veroeffentlicht quantitative Kosten-Nutzen-Analysen, wie viel Leben Hilfsorganisationen je Dollar retten.", "Organizacja GiveWell publikuje rygorystyczne analizy efektywności kosztowej wskazujące organizacje najskuteczniej ratujące ludzkie życie w przeliczeniu na każdego dolara."), source: "https://www.givewell.org/how-we-work/our-criteria/cost-effectiveness" },
      { text: T("The Giving Pledge, launched in 2010 by Warren Buffett, Bill Gates, and Melinda French Gates, includes commitments from over 240 billionaires worldwide.", "Der 2010 gestartete 'Giving Pledge' umfasst Selbstverpflichtungen von ueber 240 Milliardaeren weltweit zur Spende des Grossteils ihres Vermoegens.", "Inicjatywa The Giving Pledge, powołana w 2010 roku przez Warrena Buffetta oraz Billa i Melindę Gates, zrzesza ponad 240 miliarderów deklarujących oddanie większości majątku na cele dobroczynne."), source: "https://givingpledge.org/" },
      { text: T("The World Health Organization (WHO) and Global Polio Eradication Initiative documented a greater than 99% reduction in global polio cases since 1988.", "Die Weltgesundheitsorganisation WHO belegt einen Rueckgang der Kinderlaehmung um mehr als 99% seit 1988 durch koordinierte Impfprogramme.", "Światowa Organizacja Zdrowia (WHO) potwierdza ponad 99-procentowy spadek zachorowań na polio na świecie od 1988 roku dzięki skoordynowanym szczepieniom."), source: "https://www.who.int/news-room/fact-sheets/detail/poliomyelitis" },
    ],
    simplified: [
      T(
        "Complex non-profit tax exemption law (501(c)(3) vs charitable trusts vs private foundations) is framed through the universal mechanics of endowment compounding and impact evaluation.",
        "Komplexes Stiftungs- und Gemeinnuetzigkeitsrecht wurde auf die Kernmechanik des Vermoegenserhalts und der Wirkungsmessung fokussiert.",
        "Złożone przepisy podatkowe dotyczące fundacji i pożytku publicznego uproszczono do uniwersalnych zasad działania kapitału żelaznego i mierzenia efektów społecznych."),
    ],
  },
};
