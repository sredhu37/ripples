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

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <IndependenceToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <IndependenceToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "independence",
  story: [
    animatedBeat(
      [
        T(
          "By the twentieth century, millions of people across South Asia shared a heartfelt dream.",
          "Im zwanzigsten Jahrhundert teilten Millionen Menschen in Suedasien einen tiefen Traum.",
          "W dwudziestym wieku miliony ludzi w Azji Południowej łączyło gorące marzenie.",
        ),
        T(
          "They dreamed of self-rule, democratic freedom, and deciding their own laws in peace.",
          "Sie traeumten von Selbstbestimmung, demokratischer Freiheit und eigenen Gesetzen.",
          "Marzyli o samostanowieniu, demokratycznej wolności i stanowieniu własnych praw w pokoju.",
        ),
        T(
          "Yet foreign rulers held all military weapons, stone prisons, and armed police forces.",
          "Doch die Kolonialmacht kontrollierte Militaerwaffen, Gefaengnisse und Polizeitruppen.",
          "Jednak obca władza kontrolowała broń, kamienne więzienia i uzbrojone formacje policyjne.",
        ),
        T(
          "How could ordinary farmers and families win freedom against such overwhelming force?",
          "Wie konnten Bauern und Familien ihre Freiheit gegen solche Uebermacht erringen?",
          "Jak zwykli rolnicy, tkacze i rodziny mogli odzyskać wolność w obliczu tak wielkiej siły militarnej?",
        ),
      ],
      SaltCrystalDiagram,
    ),
    animatedBeat(
      [
        T(
          "A thoughtful lawyer named Mahatma Gandhi proposed a revolutionary path: *Ahimsa* and *Satyagraha*.",
          "Ein nachdenklicher Anwalt namens Mahatma Gandhi schlug einen neuen Weg vor: *Ahimsa* und *Satyagraha*.",
          "Prawnik Mahatma Gandhi zaproponował rewolucyjną drogę: zasady *Ahimsa* oraz *Satyagraha*.",
        ),
        T(
          "Ahimsa means choosing complete *non-violence* in words, thoughts, and actions.",
          "Ahimsa bedeutet vollkommene *Gewaltfreiheit* in Worten, Gedanken und Taten.",
          "Ahimsa oznacza całkowite wyrzeczenie się *przemocy* w słowach, myślach i czynach.",
        ),
        T(
          "Satyagraha means holding firmly to moral truth with quiet, fearless determination.",
          "Satyagraha bedeutet, mutig und friedlich fuer die Gerechtigkeit einzustehen.",
          "Satyagraha oznacza niezłomne trwanie przy prawdzie moralnej ze spokojną, odważną determinacją.",
        ),
        T(
          "Gandhi taught that when people refuse to cooperate with unfair rules, injustice collapses.",
          "Gandhi lehrte: Wenn Menschen sich friedlich weigern, Ungerechtigkeit mitzumachen, verliert sie ihre Macht.",
          "Gandhi nauczał, że gdy obywatele pokojowo odmawiają współpracy z niesprawiedliwym prawem, zło traci swą siłę.",
        ),
      ],
      DandiMarchCoastDiagram,
    ),
    animatedBeat(
      [
        T(
          "In 1930, the colonial government strictly forbade citizens from gathering natural sea salt.",
          "1930 verbot die Kolonialregierung den Buergern, Meersalz selbst zu gewinnen, und erhob eine Salzsteuer.",
          "W 1930 roku władze kolonialne surowo zabroniły zbierania naturalnej soli morskiej i nałożyły podatek solny.",
        ),
        T(
          "Gandhi walked two hundred and forty miles on dusty roads to the coastal village of Dandi.",
          "Gandhi marschierte zweihundertvierzig Meilen zu Fuss an die Kueste nach Dandi.",
          "Gandhi przeszedł pieszo dwieście czterdzieści mil pylistymi drogami aż do nadmorskiej wsi Dandi.",
        ),
        T(
          "He bent down, lifted a handful of pure white sea salt, and smiled.",
          "Er bueckte sich, hob eine Handvoll weisses Meersalz auf und laechelte.",
          "Schylił się ku falom, podniósł garść czystej, białej soli morskiej i uśmiechnął się.",
        ),
        T(
          "By this simple, peaceful act, millions joined in making their own salt without fear.",
          "Mit dieser einfachen, friedlichen Geste begannen Millionen Menschen furchtlos, ihr eigenes Salz zu gewinnen.",
          "Tym prostym, pokojowym gestem natchnął miliony ludzi, którzy bez lęku zaczęli pozyskiwać własną sól.",
        ),
      ],
      CharkhaSpinningWheelDiagram,
    ),
    animatedBeat(
      [
        T(
          "Citizens also turned to the *Charkha*, the traditional wooden spinning wheel.",
          "Die Menschen nutzten auch das *Charkha*, das traditionelle hoelzerne Spinnrad.",
          "Obywatele sięgnęli również po *Charkha*, tradycyjny drewniany kołowrotek tkacki.",
        ),
        T(
          "Families gathered on verandahs to spin their own cotton thread and weave homespun Khadi cloth.",
          "Familien sassen zusammen, spannen ihr eigenes Garn und woben einfache Khadi-Kleidung.",
          "Rodziny siadały razem na gankach, aby prząść własną nić bawełnianą i tkać prostą odzież khadi.",
        ),
        T(
          "By wearing homespun cloth, they boycotted foreign goods and supported local artisan neighbors.",
          "Durch die selbstgemachte Kleidung unterstuetzten sie Nachbarn und wurden unabhaengig.",
          "Nosząc własnoręcznie utkaną odzież, bojkotowali importowane towary i wspierali miejscowych rzemieślników.",
        ),
        T(
          "Patience, dignity, and collective solidarity proved stronger than any military fleet.",
          "Geduld, Wuerde und Zusammenhalt erwiesen sich als staerker als jede Militaerflotte.",
          "Cierpliwość, ludzka godność i wspólna solidarność okazały się silniejsze niż jakiekolwiek armie.",
        ),
      ],
      TriColorAshokaDiagram,
    ),
    animatedBeat(
      [
        T(
          "At midnight on August 15, 1947, India celebrated its hard-won national *independence*.",
          "Um Mitternacht am 15. August 1947 feierte Indien seine erkaempfte *Unabhaengigkeit*.",
          "O północy 15 sierpnia 1947 roku Indie świętowały upragnioną, wywalczoną pokojem *niepodległość*.",
        ),
        T(
          "To safeguard liberty for all, Dr. B. R. Ambedkar guided the drafting of a democratic *constitution*.",
          "Um die Freiheit zu schuetzen, leitete Dr. B. R. Ambedkar den Entwurf einer demokratischen *Verfassung*.",
          "Aby strzec wolności wszystkich obywateli, dr B. R. Ambedkar pokierował pracami nad demokratyczną *konstytucją*.",
        ),
        T(
          "It abolished discrimination, guaranteed equality before the law, and established universal voting rights.",
          "Sie schaffte Diskriminierung ab, garantierte Gleichheit vor dem Gesetz und fuehrte das Wahlrecht ein.",
          "Konstytucja zniosła dyskryminację, zagwarantowała równość wobec prawa i powszechne prawo głosu.",
        ),
        T(
          "The peaceful journey inspired civil rights leaders around the globe, from Martin Luther King to Nelson Mandela.",
          "Dieser friedliche Weg inspirierte Buergerrechtler weltweit, von Martin Luther King bis Nelson Mandela.",
          "Ta droga pokojowego oporu zainspirowała ruchy praw obywatelskich na całym świecie, od Martina Luthera Kinga po Nelsona Mandelę.",
        ),
      ],
      ConstitutionAssemblyDiagram,
    ),
  ],
  toyIntro: T(
    "Turn the wooden Charkha wheel to spin spools of thread and build community solidarity.",
    "Drehe das hoelzerne Charkha-Spinnrad, um Garn zu spinnen und Verbundenheit zu staerken.",
    "Obróć drewniany kołowrotek Charkha, aby uprząść szpulki nici i zbudować solidarność wspólnoty.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does the term 'Ahimsa' mean in the philosophy of peaceful independence?",
        "Was bedeutet der Begriff 'Ahimsa' auf dem Weg zur Unabhaengigkeit?",
        "Co oznacza pojęcie 'Ahimsa' w filozofii pokojowej walki o niepodległość?",
      ),
      options: [
        {
          text: T(
            "Complete non-violence and respect for all living beings",
            "Vollkommene Gewaltfreiheit und Respekt fuer alle Lebewesen",
            "Całkowite wyrzeczenie się przemocy i poszanowanie dla wszelkich żywych istot",
          ),
          correct: true,
        },
        {
          text: T(
            "A fast racing car with shiny golden wheels",
            "Ein schneller Rennwagen mit glaenzenden Goldraedern",
            "Wyścigowy bolid z lśniącymi złotymi kołami",
          ),
        },
        {
          text: T(
            "The secret art of hiding coins under sofa cushions",
            "Die geheime Kunst, Muenzen unter Sofakissen zu verstecken",
            "Tajemną sztukę chowania monet pod poduszkami na kanapie",
          ),
        },
      ],
      hint: T(
        "Gandhi insisted that freedom must be achieved without violence or physical harm.",
        "Gandhi betonte, dass Freiheit ohne Gewalt und Schaden erreicht werden muss.",
        "Gandhi stanowczo twierdził, że prawdziwą wolność osiąga się wyłącznie bez użycia siły.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why was the traditional wooden spinning wheel (Charkha) such a powerful symbol?",
        "Warum war das traditionelle Spinnrad (Charkha) ein so starkes Symbol?",
        "Dlaczego tradycyjny drewniany kołowrotek (Charkha) stał się tak potężnym symbolem?",
      ),
      options: [
        {
          text: T(
            "It represented self-reliance, local craftsmanship, and peaceful collective unity",
            "Es stand fuer Selbstbestimmung, eigenes Handwerk und friedlichen Zusammenhalt",
            "Reprezentował samowystarczalność, lokalne rzemiosło i pokojową solidarność ludzi",
          ),
          correct: true,
        },
        {
          text: T(
            "It was used to play musical tunes during lunch breaks",
            "Man spielte damit Musikstuecke in den Mittagspausen",
            "Służył do grania wesołych melodii podczas przerw obiadowych",
          ),
        },
        {
          text: T(
            "It turned sand directly into strawberry ice cream",
            "Es verwandelte Sand direkt in Erdbeereis",
            "Zamieniał piasek morski w lody truskawkowe",
          ),
        },
      ],
      hint: T(
        "Spinning thread allowed families to produce their own clothes without relying on foreign mills.",
        "Das Spinnen ermoeglichte es Familien, eigene Kleidung ohne fremde Fabriken herzustellen.",
        "Własnoręczne przędzenie pozwalało rodzinom ubierać się bez zależności od obcych monopoli.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Spin the wooden Charkha wheel to produce at least 3 spools of thread and achieve solidarity.",
        "Drehe das Charkha-Spinnrad, um mindestens 3 Spulen Garn zu fertigen und Einheit zu erreichen.",
        "Obróć drewniany kołowrotek Charkha, aby wyprodukować co najmniej 3 szpulki nici i osiągnąć jedność.",
      ),
      Widget,
      hint: T(
        "Click the Spin Thread button until you have at least 3 spools, then tap check.",
        "Klicke auf Rad drehen, bis du mindestens 3 Spulen hast, und tippe auf pruefen.",
        "Klikaj przycisk obracania koła, aż uzyskasz 3 szpulki nici, a następnie naciśnij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, how can we use peaceful words and patience when solving disagreements with our friends?",
    "Papa, wie koennen wir friedliche Worte und Geduld nutzen, wenn wir uns mit Freunden streiten?",
    "Tato, jak możemy używać spokojnych słów i cierpliwości, gdy rozwiązujemy spory z przyjaciółmi?",
  ),
  realLife: {
    title: {
      en: "Peaceful Resistance in History",
      de: "Friedlicher Protest in der deutschen Geschichte",
      pl: "Pokojowy opór i ruch Solidarności w Polsce",
    },
    body: {
      en: "The power of non-violent civic courage was demonstrated in Germany during the autumn of 1989. In Leipzig and other East German cities, tens of thousands of citizens carried candles during peaceful Monday demonstrations (Montagsdemonstrationen), chanting 'Wir sind das Volk' (We are the people). Their peaceful courage brought down the Berlin Wall without weapons.",
      de: "Die Kraft friedlicher Zivilcourage zeigte sich in Deutschland im Herbst 1989. In Leipzig und anderen Staedten trugen zehntausende Buerger Kerzen bei den friedlichen Montagsdemonstrationen und riefen 'Wir sind das Volk'. Ihr gewaltloser Mut brachte die Berliner Mauer ohne Waffen zu Fall.",
      pl: "W Polsce siła pokojowego oporu ujawniła się w powstaniu Niezależnego Samorządnego Związku Zawodowego „Solidarność” w sierpniu 1980 roku. Miliony pracowników, intelektualistów i całych rodzin zjednoczyły się w pokojowych strajkach, domagając się godności, wolności słowa i praw człowieka. Podobnie jak marsz solny Gandhiego czy demonstracje w Lipsku w 1989 roku, ruch Solidarności dowiódł, że cierpliwa odwaga obywatelska potrafi obalić autorytaryzm bez użycia przemocy.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The Dandi Salt March covered 240 miles from Sabarmati Ashram to the Arabian Sea in March-April 1930.",
          de: "Der Salzmarsch nach Dandi fuehrte im Maerz und April 1930 ueber 240 Meilen vom Sabarmati-Ashram an das Arabische Meer.",
          pl: "Marsz solny do Dandi przebył 240 mil z aśramu Sabarmati nad Morze Arabskie w marcu i kwietniu 1930 roku.",
        },
        source: "https://www.britannica.com/event/Salt-March",
      },
      {
        text: {
          en: "The Indian Independence Act 1947 granted legislative independence to India on 15 August 1947.",
          de: "Der Indian Independence Act 1947 gewaehrte Indien am 15. August 1947 die volle Unabhaengigkeit.",
          pl: "Ustawa Indian Independence Act z 1947 roku przyznała Indiom pełną suwerenność państwową w dniu 15 sierpnia 1947 roku.",
        },
        source: "https://www.legislation.gov.uk/ukpga/1947/30/enacted",
      },
      {
        text: {
          en: "Dr. Bhimrao Ramji Ambedkar served as the chairman of the Drafting Committee for the Constitution of India.",
          de: "Dr. Bhimrao Ramji Ambedkar leitete den Verfassungsausschuss fuer die demokratische Verfassung Indiens.",
          pl: "Dr Bhimrao Ramji Ambedkar przewodniczył komisji redagującej demokratyczną konstytucję Indii uchwaloną w 1949 roku.",
        },
        source: "https://www.britannica.com/biography/Bhimrao-Ramji-Ambedkar",
      },
      {
        text: {
          en: "The Constitution of India came into effect on 26 January 1950, establishing universal adult franchise without property or gender restrictions.",
          de: "Die Verfassung Indiens trat am 26. Januar 1950 in Kraft und verankerte das allgemeine Wahlrecht ohne Standes- oder Geschlechtergrenzen.",
          pl: "Konstytucja Indii weszła w życie 26 stycznia 1950 roku, ustanawiając powszechne prawo wyborcze bez cenzusu majątku czy płci.",
        },
        source: "https://www.india.gov.in/my-government/constitution-india",
      },
      {
        text: {
          en: "The 1980 Polish Solidarity movement and the 1989 peaceful Leipzig demonstrations demonstrated that non-violent civic solidarity can overcome authoritarian rule.",
          de: "Die Montagsdemonstrationen 1989 in Leipzig und die polnische Solidarność-Bewegung von 1980 bewiesen die Kraft gewaltlosen Buergermuts.",
          pl: "Powstanie Solidarności w 1980 roku w Polsce oraz demonstracje ze świecami w Lipsku w 1989 roku dowiodły, że pokojowa solidarność obywatelska potrafi przełamać dyktaturę.",
        },
        source:
          "https://www.bundesarchiv.de/themen-entdecken/online-ausstellungen/die-friedliche-revolution-1989/",
      },
    ],
    simplified: [
      {
        en: "We explain non-violent civil resistance through the physical metaphors of the Salt March and the Charkha spinning wheel.",
        de: "Wir erklaeren gewaltlosen Widerstand anhand des Salzmarsches und des Spinnrads.",
        pl: "Wyjaśniamy pokojowy opór obywatelski na przykładzie marszu solnego oraz kołowrotka Charkha.",
      },
      {
        en: "We focus on self-reliance, moral dignity, and constitutional equality under the rule of law.",
        de: "Wir betonen Selbstbestimmung, Wuerde und demokratische Gleichheit vor dem Gesetz.",
        pl: "Kładziemy nacisk na samowystarczalność, godność osobistą i równość konstytucyjną wobec prawa.",
      },
      {
        en: "We draw direct parallels to modern peaceful movements in German and world history.",
        de: "Wir ziehen Parallelen zu friedlichen Bewegungen in Deutschland und Europa.",
        pl: "Wskazujemy analogie do pokojowych ruchów wolnościowych w Europie, w tym polskiej Solidarności.",
      },
    ],
  },
};
