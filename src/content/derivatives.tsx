import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  DroughtWithContractDiagram,
  EurexExchangeDiagram,
  FloodWithContractDiagram,
  HandshakeContractDiagram,
  SpringWorriesDiagram,
} from "./derivatives.diagrams";
import { DerivativesToy } from "./derivatives.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <DerivativesToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <DerivativesToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "derivatives",
  story: [
    animatedBeat(
      [
        T(
          "In spring, Farmer Maya spends one hundred and fifty coins planting fifty sacks of wheat.",
          "Im Frühling investiert Bäuerin Maya einhundertfünfzig Münzen, um fünfzig Säcke Weizen anzubauen.",
          "Wiosną rolniczka Maya wydaje sto pięćdziesiąt monet na zasianie pola, by zebrać pięćdziesiąt worków pszenicy.",
        ),
        T(
          "Each sack costs Maya three coins in tractor fuel, seeds, and field labor.",
          "Jeder Sack kostet Maya drei Münzen an Treibstoff, Saatgut und Feldarbeit.",
          "Każdy worek kosztuje Mayę trzy monety w postaci paliwa, nasion i ciężkiej pracy.",
        ),
        T(
          "Maya worries that autumn floods elsewhere will flood the market and crash wheat to one coin.",
          "Maya sorgt sich, dass Überschwemmungen anderswo den Markt überschwemmen und den Preis auf eine Münze drücken.",
          "Maya martwi się, że urodzaj lub powódź w innych krainach zaleje rynek tanim ziarnem i zbije cenę do jednej monety.",
        ),
        T(
          "Meanwhile, Baker Bea fears summer heatwaves will spike wheat to eight coins, ruining her bakery.",
          "Gleichzeitig fürchtet Bäckerin Bea eine Hitzewelle, die den Weizen auf acht Münzen treibt und ihre Bäckerei ruiniert.",
          "Tymczasem piekarka Bea obawia się, że letnia susza wywinduje ceny pszenicy do ośmiu monet, rujnując jej piekarnię.",
        ),
      ],
      SpringWorriesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Maya and Bea meet at the harbor table in spring before any seeds have even sprouted.",
          "Maya und Bea treffen sich im Frühling am Hafentisch, noch bevor ein einziger Halm sprießt.",
          "Maya i Bea spotykają się wiosną przy portowym stole, zanim z ziemi wykiełkuje choćby jedno źdźbło.",
        ),
        T(
          "They sign an agreement: in autumn, Maya will deliver fifty sacks at four coins each.",
          "Sie unterzeichnen einen Vertrag: Im Herbst liefert Maya fünfzig Säcke für je vier Münzen.",
          "Podpisują porozumienie: jesienią Maya dostarczy pięćdziesiąt worków mąki po cztery monety za każdy.",
        ),
        T(
          "Bea promises to buy all fifty sacks at exactly four coins, whatever the weather does.",
          "Bea verspricht, alle fünfzig Säcke für genau vier Münzen zu kaufen, wie auch immer das Wetter wird.",
          "Bea zobowiązuje się kupić wszystkie pięćdziesiąt worków dokładnie po cztery monety, bez względu na pogodę.",
        ),
        T(
          "This contract is a *derivative*, derived from real wheat, designed for *hedging* risk.",
          "Dieser Vertrag ist ein *Derivat*, abgeleitet von echtem Weizen, geschaffen zur *Absicherung* von Risiken.",
          "Ten kontrakt to *instrument pochodny (derywatyw)* powiązany z pszenicą, służący do *zabezpieczenia ryzyka (hedgingu)*.",
        ),
      ],
      HandshakeContractDiagram,
    ),
    animatedBeat(
      [
        T(
          "Autumn arrives with a harsh continent-wide drought that burns distant crops.",
          "Der Herbst kommt mit einer harten Dürre, die Ernten auf dem Kontinent verbrennt.",
          "Jesień przynosi dotkliwą suszę na całym kontynencie, która niszczy zbiory na polach.",
        ),
        T(
          "On the open market, wheat prices shoot up to eight coins per sack.",
          "Auf dem freien Markt schießt der Weizenpreis auf acht Münzen pro Sack hinauf.",
          "Na wolnym rynku ceny pszenicy natychmiast szybują w górę do ośmiu monet za worek.",
        ),
        T(
          "Other bakeries panic and close their ovens because flour is far too expensive.",
          "Andere Bäckereien geraten in Panik und schließen ihre Öfen, weil Mehl unbezahlbar ist.",
          "Inne piekarnie wpadają w panikę i wygaszają piece, bo mąka stała się za droga.",
        ),
        T(
          "Bea smiles and shows her signed contract, buying flour at four coins to bake school bread.",
          "Bea lächelt, zeigt ihren Vertrag vor und kauft Mehl zu vier Münzen, um Schulbrote zu backen.",
          "Bea uśmiecha się spokojnie, pokazuje podpisany kontrakt i kupuje mąkę po cztery monety, by piec chleb dla szkół.",
        ),
      ],
      DroughtWithContractDiagram,
    ),
    animatedBeat(
      [
        T(
          "What if the season had brought super floods instead?",
          "Was aber, wenn die Jahreszeit stattdessen Riesenüberflutungen gebracht hätte?",
          "A co, gdyby ten rok przyniósł gwałtowne ulewy i załamanie cen?",
        ),
        T(
          "Open market prices would have plunged to one coin per sack.",
          "Die freien Marktpreise wären auf eine einzige Münze pro Sack abgestürzt.",
          "Ceny na wolnym rynku spadłyby do zaledwie jednej monety za worek.",
        ),
        T(
          "Unprotected farmers would have lost two coins per sack and faced bankruptcy.",
          "Ungeschützte Bauern hätten zwei Münzen pro Sack verloren und wären pleitegegangen.",
          "Niezabezpieczeni rolnicy straciliby po dwie monety na każdym worku i zbankrutowali.",
        ),
        T(
          "With the price lock contract, Maya delivers at four coins and earns her honest one-coin profit.",
          "Mit dem Festpreisvertrag liefert Maya zu vier Münzen und sichert ihren ehrlichen Gewinn.",
          "Dzięki kontraktowi blokującemu cenę Maya sprzedaje pszenicę po cztery monety i zachowuje swój uczciwy zysk.",
        ),
      ],
      FloodWithContractDiagram,
    ),
    animatedBeat(
      [
        T(
          "Around the globe, airlines, coffee roasters, and power grids use derivatives daily.",
          "Weltweit nutzen Fluggesellschaften, Kaffeeröster und Stromnetze täglich Derivate.",
          "Na całym świecie linie lotnicze, palarnie kawy i sieci energetyczne codziennie używają instrumentów pochodnych.",
        ),
        T(
          "Lufthansa locks jet fuel prices months ahead so holiday ticket prices stay predictable.",
          "Die Lufthansa sichert Treibstoffpreise Monate im Voraus, damit Urlaubsflüge planbar bleiben.",
          "Linie lotnicze blokują ceny paliwa lotniczego na wiele miesięcy w przód, by ceny biletów wakacyjnych były stabilne.",
        ),
        T(
          "Derivatives help real businesses protect jobs and keep production running smoothly.",
          "Derivate helfen echten Unternehmen, Arbeitsplätze zu sichern und verlässlich zu wirtschaften.",
          "Instrumenty pochodne pomagają prawdziwym firmom chronić miejsca pracy i bezpiecznie planować produkcję.",
        ),
        T(
          "Used prudently for hedging, they turn wild storms into calm, steady waters.",
          "Klug zur Absicherung eingesetzt, verwandeln sie stürmische Wogen in ruhiges Fahrwasser.",
          "Używane rozważnie do zabezpieczania ryzyka, zamieniają rynkowe sztormy w spokojne wody.",
        ),
      ],
      EurexExchangeDiagram,
    ),
  ],
  toyIntro: T(
    "Switch between gambling on weather and using the price lock shield to protect farm and bakery.",
    "Wechsle zwischen Wetter-Poker und dem Preisschild, um Hof und Bäckerei abzusichern.",
    "Przełączaj między ryzykiem pogodowym a tarczą cenową, aby zabezpieczyć gospodarstwo i piekarnię.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why do producers like farmers and bakeries use price lock contracts (derivatives)?",
        "Warum nutzen Betriebe wie Bauernhöfe und Bäckereien Festpreisverträge (Derivate)?",
        "Dlaczego przedsiębiorstwa, takie jak rolnicy i piekarnie, zawierają kontrakty blokujące cenę (derywatywy)?",
      ),
      options: [
        {
          text: T(
            "To hedge against unexpected price swings and protect their businesses from losses",
            "Um sich gegen unvorhersehbare Preisschwankungen abzusichern und Verluste zu vermeiden",
            "Aby zabezpieczyć się przed niespodziewanymi wahaniami cen i ochronić firmę przed stratami",
          ),
          correct: true,
        },
        {
          text: T(
            "To make the wheat harvest turn into glitter and gold",
            "Damit die Weizenernte zu Glitzer und Gold wird",
            "Aby zbiory pszenicy zamieniły się w złoty brokat",
          ),
        },
        {
          text: T(
            "To avoid having to bake bread ever again",
            "Um nie wieder Brot backen zu müssen",
            "Aby nikt już nigdy nie musiał piec chleba",
          ),
        },
      ],
      hint: T(
        "Hedging locks in certainty so bad weather does not bankrupt the business.",
        "Absicherung schafft Planbarkeit, damit schlechtes Wetter nicht in die Pleite führt.",
        "Hedging daje pewność i stabilność, dzięki czemu zła pogoda nie doprowadzi firmy do upadłości.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What does the term 'derivative' mean?",
        "Was bedeutet der Begriff 'Derivat'?",
        "Co oznacza pojęcie 'instrument pochodny' (derywatyw)?",
      ),
      options: [
        {
          text: T(
            "A financial contract whose value is derived from an underlying real asset like wheat or fuel",
            "Ein Vertrag, dessen Wert von einem realen Basiswert wie Weizen oder Treibstoff abhängt",
            "Umowa finansowa, której wartość pochodzi od rzeczywistego dobra, takiego jak pszenica czy paliwo",
          ),
          correct: true,
        },
        {
          text: T(
            "A special type of tractor with twelve giant wheels",
            "Ein spezieller Traktor mit zwölf riesigen Rädern",
            "Specjalny typ traktora z dwunastoma wielkimi kołami",
          ),
        },
        {
          text: T(
            "A secret cooking recipe found in ancient caves",
            "Ein geheimes Kochrezept, das in alten Höhlen gefunden wurde",
            "Sekretny przepis kucharski odnaleziony w starożytnych jaskiniach",
          ),
        },
      ],
      hint: T(
        "The value of Maya's contract comes from the real sacks of wheat delivered in autumn.",
        "Der Wert von Mayas Vertrag stammt von den echten Säcken Weizen im Herbst.",
        "Wartość umowy Mayi i Bei wynika z realnych worków pszenicy dostarczanych jesienią.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "A severe drought drove open market wheat to 8 coins. Activate the 4-Coin Price Lock Shield to honor the contract.",
        "Eine Dürre treibt Weizen auf 8 Münzen. Aktiviere das 4-Münzen-Preisschild, um den Vertrag einzuhalten.",
        "Gwałtowna susza wywindowała cenę pszenicy do 8 monet. Włącz Tarczę Cenową 4 Monet, by zrealizować kontrakt.",
      ),
      Widget,
      hint: T(
        "Click the 4-Coin Price Lock Shield button and tap check.",
        "Klicke auf das 4-Münzen-Preisschild und tippe auf prüfen.",
        "Kliknij przycisk Tarczy Cenowej 4 Monet i naciśnij Sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, how do airlines know what price to charge for holiday flights when jet fuel prices change every single day?",
    "Papa, woher wissen Fluggesellschaften die Ticketpreise, wenn sich die Treibstoffpreise täglich ändern?",
    "Tato, skąd linie lotnicze wiedzą, ile zażądać za bilet na wakacje, skoro ceny paliwa lotniczego zmieniają się każdego dnia?",
  ),
  realLife: {
    title: {
      en: "Commodity Derivatives and Risk Hedging in India",
      de: "Preisabsicherung in der deutschen Wirtschaft",
      pl: "Zabezpieczanie ryzyka cenowego na giełdach w Polsce",
    },
    body: {
      en: "In India, airlines like Air India and agricultural enterprises use commodity derivatives traded on exchanges like the Multi Commodity Exchange of India (MCX) and NSE. Regulated by SEBI, futures contracts allow farmers, millers, and airlines to lock in fuel and food prices months ahead, shielding consumers from sudden global inflation.",
      de: "Deutsche Fluggesellschaften, Landwirte und Stadtwerke nutzen täglich Derivate an regulierten Börsen wie der Eurex und EEX. So sichert sich etwa die Lufthansa Kerosinpreise Monate im Voraus ab, um Ticketpreise vor plötzlichen Ölpreissprüngen zu schützen.",
      pl: "W Polsce przedsiębiorstwa energetyczne, producenci rolni i linie lotnicze (np. PLL LOT) korzystają z kontraktów terminowych (futures) notowanych na Towarowej Giełdzie Energii (TGE) oraz na GPW. Pod nadzorem KNF hedging pozwala producentom zablokować ceny prądu, gazu czy paliwa lotniczego z wielomiesięcznym wyprzedzeniem, chroniąc klientów przed nagłymi skokami cen.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Securities trading acts legally define financial derivatives as contracts whose price depends directly on an underlying asset, rate, or index.",
          de: "Das Wertpapierhandelsgesetz (WpHG § 2) definiert Derivate als Finanzinstrumente, deren Wert sich von Basiswerten ableitet.",
          pl: "Ustawa o obrocie instrumentami finansowymi (art. 2) klasyfikuje jako instrumenty pochodne kontrakty opcyjne, terminowe (futures/forward), swapy i inne prawa majątkowe zależne od instrumentów bazowych.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20051831538",
      },
      {
        text: {
          en: "Economic principles distinguish price hedging from speculation, recognizing hedging as risk management designed to reduce commercial exposure.",
          de: "Ökonomische Lehrwerke definieren Hedging als Risikomanagement zur neutralisierenden Absicherung gegen ungünstige Marktbewegungen.",
          pl: "KNF i literatura bankowa definiują hedging jako transakcję zabezpieczającą, której celem jest ograniczenie ryzyka strat wynikających ze zmian cen rynkowych, kursów walut lub stóp procentowych.",
        },
        source: "https://www.knf.gov.pl/dla_konsumenta/edukacja_finansowa",
      },
      {
        text: {
          en: "Regulated commodity exchange acts establish transparent clearing and delivery mechanisms for physical agricultural and energy goods.",
          de: "Die EEX und Terminbörsen bieten regulierte Handelsplätze mit zentralem Kontrahenten (Clearinghouse) für Energie und Rohstoffe.",
          pl: "Ustawa o giełdach towarowych reguluje obrót towarami giełdowymi (w tym energią, prawami majątkowymi i produktami rolnymi) na licencjonowanych rynkach prowadzonych przez TGE.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20001031099",
      },
      {
        text: {
          en: "International airline and shipping trade organizations document that major commercial carriers routinely hedge jet fuel to ensure operational stability.",
          de: "Luftfahrtverbände und Geschäftsberichte belegen, dass Airlines Treibstoffkosten über Terminverträge absichern.",
          pl: "Raporty branżowe IATA oraz sprawozdania przewoźników lotniczych potwierdzają powszechne stosowanie instrumentów pochodnych na paliwo lotnicze dla stabilizacji kosztów operacyjnych.",
        },
        source: "https://www.iata.org/en/publications/economics/",
      },
      {
        text: {
          en: "Financial supervisory authorities enforce margin requirements and reporting obligations under derivatives market regulations (EMIR) to prevent systemic defaults.",
          de: "Die Europäische Marktinfrastrukturverordnung (EMIR) und BaFin überwachen Risikominderungsverfahren für OTC-Derivate.",
          pl: "Rozporządzenie EMIR oraz KNF nakładają na uczestników rynku wymogi zabezpieczeń depozytowych (margins) i raportowania transakcji pochodnych w celu ochrony stabilności finansowej.",
        },
        source: "https://www.knf.gov.pl/dla_rynku/rynek_kapitalowy/rozporzadzenie_emir",
      },
    ],
    simplified: [
      {
        en: "We explain derivatives as an advance handshake agreement locking in autumn harvest prices so both farm and bakery are protected.",
        de: "Wir erklären Derivate als Vorab-Handschlagvertrag, der Erntepreise sichert, damit Hof und Bäckerei geschützt sind.",
        pl: "Wyjaśniamy istotę derywatów jako zawartą wiosną umowę gwarantującą cenę jesiennych zbiorów, co chroni zarówno rolnika, jak i piekarnię.",
      },
      {
        en: "We avoid speculative day-trading concepts and focus squarely on the foundational economic role of risk hedging.",
        de: "Wir verzichten auf Spekulationsbegriffe und konzentrieren uns ganz auf die wirtschaftliche Schutzfunktion von Hedging.",
        pl: "Unikamy spekulacyjnego żargonu giełdowego i skupiamy się na podstawowej roli instrumentów pochodnych: zabezpieczeniu przed ryzykiem.",
      },
      {
        en: "We show how price stability in raw inputs protects everyday public goods like affordable bread and reliable transport.",
        de: "Wir zeigen, wie Preisstabilität bei Rohstoffen alltägliche Güter wie bezahlbares Brot und Fahrkarten sichert.",
        pl: "Pokazujemy, jak stabilność cen surowców chroni dobra codziennego użytku, takie jak tani chleb i bilety komunikacyjne.",
      },
    ],
  },
};
