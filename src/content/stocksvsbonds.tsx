import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  EquityVsDebtDiagram,
  ExpeditionShipDiagram,
  GrandTreasureDiagram,
  PortfolioBalanceDiagram,
  ShipwreckPriorityDiagram,
} from "./stocksvsbonds.diagrams";
import { StocksVsBondsToy } from "./stocksvsbonds.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <StocksVsBondsToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <StocksVsBondsToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "stocksvsbonds",
  story: [
    animatedBeat(
      [
        T(
          "Captain Coral equips a large sea expedition ship to seek trade goods across the ocean.",
          "Kapitän Coral rüstet ein großes Expeditionsschiff aus, um Waren über den Ozean zu handeln.",
          "Kapitan Coral wyposaża potężny statek ekspedycyjny, aby wyruszyć za ocean po cenne towary handlowe.",
        ),
        T(
          "Outfitting the hull with canvas sails and provisions requires two hundred coins.",
          "Den Rumpf mit Segeln und Proviant auszustatten, kostet zweihundert Münzen.",
          "Przygotowanie kadłuba, żagli i prowiantu wymaga aż dwustu monet.",
        ),
        T(
          "Two villagers want to participate in the journey, but each chooses a different path.",
          "Zwei Dorfbewohner möchten sich an der Reise beteiligen, wählen aber unterschiedliche Wege.",
          "Dwoje mieszkańców chce wziąć udział w wyprawie, ale każde z nich wybiera inną drogę.",
        ),
        T(
          "Finn buys a stock share, while Bea buys a formal ship bond.",
          "Finn kauft eine Aktie, während Bea eine feierliche Schiffanleihe erwirbt.",
          "Finn kupuje akcję spółki okrętowej, podczas gdy Bea wybiera urzędową obligację morską.",
        ),
      ],
      ExpeditionShipDiagram,
    ),
    animatedBeat(
      [
        T(
          "Finn becomes a part-owner of the ship by investing *equity*.",
          "Finn wird durch *Eigenkapital* zum Miteigentümer des Schiffes.",
          "Finn wnosi *kapitał własny* i staje się współwłaścicielem statku.",
        ),
        T(
          "If the ship discovers vast riches, Finn shares in all the unbounded profits.",
          "Entdeckt das Schiff große Schätze, teilt Finn alle unbegrenzten Gewinne.",
          "Jeśli statek odnajdzie wielkie skarby, Finn otrzyma swoją część nieograniczonych zysków.",
        ),
        T(
          "Bea acts as a lender, providing *debt* capital to the expedition.",
          "Bea fungiert als Geldgeberin und stellt *Fremdkapital* für die Reise bereit.",
          "Bea działa jako pożyczkodawczyni, zapewniając wyprawie *kapitał dłużny*.",
        ),
        T(
          "Bea gets no voting power and no extra windfalls, but holds a fixed promise of five coins.",
          "Bea hat kein Mitspracherecht, hält aber eine feste Zusage über fünf Münzen Zinsen.",
          "Bea nie decyduje o rejsie ani nie liczy na niespodziewane bogactwa, lecz ma pewną obietnicę pięciu monet odsetek.",
        ),
      ],
      EquityVsDebtDiagram,
    ),
    animatedBeat(
      [
        T(
          "On the first voyage, the ship returns laden with glistening pearls and rare silks.",
          "Von der ersten Reise kehrt das Schiff beladen mit Perlen und Seide zurück.",
          "Z pierwszego rejsu statek powraca wypełniony lśniącymi perłami i rzadkim jedwabiem.",
        ),
        T(
          "After costs, the expedition counts one hundred coins of revenue.",
          "Nach Abzug aller Kosten zählt die Expedition hundert Münzen Erlös.",
          "Po pokryciu wszystkich kosztów wyprawa notuje sto monet czystego zysku.",
        ),
        T(
          "Bea receives her fixed five coins interest as agreed in the bond contract.",
          "Bea erhält ihre fest vereinbarten fünf Münzen Zinsen aus dem Anleihevertrag.",
          "Bea otrzymuje swoje stałe pięć monet odsetek, dokładnie jak zapisano w umowie obligacji.",
        ),
        T(
          "Finn receives the entire remaining ninety-five coins as an extraordinary profit dividend!",
          "Finn erhält die gesamten restlichen fünfundneunzig Münzen als riesigen Gewinn!",
          "Finn zgarnia całe pozostałe dziewięćdziesiąt pięć monet jako gigantyczną dywidendę!",
        ),
      ],
      GrandTreasureDiagram,
    ),
    animatedBeat(
      [
        T(
          "On another voyage, violent rocks damage the hull and most cargo sinks into the waves.",
          "Auf einer anderen Fahrt beschädigen Klippen den Rumpf und Fracht versinkt im Meer.",
          "Podczas innej podróży ostre skały dziurawią kadłub i większość ładunku tonie w falach.",
        ),
        T(
          "The sailors barely scrape together four coins from salvaged timber.",
          "Die Matrosen können aus geretteten Planken mühsam vier Münzen erlösen.",
          "Marynarzom udaje się odzyskać zaledwie cztery monety ze sprzedaży uratowanego drewna.",
        ),
        T(
          "Under the law of *priority*, lenders are repaid before owners receive anything.",
          "Nach der gesetzlichen *Rangfolge* werden Gläubiger bezahlt, bevor Eigentümer Geld sehen.",
          "Zgodnie z zasadą *pierwszeństwa zaspokajania*, wierzyciele otrzymują spłatę, zanim właściciele dostaną choćby grosz.",
        ),
        T(
          "Bea receives all four salvaged coins, while Finn receives zero coins and loses his investment.",
          "Bea erhält alle vier geretteten Münzen, während Finn leer ausgeht und sein Geld verliert.",
          "Bea otrzymuje wszystkie cztery ocalone monety, podczas gdy Finn dostaje zero i traci całą swoją inwestycję.",
        ),
      ],
      ShipwreckPriorityDiagram,
    ),
    animatedBeat(
      [
        T(
          "Wise savers balance both stocks and bonds in their portfolios.",
          "Kluge Sparer kombinieren Aktien und Anleihen in ihren Depots.",
          "Mądrzy inwestorzy łączą w portfelu zarówno akcje, jak i obligacje.",
        ),
        T(
          "Stocks provide the engine of long-term economic growth.",
          "Aktien dienen als Motor für langfristiges wirtschaftliches Wachstum.",
          "Akcje są motorem napędowym długoterminowego wzrostu majątku.",
        ),
        T(
          "Bonds provide steady ballast, safety, and predictable income when storms hit.",
          "Anleihen bieten stabilen Ballast, Sicherheit und verlässliche Erträge im Sturm.",
          "Obligacje stanowią stabilny balast, zapewniając bezpieczeństwo i przewidywalny dochód podczas rynkowych burz.",
        ),
        T(
          "Together, they help families grow their wealth while sleeping peacefully.",
          "Zusammen helfen sie Familien, Vermögen aufzubauen und ruhig zu schlafen.",
          "Połączone razem, pozwalają rodzinom pomnażać oszczędności i spać spokojnie.",
        ),
      ],
      PortfolioBalanceDiagram,
    ),
  ],
  toyIntro: T(
    "Test different voyage outcomes to see how stockholders and bondholders share treasure and shipwreck losses.",
    "Teste Fahrtergebnisse, um zu sehen, wie Aktionäre und Anleiheinhaber Gewinn und Verlust teilen.",
    "Przetestuj różne wyniki wyprawy, aby zobaczyć, jak akcjonariusze i posiadacze obligacji dzielą zyski oraz straty z katastrofy.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Who gets paid first if a company fails and only a few coins are salvaged?",
        "Wer wird zuerst bezahlt, wenn ein Unternehmen scheitert und nur wenige Münzen übrig sind?",
        "Kto ma pierwszeństwo wypłaty, gdy firma upada i odzyskano tylko niewiele monet?",
      ),
      options: [
        {
          text: T(
            "Bondholders (creditors) have legal priority over stockholders (owners)",
            "Anleihegläubiger haben gesetzlichen Vorrang vor Aktionären (Eigentümern)",
            "Posiadacze obligacji (wierzyciele) mają ustawowe pierwszeństwo przed akcjonariuszami (właścicielami)",
          ),
          correct: true,
        },
        {
          text: T(
            "Stockholders keep all the remaining coins for themselves",
            "Aktionäre behalten alle verbliebenen Münzen für sich selbst",
            "Akcjonariusze zatrzymują wszystkie pozostałe monety dla siebie",
          ),
        },
        {
          text: T(
            "The coins must be tossed into the sea for the fish",
            "Die Münzen müssen für die Fische ins Meer geworfen werden",
            "Wszystkie monety należy wrzucić do morza dla ryb",
          ),
        },
      ],
      hint: T(
        "Lenders are paid first by law before co-owners receive anything.",
        "Geldgeber werden gesetzlich zuerst bedient, bevor Eigentümer etwas bekommen.",
        "Wierzyciele są spłacani w pierwszej kolejności na mocy prawa.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why would an investor choose stocks instead of bonds?",
        "Warum würde ein Anleger Aktien statt Anleihen wählen?",
        "Dlaczego inwestor miałby wybrać akcje zamiast obligacji?",
      ),
      options: [
        {
          text: T(
            "Stocks offer unlimited upside when a company invents great products and grows",
            "Aktien bieten unbegrenzte Gewinnchancen, wenn die Firma wächst und floriert",
            "Akcje oferują nieograniczony udział w zyskach, gdy przedsiębiorstwo tworzy świetne produkty i rośnie",
          ),
          correct: true,
        },
        {
          text: T(
            "Stocks guarantee that you can never lose a single penny",
            "Aktien garantieren, dass man niemals einen Cent verlieren kann",
            "Akcje dają gwarancję, że nigdy nie stracisz ani jednego grosza",
          ),
        },
        {
          text: T(
            "Stocks can be eaten as a nutritious snack after lunch",
            "Aktien können als nahrhafter Snack nach dem Mittagessen gegessen werden",
            "Akcje można zjeść jako pożywną przekąskę po obiedzie",
          ),
        },
      ],
      hint: T(
        "Think about Finn receiving 95 coins when the ship found the grand treasure.",
        "Denke daran, wie Finn 95 Münzen bekam, als das Schiff den großen Schatz fand.",
        "Przypomnij sobie, jak Finn otrzymał aż 95 monet, gdy ekspedycja odkryła wielki skarb.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "The ship brought back only 6 coins. Pay Bea her 5-coin bond interest first (Creditor Priority).",
        "Das Schiff brachte nur 6 Münzen. Zahle Bea zuerst ihre 5 Münzen Anleihezinsen (Vorrang).",
        "Statek przywiózł zaledwie 6 monet. Wypłać najpierw Bei 5 monet odsetek z obligacji (Pierwszeństwo wierzyciela).",
      ),
      Widget,
      hint: T(
        "Tap the Pay button until Bea receives 5 coins, then tap check.",
        "Tippe auf den Bezahlknopf, bis Bea 5 Münzen hat, und tippe auf prüfen.",
        "Naciskaj przycisk wypłaty, aż Bea otrzyma 5 monet, a następnie naciśnij Sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, if you were investing money for my future, would you choose exciting company shares or steady bonds?",
    "Papa, wenn du Geld für meine Zukunft anlegst, würdest du eher spannende Firmenaktien oder sichere Anleihen wählen?",
    "Tato, gdybyś odkładał pieniądze na moją przyszłość, wybrałbyś ekscytujące akcje rozwijających się firm czy bezpieczne obligacje?",
  ),
  realLife: {
    title: {
      en: "Creditor Priority and Asset Allocation in India",
      de: "Gläubigervorrang im deutschen Insolvenzrecht",
      pl: "Kolejność zaspokajania roszczeń w polskim prawie upadłościowym",
    },
    body: {
      en: "Under the Insolvency and Bankruptcy Code (IBC 2016 Section 53) in India, if a corporation is liquidated, secured financial creditors and bondholders are paid from the waterfall of assets before equity shareholders receive anything. That is why mutual funds in India balance equities for growth with fixed-income debt for stability.",
      de: "Nach der deutschen Insolvenzordnung (InsO §§ 38, 39) müssen bei einer Unternehmenspleite Gläubiger und Anleiheinhaber vorrangig aus der Masse bedient werden, bevor Aktionäre einen Cent erhalten. Wegen dieser Rangfolge sind Aktien riskanter als Anleihen.",
      pl: "W polskim Prawie upadłościowym (art. 342) obowiązuje ścisła hierarchia zaspokajania wierzycieli z masy upadłości. Wierzyciele i obligatariusze mają bezwzględne pierwszeństwo przed akcjonariuszami i wspólnikami spółki. Z tego powodu fundusze inwestycyjne łączą akcje (dla potencjału zysku) z obligacjami (dla bezpieczeństwa i stabilizacji kapitału).",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Insolvency statutes establish a strict statutory waterfall where secured and unsecured creditors are satisfied before equity shareholders receive residual funds.",
          de: "Die Insolvenzordnung (InsO § 38) regelt den gesetzlichen Gläubigervorrang gegenüber nachrangigen Anteilseignern.",
          pl: "Prawo upadłościowe (art. 342) ustala kolejność podziału funduszów masy upadłości: wierzytelności podlegają zaspokojeniu w ściśle określonych kategoriach przed wspólnikami i akcjonariuszami.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20030600535",
      },
      {
        text: {
          en: "Commercial codes define equity shares as residual capital bearing primary business risks and uncapped upside potential.",
          de: "Aktien verbriefen Eigenkapital mit voller Teilhabe am Gewinn, tragen jedoch das unternehmerische Verlustrisiko.",
          pl: "Kodeks spółek handlowych reguluje kapitał akcyjny jako wkład właścicielski, uprawniający do dywidendy, lecz ponoszący ryzyko strat przedsiębiorstwa.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037",
      },
      {
        text: {
          en: "Corporate debt instruments legally obligate the issuing entity to service periodic coupons and repay par value regardless of profitability.",
          de: "Anleihen stellen schuldrechtliche Zahlungsversprechen dar, die unabhängig vom Jahresergebnis bedient werden müssen.",
          pl: "Ustawa o obligacjach stanowi, że emitent odpowiada całym swoim majątkiem za terminową wypłatę świadczeń pieniężnych (kuponów i wykupu).",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20150000238",
      },
      {
        text: {
          en: "Modern portfolio theory demonstrates that combining non-correlated equities and fixed-income assets optimizes long-term risk-adjusted returns.",
          de: "Verbraucherzentralen und Ökonomen empfehlen eine Diversifikation über breit gestreute Aktien-ETFs und solide Rentenwerte.",
          pl: "Komisja Nadzoru Finansowego zaleca dywersyfikację portfela inwestycyjnego między instrumenty udziałowe (akcje) a dłużne (obligacje), by ograniczyć ryzyko wahań.",
        },
        source: "https://www.knf.gov.pl/dla_konsumenta/edukacja_finansowa",
      },
      {
        text: {
          en: "Securities and exchange authorities classify corporate bonds and sovereign debt as fixed-income securities subject to credit rating appraisals.",
          de: "Aufsichtsbehörden fordern transparente Risikoklassifizierungen und Bonitätsbewertungen (Ratings) für Anleihen.",
          pl: "KNF nadzoruje ratingi kredytowe i wymogi informacyjne dla papierów dłużnych notowanych na rynkach regulowanych.",
        },
        source: "https://www.knf.gov.pl/dla_rynku/rynek_kapitalowy",
      },
    ],
    simplified: [
      {
        en: "We frame stocks versus bonds through a sea expedition ship with co-owner Finn and lender Bea.",
        de: "Wir vergleichen Aktien und Anleihen anhand eines Expeditionsschiffs mit Miteigentümer Finn und Geldgeberin Bea.",
        pl: "Przedstawiamy różnicę między akcjami a obligacjami na przykładzie statku ekspedycyjnego, współwłaściciela Finna i pożyczkodawczyni Bei.",
      },
      {
        en: "We demonstrate the priority rule by showing that salvaged shipwreck coins must pay Bea before Finn gets a cent.",
        de: "Wir zeigen den Gläubigervorrang, indem gerettete Münzen zuerst Bea zustehen, bevor Finn etwas erhält.",
        pl: "Wyjaśniamy zasadę pierwszeństwa wierzyciela, pokazując, że ocalone monety z katastrofy trafiają do Bei przed Finnem.",
      },
      {
        en: "We illustrate the risk-reward tradeoff by showing that great treasure rewards equity with massive upside.",
        de: "Wir veranschaulichen das Chance-Risiko-Verhältnis dadurch, dass großer Reichtum dem Eigenkapital enorme Gewinne bringt.",
        pl: "Ilustrujemy relację zysku do ryzyka, pokazując, że odkrycie wielkiego skarbu przynosi akcjonariuszom gigantyczne korzyści.",
      },
    ],
  },
};
