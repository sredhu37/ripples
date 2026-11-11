import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function ConcertTicketLaunchDiagram({ lang, step }: DiagramProps) {
  const arjunName = lang === "pl" ? "Artur" : lang === "de" ? "Arno" : "Arjun";
  const label =
    lang === "pl"
      ? "Artur organizuje koncert szkolny"
      : lang === "de"
        ? "Arno organisiert das Schulfestival"
        : "Arjun organizing school charity concert";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#38bdf8"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#38bdf8" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#1e293b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#0284c7"
          stroke="#38bdf8"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#38bdf8">
          {arjunName}
        </text>
      </g>
      <g>
        <rect
          x="135"
          y="35"
          width="230"
          height="32"
          rx="6"
          fill="#1e293b"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#bae6fd">
          🎸{" "}
          {lang === "pl"
            ? "Koncert Charytatywny: Sala 200 Miejsc"
            : lang === "de"
              ? "Benefizkonzert: 200 Sitzplaetze"
              : "Charity Concert: 200 Seats Fixed"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="135"
            y="80"
            width="230"
            height="52"
            rx="8"
            fill="#1e293b"
            stroke="#0284c7"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="18">
            🎟️ 🎟️ 🎟️
          </text>
          <text
            x="250"
            y="122"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#7dd3fc"
          >
            {lang === "pl"
              ? "Cena wywoławcza: 40 zł za bilet"
              : lang === "de"
                ? "Ausgabepreis: 10 € je Ticket"
                : "Initial price: $10 per ticket"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#0369a1" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "800 chętnych na 200 biletów!"
              : lang === "de"
                ? "800 Interessenten fuer 200 Tickets!"
                : "800 Fans want 200 tickets!"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#e0f2fe">
            {lang === "pl"
              ? "Ogromny niedobór przy zbyt niskiej cenie"
              : lang === "de"
                ? "Klassischer Nachfrageueberhang"
                : "Massive shortage at $10 price tag"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ShortageSurplusDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Niedobór a nadwyżka rynkowa"
      : lang === "de"
        ? "Nachfrageueberhang und Angebotsueberhang"
        : "Shortage vs surplus dynamics";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f8fafc"
        stroke="#334155"
        strokeWidth="2"
      />
      <g>
        <rect
          x="35"
          y="40"
          width="155"
          height="135"
          rx="8"
          fill="#fff1f2"
          stroke="#e11d48"
          strokeWidth="1.5"
        />
        <text x="112" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c">
          {lang === "pl"
            ? "Cena 20 zł: Niedobór"
            : lang === "de"
              ? "Preis 5 €: Knappheit"
              : "Low Price: Shortage"}
        </text>
        <text x="112" y="95" textAnchor="middle" fontSize="22">
          ⚠️ 🏃💨
        </text>
        <text x="112" y="120" textAnchor="middle" fontSize="10" fill="#9f1239">
          {lang === "pl"
            ? "Kolejki i spekulanci"
            : lang === "de"
              ? "Lange Schlangen & Frust"
              : "Long lines and scalpers"}
        </text>
        <rect x="45" y="135" width="135" height="30" rx="4" fill="#fecdd3" />
        <text x="112" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#9f1239">
          Popyt &gt; Podaż
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="210"
            y="40"
            width="155"
            height="135"
            rx="8"
            fill="#eff6ff"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          <text x="287" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
            {lang === "pl"
              ? "Cena 160 zł: Nadwyżka"
              : lang === "de"
                ? "Preis 40 €: Ueberhang"
                : "High Price: Surplus"}
          </text>
          <text x="287" y="95" textAnchor="middle" fontSize="22">
            📉 🪑
          </text>
          <text x="287" y="120" textAnchor="middle" fontSize="10" fill="#1d4ed8">
            {lang === "pl"
              ? "Puste miejsca na sali"
              : lang === "de"
                ? "Viele leere Sitze"
                : "Empty seats in hall"}
          </text>
          <rect x="220" y="135" width="135" height="30" rx="4" fill="#dbeafe" />
          <text x="287" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1e40af">
            Podaż &gt; Popyt
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="28" rx="6" fill="#334155" />
          <text
            x="200"
            y="208"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Cena równowagi to jedyna cena, przy której rynek się czyści"
              : lang === "de"
                ? "Nur der Marktpreis gleicht Angebot und Nachfrage lautlos aus"
                : "The market-clearing equilibrium price leaves neither shortages nor waste"}
          </text>
        </g>
      )}
    </svg>
  );
}

function MarketClearingDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Cena równowagi czyszcząca rynek"
      : lang === "de"
        ? "Der marktraeumende Gleichgewichtspreis"
        : "Market clearing equilibrium price";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f0fdf4"
        stroke="#16a34a"
        strokeWidth="2"
      />
      <line x1="60" y1="40" x2="60" y2="180" stroke="#64748b" strokeWidth="2" />
      <line x1="60" y1="180" x2="350" y2="180" stroke="#64748b" strokeWidth="2" />
      <line x1="80" y1="60" x2="320" y2="160" stroke="#e11d48" strokeWidth="3" />
      <text x="325" y="165" fontSize="10" fontWeight="bold" fill="#be123c">
        Demand
      </text>
      <line x1="80" y1="160" x2="320" y2="60" stroke="#2563eb" strokeWidth="3" />
      <text x="325" y="65" fontSize="10" fontWeight="bold" fill="#1e40af">
        Supply
      </text>
      {step >= 2 && (
        <g>
          <circle cx="200" cy="110" r="7" fill="#16a34a" stroke="#fff" strokeWidth="2" />
          <line
            x1="60"
            y1="110"
            x2="200"
            y2="110"
            stroke="#16a34a"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <line
            x1="200"
            y1="110"
            x2="200"
            y2="180"
            stroke="#16a34a"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text x="210" y="105" fontSize="11" fontWeight="bold" fill="#15803d">
            {lang === "pl"
              ? "Cena równowagi: 80 zł (200 biletów)"
              : lang === "de"
                ? "Marktpreis: 20 € (200 Tickets)"
                : "Equilibrium: $20 (200 Sold)"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="25" rx="4" fill="#15803d" />
          <text
            x="200"
            y="212"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Ani jednego pustego miejsca, ani jednego rozczarowanego fana w kolejce"
              : lang === "de"
                ? "Kein leerer Platz und keine Schlange: Der Markt ist vollstaendig geraeumt"
                : "Zero empty chairs, zero scalpers: Every willing fan finds their seat"}
          </text>
        </g>
      )}
    </svg>
  );
}

function SupplyShiftDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Przesunięcie krzywej podaży i zmiana ceny"
      : lang === "de"
        ? "Verschiebung der Angebotskurve und Preiswirkung"
        : "Supply shifts and dynamic price discovery";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fffbeb"
        stroke="#d97706"
        strokeWidth="2"
      />
      <g>
        <rect
          x="35"
          y="40"
          width="155"
          height="135"
          rx="8"
          fill="#fef3c7"
          stroke="#b45309"
          strokeWidth="1.5"
        />
        <text x="112" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">
          {lang === "pl"
            ? "Koncert Dodatkowy (+200)"
            : lang === "de"
              ? "Zusatzkonzert (+200)"
              : "Added Second Night (+200)"}
        </text>
        <text x="112" y="95" textAnchor="middle" fontSize="22">
          🎪 🎸
        </text>
        <text x="112" y="120" textAnchor="middle" fontSize="10" fill="#92400e">
          {lang === "pl"
            ? "Podwojenie podaży"
            : lang === "de"
              ? "Angebot verdoppelt"
              : "Supply doubles to 400"}
        </text>
        <rect x="45" y="135" width="135" height="30" rx="4" fill="#fde68a" />
        <text x="112" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#78350f">
          Price cools to $15
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="210"
            y="40"
            width="155"
            height="135"
            rx="8"
            fill="#ecfdf5"
            stroke="#059669"
            strokeWidth="1.5"
          />
          <text x="287" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
            {lang === "pl"
              ? "Sygnał Cenowy w Praktyce"
              : lang === "de"
                ? "Preissignal in Aktion"
                : "Price Signal in Action"}
          </text>
          <text x="287" y="95" textAnchor="middle" fontSize="22">
            📡 💡
          </text>
          <text x="287" y="120" textAnchor="middle" fontSize="10" fill="#047857">
            {lang === "pl"
              ? "Wysoka cena przyciąga podaż"
              : lang === "de"
                ? "Hohe Preise locken Angebot"
                : "High prices attract supply"}
          </text>
          <rect x="220" y="135" width="135" height="30" rx="4" fill="#a7f3d0" />
          <text x="287" y="154" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#065f46">
            Self-Balancing Market
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="35" y="195" width="330" height="25" rx="4" fill="#78350f" />
          <text
            x="200"
            y="212"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Ceny działają jak sieć neuronowa koordynująca zasoby bez centralnego planisty"
              : lang === "de"
                ? "Preise koordinieren Ressourcen wie ein dezentrales Nervensystem"
                : "Prices act like a decentralized neural network coordinating human effort"}
          </text>
        </g>
      )}
    </svg>
  );
}

function MarketCivilizationDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Rynki jako fundament dobrobytu i koordynacji"
      : lang === "de"
        ? "Maerkte als Motor fuer Wohlstand und Kooperation"
        : "Markets as engines of prosperity and voluntary trade";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#faf5ff"
        stroke="#7e22ce"
        strokeWidth="2"
      />
      <circle cx="200" cy="100" r="42" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="200" y="95" textAnchor="middle" fontSize="20">
        ⚖️
      </text>
      <text x="200" y="115" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5b21b6">
        Clear Market
      </text>
      <g>
        <circle cx="85" cy="70" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="85" y="68" textAnchor="middle" fontSize="14">
          🌾
        </text>
        <text x="85" y="84" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#15803d">
          Producers
        </text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="315" cy="70" r="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="315" y="68" textAnchor="middle" fontSize="14">
            👥
          </text>
          <text x="315" y="84" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#1e40af">
            Consumers
          </text>
          <circle cx="200" cy="170" r="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="200" y="168" textAnchor="middle" fontSize="14">
            🤝
          </text>
          <text x="200" y="184" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#92400e">
            Fair Trades
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text
            x="200"
            y="214"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Dobrowolna wymiana rynkowa tworzy zysk dla obu stron transakcji"
              : lang === "de"
                ? "Freier Austausch schafft beidseitigen Mehrwert fuer Kaeufer und Verkaeufer"
                : "Voluntary market exchange leaves both buyer and seller wealthier than before"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [ticketPrice, setTicketPrice] = useState(10);
  const seats = 200;
  const demand = Math.max(50, 800 - ticketPrice * 30);
  const isEquilibrium = Math.abs(demand - seats) <= 25;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Ticket Price: ${ticketPrice} | Seats: {seats} | Willing Buyers: {demand}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setTicketPrice((p) => {
              const next = Math.min(30, p + 5);
              if (Math.abs(800 - next * 30 - 200) <= 25) onDone?.();
              return next;
            });
          }}
        >
          Raise Price (+$5)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setTicketPrice((p) => Math.max(5, p - 5))}
        >
          Lower Price (-$5)
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: isEquilibrium ? "#eef8ef" : "#fff1f2",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {isEquilibrium
          ? "Market Equilibrium Found! At $20, exactly 200 buyers want the 200 seats: zero lines and zero empty chairs!"
          : demand > seats
            ? `Shortage: ${demand - seats} disappointed fans cannot get a ticket at this low price.`
            : `Surplus: ${seats - demand} empty seats remain unsold because the price is too high.`}
      </div>
    </div>
  );
}

function SupplyDemandWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        If a vendor offers 100 jackets for $200 and only 20 people want to buy at that price, what
        economic state exists?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Shortage (too many buyers)
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        Surplus (excess supply of 80 unsold jackets)
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Monetary inflation
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "supplydemand",
  story: [
    animatedBeat(
      [
        T(
          "Meet Arjun. He organizes an annual charity acoustic rock concert in his high school two-hundred-seat auditorium.",
          "Das ist Arno. Er organisiert ein Benefizkonzert in der 200 Plaetze grossen Schulaula.",
          "Poznaj Artura. Organizuje doroczny charytatywny koncert rockowy w dwustuosobowej auli szkolnej.",
        ),
        T(
          "He prints two hundred paper tickets and sets the opening price at ten dollars each, hoping to fill the room quickly.",
          "Er druckt 200 Eintrittskarten fuer je zehn Euro und hofft, den Saal rasch zu fuellen.",
          "Drukuje dwieście papierowych biletów i ustala cenę wyjściową na czterdzieści złotych za sztukę.",
        ),
        T(
          "Within five minutes of opening the ticket booth, eight hundred eager students swarm the line waving money.",
          "Binnen fuenf Minuten stehen 800 Schueler in der Schlange und wollen Karten kaufen.",
          "W ciągu pięciu minut od otwarcia kasy przed wejściem ustawia się ośmiuset chętnych uczniów z gotówką.",
        ),
      ],
      ConcertTicketLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "Arjun witnesses firsthand what happens when prices sit below the *market clearing price*.",
          "Arno erlebt direkt, was passiert, wenn ein Preis unter dem *Gleichgewichtspreis* liegt.",
          "Artur na własne oczy widzi, co się dzieje, gdy cena jest niższa niż *cena równowagi rynkowej*.",
        ),
        T(
          "A severe *shortage* emerges: six hundred fans leave angry, while opportunistic scalpers immediately resell tickets outside for fifty dollars.",
          "Ein akuter *Mangel* entsteht: 600 Fans gehen leer aus, waehrend Schwarzkassierer Tickets fuer 50 Euro weiterverkaufen.",
          "Powstaje dotkliwy *niedobór*: sześciuset uczniów odchodzi z kwitkiem, a spekulanci natychmiast odsprzedają wejściówki po dwieście złotych.",
        ),
        T(
          "Conversely, setting prices at fifty dollars would cause a *surplus*: dozens of empty seats and wasted potential.",
          "Wuerde er umgekehrt 50 Euro verlangen, gaebe es einen *Ueberhang*: viele Sitze blieben leer.",
          "Z kolei podniesienie ceny do dwustu złotych wywołałoby *nadwyżkę*: dziesiątki pustych foteli i zmarnowany dochód na cele charytatywne.",
        ),
      ],
      ShortageSurplusDiagram,
    ),
    animatedBeat(
      [
        T(
          "By adjusting price to twenty dollars, quantity demanded falls from eight hundred to exactly two hundred buyers.",
          "Bei einem Preis von 20 Euro sinkt die Nachfrage exakt auf die verfuegbaren 200 Sitzplaetze.",
          "Przy cenie osiemdziesięciu złotych liczba chętnych spada z ośmiuset do dokładnie dwustu osób.",
        ),
        T(
          "At this *equilibrium*, supply perfectly balances demand: every seat is filled, and no disappointed crowd lingers in queues.",
          "Im *Marktgleichgewicht* deckt sich das Angebot perfekt mit dem Bedarf: kein Platz bleibt leer, keine Schlange staut sich.",
          "W punkcie *równowagi* podaż idealnie pokrywa się z popytem: cała sala jest pełna, a przed wejściem nie ma rozczarowanych tłumów.",
        ),
        T(
          "The market clearing price maximizes total funds raised for the charity without creating artificial shortages.",
          "Dieser marktraeumende Preis maximiert die Spendensumme fuer den guten Zweck voellig reibungslos.",
          "Cena czyszcząca rynek maksymalizuje zbiórkę na cel charytatywny bez wywoływania sztucznych niedoborów.",
        ),
      ],
      MarketClearingDiagram,
    ),
    animatedBeat(
      [
        T(
          "Seeing high willingness to pay, Arjun decides to add a second concert night on Sunday.",
          "Weil das Interesse riesig ist, setzt Arno ein zweites Konzert am Sonntag an.",
          "Widząc wielkie zainteresowanie, Artur decyduje się zorganizować drugi koncert w niedzielę.",
        ),
        T(
          "Doubling total supply to four hundred seats naturally eases price pressure, letting more students attend affordably.",
          "Die Verdopplung des Angebots auf 400 Plaetze daempft den Preisdruck und laesst mehr Schueler teilhaben.",
          "Podwojenie łącznej podaży do czterystu miejsc łagodzi presję cenową, umożliwiając wstęp większej liczbie uczniów.",
        ),
        T(
          "This dynamic feedback loop shows how price signals guide producers to allocate labor, materials, and time.",
          "Dieses Preissignal zeigt Herstellern genau, wo mehr Zeit, Arbeit und Material gebraucht werden.",
          "Ta dynamiczna pętla zwrotna pokazuje, jak sygnały cenowe nakierowują producentów na właściwe gospodarowanie czasem i zasobami.",
        ),
      ],
      SupplyShiftDiagram,
    ),
    animatedBeat(
      [
        T(
          "Markets are humanity quiet supercomputer: millions of independent consumers and sellers coordinating spontaneously.",
          "Maerkte sind das leise Nervensystem der Wirtschaft: Millionen Menschen stimmen sich freiwillig ab.",
          "Rynki są cichym superkomputerem ludzkości: miliony konsumentów i producentów koordynują swoje działania bez przymusu.",
        ),
        T(
          "When buyers and sellers trade freely at fair clearing prices, both leave the transaction wealthier than before.",
          "Wenn Kaeufer und Verkaeufer freiwillig handeln, gewinnen beide Seiten echten Wohlstand.",
          "Gdy kupujący i sprzedający handlują dobrowolnie po uczciwych cenach równowagi, obie strony zyskują realną wartość.",
        ),
        T(
          "Understanding supply and demand empowers you to interpret why every asset, service, and product is priced the way it is.",
          "Wer Angebot und Nachfrage versteht, erkennt die unsichtbaren Kraefte hinter allen Preisen der Welt.",
          "Zrozumienie podaży i popytu pozwala pojąć, dlaczego każdy towar, usługa czy aktywo na świecie ma określoną cenę.",
        ),
      ],
      MarketCivilizationDiagram,
    ),
  ],
  toyIntro: T(
    "Adjust ticket prices to discover the market-clearing equilibrium where supply matches buyer demand perfectly.",
    "Passe den Ticketpreis an, um das Marktgleichgewicht zu finden, bei dem Angebot und Nachfrage exakt uebereinstimmen.",
    "Dostosuj cenę biletów, aby znaleźć równowagę rynkową, w której podaż idealnie odpowiada popytowi.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What happens in a competitive market when price is set below the equilibrium clearing price?",
        "Was geschieht auf einem Markt, wenn der Preis unter dem Gleichgewichtspreis liegt?",
        "Co dzieje się na rynku konkurencyjnym, gdy cena zostanie ustalona poniżej poziomu równowagi?",
      ),
      options: [
        {
          text: T(
            "A shortage develops because buyers demand more goods than sellers are willing to supply at that price",
            "Ein Nachfrageueberhang (Knappheit) entsteht, weil mehr gekauft als angeboten werden soll",
            "Powstaje niedobór, ponieważ kupujący chcą nabyć więcej towaru, niż producenci są skłonni dostarczyć w tej cenie",
          ),
          correct: true,
        },
        {
          text: T(
            "Warehouses overflow with unwanted excess inventory",
            "Die Lagerhallen quellen vor unverkaufbaren Waren ueber",
            "Magazyny pękają w szwach od niesprzedanych towarów",
          ),
        },
        {
          text: T(
            "All factories immediately stop production forever",
            "Alle Fabriken stellen die Produktion fuer immer ein",
            "Wszystkie fabryki natychmiast na zawsze przerywają produkcję",
          ),
        },
      ],
      hint: T(
        "Think about long lines when limited concert tickets or gadgets are sold too cheaply.",
        "Denke an lange Schlangen vor Geschaeften, wenn begehrte Waren zu billig sind.",
        "Pomyśl o długich kolejkach, gdy pożądany towar lub bilety na koncert są zbyt tanie.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the market-clearing equilibrium price?",
        "Was zeichnet den Gleichgewichtspreis auf einem Markt aus?",
        "Czym charakteryzuje się cena równowagi czyszcząca rynek?",
      ),
      options: [
        {
          text: T(
            "The exact price at which quantity demanded by consumers equals quantity supplied by producers",
            "Der Preis, bei dem die nachgefragte Menge genau dem Angebot entspricht",
            "Cena, przy której wielkość popytu konsumentów jest dokładnie równa wielkości podaży producentów",
          ),
          correct: true,
        },
        {
          text: T(
            "The lowest price legally allowed by the national tax authority",
            "Der niedrigste vom Finanzamt gesetzlich erlaubte Preis",
            "Najniższa cena prawnie dopuszczona przez urząd skarbowy",
          ),
        },
        {
          text: T(
            "The price of gold stamped on antique coins",
            "Der auf antiken Goldmuenzen eingepraegte Nennwert",
            "Cena złota wybita na zabytkowych monetach",
          ),
        },
      ],
      hint: T(
        "Look for the point where neither shortages nor unsold surpluses exist.",
        "Achte auf den Punkt, an dem weder Mangel noch unverkaufte Reste bleiben.",
        "Zwróć uwagę na punkt, w którym nie występują ani niedobory, ani niesprzedane nadwyżki.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify whether a market experiences a shortage or a surplus under the given pricing conditions.",
        "Bestimme, ob unter den gegebenen Bedingungen ein Ueberhang oder Mangel vorliegt.",
        "Określ, czy w podanych warunkach cenowych na rynku występuje niedobór, czy nadwyżka.",
      ),
      Widget: SupplyDemandWidget,
      hint: T(
        "Compare the number of units offered by sellers against the number requested by buyers.",
        "Vergleiche das Angebot der Verkaeufer mit der tatsaechlichen Nachfrage der Kaeufer.",
        "Porównaj liczbę sztuk oferowanych przez sprzedawcę z liczbą zgłaszaną przez kupujących.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Have they ever experienced a shortage or surge in prices due to sudden high demand for flights or hotels?",
    "Frage deine Eltern: Haben sie schon einmal steigende Flug- oder Hotelpreise wegen ploetzlicher Nachfrage erlebt?",
    "Zapytaj rodziców: Czy zdarzyło im się doświadczyć skoku cen biletów lotniczych lub hoteli z powodu nagłego wzrostu popytu?",
  ),
  realLife: {
    title: T(
      "Real world: Dynamic pricing in ride-hailing and airline travel",
      "Echte Welt: Dynamische Preisbildung bei Fluegen und Fahrdiensten",
      "Prawdziwy świat: Dynamiczne kształtowanie cen w lotnictwie i przewozach osób",
    ),
    body: T(
      "Apps like Uber, Lufthansa, or regional train systems use real-time dynamic pricing algorithms. When rain starts or a sports stadium empties, surge pricing raises fares. This higher clearing price discourages non-urgent trips while motivating off-duty drivers to hit the road, rebalancing supply and demand within minutes.",
      "Unternehmen wie Uber oder Fluggesellschaften nutzen dynamische Algorithmen. Bei Regen oder nach Fussballspielen steigen Fahrpreise temporaer. Dies daempft unnoetige Fahrten und lockt zusaetzliche Fahrer auf die Strasse, sodass sich der Markt binnen Minuten einpendelt.",
      "Aplikacje przewozowe (np. Uber) i linie lotnicze stosują algorytmy dynamicznego ustalania cen. Podczas deszczu lub po zakończeniu meczu na stadionie ceny rosną. Wyższa cena skłania kierowców do wyjazdu na ulice, równoważąc popyt z podażą w kilka minut.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "Adam Smith described the self-regulating nature of competitive markets as the 'invisible hand' in The Wealth of Nations (1776).",
          "Adam Smith praegte 1776 in 'Der Wohlstand der Nationen' die Metapher der 'unsichtbaren Hand' des Marktes.",
          "Adam Smith użył metafory 'niewidzialnej ręki rynku' w swoim dziele 'Badania nad naturą i przyczynami bogactwa narodów' z 1776 roku.",
        ),
        source: "https://www.britannica.com/topic/invisible-hand",
      },
      {
        text: T(
          "Leon Walras formalized general equilibrium theory in 1874 using systems of simultaneous mathematical equations.",
          "Leon Walras begruendete 1874 die mathematische allgemeine Gleichgewichtstheorie der Maerkte.",
          "Leon Walras sformułował matematyczną teorię równowagi ogólnej w 1874 roku, opisując wzajemne zależności cen.",
        ),
        source: "https://www.britannica.com/biography/Leon-Walras",
      },
      {
        text: T(
          "Destatis collects comprehensive price indices showing how energy commodity shortages drive upstream industrial producer price fluctuations.",
          "Destatis erfasst Erzeugerpreisindizes, die zeigen, wie Energieknappheit die Preise fuer die gesamte Industrie veraendert.",
          "Destatis publikuje wskaźniki cen produkcji przemysłowej obrazujące, jak niedobory surowców energetycznych wpływają na koszty wytwórcze.",
        ),
        source: "https://www.destatis.de/DE/Themen/Wirtschaft/Preise/_inhalt.html",
      },
      {
        text: T(
          "Nobel laureate Friedrich Hayek showed in 1945 that the price system communicates dispersed local knowledge across millions of market participants.",
          "Nobelpreistraeger Friedrich August von Hayek zeigte 1945, wie Preise verstreutes Wissen dezentral koordinieren.",
          "Laureat Nagrody Nobla Friedrich Hayek wykazał w 1945 roku, że system cenowy przenosi rozproszoną wiedzę milionów uczestników rynku.",
        ),
        source: "https://www.aeaweb.org/aer/top20/35.4.519-530.pdf",
      },
      {
        text: T(
          "The Chicago Mercantile Exchange (CME Group) operates electronic auction books matching bids and asks at microsecond speeds to discover clearing prices.",
          "Die Chicago Mercantile Exchange ermittelt taeglich ueber elektronische Orderbuecher marktraeumende Preise in Mikrosekunden.",
          "Giełda Chicago Mercantile Exchange dopasowuje oferty kupna i sprzedaży w ułamkach sekund, wyznaczając ceny transakcyjne na rynkach globalnych.",
        ),
        source:
          "https://www.cmegroup.com/education/courses/introduction-to-derivatives/market-structure.html",
      },
    ],
    simplified: [
      T(
        "Complex non-linear elasticity curves are modeled with straightforward linear auction clearing examples.",
        "Nicht-lineare Preiselastizitaeten wurden anhand verstaendlicher Konzertkarten-Beispiele vereinfacht.",
        "Nieliniowe krzywe elastyczności cenowej uproszczono do przejrzystych przykładów biletów na koncert.",
      ),
    ],
  },
};
