import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CentralDeskDiagram,
  KnowledgeProblemDiagram,
  ShortagesQueuesDiagram,
  CoreDifferenceDiagram,
  PlanningOutcomeDiagram,
} from "./communism.diagrams";
import { CommunismToy } from "./communism.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <CommunismToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <CommunismToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "communism",
  story: [
    animatedBeat(
      [
        T(
          "In High Valley, leaders decided that private shops and businesses were unfair.",
          "Im Hohen Tal beschlossen die Anführer, dass private Läden und Betriebe ungerecht seien.",
          "W Wysokiej Dolinie przywódcy uznali, że prywatne sklepiki i warsztaty są niesprawiedliwe.",
        ),
        T(
          "They announced that all ovens, fishing nets, and workshops belong to everyone together.",
          "Sie verkündeten, dass alle Öfen, Netze und Werkstätten allen gemeinsam gehören sollten.",
          "Ogłosili, że wszystkie piece, sieci rybackie i warsztaty należą wspólnie do całego państwa.",
        ),
        T(
          "An economic system where the state owns all tools and plans production is called *communism*.",
          "Ein Wirtschaftssystem, in dem der Staat alle Werkzeuge besitzt und die Produktion plant, heißt *Kommunismus*.",
          "Ustrój gospodarczy, w którym państwo posiada wszystkie narzędzia i odgórnie planuje produkcję, nazywamy *komunizmem*.",
        ),
        T(
          "A Central Planning Desk in the capital was created to decide what gets produced and distributed.",
          "Eine zentrale Planungsstelle in der Hauptstadt sollte entscheiden, was hergestellt und verteilt wird.",
          "W stolicy powołano Centralne Biuro Planowania, które miało z góry decydować o produkcji i podziale dóbr.",
        ),
      ],
      CentralDeskDiagram,
    ),
    animatedBeat(
      [
        T(
          "The central desk planned to treat everyone equally: every district gets 33 coats and 33 shoes.",
          "Das Planungsbüro wollte alle gleich behandeln: Jeder Bezirk sollte 33 Mäntel und 33 Schuhe bekommen.",
          "Planiści postanowili potraktować wszystkich równo: każdy okręg otrzyma po 33 płaszcze i 33 pary butów.",
        ),
        T(
          "At first glance, dividing everything equally sounded very fair to the planners.",
          "Auf den ersten Blick klang das gleichmäßige Aufteilen für die Planer sehr gerecht.",
          "Na pierwszy rzut oka taki równy podział wydawał się urzędnikom bardzo sprawiedliwy.",
        ),
        T(
          "However, the distant desk officer had no idea what was actually happening on the ground.",
          "Doch der ferne Planer wusste überhaupt nicht, was vor Ort wirklich geschah.",
          "Jednak urzędnik w odległej stolicy nie miał pojęcia, co dzieje się w terenie.",
        ),
        T(
          "This challenge is known as the *local knowledge problem*.",
          "Diese Herausforderung nennt man das *lokale Wissensproblem*.",
          "To wyzwanie w ekonomii nazywane jest *problemem wiedzy lokalnej*.",
        ),
      ],
      KnowledgeProblemDiagram,
    ),
    animatedBeat(
      [
        T(
          "Mountain District had freezing blizzards and needed 60 heavy coats, but received only 33.",
          "Der Gebirgsbezirk hatte Schneestürme und brauchte 60 dicke Mäntel, bekam aber nur 33.",
          "W Górskim Okręgu szalały zamiecie śnieżne i potrzebowano 60 grubych płaszczy, a przysłano tylko 33.",
        ),
        T(
          "Harbor District had warm sunny weather and received piles of winter coats nobody could wear.",
          "Der Hafenbezirk hatte sonniges Wetter und stapelweise Wintermäntel, die niemand brauchte.",
          "W Okręgu Nadmorskim panowało upalne słońce, więc przysłane zimowe płaszcze leżały bezużytecznie.",
        ),
        T(
          "Empty store shelves and long waiting lines formed because quotas did not match real needs.",
          "Leere Regale und lange Warteschlangen entstanden, weil Quoten nicht zum echten Bedarf passten.",
          "Sklepy świeciły pustkami, a przed drzwiami wiły się kolejki, bo urzędowe plany nie pasowały do rzeczywistości.",
        ),
        T(
          "Without private ownership, workers also lost the motivation to invent new products.",
          "Ohne Privateigentum verloren die Arbeiter zudem den Antrieb, neue Produkte zu erfinden.",
          "Bez własności prywatnej rzemieślnicy stracili też chęć do ulepszania narzędzi i tworzenia nowych rzeczy.",
        ),
      ],
      ShortagesQueuesDiagram,
    ),
    animatedBeat(
      [
        T(
          "In a market economy, price signals and customer choices tell producers what to make.",
          "In einer Marktwirtschaft signalisieren Preise und Kundenwünsche, was gebraucht wird.",
          "W gospodarce rynkowej sygnały cenowe i wybory klientów pokazują wytwórcom, co warto produkować.",
        ),
        T(
          "In a planned economy, a single office tries to guess millions of details, leading to chronic shortages.",
          "In einer Planwirtschaft versucht ein einziges Büro Millionen Details zu erraten, was zu Mangel führt.",
          "W gospodarce planowej jedno biuro próbuje odgadnąć miliony szczegółów, co prowadzi do chronicznych braków.",
        ),
        T(
          "Understanding how information moves in society helps explain why market coordination succeeds.",
          "Zu verstehen wie Information fließt hilft zu erklären, warum Markt-Koordination funktioniert.",
          "Zrozumienie przepływu informacji wyjaśnia, dlaczego koordynacja rynkowa sprawdza się znacznie lepiej.",
        ),
      ],
      CoreDifferenceDiagram,
    ),
    animatedBeat(
      [
        T(
          "Without prices and voluntary trade, planners lack the signals needed to know what people really value.",
          "Ohne Preise und freiwilligen Handel fehlen Planern die Signale um zu wissen, was Menschen wirklich schätzen.",
          "Bez cen i dobrowolnego handlu planiści nie mają pojęcia, czego ludzie w danej chwili naprawdę potrzebują.",
        ),
        T(
          "Economic systems that trust people to make their own choices adapt faster and serve daily needs better.",
          "Wirtschaftssysteme, die Menschen eigene Entscheidungen zutrauen, passen sich schneller an und versorgen den Alltag besser.",
          "Gospodarki, które pozwalają ludziom na swobodne wybory, reagują błyskawicznie i lepiej służą codziennym potrzebom.",
        ),
      ],
      PlanningOutcomeDiagram,
    ),
  ],
  toyIntro: T(
    "Step into the Central Planning Desk and discover the local knowledge problem across three districts.",
    "Tritt in die Plankommission ein und entdecke das lokale Wissensproblem über drei Bezirke.",
    "Zajrzyj do Centralnego Biura Planowania i zobacz, jak brak informacji prowadzi do pustych półek w okręgach.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the main idea of a communist planned economy?",
        "Was ist die Grundidee einer kommunistischen Planwirtschaft?",
        "Jaka jest główna cecha gospodarki centralnie planowanej?",
      ),
      options: [
        {
          text: T(
            "The state or community owns all factories and tools, and a central desk decides production quotas",
            "Der Staat besitzt alle Fabriken und Werkzeuge, und ein zentrales Büro bestimmt Produktionsquoten",
            "Państwo posiada wszystkie fabryki i warsztaty, a urzędnicy w stolicy wyznaczają odgórne limity produkcji",
          ),
          correct: true,
        },
        {
          text: T(
            "Every person buys five different rocket ships",
            "Jeder Mensch kauft sich fünf verschiedene Raketenschiffe",
            "Każdy mieszkaniec kupuje po pięć rakiet kosmicznych",
          ),
        },
        {
          text: T(
            "There are no schools, hospitals, or roads anywhere",
            "Es gibt nirgendwo Schulen, Krankenhäuser oder Straßen",
            "Nigdzie na świecie nie buduje się szkół ani szpitali",
          ),
        },
      ],
      hint: T(
        "In communism, private businesses are replaced by state-directed central planning.",
        "Im Kommunismus werden Privatbetriebe durch staatlich gelenkte Planwirtschaft ersetzt.",
        "W gospodarce nakazowej prywatne firmy zastępowane są państwowymi planami gospodarczymi.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why do central planning offices struggle to supply what citizens actually need?",
        "Warum haben Planungsbüros Schwierigkeiten, den echten Bedarf der Bürger zu decken?",
        "Dlaczego urzędy planowania nie potrafią zapewnić tego, czego ludzie naprawdę potrzebują?",
      ),
      options: [
        {
          text: T(
            "Because a distant central office cannot know the daily changing needs and tastes of millions of people",
            "Weil ein fernes Zentralbüro die täglichen Bedürfnisse und Wünsche von Millionen Menschen nicht kennen kann",
            "Ponieważ odległe biuro nie zna codziennych, zmieniających się potrzeb i gustów milionów mieszkańców",
          ),
          correct: true,
        },
        {
          text: T(
            "Because pens run out of blue ink in government offices",
            "Weil den Stiften in Behörden die blaue Tinte ausgeht",
            "Bo w urzędowych długopisach kończy się niebieski tusz",
          ),
        },
        {
          text: T(
            "Because everyone only wants to wear wooden shoes",
            "Weil jeder Mensch ausschließlich Holzschuhe tragen möchte",
            "Ponieważ wszyscy ludzie chcą chodzić tylko w drewniakach",
          ),
        },
      ],
      hint: T(
        "The local knowledge problem explains that decentralized prices coordinate information better than one office.",
        "Das Wissensproblem zeigt, dass dezentrale Preise Information besser koordinieren als ein Zentralbüro.",
        "Problem wiedzy lokalnej dowodzi, że wolne ceny przekazują informacje skuteczniej niż pojedyncze biuro.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Why did the central planning desk produce the wrong amounts of coats and shoes for the districts?",
        "Warum plante das zentrale Planungsbüro die falschen Mengen an Mänteln und Schuhen?",
        "Dlaczego centralne biuro wyprodukowało niewłaściwe ilości butów i płaszczy dla poszczególnych regionów?",
      ),
      Widget,
      hint: T(
        "Recall what happens when a distant office tries to guess local needs without market feedback.",
        "Erinnere dich, was passiert, wenn ein fernes Büro den lokalen Bedarf ohne Rückmeldung erraten muss.",
        "Przypomnij sobie, co dzieje się, gdy odległy urząd próbuje zgadywać lokalne potrzeby bez informacji z rynku.",
      ),
    },
  ],
  askDad: T(
    "Papa, why is it so hard for one central office to decide how much food and clothing an entire country needs every day?",
    "Papa, warum ist es so schwer für ein einziges Büro zu entscheiden, wie viel Essen und Kleidung ein Land täglich braucht?",
    "Tato, dlaczego pojedynczemu urzędowi tak trudno jest przewidzieć, ile jedzenia i ubrań potrzebuje cały kraj?",
  ),
  realLife: {
    title: {
      en: "The Planning Commission and Public Sector in India",
      de: "Die Planwirtschaft in der DDR",
      pl: "Gospodarka nakazowo-rozdzielcza w PRL",
    },
    body: {
      en: "After independence in 1947, India adopted five-year economic plans led by the national Planning Commission. While heavy industry was built, central bureaucracy and state monopolies led to chronic shortages and slow growth. In 2014, India abolished the Planning Commission and replaced it with NITI Aayog to foster decentralized policy, competition, and dynamic market enterprise.",
      de: "Von 1949 bis 1989 hatte die DDR eine Planwirtschaft. Der Staat besaß alle Betriebe (VEB) und legte Preise fest. Grundnahrungsmittel waren billig, aber Bürger warteten bis zu 15 Jahre auf ein Auto (Trabant) und Südfrüchte fehlten oft.",
      pl: "W latach 1944-1989 w Polsce funkcjonowała narzucona gospodarka nakazowo-rozdzielcza. Wszelkie fabryki i sklepy należały do państwa, a Państwowa Komisja Planowania Gospodarczego (PKPG) ustalała odgórne plany i ceny. Ponieważ urzędnicy nie znali prawdziwych potrzeb ludzi, sklepy świeciły pustkami, wprowadzono kartki na mięso i cukier, a w kolejkach stało się godzinami. W 1989 r. Polska porzuciła ten system i powróciła do wolnego rynku.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Economic historians analyze post-war command economies, such as the Polish People's Republic (PRL) and East Germany (GDR), which operated through multi-year central production plans and state monopolies.",
          de: "Die Deutsche Demokratische Republik (DDR) betrieb eine staatlich gelenkte Planwirtschaft mit Fünfjahresplänen und der Staatlichen Plankommission.",
          pl: "W Polskiej Rzeczypospolitej Ludowej (PRL) gospodarką kierowała Państwowa Komisja Planowania Gospodarczego (PKPG), która ustalała odgórne plany wieloletnie, limity produkcyjne i urzędowe ceny.",
        },
        source: "https://ipn.gov.pl",
      },
      {
        text: {
          en: "Archival records document chronic shortages of consumer goods, pervasive queues, and formal rationing card systems across socialist economies.",
          de: "Historische Quellen dokumentieren anhaltenden Mangel an Konsumgütern, lange Wartezeiten und technologische Stagnation in der DDR.",
          pl: "Archiwa Instytutu Pamięci Narodowej (IPN) dokumentują chroniczny niedobór towarów w PRL, wielogodzinne kolejki komitetowe oraz system kartek żywnościowych (reglamentację).",
        },
        source: "https://ipn.gov.pl",
      },
      {
        text: {
          en: "Nobel laureate Friedrich Hayek identified the 'local knowledge problem', explaining that vital economic information is dispersed among millions of individuals and cannot be aggregated by a central bureaucracy.",
          de: "Ökonomen wie Friedrich Hayek analysierten das 'lokale Wissensproblem' als unüberwindbare Grenze zentraler Wirtschaftsplanung.",
          pl: "Laureat Nagrody Nobla Friedrich Hayek sformułował pojęcie 'problemu wiedzy', dowodząc, że wiedza o potrzebach i zasobach jest rozproszona wśród milionów ludzi i żadne centralne biuro nie zdoła jej zgromadzić.",
        },
        source: "https://www.nobelprize.org/prizes/economic-sciences/1974/hayek/facts/",
      },
      {
        text: {
          en: "Hungarian economist János Kornai coined the term 'shortage economy' to describe systemic supply failures inherent in soft-budget state-owned enterprises.",
          de: "János Kornai prägte den Begriff der 'Mangelwirtschaft' zur theoretischen Erklärung der Versorgungsengpässe in sozialistischen Staaten.",
          pl: "Węgierski ekonomista János Kornai opisał to zjawisko jako 'gospodarkę niedoboru', wynikającą z braku dyscypliny finansowej w państwowych przedsiębiorstwach.",
        },
        source: "https://global.oup.com",
      },
      {
        text: {
          en: "The historic transition of 1989/1990 restored private property rights, abolished central price controls, and sparked rapid consumer market revitalization in Central Europe.",
          de: "Mit der Wiedervereinigung 1990 und der Währungsunion übernahm Ostdeutschland die Soziale Marktwirtschaft der Bundesrepublik.",
          pl: "Uchwalenie Ustawy o działalności gospodarczej z 1988 r. (tzw. ustawa Wilczka) oraz reformy 1989/1990 przywróciły wolność gospodarczą, znosząc monopol państwa i likwidując kolejki.",
        },
        source: "https://isap.sejm.gov.pl",
      },
    ],
    simplified: [
      {
        en: "We illustrate central planning through a distant desk allocating coats to mountain and harbor districts.",
        de: "Wir illustrieren Planwirtschaft durch ein fernes Büro, das Mäntel auf Gebirge und Hafen verteilt.",
        pl: "Przedstawiamy planowanie nakazowe na przykładzie odległego biura przydzielającego płaszcze dla gór i portu.",
      },
      {
        en: "We explain the local knowledge problem without jargon using weather differences and clothing needs.",
        de: "Wir erklären das Wissensproblem anschaulich durch Wetterunterschiede und Kleiderbedarf.",
        pl: "Tłumaczymy problem wiedzy bez trudnego żargonu, pokazując różnice w pogodzie i potrzebach mieszkańców.",
      },
      {
        en: "We use waiting lines and empty shelves to show the real-world consequence of missing price signals.",
        de: "Wir nutzen Schlangen und leere Regale, um die Folgen fehlender Markt-Preissignale zu veranschaulichen.",
        pl: "Używamy kolejek i pustych półek, by pokazać dzieciom realne skutki braku rynkowych cen i konkurencji.",
      },
    ],
  },
};
