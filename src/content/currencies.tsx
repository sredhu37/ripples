import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  GoldStandardDiagram,
  HeavyGoldDiagram,
  NoteBuysBreadDiagram,
  PromiseEndsDiagram,
  TrustDiagram,
  VaultNoteDiagram,
} from "./currencies.diagrams";
import { VaultSwapToy } from "./currencies.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <VaultSwapToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <VaultSwapToy lang={lang} mode="quiz" onAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "currencies",
  story: [
    animatedBeat(
      [
        T(
          "Long ago, Finn paid with gold coins.",
          "Vor langer Zeit hat Finn mit Goldmünzen bezahlt.",
          "Dawno temu Finn płacił złotymi monetami.",
        ),
        T(
          "Gold is heavy. His bag hurts his shoulder.",
          "Gold ist schwer. Der Beutel drückt auf seine Schulter.",
          "Złoto jest ciężkie. Worek uwiera go w ramię.",
        ),
        T(
          "A thief could grab the bag and run. That is risky.",
          "Ein Dieb könnte den Beutel schnappen und wegrennen. Das ist gefährlich.",
          "Złodziej mógłby złapać worek i uciec. To ryzykowne.",
        ),
        T(
          "The money used in a place has a name. It is called a *currency*.",
          "Das Geld, das an einem Ort benutzt wird, hat einen Namen: *Währung*.",
          "Pieniądze używane w jakimś miejscu mają swoją nazwę. To *waluta*.",
        ),
      ],
      HeavyGoldDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Otto has an idea. Keep the gold in a vault.",
          "Otto hat eine Idee. Das Gold kommt in einen Tresor.",
          "Otto ma pomysł. Złoto trafi do skarbca.",
        ),
        T(
          "A vault is a room with a very thick door.",
          "Ein Tresor ist ein Raum mit einer ganz dicken Tür.",
          "Skarbiec to pokój z bardzo grubymi drzwiami.",
        ),
        T(
          "The vault keeps Finn's gold safe. It hands him a paper note.",
          "Der Tresor bewahrt Finns Gold sicher auf. Er gibt ihm einen Zettel aus Papier.",
          "Skarbiec chroni złoto Finna. W zamian daje mu papierową kartkę.",
        ),
        T(
          "A note like this has a name. It is called a *banknote*.",
          "So ein Zettel hat einen Namen: *Geldschein*.",
          "Taka kartka ma swoją nazwę. To *banknot*.",
        ),
      ],
      VaultNoteDiagram,
    ),
    animatedBeat(
      [
        T(
          "The note is light. Finn walks to Bea.",
          "Der Schein ist leicht. Finn geht zu Bea.",
          "Banknot jest lekki. Finn idzie do Bei.",
        ),
        T(
          "Bea takes the note. She knows the vault will give her gold for it.",
          "Bea nimmt den Schein. Sie weiß, dass der Tresor ihr dafür Gold gibt.",
          "Bea bierze banknot. Wie, że skarbiec da jej za niego złoto.",
        ),
        T(
          "Finn gets his bread. Nobody had to carry heavy gold.",
          "Finn bekommt sein Brot. Niemand musste schweres Gold tragen.",
          "Finn dostaje chleb. Nikt nie musiał nosić ciężkiego złota.",
        ),
      ],
      NoteBuysBreadDiagram,
    ),
    animatedBeat(
      [
        T(
          "The vault must have enough gold for every note.",
          "Der Tresor muss für jeden Schein genug Gold haben.",
          "Skarbiec musi mieć dość złota na każdy banknot.",
        ),
        T(
          "Each note is a promise: you can swap me back for gold.",
          "Jeder Schein ist ein Versprechen: Du kannst mich zurück in Gold tauschen.",
          "Każdy banknot to obietnica: możesz mnie wymienić z powrotem na złoto.",
        ),
        T(
          "Notes tied to gold like this follow the *gold standard*.",
          "Scheine, die so an Gold gebunden sind, folgen dem *Goldstandard*.",
          "Banknoty powiązane w ten sposób ze złotem działają według *standardu złota*.",
        ),
      ],
      GoldStandardDiagram,
    ),
    animatedBeat(
      [
        T(
          "In 1971, a big country called the United States made a choice.",
          "1971 traf ein großes Land, die USA, eine Entscheidung.",
          "W 1971 roku duży kraj, Stany Zjednoczone, podjął decyzję.",
        ),
        T(
          "It stopped swapping its notes for gold.",
          "Es hörte auf, seine Scheine gegen Gold zu tauschen.",
          "Przestał wymieniać swoje banknoty na złoto.",
        ),
        T(
          "The promise to swap back for gold was over.",
          "Das Versprechen, zurück in Gold zu tauschen, war vorbei.",
          "Obietnica wymiany z powrotem na złoto się skończyła.",
        ),
        T(
          "But people still used the notes. They still bought bread.",
          "Aber die Leute benutzten die Scheine weiter. Sie kauften weiter Brot.",
          "Ale ludzie nadal używali banknotów. Nadal kupowali chleb.",
        ),
      ],
      PromiseEndsDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "So why is a paper note worth something today?",
          "Warum ist ein Geldschein heute etwas wert?",
          "Dlaczego banknot jest dziś coś wart?",
        ),
        T(
          "Because everyone in town accepts it.",
          "Weil alle in der Stadt ihn annehmen.",
          "Bo wszyscy w mieście go przyjmują.",
        ),
        T(
          "Bea takes a note because she trusts the next seller will take it too.",
          "Bea nimmt einen Schein, weil sie glaubt, dass der nächste Verkäufer ihn auch nimmt.",
          "Bea bierze banknot, bo wierzy, że następny sprzedawca też go weźmie.",
        ),
        T(
          "Money that works because people trust it is called *fiat money*.",
          "Geld, das funktioniert, weil Menschen ihm vertrauen, heißt *Fiatgeld*.",
          "Pieniądze, które działają, bo ludzie im ufają, to *pieniądz fiducjarny*.",
        ),
        T(
          "The central bank is the big bank that looks after a country's money, like the vault.",
          "Die Zentralbank ist die große Bank, die auf das Geld eines Landes aufpasst, wie der Tresor.",
          "Bank centralny to wielki bank, który dba o pieniądze kraju, jak skarbiec.",
        ),
        T(
          "The central bank works to keep prices steady. That keeps the note's worth steady.",
          "Die Zentralbank sorgt für stabile Preise. So bleibt der Schein gleich viel wert.",
          "Bank centralny dba o stabilne ceny. Dzięki temu banknot trzyma swoją wartość.",
        ),
      ],
      TrustDiagram,
    ),
  ],
  toyIntro: T(
    "Try the vault swap. Read what to do now, then tap the action button.",
    "Probiere den Tresor-Tausch aus. Lies, was du tun kannst, und tippe auf den Knopf.",
    "Wypróbuj wymianę w skarbcu. Przeczytaj instrukcję i naciśnij przycisk.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What did the vault give Finn for his gold?",
        "Was gab der Tresor Finn für sein Gold?",
        "Co skarbiec dał Finnowi za jego złoto?",
      ),
      options: [
        { text: T("More gold coins", "Mehr Goldmünzen", "Więcej złotych monet") },
        {
          text: T("A paper note", "Einen Geldschein aus Papier", "Papierowy banknot"),
          correct: true,
        },
        { text: T("A loaf of bread", "Einen Laib Brot", "Bochenek chleba") },
      ],
      hint: T(
        "Remember the thick door? The vault kept the gold and gave Finn a paper note.",
        "Weißt du noch, die dicke Tür? Der Tresor behielt das Gold und gab Finn einen Geldschein.",
        "Pamiętasz grube drzwi? Skarbiec zatrzymał złoto i dał Finnowi papierowy banknot.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Do the vault swap. Press each button until you see the note still buys bread.",
        "Mach den Tresor-Tausch. Tippe auf die Knöpfe, bis du siehst, dass der Schein noch Brot kauft.",
        "Zrób wymianę w skarbcu. Naciskaj przyciski, aż zobaczysz, że banknot nadal kupuje chleb.",
      ),
      Widget,
      hint: T(
        "Read what to do now, then tap the action button.",
        "Lies, was du tun kannst, und tippe auf den Knopf.",
        "Przeczytaj instrukcję i naciśnij przycisk.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is a paper note worth something today?",
        "Warum ist ein Geldschein heute etwas wert?",
        "Dlaczego banknot jest dziś coś wart?",
      ),
      options: [
        {
          text: T(
            "It is made of real gold",
            "Er besteht aus echtem Gold",
            "Jest zrobiony z prawdziwego złota",
          ),
        },
        {
          text: T(
            "It has a nice picture on it",
            "Er hat ein schönes Bild drauf",
            "Ma na sobie ładny obrazek",
          ),
        },
        {
          text: T(
            "Everyone accepts it and trusts it",
            "Alle nehmen ihn an und vertrauen ihm",
            "Wszyscy go przyjmują i mu ufają",
          ),
          correct: true,
        },
      ],
      hint: T(
        "After 1971 the gold promise was over. The note still bought bread because everyone accepted it.",
        "Nach 1971 gab es kein Goldversprechen mehr. Der Schein kaufte trotzdem Brot, weil alle ihn annahmen.",
        "Po 1971 roku nie było już obietnicy złota. Banknot nadal kupował chleb, bo wszyscy go przyjmowali.",
      ),
    },
  ],
  askDad: T(
    "Look at a banknote together. What is written on it? Who do you think makes sure everyone accepts it?",
    "Schau dir mit mir einen Geldschein an. Was steht darauf? Wer sorgt wohl dafür, dass alle ihn annehmen?",
    "Obejrzyjmy razem banknot. Co jest na nim napisane? Kto, jak myślisz, dba o to, żeby wszyscy go przyjmowali?",
  ),
  realLife: {
    title: {
      en: "The euro in Germany",
      de: "Der Euro in Deutschland",
      pl: "Euro w Niemczech",
    },
    body: {
      en: "In Germany people pay with the euro. It started in 1999. The European Central Bank keeps prices steady.",
      de: "In Deutschland bezahlen wir mit dem Euro. Seit 1999 gibt es ihn. Die Europäische Zentralbank sorgt dafür, dass die Preise stabil bleiben.",
      pl: "W Niemczech płacimy euro. Euro powstało w 1999 roku. Europejski Bank Centralny dba o stabilne ceny.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "On 15 August 1971 President Nixon suspended the dollar's convertibility into gold.",
          de: "Am 15. August 1971 setzte Präsident Nixon die Umtauschbarkeit des Dollars in Gold aus.",
          pl: "15 sierpnia 1971 roku prezydent Nixon zawiesił wymienialność dolara na złoto.",
        },
        source: "https://history.state.gov/milestones/1969-1976/nixon-shock",
      },
      {
        text: {
          en: "Under the Bretton Woods system, foreign central banks could swap dollars for gold at $35 an ounce.",
          de: "Im Bretton-Woods-System konnten ausländische Zentralbanken Dollar zu 35 Dollar je Unze in Gold tauschen.",
          pl: "W systemie z Bretton Woods zagraniczne banki centralne mogły wymieniać dolary na złoto po 35 dolarów za uncję.",
        },
        source: "https://www.federalreservehistory.org/essays/gold-convertibility-ends",
      },
      {
        text: {
          en: "After the gold window closed, the system became a fiat one and Bretton Woods ended soon after.",
          de: "Nach dem Ende des Goldfensters wurde das System zu einem Fiat-System, und Bretton Woods endete bald darauf.",
          pl: "Po zamknięciu okienka złota system stał się fiducjarny, a Bretton Woods wkrótce się skończył.",
        },
        source: "https://www.federalreservehistory.org/essays/gold-convertibility-ends",
      },
      {
        text: {
          en: "The euro was launched on 1 January 1999.",
          de: "Der Euro wurde am 1. Januar 1999 eingeführt.",
          pl: "Euro zostało wprowadzone 1 stycznia 1999 roku.",
        },
        source: "https://www.ecb.europa.eu/euro/intro/html/index.en.html",
      },
      {
        text: {
          en: "The ECB's primary objective is price stability: inflation that stays low, stable and predictable.",
          de: "Das vorrangige Ziel der EZB ist Preisstabilität: Eine Inflation, die niedrig, stabil und vorhersehbar bleibt.",
          pl: "Głównym celem EBC jest stabilność cen: inflacja, która pozostaje niska, stabilna i przewidywalna.",
        },
        source: "https://www.ecb.europa.eu/mopo/intro/objective/html/index.en.html",
      },
      {
        text: {
          en: "In the euro area the single monetary policy is entrusted to the European Central Bank.",
          de: "Im Euroraum ist die einheitliche Geldpolitik der Europäischen Zentralbank anvertraut.",
          pl: "W strefie euro jednolita polityka pieniężna jest powierzona Europejskiemu Bankowi Centralnemu.",
        },
        source: "https://economy-finance.ec.europa.eu/euro_en",
      },
      {
        text: {
          en: 'The "I promise to pay the bearer" clause on Indian notes means the Reserve Bank of India is liable to the holder of the note.',
          de: 'Die Klausel "I promise to pay the bearer" auf indischen Scheinen bedeutet, dass die Reserve Bank of India dem Inhaber des Scheins verpflichtet ist.',
          pl: 'Klauzula "I promise to pay the bearer" na indyjskich banknotach oznacza, że Reserve Bank of India jest zobowiązany wobec posiadacza banknotu.',
        },
        source: "https://www.rbi.org.in/scripts/FAQView.aspx?Id=136",
      },
      {
        text: {
          en: "By law every Indian banknote is legal tender and is guaranteed by the Central Government.",
          de: "Nach dem Gesetz ist jeder indische Geldschein gesetzliches Zahlungsmittel und von der Zentralregierung garantiert.",
          pl: "Zgodnie z prawem każdy indyjski banknot jest prawnym środkiem płatniczym i jest gwarantowany przez rząd centralny.",
        },
        source: "https://www.rbi.org.in/scripts/FAQView.aspx?Id=136",
      },
    ],
    simplified: [
      {
        en: "In 1971 the swap for gold had been open only to foreign central banks. The story says the country stopped swapping its notes, which is the idea an 8-year-old needs.",
        de: "1971 war der Tausch gegen Gold nur für ausländische Zentralbanken offen. Die Geschichte sagt nur, das Land habe das Tauschen beendet, das ist der Kern für ein Kind.",
        pl: "W 1971 roku wymiana na złoto była otwarta tylko dla zagranicznych banków centralnych. Opowieść mówi tylko, że kraj przestał wymieniać banknoty, i to wystarcza dziecku.",
      },
      {
        en: "The Ripple Town vault stands for a central bank or a state. Real gold standards had many rules and ended at different times.",
        de: "Der Tresor in Ripple Town steht für eine Zentralbank oder einen Staat. Echte Goldstandards hatten viele Regeln und endeten zu verschiedenen Zeiten.",
        pl: "Skarbiec w Ripple Town oznacza bank centralny lub państwo. Prawdziwe standardy złota miały wiele zasad i kończyły się w różnych czasach.",
      },
      {
        en: "Why a note keeps its worth has more causes than trust, such as law and taxes. The lesson names trust and the central bank only.",
        de: "Warum ein Schein seinen Wert behält, hat mehr Gründe als Vertrauen, etwa Gesetze und Steuern. Die Lektion nennt nur Vertrauen und die Zentralbank.",
        pl: "Banknot zachowuje wartość z więcej powodów niż zaufanie, na przykład przez prawo i podatki. Lekcja wymienia tylko zaufanie i bank centralny.",
      },
      {
        en: "Price stability means low and steady inflation, not prices that never move. The story says the central bank keeps prices steady.",
        de: "Preisstabilität heißt niedrige und stabile Inflation, nicht Preise, die sich nie bewegen. Die Geschichte sagt, die Zentralbank halte die Preise stabil.",
        pl: "Stabilność cen to niska i stała inflacja, a nie ceny, które nigdy się nie zmieniają. Opowieść mówi, że bank centralny dba o stabilne ceny.",
      },
      {
        en: "Finn, Bea and the vault are made up.",
        de: "Finn, Bea und der Tresor sind erfunden.",
        pl: "Finn, Bea i skarbiec są wymyśleni.",
      },
    ],
  },
};
