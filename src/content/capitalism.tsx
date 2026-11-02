import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { PrivateOwnershipDiagram, CompetitionDiagram, RulesBalanceDiagram, SummaryDiagram, ProsperityDiagram } from "./capitalism.diagrams";
import { CapitalismToy } from "./capitalism.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <CapitalismToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <CapitalismToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "capitalism",
  story: [
    animatedBeat(
      [
        T(
          "In Ripple Town's market square, Bea owns her brick oven and Finn owns his fishing boat.",
          "Auf dem Marktplatz von Ripple Town besitzt Bea ihren gemauerten Ofen und Finn sein Fischerboot."
        ),
        T(
          "An economic system where individuals and private businesses own tools, shops, and land is called *capitalism*.",
          "Ein Wirtschaftssystem, in dem Einzelpersonen und Betriebe Werkzeuge, Läden und Land besitzen, heißt *Kapitalismus*."
        ),
        T(
          "Because Bea owns her bakery and keeps her earnings, she works hard to invent tasty sesame rolls.",
          "Weil Bea ihre Bäckerei besitzt und ihren Erlös behält, strengt sie sich an neue Sesambrötchen zu erfinden."
        ),
        T(
          "Private ownership creates a powerful incentive to work diligently, take care of tools, and invent new ideas.",
          "Privateigentum schafft einen starken Anreiz fleißig zu arbeiten, Werkzeuge zu pflegen und Neues zu erfinden."
        ),
      ],
      PrivateOwnershipDiagram
    ),
    animatedBeat(
      [
        T(
          "Soon, Leo opens a second bakery across the street, offering whole grain loaves.",
          "Bald eröffnet Leo eine zweite Bäckerei gegenüber und bietet Vollkornbrote an."
        ),
        T(
          "This friendly contest between businesses to attract customers is called *competition*.",
          "Diesen fairen Wettbewerb zwischen Unternehmen um Kunden nennt man *Konkurrenz*."
        ),
        T(
          "Neither Bea nor Leo can charge unfair high prices, because customers would just go to the other shop.",
          "Weder Bea noch Leo können überteuerte Preise verlangen, weil Kunden sonst zum anderen Laden gehen."
        ),
        T(
          "Competition gives people choices, encourages quality, and keeps prices fair.",
          "Wettbewerb bietet Menschen Auswahl, fördert Qualität und hält Preise fair."
        ),
      ],
      CompetitionDiagram
    ),
    animatedBeat(
      [
        T(
          "However, totally unchecked markets can lead to problems if there are no ground rules.",
          "Völlig unkontrollierte Märkte können jedoch Probleme schaffen, wenn es keine Grundregeln gibt."
        ),
        T(
          "A business might try to pay unfair wages or dump dirty oven ash straight into the town river.",
          "Ein Betrieb könnte versuchen, unfaire Löhne zu zahlen oder Ofenasche direkt in den Fluss zu kippen."
        ),
        T(
          "That is why modern societies create a *Social Market Economy*.",
          "Deshalb schaffen moderne Gesellschaften eine *Soziale Marktwirtschaft*."
        ),
        T(
          "Fair laws protect workers, stop monopolies from bullying smaller shops, and keep nature clean.",
          "Faire Gesetze schützen Arbeiter, verhindern Monopole und halten die Natur sauber."
        ),
      ],
      RulesBalanceDiagram
    ),
    animatedBeat(
      [
        T(
          "Capitalism unleashes human energy, creativity, and abundance.",
          "Kapitalismus entfesselt menschliche Energie, Kreativität und Wohlstand."
        ),
        T(
          "Combined with democratic rules and social protection, it creates a thriving, fair society for all.",
          "Kombiniert mit demokratischen Regeln und sozialem Schutz schafft er ein faires Dorf für alle."
        ),
      ],
      SummaryDiagram
    ),
    animatedBeat(
      [
        T(
          "When everyone has the opportunity to build and innovate under fair rules, the entire community shares in prosperity.",
          "Wenn jeder die Möglichkeit hat unter fairen Regeln aufzubauen und Neues zu erfinden, teilt das ganze Dorf den Wohlstand."
        ),
        T(
          "Freedom to create combined with social responsibility creates a balance where everyone can flourish.",
          "Freiheit zum Gestalten verbunden mit sozialer Verantwortung schafft ein Gleichgewicht, in dem alle aufblühen können."
        ),
      ],
      ProsperityDiagram
    ),
  ],
  toyIntro: T(
    "Run the market square simulation: balance business investment with fair rules for workers and nature.",
    "Führe die Marktplatz-Simulation aus: verbinde Investitionen mit fairen Regeln für Arbeiter und Umwelt."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the main characteristic of capitalism?",
        "Was ist das Hauptmerkmal des Kapitalismus?"
      ),
      options: [
        {
          text: T(
            "Private individuals own tools, workshops, and businesses, and decide what to produce based on markets",
            "Private Personen besitzen Werkzeuge, Werkstätten und Betriebe und entscheiden nach dem Markt was produziert wird"
          ),
          correct: true,
        },
        {
          text: T(
            "The town leader owns every pencil and spoon in the entire village",
            "Der Dorfanführer besitzt jeden Bleistift und Löffel im gesamten Dorf"
          ),
        },
        {
          text: T(
            "Nobody is allowed to work or trade anything ever",
            "Niemand darf jemals arbeiten oder handeln"
          ),
        },
      ],
      hint: T(
        "Capitalism is based on private property, voluntary trade, and market competition.",
        "Kapitalismus basiert auf Privateigentum, freiwilligem Handel und Marktwettbewerb."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why does Germany call its system a 'Social Market Economy'?",
        "Warum nennt Deutschland sein Wirtschaftssystem 'Soziale Marktwirtschaft'?"
      ),
      options: [
        {
          text: T(
            "It combines the efficiency and freedom of markets with social protections, fair wages, and environmental rules",
            "Es verbindet Freiheit und Effizienz von Märkten mit sozialer Absicherung, fairen Löhnen und Umweltregeln"
          ),
          correct: true,
        },
        {
          text: T(
            "It only sells social games and board games in stores",
            "Es verkauft in den Läden nur Gesellschaftsspiele"
          ),
        },
        {
          text: T(
            "It bans all private shops completely",
            "Es verbietet alle privaten Geschäfte vollständig"
          ),
        },
      ],
      hint: T(
        "The social element adds worker rights, social safety nets, and fair competition rules.",
        "Das soziale Element ergänzt Arbeitnehmerrechte, soziale Netze und faire Wettbewerbsregeln."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "In a market economy, what motivates Bea to wake up early and bake delicious bread?",
        "Was motiviert Bea in einer Marktwirtschaft, früh aufzustehen und leckeres Brot zu backen?"
      ),
      Widget: Widget,
      hint: T(
        "Think about what owning a shop and earning customer satisfaction provides.",
        "Überlege, was der Besitz eines Geschäfts und zufriedene Kunden ermöglichen."
      ),
    },
  ],
  askDad: T(
    "Papa, what does the word 'Social' add to 'Market Economy' in Germany?",
    "Papa, was fügt das Wort 'Sozial' zur 'Marktwirtschaft' in Deutschland hinzu?"
  ),
  realLife: {
    title: T("The Social Market Economy in Germany", "Die Soziale Marktwirtschaft in Deutschland"),
    body: T(
      "Germany operates a 'Social Market Economy' (Soziale Marktwirtschaft), designed after World War II by Ludwig Erhard. It combines the freedom and efficiency of private markets with social security, public healthcare, worker protections, and antitrust laws.",
      "Deutschland lebt in einer 'Sozialen Marktwirtschaft', nach dem Zweiten Weltkrieg von Ludwig Erhard geprägt. Sie verbindet Markt-Freiheit und Produktivität mit sozialer Sicherheit, gesetzlicher Krankenversicherung, Arbeitsschutz und Kartellgesetzen."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The concept of the Social Market Economy was established in post-war West Germany by Ludwig Erhard and Alfred Mueller-Armack.",
        source: "https://www.bmwk.de/Redaktion/DE/Dossier/soziale-marktwirtschaft.html",
      },
      {
        text: "The Federal Cartel Office (Bundeskartellamt) enforces antitrust laws to prevent monopolies and protect consumer price competition.",
        source: "https://www.bundeskartellamt.de/",
      },
      {
        text: "The German Basic Law (Grundgesetz Art. 14) protects private property while explicitly stipulating that 'Property entails obligations. Its use shall also serve the public good.'",
        source: "https://www.gesetze-im-internet.de/gg/art_14.html",
      },
      {
        text: "Statistical data shows Germany combines private ownership of enterprise with comprehensive social insurance and collective wage agreements.",
        source: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Einkommen-Konsum-Lebensbedingungen/_inhalt.html",
      },
      {
        text: "Civic education frameworks present the market economy as an effective coordination system that requires institutional frameworks for environmental and social balance.",
        source: "https://www.bpb.de/themen/wirtschaft/",
      },
    ],
    simplified: [
      "We explain capitalism through Bea's bakery and Finn's fishing boat so children see how owning tools drives initiative.",
      "We show competition between two bakers as the reason why bread stays fresh and prices remain fair.",
      "We introduce the Social Market Economy as rules keeping river water clean and wages fair.",
    ],
  },
};
