import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BankForBanksDiagram,
  PanicDiagram,
  PressureDiagram,
  RecapDiagram,
  RulesDiagram,
  SteadyPricesDiagram,
  WindowDiagram,
} from "./centralbanks.diagrams";
import { CentralBanksToy, WindowRound, allRight } from "./centralbanks.toy";
import type { Choice, Who } from "./centralbanks.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <CentralBanksToy lang={lang} onDone={onDone} />;
}

/** The child decides for three banks and presses Check. */
function LendWidget({ lang, onAnswer }: WidgetProps) {
  const [choices, setChoices] = useState<Partial<Record<Who, Choice>>>({});
  return (
    <>
      <WindowRound lang={lang} onChange={setChoices} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(allRight(choices))} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "centralbanks",
  story: [
    animatedBeat(
      [
        T(
          "Bea keeps her coins safe in a bank.",
          "Bea bewahrt ihre Münzen sicher in einer Bank auf.",
          "Bea trzyma swoje monety bezpiecznie w banku.",
        ),
        T(
          "Banks need a bank of their own, too.",
          "Auch Banken brauchen eine eigene Bank.",
          "Banki też potrzebują własnego banku.",
        ),
        T(
          "That bank for banks is called the *central bank*.",
          "Diese Bank für Banken heißt *Zentralbank*.",
          "Taki bank dla banków nazywa się *bank centralny*.",
        ),
      ],
      BankForBanksDiagram,
    ),
    animatedBeat(
      [
        T(
          "Bread costs 100 coins today.",
          "Brot kostet heute 100 Münzen.",
          "Chleb kosztuje dziś 100 monet.",
        ),
        T(
          "Next year it may cost 102. Prices grow only a little.",
          "Nächstes Jahr kostet es vielleicht 102. Preise wachsen nur ein bisschen.",
          "Za rok może kosztować 102. Ceny rosną tylko trochę.",
        ),
        T(
          "The central bank has a goal: prices grow about 2 in 100 each year.",
          "Die Zentralbank hat ein Ziel: Preise wachsen etwa 2 von 100 pro Jahr.",
          "Bank centralny ma cel: ceny rosną około 2 na 100 w ciągu roku.",
        ),
      ],
      SteadyPricesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Mayor Moss wants people to vote for him.",
          "Bürgermeister Moss möchte, dass die Leute ihn wählen.",
          "Burmistrz Moss chce, żeby ludzie na niego głosowali.",
        ),
        T(
          "He says: Print more coins! Everyone gets a gift!",
          "Er sagt: Druckt mehr Münzen! Jeder bekommt ein Geschenk!",
          "Mówi: Drukujcie więcej monet! Każdy dostanie prezent!",
        ),
        T(
          "You know what happens. Too many coins make prices jump.",
          "Du weißt, was dann passiert. Zu viele Münzen lassen die Preise springen.",
          "Wiesz, co będzie. Za dużo monet sprawia, że ceny skaczą.",
        ),
        T(
          "So the central bank must be free to say no. It is *independent*.",
          "Darum muss die Zentralbank nein sagen dürfen. Sie ist *unabhängig*.",
          "Dlatego bank centralny musi móc powiedzieć nie. Jest *niezależny*.",
        ),
      ],
      PressureDiagram,
    ),
    animatedBeat(
      [
        T(
          "In the euro countries, rules protect the central bank.",
          "In den Euro-Ländern schützen Regeln die Zentralbank.",
          "W krajach strefy euro zasady chronią bank centralny.",
        ),
        T(
          "It may not take orders from governments.",
          "Sie darf keine Befehle von Regierungen annehmen.",
          "Nie wolno jej przyjmować poleceń od rządów.",
        ),
        T(
          "It may not lend coins to governments either.",
          "Sie darf Regierungen auch keine Münzen leihen.",
          "Nie wolno jej też pożyczać monet rządom.",
        ),
      ],
      RulesDiagram,
    ),
    animatedBeat(
      [
        T(
          "Pim hears a rumor: the bank has no coins left.",
          "Pim hört ein Gerücht: Die Bank hat keine Münzen mehr.",
          "Pim słyszy plotkę: bank nie ma już monet.",
        ),
        T(
          "Finn, Bea and many others rush to get their coins out.",
          "Finn, Bea und viele andere rennen los und holen ihre Münzen ab.",
          "Finn, Bea i wielu innych biegnie po swoje monety.",
        ),
        T(
          "But the bank lent most coins to others. It cannot pay everyone today.",
          "Aber die Bank hat die meisten Münzen verliehen. Heute kann sie nicht alle auszahlen.",
          "Ale bank pożyczył większość monet innym. Dziś nie zapłaci wszystkim.",
        ),
      ],
      PanicDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "The central bank can lend the bank coins for a short time.",
          "Die Zentralbank kann der Bank für kurze Zeit Münzen leihen.",
          "Bank centralny może pożyczyć bankowi monety na krótko.",
        ),
        T(
          "In return it keeps something valuable safe. That is called *collateral*.",
          "Dafür bewahrt sie etwas Wertvolles auf. Das heißt *Pfand*.",
          "W zamian trzyma coś cennego. To się nazywa *zastaw*.",
        ),
        T(
          "A house is good collateral. A drawing is not.",
          "Ein Haus ist ein gutes Pfand. Eine Zeichnung nicht.",
          "Dom to dobry zastaw. Rysunek nie.",
        ),
        T(
          "Helping in an emergency makes it the *lender of last resort*.",
          "Wer in der Not hilft, ist der *Kreditgeber der letzten Instanz*.",
          "Pomoc w nagłej potrzebie czyni go *pożyczkodawcą ostatniej instancji*.",
        ),
      ],
      WindowDiagram,
    ),
    animatedBeat(
      [
        T(
          "You know the rate dial. It steers prices, like a thermostat.",
          "Du kennst den Zinsregler. Er steuert Preise wie ein Thermostat.",
          "Znasz pokrętło stóp. Steruje cenami jak termostat.",
        ),
        T(
          "Independence stops printing coins just to win votes.",
          "Unabhängigkeit stoppt das Drucken von Münzen nur für Stimmen.",
          "Niezależność powstrzymuje druk monet tylko dla głosów.",
        ),
        T(
          "The emergency loan stops a rumor from closing a good bank.",
          "Der Notkredit verhindert, dass ein Gerücht eine gute Bank schließt.",
          "Pożyczka awaryjna sprawia, że plotka nie zamknie dobrego banku.",
        ),
      ],
      RecapDiagram,
    ),
  ],
  toyIntro: T(
    "Say no to Moss. Then decide which banks get emergency coins.",
    "Sag Moss nein. Entscheide dann, welche Banken Notmünzen bekommen.",
    "Powiedz Mossowi nie. Potem zdecyduj, które banki dostaną monety awaryjne.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Mayor Moss asks the central bank to print coins for gifts. What should it do?",
        "Bürgermeister Moss bittet die Zentralbank, Münzen für Geschenke zu drucken. Was sollte sie tun?",
        "Burmistrz Moss prosi bank centralny o druk monet na prezenty. Co powinien zrobić?",
      ),
      options: [
        {
          text: T(
            "Print them. Voters will be happy.",
            "Sie drucken. Die Wähler freuen sich.",
            "Wydrukować. Wyborcy będą zadowoleni.",
          ),
        },
        {
          text: T(
            "Say no. Too many coins make prices jump.",
            "Nein sagen. Zu viele Münzen lassen Preise springen.",
            "Odmówić. Za dużo monet sprawia, że ceny skaczą.",
          ),
          correct: true,
        },
        {
          text: T(
            "Print half of them, to be fair.",
            "Die Hälfte drucken, das ist fair.",
            "Wydrukować połowę, to uczciwe.",
          ),
        },
      ],
      hint: T(
        "Printing coins for votes makes prices jump. An independent central bank can say no.",
        "Gedruckte Münzen für Stimmen lassen die Preise springen. Eine unabhängige Zentralbank darf nein sagen.",
        "Druk monet dla głosów podnosi ceny. Niezależny bank centralny może odmówić.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "A bank in trouble asks for emergency coins. What does the central bank want in return?",
        "Eine Bank in Not bittet um Notmünzen. Was will die Zentralbank dafür haben?",
        "Bank w kłopocie prosi o monety awaryjne. Czego chce w zamian bank centralny?",
      ),
      options: [
        {
          text: T(
            "Something valuable to keep safe until it is repaid",
            "Etwas Wertvolles, das sie sicher aufbewahrt, bis zurückgezahlt ist",
            "Coś cennego do przechowania, aż pożyczka wróci",
          ),
          correct: true,
        },
        {
          text: T(
            "A nice drawing of the bank building",
            "Eine schöne Zeichnung vom Bankgebäude",
            "Ładny rysunek budynku banku",
          ),
        },
        {
          text: T(
            "A promise to say thank you",
            "Das Versprechen, danke zu sagen",
            "Obietnicę, że podziękuje",
          ),
        },
      ],
      hint: T(
        "That is collateral: something valuable. The central bank keeps it safe until the coins come back.",
        "Das ist das Pfand: etwas Wertvolles. Die Zentralbank bewahrt es auf, bis die Münzen zurück sind.",
        "To zastaw: coś cennego. Bank centralny trzyma go, aż monety wrócą.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Three banks need coins. Lend only where there is real collateral. Then press Check.",
        "Drei Banken brauchen Münzen. Leihe nur, wo es ein echtes Pfand gibt. Drücke dann Prüfen.",
        "Trzy banki potrzebują monet. Pożycz tylko tam, gdzie jest prawdziwy zastaw. Potem naciśnij Sprawdź.",
      ),
      Widget: LendWidget,
      hint: T(
        "Bea and Sam have real collateral, so lend to them. A drawing is worth nothing, so refuse it.",
        "Bea und Sam haben ein echtes Pfand, also leihe ihnen. Eine Zeichnung ist nichts wert, also lehne ab.",
        "Bea i Sam mają prawdziwy zastaw, więc pożycz im. Rysunek nic nie jest wart, więc odmów.",
      ),
    },
  ],
  askDad: T(
    "Papa, why may a central bank say no to the mayor?",
    "Papa, warum darf eine Zentralbank dem Bürgermeister nein sagen?",
    "Tato, dlaczego bank centralny może odmówić burmistrzowi?",
  ),
  realLife: {
    title: T("The central bank of the euro", "Die Zentralbank des Euro", "Bank centralny euro"),
    body: T(
      "The European Central Bank (ECB) looks after the euro. Its main goal is steady prices: about 2 percent inflation over the medium term. By the rules, neither the ECB nor the national central banks may take orders from governments. In 1979 Paul Volcker led the US central bank against high inflation. It peaked at about 11.6 percent in 1980 and then fell.",
      "Die Europäische Zentralbank (EZB) kümmert sich um den Euro. Ihr wichtigstes Ziel sind stabile Preise: etwa 2 Prozent Inflation auf mittlere Sicht. Nach den Regeln dürfen weder die EZB noch die nationalen Zentralbanken Befehle von Regierungen annehmen. 1979 führte Paul Volcker die US-Zentralbank im Kampf gegen hohe Inflation. Sie erreichte 1980 etwa 11,6 Prozent und sank dann.",
      "Europejski Bank Centralny (EBC) dba o euro. Jego główny cel to stabilne ceny: około 2 procent inflacji w średnim okresie. Według zasad ani EBC, ani krajowe banki centralne nie mogą przyjmować poleceń od rządów. W 1979 roku Paul Volcker kierował amerykańskim bankiem centralnym w walce z wysoką inflacją. W 1980 roku sięgnęła ona około 11,6 procent, a potem spadła.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The ECB's primary objective is to maintain price stability, that is, to preserve the purchasing power of the euro.",
          "Das vorrangige Ziel der EZB ist Preisstabilität, also die Kaufkraft des Euro zu erhalten.",
          "Głównym celem EBC jest utrzymanie stabilności cen, czyli zachowanie siły nabywczej euro.",
        ),
        source: "https://www.ecb.europa.eu/mopo/strategy/pricestab/html/index.en.html",
      },
      {
        text: T(
          "The ECB Governing Council considers that price stability is best maintained by aiming for 2% inflation over the medium term.",
          "Der EZB-Rat hält Preisstabilität am besten für gesichert, wenn mittelfristig 2 % Inflation angestrebt werden.",
          "Rada Prezesów EBC uważa, że stabilność cen najlepiej utrzymać, dążąc do 2% inflacji w średnim okresie.",
        ),
        source: "https://www.ecb.europa.eu/mopo/strategy/pricestab/html/index.en.html",
      },
      {
        text: T(
          "Neither the ECB nor the national central banks, nor their decision-making members, may seek or take instructions from EU bodies, governments or any other body.",
          "Weder die EZB noch die nationalen Zentralbanken noch ihre Entscheidungsträger dürfen Weisungen von EU-Organen, Regierungen oder anderen Stellen einholen oder annehmen.",
          "Ani EBC, ani krajowe banki centralne, ani ich członkowie organów decyzyjnych nie mogą zwracać się o instrukcje ani ich przyjmować od instytucji UE, rządów czy innych podmiotów.",
        ),
        source: "https://www.ecb.europa.eu/ecb/orga/independence/html/index.en.html",
      },
      {
        text: T(
          "The Eurosystem is prohibited from granting loans to EU bodies or national public sector entities.",
          "Dem Eurosystem ist es verboten, EU-Einrichtungen oder öffentlichen Stellen der Mitgliedstaaten Kredite zu gewähren.",
          "Eurosystemowi zabrania się udzielania pożyczek instytucjom UE i krajowym podmiotom sektora publicznego.",
        ),
        source: "https://www.ecb.europa.eu/ecb/orga/independence/html/index.en.html",
      },
      {
        text: T(
          "US inflation peaked at 11.6 percent in March 1980 after Paul Volcker's Fed tightened in October 1979. The federal funds rate reached a record 20 percent in late 1980, and inflation then declined.",
          "Die US-Inflation erreichte im März 1980 mit 11,6 Prozent ihren Höhepunkt, nachdem Paul Volckers Fed im Oktober 1979 die Zügel angezogen hatte. Der Leitzins stieg Ende 1980 auf einen Rekord von 20 Prozent, danach sank die Inflation.",
          "Inflacja w USA osiągnęła szczyt 11,6 procent w marcu 1980 roku, po zaostrzeniu polityki Fed pod kierownictwem Paula Volckera w październiku 1979. Stopa funduszy federalnych sięgnęła rekordowych 20 procent pod koniec 1980 roku, a potem inflacja spadała.",
        ),
        source: "https://www.federalreservehistory.org/essays/anti-inflation-measures",
      },
      {
        text: T(
          "The Fed's discount window lets depository institutions borrow from Federal Reserve Banks after executing legal agreements and pledging collateral.",
          "Über das Diskontfenster der Fed können Banken bei den Federal Reserve Banks Geld leihen, nachdem sie Verträge abgeschlossen und Sicherheiten hinterlegt haben.",
          "Okienko dyskontowe Fed pozwala bankom pożyczać od banków Rezerwy Federalnej po zawarciu umów i złożeniu zastawu.",
        ),
        source: "https://www.federalreserve.gov/monetarypolicy/discountrate.htm",
      },
    ],
    simplified: [
      T(
        "The goal is shown as 2 in 100 each year. The ECB aims for 2% over the medium term, not exactly every year.",
        "Das Ziel ist als 2 von 100 pro Jahr gezeigt. Die EZB strebt 2 % auf mittlere Sicht an, nicht genau jedes Jahr.",
        "Cel pokazano jako 2 na 100 rocznie. EBC dąży do 2% w średnim okresie, nie dokładnie co roku.",
      ),
      T(
        "The independence rules shown are the euro area rules. Other countries have different rules, and independent does not mean nobody can ask questions.",
        "Gezeigt werden die Regeln des Euroraums. Andere Länder haben andere Regeln, und unabhängig heißt nicht, dass niemand nachfragen darf.",
        "Pokazano zasady strefy euro. Inne kraje mają inne zasady, a niezależny nie znaczy, że nikt nie może zadawać pytań.",
      ),
      T(
        "The emergency loan is shown with simple collateral. In real life a central bank checks that the bank is sound, and the rules differ by country. Fair for age 8: the idea is a loan against something valuable.",
        "Der Notkredit ist mit einfachem Pfand gezeigt. In Wirklichkeit prüft die Zentralbank, ob die Bank gesund ist, und die Regeln unterscheiden sich je nach Land. Für 8 Jahre fair: die Idee ist ein Kredit gegen etwas Wertvolles.",
        "Pożyczka awaryjna jest pokazana z prostym zastawem. W rzeczywistości bank centralny sprawdza, czy bank jest zdrowy, a zasady różnią się między krajami. Uczciwe dla ośmiolatka: chodzi o pożyczkę pod coś cennego.",
      ),
      T(
        "Banks keep only part of the coins they hold for people and lend the rest. This is why a rush to withdraw can empty a bank.",
        "Banken behalten nur einen Teil der Münzen und verleihen den Rest. Darum kann ein Ansturm eine Bank leeren.",
        "Banki trzymają tylko część monet i resztę pożyczają. Dlatego rzucenie się po monety może opróżnić bank.",
      ),
      T(
        "The Volcker example is given as a short fact. The Fed first changed how it controlled money, and rates rose as a result; the lesson does not explain this.",
        "Das Volcker-Beispiel ist als kurze Tatsache genannt. Die Fed änderte zuerst, wie sie Geld steuerte, und die Zinsen stiegen dadurch; die Lektion erklärt das nicht.",
        "Przykład Volckera podano jako krótki fakt. Fed najpierw zmienił sposób kontroli pieniądza, a stopy wzrosły w efekcie; lekcja tego nie wyjaśnia.",
      ),
    ],
  },
};
