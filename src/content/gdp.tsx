import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  AddUpDiagram,
  FishSumDiagram,
  MissedDiagram,
  SameNumberDiagram,
  SoldOnlyDiagram,
  ThreeMakersDiagram,
} from "./gdp.diagrams";
import { GdpToy } from "./gdp.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <GdpToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <GdpToy lang={lang} mode="quiz" onAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "gdp",
  story: [
    animatedBeat(
      [
        T(
          "Ripple Town wants to know how much it makes in one year.",
          "Ripple Town will wissen, wie viel es in einem Jahr herstellt.",
          "Ripple Town chce wiedzieć, ile wytwarza w ciągu roku.",
        ),
        T(
          "Let us count at the market. Finn sells 3 fish at 2 coins each.",
          "Zählen wir auf dem Markt. Finn verkauft 3 Fische für je 2 Münzen.",
          "Policzmy na targu. Finn sprzedaje 3 ryby po 2 monety.",
        ),
        T(
          "3 times 2 is 6. Finn's fish are worth 6 coins.",
          "3 mal 2 ist 6. Finns Fische sind 6 Münzen wert.",
          "3 razy 2 to 6. Ryby Finna są warte 6 monet.",
        ),
      ],
      FishSumDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Bea bakes 4 loaves and sells each for 2 coins. That is 8 coins.",
          "Bea backt 4 Brote und verkauft jedes für 2 Münzen. Das sind 8 Münzen.",
          "Bea piecze 4 bochenki i sprzedaje każdy za 2 monety. To 8 monet.",
        ),
        T(
          "Sam sells 2 pairs of shoes at 4 coins each. That is 8 coins too.",
          "Sam verkauft 2 Paar Schuhe für je 4 Münzen. Das sind auch 8 Münzen.",
          "Sam sprzedaje 2 pary butów po 4 monety. To też 8 monet.",
        ),
        T(
          "So Finn made 6 coins, Bea made 8 and Sam made 8.",
          "Also hat Finn 6 Münzen gemacht, Bea 8 und Sam 8.",
          "Finn zrobił więc 6 monet, Bea 8 i Sam 8.",
        ),
      ],
      ThreeMakersDiagram,
    ),
    animatedBeat(
      [
        T(
          "Now we add it all up: 6 plus 8 plus 8.",
          "Jetzt rechnen wir alles zusammen: 6 plus 8 plus 8.",
          "Teraz dodajemy wszystko: 6 plus 8 plus 8.",
        ),
        T(
          "That makes 22 coins of things made and sold in one year.",
          "Das macht 22 Münzen an Dingen, die in einem Jahr hergestellt und verkauft wurden.",
          "To 22 monety rzeczy wytworzonych i sprzedanych w ciągu roku.",
        ),
        T(
          "The value of everything a country makes in a year is its *GDP*. Ripple Town's GDP is 22 coins.",
          "Der Wert von allem, was ein Land in einem Jahr herstellt, heißt *Bruttoinlandsprodukt*, kurz BIP. Das BIP von Ripple Town ist 22 Münzen.",
          "Wartość wszystkiego, co kraj wytwarza w ciągu roku, to *PKB*. PKB Ripple Town to 22 monety.",
        ),
        T(
          "A whole country does the same sum, with millions of makers.",
          "Ein ganzes Land rechnet genauso, mit Millionen Herstellern.",
          "Cały kraj liczy tak samo, z milionami wytwórców.",
        ),
      ],
      AddUpDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "Bea also bakes a loaf for her own family. Nobody pays for it.",
          "Bea backt auch ein Brot für ihre eigene Familie. Niemand bezahlt dafür.",
          "Bea piecze też bochenek dla własnej rodziny. Nikt za niego nie płaci.",
        ),
        T(
          "Bread in the shop has a price, so it is made to be sold.",
          "Brot im Laden hat einen Preis, es wird zum Verkaufen gemacht.",
          "Chleb w sklepie ma cenę, więc powstaje na sprzedaż.",
        ),
        T(
          "GDP counts only what is made to be sold. The loaf at home is left out.",
          "Das BIP zählt nur, was zum Verkaufen gemacht wird. Das Brot zu Hause bleibt draußen.",
          "PKB liczy tylko to, co powstaje na sprzedaż. Chleb w domu się nie liczy.",
        ),
      ],
      SoldOnlyDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "A neighbour mends your fence for free. Nobody pays, so GDP skips it.",
          "Ein Nachbar repariert deinen Zaun gratis. Niemand zahlt, also überspringt das BIP es.",
          "Sąsiad naprawia ci płot za darmo. Nikt nie płaci, więc PKB to pomija.",
        ),
        T(
          "The river is clean and the air is fresh. Nobody sells that either.",
          "Der Fluss ist sauber und die Luft ist frisch. Das verkauft auch niemand.",
          "Rzeka jest czysta, a powietrze świeże. Tego też nikt nie sprzedaje.",
        ),
        T(
          "These things matter a lot, but GDP does not count them.",
          "Diese Dinge sind sehr wichtig, aber das BIP zählt sie nicht.",
          "Te rzeczy bardzo się liczą, ale PKB ich nie liczy.",
        ),
      ],
      MissedDiagram,
    ),
    animatedBeat(
      [
        T(
          "A big GDP means a lot was made and sold.",
          "Ein großes BIP heißt, dass viel hergestellt und verkauft wurde.",
          "Duże PKB znaczy, że dużo wytworzono i sprzedano.",
        ),
        T(
          "Two towns can have the same GDP. In one, people have time to play. In the other, they always rush.",
          "Zwei Städte können dasselbe BIP haben. In einer haben die Menschen Zeit zum Spielen. In der anderen haben sie es immer eilig.",
          "Dwa miasteczka mogą mieć to samo PKB. W jednym ludzie mają czas na zabawę. W drugim wciąż się spieszą.",
        ),
        T(
          "GDP is one useful number. It is not the whole story.",
          "Das BIP ist eine nützliche Zahl. Es ist nicht die ganze Geschichte.",
          "PKB to jedna przydatna liczba. To nie cała historia.",
        ),
      ],
      SameNumberDiagram,
      "happy",
    ),
  ],
  toyIntro: T(
    "Change Finn's fish and Bea's bread. Then try giving the bread away.",
    "Ändere Finns Fische und Beas Brot. Probiere dann, das Brot zu verschenken.",
    "Zmieniaj ryby Finna i chleb Bei. Potem spróbuj rozdać chleb.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T("What is GDP?", "Was ist das BIP?", "Czym jest PKB?"),
      options: [
        {
          text: T(
            "All the coins the town has saved",
            "Alle Münzen, die die Stadt gespart hat",
            "Wszystkie monety, które miasteczko zaoszczędziło",
          ),
        },
        {
          text: T(
            "The coins the mayor collects",
            "Die Münzen, die der Bürgermeister einsammelt",
            "Monety, które zbiera burmistrz",
          ),
        },
        {
          text: T(
            "The value of everything made in a year",
            "Der Wert von allem, was in einem Jahr hergestellt wird",
            "Wartość wszystkiego, co powstaje w ciągu roku",
          ),
          correct: true,
        },
      ],
      hint: T(
        "GDP is not savings. It adds up what Finn, Bea and Sam made in one year.",
        "Das BIP sind keine Ersparnisse. Es zählt zusammen, was Finn, Bea und Sam in einem Jahr gemacht haben.",
        "PKB to nie oszczędności. Dodaje to, co Finn, Bea i Sam zrobili w ciągu roku.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Bea bakes a loaf for her own family. Does GDP count it?",
        "Bea backt ein Brot für ihre eigene Familie. Zählt das BIP es?",
        "Bea piecze chleb dla własnej rodziny. Czy PKB go liczy?",
      ),
      options: [
        {
          text: T(
            "No, it was not made to sell",
            "Nein, es wurde nicht zum Verkauf gemacht",
            "Nie, nie powstał na sprzedaż",
          ),
          correct: true,
        },
        {
          text: T(
            "Yes, every loaf Bea bakes counts",
            "Ja, jedes Brot von Bea zählt",
            "Tak, każdy chleb Bei się liczy",
          ),
        },
        {
          text: T(
            "Only if Bea bakes it quickly",
            "Nur wenn Bea es schnell backt",
            "Tylko jeśli Bea upiecze go szybko",
          ),
        },
      ],
      hint: T(
        "GDP counts what is made to be sold. Nobody paid for the loaf at home.",
        "Das BIP zählt, was zum Verkaufen gemacht wird. Für das Brot zu Hause hat niemand bezahlt.",
        "PKB liczy to, co powstaje na sprzedaż. Za chleb w domu nikt nie zapłacił.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Finn catches 4 fish. Bea gives her bread away. Make the bar show 8. Then press Check.",
        "Finn fängt 4 Fische. Bea verschenkt ihr Brot. Lass den Balken 8 zeigen. Drücke dann Pruefen.",
        "Finn łowi 4 ryby. Bea rozdaje chleb. Ustaw słupek na 8. Potem naciśnij Sprawdź.",
      ),
      Widget,
      hint: T(
        "4 fish at 2 coins is 8. Bread given away adds nothing to the bar.",
        "4 Fische zu je 2 Münzen sind 8. Verschenktes Brot fügt dem Balken nichts hinzu.",
        "4 ryby po 2 monety to 8. Rozdany chleb nic nie dodaje do słupka.",
      ),
    },
  ],
  askDad: T(
    "Papa, if a country makes a lot, are all its people happy?",
    "Papa, sind alle Menschen glücklich, wenn ein Land viel herstellt?",
    "Tato, czy jeśli kraj wytwarza dużo, wszyscy ludzie są szczęśliwi?",
  ),
  realLife: {
    title: T(
      "India counts its GDP",
      "In Deutschland zählt Destatis das BIP",
      "W Polsce PKB liczy GUS",
    ),
    body: T(
      "In India, the National Statistics Office prepares the national accounts. It is part of the Ministry of Statistics. GDP is one of the numbers in these accounts.",
      "Das Statistische Bundesamt (Destatis) berechnet das Bruttoinlandsprodukt. Es tut das jedes Vierteljahr neu. Das ist dieselbe Summe wie in Ripple Town.",
      "Główny Urząd Statystyczny (GUS) publikuje szacunki PKB. Najpierw podaje szybki szacunek. Później poprawia go dokładniejszymi danymi.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "GDP is the value of the final goods and services produced in a country.",
          "Das BIP ist der Wert der Endprodukte und Dienstleistungen, die in einem Land hergestellt werden.",
          "PKB to wartość dóbr końcowych i usług wytworzonych w kraju.",
        ),
        source: "https://www.bea.gov/resources/learning-center/what-to-know-gdp",
      },
      {
        text: T(
          "The US Bureau of Economic Analysis estimates GDP every quarter and every year, and releases new GDP statistics every month.",
          "Das US-Wirtschaftsamt BEA schätzt das BIP jedes Quartal und jedes Jahr und veröffentlicht jeden Monat neue BIP-Statistiken.",
          "Amerykańskie Biuro Analiz Ekonomicznych (BEA) szacuje PKB co kwartał i co rok oraz co miesiąc publikuje nowe statystyki PKB.",
        ),
        source: "https://www.bea.gov/resources/learning-center/what-to-know-gdp",
      },
      {
        text: T(
          "GDP leaves out household and other unpaid work, and activities that are not provided through the market, such as volunteer work.",
          "Das BIP lässt Haushaltsarbeit und andere unbezahlte Arbeit aus, ebenso Tätigkeiten, die nicht über den Markt laufen, etwa Ehrenamt.",
          "PKB pomija pracę domową i inną nieodpłatną oraz działania poza rynkiem, na przykład wolontariat.",
        ),
        source: "https://en.wikipedia.org/wiki/Gross_domestic_product",
      },
      {
        text: T(
          "GDP is not a measure of overall standard of living or well-being.",
          "Das BIP misst nicht den allgemeinen Lebensstandard oder das Wohlergehen.",
          "PKB nie mierzy ogólnego poziomu życia ani dobrostanu.",
        ),
        source: "https://en.wikipedia.org/wiki/Gross_domestic_product",
      },
      {
        text: T(
          "Simon Kuznets took charge of the NBER's work on US national income accounts in 1931. His 1934 report to the US Senate was called National Income, 1929-1932.",
          "Simon Kuznets übernahm 1931 die Leitung der Arbeit des NBER an den US-Volkseinkommensrechnungen. Sein Bericht von 1934 an den US-Senat hieß National Income, 1929-1932.",
          "Simon Kuznets objął w 1931 roku kierownictwo prac NBER nad amerykańskimi rachunkami dochodu narodowego. Jego raport z 1934 roku dla Senatu USA nosił tytuł National Income, 1929-1932.",
        ),
        source: "https://en.wikipedia.org/wiki/Simon_Kuznets",
      },
      {
        text: T(
          "Kuznets received the 1971 Nobel Memorial Prize in Economic Sciences.",
          "Kuznets erhielt 1971 den Wirtschaftsnobelpreis.",
          "Kuznets otrzymał w 1971 roku Nagrodę Nobla w dziedzinie ekonomii.",
        ),
        source: "https://en.wikipedia.org/wiki/Simon_Kuznets",
      },
      {
        text: T(
          "Bhutan's Gross National Happiness was put forward by the Fourth King, Jigme Singye Wangchuck, in the early 1970s. It stresses the happiness of the people.",
          "Bhutans Bruttonationalglück wurde vom Vierten König Jigme Singye Wangchuck in den frühen 1970er Jahren vorgeschlagen. Es betont das Glück der Menschen.",
          "Bhutański Narodowy Wskaźnik Szczęścia zaproponował czwarty król Jigme Singye Wangchuck na początku lat 70. Podkreśla szczęście ludzi.",
        ),
        source: "https://www.mfa.gov.bt/rbedelhi/Bhutan-at-Glance/Gross-National-Happiness/",
      },
      {
        text: T(
          "Germany: the Federal Statistical Office (Destatis) publishes quarterly GDP results.",
          "Deutschland: Das Statistische Bundesamt (Destatis) veröffentlicht vierteljährliche BIP-Ergebnisse.",
          "Niemcy: Federalny Urząd Statystyczny (Destatis) publikuje kwartalne wyniki PKB.",
        ),
        source:
          "https://www.destatis.de/EN/Themes/Economy/National-Accounts-Domestic-Product/_node.html",
      },
      {
        text: T(
          "Poland: Statistics Poland (GUS) publishes flash and updated estimates of GDP.",
          "Polen: Das polnische Statistikamt (GUS) veröffentlicht Schnellschätzungen und aktualisierte Schätzungen des BIP.",
          "Polska: Główny Urząd Statystyczny (GUS) publikuje szybkie i zaktualizowane szacunki PKB.",
        ),
        source: "https://stat.gov.pl/en/topics/national-accounts/",
      },
      {
        text: T(
          "India: the National Statistical Office, part of the Ministry of Statistics and Programme Implementation, prepares the national accounts.",
          "Indien: Das Nationale Statistikamt im Ministerium für Statistik und Programmumsetzung erstellt die volkswirtschaftlichen Gesamtrechnungen.",
          "Indie: Krajowy Urząd Statystyczny w Ministerstwie Statystyki i Realizacji Programów przygotowuje rachunki narodowe.",
        ),
        source: "https://en.wikipedia.org/wiki/Ministry_of_Statistics_and_Programme_Implementation",
      },
    ],
    simplified: [
      T(
        "GDP counts final goods and services only: the bread, not also the flour in it. Counting both would count the flour twice.",
        "Das BIP zählt nur Endprodukte und Dienstleistungen: das Brot, nicht auch das Mehl darin. Beides zu zählen würde das Mehl doppelt zählen.",
        "PKB liczy tylko dobra końcowe i usługi: chleb, a nie też mąkę w nim. Liczenie obu policzyłoby mąkę dwa razy.",
      ),
      T(
        "A town of three makers stands in for millions of firms. Real GDP is added up from a huge number of sales.",
        "Eine Stadt mit drei Herstellern steht für Millionen Firmen. Das echte BIP wird aus riesig vielen Verkäufen zusammengerechnet.",
        "Miasteczko z trzema wytwórcami zastępuje miliony firm. Prawdziwe PKB sumuje ogromną liczbę sprzedaży.",
      ),
      T(
        "What GDP misses is a few examples, not a full list. The coin prices are made up.",
        "Was das BIP übersieht, sind nur ein paar Beispiele, keine vollständige Liste. Die Münzpreise sind ausgedacht.",
        "To, czego PKB nie liczy, to kilka przykładów, nie pełna lista. Ceny w monetach są wymyślone.",
      ),
      T(
        "How GDP is measured in detail, how it grows and how it is shared out are left for later.",
        "Wie das BIP im Einzelnen gemessen wird, wie es wächst und wie es verteilt wird, bleibt für später.",
        "Szczegóły pomiaru PKB, jego wzrost i podział zostają na później.",
      ),
    ],
  },
};
