import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CiderPressDiagram,
  DividendFlowDiagram,
  SharePriceFluctuationDiagram,
  ShareTilesDiagram,
  StockExchangeDiagram,
} from "./stocks.diagrams";
import { StocksToy } from "./stocks.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <StocksToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <StocksToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "stocks",
  story: [
    animatedBeat(
      [
        T(
          "Maya dreams of building a large cider mill to press sweet sparkling juice.",
          "Maya träumt davon, eine große Mosterei zu bauen, um süßen Saft zu pressen.",
          "Maya marzy o wybudowaniu dużej tłoczni cydru, aby wyciskać pyszny, musujący sok jabłkowy.",
        ),
        T(
          "Building the wooden mill and heavy granite press costs one hundred coins.",
          "Der Bau der hölzernen Mühle und der schweren Granitpresse kostet hundert Münzen.",
          "Budowa drewnianego budynku i potężnej granitowej prasy kosztuje sto monet.",
        ),
        T(
          "Maya does not want a bank loan that requires stressful monthly repayments.",
          "Maya möchte keinen Bankkredit mit stressigen monatlichen Raten abbezahlen.",
          "Maya nie chce brać kredytu w banku, który wymagałby comiesięcznej, stresującej spłaty rat.",
        ),
        T(
          "Instead, Maya divides the mill business into ten equal share certificates.",
          "Stattdessen teilt Maya den Mühlenbetrieb in zehn gleiche Anteilsurkunden auf.",
          "Zamiast tego Maya dzieli całe przedsiębiorstwo na dziesięć równych certyfikatów udziałowych.",
        ),
      ],
      CiderPressDiagram,
    ),
    animatedBeat(
      [
        T(
          "Maya keeps two certificates and offers eight to neighbors for ten coins each.",
          "Maya behält zwei Scheine und bietet den Nachbarn acht für je zehn Münzen an.",
          "Maya zachowuje dwa certyfikaty dla siebie, a osiem oferuje sąsiadom po dziesięć monet za sztukę.",
        ),
        T(
          "Each wooden certificate represents one *stock share* of the company.",
          "Jedes hölzerne Zertifikat stellt eine *Aktie* des Unternehmens dar.",
          "Każdy certyfikat reprezentuje jedną *akcję* przedsiębiorstwa.",
        ),
        T(
          "By buying two shares, you become a genuine co-owner (*shareholder*).",
          "Mit dem Kauf von zwei Aktien wirst du ein echter Miteigentümer (*Aktionär*).",
          "Kupując dwie akcje, stajesz się prawdziwym współwłaścicielem (*akcjonariuszem*).",
        ),
        T(
          "You now own twenty percent of the cider press, its equipment, and its future.",
          "Dir gehören nun zwanzig Prozent der Mosterei, ihrer Ausrüstung und Zukunft.",
          "Należy teraz do ciebie dwadzieścia procent tłoczni cydru, jej maszyn i przyszłych zysków.",
        ),
      ],
      ShareTilesDiagram,
    ),
    animatedBeat(
      [
        T(
          "In autumn, the orchard yields fragrant apples and the mill presses barrels of juice.",
          "Im Herbst trägt die Obstwiese duftende Äpfel und die Mühle presst Fässer voll Saft.",
          "Jesienią sad ugina się pod pachnącymi jabłkami, a tłocznia napełnia beczki świeżym sokiem.",
        ),
        T(
          "After paying all costs, Maya counts thirty coins of clear profit.",
          "Nach Abzug aller Kosten zählt Maya dreißig Münzen Reingewinn.",
          "Po opłaceniu wszystkich kosztów Maya wylicza trzydzieści monet czystego zysku.",
        ),
        T(
          "Maya divides the profit equally across all ten shares, paying three coins per share.",
          "Maya teilt den Gewinn gleichmäßig auf alle zehn Aktien auf: drei Münzen pro Aktie.",
          "Maya dzieli zysk równo na wszystkie dziesięć akcji, wypłacając po trzy monety na każdą z nich.",
        ),
        T(
          "This profit distribution is called a *dividend*.",
          "Diese Gewinnausschüttung nennt man *Dividende*.",
          "Taka wypłata części zysku współwłaścicielom to *dywidenda*.",
        ),
      ],
      DividendFlowDiagram,
    ),
    animatedBeat(
      [
        T(
          "When word spreads of Maya's delicious spiced cider, neighbors queue up.",
          "Als sich herumpricht, wie köstlich Mayas Gewürzmost schmeckt, stehen Nachbarn Schlange.",
          "Gdy wieść o pysznym cydrze korzennym Mayi obiega okolicę, sąsiedzi ustawiają się w kolejce.",
        ),
        T(
          "Other villagers offer sixteen coins to buy your share tile.",
          "Andere Dorfbewohner bieten sechzehn Münzen, um dir deinen Anteilsstein abzukaufen.",
          "Inni mieszkańcy oferują aż szesnaście monet, by odkupić od ciebie certyfikat akcji.",
        ),
        T(
          "You can sell to lock in a six-coin profit, or keep holding for future dividends.",
          "Du kannst verkaufen, um sechs Münzen Gewinn mitzunehmen, oder für Dividenden halten.",
          "Możesz sprzedać akcję i zrealizować sześć monet zysku lub zatrzymać ją dla przyszłych dywidend.",
        ),
        T(
          "If frost ruins the harvest, share prices drop because dividends dry up.",
          "Wenn Frost die Ernte verdirbt, sinkt der Aktienkurs, weil Dividenden ausbleiben.",
          "Jeśli mróz zniszczy zbiory, cena akcji spadnie, bo zyski i dywidendy znikną.",
        ),
      ],
      SharePriceFluctuationDiagram,
    ),
    animatedBeat(
      [
        T(
          "On the modern stock exchange, millions of people co-own great enterprises.",
          "An der modernen Börse besitzen Millionen von Menschen gemeinsam große Unternehmen.",
          "Na współczesnej giełdzie papierów wartościowych miliony ludzi stają się współwłaścicielami wielkich firm.",
        ),
        T(
          "When companies innovate and grow, shareholders share in their success.",
          "Wenn Unternehmen Neues erfinden und wachsen, teilen die Aktionäre ihren Erfolg.",
          "Gdy firmy wprowadzają innowacje i rozwijają się, akcjonariusze partycypują w ich sukcesie.",
        ),
        T(
          "Stocks carry risk, but they allow everyday citizens to build lasting wealth.",
          "Aktien bergen Risiken, ermöglichen es Bürgern aber, langfristig Wohlstand aufzubauen.",
          "Akcje wiążą się z ryzykiem wahań cen, lecz pozwalają każdemu budować długoterminowy majątek.",
        ),
        T(
          "Being a shareholder means putting your savings to work in the real economy.",
          "Aktionär zu sein bedeutet, seine Ersparnisse in der realen Wirtschaft arbeiten zu lassen.",
          "Bycie akcjonariuszem oznacza, że twoje oszczędności pracują w realnej gospodarce.",
        ),
      ],
      StockExchangeDiagram,
    ),
  ],
  toyIntro: T(
    "Set the harvest outcome, collect your dividend payout, or sell shares at market bids.",
    "Wähle die Ernte, sammle deine Dividendenauszahlung oder verkaufe Aktien an Interessenten.",
    "Wybierz wynik zbiorów, odbierz swoją dywidendę lub sprzedaj akcje po rynkowej cenie.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does it mean to own a stock share in a company?",
        "Was bedeutet es, eine Aktie an einem Unternehmen zu besitzen?",
        "Co to znaczy posiadać akcję przedsiębiorstwa?",
      ),
      options: [
        {
          text: T(
            "You are a fractional co-owner of the business and its profits",
            "Du bist Miteigentümer eines Teils des Unternehmens und seiner Gewinne",
            "Jesteś współwłaścicielem części przedsiębiorstwa i masz prawo do jego zysków",
          ),
          correct: true,
        },
        {
          text: T(
            "You lent coins that the company must repay with fixed interest tomorrow",
            "Du hast Münzen geliehen, die das Unternehmen morgen mit Zinsen zurückzahlen muss",
            "Pożyczyłeś monety, które firma musi jutro zwrócić ze stałym oprocentowaniem",
          ),
        },
        {
          text: T(
            "You are legally forced to clean the factory floor every morning",
            "Du bist gesetzlich verpflichtet, jeden Morgen den Fabrikboden zu wischen",
            "Jesteś prawnie zobowiązany do codziennego sprzątania podłogi w fabryce",
          ),
        },
      ],
      hint: T(
        "A shareholder is a part-owner of the enterprise.",
        "Ein Aktionär ist ein Miteigentümer des Unternehmens.",
        "Akcjonariusz jest współwłaścicielem przedsiębiorstwa.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is a dividend?",
        "Was ist eine Dividende?",
        "Czym jest dywidenda?",
      ),
      options: [
        {
          text: T(
            "A share of company profits paid out directly to shareholders",
            "Ein Teil des Unternehmensgewinns, der direkt an Aktionäre ausgezahlt wird",
            "Część zysku wypracowanego przez firmę, wypłacana bezpośrednio akcjonariuszom",
          ),
          correct: true,
        },
        {
          text: T(
            "A fine paid to the government for baking too much bread",
            "Eine Geldstrafe an den Staat für das Backen von zu viel Brot",
            "Grzywna płacona państwu za upieczenie zbyt dużej ilości chleba",
          ),
        },
        {
          text: T(
            "The secret password used to open the factory gate",
            "Das geheime Passwort, um das Fabriktor zu öffnen",
            "Tajne hasło otwierające bramę zakładu produkcyjnego",
          ),
        },
      ],
      hint: T(
        "When the cider press earns a profit, Maya distributes coins to tile owners.",
        "Wenn die Mosterei Gewinn macht, schüttet Maya Münzen an die Anteilseigner aus.",
        "Gdy tłocznia cydru przynosi zysk, Maya dzieli się monetami z właścicielami akcji.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "The cider press earned 40 coins profit (4 coins per share). Collect your 8-coin dividend payout.",
        "Die Mosterei machte 40 Münzen Gewinn (4 Münzen pro Aktie). Hole deine 8 Münzen Dividende ab.",
        "Tłocznia wypracowała 40 monet zysku (4 monety na akcję). Odbierz swoje 8 monet dywidendy.",
      ),
      Widget,
      hint: T(
        "Tap the Collect Dividend button to collect 8 coins into your wallet and tap check.",
        "Tippe auf Dividende abholen, um 8 Münzen in deinen Beutel zu legen, und tippe auf prüfen.",
        "Naciśnij przycisk Odbierz dywidendę, aby schować 8 monet do portfela, a następnie naciśnij Sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, if you buy a share of a company, do you get to visit the factory and say you own part of it?",
    "Papa, wenn du eine Aktie einer Firma kaufst, darfst du dann die Fabrik besuchen und sagen, dass sie dir gehört?",
    "Tato, jeśli kupisz akcję jakiejś firmy, czy możesz wejść do jej fabryki i powiedzieć, że jesteś jej współwłaścicielem?",
  ),
  realLife: {
    title: {
      en: "Stock Exchanges and Co-Ownership in India",
      de: "Aktiengesellschaften in Deutschland",
      pl: "Giełda Papierów Wartościowych w Warszawie (GPW)",
    },
    body: {
      en: "In India, large companies like Tata Consultancy Services, Reliance Industries, and Infosys are listed on the National Stock Exchange (NSE) and Bombay Stock Exchange (BSE). Millions of retail investors hold shares through Demat accounts regulated by the Securities and Exchange Board of India (SEBI), receiving dividends and participating in India's economic growth.",
      de: "In Deutschland sind große Unternehmen wie Siemens, SAP und BMW Aktiengesellschaften (AG). Millionen Menschen kaufen Anteile an der Frankfurter Wertpapierbörse (Xetra), um Miteigentümer zu werden und jährliche Dividenden aus Unternehmensgewinnen zu erhalten.",
      pl: "W Polsce największe przedsiębiorstwa (np. Orlen, PKO Bank Polski czy CD Projekt) są spółkami akcyjnymi (S.A.) notowanymi na Giełdzie Papierów Wartościowych w Warszawie (GPW). Pod nadzorem Komisji Nadzoru Finansowego (KNF) inwestorzy indywidualni otwierają rachunki maklerskie, kupują akcje i otrzymują dywidendy z wypracowanych zysków.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Corporate law defines joint-stock corporations as capital companies whose equity is divided into transferable shares.",
          de: "Das Aktiengesetz (§ 1) definiert die AG als Gesellschaft mit eigener Rechtspersönlichkeit, deren Grundkapital in Aktien zerlegt ist.",
          pl: "Kodeks spółek handlowych (art. 301 KSH) stanowi, że kapitał zakładowy spółki akcyjnej dzieli się na akcje o równej wartości nominalnej.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037",
      },
      {
        text: {
          en: "Corporate statutes establish that shareholders are entitled to a share in company balance sheet profits through dividend distributions.",
          de: "Aktionäre haben nach AktG § 60 Anspruch auf den Bilanzgewinn, sofern die Hauptversammlung die Ausschüttung beschließt.",
          pl: "Akcjonariusz ma ustawowe prawo do udziału w zysku wykazanym w sprawozdaniu finansowym (dywidenda) zgodnie z art. 347 KSH.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037",
      },
      {
        text: {
          en: "Regulated stock exchanges maintain fair, transparent, and orderly secondary markets for equity securities.",
          de: "Die Frankfurter Wertpapierbörse und Xetra bieten geregelte Handelsplätze mit transparenter Preisbildung.",
          pl: "Giełda Papierów Wartościowych w Warszawie (GPW) prowadzi regulowany rynek giełdowy zapewniający przejrzystość obrotu i ochronę inwestorów.",
        },
        source: "https://www.gpw.pl/o-nas",
      },
      {
        text: {
          en: "Financial market authorities supervise securities markets to prevent market abuse and ensure investor information disclosure.",
          de: "Die Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin) überwacht den Wertpapierhandel und Insiderverbote.",
          pl: "Komisja Nadzoru Finansowego (KNF) sprawuje nadzór nad rynkiem kapitałowym i egzekwuje obowiązki informacyjne spółek publicznych.",
        },
        source: "https://www.knf.gov.pl/dla_rynku/rynek_kapitalowy",
      },
      {
        text: {
          en: "Benchmark equity indices track the performance of leading blue-chip corporations representing the broader national economy.",
          de: "Der Leitindex DAX bildet die Wertentwicklung der 40 größten und liquidesten deutschen Unternehmen ab.",
          pl: "Indeks WIG20 odzwierciedla koniunkturę giełdową, grupując 20 największych i najbardziej płynnych spółek z warszawskiego parkietu.",
        },
        source: "https://www.gpwbenchmark.pl/",
      },
      {
        text: {
          en: "Investor education guidelines highlight that equity investments represent real productive capacity but carry business and price volatility risks.",
          de: "Verbraucherzentralen betonen, dass Aktien Chancen auf Produktivitätswachstum bieten, aber Kursschwankungen unterliegen.",
          pl: "KNF i instytucje edukacji finansowej przypominają, że akcje dają udział w realnym wzroście gospodarczym, lecz wiążą się z ryzykiem utraty części kapitału.",
        },
        source: "https://www.knf.gov.pl/dla_konsumenta/edukacja_finansowa",
      },
    ],
    simplified: [
      {
        en: "We explain shares as physical wooden tiles dividing a cider mill so an 8-year-old child visualizes co-ownership.",
        de: "Wir erklären Aktien als Holzbausteine, die eine Mosterei teilen, damit Kinder Miteigentum anschaulich begreifen.",
        pl: "Wyjaśniamy istotę akcji jako certyfikaty dzielące tłocznię cydru, aby dziecko łatwo zrozumiało ideę współwłasności.",
      },
      {
        en: "We connect dividend payouts directly to real cider sales and barrels rather than abstract quarterly financial statements.",
        de: "Wir verknüpfen Dividendenzahlungen direkt mit Mostverkäufen und Fässern statt mit abstrakten Quartalsberichten.",
        pl: "Łączymy wypłatę dywidendy bezpośrednio ze sprzedażą butelek cydru zamiast ze skomplikowanymi sprawozdaniami finansowymi.",
      },
      {
        en: "We illustrate capital gains and share price drops through neighbor bids responding to sweet cider or frost.",
        de: "Wir zeigen Kursgewinne und Verluste anhand von Dorfgeboten, die auf köstlichen Most oder Frost reagieren.",
        pl: "Ilustrujemy wahania cen akcji poprzez oferty sąsiadów reagujących na słodki cydr lub zniszczone przez mróz jabłka.",
      },
    ],
  },
};
