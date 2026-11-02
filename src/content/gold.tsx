import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  GoldVaultDiagram,
  SunnyCalmDiagram,
  StormyCrisisDiagram,
  SafeHarborDiagram,
  CentralBankVaultDiagram,
} from "./gold.diagrams";
import { GoldToy } from "./gold.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <GoldToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <GoldToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "gold",
  story: [
    animatedBeat(
      [
        T(
          "Captain Coral takes Otto deep inside the sturdy harbor stone vault.",
          "Kapitän Coral nimmt Otto mit in das Innere des stabilen Hafentresors."
        ),
        T(
          "Inside rests a heavy bar of pure yellow *gold*.",
          "Darin liegt ein schwerer Barren aus reinem gelbem *Gold*."
        ),
        T(
          "This gold was mined hundreds of years ago and survived many sea voyages.",
          "Dieses Gold wurde vor hunderten von Jahren abgebaut und überstand viele Seereisen."
        ),
        T(
          "Because gold does not rust, burn, or decay, it acts as a permanent *store of value*.",
          "Weil Gold nicht rostet, verbrennt oder zerfällt, dient es als dauerhafter *Wertspeicher*."
        ),
      ],
      GoldVaultDiagram
    ),
    animatedBeat(
      [
        T(
          "When the economy is calm and sunny, villagers invest in workshops.",
          "Wenn die Wirtschaft ruhig und sonnig ist, investieren die Dorfbewohner in Werkstätten."
        ),
        T(
          "They buy flour for bakeries and timber for fishing boats.",
          "Sie kaufen Mehl für Bäckereien und Holz für Fischerboote."
        ),
        T(
          "Active businesses produce bread, jobs, and healthy coin profits.",
          "Aktive Betriebe schaffen Brot, Arbeitsplätze und gesunde Münzgewinne."
        ),
        T(
          "During calm times, people prefer growing businesses over resting gold bars.",
          "In ruhigen Zeiten bevorzugen Menschen wachsende Betriebe gegenüber ruhendem Gold."
        ),
      ],
      SunnyCalmDiagram
    ),
    animatedBeat(
      [
        T(
          "Suddenly, economic storms arrive with unpredictable price swings.",
          "Plötzlich ziehen wirtschaftliche Stürme mit unvorhersehbaren Preissprüngen auf."
        ),
        T(
          "Paper bank notes wobble in purchasing power and businesses suffer losses.",
          "Banknoten aus Papier schwanken in ihrer Kaufkraft und Betriebe erleiden Verluste."
        ),
        T(
          "Villagers worry that their paper savings might buy fewer groceries next year.",
          "Die Menschen sorgen sich, dass ihre Ersparnisse nächstes Jahr weniger einkaufen können."
        ),
        T(
          "In times of fear, savers look for something solid that cannot vanish.",
          "In Zeiten der Verunsicherung suchen Sparer nach etwas Festem, das nicht verschwindet."
        ),
      ],
      StormyCrisisDiagram
    ),
    animatedBeat(
      [
        T(
          "People convert some savings into gold, seeking a *safe harbor*.",
          "Die Menschen tauschen einen Teil ihrer Ersparnisse in Gold und suchen einen *sicheren Hafen*."
        ),
        T(
          "Because there is only a limited amount of gold in the world, demand lifts its price.",
          "Weil es auf der Welt nur eine begrenzte Menge Gold gibt, hebt die Nachfrage den Preis."
        ),
        T(
          "Gold does not pay dividends or bake bread, but it reliably protects wealth.",
          "Gold zahlt keine Dividenden und backt kein Brot, aber es schützt Vermögen verlässlich."
        ),
        T(
          "When the storm passes, savers still have their purchasing power intact.",
          "Wenn der Sturm vorüberzieht, haben die Sparer ihre Kaufkraft behalten."
        ),
      ],
      SafeHarborDiagram
    ),
    animatedBeat(
      [
        T(
          "Even modern nations keep massive reserves of physical gold in underground vaults.",
          "Sogar moderne Staaten lagern riesige Reserven an physischem Gold in Tresoren."
        ),
        T(
          "Central banks hold thousands of tonnes to guarantee stability through centuries.",
          "Zentralbanken halten tausende Tonnen, um Stabilität über Jahrhunderte zu sichern."
        ),
        T(
          "No matter what new currencies emerge, gold remains a globally respected foundation.",
          "Gleich welche neuen Währungen entstehen, Gold bleibt ein weltweit geschätzter Anker."
        ),
        T(
          "Understanding gold helps us understand how trust and scarcity protect our future.",
          "Gold zu verstehen hilft uns zu begreifen, wie Vertrauen und Knappheit unsere Zukunft schützen."
        ),
      ],
      CentralBankVaultDiagram
    ),
  ],
  toyIntro: T(
    "Switch between calm and stormy climates, and move coins into the vault to protect them.",
    "Wechsle zwischen ruhigem und stürmischem Wetter und sichere Münzen im Tresor."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why has gold been trusted as a store of value for thousands of years?",
        "Warum gilt Gold seit Jahrtausenden als verlässlicher Wertspeicher?"
      ),
      options: [
        {
          text: T(
            "It is scarce, chemically durable, and cannot be printed by governments",
            "Es ist knapp, chemisch beständig und kann nicht von Regierungen gedruckt werden"
          ),
          correct: true,
        },
        {
          text: T(
            "It turns into sweet juice when placed in water",
            "Es verwandelt sich in süßen Saft, wenn man es ins Wasser legt"
          ),
        },
        {
          text: T(
            "It grows quickly on special mountain bushes",
            "Es wächst schnell an besonderen Bergbüschen"
          ),
        },
      ],
      hint: T(
        "Gold never rusts and cannot be created out of thin air.",
        "Gold rostet niemals und kann nicht aus dem Nichts erschaffen werden."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is gold called a safe harbor during an economic storm?",
        "Warum wird Gold während einer Wirtschaftskrise ein sicherer Hafen genannt?"
      ),
      options: [
        {
          text: T(
            "Because people buy gold to protect their savings when paper money wobbles",
            "Weil Menschen Gold kaufen, um ihr Erspartes zu schützen, wenn Geld schwankt"
          ),
          correct: true,
        },
        {
          text: T(
            "Because ships use gold bars as giant anchors",
            "Weil Schiffe Goldbarren als riesige Anker benutzen"
          ),
        },
        {
          text: T(
            "Because gold bars can swim on water",
            "Weil Goldbarren auf dem Wasser schwimmen können"
          ),
        },
      ],
      hint: T(
        "People run to a safe harbor to protect their ships from crashing in a storm.",
        "Menschen steuern einen sicheren Hafen an, um Schiffe vor dem Sturm zu schützen."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "A sudden economic storm threatens paper values. Store at least 3 coins in the Gold Vault to protect them.",
        "Ein plötzlicher Sturm droht. Sichere mindestens 3 Münzen im Goldtresor zum Schutz."
      ),
      Widget: Widget,
      hint: T(
        "Switch to Stormy Crisis, add 3 coins to the vault, and tap check.",
        "Wechsle zu Stürmische Krise, lege 3 Münzen in den Tresor und tippe auf prüfen."
      ),
    },
  ],
  askDad: T(
    "Papa, why do people trust shiny gold even when paper money and bank accounts change value?",
    "Papa, warum vertrauen Menschen glänzendem Gold, selbst wenn Papiergeld und Konten ihren Wert ändern?"
  ),
  realLife: {
    title: T("The Bundesbank's Gold Reserves", "Das Gold der Deutschen Bundesbank"),
    body: T(
      "The German central bank (Deutsche Bundesbank) holds over 3,300 tonnes of gold in Frankfurt, London, and New York as a national reserve. Many German savers also keep small gold bars or coins at home or in bank vaults as protection against high inflation.",
      "Die Deutsche Bundesbank hält über 3.300 Tonnen Gold in Frankfurt, London und New York als nationale Reserve. Viele deutsche Sparer bewahren zudem kleine Goldbarren oder Münzen zu Hause oder im Bankschließfach als Schutz gegen hohe Inflation auf."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The Deutsche Bundesbank holds the world second largest gold reserve with approximately 3,374 tonnes.",
        source: "https://www.bundesbank.de/de/startseite/gold-762904",
      },
      {
        text: "The Bundesbank maintains strict custody controls and regular inventory audits of its gold reserves.",
        source: "https://www.bundesbank.de/de/presse/reden/das-gold-der-deutschen-897330",
      },
      {
        text: "The Bundesbank Money Museum in Frankfurt educates the public on the historical monetary role of gold.",
        source: "https://www.bundesbank.de/de/bundesbank/geldmuseum",
      },
      {
        text: "Gold has functioned as a physical store of value across civilizations due to chemical inertness and scarcity.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_money.en.html",
      },
      {
        text: "Consumer guidance recommends physical gold primarily as a portfolio hedge against extreme crises rather than a yield investment.",
        source: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/bevor-sie-geld-anlegen-das-kleine-einmaleins-der-geldanlage-10622",
      },
    ],
    simplified: [
      "We explain gold through an ancient unrusted bar in a harbor stone vault to make chemical durability tangible for an 8-year-old.",
      "We contrast productive businesses that create goods with inert gold that preserves purchasing power.",
      "We clarify the safe harbor metaphor by linking economic uncertainty to sailing ships seeking protected harbor walls.",
    ],
  },
};
