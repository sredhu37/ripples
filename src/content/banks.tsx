import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BedDiagram,
  CardDiagram,
  DepositDiagram,
  LendDiagram,
  OvenDiagram,
  ProtectDiagram,
  ReadyDiagram,
  RunDiagram,
} from "./banks.diagrams";
import { BankBoard, Controls, START, bankIsBalanced } from "./banks.toy";
import type { Board } from "./banks.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  const [s, set] = useState<Board>(START);
  return (
    <>
      <BankBoard lang={lang} s={s} />
      <Controls
        lang={lang}
        s={s}
        set={(newBoard) => {
          set(newBoard);
          onDone?.();
        }}
      />
    </>
  );
}

function BalanceWidget({ lang, onAnswer }: WidgetProps) {
  const [s, set] = useState<Board>(START);
  return (
    <>
      <BankBoard lang={lang} s={s} />
      <Controls lang={lang} s={s} set={set} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(bankIsBalanced(s))} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "banks",
  story: [
    animatedBeat(
      [
        T(
          "This is Finn again. He has a few spare coins that he does not need today.",
          "Das ist wieder Finn. Er hat ein paar Münzen übrig, die er heute nicht braucht.",
          "To znowu Finn. Ma kilka wolnych monet, których dzisiaj nie potrzebuje.",
        ),
        T("So he hides them under his bed.", "Darum versteckt er sie unter seinem Bett.", "Chowa je więc pod swoim łóżkiem."),
        T(
          "But what if the cat finds them? Or what if Finn forgets where he hid them?",
          "Aber was, wenn die Katze sie findet? Oder wenn Finn vergisst, wo er sie versteckt hat?",
          "Ale co, jeśli kot je znajdzie? Albo co, jeśli Finn zapomni, gdzie je schował?",
        ),
        T("A bed is not a very safe place for coins.", "Ein Bett ist kein besonders sicherer Ort für Münzen.", "Łóżko nie jest zbyt bezpiecznym miejscem na monety."),
      ],
      BedDiagram,
    ),
    animatedBeat(
      [
        T(
          "Bea is a baker, and she has a big wish. She wants a new oven, so she can bake more bread.",
          "Bea ist Bäckerin und hat einen großen Wunsch. Sie möchte einen neuen Ofen, damit sie mehr Brot backen kann.",
          "Bea jest piekarzem i ma wielkie marzenie. Chce nowy piec, aby piec więcej chleba.",
        ),
        T(
          "The oven costs 4 coins. But Bea does not have 4 coins, so she needs to borrow them.",
          "Der Ofen kostet 4 Münzen. Aber Bea hat keine 4 Münzen, also muss sie sich welche leihen.",
          "Piec kosztuje 4 monety. Lecz Bea nie ma 4 monet, więc musi je pożyczyć.",
        ),
        T(
          "But who has coins to spare? Bea cannot knock on every door in town.",
          "Aber wer hat Münzen übrig? Bea kann ja nicht an jeder Tür im Ort klingeln.",
          "Ale kto ma wolne monety? Bea nie może pukać do każdych drzwi w miasteczku.",
        ),
      ],
      OvenDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Luckily, Ripple Town has a *bank*. A bank is a safe place that looks after people's coins.",
          "Zum Glück gibt es in Ripple Town eine *Bank*. Eine Bank ist ein sicherer Ort, der auf die Münzen der Leute aufpasst.",
          "Na szczęście w Ripple Town jest *bank*. Bank to bezpieczne miejsce, które pilnuje monet mieszkańców.",
        ),
        T("Finn brings his spare coins to the bank.", "Finn bringt seine übrigen Münzen zur Bank.", "Finn przynosi swoje wolne monety do banku."),
        T(
          "Putting coins into a bank has a name. It is called a *deposit*. Finn makes a deposit.",
          "Münzen auf die Bank zu bringen hat einen Namen. Es heißt *Einzahlung*. Finn zahlt seine Münzen ein.",
          "Wpłacenie monet do banku ma swoją nazwę. To jest *wpłata* (depozyt). Finn dokonuje wpłaty.",
        ),
        T(
          "The bank writes down whose coins they are. These coins belong to Finn.",
          "Die Bank schreibt auf, wem die Münzen gehören. Diese Münzen gehören Finn.",
          "Bank zapisuje, czyje to monety. Te monety należą do Finna.",
        ),
      ],
      DepositDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "Now Bea goes to the bank. She asks if she can borrow 4 coins.",
          "Jetzt geht Bea zur Bank. Sie fragt, ob sie sich 4 Münzen leihen darf.",
          "Teraz Bea idzie do banku. Pyta, czy może pożyczyć 4 monety.",
        ),
        T("The bank lends her some of the saved coins.", "Die Bank leiht ihr einige der gesparten Münzen.", "Bank pożycza jej część zaoszczędzonych monet."),
        T("Now Bea can buy her new oven!", "Jetzt kann Bea ihren neuen Ofen kaufen!", "Teraz Bea może kupić swój nowy piec!"),
        T("Later, Bea pays the coins back to the bank.", "Später zahlt Bea die Münzen an die Bank zurück.", "Później Bea spłaca monety do banku."),
      ],
      LendDiagram,
    ),
    animatedBeat(
      [
        T(
          "But Finn may want his coins back soon. Savers can ask for their coins on any day.",
          "Aber Finn will seine Münzen vielleicht bald zurückhaben. Sparer dürfen an jedem Tag nach ihren Münzen fragen.",
          "Ale Finn może wkrótce zechcieć odzyskać swoje monety. Oszczędzający mogą zażądać zwrotu w dowolnym dniu.",
        ),
        T(
          "So the bank never lends out everything. Some coins stay ready in its safe.",
          "Darum verleiht die Bank nie alles. Ein paar Münzen bleiben im Tresor bereit.",
          "Dlatego bank nigdy nie pożycza wszystkiego. Część monet pozostaje w skarbcu w gotowości.",
        ),
        T(
          "On a normal day only a few savers come. Then the coins in the safe are enough.",
          "An einem normalen Tag kommen nur wenige Sparer. Dann reichen die Münzen im Tresor.",
          "W zwykły dzień przychodzi tylko kilku oszczędzających. Wtedy monety w skarbcu w zupełności wystarczają.",
        ),
      ],
      ReadyDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "But what if lots of savers come on the very same day?",
          "Aber was, wenn ganz viele Sparer am selben Tag kommen?",
          "Ale co, jeśli wielu oszczędzających przyjdzie dokładnie tego samego dnia?",
        ),
        T(
          "Some of the coins are with Bea, so the bank cannot give everything back at once.",
          "Ein Teil der Münzen ist bei Bea. Die Bank kann nicht alles auf einmal zurückgeben.",
          "Część monet ma Bea, więc bank nie może oddać wszystkiego od razu.",
        ),
        T(
          "When many savers want their coins back at the same time, it is called a *bank run*.",
          "Wenn viele Sparer gleichzeitig ihre Münzen zurückwollen, nennt man das einen *Ansturm auf die Bank*.",
          "Kiedy wielu klientów chce wypłacić monety w tym samym czasie, to zjawisko nazywa się *paniką bankową*.",
        ),
      ],
      RunDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "In real life, the law protects the money that people keep in a bank.",
          "In echt schützt das Gesetz das Geld, das Leute auf der Bank haben.",
          "W prawdziwym życiu prawo chroni pieniądze, które ludzie trzymają w banku.",
        ),
        T(
          "This is called *deposit protection*. If a bank ever fails, savers still get their money back, up to a limit.",
          "Das heißt *Einlagensicherung*. Wenn eine Bank einmal pleitegeht, bekommen die Sparer ihr Geld trotzdem zurück, bis zu einer Grenze.",
          "Nazywa się to *ochroną depozytów*. Gdyby bank upadł, oszczędzający i tak odzyskają pieniądze, do określonego limitu.",
        ),
        T(
          "So Finn's coins are protected. You can read the limit on the card at the end of the lesson.",
          "So sind Finns Münzen geschützt. Die Grenze steht auf der Karte am Ende der Lektion.",
          "Dlatego monety Finna są chronione. O limitach możesz przeczytać na karcie na końcu lekcji.",
        ),
      ],
      ProtectDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "A bank also helps with paying. Sam wants to pay Bea, but he does not use coins. He uses a card.",
          "Eine Bank hilft auch beim Bezahlen. Sam will Bea bezahlen, aber nicht mit Münzen. Er nimmt eine Karte.",
          "Bank pomaga również w płatnościach. Sam chce zapłacić Bei, ale nie używa monet. Używa karty.",
        ),
        T(
          "No coins have to move! The bank just changes numbers on its computer.",
          "Es müssen keine Münzen wandern! Die Bank ändert nur Zahlen in ihrem Computer.",
          "Żadne monety nie muszą wędrować! Bank po prostu zmienia liczby w swoim komputerze.",
        ),
        T(
          "Sam's number gets smaller and Bea's number gets bigger. Money in a bank is mostly numbers like these.",
          "Sams Zahl wird kleiner und Beas Zahl wird größer. Geld auf der Bank besteht meistens aus solchen Zahlen.",
          "Liczba u Sama maleje, a u Bei rośnie. Pieniądze w banku to w większości właśnie takie cyfrowe zapisy.",
        ),
      ],
      CardDiagram,
    ),
  ],
  toyIntro: T(
    "Put coins into the bank and lend some to Bea. Then press Bank run. Can everyone get their coins back?",
    "Bringe Münzen zur Bank und verleihe einige. Drück dann Ansturm. Bekommen alle ihre Münzen zurück?",
    "Wpłać monety do banku i pożycz część Bei. Następnie naciśnij Panika bankowa. Czy wszyscy odzyskają swoje monety?",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why does the bank keep some coins ready instead of lending them all?",
        "Warum behält die Bank einige Münzen bereit, statt alle zu verleihen?",
        "Dlaczego bank trzyma część monet w pogotowiu, zamiast pożyczyć wszystkie?",
      ),
      options: [
        { text: T("Bea only needs a few coins", "Bea braucht nur ein paar Münzen", "Bea potrzebuje tylko kilku monet") },
        { text: T("Lending coins is not allowed in Ripple Town", "Münzen verleihen ist in Ripple Town nicht erlaubt", "Pożyczanie monet jest zabronione w Ripple Town") },
        { text: T("Savers can ask for their coins back", "Sparer können ihre Münzen zurückverlangen", "Oszczędzający mogą w każdej chwili zażądać zwrotu"), correct: true },
      ],
      hint: T(
        "Think of Finn. He may come to get his coins on any day. So the bank needs some coins ready for him.",
        "Denk an Finn. Er kann an jedem Tag kommen und seine Münzen holen. Darum braucht die Bank ein paar Münzen für ihn bereit.",
        "Pomyśl o Finnie. Może przyjść po swoje monety w dowolnym dniu. Dlatego bank musi mieć monety przygotowane do wypłaty.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Set the bank so Bea gets her oven AND a bank run still works. Test it with Bank run. Then press Check.",
        "Stelle die Bank so ein, dass Bea ihren Ofen bekommt UND ein Ansturm trotzdem klappt. Teste es mit Ansturm. Drücke dann Prüfen.",
        "Ustaw bank tak, aby Bea dostała piec ORAZ aby bank wytrzymał panikę bankową. Przetestuj to przyciskiem Panika bankowa, a potem naciśnij Sprawdź.",
      ),
      Widget: BalanceWidget,
      hint: T(
        "Bea needs 4 coins. And on a bank run day, enough coins must stay ready. Try Bank run!",
        "Bea braucht 4 Münzen. Beim Ansturm müssen genug bereit bleiben. Probier ihn aus!",
        "Bea potrzebuje 4 monet. W dniu paniki bankowej wystarczająco dużo monet musi zostać w skarbcu. Wypróbuj panikę bankową!",
      ),
    },
    {
      kind: "choice",
      prompt: T("Sam pays Bea with a card. What does the bank do?", "Sam bezahlt Bea mit einer Karte. Was macht die Bank?", "Sam płaci Bei kartą. Co robi bank?"),
      options: [
        { text: T("It changes numbers: less for Sam, more for Bea", "Sie ändert Zahlen: weniger bei Sam, mehr bei Bea", "Zmienia zapisy: mniej u Sama, więcej u Bei"), correct: true },
        { text: T("It carries a bag of coins from Sam's house to Bea", "Sie trägt einen Beutel Münzen von Sams Haus zu Bea", "Niesie worek monet z domu Sama do Bei") },
        { text: T("It waits until Sam brings enough coins to the bank", "Sie wartet, bis Sam genug Münzen zur Bank bringt", "Czeka, aż Sam przyniesie wystarczająco dużo monet do banku") },
      ],
      hint: T(
        "No coins have to move. Money in a bank is mostly numbers on a computer, so the bank just changes the numbers.",
        "Es müssen keine Münzen wandern. Geld auf der Bank besteht meistens aus Zahlen im Computer, also ändert die Bank nur die Zahlen.",
        "Monety nie muszą wędrować. Pieniądze w banku to w większości zapisy w komputerze, więc bank po prostu aktualizuje liczby.",
      ),
    },
  ],
  askDad: T(
    "Do we keep any money at a bank? What do you think the bank does with it while it waits? And why do people feel safer with their money in a bank than under a bed?",
    "Haben wir Geld auf der Bank? Was glaubst du, macht die Bank damit, solange es dort liegt? Und warum fühlen sich Menschen mit ihrem Geld auf der Bank sicherer als unter dem Bett?",
    "Czy trzymamy pieniądze w banku? Jak myślisz, co bank z nimi robi, kiedy tam leżą? I dlaczego ludzie czują się bezpieczniej, trzymając pieniądze w banku niż pod łóżkiem?",
  ),
  realLife: {
    title: {
      en: "Banks in India",
      de: "Banken in Deutschland",
      pl: "Banki w Polsce",
    },
    body: {
      en: "In India, the law protects money in bank accounts through DICGC (Deposit Insurance and Credit Guarantee Corporation, an RBI subsidiary). If a bank ever fails, savers get back up to ₹5,00,000 (5 lakh rupees) per person per bank. Banks are supervised by the Reserve Bank of India (RBI).",
      de: "In Deutschland schützt das Gesetz Geld auf Sparkonten und Girokonten (Einlagensicherung). Geht eine Bank pleite, bekommen Sparer bis zu 100.000 Euro pro Person und Bank zurück. So lautet die EU-Regel im Oktober 2026. Auch die BaFin und die Europäische Zentralbank passen auf die Banken auf.",
      pl: "W Polsce depozyty na kontach bankowych są chronione przez Bankowy Fundusz Gwarancyjny (BFG). W przypadku upadłości banku środki do równowartości 100 000 euro (w złotych) na osobę w danym banku są w 100% gwarantowane przez państwo. Nadzór nad bankami sprawuje Komisja Nadzoru Finansowego (KNF) i Narodowy Bank Polski (NBP).",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "A bank's main role is to take in deposits from people who have money, pool them, and lend them to people who need funds. Banks act as financial intermediaries.",
          de: "Die Hauptaufgabe einer Bank besteht darin, Einlagen anzunehmen, zu bündeln und an Kreditnehmer weiterzuleiten (Finanzintermediation).",
          pl: "Główną rolą banku jest przyjmowanie depozytów, łączenie ich i udzielanie kredytów podmiotom potrzebującym finansowania (pośrednictwo finansowe).",
        },
        source: "https://www.imf.org/en/publications/fandd/issues/series/back-to-basics/banks",
      },
      {
        text: {
          en: "Banks operate with fractional reserves: they keep a fraction of deposits available because depositors rarely withdraw all funds simultaneously.",
          de: "Banken arbeiten mit Teilreservern: Sie halten nur einen Teil als Barreserve, da Sparer ihr Geld selten gleichzeitig bar abheben.",
          pl: "Banki działają w systemie rezerwy cząstkowej: utrzymują w gotowości tylko część środków, ponieważ klienci rzadko wypłacają wszystko naraz.",
        },
        source: "https://publikationen.bundesbank.de/publikationen-de/schule-bildung/geld-und-geldpolitik-921580?article=3-banken-und-buchgeld-922604",
      },
      {
        text: {
          en: "A sudden wave of withdrawals where savers rush to pull out funds before liquid assets run dry is called a bank run.",
          de: "Wenn viele Sparer aus Sorge gleichzeitig ihr Geld abheben wollen, spricht man von einem Bankansturm (Bank Run).",
          pl: "Masowe i nagłe wycofywanie oszczędności przez zaniepokojonych klientów to panika bankowa (bank run).",
        },
        source: "https://www.stlouisfed.org/publications/regional-economist/2023/may/interest-rate-risk-bank-runs",
      },
      {
        text: {
          en: "Statutory deposit insurance funds protect savers' deposits up to official limits (e.g. 100,000 EUR in the EU, 5 lakh INR in India), preventing panic.",
          de: "Gesetzliche Einlagensicherungen schützen Bankguthaben bis zu gesetzlichen Höchstgrenzen (z. B. 100.000 EUR in der EU) und beruhigen Sparer.",
          pl: "Ustawowe systemy gwarantowania depozytów (np. BFG w Polsce, 100 000 EUR) chronią oszczędności obywateli i zapobiegają panice.",
        },
        source: "https://www.bundesbank.de/en/tasks/financial-supervision/individual-aspects/deposit-protection-622748",
      },
      {
        text: {
          en: "Most money today is electronic 'book money' created in the banking system; digital payments and card transfers update accounting ledgers without physical cash.",
          de: "Das meiste Geld ist heute digitales Buchgeld; Kartenzahlungen und Überweisungen verändern Computereinträge ohne Münzen.",
          pl: "Większość dzisiejszego pieniądza to pieniądz bezgotówkowy (elektroniczny); płatności kartą i przelewy aktualizują salda na kontach bez fizycznej gotówki.",
        },
        source: "https://www.bankofengland.co.uk/explainers/how-is-money-created",
      },
    ],
    simplified: [
      {
        en: "The story simplifies bank lending as passing along Finn's exact coins; modern banks expand electronic balance sheets.",
        de: "Die Geschichte vereinfacht die Kreditvergabe als Weitergabe von Finns Münzen; moderne Banken schaffen Buchgeld bei Kreditvergabe.",
        pl: "Opowieść przedstawia pożyczanie jako przekazanie monet Finna; współczesne banki kreują pieniądz bezgotówkowy.",
      },
      {
        en: "The toy uses simple integer arithmetic to illustrate liquidity reserves and bank runs.",
        de: "Das Lernspiel nutzt einfache Zahlen, um Barreserven und Anstürme verständlich zu machen.",
        pl: "Gra edukacyjna stosuje proste liczby, aby zilustrować rezerwy płynności oraz ryzyko paniki bankowej.",
      },
      {
        en: "Official supervision (ECB, BaFin, KNF, RBI) and deposit guarantee schemes prevent historical runs in regulated markets.",
        de: "Finanzaufsicht und Einlagensicherungsfonds sichern Stabilität in regulierten Bankensektoren.",
        pl: "Nadzór finansowy (KNF, NBP, EBC) i fundusze gwarancyjne zapewniają stabilność w regulowanym sektorze bankowym.",
      },
      {
        en: "Electronic money is introduced through ledger updates when paying with cards.",
        de: "Elektronisches Buchgeld wird anhand von Saldenänderungen beim Kartenzahlen greifbar gemacht.",
        pl: "Pojęcie pieniądza bezgotówkowego wyjaśniono poprzez zmianę zapisów na kontach przy płatności kartą.",
      },
    ],
  },
};
