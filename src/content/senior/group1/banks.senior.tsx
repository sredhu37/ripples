import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function FractionalBankingDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Fractional reserve banking diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      <rect x="30" y="50" width="100" height="130" rx="8" fill="#e3f2fd" stroke="#1971c2" strokeWidth="2" />
      <text x="80" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0c4a7e">Deposits</text>
      <text x="80" y="115" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1971c2">$100,000</text>

      {step >= 1 && (
        <g>
          <rect x="160" y="50" width="90" height="60" rx="6" fill="#d3f9d8" stroke="#2b8a3e" strokeWidth="2" />
          <text x="205" y="75" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2b8a3e">10% Reserve</text>
          <text x="205" y="95" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2b8a3e">$10,000</text>

          <rect x="160" y="120" width="90" height="60" rx="6" fill="#fff3bf" stroke="#f59f00" strokeWidth="2" />
          <text x="205" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#784e03">90% Loans</text>
          <text x="205" y="165" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#d9480f">$90,000</text>
        </g>
      )}

      {step >= 2 && (
        <g>
          <rect x="280" y="70" width="95" height="90" rx="8" fill="#fff" stroke="#107569" strokeWidth="2" />
          <text x="327" y="100" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#107569">Borrowers</text>
          <text x="327" y="125" textAnchor="middle" fontSize="11" fill="#495057">Homes &</text>
          <text x="327" y="145" textAnchor="middle" fontSize="11" fill="#495057">Businesses</text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [reserveRatio, setReserveRatio] = useState(10);
  const deposits = 100000;
  const reserves = deposits * (reserveRatio / 100);
  const loansIssued = deposits - reserves;
  const moneyMultiplier = Math.round(100 / reserveRatio);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Reserve Ratio: {reserveRatio}% | Vault Cash: ${reserves.toLocaleString()} | Loans: ${loansIssued.toLocaleString()}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setReserveRatio((r) => {
              const next = r === 10 ? 20 : r === 20 ? 5 : 10;
              if (next === 20) onDone?.();
              return next;
            });
          }}
        >
          Change Reserve Ratio ({reserveRatio === 10 ? "20%" : reserveRatio === 20 ? "5%" : "10%"})
        </button>
      </div>
      <div style={{ padding: "12px", background: "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        Theoretical Money Multiplier: {moneyMultiplier}x. Lower reserves expand credit creation across the economy.
      </div>
    </div>
  );
}

function BankWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Under fractional reserve banking, what happens to customer deposits?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>They are locked permanently in an underground titanium safe</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>A fraction is held in reserve, and the majority is lent out into the economy</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>They are burned and replaced with wooden tokens</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "banks",
  story: [
    animatedBeat(
      [
        T("Most people assume commercial banks simply store paper currency in a secure underground vault.", "Die meisten Menschen glauben, Geschaeftsbanken lagern Bargeld einfach in einem Tresor.", "Większość ludzi zakłada, że banki po prostu przechowują całą gotówkę w bezpiecznym skarbcu."),
        T("In reality, banks operate under a system called *fractional reserve banking*.", "Tatsaechlich arbeiten Banken nach dem System des *Mindestreservesystems*.", "W rzeczywistości banki działają w systemie *rezerwy cząstkowej*."),
        T("When you deposit money into a checking account, you are legally lending that money to the bank.", "Zahlst du Geld auf dein Konto ein, leihst du dieses Geld rein rechtlich der Bank.", "Wpłacając pieniądze na konto, z prawnego punktu widzenia pożyczasz te środki bankowi."),
      ],
      FractionalBankingDiagram,
    ),
    animatedBeat(
      [
        T("The bank keeps only a small percentage (such as ten percent) in liquid reserves.", "Die Bank behaelt nur einen kleinen Bruchteil (etwa zehn Prozent) als Barreserve.", "Bank zatrzymuje w płynnych rezerwach zaledwie niewielki ułamek (np. dziesięć procent)."),
        T("The remaining ninety percent is lent to families buying homes and entrepreneurs expanding businesses.", "Die restlichen neunzig Prozent werden an Haeuslebauer und Unternehmen verliehen.", "Pozostałe dziewięćdziesiąt procent pożycza rodzinom na domy i przedsiębiorcom na rozwój firm."),
        T("This lending process acts as financial intermediation, creating credit that powers economic activity.", "Diese Kreditvergabe wirkt als Finanzvermittlung und kurbelt die gesamte Wirtschaft an.", "Ten proces pośrednictwa finansowego tworzy kredyt, który napędza całą gospodarkę."),
      ],
      FractionalBankingDiagram,
    ),
    animatedBeat(
      [
        T("Because only a fraction is in cash, what happens if every depositor panics and demands cash at once?", "Da nur ein Teil bar vorliegt: Was passiert, wenn alle Sparer gleichzeitig Panik bekommen?", "Skoro w kasie jest tylko ułamek: co się stanie, gdy wszyscy klienci w panice zażądają wypłat naraz?"),
        T("This event is called a *bank run*.", "Dieses Ereignis nennt man einen *Bankansturm* (Bank Run).", "Takie zjawisko nazywa się *paniką bankową* (bank run)."),
        T("Even a solvent bank can become illiquid within hours if depositors rush to withdraw simultaneously.", "Selbst eine solide Bank kann in Stunden zahlungsunfaehig werden, wenn alle ihr Geld wollen.", "Nawet wypłacalny bank może utracić płynność w kilka godzin, jeśli wszyscy zażądają gotówki."),
      ],
      FractionalBankingDiagram,
    ),
    animatedBeat(
      [
        T("To safeguard against bank runs, modern financial systems created two major shields.", "Um Bankenlaeufe zu verhindern, schufen moderne Staaten zwei Schutzschilde.", "Aby zapobiec panice bankowej, nowoczesne systemy stworzyły dwie kluczowe tarcze."),
        T("First is government *deposit insurance*, protecting individual balances up to set limits (like 100,000 euros).", "Erstens die staatliche *Einlagensicherung*, die Sparguthaben bis zu Grenzbetraegen schuetzt.", "Po pierwsze państwowe *ubezpieczenie depozytów*, chroniące oszczędności do określonych limitów."),
        T("Second is the central bank serving as the *lender of last resort*, providing emergency liquidity against sound collateral.", "Zweitens die Zentralbank als *Kreditgeber der letzten Instanz* bei akuter Liquiditaetsnot.", "Po drugie bank centralny jako *pożyczkodawca ostatniej instancji*, zapewniający awaryjną płynność."),
      ],
      FractionalBankingDiagram,
    ),
    animatedBeat(
      [
        T("Banks are the nervous system of modern commerce, allocating capital where it is most productive.", "Banken sind das Nervensystem des Handels und lenken Kapital in produktive Bahnen.", "Banki stanowią krwioobieg handlu, kierując kapitał tam, gdzie przynosi największą korzyść."),
        T("Understanding how fractional banking functions helps you appreciate systemic risk and financial stability.", "Das Reservesystem zu verstehen hilft dir, Systemrisiken und Stabilitaet zu begreifen.", "Zrozumienie rezerwy cząstkowej pomaga ocenić ryzyko systemowe i stabilność finansową."),
        T("Always check that your savings institution is covered by official deposit guarantee schemes.", "Achte stets darauf, dass deine Bank einer offiziellen Einlagensicherung angehoert.", "Zawsze sprawdzaj, czy Twoja instytucja finansowa podlega urzędowym gwarancjom depozytów."),
      ],
      FractionalBankingDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how reserve requirements dictate how much credit a banking system can create.",
    "Untersuche, wie Mindestreservesatze die Kreditschoepfung im Bankensystem bestimmen.",
    "Zobacz, jak wymogi rezerwowe decydują o skali kreacji kredytu w systemie bankowym.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is fractional reserve banking?",
        "Was ist das Mindestreservesystem?",
        "Czym jest system rezerwy cząstkowej w bankowości?",
      ),
      options: [
        { text: T("A banking system where banks hold only a fraction of deposits as reserves and lend out the rest", "Ein System, bei dem Banken nur einen Teil der Einlagen als Reserve halten und den Rest verleihen", "System, w którym banki trzymają w rezerwie tylko część depozytów, a resztę pożyczają"), correct: true },
        { text: T("A system where every banknote is physically sliced into four equal fractions", "Ein System, bei dem jede Banknote physisch in vier gleiche Teile zerschnitten wird", "System, w którym każdy banknot jest fizycznie cięty na cztery równe części") },
        { text: T("A rule requiring banks to operate solely with gold bars without digital systems", "Eine Regel, die Banken zwingt, nur mit Goldbarren ohne digitale Systeme zu arbeiten", "Zasada nakazująca bankom działanie wyłącznie w oparciu o sztabki złota"), },
      ],
      hint: T(
        "Banks maintain a reserve cushion while putting deposits to work.",
        "Banken halten ein Reservepolster und lassen das restliche Geld arbeiten.",
        "Banki utrzymują poduszkę rezerw, a resztę pieniędzy wprowadzają w obieg.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What causes a classic bank run?",
        "Was loest einen klassischen Bankansturm aus?",
        "Co wywołuje klasyczną panikę bankową (bank run)?",
      ),
      options: [
        { text: T("Widespread panic causing large numbers of depositors to withdraw cash simultaneously", "Panik, die viele Sparer dazu bringt, ihr Geld gleichzeitig in bar abzuheben", "Powszechna panika sprawiająca, że wielu klientów wypłaca gotówkę w tym samym czasie"), correct: true },
        { text: T("The bank doors being repainted in bright green paint", "Das Streichen der Bankeingangstuer in leuchtendem Gruen", "Pomalowanie drzwi wejściowych banku na jaskrawy zielony kolor") },
        { text: T("Bank tellers competing in an annual athletic sprint marathon", "Ein jaehrlicher Marathonlauf der Bankangestellten um die Wette", "Coroczny maraton biegowy organizowany dla kasjerów bankowych") },
      ],
      hint: T(
        "It happens when fear leads everyone to demand liquid cash immediately.",
        "Es passiert, wenn Angst alle dazu bringt, sofort Bargeld zu verlangen.",
        "Pojawia się, gdy strach skłania wszystkich do żądania gotówki od ręki.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select the true statement regarding customer deposits under fractional banking.",
        "Waehle die zutreffende Aussage ueber Kundeneinlagen im Mindestreservesystem.",
        "Wskaż prawdziwe stwierdzenie dotyczące depozytów w rezerwie cząstkowej.",
      ),
      Widget: BankWidget,
      hint: T(
        "Most of the deposited money is lent out into the economy.",
        "Der Grossteil des Geldes wird als Kredite an die Wirtschaft vergeben.",
        "Większość zdeponowanych środków trafia do gospodarki w formie pożyczek.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Which deposit insurance guarantee covers your family savings accounts?",
    "Frage deine Eltern: Welche gesetzliche Einlagensicherung schuetzt die Sparkonten deiner Familie?",
    "Zapytaj rodziców: Jaki fundusz gwarancyjny chroni konta oszczędnościowe Waszej rodziny?",
  ),
  realLife: {
    title: T(
      "Real world: The Basel III banking regulatory accords",
      "Echte Welt: Die Basel-III-Regeln fuer Bankenstabilitaet",
      "Prawdziwy świat: Regulacje bankowe Bazylea III i stabilność finansowa",
    ),
    body: T(
      "Following the 2008 global financial crisis, the Basel Committee on Banking Supervision introduced Basel III. These international regulations mandate that commercial banks maintain strict Liquidity Coverage Ratios (LCR) and capital buffers to withstand prolonged liquidity stress without requiring public bailouts.",
      "Nach der Finanzkrise 2008 schuf der Basler Ausschuss das Regelwerk Basel III. Diese Regeln verpflichten Geschaeftsbanken zu strengen Liquiditaets- und Eigenkapitalpuffern, um Krisen ohne staatliche Rettungsgelder zu ueberstehen.",
      "Po kryzysie finansowym z 2008 roku Bazylejski Komitet ds. Nadzoru Bankowego wprowadził regulacje Bazylea III. Nakładają one na banki obowiązek utrzymywania buforów płynności i kapitału, by przetrwać kryzys bez pomocy państwa.",
    ),
  },
  factCard: {
    claims: [
      { text: T("The Basel Committee on Banking Supervision establishes global standards for bank capital adequacy and liquidity buffers.", "Der Basler Ausschuss fuer Bankenaufsicht setzt weltweite Standards fuer Eigenkapital und Liquiditaet.", "Bazylejski Komitet ds. Nadzoru Bankowego ustala globalne standardy adekwatności kapitałowej i buforów płynności banków."), source: "https://www.bis.org/bcbs/basel3.htm" },
      { text: T("The US Federal Deposit Insurance Corporation (FDIC) protects deposit balances up to 250,000 dollars per insured bank.", "Die US-Einlagensicherung FDIC schuetzt Einlagen bis zu 250.000 Dollar je Bank und Kontoinhaber.", "Amerykańska agencja FDIC ubezpiecza depozyty bankowe do kwoty 250 000 dolarów na klienta w ubezpieczonym banku."), source: "https://www.fdic.gov/resources/deposit-insurance/" },
      { text: T("European Union Directive 2014/49/EU mandates statutory deposit guarantee schemes of 100,000 euros across all member states.", "Die EU-Richtlinie 2014/49/EU schreibt eine gesetzliche Einlagensicherung von 100.000 Euro in allen Mitgliedstaaten vor.", "Dyrektywa UE 2014/49/UE gwarantuje ustawową ochronę depozytów do wysokości 100 000 euro we wszystkich krajach członkowskich."), source: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0049" },
      { text: T("The Deutsche Bundesbank and ECB require credit institutions in the Eurosystem to hold minimum statutory reserves.", "Bundesbank und EZB verpflichten Euro-Kreditinstitute zum Halten gesetzlicher Mindestreserven.", "Deutsche Bundesbank i EBC zobowiązują instytucje kredytowe w strefie euro do utrzymywania rezerw obowiązkowych."), source: "https://www.ecb.europa.eu/mopo/implement/mr/html/index.en.html" },
      { text: T("Walter Bagehot articulated the classical lender of last resort doctrine in his 1873 treatise Lombard Street.", "Walter Bagehot formulierte 1873 in Lombard Street die klassische Doktrin des Kreditgebers letzter Instanz.", "Walter Bagehot sformułował klasyczną doktrynę pożyczkodawcy ostatniej instancji w swoim dziele Lombard Street z 1873 roku."), source: "https://www.econlib.org/library/Bagehot/bagLomb.html" },
    ],
    simplified: [
      T(
        "Complex interbank overnight repo markets and net stable funding ratios are represented through the core reserve-to-loan multiplier mechanism.",
        "Komplexe Interbanken-Repomaerkte werden auf den grundlegenden Mechanismus aus Reserve und Kreditschoepfung vereinfacht.",
        "Złożony rynek pożyczek międzybankowych repo i wskaźniki stabilnego finansowania uproszczono do mechanizmu rezerw i mnożnika kreacji kredytu.",
      ),
    ],
  },
};
