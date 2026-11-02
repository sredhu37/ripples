import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  SaltCrystalDiagram,
  DandiMarchCoastDiagram,
  CharkhaSpinningWheelDiagram,
  TriColorAshokaDiagram,
  ConstitutionAssemblyDiagram,
} from "./independence.diagrams";
import { IndependenceToy } from "./independence.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <IndependenceToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <IndependenceToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "independence",
  story: [
    animatedBeat(
      [
        T(
          "By the twentieth century, millions of people across South Asia shared a heartfelt dream.",
          "Im zwanzigsten Jahrhundert teilten Millionen Menschen in Suedasien einen tiefen Traum."
        ),
        T(
          "They dreamed of self-rule, democratic freedom, and deciding their own laws in peace.",
          "Sie traeumten von Selbstbestimmung, demokratischer Freiheit und eigenen Gesetzen."
        ),
        T(
          "Yet foreign rulers held all military weapons, stone prisons, and armed police forces.",
          "Doch die Kolonialmacht kontrollierte Militaerwaffen, Gefaengnisse und Polizeitruppen."
        ),
        T(
          "How could ordinary farmers and families win freedom against such overwhelming force?",
          "Wie konnten Bauern und Familien ihre Freiheit gegen solche Uebermacht erringen?"
        ),
      ],
      SaltCrystalDiagram
    ),
    animatedBeat(
      [
        T(
          "A thoughtful lawyer named Mahatma Gandhi proposed a revolutionary path: *Ahimsa* and *Satyagraha*.",
          "Ein nachdenklicher Anwalt namens Mahatma Gandhi schlug einen neuen Weg vor: *Ahimsa* und *Satyagraha*."
        ),
        T(
          "Ahimsa means choosing complete *non-violence* in words, thoughts, and actions.",
          "Ahimsa bedeutet vollkommene *Gewaltfreiheit* in Worten, Gedanken und Taten."
        ),
        T(
          "Satyagraha means holding firmly to moral truth with quiet, fearless determination.",
          "Satyagraha bedeutet, mutig und friedlich fuer die Gerechtigkeit einzustehen."
        ),
        T(
          "Gandhi taught that when people refuse to cooperate with unfair rules, injustice collapses.",
          "Gandhi lehrte: Wenn Menschen sich friedlich weigern, Ungerechtigkeit mitzumachen, verliert sie ihre Macht."
        ),
      ],
      DandiMarchCoastDiagram
    ),
    animatedBeat(
      [
        T(
          "In 1930, the colonial government strictly forbade citizens from gathering natural sea salt.",
          "1930 verbot die Kolonialregierung den Buergern, Meersalz selbst zu gewinnen, und erhob eine Salzsteuer."
        ),
        T(
          "Gandhi walked two hundred and forty miles on dusty roads to the coastal village of Dandi.",
          "Gandhi marschierte zweihundertvierzig Meilen zu Fuss an die Kueste nach Dandi."
        ),
        T(
          "He bent down, lifted a handful of pure white sea salt, and smiled.",
          "Er bueckte sich, hob eine Handvoll weisses Meersalz auf und laechelte."
        ),
        T(
          "By this simple, peaceful act, millions joined in making their own salt without fear.",
          "Mit dieser einfachen, friedlichen Geste begannen Millionen Menschen furchtlos, ihr eigenes Salz zu gewinnen."
        ),
      ],
      CharkhaSpinningWheelDiagram
    ),
    animatedBeat(
      [
        T(
          "Citizens also turned to the *Charkha*, the traditional wooden spinning wheel.",
          "Die Menschen nutzten auch das *Charkha*, das traditionelle hoelzerne Spinnrad."
        ),
        T(
          "Families gathered on verandahs to spin their own cotton thread and weave homespun Khadi cloth.",
          "Familien sassen zusammen, spannen ihr eigenes Garn und woben einfache Khadi-Kleidung."
        ),
        T(
          "By wearing homespun cloth, they boycotted foreign goods and supported local artisan neighbors.",
          "Durch die selbstgemachte Kleidung unterstuetzten sie Nachbarn und wurden unabhaengig."
        ),
        T(
          "Patience, dignity, and collective solidarity proved stronger than any military fleet.",
          "Geduld, Wuerde und Zusammenhalt erwiesen sich als staerker als jede Militaerflotte."
        ),
      ],
      TriColorAshokaDiagram
    ),
    animatedBeat(
      [
        T(
          "At midnight on August 15, 1947, India celebrated its hard-won national *independence*.",
          "Um Mitternacht am 15. August 1947 feierte Indien seine erkaempfte *Unabhaengigkeit*."
        ),
        T(
          "To safeguard liberty for all, Dr. B. R. Ambedkar guided the drafting of a democratic *constitution*.",
          "Um die Freiheit zu schuetzen, leitete Dr. B. R. Ambedkar den Entwurf einer demokratischen *Verfassung*."
        ),
        T(
          "It abolished discrimination, guaranteed equality before the law, and established universal voting rights.",
          "Sie schaffte Diskriminierung ab, garantierte Gleichheit vor dem Gesetz und fuehrte das Wahlrecht ein."
        ),
        T(
          "The peaceful journey inspired civil rights leaders around the globe, from Martin Luther King to Nelson Mandela.",
          "Dieser friedliche Weg inspirierte Buergerrechtler weltweit, von Martin Luther King bis Nelson Mandela."
        ),
      ],
      ConstitutionAssemblyDiagram
    ),
  ],
  toyIntro: T(
    "Turn the wooden Charkha wheel to spin spools of thread and build community solidarity.",
    "Drehe das hoelzerne Charkha-Spinnrad, um Garn zu spinnen und Verbundenheit zu staerken."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does the term 'Ahimsa' mean in the philosophy of peaceful independence?",
        "Was bedeutet der Begriff 'Ahimsa' auf dem Weg zur Unabhaengigkeit?"
      ),
      options: [
        {
          text: T(
            "Complete non-violence and respect for all living beings",
            "Vollkommene Gewaltfreiheit und Respekt fuer alle Lebewesen"
          ),
          correct: true,
        },
        {
          text: T(
            "A fast racing car with shiny golden wheels",
            "Ein schneller Rennwagen mit glaenzenden Goldraedern"
          ),
        },
        {
          text: T(
            "The secret art of hiding coins under sofa cushions",
            "Die geheime Kunst, Muenzen unter Sofakissen zu verstecken"
          ),
        },
      ],
      hint: T(
        "Gandhi insisted that freedom must be achieved without violence or physical harm.",
        "Gandhi betonte, dass Freiheit ohne Gewalt und Schaden erreicht werden muss."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why was the traditional wooden spinning wheel (Charkha) such a powerful symbol?",
        "Warum war das traditionelle Spinnrad (Charkha) ein so starkes Symbol?"
      ),
      options: [
        {
          text: T(
            "It represented self-reliance, local craftsmanship, and peaceful collective unity",
            "Es stand fuer Selbstbestimmung, eigenes Handwerk und friedlichen Zusammenhalt"
          ),
          correct: true,
        },
        {
          text: T(
            "It was used to play musical tunes during lunch breaks",
            "Man spielte damit Musikstuecke in den Mittagspausen"
          ),
        },
        {
          text: T(
            "It turned sand directly into strawberry ice cream",
            "Es verwandelte Sand direkt in Erdbeereis"
          ),
        },
      ],
      hint: T(
        "Spinning thread allowed families to produce their own clothes without relying on foreign mills.",
        "Das Spinnen ermoeglichte es Familien, eigene Kleidung ohne fremde Fabriken herzustellen."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Spin the wooden Charkha wheel to produce at least 3 spools of thread and achieve solidarity.",
        "Drehe das Charkha-Spinnrad, um mindestens 3 Spulen Garn zu fertigen und Einheit zu erreichen."
      ),
      Widget: Widget,
      hint: T(
        "Click the Spin Thread button until you have at least 3 spools, then tap check.",
        "Klicke auf Rad drehen, bis du mindestens 3 Spulen hast, und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, how can we use peaceful words and patience when solving disagreements with our friends?",
    "Papa, wie koennen wir friedliche Worte und Geduld nutzen, wenn wir uns mit Freunden streiten?"
  ),
  realLife: {
    title: T("Peaceful Resistance in German History", "Friedlicher Protest in der deutschen Geschichte"),
    body: T(
      "The power of non-violent civic courage was demonstrated in Germany during the autumn of 1989. In Leipzig and other East German cities, tens of thousands of citizens carried candles during peaceful Monday demonstrations (Montagsdemonstrationen), chanting 'Wir sind das Volk' (We are the people). Their peaceful courage brought down the Berlin Wall without weapons.",
      "Die Kraft friedlicher Zivilcourage zeigte sich in Deutschland im Herbst 1989. In Leipzig und anderen Staedten trugen zehntausende Buerger Kerzen bei den friedlichen Montagsdemonstrationen und riefen 'Wir sind das Volk'. Ihr gewaltloser Mut brachte die Berliner Mauer ohne Waffen zu Fall."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The Dandi Salt March covered 240 miles from Sabarmati Ashram to the Arabian Sea in March-April 1930.",
        source: "https://www.britannica.com/event/Salt-March",
      },
      {
        text: "The Indian Independence Act 1947 granted legislative independence to India on 15 August 1947.",
        source: "https://www.legislation.gov.uk/ukpga/1947/30/enacted",
      },
      {
        text: "Dr. Bhimrao Ramji Ambedkar served as the chairman of the Drafting Committee for the Constitution of India.",
        source: "https://www.britannica.com/biography/Bhimrao-Ramji-Ambedkar",
      },
      {
        text: "The Constitution of India came into effect on 26 January 1950, establishing universal adult franchise without property or gender restrictions.",
        source: "https://www.india.gov.in/my-government/constitution-india",
      },
      {
        text: "The 1989 peaceful Monday demonstrations in Leipzig mobilized over 70,000 citizens with candles, precipitating the fall of the Berlin Wall.",
        source: "https://www.bundesarchiv.de/themen-entdecken/online-ausstellungen/die-friedliche-revolution-1989/",
      },
    ],
    simplified: [
      "We explain non-violent civil resistance through the physical metaphors of the Salt March and the Charkha spinning wheel.",
      "We focus on self-reliance, moral dignity, and constitutional equality under the rule of law.",
      "We draw direct parallels to modern peaceful movements in German and world history.",
    ],
  },
};
