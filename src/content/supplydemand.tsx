import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  EquilibriumDiagram,
  HarborCatchDiagram,
  HighPriceDiagram,
  LowPriceDiagram,
  MarketHarmonyDiagram,
} from "./supplydemand.diagrams";
import { SupplyDemandToy } from "./supplydemand.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <SupplyDemandToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <SupplyDemandToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "supplydemand",
  story: [
    animatedBeat(
      [
        T(
          "Finn arrives at the Ripple Town pier with six freshly caught fish.",
          "Finn kommt mit sechs frisch gefangenen Fischen am Pier von Ripple Town an.",
          "Finn przybija do molo w Ripple Town z sześcioma świeżo złowionymi rybami.",
        ),
        T(
          "Six villagers are walking by looking for a warm lunch.",
          "Sechs Dorfbewohner kommen vorbei und suchen nach einem warmen Mittagessen.",
          "Sześciu mieszkańców spaceruje w pobliżu, szukając czegoś na ciepły obiad.",
        ),
        T(
          "The fish are the *supply*, and hungry bellies create the *demand*.",
          "Die Fische sind das *Angebot*, und hungrige Bäuche schaffen die *Nachfrage*.",
          "Ryby to *podaż*, a głodne brzuchy mieszkańców tworzą *popyt*.",
        ),
        T(
          "Finn must pick a price tag to offer at the market stall.",
          "Finn muss ein Preisschild für seinen Marktstand auswählen.",
          "Finn musi ustalić cenę na swoim targu.",
        ),
      ],
      HarborCatchDiagram,
    ),
    animatedBeat(
      [
        T(
          "First, Finn sets a greedy price of eight coins per fish.",
          "Zuerst verlangt Finn einen stolzen Preis von acht Münzen pro Fisch.",
          "Początkowo Finn ustala wygórowaną cenę ośmiu monet za rybę.",
        ),
        T(
          "Only one wealthy sea captain can afford such an expensive meal.",
          "Nur ein wohlhabender Kapitän kann sich ein so teures Essen leisten.",
          "Tylko jeden bogaty kapitan statku może pozwolić sobie na tak drogi posiłek.",
        ),
        T(
          "Five fresh fish sit unsold under the hot sun and begin to spoil.",
          "Fünf frische Fische bleiben in der heißen Sonne liegen und beginnen zu verderben.",
          "Pięć świeżych ryb leży niesprzedanych w pełnym słońcu i zaczyna się psuć.",
        ),
        T(
          "When price is too high, supply is bigger than demand, causing waste.",
          "Wenn der Preis zu hoch ist, ist das Angebot größer als die Nachfrage, was zu Verschwendung führt.",
          "Gdy cena jest zbyt wysoka, podaż przewyższa popyt, co prowadzi do marnotrawstwa.",
        ),
      ],
      HighPriceDiagram,
    ),
    animatedBeat(
      [
        T(
          "Next, Finn drops the price all the way down to just one coin.",
          "Als Nächstes senkt Finn den Preis auf nur eine einzige Münze.",
          "Następnie Finn obniża cenę do zaledwie jednej monety.",
        ),
        T(
          "Fifteen hungry villagers rush forward shouting and waving coins.",
          "Fünfzehn hungrige Dorfbewohner stürmen heran, rufen und winken mit Münzen.",
          "Piętnastu głodnych mieszkańców nadbiega, machając monetami.",
        ),
        T(
          "All six fish vanish in ten seconds, leaving nine villagers with empty stomachs.",
          "Alle sechs Fische sind in zehn Sekunden weg und neun Dorfbewohner gehen leer aus.",
          "Wszystkie sześć ryb znika w dziesięć sekund, a dziewięciu mieszkańców odchodzi z pustym brzuchem.",
        ),
        T(
          "When price is too low, demand exceeds supply, causing a shortage.",
          "Wenn der Preis zu niedrig ist, übersteigt die Nachfrage das Angebot, was zu Mangel führt.",
          "Gdy cena jest zbyt niska, popyt przewyższa podaż, co powoduje niedobór.",
        ),
      ],
      LowPriceDiagram,
    ),
    animatedBeat(
      [
        T(
          "Finally, Finn sets the price tag at exactly four coins.",
          "Schließlich setzt Finn das Preisschild auf genau vier Münzen.",
          "W końcu Finn ustala cenę na dokładnie cztery monety.",
        ),
        T(
          "Exactly six villagers decide the meal is worth four coins.",
          "Genau sechs Dorfbewohner entscheiden, dass das Essen vier Münzen wert ist.",
          "Dokładnie sześciu mieszkańców uznaje, że ryba jest warta czterech monet.",
        ),
        T(
          "Every fish is sold, no food is wasted, and everyone is satisfied.",
          "Jeder Fisch wird verkauft, kein Essen wird verschwendet und alle sind zufrieden.",
          "Każda ryba zostaje sprzedana, jedzenie się nie marnuje, a wszyscy są zadowoleni.",
        ),
        T(
          "This balance point is called the *market price*.",
          "Diesen Ausgleichspunkt nennt man den *Marktpreis*.",
          "Ten punkt równowagi nazywamy *ceną rynkową*.",
        ),
      ],
      EquilibriumDiagram,
    ),
    animatedBeat(
      [
        T(
          "Markets use prices like signals to balance supply and demand.",
          "Märkte nutzen Preise wie Signale, um Angebot und Nachfrage auszugleichen.",
          "Rynki wykorzystują ceny niczym sygnały do równoważenia podaży i popytu.",
        ),
        T(
          "When more people want something, the price nudges sellers to bring more.",
          "Wenn mehr Menschen etwas wollen, ermutigt der Preis Verkäufer, mehr zu bringen.",
          "Gdy więcej ludzi czegoś pragnie, rosnąca cena zachęca sprzedawców do dostarczenia większej ilości.",
        ),
        T(
          "When goods are plentiful, prices fall so buyers can enjoy them.",
          "Wenn Waren reichlich vorhanden sind, sinken die Preise, damit Käufer zugreifen können.",
          "Gdy towaru jest pod dostatkiem, ceny spadają, by kupujący mogli z nich skorzystać.",
        ),
        T(
          "Prices help guide resources to where people need them most.",
          "Preise lenken Ressourcen dorthin, wo Menschen sie am meisten brauchen.",
          "Ceny pomagają kierować zasoby tam, gdzie ludzie najbardziej ich potrzebują.",
        ),
      ],
      MarketHarmonyDiagram,
    ),
  ],
  toyIntro: T(
    "Set the price slider to find the point where all fish are sold without shortage or waste.",
    "Bewege den Preisschieber, um den Punkt zu finden, an dem alle Fische ohne Mangel oder Verschwendung verkauft werden.",
    "Ustaw suwak ceny, aby znaleźć punkt równowagi, w którym wszystkie ryby zostaną sprzedane bez braków i strat.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What happens when a seller sets the price much too high?",
        "Was passiert, wenn ein Verkäufer den Preis viel zu hoch ansetzt?",
        "Co się dzieje, gdy sprzedawca ustali zbyt wysoką cenę?",
      ),
      options: [
        {
          text: T(
            "Goods sit unsold because few buyers can afford them",
            "Waren bleiben unverkauft liegen, weil sich nur wenige Käufer das leisten können",
            "Towary leżą niesprzedane, ponieważ niewielu kupców może sobie na nie pozwolić",
          ),
          correct: true,
        },
        {
          text: T(
            "More buyers rush in immediately to buy everything",
            "Mehr Käufer stürmen sofort herbei, um alles zu kaufen",
            "Więcej kupców natychmiast przybiega, aby wykupić wszystko",
          ),
        },
        {
          text: T(
            "The items magically double in quantity",
            "Die Artikel verdoppeln sich wie von Zauberhand",
            "Ilość towaru magicznie się podwaja",
          ),
        },
      ],
      hint: T(
        "Think about what happened to Finn's fish when he charged eight coins.",
        "Denke daran, was mit Finns Fischen geschah, als er acht Münzen verlangte.",
        "Przypomnij sobie, co stało się z rybami Finna, gdy zażądał ośmiu monet.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the market clearing price?",
        "Was ist der markträumende Preis?",
        "Czym jest cena równowagi rynkowej?",
      ),
      options: [
        {
          text: T(
            "The price where the amount supplied equals the amount demanded",
            "Der Preis, bei dem die angebotene Menge der nachgefragten Menge entspricht",
            "Cena, przy której wielkość podaży zrównuje się z wielkością popytu",
          ),
          correct: true,
        },
        {
          text: T(
            "A price set by law that can never change",
            "Ein gesetzlich festgelegter Preis, der sich nie ändern darf",
            "Cena ustalona ustawowo, która nigdy nie może się zmienić",
          ),
        },
        {
          text: T(
            "The highest price a seller can possibly imagine",
            "Der höchste Preis, den sich ein Verkäufer überhaupt vorstellen kann",
            "Najwyższa cena, jaką sprzedawca jest w stanie sobie wyobrazić",
          ),
        },
      ],
      hint: T(
        "It balances buyers and sellers so no goods are wasted and no one is left out.",
        "Er gleicht Käufer und Verkäufer aus, sodass keine Waren vergeudet werden.",
        "Równoważy kupujących i sprzedających tak, by nic się nie zmarnowało.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Finn has 4 fresh fish. Set the price slider to 3 coins so all 4 fish find buyers at a fair balance.",
        "Finn hat 4 frische Fische. Stelle den Preisschieber auf 3 Münzen, damit alle 4 Fische im Gleichgewicht verkauft werden.",
        "Finn ma 4 świeże ryby. Ustaw suwak na 3 monety, aby wszystkie 4 ryby znalazły nabywców w równowadze rynkowej.",
      ),
      Widget,
      hint: T(
        "Slide the price to 3 coins and tap check.",
        "Schiebe den Preis auf 3 Münzen und tippe auf prüfen.",
        "Przesuń suwak ceny na 3 monety i naciśnij Sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, what is something in our city that gets more expensive when lots of people want it at the same time?",
    "Papa, was wird in unserer Stadt teurer, wenn viele Menschen es gleichzeitig haben wollen?",
    "Tato, co w naszym mieście drożeje, gdy nagle bardzo wielu ludzi chce to kupić w tym samym czasie?",
  ),
  realLife: {
    title: {
      en: "APMC mandis and vegetable markets in India",
      de: "Wochenmärkte und Börsen in Deutschland",
      pl: "Rynki hurtowe i giełdy towarowe w Polsce",
    },
    body: {
      en: "In India, local agricultural markets (APMC mandis) and the national electronic platform (e-NAM) determine food prices through daily supply and demand. If unseasonal monsoon rains delay onion harvests in Maharashtra, the reduced supply causes mandi prices across the country to rise. When bumper harvests arrive, prices soften so families can afford plenty of fresh produce.",
      de: "In Deutschland nutzen Wochenmärkte und moderne Börsen Angebot und Nachfrage zur Preisbildung. Wenn Frost Erdbeerfelder in Niedersachsen beschädigt, werden Erdbeeren knapp und die Supermarktpreise steigen. Bei reicher Ernte sinken die Preise, damit alle Beeren Käufer finden.",
      pl: "W Polsce na rynkach hurtowych, takich jak Warszawski Rolno-Spożywczy Rynek Hurtowy w Broniszach, ceny warzyw i owoców kształtują się codziennie pod wpływem podaży i popytu. Gdy wiosenne przymrozki w rejonie Grójca zniszczą zbiory truskawek i jabłek, ograniczona podaż winduje ceny w sklepach. Podczas obfitych zbiorów ceny spadają, ułatwiając zakupy konsumentom.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The market clearing price forms at the intersection of supply and demand schedules where available quantity matches buyer demand.",
          de: "Der markträumende Preis bildet sich im Schnittpunkt von Angebot und Nachfrage, wo die gehandelte Menge geräumt wird.",
          pl: "Cena równowagi rynkowej ustala się w punkcie przecięcia krzywych popytu i podaży, oczyszczając rynek z nadwyżek i niedoborów.",
        },
        source: "https://stat.gov.pl/metainformacje/slownik-pojec/pojecia-stosowane-w-statystyce-publicznej/2753,pojecie.html",
      },
      {
        text: {
          en: "Agricultural produce market committees and commodity trading platforms continuously match bids and offers to establish transparent spot prices.",
          de: "Moderne Handelsplätze führen Kauf- und Verkaufsaufträge kontinuierlich zusammen, um transparente Referenzpreise zu ermitteln.",
          pl: "Towarowa Giełda Energii (TGE) oraz giełdy rolne łączą zlecenia kupna i sprzedaży, wyznaczając przejrzyste ceny referencyjne.",
        },
        source: "https://www.tge.pl/",
      },
      {
        text: {
          en: "Central banking and competition authorities recognize price discovery as essential for guiding efficient resource allocation across the economy.",
          de: "Notenbanken und Kartellbehörden betonen Preissignale als unverzichtbaren Mechanismus zur optimalen volkswirtschaftlichen Ressourcenlenkung.",
          pl: "Narodowy Bank Polski i Urząd Ochrony Konkurencji i Konsumentów (UOKiK) uznają mechanizm cenowy za kluczowy dla efektywnej alokacji zasobów.",
        },
        source: "https://nbp.pl/edukacja/",
      },
      {
        text: {
          en: "National statistical agencies systematically record producer and consumer price variations across wholesale markets and grocery baskets.",
          de: "Das Statistische Bundesamt (Destatis) misst Erzeuger- und Verbraucherpreisschwankungen über Tausende Güter hinweg.",
          pl: "Główny Urząd Statystyczny (GUS) monitoruje notowania cen na targowiskach i w sklepach, badając dynamikę cen koszyka żywnościowego.",
        },
        source: "https://stat.gov.pl/obszary-tematyczne/ceny-handel/",
      },
      {
        text: {
          en: "Antitrust regulations prohibit artificial hoarding and price manipulation to preserve natural competitive supply and demand forces.",
          de: "Wettbewerbsbehörden (Bundeskartellamt) verbieten künstliche Verknappung und Preisabsprachen zur Wahrung des freien Marktes.",
          pl: "Ustawa o ochronie konkurencji i konsumentów zabrania zmów cenowych i sztucznego ograniczania podaży przez monopolistów.",
        },
        source: "https://uokik.gov.pl/ochrona-konkurencji",
      },
    ],
    simplified: [
      {
        en: "We explain supply and demand with fresh fish at a pier so an 8-year-old intuitively understands shortages and surpluses.",
        de: "Wir erklären Angebot und Nachfrage mit frischem Fisch am Hafen, damit Kinder Mangel und Überfluss intuitiv begreifen.",
        pl: "Tłumaczymy podaż i popyt na przykładzie świeżych ryb na molo, aby dziecko intuicyjnie zrozumiało braki towaru i nadwyżki.",
      },
      {
        en: "We show that prices act like traffic signals balancing what sellers produce with what families need.",
        de: "Wir zeigen, dass Preise wie Signale wirken, die das Angebot der Erzeuger mit den Wünschen der Familien ausbalancieren.",
        pl: "Pokazujemy, że ceny działają jak drogowskazy równoważące to, co sprzedawcy przynoszą na targ, z potrzebami rodzin.",
      },
      {
        en: "We emphasize fairness and food preservation rather than abstract mathematical formulas.",
        de: "Wir betonen Fairness und das Vermeiden von Verschwendung statt abstrakter mathematischer Kurven.",
        pl: "Kładziemy nacisk na uczciwość i unikanie marnowania żywności zamiast abstrakcyjnych wzorów matematycznych.",
      },
    ],
  },
};
