import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  MusclePlowDiagram,
  WindWaterMillDiagram,
  BoilingKettlePistonDiagram,
  JamesWattEngineDiagram,
  SteamLocomotiveTrainDiagram,
} from "./tools.diagrams";
import { ToolsToy } from "./tools.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <ToolsToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <ToolsToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "tools",
  story: [
    animatedBeat(
      [
        T(
          "For thousands of years, every stone cut, field plowed, and wall built was limited by muscle power.",
          "Jahrtausende lang war jeder gehauene Stein und jeder gepfluegte Acker durch Muskelkraft begrenzt.",
          "Przez tysiące lat każdy ociosany kamień, zaorane pole i wzniesiony mur były ograniczone siłą mięśni.",
        ),
        T(
          "Farmers pushed heavy wooden plows by hand or hitched oxen and horses to pull through thick clay.",
          "Bauern schoben schwere Holzpfluege von Hand oder spannten Ochsen und Pferde vor das Gespann.",
          "Rolnicy pchali ciężkie drewniane pługi własnymi rękami lub zaprzęgali woły i konie do pracy w gliniastej ziemi.",
        ),
        T(
          "Even with animals, work was slow and exhausting. When muscles grew tired, all work had to stop.",
          "Selbst mit Tieren war die Arbeit muehsam. Wenn die Kraefte schwanden, stand alles still.",
          "Nawet ze zwierzętami praca była powolna i wyczerpująca. Gdy brakowało sił, wszystko musiało stanąć w miejscu.",
        ),
      ],
      MusclePlowDiagram,
    ),
    animatedBeat(
      [
        T(
          "Clever builders learned to capture wind for sailing ships and water currents to turn mill wheels.",
          "Kluge Baumeister nutzten den Wind fuer Segelschiffe und Wasserstroeme fuer Muehlraeder.",
          "Pomysłowi rzemieślnicy nauczyli się łapać wiatr w żagle statków i wykorzystywać nurt rzek do obracania kół młyńskich.",
        ),
        T(
          "Waterwheels ground grain into flour and sawed timber, but they depended completely on the weather.",
          "Wasserraeder mahlten Korn zu Mehl und saegten Holz, doch sie hingen voellig vom Wetter ab.",
          "Koła wodne mieliły ziarno na mąkę i przecierały drewno, lecz ich praca zależała całkowicie od pogody.",
        ),
        T(
          "In freezing winters rivers iced over, and during dry summers water levels dropped to a trickle.",
          "Im eisigen Winter fror der Fluss zu, und im trockenen Sommer floss oft nur ein kleines Rinnsal.",
          "W mroźne zimy rzeki zamarzały pod grubą warstwą lodu, a w upalne lata zamieniały się w wyschnięte koryta.",
        ),
      ],
      WindWaterMillDiagram,
    ),
    animatedBeat(
      [
        T(
          "Inventors noticed that heating water in a closed pot creates tremendous expansion pressure.",
          "Erfinder bemerkten, dass erhitztes Wasser in einem geschlossenen Kessel gewaltigen Druck erzeugt.",
          "Wynalazcy zauważyli, że podgrzewanie wody w zamkniętym zbiorniku wytwarza ogromne ciśnienie rozprężania.",
        ),
        T(
          "When water boils into steam, it expands to take up over one thousand times more volume than liquid.",
          "Wenn Wasser zu Dampf kocht, dehnt es sich auf das ueber tausendfache Volumen aus.",
          "Gdy woda wrze i zmienia się w parę, jej objętość rośnie ponadtysiąckrotnie w porównaniu z cieczą.",
        ),
        T(
          "Thomas Newcomen built an early *steam engine* to pump flooding water out of deep coal mines.",
          "Thomas Newcomen baute eine fruehe *Dampfmaschine*, um Grubenwasser aus Bergwerken zu pumpen.",
          "Thomas Newcomen skonstruował wczesną *maszynę parową*, by wypompowywać wodę zalewającą kopalnie węgla.",
        ),
      ],
      BoilingKettlePistonDiagram,
    ),
    animatedBeat(
      [
        T(
          "In Scotland, James Watt dramatically improved the design with a separate cooling condenser.",
          "In Schottland verbesserte James Watt den Entwurf entscheidend durch einen getrennten Kondensator.",
          "W Szkocji James Watt radykalnie ulepszył konstrukcję, dodając oddzielny skraplacz do chłodzenia pary.",
        ),
        T(
          "Instead of only pumping up and down, Watt designed gears to produce continuous *rotary motion*.",
          "Statt nur auf und ab zu pumpen, erzeugte Watts Maschine eine gleichmaessige *Drehbewegung*.",
          "Zamiast jedynie ruchu posuwistego w górę i w dół, Watt zaprojektował przekładnie dające ciągły *ruch obrotowy*.",
        ),
        T(
          "Now a steam engine could turn spinning wheels and factory shafts day and night without stopping.",
          "Nun konnte eine Dampfmaschine Spinnraeder und Fabrikwellen Tag und Nacht zuverlaessig drehen.",
          "Od tej pory maszyna parowa mogła napędzać wrzeciona tkackie i wały fabryczne dzień i noc bez wytchnienia.",
        ),
      ],
      JamesWattEngineDiagram,
    ),
    animatedBeat(
      [
        T(
          "Steam power sparked the *Industrial Revolution*, reshaping manufacturing, travel, and cities.",
          "Die Dampfkraft entfachte die *Industrielle Revolution* und veraenderte Handwerk, Reisen und Staedte.",
          "Energia pary zapoczątkowała *rewolucję przemysłową*, odmieniając fabryki, podróże i rozwój miast.",
        ),
        T(
          "Steam locomotives carried grain, coal, and passengers across vast countries in just hours.",
          "Dampflokomotiven transportierten Getreide, Kohle und Fahrgaeste in wenigen Stunden ueber Land.",
          "Parowozy przewoziły zboże, węgiel i pasażerów przez całe kraje w zaledwie kilka godzin.",
        ),
        T(
          "Humanity had stepped beyond muscle power into an era of tireless mechanical energy.",
          "Die Menschheit liess die reine Muskelkraft hinter sich und betrat das Zeitalter der Maschinen.",
          "Ludzkość wykroczyła poza ograniczenia siły mięśni, wkraczając w erę niestrudzonej energii mechanicznej.",
        ),
      ],
      SteamLocomotiveTrainDiagram,
    ),
  ],
  toyIntro: T(
    "Choose a power source and run the steam engine with coal and water to produce continuous power.",
    "Waehle eine Kraftquelle und betreibe die Dampfmaschine mit Kohle und Wasser fuer dauerhafte Kraft.",
    "Wybierz źródło zasilania i uruchom maszynę parową z węglem i wodą, aby wytworzyć ciągłą moc.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did waterwheels sometimes stop working before steam engines were invented?",
        "Warum standen Wasserraeder manchmal still, bevor Dampfmaschinen erfunden wurden?",
        "Dlaczego koła wodne czasami przestawały działać, zanim wynaleziono maszyny parowe?",
      ),
      options: [
        {
          text: T(
            "Rivers could freeze in winter or dry up during hot summers",
            "Fluesse konnten im Winter zufrieren oder im Sommer austrocknen",
            "Rzeki mogły zamarznąć zimą lub wyschnąć w czasie upalnego lata",
          ),
          correct: true,
        },
        {
          text: T(
            "Fish refused to let the water turn the wooden blades",
            "Fische weigerten sich, das Wasser an die Holzschaufeln zu lassen",
            "Ryby odmawiały przepływu wody przez drewniane łopatki",
          ),
        },
        {
          text: T(
            "The wheels had to be tucked into bed for an afternoon nap",
            "Die Raeder mussten sich fuer einen Mittagsschlaf ins Bett legen",
            "Koła młyńskie musiały położyć się do łóżka na popołudniową drzemkę",
          ),
        },
      ],
      hint: T(
        "Waterwheels depended on river flow, which changed with seasons and weather.",
        "Wasserraeder hingen vom Fluss ab, der sich je nach Jahreszeit veraenderte.",
        "Koła wodne zależały od poziomu wody w rzece, który zmieniał się wraz z porami roku i pogodą.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What key improvement did James Watt make to the steam engine?",
        "Welche wichtige Verbesserung erfand James Watt fuer die Dampfmaschine?",
        "Jakiego kluczowego ulepszenia dokonał James Watt w maszynie parowej?",
      ),
      options: [
        {
          text: T(
            "He created a separate condenser and converted piston strokes into rotary motion",
            "Er baute einen getrennten Kondensator und wandelte Hubbewegungen in Drehbewegung um",
            "Dodał oddzielny skraplacz i przekształcił ruch posuwisty tłoka w ciągły ruch obrotowy",
          ),
          correct: true,
        },
        {
          text: T(
            "He painted the boilers purple so they ran faster on Tuesdays",
            "Er strich die Kessel lila an, damit sie dienstags schneller liefen",
            "Pomalował kotły na fioletowo, by działały szybciej we wtorki",
          ),
        },
        {
          text: T(
            "He replaced coal with scoops of vanilla ice cream",
            "Er ersetzte die Kohle durch Loeffel voller Vanilleeis",
            "Zastąpił węgiel gałkami lodów waniliowych",
          ),
        },
      ],
      hint: T(
        "Watt made the engine far more efficient and capable of turning factory wheels.",
        "Watt machte die Maschine viel sparsamer und liess sie Fabrikraeder drehen.",
        "Watt uczynił maszynę znacznie wydajniejszą i zdolną do ciągłego napędzania fabryk.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Switch to the Steam Engine, add coal to the furnace, and fill the boiler with water.",
        "Waehle die Dampfmaschine, gib Kohle in den Ofen und fuelle den Kessel mit Wasser.",
        "Przełącz na Maszynę parową, dorzuć węgiel do pieca i napełnij kocioł wodą.",
      ),
      Widget,
      hint: T(
        "Click Steam Engine, activate both coal fuel and boiler water, then tap check.",
        "Klicke auf Dampfmaschine, aktiviere Kohle und Wasser, und tippe auf pruefen.",
        "Wybierz Maszynę parową, włącz węgiel i wodę, a następnie kliknij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, how did people travel long distances before steam trains and cars were invented?",
    "Papa, wie sind die Menschen weite Strecken gereist, bevor es Dampfzuege und Autos gab?",
    "Tato, jak ludzie podróżowali na dalekie odległości, zanim wynaleziono pociągi parowe i samochody?",
  ),
  realLife: {
    title: {
      en: "Historic Steam Railways in Germany",
      de: "Historische Dampfeisenbahnen in Deutschland",
      pl: "Zabytkowe parowozy w Wolsztynie i na Śląsku",
    },
    body: {
      en: "In Germany, preserved steam locomotives still climb the scenic Harz mountains on the Harzer Schmalspurbahnen, and historic engines are maintained at the Eisenbahnmuseum Bochum-Dahlhausen. These giant machines demonstrate how boiling water and hot coal transformed transport across continents.",
      de: "In Deutschland dampfen historische Lokomotiven noch heute auf den Harzer Schmalspurbahnen durch die Berge, und im Eisenbahnmuseum Bochum-Dahlhausen kann man Dampfriesen bestaunen. Diese Maschinen zeigen eindrucksvoll, wie heisses Wasser und Kohle das Reisen fuer immer veraendert haben.",
      pl: "W Wolsztynie w Wielkopolsce działa słynna parowozownia obsługująca planowe pociągi pasażerskie z zabytkowymi parowozami. W Muzeum Kolejnictwa w Jaworzynie Śląskiej oraz w Zabytkowej Kopalni Srebra w Tarnowskich Górach dzieci mogą zobaczyć gigantyczne maszyny parowe, które zrewolucjonizowały transport i przemysł, uwalniając ludzi od morderczej pracy mięśni.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Thomas Newcomen built the first practical atmospheric steam engine in 1712 for draining flooded coal mines.",
          de: "Thomas Newcomen baute 1712 die erste praxistaugliche atmosphaerische Dampfmaschine zur Entwaesserung von Kohlegruben.",
          pl: "Thomas Newcomen zbudował w 1712 roku pierwszą praktyczną atmosferyczną maszynę parową do odwadniania kopalń węgla.",
        },
        source: "https://www.britannica.com/technology/Newcomen-steam-engine",
      },
      {
        text: {
          en: "James Watt patented his separate condenser steam engine in 1769, drastically cutting fuel consumption.",
          de: "James Watt liess sich 1769 seine Dampfmaschine mit getrenntem Kondensator patentieren und senkte den Brennstoffverbrauch drastisch.",
          pl: "James Watt opatentował w 1769 roku maszynę parową z oddzielnym skraplaczem, radykalnie obniżając zużycie węgla.",
        },
        source: "https://www.britannica.com/biography/James-Watt",
      },
      {
        text: {
          en: "Watt adapted his engine in 1781 to produce continuous rotary motion, enabling factories to run machinery.",
          de: "Watt entwickelte seine Maschine 1781 so weiter, dass sie eine gleichmaessige Drehbewegung erzeugte und Fabriken antrieb.",
          pl: "Watt udoskonalił maszynę w 1781 roku do wytwarzania ciągłego ruchu obrotowego, co umożliwiło mechanizację fabryk.",
        },
        source: "https://www.sciencemuseum.org.uk/objects-and-stories/james-watt-and-steam-engine",
      },
      {
        text: {
          en: "George Stephenson's Rocket won the Rainhill Trials in 1829, establishing steam locomotives on public railways.",
          de: "George Stephensons Lokomotive Rocket gewann 1829 die Rainhill Trials und begruendete das oeffentliche Eisenbahnzeitalter.",
          pl: "Parowóz Rakieta (Rocket) George'a Stephensona zwyciężył w próbach w Rainhill w 1829 roku, otwierając erę kolei parowej.",
        },
        source: "https://www.railwaymuseum.org.uk/objects-and-stories/stephensons-rocket",
      },
      {
        text: {
          en: "The Adler steam locomotive inaugurated Germany's first passenger railway between Nuremberg and Fuerth in 1835.",
          de: "Die Dampflokomotive Adler eroeffnete 1835 die erste deutsche Personenbahnstrecke zwischen Nuernberg und Fuerth.",
          pl: "Pierwsza maszyna parowa na ziemiach polskich ruszyła w Tarnowskich Górach w 1788 roku, odwadniając kopalnię kruszców Fryderyk.",
        },
        source: "https://kopalniasrebra.pl/historia-maszyny-parowej/",
      },
    ],
    simplified: [
      {
        en: "We explain mechanical energy through the simple expansion of boiling water into steam.",
        de: "Wir erklaeren mechanische Energie an der Dehnung von kochendem Wasser zu Dampf.",
        pl: "Tłumaczymy energię mechaniczną poprzez zjawisko rozprężania się gotującej wody w parę.",
      },
      {
        en: "We contrast weather-dependent waterwheels with continuous fuel-powered steam engines.",
        de: "Wir stellen wetterabhaengige Wasserraeder der zuverlaessigen Kraft von Dampfmaschinen gegenueber.",
        pl: "Porównujemy zależne od pogody koła wodne z niezawodną mocą maszyn parowych.",
      },
      {
        en: "We highlight James Watt's breakthrough in turning pumping strokes into rotary wheel motion.",
        de: "Wir heben James Watts Durchbruch hervor, Hubbewegungen in Drehbewegungen umzuwandeln.",
        pl: "Podkreślamy przełom Jamesa Watta polegający na zamianie ruchu posuwistego w ciągły ruch obrotowy.",
      },
    ],
  },
};
