import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  RadioPropagandaDiagram,
  TotalDevastationRubbleDiagram,
  WhiteRoseLeafletDiagram,
  UnitedNationsGlobeDiagram,
  GrundgesetzArticle1Diagram,
} from "./ww2.diagrams";
import { Ww2Toy } from "./ww2.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <Ww2Toy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <Ww2Toy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "ww2",
  story: [
    animatedBeat(
      [
        T(
          "In the nineteen thirties, economic distress and false promises led to dictatorship in Germany.",
          "In den 1930er Jahren fuehrten Not und falsche Heilsversprechen zur Diktatur in Deutschland."
        ),
        T(
          "Adolf Hitler and the Nazi regime dismantled the democratic republic and banned other parties.",
          "Das NS-Regime schaffte die demokratische Republik ab und verbot andere Parteien."
        ),
        T(
          "Independent newspapers were closed, and radio broadcasts repeated state *propaganda*.",
          "Unabhaengige Zeitungen wurden verboten und das Radio wiederholte staatliche *Propaganda*."
        ),
        T(
          "Dissenters and minorities were cruelly stripped of their citizenship and fundamental rights.",
          "Andersdenkende und Minderheiten wurden entrechtet und grausam verfolgt."
        ),
      ],
      RadioPropagandaDiagram
    ),
    animatedBeat(
      [
        T(
          "In September 1939, aggressive expansion ignited World War 2 across continents.",
          "Im September 1939 loeste der Angriff auf Polen den Zweiten Weltkrieg aus."
        ),
        T(
          "The conflict unleashed total industrial destruction on an unprecedented, tragic scale.",
          "Der Krieg brachte Zerstoerung in einem nie dagewesenen, tragischen Ausmass."
        ),
        T(
          "Homes, schools, libraries, and historic city centers across Europe were left in smoking ruins.",
          "Haeuser, Schulen und historische Innenstaedte lagen quer durch Europa in Truemmern."
        ),
        T(
          "Millions of innocent human lives were lost to hatred, oppression, and totalitarian fanaticism.",
          "Millionen unschuldiger Menschenleben fielen Hass, Verfolgung und Fanatismus zum Opfer."
        ),
      ],
      TotalDevastationRubbleDiagram
    ),
    animatedBeat(
      [
        T(
          "Even under terrifying danger, courageous individuals showed extraordinary *civil courage*.",
          "Selbst unter Lebensgefahr zeigten mutige Menschen aussergewoehnliche *Zivilcourage*."
        ),
        T(
          "In Munich, university students Hans and Sophie Scholl formed the White Rose resistance.",
          "In Muenchen gruendeten die Geschwister Hans und Sophie Scholl die Widerstandsgruppe Weisse Rose."
        ),
        T(
          "They secretly printed leaflets urging citizens to reject cruelty and stand up for human decency.",
          "Sie druckten heimlich Flugblaetter, die dazu aufriefen, fuer Menschlichkeit einzustehen."
        ),
        T(
          "Their brave words reminded the world that the human spirit cannot be crushed by tyranny.",
          "Ihr Mut erinnerte daran, dass das Gewissen der Menschen nicht erdrueckt werden kann."
        ),
      ],
      WhiteRoseLeafletDiagram
    ),
    animatedBeat(
      [
        T(
          "In 1945, the dictatorship fell and the devastating war finally came to an end.",
          "1945 brach das Unrechtsregime zusammen und der schreckliche Krieg fand sein Ende."
        ),
        T(
          "Representatives of fifty nations met in San Francisco to form the United Nations.",
          "In San Francisco gruendeten Vertreter aus 50 Laendern die Vereinten Nationen."
        ),
        T(
          "They pledged to work together so international law would prevent such horrors from recurring.",
          "Sie versprachen, durch Voelkerrecht ein solches Leid fuer die Zukunft zu verhindern."
        ),
        T(
          "In 1948, the world adopted the Universal Declaration of Human Rights.",
          "1948 verabschiedete die Welt die Allgemeine Erklaerung der Menschenrechte."
        ),
      ],
      UnitedNationsGlobeDiagram
    ),
    animatedBeat(
      [
        T(
          "In Germany, democratic leaders founded a new constitutional republic grounded in peace.",
          "In Deutschland gruendeten Demokraten eine neue Verfassungsordnung des Friedens."
        ),
        T(
          "They placed *human rights* at the absolute foundation of the German Basic Law.",
          "Sie stellten die *Menschenrechte* an das absolute Fundament des Grundgesetzes."
        ),
        T(
          "Article 1 solemnly declares: 'Human dignity shall be inviolable.'",
          "Artikel 1 erklaert feierlich: 'Die Wuerde des Menschen ist unantastbar.'"
        ),
        T(
          "Remembering history is a shared promise to defend human dignity every single day.",
          "Erinnerung ist das Versprechen, diese Wuerde an jedem Tag unseres Lebens zu schuetzen."
        ),
      ],
      GrundgesetzArticle1Diagram
    ),
  ],
  toyIntro: T(
    "Raise the pillars of free speech, equal rights, and civil courage to protect human dignity.",
    "Errichte die Pfeiler fuer freie Presse, gleiche Rechte und Zivilcourage, um die Wuerde zu schuetzen."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does the famous opening line of the German Basic Law (Grundgesetz Article 1) state?",
        "Wie lautet der beruehmte erste Satz in Artikel 1 des deutschen Grundgesetzes?"
      ),
      options: [
        {
          text: T(
            "'Human dignity shall be inviolable' (Die Wuerde des Menschen ist unantastbar)",
            "'Die Wuerde des Menschen ist unantastbar'"
          ),
          correct: true,
        },
        {
          text: T(
            "'Every Friday afternoon shall be dedicated to eating chocolate pudding'",
            "'Jeder Freitagnachmittag ist dem Essen von Schokopudding gewidmet'"
          ),
        },
        {
          text: T(
            "'All school bags must be painted neon yellow with purple stripes'",
            "'Alle Schulranzen muessen neon-gelb mit lila Streifen bemalt sein'"
          ),
        },
      ],
      hint: T(
        "Human dignity is the supreme, inviolable constitutional principle in Germany.",
        "Die Menschenwuerde ist das oberste, unverletzliche Grundrecht in Deutschland."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Who were Hans and Sophie Scholl, and what did the White Rose stand for?",
        "Wer waren Hans und Sophie Scholl und wofuer stand die Weisse Rose?"
      ),
      options: [
        {
          text: T(
            "Brave students who showed peaceful civil courage by printing leaflets against tyranny",
            "Mutige Studenten, die mit Flugblaettern friedliche Zivilcourage gegen die Tyrannei zeigten"
          ),
          correct: true,
        },
        {
          text: T(
            "Botanists who invented a glowing rose that could talk to butterflies",
            "Botaniker, die eine leuchtende Rose erfanden, die mit Schmetterlingen sprach"
          ),
        },
        {
          text: T(
            "Circus performers who walked across telephone cables on wooden stilts",
            "Zirkusartisten, die auf Holzstelzen ueber Telefonkabel balancierten"
          ),
        },
      ],
      hint: T(
        "They demonstrated heroic civil courage in Munich during dark times.",
        "Sie zeigten heldenhafte Zivilcourage in Muenchen waehrend der Diktatur."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Activate all three protective pillars (Free Speech, Equal Rights, and Civil Courage) to illuminate the monument.",
        "Aktiviere alle drei Pfeiler (Freie Presse, Gleiche Rechte, Zivilcourage), um das Denkmal zu erleuchten."
      ),
      Widget: Widget,
      hint: T(
        "Click on each pillar so all three display checkmarks, then tap check.",
        "Klicke auf jeden Pfeiler, sodass alle drei ein Haekchen haben, und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, what does civil courage mean when someone around us is being treated unfairly at school?",
    "Papa, was bedeutet Zivilcourage, wenn jemand bei uns an der Schule ungerecht behandelt wird?"
  ),
  realLife: {
    title: T("Stolpersteine in German Towns", "Stolpersteine in deutschen Staedten"),
    body: T(
      "In hundreds of German towns and cities, small brass cobblestones called Stolpersteine (stumbling stones) are embedded in pavements outside houses. Created by artist Gunter Demnig, each stone is hand-engraved with the name and dates of an individual persecuted under the Nazi regime, ensuring that their names and human dignity are never forgotten.",
      "In hunderten deutschen Staedten sind kleine Messing-Pflastersteine in Gehwege vor Haeusern eingelassen: Stolpersteine. Geschaffen vom Kuenstler Gunter Demnig, traegt jeder Stein den eingravierten Namen eines verfolgten Menschen, damit deren Schicksal und Wuerde niemals in Vergessenheit geraten."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The German Basic Law (Grundgesetz) was promulgated on 23 May 1949, opening with Article 1: Human dignity shall be inviolable.",
        source: "https://www.gesetze-im-internet.de/gg/art_1.html",
      },
      {
        text: "The White Rose student resistance group distributed six anti-regime leaflets at Ludwig Maximilian University of Munich in 1942-1943.",
        source: "https://www.weisse-rose-stiftung.de/die-weisse-rose/",
      },
      {
        text: "The Charter of the United Nations was signed on 26 June 1945 in San Francisco by representatives of fifty nations.",
        source: "https://www.un.org/en/about-us/un-charter",
      },
      {
        text: "The Universal Declaration of Human Rights was adopted by the United Nations General Assembly in Paris on 10 December 1948.",
        source: "https://www.un.org/en/about-us/universal-declaration-of-human-rights",
      },
      {
        text: "Over 100,000 Stolpersteine brass commemorative memorials have been installed across thirty European countries.",
        source: "https://www.stolpersteine.eu/",
      },
    ],
    simplified: [
      "We emphasize the defense of civil liberties and human dignity rather than graphic wartime trauma.",
      "We highlight ethical civil courage through the courageous example of the White Rose students.",
      "We ground modern German constitutional democracy in its founding moral commitment: Never Again.",
    ],
  },
};
