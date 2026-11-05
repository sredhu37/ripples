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

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

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
          "In den 1930er Jahren fuehrten Not und falsche Heilsversprechen zur Diktatur in Deutschland.",
          "W latach trzydziestych dwudziestego wieku kryzys gospodarczy i fałszywe obietnice doprowadziły do dyktatury w Niemczech.",
        ),
        T(
          "Adolf Hitler and the Nazi regime dismantled the democratic republic and banned other parties.",
          "Das NS-Regime schaffte die demokratische Republik ab und verbot andere Parteien.",
          "Reżim nazistowski zlikwidował demokratyczną republikę i zdelegalizował wszystkie pozostałe partie.",
        ),
        T(
          "Independent newspapers were closed, and radio broadcasts repeated state *propaganda*.",
          "Unabhaengige Zeitungen wurden verboten und das Radio wiederholte staatliche *Propaganda*.",
          "Niezależne gazety zamknięto, a odbiorniki radiowe bez przerwy nadawały państwową *propagandę*.",
        ),
        T(
          "Dissenters and minorities were cruelly stripped of their citizenship and fundamental rights.",
          "Andersdenkende und Minderheiten wurden entrechtet und grausam verfolgt.",
          "Osoby o odmiennych poglądach i mniejszości zostały w okrutny sposób pozbawione praw obywatelskich.",
        ),
      ],
      RadioPropagandaDiagram,
    ),
    animatedBeat(
      [
        T(
          "In September 1939, aggressive expansion ignited World War 2 across continents.",
          "Im September 1939 loeste der Angriff auf Polen den Zweiten Weltkrieg aus.",
          "We wrześniu 1939 roku napaść na Polskę zapoczątkowała II wojnę światową na wielu kontynentach.",
        ),
        T(
          "The conflict unleashed total industrial destruction on an unprecedented, tragic scale.",
          "Der Krieg brachte Zerstoerung in einem nie dagewesenen, tragischen Ausmass.",
          "Konflikt przyniósł uprzemysłowioną machinę zniszczenia na niespotykaną dotąd, tragiczną skalę.",
        ),
        T(
          "Homes, schools, libraries, and historic city centers across Europe were left in smoking ruins.",
          "Haeuser, Schulen und historische Innenstaedte lagen quer durch Europa in Truemmern.",
          "Domy, szkoły, biblioteki i zabytkowe centra miast w całej Europie legły w gruzach.",
        ),
        T(
          "Millions of innocent human lives were lost to hatred, oppression, and totalitarian fanaticism.",
          "Millionen unschuldiger Menschenleben fielen Hass, Verfolgung und Fanatismus zum Opfer.",
          "Miliony niewinnych istnień ludzkich zginęły z rąk nienawiści, prześladowań i totalitarnego fanatyzmu.",
        ),
      ],
      TotalDevastationRubbleDiagram,
    ),
    animatedBeat(
      [
        T(
          "Even under terrifying danger, courageous individuals showed extraordinary *civil courage*.",
          "Selbst unter Lebensgefahr zeigten mutige Menschen aussergewoehnliche *Zivilcourage*.",
          "Nawet w śmiertelnym niebezpieczeństwie odważni ludzie wykazywali się niezwykłą *odwagą cywilną*.",
        ),
        T(
          "In Munich, university students Hans and Sophie Scholl formed the White Rose resistance.",
          "In Muenchen gruendeten die Geschwister Hans und Sophie Scholl die Widerstandsgruppe Weisse Rose.",
          "W Monachium studenci Hans i Sophie Scholl powołali ruch oporu Biała Róża (Die Weisse Rose).",
        ),
        T(
          "They secretly printed leaflets urging citizens to reject cruelty and stand up for human decency.",
          "Sie druckten heimlich Flugblaetter, die dazu aufriefen, fuer Menschlichkeit einzustehen.",
          "W tajemnicy drukowali ulotki wzywające obywateli do odrzucenia okrucieństwa i obrony ludzkiej przyzwoitości.",
        ),
        T(
          "Their brave words reminded the world that the human spirit cannot be crushed by tyranny.",
          "Ihr Mut erinnerte daran, dass das Gewissen der Menschen nicht erdrueckt werden kann.",
          "Ich odwaga przypomniała światu, że ludzkie sumienie i godność nie mogą zostać złamane przez tyranię.",
        ),
      ],
      WhiteRoseLeafletDiagram,
    ),
    animatedBeat(
      [
        T(
          "In 1945, the dictatorship fell and the devastating war finally came to an end.",
          "1945 brach das Unrechtsregime zusammen und der schreckliche Krieg fand sein Ende.",
          "W 1945 roku totalitarny reżim upadł, a niszczycielska wojna dobiegła wreszcie końca.",
        ),
        T(
          "Representatives of fifty nations met in San Francisco to form the United Nations.",
          "In San Francisco gruendeten Vertreter aus 50 Laendern die Vereinten Nationen.",
          "Przedstawiciele pięćdziesięciu państw zebrali się w San Francisco, aby powołać Organizację Narodów Zjednoczonych.",
        ),
        T(
          "They pledged to work together so international law would prevent such horrors from recurring.",
          "Sie versprachen, durch Voelkerrecht ein solches Leid fuer die Zukunft zu verhindern.",
          "Złożyli uroczystą obietnicę współpracy, by prawo międzynarodowe zapobiegło powtórzeniu takich tragedii.",
        ),
        T(
          "In 1948, the world adopted the Universal Declaration of Human Rights.",
          "1948 verabschiedete die Welt die Allgemeine Erklaerung der Menschenrechte.",
          "W 1948 roku świat uchwalił Powszechną Deklarację Praw Człowieka.",
        ),
      ],
      UnitedNationsGlobeDiagram,
    ),
    animatedBeat(
      [
        T(
          "In Germany, democratic leaders founded a new constitutional republic grounded in peace.",
          "In Deutschland gruendeten Demokraten eine neue Verfassungsordnung des Friedens.",
          "W powojennej Europie odrodziła się demokracja konstytucyjna oparta na pokoju.",
        ),
        T(
          "They placed *human rights* at the absolute foundation of the German Basic Law.",
          "Sie stellten die *Menschenrechte* an das absolute Fundament des Grundgesetzes.",
          "Nienaruszalne *prawa człowieka* stały się fundamentem nowoczesnych konstytucji demokratycznych.",
        ),
        T(
          "Article 1 solemnly declares: 'Human dignity shall be inviolable.'",
          "Artikel 1 erklaert feierlich: 'Die Wuerde des Menschen ist unantastbar.'",
          "Konstytucja głosi uroczyście: 'Godność człowieka jest nienaruszalna'.",
        ),
        T(
          "Remembering history is a shared promise to defend human dignity every single day.",
          "Erinnerung ist das Versprechen, diese Wuerde an jedem Tag unseres Lebens zu schuetzen.",
          "Pamięć o historii to wspólne zobowiązanie do obrony ludzkiej godności każdego dnia.",
        ),
      ],
      GrundgesetzArticle1Diagram,
    ),
  ],
  toyIntro: T(
    "Raise the pillars of free speech, equal rights, and civil courage to protect human dignity.",
    "Errichte die Pfeiler fuer freie Presse, gleiche Rechte und Zivilcourage, um die Wuerde zu schuetzen.",
    "Wznieś filary wolnej prasy, równych praw i odwagi cywilnej, aby chronić ludzką godność.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does the famous opening line of modern democratic constitutions state?",
        "Wie lautet der beruehmte erste Satz in Artikel 1 des deutschen Grundgesetzes?",
        "Jak brzmi fundamentalna zasada współczesnych demokratycznych konstytucji?",
      ),
      options: [
        {
          text: T(
            "'Human dignity shall be inviolable' (Die Wuerde des Menschen ist unantastbar)",
            "'Die Wuerde des Menschen ist unantastbar'",
            "„Godność człowieka jest nienaruszalna” (Die Wuerde des Menschen ist unantastbar)",
          ),
          correct: true,
        },
        {
          text: T(
            "'Every Friday afternoon shall be dedicated to eating chocolate pudding'",
            "'Jeder Freitagnachmittag ist dem Essen von Schokopudding gewidmet'",
            "„Każde piątkowe popołudnie poświęcone jest jedzeniu budyniu czekoladowego”",
          ),
        },
        {
          text: T(
            "'All school bags must be painted neon yellow with purple stripes'",
            "'Alle Schulranzen muessen neon-gelb mit lila Streifen bemalt sein'",
            "„Wszystkie plecaki szkolne muszą być pomalowane na jaskrawy żółty kolor”",
          ),
        },
      ],
      hint: T(
        "Human dignity is the supreme, inviolable constitutional principle.",
        "Die Menschenwuerde ist das oberste, unverletzliche Grundrecht in Deutschland.",
        "Godność człowieka stanowi najwyższe, nienaruszalne źródło wszelkich praw obywatelskich.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Who were Hans and Sophie Scholl, and what did the White Rose stand for?",
        "Wer waren Hans und Sophie Scholl und wofuer stand die Weisse Rose?",
        "Kim byli Hans i Sophie Scholl i co symbolizowała grupa Biała Róża?",
      ),
      options: [
        {
          text: T(
            "Brave students who showed peaceful civil courage by printing leaflets against tyranny",
            "Mutige Studenten, die mit Flugblaettern friedliche Zivilcourage gegen die Tyrannei zeigten",
            "Odważnymi studentami, którzy wykazali się pokojową odwagą cywilną, drukując ulotki przeciw tyranii",
          ),
          correct: true,
        },
        {
          text: T(
            "Botanists who invented a glowing rose that could talk to butterflies",
            "Botaniker, die eine leuchtende Rose erfanden, die mit Schmetterlingen sprach",
            "Ogrodnikami, którzy wyhodowali świecącą w ciemności różę rozmawiającą z motylami",
          ),
        },
        {
          text: T(
            "Circus performers who walked across telephone cables on wooden stilts",
            "Zirkusartisten, die auf Holzstelzen ueber Telefonkabel balancierten",
            "Akrobatami cyrkowymi chodzącymi na szczudłach po liniach telefonicznych",
          ),
        },
      ],
      hint: T(
        "They demonstrated heroic civil courage in Munich during dark times.",
        "Sie zeigten heldenhafte Zivilcourage in Muenchen waehrend der Diktatur.",
        "Dali heroiczny przykład odwagi cywilnej w Monachium w mrocznych czasach dyktatury.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Activate all three protective pillars (Free Speech, Equal Rights, and Civil Courage) to illuminate the monument.",
        "Aktiviere alle drei Pfeiler (Freie Presse, Gleiche Rechte, Zivilcourage), um das Denkmal zu erleuchten.",
        "Włącz wszystkie trzy filary ochronne (Wolna prasa, Równe prawa i Odwaga cywilna), aby rozświetlić pomnik godności.",
      ),
      Widget,
      hint: T(
        "Click on each pillar so all three display checkmarks, then tap check.",
        "Klicke auf jeden Pfeiler, sodass alle drei ein Haekchen haben, und tippe auf pruefen.",
        "Kliknij każdy z trzech filarów, aby pojawiły się przy nich znaczniki, a następnie naciśnij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, what does civil courage mean when someone around us is being treated unfairly at school?",
    "Papa, was bedeutet Zivilcourage, wenn jemand bei uns an der Schule ungerecht behandelt wird?",
    "Tato, czym jest odwaga cywilna, gdy widzimy, że ktoś w szkole lub na podwórku jest traktowany niesprawiedliwie?",
  ),
  realLife: {
    title: {
      en: "Stolpersteine in European Towns",
      de: "Stolpersteine in deutschen Staedten",
      pl: "Kamienie Pamięci (Stolpersteine) w Europie i Polsce",
    },
    body: {
      en: "In hundreds of German towns and cities, small brass cobblestones called Stolpersteine (stumbling stones) are embedded in pavements outside houses. Created by artist Gunter Demnig, each stone is hand-engraved with the name and dates of an individual persecuted under the Nazi regime, ensuring that their names and human dignity are never forgotten.",
      de: "In hunderten deutschen Staedten sind kleine Messing-Pflastersteine in Gehwege vor Haeusern eingelassen: Stolpersteine. Geschaffen vom Kuenstler Gunter Demnig, traegt jeder Stein den eingravierten Namen eines verfolgten Menschen, damit deren Schicksal und Wuerde niemals in Vergessenheit geraten.",
      pl: "W setkach miast w całej Europie, również w Polsce (m.in. we Wrocławiu, Słubicach, Białymstoku czy Mińsku Mazowieckim), w chodniki wmurowywane są małe mosiężne kostki zwane Stolpersteine (kamienie pamięci). Stworzone przez artystę Guntera Demniga, upamiętniają z imienia i nazwiska osoby prześladowane przez reżim nazistowski przed ich dawnymi domami, aby ich los i ludzka godność nigdy nie zostały zapomniane.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The German Basic Law (Grundgesetz) was promulgated on 23 May 1949, opening with Article 1: Human dignity shall be inviolable.",
          de: "Das deutsche Grundgesetz wurde am 23. Mai 1949 verkuendet und beginnt mit Artikel 1: Die Wuerde des Menschen ist unantastbar.",
          pl: "Niemiecka Ustawa Zasadnicza z 23 maja 1949 r. (Art. 1) oraz Konstytucja RP z 1997 r. (Art. 30) uznają przyrodzoną i nienaruszalną godność człowieka za fundament państwa prawa.",
        },
        source: "https://www.gesetze-im-internet.de/gg/art_1.html",
      },
      {
        text: {
          en: "The White Rose student resistance group distributed six anti-regime leaflets at Ludwig Maximilian University of Munich in 1942-1943.",
          de: "Die Weisse Rose verteilte 1942 und 1943 sechs Flugblaetter des Widerstands an der Ludwig-Maximilians-Universitaet Muenchen.",
          pl: "Młodzieżowa grupa oporu Biała Róża (Die Weisse Rose) rozprowadziła sześć ulotków wzywających do sprzeciwu wobec tyranii na Uniwersytecie w Monachium w latach 1942-1943.",
        },
        source: "https://www.weisse-rose-stiftung.de/die-weisse-rose/",
      },
      {
        text: {
          en: "The Charter of the United Nations was signed on 26 June 1945 in San Francisco by representatives of fifty nations.",
          de: "Die Charta der Vereinten Nationen wurde am 26. Juni 1945 in San Francisco von Vertretern aus 50 Staaten unterzeichnet.",
          pl: "Karta Narodów Zjednoczonych została podpisana 26 czerwca 1945 roku w San Francisco przez przedstawicieli 50 państw założycielskich.",
        },
        source: "https://www.un.org/en/about-us/un-charter",
      },
      {
        text: {
          en: "The Universal Declaration of Human Rights was adopted by the United Nations General Assembly in Paris on 10 December 1948.",
          de: "Die Allgemeine Erklaerung der Menschenrechte wurde am 10. Dezember 1948 von der UN-Generalversammlung in Paris verabschiedet.",
          pl: "Powszechna Deklaracja Praw Człowieka została przyjęta przez Zgromadzenie Ogólne ONZ w Paryżu w dniu 10 grudnia 1948 roku.",
        },
        source: "https://www.un.org/en/about-us/universal-declaration-of-human-rights",
      },
      {
        text: {
          en: "Over 100,000 Stolpersteine brass commemorative memorials have been installed across thirty European countries.",
          de: "Ueber 100.000 Stolpersteine aus Messing wurden bisher in dreissig europaeischen Laendern verlegt.",
          pl: "Ponad 100 000 mosiężnych tabliczek pamięci Stolpersteine wmurowano w chodniki w trzydziestu państwach Europy.",
        },
        source: "https://www.stolpersteine.eu/",
      },
    ],
    simplified: [
      {
        en: "We emphasize the defense of civil liberties and human dignity rather than graphic wartime trauma.",
        de: "Wir betonen den Schutz der Grundrechte und der Wuerde statt traumatischer Kriegsbilder.",
        pl: "Podkreślamy ochronę praw obywatelskich i godności ludzkiej zamiast drastycznych obrazów wojennych.",
      },
      {
        en: "We highlight ethical civil courage through the courageous example of the White Rose students.",
        de: "Wir heben ethische Zivilcourage am mutigen Beispiel der Weissen Rose hervor.",
        pl: "Wskazujemy na wartość odwagi cywilnej na heroicznym przykładzie studentów z Białej Róży.",
      },
      {
        en: "We ground modern constitutional democracy in its founding moral commitment: Never Again.",
        de: "Wir begruenden moderne Verfassungsdemokratie im Versprechen: Nie wieder.",
        pl: "Opieramy nowoczesną demokrację konstytucyjną na fundamencie moralnej obietnicy: Nigdy więcej.",
      },
    ],
  },
};
