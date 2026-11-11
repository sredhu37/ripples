import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BusinessSalesGoalDiagram,
  CatchFishDiagram,
  EmptyDocksDiagram,
  FerryArrivalDiagram,
  NoSalesDiagram,
  SalesExchangeDiagram,
} from "./sales.diagrams";
import { SalesHarbor } from "./sales.toy";
import "./sales.css";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <SalesHarbor lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <SalesHarbor lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "sales",
  story: [
    animatedBeat(
      [
        T(
          "At sunrise, Finn pulls his little fishing boat up to the dock.",
          "Bei Sonnenaufgang legt Finn mit seinem kleinen Fischerboot am Steg an.",
          "O wschodzie słońca Finn przybija swoją małą łodzią rybacką do pomostu.",
        ),
        T(
          "His fishing net is heavy with fresh, silvery trout.",
          "Sein Netz ist schwer von frischen, silbrigen Forellen.",
          "Jego sieć jest ciężka od świeżych, srebrzystych pstrągów.",
        ),
        T(
          "He packs them carefully into clean wooden crates.",
          "Er packt die Fische sorgfältig in saubere Holzkisten.",
          "Układa je ostrożnie w czystych, drewnianych skrzynkach.",
        ),
      ],
      CatchFishDiagram,
    ),
    animatedBeat(
      [
        T(
          "Finn sets up his table and waits at the harbor market.",
          "Finn baut seinen Tisch auf und wartet am Hafenmarkt.",
          "Finn rozstawia stół i czeka na targu portowym.",
        ),
        T(
          "The morning breeze is cool, but no one is walking by.",
          "Die Morgenbrise ist kühl, aber niemand kommt vorbei.",
          "Poranna bryza jest chłodna, ale nikt tędy nie przechodzi.",
        ),
      ],
      EmptyDocksDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Even with crates full of fish, Finn does not have a single coin.",
          "Obwohl die Kisten voll sind, hat Finn noch keine einzige Münze.",
          "Mimo skrzynek pełnych ryb, Finn nie ma ani jednej monety.",
        ),
        T(
          "Goods sitting in crates do not earn any income on their own.",
          "Waren in Kisten bringen von allein noch kein Einkommen.",
          "Towary leżące w skrzynkach same z siebie nie przynoszą żadnego dochodu.",
        ),
      ],
      NoSalesDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "At noon, the island ferry horn blows loud across the water.",
          "Mittags ertönt das laute Horn der Inselfähre über dem Wasser.",
          "W południe nad wodą rozlega się głośny dźwięk rogu promowego.",
        ),
        T(
          "Pip and Sam walk off the boat looking for lunch.",
          "Pip und Sam steigen vom Schiff und suchen nach Mittagessen.",
          "Pip i Sam schodzą ze statku w poszukiwaniu obiadu.",
        ),
        T(
          "A person who comes to buy goods is called a *customer*.",
          "Eine Person, die kommt um Waren zu kaufen, heißt *Kundschaft*.",
          "Osoba, która przychodzi kupić towary, to *klient*.",
        ),
      ],
      FerryArrivalDiagram,
    ),
    animatedBeat(
      [
        T(
          "Pip asks for a fresh trout and hands Finn 3 coins.",
          "Pip möchte eine frische Forelle und gibt Finn 3 Münzen.",
          "Pip prosi o świeżego pstrąga i wręcza Finnowi 3 monety.",
        ),
        T(
          "Finn hands over the fish and places the coins into his wooden box.",
          "Finn übergibt den Fisch und legt die Münzen in seine Holzschatulle.",
          "Finn przekazuje rybę i wkłada monety do drewnianej kasetki.",
        ),
        T(
          "The total coins brought in by selling goods are called *sales*.",
          "Alle Münzen, die durch das Verkaufen von Waren hereinkommen, heißen *Umsatz*.",
          "Wszystkie monety uzyskane ze sprzedaży towarów nazywają się *przychodem ze sprzedaży*.",
        ),
      ],
      SalesExchangeDiagram,
    ),
    animatedBeat(
      [
        T(
          "More customers arrive and buy fish before evening falls.",
          "Weitere Leute kommen vorbei und kaufen Fisch bis zum Abend.",
          "Kolejni klienci przybywają i kupują ryby przed zapadnięciem zmroku.",
        ),
        T(
          "Every sale adds more coins to Finn's box.",
          "Jeder Verkauf bringt weitere Münzen in Finns Kasse.",
          "Każda sprzedaż dokłada kolejne monety do kasetki Finna.",
        ),
        T(
          "Steady sales give Finn the money he needs to mend his nets and boat.",
          "Ein stetiger Umsatz sichert Finn das Geld für neue Netze und Reparaturen.",
          "Stała sprzedaż zapewnia Finnowi pieniądze potrzebne do naprawy sieci i łodzi.",
        ),
      ],
      BusinessSalesGoalDiagram,
    ),
  ],
  toyIntro: T(
    "Help Finn sell fresh fish to hungry customers at the harbor!",
    "Hilf Finn dabei, frischen Fisch an hungrige Kundschaft am Hafen zu verkaufen!",
    "Pomóż Finnowi sprzedawać świeże ryby głodnym klientom w porcie!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What must happen before goods sitting in crates bring money to a business?",
        "Was muss geschehen, damit Waren in Kisten einem Betrieb Geld bringen?",
        "Co musi się stać, aby towary leżące w skrzynkach przyniosły firmie pieniądze?",
      ),
      options: [
        {
          text: T(
            "They must be stored longer",
            "Sie müssen länger gelagert werden",
            "Muszą leżeć dłużej w magazynie",
          ),
        },
        {
          text: T(
            "They must be sold to a customer",
            "Sie müssen an die Kundschaft verkauft werden",
            "Muszą zostać sprzedane klientowi",
          ),
          correct: true,
        },
        {
          text: T("They must be painted", "Sie müssen bemalt werden", "Muszą zostać pomalowane"),
        },
      ],
      hint: T(
        "Products only generate income when sold to customers who pay for them.",
        "Waren bringen erst dann Geld ein, wenn zahlende Kundschaft sie kauft.",
        "Produkty przynoszą dochód dopiero wtedy, gdy kupią je płacący klienci.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "If Finn sells 5 fish for 3 coins each, what are his total sales?",
        "Wenn Finn 5 Fische für je 3 Münzen verkauft, wie hoch ist sein Umsatz?",
        "Jeśli Finn sprzeda 5 ryb po 3 monety każda, ile wyniesie jego przychód ze sprzedaży?",
      ),
      options: [
        { text: T("8 coins", "8 Münzen", "8 monet") },
        { text: T("15 coins", "15 Münzen", "15 monet"), correct: true },
        { text: T("2 coins", "2 Münzen", "2 monety") },
      ],
      hint: T(
        "Multiply the number of items by the price: 5 times 3 equals 15 coins in total sales.",
        "Rechne Menge mal Preis: 5 mal 3 ergibt 15 Münzen Gesamtumsatz.",
        "Pomnóż liczbę sztuk przez cenę: 5 razy 3 daje 15 monet łącznego przychodu.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Pip wants a fresh fish and offers 3 coins. Drag the fish to Pip's basket to make the sale.",
        "Pip will einen frischen Fisch und bietet 3 Münzen. Ziehe den Fisch in Pips Korb für den Verkauf.",
        "Pip chce świeżą rybę i oferuje 3 monety. Przeciągnij rybę do koszyka Pipa, aby sfinalizować sprzedaż.",
      ),
      Widget,
      hint: T(
        "Drag the fish from Finn's crate over to Pip's customer basket.",
        "Ziehe den Fisch aus Finns Kiste hinüber in Pips Einkaufskorb.",
        "Przeciągnij rybę ze skrzynki Finna do koszyka klienta Pipa.",
      ),
    },
  ],
  askDad: T(
    "Papa, what makes someone decide to buy from one shop instead of another?",
    "Papa, warum entscheidet sich jemand, in einem bestimmten Laden einzukaufen und nicht in einem anderen?",
    "Tato, dlaczego ktoś decyduje się na zakupy w jednym sklepie, a omija inny?",
  ),
  realLife: {
    title: {
      en: "Weekly markets and local sales in India",
      de: "Wochenmärkte und Verkauf in Deutschland",
      pl: "Targowiska miejskie i sprzedaż w Polsce",
    },
    body: {
      en: "Across Indian towns and cities, weekly bazaars and vegetable mandis set up early in the morning. Farmers and vendors display fresh produce, spices, and snacks. Their daily sales depend on welcoming neighbourhood shoppers, negotiating fair prices, and building trusted repeat customers.",
      de: "In deutschen Städten finden auf Marktplätzen regelmäßige Wochenmärkte statt. Bauern, Bäcker und Käsereien bauen Stände auf. Ihr Umsatz hängt davon ab, freundliche Kundschaft zu gewinnen und gute Qualität anzubieten.",
      pl: "W polskich miastach i miasteczkach od rana tętnią życiem targowiska i bazary miejskie. Rolnicy, ogrodnicy i rzemieślnicy rozstawiają stoiska ze świeżymi warzywami, pieczywem i rybami. Ich dzienny przychód zależy od zaufania kupujących, dobrej jakości i uśmiechu dla stałych klientów.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Official statistical offices track monthly retail sales as a core indicator of economic strength and consumer demand.",
          de: "Statistische Ämter erfassen den monatlichen Einzelhandelsumsatz als zentralen Maßstab für Wirtschaftsleistung und Konsumnachfrage.",
          pl: "Główny Urząd Statystyczny (GUS) publikuje miesięczne dane o sprzedaży detalicznej jako kluczowy wskaźnik koniunktury i popytu konsumentów.",
        },
        source:
          "https://www.destatis.de/DE/Themen/Wirtschaft/Grosshandel-Einzelhandel/_inhalt.html",
      },
      {
        text: {
          en: "Economic ministries emphasize that consistent customer demand and sales volume are vital for small trade and craft businesses.",
          de: "Wirtschaftsministerien heben hervor, dass stetige Kundennachfrage und Umsätze das Fundament für mittelständische Betriebe bilden.",
          pl: "Ministerstwo Rozwoju i Technologii wskazuje, że popyt rynkowy i stała sprzedaż są niezbędne dla stabilności mikroprzedsiębiorstw i rzemiosła.",
        },
        source: "https://www.bmwk.de/Redaktion/DE/Dossier/mittelstand.html",
      },
      {
        text: {
          en: "National retail federations represent enterprises that link primary producers and manufacturers directly to retail shoppers.",
          de: "Handelsverbände vertreten Einzelhandelsunternehmen, die Erzeuger und Verbraucher auf Marktplätzen und in Geschäften verbinden.",
          pl: "Polska Izba Handlu reprezentuje przedsiębiorców handlowych, łączących lokalnych producentów i rolników z konsumentami.",
        },
        source: "https://einzelhandel.de/",
      },
      {
        text: {
          en: "Chambers of commerce provide guidance on customer service, pricing transparency, and building repeat business.",
          de: "Industrie- und Handelskammern bieten Leitfäden für Kundenorientierung, Preisauszeichnung und langfristige Kundenbindung an.",
          pl: "Krajowa Izba Gospodarcza podkreśla wagę przejrzystości cenowej, zaufania konsumentów i budowania lojalności klientów.",
        },
        source: "https://www.dihk.de/",
      },
      {
        text: {
          en: "Tax administrations require commercial sellers to record all individual sales transactions using certified cash registers or receipts.",
          de: "Die Finanzverwaltung verlangt von gewerblichen Verkäufern eine ordnungsgemäße Einzelaufzeichnung aller Verkaufsvorgänge über Kassensysteme.",
          pl: "Krajowa Administracja Skarbowa (KAS) wymaga ewidencjonowania każdej sprzedaży na rzecz konsumentów za pomocą kas fiskalnych.",
        },
        source: "https://www.bundesfinanzministerium.de/",
      },
    ],
    simplified: [
      {
        en: "In the lesson, every passing customer buys the same fish for a fixed coin price. Real shops manage changing footfall, discounts, and inventory turnover.",
        de: "In der Lektion kauft jeder Kunde den gleichen Fisch zum Festpreis. Echte Geschäfte planen mit schwankendem Kundenandrang und unterschiedlichen Produkten.",
        pl: "W lekcji każdy klient kupuje tę samą rybę za stałą cenę w monetach. W rzeczywistości sklepy dopasowują asortyment i ceny do popytu.",
      },
      {
        en: "Direct coin exchanges introduce the concept of revenue; modern commerce also involves digital payments, cards, and invoices.",
        de: "Der direkte Münztausch veranschaulicht den Umsatz; modernes Wirtschaften nutzt zusätzlich Kartenzahlungen und Überweisungen.",
        pl: "Bezpośrednia wymiana monet na rybę tłumaczy pojęcie przychodu; we współczesnym handlu stosuje się też karty i płatności mobilne (np. BLIK).",
      },
    ],
  },
};
