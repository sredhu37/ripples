import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BeaImprovesDiagram,
  BothBakeriesBusyDiagram,
  CompetitionBenefitsAllDiagram,
  CustomersSwitchDiagram,
  NewBakerArrivesDiagram,
  SoleBakerDiagram,
} from "./competition.diagrams";
import { CompetitionToy } from "./competition.toy";
import "./competition.css";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <CompetitionToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <CompetitionToy lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "competition",
  story: [
    animatedBeat(
      [
        T(
          "For years, Bea was the only baker in Ripple Town.",
          "Jahrelang war Bea die einzige Bäckerin in Ripple Town.",
          "Przez lata Bea była jedyną piekarką w Ripple Town.",
        ),
        T(
          "Her bread was plain and often cold by morning.",
          "Ihr Brot war einfach und morgens oft schon abgekühlt.",
          "Jej chleb był zwyczajny i rano często już chłodny.",
        ),
        T(
          "Because villagers had nowhere else to buy bread, they bought Bea's loaves anyway.",
          "Weil die Dorfbewohner nirgendwo anders Brot bekamen, kauften sie trotzdem bei Bea.",
          "Ponieważ mieszkańcy nie mieli gdzie indziej kupić pieczywa, kupowali bochenki Bei bez wyboru.",
        ),
      ],
      SoleBakerDiagram,
    ),
    animatedBeat(
      [
        T(
          "One spring morning, Luca opens a second bakery across the street.",
          "Eines Frühlingsmorgens eröffnet Luca eine zweite Bäckerei gegenüber.",
          "Pewnego wiosennego poranka Luca otwiera drugą piekarnię po drugiej stronie ulicy.",
        ),
        T(
          "Luca bakes warm sesame rolls with a crisp golden crust.",
          "Luca backt ofenwarme Sesambrötchen mit goldener Kruste.",
          "Luca piecze ciepłe bułki sezamowe ze złocistą, chrupiącą skórką.",
        ),
        T(
          "Luca is Bea's *competitor*: another business offering similar goods to the same crowd.",
          "Luca ist Beas *Konkurrent*: ein Betrieb, der ähnliche Waren für dieselben Kunden anbietet.",
          "Luca to *konkurent* Bei: inny przedsiębiorca oferujący podobne towary tej samej grupie klientów.",
        ),
      ],
      NewBakerArrivesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Villagers smell Luca's warm sesame rolls and cross the street.",
          "Die Leute riechen Lucas warme Sesambrötchen und laufen hinüber.",
          "Mieszkańcy czują zapach ciepłych bułek sezamowych Luci i przechodzą na drugą stronę ulicy.",
        ),
        T(
          "Pip and Sam rush to buy from Luca instead of Bea.",
          "Pip und Sam kaufen sofort bei Luca statt bei Bea.",
          "Pip i Sam natychmiast kupują u Luci zamiast u Bei.",
        ),
        T(
          "Bea's shop suddenly stands quiet with unsold loaves on her counter.",
          "Beas Laden steht plötzlich still mit unverkaufte Broten auf der Theke.",
          "W sklepie Bei robi się cicho, a niesprzedane bochenki leżą na ladzie.",
        ),
      ],
      CustomersSwitchDiagram,
    ),
    animatedBeat(
      [
        T(
          "Instead of giving up, Bea gets creative in her kitchen.",
          "Statt aufzugeben, wird Bea in ihrer Backstube erfinderisch.",
          "Zamiast się poddawać, Bea zaczyna eksperymentować w swojej piekarni.",
        ),
        T(
          "She mixes honey and sweet raisins into fresh warm dough.",
          "Sie mischt Honig und süße Rosinen in frischen warmen Teig.",
          "Dodaje miód i słodkie rodzynki do świeżego, ciepłego ciasta.",
        ),
        T(
          "She sets out warm sample slices on a wooden plate for everyone walking by.",
          "Sie stellt Teller mit warmen Kostproben für alle Vorbeigehenden bereit.",
          "Wystawia drewniany talerz z ciepłymi kromkami na bezpłatną degustację dla przechodniów.",
        ),
        T(
          "This race between businesses to win customers is called *competition*.",
          "Dieses Wetteifern um zufriedene Kundschaft nennt man *Wettbewerb*.",
          "Ten wyścig między firmami o względy klientów to *konkurencja*.",
        ),
      ],
      BeaImprovesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Soon, customers divide their morning visits between the two shops.",
          "Bald teilen die Dorfbewohner ihre Besuche auf beide Läden auf.",
          "Wkrótce mieszkańcy dzielą swoje poranne zakupy między oba sklepy.",
        ),
        T(
          "Some villagers love Bea's sweet honey bread; others love Luca's crusty sesame rolls.",
          "Einige lieben Beas süßes Honigbrot, andere Lucas knusprige Sesambrötchen.",
          "Jedni uwielbiają słodki chleb miodowy Bei, inni wolą chrupiące bułki sezamowe Luci.",
        ),
        T(
          "Both bakeries are busy, and both bakers earn enough coins to thrive.",
          "Beide Bäckereien haben gut zu tun und verdienen genug Münzen zum Leben.",
          "Obie piekarnie mają pełne ręce roboty i oboje piekarze zarabiają wystarczająco dużo, by rozwijać swój fach.",
        ),
      ],
      BothBakeriesBusyDiagram,
    ),
    animatedBeat(
      [
        T(
          "Competition makes businesses try their best every single day.",
          "Wettbewerb bringt Unternehmen dazu, jeden Tag ihr Bestes zu geben.",
          "Konkurencja motywuje firmy do codziennego dawania z siebie wszystkiego.",
        ),
        T(
          "It leads to better quality, fair prices, and friendly service.",
          "Er sorgt für bessere Qualität, faire Preise und freundlichen Service.",
          "Prowadzi do wyższej jakości, uczciwszych cen i milszej obsługi.",
        ),
        T(
          "When businesses compete fairly, the entire town wins!",
          "Wenn Betriebe fair miteinander wetteifern, gewinnt der ganze Ort!",
          "Gdy przedsiębiorstwa konkurują uczciwie, wygrywa cała społeczność!",
        ),
      ],
      CompetitionBenefitsAllDiagram,
    ),
  ],
  toyIntro: T(
    "Test how changing prices and upgrading recipes shifts customers between bakeries!",
    "Teste, wie Preisänderungen und Rezept-Upgrades die Kundschaft zwischen den Bäckereien bewegen!",
    "Sprawdź, jak zmiany cen i ulepszanie przepisów przemieszczają klientów między obiema piekarniami!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What happens when businesses compete fairly for customers?",
        "Was geschieht, wenn Unternehmen fair um Kundschaft wetteifern?",
        "Co się dzieje, gdy firmy uczciwie konkurują o klientów?",
      ),
      options: [
        {
          text: T(
            "Customers get better choices, higher quality, and fair prices",
            "Kunden erhalten mehr Auswahl, bessere Qualität und faire Preise",
            "Klienci zyskują większy wybór, wyższą jakość i uczciwe ceny",
          ),
          correct: true,
        },
        {
          text: T(
            "All shops must close down immediately",
            "Alle Läden müssen sofort schließen",
            "Wszystkie sklepy muszą natychmiast zakończyć działalność",
          ),
        },
        {
          text: T(
            "Bread stops being baked entirely",
            "Es wird überhaupt kein Brot mehr gebacken",
            "W ogóle przestaje się piec chleb",
          ),
        },
      ],
      hint: T(
        "Competition pushes sellers to improve products and keep prices attractive.",
        "Wettbewerb spornt Verkäufer an, Waren zu verbessern und Preise fair zu halten.",
        "Konkurencja zmusza sprzedawców do ulepszania produktów i utrzymywania atrakcyjnych cen.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why did Bea improve her bread recipe after Luca opened his bakery?",
        "Warum hat Bea ihr Brotrezept verbessert, nachdem Luca seine Bäckerei eröffnete?",
        "Dlaczego Bea ulepszyła swój przepis na chleb, gdy Luca otworzył piekarnię?",
      ),
      options: [
        {
          text: T(
            "To win back customers who might choose her competitor",
            "Um Kunden zurückzugewinnen, die sonst zum Konkurrenten gehen",
            "Aby odzyskać klientów, którzy zaczęli wybierać jej konkurenta",
          ),
          correct: true,
        },
        {
          text: T(
            "Because the mayor ordered her to stop baking",
            "Weil der Bürgermeister ihr das Backen verboten hatte",
            "Ponieważ burmistrz zakazał jej pieczenia chleba",
          ),
        },
        {
          text: T(
            "Because she ran out of flour",
            "Weil ihr das Mehl ausgegangen war",
            "Ponieważ skończyła jej się mąka",
          ),
        },
      ],
      hint: T(
        "When a competitor offers something fresh, sellers must step up to retain buyers.",
        "Wenn ein Konkurrent Frisches anbietet, muss man sich anstrengen, um Kunden zu halten.",
        "Gdy konkurent oferuje coś nowego, sprzedawcy muszą się postarać, aby utrzymać kupujących.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Luca charges 4 coins for dry bread. Bea charges 3 coins for warm honey bread. Which bakery will Pip choose?",
        "Luca verlangt 4 Münzen für trockenes Brot. Bea verlangt 3 Münzen für warmes Honigbrot. Welche Bäckerei wählt Pip?",
        "Luca żąda 4 monet za suchy chleb. Bea proponuje ciepły chleb miodowy za 3 monety. Którą piekarnię wybierze Pip?",
      ),
      Widget,
      hint: T(
        "Pip wants tasty warm bread at a fair price: choose Bea's bakery!",
        "Pip möchte leckeres warmes Brot zu einem fairen Preis: wähle Beas Bäckerei!",
        "Pip szuka smacznego, ciepłego pieczywa w dobrej cenie: wybierz piekarnię Bei!",
      ),
    },
  ],
  askDad: T(
    "Papa, how does having more than one bakery or supermarket in our town help our family get better food?",
    "Papa, wie hilft es unserer Familie, dass es mehr als eine Bäckerei oder einen Supermarkt in unserer Stadt gibt?",
    "Tato, jak to pomaga naszej rodzinie w zdobywaniu lepszego jedzenia, że w okolicy jest więcej niż jedna piekarnia lub sklep?",
  ),
  realLife: {
    title: {
      en: "Competition and consumer choice in India",
      de: "Wettbewerb in Deutschlands sozialer Marktwirtschaft",
      pl: "Uczciwa konkurencja i ochrona konsumentów w Polsce",
    },
    body: {
      en: "In India, healthy market competition is protected by the Competition Act, 2002 and enforced by the Competition Commission of India (CCI). When multiple companies compete to sell groceries, mobile phones, or airline tickets, consumers enjoy lower prices, innovative features, and superior service. Anti-competitive agreements and price-fixing cartels are strictly prohibited by law.",
      de: "Deutschlands Wirtschaftsordnung ist die Soziale Marktwirtschaft. Das Gesetz gegen Wettbewerbsbeschränkungen (GWB) sorgt dafür, dass Unternehmen ehrlich über Qualität und Preis konkurrieren. Geheime Preisabsprachen zwischen Firmen sind streng verboten.",
      pl: "W Polsce uczciwa konkurencja jest chroniona przez Ustawę o ochronie konkurencji i konsumentów, a nad rynkiem czuwa Urząd Ochrony Konkurencji i Konsumentów (UOKiK). Gdy sklepy i piekarnie konkurują o klientów, zyskujemy świeższe produkty, niższe ceny i lepszą obsługę. Zmowy cenowe i nieuczciwe porozumienia dzielące rynek są surowo zabronione.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The Competition Act, 2002 and antitrust laws like Germany's GWB establish the legal framework prohibiting anti-competitive agreements and cartel formation.",
          de: "Das Gesetz gegen Wettbewerbsbeschränkungen (GWB) bildet das rechtliche Fundament zur Sicherung des fairen wirtschaftlichen Wettbewerbs.",
          pl: "Ustawa o ochronie konkurencji i konsumentów stanowi fundament prawny chroniący wolny rynek przed niedozwolonymi porozumieniami i kartelami.",
        },
        source: "https://uokik.gov.pl/ochrona_konkurencji.php",
      },
      {
        text: {
          en: "Competition authorities actively investigate and penalize illegal price-fixing cartels to protect consumers from inflated prices.",
          de: "Das Bundeskartellamt verfolgt illegale Kartelle und Preisabsprachen konsequent, um Verbraucher vor überhöhten Preisen zu schützen.",
          pl: "UOKiK konsekwentnie wykrywa i karze nielegalne kartele oraz zmowy cenowe, chroniąc konsumentów przed sztucznie zawyżanymi cenami.",
        },
        source: "https://uokik.gov.pl/zmowy_cenowe.php",
      },
      {
        text: {
          en: "The European Commission enforces antitrust directives across the European single market, fostering cross-border innovation and consumer welfare.",
          de: "Die Europäische Kommission setzt Wettbewerbsregeln im EU-Binnenmarkt durch, um Marktöffnung und Innovation zu fördern.",
          pl: "Komisja Europejska egzekwuje unijne reguły konkurencji na jednolitym rynku europejskim, wspierając innowacje i dobrobyt konsumentów.",
        },
        source: "https://competition-policy.ec.europa.eu/index_en",
      },
      {
        text: {
          en: "Economic ministries and regulatory agencies safeguard competitive market structures so enterprise efficiency benefits households directly.",
          de: "Wirtschaftsministerien gestalten die Rahmenbedingungen so, dass unternehmerische Effizienz durch Wettbewerb bei den Bürgern ankommt.",
          pl: "Ministerstwa gospodarki oraz organy regulacyjne dbają o to, by korzyści z efektywności i konkurencji przedsiębiorstw trafiały do gospodarstw domowych.",
        },
        source: "https://www.bmwk.de/Redaktion/DE/Dossier/wettbewerbspolitik.html",
      },
      {
        text: {
          en: "Economic foundations and research institutes demonstrate that fair market competition is the primary driver of quality improvements and broad prosperity.",
          de: "Wirtschaftswissenschaftliche Institute belegen, dass offener Wettbewerb der wesentliche Motor für Qualitätsverbesserungen und Wohlstand ist.",
          pl: "Instytuty ekonomiczne dowodzą, że otwarta i uczciwa konkurencja stanowi główny motor podnoszenia jakości towarów oraz powszechnego dobrobytu.",
        },
        source: "https://www.ludwig-erhard.de/",
      },
    ],
    simplified: [
      {
        en: "In the story, Luca and Bea compete in a small town. In reality, competition takes place among thousands of companies, regulated by national and international antitrust authorities.",
        de: "In der Geschichte wetteifern Luca und Bea in einem Dorf. In Wirklichkeit findet Wettbewerb zwischen tausenden Unternehmen statt und wird behördlich überwacht.",
        pl: "W naszej opowieści Luca i Bea konkurują w małym miasteczku. W rzeczywistości konkurencja toczy się między tysiącami firm pod nadzorem krajowych i międzynarodowych urzędów antymonopolowych.",
      },
      {
        en: "The lesson focuses on bread quality and price; in mature markets, advertising, delivery speed, and customer warranties also shape competition.",
        de: "Die Lektion konzentriert sich auf Qualität und Preis; in echten Märkten beeinflussen auch Werbung, Lieferzeiten und Garantien den Wettbewerb.",
        pl: "Lekcja skupia się na jakości chleba i cenie; na dojrzałych rynkach o wyborze decydują także reklama, wygoda zakupów, czas dostawy i gwarancje.",
      },
    ],
  },
};
