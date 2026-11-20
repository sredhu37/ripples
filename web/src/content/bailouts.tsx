import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BailoutDiagram,
  BankFailsDiagram,
  BigBankDiagram,
  BufferDiagram,
  DominoRowDiagram,
  MoralHazardDiagram,
} from "./bailouts.diagrams";
import { BailoutsToy } from "./bailouts.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <BailoutsToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <BailoutsToy lang={lang} mode="quiz" onAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "bailouts",
  story: [
    animatedBeat(
      [
        T(
          "Otto stands dominoes in a long row.",
          "Otto stellt Dominosteine in eine lange Reihe.",
          "Otto ustawia kostki domina w długim rzędzie.",
        ),
        T(
          "He pushes the first one. It hits the next one.",
          "Er schubst den ersten. Der stößt den nächsten an.",
          "Pcha pierwszą. Ona uderza w następną.",
        ),
        T(
          "Soon every domino lies flat. One push made them all fall.",
          "Bald liegen alle Steine flach. Ein Schubs hat alle umgeworfen.",
          "Wkrótce wszystkie kostki leżą. Jedno pchnięcie przewróciło je wszystkie.",
        ),
      ],
      DominoRowDiagram,
    ),
    animatedBeat(
      [
        T(
          "Ripple Town has one very big bank. Many people keep coins there.",
          "Ripple Town hat eine sehr große Bank. Viele Leute bewahren dort Münzen auf.",
          "W Ripple Town jest jeden bardzo duży bank. Wiele osób trzyma tam monety.",
        ),
        T(
          "Bea the baker puts her coins in the bank.",
          "Bea, die Bäckerin, bringt ihre Münzen zur Bank.",
          "Bea, piekarka, niesie swoje monety do banku.",
        ),
        T(
          "The bank lends coins to shops. The shops pay their workers with them.",
          "Die Bank leiht Läden Münzen. Damit bezahlen die Läden ihre Arbeiter.",
          "Bank pożycza monety sklepom. Sklepy płacą nimi swoim pracownikom.",
        ),
        T(
          "So the bank and the shops stand close together, like dominoes.",
          "So stehen Bank und Läden dicht beieinander, wie Dominosteine.",
          "Bank i sklepy stoją więc blisko siebie, jak kostki domina.",
        ),
      ],
      BigBankDiagram,
    ),
    animatedBeat(
      [
        T(
          "One day the bank lends too many coins to risky builders.",
          "Eines Tages leiht die Bank zu viele Münzen an riskante Bauherren.",
          "Pewnego dnia bank pożycza za dużo monet ryzykownym budowniczym.",
        ),
        T(
          "The builders cannot pay the coins back. The bank runs out of coins.",
          "Die Bauherren können die Münzen nicht zurückzahlen. Der Bank gehen die Münzen aus.",
          "Budowniczowie nie oddają monet. Bankowi kończą się monety.",
        ),
        T(
          "The bank falls and hits other banks. Their coins run low too.",
          "Die Bank fällt und stößt andere Banken an. Auch ihre Münzen werden knapp.",
          "Bank upada i uderza w inne banki. Im też brakuje monet.",
        ),
        T(
          "Now the shops cannot pay their workers. The whole row falls.",
          "Jetzt können die Läden ihre Arbeiter nicht bezahlen. Die ganze Reihe fällt.",
          "Teraz sklepy nie mogą płacić pracownikom. Cały rząd się przewraca.",
        ),
      ],
      BankFailsDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Mayor Moss has an idea. He gives the bank coins from the town box.",
          "Bürgermeister Moss hat eine Idee. Er gibt der Bank Münzen aus der Stadtkasse.",
          "Burmistrz Moss ma pomysł. Daje bankowi monety ze wspólnej kasy.",
        ),
        T(
          "Saving a failing bank with public coins has a name. It is called a *bailout*.",
          "Eine scheiternde Bank mit gemeinsamem Geld zu retten, hat einen Namen. Das heißt *Bankenrettung*.",
          "Ratowanie upadającego banku wspólnymi monetami ma swoją nazwę. To *ratowanie banku*.",
        ),
        T(
          "The dominoes stop falling. The shops can pay their workers again.",
          "Die Steine fallen nicht mehr. Die Läden können ihre Arbeiter wieder bezahlen.",
          "Kostki przestają spadać. Sklepy znów mogą płacić pracownikom.",
        ),
        T(
          "The town box is full of tax coins. So everyone in town helped pay.",
          "Die Stadtkasse ist voll mit Steuer-Münzen. Also hat jeder in der Stadt mitbezahlt.",
          "Wspólna kasa jest pełna monet z podatków. Zapłacili więc wszyscy w miasteczku.",
        ),
      ],
      BailoutDiagram,
    ),
    animatedBeat(
      [
        T(
          "Now the bank thinks: if I lose coins, Moss will help me again.",
          "Jetzt denkt die Bank: Wenn ich Münzen verliere, hilft mir Moss wieder.",
          "Teraz bank myśli: jeśli stracę monety, Moss znów mi pomoże.",
        ),
        T(
          "So the bank takes bigger risks. Someone else pays if it goes wrong.",
          "Also geht die Bank größere Risiken ein. Wenn es schiefgeht, zahlt ein anderer.",
          "Więc bank ryzykuje więcej. Jeśli się nie uda, zapłaci ktoś inny.",
        ),
        T(
          "Taking big risks when others pay has a name. It is called *moral hazard*.",
          "Große Risiken einzugehen, wenn andere zahlen, hat einen Namen. Das nennt man *Leichtsinn*.",
          "Duże ryzyko, gdy płacą inni, ma swoją nazwę. To *pokusa ryzyka*.",
        ),
      ],
      MoralHazardDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Moss makes a new rule. A bank must keep a pile of its own coins, a *buffer*.",
          "Moss macht eine neue Regel. Eine Bank muss einen Haufen eigener Münzen behalten, einen *Puffer*.",
          "Moss ustala nową zasadę. Bank musi mieć stos własnych monet, czyli *bufor*.",
        ),
        T(
          "A buffer works like a wall in a domino row. The fall stops there.",
          "Ein Puffer wirkt wie eine Wand in der Dominoreihe. Dort hört das Umfallen auf.",
          "Bufor działa jak ściana w rzędzie domina. Tam upadek się kończy.",
        ),
        T(
          "If a bank still fails, its owners lose their coins first. This is a *bail-in*.",
          "Scheitert eine Bank doch, verlieren zuerst ihre Besitzer ihre Münzen. Das ist ein *Bail-in*.",
          "Jeśli bank mimo to upadnie, najpierw tracą monety jego właściciele. To *bail-in*.",
        ),
        T(
          "Then the bank's owners pay for the mistake, not the whole town.",
          "Dann zahlen die Besitzer der Bank für den Fehler, nicht die ganze Stadt.",
          "Wtedy za błąd płacą właściciele banku, a nie całe miasteczko.",
        ),
      ],
      BufferDiagram,
      "happy",
    ),
  ],
  toyIntro: T(
    "Push the bank domino. Raise the buffer to build a wall that protects the shops.",
    "Schubse den Bank-Stein. Erhöhe den Puffer, damit eine Wand die Läden schützt.",
    "Pchnij kostkę banku. Zwiększ bufor, a ściana ochroni sklepy.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T("What is a bailout?", "Was ist eine Bankenrettung?", "Czym jest ratowanie banku?"),
      options: [
        {
          text: T(
            "A bank gives free coins to every child",
            "Eine Bank schenkt jedem Kind Münzen",
            "Bank daje każdemu dziecku darmowe monety",
          ),
        },
        {
          text: T(
            "The town helps a failing bank with public coins",
            "Die Stadt hilft einer scheiternden Bank mit gemeinsamem Geld",
            "Miasto pomaga upadającemu bankowi wspólnymi monetami",
          ),
          correct: true,
        },
        {
          text: T(
            "A bank closes and keeps all the coins",
            "Eine Bank schließt und behält alle Münzen",
            "Bank się zamyka i zatrzymuje wszystkie monety",
          ),
        },
      ],
      hint: T(
        "Think of Mayor Moss. He gave the failing bank coins from the town box.",
        "Denk an Bürgermeister Moss. Er gab der Bank Münzen aus der Stadtkasse.",
        "Pomyśl o burmistrzu Mossie. Dał bankowi monety ze wspólnej kasy.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Moss paid for the bailout from the town box. Who really paid?",
        "Moss hat die Rettung aus der Stadtkasse bezahlt. Wer hat wirklich bezahlt?",
        "Moss zapłacił za ratunek ze wspólnej kasy. Kto naprawdę zapłacił?",
      ),
      options: [
        {
          text: T(
            "Nobody, the coins appeared by magic",
            "Niemand, die Münzen kamen von allein",
            "Nikt, monety pojawiły się same",
          ),
        },
        {
          text: T("Only the bank's owners", "Nur die Besitzer der Bank", "Tylko właściciele banku"),
        },
        {
          text: T(
            "Everyone in town, through their taxes",
            "Alle in der Stadt, durch ihre Steuern",
            "Wszyscy w miasteczku, przez swoje podatki",
          ),
          correct: true,
        },
      ],
      hint: T(
        "The town box is filled with tax coins. Everyone pays into it.",
        "Die Stadtkasse füllt sich mit Steuer-Münzen. Alle zahlen dort ein.",
        "Wspólna kasa jest pełna monet z podatków. Wszyscy do niej wpłacają.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Stop the dominoes before they reach the shops. Set the buffer, then press Check.",
        "Stoppe die Steine, bevor sie die Läden erreichen. Stelle den Puffer ein und drücke Pruefen.",
        "Zatrzymaj kostki, zanim dotrą do sklepów. Ustaw bufor i naciśnij Sprawdź.",
      ),
      Widget,
      hint: T(
        "A bigger buffer makes a wall sooner. Raise it until the blue shop dominoes stand.",
        "Ein größerer Puffer baut die Wand früher. Erhöhe ihn, bis die blauen Laden-Steine stehen.",
        "Większy bufor buduje ścianę wcześniej. Zwiększ go, aż niebieskie kostki sklepów staną.",
      ),
    },
  ],
  askDad: T(
    "Papa, should a government always rescue a big bank? Who should pay if it fails?",
    "Papa, soll eine Regierung eine große Bank immer retten? Wer soll zahlen, wenn sie scheitert?",
    "Tato, czy rząd zawsze powinien ratować duży bank? Kto ma płacić, gdy bank upadnie?",
  ),
  realLife: {
    title: T(
      "Germany saved banks in 2008",
      "Deutschland rettete Banken 2008",
      "Niemcy ratowały banki w 2008",
    ),
    body: T(
      "In October 2008 many banks were in trouble. The German government set up a rescue fund called the Financial Market Stabilisation Fund, known as SoFFin. Its job was to keep banks standing so that people and shops could still use their money.",
      "Im Oktober 2008 steckten viele Banken in Not. Die Bundesregierung gründete einen Rettungsfonds, den Finanzmarktstabilisierungsfonds, kurz SoFFin. Er sollte Banken stützen, damit Menschen und Läden weiter an ihr Geld kamen.",
      "W październiku 2008 wiele banków miało kłopoty. Rząd Niemiec stworzył fundusz ratunkowy, czyli Fundusz Stabilizacji Rynku Finansowego, w skrócie SoFFin. Miał podtrzymać banki, żeby ludzie i sklepy nadal miały dostęp do pieniędzy.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "In 2008 the US Federal Reserve allowed Lehman Brothers to fail, while it supported firms such as Bear Stearns and AIG.",
          "2008 ließ die US-Notenbank Lehman Brothers scheitern, während sie Firmen wie Bear Stearns und AIG stützte.",
          "W 2008 roku Rezerwa Federalna USA pozwoliła upaść Lehman Brothers, a wspierała m.in. Bear Stearns i AIG.",
        ),
        source: "https://www.federalreservehistory.org/essays/support-for-specific-institutions",
      },
      {
        text: T(
          "The US Troubled Asset Relief Program (TARP) was created to stabilize the financial system in the 2008 crisis. Congress authorized it in the Emergency Economic Stabilization Act, enacted on 3 October 2008.",
          "Das US-Programm TARP sollte das Finanzsystem in der Krise 2008 stabilisieren. Der Kongress genehmigte es im Emergency Economic Stabilization Act vom 3. Oktober 2008.",
          "Amerykański program TARP miał ustabilizować system finansowy w kryzysie 2008. Kongres zatwierdził go w ustawie Emergency Economic Stabilization Act z 3 października 2008.",
        ),
        source: "https://home.treasury.gov/data/troubled-assets-relief-program/about-tarp",
      },
      {
        text: T(
          "Germany set up the Financial Market Stabilisation Fund (FMS, formerly SoFFin) on 17 October 2008 in response to the financial market crisis.",
          "Deutschland gründete den Finanzmarktstabilisierungsfonds (FMS, früher SoFFin) am 17. Oktober 2008 als Antwort auf die Finanzmarktkrise.",
          "Niemcy utworzyły Fundusz Stabilizacji Rynku Finansowego (FMS, dawniej SoFFin) 17 października 2008 w odpowiedzi na kryzys.",
        ),
        source:
          "https://www.deutsche-finanzagentur.de/en/stabilisation-measures/financial-market-stabilisation-fund/overview",
      },
      {
        text: T(
          "In March 2023 the Swiss regulator FINMA approved the takeover of Credit Suisse by UBS. The Swiss National Bank gave liquidity help backed by a default guarantee of the Swiss Confederation.",
          "Im März 2023 genehmigte die Schweizer Aufsicht FINMA die Übernahme der Credit Suisse durch die UBS. Die Schweizerische Nationalbank gab Liquiditätshilfe, gedeckt durch eine Ausfallgarantie des Bundes.",
          "W marcu 2023 szwajcarski nadzór FINMA zatwierdził przejęcie Credit Suisse przez UBS. Szwajcarski bank centralny udzielił wsparcia płynności, objętego gwarancją Konfederacji.",
        ),
        source: "https://www.finma.ch/en/news/2023/03/20230319-mm-cs-ubs/",
      },
      {
        text: T(
          "Basel III is a set of minimum standards, including capital buffers, made after the 2007-09 crisis to make banks more resilient.",
          "Basel III ist ein Satz von Mindeststandards, darunter Kapitalpuffer, der nach der Krise 2007-09 entstand, damit Banken widerstandsfähiger werden.",
          "Basel III to zestaw minimalnych standardów, w tym buforów kapitałowych, stworzony po kryzysie 2007-09, aby banki były odporniejsze.",
        ),
        source: "https://www.bis.org/bcbs/basel3.htm",
      },
      {
        text: T(
          "The EU directive on bank recovery and resolution (2014/59/EU) provides a bail-in tool, so shareholders and creditors of a failing bank suffer losses, with shareholders bearing losses first.",
          "Die EU-Richtlinie zur Sanierung und Abwicklung von Banken (2014/59/EU) sieht ein Bail-in vor: Aktionäre und Gläubiger einer scheiternden Bank tragen Verluste, die Aktionäre zuerst.",
          "Dyrektywa UE o restrukturyzacji i uporządkowanej likwidacji banków (2014/59/UE) przewiduje bail-in: akcjonariusze i wierzyciele upadającego banku ponoszą straty, akcjonariusze jako pierwsi.",
        ),
        source: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0059",
      },
    ],
    simplified: [
      T(
        "The story has one town bank and three banks in the toy. Real banking systems have many banks of many sizes. A row of dominoes shows the idea of one failure hitting the next.",
        "Die Geschichte hat eine Stadtbank und im Spielzeug drei Banken. Echte Bankensysteme haben viele Banken in vielen Größen. Die Dominoreihe zeigt die Idee, dass ein Ausfall den nächsten trifft.",
        "W historii jest jeden bank, a w zabawce trzy. Prawdziwe systemy mają wiele banków różnej wielkości. Rząd domina pokazuje, że jedna upadłość uderza w następną.",
      ),
      T(
        "A bailout is shown as paid from the town box filled by taxes. In real life, rescues also use central bank loans and guarantees.",
        "Eine Rettung wird aus der Stadtkasse bezahlt, die durch Steuern gefüllt ist. In Wirklichkeit gibt es auch Notenbankkredite und Garantien.",
        "Ratunek jest opłacony ze wspólnej kasy z podatków. W rzeczywistości są też kredyty banku centralnego i gwarancje.",
      ),
      T(
        "Moral hazard is described as banks taking bigger risks when they expect help. This is a widely used economic idea. It is a risk, not something every bank does.",
        "Moral Hazard wird als größere Risikobereitschaft beschrieben, wenn Banken Hilfe erwarten. Das ist eine verbreitete Idee der Wirtschaft. Es ist ein Risiko, nicht etwas, das jede Bank tut.",
        "Pokusa ryzyka to większe ryzyko banków, gdy liczą na pomoc. To powszechna idea w ekonomii. To zagrożenie, a nie coś, co robi każdy bank.",
      ),
      T(
        "The buffer is a pile of the bank's own coins. Real rules (capital buffers) are more detailed, and a buffer reduces the chance of a rescue but does not remove it.",
        "Der Puffer ist ein Haufen eigener Münzen der Bank. Die echten Regeln (Kapitalpuffer) sind genauer, und ein Puffer senkt die Chance auf eine Rettung, beseitigt sie aber nicht.",
        "Bufor to stos własnych monet banku. Prawdziwe zasady (bufory kapitałowe) są dokładniejsze, a bufor zmniejsza szansę na ratunek, ale jej nie usuwa.",
      ),
    ],
  },
};
