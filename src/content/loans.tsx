import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BigOvenDiagram,
  BuyOvenDiagram,
  CarefulDiagram,
  ExtraDiagram,
  LoanDiagram,
  PayBackDiagram,
  ReasonsDiagram,
  TinyOvenDiagram,
} from "./loans.diagrams";
import { LoanBoard, OVEN_COST, Toy as LoanToy, plan } from "./loans.toy";

export { OVEN_COST, SALES_PER_WEEK, plan } from "./loans.toy";
export type { Plan } from "./loans.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <LoanToy lang={lang} onDone={onDone} />;
}

function PayWeeklyWidget({ lang, onAnswer }: WidgetProps) {
  const [coins, setCoins] = useState(20);
  const [weeks, setWeeks] = useState(4);
  const check = () => onAnswer(coins === OVEN_COST && plan(coins, weeks).covered);
  return (
    <>
      <LoanBoard lang={lang} coins={coins} weeks={weeks} onCoins={setCoins} onWeeks={setWeeks} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={check} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "loans",
  story: [
    animatedBeat(
      [
        T(
          "Let's visit Bea again. Bea is the baker of Ripple Town.",
          "Besuchen wir Bea noch einmal. Bea ist die Bäckerin von Ripple Town.",
          "Odwiedźmy znowu Beę. Bea jest piekarzem w Ripple Town.",
        ),
        T(
          "Bea bakes her bread in an oven. But her oven is tiny.",
          "Bea backt ihr Brot in einem Ofen. Aber ihr Ofen ist winzig.",
          "Bea piecze chleb w piecu. Ale jej piec jest malutki.",
        ),
        T(
          "It bakes only a few loaves a day.",
          "Er backt nur ein paar Brote am Tag.",
          "Piecze tylko kilka bochenków dziennie.",
        ),
        T(
          "Lots of people in Ripple Town keep asking for more bread.",
          "Viele Leute in Ripple Town wollen immer mehr Brot.",
          "Wielu mieszkańców Ripple Town prosi o więcej chleba.",
        ),
      ],
      TinyOvenDiagram,
    ),
    animatedBeat(
      [
        T(
          "Bea has a dream. She would love a big oven.",
          "Bea hat einen Traum. Sie hätte so gern einen großen Ofen.",
          "Bea ma marzenie. Bardzo chciałaby mieć duży piec.",
        ),
        T(
          "A big oven bakes lots more bread, so Bea could sell much more.",
          "Ein großer Ofen backt viel mehr Brot, und Bea könnte viel mehr verkaufen.",
          "W dużym piecu upiecze o wiele więcej chleba, więc mogłaby sprzedawać znacznie więcej.",
        ),
        T(
          "But a big oven costs 40 coins.",
          "Aber ein großer Ofen kostet 40 Münzen.",
          "Lecz duży piec kosztuje 40 monet.",
        ),
        T(
          "Bea has only 5 coins. That is far too few, so she cannot buy the oven.",
          "Bea hat nur 5 Münzen. Das ist viel zu wenig, also kann sie den Ofen nicht kaufen.",
          "Bea ma tylko 5 monet. To o wiele za mało, więc nie może kupić pieca.",
        ),
      ],
      BigOvenDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "This is Pim. Pim has saved lots of coins in a jar.",
          "Das ist Pim. Pim hat viele Münzen in einem Glas gespart.",
          "To jest Pim. Pim zaoszczędziła mnóstwo monet w słoiku.",
        ),
        T(
          "Pim says: Bea, I can lend you 40 coins. You can give them back to me later.",
          "Pim sagt: Bea, ich kann dir 40 Münzen leihen. Du kannst sie mir später zurückgeben.",
          "Pim mówi: Bea, mogę ci pożyczyć 40 monet. Oddasz mi je później.",
        ),
        T(
          "Bea takes the coins and promises to give them back. Taking something for a while like this is called *borrowing*.",
          "Bea nimmt die Münzen und verspricht, sie zurückzugeben. Etwas auf diese Weise für eine Zeit zu nehmen, nennt man *leihen*.",
          "Bea bierze monety i obiecuje je oddać. Wzięcie czegoś na pewien czas w ten sposób nazywa się *pożyczaniem*.",
        ),
        T(
          "What Bea gets from Pim has a name too. It is called a *loan*. A loan is money that you must give back.",
          "Das, was Bea von Pim bekommt, hat auch einen Namen: *Darlehen*. Ein Darlehen ist Geld, das man zurückgeben muss.",
          "To, co Bea otrzymuje od Pim, również ma swoją nazwę: to *pożyczka*. Pożyczka to pieniądze, które musisz oddać.",
        ),
      ],
      LoanDiagram,
    ),
    animatedBeat(
      [
        T(
          "Bea uses the 40 coins to buy the big oven.",
          "Bea kauft von den 40 Münzen den großen Ofen.",
          "Bea kupuje duży piec za 40 monet.",
        ),
        T(
          "Now she bakes lots more bread every day.",
          "Jetzt backt sie jeden Tag viel mehr Brot.",
          "Teraz piecze codziennie o wiele więcej chleba.",
        ),
        T(
          "She sells the bread to the people of Ripple Town and earns coins.",
          "Sie verkauft das Brot an die Leute in Ripple Town und verdient Münzen.",
          "Sprzedaje chleb mieszkańcom Ripple Town i zarabia monety.",
        ),
      ],
      BuyOvenDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "Every week Bea pays some coins back to Pim.",
          "Jede Woche zahlt Bea ein paar Münzen an Pim zurück.",
          "Co tydzień Bea oddaje Pim część monet.",
        ),
        T(
          "She pays them from the coins that she earns with her bread.",
          "Sie zahlt sie von den Münzen, die sie mit ihrem Brot verdient.",
          "Płaci nimi z monet, które zarabia na chlebie.",
        ),
        T(
          "Little by little, she gives back everything she borrowed.",
          "Nach und nach gibt sie alles zurück, was sie sich geliehen hat.",
          "Krok po kroku oddaje wszystko, co pożyczyła.",
        ),
      ],
      PayBackDiagram,
    ),
    animatedBeat(
      [
        T(
          "But Pim wants back a little more than 40 coins. She has three reasons.",
          "Aber Pim will etwas mehr als 40 Münzen zurückhaben. Dafür hat sie drei Gründe.",
          "Ale Pim chce z powrotem trochę więcej niż 40 monet. Ma ku temu trzy powody.",
        ),
        T(
          "Reason one: Pim has to wait. She does not have her coins back for many weeks.",
          "Grund eins: Pim muss warten. Viele Wochen lang hat sie ihre Münzen nicht zurück.",
          "Powód pierwszy: Pim musi czekać. Przez wiele tygodni nie ma swoich monet.",
        ),
        T(
          "Reason two: Bea might not be able to pay. That is a *risk* for Pim. It means that things could go wrong.",
          "Grund zwei: Vielleicht kann Bea nicht zahlen. Das ist ein *Risiko* für Pim. Es heißt, dass etwas schiefgehen kann.",
          "Powód drugi: Bea może nie zdołać zapłacić. To *ryzyko* dla Pim. Oznacza to, że sprawy mogą pójść nie tak.",
        ),
        T(
          "Reason three: Pim could have used her coins herself, for example to buy a warm coat.",
          "Grund drei: Pim hätte ihre Münzen selbst nutzen können, zum Beispiel für einen warmen Mantel.",
          "Powód trzeci: Pim mogła sama wydać swoje monety, na przykład na ciepły płaszcz.",
        ),
      ],
      ReasonsDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "So Pim asks for a little extra when Bea pays back.",
          "Darum bittet Pim um ein kleines Extra, wenn Bea zurückzahlt.",
          "Dlatego Pim prosi o mały dodatek przy spłacie.",
        ),
        T(
          "Bea gives back the 40 coins she borrowed, plus a few extra coins on top.",
          "Bea gibt die 40 geliehenen Münzen zurück und noch ein paar Münzen obendrauf.",
          "Bea oddaje 40 pożyczonych monet oraz kilka dodatkowych monet na górkę.",
        ),
        T(
          "The extra is the price of the loan. It is what Bea pays for being allowed to use Pim's coins.",
          "Das Extra ist der Preis für das Darlehen. Den zahlt Bea dafür, dass sie Pims Münzen nutzen darf.",
          "Ten dodatek to cena pożyczki. Bea płaci go za to, że mogła skorzystać z monet Pim.",
        ),
      ],
      ExtraDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "Careful! Bea must pay back every week, even in a week when bread sells badly.",
          "Vorsicht! Bea muss jede Woche zurückzahlen, auch in einer Woche, in der sich das Brot schlecht verkauft.",
          "Ostrożnie! Bea musi spłacać co tydzień, nawet gdy chleb sprzedaje się słabiej.",
        ),
        T(
          "If Bea borrows too much, the weekly payments get too big for her bread money.",
          "Wenn Bea zu viel leiht, werden die Zahlungen pro Woche zu groß für ihr Brotgeld.",
          "Gdyby Bea pożyczyła za dużo, cotygodniowe raty przerosłyby jej dochody ze sprzedaży chleba.",
        ),
        T(
          "So borrow only what you need, and only what you can pay back.",
          "Darum leih dir nur, was du brauchst und was du zurückzahlen kannst.",
          "Dlatego pożyczaj tylko tyle, ile potrzebujesz i ile zdołasz spłacić.",
        ),
      ],
      CarefulDiagram,
      "think",
    ),
  ],
  toyIntro: T(
    "Help Bea plan her loan! Pick the coins and the weeks. Orange is what she pays each week. Green is what her bread earns. Is green big enough?",
    "Hilf Bea, ihr Darlehen zu planen! Wähle Münzen und Wochen. Orange ist, was sie jede Woche zahlt. Grün ist, was ihr Brot einbringt. Reicht das Grün?",
    "Pomóż Bei zaplanować pożyczkę! Wybierz liczbę monet i tygodni. Kolor pomarańczowy to tygodniowa rata. Kolor zielony to zarobek na chlebie. Czy zielony pasek wystarczy?",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Which one is NOT a reason why Pim wants a little extra back?",
        "Was ist KEIN Grund dafür, dass Pim ein kleines Extra zurückhaben will?",
        "Co NIE jest powodem, dla którego Pim chce odzyskać dodatkową kwotę?",
      ),
      options: [
        { text: T("Pim has to wait for her coins", "Pim muss auf ihre Münzen warten", "Pim musi czekać na swoje monety") },
        { text: T("Bea now has a shiny new oven", "Bea hat jetzt einen glänzenden neuen Ofen", "Bea ma teraz błyszczący nowy piec"), correct: true },
        { text: T("Bea might not be able to pay", "Bea kann vielleicht nicht zahlen", "Bea może nie być w stanie zapłacić") },
        { text: T("Pim could have used the coins herself", "Pim hätte die Münzen selbst nutzen können", "Pim mogła sama wykorzystać monety") },
      ],
      hint: T(
        "Remember Pim's three reasons: she waits, Bea might not pay (a risk), and Pim could have used the coins herself. Bea's oven is not a reason.",
        "Weißt du noch, Pims drei Gründe? Sie wartet, Bea zahlt vielleicht nicht (ein Risiko) und Pim hätte die Münzen selbst nutzen können. Beas Ofen ist kein Grund.",
        "Przypomnij sobie trzy powody Pim: musi czekać, istnieje ryzyko braku spłaty, mogła sama wydać te monety. Nowy piec Bei nie jest powodem dla Pim.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Bea needs exactly 40 coins for the oven. Set the coins and the weeks so that her bread sales (8 coins a week) can pay each weekly payment. Then press Check.",
        "Bea braucht genau 40 Münzen für den Ofen. Stelle Münzen und Wochen so ein, dass ihr Brotverkauf (8 Münzen pro Woche) jede Wochenzahlung bezahlen kann. Drücke dann Prüfen.",
        "Bea potrzebuje dokładnie 40 monet na piec. Ustaw monety i tygodnie tak, aby zarobek ze sprzedaży chleba (8 monet tygodniowo) pokrywał ratę. Następnie naciśnij Sprawdź.",
      ),
      Widget: PayWeeklyWidget,
      hint: T(
        "Bea needs exactly 40 coins for the oven. Then the weekly payment must be no bigger than her bread sales. More weeks make each payment smaller.",
        "Bea braucht genau 40 Münzen für den Ofen. Dann darf die Zahlung pro Woche nicht größer sein als ihr Brotverkauf. Mehr Wochen machen jede Zahlung kleiner.",
        "Bea potrzebuje dokładnie 40 monet na piec. Wtedy tygodniowa spłata nie może przekraczać zarobku ze sprzedaży chleba. Więcej tygodni zmniejsza pojedynczą ratę.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Bread sells badly for a week. What must Bea still do?",
        "Eine Woche lang verkauft sich das Brot schlecht. Was muss Bea trotzdem tun?",
        "Przez tydzień chleb sprzedaje się słabo. Co Bea musi mimo to zrobić?",
      ),
      options: [
        { text: T("Nothing. Losing the coins is Pim's problem now", "Nichts. Dass die Münzen weg sind, ist jetzt Pims Problem", "Nic. Strata monet to teraz problem Pim") },
        { text: T("Pay back only what the bread earned that week", "Nur zurückzahlen, was das Brot in der Woche gebracht hat", "Oddać tylko tyle, ile zarobiła w tym tygodniu") },
        { text: T("Pay back as agreed, even when it is hard", "Zurückzahlen wie ausgemacht, auch wenn es schwer ist", "Spłacić zgodnie z umową, nawet jeśli to trudne"), correct: true },
      ],
      hint: T(
        "A loan is a promise. Bea agreed to pay back every week, even when bread sells badly. That is why we borrow only what we can pay back.",
        "Ein Darlehen ist ein Versprechen. Bea hat ausgemacht, jede Woche zurückzuzahlen, auch wenn sich das Brot schlecht verkauft. Darum leiht man sich nur, was man zurückzahlen kann.",
        "Pożyczka to obietnica. Bea zobowiązała się płacić co tydzień, nawet jeśli sprzedaż idzie gorzej. Dlatego pożyczamy tylko tyle, ile możemy spłacić.",
      ),
    },
  ],
  askDad: T(
    "Dad, have you ever borrowed money or something big from someone? How did you make sure you could give it back? And do we ever borrow in our family?",
    "Papa, hast du dir schon einmal Geld oder etwas Großes geliehen? Wie hast du dafür gesorgt, dass du es zurückgeben kannst? Und leihen wir uns in unserer Familie manchmal etwas?",
    "Tato, czy pożyczyłeś kiedyś od kogoś pieniądze albo coś dużego? Jak upewniłeś się, że dasz radę to oddać? I czy w naszej rodzinie zdarza się nam coś pożyczać?",
  ),
  realLife: {
    title: {
      en: "Loans in India",
      de: "Darlehen in Deutschland",
      pl: "Pożyczki w Polsce",
    },
    body: {
      en: "In India, you can take out a loan on your own from age 18. Banks and NBFCs require loan agreements detailing the EMI (Equated Monthly Instalment) and total interest. Unregulated borrowing carries high risks, so borrowing from licensed institutions under RBI rules is essential.",
      de: "In Deutschland kannst du ab 18 Jahren allein ein Darlehen aufnehmen. Davor müssen deine Eltern und ein Gericht zustimmen. Ein Darlehensvertrag wird aufgeschrieben und muss zeigen, wie viel du insgesamt zurückzahlst. Erwachsene nennen das Extra „Zinsen“. Eine spätere Lektion erklärt sie.",
      pl: "W Polsce samodzielnie można wziąć kredyt lub pożyczkę po ukończeniu 18. roku życia. Umowa kredytowa musi być sporządzona na piśmie i dokładnie określać całkowity koszt kredytu oraz raty. Dorośli nazywają tę dodatkową kwotę „odsetkami”.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "In contract law, a loan agreement obliges the lender to hand over the agreed sum and the borrower to repay the loan when it falls due, along with any agreed interest.",
          de: "Im deutschen Recht verpflichtet ein Darlehensvertrag den Darlehensgeber zur Auszahlung und den Darlehensnehmer zur Rückzahlung und Zinszahlung bei Fälligkeit (BGB § 488).",
          pl: "W prawie umowa pożyczki zobowiązuje pożyczkodawcę do przekazania ustalonej kwoty, a pożyczkobiorcę do zwrotu kwoty i ewentualnych odsetek w terminie (np. Kodeks cywilny art. 720).",
        },
        source: "https://www.gesetze-im-internet.de/bgb/__488.html",
      },
      {
        text: {
          en: "Borrowing now to build something that pays later, with the lender getting back more than was lent, illustrates the trade-off between consuming now and investing for greater future income.",
          de: "Heute leihen, um etwas Produktives aufzubauen, verdeutlicht den ökonomischen Tausch zwischen sofortigem Konsum und Investition in künftigen Ertrag.",
          pl: "Pożyczanie dzisiaj na inwestycję, która przyniesie zysk w przyszłości, obrazuje równowagę między natychmiastową konsumpcją a inwestowaniem w rozwój.",
        },
        source: "https://www.europarl.europa.eu/workingpapers/econ/116/116_en.htm",
      },
      {
        text: {
          en: "Interest acts as compensation to induce savers to part with money rather than spend it immediately.",
          de: "Zinsen sind der Preis, der Sparer dazu bewegt, ihr Geld vorübergehend herzugeben, statt es selbst sofort auszugeben.",
          pl: "Odsetki stanowią wynagrodzenie zachęcające oszczędzających do powierzenia swoich środków zamiast ich natychmiastowego wydania.",
        },
        source: "https://www.europarl.europa.eu/workingpapers/econ/116/116_en.htm",
      },
      {
        text: {
          en: "Lenders consider credit risk: the greater the risk that a borrower cannot repay, the higher the rate they charge to compensate for possible defaults.",
          de: "Kreditgeber berücksichtigen Ausfallrisiken: Je höher das Risiko eines Zahlungsausfalls, desto höher fallen die Zinsen aus.",
          pl: "Kredytodawcy oceniają ryzyko kredytowe: im większe ryzyko braku spłaty, tym wyższe oprocentowanie rekompensujące ewentualne straty.",
        },
        source: "https://www.bankofengland.co.uk/explainers/what-are-interest-rates",
      },
      {
        text: {
          en: "Consumer protection rules require transparent credit contracts displaying interest rates, number of instalments, and total repayments before signing.",
          de: "Verbraucherschutzgesetze verlangen transparente Verträge, die effektiven Jahreszins, Raten und den Gesamtbetrag vor Vertragsschluss ausweisen.",
          pl: "Przepisy o kredycie konsumenckim wymagają przejrzystej umowy zawierającej RRSO, harmonogram rat oraz całkowitą kwotę do spłaty.",
        },
        source: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/kredit-schulden-insolvenz/kredite-und-darlehen-auch-beim-geldleihen-laesst-sich-sparen-10409",
      },
    ],
    simplified: [
      {
        en: "The toy's price rule (1 extra coin for every 10 coins borrowed per 4 weeks) is simplified to show cause and effect clearly.",
        de: "Die Spiel-Formel (1 Extra-Münze pro 10 Münzen je 4 Wochen) ist vereinfacht, um Ursache und Wirkung greifbar zu machen.",
        pl: "Zasada w zabawie (1 dodatkowa moneta za każde 10 monet na 4 tygodnie) jest uproszczona, by pokazać zależność.",
      },
      {
        en: "The extra is explained through waiting, default risk, and opportunity cost.",
        de: "Das Extra wird durch Warten, Ausfallrisiko und entgangene eigene Nutzung erklärt.",
        pl: "Dodatkowa kwota wynika z czekania, ryzyka niespłacenia oraz kosztu alternatywnego.",
      },
      {
        en: "Pim is a neighbour lending personal savings; modern loans primarily come from regulated financial institutions.",
        de: "Pim ist eine Nachbarin, die Ersparnisse leiht; moderne Kredite vergeben meist regulierte Kreditinstitute.",
        pl: "Pim to sąsiadka pożyczająca oszczędności; w rzeczywistości pożyczek udzielają głównie regulowane instytucje finansowe.",
      },
      {
        en: "Borrowing only what one can afford to repay each period is the core personal finance safeguard.",
        de: "Nur so viel zu leihen, wie man regelmäßig verlässlich tilgen kann, ist die wichtigste Grundregel.",
        pl: "Pożyczanie tylko tyle, ile można bezpiecznie spłacać w ratach, to podstawowa zasada bezpieczeństwa finansowego.",
      },
    ],
  },
};
