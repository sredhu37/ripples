import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  EquityShareDiagram,
  FinnAtSchoolDiagram,
  LeoAtFountainDiagram,
  MiraPartnershipDiagram,
  ProductiveAssetDiagram,
  WaffleCrowdDiagram,
  WaffleIronNeedDiagram,
  WeeklyProfitSplitDiagram,
} from "./equity.diagrams";
import { EquityPartnerToy } from "./equity.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <EquityPartnerToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <EquityPartnerToy lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "equity",
  story: [
    animatedBeat(
      [
        T(
          "On Monday morning, Finn had to sit at his desk in school for reading and numbers.",
          "Am Montagmorgen saß Finn in der Schule und übte Lesen und Rechnen.",
          "W poniedziałek rano Finn musiał siedzieć w ławce szkolnej i uczyć się czytania.",
        ),
        T(
          "As an employee, if you do not show up, you earn zero pay.",
          "Als Angestellter verdient man kein Geld, wenn man nicht zur Arbeit erscheint.",
          "Jako pracownik, jeśli nie przyjdziesz do pracy, nie zarobisz ani grosza.",
        ),
      ],
      FinnAtSchoolDiagram,
    ),
    animatedBeat(
      [
        T(
          "But Finn's ice cream cart was not sitting idle in a shed!",
          "Aber Finns Eiswagen stand keineswegs tatenlos im Schuppen herum!",
          "Ale wózek z lodami Finna wcale nie stał bezczynnie w szopie!",
        ),
        T(
          "Leo rolled the cart to the town fountain and scooped sweet treats for hungry villagers.",
          "Leo schob den Wagen zum Marktbrunnen und verkaufte Eis an hungrige Bürger.",
          "Leo zaprowadził wózek pod miejską fontannę i nakładał lody mieszkańcom.",
        ),
      ],
      LeoAtFountainDiagram,
    ),
    animatedBeat(
      [
        T(
          "Even while Finn was studying, coins were dropping into the cart's wooden register.",
          "Während Finn im Unterricht saß, füllte sich die Kasse des Wagens mit Münzen.",
          "Nawet gdy Finn uczył się w klasie, monety wpadały do drewnianej kasetki wózka.",
        ),
        T(
          "This is *passive income*. The cart is a productive *asset* that earns without Finn's hands!",
          "Das ist *passives Einkommen*. Der Wagen ist ein *Vermögenswert*, der für Finn arbeitet!",
          "To jest *dochód pasywny*. Wózek to cenny *majątek*, który zarabia bez rąk Finna!",
        ),
      ],
      ProductiveAssetDiagram,
    ),
    animatedBeat(
      [
        T(
          "Customers loved the ice cream, but everyone wanted warm, crunchy waffle cones.",
          "Die Kunden liebten das Eis, aber alle wünschten sich warme Waffeltüten.",
          "Klienci uwielbiali lody, lecz wszyscy pytali o ciepłe, chrupiące gofry.",
        ),
        T(
          "A cast-iron waffle press cost 10 coins, but Finn had already spent his savings on the cart.",
          "Ein Waffeleisen kostete 10 Münzen, doch Finns Ersparnisse steckten im Wagen.",
          "Gofrownica kosztowała 10 monet, lecz Finn wydał już oszczędności na wózek.",
        ),
      ],
      WaffleIronNeedDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "His friend Mira had 10 saved coins in her pocket and believed in the business.",
          "Seine Freundin Mira hatte 10 gesparte Münzen und glaubte an den Erfolg.",
          "Jego przyjaciółka Mira miała w kieszeni 10 monet i wierzyła w ten biznes.",
        ),
        T(
          "Instead of lending the coins, Mira offered to invest and become a *co-owner*!",
          "Statt das Geld nur zu leihen, wollte Mira investieren und *Mitinhaberin* werden!",
          "Zamiast pożyczać monety, Mira zaproponowała, że zostanie *współwłaścicielką*!",
        ),
      ],
      MiraPartnershipDiagram,
    ),
    animatedBeat(
      [
        T(
          "In exchange for her 10 coins, Mira received a 50% *share* in the ice cream cart.",
          "Für ihre 10 Münzen erhielt Mira einen 50%-igen *Anteil* am Eiswagen.",
          "W zamian za 10 monet Mira otrzymała 50% *udział* w całym wózku z lodami.",
        ),
        T(
          "Owning a slice of a productive business is called *equity*.",
          "Den Anteil an einem produktiven Unternehmen nennt man *Eigenkapital*.",
          "Posiadanie części przynoszącego dochód przedsiębiorstwa to własny *kapitał*.",
        ),
      ],
      EquityShareDiagram,
    ),
    animatedBeat(
      [
        T(
          "They bought the waffle iron, and the sweet vanilla aroma filled the entire town square!",
          "Sie kauften das Waffeleisen, und herrlicher Vanilleduft erfüllte den ganzen Platz!",
          "Kupili gofrownicę, a słodki zapach wanilii wypełnił cały rynek miasteczka!",
        ),
        T(
          "Crowds lined up around the block, and waffle cone sales tripled in a single week.",
          "Lange Schlangen bildeten sich, und die Verkäufe verdreifachten sich in einer Woche.",
          "Ustawiały się długie kolejki, a sprzedaż potroiła się w ciągu zaledwie tygodnia.",
        ),
      ],
      WaffleCrowdDiagram,
    ),
    animatedBeat(
      [
        T(
          "Every Friday, after paying Leo his wages and buying cream, Finn and Mira split the profit.",
          "Jeden Freitag, nach Abzug von Leos Lohn und Zutaten, teilen Finn und Mira den Gewinn.",
          "W każdy piątek, po opłaceniu pensji Leo i śmietanki, Finn i Mira dzielą zysk po równo.",
        ),
        T(
          "Both partners earn rewarding coins together as proud co-owners of a growing *asset*!",
          "Beide Partner verdienen gemeinsam gutes Geld als stolze Mitinhaber eines *Vermögens*!",
          "Oboje wspólnicy zarabiają razem pieniądze jako dumni współwłaściciele rosnącego *majątku*!",
        ),
      ],
      WeeklyProfitSplitDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how Finn and Mira share profits from their waffle cart based on their 50% equity!",
    "Erkunde, wie Finn und Mira den Gewinn ihres Wagens zu je 50% untereinander aufteilen!",
    "Zobacz, jak Finn i Mira dzielą zyski ze swojego wózka po 50% na podstawie udziałów!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is Finn's ice cream cart called a productive asset?",
        "Warum nennt man Finns Eiswagen einen produktiven Vermögenswert?",
        "Dlaczego wózek z lodami Finna nazywamy produktywnym majątkiem?",
      ),
      options: [
        {
          text: T(
            "It is a valuable tool that earns income even when the owner is not working hands-on.",
            "Er ist ein wertvolles Werkzeug, das Geld einbringt, auch ohne dass der Inhaber selbst arbeitet.",
            "To wartościowe narzędzie, które przynosi dochód, nawet gdy właściciel nie pracuje osobiście.",
          ),
          correct: true,
        },
        {
          text: T(
            "It is something cold and sweet that you eat on hot summer days.",
            "Es ist etwas Kaltes und Süßes, das man an heißen Sommertagen isst.",
            "To coś zimnego i słodkiego, co zjada się w upalne dni lata.",
          ),
        },
      ],
      hint: T(
        "An asset is something valuable that you own which can generate income or value over time.",
        "Ein Vermögenswert ist etwas Wertvolles in deinem Besitz, das über die Zeit Ertrag abwirft.",
        "Majątek to wartościowa rzecz w Twoim posiadaniu, która z czasem wytwarza dochód lub wartość.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why does Mira receive half of the cart's weekly profit even though she does not scoop ice cream?",
        "Warum bekommt Mira die Hälfte des wöchentlichen Gewinns, obwohl sie kein Eis verteilt?",
        "Dlaczego Mira otrzymuje połowę tygodniowego zysku, chociaż sama nie nakłada lodów?",
      ),
      options: [
        {
          text: T(
            "She bought an equity share in the business, making her a co-owner entitled to split the profits.",
            "Sie hat einen Geschäftsanteil gekauft und ist als Mitinhaberin am Gewinn beteiligt.",
            "Wykupiła udział w firmie, stając się współwłaścicielką uprawnioną do podziału zysków.",
          ),
          correct: true,
        },
        {
          text: T(
            "She eats more ice cream cones than all the other villagers in Ripple Town.",
            "Sie isst mehr Eiswaffeln als alle anderen Bewohner in Ripple Town.",
            "Zjada więcej gofrów niż wszyscy inni mieszkańcy miasteczka.",
          ),
        },
      ],
      hint: T(
        "Equity represents ownership. Co-owners share the business profits according to their ownership shares.",
        "Anteile bedeuten Miteigentum. Mitinhaber teilen die Gewinne gemäß ihrer Beteiligung.",
        "Udziały oznaczają współwłasność. Wspólnicy dzielą zyski proporcjonalnie do posiadanych udziałów.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Sell enough waffle cones so the cart generates at least 20 coins of profit, giving Mira at least 10 coins!",
        "Verkaufe genug Waffeln für mindestens 20 Münzen Gesamtgewinn, sodass Mira mindestens 10 Münzen erhält!",
        "Sprzedaj dość gofrów, by wypracować co najmniej 20 monet zysku, zapewniając Mirze minimum 10 monet!",
      ),
      Widget,
      hint: T(
        "Slide the cones slider higher until total profit reaches at least 20 coins. Mira will receive half.",
        "Bewege den Schieberegler nach rechts, bis der Gewinn mindestens 20 Münzen beträgt. Mira erhält die Hälfte.",
        "Przesuń suwak w prawo, aż całkowity zysk wyniesie co najmniej 20 monet. Mira otrzyma połowę tej kwoty.",
      ),
    },
  ],
  askDad: T(
    "Papa, how can someone own shares or equity in a company without having to go and work there every morning?",
    "Papa, wie kann man Anteile an einer Firma besitzen und daran verdienen, ohne dort jeden Tag zu arbeiten?",
    "Tato, jak można posiadać akcje lub udziały w firmie i na nich zarabiać, nie chodząc tam do pracy codziennie?",
  ),
  realLife: {
    title: {
      en: "Equity and business partners in India",
      de: "Beteiligungen und Mitinhaber in Deutschland",
      pl: "Udziały w spółce i wspólnicy w Polsce",
    },
    body: {
      en: "In India, many successful enterprises start as partnerships between friends or family members under the Partnership Act or LLP rules. One partner may manage daily customer operations, while another partner provides investment capital to purchase machinery or vehicles. Both co-owners hold equity and receive their share of the business profits.",
      de: "In Deutschland schließen sich Gründer häufig in einer Gesellschaft wie einer GbR oder GmbH zusammen. Ein Gesellschafter leitet das operative Tagesgeschäft, während ein Partner Eigenkapital für teure Maschinen bereitstellt. Beide besitzen Geschäftsanteile und teilen den erwirtschafteten Jahresgewinn entsprechend auf.",
      pl: "W Polsce wspólnicy bardzo często rejestrują spółki cywilne lub spółki z o.o., aby połączyć umiejętności i kapitał. Jeden wspólnik może zarządzać codzienną pracą zespołu, a drugi wnosi wkład finansowy na zakup sprzętu lub lokalu. Zgodnie z Kodeksem spółek handlowych oboje posiadają udziały i dzielą zyski spółki.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Corporate law defines equity as the residual ownership interest in the assets of an enterprise after all liabilities and debt obligations are settled.",
          de: "Das Eigenkapital repräsentiert den rechnerischen Residualanspruch der Unternehmenseigner an den Vermögenswerten nach Abzug aller Verbindlichkeiten.",
          pl: "Kapitał własny stanowi wartość aktywów przedsiębiorstwa przysługującą jego właścicielom po odliczeniu wszystkich zobowiązań.",
        },
        source: "https://wirtschaftslexikon.gabler.de/definition/eigenkapital-35324",
      },
      {
        text: {
          en: "Partnership and company law permits investors to acquire fractional ownership shares in a business and receive proportionate profit distributions.",
          de: "Das Gesellschaftsrecht regelt, dass Mitgesellschafter entsprechend ihrer Beteiligungsquote am Gewinn und Verlust der Gesellschaft partizipieren.",
          pl: "Kodeks spółek handlowych określa zasady obejmowania udziałów w spółkach oraz prawo wspólników do równego lub proporcjonalnego udziału w zysku.",
        },
        source: "https://www.gesetze-im-internet.de/gmbhg/__29.html",
      },
      {
        text: {
          en: "Financial accounting classifies productive tools, vehicles, and equipment as productive capital assets that generate recurring economic benefits over multi-year useful lives.",
          de: "Im betrieblichen Rechnungswesen zählen Sachanlagen wie Maschinen und Ausrüstung zum Anlagevermögen, das dem Geschäftsbetrieb dauerhaft dient.",
          pl: "Ustawa o rachunkowości zalicza maszyny, urządzenia i środki transportu do rzeczowych aktywów trwałych służących do generowania przychodów.",
        },
        source: "https://www.gesetze-im-internet.de/hgb/__247.html",
      },
      {
        text: {
          en: "Economic data tracks gross fixed capital formation to measure how much enterprises invest in productive machinery and infrastructure to expand output.",
          de: "Statistische Ämter erfassen Bruttoanlageinvestitionen von Unternehmen, um die Ausstattung der Wirtschaft mit produktivem Sachkapital abzubilden.",
          pl: "Główny Urząd Statystyczny (GUS) publikuje dane o nakładach brutto na środki trwałe, ilustrując inwestycje firm w nowoczesny park maszynowy.",
        },
        source: "https://www.destatis.de/DE/Themen/Wirtschaft/Volkswirtschaftliche-Gesamtrechnungen-Inlandsprodukt/_inhalt.html",
      },
      {
        text: {
          en: "Central banks highlight that equity capital formation enables enterprises to scale productivity and share business yields with savers and co-investors.",
          de: "Zentralbanken betonen die volkswirtschaftliche Rolle von Eigenkapital als risikotragende Basis für Innovation, Wachstum und Wertschöpfung.",
          pl: "Narodowy Bank Polski (NBP) w raportach o stabilności systemu finansowego podkreśla kluczowe znaczenie kapitału własnego firm dla odporności na kryzysy.",
        },
        source: "https://nbp.pl/system-finansowy/rozwoj-systemu-finansowego/",
      },
    ],
    simplified: [
      {
        en: "In the story, Finn and Mira split ownership 50/50 through a simple agreement. Real corporate equity involves notarized shareholder registries, voting rights, and legal articles of association.",
        de: "In der Geschichte vereinbaren Finn und Mira ihre 50/50-Beteiligung per Handschlag. Echte Gesellschaftsverträge erfordern notarielle Beurkundung und Stimmrechtsregeln.",
        pl: "W opowiadaniu wspólnicy dzielą się udziałami 50/50 na podstawie prostej umowy. W rzeczywistości powołanie spółki wymaga umowy notarialnej i wpisu do rejestru KRS.",
      },
      {
        en: "Depreciation of the cart and waffle iron is omitted here to keep the connection between capital ownership and profit distribution easy to grasp for an 8-year-old.",
        de: "Die buchhalterische Abschreibung von Wagen und Waffeleisen wird weggelassen, damit Kinder das Kernprinzip der Gewinnbeteiligung unmittelbar verstehen.",
        pl: "Amortyzację wózka i sprzętu pominięto, aby ośmiolatek mógł bez przeszkód zrozumieć fundamentalną zasadę czerpania zysków ze współwłasności majątku.",
      },
    ],
  },
};
