import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CouncilDiagram,
  PotDiagram,
  ProblemDiagram,
  RulesDiagram,
  WellDiagram,
} from "./whygovernment.diagrams";
import { WhyGovernmentToy } from "./whygovernment.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <WhyGovernmentToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <WhyGovernmentToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "whygovernment",
  story: [
    animatedBeat(
      [
        T(
          "Ripple Town started as a few small huts by the river.",
          "Ripple Town begann als ein paar kleine Hütten am Fluss.",
          "Ripple Town zaczynało jako kilka małych chat rybackich nad brzegiem rzeki.",
        ),
        T(
          "As more families arrived, the village grew bigger and busier.",
          "Als mehr Familien ankamen, wurde das Dorf größer und geschäftiger.",
          "Gdy przybywało nowych rodzin, osada stawała się coraz większa i bardziej gwarna.",
        ),
        T(
          "Carts bumped into each other on narrow unpaved tracks.",
          "Kutschen stießen auf engen unbefestigten Wegen zusammen.",
          "Ciężkie wozy zderzały się ze sobą na wąskich, nieutwardzonych dróżkach.",
        ),
        T(
          "The town's shared drinking well cracked because nobody felt responsible for fixing shared stones.",
          "Der gemeinsame Dorfbrunnen bekam Risse, weil sich niemand für die gemeinsamen Steine verantwortlich fühlte.",
          "Wspólna studnia ze świeżą wodą pękła, bo nikt nie czuł się odpowiedzialny za naprawę wspólnych kamieni.",
        ),
      ],
      WellDiagram,
    ),
    animatedBeat(
      [
        T(
          "Everyone took good care of their own doorstep.",
          "Jeder kümmerte sich gut um seine eigene Haustür.",
          "Każdy starannie dbał o próg własnego domu.",
        ),
        T(
          "People swept their own paths and repaired their own roofs.",
          "Die Menschen fegten ihre eigenen Wege und reparierten ihre eigenen Dächer.",
          "Ludzie zamiatali własne ścieżki i naprawiali dachy swoich stodół.",
        ),
        T(
          "But nobody felt responsible for fixing the main road.",
          "Aber niemand fühlte sich verantwortlich, die Hauptstraße zu reparieren.",
          "Lecz nikt nie czuł się odpowiedzialny za naprawę głównego traktu w miasteczku.",
        ),
        T(
          "Shared spaces started to fall apart because everyone waited for someone else.",
          "Gemeinsame Räume begannen auseinanderzufallen, weil jeder auf jemand anderen wartete.",
          "Wspólna przestrzeń niszczała, ponieważ każdy czekał, aż to ktoś inny się nią zajmie.",
        ),
      ],
      ProblemDiagram,
    ),
    animatedBeat(
      [
        T(
          "Otto gathered all the villagers at the central square.",
          "Otto versammelte alle Dorfbewohner auf dem zentralen Platz.",
          "Otto zwołał wszystkich mieszkańców na naradę na rynku miasteczka.",
        ),
        T(
          "He said: 'We need to make a plan together for the things we all use.'",
          "Er sagte: 'Wir müssen gemeinsam einen Plan für die Dinge machen, die wir alle nutzen.'",
          "Powiedział: 'Musimy wspólnie stworzyć plan dla rzeczy, z których korzystamy wszyscy razem.'",
        ),
        T(
          "'We need traffic rules so our carts do not crash.'",
          "'Wir brauchen Verkehrsregeln, damit unsere Kutschen nicht zusammenstoßen.'",
          "'Potrzebujemy zasad poruszania się, aby wozy nie wpadały na siebie na zakrętach.'",
        ),
        T(
          "The villagers agreed to form a council to organize these rules.",
          "Die Dorfbewohner stimmten zu, einen Rat zu bilden, um diese Regeln zu organisieren.",
          "Mieszkańcy jednogłośnie zgodzili się powołać radę, by ustalić jasne reguły i dbać o porządek.",
        ),
      ],
      CouncilDiagram,
    ),
    animatedBeat(
      [
        T(
          "The council suggested creating a shared town pot.",
          "Der Rat schlug vor, einen gemeinsamen Dorftopf anzulegen.",
          "Rada zaproponowała utworzenie wspólnej kasy miasteczka.",
        ),
        T(
          "Every family puts a few coins into the pot each month.",
          "Jede Familie legt jeden Monat ein paar Münzen in den Topf.",
          "Każda rodzina dorzuca co miesiąc kilka monet do wspólnego funduszu.",
        ),
        T(
          "The shared pot pays a town mason to repair the well and fix bridges.",
          "Der gemeinsame Topf bezahlt einen Dorfmaurer, um den Brunnen und Brücken zu reparieren.",
          "Ze wspólnej kasy opłacany jest mularz, który naprawia kamienie studni i wzmacnia mosty.",
        ),
        T(
          "Now clean drinking water flows into every bucket, and the roads are safe.",
          "Jetzt fließt sauberes Trinkwasser in jeden Eimer und die Straßen sind sicher.",
          "Teraz czysta woda pitna płynie do każdego wiadra, a drogi są równe i bezpieczne.",
        ),
      ],
      PotDiagram,
    ),
    animatedBeat(
      [
        T(
          "Without shared rules and public coordination, shared resources fall into disrepair.",
          "Ohne gemeinsame Regeln und öffentliche Koordination verfallen gemeinsame Ressourcen.",
          "Bez wspólnych reguł i koordynacji wspólne dobra szybko popadają w zaniedbanie i ruinę.",
        ),
        T(
          "This problem is called the *tragedy of the commons* or a *coordination failure*.",
          "Dieses Problem nennt man *Tragik der Allmende* oder *Koordinationsversagen*.",
          "Zjawisko to nazywamy *tragedią wspólnego pastwiska* lub *błędem koordynacji*.",
        ),
        T(
          "A *government* is the group of people chosen to organize shared *rules*, resolve disputes, and maintain *public goods* that no single family can build alone.",
          "Eine *Regierung* ist die Gruppe von Menschen, die gewählt wird, um gemeinsame *Regeln* zu organisieren, Streitigkeiten zu lösen und *öffentliche Güter* zu erhalten, die keine Familie allein bauen kann.",
          "A *rząd* lub *władza samorządowa* to grupa ludzi wybrana do ustalania *reguł*, rozstrzygania sporów i dbania o *dobra publiczne*, których żadna rodzina nie zbudowałaby w pojedynkę.",
        ),
      ],
      RulesDiagram,
    ),
  ],
  toyIntro: T(
    "Set the town rules slider so carts can deliver food smoothly and the shared water well stays clean.",
    "Stelle den Dorfregler-Schieber so ein, dass Kutschen Lebensmittel reibungslos liefern können und der gemeinsame Wasserbrunnen sauber bleibt.",
    "Ustaw suwak reguł tak, aby wozy mogły płynnie dowozić żywność, a wspólna studnia pozostała czysta.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why does a village need a government?",
        "Warum braucht ein Dorf eine Regierung?",
        "Dlaczego miasteczko lub państwo potrzebuje rządu i władz samorządowych?",
      ),
      options: [
        {
          text: T(
            "To coordinate shared rules and maintain public goods that no single family can build alone",
            "Um gemeinsame Regeln zu koordinieren und öffentliche Güter zu erhalten, die keine Familie allein bauen kann",
            "Aby ustalać wspólne reguły i utrzymywać dobra publiczne, których żadna rodzina nie stworzy sama",
          ),
          correct: true,
        },
        {
          text: T(
            "To make sure nobody ever plays outside",
            "Damit niemand jemals draußen spielt",
            "Aby zabronić dzieciom zabawy na świeżym powietrzu",
          ),
        },
        {
          text: T(
            "To hide all the coins in the river",
            "Um alle Münzen im Fluss zu verstecken",
            "Aby wrzucić wszystkie monety na dno rzeki",
          ),
        },
      ],
      hint: T(
        "A government helps solve coordination failures and looks after shared resources.",
        "Eine Regierung hilft, Koordinationsprobleme zu lösen und sich um gemeinsame Ressourcen zu kümmern.",
        "Rząd pomaga rozwiązywać problemy koordynacji i dbać o wspólne dobra.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What happens when nobody is responsible for shared spaces like roads and wells?",
        "Was passiert, wenn niemand für gemeinsame Räume wie Straßen und Brunnen verantwortlich ist?",
        "Co się dzieje, gdy nikt nie odpowiada za wspólne przestrzenie, takie jak drogi i studnie?",
      ),
      options: [
        {
          text: T(
            "They fall into disrepair because of the tragedy of the commons",
            "Sie verfallen wegen der Tragik der Allmende",
            "Popadają w ruinę i zniszczenie z powodu tragedii wspólnego pastwiska",
          ),
          correct: true,
        },
        {
          text: T(
            "They automatically repair themselves with magic",
            "Sie reparieren sich automatisch durch Magie",
            "Naprawiają się same za pomocą czarodziejskiej różdżki",
          ),
        },
        {
          text: T(
            "They turn into chocolate cake",
            "Sie verwandeln sich in Schokoladenkuchen",
            "Same zamieniają się w wielki czekoladowy tort",
          ),
        },
      ],
      hint: T(
        "When everyone expects someone else to fix shared things, nobody fixes them.",
        "Wenn jeder erwartet, dass jemand anderes gemeinsame Dinge repariert, repariert sie niemand.",
        "Gdy każdy czeka, aż ktoś inny naprawi wspólne rzeczy, nikt ich nie naprawia.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Find the balanced rules setting where carts drive smoothly and the well stays clean.",
        "Finde die ausgewogene Regeleinstellung, bei der Kutschen reibungslos fahren und der Brunnen sauber bleibt.",
        "Ustaw zrównoważony poziom reguł, przy którym wozy jeżdżą płynnie, a studnia jest czysta.",
      ),
      Widget,
      hint: T(
        "Move the slider to the green balanced zone in the middle.",
        "Bewege den Schieberegler in die grüne ausgewogene Zone in der Mitte.",
        "Przesuń suwak do środka, w stronę zielonej strefy równowagi.",
      ),
    },
  ],
  askDad: T(
    "Papa, what are some important things our city looks after that our family could not build on our own?",
    "Papa, was sind wichtige Dinge, um die sich unsere Stadt kümmert, die unsere Familie nicht allein bauen könnte?",
    "Tato, o jakie ważne rzeczy dba nasze miasto, których nasza rodzina nie mogłaby zbudować sama?",
  ),
  realLife: {
    title: {
      en: "Local Governance and Panchayats in India",
      de: "Gemeinderäte in Deutschland",
      pl: "Samorząd terytorialny i zadania publiczne w Polsce",
    },
    body: {
      en: "In India, local governance is organized under the 73rd and 74th Constitutional Amendments through Gram Panchayats in villages and Municipal Corporations in cities. Local councils manage public goods that no single home can build alone: paving local roads, supplying clean piped drinking water, organizing garbage collection, and maintaining streetlights.",
      de: "In deutschen Städten und Gemeinden koordinieren Gemeinderäte und Ordnungsämter Straßenreparaturen, Straßenbeleuchtung, sauberes Trinkwasser, Feuerwehren und Müllabfuhr für alle Bewohner.",
      pl: "W Polsce podstawową jednostką samorządu jest gmina. Rada gminy oraz wójt, burmistrz lub prezydent miasta odpowiadają za zadania własne gminy: budowę i utrzymanie dróg gminnych, doprowadzanie czystej wody pitnej, kanalizację, oświetlenie ulic oraz szkoły podstawowe, zaspokajając zbiorowe potrzeby mieszkańców.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Constitutional local self-government articles assign fundamental public welfare tasks and infrastructure coordination to democratically elected municipal councils.",
          de: "Die Gemeindeordnungen der Bundesländer weisen Städten und Gemeinden das Recht der kommunalen Selbstverwaltung für alle örtlichen Angelegenheiten zu.",
          pl: "Konstytucja Rzeczypospolitej Polskiej (art. 16) stanowi, że ogół mieszkańców jednostek zasadniczego podziału terytorialnego stanowi z mocy prawa wspólnotę samorządową, która uczestniczy w sprawowaniu władzy publicznej.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
      {
        text: {
          en: "Municipal statutes obligate local authorities to maintain public utilities, primary education, local road networks, and public health infrastructure.",
          de: "Gemeinden sind zur Erfüllung von Pflichtaufgaben wie Trinkwasserversorgung, Abwasserbeseitigung, Brandschutz und Schulbau gesetzlich verpflichtet.",
          pl: "Ustawa o samorządzie gminnym (art. 7) nakłada na gminę obowiązek zaspokajania zbiorowych potrzeb wspólnoty, w tym ładu przestrzennego, dróg, wodociągów, kanalizacji, ochrony zdrowia i edukacji publicznej.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19900160095",
      },
      {
        text: {
          en: "Economic public finance theory identifies public goods by non-excludability and non-rivalry, showing that free markets underprovide them without collective funding.",
          de: "Finanzwissenschaftliche Grundlagen definieren öffentliche Güter über Nicht-Ausschließbarkeit und Nicht-Rivalität im Konsum.",
          pl: "Teoria finansów publicznych definiuje dobra publiczne jako dobra charakteryzujące się brakiem rywalizacji w konsumpcji i niemożnością wykluczenia z użytkowania, wymagające finansowania ze środków publicznych.",
        },
        source: "https://stat.gov.pl",
      },
      {
        text: {
          en: "State and federal public finance laws empower local authorities to collect municipal taxes and user fees to fund local infrastructure maintenance.",
          de: "Das Grundgesetz (Art. 106 Abs. 6) garantiert den Gemeinden das Aufkommen der Realsteuern (Gewerbe- und Grundsteuer) zur Finanzierung ihrer Aufgaben.",
          pl: "Ustawa o dochodach jednostek samorządu terytorialnego reguluje źródła finansowania gmin, w tym udziały w podatkach dochodowych (PIT i CIT) oraz podatki i opłaty lokalne.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20032031966",
      },
      {
        text: {
          en: "Democratic constitutions declare that all public power originates from the sovereign people and is exercised directly or through elected representatives.",
          de: "Artikel 20 des Grundgesetzes bestimmt: 'Alle Staatsgewalt geht vom Volke aus. Sie wird vom Volke in Wahlen und Abstimmungen ausgeübt.'",
          pl: "Art. 4 Konstytucji RP deklaruje, że władza zwierzchnia w Rzeczypospolitej Polskiej należy do Narodu, który sprawuje ją przez swoich przedstawicieli lub bezpośrednio.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
    ],
    simplified: [
      {
        en: "We explain the tragedy of the commons through a cracked town well and bumpy roads so children understand why coordination is necessary.",
        de: "Wir erklären die Tragik der Allmende anhand eines rissigen Brunnens und holpriger Straßen, damit Kinder den Sinn von Koordination verstehen.",
        pl: "Tłumaczymy tragedię wspólnego pastwiska na przykładzie pękniętej studni i wyboistych dróg, aby dzieci rozumiały potrzebę wspólnej koordynacji.",
      },
      {
        en: "We present government as a helpful coordination mechanism rather than diving into partisan politics or heavy bureaucracy.",
        de: "Wir vermitteln Regierung als nützliches Kooperationswerkzeug statt parteipolitischer Streitereien oder bürokratischer Hürden.",
        pl: "Przedstawiamy władze publiczne jako pomocne narzędzie współpracy mieszkańców, unikając sporów partyjnych i zawiłej biurokracji.",
      },
      {
        en: "We frame public rules as safety agreements that keep community life smooth rather than restrictive prohibitions.",
        de: "Wir verstehen Regeln als schützende Absprachen für ein reibungsloses Miteinander und nicht als bloße Verbote.",
        pl: "Ukazujemy reguły prawne jako umowy chroniące bezpieczeństwo i ułatwiające wspólne życie, a nie uciążliwe zakazy.",
      },
    ],
  },
};
