import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BusyWorkshopDiagram,
  CoralWearingBootsDiagram,
  EmptyShopDiagram,
  HarborSignDiagram,
  HiddenBootsDiagram,
  TruthfulMarketingDiagram,
} from "./marketing.diagrams";
import { MarketingToy } from "./marketing.toy";
import "./marketing.css";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <MarketingToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <MarketingToy lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "marketing",
  story: [
    animatedBeat(
      [
        T(
          "Sam finishes stitching a wonderful new invention in his workshop.",
          "Sam stellt in seiner Werkstatt eine tolle neue Erfindung fertig.",
          "Sam kończy szycie wspaniałego nowego wynalazku w swoim warsztacie.",
        ),
        T(
          "These waterproof leather boots keep feet completely dry in rain puddles and sea waves.",
          "Diese wasserfesten Lederstiefel halten Füße bei Regen und Wellen völlig trocken.",
          "Te nieprzemakalne skórzane buty chronią stopy przed wilgocią w kałużach i falach morskich.",
        ),
        T(
          "Sam feels proud of his sturdy, warm craft.",
          "Sam ist stolz auf sein stabiles, warmes Handwerk.",
          "Sam czuje dumę ze swojego solidnego, ciepłego rękodzieła.",
        ),
      ],
      HiddenBootsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Sam places the boots neatly on a high wooden shelf in the back.",
          "Sam stellt die Stiefel ordentlich auf ein hohes Holzregal hinten im Laden.",
          "Sam stawia buty starannie na wysokiej drewnianej półce w głębi warsztatu.",
        ),
        T(
          "Days pass by, but not a single customer walks through his door.",
          "Tage vergehen, aber kein einziger Kunde betritt seinen Laden.",
          "Mijają dni, ale żaden klient nie przekracza progu jego sklepu.",
        ),
        T(
          "Even the best invention cannot help anyone if nobody knows it exists!",
          "Selbst die beste Erfindung hilft niemandem, wenn niemand weiß, dass es sie gibt!",
          "Nawet najlepszy wynalazek nikomu nie pomoże, jeśli nikt nie wie o jego istnieniu!",
        ),
      ],
      EmptyShopDiagram,
    ),
    animatedBeat(
      [
        T(
          "Sam takes wooden boards and paints a colorful sign at the harbor crossroads.",
          "Sam nimmt Holzbretter und malt ein buntes Schild an der Hafenkreuzung.",
          "Sam bierze drewniane deski i maluje barwny szyld na skrzyżowaniu w porcie.",
        ),
        T(
          "The sign shows boots splashing happily through seawater while feet stay dry.",
          "Das Schild zeigt Stiefel im Meerwasser, während die Füße trocken bleiben.",
          "Szyld przedstawia buty wesoło brodzące w morskiej wodzie, podczas gdy stopy pozostają suche.",
        ),
        T(
          "Telling people truthfully what you built and how it helps them is called *marketing*.",
          "Den Leuten ehrlich zu sagen, was man gebaut hat und wie es hilft, nennt man *Marketing*.",
          "Mówienie ludziom prawdy o tym, co stworzyłeś i jak może im to pomóc, nazywamy *marketingiem*.",
        ),
      ],
      HarborSignDiagram,
    ),
    animatedBeat(
      [
        T(
          "Next, Sam gives a test pair of boots to Captain Coral to wear on the boat deck.",
          "Dann schenkt Sam Kapitän Coral ein Probepaar für das nasse Schiffsdeck.",
          "Następnie Sam daje parę próbnych butów Kapitanowi Coralowi, by nosił je na mokrym pokładzie.",
        ),
        T(
          "All the sailors see Captain Coral walking through puddles with warm dry socks.",
          "Alle Seeleute sehen, wie Kapitän Coral mit warmen, trockenen Socken durch Pfützen geht.",
          "Wszyscy marynarze widzą, jak Kapitan Coral chodzi po kałużach w suchych i ciepłych skarpetkach.",
        ),
        T(
          "Publicly showing your product in real action is called *advertising*.",
          "Ein Produkt öffentlich im echten Einsatz zu zeigen, nennt man *Werbung*.",
          "Publiczne pokazywanie produktu w prawdziwym działaniu nazywa się *reklamą*.",
        ),
      ],
      CoralWearingBootsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Word travels quickly across the docks and streets.",
          "Die Nachricht verbreitet sich rasch an den Docks und in den Gassen.",
          "Wiadomość rozchodzi się błyskawicznie po dokach i uliczkach miasteczka.",
        ),
        T(
          "Sailors and dockworkers line up outside Sam's workshop to buy their own pairs.",
          "Seeleute und Hafenarbeiter stehen vor Sams Werkstatt Schlange für eigene Paare.",
          "Marynarze i pracownicy portu ustawiają się w kolejce przed warsztatem Sama, by kupić własne pary.",
        ),
        T(
          "Sam's boots solve a real problem for the people who needed them.",
          "Sams Stiefel lösen ein echtes Problem für die Menschen, die sie brauchen.",
          "Buty Sama rozwiązują prawdziwy problem ludzi, którzy ich potrzebowali.",
        ),
      ],
      BusyWorkshopDiagram,
    ),
    animatedBeat(
      [
        T(
          "Good marketing is always honest about what a product can and cannot do.",
          "Gutes Marketing ist immer ehrlich darüber, was ein Produkt kann und was nicht.",
          "Dobry marketing zawsze szczerze informuje, co produkt potrafi, a czego nie.",
        ),
        T(
          "False promises fool people once, but break trust forever.",
          "Falsche Versprechen täuschen einmal, zerstören aber für immer das Vertrauen.",
          "Fałszywe obietnice mogą oszukać kogoś raz, lecz bezpowrotnie niszczą zaufanie.",
        ),
        T(
          "Truthful advertising connects makers with happy, loyal customers.",
          "Ehrliche Werbung verbindet Hersteller mit zufriedenen, treuen Kunden.",
          "Rzetelna reklama łączy twórców ze szczęśliwymi, lojalnymi klientami.",
        ),
      ],
      TruthfulMarketingDiagram,
    ),
  ],
  toyIntro: T(
    "Choose marketing channels to inform villagers about Sam's boots while keeping profits healthy!",
    "Wähle Werbewege, um die Dorfbewohner über Sams Stiefel zu informieren und Gewinn zu machen!",
    "Wybierz kanały marketingowe, aby powiadomić mieszkańców o butach Sama i osiągnąć zysk!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the main purpose of honest marketing?",
        "Was ist der Hauptzweck von ehrlichem Marketing?",
        "Jaki jest główny cel uczciwego marketingu?",
      ),
      options: [
        {
          text: T(
            "To tell people truthfully what you made and how it can help them",
            "Den Leuten ehrlich zu sagen, was man gebaut hat und wie es ihnen hilft",
            "Poinformowanie ludzi zgodnie z prawdą, co stworzyłeś i jak może im to pomóc",
          ),
          correct: true,
        },
        {
          text: T(
            "To trick people into buying things they cannot use",
            "Leute dazu zu bringen, unbrauchbare Dinge zu kaufen",
            "Zwabienie ludzi do zakupu rzeczy, których nie potrzebują",
          ),
        },
        {
          text: T(
            "To hide your shop behind tall trees",
            "Den eigenen Laden hinter hohen Bäumen zu verstecken",
            "Ukrycie sklepu za wysokimi drzewami",
          ),
        },
      ],
      hint: T(
        "Marketing helps potential customers discover useful products that solve their problems.",
        "Marketing hilft Kunden dabei, nützliche Produkte zu entdecken, die ihre Probleme lösen.",
        "Marketing pomaga potencjalnym klientom odkryć pożyteczne produkty rozwiązujące ich problemy.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why does the law forbid companies from making false claims in advertising?",
        "Warum verbietet das Gesetz falsche Versprechen in der Werbung?",
        "Dlaczego prawo zabrania firmom składania fałszywych obietnic w reklamach?",
      ),
      options: [
        {
          text: T(
            "To protect consumers from deception and preserve fair competition",
            "Um Verbraucher vor Täuschung zu schützen und fairen Wettbewerb zu wahren",
            "Aby chronić konsumentów przed wprowadzeniem w błąd i strzec uczciwej konkurencji",
          ),
          correct: true,
        },
        {
          text: T(
            "Because colors on posters are expensive",
            "Weil bunte Farben auf Plakaten zu teuer sind",
            "Ponieważ kolorowe farby na plakatach są zbyt drogie",
          ),
        },
        {
          text: T(
            "To stop people from reading signs",
            "Damit die Leute keine Schilder mehr lesen",
            "Aby powstrzymać ludzi przed czytaniem szyldów",
          ),
        },
      ],
      hint: T(
        "Advertising laws ensure businesses compete on genuine merit, not misleading lies.",
        "Werbegesetze stellen sicher, dass Firmen durch echte Leistung überzeugen, nicht durch Lügen.",
        "Przepisy dotyczące reklamy dbają o to, by firmy konkurowały prawdziwą jakością, a nie kłamstwami.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Sam has 2 coins. Placing the Harbor Poster costs 2 coins and informs 4 eager sailors. Activate the Harbor Poster to spread the word!",
        "Sam hat 2 Münzen. Das Hafenschild kostet 2 Münzen und informiert 4 Seeleute. Aktiviere das Hafenschild, um die Nachricht zu verbreiten!",
        "Sam ma 2 monety. Umieszczenie szyldu w porcie kosztuje 2 monety i informuje 4 marynarzy. Aktywuj szyld portowy, aby roznieść wieść!",
      ),
      Widget,
      hint: T(
        "Tap the Harbor Poster button and then press Check.",
        "Tippe auf das Hafenschild und drücke dann auf Prüfen.",
        "Kliknij przycisk szyldu portowego, a następnie naciśnij Sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, when we see an ad on a billboard or on the internet, how do we know if it is telling the real truth?",
    "Papa, wenn wir Werbung auf einem Plakat oder im Internet sehen, woher wissen wir dann, ob sie wirklich die Wahrheit sagt?",
    "Tato, kiedy widzimy reklamę na plakacie lub w internecie, skąd wiemy, czy mówi ona całą prawdę?",
  ),
  realLife: {
    title: {
      en: "Consumer protection and truthful advertising in India",
      de: "Werbegesetze und Verbraucherschutz in Deutschland",
      pl: "Etyka reklamy i ochrona konsumentów w Polsce",
    },
    body: {
      en: "In India, truthful marketing and consumer protection are governed by the Consumer Protection Act, 2019 and monitored by the Central Consumer Protection Authority (CCPA) alongside the Advertising Standards Council of India (ASCI). Companies are prohibited from publishing misleading advertisements or making unsubstantiated claims about products. Honest advertising helps consumers discover products that genuinely solve everyday challenges.",
      de: "In Deutschland regelt das Gesetz gegen den unlauteren Wettbewerb (UWG) die geschäftliche Werbung streng. Unternehmen ist es gesetzlich verboten, irreführende Angaben über Produkte zu machen. Der Deutsche Werberat prüft Beschwerden von Bürgerinnen und Bürgern.",
      pl: "W Polsce uczciwość przekazu reklamowego reguluje Ustawa o zwalczaniu nieuczciwej konkurencji oraz Ustawa o przeciwdziałaniu nieuczciwym praktykom rynkowym, a nad rynkiem czuwa UOKiK i Rada Reklamy. Firmy nie mogą wprowadzać konsumentów w błąd fałszywymi obietnicami ani ukrywać istotnych cech towaru. Rzetelna reklama łączy twórców produktów z zadowolonymi odbiorcami.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Consumer protection and unfair competition laws strictly prohibit misleading advertising and unsubstantiated product claims.",
          de: "Das Gesetz gegen den unlauteren Wettbewerb (UWG) verbietet irreführende geschäftliche Handlungen und falsche Werbeversprechen.",
          pl: "Ustawa o zwalczaniu nieuczciwej konkurencji oraz ustawa o przeciwdziałaniu nieuczciwym praktykom rynkowym zabraniają wprowadzania w błąd w reklamie.",
        },
        source: "https://uokik.gov.pl/nieuczciwe_praktyki_rynkowe.php",
      },
      {
        text: {
          en: "Advertising standards self-regulatory bodies investigate public complaints regarding misleading or inappropriate commercial campaigns.",
          de: "Der Deutsche Werberat prüft als Selbstkontrollorgan Beschwerden von Bürgern über unangemessene oder irreführende Werbung.",
          pl: "Rada Reklamy i Komisja Etyki Reklamy rozpatrują skargi konsumentów na nieetyczne lub wprowadzające w błąd kampanie promocyjne.",
        },
        source: "https://radareklamy.pl/",
      },
      {
        text: {
          en: "Digital economy associations publish guidance on influencer transparency, sponsored disclosures, and clear commercial identifiers.",
          de: "Branchenverbände der Digitalwirtschaft veröffentlichen Leitfäden zu Kennzeichnungspflichten und Transparenz im Online-Marketing.",
          pl: "Związki branży cyfrowej (takie jak IAB Polska) wydają standardy i wytyczne dotyczące transparentnego oznaczania reklam i influencer marketingu.",
        },
        source: "https://iab.org.pl/",
      },
      {
        text: {
          en: "Chambers of Commerce advise entrepreneurs on consumer rights, truthful pricing disclosures, and fair competitive conduct.",
          de: "Industrie- und Handelskammern (IHK) beraten Gewerbetreibende zu rechtssicherem Marketing und fairem Wettbewerbsverhalten.",
          pl: "Izby gospodarcze i organizacje przedsiębiorców doradzają firmom w zakresie praw konsumenta i zgodnego z prawem marketingu.",
        },
        source: "https://kig.pl/",
      },
      {
        text: {
          en: "In marketing economics, advertising serves an information-sharing function that reduces consumer search costs when kept truthful.",
          de: "In der Volkswirtschaft erfüllt ehrliche Werbung eine Informationsfunktion, die Suchkosten für Verbraucher senkt.",
          pl: "W ekonomii rzetelna reklama pełni funkcję informacyjną, obniżając koszty poszukiwania towarów przez konsumentów.",
        },
        source: "https://wirtschaftslexikon.gabler.de/definition/werbung-49591",
      },
    ],
    simplified: [
      {
        en: "In the story, Sam uses a simple painted wooden sign and a sample pair. In modern commerce, marketing utilizes digital channels, television, and print media.",
        de: "In der Geschichte nutzt Sam ein einfaches Holzschild und eine Probe. In der modernen Wirtschaft umfasst Marketing digitale Kanäle, Fernsehen und Print.",
        pl: "W opowieści Sam używa prostego drewnianego szyldu i pary próbnej. We współczesnej gospodarce marketing wykorzystuje media cyfrowe, internet, telewizję i prasę.",
      },
      {
        en: "Advertising costs in real companies involve budgets, agencies, and analytics, whereas our toy simplifies this into immediate visitor counts.",
        de: "Werbekosten in Unternehmen erfordern Budgetplanung und Agenturen, während unser Spiel dies auf sofortige Besucherzahlen vereinfacht.",
        pl: "Koszty reklamy w firmach wymagają planowania budżetu i analizy rynku, podczas gdy nasza minigra upraszcza to do natychmiastowej liczby odwiedzających.",
      },
    ],
  },
};
