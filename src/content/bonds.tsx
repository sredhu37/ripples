import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  HarborWallDiagram,
  BondScrollDiagram,
  CouponPayoutDiagram,
  ZinsWippeDiagram,
  SovereignBondDiagram,
} from "./bonds.diagrams";
import { BondsToy } from "./bonds.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <BondsToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <BondsToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "bonds",
  story: [
    animatedBeat(
      [
        T(
          "Mayor Moss needs one hundred coins to construct a protective stone harbor wall.",
          "Bürgermeister Moss benötigt hundert Münzen, um eine schützende Steinmauer am Hafen zu bauen."
        ),
        T(
          "The wall will shield fishing boats from crashing ocean waves for generations.",
          "Die Mauer wird Fischerboote über Generationen vor krachenden Meereswellen schützen."
        ),
        T(
          "The town cannot sell stock shares because public harbor walls belong to all citizens.",
          "Die Stadt kann keine Aktien verkaufen, da öffentliche Mauern allen Bürgern gehören."
        ),
        T(
          "Instead, Town Hall issues a three-year loan certificate called a *bond*.",
          "Stattdessen gibt das Rathaus eine dreijährige Kreditschuldverschreibung heraus: eine *Anleihe*."
        ),
      ],
      HarborWallDiagram
    ),
    animatedBeat(
      [
        T(
          "Sam lends one hundred coins to Town Hall and receives a formal parchment scroll.",
          "Sam leiht dem Rathaus hundert Münzen und erhält eine feierliche Pergamentrolle."
        ),
        T(
          "Attached to the bottom of the scroll are three detachable paper tickets called *coupons*.",
          "Unten an der Rolle hängen drei abreißbare Papierscheine, sogenannte *Kupons*."
        ),
        T(
          "On every annual Harvest Day, Sam tears off one coupon and receives five coins of interest.",
          "An jedem jährlichen Erntetag reißt Sam einen Kupon ab und erhält fünf Münzen Zinsen."
        ),
        T(
          "After three years (*maturity*), Town Hall will return the full one hundred coins.",
          "Nach drei Jahren (*Laufzeit*) zahlt das Rathaus die gesamten hundert Münzen zurück."
        ),
      ],
      BondScrollDiagram
    ),
    animatedBeat(
      [
        T(
          "When Harvest Day arrives, the church bells ring across Ripple Town.",
          "Als der Erntetag kommt, läuten die Kirchenglocken über Ripple Town."
        ),
        T(
          "Sam presents the first coupon ticket at the Town Hall teller window.",
          "Sam legt den ersten Kupon am Schalter des Rathauses vor."
        ),
        T(
          "The teller hands Sam five shiny coins without asking about tax harvests.",
          "Der Kassierer händigt Sam fünf glänzende Münzen aus, egal wie die Steuern ausfallen."
        ),
        T(
          "Unlike stock dividends that swing with profits, bond coupons are legally fixed promises.",
          "Anders als schwankende Dividenden sind Anleihekupons gesetzlich feste Zusagen."
        ),
      ],
      CouponPayoutDiagram
    ),
    animatedBeat(
      [
        T(
          "Existing bonds can be traded among citizens on the town exchange.",
          "Bestehende Anleihen können zwischen Bürgern an der Börse gehandelt werden."
        ),
        T(
          "When the Town Bank raises interest rates on new accounts to eight percent, old bonds look weak.",
          "Erhöht die Bank den Zins auf Neuanlagen auf acht Prozent, wirken alte Anleihen unattraktiv."
        ),
        T(
          "Nobody wants to pay one hundred coins for an old paper that only pays five coins.",
          "Niemand zahlt hundert Münzen für ein altes Papier, das nur fünf Münzen Zinsen abwirft."
        ),
        T(
          "To sell, the price tag must tilt down to eighty-five coins: this is *die Zins-Wippe*.",
          "Um zu verkaufen, muss der Preis auf fünfundachtzig Münzen sinken: das ist *die Zins-Wippe*."
        ),
      ],
      ZinsWippeDiagram
    ),
    animatedBeat(
      [
        T(
          "Governments and cities around the world borrow trillions through sovereign bonds.",
          "Staaten und Städte weltweit leihen sich Billionen über Staatsanleihen."
        ),
        T(
          "Bonds fund high-speed railways, schools, solar farms, and hospital research.",
          "Anleihen finanzieren ICE-Trassen, Schulen, Solarparks und Kliniken."
        ),
        T(
          "Savers lend their coins knowing they will receive predictable coupons and their money back.",
          "Sparer leihen ihr Geld und wissen, dass sie planbare Zinsen und ihren Einsatz zurückbekommen."
        ),
        T(
          "Bonds form the quiet backbone of the global financial system.",
          "Anleihen bilden das verlässliche Rückgrat des weltweiten Finanzsystems."
        ),
      ],
      SovereignBondDiagram
    ),
  ],
  toyIntro: T(
    "Tear off coupon tickets to collect fixed interest, and tilt the seesaw by changing bank interest.",
    "Reiße Kupons ab, um Zinsen einzulösen, und bewege die Zins-Wippe mit dem Bankzins."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the main difference between buying a bond and buying a stock share?",
        "Was ist der Hauptunterschied zwischen dem Kauf einer Anleihe und einer Aktie?"
      ),
      options: [
        {
          text: T(
            "A bond is a loan that pays fixed interest, while a stock is part-ownership of a business",
            "Eine Anleihe ist ein Kredit mit festen Zinsen, während eine Aktie Miteigentum bedeutet"
          ),
          correct: true,
        },
        {
          text: T(
            "A bond can only be purchased by kings and sea captains",
            "Eine Anleihe darf nur von Königen und Schiffskapitänen gekauft werden"
          ),
        },
        {
          text: T(
            "A bond turns into real gold if buried underground for ten years",
            "Eine Anleihe wird zu echtem Gold, wenn man sie zehn Jahre vergräbt"
          ),
        },
      ],
      hint: T(
        "When you buy a bond, you act as a lender to the town or company.",
        "Wenn du eine Anleihe kaufst, bist du ein Geldgeber für die Stadt oder Firma."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What happens to the market price of an older bond when bank interest rates rise?",
        "Was passiert mit dem Marktpreis einer alten Anleihe, wenn die Zinsen bei der Bank steigen?"
      ),
      options: [
        {
          text: T(
            "The price falls like a seesaw because buyers can get higher interest on new accounts",
            "Der Preis sinkt wie auf einer Wippe, weil Neuanlagen höhere Zinsen bieten"
          ),
          correct: true,
        },
        {
          text: T(
            "The price shoots straight to the moon",
            "Der Preis schießt sofort bis zum Mond hinauf"
          ),
        },
        {
          text: T(
            "The paper scroll dissolves into thin air",
            "Die Pergamentrolle löst sich in Luft auf"
          ),
        },
      ],
      hint: T(
        "Remember die Zins-Wippe: when bank rates go up, existing bond prices tilt down.",
        "Erinnere dich an die Zins-Wippe: Wenn Zinsen steigen, kippt der Preis nach unten."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "The Town Bank raised interest rates to 7%. Adjust the rate slider so the bond price tilts below 100 coins.",
        "Die Bank hob die Zinsen auf 7% an. Stelle den Schieber so ein, dass der Anleihepreis unter 100 Münzen sinkt."
      ),
      Widget: Widget,
      hint: T(
        "Slide the bank interest slider to 7% or higher and tap check.",
        "Schiebe den Bankzins auf 7% oder höher und tippe auf prüfen."
      ),
    },
  ],
  askDad: T(
    "Papa, why do governments borrow money with bonds instead of just saving up coins before building bridges and schools?",
    "Papa, warum leihen Regierungen Geld über Anleihen, anstatt jahrelang zu sparen, bevor sie Brücken und Schulen bauen?"
  ),
  realLife: {
    title: T("Federal Bonds in Germany", "Bundesanleihen in Deutschland"),
    body: T(
      "The Federal Republic of Germany issues government bonds called Bundesanleihen via the German Finance Agency (Deutsche Finanzagentur). They are considered among the safest investments in the world, paying reliable annual coupons backed by German tax revenue.",
      "Die Bundesrepublik Deutschland gibt über die Deutsche Finanzagentur Staatsanleihen (Bundesanleihen) heraus. Sie gelten als eine der sichersten Geldanlagen der Welt und zahlen verlässliche Kupons garantiert durch deutsches Steueraufkommen."
    ),
  },
  factCard: {
    claims: [
      {
        text: "Bundesanleihen are issued by the Federal Republic of Germany to finance state expenditures and debt refinancing.",
        source: "https://www.deutsche-finanzagentur.de/bundeswertpapiere/bundeswertpapierarten/bundesanleihen/",
      },
      {
        text: "The German Civil Code (BGB § 793) defines bearer bonds as instruments committing the issuer to pay the designated holder.",
        source: "https://www.gesetze-im-internet.de/bgb/__793.html",
      },
      {
        text: "A bond is a securitized debt instrument representing a fixed-income claim against the borrower.",
        source: "https://wirtschaftslexikon.gabler.de/definition/anleihe-28518",
      },
      {
        text: "The bond market and secondary trading on exchanges allow investors to sell bonds before maturity at market prices.",
        source: "https://www.deutsche-boerse.com/dbg-de/maerkte-services/handel/handelsplaetze",
      },
      {
        text: "Secondary bond prices move inversely to benchmark interest rates due to yield parity mechanisms.",
        source: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/finanzglossar-durchblick-von-a-wie-aktien-bis-z-wie-zins-15907",
      },
    ],
    simplified: [
      "We explain bonds through a town hall scroll with physical tear-off coupons to build a harbor sea wall.",
      "We introduce the inverse yield relationship through die Zins-Wippe (interest seesaw) to make bond math intuitive.",
      "We distinguish loans (bonds) from co-ownership (stocks) by contrasting guaranteed coupons with profit-sharing dividends.",
    ],
  },
};
