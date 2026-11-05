import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CharteredSealDiagram,
  CompanyFortressDiagram,
  VillageHandloomDiagram,
  IndustrialLoomManchesterDiagram,
  RailwayExportPortDiagram,
} from "./britishinindia.diagrams";
import { BritishInIndiaToy } from "./britishinindia.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <BritishInIndiaToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <BritishInIndiaToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "britishinindia",
  story: [
    animatedBeat(
      [
        T(
          "In 1600, Queen Elizabeth I signed a royal charter creating the British East India Company.",
          "Im Jahr 1600 unterzeichnete Koenigin Elisabeth I. den Freibrief fuer die Britische Ostindien-Kompanie.",
          "W 1600 roku królowa Elżbieta I podpisała przywilej królewski powołujący brytyjską Kompanię Wschodnioindyjską.",
        ),
        T(
          "It was not a nation or government, but a private *chartered company* owned by shareholders.",
          "Es war kein Staat oder Volk, sondern eine private *Handelskompanie* im Besitz von Aktionaeren.",
          "Nie było to państwo ani naród, lecz prywatna *spółka akcyjna* należąca do kupców i inwestorów.",
        ),
        T(
          "Its goal was straightforward: make high profits by trading silk, tea, and spices.",
          "Ihr Ziel war klar: Hohe Gewinne durch den Handel mit Seide, Tee und Gewuerzen erwirtschaften.",
          "Jej cel był prosty: przynosić zyski akcjonariuszom poprzez handel jedwabiem, herbatą i przyprawami.",
        ),
        T(
          "At first, company merchants lived peacefully in coastal ports, paying rent to local rulers.",
          "Zunaechst lebten die Kaufleute friedlich in Kuestenhaefen und zahlten Pacht an die Herrscher.",
          "Początkowo kupcy mieszkali spokojnie w portach nadbrzeżnych, płacąc czynsz lokalnym władcom.",
        ),
      ],
      CharteredSealDiagram,
    ),
    animatedBeat(
      [
        T(
          "Over time, the Company built stone bastions and recruited its own private army of soldiers.",
          "Mit der Zeit baute die Kompanie Steinbastionen und rekrutierte eine eigene Privatarmee.",
          "Z biegiem lat Kompania wzniosła kamienne bastiony i powołała potężną, prywatną armię zaciężną.",
        ),
        T(
          "In 1757, following the Battle of Plassey, the Company took over tax collection in Bengal.",
          "1757 uebernahm die Kompanie nach der Schlacht von Plassey das Recht der Steuereintreibung in Bengalen.",
          "W 1757 roku, po bitwie pod Plassey, Kompania przejęła prawo ściągania podatków w bogatym Bengalu.",
        ),
        T(
          "A private corporation now collected taxes from millions of farming families.",
          "Ein privates Unternehmen trieb nun Steuern von Millionen Bauernfamilien ein.",
          "Prywatna korporacja handlowa pobierała teraz podatki od milionów wiejskich rodzin.",
        ),
        T(
          "Profits flowed across the seas to company headquarters in London rather than staying local.",
          "Die Gewinne flossen ueber die Meere nach London, anstatt vor Ort reinvestiert zu werden.",
          "Zyski i srebro odpływały przez oceany do londyńskiej centrali, zamiast służyć lokalnemu rozwojowi.",
        ),
      ],
      CompanyFortressDiagram,
    ),
    animatedBeat(
      [
        T(
          "For centuries, Indian weavers had created the softest and finest cotton muslin in the world.",
          "Jahrhundertelang hatten indische Weber den weichsten und feinsten Baumwollmusselin gefertigt.",
          "Przez wieki indyjscy rzemieślnicy wytwarzali najdelikatniejszy muślin bawełniany na świecie.",
        ),
        T(
          "Almost every village had skilled weavers working intricate wooden handlooms.",
          "Fast jedes Dorf hatte geschickte Handwerker an hoelzernen Webstuehlen.",
          "W niemal każdej wsi pracowali mistrzowie obsługujący misterne drewniane krosna tkackie.",
        ),
        T(
          "Their handloom textiles were treasured by families from Cairo to Tokyo and Amsterdam.",
          "Ihre Stoffe wurden von Familien von Kairo bis Tokio und Amsterdam geschaetzt.",
          "Ich ręcznie tkane tkaniny były poszukiwane i podziwiane od Kairu po Tokio i Amsterdam.",
        ),
        T(
          "These handcrafted traditions sustained vibrant rural communities and independent artisans.",
          "Dieses Kunsthandwerk ernaehrte ganze Doerfer und unabhaengige Familienbetriebe.",
          "Tradycyjne rzemiosło dawało godne utrzymanie całym osadom i niezależnym rodzinom rzemieślniczym.",
        ),
      ],
      VillageHandloomDiagram,
    ),
    animatedBeat(
      [
        T(
          "In Britain, the Industrial Revolution created steam-powered spinning mills in Manchester.",
          "In Grossbritannien entstanden durch die Industrielle Revolution dampfbetriebene Spinnereien.",
          "W Wielkiej Brytanii rewolucja przemysłowa stworzyła napędzane parą wielkie tkalnie w Manchesterze.",
        ),
        T(
          "To protect these new mills, the British Parliament placed high tariffs on Indian cloth.",
          "Um diese Fabriken zu schuetzen, belegte das britische Parlament indische Stoffe mit hohen Zoellen.",
          "Aby chronić te fabryki, brytyjski parlament nałożył ogromne cła na import indyjskich tkanin.",
        ),
        T(
          "Meanwhile, British factory-made cloth entered India with zero import taxes.",
          "Gleichzeitig durften britische Industriestoffe zollfrei nach Indien eingefuehrt werden.",
          "W tym samym czasie brytyjskie towary fabryczne zalewały Indie bez żadnych ceł przywozowych.",
        ),
        T(
          "Village handlooms could not compete against subsidized steam engines, and many shut down.",
          "Gegen die subventionierten Dampfmaschinen konnten Doerfer nicht bestehen; viele Webstuehle verstummten.",
          "Wiejskie krosna nie mogły sprostać uprzywilejowanym maszynom parowym i tysiące warsztatów upadło.",
        ),
      ],
      IndustrialLoomManchesterDiagram,
    ),
    animatedBeat(
      [
        T(
          "A massive railway network was laid across India, built with iron tracks and steam engines.",
          "Ein riesiges Eisenbahnnetz wurde gebaut, mit eisernen Gleisen und Dampflokomotiven.",
          "W całych Indiach zbudowano gęstą sieć kolejową ze stalowymi torami i parowozami.",
        ),
        T(
          "The main tracks ran from inland cotton fields and coal mines straight to harbor export docks.",
          "Die Hauptstrecken fuehrten von Baumwollfeldern und Minen direkt zu den Ausfuhrhaefen.",
          "Główne trasy wiodły z plantacji bawełny i kopalń prosto do doków morskich portów wywozowych.",
        ),
        T(
          "The system prioritized resource *extraction* rather than local internal prosperity.",
          "Das System diente vor allem dem *Rohstoffexport* und weniger dem Wohlstand im Landesinneren.",
          "Infrastruktura służyła głównie *drenażowi surowców* na eksport, a nie lokalnemu rozwojowi.",
        ),
        T(
          "In 1858, following widespread uprisings, the British Crown took direct control, establishing the *Raj*.",
          "1858 uebernahm die britische Krone nach Aufstaenden die direkte Macht: Die Zeit des *Raj* begann.",
          "W 1858 roku, po wielkim powstaniu, brytyjska korona przejęła bezpośrednią władzę, tworząc tzw. *Raj*.",
        ),
      ],
      RailwayExportPortDiagram,
    ),
  ],
  toyIntro: T(
    "Compare unfair colonial monopoly tariffs with fair reciprocal trade between weavers and factories.",
    "Vergleiche einseitige Kolonialzoelle mit fairen Handelsregeln zwischen Webern und Fabriken.",
    "Porównaj jednostronne cła kolonialne z uczciwym, partnerskim handlem między tkaczami a fabrykami.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What was the British East India Company originally?",
        "Was war die Britische Ostindien-Kompanie urspruenglich?",
        "Czym pierwotnie była brytyjska Kompania Wschodnioindyjska?",
      ),
      options: [
        {
          text: T(
            "A private corporation owned by shareholders seeking trade profits",
            "Ein privates Unternehmen im Besitz von Aktionaeren mit dem Ziel, Handelsgewinne zu erzielen",
            "Prywatną korporacją należącą do akcjonariuszy pragnących osiągać zyski handlowe",
          ),
          correct: true,
        },
        {
          text: T(
            "A charity that provided free bicycles to schoolchildren",
            "Eine Wohltatigkeitsorganisation, die Fahrraeder an Schueler verteilte",
            "Organizacją charytatywną rozdającą rowery dzieciom szkolnym",
          ),
        },
        {
          text: T(
            "An international sports team playing cricket in giant airships",
            "Ein internationales Sportteam, das Cricket auf Luftschiffen spielte",
            "Międzynarodową drużyną grającą w krykieta na wielkich sterowcach",
          ),
        },
      ],
      hint: T(
        "It was created by a royal charter as a joint-stock business enterprise.",
        "Sie entstand durch einen Freibrief als fruehe Aktiengesellschaft.",
        "Powstała na mocy przywileju królewskiego jako wczesna spółka akcyjna.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How did one-sided trade rules harm local village handlooms?",
        "Wie schadeten einseitige Zollregeln den Doerfern und ihren Handwebstuehlen?",
        "W jaki sposób jednostronne zasady handlowe zaszkodziły wiejskiemu tkactwu?",
      ),
      options: [
        {
          text: T(
            "High tariffs taxed Indian cloth exports, while British factory goods entered without taxes",
            "Hohe Zoelle verteuerten indische Exporte, waehrend britische Fabrikwaren zollfrei blieben",
            "Wysokie cła obciążały eksport tkanin indyjskich, podczas gdy brytyjskie towary fabryczne wwożono bez ceł",
          ),
          correct: true,
        },
        {
          text: T(
            "All cotton plants turned into broccoli overnight",
            "Alle Baumwollpflanzen verwandelten sich ueber Nacht in Brokkoli",
            "Wszystkie krzewy bawełny z dnia na dzień zamieniły się w brokuły",
          ),
        },
        {
          text: T(
            "The rivers began flowing backwards into the mountain peaks",
            "Die Fluesse begannen rueckwaerts in die Berge hinaufzufliessen",
            "Wszystkie rzeki nagle zaczęły płynąć pod górę w stronę szczytów",
          ),
        },
      ],
      hint: T(
        "Tariff imbalances made handmade cloth artificially expensive in world markets.",
        "Zollunterschiede machten handgewebte Stoffe auf den Maerkten kuenstlich teuer.",
        "Asymetria celna uczyniła tkaniny rzemieślnicze sztucznie drogimi na rynkach światowych.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Switch trade policy to 'Fair Reciprocal Trade' to balance tariffs and allow weavers to thrive.",
        "Schalte auf 'Faire Handelsbedingungen' um, damit die Dorfweber wieder aufbluehen koennen.",
        "Przełącz politykę na 'Uczciwy handel wzajemny', aby wyrównać cła i dać tkaczom szansę rozwoju.",
      ),
      Widget,
      hint: T(
        "Click the Fair Reciprocal Trade button and tap check.",
        "Klicke auf Faire Handelsbedingungen und tippe auf pruefen.",
        "Kliknij przycisk Uczciwy handel wzajemny i naciśnij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, why is it important for countries today to trade fairly so both sides benefit equally?",
    "Papa, warum ist es fuer Laender heute so wichtig, fair zu handeln, damit beide Seiten gewinnen?",
    "Tato, dlaczego dzisiaj tak ważne jest, aby handel między państwami był sprawiedliwy i korzystny dla obu stron?",
  ),
  realLife: {
    title: {
      en: "Colonial Trade History in Museums",
      de: "Koloniale Handelsgeschichte im Museum",
      pl: "Historia handlu kolonialnego w muzeach",
    },
    body: {
      en: "The Deutsches Historisches Museum (DHM) in Berlin and the Victoria Memorial in Kolkata preserve historical shipping ledgers, textile swatches, and currency tokens from the East India Company era. Historians study these primary records to explain how trade monopolies and tariffs affected global economic development.",
      de: "Das Deutsche Historische Museum in Berlin und das Victoria Memorial in Kolkata bewahren Frachtbuecher, Stoffmuster und Handelsmuenzen aus der Zeit der Ostindien-Kompanie auf. Historiker erforschen diese Originaldokumente, um die Auswirkungen von Monopolen und Zoellen zu verstehen.",
      pl: "Zbiory Muzeum Narodowego i Muzeum Azji i Pacyfiku w Warszawie oraz Victoria Memorial w Kolkacie przechowują zabytkowe rejestry okrętowe, próbki tkanin i monety z czasów Kompanii Wschodnioindyjskiej. Historycy badają te archiwa, aby zrozumieć, jak monopole i jednostronne cła wpłynęły na rozwój światowej gospodarki.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The East India Company was granted an exclusive English trade monopoly charter by Queen Elizabeth I on 31 December 1600.",
          de: "Die Ostindien-Kompanie erhielt am 31. Dezember 1600 ein koenigliches Handelsmonopol von Koenigin Elisabeth I.",
          pl: "Brytyjska Kompania Wschodnioindyjska otrzymała wyłączny przywilej monopolowy na handel azjatycki od królowej Elżbiety I w dniu 31 grudnia 1600 roku.",
        },
        source: "https://www.britannica.com/topic/East-India-Company",
      },
      {
        text: {
          en: "The Company acquired the Diwani (revenue collection rights) over Bengal following the Treaty of Allahabad in 1765.",
          de: "Die Kompanie erlangte 1765 durch den Vertrag von Allahabad das Recht der Steuereinziehung (Diwani) in Bengalen.",
          pl: "Kompania uzyskała prawo poboru podatków gruntowych (Diwani) w Bengalu po traktacie w Allahabadzie w 1765 roku.",
        },
        source: "https://www.britannica.com/event/Treaty-of-Allahabad",
      },
      {
        text: {
          en: "Indian share of world industrial manufacturing dropped from approximately 25 percent in 1750 to under 3 percent by 1900.",
          de: "Indiens Anteil an der weltweiten Industrieproduktion sank von rund 25 Prozent im Jahr 1750 auf unter 3 Prozent im Jahr 1900.",
          pl: "Udział Indii w światowej produkcji przemysłowej spadł z około 25 procent w 1750 roku do poniżej 3 procent w roku 1900.",
        },
        source: "https://www.cambridge.org/core/books/economic-history-of-india-18571947/72F18A370EF5EF4C2161A28A6993CEF7",
      },
      {
        text: {
          en: "The Government of India Act 1858 transferred corporate control from the East India Company directly to the British Crown.",
          de: "Der Government of India Act 1858 uebertrug die Herrschaft von der Handelsgesellschaft direkt auf die britische Krone.",
          pl: "Ustawa Government of India Act z 1858 roku odebrała władzę prywatnej Kompanii i przekazała bezpośrednią kontrolę Koronie Brytyjskiej.",
        },
        source: "https://www.britannica.com/topic/Government-of-India-Act-1858",
      },
      {
        text: {
          en: "Railway construction in colonial India connected interior agricultural hinterlands directly to coastal export ports.",
          de: "Der Eisenbahnbau im kolonialen Indien verband das landwirtschaftliche Binnenland direkt mit den Exportseehaefen.",
          pl: "Budowa kolei w Indiach kolonialnych łączyła rolnicze i surowcowe zaplecze kraju bezpośrednio z portami morskimi służącymi do eksportu surowców.",
        },
        source: "https://www.cambridge.org/core/books/railways-in-modern-india/E341F758C5A3764831B39F29E0436FF0",
      },
    ],
    simplified: [
      {
        en: "We explain the East India Company as a private chartered business corporation driven by shareholder dividends.",
        de: "Wir erklaeren die Ostindien-Kompanie als privates Unternehmen, das Dividenden an Aktionaere zahlte.",
        pl: "Wyjaśniamy rolę Kompanii Wschodnioindyjskiej jako prywatnej spółki akcyjnej wypłacającej zyski udziałowcom.",
      },
      {
        en: "We show how tariff policies affected artisan cottage industries and factory production.",
        de: "Wir zeigen, wie Zollgesetze das Handwerk und Fabriken beeinflussten.",
        pl: "Pokazujemy, w jaki sposób polityka celna wpłynęła na tradycyjne rzemiosło wiejskie oraz fabryki.",
      },
      {
        en: "We emphasize economic mechanisms and trade balance over caricature.",
        de: "Wir betonen oekonomische Mechanismen und Handelsbilanzen statt Klischees.",
        pl: "Podkreślamy mechanizmy ekonomiczne i równowagę handlową zamiast uproszczeń.",
      },
    ],
  },
};
