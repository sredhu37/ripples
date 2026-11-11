import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BondScrollDiagram,
  CouponPayoutDiagram,
  HarborWallDiagram,
  SovereignBondDiagram,
  ZinsWippeDiagram,
} from "./bonds.diagrams";
import { BondsToy } from "./bonds.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <BondsToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <BondsToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "bonds",
  story: [
    animatedBeat(
      [
        T(
          "Mayor Moss needs one hundred coins to construct a protective stone harbor wall.",
          "Bürgermeister Moss benötigt hundert Münzen, um eine schützende Steinmauer am Hafen zu bauen.",
          "Burmistrz Moss potrzebuje stu monet, aby zbudować ochronny kamienny falochron w porcie.",
        ),
        T(
          "The wall will shield fishing boats from crashing ocean waves for generations.",
          "Die Mauer wird Fischerboote über Generationen vor krachenden Meereswellen schützen.",
          "Mur ochroni łodzie rybackie przed potężnymi falami oceanu przez całe pokolenia.",
        ),
        T(
          "The town cannot sell stock shares because public harbor walls belong to all citizens.",
          "Die Stadt kann keine Aktien verkaufen, da öffentliche Mauern allen Bürgern gehören.",
          "Miasteczko nie może sprzedać akcji, ponieważ publiczny falochron należy do wszystkich mieszkańców.",
        ),
        T(
          "Instead, Town Hall issues a three-year loan certificate called a *bond*.",
          "Stattdessen gibt das Rathaus eine dreijährige Kreditschuldverschreibung heraus: eine *Anleihe*.",
          "Zamiast tego ratusz emituje trzyletni dokument dłużny zwany *obligacją*.",
        ),
      ],
      HarborWallDiagram,
    ),
    animatedBeat(
      [
        T(
          "Sam lends one hundred coins to Town Hall and receives a formal parchment scroll.",
          "Sam leiht dem Rathaus hundert Münzen und erhält eine feierliche Pergamentrolle.",
          "Sam pożycza ratuszowi sto monet i w zamian otrzymuje oficjalny pergaminowy dokument.",
        ),
        T(
          "Attached to the bottom of the scroll are three detachable paper tickets called *coupons*.",
          "Unten an der Rolle hängen drei abreißbare Papierscheine, sogenannte *Kupons*.",
          "Na dole pergaminu znajdują się trzy odrywane odcinki zwane *kuponami*.",
        ),
        T(
          "On every annual Harvest Day, Sam tears off one coupon and receives five coins of interest.",
          "An jedem jährlichen Erntetag reißt Sam einen Kupon ab und erhält fünf Münzen Zinsen.",
          "W każde doroczne Święto Plonów Sam odrywa jeden kupon i otrzymuje pięć monet odsetek.",
        ),
        T(
          "After three years (*maturity*), Town Hall will return the full one hundred coins.",
          "Nach drei Jahren (*Laufzeit*) zahlt das Rathaus die gesamten hundert Münzen zurück.",
          "Po trzech latach (*termin wykupu*) ratusz odda Samowi całe sto monet pożyczonego kapitału.",
        ),
      ],
      BondScrollDiagram,
    ),
    animatedBeat(
      [
        T(
          "When Harvest Day arrives, the church bells ring across Ripple Town.",
          "Als der Erntetag kommt, läuten die Kirchenglocken über Ripple Town.",
          "Gdy nadchodzi Święto Plonów, dzwony rozbrzmiewają nad całym Ripple Town.",
        ),
        T(
          "Sam presents the first coupon ticket at the Town Hall teller window.",
          "Sam legt den ersten Kupon am Schalter des Rathauses vor.",
          "Sam stawia się w okienku ratusza z pierwszym kuponem odsetkowym.",
        ),
        T(
          "The teller hands Sam five shiny coins without asking about tax harvests.",
          "Der Kassierer händigt Sam fünf glänzende Münzen aus, egal wie die Steuern ausfallen.",
          "Urzędnik wręcza Samowi pięć lśniących monet bez względu na to, ile podatków zebrało miasto.",
        ),
        T(
          "Unlike stock dividends that swing with profits, bond coupons are legally fixed promises.",
          "Anders als schwankende Dividenden sind Anleihekupons gesetzlich feste Zusagen.",
          "W przeciwieństwie do dywidend z akcji, kupony z obligacji są prawnie gwarantowaną obietnicą wypłaty.",
        ),
      ],
      CouponPayoutDiagram,
    ),
    animatedBeat(
      [
        T(
          "Existing bonds can be traded among citizens on the town exchange.",
          "Bestehende Anleihen können zwischen Bürgern an der Börse gehandelt werden.",
          "Istniejące obligacje mogą być sprzedawane innym mieszkańcom na giełdzie miejskiej.",
        ),
        T(
          "When the Town Bank raises interest rates on new accounts to eight percent, old bonds look weak.",
          "Erhöht die Bank den Zins auf Neuanlagen auf acht Prozent, wirken alte Anleihen unattraktiv.",
          "Gdy Bank Miejski podnosi oprocentowanie nowych lokat do ośmiu procent, stare obligacje stają się mniej atrakcyjne.",
        ),
        T(
          "Nobody wants to pay one hundred coins for an old paper that only pays five coins.",
          "Niemand zahlt hundert Münzen für ein altes Papier, das nur fünf Münzen Zinsen abwirft.",
          "Nikt nie chce zapłacić stu monet za stary papier, który daje tylko pięć monet odsetek rocznie.",
        ),
        T(
          "To sell, the price tag must tilt down to eighty-five coins: this is *die Zins-Wippe*.",
          "Um zu verkaufen, muss der Preis auf fünfundachtzig Münzen sinken: das ist *die Zins-Wippe*.",
          "Aby znaleźć nabywcę, cena obligacji musi spaść do osiemdziesięciu pięciu monet: tak działa *huśtawka stóp i cen (Zins-Wippe)*.",
        ),
      ],
      ZinsWippeDiagram,
    ),
    animatedBeat(
      [
        T(
          "Governments and cities around the world borrow trillions through sovereign bonds.",
          "Staaten und Städte weltweit leihen sich Billionen über Staatsanleihen.",
          "Rządy i miasta na całym świecie pożyczają miliardy, emitując obligacje skarbowe i komunalne.",
        ),
        T(
          "Bonds fund high-speed railways, schools, solar farms, and hospital research.",
          "Anleihen finanzieren ICE-Trassen, Schulen, Solarparks und Kliniken.",
          "Obligacje finansują szybkie koleje, nowoczesne szkoły, farmy wiatrowe i szpitale.",
        ),
        T(
          "Savers lend their coins knowing they will receive predictable coupons and their money back.",
          "Sparer leihen ihr Geld und wissen, dass sie planbare Zinsen und ihren Einsatz zurückbekommen.",
          "Oszczędzający pożyczają kapitał, wiedząc, że otrzymają przewidywalne odsetki i zwrot pożyczonej kwoty.",
        ),
        T(
          "Bonds form the quiet backbone of the global financial system.",
          "Anleihen bilden das verlässliche Rückgrat des weltweiten Finanzsystems.",
          "Obligacje tworzą stabilny, bezpieczny fundament całego globalnego systemu finansowego.",
        ),
      ],
      SovereignBondDiagram,
    ),
  ],
  toyIntro: T(
    "Tear off coupon tickets to collect fixed interest, and tilt the seesaw by changing bank interest.",
    "Reiße Kupons ab, um Zinsen einzulösen, und bewege die Zins-Wippe mit dem Bankzins.",
    "Oderwij kupony, by odebrać stałe odsetki, i obserwuj ruch huśtawki cenowej przy zmianie stóp bankowych.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the main difference between buying a bond and buying a stock share?",
        "Was ist der Hauptunterschied zwischen dem Kauf einer Anleihe und einer Aktie?",
        "Jaka jest główna różnica między kupnem obligacji a kupnem akcji?",
      ),
      options: [
        {
          text: T(
            "A bond is a loan that pays fixed interest, while a stock is part-ownership of a business",
            "Eine Anleihe ist ein Kredit mit festen Zinsen, während eine Aktie Miteigentum bedeutet",
            "Obligacja to pożyczka ze stałymi odsetkami, podczas gdy akcja to współwłasność przedsiębiorstwa",
          ),
          correct: true,
        },
        {
          text: T(
            "A bond can only be purchased by kings and sea captains",
            "Eine Anleihe darf nur von Königen und Schiffskapitänen gekauft werden",
            "Obligację mogą kupować wyłącznie królowie i kapitanowie statków",
          ),
        },
        {
          text: T(
            "A bond turns into real gold if buried underground for ten years",
            "Eine Anleihe wird zu echtem Gold, wenn man sie zehn Jahre vergräbt",
            "Obligacja zamienia się w prawdziwe złoto, jeśli zakopiesz ją w ziemi na dziesięć lat",
          ),
        },
      ],
      hint: T(
        "When you buy a bond, you act as a lender to the town or company.",
        "Wenn du eine Anleihe kaufst, bist du ein Geldgeber für die Stadt oder Firma.",
        "Kupując obligację, stajesz się pożyczkodawcą dla miasta lub przedsiębiorstwa.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What happens to the market price of an older bond when bank interest rates rise?",
        "Was passiert mit dem Marktpreis einer alten Anleihe, wenn die Zinsen bei der Bank steigen?",
        "Co dzieje się z ceną rynkową starszej obligacji, gdy stopy procentowe w bankach rosną?",
      ),
      options: [
        {
          text: T(
            "The price falls like a seesaw because buyers can get higher interest on new accounts",
            "Der Preis sinkt wie auf einer Wippe, weil Neuanlagen höhere Zinsen bieten",
            "Cena spada jak na huśtawce, ponieważ inwestorzy mogą zdobyć wyższe odsetki na nowych lokatach",
          ),
          correct: true,
        },
        {
          text: T(
            "The price shoots straight to the moon",
            "Der Preis schießt sofort bis zum Mond hinauf",
            "Cena natychmiast wystrzeliwuje w kosmos",
          ),
        },
        {
          text: T(
            "The paper scroll dissolves into thin air",
            "Die Pergamentrolle löst sich in Luft auf",
            "Pergaminowy dokument natychmiast ulatnia się w powietrzu",
          ),
        },
      ],
      hint: T(
        "Remember die Zins-Wippe: when bank rates go up, existing bond prices tilt down.",
        "Erinnere dich an die Zins-Wippe: Wenn Zinsen steigen, kippt der Preis nach unten.",
        "Pamiętaj o huśtawce cenowej: gdy stopy procentowe rosną, cena starszych obligacji przechyla się w dół.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "The Town Bank raised interest rates to 7%. Adjust the rate slider so the bond price tilts below 100 coins.",
        "Die Bank hob die Zinsen auf 7% an. Stelle den Schieber so ein, dass der Anleihepreis unter 100 Münzen sinkt.",
        "Bank Miejski podniósł stopy procentowe do 7%. Przesuń suwak, aby cena obligacji spadła poniżej 100 monet.",
      ),
      Widget,
      hint: T(
        "Slide the bank interest slider to 7% or higher and tap check.",
        "Schiebe den Bankzins auf 7% oder höher und tippe auf prüfen.",
        "Przesuń suwak stóp bankowych na 7% lub więcej i naciśnij Sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, why do governments borrow money with bonds instead of just saving up coins before building bridges and schools?",
    "Papa, warum leihen Regierungen Geld über Anleihen, anstatt jahrelang zu sparen, bevor sie Brücken und Schulen bauen?",
    "Tato, dlaczego rządy pożyczają pieniądze emitując obligacje, zamiast najpierw latami oszczędzać na budowę mostów i szkół?",
  ),
  realLife: {
    title: {
      en: "Government Securities and Sovereign Bonds in India",
      de: "Bundesanleihen in Deutschland",
      pl: "Obligacje Skarbowe w Polsce",
    },
    body: {
      en: "In India, the Central Government issues Government Securities (G-Secs) through the Reserve Bank of India (RBI). Through RBI Retail Direct, everyday citizens can buy treasury bills and sovereign bonds directly, earning guaranteed coupon payments that fund highways, renewable power projects, and national infrastructure.",
      de: "Die Bundesrepublik Deutschland gibt über die Deutsche Finanzagentur Staatsanleihen (Bundesanleihen) heraus. Sie gelten als eine der sichersten Geldanlagen der Welt und zahlen verlässliche Kupons garantiert durch deutsches Steueraufkommen.",
      pl: "W Polsce Ministerstwo Finansów emituje Skarbowe Papiery Wartościowe (w tym obligacje detaliczne: stałoprocentowe, zmiennoprocentowe oraz indeksowane inflacją, np. 4-letnie COI czy 10-letnie EDO). Obywatele kupują obligacje skarbowe jako bezpieczną formę oszczędzania gwarantowaną w 100% przez państwo, a pozyskane środki finansują drogi, szpitale i infrastrukturę.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Public finance acts authorize sovereign states to issue treasury bonds to fund public investments and state budget deficits.",
          de: "Bundesanleihen werden von der Bundesrepublik Deutschland begeben, um staatliche Ausgaben und Investitionen zu decken.",
          pl: "Ustawa o finansach publicznych upoważnia Ministra Finansów do emisji skarbowych papierów wartościowych na pokrycie potrzeb pożyczkowych budżetu państwa.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20091571240",
      },
      {
        text: {
          en: "Bond statutes establish that a bond represents a formal acknowledgment of debt where the issuer commits to pay coupons and repay the principal.",
          de: "Das BGB (§ 793) regelt Inhaberschuldverschreibungen als Verpflichtung zur Leistung an den jeweiligen Inhaber der Urkunde.",
          pl: "Ustawa o obligacjach (art. 4) definiuje obligację jako papier wartościowy emitowany w serii, w którym emitent stwierdza, że jest dłużnikiem właściciela obligacji.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20150000238",
      },
      {
        text: {
          en: "Secondary bond exchange platforms allow market trading of fixed-income instruments between institutional and individual investors.",
          de: "Die Börse Frankfurt und Handelsplätze für Rentenpapiere ermöglichen den vorzeitigen Verkauf von Anleihen zum Marktkurs.",
          pl: "Rynek Catalyst prowadzony przez Giełdę Papierów Wartościowych w Warszawie (GPW) umożliwia obrót obligacjami skarbowymi, komunalnymi i korporacyjnymi.",
        },
        source: "https://gpwcatalyst.pl/o-rynku",
      },
      {
        text: {
          en: "Financial economics documents the inverse relationship between market interest rates and secondary market bond prices (bond duration).",
          de: "Wirtschaftslexika und Aufsichten erklären, dass Anleihekurse bei steigenden Marktzinsen fallen und umgekehrt (Zinsänderungsrisiko).",
          pl: "KNF i literatura finansowa wyjaśniają zjawisko ryzyka stopy procentowej: gdy rynkowe stopy procentowe rosną, rynkowa cena wyemitowanych wcześniej obligacji o stałym kuponie spada.",
        },
        source: "https://www.knf.gov.pl/dla_konsumenta/edukacja_finansowa",
      },
      {
        text: {
          en: "National debt management agencies offer dedicated retail bond programs providing household savings protected by sovereign credit guarantees.",
          de: "Die Deutsche Finanzagentur informiert Bürger über die Merkmale und Renditen von Bundeswertpapieren.",
          pl: "Serwis Obligacji Skarbowych Ministerstwa Finansów umożliwia obywatelom zakup obligacji detalicznych z pełną gwarancją wypłaty kapitału przez Skarb Państwa.",
        },
        source: "https://www.obligacjeskarbowe.pl/",
      },
    ],
    simplified: [
      {
        en: "We explain bonds through a town hall scroll with physical tear-off coupons to build a harbor sea wall.",
        de: "Wir erklären Anleihen anhand einer Pergamentrolle mit Abreißkupons, um den Bau einer Hafenmauer zu finanzieren.",
        pl: "Wyjaśniamy istotę obligacji na przykładzie pergaminu z odrywanymi kuponami na budowę falochronu w porcie.",
      },
      {
        en: "We introduce the inverse yield relationship through die Zins-Wippe (interest seesaw) to make bond math intuitive.",
        de: "Wir veranschaulichen den Zins-Kurs-Zusammenhang mit der Zins-Wippe, damit Kinder das Prinzip spielerisch begreifen.",
        pl: "Tłumaczymy relację między stopami a cenami obligacji za pomocą huśtawki (Zins-Wippe), by zjawisko było intuicyjne dla dziecka.",
      },
      {
        en: "We distinguish loans (bonds) from co-ownership (stocks) by contrasting guaranteed coupons with profit-sharing dividends.",
        de: "Wir unterscheiden Kredite (Anleihen) von Miteigentum (Aktien), indem wir feste Zinsen mit schwankenden Gewinnen vergleichen.",
        pl: "Odróżniamy pożyczkę (obligację) od współwłasności (akcji), zestawiając gwarantowany kupon z zależną od zysku dywidendą.",
      },
    ],
  },
};
