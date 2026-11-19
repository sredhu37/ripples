import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BothThriveDiagram,
  GrandHarborFactoryDiagram,
  MayaBulkOrderDiagram,
  MossCustomOrderDiagram,
  SamWorkshopDiagram,
  ScaleDiscountDiagram,
} from "./scale.diagrams";
import { ScaleToy } from "./scale.toy";
import "./scale.css";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <ScaleToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <ScaleToy lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "scale",
  story: [
    animatedBeat(
      [
        T(
          "Sam is a skilled cobbler who crafts boots by hand in Ripple Town.",
          "Sam ist ein geschickter Schuster, der in Ripple Town Stiefel von Hand fertigt.",
          "Sam jest zręcznym szewcem, który w Ripple Town własnoręcznie wytwarza buty.",
        ),
        T(
          "Every stitch is placed with care, measuring each villager's foot individually.",
          "Jeder Stich sitzt perfekt, jeder Fuß wird einzeln vermessen.",
          "Każdy szew kładzie z ogromną starannością, mierząc stopę każdego mieszkańca.",
        ),
        T(
          "Sam can craft 1 beautiful pair of boots each week.",
          "Sam schafft jede Woche 1 wunderschönes Paar Stiefel.",
          "Sam potrafi uszyć 1 piękną parę butów tygodniowo.",
        ),
      ],
      SamWorkshopDiagram,
    ),
    animatedBeat(
      [
        T(
          "Across the bay at Grand Harbor, a shoe factory opens.",
          "Drüben im Großen Hafen eröffnet eine moderne Schuhfabrik.",
          "Po drugiej stronie zatoki, w Grand Harbor, otwiera się fabryka obuwia.",
        ),
        T(
          "Powered by water wheels and mechanical presses, workers cut 100 leather soles a day.",
          "Angetrieben von Wasserrädern stanzen die Maschinen täglich 100 Ledersohlen.",
          "Napędzane kołami wodnymi i mechanicznymi prasami maszyny wycinają 100 podeszew dziennie.",
        ),
        T(
          "Every boot made by the factory looks completely identical.",
          "Jeder Stiefel aus der Fabrik sieht vollkommen gleich aus.",
          "Każdy but wyprodukowany w fabryce wygląda zupełnie identycznie.",
        ),
      ],
      GrandHarborFactoryDiagram,
    ),
    animatedBeat(
      [
        T(
          "When Sam buys leather, he purchases 1 sheet at a time for 2 coins.",
          "Wenn Sam Leder kauft, nimmt er 1 Stück auf einmal für 2 Münzen.",
          "Gdy Sam kupuje skórę, bierze po 1 płacie na raz za 2 monety.",
        ),
        T(
          "The factory orders an entire boatload of 100 sheets directly from the tanners.",
          "Die Fabrik bestellt eine ganze Schiffsladung von 100 Stück direkt bei der Gerberei.",
          "Fabryka zamawia całą ładownię 100 płatów bezpośrednio z garbarni.",
        ),
        T(
          "Because they buy in bulk, the tanners sell each sheet for only 1 coin!",
          "Weil sie Großmengen abnimmt, kostet das Leder nur 1 Münze pro Stück!",
          "Dzięki zakupom hurtowym garbarnia sprzedaje każdy płat za jedyną 1 monetę!",
        ),
      ],
      ScaleDiscountDiagram,
    ),
    animatedBeat(
      [
        T(
          "This cost-saving advantage of producing large volumes is called *economies of scale*.",
          "Diesen Kostenvorteil bei großen Stückzahlen nennt man *Skaleneffekt* oder Größenvorteil.",
          "Tę przewagę kosztową przy produkcji na dużą skalę nazywamy *korzyściami skali*.",
        ),
        T(
          "Maya needs 40 pairs of sturdy work boots for her orchard pickers.",
          "Maya braucht 40 Paar feste Arbeitsstiefel für ihre Erntehelfer.",
          "Maya potrzebuje 40 par solidnych butów roboczych dla swoich sadowników.",
        ),
        T(
          "She buys standard factory boots for just 3 coins each, saving her orchard a fortune.",
          "Sie kauft Fabrikstiefel für je nur 3 Münzen und spart ihrer Plantage ein Vermögen.",
          "Kupuje standardowe buty fabryczne po 3 monety za parę, oszczędzając sadom fortunę.",
        ),
      ],
      MayaBulkOrderDiagram,
    ),
    animatedBeat(
      [
        T(
          "Does this mean Sam's workshop has to close down?",
          "Bedeutet das, dass Sams Werkstatt schließen muss?",
          "Czy to oznacza, że warsztat Sama musi zostać zamknięty?",
        ),
        T(
          "Not at all! Mayor Moss wants boots with soft calf lining and custom carved buckles.",
          "Ganz und gar nicht! Bürgermeister Moss will weiches Futter und gravierte Schnallen.",
          "Wcale nie! Burmistrz Moss pragnie butów z miękkiej cielęcej skóry z grawerowanymi klamrami.",
        ),
        T(
          "The factory cannot make one-of-a-kind boots, but Sam crafts them with pride for 12 coins.",
          "Die Fabrik kann keine Unikate bauen, aber Sam fertigt sie mit Stolz für 12 Münzen.",
          "Fabryka nie potrafi robić unikatów, lecz Sam z dumą tworzy je na zamówienie za 12 monet.",
        ),
      ],
      MossCustomOrderDiagram,
    ),
    animatedBeat(
      [
        T(
          "Both businesses serve important needs in the economy.",
          "Beide Unternehmen erfüllen wichtige Aufgaben in der Wirtschaft.",
          "Oba rodzaje działalności pełnią ważne role w gospodarce.",
        ),
        T(
          "Factories provide affordable essentials in bulk using scale.",
          "Fabriken liefern durch Größenvorteile günstige Grundausstattung in großen Mengen.",
          "Fabryki dostarczają podstawowe produkty w dużych ilościach tanio dzięki skali.",
        ),
        T(
          "Artisans provide personalized care, custom repairs, and unique creations.",
          "Handwerker bieten persönliche Betreuung, Reparaturen und einzigartige Maßarbeit.",
          "Rzemieślnicy oferują indywidualne podejście, naprawy i unikatowe wyroby na wymiar.",
        ),
      ],
      BothThriveDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how bulk buying lowers unit costs, and route orders to the factory or artisan workshop!",
    "Erkunde, wie Mengeneinkauf Stückkosten senkt, und leite Aufträge an Fabrik oder Handwerker!",
    "Odkryj, jak zakupy hurtowe obniżają koszt jednostkowy i kieruj zamówienia do fabryki lub rzemieślnika!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What are economies of scale?",
        "Was versteht man unter einem Skaleneffekt?",
        "Czym są korzyści skali (ekonomia skali)?",
      ),
      options: [
        {
          text: T(
            "Cost savings per unit achieved when producing goods in large quantities",
            "Kosteneinsparungen pro Stück durch Produktion in großen Mengen",
            "Oszczędnościami kosztu jednostkowego osiąganymi dzięki masowej produkcji",
          ),
          correct: true,
        },
        {
          text: T(
            "Weighing boots on a brass scale",
            "Das Wiegen von Stiefeln auf einer Messingwaage",
            "Ważeniem butów na mosiężnej wadze",
          ),
        },
        {
          text: T(
            "Closing a business every winter",
            "Einen Betrieb jeden Winter zu schließen",
            "Zamykaniem firmy na każdy okres zimowy",
          ),
        },
      ],
      hint: T(
        "Buying materials in bulk and spreading machine costs lowers the cost of each item made.",
        "Großeinkauf von Rohstoffen und Auslastung von Maschinen senken die Kosten je Stück.",
        "Kupowanie surowców hurtowo i wykorzystanie maszyn obniża koszt wytworzenia każdej sztuki.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why do small artisan workshops thrive even when big factories exist?",
        "Warum können kleine Handwerksbetriebe neben großen Fabriken erfolgreich sein?",
        "Dlaczego małe warsztaty rzemieślnicze dobrze prosperują obok wielkich fabryk?",
      ),
      options: [
        {
          text: T(
            "They offer custom personalization, repairs, and high-touch individual craft",
            "Sie bieten individuelle Maßarbeit, Reparaturen und persönliche Betreuung",
            "Oferują produkty na miarę, naprawy oraz kunsztowne, indywidualne wykonanie",
          ),
          correct: true,
        },
        {
          text: T(
            "Factories are forbidden from selling shoes",
            "Fabriken dürfen per Gesetz keine Schuhe verkaufen",
            "Fabrykom ustawowo zabroniono sprzedaży butów",
          ),
        },
        {
          text: T(
            "Artisans never have to buy leather",
            "Handwerker müssen niemals Leder einkaufen",
            "Rzemieślnicy nigdy nie muszą kupować skóry",
          ),
        },
      ],
      hint: T(
        "Customers happily pay more for unique items tailored precisely to their needs.",
        "Kundschaft zahlt gern mehr für individuelle Stücke, die exakt zu ihren Wünschen passen.",
        "Klienci chętnie płacą więcej za unikatowe wyroby idealnie dopasowane do ich potrzeb.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Maya needs 40 identical, sturdy boots for orchard pickers at the lowest cost. Where should this order go?",
        "Maya braucht 40 gleiche, feste Stiefel für Plantagenhelfer zum günstigsten Preis. Wohin gehört der Auftrag?",
        "Maya potrzebuje 40 identycznych, trwałych butów dla sadowników w najniższej cenie. Gdzie skierować to zamówienie?",
      ),
      Widget,
      hint: T(
        "Select the Grand Harbor Factory for identical bulk boots and press Check.",
        "Wähle die Schuhfabrik im Großen Hafen für gleiche Großserien und drücke Prüfen.",
        "Wybierz Fabrykę w Grand Harbor dla identycznych butów hurtowych i naciśnij Sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, can a small company ever grow into a giant factory, or is it better to stay a small specialist?",
    "Papa, kann ein kleiner Betrieb zu einer riesigen Fabrik heranwachsen, oder ist es besser, ein Spezialist zu bleiben?",
    "Tato, czy mała firma może wyrosnąć na wielką fabrykę, czy lepiej pozostać małym specjalistą?",
  ),
  realLife: {
    title: {
      en: "MSMEs and industrial scale in India",
      de: "Der deutsche Mittelstand und industrielle Fabriken",
      pl: "Polskie MŚP i wielki przemysł produkcyjny",
    },
    body: {
      en: "In India, micro, small, and medium enterprises (MSMEs) form the backbone of employment, handicraft traditions, and local services. At the same time, large industrial manufacturing clusters produce automobiles, pharmaceuticals, and steel at massive scale for the nation and global export. Both handcrafted artistry and industrial mass manufacturing are vital to India's thriving economy.",
      de: "Deutschlands Wirtschaft stützt sich stark auf den Mittelstand: Hunderttausende kleiner und mittlerer Familienunternehmen, die weltweit führend in Spezialbereichen sind. Gleichzeitig fertigen große Industriefabriken Fahrzeuge und Maschinen effizient in riesigen Serien.",
      pl: "W Polsce małe i średnie przedsiębiorstwa (sektor MŚP) wytwarzają blisko połowę krajowego PKB i zatrudniają miliony osób, oferując elastyczność, rzemiosło i usługi dopasowane do potrzeb. Obok nich funkcjonują nowoczesne fabryki i zakłady przemysłowe, które dzięki korzyściom skali produkują tysiące części i towarów w niskich cenach dla odbiorców w całej Europie.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Enterprise research institutes define and document the economic contribution and employment share of small and medium enterprises (SMEs).",
          de: "Das Institut für Mittelstandsforschung (IfM Bonn) dokumentiert den Beitrag und die Beschäftigungskraft kleiner und mittlerer Unternehmen.",
          pl: "Polska Agencja Rozwoju Przedsiębiorczości (PARP) analizuje w corocznych raportach wkład sektora MŚP w tworzenie miejsc pracy i polskie PKB.",
        },
        source:
          "https://www.parp.gov.pl/storage/publications/pdf/Raport_o_stanie_sektora_MSP_w_Polsce.pdf",
      },
      {
        text: {
          en: "National statistical offices categorize business activity across micro-enterprises, small firms, and large industrial manufacturers.",
          de: "Das Statistische Bundesamt (Destatis) erfasst Unternehmensregister nach Größenklassen von Kleinstbetrieben bis zu Industrieunternehmen.",
          pl: "Główny Urząd Statystyczny (GUS) klasyfikuje podmioty gospodarcze w rejestrze REGON od mikroprzedsiębiorstw po wielkie zakłady przemysłowe.",
        },
        source:
          "https://stat.gov.pl/obszary-tematyczne/podmioty-gospodarcze-wyniki-finansowe/przedsiebiorstwa-niefinansowe/",
      },
      {
        text: {
          en: "Economic and development ministries establish structural policy frameworks supporting agile artisan businesses alongside industrial manufacturing scale.",
          de: "Wirtschaftsministerien gestalten Rahmenbedingungen zur Förderung innovativer mittelständischer Betriebe und industrieller Großserien.",
          pl: "Ministerstwo Rozwoju i Technologii tworzy ramy prawne i programy wspierające rzemiosło oraz rozwój nowoczesnego przemysłu w Polsce.",
        },
        source: "https://www.gov.pl/web/rozwoj-technologia/przedsiebiorcy",
      },
      {
        text: {
          en: "Industry confederations represent manufacturers achieving economies of scale through automation, robotics, and integrated supply networks.",
          de: "Industrieverbände (BDI) vertreten produzierende Großunternehmen, die durch Automatisierung und Fabriken globale Größenvorteile erzielen.",
          pl: "Konfederacja Lewiatan reprezentuje zakłady produkcyjne osiągające korzyści skali dzięki automatyzacji i integracji łańcuchów dostaw.",
        },
        source: "https://fcpp.org.pl/",
      },
      {
        text: {
          en: "Chambers of Craft and Commerce highlight the complementary economic roles of bespoke regional craftsmanship and automated mass production.",
          de: "Handwerkskammern und Industrie- und Handelskammern betonen das Zusammenwirken von lokalem Maßhandwerk und industrieller Serienfertigung.",
          pl: "Związek Rzemiosła Polskiego podkreśla kluczową rolę rzemiosła i usług na zamówienie uzupełniających zautomatyzowaną produkcję seryjną.",
        },
        source: "https://zrp.pl/",
      },
    ],
    simplified: [
      {
        en: "In the lesson, Sam makes custom boots while a single factory makes standard ones. In reality, modern companies often combine automated production with modular customization.",
        de: "In der Lektion fertigt Sam Maßstiefel, während eine Fabrik Standardstiefel baut. In Wirklichkeit kombinieren Betriebe oft Automatisierung mit modularer Anpassung.",
        pl: "W lekcji Sam szyje buty na zamówienie, a jedna fabryka robi buty seryjne. W rzeczywistości nowoczesne firmy często łączą zautomatyzowaną produkcję z modułowym dopasowaniem do klienta.",
      },
      {
        en: "Economies of scale also involve transport logistics, specialized software, and capital financing beyond simple bulk material discounts.",
        de: "Größenvorteile entstehen auch durch Transportlogistik, spezialisierte Software und günstige Finanzierungskonditionen.",
        pl: "Korzyści skali wynikają także z logistyki transportowej, zaawansowanego oprogramowania i dostępu do tańszego finansowania.",
      },
    ],
  },
};
