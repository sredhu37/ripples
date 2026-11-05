import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BikeGoalDiagram,
  BootDiagram,
  PocketMoneyDiagram,
  RainyJarDiagram,
  SaveDiagram,
  SweetsDiagram,
  WeeksDiagram,
} from "./savings.diagrams";
import { Planner, plan } from "./savings.toy";

// The planner logic lives in savings.toy.tsx; re-exported here for the tests.
export { plan } from "./savings.toy";
export type { Plan, PlanWeek, RainPaidBy } from "./savings.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  const [save, setSave] = useState(2);
  return <Planner lang={lang} full save={save} setSave={setSave} onDone={onDone} />;
}

function BikeInFourWidget({ lang, onAnswer }: WidgetProps) {
  const [save, setSave] = useState(2);
  // The widget has no rainy-day jar and no rain, so the plan is plan(save, false, false).
  const p = plan(save, false, false);
  const ok = p.bikeWeek !== null && p.bikeWeek <= 4 && p.treats >= 1;
  return (
    <>
      <Planner lang={lang} full={false} save={save} setSave={setSave} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(ok)} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "savings",
  story: [
    animatedBeat(
      [
        T("This is Pip. Pip lives in Ripple Town too.", "Das ist Pip. Pip wohnt auch in Ripple Town.", "To jest Pip. Pip również mieszka w Ripple Town."),
        T("Every week Pip gets 4 coins from Dad.", "Jede Woche bekommt Pip 4 Münzen von Papa.", "Co tydzień Pip dostaje 4 monety od Taty."),
        T(
          "Money that a child gets regularly has a name. It is called *pocket money*.",
          "Geld, das ein Kind regelmäßig bekommt, hat einen Namen. Es heißt *Taschengeld*.",
          "Pieniądze, które dziecko otrzymuje regularnie, mają swoją nazwę. To jest *kieszonkowe*.",
        ),
        T(
          "Pip can decide what to do with it. But what should Pip do?",
          "Pip darf selbst entscheiden, was damit passiert. Aber was soll Pip tun?",
          "Pip może sam decydować, co z nimi zrobić. Ale co powinien wybrać?",
        ),
      ],
      PocketMoneyDiagram,
    ),
    animatedBeat(
      [
        T(
          "One day Pip sees a red bike in a shop window.",
          "Eines Tages sieht Pip in einem Schaufenster ein rotes Fahrrad.",
          "Pewnego dnia Pip widzi czerwony rower na wystawie sklepowej.",
        ),
        T("The price tag says 12 coins.", "Auf dem Preisschild stehen 12 Münzen.", "Cena na etykiecie wynosi 12 monet."),
        T(
          "That is much more than the 4 coins Pip gets in a week. Pip cannot buy the bike today.",
          "Das ist viel mehr als die 4 Münzen, die Pip in einer Woche bekommt. Heute kann Pip das Fahrrad nicht kaufen.",
          "To znacznie więcej niż 4 monety, które Pip dostaje w tygodniu. Pip nie może kupić roweru dzisiaj.",
        ),
        T(
          "But Pip really wants this bike. Something you save up for has a name. It is called a *savings goal*. The bike is Pip's savings goal.",
          "Aber Pip möchte dieses Fahrrad unbedingt. Etwas, auf das du sparst, hat einen Namen. Es heißt *Sparziel*. Das Fahrrad ist Pips Sparziel.",
          "Ale Pip bardzo pragnie tego roweru. Coś, na co odkładasz pieniądze, to *cel oszczędnościowy*. Rower staje się celem Pipa.",
        ),
      ],
      BikeGoalDiagram,
    ),
    animatedBeat(
      [
        T("Pip could spend all 4 coins on sweets. Yum!", "Pip könnte alle 4 Münzen für Süßes ausgeben. Lecker!", "Pip mógłby wydać wszystkie 4 monety na słodycze. Pycha!"),
        T(
          "Pip hands over the 4 coins and gets 4 sweets.",
          "Pip gibt die 4 Münzen her und bekommt dafür 4 Süßigkeiten.",
          "Pip oddaje 4 monety i dostaje 4 słodycze.",
        ),
        T(
          "But sweets get eaten, and then the coins are gone. Pip has 0 coins left.",
          "Aber Süßes wird aufgegessen, und dann sind die Münzen weg. Pip hat keine Münzen mehr.",
          "Ale słodycze szybko znikają, a monety przepadają. Pipowi zostaje 0 monet.",
        ),
        T(
          "Next week it is the same again, and the bike never gets closer.",
          "Nächste Woche ist es genauso, und das Fahrrad kommt nie näher.",
          "W kolejnym tygodniu jest tak samo, a rower wcale się nie przybliża.",
        ),
      ],
      SweetsDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Or Pip can save. You already know it: when you save, you keep coins for later instead of spending them.",
          "Oder Pip spart. Das weißt du schon: Wer spart, hebt Münzen für später auf, statt sie auszugeben.",
          "Albo Pip może oszczędzać. Już to wiesz: kiedy oszczędzasz, zachowujesz monety na później, zamiast je wydawać.",
        ),
        T(
          "Saving is a choice: sweets now, or a bike later.",
          "Sparen ist eine Entscheidung: jetzt Süßes oder später ein Fahrrad.",
          "Oszczędzanie to wybór: słodycze teraz albo rower później.",
        ),
        T(
          "Pip decides: 3 coins go into the piggy bank, and 1 coin is for a sweet. Pip does this every week.",
          "Pip entscheidet: 3 Münzen kommen ins Sparschwein, und 1 Münze ist zum Naschen. Das macht Pip jede Woche.",
          "Pip postanawia: 3 monety wędrują do skarbonki, a 1 moneta na słodycz. Pip robi tak co tydzień.",
        ),
        T(
          "Waiting is hard! But every week the piggy bank gets a little fuller.",
          "Warten ist schwer! Aber jede Woche wird das Sparschwein ein bisschen voller.",
          "Czekanie bywa trudne! Lecz z każdym tygodniem skarbonka staje się pełniejsza.",
        ),
      ],
      SaveDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Week 1: Pip puts 3 coins into the piggy bank. Now it holds 3 coins.",
          "Woche 1: Pip legt 3 Münzen ins Sparschwein. Jetzt sind 3 Münzen drin.",
          "Tydzień 1: Pip wrzuca 3 monety do skarbonki. Teraz są w niej 3 monety.",
        ),
        T(
          "Week 2: 3 more coins. Now there are 6 coins in the piggy bank.",
          "Woche 2: 3 Münzen kommen dazu. Jetzt sind 6 Münzen im Sparschwein.",
          "Tydzień 2: kolejne 3 monety. W skarbonce jest już 6 monet.",
        ),
        T("Week 3: 3 more coins. Now there are 9.", "Woche 3: wieder 3 Münzen. Jetzt sind es 9.", "Tydzień 3: znowu 3 monety. Jest już 9 monet."),
        T(
          "Week 4: 3 more coins. Now there are 12 coins. That is exactly the price of the bike!",
          "Woche 4: wieder 3 Münzen. Jetzt sind es 12 Münzen. Das ist genau der Preis vom Fahrrad!",
          "Tydzień 4: kolejne 3 monety. Razem 12 monet. To dokładnie cena roweru!",
        ),
        T(
          "Pip buys the bike. Pip reached the savings goal!",
          "Pip kauft das Fahrrad. Pip hat das Sparziel erreicht!",
          "Pip kupuje rower. Udało się osiągnąć cel oszczędnościowy!",
        ),
      ],
      WeeksDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T("One day it rains hard.", "Eines Tages regnet es in Strömen.", "Pewnego dnia mocno pada deszcz."),
        T("Oh no! Pip's boot breaks.", "Oh nein! Pips Stiefel geht kaputt.", "O nie! Kalosz Pipa pęka."),
        T(
          "Fixing the boot costs 3 coins, and Pip needs the boot right now.",
          "Die Reparatur kostet 3 Münzen, und Pip braucht den Stiefel sofort.",
          "Naprawa buta kosztuje 3 monety, a Pip potrzebuje butów od zaraz.",
        ),
        T(
          "If the 3 coins come out of the bike's piggy bank, the bike comes later.",
          "Kommen die 3 Münzen aus dem Sparschwein fürs Fahrrad, kommt das Fahrrad später.",
          "Jeśli weźmie te 3 monety ze skarbonki na rower, zakup roweru się opóźni.",
        ),
      ],
      BootDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Pip keeps the bike coins in the piggy bank.",
          "Pip hebt die Fahrrad-Münzen im Sparschwein auf.",
          "Pip zostawia monety na rower w skarbonce.",
        ),
        T(
          "Now Pip adds a second jar, only for surprises like a broken boot.",
          "Jetzt bekommt Pip ein zweites Glas, nur für Überraschungen wie einen kaputten Stiefel.",
          "Pip dodaje drugi słoik, wyłącznie na niespodzianki, takie jak pęknięty but.",
        ),
        T(
          "A jar for surprise costs has a name. It is called a *rainy-day jar*.",
          "Ein Glas für überraschende Kosten hat einen Namen. Es heißt *Regentag-Glas*.",
          "Słoik na niespodziewane wydatki ma nazwę. Nazywa się to *słoik na czarną godzinę*.",
        ),
        T(
          "Every week Pip puts 1 coin into it. That is the coin that used to buy a sweet.",
          "Jede Woche legt Pip 1 Münze hinein. Das ist die Münze, die vorher für Süßes da war.",
          "Co tydzień Pip wrzuca do niego 1 monetę, którą wcześniej wydawał na łakocie.",
        ),
        T(
          "Now Pip has two reasons to save: a goal to reach, and coins ready for surprises.",
          "Jetzt hat Pip zwei Gründe zum Sparen: ein Ziel und Münzen für Überraschungen.",
          "Teraz Pip ma dwa powody do oszczędzania: cel oraz rezerwę na niespodzianki.",
        ),
      ],
      RainyJarDiagram,
      "happy",
    ),
  ],
  toyIntro: T(
    "Plan Pip's pocket money! Slide the coins for the bike. Then switch on the rain, and then the rainy-day jar.",
    "Plane Pips Taschengeld! Schiebe, wie viele Münzen fürs Fahrrad gespart werden. Schalte dann den Regen an und danach das Regentag-Glas.",
    "Zaplanuj kieszonkowe Pipa! Przesuń suwak monet na rower. Następnie włącz deszcz, a potem słoik na czarną godzinę.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Pip spends all 4 coins on sweets every week. What happens to the bike?",
        "Pip gibt jede Woche alle 4 Münzen für Süßes aus. Was passiert mit dem Fahrrad?",
        "Pip wydaje co tydzień wszystkie 4 monety na słodycze. Co stanie się z rowerem?",
      ),
      options: [
        { text: T("The bike comes closer by itself", "Das Fahrrad kommt von allein näher", "Rower przybliża się sam z siebie") },
        { text: T("Pip gets the bike next week", "Pip bekommt das Fahrrad nächste Woche", "Pip kupi rower już za tydzień") },
        { text: T("Pip never has coins left for it", "Pip hat nie Münzen dafür übrig", "Pip nigdy nie uzbiera na niego monet"), correct: true },
      ],
      hint: T(
        "Coins that are spent are gone. To buy the bike, Pip has to keep some coins each week.",
        "Ausgegebene Münzen sind weg. Um das Fahrrad zu kaufen, muss Pip jede Woche Münzen aufheben.",
        "Wydane monety przepadają. Aby kupić rower, Pip musi odkładać monety co tydzień.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Pip wants the bike within 4 weeks and still wants 1 coin for sweets each week. Set the coins for the bike, then press Check.",
        "Pip will das Fahrrad in höchstens 4 Wochen und trotzdem jede Woche 1 Münze zum Naschen. Stelle die Münzen fürs Fahrrad ein und drücke dann Prüfen.",
        "Pip chce kupić rower w ciągu 4 tygodni i wciąż mieć 1 monetę tygodniowo na słodycze. Ustaw monety na rower i naciśnij Sprawdź.",
      ),
      Widget: BikeInFourWidget,
      hint: T(
        "12 coins in 4 weeks means 3 coins each week. With 4 coins there is nothing left for sweets. With 2 coins the bike takes 6 weeks.",
        "12 Münzen in 4 Wochen sind 3 Münzen pro Woche. Bei 4 Münzen bleibt nichts zum Naschen. Bei 2 Münzen dauert es 6 Wochen.",
        "12 monet w 4 tygodnie oznacza 3 monety tygodniowo. Przy 4 monetach nic nie zostanie na słodycze. Przy 2 monetach potrwa to 6 tygodni.",
      ),
    },
    {
      kind: "choice",
      prompt: T("What is the rainy-day jar for?", "Wofür ist das Regentag-Glas da?", "Do czego służy słoik na czarną godzinę?"),
      options: [
        { text: T("For surprises that cost coins", "Für Überraschungen, die Münzen kosten", "Na niespodziewane wydatki"), correct: true },
        { text: T("For buying sweets every day", "Zum Süßigkeiten kaufen jeden Tag", "Do kupowania słodyczy każdego dnia") },
        { text: T("For paying for the bike", "Zum Bezahlen des Fahrrads", "Do zapłacenia za rower") },
      ],
      hint: T(
        "The bike has its own jar. The rainy-day jar waits for surprises, like a broken boot.",
        "Das Fahrrad hat sein eigenes Glas. Das Regentag-Glas wartet auf Überraschungen, zum Beispiel einen kaputten Stiefel.",
        "Rower ma osobną skarbonkę. Słoik na czarną godzinę czeka na niespodzianki, jak naprawa buta.",
      ),
    },
  ],
  askDad: T(
    "What did you save up for when you were small? Was it hard to wait? And what would we put in a rainy-day jar in our family?",
    "Worauf hast du als Kind gespart? War es schwer zu warten? Und was würden wir bei uns in ein Regentag-Glas legen?",
    "Na co oszczędzałeś, gdy byłeś mały? Czy trudno było czekać? I co w naszej rodzinie odłożylibyśmy na czarną godzinę?",
  ),
  realLife: {
    title: {
      en: "Pocket money in India",
      de: "Taschengeld in Deutschland",
      pl: "Kieszonkowe w Polsce",
    },
    body: {
      en: "In India, children often receive pocket money or festival gifts saved in a gullak (clay piggy bank). Children aged 10 and above can open minor savings accounts in Indian banks (like SBI Pehla Kadam) to learn how to save rupees.",
      de: "Familien können Kindern Taschengeld geben, aber kein Gesetz sagt, dass sie es müssen. Fachleute empfehlen für 8- und 9-Jährige etwa 3 bis 4 Euro pro Woche. Ab 7 Jahren darfst du kleine Dinge von deinem Taschengeld kaufen. Für ein eigenes Konto müssen deine Eltern zustimmen.",
      pl: "W Polsce rodzice często dają dzieciom kieszonkowe, choć nie ma takiego obowiązku prawnego. Eksperci zalecają około 15 do 20 zł tygodniowo dla dzieci w wieku 8-9 lat. Od 13. roku życia nastolatkowie zyskują ograniczoną zdolność do czynności prawnych i mogą mieć własne konto bankowe za zgodą rodziców.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Savings is money you set aside today to use in the future. People save for things like a bill that is due, school supplies, or personal goals like a car or an appliance.",
          de: "Ersparnisse sind Geld, das man heute zurücklegt, um es in der Zukunft zu nutzen: für Rechnungen, Schulbedarf oder persönliche Ziele.",
          pl: "Oszczędności to pieniądze odkładane dzisiaj z myślą o przyszłości. Ludzie oszczędzają na rachunki, wyprawkę szkolną lub cele osobiste.",
        },
        source: "https://files.consumerfinance.gov/f/documents/cfpb_your-money-your-goals_savings_booklet_cobrand.pdf",
      },
      {
        text: {
          en: "Unexpected expenses can get in the way of reaching a savings goal, so building a 'rainy day fund' helps people stay on track with emergencies.",
          de: "Unerwartete Ausgaben können Sparziele gefährden. Ein Notgroschen hilft, unvorhergesehene Reparaturen abzufedern.",
          pl: "Niespodziewane wydatki mogą pokrzyżować cele oszczędnościowe, dlatego fundusz awaryjny pomaga bezpiecznie radzić sobie z nagłymi zdarzeniami.",
        },
        source: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/",
      },
      {
        text: {
          en: "Even a small amount put aside regularly provides financial resilience and prevents unexpected costs from turning into debt.",
          de: "Schon kleine, regelmäßig gesparte Beträge schaffen finanzielle Sicherheit und verhindern, dass Notfälle zu Schulden führen.",
          pl: "Nawet małe kwoty odkładane regularnie dają odporność finansową i chronią przed popadaniem w długi w nagłych sytuacjach.",
        },
        source: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/",
      },
      {
        text: {
          en: "Minor banking accounts and pocket money guidelines give children structured ways to practice budgeting small everyday decisions.",
          de: "Kinderkonten und Taschengelderziehung geben Heranwachsenden einen verlässlichen Rahmen, um den Umgang mit Geld im Alltag zu üben.",
          pl: "Konta dla dzieci i kieszonkowe dają najmłodszym bezpieczne warunki do nauki planowania budżetu i podejmowania codziennych decyzji finansowych.",
        },
        source: "https://www.verbraucherzentrale.de/podcast-umgang-mit-geld-infos-rund-ums-taschengeld-125596",
      },
      {
        text: {
          en: "Emergency cushions of a few months of living costs are standard household recommendations across modern financial education guidance.",
          de: "Finanzexperten empfehlen Haushalten üblicherweise eine finanzielle Reserve von zwei bis drei Monatsgehältern für Unvorhergesehenes.",
          pl: "Eksperci finansowi zalecają gospodarstwom domowym utrzymywanie poduszki finansowej równej kosztom życia z kilku miesięcy.",
        },
        source: "https://www.verbraucherzentrale.de/laura-zieht-aus/sparen",
      },
    ],
    simplified: [
      {
        en: "Pip, the bike (12 coins), the 4-coin pocket money and the 3-coin boot repair are made up for clear maths.",
        de: "Pip, das Fahrrad (12 Münzen), 4 Münzen Taschengeld und 3 Münzen Reparatur sind für einfache Rechenschritte gewählt.",
        pl: "Pip, rower (12 monet), kieszonkowe 4 monety i naprawa buta za 3 monety to przykłady ułatwiające liczenie.",
      },
      {
        en: "Coins in piggy banks do not earn interest in this lesson so that the core saving choice is clear.",
        de: "Münzen im Sparschwein bringen in dieser Lektion noch keine Zinsen, damit die Sparentscheidung im Vordergrund steht.",
        pl: "Monety w skarbonce nie przynoszą odsetek w tej lekcji, aby skupić uwagę na samym wyborze oszczędzania.",
      },
      {
        en: "Rainy-day jar is the friendly term for what grown-ups call an emergency fund or reserve cushion.",
        de: "Regentag-Glas ist der kinderfreundliche Begriff für einen Notgroschen oder eine finanzielle Reserve.",
        pl: "Słoik na czarną godzinę to przystępne określenie na to, co dorośli nazywają poduszką finansową.",
      },
      {
        en: "Waiting and choosing between immediate sweets or a larger goal is the foundational emotional lesson of saving.",
        de: "Das Warten und Abwägen zwischen sofortigen Süßigkeiten und einem größeren Wunsch ist der Kern des Sparens.",
        pl: "Wybór między natychmiastową przyjemnością a większym celem w przyszłości to fundamentalna lekcja oszczędzania.",
      },
    ],
  },
};
