import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function SaltMarchDiagram({ lang, step }: DiagramProps) {
  const kritiName = lang === "pl" ? "Kasia" : lang === "de" ? "Klara" : "Kriti";
  const label = lang === "pl" ? "Kasia bada Marsz Solny i ruch niepodległościowy: niestosowanie przemocy i bojkot ekonomiczny" : lang === "de" ? "Klara analysiert den Salzmarsch: Gewaltfreier Widerstand und wirtschaftlicher Boykott" : "Kriti studying the Salt March and the Indian Independence Movement: nonviolent civil resistance";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#f59e0b" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#78350f" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fef3c7">{kritiName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fef3c7">
          🌾 {lang === "pl" ? "Satyagraha: Siła Prawdy i Bojkot" : lang === "de" ? "Satyagraha: Gewaltfreier Widerstand" : "Satyagraha: Moral & Economic Boycott"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#d97706" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="16">🧂 🧵 🗳️</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fcd34d">
            {lang === "pl" ? "Marsz Solny (1930) • Kołowrotek Charkha" : lang === "de" ? "Salzmarsch (1930) • Das Spinnrad" : "Salt March (1930) • The Charkha Wheel"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#78350f" />
          <text x="250" y="170" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Naruszenie monopolu solnego i bojkot" : lang === "de" ? "Bruch des staatlichen Salzmonopols" : "Defying the colonial salt tax monopoly"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#fde68a">
            {lang === "pl" ? "Protest bez przemocy obnażył bezsilność imperium" : lang === "de" ? "Gewaltlosigkeit entlarvte koloniale Willkuer" : "Disciplined nonviolence unmasked imperial rule"}
          </text>
        </g>
      )}
    </svg>
  );
}

function EconomicsOfBoycottDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Ekonomia bojkotu: kołowrotek charkha, khadi i załamanie importu tkanin z Anglii" : lang === "de" ? "Wirtschaft des Boykotts: Spinnrad, Khadi und Einbruch britischer Importe" : "Economics of boycott: the charkha wheel, domestic khadi, and the collapse of cloth imports";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafaf9" stroke="#78350f" strokeWidth="2" />
      <g>
        <circle cx="90" cy="100" r="32" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="90" y="95" textAnchor="middle" fontSize="18">☸️ 🧵</text>
        <text x="90" y="115" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#92400e">Homespun Khadi</text>

        <rect x="230" y="70" width="130" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="295" y="95" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">Manchester Cloth</text>
        <text x="295" y="115" textAnchor="middle" fontSize="8.5" fill="#7f1d1d">Imports down 70%</text>

        <line x1="125" y1="100" x2="225" y2="100" stroke="#dc2626" strokeWidth="2.5" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="145" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="163" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fde68a">
            The Charkha was an economic tool for self-reliance (Swadeshi)
          </text>
          <text x="200" y="178" textAnchor="middle" fontSize="8.5" fill="#cbd5e1">
            {lang === "pl" ? "Każda rodzina tkająca własne ubrania odbierała zyski brytyjskim fabrykom" : lang === "de" ? "Selbstgesponnene Kleidung entzog den britischen Fabriken Profite" : "Spinning local yarn deprived colonial mills of commercial profits"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#78350f" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Gdy obywatele odmawiają zakupu, kolonialna kalkulacja zysków staje się ujemna" : lang === "de" ? "Verweigern Konsumenten den Kauf, bricht das Kolonialgeschaeft ein" : "When consumers refuse to cooperate, colonial occupation becomes financially unsustainable"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ConstitutionalDemocracyDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Konstytucja Indii z 1950 roku: dr B.R. Ambedkar i powszechne prawo głosu" : lang === "de" ? "Indische Verfassung von 1950: Dr. B.R. Ambedkar und allgemeines Wahlrecht" : "The 1950 Constitution of India: Dr. B.R. Ambedkar and universal adult franchise";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <g>
        <circle cx="100" cy="90" r="34" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <text x="100" y="85" textAnchor="middle" fontSize="18">📜 ⚖️</text>
        <text x="100" y="105" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1e40af">Constitution 1950</text>

        <rect x="230" y="65" width="130" height="55" rx="6" fill="#1e40af" />
        <text x="295" y="88" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">Universal Franchise</text>
        <text x="295" y="104" textAnchor="middle" fontSize="8" fill="#dbeafe">Equal vote for every citizen</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#60a5fa">
            Dr. B.R. Ambedkar: Abolishing untouchability and legal discrimination
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#e2e8f0">
            {lang === "pl" ? "Konstytucja zagwarantowała wolność wyznania, równość wobec prawa i prawa obywatelskie" : lang === "de" ? "Verankerung von Grundrechten, Religionsfreiheit und Gleichheit vor dem Gesetz" : "Fundamental rights guaranteed regardless of caste, creed, religion, or gender"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1d4ed8" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Największa demokracja konstytucyjna świata narodziła się z jasnych reguł prawa" : lang === "de" ? "Die groesste Demokratie der Welt basiert auf klaren Rechtsprinzipien" : "The world's largest constitutional democracy was forged through deliberate legal design"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DemocraticInstitutionsDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Instytucje demokratyczne: niezależna komisja wyborcza i pokojowe przekazanie władzy" : lang === "de" ? "Demokratische Institutionen: Unabhaengige Wahlkommission und friedliche Machtuebergabe" : "Democratic institutions: independent election commission and peaceful transition of power";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <g>
        <circle cx="200" cy="80" r="34" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">🗳️ 🕊️</text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#15803d">Peaceful Elections</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#14532d" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            1951-1952: The first general election with 173 million voters
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#bbf7d0">
            {lang === "pl" ? "Wbrew sceptykom, miliony ubogich obywateli oddało głosy w sposób zdyscyplinowany i wolny" : lang === "de" ? "Trotz aller Zweifel stimmten Millionen Buerger geordnet und friedlich ab" : "Defying colonial skeptics, hundreds of millions participated peacefully in free elections"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Przetrwanie demokracji opiera się na wierze obywateli w uczciwość wyborów" : lang === "de" ? "Demokratie lebt vom Vertrauen der Buerger in freie und faire Wahlen" : "Democracy endures because citizens trust the integrity of the ballot box"}
          </text>
        </g>
      )}
    </svg>
  );
}

function GlobalLegacyOfResistanceDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Globalne dziedzictwo: wpływ na Martina Luthera Kinga, Mandellę i ruch praw człowieka" : lang === "de" ? "Globales Erbe: Einfluss auf Martin Luther King, Mandela und Buergerrechte" : "Global legacy: inspiring Martin Luther King Jr., Nelson Mandela, and civil rights movements worldwide";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <g>
        <circle cx="200" cy="80" r="34" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">🌍 🤝</text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#581c87">Global Ripple</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#581c87" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Nonviolent resistance became a universal blueprint for justice
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#e9d5ff">
            {lang === "pl" ? "Od walki o prawa obywatelskie w USA po obalenie apartheidu w RPA" : lang === "de" ? "Von der US-Buergerrechtsbewegung bis zum Ende der Apartheid in Suedafrika" : "From US civil rights marches in Selma to the dismantling of apartheid in South Africa"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Odwaga moralna połączona ze strategicznym naciskiem ekonomicznym potrafi zmienić bieg historii" : lang === "de" ? "Moralischer Mut und kluger Boykott koennen Weltgeschichte schreiben" : "Moral courage paired with strategic economic leverage can reshape history"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [spunSpools, setSpunSpools] = useState(0);
  const solidarity = Math.min(100, spunSpools * 34);
  const isFree = spunSpools >= 3;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Homespun Khadi Spools: {spunSpools} | National Solidarity: {solidarity}% | Status: {isFree ? "Self-Reliant & Free" : "Dependent on Imports"}
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            const next = spunSpools + 1;
            setSpunSpools(next);
            if (next >= 3) onDone?.();
          }}
        >
          Spin Swadeshi Thread (+1 Spool)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setSpunSpools(0)}
        >
          Reset Spindles
        </button>
      </div>
      <div style={{ padding: "12px", background: isFree ? "#eef8ef" : "#fef2f2", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {isFree
          ? "Unstoppable Solidarity: Collective economic self-reliance through homespun yarn and the Salt March breaks the psychological and commercial grip of colonial monopoly!"
          : "Spin more spools to organize nationwide economic boycotts and demonstrate the power of self-reliance."}
      </div>
    </div>
  );
}

function IndependenceWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Why was Mahatma Gandhi's 1930 Salt March such an effective political and economic strategy?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Because salty water turns sand into glittering silver coins when stirred with twigs</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Because salt was an indispensable universal necessity taxed by the colonial monopoly; defying the salt law peacefully united people across all regions and demonstrated the moral bankruptcy of imperial taxation</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Because marching to the sea allowed protesters to feed seaweed directly to pelicans</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "independence",
  story: [
    animatedBeat(
      [
        T("Meet Kriti. She reads the inspiring story of a 385-kilometer walk to the Arabian Sea in the spring of 1930.", "Das ist Klara. Sie liest die beruehrende Geschichte eines 385 Kilometer langen Marsches ans Arabische Meer im Fruehjahr 1930.", "Poznaj Kasię. Czyta historię 385-kilometrowego marszu nad Morze Arabskie wiosną 1930 roku."),
        T("Under colonial law, ordinary people were forbidden from harvesting natural salt from sea beds, facing criminal prison sentences unless they paid the official salt tax.", "Nach Kolonialrecht war es verboten, Salz aus dem Meer zu schoepfen, um die staatliche Salzsteuer zu erzwingen.", "Prawo kolonialne surowo zakazywało zbierania soli morskiej, zmuszając mieszkańców do płacenia wysokiego podatku solnego pod groźbą więzienia."),
        T("Mahatma Gandhi recognized that salt was an indispensable necessity for every human being, regardless of income, caste, or background.", "Mahatma Gandhi erkannte: Salz braucht jeder Mensch taeglich, egal wie arm oder reich.", "Mahatma Gandhi zrozumiał, że sól jest niezbędna do życia każdemu człowiekowi, niezależnie od majątku czy pozycji społecznej."),
      ],
      SaltMarchDiagram,
    ),
    animatedBeat(
      [
        T("When Gandhi bent down at Dandi on April 6, 1930, and picked up a small lump of natural salt, millions followed his lead.", "Als Gandhi am 6. April 1930 in Dandi einen Klumpen natuerliches Salz aufhob, taten es ihm Millionen nach.", "Gdy 6 kwietnia 1930 r. w Dandi Gandhi podniósł z plaży grudkę naturalnej soli, miliony ludzi poszły w jego ślady."),
        T("Simultaneously, the movement urged citizens to boycott imported foreign cloth, adopting the traditional spinning wheel (*charkha*) to weave homemade *khadi*.", "Gleichzeitig rief die Bewegung zum Boykott auslaendischer Kleidung auf und nutzte das Spinnrad (*Charkha*) fuer heimische Stoffe.", "Równocześnie wezwano do bojkotu zagranicznych tkanin, a tradycyjny kołowrotek (*charkha*) stał się symbolem samodzielności i wolności."),
        T("British textile sales to India plummeted by over 50% within a year, demonstrating that nonviolent civil resistance carried devastating economic force.", "Britische Stoffverkaeufe nach Indien brachen um die Haelfte ein: Gewaltloser Protest bewies enorme oekonomische Schlagkraft.", "Brytyjski eksport tkanin do Indii spadł o ponad połowę w ciągu roku, dowodząc potęgi pokojowego oporu gospodarczego."),
      ],
      EconomicsOfBoycottDiagram,
    ),
    animatedBeat(
      [
        T("When India achieved independence on August 15, 1947, leaders faced the immense challenge of designing a sovereign democracy for hundreds of millions.", "Mit der Unabhaengigkeit am 15. August 1947 stand Indien vor der Aufgabe, eine Verfassung fuer Hunderte Millionen zu schaffen.", "Gdy 15 sierpnia 1947 r. Indie odzyskały niepodległość, stanęły przed wyzwaniem stworzenia instytucji dla setek milionów obywateli."),
        T("Dr. B.R. Ambedkar, chief architect of the 1950 Indian Constitution, insisted upon universal adult franchise, giving an equal vote to every man and woman from day one.", "Dr. B.R. Ambedkar verankerte das allgemeine Wahlrecht fuer jeden erwachsenen Buerger vom ersten Tag an.", "Dr B.R. Ambedkar, główny twórca konstytucji z 1950 r., zagwarantował równe, powszechne prawo głosu każdemu obywatelowi i obywatelce od pierwszego dnia."),
        T("The Constitution outlawed the practice of untouchability, established fundamental civil liberties, and created independent courts to guard the rule of law.", "Die Verfassung verbot Diskriminierung, sicherte Grundrechte und schuf unabhaengige Gerichte.", "Konstytucja zakazała dyskryminacji kastowej, zagwarantowała swobody obywatelskie i powołała niezawisłe sądownictwo."),
      ],
      ConstitutionalDemocracyDiagram,
    ),
    animatedBeat(
      [
        T("In 1951-1952, India conducted its first democratic general election, with over 173 million eligible voters, many voting for the first time.", "1951-1952 hielt Indien seine ersten freien Wahlen mit 173 Millionen Waehlern ab.", "W latach 1951-1952 w Indiach odbyły się pierwsze wolne wybory parlamentarne z udziałem 173 milionów uprawnionych."),
        T("Skeptics in foreign capitals had predicted instant chaotic collapse into civil war and dictatorship.", "Skeptiker im Ausland hatten den sofortigen Zerfall in Buergerkrieg und Diktatur vorausgesagt.", "Zagraniczni sceptycy wróżyli natychmiastowy rozpad państwa, wybuch wojny domowej i rządy wojskowe."),
        T("Instead, the Election Commission engineered symbols on ballots, organized polling across deserts and Himalayas, and executed a peaceful transition of power.", "Stattdessen schuf die Wahlkommission ein verlaessliches Wahlsystem mit Bildsymbolen fuer alle Buerger.", "Tymczasem niezależna komisja wyborcza zorganizowała sprawny proces z użyciem symboli graficznych, zapewniając pokojowe rządy prawa."),
      ],
      DemocraticInstitutionsDiagram,
    ),
    animatedBeat(
      [
        T("The triumph of the Indian Independence Movement sent shockwaves around the globe, pioneering modern civil disobedience.", "Der Erfolg der indischen Unabhaengigkeit inspirierte Freiheitsbewegungen rund um den gesamten Globus.", "Zwycięstwo indyjskiego ruchu niepodległościowego stało się drogowskazem dla ruchów praw obywatelskich na całym świecie."),
        T("Civil rights leaders including Martin Luther King Jr. in the United States and Nelson Mandela in South Africa studied and applied these nonviolent strategies.", "Fuehrer wie Martin Luther King Jr. und Nelson Mandela studierten Gandhis gewaltlose Methoden.", "Liderzy tacy jak Martin Luther King w USA czy Nelson Mandela w RPA czerpali bezpośrednio z metod pokojowego oporu."),
        T("Disciplined moral resistance combined with democratic institution-building remains one of humanity's greatest achievements in self-governance.", "Disziplinierter moralischer Mut und demokratische Verfassungen gehoeren zu den groessten Errungenschaften der Menschheit.", "Połączenie odwagi moralnej, dyscypliny i budowy trwałych instytucji demokratycznych to jedno z największych osiągnięć w historii cywilizacji."),
      ],
      GlobalLegacyOfResistanceDiagram,
    ),
  ],
  toyIntro: T(
    "Operate the spinning wheel (charkha): produce spools of local homespun khadi yarn to build national solidarity and economic independence.",
    "Bediene das Spinnrad (Charkha): Produziere Garn fuer heimische Khadi-Kleidung und staerke die Unabhaengigkeit.",
    "Zakręć kołowrotkiem (charkha): produkuj nici na tradycyjne płótno khadi, budując solidarność społeczną i niezależność gospodarczą."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why was picking up a handful of natural salt at Dandi in 1930 such a powerful act of civil disobedience?",
        "Warum war das Aufheben einer Handvoll Salz in Dandi 1930 ein so maechtiger Akt des Protests?",
        "Dlaczego podniesienie garści naturalnej soli morskiej w Dandi w 1930 roku było tak potężnym aktem obywatelskiego nieposłuszeństwa?",
      ),
      options: [
        { text: T("Because salt was an essential daily necessity across all segments of society, and defying the colonial tax peacefully challenged the legal and moral legitimacy of imperial rule", "Weil Salz ein lebenswichtiges Gut fuer jeden Menschen war und der friedliche Bruch der Steuer die moralische Legitimation der Kolonialherren zerbrach", "Ponieważ sól była codzienną koniecznością dla każdego człowieka, a pokojowe złamanie monopolu podważyło moralną i prawną legitymację władzy kolonialnej"), correct: true },
        { text: T("Because salt dissolved into boiling tea makes giant pink bubbles float into the sky", "Weil im Tee aufgeloestes Salz rosa Seifenblasen in den Himmel steigen laesst", "Ponieważ sól wsypana do herbaty tworzy wielkie różowe bańki mydlane unoszące się w powietrzu"), correct: false },
        { text: T("Because the colonial governor had misplaced his salt cellar during breakfast", "Weil der Gouverneur seinen persoenlichen Salzstreuer beim Fruehstueck verloren hatte", "Ponieważ gubernator kolonialny zgubił swoją solniczkę podczas śniadania"), correct: false },
      ],
      hint: T(
        "Consider how universal everyday goods can symbolize wider systemic injustice.",
        "Achte darauf, wie ein einfaches Alltagsgut zum Symbol fuer fundamentale Rechte werden kann.",
        "Zastanów się, jak prosty produkt pierwszej potrzeby staje się czytelnym symbolem walki o prawa człowieka."),
    },
    {
      kind: "choice",
      prompt: T(
        "Who was the chief architect of the 1950 Indian Constitution that guaranteed universal adult franchise and equal civil rights?",
        "Wer war der Hauptarchitekt der indischen Verfassung von 1950, die das allgemeine Wahlrecht festschrieb?",
        "Kto był głównym architektem konstytucji Indii z 1950 roku, gwarantującej powszechne prawo głosu i równe prawa obywatelskie?",
      ),
      options: [
        { text: T("Dr. B.R. Ambedkar, who championed social justice, fundamental constitutional rights, and the legal abolition of discrimination", "Dr. B.R. Ambedkar, der fuer soziale Gerechtigkeit, Buergerrechte und das Ende der Diskriminierung kaempfte", "Dr B.R. Ambedkar, który walczył o sprawiedliwość społeczną, równe prawa konstytucyjne i zniesienie dyskryminacji"), correct: true },
        { text: T("A committee of royal chess grandmasters from the court of Versailles", "Ein Komitee franzoesischer Schachgrossmeister aus Versailles", "Komitet mistrzów szachowych z pałacu wersalskiego"), correct: false },
        { text: T("The chief engineer of the London steam locomotive works", "Der Chefingenieur der Londoner Dampflokomotiv-Werke", "Główny inżynier londyńskich warsztatów parowozowych"), correct: false },
      ],
      hint: T(
        "Think of the visionary legal scholar and social reformer revered across India.",
        "Denke an den beruehmten indischen Rechtsgelehrten und Sozialreformer.",
        "Pomyśl o wybitnym prawniku i reformatorze społecznym, przewodniczącym komitetu redakcyjnego konstytucji."),
    },
    {
      kind: "widget",
      prompt: T(
        "Examine the strategic impact of the 1930 Salt March led by Mahatma Gandhi.",
        "Untersuche die strategische Wirkung des Salzmarsches von 1930 unter Mahatma Gandhi.",
        "Zbadaj strategiczne znaczenie Marszu Solnego z 1930 roku pod wodzą Mahatmy Gandhiego.",
      ),
      Widget: IndependenceWidget,
      hint: T(
        "Focus on the universal necessity of salt and the psychological power of peaceful civil resistance.",
        "Achte auf die universelle Bedeutung von Salz und die moralische Kraft gewaltfreien Widerstands.",
        "Zwróć uwagę na uniwersalną rolę soli i moralną siłę pokojowego sprzeciwu wobec niesprawiedliwego prawa."),
    },
  ],
  askDad: T(
    "Ask your parent: What makes peaceful nonviolent resistance so powerful when citizens stand up against unjust laws?",
    "Frage deine Eltern: Warum ist friedlicher, gewaltfreier Protest so wirkungsvoll, wenn Buerger gegen Ungerechtigkeit aufstehen?",
    "Zapytaj rodziców: Co sprawia, że pokojowy opór bez użycia przemocy ma tak potężną siłę w walce z niesprawiedliwym prawem?"),
  realLife: {
    title: T(
      "Real world: Ramachandra Guha's 'India After Gandhi: The History of the World's Largest Democracy'",
      "Echte Welt: Ramachandra Guha ueber die Entstehung der groessten Demokratie der Welt",
      "Prawdziwy świat: Ramachandra Guha o narodzinach największej demokracji świata",
    ),
    body: T(
      "In his monumental 2007 history 'India After Gandhi', historian Ramachandra Guha chronicled how a newly independent, impoverished nation of 350 million people, speaking dozens of languages and practicing diverse religions, defied global expectations by forging and preserving an enduring constitutional democracy. Through meticulous archival documentation, Guha showed that democratic institutions, free elections, and civil liberties were central to maintaining national unity.",
      "In seinem Werk 'India After Gandhi' (2007) schildert Ramachandra Guha, wie eine junge, wirtschaftlich geschwaechte Nation mit ueber 350 Millionen Menschen und Dutzenden Sprachen aller Skepsis zum Trotz eine stabile Verfassungsdemokratie aufbaute. Freie Wahlen und demokratische Institutionen erwiesen sich als das staerkste Fundament fuer Frieden und Zusammenhalt.",
      "W monumentalnej pracy 'India After Gandhi' (2007) historyk Ramachandra Guha opisał, jak niepodległy, zubożały naród liczący 350 milionów ludzi i setki języków wbrew prognozom zbudował trwałą demokrację konstytucyjną. Badania Guhy dowodzą, że to wolne wybory, niezależne instytucje i swobody obywatelskie stały się fundamentem jedności państwa."),
  },
  factCard: {
    claims: [
      { text: T("The Salt March began on March 12, 1930, from Sabarmati Ashram to Dandi, spanning 24 days and 240 miles (385 km).", "Der Salzmarsch begann am 12. Maerz 1930 in Sabarmati und dauerte 24 Tage ueber 385 Kilometer.", "Marsz Solny wyruszył 12 marca 1930 r. z aśramu Sabarmati do Dandi, trwając 24 dni na dystansie 385 km."), source: "https://www.gandhiheritageportal.org/dandi-march" },
      { text: T("The Constitution of India was formally adopted by the Constituent Assembly on November 26, 1949, and took effect on January 26, 1950.", "Die indische Verfassung trat am 26. Januar 1950 offiziell in Kraft.", "Konstytucja Indii została uchwalona 26 listopada 1949 r., a weszła w życie 26 stycznia 1950 r."), source: "https://legislative.gov.in/constitution-of-india/" },
      { text: T("Dr. B.R. Ambedkar earned doctorates from Columbia University and the London School of Economics before chairing the Constitution Drafting Committee.", "Dr. B.R. Ambedkar promovierte an der Columbia University und der LSE, bevor er die Verfassung ausarbeitete.", "Dr B.R. Ambedkar obronił doktoraty na Columbia University oraz London School of Economics, zanim stanął na czele komitetu konstytucyjnego."), source: "https://www.columbia.edu/itc/mealac/pritchett/00ambedkar/" },
      { text: T("India's first Chief Election Commissioner, Sukumar Sen, oversaw the 1951-1952 general election involving 173 million voters and 224,000 polling booths.", "Sukumar Sen organisierte 1951-1952 als erster Wahlleiter die historische Wahl mit 173 Millionen Waehlern.", "Sukumar Sen jako pierwszy Główny Komisarz Wyborczy zorganizował wybory 1951-1952 dla 173 milionów wyborców w 224 tysiącach lokali."), source: "https://eci.gov.in/about/history/" },
      { text: T("Historian Ramachandra Guha published 'India After Gandhi: The History of the World's Largest Democracy' with HarperCollins in 2007.", "Ramachandra Guhas Standardwerk 'India After Gandhi' erschien 2007 bei HarperCollins.", "Przełomowa książka Ramachandry Guhy 'India After Gandhi' ukazała się w 2007 r. nakładem HarperCollins."), source: "https://www.harpercollins.com/products/india-after-gandhi-ramachandra-guha" },
    ],
    simplified: [
      T(
        "Complex constitutional jurisprudence, election logistics telemetry, and macroeconomic consumer boycott datasets are translated into interactive khadi-spinning toys and accessible historical narratives.",
        "Komplexe Verfassungsgrundsaetze und historische Boykottdaten wurden in interaktive Spinnrad-Spiele und packende Geschichtsberichte verstaendlich uebersetzt.",
        "Skomplikowane zagadnienia prawa konstytucyjnego, logistyki wyborczej i bojkotu rynkowego przedstawiono w formie czytelnych symulacji tkackich i zrozumiałej narracji."),
    ],
  },
};
