import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BorrowDiagram,
  BrakeDiagram,
  DebtGrowsDiagram,
  GapDiagram,
  InterestDiagram,
  WallVsLampDiagram,
} from "./deficit.diagrams";
import { DeficitToy } from "./deficit.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <DeficitToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <DeficitToy lang={lang} mode="quiz" onAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "deficit",
  story: [
    animatedBeat(
      [
        T(
          "Mayor Moss counts the tax pot. It holds 10 coins.",
          "Bürgermeister Moss zählt den Steuertopf. Darin liegen 10 Münzen.",
          "Burmistrz Moss liczy monety w garnku z podatkami. Jest ich 10.",
        ),
        T(
          "The town wants a school, a road, a park and a harbour wall.",
          "Die Stadt möchte eine Schule, eine Straße, einen Park und eine Hafenmauer.",
          "Miasteczko chce szkołę, drogę, park i mur w porcie.",
        ),
        T(
          "Together they cost 12 coins. The pot is 2 coins short.",
          "Zusammen kosten sie 12 Münzen. Im Topf fehlen 2 Münzen.",
          "Razem kosztują 12 monet. W garnku brakuje 2 monet.",
        ),
        T(
          "When a town spends more than it collects, there is a gap. That gap is a *deficit*.",
          "Gibt eine Stadt mehr aus, als sie einnimmt, entsteht eine Lücke. Diese Lücke heißt *Defizit*.",
          "Gdy miasteczko wydaje więcej, niż zbiera, powstaje luka. Ta luka to *deficyt*.",
        ),
      ],
      GapDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Moss does not want to cancel the school.",
          "Moss will die Schule nicht streichen.",
          "Moss nie chce rezygnować ze szkoły.",
        ),
        T(
          "So he borrows 2 coins. Bea and others lend them and buy town bonds.",
          "Also leiht er sich 2 Münzen. Bea und andere leihen sie und kaufen Stadt-Anleihen.",
          "Pożycza więc 2 monety. Bea i inni je pożyczają i kupują miejskie obligacje.",
        ),
        T(
          "Now the gap is filled. The town can build everything.",
          "Jetzt ist die Lücke gefüllt. Die Stadt kann alles bauen.",
          "Luka jest zapełniona. Miasteczko może zbudować wszystko.",
        ),
        T(
          "But the town now owes 2 coins. It must pay them back later.",
          "Aber die Stadt schuldet jetzt 2 Münzen. Sie muss sie später zurückzahlen.",
          "Ale miasteczko jest teraz winne 2 monety. Musi je później oddać.",
        ),
      ],
      BorrowDiagram,
    ),
    animatedBeat(
      [
        T(
          "Next year the pot holds 10 coins again. The wishes cost 12 again.",
          "Im nächsten Jahr liegen wieder 10 Münzen im Topf. Die Wünsche kosten wieder 12.",
          "W następnym roku w garnku znów jest 10 monet. Życzenia znów kosztują 12.",
        ),
        T(
          "Moss borrows 2 more coins. Now the town owes 4 coins.",
          "Moss leiht sich 2 Münzen mehr. Jetzt schuldet die Stadt 4 Münzen.",
          "Moss pożycza jeszcze 2 monety. Teraz miasteczko jest winne 4 monety.",
        ),
        T(
          "Year after year the gaps pile up. All the borrowed coins together are the town's debt.",
          "Jahr für Jahr wachsen die Lücken. Alle geliehenen Münzen zusammen sind die Schulden der Stadt.",
          "Rok po roku luki się sumują. Wszystkie pożyczone monety razem to dług miasteczka.",
        ),
        T(
          "For a whole country, this pile has a name. It is called the *national debt*.",
          "Bei einem ganzen Land hat dieser Haufen einen Namen. Er heißt *Staatsschulden*.",
          "Dla całego kraju ten stos ma nazwę. To *dług publiczny*.",
        ),
      ],
      DebtGrowsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Lenders want a thank-you for lending. That is interest, as you know.",
          "Wer Münzen leiht, will ein Dankeschön. Das sind Zinsen, du kennst sie schon.",
          "Kto pożycza monety, chce podziękowania. To odsetki, już je znasz.",
        ),
        T(
          "Each year the town pays interest on its debt.",
          "Jedes Jahr zahlt die Stadt Zinsen auf ihre Schulden.",
          "Co roku miasteczko płaci odsetki od swojego długu.",
        ),
        T(
          "Moss takes 1 coin from the pot for it. Only 9 coins are left.",
          "Moss nimmt dafür 1 Münze aus dem Topf. Nur 9 Münzen bleiben übrig.",
          "Moss zabiera na to 1 monetę z garnka. Zostaje tylko 9 monet.",
        ),
        T(
          "Now the school gets less. Interest eats coins that could build things.",
          "Jetzt bekommt die Schule weniger. Zinsen fressen Münzen, mit denen man bauen könnte.",
          "Teraz szkoła dostaje mniej. Odsetki zjadają monety, za które można budować.",
        ),
      ],
      InterestDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Borrowing is not always the same.",
          "Leihen ist nicht immer dasselbe.",
          "Pożyczanie nie zawsze jest takie samo.",
        ),
        T(
          "A harbour wall keeps boats safe. Finn catches more fish for many years.",
          "Eine Hafenmauer schützt die Boote. Finn fängt viele Jahre lang mehr Fische.",
          "Mur w porcie chroni łodzie. Finn łowi więcej ryb przez wiele lat.",
        ),
        T(
          "So the wall helps the town earn more later. That makes it easier to pay back.",
          "So hilft die Mauer der Stadt, später mehr zu verdienen. Das Zurückzahlen wird leichter.",
          "Mur pomaga więc miasteczku później więcej zarobić. Łatwiej wtedy oddać dług.",
        ),
        T(
          "Lamp oil is used up this year. The debt stays, but the oil is gone.",
          "Lampenöl ist schon in diesem Jahr aufgebraucht. Die Schulden bleiben, das Öl ist weg.",
          "Olej do lamp zużywa się w tym roku. Dług zostaje, ale oleju nie ma.",
        ),
        T(
          "Borrowing for something that pays back later is wiser than borrowing for daily costs.",
          "Leihen für etwas, das sich später auszahlt, ist klüger als Leihen für den Alltag.",
          "Pożyczać na coś, co zwróci się później, jest mądrzejsze niż pożyczać na codzienne wydatki.",
        ),
      ],
      WallVsLampDiagram,
    ),
    animatedBeat(
      [
        T(
          "Debt can grow and grow if nobody stops it.",
          "Schulden können immer weiter wachsen, wenn niemand sie bremst.",
          "Dług może rosnąć bez końca, jeśli nikt go nie zatrzyma.",
        ),
        T(
          "So the town makes a rule. Each year Moss may borrow only a small amount.",
          "Also macht die Stadt eine Regel. Moss darf jedes Jahr nur wenig leihen.",
          "Miasteczko ustala więc zasadę. Moss może co roku pożyczyć tylko niewiele.",
        ),
        T(
          "A rule that limits borrowing is called a *debt brake*.",
          "Eine Regel, die das Leihen begrenzt, heißt *Schuldenbremse*.",
          "Zasada, która ogranicza pożyczanie, to *hamulec zadłużenia*.",
        ),
        T(
          "In a real emergency, like a flood, the town may borrow more.",
          "Bei einem echten Notfall, etwa einer Flut, darf die Stadt mehr leihen.",
          "Przy prawdziwej katastrofie, na przykład powodzi, miasteczko może pożyczyć więcej.",
        ),
        T(
          "Then it must make a plan to pay it back.",
          "Dann muss sie einen Plan zum Zurückzahlen machen.",
          "Wtedy musi przygotować plan spłaty.",
        ),
      ],
      BrakeDiagram,
      "happy",
    ),
  ],
  toyIntro: T(
    "You are Mayor Moss for 3 years. Pick what to build, then close the year.",
    "Du bist 3 Jahre lang Bürgermeister Moss. Wähle, was gebaut wird, und schließe das Jahr ab.",
    "Przez 3 lata jesteś burmistrzem Mossem. Wybierz, co zbudować, i zamknij rok.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T("What is a deficit?", "Was ist ein Defizit?", "Czym jest deficyt?"),
      options: [
        {
          text: T(
            "All the coins a town owes together",
            "Alle Münzen, die eine Stadt zusammen schuldet",
            "Wszystkie monety, które miasteczko jest winne",
          ),
        },
        {
          text: T(
            "The town spends more than it collects",
            "Die Stadt gibt mehr aus, als sie einnimmt",
            "Miasteczko wydaje więcej, niż zbiera",
          ),
          correct: true,
        },
        {
          text: T(
            "A rule that limits borrowing",
            "Eine Regel, die das Leihen begrenzt",
            "Zasada ograniczająca pożyczanie",
          ),
        },
      ],
      hint: T(
        "A deficit is the gap in one year. Moss had 10 coins but wanted to spend 12.",
        "Ein Defizit ist die Lücke in einem Jahr. Moss hatte 10 Münzen, wollte aber 12 ausgeben.",
        "Deficyt to luka w jednym roku. Moss miał 10 monet, a chciał wydać 12.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why does a big debt make it harder to build a school?",
        "Warum macht eine hohe Schuld es schwerer, eine Schule zu bauen?",
        "Dlaczego duży dług utrudnia budowę szkoły?",
      ),
      options: [
        {
          text: T(
            "Interest takes coins from the pot every year",
            "Zinsen nehmen jedes Jahr Münzen aus dem Topf",
            "Odsetki co roku zabierają monety z garnka",
          ),
          correct: true,
        },
        {
          text: T(
            "Schools cost more when a town owes coins",
            "Schulen werden teurer, wenn eine Stadt Schulden hat",
            "Szkoły drożeją, gdy miasteczko ma dług",
          ),
        },
        {
          text: T(
            "Lenders take the school away at once",
            "Die Geldgeber nehmen die Schule sofort weg",
            "Pożyczkodawcy od razu zabierają szkołę",
          ),
        },
      ],
      hint: T(
        "Think of the coin Moss took from the pot to pay interest. Less was left to build.",
        "Denk an die Münze, die Moss für die Zinsen aus dem Topf nahm. Weniger blieb zum Bauen.",
        "Pomyśl o monecie, którą Moss zabrał z garnka na odsetki. Mniej zostało na budowę.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "The town owes 8 coins. Build the school and the road without a new gap. Then press Check.",
        "Die Stadt schuldet 8 Münzen. Baue Schule und Straße ohne neue Lücke. Drücke dann Prüfen.",
        "Miasteczko jest winne 8 monet. Zbuduj szkołę i drogę bez nowej luki. Potem naciśnij Sprawdź.",
      ),
      Widget,
      hint: T(
        "Interest takes 2 coins, so 8 are left. The harbour wall is too much on top.",
        "Zinsen nehmen 2 Münzen, also bleiben 8. Die Hafenmauer wäre zusätzlich zu viel.",
        "Odsetki zabierają 2 monety, zostaje 8. Mur w porcie byłby do tego za dużo.",
      ),
    },
  ],
  askDad: T(
    "Papa, is it okay for a country to borrow? When is it a good idea?",
    "Papa, ist es in Ordnung, wenn ein Land sich Geld leiht? Wann ist das eine gute Idee?",
    "Tato, czy kraj może pożyczać pieniądze? Kiedy to dobry pomysł?",
  ),
  realLife: {
    title: T(
      "India has a law to keep the deficit small",
      "Deutschland hat eine Schuldenbremse",
      "Polska ma w konstytucji limit długu",
    ),
    body: T(
      "In 2003 India passed the FRBM Act. It is a law that asks the government to keep its deficit small. Its rules set a goal of a deficit of 3 percent of GDP, which is all that the country makes in a year.",
      "Im Grundgesetz steht in Artikel 115 die Schuldenbremse. Der Bund darf in normalen Zeiten nur sehr wenig neue Kredite aufnehmen, etwa 0,35 Prozent der Wirtschaftsleistung. Bei einer Naturkatastrophe darf der Bundestag mehr erlauben, mit einem Plan zum Zurückzahlen.",
      "Konstytucja Polski zabrania pożyczek, przez które dług publiczny przekroczyłby trzy piąte PKB. PKB to wszystko, co kraj wytwarza w ciągu roku. Zasada jest zapisana w artykule 216.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The US national debt is the total outstanding borrowing of the federal government, built up over the nation's history. When spending is above revenue, the government borrows to cover the gap, and these deficits add up.",
          "Die US-Staatsschulden sind die gesamte offene Kreditaufnahme der Bundesregierung, aufgebaut über die Geschichte des Landes. Liegen die Ausgaben über den Einnahmen, leiht sich der Staat die Lücke, und diese Defizite summieren sich.",
          "Dług publiczny USA to całkowite zadłużenie rządu federalnego, narastające w historii kraju. Gdy wydatki przewyższają dochody, rząd pożycza na pokrycie luki, a te deficyty się sumują.",
        ),
        source: "https://fiscaldata.treasury.gov/americas-finance-guide/national-debt/",
      },
      {
        text: T(
          "A government pays interest on the money it borrows. The cost depends on the total debt and on the interest rates of the securities it sold to lenders.",
          "Ein Staat zahlt Zinsen auf das geliehene Geld. Die Kosten hängen von der Gesamtschuld und den Zinssätzen der an Geldgeber verkauften Wertpapiere ab.",
          "Państwo płaci odsetki od pożyczonych pieniędzy. Koszt zależy od całego długu i oprocentowania papierów wartościowych sprzedanych pożyczkodawcom.",
        ),
        source: "https://fiscaldata.treasury.gov/americas-finance-guide/national-debt/",
      },
      {
        text: T(
          "Germany: Article 115(2) of the Basic Law says the balance without credit income is met when borrowing does not exceed 0.35 percent of nominal GDP (the structural limit for the federal government).",
          "Deutschland: Artikel 115 Absatz 2 des Grundgesetzes sieht den Ausgleich ohne Kredite als erfüllt an, wenn die Kredite 0,35 Prozent des nominalen Bruttoinlandsprodukts nicht überschreiten (Strukturgrenze des Bundes).",
          "Niemcy: artykuł 115 ust. 2 Ustawy Zasadniczej uznaje równowagę bez kredytów za spełnioną, gdy kredyty nie przekraczają 0,35 procent nominalnego PKB (limit strukturalny dla rządu federalnego).",
        ),
        source: "https://www.gesetze-im-internet.de/gg/art_115.html",
      },
      {
        text: T(
          "Germany: in natural disasters or exceptional emergencies beyond state control, the limit may be exceeded by a majority of the Bundestag's members. The decision must come with a repayment plan.",
          "Deutschland: bei Naturkatastrophen oder außergewöhnlichen Notsituationen, die sich der Kontrolle des Staates entziehen, darf die Grenze mit der Mehrheit der Mitglieder des Bundestages überschritten werden. Der Beschluss muss mit einem Tilgungsplan verbunden sein.",
          "Niemcy: przy klęskach żywiołowych lub nadzwyczajnych sytuacjach poza kontrolą państwa limit może zostać przekroczony większością głosów członków Bundestagu. Uchwała musi zawierać plan spłaty.",
        ),
        source: "https://www.gesetze-im-internet.de/gg/art_115.html",
      },
      {
        text: T(
          "Poland: Article 216(5) of the Constitution bars loans and guarantees that would create a national public debt exceeding three fifths of the annual GDP.",
          "Polen: Artikel 216 Absatz 5 der Verfassung verbietet Kredite und Bürgschaften, die zu einer öffentlichen Schuld von mehr als drei Fünfteln des jährlichen BIP führen würden.",
          "Polska: art. 216 ust. 5 Konstytucji zakazuje zaciągania pożyczek i udzielania gwarancji, które powodowałyby, że dług publiczny przekroczy trzy piąte rocznego PKB.",
        ),
        source: "https://www.constituteproject.org/constitution/Poland_2009",
      },
      {
        text: T(
          "India: the Fiscal Responsibility and Budget Management (FRBM) Act was enacted in 2003. The rules notified in 2004 set a goal of cutting the fiscal deficit to 3 percent of GDP by 2008-09.",
          "Indien: Das Gesetz über Haushaltsverantwortung und Haushaltsführung (FRBM Act) wurde 2003 erlassen. Die 2004 bekanntgemachten Regeln setzten das Ziel, das Haushaltsdefizit bis 2008-09 auf 3 Prozent des BIP zu senken.",
          "Indie: ustawa o odpowiedzialności fiskalnej i zarządzaniu budżetem (FRBM Act) weszła w życie w 2003 roku. Przepisy ogłoszone w 2004 roku wyznaczyły cel obniżenia deficytu do 3 procent PKB do 2008-09.",
        ),
        source:
          "https://ies.gov.in/index.php/arthapedia/concept/fiscal-responsibility-and-budget-management-frbm-act",
      },
      {
        text: T(
          "Alexander Hamilton proposed that the new US federal government take over the states' War of Independence debts, arguing they were incurred for the common good. Congress passed the assumption bill in July 1790.",
          "Alexander Hamilton schlug vor, dass die neue US-Bundesregierung die Schulden der Staaten aus dem Unabhängigkeitskrieg übernimmt, weil sie dem Gemeinwohl dienten. Der Kongress beschloss die Übernahme im Juli 1790.",
          "Alexander Hamilton zaproponował, by nowy rząd federalny USA przejął długi stanów z wojny o niepodległość, argumentując, że powstały dla wspólnego dobra. Kongres uchwalił przejęcie w lipcu 1790 roku.",
        ),
        source: "https://www.imf.org/en/Publications/fandd/issues/2018/03/gaspar",
      },
      {
        text: T(
          "The IMF's Fiscal Monitor reports on countries' budget deficits and public debt ratios.",
          "Der Fiscal Monitor des IWF berichtet über die Haushaltsdefizite und Schuldenquoten der Länder.",
          "Fiscal Monitor MFW opisuje deficyty budżetowe i wskaźniki długu publicznego państw.",
        ),
        source: "https://www.imf.org/en/Publications/FM",
      },
    ],
    simplified: [
      T(
        "The tax pot, the coins and the 12 coins of wishes are made up numbers. Real budgets have thousands of items and a government can also change taxes.",
        "Steuertopf, Münzen und die 12 Münzen Wünsche sind erfundene Zahlen. Echte Haushalte haben tausende Posten, und ein Staat kann auch Steuern ändern.",
        "Garnek z podatkami, monety i 12 monet życzeń to wymyślone liczby. Prawdziwe budżety mają tysiące pozycji, a państwo może też zmieniać podatki.",
      ),
      T(
        "Interest is shown as one quarter of the debt, rounded up. Real interest depends on the rate of each loan and changes over time.",
        "Zinsen sind als ein Viertel der Schuld gezeigt, aufgerundet. Echte Zinsen hängen vom Satz jedes Kredits ab und ändern sich mit der Zeit.",
        "Odsetki to jedna czwarta długu, zaokrąglona w górę. Prawdziwe odsetki zależą od oprocentowania każdej pożyczki i zmieniają się w czasie.",
      ),
      T(
        "Borrowing for a harbour wall is shown as wiser than borrowing for lamp oil. This is a common rule of thumb. Real choices depend on the project and on how much the town already owes.",
        "Leihen für eine Hafenmauer wird als klüger gezeigt als Leihen für Lampenöl. Das ist eine gängige Faustregel. Echte Entscheidungen hängen vom Projekt und von der bisherigen Schuld ab.",
        "Pożyczanie na mur w porcie jest pokazane jako mądrzejsze niż na olej do lamp. To częsta reguła kciuka. Prawdziwe decyzje zależą od projektu i dotychczasowego długu.",
      ),
      T(
        "The debt brake is shown as one simple limit with an emergency exception. Real rules, such as Article 115, have further exceptions and details that the lesson does not show.",
        "Die Schuldenbremse wird als eine einfache Grenze mit Notfall-Ausnahme gezeigt. Echte Regeln, etwa Artikel 115, haben weitere Ausnahmen und Einzelheiten, die die Lektion nicht zeigt.",
        "Hamulec zadłużenia jest pokazany jako jeden prosty limit z wyjątkiem na katastrofy. Prawdziwe przepisy, jak art. 115, mają dalsze wyjątki i szczegóły, których lekcja nie pokazuje.",
      ),
      T(
        "A town and a country are not the same. A country can also lend to itself through its own people and banks, and it does not have to repay everything at once. The story keeps only the core idea.",
        "Eine Stadt und ein Land sind nicht dasselbe. Ein Land leiht sich Geld auch bei den eigenen Menschen und Banken und muss nicht alles auf einmal zurückzahlen. Die Geschichte behält nur die Kernidee.",
        "Miasto i kraj to nie to samo. Kraj pożycza też od własnych obywateli i banków i nie musi oddać wszystkiego naraz. Historia zachowuje tylko główną ideę.",
      ),
      T(
        "Hamilton and the early US debt appear only on this card, not in the story.",
        "Hamilton und die frühen US-Schulden stehen nur auf dieser Karte, nicht in der Geschichte.",
        "Hamilton i wczesny dług USA są tylko na tej karcie, nie w historii.",
      ),
    ],
  },
};
