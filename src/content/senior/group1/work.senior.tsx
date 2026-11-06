import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function HumanCapitalDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Human capital and productivity diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      <rect x="40" y="60" width="140" height="130" rx="10" fill="#fff" stroke="#868e96" strokeWidth="2" />
      <text x="110" y="90" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#495057">Commodity Labor</text>
      <text x="110" y="120" textAnchor="middle" fontSize="12" fill="#868e96">High Supply</text>
      <text x="110" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#d9480f">$15 / hr</text>

      {step >= 1 && (
        <g>
          <rect x="220" y="60" width="140" height="130" rx="10" fill="#eef7f8" stroke="#107569" strokeWidth="2.5" />
          <text x="290" y="90" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#107569">Human Capital</text>
          <text x="290" y="120" textAnchor="middle" fontSize="12" fill="#1d3f47">Rare Specialist</text>
          <text x="290" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2b8a3e">$95 / hr</text>
        </g>
      )}

      {step >= 2 && (
        <path d="M 180 125 L 220 125" stroke="#107569" strokeWidth="3" markerEnd="url(#arrow)" />
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [skillLevel, setSkillLevel] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Skill Level: {skillLevel} | Value generated: ${skillLevel * 45}/hr
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setSkillLevel((s) => {
              const next = Math.min(5, s + 1);
              if (next >= 3) onDone?.();
              return next;
            });
          }}
        >
          Study & Upgrade Skills (+1)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setSkillLevel(1)}
        >
          Reset to Baseline
        </button>
      </div>
      <div style={{ padding: "12px", background: "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        Hourly productivity multiplier: {skillLevel}x. Specialized knowledge creates leverage.
      </div>
    </div>
  );
}

function WorkWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What primary factor drives sustained higher wages for a career?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Working 80 hours doing repetitive manual tasks</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>High productivity backed by scarce specialized skills</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Requesting higher bonuses from employers</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "work",
  story: [
    animatedBeat(
      [
        T("Why do different professions earn vastly different compensation?", "Warum verdienen verschiedene Berufe so unterschiedliche Gehaelter?", "Dlaczego różne zawody otrzymują tak diametralnie różne wynagrodzenia?"),
        T("Compensation is not simply determined by how hard someone sweats.", "Bezahlung haengt nicht einfach davon ab, wie sehr man schwitzt.", "Wynagrodzenie nie zależy wyłącznie od tego, jak ciężko ktoś fizycznie pracuje."),
        T("Wages are governed by *marginal productivity* and the scarcity of required skills.", "Geregelte Loehne basieren auf *Grenzproduktivitaet* und der Seltenheit von Faehigkeiten.", "Płace wynikają z *krańcowej produktywności* i rzadkości poszukiwanych umiejętności."),
      ],
      HumanCapitalDiagram,
    ),
    animatedBeat(
      [
        T("Economists describe your accumulated knowledge and capabilities as *human capital*.", "Oekonomen bezeichnen erworbenes Wissen und Koennen als *Humankapital*.", "Ekonomiści określają zdobytą wiedzę i umiejętności mianem *kapitału ludzkiego*."),
        T("When an individual invests time in mastering engineering, surgery, or data systems, they enhance their human capital.", "Wer Zeit investiert, um Ingenieurwesen oder Medizin zu lernen, vermehrt sein Humankapital.", "Kto inwestuje czas w naukę inżynierii, medycyny czy systemów danych, ten pomnaża swój kapitał ludzki."),
        T("A worker operating advanced technology produces more economic value in one hour than dozens of workers using manual methods.", "Eine Fachkraft mit moderner Technologie schafft in einer Stunde mehr Wert als viele manuelle Helfer.", "Specjalista korzystający z zaawansowanej technologii tworzy w godzinę większą wartość niż wielu pracowników fizycznych."),
      ],
      HumanCapitalDiagram,
    ),
    animatedBeat(
      [
        T("If a job requires skills that anyone can learn in fifteen minutes, labor supply is abundant.", "Erfordert eine Aufgabe Faehigkeiten, die jeder in 15 Minuten lernt, ist das Angebot gross.", "Jeśli praca wymaga umiejętności, których można nauczyć się w kwadrans, podaż pracy jest ogromna."),
        T("Abundant labor supply pushes competitive market wages lower.", "Ein hohes Angebot an Arbeitskraeften drueckt die Lohe auf dem Wettbewerbsmarkt.", "Wysoka podaż pracowników powoduje spadek rynkowych stawek płac."),
        T("When skills take years of discipline to develop, labor supply is scarce, commanding higher wages.", "Faehigkeiten, die jahrelange Disziplin fordern, sind selten und fuehren zu hoeheren Gehaeltern.", "Umiejętności wymagające lat dyscypliny są rzadkie, co pozwala uzyskać wyższe zarobki."),
      ],
      HumanCapitalDiagram,
    ),
    animatedBeat(
      [
        T("There is also a crucial distinction between *gross salary* and *net salary*.", "Zudem gibt es einen wichtigen Unterschied zwischen *Bruttogehalt* und *Nettogehalt*.", "Istnieje także kluczowe rozróżnienie między *pensją brutto* a *pensją netto*."),
        T("Gross salary is your total contracted earnings before mandatory deductions.", "Das Bruttogehalt ist der Gesamtbetrag vor gesetzlichen Abzuegen.", "Pensja brutto to pełna kwota na umowie przed obowiązkowymi potrąceniami."),
        T("Net pay is what actually lands in your bank account after taxes, pension, and insurance.", "Das Nettogehalt ist das, was nach Steuern, Rente und Krankenversicherung auf dem Konto landet.", "Pensja netto to kwota, która faktycznie trafia na konto po odliczeniu podatków i składek."),
      ],
      HumanCapitalDiagram,
    ),
    animatedBeat(
      [
        T("Your greatest financial asset when you are young is your earning capacity.", "Dein groesster Vermogenswert in jungen Jahren ist deine eigene Erwerbsfaehigkeit.", "Twoim największym aktywem finansowym w młodym wieku jest Twoja zdolność do zarabiania."),
        T("Continuous learning compounds your human capital faster than simple interest.", "Kontinuierliches Lernen laesst dein Humankapital schneller wachsen als Zinsen.", "Ciągła nauka pomnaża Twój kapitał ludzki szybciej niż jakikolwiek procent w banku."),
        T("Invest in skills that are rare, valuable, and hard to automate.", "Investiere in Faehigkeiten, die selten, wertvoll und schwer zu automatisieren sind.", "Inwestuj w umiejętności, które są rzadkie, wartościowe i trudne do zautomatyzowania."),
      ],
      HumanCapitalDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how developing scarce skills multiplies your hourly productivity.",
    "Untersuche, wie der Aufbau seltener Faehigkeiten deine Stuendliche Produktivitaet vervielfacht.",
    "Zobacz, jak rozwijanie rzadkich umiejętności pomnaża Twoją produktywność na godzinę.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does the term human capital refer to in economics?",
        "Worauf bezieht sich der Begriff Humankapital in der Volkswirtschaftslehre?",
        "Do czego odnosi się pojęcie kapitału ludzkiego w ekonomii?",
      ),
      options: [
        { text: T("The collective skills, knowledge, and experience of a person", "Die Gesamtheit der Faehigkeiten, Kenntnisse und Erfahrungen eines Menschen", "Zbiór umiejętności, wiedzy i doświadczenia danego człowieka"), correct: true },
        { text: T("The physical bank balance a person holds in cash", "Das physische Bankguthaben, das eine Person in bar haelt", "Fizyczne środki pieniężne zgromadzone na koncie bankowym") },
        { text: T("The machinery and real estate owned by a company", "Die Maschinen und Immobilien im Besitz eines Unternehmens", "Maszyny i nieruchomości będące własnością przedsiębiorstwa") },
      ],
      hint: T(
        "It is built through study, apprenticeship, and practice.",
        "Es entsteht durch Lernen, Ausbildung und praktische Erfahrung.",
        "Powstaje poprzez naukę, zdobywanie kwalifikacji i praktykę.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the difference between gross pay and net pay?",
        "Was ist der Unterschied zwischen Brutto- und Nettogehalt?",
        "Jaka jest różnica między wynagrodzeniem brutto a netto?",
      ),
      options: [
        { text: T("Gross is total earnings; net is what remains after taxes and contributions", "Brutto ist das Gesamtentgelt; Netto bleibt nach Steuern und Beitraegen uebrig", "Brutto to całość zarobków; netto to kwota po potrąceniu podatków i składek"), correct: true },
        { text: T("Net pay is always higher than gross pay", "Das Nettogehalt ist immer hoeher als das Bruttogehalt", "Pensja netto jest zawsze wyższa niż pensja brutto") },
        { text: T("Gross pay only applies to overtime hours", "Brutto gilt ausschliesslich fuer Ueberstunden", "Brutto dotyczy wyłącznie godzin nadliczbowych") },
      ],
      hint: T(
        "Taxes and social contributions are withheld from gross pay.",
        "Steuern und Sozialabgaben werden vom Bruttogehalt einbehalten.",
        "Podatki i składki społeczne są potrącane z pensji brutto.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the primary driver of sustained career compensation.",
        "Waehle die Hauptursache fuer dauerhaft hoehere Berufsgehaelter aus.",
        "Wskaż główną przyczynę trwale wyższych zarobków w karierze zawodowej.",
      ),
      Widget: WorkWidget,
      hint: T(
        "Scarce, high-value skills command stronger market demand.",
        "Seltene und wertvolle Faehigkeiten geniessen hoehere Marktnachfrage.",
        "Rzadkie i wartościowe umiejętności cieszą się wyższym popytem rynkowym.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Which skills or certifications created the biggest boost in their career path?",
    "Frage deine Eltern: Welche Faehigkeiten oder Qualifikationen haben ihrem Karriereweg den groessten Schub gegeben?",
    "Zapytaj rodziców: Jakie umiejętności lub kwalifikacje dały największy impuls ich karierze zawodowej?",
  ),
  realLife: {
    title: T(
      "Real world: The wage premium for specialized expertise",
      "Echte Welt: Die Gehaltspraemie fuer spezialisiertes Fachwissen",
      "Prawdziwy świat: Premia płacowa za specjalistyczną wiedzę",
    ),
    body: T(
      "Data from the OECD and national labor bureaus show that individuals with specialized technical, medical, or analytical skills earn significantly higher median lifetime earnings compared to general labor, because their marginal economic output is substantially higher.",
      "Daten der OECD und nationaler Arbeitsaemter zeigen, dass Fachkraefte mit technischen, medizinischen oder analytischen Kenntnissen ein deutlich hoeheres Lebenszeiteinkommen erzielen, da ihre Grenzproduktivitaet wesentlich hoeher liegt.",
      "Dane OECD i krajowych urzędów pracy dowodzą, że specjaliści z wiedzą techniczną, medyczną lub analityczną osiągają znacznie wyższe łączne dochody w życiu, ponieważ ich krańcowa wydajność jest znacznie wyższa.",
    ),
  },
  factCard: {
    claims: [
      { text: T("Gary Becker received the Nobel Memorial Prize in Economic Sciences in 1992 for his foundational work on human capital theory.", "Gary Becker erhielt 1992 den Nobelpreis fuer Wirtschaftswissenschaften fuer seine Arbeiten zur Humankapitaltheorie.", "Gary Becker otrzymał Nagrodę Nobla w dziedzinie ekonomii w 1992 roku za fundamentalne prace nad teorią kapitału ludzkiego."), source: "https://www.nobelprize.org/prizes/economic-sciences/1992/becker/facts/" },
      { text: T("OECD studies confirm that educational attainment strongly correlates with higher median earnings and lower unemployment risk.", "OECD-Studien bestaetigen, dass hoehere Bildungsabschluesse mit hoeheren Medianeinkommen und geringerer Arbeitslosigkeit korrelieren.", "Badania OECD potwierdzają, że poziom wykształcenia silnie koreluje z wyższymi medianami zarobków i niższym ryzykiem bezrobocia."), source: "https://www.oecd.org/education/education-at-a-glance/" },
      { text: T("The US Bureau of Labor Statistics tracks earnings differentials across occupations based on specialized skill requirements.", "Das US Bureau of Labor Statistics erfasst Gehaltsunterschiede nach Berufen auf Basis von Qualifikationsanforderungen.", "Amerykańskie Biuro Statystyki Pracy rejestruje zróżnicowanie płac w zawodach w oparciu o wymagane kwalifikacje."), source: "https://www.bls.gov/emp/chart-unemployment-earnings-education.htm" },
      { text: T("German Federal Statistical Office (Destatis) records mandatory social security contributions and income taxes that create the wedge between gross and net pay.", "Das Statistische Bundesamt (Destatis) erfasst Abgaben und Steuern, die den Unterschied zwischen Brutto- und Nettolohn bilden.", "Niemiecki Federalny Urząd Statystyczny (Destatis) rejestruje składki i podatki tworzące różnicę między pensją brutto a netto."), source: "https://www.destatis.de/DE/Themen/Arbeit/Verdienste/_inhalt.html" },
      { text: T("Marginal productivity theory posits that employers pay wages matching the marginal revenue product generated by each worker.", "Die Grenzproduktivitaetstheorie besagt, dass Loehne dem durch die Arbeitskraft zusaetzlich erzeugten Ertrag entsprechen.", "Teoria krańcowej produktywności zakłada, że pracodawcy płacą pensje odpowiadające wartości dodanej wygenerowanej przez pracownika."), source: "https://www.britannica.com/money/marginal-productivity-theory" },
    ],
    simplified: [
      T(
        "Complex labor union collective bargaining agreements and regional tax schedules are simplified to show the core gross vs net relationship.",
        "Komplexe Tarifvertraege und regionale Steuertabellen werden vereinfacht, um den Zusammenhang zwischen Brutto und Netto zu veranschaulichen.",
        "Złożone układy zbiorowe i regionalne tabele podatkowe uproszczono, aby pokazać podstawową relację brutto do netto.",
      ),
    ],
  },
};
