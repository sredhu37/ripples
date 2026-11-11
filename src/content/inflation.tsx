import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CostsDiagram,
  DeflationDiagram,
  InflationDiagram,
  JarDiagram,
  LastSummerDiagram,
  ManyWantDiagram,
  SamDiagram,
  TwoCoinsDiagram,
} from "./inflation.diagrams";
import { POCKET, START, TimeMachine, scoopsFor } from "./inflation.toy";
import type { Setting } from "./inflation.toy";

export { priceTenths, scoopsFor } from "./inflation.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  const [s, setS] = useState<Setting>(START);
  return (
    <TimeMachine
      lang={lang}
      value={s}
      onChange={(next) => {
        setS(next);
        onDone?.();
      }}
    />
  );
}

/** The child must set the machine so that 10 coins buy half as many scoops as at the start (5). */
function HalfScoopsWidget({ lang, onAnswer }: WidgetProps) {
  const [s, setS] = useState<Setting>(START);
  return (
    <>
      <TimeMachine lang={lang} value={s} onChange={setS} />
      <div className="row nav">
        <CheckButton
          lang={lang}
          onClick={() => onAnswer(scoopsFor(s.years, s.percent) === POCKET / 2)}
        />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "inflation",
  story: [
    animatedBeat(
      [
        T("Finn loves ice cream.", "Finn liebt Eis.", "Finn uwielbia lody."),
        T(
          "In Ripple Town, the ice cream seller sells it from a little stand. That is the seller's job.",
          "In Ripple Town verkauft der Eisverkäufer es an einem kleinen Stand. Das ist sein Beruf.",
          "W Ripple Town sprzedawca lodów prowadzi małe stoisko. To jest jego praca.",
        ),
        T(
          "Last summer, one scoop of ice cream cost 1 coin.",
          "Letzten Sommer kostete eine Kugel Eis 1 Münze.",
          "Zeszłego lata jedna gałka lodów kosztowała 1 monetę.",
        ),
        T(
          "Finn bought one scoop every Friday. He gave his coin, and he got his scoop.",
          "Finn kaufte sich jeden Freitag eine Kugel. Er gab seine Münze, und er bekam sein Eis.",
          "Finn kupował gałkę w każdy piątek. Dawał monetę i dostawał pyszne lody.",
        ),
      ],
      LastSummerDiagram,
    ),
    animatedBeat(
      [
        T(
          "But this summer, something is different. One scoop now costs 2 coins!",
          "Aber diesen Sommer ist etwas anders. Eine Kugel kostet jetzt 2 Münzen!",
          "Lecz tego lata coś się zmieniło. Jedna gałka kosztuje teraz 2 monety!",
        ),
        T(
          "Finn still has just his 1 coin.",
          "Finn hat immer noch nur seine 1 Münze.",
          "Finn wciąż ma tylko swoją 1 monetę.",
        ),
        T(
          "Now his coin buys only half a scoop. Finn is sad.",
          "Jetzt bekommt er für seine Münze nur noch eine halbe Kugel. Finn ist traurig.",
          "Teraz jego moneta wystarcza tylko na pół gałki. Finn jest smutny.",
        ),
      ],
      TwoCoinsDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Why did the price go up? Here is the first reason. Everybody in town wants ice cream.",
          "Warum ist der Preis gestiegen? Hier ist der erste Grund. Alle in der Stadt wollen Eis.",
          "Dlaczego cena wzrosła? Oto pierwszy powód. Wszyscy w miasteczku chcą lodów.",
        ),
        T(
          "But the seller can only make so much ice cream.",
          "Aber der Eisverkäufer kann nur so viel Eis machen.",
          "Ale sprzedawca może przygotować tylko ograniczoną ilość lodów.",
        ),
        T(
          "When lots of people want something and there is only so much of it, the seller can ask for more coins.",
          "Wenn viele Leute etwas wollen und es nur so viel davon gibt, kann der Verkäufer mehr Münzen verlangen.",
          "Kiedy wielu ludzi czegoś pragnie, a towaru jest mało, sprzedawca może poprosić o więcej monet.",
        ),
      ],
      ManyWantDiagram,
    ),
    animatedBeat(
      [
        T(
          "Here is the second reason. To make ice cream, the seller needs milk and sugar.",
          "Hier ist der zweite Grund. Für Eis braucht der Eisverkäufer Milch und Zucker.",
          "Oto drugi powód. Do zrobienia lodów sprzedawca potrzebuje mleka i cukru.",
        ),
        T(
          "Now milk and sugar cost the seller more coins than before.",
          "Jetzt kosten Milch und Zucker den Eisverkäufer mehr Münzen als früher.",
          "Teraz mleko i cukier kosztują sprzedawcę więcej monet niż dawniej.",
        ),
        T(
          "So the seller asks for more coins for each scoop, too.",
          "Darum verlangt der Verkäufer auch für jede Kugel mehr Münzen.",
          "Dlatego sprzedawca żąda więcej monet również za każdą gałkę.",
        ),
      ],
      CostsDiagram,
    ),
    animatedBeat(
      [
        T(
          "It is not only ice cream. Bread costs more than before, and shoes do too.",
          "Nicht nur Eis ist teurer geworden. Auch Brot kostet mehr als früher, und Schuhe auch.",
          "To nie tylko lody. Chleb kosztuje więcej niż dawniej i buty także.",
        ),
        T(
          "When most prices in a town go up over time, that has a name. It is called *inflation*.",
          "Wenn die meisten Preise in einer Stadt mit der Zeit steigen, hat das einen Namen. Man nennt es *Inflation*.",
          "Kiedy większość cen w miasteczku z czasem rośnie, ma to swoją nazwę. Nazywa się to *inflacja*.",
        ),
        T(
          "With inflation, the same coin buys less than before.",
          "Bei Inflation kauft dieselbe Münze weniger als früher.",
          "Przy inflacji ta sama moneta kupuje mniej niż wcześniej.",
        ),
      ],
      InflationDiagram,
    ),
    animatedBeat(
      [
        T(
          "Sam is a shoemaker. That means his job is to make shoes. He still gets 10 coins a day for them.",
          "Sam ist Schuhmacher. Das heißt, sein Beruf ist es, Schuhe zu machen. Er bekommt dafür weiter 10 Münzen am Tag.",
          "Sam jest szewcem. Jego pracą jest robienie butów. Wciąż dostaje za nie 10 monet dziennie.",
        ),
        T(
          "A little inflation is normal. Prices go up slowly, and his coins buy only a bit less.",
          "Ein bisschen Inflation ist normal. Die Preise steigen langsam, und seine Münzen kaufen nur etwas weniger.",
          "Niewielka inflacja jest zjawiskiem normalnym. Ceny rosną powoli, a jego monety kupują tylko odrobinę mniej.",
        ),
        T(
          "A lot of inflation is hard. If prices climb fast, his 10 coins buy less and less.",
          "Viel Inflation ist hart. Steigen die Preise schnell, kaufen seine 10 Münzen immer weniger.",
          "Duża inflacja jest bardzo trudna. Gdy ceny szybko rosną, jego 10 monet kupuje coraz mniej.",
        ),
      ],
      SamDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Finn keeps 10 coins in a jar. He is saving them for later.",
          "Finn hebt 10 Münzen in einem Glas auf. Er spart sie für später.",
          "Finn trzyma 10 monet w słoiku. Oszczędza je na później.",
        ),
        T(
          "If prices rise, his 10 coins buy fewer scoops next year than they buy today.",
          "Steigen die Preise, kaufen seine 10 Münzen nächstes Jahr weniger Kugeln als heute.",
          "Gdy ceny rosną, jego 10 monet kupi w przyszłym roku mniej gałek niż dzisiaj.",
        ),
        T(
          "Interest from a bank helps. But it only keeps up if it is as big as the price rise.",
          "Zinsen von der Bank helfen. Aber nur, wenn sie so groß sind wie der Preisanstieg.",
          "Odsetki z banku pomagają. Ale dotrzymują kroku tylko wtedy, gdy są tak duże jak wzrost cen.",
        ),
      ],
      JarDiagram,
    ),
    animatedBeat(
      [
        T(
          "Prices can also fall. When most prices in a town go down over time, it is called *deflation*.",
          "Preise können auch sinken. Wenn die meisten Preise in einer Stadt mit der Zeit sinken, nennt man das *Deflation*.",
          "Ceny mogą także spadać. Kiedy większość cen w mieście z czasem maleje, nazywa się to *deflacją*.",
        ),
        T(
          "That sounds nice, but then the shops earn less money.",
          "Das klingt schön, aber dann verdienen die Läden weniger Geld.",
          "To brzmi miło, ale wtedy sklepy zarabiają mniej pieniędzy.",
        ),
        T(
          "A shop that earns less may have to let some workers go. That means the workers lose their jobs.",
          "Ein Laden, der weniger verdient, muss vielleicht Leute entlassen. Das heißt, sie verlieren ihre Arbeit.",
          "Sklep zarabiający mniej może być zmuszony zwolnić pracowników. To oznacza, że tracą oni pracę.",
        ),
      ],
      DeflationDiagram,
    ),
  ],
  toyIntro: T(
    "Ice cream time machine! Jump ahead some years and pick how fast prices rise. Percent means out of 100: at 10, a 100-coin thing costs 110 next year. Watch what 10 coins buy.",
    "Eis-Zeitmaschine! Spring ein paar Jahre vor und stelle ein, wie schnell die Preise steigen. Prozent heißt von 100: Bei 10 kostet etwas, das 100 Münzen kostet, nächstes Jahr 110. Schau, was 10 Münzen kaufen.",
    "Maszyna czasu lodów! Przeskocz kilka lat w przód i wybierz, jak szybko rosną ceny. Procent oznacza z setki: przy 10 rzecz za 100 monet kosztuje za rok 110. Zobacz, co kupi 10 monet.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "A scoop used to cost 1 coin. Now it costs 2 coins. What does one coin buy now?",
        "Eine Kugel kostete früher 1 Münze. Jetzt kostet sie 2 Münzen. Was kauft eine Münze jetzt?",
        "Kiedyś gałka kosztowała 1 monetę. Teraz kosztuje 2 monety. Co kupi teraz jedna moneta?",
      ),
      options: [
        { text: T("One whole scoop", "Eine ganze Kugel", "Jedną całą gałkę") },
        { text: T("Half a scoop", "Eine halbe Kugel", "Pół gałki"), correct: true },
        { text: T("Two scoops", "Zwei Kugeln", "Dwie gałki") },
      ],
      hint: T(
        "A whole scoop costs 2 coins now. One coin is only half of that, so it buys half a scoop.",
        "Eine ganze Kugel kostet jetzt 2 Münzen. Eine Münze ist nur die Hälfte davon, also bekommst du eine halbe Kugel.",
        "Cała gałka kosztuje teraz 2 monety. Jedna moneta to tylko połowa ceny, więc kupuje pół gałki.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "At the start, 10 coins buy 10 scoops. Set the time machine so that 10 coins buy only half as many. Press Check when you see it.",
        "Am Anfang kaufen 10 Münzen 10 Kugeln. Stelle die Zeitmaschine so ein, dass 10 Münzen nur halb so viele kaufen. Drücke Prüfen, wenn du es siehst.",
        "Na początku 10 monet kupuje 10 gałek. Ustaw maszynę czasu tak, aby 10 monet kupowało tylko połowę z tego. Naciśnij Sprawdź, gdy to zobaczysz.",
      ),
      Widget: HalfScoopsWidget,
      hint: T(
        "Half of 10 scoops is 5 scoops. Look at the scoops next to the price tag. Move the sliders until exactly 5 are bright.",
        "Die Hälfte von 10 Kugeln sind 5 Kugeln. Schau auf die Kugeln neben dem Preisschild. Schiebe die Regler, bis genau 5 hell sind.",
        "Połowa z 10 gałek to 5 gałek. Spójrz na gałki obok ceny. Przesuwaj suwaki, aż dokładnie 5 będzie jasnych.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "The bank gives Finn 2 coins of interest for every 100 coins he saves. But prices rise by 5 coins out of 100. After a year, what is true?",
        "Die Bank gibt Finn für je 100 gesparte Münzen 2 Münzen Zinsen. Aber die Preise steigen um 5 von 100. Was stimmt nach einem Jahr?",
        "Bank daje Finnowi 2 monety odsetek za każde 100 zaoszczędzonych monet. Lecz ceny rosną o 5 na 100. Co jest prawdą po roku?",
      ),
      options: [
        {
          text: T(
            "His savings buy a bit more than before",
            "Seine Ersparnisse kaufen etwas mehr als vorher",
            "Jego oszczędności kupią nieco więcej niż wcześniej",
          ),
        },
        {
          text: T(
            "His savings buy exactly the same as before",
            "Seine Ersparnisse kaufen genau so viel wie vorher",
            "Jego oszczędności kupią dokładnie tyle samo co wcześniej",
          ),
        },
        {
          text: T(
            "His savings buy a bit less than before",
            "Seine Ersparnisse kaufen etwas weniger als vorher",
            "Jego oszczędności kupią nieco mniej niż wcześniej",
          ),
          correct: true,
        },
      ],
      hint: T(
        "His savings grew by 2 out of 100, but prices grew by 5 out of 100. Prices ran faster, so each coin buys less.",
        "Seine Ersparnisse wuchsen um 2 von 100, aber die Preise um 5 von 100. Die Preise waren schneller, also kauft jede Münze weniger.",
        "Oszczędności wzrosły o 2 na 100, ale ceny wzrosły o 5 na 100. Ceny rosły szybciej, więc monety kupują mniej.",
      ),
    },
  ],
  askDad: T(
    "Do you remember what an ice cream or a bus ticket cost when you were my age? What does it cost now? Why do you think it changed?",
    "Weißt du noch, was ein Eis oder ein Busticket kostete, als du so alt warst wie ich? Was kostet es heute? Warum hat sich der Preis wohl geändert?",
    "Czy pamiętasz, ile kosztowały lody albo bilet autobusowy, gdy byłeś w moim wieku? Ile kosztują teraz? Jak myślisz, dlaczego się to zmieniło?",
  ),
  realLife: {
    title: {
      en: "Prices in India",
      de: "Preise in Deutschland",
      pl: "Ceny w Polsce",
    },
    body: {
      en: "In India, the Ministry of Statistics and Programme Implementation (MOSPI) measures inflation through the Consumer Price Index (CPI). The Reserve Bank of India (RBI) has an inflation target of 4 percent, with a tolerance band of 2 percent to 6 percent. When prices rise too quickly, the RBI raises interest rates to help bring inflation back under control.",
      de: "In Deutschland prüft das Statistische Bundesamt (Destatis) jeden Monat die Preise. Es schaut auf Dinge, die Familien kaufen, wie Essen, Miete und Friseur, und rechnet aus, wie stark sich die Preise verändert haben. Die Europäische Zentralbank (EZB) möchte, dass die Preise um etwa 2 Prozent im Jahr steigen. Im Jahr 2022 stiegen sie um etwa 7 Prozent, viel schneller als in den Jahren davor.",
      pl: "W Polsce Główny Urząd Statystyczny (GUS) bada co miesiąc ceny w koszyku dóbr konsumpcyjnych (CPI). Narodowy Bank Polski (NBP) dba o stabilność cen, dążąc do celu inflacyjnego wynoszącego 2,5 procent (z tolerancją od 1,5 do 3,5 procent). W 2022 roku inflacja w Polsce przekroczyła 14 procent, co oznaczało bardzo szybki wzrost cen w sklepach.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Inflation means a persistent rise in the general price level. The inflation rate is the percentage by which the price level rose over a period. Inflation lowers the purchasing power of money.",
          de: "Inflation bezeichnet einen dauerhaften Anstieg des allgemeinen Preisniveaus und mindert die Kaufkraft des Geldes.",
          pl: "Inflacja to trwały wzrost ogólnego poziomu cen w gospodarce, oznaczający spadek siły nabywczej pieniądza.",
        },
        source:
          "https://www.bundesbank.de/en/bundesbank/research/survey-on-consumer-expectations-bop-hh/background-information-850064",
      },
      {
        text: {
          en: "High inflation means money loses purchasing power: income and savings buy less than before.",
          de: "Hohe Inflation schwächt die Kaufkraft von Einkommen und Ersparnissen merklich.",
          pl: "Wysoka inflacja oznacza utratę siły nabywczej: za dochody i oszczędności można kupić mniej dóbr niż wcześniej.",
        },
        source:
          "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/stableprices.en.html",
      },
      {
        text: {
          en: "Inflation can be driven by strong demand (demand-pull) or by rising production costs (cost-push).",
          de: "Inflation kann durch hohe Nachfrage (Demand-Pull) oder gestiegene Produktionskosten (Cost-Push) ausgelöst werden.",
          pl: "Inflacja może wynikać z nadmiernego popytu (inflacja popytowa) lub rosnących kosztów produkcji (inflacja kosztowa).",
        },
        source:
          "https://www.clevelandfed.org/center-for-inflation-research/inflation-explained-your-guide-to-inflation-basics/what-causes-inflation",
      },
      {
        text: {
          en: "Real interest is nominal interest minus inflation; if interest is below inflation, savings lose purchasing power.",
          de: "Der Realzins ist der Zins abzüglich der Inflationsrate; liegt der Zins unter der Inflation, verlieren Ersparnisse an Kaufkraft.",
          pl: "Realna stopa procentowa to oprocentowanie nominalne pomniejszone o inflację; gdy odsetki są niższe od inflacji, oszczędności tracą wartość.",
        },
        source:
          "https://www.bundesbank.de/de/statistiken/geld-und-kapitalmaerkte/zinssaetze-und-renditen/realzinssaetze-auf-bankeinlagen/realzinssaetze-auf-bankeinlagen-772412",
      },
      {
        text: {
          en: "Deflation (falling price level) can cause businesses to postpone investments and lay off workers, triggering an economic slump.",
          de: "Deflation (sinkendes Preisniveau) kann zu Konsumaufschub, sinkenden Unternehmensgewinnen und Entlassungen führen.",
          pl: "Deflacja (spadek poziomu cen) prowadzi do odkładania zakupów, spadku zysków firm i zwolnień pracowników.",
        },
        source:
          "https://www.bundesbank.de/en/service/school-service/animation-videos/price-stability-860064",
      },
      {
        text: {
          en: "National statistical offices (like GUS in Poland, Destatis in Germany, MOSPI in India) measure the Consumer Price Index monthly.",
          de: "Statistische Ämter messen monatlich den Verbraucherpreisindex anhand eines repräsentativen Warenkorbs.",
          pl: "Główny Urząd Statystyczny (GUS) bada co miesiąc wskaźnik cen towarów i usług konsumpcyjnych (CPI) na podstawie koszyka zakupowego.",
        },
        source:
          "https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/_inhalt.html",
      },
      {
        text: {
          en: "Central banks aim for moderate, predictable inflation (e.g. 2% for ECB, 2.5% for NBP, 4% for RBI) to ensure price stability.",
          de: "Zentralbanken streben mittelfristig eine moderate Inflation von etwa 2 % an, um Preisstabilität zu sichern.",
          pl: "Banki centralne dbają o stabilność cen, dążąc do celu inflacyjnego (np. 2,5% dla NBP, 2% dla EBC).",
        },
        source: "https://www.ecb.europa.eu/mopo/strategy/pricestab/html/index.en.html",
      },
    ],
    simplified: [
      {
        en: "Ice cream scoops and rounded integer prices illustrate purchasing power shifts without index mathematics.",
        de: "Eiskugeln und vereinfachte Preise machen Kaufkraftveränderungen ohne komplizierte Indexrechnung greifbar.",
        pl: "Gałki lodów i uproszczone ceny ilustrują zmiany siły nabywczej bez skomplikowanych wskaźników statystycznych.",
      },
      {
        en: "The lesson introduces demand-pull and cost-push drivers at an accessible primary level.",
        de: "Die Lektion erklärt nachfrage- und kostenseitige Preistreiber auf kindgerechte Weise.",
        pl: "Lekcja tłumaczy popytowe i kosztowe przyczyny wzrostu cen w prosty, przystępny sposób.",
      },
      {
        en: "The comparison between bank interest and price growth prepares children for understanding real yields.",
        de: "Der Vergleich zwischen Sparzins und Preisanstieg bereitet das Verständnis realer Erträge vor.",
        pl: "Porównanie oprocentowania lokat ze wzrostem cen przygotowuje do zrozumienia realnej stopy zwrotu.",
      },
    ],
  },
};
