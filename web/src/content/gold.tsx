import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CentralBankVaultDiagram,
  GoldVaultDiagram,
  SafeHarborDiagram,
  StormyCrisisDiagram,
  SunnyCalmDiagram,
} from "./gold.diagrams";
import { GoldToy } from "./gold.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <GoldToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <GoldToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "gold",
  story: [
    animatedBeat(
      [
        T(
          "Captain Coral takes Otto deep inside the sturdy harbor stone vault.",
          "Kapitän Coral nimmt Otto mit in das Innere des stabilen Hafentresors.",
          "Kapitan Coral zabiera Otto w głąb potężnego kamiennego skarbca w porcie.",
        ),
        T(
          "Inside rests a heavy bar of pure yellow *gold*.",
          "Darin liegt ein schwerer Barren aus reinem gelbem *Gold*.",
          "W środku spoczywa ciężka sztaba czystego, żółtego *złota*.",
        ),
        T(
          "This gold was mined hundreds of years ago and survived many sea voyages.",
          "Dieses Gold wurde vor hunderten von Jahren abgebaut und überstand viele Seereisen.",
          "Złoto to zostało wydobyte setki lat temu i przetrwało niezliczone morskie wyprawy.",
        ),
        T(
          "Because gold does not rust, burn, or decay, it acts as a permanent *store of value*.",
          "Weil Gold nicht rostet, verbrennt oder zerfällt, dient es als dauerhafter *Wertspeicher*.",
          "Ponieważ złoto nie rdzewieje, nie pali się ani nie niszczeje, służy jako trwały *magazyn wartości*.",
        ),
      ],
      GoldVaultDiagram,
    ),
    animatedBeat(
      [
        T(
          "When the economy is calm and sunny, villagers invest in workshops.",
          "Wenn die Wirtschaft ruhig und sonnig ist, investieren die Dorfbewohner in Werkstätten.",
          "Gdy w gospodarce panuje spokój i dobra pogoda, mieszkańcy inwestują w warsztaty.",
        ),
        T(
          "They buy flour for bakeries and timber for fishing boats.",
          "Sie kaufen Mehl für Bäckereien und Holz für Fischerboote.",
          "Kupują mąkę dla piekarni i drewno na łodzie rybackie.",
        ),
        T(
          "Active businesses produce bread, jobs, and healthy coin profits.",
          "Aktive Betriebe schaffen Brot, Arbeitsplätze und gesunde Münzgewinne.",
          "Działające firmy wytwarzają chleb, dają pracę i przynoszą stałe zyski w monetach.",
        ),
        T(
          "During calm times, people prefer growing businesses over resting gold bars.",
          "In ruhigen Zeiten bevorzugen Menschen wachsende Betriebe gegenüber ruhendem Gold.",
          "W spokojnych czasach ludzie wolą rozwijające się firmy od leżących bezczynnie sztabek złota.",
        ),
      ],
      SunnyCalmDiagram,
    ),
    animatedBeat(
      [
        T(
          "Suddenly, economic storms arrive with unpredictable price swings.",
          "Plötzlich ziehen wirtschaftliche Stürme mit unvorhersehbaren Preissprüngen auf.",
          "Nagle nadchodzą gospodarcze burze z nieprzewidywalnymi skokami cen.",
        ),
        T(
          "Paper bank notes wobble in purchasing power and businesses suffer losses.",
          "Banknoten aus Papier schwanken in ihrer Kaufkraft und Betriebe erleiden Verluste.",
          "Papierowe banknoty tracą siłę nabywczą, a firmy notują straty.",
        ),
        T(
          "Villagers worry that their paper savings might buy fewer groceries next year.",
          "Die Menschen sorgen sich, dass ihre Ersparnisse nächstes Jahr weniger einkaufen können.",
          "Mieszkańcy obawiają się, że za swoje oszczędności kupią w przyszłym roku znacznie mniej jedzenia.",
        ),
        T(
          "In times of fear, savers look for something solid that cannot vanish.",
          "In Zeiten der Verunsicherung suchen Sparer nach etwas Festem, das nicht verschwindet.",
          "W czasach niepokoju oszczędzający szukają czegoś trwałego, co nie straci wartości.",
        ),
      ],
      StormyCrisisDiagram,
    ),
    animatedBeat(
      [
        T(
          "People convert some savings into gold, seeking a *safe harbor*.",
          "Die Menschen tauschen einen Teil ihrer Ersparnisse in Gold und suchen einen *sicheren Hafen*.",
          "Ludzie wymieniają część oszczędności na złoto, szukając *bezpiecznej przystani*.",
        ),
        T(
          "Because there is only a limited amount of gold in the world, demand lifts its price.",
          "Weil es auf der Welt nur eine begrenzte Menge Gold gibt, hebt die Nachfrage den Preis.",
          "Ponieważ ilość złota na świecie jest ograniczona, rosnący popyt podbija jego cenę.",
        ),
        T(
          "Gold does not pay dividends or bake bread, but it reliably protects wealth.",
          "Gold zahlt keine Dividenden und backt kein Brot, aber es schützt Vermögen verlässlich.",
          "Złoto nie wypłaca dywidend ani nie piecze chleba, lecz niezawodnie chroni majątek.",
        ),
        T(
          "When the storm passes, savers still have their purchasing power intact.",
          "Wenn der Sturm vorüberzieht, haben die Sparer ihre Kaufkraft behalten.",
          "Gdy burza mija, oszczędzający zachowują nienaruszoną siłę nabywczą.",
        ),
      ],
      SafeHarborDiagram,
    ),
    animatedBeat(
      [
        T(
          "Even modern nations keep massive reserves of physical gold in underground vaults.",
          "Sogar moderne Staaten lagern riesige Reserven an physischem Gold in Tresoren.",
          "Nawet współczesne państwa przechowują olbrzymie rezerwy fizycznego złota w podziemnych skarbcach.",
        ),
        T(
          "Central banks hold thousands of tonnes to guarantee stability through centuries.",
          "Zentralbanken halten tausende Tonnen, um Stabilität über Jahrhunderte zu sichern.",
          "Banki centralne gromadzą setki ton kruszcu, aby gwarantować stabilność na pokolenia.",
        ),
        T(
          "No matter what new currencies emerge, gold remains a globally respected foundation.",
          "Gleich welche neuen Währungen entstehen, Gold bleibt ein weltweit geschätzter Anker.",
          "Bez względu na to, jakie nowe waluty powstaną, złoto pozostaje szanowaną kotwicą na całym świecie.",
        ),
        T(
          "Understanding gold helps us understand how trust and scarcity protect our future.",
          "Gold zu verstehen hilft uns zu begreifen, wie Vertrauen und Knappheit unsere Zukunft schützen.",
          "Zrozumienie roli złota pozwala pojąć, jak zaufanie i rzadkość chronią naszą przyszłość.",
        ),
      ],
      CentralBankVaultDiagram,
    ),
  ],
  toyIntro: T(
    "Switch between calm and stormy climates, and move coins into the vault to protect them.",
    "Wechsle zwischen ruhigem und stürmischem Wetter und sichere Münzen im Tresor.",
    "Przełączaj między spokojną pogodą a burzliwym kryzysem i chowaj monety do skarbca, by je chronić.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why has gold been trusted as a store of value for thousands of years?",
        "Warum gilt Gold seit Jahrtausenden als verlässlicher Wertspeicher?",
        "Dlaczego złoto cieszy się zaufaniem jako magazyn wartości od tysięcy lat?",
      ),
      options: [
        {
          text: T(
            "It is scarce, chemically durable, and cannot be printed by governments",
            "Es ist knapp, chemisch beständig und kann nicht von Regierungen gedruckt werden",
            "Jest rzadkie, niezwykle trwałe chemicznie i rządy nie mogą go dodrukować",
          ),
          correct: true,
        },
        {
          text: T(
            "It turns into sweet juice when placed in water",
            "Es verwandelt sich in süßen Saft, wenn man es ins Wasser legt",
            "Zamienia się w słodki sok po zanurzeniu w wodzie",
          ),
        },
        {
          text: T(
            "It grows quickly on special mountain bushes",
            "Es wächst schnell an besonderen Bergbüschen",
            "Szybko rośnie na specjalnych krzewach w górach",
          ),
        },
      ],
      hint: T(
        "Gold never rusts and cannot be created out of thin air.",
        "Gold rostet niemals und kann nicht aus dem Nichts erschaffen werden.",
        "Złoto nigdy nie rdzewieje i nie można go stworzyć z niczego.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is gold called a safe harbor during an economic storm?",
        "Warum wird Gold während einer Wirtschaftskrise ein sicherer Hafen genannt?",
        "Dlaczego złoto bywa nazywane bezpieczną przystanią podczas kryzysu gospodarczego?",
      ),
      options: [
        {
          text: T(
            "Because people buy gold to protect their savings when paper money wobbles",
            "Weil Menschen Gold kaufen, um ihr Erspartes zu schützen, wenn Geld schwankt",
            "Ponieważ ludzie kupują złoto, aby uchronić oszczędności, gdy waluty tracą na wartości",
          ),
          correct: true,
        },
        {
          text: T(
            "Because ships use gold bars as giant anchors",
            "Weil Schiffe Goldbarren als riesige Anker benutzen",
            "Ponieważ statki używają sztabek złota jako kotwic",
          ),
        },
        {
          text: T(
            "Because gold bars can swim on water",
            "Weil Goldbarren auf dem Wasser schwimmen können",
            "Ponieważ sztabki złota potrafią unosić się na wodzie",
          ),
        },
      ],
      hint: T(
        "People run to a safe harbor to protect their ships from crashing in a storm.",
        "Menschen steuern einen sicheren Hafen an, um Schiffe vor dem Sturm zu schützen.",
        "Statki wpływają do bezpiecznej przystani, aby uchronić się przed zniszczeniem podczas sztormu.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "A sudden economic storm threatens paper values. Store at least 3 coins in the Gold Vault to protect them.",
        "Ein plötzlicher Sturm droht. Sichere mindestens 3 Münzen im Goldtresor zum Schutz.",
        "Nagła burza gospodarcza zagraża papierowym oszczędnościom. Schowaj co najmniej 3 monety do skarbca złota, by je chronić.",
      ),
      Widget,
      hint: T(
        "Switch to Stormy Crisis, add 3 coins to the vault, and tap check.",
        "Wechsle zu Stürmische Krise, lege 3 Münzen in den Tresor und tippe auf prüfen.",
        "Przełącz na Burzliwy kryzys, dodaj 3 monety do skarbca i naciśnij Sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, why do people trust shiny gold even when paper money and bank accounts change value?",
    "Papa, warum vertrauen Menschen glänzendem Gold, selbst wenn Papiergeld und Konten ihren Wert ändern?",
    "Tato, dlaczego ludzie tak bardzo ufają złotu, nawet gdy banknoty i konta bankowe tracą na wartości?",
  ),
  realLife: {
    title: {
      en: "India's gold heritage and central bank reserves",
      de: "Das Gold der Deutschen Bundesbank",
      pl: "Rezerwy złota Narodowego Banku Polskiego",
    },
    body: {
      en: "In India, gold has deep cultural significance as a trusted family asset during festivals like Dhanteras and weddings. The Reserve Bank of India (RBI) holds over 800 tonnes of gold in national reserves. To help citizens invest safely without holding physical metal, the Government of India and RBI also introduced Sovereign Gold Bonds (SGBs).",
      de: "Die Deutsche Bundesbank hält über 3.300 Tonnen Gold in Frankfurt, London und New York als nationale Reserve. Viele deutsche Sparer bewahren zudem kleine Goldbarren oder Münzen zu Hause oder im Bankschließfach als Schutz gegen hohe Inflation auf.",
      pl: "Narodowy Bank Polski (NBP) posiada w swoich rezerwach ponad 400 ton złota, z czego duża część przechowywana jest w skarbcach w Warszawie oraz w Bank of England w Londynie. W Polsce wielu obywateli kupuje certyfikowane sztabki i monety bulionowe jako zabezpieczenie oszczędności przed inflacją i zawirowaniami geopolitycznymi.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Central banks hold substantial gold reserves as a strategic anchor of national financial stability and sovereign creditworthiness.",
          de: "Die Deutsche Bundesbank hält mit über 3.300 Tonnen eine der weltweit größten Goldreserven zur Sicherung nationaler Stabilität.",
          pl: "Narodowy Bank Polski (NBP) systematycznie powiększa rezerwy złota (przekraczające 400 ton), budując strategiczną poduszkę bezpieczeństwa kraju.",
        },
        source: "https://nbp.pl/rezerwy-dewizowe-i-zloto/",
      },
      {
        text: {
          en: "Central banking authorities maintain strict security protocols, physical vault audits, and independent inventory assays for bullion assets.",
          de: "Die Bundesbank führt regelmäßige Stichproben, Barrenprüfungen und Inventuren ihrer Goldbestände durch.",
          pl: "NBP przeprowadza rygorystyczne audyty, kontrole wagi i próby czystości sztab złota przechowywanych w skarbcach krajowych i zagranicznych.",
        },
        source: "https://nbp.pl/publikacje/raport-roczny/",
      },
      {
        text: {
          en: "Historical monetary institutions show that gold functioned as universal money across centuries because it is scarce, durable, and chemically inert.",
          de: "Geldmuseen der Notenbanken dokumentieren die historische Rolle von Gold als universelles Wertaufbewahrungsmittel.",
          pl: "Centrum Pieniądza NBP im. Sławomira S. Skrzypka prezentuje historyczną ewolucję kruszców i rolę złota jako niezmiennego miernika wartości.",
        },
        source: "https://www.cpnbp.pl/",
      },
      {
        text: {
          en: "Global central banking studies classify gold as a premier safe-haven asset with negligible default risk during systemic financial crises.",
          de: "Europäische Notenbanken stufen Gold als Reserveaktivum ohne Gegenparteirisiko in Krisenzeiten ein.",
          pl: "Europejski Bank Centralny i NBP klasyfikują złoto jako aktywum rezerwowe wolne od ryzyka kredytowego emitenta (brak ryzyka niewypłacalności).",
        },
        source:
          "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_money.en.html",
      },
      {
        text: {
          en: "Financial supervisory authorities advise savers that physical gold does not generate cash flow or interest, functioning primarily as a hedge.",
          de: "Verbraucherzentralen und Aufsichtsbehörden weisen darauf hin, dass Gold keine Zinsen abwirft, sondern der Risikoabsicherung dient.",
          pl: "Komisja Nadzoru Finansowego (KNF) przypomina, że złoto lokacyjne nie przynosi odsetek ani dywidend, lecz służy dywersyfikacji i ochronie kapitału.",
        },
        source: "https://www.knf.gov.pl/dla_konsumenta/ostrzezenia_publiczne",
      },
    ],
    simplified: [
      {
        en: "We explain gold through an ancient unrusted bar in a harbor stone vault to make chemical durability tangible for an 8-year-old.",
        de: "Wir erklären Gold anhand eines uralten Barrens im Steintresor, um chemische Beständigkeit für Kinder greifbar zu machen.",
        pl: "Tłumaczymy właściwości złota na przykładzie nierdzewiejącej sztaby w kamiennym skarbcu, by dziecko zrozumiało jego niezwykłą trwałość.",
      },
      {
        en: "We contrast productive businesses that create goods with inert gold that preserves purchasing power.",
        de: "Wir vergleichen produktive Betriebe, die Werte schaffen, mit ruhendem Gold, das Kaufkraft bewahrt.",
        pl: "Porównujemy działające firmy wytwarzające towary z bezpiecznym złotem, które chroni siłę nabywczą.",
      },
      {
        en: "We clarify the safe harbor metaphor by linking economic uncertainty to sailing ships seeking protected harbor walls.",
        de: "Wir veranschaulichen den Begriff des sicheren Hafens mit Segelschiffen, die Schutz vor dem Sturm suchen.",
        pl: "Wyjaśniamy pojęcie bezpiecznej przystani przez analogię do statków chroniących się w porcie przed sztormem.",
      },
    ],
  },
};
