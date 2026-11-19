import { useState } from "react";
import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function TalentScarcityDiagram({ step }: { step: number }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      role="img"
      aria-label="Skill and asset scarcity diagram"
    >
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f8fafc"
        stroke="#1d3f47"
        strokeWidth="2"
      />

      {step === 0 && (
        <g>
          {/* Common task vs rare skill */}
          <rect
            x="30"
            y="40"
            width="155"
            height="150"
            rx="10"
            fill="#e2e8f0"
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <text x="107" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">
            Common Skills
          </text>
          <text x="107" y="85" textAnchor="middle" fontSize="11" fill="#475569">
            Thousands can do it
          </text>
          <circle cx="107" cy="115" r="22" fill="#cbd5e1" />
          <text x="107" y="120" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">
            Many
          </text>
          <text x="107" y="165" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b">
            Basic Wage
          </text>

          <rect
            x="215"
            y="40"
            width="155"
            height="150"
            rx="10"
            fill="#fef3c7"
            stroke="#d97706"
            strokeWidth="2"
          />
          <text x="292" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">
            Rare Specialization
          </text>
          <text x="292" y="85" textAnchor="middle" fontSize="11" fill="#78350f">
            Years of training
          </text>
          <circle cx="292" cy="115" r="22" fill="#fde68a" />
          <text x="292" y="120" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b45309">
            Few
          </text>
          <text x="292" y="165" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">
            High Salary!
          </text>
        </g>
      )}

      {step === 1 && (
        <g>
          {/* Scarcity sets salaries: bidding */}
          <rect
            x="40"
            y="50"
            width="320"
            height="140"
            rx="12"
            fill="#ecfeff"
            stroke="#0891b2"
            strokeWidth="2"
          />
          <text x="200" y="80" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#155e75">
            Five Clinics Want One Master Surgeon
          </text>
          <text x="200" y="105" textAnchor="middle" fontSize="11" fill="#334155">
            Clinics bid higher compensation to attract the scarce specialist
          </text>
          <rect
            x="70"
            y="125"
            width="260"
            height="40"
            rx="8"
            fill="#cffafe"
            stroke="#06b6d4"
            strokeWidth="1.5"
          />
          <text x="200" y="150" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0e7490">
            Scarcity Creates Earning Power
          </text>
        </g>
      )}

      {step >= 2 && (
        <g>
          {/* Asset Scarcity: Gold vs Abundant stone */}
          <rect
            x="35"
            y="45"
            width="150"
            height="145"
            rx="10"
            fill="#f3f4f6"
            stroke="#9ca3af"
            strokeWidth="1.5"
          />
          <text x="110" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">
            Common Stones
          </text>
          <text x="110" y="90" textAnchor="middle" fontSize="10" fill="#6b7280">
            Trillions on every river
          </text>
          <text x="110" y="145" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9ca3af">
            Price: 0 Coins
          </text>

          <rect
            x="215"
            y="45"
            width="150"
            height="145"
            rx="10"
            fill="#fffbeb"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text x="290" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">
            Rare Gold
          </text>
          <text x="290" y="90" textAnchor="middle" fontSize="10" fill="#b45309">
            Strict natural limit
          </text>
          <polygon
            points="270,125 280,105 300,105 310,125 290,135"
            fill="#facc15"
            stroke="#b45309"
            strokeWidth="1.5"
          />
          <text x="290" y="165" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b45309">
            Permanent Value
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [selectedRole, setSelectedRole] = useState<"engineer" | "runner">("engineer");

  const isRare = selectedRole === "engineer";
  const salary = isRare ? 120 : 25;
  const supplyCount = isRare ? "Only 3 people" : "500 people";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1.05rem" }}>
        Weekly Earnings: {salary} Coins ({isRare ? "Rare Specialization" : "Abundant Talent"})
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className={isRare ? "btn" : "btn btn-quiet"}
          onClick={() => {
            setSelectedRole("engineer");
            onDone?.();
          }}
        >
          Master Jet Mechanic
        </button>
        <button
          type="button"
          className={!isRare ? "btn" : "btn btn-quiet"}
          onClick={() => {
            setSelectedRole("runner");
            onDone?.();
          }}
        >
          Errand Helper
        </button>
      </div>

      <div
        style={{
          padding: "10px 14px",
          background: isRare ? "#fef3c7" : "#f1f5f9",
          borderRadius: "10px",
          textAlign: "center",
          fontSize: "0.9rem",
          maxWidth: "360px",
        }}
      >
        Candidate Supply: {supplyCount} available.
        <br />
        {isRare
          ? "Because jet mechanics are super rare, airlines bid high salaries to hire them!"
          : "Because many people can help with errands, wages reflect abundant supply."}
      </div>
    </div>
  );
}

function ScarcityPricesWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        Why does a heart surgeon earn a higher salary than a task that takes ten minutes to learn?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Because surgeons are given magical gold crowns
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        Because mastering surgery takes years of rare training, so qualified doctors are scarce
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Because hospitals have too many doctors and need to get rid of them
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "scarcity_prices",
  story: [
    animatedBeat(
      [
        T(
          "Have you ever wondered why different jobs in the world offer such different paychecks?",
          "Hast du dich je gefragt, warum verschiedene Berufe so unterschiedlich bezahlt werden?",
          "Czy zastanawiałeś się kiedyś, dlaczego różne zawody oferują tak różne wypłaty?",
        ),
        T(
          "Anyone can learn to carry a light box from one room to another in just ten minutes.",
          "Jeder kann in zehn Minuten lernen, eine leichte Kiste von A nach B zu tragen.",
          "Każdy może w dziesięć minut nauczyć się przenosić lekkie pudełko z pokoju do pokoju.",
        ),
        T(
          "Because hundreds of people can do simple tasks, those skills are abundant and pay modest wages.",
          "Weil viele das koennen, sind solche Faehigkeiten reichlich vorhanden und bringen Grundlohn.",
          "Ponieważ setki osób potrafią to robić, takie umiejętności są powszechne i dają podstawową płacę.",
        ),
        T(
          "The secret behind wages is not just sweat: it is *skill scarcity*.",
          "Das Geheimnis hinter Loehnen ist nicht nur Anstrengung: Es ist *Faehigkeitenknappheit*.",
          "Tajemnicą zarobków jest nie tylko wysiłek: to *rzadkość umiejętności*.",
        ),
      ],
      TalentScarcityDiagram,
    ),
    animatedBeat(
      [
        T(
          "Now imagine a giant airplane engine breaks down at the airport.",
          "Stell dir vor, ein riesiges Flugzeugtriebwerk faellt am Flughafen aus.",
          "Wyobraź sobie teraz, że na lotnisku psuje się silnik wielkiego samolotu.",
        ),
        T(
          "Fixing a jet engine requires ten years of advanced engineering school and rigorous safety exams.",
          "Die Reparatur erfordert zehn Jahre Ingenieurstudium und strengste Sicherheitspruefungen.",
          "Naprawa silnika odrzutowego wymaga dziesięciu lat studiów inżynierskich i trudnych egzaminów.",
        ),
        T(
          "Only three people in the entire region possess the certification to complete the repair.",
          "Nur drei Menschen in der gesamten Region besitzen die noetige Lizenz dafuer.",
          "Tylko trzy osoby w całym regionie mają certyfikat pozwalający wykonać tę naprawę.",
        ),
        T(
          "Airlines gladly offer high salaries because qualified candidates are extremely *scarce*.",
          "Fluggesellschaften zahlen gerne hohe Gehaelter, weil Fachkraefte extrem *knapp* sind.",
          "Linie lotnicze chętnie oferują wysokie pensje, ponieważ wykwalifikowani specjaliści są niezwykle *rzadcy*.",
        ),
      ],
      TalentScarcityDiagram,
    ),
    animatedBeat(
      [
        T(
          "The exact same scarcity rule governs precious physical assets like *gold*.",
          "Dieselbe Knappheitsregel gilt fuer wertvolle Sachschaetze wie *Gold*.",
          "Dokładnie ta sama reguła rzadkości rządzi cennymi aktywami, takimi jak *złoto*.",
        ),
        T(
          "River pebbles sit everywhere in unlimited quantities, so nobody pays coins for a common stone.",
          "Kieselsteine gibt es an jedem Fluss unbegrenzt, niemand zahlt Geld dafuer.",
          "Kamyki rzeczne leżą wszędzie w nieskończonych ilościach, więc nikt za nie nie płaci.",
        ),
        T(
          "All the gold ever mined in human history could fit into a single cube about twenty-two meters wide.",
          "Alles jemals gefoerderte Gold der Menschheit passt in einen Wuerfel von nur 22 Metern Kantenlaenge.",
          "Całe złoto wydobyte w dziejach ludzkości zmieściłoby się w sześcianie o boku zaledwie 22 metrów.",
        ),
        T(
          "Nature made gold rare and difficult to extract, preserving its purchasing power across centuries.",
          "Die Natur machte Gold selten und muehsam zu foerdern, was seinen Wert ueber Jahrhunderte bewahrt.",
          "Natura uczyniła złoto rzadkim i trudnym do wydobycia, co chroni jego wartość od stuleci.",
        ),
      ],
      TalentScarcityDiagram,
    ),
    animatedBeat(
      [
        T(
          "Scarcity also explains why company *shares and stocks* gain great value.",
          "Knappheit erklaert auch, warum Firmenanteile und *Aktien* wertvoll werden.",
          "Rzadkość wyjaśnia także, dlaczego udziały w firmach i *akcje* zyskują dużą wartość.",
        ),
        T(
          "When a brilliant company invents something helpful, millions of investors want to own a slice.",
          "Erfindet ein Unternehmen etwas Geniales, wollen Millionen Anleger einen Anteil besitzen.",
          "Gdy wspaniała firma tworzy przełomowy produkt, miliony inwestorów pragną mieć jej cząstkę.",
        ),
        T(
          "Yet the business only issues a strictly limited number of ownership shares.",
          "Doch das Unternehmen gibt nur eine streng begrenzte Anzahl an Aktien aus.",
          "Firma emituje jednak ściśle ograniczoną liczbę akcji własnościowych.",
        ),
        T(
          "With many buyers chasing a fixed pool of shares, the price per share shoots higher.",
          "Wenn viele Kaeufer um wenige Aktien wetteifern, klettert der Boersenpreis nach oben.",
          "Gdy wielu chętnych rywalizuje o stałą pulę akcji, cena za jedną akcję szybuje w górę.",
        ),
      ],
      TalentScarcityDiagram,
    ),
    animatedBeat(
      [
        T(
          "Understanding scarcity gives you a roadmap for your own education and career.",
          "Knappheit zu verstehen gibt dir einen Kompass fuer Ausbildung und Zukunft.",
          "Zrozumienie rzadkości daje kompas dla twojej edukacji i przyszłej kariery.",
        ),
        T(
          "Instead of competing where everyone else is doing easy tasks, focus on building *rare skills*.",
          "Statt um einfache Aufgaben zu konkurrieren, baue gezielt *seltene Faehigkeiten* auf.",
          "Zamiast konkurować przy prostych zadaniach, skup się na zdobywaniu *rzadkich umiejętności*.",
        ),
        T(
          "When your knowledge is hard to replace and truly useful, your future will be bright and secure.",
          "Wenn dein Koennen schwer ersetzbar und nuetzlich ist, wird deine Zukunft sicher und erfolgreich.",
          "Gdy twoja wiedza jest trudna do zastąpienia i naprawdę przydatna, twoja przyszłość będzie bezpieczna.",
        ),
      ],
      TalentScarcityDiagram,
    ),
  ],
  toyIntro: T(
    "Compare common jobs with rare specializations to discover how skill scarcity drives earnings.",
    "Vergleiche einfache Taetigkeiten mit seltenen Spezialberufen und entdecke die Wirkung von Knappheit.",
    "Porównaj proste zajęcia z rzadkimi specjalizacjami i zobacz, jak rzadkość talentu podnosi zarobki.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why do specialized engineers or surgeons earn higher salaries than entry-level helpers?",
        "Warum verdienen Fachingenieure oder Chirurgen hoehere Gehaelter als Hilfskraefte?",
        "Dlaczego wyspecjalizowani inżynierowie lub chirurdzy zarabiają więcej niż pracownicy pomocniczy?",
      ),
      options: [
        {
          text: T(
            "Their specialized skills require years of difficult study and are scarce in the job market",
            "Ihre Spezialfaehigkeiten erfordern jahrelange Ausbildung und sind auf dem Arbeitsmarkt knapp",
            "Ich specjalistyczne umiejętności wymagają lat trudnej nauki i są rzadkie na rynku pracy",
          ),
          correct: true,
        },
        {
          text: T(
            "They are given special shoes that walk faster than everyone else",
            "Sie bekommen Spezialschuhe geschenkt, mit denen man schneller gehen kann",
            "Dostają specjalne buty, w których chodzi się szybciej niż inni",
          ),
        },
        {
          text: T(
            "Because their job requires only three minutes of practice per week",
            "Weil ihre Arbeit nur drei Minuten Uebung pro Woche erfordert",
            "Ponieważ ich praca wymaga zaledwie trzech minut ćwiczeń w tygodniu",
          ),
        },
      ],
      hint: T(
        "Hard-to-replace skills give workers higher bargaining power.",
        "Schwer ersetzbare Faehigkeiten staerken die Verhandlungsposition.",
        "Trudne do zastąpienia umiejętności dają pracownikom silniejszą pozycję negocjacyjną.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why has physical gold kept its high purchasing value across thousands of human generations?",
        "Warum hat echtes Gold seinen hohen Wert ueber Jahrtausende hinweg bewahrt?",
        "Dlaczego fizyczne złoto utrzymało wysoką wartość przez tysiące pokoleń?",
      ),
      options: [
        {
          text: T(
            "Because its total supply in nature is strictly scarce and difficult to mine",
            "Weil sein natuerliches Vorkommen streng knapp und schwer abzubauen ist",
            "Ponieważ jego zasoby w naturze są ściśle ograniczone i trudne do wydobycia",
          ),
          correct: true,
        },
        {
          text: T(
            "Because gold can be made in any kitchen blender from honey and butter",
            "Weil Gold in jedem Kuechenmixer aus Honig und Butter hergestellt werden kann",
            "Ponieważ złoto można zrobić w blenderze kuchennym z miodu i masła",
          ),
        },
        {
          text: T(
            "Because governments print five tons of gold paper every morning",
            "Weil Regierungen jeden Morgen fuenf Tonnen Goldpapier drucken",
            "Ponieważ rządy drukują każdego ranka pięć ton złotego papieru",
          ),
        },
      ],
      hint: T(
        "You cannot artificially duplicate or inflate the physical supply of gold.",
        "Der physische Goldbestand laesst sich nicht beliebig vermehren.",
        "Fizycznych zasobów złota nie da się dowolnie powielić ani dodrukować.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify why mastering a complex discipline creates high earning potential.",
        "Finde heraus, warum das Beherrschen einer komplexen Disziplin hohe Verdienstchancen schafft.",
        "Wskaż, dlaczego opanowanie trudnej dziedziny daje wysoki potencjał zarobkowy.",
      ),
      Widget: ScarcityPricesWidget,
      hint: T(
        "When qualified candidates are few, employers offer higher compensation.",
        "Gibt es wenige qualifizierte Bewerber, bieten Arbeitgeber mehr Geld.",
        "Gdy wykwalifikowanych kandydatów jest niewielu, pracodawcy oferują wyższe płace.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: What difficult, specialized skill did you spend years learning that helped you stand out?",
    "Frage deine Eltern: Welche schwierige Spezialfaehigkeit habt ihr euch muehsam angeeignet, die euch beruflich geholfen hat?",
    "Zapytaj rodziców: Jakiej trudnej, specjalistycznej umiejętności uczyliście się latami, która pomogła Wam w karierze?",
  ),
  realLife: {
    title: T(
      "Real world: Deep-sea saturation divers and flight engineers",
      "Echte Welt: Tiefsee-Saettigungstaucher und Flugingenieure",
      "Prawdziwy świat: Nurkowie głębinowi i inżynierowie lotnictwa",
    ),
    body: T(
      "Commercial saturation divers spend weeks in pressurized living chambers hundreds of meters beneath the ocean to inspect pipelines. Because so few people in the world endure the intense physical risks and rigorous technical certifications, daily pay rates can exceed thousands of dollars.",
      "Saettigungstaucher leben wochenlang in Druckkammern tief im Meer, um Pipelines zu reparieren. Weil weltweit nur wenige Menschen diese koerperlichen Risiken und extremen Pruefungen bestehen, betragen Tagesgagen oft mehrere Tausend Dollar.",
      "Nurkowie saturacyjni spędzają tygodnie w komorach ciśnieniowych setki metrów pod wodą, naprawiając rurociągi. Ponieważ na świecie garstka osób posiada kwalifikacje i znosi to ryzyko, ich stawki dzienne sięgają tysięcy dolarów.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Gary Becker pioneered human capital theory, linking specialized education to wage differentials (Nobel Prize 1992).",
          "Gary Becker begruendete die Humankapitaltheorie zur Erklaerung von Lohnunterschieden (Nobelpreis 1992).",
          "Gary Becker stworzył teorię kapitału ludzkiego, wiążąc specjalistyczną edukację z różnicami płac (Nagroda Nobla 1992).",
        ),
        source: "https://www.nobelprize.org/prizes/economic-sciences/1992/summary/",
      },
      {
        text: T(
          "The World Gold Council estimates total above-ground gold stocks at approximately 212,500 metric tons as of 2024.",
          "Der World Gold Council schaetzt die weltweiten Goldbestaende auf etwa 212.500 Tonnen (Stand 2024).",
          "World Gold Council szacuje łączne światowe zasoby wydobytego złota na około 212 500 ton metrycznych (stan na 2024 r.).",
        ),
        source: "https://www.gold.org/goldhub/data/how-much-gold",
      },
      {
        text: T(
          "The US Bureau of Labor Statistics Occupational Outlook tracks wages across degrees of specialization and licensure.",
          "Das US-Arbeitsministerium dokumentiert Lohnunterschiede nach Spezialisierungsgrad und Zulassungen.",
          "Amerykańskie Biuro Statystyki Pracy rejestruje zależność wynagrodzeń od stopnia specjalizacji i licencji.",
        ),
        source: "https://www.bls.gov/ooh/",
      },
      {
        text: T(
          "Eugene Fama received the 2013 Nobel Prize in Economic Sciences for empirical analysis of asset pricing and equity markets.",
          "Eugene Fama erhielt 2013 den Nobelpreis fuer empirische Analysen zur Bewertung von Vermoegenswerten.",
          "Eugene Fama otrzymał w 2013 roku Nagrodę Nobla za badania nad wyceną aktywów i rynkami akcji.",
        ),
        source: "https://www.nobelprize.org/prizes/economic-sciences/2013/summary/",
      },
      {
        text: T(
          "Adam Smith analyzed wage variations based on the hardship, trust, and expense of learning a trade in 1776.",
          "Adam Smith erklaerte 1776 Lohnunterschiede durch Ausbildungsaufwand und gefordertes Vertrauen.",
          "Adam Smith w 1776 roku wyjaśnił różnice w płacach trudnością nauki zawodu i wymaganym zaufaniem.",
        ),
        source: "https://www.gutenberg.org/ebooks/3300",
      },
    ],
    simplified: [
      T(
        "Complex institutional labor collective bargaining models are simplified into direct skill supply scarcity.",
        "Tarifvertraege und institutionelle Arbeitsmarktregeln wurden auf das Grundprinzip der Faehigkeitenknappheit vereinfacht.",
        "Układy zbiorowe i złożone regulacje rynku pracy uproszczono do kluczowej zasady rzadkości umiejętności.",
      ),
    ],
  },
};
