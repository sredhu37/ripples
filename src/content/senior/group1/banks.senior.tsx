import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function FractionalBankingDiagram({ step }: { step: number }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      role="img"
      aria-label="Fractional reserve banking diagram"
    >
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f8fbfc"
        stroke="#1d3f47"
        strokeWidth="2"
      />
      <rect
        x="30"
        y="50"
        width="100"
        height="130"
        rx="8"
        fill="#e3f2fd"
        stroke="#1971c2"
        strokeWidth="2"
      />
      <text x="80" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0c4a7e">
        Deposits
      </text>
      <text x="80" y="115" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1971c2">
        $100,000
      </text>

      {step >= 1 && (
        <g>
          <rect
            x="160"
            y="50"
            width="90"
            height="60"
            rx="6"
            fill="#d3f9d8"
            stroke="#2b8a3e"
            strokeWidth="2"
          />
          <text x="205" y="75" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2b8a3e">
            10% Reserve
          </text>
          <text x="205" y="95" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2b8a3e">
            $10,000
          </text>

          <rect
            x="160"
            y="120"
            width="90"
            height="60"
            rx="6"
            fill="#fff3bf"
            stroke="#f59f00"
            strokeWidth="2"
          />
          <text x="205" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#784e03">
            90% Loans
          </text>
          <text x="205" y="165" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#d9480f">
            $90,000
          </text>
        </g>
      )}

      {step >= 2 && (
        <g>
          <rect
            x="280"
            y="70"
            width="95"
            height="90"
            rx="8"
            fill="#fff"
            stroke="#107569"
            strokeWidth="2"
          />
          <text x="327" y="100" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#107569">
            Borrowers
          </text>
          <text x="327" y="125" textAnchor="middle" fontSize="11" fill="#495057">
            Homes &
          </text>
          <text x="327" y="145" textAnchor="middle" fontSize="11" fill="#495057">
            Businesses
          </text>
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
        Reserve Ratio: {reserveRatio}% | Vault Cash: ${reserves.toLocaleString()} | Loans: $
        {loansIssued.toLocaleString()}
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
      <div
        style={{
          padding: "12px",
          background: "#eef8ef",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        Theoretical Money Multiplier: {moneyMultiplier}x. Lower reserves expand credit creation
        across the economy.
      </div>
    </div>
  );
}

function BankWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        Under fractional reserve banking, what happens to customer deposits?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        They are locked permanently in an underground titanium safe
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        A fraction is held in reserve, and the majority is lent out into the economy
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        They are burned and replaced with wooden tokens
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "banks",
  story: [
    animatedBeat(
      [
        T(
          "Meet Abhi. In his favorite online multiplayer game, players mine rare ore and deposit gold coins into the guild vault.",
          "Das ist Felix. In seinem Lieblings-Onlinespiel lagern Spieler ihr geschuerftes Gold in der Gildenkasse.",
          "Poznaj Jana. W swojej ulubionej grze sieciowej gracze zbierają cenną rudę i wpłacają złote monety do gildyjnego skarbca.",
        ),
        T(
          "When one hundred players deposit ten coins each, the guild vault holds one thousand gold coins.",
          "Wenn hundert Spieler je zehn Muenzen einzahlen, liegen tausend Goldmuenzen im Gildentresor.",
          "Gdy stu graczy wpłaca po dziesięć monet, w skarbcu gildii leży okrągły tysiąc złotych monet.",
        ),
        T(
          "Abhi notices that players almost never withdraw all their gold on the exact same afternoon.",
          "Felix bemerkt, dass die Spieler ihr Gold fast nie am selben Tag komplett abholen wollen.",
          "Jan zauważa, że gracze niemal nigdy nie przychodzą wypłacić całego swojego złota tego samego dnia.",
        ),
      ],
      FractionalBankingDiagram,
    ),
    animatedBeat(
      [
        T(
          "This is how real banks work: keeping part of the cash in the vault and lending out the rest.",
          "Genau so funktionieren echte Banken: Ein Teil bleibt im Tresor, der Rest wird verliehen.",
          "Dokładnie tak działają prawdziwe banki: część zostaje w skarbcu, a reszta jest pożyczana.",
        ),
        T(
          "The bank only keeps ten percent of total deposits locked in the safe as a cash cushion for daily withdrawals.",
          "Die Bank behaelt nur zehn Prozent des Geldes im Tresor fuer taegliche Auszahlungen der Kunden.",
          "Bank zatrzymuje w bezpiecznym sejfie tylko dziesięć procent depozytów na bieżące wypłaty.",
        ),
        T(
          "The remaining ninety percent is lent out to creators, builders, and entrepreneurs to finance new ventures.",
          "Die restlichen neunzig Prozent leiht sie an Macher und Unternehmer fuer neue Projekte aus.",
          "Pozostałe dziewięćdziesiąt procent pożycza twórcom, budowniczym i firmom na rozwój nowych projektów.",
        ),
      ],
      FractionalBankingDiagram,
    ),
    animatedBeat(
      [
        T(
          "Now imagine a rumor spreads through the game server that the guild treasurer lost the vault keys.",
          "Stell dir vor, ein Geruecht macht die Runde, der Gildenschatzmeister haette Gold verloren.",
          "Wyobraź sobie, że po serwerze rozchodzi się plotka, jakoby skarbnik zgubił klucze do skarbca.",
        ),
        T(
          "Every single player runs to the vault at the exact same moment demanding all their coins back.",
          "Ploetzlich rennen alle Spieler gleichzeitig zur Kasse und wollen ihr ganzes Gold sofort bar.",
          "Wszyscy gracze jednocześnie rzucają się do kasy, żądając natychmiastowego zwrotu każdego grosza.",
        ),
        T(
          "Because ninety percent is lent out to builders, the vault runs out of coins. This is a *bank run*.",
          "Weil das meiste verliehen ist, geht der Tresor leer aus. Das nennt man einen *Bank Run*.",
          "Ponieważ większość monet została pożyczona budowniczym, skarbiec pustoszeje. To jest właśnie *run na bank*.",
        ),
      ],
      FractionalBankingDiagram,
    ),
    animatedBeat(
      [
        T(
          "To stop bank runs in real life, central banks guarantee deposits so families know their money is always safe.",
          "In der realen Welt sichern Zentralbanken Spareinlagen ab, damit Sparer ruhig schlafen koennen.",
          "W świecie rzeczywistym państwowe fundusze gwarantują depozyty, aby rodziny miały pewność, że ich oszczędności są bezpieczne.",
        ),
        T(
          "Banks also earn a living through the *interest spread*: paying two percent to savers and charging six percent to builders.",
          "Banken leben von der *Zinsmarge*: 2% fuer Sparer zahlen und 6% von Bauherren verlangen.",
          "Banki utrzymują się z *marży odsetkowej*: dają dwa procent oszczędzającym, a biorą sześć procent od pożyczkobiorców.",
        ),
        T(
          "That spread covers office computers, cybersecurity engineers, mobile apps, and fraud protection.",
          "Diese Differenz bezahlt Programmierer, Sicherheitssoftware, Server und den Betrieb.",
          "Ta różnica opłaca programistów, zaawansowane zabezpieczenia, aplikacje w telefonie i ochronę przed oszustami.",
        ),
      ],
      FractionalBankingDiagram,
    ),
    animatedBeat(
      [
        T(
          "Without banks, millions of small personal savings would just sit asleep inside piggy banks and desk drawers.",
          "Ohne Banken wuerde Erspartes ungenutzt in Spardosen und Schubladen verstauben.",
          "Gdyby nie banki, miliony drobnych oszczędności leżałyby bezczynnie w szufladach i skarbonkach.",
        ),
        T(
          "Banks channel that dormant money into fast fiber optic internet, game studios, and solar power plants.",
          "Banken lenken dieses Geld in Glasfasernetze, Entwicklerstudios und Solaranlagen.",
          "Banki kierują te uśpione środki na budowę szybkiego internetu, studia gier i farmy słoneczne.",
        ),
        T(
          "They are the coordination engine that powers the modern economy, built entirely on mathematical trust.",
          "Sie sind der Koordinationsmotor der Wirtschaft, angetrieben von Vertrauen und sauberer Mathematik.",
          "Są wielkim silnikiem koordynacji nowoczesnej gospodarki, opartym całkowicie na matematycznym zaufaniu.",
        ),
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
        {
          text: T(
            "A banking system where banks hold only a fraction of deposits as reserves and lend out the rest",
            "Ein System, bei dem Banken nur einen Teil der Einlagen als Reserve halten und den Rest verleihen",
            "System, w którym banki trzymają w rezerwie tylko część depozytów, a resztę pożyczają",
          ),
          correct: true,
        },
        {
          text: T(
            "A system where every banknote is physically sliced into four equal fractions",
            "Ein System, bei dem jede Banknote physisch in vier gleiche Teile zerschnitten wird",
            "System, w którym każdy banknot jest fizycznie cięty na cztery równe części",
          ),
        },
        {
          text: T(
            "A rule requiring banks to operate solely with gold bars without digital systems",
            "Eine Regel, die Banken zwingt, nur mit Goldbarren ohne digitale Systeme zu arbeiten",
            "Zasada nakazująca bankom działanie wyłącznie w oparciu o sztabki złota",
          ),
        },
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
        {
          text: T(
            "Widespread panic causing large numbers of depositors to withdraw cash simultaneously",
            "Panik, die viele Sparer dazu bringt, ihr Geld gleichzeitig in bar abzuheben",
            "Powszechna panika sprawiająca, że wielu klientów wypłaca gotówkę w tym samym czasie",
          ),
          correct: true,
        },
        {
          text: T(
            "The bank doors being repainted in bright green paint",
            "Das Streichen der Bankeingangstuer in leuchtendem Gruen",
            "Pomalowanie drzwi wejściowych banku na jaskrawy zielony kolor",
          ),
        },
        {
          text: T(
            "Bank tellers competing in an annual athletic sprint marathon",
            "Ein jaehrlicher Marathonlauf der Bankangestellten um die Wette",
            "Coroczny maraton biegowy organizowany dla kasjerów bankowych",
          ),
        },
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
      {
        text: T(
          "The Basel Committee on Banking Supervision establishes global standards for bank capital adequacy and liquidity buffers.",
          "Der Basler Ausschuss fuer Bankenaufsicht setzt weltweite Standards fuer Eigenkapital und Liquiditaet.",
          "Bazylejski Komitet ds. Nadzoru Bankowego ustala globalne standardy adekwatności kapitałowej i buforów płynności banków.",
        ),
        source: "https://www.bis.org/bcbs/basel3.htm",
      },
      {
        text: T(
          "The US Federal Deposit Insurance Corporation (FDIC) protects deposit balances up to 250,000 dollars per insured bank.",
          "Die US-Einlagensicherung FDIC schuetzt Einlagen bis zu 250.000 Dollar je Bank und Kontoinhaber.",
          "Amerykańska agencja FDIC ubezpiecza depozyty bankowe do kwoty 250 000 dolarów na klienta w ubezpieczonym banku.",
        ),
        source: "https://www.fdic.gov/resources/deposit-insurance/",
      },
      {
        text: T(
          "European Union Directive 2014/49/EU mandates statutory deposit guarantee schemes of 100,000 euros across all member states.",
          "Die EU-Richtlinie 2014/49/EU schreibt eine gesetzliche Einlagensicherung von 100.000 Euro in allen Mitgliedstaaten vor.",
          "Dyrektywa UE 2014/49/UE gwarantuje ustawową ochronę depozytów do wysokości 100 000 euro we wszystkich krajach członkowskich.",
        ),
        source: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0049",
      },
      {
        text: T(
          "The Deutsche Bundesbank and ECB require credit institutions in the Eurosystem to hold minimum statutory reserves.",
          "Bundesbank und EZB verpflichten Euro-Kreditinstitute zum Halten gesetzlicher Mindestreserven.",
          "Deutsche Bundesbank i EBC zobowiązują instytucje kredytowe w strefie euro do utrzymywania rezerw obowiązkowych.",
        ),
        source: "https://www.ecb.europa.eu/mopo/implement/mr/html/index.en.html",
      },
      {
        text: T(
          "Walter Bagehot articulated the classical lender of last resort doctrine in his 1873 treatise Lombard Street.",
          "Walter Bagehot formulierte 1873 in Lombard Street die klassische Doktrin des Kreditgebers letzter Instanz.",
          "Walter Bagehot sformułował klasyczną doktrynę pożyczkodawcy ostatniej instancji w swoim dziele Lombard Street z 1873 roku.",
        ),
        source: "https://www.econlib.org/library/Bagehot/bagLomb.html",
      },
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
