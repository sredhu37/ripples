import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { BarterDiagram, JobsDiagram, MeetDiagram, MoneyDiagram, SearchDiagram, SwapWithCoinsDiagram } from "./money.diagrams";
import { TradeBoard } from "./money.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <TradeBoard lang={lang} mode="toy" onBread={onDone} />;
}

function GetBreadWidget({ lang, onAnswer }: WidgetProps) {
  return <TradeBoard lang={lang} mode="quiz" onBread={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "money",
  story: [
    animatedBeat(
      [
        T("Let's meet Finn. Finn lives in Ripple Town.", "Das ist Finn. Finn wohnt in Ripple Town.", "Poznaj Finna. Finn mieszka w Ripple Town."),
        T(
          "Finn is a fisherman. That means his job is to catch fish.",
          "Finn ist Fischer. Das heißt, sein Beruf ist es, Fische zu fangen.",
          "Finn jest rybakiem. To znaczy, że łowi ryby.",
        ),
        T("Today he caught three fish. One, two, three!", "Heute hat er drei Fische gefangen. Eins, zwei, drei!", "Dzisiaj złowił trzy ryby. Raz, dwa, trzy!"),
        T("Now Finn is hungry. He would love some bread.", "Jetzt hat Finn Hunger. Er hätte so gern Brot.", "Teraz Finn jest głodny. Bardzo chciałby zjeść chleb."),
        T(
          "Bea is a baker. That means she bakes bread, and she has lots of it!",
          "Bea ist Bäckerin. Das heißt, sie backt Brot, und sie hat jede Menge davon!",
          "Bea jest piekarzem. To znaczy, że piecze chleb i ma go pod dostatkiem!",
        ),
      ],
      MeetDiagram,
    ),
    animatedBeat(
      [
        T(
          "Finn has an idea. He can swap one of his fish for some of Bea's bread.",
          "Finn hat eine Idee. Er kann einen Fisch gegen etwas von Beas Brot tauschen.",
          "Finn ma pomysł. Może wymienić jedną ze swoich ryb na chleb od Bei.",
        ),
        T(
          "Swapping things without any money has a name. It is called *barter*. Finn wants to barter his fish for bread.",
          "Tauschen ohne Geld hat einen Namen: *Tauschhandel*. Finn möchte seinen Fisch gegen Brot eintauschen.",
          "Wymiana rzeczy bez użycia pieniędzy ma swoją nazwę. Nazywa się to *handel wymienny*. Finn chce wymienić rybę na chleb.",
        ),
        T(
          "But Bea says: No thanks! I don't need fish. I need new shoes.",
          "Aber Bea sagt: Nein danke! Ich brauche keinen Fisch. Ich brauche neue Schuhe.",
          "Ale Bea mówi: Nie, dziękuję! Nie potrzebuję ryb. Potrzebuję nowych butów.",
        ),
      ],
      BarterDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "So Finn must find someone who has shoes and who wants fish.",
          "Also muss Finn jemanden finden, der Schuhe hat und Fisch will.",
          "Finn musi więc znaleźć kogoś, kto ma buty i chce ryby.",
        ),
        T(
          "Sam is a shoemaker, and Sam has lots of shoes. Finn asks him.",
          "Sam ist Schuhmacher und hat jede Menge Schuhe. Finn fragt ihn.",
          "Sam jest szewcem i ma mnóstwo butów. Finn pyta go o wymianę.",
        ),
        T(
          "But Sam says: No thanks! I want apples, not fish.",
          "Aber Sam sagt: Nein danke! Ich will Äpfel, keinen Fisch.",
          "Ale Sam mówi: Nie, dziękuję! Chcę jabłek, a nie ryb.",
        ),
        T(
          "Barter only works when both people want what the other one has. Finn could search all day, and he is still hungry!",
          "Tauschhandel klappt nur, wenn beide das wollen, was der andere hat. Finn könnte den ganzen Tag suchen, und sein Magen knurrt immer noch!",
          "Handel wymienny działa tylko wtedy, gdy obie osoby chcą tego, co ma ta druga. Finn mógłby szukać cały dzień, a wciąż jest głodny!",
        ),
      ],
      SearchDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "People thought: there must be an easier way. So they invented *money*.",
          "Die Menschen dachten: Es muss einfacher gehen. Also haben sie *Geld* erfunden.",
          "Ludzie pomyśleli: musi być prostszy sposób. Dlatego wymyślili *pieniądze*.",
        ),
        T(
          "Money is something that everybody agrees to accept. In Ripple Town, the money is coins.",
          "Geld ist etwas, das alle annehmen. In Ripple Town ist das Geld aus Münzen.",
          "Pieniądze to coś, co wszyscy zgadzają się przyjmować. W Ripple Town pieniędzmi są monety.",
        ),
      ],
      MoneyDiagram,
    ),
    animatedBeat(
      [
        T(
          "Now Finn sells one fish to Sam. Sam pays 2 coins.",
          "Jetzt verkauft Finn einen Fisch an Sam. Sam bezahlt 2 Münzen.",
          "Teraz Finn sprzedaje jedną rybę Samowi. Sam płaci 2 monety.",
        ),
        T("Finn walks to Bea with his 2 coins.", "Finn geht mit seinen 2 Münzen zu Bea.", "Finn idzie z 2 monetami do Bei."),
        T(
          "Finn buys bread from Bea. She is happy to take the coins. Now Finn has bread, and nobody had to want fish!",
          "Finn kauft bei Bea Brot. Sie nimmt die Münzen gern. Jetzt hat Finn Brot, und niemand musste Fisch wollen!",
          "Finn kupuje chleb od Bei. Ona chętnie przyjmuje monety. Teraz Finn ma chleb i nikt nie musiał chcieć ryb!",
        ),
      ],
      SwapWithCoinsDiagram,
    ),
    animatedBeat(
      [
        T("Money does three jobs. Job one: it helps us swap.", "Geld hat drei Aufgaben. Aufgabe eins: Es hilft uns beim Tauschen.", "Pieniądze pełnią trzy zadania. Zadanie pierwsze: pomagają nam wymieniać rzeczy."),
        T(
          "Job two: it shows the *price*. A price tells us how many coins something costs. Bread costs 2 coins.",
          "Aufgabe zwei: Es zeigt den *Preis*. Ein Preis sagt uns, wie viele Münzen etwas kostet. Brot kostet 2 Münzen.",
          "Zadanie drugie: pokazują *cenę*. Cena mówi nam, ile monet coś kosztuje. Chleb kosztuje 2 monety.",
        ),
        T(
          "Job three: you can *save* it. When you save coins, you keep them for later.",
          "Aufgabe drei: Du kannst es *sparen*. Wer Münzen spart, hebt sie für später auf.",
          "Zadanie trzecie: można je *oszczędzać*. Gdy odkładasz monety, zachowujesz je na później.",
        ),
      ],
      JobsDiagram,
    ),
  ],
  toyIntro: T(
    "Help Finn get bread. Read what to do now, then tap the action button.",
    "Hilf Finn, an Brot zu kommen. Lies, was du tun kannst, und tippe auf den Knopf.",
    "Pomóż Finnowi zdobyć chleb. Przeczytaj instrukcję i naciśnij przycisk działania.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T("Why couldn't Finn swap his fish for bread?", "Warum konnte Finn seinen Fisch nicht gegen Brot tauschen?", "Dlaczego Finn nie mógł wymienić ryby na chleb?"),
      options: [
        { text: T("Bea wanted shoes, not fish", "Bea wollte Schuhe, keinen Fisch", "Bea chciała buty, a nie rybę"), correct: true },
        { text: T("Finn had no fish left", "Finn hatte keinen Fisch mehr", "Finnowi skończyły się ryby") },
        { text: T("Bea does not like bread", "Bea mag kein Brot", "Bea nie lubi chleba") },
      ],
      hint: T(
        "Remember what Bea needed? She wanted shoes, not fish.",
        "Weißt du noch, was Bea brauchte? Sie wollte Schuhe, keinen Fisch.",
        "Pamiętasz, czego potrzebowała Bea? Chciała butów, a nie ryb.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Help Finn get his bread. Read each card and press the button until he has bread.",
        "Hilf Finn, an sein Brot zu kommen. Folge den Kärtchen und tippe auf die Knöpfe.",
        "Pomóż Finnowi zdobyć chleb. Czytaj wskazówki i naciskaj przyciski, aż zdobędzie chleb.",
      ),
      Widget: GetBreadWidget,
      hint: T(
        "Read what to do now, then tap the action button.",
        "Lies, was du tun kannst, und tippe auf den Knopf.",
        "Przeczytaj instrukcję i naciśnij przycisk działania.",
      ),
    },
    {
      kind: "choice",
      prompt: T("Which of these is NOT a job of money?", "Was kann Geld NICHT?", "Co NIE jest zadaniem pieniędzy?"),
      options: [
        { text: T("Helps us swap things", "Uns beim Tauschen helfen", "Pomaganie w wymianie rzeczy") },
        { text: T("Shows the price of things", "Zeigen, was etwas kostet", "Pokazywanie, ile coś kosztuje") },
        { text: T("Makes more fish by itself", "Von allein mehr Fische machen", "Tworzenie nowych ryb samych z siebie"), correct: true },
        { text: T("Lets us keep value for later", "Wert für später aufheben", "Zachowywanie wartości na później") },
      ],
      hint: T(
        "Money can't make fish! It helps us swap, shows prices, and lets us keep value for later.",
        "Geld kann keine Fische machen! Es hilft beim Tauschen, zeigt Preise und hebt Wert für später auf.",
        "Pieniądze nie potrafią stworzyć ryb! Pomagają wymieniać rzeczy, pokazują ceny i pozwalają oszczędzać na później.",
      ),
    },
  ],
  askDad: T(
    "Have you ever wanted to swap something with a friend, but they did not want what you had? What did you do? And what do we use money for in our family?",
    "Wolltest du schon einmal etwas mit einem Freund tauschen, aber er wollte nicht, was du hattest? Was hast du gemacht? Und wofür nutzen wir in unserer Familie Geld?",
    "Czy chciałeś kiedyś wymienić się czymś z kolegą, ale on nie chciał tego, co miałeś? Co wtedy zrobiłeś? I do czego w naszej rodzinie używamy pieniędzy?",
  ),
  realLife: {
    title: {
      en: "Money in India",
      de: "Geld in Deutschland",
      pl: "Pieniądze w Polsce",
    },
    body: {
      en: "In India we pay with Indian Rupees (₹). One rupee is 100 paise. There are coins from 1 rupee up to 20 rupees, and paper banknotes. Next time you visit a shop, look at the price tag!",
      de: "In Deutschland bezahlen wir mit Euro (€). Ein Euro sind 100 Cent. Es gibt Münzen von 1 Cent bis 2 Euro und Geldscheine. Schau im Laden mal auf das Preisschild!",
      pl: "W Polsce płacimy w złotych (zł). Jeden złoty to 100 groszy. Mamy monety od 1 grosza do 5 złotych oraz banknoty papierowe. Następnym razem w sklepie sprawdź cenę na etykiecie!",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Barter needs a 'double coincidence of wants': each side must have something the other side wants.",
          de: "Tauschhandel braucht das 'doppelte Zusammentreffen von Wünschen': Jede Seite muss haben, was die andere will.",
          pl: "Handel wymienny wymaga tzw. 'podwójnej zbieżności potrzeb': każda ze stron musi chcieć tego, co oferuje druga.",
        },
        source: "https://www.stlouisfed.org/publications/page-one-economics/2013/03/01/money-and-inflation-a-functional-relationship",
      },
      {
        text: {
          en: "With money as a medium of exchange, the two sides no longer need to want each other's goods.",
          de: "Mit Geld als Tauschmittel müssen die beiden Seiten nicht mehr gegenseitig die Waren des anderen wollen.",
          pl: "Dzięki pieniądzom jako środkowi wymiany dwie strony nie muszą już nawzajem potrzebować swoich towarów.",
        },
        source: "https://www.ecb.europa.eu/home/pdf/students/booklet_en.pdf",
      },
      {
        text: {
          en: "Money has three functions: medium of exchange, unit of account (prices), store of value.",
          de: "Geld hat drei Funktionen: Tauschmittel, Recheneinheit (Preise), Wertaufbewahrungsmittel.",
          pl: "Pieniądz pełni trzy funkcje: środek wymiany, jednostka rozliczeniowa (ceny) oraz środek przechowywania wartości.",
        },
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_money.en.html",
      },
      {
        text: {
          en: "India uses the Indian Rupee (₹), Germany uses the Euro (€), and Poland uses the Polish Złoty (zł).",
          de: "Deutschland nutzt den Euro (€), Polen den Złoty (zł) und Indien die Rupie (₹).",
          pl: "Polska używa złotego (zł), Niemcy euro (€), a Indie rupii indyjskiej (₹).",
        },
        source: "https://www.ecb.europa.eu/euro/intro/html/map.en.html",
      },
      {
        text: {
          en: "Circulating coins and banknotes represent standard currency divisions (e.g. 100 paise per rupee, 100 cents per euro, 100 groszy per złoty).",
          de: "Umlaufende Münzen und Banknoten stellen Standard-Währungsunterteilungen dar (z. B. 100 Cent pro Euro, 100 Groszy pro Złoty, 100 Paise pro Rupie).",
          pl: "Obiegowe monety i banknoty reprezentują standardowe podziały waluty (np. 100 groszy na złoty, 100 centów na euro, 100 paise na rupię).",
        },
        source: "https://www.ecb.europa.eu/euro/coins/html/index.en.html",
      },
    ],
    simplified: [
      {
        en: "Barter has more problems (measuring value, splitting goods). The lesson shows only the 'both must want each other's thing' problem, which is the one an 8-year-old can see.",
        de: "Tauschhandel hat mehr Probleme (Wert messen, Güter teilen). Die Lektion zeigt nur das Problem, dass beide Seiten das Angebot der anderen wollen müssen.",
        pl: "Handel wymienny stwarza więcej problemów (mierzenie wartości, dzielenie dóbr). Lekcja pokazuje problem konieczności zbieżności potrzeb, który jest najbardziej intuicyjny dla 8-latka.",
      },
      {
        en: "The three functions are told as 'helps us swap', 'shows the price', 'keep it for later'.",
        de: "Die drei Funktionen werden als 'hilft beim Tauschen', 'zeigt den Preis' und 'für später aufheben' erklärt.",
        pl: "Trzy funkcje wyjaśniono prostymi słowami: 'pomaga wymieniać', 'pokazuje cenę' i 'zachować na później'.",
      },
      {
        en: "Finn, Bea and Sam and the 2-coin price are made up. Real prices vary.",
        de: "Finn, Bea und Sam sowie der Preis von 2 Münzen sind erfunden. Reale Preise variieren.",
        pl: "Finn, Bea i Sam oraz cena 2 monet są postaciami z bajki. Prawdziwe ceny na rynku są zróżnicowane.",
      },
      {
        en: "In the toy every villager buys fish for coins. In real life someone must actually want fish and be able to pay.",
        de: "Im Spielzeug kauft jeder Dorfbewohner Fisch für Münzen. Im echten Leben muss tatsächlich jemand Fisch wollen und bezahlen können.",
        pl: "W minigrze każdy mieszkaniec kupuje rybę za monety. W prawdziwym życiu ktoś musi chcieć rybę i mieć pieniądze, by zapłacić.",
      },
    ],
  },
};
