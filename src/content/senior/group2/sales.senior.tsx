import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/**
 * Beat 1: Meet Abhi. Builds a retro pixel-art dungeon crawler game for mobile phones.
 * Step 1: Abhi launches his indie game on the app store.
 * Step 2: Store listing page goes live with screenshots and video.
 * Step 3: Visitors click into the game page from social media posts.
 */
function AppStoreLaunchDiagram({ lang, step }: DiagramProps) {
  const abhiName = lang === "pl" ? "Tymon" : lang === "de" ? "Tim" : "Abhi";
  const label =
    lang === "pl"
      ? "Tymon publikuje grę w sklepie z aplikacjami"
      : lang === "de"
        ? "Tim veroeffentlicht sein Retro-Spiel im App Store"
        : "Abhi publishing pixel game on app store";

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

      {/* Abhi avatar */}
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
          {abhiName}
        </text>
      </g>

      {/* Game badge */}
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
          🎮{" "}
          {lang === "pl"
            ? "Pixel Dungeon Crawler"
            : lang === "de"
              ? "Pixel Dungeon Crawler"
              : "Pixel Dungeon Crawler"}
        </text>
      </g>

      {/* Step 2: Store listing */}
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
            📱 ⭐⭐⭐⭐⭐
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
              ? "Karta gry w sklepie aplikacji"
              : lang === "de"
                ? "App-Store-Eintrag ist online"
                : "App Store Page Live"}
          </text>
        </g>
      )}

      {/* Step 3: Visitors arriving */}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#0369a1" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "10 000 wyświetleń strony gry!"
              : lang === "de"
                ? "10.000 Seitenaufrufe der App!"
                : "10,000 Store Page Views!"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#e0f2fe">
            {lang === "pl"
              ? "Pierwszy etap lejka sprzedażowego"
              : lang === "de"
                ? "Die oberste Stufe des Verkaufstrichters"
                : "Top of the sales conversion funnel"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 2: The Conversion Funnel.
 * Step 1: 10,000 store visitors at the top of funnel.
 * Step 2: 1,000 actual downloads (10% install rate).
 * Step 3: 50 players buy the expansion pack (5% conversion = $250).
 */
function ConversionFunnelDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Lejek konwersji od odwiedzin do płacących graczy"
      : lang === "de"
        ? "Der Verkaufstrichter von Besuchern zu Kaeufern"
        : "The sales conversion funnel from visitors to paying players";

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

      {/* Top of Funnel: 10,000 Visitors */}
      <g>
        <polygon
          points="50,40 350,40 310,85 90,85"
          fill="#dbeafe"
          stroke="#2563eb"
          strokeWidth="2"
        />
        <text x="200" y="66" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">
          {lang === "pl"
            ? "10 000 Odwiedzin strony (100%)"
            : lang === "de"
              ? "10.000 Seitenaufrufe (100%)"
              : "10,000 Store Page Visitors (100%)"}
        </text>
      </g>

      {/* Step 2: Downloads */}
      {step >= 2 && (
        <g>
          <polygon
            points="90,87 310,87 270,135 130,135"
            fill="#fef3c7"
            stroke="#d97706"
            strokeWidth="2"
          />
          <text x="200" y="114" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">
            {lang === "pl"
              ? "1 000 Pobrań gry (10% konwersji)"
              : lang === "de"
                ? "1.000 Downloads (10% Rate)"
                : "1,000 Installs (10% Install Rate)"}
          </text>
        </g>
      )}

      {/* Step 3: Paying Customers */}
      {step >= 3 && (
        <g>
          <polygon
            points="130,137 270,137 235,185 165,185"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="200" y="164" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
            {lang === "pl"
              ? "50 Płatności za DLC (5% z pobrań)"
              : lang === "de"
                ? "50 In-App-Kaeufer (5% Quote)"
                : "50 Expansion Buys (5% of installs)"}
          </text>
          <rect x="70" y="196" width="260" height="22" rx="4" fill="#15803d" />
          <text
            x="200"
            y="211"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Przychód: 50 graczy × 20 zł = 1 000 zł"
              : lang === "de"
                ? "Umsatz: 50 Kaeufer × 5 € = 250 €"
                : "Revenue: 50 buyers × $5 = $250"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 3: Where the funnel leaks: Friction points.
 * Step 1: Slow download file size scares off mobile users.
 * Step 2: Confusing tutorial causes players to quit on level one.
 * Step 3: Removing friction doubles sales without buying more ads!
 */
function FunnelLeaksDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Przecieki w lejku i usuwanie barier dla użytkowników"
      : lang === "de"
        ? "Engpaesse im Trichter und Beseitigung von Reibung"
        : "Funnel leakage points and removing user friction";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fafafa"
        stroke="#475569"
        strokeWidth="2"
      />

      {/* Step 1: Download Friction */}
      <g>
        <rect
          x="35"
          y="35"
          width="155"
          height="150"
          rx="8"
          fill="#fff1f2"
          stroke="#e11d48"
          strokeWidth="1.5"
        />
        <text x="112" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c">
          {lang === "pl"
            ? "Zbyt duży plik (500 MB)"
            : lang === "de"
              ? "Dateigroesse zu gross"
              : "Heavy 500MB Download"}
        </text>
        <text x="112" y="90" textAnchor="middle" fontSize="22">
          ⏳ ❌
        </text>
        <text x="112" y="115" textAnchor="middle" fontSize="10" fill="#9f1239">
          {lang === "pl"
            ? "Czekanie na Wi-Fi"
            : lang === "de"
              ? "Warten auf WLAN"
              : "Waiting on Wi-Fi"}
        </text>
        <text x="112" y="132" textAnchor="middle" fontSize="10" fill="#9f1239">
          {lang === "pl"
            ? "Gracze rezygnują"
            : lang === "de"
              ? "Nutzer brechen ab"
              : "Users give up"}
        </text>
        <rect x="45" y="145" width="135" height="26" rx="4" fill="#fecdd3" />
        <text x="112" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9f1239">
          {lang === "pl"
            ? "50% rezygnacji"
            : lang === "de"
              ? "50% Abbruchquote"
              : "50% Funnel Drop"}
        </text>
      </g>

      {/* Step 2: Confusing Level 1 */}
      {step >= 2 && (
        <g>
          <rect
            x="210"
            y="35"
            width="155"
            height="150"
            rx="8"
            fill="#fffbeb"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <text x="287" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
            {lang === "pl"
              ? "Trudny samouczek"
              : lang === "de"
                ? "Schweres Tutorial"
                : "Confusing Tutorial"}
          </text>
          <text x="287" y="90" textAnchor="middle" fontSize="22">
            🤯 🚪
          </text>
          <text x="287" y="115" textAnchor="middle" fontSize="10" fill="#b45309">
            {lang === "pl"
              ? "Gracze gubią się"
              : lang === "de"
                ? "Steuerung unklar"
                : "Controls confusing"}
          </text>
          <text x="287" y="132" textAnchor="middle" fontSize="10" fill="#b45309">
            {lang === "pl"
              ? "Kasują aplikację"
              : lang === "de"
                ? "App wird geloescht"
                : "Delete before Level 2"}
          </text>
          <rect x="220" y="145" width="135" height="26" rx="4" fill="#fde68a" />
          <text x="287" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350f">
            {lang === "pl"
              ? "Wysoki odpływ (Churn)"
              : lang === "de"
                ? "Fruehe Abwanderung"
                : "Early Churn"}
          </text>
        </g>
      )}

      {/* Step 3: Optimization Rule */}
      {step >= 3 && (
        <g>
          <rect x="40" y="196" width="320" height="24" rx="4" fill="#0284c7" />
          <text
            x="200"
            y="212"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Naprawa lejka podwaja sprzedaż bez wydawania grosza na reklamy"
              : lang === "de"
                ? "Reibung abbauen verdoppelt Umsatz ganz ohne Werbekosten"
                : "Removing friction doubles paying sales with zero extra ad spend"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 4: Customer Churn: The Leaky Bucket.
 * Step 1: 100 new players enter every week.
 * Step 2: If 40 players quit (40% churn rate), growth slows down.
 * Step 3: Fix retention first, so new users accumulate permanently!
 */
function ChurnBucketDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Wskaźnik rezygnacji i nieszczelne wiadro użytkowników"
      : lang === "de"
        ? "Kundenabwanderung und der undichte Eimer"
        : "Customer churn and the leaky bucket";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f0f9ff"
        stroke="#0284c7"
        strokeWidth="2"
      />

      {/* The Bucket Container */}
      <polygon
        points="120,60 280,60 250,180 150,180"
        fill="#e0f2fe"
        stroke="#0369a1"
        strokeWidth="2"
      />
      <text x="200" y="115" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0369a1">
        {lang === "pl" ? "Aktywni Gracze" : lang === "de" ? "Aktive Spieler" : "Active Player Base"}
      </text>

      {/* Step 1: New Users Inflow */}
      <g>
        <path d="M 200 20 L 200 55" stroke="#16a34a" strokeWidth="4" markerEnd="url(#arrow)" />
        <rect
          x="130"
          y="18"
          width="140"
          height="22"
          rx="4"
          fill="#dcfce7"
          stroke="#16a34a"
          strokeWidth="1"
        />
        <text x="200" y="33" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#15803d">
          {lang === "pl"
            ? "+100 Nowych / tydz."
            : lang === "de"
              ? "+100 Neue / Woche"
              : "+100 New Installs / wk"}
        </text>
      </g>

      {/* Step 2: Churn Leak */}
      {step >= 2 && (
        <g>
          <path d="M 245 155 L 290 170" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrow)" />
          <rect
            x="270"
            y="175"
            width="115"
            height="40"
            rx="6"
            fill="#fee2e2"
            stroke="#dc2626"
            strokeWidth="1"
          />
          <text x="327" y="192" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">
            {lang === "pl" ? "Odpływ (Churn)" : lang === "de" ? "Abwanderung" : "40% Churn Leak"}
          </text>
          <text x="327" y="206" textAnchor="middle" fontSize="9" fill="#b91c1c">
            {lang === "pl"
              ? "-40 graczy odchodzi"
              : lang === "de"
                ? "-40 hoeren auf"
                : "-40 quit weekly"}
          </text>
        </g>
      )}

      {/* Step 3: Retention Secret */}
      {step >= 3 && (
        <g>
          <rect x="35" y="196" width="220" height="24" rx="4" fill="#0369a1" />
          <text x="145" y="212" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Utrzymanie graczy bije pozyskiwanie nowych"
              : lang === "de"
                ? "Spieler halten ist wichtiger als Neukauf"
                : "Plugging churn creates compounding growth"}
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Beat 5: Weekly updates, daily quests, and community flywheel.
 * Step 1: Smooth 50MB download and fast onboarding.
 * Step 2: Weekly boss raids keep players returning.
 * Step 3: The compounding gaming community!
 */
function RetentionFlywheelDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Koło zamachowe zaangażowania i stałej bazy graczy"
      : lang === "de"
        ? "Das Schwungrad fuer Kundenbindung und treue Spieler"
        : "Retention flywheel and loyal active community";

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

      {/* Center circle */}
      <circle cx="200" cy="115" r="38" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
      <text x="200" y="112" textAnchor="middle" fontSize="16">
        🔥
      </text>
      <text x="200" y="128" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#166534">
        {lang === "pl" ? "Społeczność" : lang === "de" ? "Community" : "Community"}
      </text>

      {/* Step 1: Fast download */}
      <g>
        <circle cx="90" cy="70" r="28" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="90" y="68" textAnchor="middle" fontSize="14">
          ⚡
        </text>
        <text x="90" y="84" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1">
          50MB App
        </text>
      </g>

      {/* Step 2: Fun updates */}
      {step >= 2 && (
        <g>
          <circle cx="310" cy="70" r="28" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="310" y="68" textAnchor="middle" fontSize="14">
            🗡️
          </text>
          <text x="310" y="84" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#92400e">
            Weekly Raids
          </text>

          <circle cx="90" cy="165" r="28" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="90" y="163" textAnchor="middle" fontSize="14">
            💬
          </text>
          <text x="90" y="179" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">
            Discord Club
          </text>
        </g>
      )}

      {/* Step 3: Compounding banner */}
      {step >= 3 && (
        <g>
          <circle cx="310" cy="165" r="28" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
          <text x="310" y="163" textAnchor="middle" fontSize="14">
            ⭐
          </text>
          <text x="310" y="179" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#9d174d">
            5-Star Fans
          </text>

          <rect x="50" y="200" width="300" height="24" rx="6" fill="#15803d" />
          <text x="200" y="216" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Świetna konwersja i niskie odejścia tworzą trwały sukces"
              : lang === "de"
                ? "Hohe Konvertierung und geringe Abwanderung sichern Erfolg"
                : "High conversion plus low churn creates enduring software wealth"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [visitors, setVisitors] = useState(1000);
  const [conversionRate, setConversionRate] = useState(2); // percent

  const buyers = Math.round((visitors * conversionRate) / 100);
  const revenue = buyers * 10;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Visitors: {visitors.toLocaleString()} | Conversion Rate: {conversionRate}% | Sales: {buyers}{" "}
        (${revenue})
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setConversionRate((c) => {
              const next = Math.min(8, c + 2);
              if (next >= 6) onDone?.();
              return next;
            });
          }}
        >
          Optimize Funnel (+2% Conversion)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setConversionRate(2);
            setVisitors(1000);
          }}
        >
          Reset Baseline
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: conversionRate >= 4 ? "#eef8ef" : "#fff9db",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {conversionRate >= 6
          ? "Mastery: Tripling your conversion rate generates 3x more paying customers from the exact same web traffic!"
          : "Funnel focus: Improving user onboarding boosts revenue faster than buying more ad views."}
      </div>
    </div>
  );
}

function SalesWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        If 2,000 people visit an app page, 200 install it, and 10 buy a subscription, what is the
        install conversion rate?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        1%
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        10% (200 installs out of 2,000 visitors)
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        50%
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "sales",
  story: [
    animatedBeat(
      [
        T(
          "Meet Abhi. He spends months programming a clever retro pixel-art dungeon crawler game for mobile phones.",
          "Das ist Tim. Er programmiert monatelang ein spannendes Retro-Pixelspiel fuer Smartphones.",
          "Poznaj Tymona. Poświęca miesiące na stworzenie wciągającej gry logicznej w stylu pixel-art na telefony.",
        ),
        T(
          "When he publishes his game on the app store, he waits eagerly for thousands of downloads to roll in.",
          "Als er das Spiel im App Store veroeffentlicht, wartet er gespannt auf Tausende Downloads.",
          "Gdy publikuje grę w sklepie z aplikacjami, z niecierpliwością czeka na tysiące pobrań.",
        ),
        T(
          "During opening week, ten thousand gamers view his app store page, but very few end up playing.",
          "In der ersten Woche besuchen 10.000 Spieler die Seite, aber kaum jemand laedt es herunter.",
          "W pierwszym tygodniu stronę jego gry odwiedza dziesięć tysięcy graczy, lecz mało kto zaczyna grać.",
        ),
      ],
      AppStoreLaunchDiagram,
    ),
    animatedBeat(
      [
        T(
          "Abhi discovers how digital sales work by studying the *conversion funnel*.",
          "Tim versteht den Verkauf erst, als er seinen *Verkaufstrichter* (Conversion Funnel) analysiert.",
          "Tymon zaczyna rozumieć sprzedaż cyfrową, gdy bada swój *lejek konwersji*.",
        ),
        T(
          "Out of ten thousand store page visitors, only one thousand players actually tap download, a ten percent install rate.",
          "Von 10.000 Besuchern laden nur 1.000 das Spiel herunter: eine Rate von zehn Prozent.",
          "Z dziesięciu tysięcy odwiedzających tylko tysiąc osób klika pobierz, co oznacza 10 procent konwersji na instalację.",
        ),
        T(
          "From those thousand players, only fifty pay five dollars for the extra adventure pack, turning visitors into real revenue.",
          "Von diesen 1.000 kaufen nur 50 fuer fuenf Euro die Erweiterung: das bringt echten Umsatz.",
          "Z tego tysiąca graczy zaledwie pięćdziesiąt osób kupuje dodatek za dwadzieścia złotych, generując realny przychód.",
        ),
      ],
      ConversionFunnelDiagram,
    ),
    animatedBeat(
      [
        T(
          "To grow sales, Abhi investigates where users hit *friction* and leak out of his funnel.",
          "Um den Umsatz zu steigern, sucht Tim nach *Reibungspunkten*, an denen Nutzer abspringen.",
          "Aby zwiększyć przychód, Tymon szuka miejsc, w których gracze napotykają *barierę* i opuszczają lejek.",
        ),
        T(
          "He discovers his download file was over five hundred megabytes, scaring away players waiting on cellular data.",
          "Er merkt, dass seine App ueber 500 Megabyte gross war und Spieler ohne WLAN abschreckte.",
          "Okazuje się, że plik gry zajmował ponad 500 megabajtów, zniechęcając graczy korzystających z danych komórkowych.",
        ),
        T(
          "By compressing music and textures down to fifty megabytes, his install rate instantly jumps from ten to twenty-five percent.",
          "Nachdem er Grafiken auf 50 Megabyte verkleinert, steigt die Downloadrate sofort auf 25 Prozent.",
          "Gdy kompresuje grafikę i dźwięk do zaledwie 50 megabajtów, wskaźnik instalacji natychmiast rośnie z 10 do 25 procent.",
        ),
      ],
      FunnelLeaksDiagram,
    ),
    animatedBeat(
      [
        T(
          "Next, Abhi tackles *customer churn*: the percentage of players who stop playing after day one.",
          "Als Naechstes bekaempft Tim die *Kundenabwanderung* (Churn): Spieler, die nach Tag eins aufhoeren.",
          "Następnie Tymon bierze na warsztat *wskaźnik odejść* (churn): odsetek osób, które usuwają grę po pierwszym dniu.",
        ),
        T(
          "Pouring new users into an app with forty percent weekly churn is like pouring fresh water into a leaky bucket.",
          "Neue Nutzer in eine App mit 40% Churn zu holen ist wie Wasser in einen undichten Eimer zu schuetten.",
          "Kupowanie reklam dla aplikacji o 40-procentowym churnie przypomina wlewanie wody do dziurawego wiadra.",
        ),
        T(
          "He redesigns level one to be more intuitive and friendly, plugging the leak and keeping players engaged for months.",
          "Er macht das erste Level verstaendlicher, schliesst das Leck und haelt Spieler monatelang aktiv.",
          "Upraszcza początkowy samouczek, likwiduje dziurę w wiadrze i sprawia, że gracze zostają z nim na całe miesiące.",
        ),
      ],
      ChurnBucketDiagram,
    ),
    animatedBeat(
      [
        T(
          "When your conversion funnel is smooth and customer retention is strong, sales compound automatically.",
          "Ist der Trichter reibungslos und die Bindung stark, waechst der Umsatz fast von alleine.",
          "Gdy lejek jest dopracowany, a gracze wracają z przyjemnością, sprzedaż rośnie niemal automatycznie.",
        ),
        T(
          "Happy players leave five-star ratings, tell their friends, and invite fellow gamers into community raids.",
          "Begeisterte Spieler vergeben fuenf Sterne, empfehlen das Spiel und laden Freunde zu Raids ein.",
          "Zadowoleni użytkownicy wystawiają wysokie oceny, polecają tytuł znajomym i zapraszają ich do wspólnych gier.",
        ),
        T(
          "Great businesses do not just chase one-time clicks: they build clear funnels and loyal communities.",
          "Gute Unternehmen jagen nicht nur schnellen Klicks hinterher: sie schaffen Vertrauen und echte Fans.",
          "Najlepsze firmy nie gonią za przypadkowymi kliknięciami: budują przejrzyste lejki i lojalne społeczności.",
        ),
      ],
      RetentionFlywheelDiagram,
    ),
  ],
  toyIntro: T(
    "Experiment with sales funnel conversion rates to see how small optimizations multiply total revenue.",
    "Experimentiere mit Konvertierungsraten im Verkaufstrichter und beobachte den Hebel auf den Umsatz.",
    "Poeksperymentuj ze wskaźnikami konwersji w lejku i zobacz, jak drobne ulepszenia mnożą przychody.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does a conversion funnel illustrate in commerce?",
        "Was veranschaulicht ein Verkaufstrichter (Conversion Funnel) im Handel?",
        "Co ilustruje lejek konwersji w handlu?",
      ),
      options: [
        {
          text: T(
            "The step-by-step path potential customers take from initial discovery to final purchase",
            "Den schrittweisen Weg potenzieller Kunden von der Entdeckung bis zum Kauf",
            "Kolejne etapy, które pokonują potencjalni klienci od pierwszego kontaktu do zakupu",
          ),
          correct: true,
        },
        {
          text: T(
            "The physical kitchen funnel used to bottle fruit juices",
            "Den kuechentrichter zum Abfuellen von Fruchtsaeften",
            "Kuchenny lejek do przelewania soków owocowych",
          ),
        },
        {
          text: T(
            "The legal process of registering a trademark with the state",
            "Den juristischen Ablauf einer Markeneintragung beim Patentamt",
            "Procedurę rejestracji znaku towarowego w urzędzie patentowym",
          ),
        },
      ],
      hint: T(
        "Notice how the audience narrows at each step of the journey.",
        "Achte darauf, wie die Gruppe auf jedem Schritt kleiner wird.",
        "Zwróć uwagę, jak liczba osób zmniejsza się na kolejnych etapach ścieżki.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is customer churn in a subscription or software service?",
        "Was versteht man unter Kundenabwanderung (Churn Rate) bei Software oder Abos?",
        "Czym jest wskaźnik odejść (churn) w usługach subskrypcyjnych lub grach?",
      ),
      options: [
        {
          text: T(
            "The rate at which existing customers cancel, delete, or stop using the product",
            "Die Rate, mit der bestehende Nutzer kuendigen oder die Nutzung beenden",
            "Odsetek dotychczasowych użytkowników, którzy rezygnują z produktu lub usuwają aplikację",
          ),
          correct: true,
        },
        {
          text: T(
            "The physical speed of server hard drives spinning in a data center",
            "Die Umdrehungsgeschwindigkeit von Serverfestplatten im Rechenzentrum",
            "Prędkość obrotowa dysków twardych w centrum danych",
          ),
        },
        {
          text: T(
            "The bonus interest paid to corporate bondholders annually",
            "Die an Anleiheglaeubiger jaehrlich ausgezahlte Zinsgutschrift",
            "Roczny bonus odsetkowy wypłacany posiadaczom obligacji",
          ),
        },
      ],
      hint: T(
        "It measures loss of retained users over a time window.",
        "Es misst den Verlust aktiver Nutzer ueber einen Zeitraum.",
        "Mierzy ubytek aktywnych użytkowników w danym okresie.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Calculate the top-of-funnel install conversion percentage from the given visitor metrics.",
        "Berechne die Download-Konvertierungsrate aus den angegebenen Besucherzahlen.",
        "Oblicz procentową konwersję instalacji na podstawie podanych danych o odwiedzinach.",
      ),
      Widget: SalesWidget,
      hint: T(
        "Divide the number of installs by total visitors and multiply by one hundred.",
        "Teile die Zahl der Downloads durch die Gesamtbesucher und nimm mal einhundert.",
        "Podziel liczbę pobrań przez liczbę odwiedzających i pomnóż przez sto.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: How does their team or company track how many interested prospects turn into actual clients?",
    "Frage deine Eltern: Wie misst ihr Team, wie viele Interessenten am Ende echte Kunden werden?",
    "Zapytaj rodziców: W jaki sposób w ich pracy mierzy się, ilu zainteresowanych klientów faktycznie dokonuje zakupu?",
  ),
  realLife: {
    title: T(
      "Real world: E-commerce checkout funnel optimization",
      "Echte Welt: Optimierung von Warenkorb-Trichtern im Online-Handel",
      "Prawdziwy świat: Optymalizacja ścieżki koszyka w sklepach internetowych",
    ),
    body: T(
      "Major global retailers like Amazon or Shopify obsess over checkout conversion funnels. By removing unnecessary form fields and adding one-click digital wallets (like Apple Pay), stores regularly lift checkout completion rates by 10% to 20%, unlocking billions in extra sales without running new advertising.",
      "Grosse Onlinehaendler wie Amazon oder Shopify feilen staendig an ihren Kassenprozessen. Weniger Formularfelder und One-Click-Zahlungsmethoden steigern die Abschlussrate oft um 10 bis 20 Prozent, was Milliarden an Zusatzumsatz bringt.",
      "Globalne platformy handlowe takie jak Amazon czy Shopify nieustannie doskonalą ścieżki zakupowe. Usunięcie zbędnych pól formularza i płatności jednym kliknięciem podnoszą finalizację transakcji o 10 do 20 procent, przynosząc miliardy bez dodatkowych reklam.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "E. St. Elmo Lewis developed the foundational AIDA sales funnel framework (Attention, Interest, Desire, Action) in 1898.",
          "E. St. Elmo Lewis entwickelte 1898 das klassische AIDA-Trichtermodell (Attention, Interest, Desire, Action).",
          "E. St. Elmo Lewis stworzył w 1898 roku klasyczny model lejka sprzedażowego AIDA (Uwaga, Zainteresowanie, Pożądanie, Działanie).",
        ),
        source: "https://www.britannica.com/money/AIDA-model",
      },
      {
        text: T(
          "Baymard Institute research aggregates over 40 global studies revealing an average e-commerce shopping cart abandonment rate of nearly 70%.",
          "Untersuchungen des Baymard Institute aus ueber 40 Studien zeigen eine durchschnittliche Warenkorb-Abbruchquote von fast 70 Prozent.",
          "Badania Baymard Institute obejmujące ponad 40 analiz dowodzą, że średni wskaźnik porzucania koszyków w e-commerce sięga blisko 70 procent.",
        ),
        source: "https://baymard.com/lists/cart-abandonment-rate",
      },
      {
        text: T(
          "Customer Lifetime Value (LTV) models incorporate churn rate to estimate cumulative gross profit generated across an average user lifespan.",
          "Customer-Lifetime-Value-Modelle beruecksichtigen die Abwanderungsrate zur Berechnung des Gesamtertrags je Kunde.",
          "Modele wartości życiowej klienta (LTV) uwzględniają wskaźnik churnu, aby wyliczyć łączny zysk wygenerowany przez użytkownika.",
        ),
        source: "https://hbr.org/2021/04/how-to-calculate-customer-lifetime-value",
      },
      {
        text: T(
          "Destatis collects digital economy indicators showing widespread adoption of analytics software by European enterprises to monitor user conversion.",
          "Destatis erfasst Daten zur Nutzung von Web-Analytics und Vertriebssoftware in deutschen Unternehmen.",
          "Destatis publikuje wskaźniki gospodarki cyfrowej pokazujące powszechne stosowanie narzędzi analitycznych do badania konwersji przez firmy.",
        ),
        source:
          "https://www.destatis.de/DE/Themen/Wirtschaft/Unternehmen/Digitalisierung-IKT-Nutzung/_inhalt.html",
      },
      {
        text: T(
          "Product-Led Growth (PLG) strategies focus on optimizing the software user experience to drive self-serve conversions rather than relying purely on sales teams.",
          "Product-Led-Growth-Strategien optimieren das Produkterlebnis, um Abschluesse direkt in der Software ohne Vertriebler zu erzielen.",
          "Strategie Product-Led Growth stawiają na intuicyjność oprogramowania, by to sam produkt napędzał konwersję bez udziału handlowców.",
        ),
        source: "https://www.investopedia.com/terms/s/saas.asp",
      },
    ],
    simplified: [
      T(
        "Complex multi-attribution marketing channel models are simplified into clear sequential conversion steps.",
        "Komplexe Attributionsmodelle mit mehreren Kanaelen werden auf uebersichtliche Trichterstufen vereinfacht.",
        "Złożone wielokanałowe modele atrybucji marketingowej uproszczono do czytelnych, sekwencyjnych kroków lejka.",
      ),
    ],
  },
};
