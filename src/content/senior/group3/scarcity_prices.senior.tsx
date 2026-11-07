import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function LaborAndAssetScarcityDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Game engine developer skills and rare assets scarcity diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2" />

      {step === 0 && (
        <g>
          {/* Labor supply curve */}
          <line x1="50" y1="30" x2="50" y2="190" stroke="#94a3b8" strokeWidth="2" />
          <line x1="50" y1="190" x2="360" y2="190" stroke="#94a3b8" strokeWidth="2" />
          <text x="30" y="40" fontSize="11" fill="#94a3b8" fontWeight="bold">Hourly Rate</text>
          <text x="350" y="210" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="bold">Developers</text>

          {/* Common skill flat supply line */}
          <line x1="60" y1="150" x2="340" y2="135" stroke="#64748b" strokeWidth="2.5" />
          <text x="345" y="135" fontSize="10" fill="#94a3b8">Common Skills (High Supply)</text>

          {/* Rare 3D physics skill steep supply line */}
          <line x1="120" y1="180" x2="160" y2="40" stroke="#38bdf8" strokeWidth="3" />
          <text x="170" y="50" fontSize="11" fill="#38bdf8" fontWeight="bold">Rare 3D Physics Coder</text>
          <text x="200" y="100" fontSize="11" fill="#facc15">Bidding Wars for Talent!</text>
        </g>
      )}

      {step === 1 && (
        <g>
          <text x="200" y="45" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f8fafc">Real Scarcity vs Printed Copies</text>
          {/* Rare Gold / Rare Item */}
          <rect x="60" y="70" width="120" height="110" rx="8" fill="#eab308" />
          <text x="120" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#422006">Physical Gold</text>
          <text x="120" y="125" textAnchor="middle" fontSize="11" fill="#713f12">Hard to Mine</text>
          <rect x="60" y="185" width="120" height="15" rx="3" fill="#fef08a" />
          <text x="120" y="196" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#713f12">+1.5% flow per year</text>

          {/* Cheap paper or unlimited tokens */}
          <rect x="220" y="120" width="120" height="60" rx="8" fill="#64748b" />
          <text x="280" y="150" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f8fafc">Printed Paper</text>
          <rect x="220" y="185" width="120" height="15" rx="3" fill="#94a3b8" />
          <text x="280" y="196" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">Unlimited Copying</text>
        </g>
      )}

      {step >= 2 && (
        <g>
          <rect x="50" y="40" width="300" height="150" rx="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <text x="200" y="70" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#60a5fa">Stacking Rare Skills</text>
          <text x="200" y="100" textAnchor="middle" fontSize="11" fill="#e2e8f0">Coding + 3D Art + Story Writing</text>
          <circle cx="140" cy="140" r="28" fill="#3b82f6" fillOpacity="0.4" stroke="#60a5fa" strokeWidth="1.5" />
          <circle cx="200" cy="140" r="28" fill="#10b981" fillOpacity="0.4" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="260" cy="140" r="28" fill="#f59e0b" fillOpacity="0.4" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="200" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f8fafc">Irreplaceable!</text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [yearsPractice, setYearsPractice] = useState(3);
  const [assetChoice, setAssetChoice] = useState<"game_gold" | "real_gold">("real_gold");

  const hourlyWage = Math.round(20 + Math.pow(yearsPractice, 1.7) * 8);
  const skillTag = yearsPractice >= 8 ? "Legendary Game Architect" : yearsPractice >= 5 ? "Senior 3D Artist" : "Beginner Modder";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1.05rem" }}>
        Market Pay: ${hourlyWage} / hr | Skill Level: {skillTag} ({yearsPractice} yrs practice)
      </p>

      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            const next = yearsPractice >= 9 ? 2 : yearsPractice + 2;
            setYearsPractice(next);
            if (next >= 7) onDone?.();
          }}
        >
          Practice Rare Skills: {yearsPractice} Years
        </button>

        <button
          type="button"
          className="btn"
          onClick={() => {
            setAssetChoice((a) => (a === "real_gold" ? "game_gold" : "real_gold"));
            onDone?.();
          }}
        >
          Asset Type: {assetChoice === "real_gold" ? "Physical Rare Gold" : "Unlimited Game Server Gold"}
        </button>
      </div>

      <div
        style={{
          padding: "12px",
          background: yearsPractice >= 6 ? "#f0fdf4" : "#f8fafc",
          border: `1px solid ${yearsPractice >= 6 ? "#86efac" : "#cbd5e1"}`,
          borderRadius: "10px",
          maxWidth: "380px",
          textAlign: "center",
          fontSize: "0.9rem",
        }}
      >
        {assetChoice === "real_gold"
          ? "Natural Scarcity: Hard to extract from the earth, so its supply cannot suddenly be doubled."
          : "Fake Scarcity: A game admin can press a button and create millions of tokens in a split second."}
        <br />
        Rare Skills: The harder a skill is to learn, the fewer people have it, and the more companies will pay for your talent!
      </div>
    </div>
  );
}

function SeniorScarcityWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Why do lead 3D game engine programmers earn far higher salaries than beginner level designers?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>They drink more iced tea during work hours</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Only a tiny handful of people master complex 3D math and graphics physics, creating scarce supply</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Keyboards for 3D code cost fifty thousand dollars each</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "scarcity_prices",
  story: [
    animatedBeat(
      [
        T("Meet Kriti. She loves video games, but instead of just playing them, she decided to learn 3D computer graphics and physics coding.", "Das ist Sophie. Sie liebt Games, aber statt nur zu zocken, lernt sie 3D-Computergrafik und Spielephysik.", "Poznaj Alicję. Uwielbia gry, ale zamiast tylko grać, postanowiła nauczyć się grafiki 3D i fizyki w silnikach gier."),
        T("When an indie studio needed someone to put simple grass on a virtual field, three hundred people applied.", "Als ein Studio jemanden suchte, um einfaches Gras in eine Spielewelt zu setzen, bewarben sich dreihundert Leute.", "Gdy studio gier szukało kogoś do rozłożenia trawy na planszy, zgłosiło się trzysta osób."),
        T("Because that skill is easy to pick up in an afternoon, the pay was only fifteen dollars an hour.", "Weil man das an einem Nachmittag lernen kann, lag der Lohn bei nur 15 Euro die Stunde.", "Ponieważ tego można nauczyć się w jedno popołudnie, stawka wynosiła tylko sześćdziesiąt złotych za godzinę."),
      ],
      LaborAndAssetScarcityDiagram,
    ),
    animatedBeat(
      [
        T("Later, the studio needed someone who could write custom lighting shaders so the game runs at 120 frames a second on old phones.", "Spaeter brauchte das Studio jemanden fuer Licht-Shader, damit das Spiel auf aelteren Handys fluessig laeuft.", "Później studio potrzebowało kogoś, kto napisze shadery oświetlenia, by gra działała płynnie na starszych telefonach."),
        T("In the entire city, only Kriti and two other people had spent the years required to master that skill.", "In der ganzen Stadt hatten ausser Sophie nur zwei andere Leute das noetige Wissen dafuer.", "W całym mieście poza Alicją tylko dwie osoby poświęciły lata na opanowanie tej trudnej sztuki."),
        T("Three different game studios got into a bidding war to hire her, offering seventy-five dollars an hour.", "Drei Studios ueberboten sich gegenseitig und boten ihr 75 Euro die Stunde.", "Trzy studia zaczęły licytować się o jej czas, oferując trzysta złotych za każdą godzinę pracy."),
      ],
      LaborAndAssetScarcityDiagram,
    ),
    animatedBeat(
      [
        T("This is the law of scarcity applied to your own work and talents.", "Das ist das Gesetz der Knappheit, angewendet auf deine eigenen Faehigkeiten.", "To jest prawo rzadkości zastosowane do Twoich własnych umiejętności i talentów."),
        T("When what you know how to do is common, you compete against thousands of people and wages stay low.", "Kann jeder deinen Job sofort machen, stehst du im Wettbewerb mit Tausenden und Loehne bleiben niedrig.", "Gdy Twoje zadanie potrafi wykonać każdy, konkurujesz z tysiącami osób, a stawki są niskie."),
        T("When you master rare, difficult skills, employers must compete against each other to win you over.", "Beherrschst du seltene, anspruchsvolle Dinge, muessen sich Arbeitgeber um dich streiten.", "Gdy opanujesz trudne, rzadkie umiejętności, to pracodawcy muszą rywalizować między sobą o Ciebie."),
      ],
      LaborAndAssetScarcityDiagram,
    ),
    animatedBeat(
      [
        T("The same rule explains why gold has stayed valuable for thousands of years.", "Dasselbe Prinzip erklaert, warum Gold seit Jahrtausenden wertvoll ist.", "Ta sama reguła wyjaśnia, dlaczego złoto zachowuje wartość od tysięcy lat."),
        T("All the gold ever mined in human history would fit inside a single cube just twenty-two meters wide.", "Alles Gold der Menschheit wuerde in einen einzigen Wuerfel von nur 22 Metern Kantenlaenge passen.", "Całe złoto wydobyte w historii zmieściłoby się w sześcianie o boku zaledwie dwudziestu dwóch metrów."),
        T("Nobody can magically create gold with a computer mouse or a printing machine; its scarcity is anchored by nature.", "Niemand kann Gold per Mausklick am PC vermehren; seine Knappheit ist durch die Natur fest verankert.", "Nikt nie może wyczarować złota kliknięciem myszki w komputerze; jego rzadkość gwarantuje sama natura."),
      ],
      LaborAndAssetScarcityDiagram,
    ),
    animatedBeat(
      [
        T("Your greatest superpower as a student is not how much money you currently have in your wallet.", "Deine groesste Superkraft als Schueler ist nicht das Geld in deiner Brieftasche.", "Twoją największą supermocą w wieku szkolnym nie jest to, ile gotówki masz w portfelu."),
        T("It is your *human capital*: the curiosity, coding, building, and problem-solving skills you choose to learn.", "Es ist dein *Humankapital*: Neugier, Programmieren und Problemlosungskompetenz, die du dir aneignest.", "To Twój *kapitał ludzki*: ciekawość świata, programowanie i umiejętność rozwiązywania trudnych problemów."),
        T("If you build rare and useful skills, scarcity will work in your favor for the rest of your life.", "Eignest du dir seltene und nuetzliche Faehigkeiten an, arbeitet die Knappheit dein ganzes Leben fuer dich.", "Jeśli zdobędziesz rzadkie i przydatne umiejętności, prawo rzadkości będzie pracować na Twoją korzyść przez całe życie."),
      ],
      LaborAndAssetScarcityDiagram,
    ),
  ],
  toyIntro: T(
    "Test how mastering rare skills and understanding asset scarcity shifts market compensation.",
    "Sieh selbst, wie seltene Faehigkeiten und knappe Gueter die Verhandlungsmacht veraendern.",
    "Zobacz na własne oczy, jak rzadkie umiejętności i ograniczone zasoby zmieniają pozycję na rynku.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why do specialists who master difficult skills earn much higher compensation than generalists?",
        "Warum verdienen Spezialisten mit schwierigen Faehigkeiten deutlich mehr als andere?",
        "Dlaczego specjaliści z rzadkimi i trudnymi umiejętnościami zarabiają znacznie więcej niż inni?"
      ),
      options: [
        {
          text: T(
            "Their supply is scarce and hard to replace, forcing companies to bid competitively to hire them",
            "Ihr Angebot ist rar und schwer zu ersetzen, sodass Firmen um sie buhlen muessen",
            "Ich umiejętności są rzadkie i trudne do zastąpienia, więc firmy muszą konkurować ofertami o ich czas"
          ),
          correct: true,
        },
        {
          text: T(
            "They wear silver hats to work every morning",
            "Sie tragen morgens immer silberne Huete im Buero",
            "Codziennie rano noszą do biura srebrne kapelusze"
          ),
          correct: false,
        },
        {
          text: T(
            "Their computers are made out of pure cheese",
            "Ihre Computer bestehen aus purem Kaese",
            "Ich komputery są zrobione z żółtego sera"
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about supply and demand for rare talent.",
        "Denke an Angebot und Nachfrage bei seltenem Talent.",
        "Pomyśl o podaży i popycie na rzadki talent."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why has physical gold held its purchasing power across thousands of years?",
        "Warum behaelt physisches Gold seit Jahrtausenden seine Kaufkraft?",
        "Dlaczego fizyczne złoto utrzymuje swoją siłę nabywczą od tysięcy lat?"
      ),
      options: [
        {
          text: T(
            "It cannot be printed or manufactured out of thin air, keeping its natural supply strictly limited",
            "Man kann es nicht drucken oder herbeizaubern; sein Angebot bleibt natuerlich begrenzt",
            "Nie można go dodrukować ani wyczarować z niczego; jego podaż w przyrodzie jest ściśle ograniczona"
          ),
          correct: true,
        },
        {
          text: T(
            "Gold floats on water like a duck",
            "Gold schwimmt auf dem Wasser wie eine Ente",
            "Złoto unosi się na wodzie jak kaczka"
          ),
          correct: false,
        },
        {
          text: T(
            "Every gold coin comes with a lifetime guarantee of free pizza",
            "Zu jeder Goldmuenze gibt es lebenslang gratis Pizza",
            "Do każdej złotej monety przysługuje dożywotnia darmowa pizza"
          ),
          correct: false,
        },
      ],
      hint: T(
        "Focus on natural geological scarcity versus paper printing.",
        "Achte auf geologische Knappheit im Vergleich zu bedrucktem Papier.",
        "Zwróć uwagę na naturalną rzadkość w geologii w porównaniu z papierowym drukiem."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify why rare technical skills command a high hourly rate.",
        "Waehle aus, warum seltene technische Faehigkeiten hohe Stundensaetze erzielen.",
        "Wskaż, dlaczego rzadkie umiejętności techniczne zapewniają wysoką stawkę godzinową."
      ),
      Widget: SeniorScarcityWidget,
      hint: T(
        "Mastering complex domains creates an irreplaceable talent moat.",
        "Komplexes Koennen baut einen unersetzlichen Wettbewerbsvorteil auf.",
        "Trudne umiejętności tworzą trudną do pokonania przewagę na rynku."
      ),
    },
  ],
  askDad: T(
    "Ask your parent: What is a skill you learned in your career that made your work much more valuable to employers?",
    "Frage deine Eltern: Welche Faehigkeit habt ihr im Beruf gelernt, die eure Arbeit besonders wertvoll gemacht hat?",
    "Zapytaj rodziców: Jakiej umiejętności nauczyliście się w pracy, która najbardziej podniosła Waszą wartość dla pracodawców?"
  ),
  realLife: {
    title: T(
      "Real world: Chip Designers and Advanced Graphics Engineers",
      "Echte Welt: Chip-Designer und Grafik-Ingenieure",
      "Prawdziwy świat: Projektanci procesorów i inżynierowie zaawansowanej grafiki"
    ),
    body: T(
      "Only a few thousand engineers on Earth understand how to design microchips that contain billions of transistors or render real-time movie lighting in video games. Companies like NVIDIA, Apple, and Epic Games compete fiercely for their expertise, offering six-figure compensation and equity packages because their rare knowledge cannot simply be hired off the street.",
      "Nur wenige tausend Ingenieure weltweit verstehen, wie man Computerchips mit Milliarden Transistoren baut oder fotorealistische Lichteffekte in Games berechnet. Firmen wie NVIDIA und Apple kaempfen um diese Fachkraefte mit Spitzengehaeltern, weil man solches Spezialwissen nicht einfach auf der Strasse findet.",
      "Tylko kilka tysięcy inżynierów na świecie potrafi projektować mikroprocesory z miliardami tranzystorów lub renderować fotorealistyczne oświetlenie w grach w czasie rzeczywistym. Firmy takie jak NVIDIA czy Apple zacięcie rywalizują o ich wiedzę, oferując ogromne pakiety wynagrodzeń i akcji, bo takiego talentu nie da się zatrudnić z ulicy."
    ),
  },
  factCard: {
    claims: [
      { text: T("Gary Becker analyzed human capital investments and formal education wage returns in Human Capital (1964).", "Gary Becker untersuchte Humankapitalinvestitionen und Bildungsrenditen in Human Capital (1964).", "Gary Becker zbadał inwestycje w kapitał ludzki i stopy zwrotu z edukacji w Human Capital (1964)."), source: "https://www.nber.org/books-and-chapters/human-capital-theoretical-and-empirical-analysis-special-reference-education-first-edition" },
      { text: T("The World Gold Council reports annual global gold mine production averages approximately 3,600 metric tons against total stocks of 212,500 metric tons.", "Der World Gold Council meldet jaehrlich ca. 3.600 Tonnen Goldfoerderung bei einem Weltbestand von 212.500 Tonnen.", "World Gold Council raportuje roczne wydobycie złota na poziomie ok. 3600 ton wobec światowych zasobów 212 500 ton."), source: "https://www.gold.org/goldhub/research/gold-demand-trends" },
      { text: T("David Ricardo formulated the Law of Rent in 1817, showing how scarce fertile resources capture differential economic surplus.", "David Ricardo formulierte 1817 das Grundrentenprinzip fuer knappe natuerliche Ressourcen.", "David Ricardo sformułował w 1817 roku teorię renty gruntowej dla ograniczonych zasobów naturalnych."), source: "https://www.gutenberg.org/ebooks/33310" },
      { text: T("Eugene Fama and Kenneth French documented the effect of market capitalization and free float on equity asset returns in 1992.", "Eugene Fama und Kenneth French belegten 1992 den Einfluss von Streubesitz und Marktkapitalisierung auf Aktienrenditen.", "Eugene Fama i Kenneth French wykazali w 1992 roku wpływ kapitalizacji i akcji w wolnym obrocie na stopy zwrotu z akcji."), source: "https://www.jstor.org/stable/2329112" },
      { text: T("The US Bureau of Labor Statistics Occupational Employment Statistics confirms specialized STEM careers earn over double the national median wage.", "Die US-Arbeitsstatistik belegt fuer MINT-Spezialisten mehr als das Doppelte des nationalen Mediangehalts.", "Amerykańskie Biuro Statystyki Pracy potwierdza, że specjaliści STEM zarabiają ponad dwukrotność mediany krajowej."), source: "https://www.bls.gov/oes/current/oes_nat.htm" },
    ],
    simplified: [
      T(
        "Complex labor market wage dynamics and asset ratios are modeled around core scarcity mechanics.",
        "Komplexe Arbeitsmarktmodelle wurden auf grundlegende Knappheitsgesetze vereinfacht.",
        "Złożone zjawiska rynku pracy i rynków aktywów przedstawiono w oparciu o fundamentalne prawo rzadkości."
      ),
    ],
  },
};
