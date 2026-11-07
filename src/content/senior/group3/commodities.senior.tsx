import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function GrainSiloLaunchDiagram({ lang, step }: DiagramProps) {
  const aishName = lang === "pl" ? "Ania" : lang === "de" ? "Anna" : "Aish";
  const label = lang === "pl" ? "Ania bada globalny handel pszenicą" : lang === "de" ? "Anna analysiert den weltweiten Weizenmarkt" : "Aish researching global wheat trading";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fffbeb" stroke="#b45309" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#23383f" strokeWidth="2" />
        <path d="M 52 110 C 52 70 108 70 108 110" fill="#3b0764" />
        <circle cx="72" cy="107" r="2.5" fill="#23383f" />
        <circle cx="88" cy="107" r="2.5" fill="#23383f" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#23383f" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#d97706" stroke="#23383f" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">{aishName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#92400e">
          🌾 {lang === "pl" ? "Pszenica: Standaryzowany Surowiec" : lang === "de" ? "Weizen: Standardisierter Rohstoff" : "Standardized Global Hard Red Wheat"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#fff" stroke="#d97706" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">🚢 ⚖️ 🏭</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#b45309">
            {lang === "pl" ? "Jednolita jakość: buszel z USA = buszel z Polski" : lang === "de" ? "Auswechselbar: Scheffel aus USA = Scheffel aus Europa" : "Fungible: 1 bushel in Texas = 1 in Poland"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#065f46">
            {lang === "pl" ? "Jedna cena na giełdach całego świata" : lang === "de" ? "Ein Weltmarktpreis an Warenboersen" : "Single World Market Price"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#047857">
            {lang === "pl" ? "Brak loga i marki, decyduje surowa jakość" : lang === "de" ? "Keine Marke: Reiner Nutzwert zaehlt" : "No branding: purely traded by grade"}
          </text>
        </g>
      )}
    </svg>
  );
}

function WeatherShockDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Szok pogodowy i skok cen surowców" : lang === "de" ? "Wetterschock und Preissprung bei Agrarrohstoffen" : "Weather shocks and global commodity price swings";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="35" y="40" width="155" height="135" rx="8" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
        <text x="112" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c">
          {lang === "pl" ? "Susza / Gradobicie" : lang === "de" ? "Duerre / Ernteausfall" : "Severe Drought Shock"}
        </text>
        <text x="112" y="95" textAnchor="middle" fontSize="22">☀️ 🌾 📉</text>
        <text x="112" y="120" textAnchor="middle" fontSize="10" fill="#9f1239">
          {lang === "pl" ? "Zbiory spadają o 30%" : lang === "de" ? "Ernte sinkt um 30%" : "Crop yields drop 30%"}
        </text>
        <rect x="45" y="135" width="135" height="30" rx="4" fill="#fecdd3" />
        <text x="112" y="154" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9f1239">
          Cena: 12 $ / buszel (+100%)
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="210" y="40" width="155" height="135" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="287" y="65" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
            {lang === "pl" ? "Urodzaj i Nadmiar" : lang === "de" ? "Rekordernte" : "Bumper Harvest"}
          </text>
          <text x="287" y="95" textAnchor="middle" fontSize="22">🌧️ 🚜 📈</text>
          <text x="287" y="120" textAnchor="middle" fontSize="10" fill="#047857">
            {lang === "pl" ? "Pełne silosy na świecie" : lang === "de" ? "Silos quellen ueber" : "Global silos overflow"}
          </text>
          <rect x="220" y="135" width="135" height="30" rx="4" fill="#a7f3d0" />
          <text x="287" y="154" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065f46">
            Cena: 4 $ / buszel (-33%)
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="35" y="195" width="330" height="25" rx="4" fill="#334155" />
          <text x="200" y="212" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Nieelastyczny popyt sprawia, że drobne zmiany podaży wywołują gigantyczne wahania cen" : lang === "de" ? "Unelastische Nachfrage fuehrt bei Ernteschwankungen zu extremen Preisspruengen" : "Inelastic demand means small harvest swings trigger massive price volatility"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CommodityCategoriesDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Podział surowców: rolne, energetyczne i przemysłowe" : lang === "de" ? "Kategorien der Rohstoffe: Agrar, Energie und Metalle" : "Major commodity sectors: agriculture, energy, and industrial metals";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="95" height="80" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="82" y="70" textAnchor="middle" fontSize="18">🌾 ☕</text>
        <text x="82" y="92" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">Agriculture</text>
        <text x="82" y="110" textAnchor="middle" fontSize="8.5" fill="#b45309">Wheat, Corn, Soy</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="152" y="45" width="95" height="80" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="200" y="70" textAnchor="middle" fontSize="18">🛢️ ⚡</text>
          <text x="200" y="92" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c">Energy</text>
          <text x="200" y="110" textAnchor="middle" fontSize="8.5" fill="#991b1b">Crude Oil, Gas</text>

          <rect x="270" y="45" width="95" height="80" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <text x="317" y="70" textAnchor="middle" fontSize="18">🏗️ 🔋</text>
          <text x="317" y="92" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">Metals</text>
          <text x="317" y="110" textAnchor="middle" fontSize="8.5" fill="#0284c7">Copper, Lithium</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="145" width="320" height="60" rx="8" fill="#1e293b" />
          <text x="200" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Surowce stanowią fizyczny fundament całej cywilizacji" : lang === "de" ? "Rohstoffe bilden das physische Fundament jeder Volkswirtschaft" : "Commodities are the elemental physical building blocks of civilization"}
          </text>
          <text x="200" y="190" textAnchor="middle" fontSize="10" fill="#94a3b8">
            {lang === "pl" ? "Od nawozów po baterie do aut elektrycznych i energię cieplną" : lang === "de" ? "Von Nahrung ueber Strom bis zu Akkus fuer moderne Technologien" : "From daily bread to power grids and electric vehicle drivetrains"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CommodityArbitrageDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Globalny arbitraż wyrównujący ceny w portach" : lang === "de" ? "Globaler Arbitragehandel gleicht Preise weltweit an" : "Global arbitrage equalizing regional prices";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
      <rect x="35" y="45" width="130" height="80" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
      <text x="100" y="72" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">Port A (Rotterdam)</text>
      <text x="100" y="95" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#075985">$200 / ton</text>
      <text x="100" y="112" textAnchor="middle" fontSize="9" fill="#0284c7">Surplus wheat</text>
      {step >= 2 && (
        <g>
          <path d="M 170 85 L 230 85" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="200" y="75" textAnchor="middle" fontSize="14">🚢</text>
          <rect x="235" y="45" width="130" height="80" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="300" y="72" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">Port B (Alexandria)</text>
          <text x="300" y="95" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#991b1b">$260 / ton</text>
          <text x="300" y="112" textAnchor="middle" fontSize="9" fill="#b91c1c">Local shortage</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#0369a1" />
          <text x="200" y="174" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Arbitraż przewozi nadwyżki tam, gdzie brakuje chleba" : lang === "de" ? "Haendler transportieren Gueter dorthin, wo der Mangel am groessten ist" : "Cargo ships transport abundance to where hunger is greatest"}
          </text>
          <text x="200" y="192" textAnchor="middle" fontSize="10" fill="#bae6fd">
            {lang === "pl" ? "Ceny po odliczeniu transportu wyrównują się na całym globie" : lang === "de" ? "Preise gleichen sich abzüglich Frachtkosten weltweit an" : "Prices converge globally minus shipping freight costs"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CommodityReserveDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Strategiczne rezerwy surowcowe państw" : lang === "de" ? "Strategische Reserven zur Daempfung von Schocks" : "Strategic reserves cushioning geopolitical shocks";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <circle cx="200" cy="95" r="42" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="200" y="90" textAnchor="middle" fontSize="22">🛡️ 🛢️</text>
      <text x="200" y="112" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#5b21b6">Strategic Reserve</text>
      <g>
        <circle cx="85" cy="70" r="28" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="85" y="68" textAnchor="middle" fontSize="14">⚡</text>
        <text x="85" y="84" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#b91c1c">Embargo</text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="315" cy="70" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="315" y="68" textAnchor="middle" fontSize="14">📦</text>
          <text x="315" y="84" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#15803d">90-Day Oil</text>
          <circle cx="200" cy="165" r="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="200" y="163" textAnchor="middle" fontSize="14">🏪</text>
          <text x="200" y="179" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#92400e">Stable Power</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Rezerwy surowcowe chronią społeczeństwa przed blackoutem i głodem" : lang === "de" ? "Notfallreserven sichern Energie und Ernaehrung in schweren Krisen" : "Physical stockpiles preserve national energy and food security in crises"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [weatherCondition, setWeatherCondition] = useState<"drought" | "normal" | "bumper">("normal");
  const price = weatherCondition === "drought" ? 12 : weatherCondition === "bumper" ? 4 : 7;
  const sacks = weatherCondition === "drought" ? 20 : weatherCondition === "bumper" ? 90 : 50;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Global Wheat Harvest: {sacks}M Bushels | World Price: ${price} / bushel
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setWeatherCondition("drought");
            onDone?.();
          }}
        >
          Drought Shock (Harvest Drops)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setWeatherCondition("bumper")}
        >
          Bumper Harvest (Abundant)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setWeatherCondition("normal")}
        >
          Normal Balance
        </button>
      </div>
      <div style={{ padding: "12px", background: weatherCondition === "drought" ? "#fee2e2" : "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {weatherCondition === "drought"
          ? "Crop Failure: Inelastic food demand forces buyers to bid wheat prices up to $12 per bushel!"
          : weatherCondition === "bumper"
          ? "Abundance: Massive crop surpluses drive storage costs up and grain prices down to $4."
          : "Steady Equilibrium: Global grain harvest matches worldwide consumption smoothly."}
      </div>
    </div>
  );
}

function CommoditiesWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What defines a good as a 'commodity' in global finance?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>It has a famous celebrity endorsement</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>It is standardized and completely interchangeable (fungible) regardless of who produced it</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>It can never be sold or exported across national borders</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "commodities",
  story: [
    animatedBeat(
      [
        T("Meet Aish. She visits a giant agricultural grain silo port terminal and watches bulk freighter ships load thousands of tons of wheat.", "Das ist Anna. Sie besucht ein grosses Getreideterminal im Hafen und beobachtet Frachter beim Beladen mit Weizen.", "Poznaj Anię. Odwiedza wielki portowy elewator zbożowy i obserwuje załadunek tysięcy ton pszenicy na statki handlowe."),
        T("Unlike consumer products, wheat has no fancy logo or custom packaging: it is a standardized, interchangeable *commodity*.", "Anders als Markenprodukte hat Weizen kein Logo: Er ist ein standardisierter, austauschbarer *Rohstoff* (Commodity).", "W przeciwieństwie do produktów konsumenckich pszenica nie ma logo ani kolorowych opakowań: to standaryzowany, wymienny *surowiec*."),
        T("Whether harvested in Canada, Ukraine, or Australia, a bushel of Grade 1 milling wheat trades at the exact same global market price.", "Egal ob in Kanada, der Ukraine oder Australien geerntet: Ein Scheffel Weizen gleicher Guete kostet weltweit fast dasselbe.", "Niezależnie od tego, czy zebrano ją w Kanadzie, w Ukrainie czy w Australii, buszel pszenicy handlowy ma tę samą cenę na giełdach świata."),
      ],
      GrainSiloLaunchDiagram,
    ),
    animatedBeat(
      [
        T("Because everyone needs to eat bread every day regardless of cost, staple food demand is highly *inelastic*.", "Weil Menschen taeglich Brot zum Ueberleben brauchen, reagiert die Nachfrage nach Getreide kaum auf Preise: sie ist *unelastisch*.", "Ponieważ chleb jest podstawą wyżywienia miliardów ludzi, popyt na pszenicę jest wysoce *nieelastyczny*."),
        T("When an intense drought cuts global wheat output by just ten percent, prices on Chicago and Paris exchanges double overnight.", "Wenn eine Duerre die Ernte um nur zehn Prozent schrumpfen laesst, verdoppeln sich die Preise an den Boersen ueber Nacht.", "Gdy susza zmniejsza światowe zbiory o zaledwie dziesięć procent, ceny na giełdach w Chicago i Paryżu rosną dwukrotnie w ciągu kilku dni."),
        T("Conversely, in years of bumper harvests, massive supply gluts force prices down below the cost of diesel and fertilizer.", "Umgekehrt druecken Rekordernten bei vollen Lagern die Weltmarktpreise drastisch nach unten.", "I odwrotnie: w latach rekordowych urodzajów nadmiar ziarna spycha ceny poniżej kosztów paliwa i nawozów."),
      ],
      WeatherShockDiagram,
    ),
    animatedBeat(
      [
        T("Commodities span three essential economic categories: agricultural crops, energy fuels, and industrial metals.", "Rohstoffe gliedern sich in drei Hauptgruppen: Agrargueter, Energiequellen und Industriemetalle.", "Surowce dzielą się na trzy główne grupy: produkty rolne, nośniki energii oraz metale przemysłowe."),
        T("Crude oil and natural gas power factories, heating, and trucks, making energy prices the foundational cost of modern life.", "Erdoel und Erdgas treiben Transport und Fabriken an: Energie bestimmt die Basiskosten unseres modernen Lebens.", "Ropa naftowa i gaz ziemny napędzają transport i fabryki: ceny energii stanowią fundament kosztów nowoczesnej gospodarki."),
        T("Copper and lithium provide the physical conductivity for power lines, wind turbines, and electric vehicle batteries.", "Kupfer und Lithium sind unverzichtbar fuer Stromnetze, Windraeder und Elektroauto-Batterien.", "Miedź i lit są niezbędne do budowy sieci energetycznych, turbin wiatrowych oraz akumulatorów samochodów elektrycznych."),
      ],
      CommodityCategoriesDiagram,
    ),
    animatedBeat(
      [
        T("When prices differ between continents, maritime traders execute *arbitrage* to restore balance.", "Wenn Preise zwischen Erdteilen klaffen, nutzen internationale Haendler *Arbitrage*, um das Gleichgewicht herzustellen.", "Gdy ceny różnią się między kontynentami, międzynarodowi kupcy stosują *arbitraż*, przywracając rynkową równowagę."),
        T("They charter ships to buy surplus grain in South America at two hundred dollars and sell it where mills face shortages at two hundred sixty.", "Sie chartern Schiffe, kaufen Getreide guenstig in Suedamerika und liefern es dorthin, wo Muehlen dringend Nachschub suchen.", "Czarterują statki, kupują nadwyżki zboża w Ameryce Południowej i dostarczają je tam, gdzie młynom grozi brak mąki."),
        T("This massive global logistics engine constantly channels physical resources to where they are needed most urgently.", "Diese weltumspannende Logistik leitet Rohstoffe unablaessig dorthin, wo der Mangel am groessten ist.", "Ten potężny globalny mechanizm logistyczny nieustannie kieruje surowce w rejony, w których zapotrzebowanie jest najbardziej palące."),
      ],
      CommodityArbitrageDiagram,
    ),
    animatedBeat(
      [
        T("To safeguard against war, blockades, and natural shocks, nations maintain physical *strategic commodity reserves*.", "Um sich vor Krisen, Blockaden und Missernten zu schuetzen, halten Staaten *strategische Rohstoffreserven* bereit.", "Aby uchronić się przed wojną, przerwaniem szlaków morskich i klęskami żywiołowymi, państwa gromadzą *strategiczne rezerwy surowców*."),
        T("Underground salt caverns store ninety days of emergency petroleum, ensuring hospital generators and food delivery fleets never stop.", "Unterirdische Salzstollen lagern Erdoel fuer 90 Tage, damit Rettungswagen und Lkw im Notfall weiterfahren.", "Podziemne kawerny solne kryją zapasy ropy na co najmniej 90 dni, gwarantując ciągłość pracy karetek i transportu żywności."),
        T("Mastering the commodities market means understanding the physical heartbeat that keeps industrial society alive.", "Wer die Rohstoffmaerkte versteht, begreift den physischen Herzschlag unserer modernen Welt.", "Zrozumienie rynków surowcowych to poznanie fizycznego pulsu, który utrzymuje przy życiu całą cywilizację techniczną."),
      ],
      CommodityReserveDiagram,
    ),
  ],
  toyIntro: T(
    "Simulate global harvest shocks and watch how inelastic agricultural food demand swings world commodity grain prices.",
    "Simuliere globale Ernteschocks und beobachte, wie unelastische Nachfrage die Rohstoffpreise explodieren laesst.",
    "Zasymuluj globalne załamanie zbiorów i zobacz, jak nieelastyczny popyt na żywność wywołuje gwałtowne skoki cen surowców."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does the term 'fungibility' mean when applied to traded commodities?",
        "Was bedeutet der Begriff 'Fungibilitaet' bei gehandelten Rohstoffen?",
        "Co oznacza 'zamienność' (fungibility) w odniesieniu do towarów giełdowych?",
      ),
      options: [
        { text: T("Each unit of the commodity is completely interchangeable with any other unit of identical grade", "Jede Einheit des Rohstoffs ist mit jeder anderen Einheit gleicher Qualitaet vollkommen austauschbar", "Każda jednostka surowca danej klasy jest w pełni wymienna na dowolną inną jednostkę tego samego gatunku"), correct: true },
        { text: T("The commodity is made exclusively out of edible mushrooms", "Der Rohstoff besteht ausschliesslich aus essbaren Pilzen", "Surowiec składa się wyłącznie z jadalnych grzybów") },
        { text: T("The good cannot be traded without a personal signature from a head of state", "Die Ware darf nur mit persoenlicher Unterschrift eines Staatsoberhaupts verkauft werden", "Towar może być sprzedany wyłącznie za osobistą zgodą głowy państwa") },
      ],
      hint: T(
        "Think about whether one barrel of crude oil is functionally identical to another barrel of the same grade.",
        "Ueberlege, ob ein Fass Oel der gleichen Sorte genau dasselbe wert ist wie ein anderes.",
        "Zastanów się, czy jedna baryłka ropy danej kategorii różni się czymkolwiek od innej baryłki tego samego gatunku."),
    },
    {
      kind: "choice",
      prompt: T(
        "Why do small percentage changes in agricultural harvest yields trigger massive price swings?",
        "Warum fuehren schon kleine Ernteausfaelle zu drastischen Preisspruengen bei Grundnahrungsmitteln?",
        "Dlaczego nawet niewielkie spadki zbiorów wywołują ogromne skoki cen podstawowych płodów rolnych?",
      ),
      options: [
        { text: T("Demand for staple food is highly inelastic: people cannot simply stop eating when supplies tighten", "Die Nachfrage nach Grundnahrungsmitteln ist sehr unelastisch: Menschen muessen taeglich essen", "Popyt na podstawową żywność jest wysoce nieelastyczny: ludzie muszą jeść codziennie bez względu na cenę"), correct: true },
        { text: T("Central banks immediately destroy all paper currency during rainstorms", "Zentralbanken vernichten bei Regen sofort saemtliches Papiergeld", "Banki centralne niszczą banknoty w czasie ulewnych deszczów") },
        { text: T("Farmers refuse to accept digital bank transfers during harvest season", "Bauern verweigern waehrend der Ernte jegliche Ueberweisungen", "Rolnicy odmawiają przyjmowania przelewów bankowych w czasie żniw") },
      ],
      hint: T(
        "Think about whether a family can skip eating bread just because wheat prices rose.",
        "Bedenke, ob eine Familie auf Nahrung verzichten kann, nur weil Weizen teurer wird.",
        "Pomyśl, czy rodzina może zrezygnować z jedzenia chleba tylko dlatego, że pszenica podrożała."),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the primary legal and financial definition of a commodity.",
        "Erkenne die grundlegende Definition eines Rohstoffs an den Finanzmaerkten.",
        "Wskaż podstawową definicję surowca (commodity) na rynkach finansowych.",
      ),
      Widget: CommoditiesWidget,
      hint: T(
        "Focus on standardization, fungibility, and lack of brand differentiation.",
        "Achte auf Standardisierung, Austauschbarkeit und Markenlosigkeit.",
        "Zwróć uwagę na standaryzację, zamienność oraz brak zróżnicowania markowego."),
    },
  ],
  askDad: T(
    "Ask your parent: How do global crude oil and gas prices affect your household heating, electricity, or petrol bills?",
    "Frage deine Eltern: Wie wirken sich weltweite Erdoel- und Gaspreise auf eure Heiz-, Strom- oder Tankkosten aus?",
    "Zapytaj rodziców: W jaki sposób światowe ceny ropy i gazu wpływają na domowe rachunki za ogrzewanie, prąd i paliwo do auta?"),
  realLife: {
    title: T(
      "Real world: The Strategic Petroleum Reserve and global pipeline networks",
      "Echte Welt: Strategische Erdoelreserven und globale Pipelinenetze",
      "Prawdziwy świat: Strategiczne rezerwy ropy naftowej i rurociągi przesyłowe",
    ),
    body: T(
      "Following the 1973 OPEC oil embargo, major industrial nations established the International Energy Agency (IEA). Member nations are legally obligated to hold emergency oil stockpiles equivalent to at least 90 days of net imports. During geopolitical conflicts or hurricane shutdowns in the Gulf of Mexico, coordinated reserve releases prevent fuel shortages and ease panic spikes in transport costs.",
      "Nach dem Oelschock von 1973 gruendeten Industriestaaten die Internationale Energieagentur (IEA). Sie verpflichten sich, Notfallreserven fuer mindestens 90 Tage Oelimporte vorzuhalten. Bei Kriegen oder Naturkatastrophen daempfen koordinierte Freigaben dieser Reserven Versorgungsengpaesse und Panikpreise.",
      "Po kryzysie naftowym w 1973 roku kraje uprzemysłowione powołały Międzynarodową Agencję Energetyczną (IEA). Członkowie agencji mają obowiązek utrzymywania rezerw ropy na co najmniej 90 dni importu. W obliczu wojen lub huraganów skoordynowane uwolnienie rezerw chroni gospodarki przed paraliżem transportowym."),
  },
  factCard: {
    claims: [
      { text: T("The Chicago Board of Trade (CBOT), established in 1848, was the world's first modern centralized commodity futures exchange.", "Das 1848 gegruendete Chicago Board of Trade war die weltweit erste moderne Boerse fuer Rohstoff-Terminkontrakte.", "Utworzona w 1848 roku giełda Chicago Board of Trade (CBOT) była pierwszą na świecie scentralizowaną giełdą kontraktów terminowych na surowce."), source: "https://www.cmegroup.com/company/history.html" },
      { text: T("International Energy Agency (IEA) treaty frameworks require member states to maintain emergency public petroleum reserves covering 90 days of net oil imports.", "Abkommen der Internationalen Energieagentur verpflichten Mitgliedslaender zu Erdoelreserven fuer 90 Tage Nettoimporte.", "Porozumienia Międzynarodowej Agencji Energetycznej nakładają na państwa członkowskie obowiązek utrzymywania rezerw ropy na minimum 90 dni importu netto."), source: "https://www.iea.org/topics/oil-stocks" },
      { text: T("Destatis monitors industrial commodity imports, recording high German economic sensitivity to price shocks in fossil fuels and chemical feedstocks.", "Destatis erfasst Rohstoffimporte und belegt die hohe Abhaengigkeit der deutschen Industrie von Energie- und Metallpreisen.", "Destatis monitoruje import surowców przemysłowych, wykazując dużą wrażliwość niemieckiej gospodarki na wahania cen nośników energii i metali."), source: "https://www.destatis.de/DE/Themen/Wirtschaft/Aussenhandel/_inhalt.html" },
      { text: T("The United Nations Food and Agriculture Organization (FAO) Food Price Index tracks monthly changes in international prices of a basket of food commodities.", "Der FAO-Food-Price-Index der Vereinten Nationen misst monatlich die weltweiten Preisschwankungen wichtiger Grundnahrungsmittel.", "Wskaźnik cen żywności FAO ONZ rejestruje comiesięczne zmiany cen koszyka kluczowych surowców rolno-spożywczych na rynkach światowych."), source: "https://www.fao.org/worldfoodsituation/foodpricesindex/en/" },
      { text: T("Commodity price elasticity studies by the World Bank demonstrate that agricultural supply responds with an unavoidable seasonal biological lag to market price signals.", "Studien der Weltbank zeigen, dass das landwirtschaftliche Angebot wegen biologischer Wachstumszyklen nur zeitverzoegert auf Preise reagiert.", "Analizy Banku Światowego potwierdzają, że podaż w rolnictwie reaguje na sygnały cenowe z opóźnieniem wynikającym z naturalnego cyklu wegetacji roślin."), source: "https://www.worldbank.org/en/research/commodity-markets" },
    ],
    simplified: [
      T(
        "Complex freight tanker chartering derivatives and storage contango curves are simplified into physical port-to-port arbitrage examples.",
        "Komplexe Frachtderivate und Lageraufschlaege (Contango) wurden anhand greifbarer Hafenbeispiele vereinfacht.",
        "Złożone instrumenty pochodne stawek frachtowych i krzywe contango uproszczono do czytelnych przykładów transportu morskiego między portami."),
    ],
  },
};
