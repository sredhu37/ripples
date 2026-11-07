import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function TradeDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Trading and money diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      
      {/* Left: Aish */}
      <circle cx="90" cy="80" r="35" fill="#fef3d6" stroke="#d4920b" strokeWidth="2.5" />
      <text x="90" y="76" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#784e03">Aish</text>
      <text x="90" y="94" textAnchor="middle" fontSize="11" fill="#784e03">Custom Code</text>

      {/* Right: Music Teacher */}
      <circle cx="310" cy="80" r="35" fill="#e3f3ff" stroke="#1971c2" strokeWidth="2.5" />
      <text x="310" y="76" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a7e">Teacher</text>
      <text x="310" y="94" textAnchor="middle" fontSize="11" fill="#0c4a7e">Guitar Lessons</text>

      {/* Step 1: Direct Trade Fails */}
      {step >= 1 && (
        <g>
          <path d="M 130 80 L 270 80" stroke="#d4503f" strokeWidth="3" strokeDasharray="5,5" />
          <text x="200" y="65" textAnchor="middle" fontSize="11" fill="#d4503f" fontWeight="bold">Trade Fails: Needs Bike!</text>
        </g>
      )}

      {/* Step 2: Cash Solves It */}
      {step >= 2 && (
        <g>
          <circle cx="200" cy="170" r="38" fill="#d3f9d8" stroke="#2b8a3e" strokeWidth="3" />
          <text x="200" y="165" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2b8a3e">Cash ($)</text>
          <text x="200" y="182" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2b8a3e">Works Everywhere</text>
          <path d="M 115 105 L 175 145" stroke="#2b8a3e" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <path d="M 225 145 L 285 105" stroke="#2b8a3e" strokeWidth="2.5" markerEnd="url(#arrow)" />
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [hasCoin, setHasCoin] = useState(false);
  const [swaps, setSwaps] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        {hasCoin ? "Success: Everyone accepts cash happily!" : "Stuck: Direct trade only works if needs match."}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setHasCoin(true);
            setSwaps((s) => s + 1);
            if (swaps >= 1) onDone?.();
          }}
        >
          Pay with Cash ($)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setHasCoin(false);
            setSwaps((s) => s + 1);
          }}
        >
          Try Direct Trade
        </button>
      </div>
      <div style={{ padding: "12px", background: hasCoin ? "#eef8ef" : "#fdf2e9", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {hasCoin ? "Lesson booked: The teacher takes the cash to buy a bike." : "Trade declined: The guitar teacher doesn't need computer code!"}
      </div>
    </div>
  );
}

function MoneyWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Which item can you spend instantly at any store?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>A rare collectable trading card</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>An electric scooter</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Paper cash or bank card</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "money",
  story: [
    animatedBeat(
      [
        T("Let's meet Aish. Aish loves working with computers.", "Das ist Mia. Mia beschaeftigt sich leidenschaftlich gern mit Computern.", "Poznaj Zofię. Zofia uwielbia pracować przy komputerze."),
        T("Her hobby is writing custom website code and apps for local shops after school.", "Ihr Hobby ist es, nach der Schule Websites und kleine Apps fuer Geschaefte zu programmieren.", "Jej pasją jest tworzenie stron internetowych i aplikacji dla lokalnych sklepów po lekcjach."),
        T("She is really good at it, and shops love the tools she builds.", "Sie kann das richtig gut und die Geschaefte freuen sich ueber ihre Hilfe.", "Robi to świetnie, a właściciele sklepów bardzo cenią jej narzędzia."),
      ],
      TradeDiagram,
    ),
    animatedBeat(
      [
        T("Now Aish wants to learn how to play the electric guitar.", "Jetzt moechte Mia lernen, wie man E-Gitarre spielt.", "Teraz Zofia bardzo chce nauczyć się grać na gitarze elektrycznej."),
        T("She visits a local music teacher to ask for weekly guitar lessons.", "Sie fragt einen Musiklehrer im Viertel nach regelmaessigem Gitarrenunterricht.", "Idzie do lokalnego nauczyciela muzyki, by poprosić o cotygodniowe lekcje."),
        T("Aish offers to build a new website for him in exchange for guitar lessons.", "Mia bietet an, ihm eine moderne Website zu bauen, wenn er ihr dafuer Unterricht gibt.", "Zofia proponuje, że stworzy dla niego stronę internetową w zamian za lekcje muzyki."),
      ],
      TradeDiagram,
    ),
    animatedBeat(
      [
        T("Trading things directly without any money is called *barter*.", "Dinge direkt ohne Geld gegeneinander zu tauschen heisst *Tauschhandel*.", "Bezpośrednia wymiana rzeczy bez użycia pieniędzy to *handel wymienny*."),
        T("But the guitar teacher says: No thanks! I do not need a website. I need a new bicycle.", "Doch der Lehrer sagt: Nein danke! Ich brauche keine Website. Ich brauche ein Fahrrad.", "Lecz nauczyciel odpowiada: Dziękuję, ale nie potrzebuję strony. Potrzebuję nowego roweru."),
        T("Direct trade only works when both people happen to want what the other person has.", "Direkter Tausch klappt nur, wenn beide zufaellig genau das wollen, was der andere hat.", "Taka wymiana działa tylko wtedy, gdy obie osoby przypadkiem potrzebują dokładnie tego, co ma ta druga."),
      ],
      TradeDiagram,
      "think",
    ),
    animatedBeat(
      [
        T("Aish would have to hunt all week to find someone with a bicycle who also needs website code.", "Mia muesste ewig suchen, um jemanden mit Fahrrad zu finden, der auch Website-Code sucht.", "Zofia musiałaby szukać całymi dniami kogoś z rowerem, kto akurat potrzebuje strony w sieci."),
        T("Searching and asking person after person takes forever and gets frustrating.", "Jeden einzeln zu fragen kostet unendlich viel Zeit und nervt gewaltig.", "Pytanie każdego po kolei zajmuje mnóstwo czasu i bywa bardzo męczące."),
        T("That is why societies invented *money*. Money is something that *everyone* agrees to accept.", "Deshalb haben Menschen *Geld* erfunden. Geld ist etwas, das *alle* gerne annehmen.", "Dlatego ludzie wymyślili *pieniądze*. Pieniądz to coś, co *wszyscy* chętnie przyjmują."),
      ],
      TradeDiagram,
    ),
    animatedBeat(
      [
        T("Now Aish builds an appointment tool for a dentist who pays her fifty dollars in cash.", "Nun programmiert Mia ein Termintool fuer einen Zahnarzt, der sie bar mit 50 Euro bezahlt.", "Teraz Zofia tworzy system rezerwacji dla dentysty, który płaci jej dwieście złotych w gotówce."),
        T("Aish hands the cash to the guitar teacher for her lessons. The teacher uses that cash to buy his bicycle.", "Mia gibt das Geld dem Lehrer fuer den Unterricht. Der Lehrer kauft sich davon sein Fahrrad.", "Zofia przekazuje gotówkę nauczycielowi za lekcje. Nauczyciel kupuje za te pieniądze swój rower."),
        T("Everyone gets exactly what they need, and nobody had to trade directly!", "Jeder bekommt genau das, was er braucht, ganz ohne muehsamen Tauschhandel!", "Każdy dostaje dokładnie to, czego potrzebował, bez żadnego uciążliwego handlu wymiennego!"),
      ],
      TradeDiagram,
    ),
  ],
  toyIntro: T(
    "See how money lets you trade with anyone, while direct swapping gets stuck.",
    "Sieh selbst, wie Geld das Handeln einfach macht, waehrend direkter Tausch oft scheitert.",
    "Zobacz, jak pieniądze ułatwiają wymianę, podczas gdy bezpośredni handel często staje w miejscu.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did trading code for guitar lessons fail between Aish and the teacher?",
        "Warum scheiterte der direkte Tausch zwischen Mia und dem Musiklehrer?",
        "Dlaczego bezpośrednia wymiana nie udała się między Zofią a nauczycielem?",
      ),
      options: [
        { text: T("The music teacher did not need a website, he needed a bicycle", "Der Musiklehrer brauchte keine Website, sondern ein Fahrrad", "Nauczyciel muzyki nie potrzebował strony internetowej, lecz roweru"), correct: true },
        { text: T("Guitar lessons can only be taught on weekends", "Gitarrenunterricht darf nur am Wochenende stattfinden", "Lekcje gry na gitarze mogą odbywać się wyłącznie w weekendy") },
        { text: T("The computer broke down before the trade", "Der Computer ging vor dem Tausch kaputt", "Komputer popsuł się przed dokonaniem wymiany") },
      ],
      hint: T(
        "Remember what the guitar teacher said when Aish offered her code.",
        "Erinnere dich daran, was der Lehrer zu Mias Angebot gesagt hat.",
        "Przypomnij sobie, co nauczyciel odpowiedział na propozycję Zofii.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What makes money so useful compared to trading items directly?",
        "Was macht Geld so viel praktischer als das direkte Tauschen von Gegenstaenden?",
        "Co sprawia, że pieniądze są o wiele wygodniejsze niż bezpośrednia wymiana przedmiotów?",
      ),
      options: [
        { text: T("Everyone agrees to accept it, so you can buy whatever you need", "Alle nehmen es an, sodass man jederzeit kaufen kann, was man braucht", "Wszyscy chętnie je przyjmują, więc możesz kupić to, czego akurat potrzebujesz"), correct: true },
        { text: T("It is heavier to carry around in your backpack", "Es ist schwerer im Rucksack zu tragen", "Są cięższe do noszenia w plecaku") },
        { text: T("It only works inside a single classroom", "Es funktioniert nur in einem einzigen Klassenzimmer", "Działają tylko w jednej sali lekcyjnej") },
      ],
      hint: T(
        "Think about why stores and teachers are happy to take cash from anyone.",
        "Denke darueber nach, warum Geschaefte und Lehrer gerne Geld annehmen.",
        "Pomyśl o tym, dlaczego sklepy i nauczyciele chętnie przyjmują gotówkę od każdego.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Choose the item that can be spent instantly anywhere.",
        "Waehle den Gegenstand, den du ueberall sofort ausgeben kannst.",
        "Wybierz rzecz, którą możesz od razu zapłacić w dowolnym sklepie.",
      ),
      Widget: MoneyWidget,
      hint: T(
        "Stores do not take trading cards at the checkout, but they always take cash.",
        "Supermaerkte nehmen an der Kasse keine Sammelkarten, aber immer Geld.",
        "Sklepy nie przyjmują kart kolekcjonerskich przy kasie, ale zawsze przyjmują gotówkę.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Have you ever tried to trade something directly with a friend, and did it work?",
    "Frage deine Eltern: Habt ihr schon mal etwas direkt mit Freunden getauscht und hat das geklappt?",
    "Zapytaj rodziców: Czy próbowaliście kiedyś wymienić się czymś ze znajomym i czy to się udało?",
  ),
  realLife: {
    title: T(
      "Real world: Why cash beats trading stuff",
      "Echte Welt: Warum Geld praktischer ist als Tauschen",
      "Prawdziwy świat: Dlaczego pieniądze wygrywają z wymianą rzeczy",
    ),
    body: T(
      "Imagine if you had to pay for your school lunch with a skateboard or a video game. The cafeteria might not want what you have! With money, everybody agrees on the same helper. You can buy lunch, and the cafeteria can use that money to buy fresh vegetables.",
      "Stell dir vor, du muesstest dein Schulessen mit einem Skateboard oder Computerspiel bezahlen. Die Kantine will das vielleicht gar nicht haben! Mit Geld haben alle denselben Helfer. Du kaufst dein Essen und die Kueche kauft davon frisches Gemuese.",
      "Wyobraź sobie, że musisz zapłacić za obiad w szkole deskorolką lub grą wideo. Stołówka może wcale tego nie chcieć! Dzięki pieniądzom wszyscy korzystają z tego samego ułatwienia. Ty kupujesz obiad, a stołówka kupuje za te pieniądze świeże warzywa.",
    ),
  },
  factCard: {
    claims: [
      { text: T("William Stanley Jevons formulated the concept of the double coincidence of wants in 1875.", "William Stanley Jevons formulierte 1875 das Konzept der doppelten Beduerfnisuebereinstimmung.", "William Stanley Jevons sformułował koncepcję podwójnej zbieżności potrzeb w 1875 roku."), source: "https://www.econlib.org/library/YPDBooks/Jevons/jvnMM.html" },
      { text: T("The Bank of England defines money by its three roles: medium of exchange, store of value, and unit of account.", "Die Bank of England definiert Geld ueber seine drei Rollen: Tauschmittel, Wertspeicher und Recheneinheit.", "Bank Anglii definiuje pieniądz przez jego trzy role: środek wymiany, miernik wartości i jednostkę rozliczeniową."), source: "https://www.bankofengland.co.uk/explainers/what-is-money" },
      { text: T("Liquidity describes how easily an asset converts into the standard medium of exchange without loss.", "Liquiditaet beschreibt, wie leicht ein Gut ohne Wertverlust in das Standardtauschmittel umgewandelt wird.", "Płynność opisuje, jak łatwo aktywo zamienia się na standardowy środek wymiany bez straty."), source: "https://www.imf.org/en/Publications/fandd/issues/Series/Back-to-Basics/Liquidity" },
      { text: T("Federal Reserve data categorizes money supply into M1 and M2 based on asset liquidity degrees.", "Daten der Federal Reserve teilen die Geldmenge nach Liquiditaetsgraden in M1 und M2 ein.", "Dane Rezerwy Federalnej dzielą podaż pieniądza na agregaty M1 i M2 według stopnia płynności aktywów."), source: "https://www.federalreserve.gov/releases/h6/current/default.htm" },
      { text: T("Transaction costs and search friction in barter economies reduce aggregate economic output.", "Transaktionskosten und Suchhindernisse in Tauschwirtschaften senken die wirtschaftliche Gesamtleistung.", "Koszty transakcyjne i bariery poszukiwań w gospodarce towarowej obniżają całkowitą produkcję gospodarczą."), source: "https://www.ecb.europa.eu/explainers/tell-me/html/what-is-money.en.html" },
    ],
    simplified: [
      T(
        "Complex economic terms like double coincidence of wants and liquidity are explained through trading computer code and guitar lessons.",
        "Komplexe Fachbegriffe wie doppelte Beduerfnisuebereinstimmung werden am Beispiel von Programmieren und Gitarrenunterricht erklaert.",
        "Złożone pojęcia ekonomiczne, takie jak podwójna zbieżność potrzeb, wyjaśniono na przykładzie programowania i lekcji gitary.",
      ),
    ],
  },
};
