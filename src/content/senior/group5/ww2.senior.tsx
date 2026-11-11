import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function WW2MobilizationDiagram({ lang, step }: DiagramProps) {
  const aishName = lang === "pl" ? "Ania" : lang === "de" ? "Anna" : "Aish";
  const label =
    lang === "pl"
      ? "Ania bada II wojnę światową: obronę praw człowieka, Powszechną Deklarację i porozumienie z Bretton Woods"
      : lang === "de"
        ? "Anna analysiert den Zweiten Weltkrieg: Menschenrechte, Allgemeine Erklaerung und das Bretton-Woods-System"
        : "Aish analyzing World War 2: human rights defense, the Universal Declaration, and the Bretton Woods system";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#3b82f6" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#1e3a8a" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#2563eb"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#bfdbfe">
          {aishName}
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
          stroke="#3b82f6"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dbeafe">
          🛡️{" "}
          {lang === "pl"
            ? "Prawa Człowieka i Ład Powojenny"
            : lang === "de"
              ? "Menschenrechte und Friedensordnung"
              : "Human Rights & Postwar Order"}
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
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="16">
            🕊️ 📜 🏦
          </text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#60a5fa">
            {lang === "pl"
              ? "Deklaracja Praw • Bretton Woods"
              : lang === "de"
                ? "Menschenrechtscharta • Bretton Woods"
                : "Universal Declaration • Bretton Woods"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#1e3a8a" />
          <text
            x="250"
            y="170"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Godność człowieka ponad władzą państwa"
              : lang === "de"
                ? "Unantastbare Wuerde des Menschen"
                : "Inherent human dignity above the state"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#bfdbfe">
            {lang === "pl"
              ? "1948: Nigdy więcej totalitarnego terroru"
              : lang === "de"
                ? "1948: Nie wieder totalitaerer Terror"
                : "1948: A shared moral baseline for all nations"}
          </text>
        </g>
      )}
    </svg>
  );
}

function TotalWarMobilizationDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Mobilizacja gospodarcza: fabryki czołgów, reglamentacja żywności i obligacje wojenne"
      : lang === "de"
        ? "Wirtschaftliche Totalmobilmachung: Panzerbau, Rationierung und Kriegsanleihen"
        : "Total war mobilization: factory conversion, consumer rationing, and victory bonds";

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
      <g>
        <rect
          x="40"
          y="55"
          width="130"
          height="65"
          rx="6"
          fill="#eff6ff"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <text x="105" y="80" textAnchor="middle" fontSize="16">
          🏭 ✈️
        </text>
        <text x="105" y="100" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#1e40af">
          Factory Conversion
        </text>
        <text x="105" y="112" textAnchor="middle" fontSize="7" fill="#1d4ed8">
          Cars to bombers
        </text>

        <rect
          x="230"
          y="55"
          width="130"
          height="65"
          rx="6"
          fill="#fef2f2"
          stroke="#dc2626"
          strokeWidth="1.5"
        />
        <text x="295" y="80" textAnchor="middle" fontSize="16">
          🥩 ⛽
        </text>
        <text x="295" y="100" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#991b1b">
          Ration Books
        </text>
        <text x="295" y="112" textAnchor="middle" fontSize="7" fill="#7f1d1d">
          Conserving raw materials
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#60a5fa">
            Entire civilian industries repurposed for Allied defense
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl"
              ? "Miliony kobiet weszły do fabryk, by podtrzymać produkcję i zaopatrzenie"
              : lang === "de"
                ? "Millionen Frauen arbeiteten in Fabriken, um die Produktion zu sichern"
                : "Millions of women entered industrial workshops to sustain production"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e3a8a" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Przemysłowa potęga i sojusze przesądziły o pokonaniu tyranii"
              : lang === "de"
                ? "Industrielle Kapazitaet und Buendnisse besiegten den Faschismus"
                : "Allied industrial capacity and unified resolve defeated authoritarian tyranny"}
          </text>
        </g>
      )}
    </svg>
  );
}

function UniversalDeclarationCharterDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Powszechna Deklaracja Praw Człowieka z 1948 roku: Eleanor Roosevelt i René Cassin"
      : lang === "de"
        ? "Allgemeine Erklaerung der Menschenrechte 1948: Eleanor Roosevelt und René Cassin"
        : "The 1948 Universal Declaration of Human Rights: Eleanor Roosevelt and René Cassin";

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
      <g>
        <circle cx="100" cy="90" r="34" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="100" y="85" textAnchor="middle" fontSize="18">
          📜 ✨
        </text>
        <text x="100" y="105" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#15803d">
          UDHR 1948
        </text>

        <rect x="230" y="65" width="130" height="55" rx="6" fill="#15803d" />
        <text x="295" y="88" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
          Article 1
        </text>
        <text x="295" y="104" textAnchor="middle" fontSize="8" fill="#dcfce7">
          Free & equal in dignity
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="44" rx="6" fill="#14532d" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Human rights belong to individuals, not granted by government whims
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#bbf7d0">
            {lang === "pl"
              ? "Reakcja na zbrodnie Holokaustu: prawa człowieka są niezbywalne i uniwersalne"
              : lang === "de"
                ? "Antwort auf den Holocaust: Grundrechte sind unveraeusserlich und universal"
                : "Direct response to the Holocaust: fundamental rights are inherent, universal, and inalienable"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Żadne państwo nie ma prawa deptać godności swoich obywateli"
              : lang === "de"
                ? "Kein Staat darf die Wuerde seiner Buerger antasten"
                : "No sovereign border shields governments from accountability for human rights abuses"}
          </text>
        </g>
      )}
    </svg>
  );
}

function BrettonWoodsMonetaryOrderDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "System z Bretton Woods z 1944 roku: powołanie MFW, Banku Światowego i stabilizacja kursów"
      : lang === "de"
        ? "Bretton-Woods-Konferenz 1944: IWF, Weltbank und waehrungspolitische Stabilitaet"
        : "The 1944 Bretton Woods conference: IMF, World Bank, and rules-based monetary order";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fefce8"
        stroke="#ca8a04"
        strokeWidth="2"
      />
      <g>
        <circle cx="100" cy="90" r="32" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
        <text x="100" y="85" textAnchor="middle" fontSize="18">
          🏛️ 💵
        </text>
        <text x="100" y="105" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#854d0e">
          Bretton Woods
        </text>

        <rect x="230" y="65" width="130" height="55" rx="6" fill="#854d0e" />
        <text x="295" y="88" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
          IMF & World Bank
        </text>
        <text x="295" y="104" textAnchor="middle" fontSize="8" fill="#fef08a">
          Predictable trade exchange
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fef08a">
            Preventing the competitive currency devaluations of the 1930s
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl"
              ? "Stabilne kursy walutowe i pomoc finansowa zapobiegły wojnom celnym"
              : lang === "de"
                ? "Feste Wechselkurse verhinderten erneute Handelskriege"
                : "Pegged exchange rates and emergency lending prevented destructive trade wars"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#ca8a04" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Współpraca gospodarcza jako fundament trwałego pokoju"
              : lang === "de"
                ? "Wirtschaftliche Kooperation als Pfeiler dauerhaften Friedens"
                : "Economic interdependence and financial stability underpin long-term peace"}
          </text>
        </g>
      )}
    </svg>
  );
}

function AtomicAgeLegacyDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Era atomowa i Organizacja Narodów Zjednoczonych: odpowiedzialność za przyszłość planety"
      : lang === "de"
        ? "Das Atomzeitalter und die Vereinten Nationen: Verantwortung fuer die Zukunft"
        : "The atomic age and the United Nations: planetary responsibility and deterrence";

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
      <g>
        <circle cx="200" cy="80" r="34" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">
          🕊️ 🌐
        </text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#581c87">
          United Nations
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#581c87" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            The UN Charter (1945): To save succeeding generations from the scourge of war
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#e9d5ff">
            {lang === "pl"
              ? "Broń jądrowa sprawiła, że wojna totalna stała się samobójstwem gatunku"
              : lang === "de"
                ? "Atomwaffen machten den totalen Krieg zum globalen Suizid"
                : "Nuclear deterrence rendered total world war mutually assured destruction"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Obrona praw człowieka i instytucji międzynarodowych to ciągły obowiązek każdego pokolenia"
              : lang === "de"
                ? "Der Schutz der Menschenrechte ist eine staendige Aufgabe aller Generationen"
                : "Guarding human rights and rules-based diplomacy requires eternal civic vigilance"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [hasFreePress, setHasFreePress] = useState(false);
  const [hasFairCourts, setHasFairCourts] = useState(false);
  const [hasUniversalCharter, setHasUniversalCharter] = useState(false);

  let libertyScore = 0;
  if (hasFreePress) libertyScore += 33;
  if (hasFairCourts) libertyScore += 33;
  if (hasUniversalCharter) libertyScore += 34;

  const isFullyDefended = hasFreePress && hasFairCourts && hasUniversalCharter;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Civil Liberties Defense Score: {libertyScore}/100 | Status:{" "}
        {isFullyDefended ? "Protected Under Law" : "Vulnerable to Abuse"}
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setHasFreePress(true);
            setHasFairCourts(true);
            setHasUniversalCharter(true);
            onDone?.();
          }}
        >
          Activate All Three Pillars (100%)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setHasFreePress(false);
            setHasFairCourts(false);
            setHasUniversalCharter(false);
          }}
        >
          Remove Protections (0%)
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: isFullyDefended ? "#eef8ef" : "#fef2f2",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {isFullyDefended
          ? "Robust Human Rights Shield: Universal Charter, independent courts, and open investigative reporting ensure human dignity cannot be stripped away by authoritarian regimes!"
          : "Activate all institutional pillars to erect an unyielding legal defense against tyranny and state overreach."}
      </div>
    </div>
  );
}

function WW2Widget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        What core philosophical principle was established by the 1948 Universal Declaration of Human
        Rights?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Only citizens who own three bicycles are permitted to speak in public parks
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        Every human being is born free and equal in dignity and rights, and these fundamental rights
        exist prior to and above the power of any national government
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Passports must be written using fluorescent glow-in-the-dark paint
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "ww2",
  story: [
    animatedBeat(
      [
        T(
          "Meet Aish. She visits the United Nations headquarters and gazes at the opening words of the 1948 Universal Declaration of Human Rights.",
          "Das ist Anna. Sie besucht das UN-Hauptquartier und liest die ersten Zeilen der Allgemeinen Erklaerung der Menschenrechte von 1948.",
          "Poznaj Anię. Odwiedza siedzibę ONZ i czyta pierwsze słowa Powszechnej Deklaracji Praw Człowieka z 1948 roku.",
        ),
        T(
          "World War 2 was the deadliest conflict in human history, claiming an estimated 70 to 85 million lives across every continent.",
          "Der Zweite Weltkrieg war der toedlichste Konflikt der Geschichte mit geschaetzten 70 bis 85 Millionen Opfern.",
          "II wojna światowa była najkrwawszym konfliktem w dziejach ludzkości, pochłaniając od 70 do 85 milionów ofiar na wszystkich kontynentach.",
        ),
        T(
          "It unmasked the horrors of brutal dictatorships, the state-sponsored Holocaust, and the devastating advent of atomic weapons.",
          "Er zeigte die Schrecken brutaler Diktaturen, den fabriksmaessigen Holocaust und den Eintritt in das Atomzeitalter.",
          "Obnażyła potworny koszmar bezwzględnych dyktatur, zaplanowany przez państwo Holokaust i nadejście broni atomowej.",
        ),
      ],
      WW2MobilizationDiagram,
    ),
    animatedBeat(
      [
        T(
          "Defeating Axis fascism required the total economic mobilization of Allied civilian economies.",
          "Der Sieg ueber den Faschismus verlangte die voellige wirtschaftliche Mobilisierung der Alliierten.",
          "Pokonanie państw Osi wymagało całkowitego przestawienia gospodarek państw alianckich na cele obronne.",
        ),
        T(
          "Car assembly lines ceased commercial automobile sales, manufacturing thousands of heavy bombers, tanks, and transport trucks instead.",
          "Autofabriken bauten keine Zivilwagen mehr, sondern stattdessen tausende Bomber, Panzer und Militaerfahrzeuge.",
          "Linie montażowe wstrzymały produkcję samochodów osobowych, wytwarzając w zamian dziesiątki tysięcy bombowców, czołgów i ciężarówek.",
        ),
        T(
          "Governments implemented strict food and gasoline rationing coupons, while citizens purchased 'Victory Bonds' to fund defense outlays.",
          "Regierungen fuehrten Bezugsscheine fuer Benzin und Lebensmittel ein, waehrend Buerger Kriegsanleihen kauften.",
          "Wprowadzono reglamentację paliwa i żywności na kartki, a obywatele masowo kupowali obligacje wojenne, finansując wysiłek armii.",
        ),
      ],
      TotalWarMobilizationDiagram,
    ),
    animatedBeat(
      [
        T(
          "In the ashes of total defeat, world leaders resolved that state sovereignty could never again be an excuse for brutal atrocities against human beings.",
          "Aus den Truemmern entstand der weltweite Konsens: Kein Staat darf je wieder Verbrechen mit Souveraenitaet rechtfertigen.",
          "Na zgliszczach wojny narodziło się przekonanie: suwerenność państwowa nigdy więcej nie może służyć za parawan dla ludobójstwa.",
        ),
        T(
          "Under the visionary leadership of Eleanor Roosevelt and René Cassin, the UN General Assembly adopted the Universal Declaration of Human Rights in 1948.",
          "Unter Fuehrung von Eleanor Roosevelt verabschiedete die UN 1948 die Allgemeine Erklaerung der Menschenrechte.",
          "Pod przewodnictwem Eleanor Roosevelt Zgromadzenie Ogólne ONZ uchwaliło w 1948 r. Powszechną Deklarację Praw Człowieka.",
        ),
        T(
          "Its fundamental premise is that every human being possesses inalienable rights, dignity, and equality that no government may legally revoke.",
          "Ihr Kernsatz lautet: Jeder Mensch besitzt unveraeusserliche Rechte und Wuerde, die keine Regierung je aberkennen darf.",
          "Jej fundamentem jest zasada, że każdy człowiek rodzi się wolny i równy w swej godności, a żadne prawo państwowe nie może tego odebrać.",
        ),
      ],
      UniversalDeclarationCharterDiagram,
    ),
    animatedBeat(
      [
        T(
          "Recognizing that economic instability had fueled fascist extremism in the 1930s, delegates gathered at Bretton Woods, New Hampshire, in July 1944.",
          "Um die wirtschaftlichen Ursachen von Faschismus und Krisen zu beseitigen, trafen sich 1944 Delegierte in Bretton Woods.",
          "Pamiętając, że kryzys gospodarczy lat 30. utorował drogę totalitaryzmowi, delegaci zebrali się w lipcu 1944 r. w Bretton Woods.",
        ),
        T(
          "They founded the International Monetary Fund (IMF) and the World Bank to rebuild war-torn infrastructure and maintain currency stability.",
          "Sie gruendeten den Internationalen Waehrungsfonds (IWF) und die Weltbank, um Stabilitaet und Wiederaufbau zu sichern.",
          "Powołali Międzynarodowy Fundusz Walutowy (MFW) oraz Bank Światowy, by wspierać odbudowę zniszczeń i stabilizować waluty.",
        ),
        T(
          "By linking major currencies to gold-backed reserves and reducing protectionist tariffs, Bretton Woods laid the groundwork for modern trade.",
          "Durch feste Wechselkurse und Zollsenkungen schuf Bretton Woods das Fundament fuer den modernen Welthandel.",
          "Wiążąc waluty z rezerwami złota i obniżając cła zaporowe, porozumienie z Bretton Woods stworzyło ramy współczesnego handlu globalnego.",
        ),
      ],
      BrettonWoodsMonetaryOrderDiagram,
    ),
    animatedBeat(
      [
        T(
          "World War 2 transformed our moral, legal, and economic architecture forever.",
          "Der Zweite Weltkrieg praegte unsere moralische, rechtliche und wirtschaftliche Ordnung bis heute.",
          "II wojna światowa nieodwracalnie przekształciła moralną, prawną i gospodarczą architekturę naszej cywilizacji.",
        ),
        T(
          "The United Nations and international tribunals in Nuremberg established the legal concept of 'crimes against humanity' for the first time.",
          "Die UN und die Nuernberger Prozesse fuehrten erstmals das Rechtskonzept der 'Verbrechen gegen die Menschlichkeit' ein.",
          "Powołanie ONZ i procesy norymberskie po raz pierwszy wprowadziły do prawa międzynarodowego pojęcie 'zbrodni przeciwko ludzkości'.",
        ),
        T(
          "Defending these hard-won institutions of human rights, free speech, and rules-based international law remains the solemn duty of every new generation.",
          "Diese muehsam erkämpften Rechte auf Freiheit, Menschenwuerde und Voelkerrecht taeglich zu verteidigen, bleibt unsere Pflicht.",
          "Obrona tych wywalczonych instytucji, czyli godności człowieka, wolności słowa i rządów prawa, pozostaje najważniejszym obowiązkiem każdego pokolenia.",
        ),
      ],
      AtomicAgeLegacyDiagram,
    ),
  ],
  toyIntro: T(
    "Construct the Human Rights Shield: activate the three essential institutional pillars (free press, fair courts, universal charter) to secure civil liberties.",
    "Errichte den Schutzschild der Menschenrechte: Aktiviere freie Presse, unabhaengige Gerichte und Grundrechte, um Freiheit zu schuetzen.",
    "Zbuduj Tarczę Praw Człowieka: uruchom trzy filary instytucjonalne (wolne media, niezawisłe sądy i deklarację praw), by zabezpieczyć wolność obywateli.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What unprecedented legal doctrine was affirmed by the Nuremberg Trials and the 1948 Universal Declaration of Human Rights?",
        "Welcher grundlegende Rechtsgrundsatz wurde durch Nuernberg und die Menschenrechtserklaerung von 1948 geschaffen?",
        "Jaka bezprecedensowa doktryna prawna została potwierdzona w Norymberdze i Powszechnej Deklaracji Praw Człowieka z 1948 roku?",
      ),
      options: [
        {
          text: T(
            "That fundamental human rights and dignity are inalienable and universal, superseding national state sovereignty and making leaders accountable for crimes against humanity",
            "Dass grundlegende Menschenrechte universal sind, ueber staatlicher Souveraenitaet stehen und Fuehrer fuer Verbrechen haftbar machen",
            "Że niezbywalne prawa człowieka i godność stoją ponad suwerennością państw, a przywódcy ponoszą osobistą odpowiedzialność za zbrodnie przeciw ludzkości",
          ),
          correct: true,
        },
        {
          text: T(
            "That all courtroom gavels must be carved out of ancient volcanic pumice stone",
            "Dass Richterhaemmer nur aus vulkanischem Bimsstein geschnitzt werden duerfen",
            "Że sędziowskie młotki muszą być rzeźbione wyłącznie w wulkanicznym pumeksie",
          ),
          correct: false,
        },
        {
          text: T(
            "That governments are legally required to give every family a polka-dot teapot",
            "Dass Staaten verpflichtet sind, jeder Familie eine gepunktete Teekanne zu schenken",
            "Że rządy mają prawny obowiązek podarować każdej rodzinie imbryk w kropki",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about why 'following orders' is no longer a valid legal defense for atrocities.",
        "Denke darueber nach, warum der 'Befehlsnotstand' schwere Verbrechen nicht laenger rechtfertigen kann.",
        "Pomyśl o tym, dlaczego 'wykonywanie rozkazów' przestało być usprawiedliwieniem dla zbrodni państwowych.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why was the Bretton Woods conference of 1944 convened in the midst of World War 2?",
        "Warum fand die Konferenz von Bretton Woods 1944 mitten im Zweiten Weltkrieg statt?",
        "Dlaczego konferencję w Bretton Woods zwołano w lipcu 1944 roku, jeszcze przed zakończeniem II wojny światowej?",
      ),
      options: [
        {
          text: T(
            "To construct a stable international monetary order with the IMF and World Bank, preventing the competitive devaluations and trade wars that helped trigger WW2",
            "Um mit IWF und Weltbank eine stabile Waehrungsordnung zu schaffen und Handelskriege zu verhindern",
            "Aby stworzyć stabilny międzynarodowy ład finansowy z MFW i Bankiem Światowym, zapobiegając wojnom celnym, które doprowadziły do wybuchu wojny",
          ),
          correct: true,
        },
        {
          text: T(
            "To organize a secret international pie-baking contest in New Hampshire",
            "Um einen geheimen Kuchenback-Wettbewerb in New Hampshire abzuhalten",
            "Aby zorganizować międzynarodowy konkurs wypieku szarlotki w New Hampshire",
          ),
          correct: false,
        },
        {
          text: T(
            "To decide which side of paper currency looks prettier in green ink",
            "Um abzustimmen, welche Seite von Geldscheinen in gruener Farbe huebscher aussieht",
            "Aby ustalić, która strona banknotów dolarowych prezentuje się ładniej w zielonym druku",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Look for the institutional mechanisms that govern international monetary exchange and reconstruction loans.",
        "Achte auf Mechanismen fuer Waehrungsstabilitaet und Kredite zum Wiederaufbau.",
        "Zwróć uwagę na instytucje stabilizacji kursów walutowych i kredyty na powojenną odbudowę.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the core philosophical breakthrough of the 1948 Universal Declaration of Human Rights.",
        "Bestimme den philosophischen Kern der Allgemeinen Erklaerung der Menschenrechte von 1948.",
        "Wskaż fundamentalny przełom filozoficzny Powszechnej Deklaracji Praw Człowieka z 1948 roku.",
      ),
      Widget: WW2Widget,
      hint: T(
        "Focus on inherent individual human dignity standing above the authority of national governments.",
        "Achte auf die unantastbare Wuerde des Menschen gegenueber staatlicher Willkuer.",
        "Skup się na przyrodzonej godności jednostki, stojącej ponad samowolą władzy państwowej.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Why is the Universal Declaration of Human Rights considered one of the most important documents ever written in human history?",
    "Frage deine Eltern: Warum gilt die Allgemeine Erklaerung der Menschenrechte als eines der wichtigsten Dokumente der Menschheit?",
    "Zapytaj rodziców: Dlaczego Powszechna Deklaracja Praw Człowieka z 1948 roku jest uważana za jeden z najważniejszych dokumentów w dziejach ludzkości?",
  ),
  realLife: {
    title: T(
      "Real world: Mary Ann Glendon's 'A World Made New: Eleanor Roosevelt and the Universal Declaration of Human Rights'",
      "Echte Welt: Mary Ann Glendon ueber Eleanor Roosevelt und die Charta der Menschenrechte",
      "Prawdziwy świat: Mary Ann Glendon o Eleanor Roosevelt i Deklaracji Praw Człowieka",
    ),
    body: T(
      "In her acclaimed 2001 study 'A World Made New', Harvard law professor Mary Ann Glendon chronicled how Eleanor Roosevelt united diplomats from vastly different cultures, including China, Lebanon, France, and Chile, to draft the 1948 Universal Declaration of Human Rights. Despite intense geopolitical tensions at the onset of the Cold War, the committee forged an enduring consensus that recognized the indivisible dignity of every human being on Earth.",
      "In ihrem Werk 'A World Made New' (2001) beschreibt Harvard-Professorin Mary Ann Glendon, wie Eleanor Roosevelt Diplomaten aus China, dem Libanon, Frankreich und Chile vereinte, um 1948 die Menschenrechtscharta zu entwerfen. Trotz des beginnenden Kalten Krieges schufen sie ein zeitloses Dokument menschlicher Wuerde.",
      "W wybitnej książce 'A World Made New' (2001) profesor prawa z Harvardu Mary Ann Glendon opisała, jak Eleanor Roosevelt zjednoczyła dyplomatów z Chin, Libanu, Francji i Chile przy tworzeniu Deklaracji z 1948 r. Mimo rodzącej się zimnej wojny udało się osiągnąć bezprecedensowy konsensus potwierdzający nienaruszalną godność każdego człowieka.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "The Universal Declaration of Human Rights was adopted by the UN General Assembly in Paris on December 10, 1948, via Resolution 217 A.",
          "Die UN-Generalversammlung verabschiedete die Menschenrechtserklaerung am 10. Dezember 1948 in Paris.",
          "Zgromadzenie Ogólne ONZ uchwaliło Powszechną Deklarację Praw Człowieka w Paryżu 10 grudnia 1948 r. rezolucją 217 A.",
        ),
        source: "https://www.un.org/en/about-us/universal-declaration-of-human-rights",
      },
      {
        text: T(
          "The Bretton Woods conference took place in July 1944 with 730 delegates from 44 Allied nations, creating the IMF and the World Bank.",
          "Im Juli 1944 gruendeten 44 Nationen in Bretton Woods den Internationalen Waehrungsfonds und die Weltbank.",
          "W lipcu 1944 r. w Bretton Woods 730 delegatów z 44 państw alianckich powołało do życia MFW i Bank Światowy.",
        ),
        source: "https://www.imf.org/en/About/Factsheets/Sheets/2023/02/10/imf-at-a-glance",
      },
      {
        text: T(
          "Mary Ann Glendon published 'A World Made New: Eleanor Roosevelt and the Universal Declaration of Human Rights' with Random House in 2001.",
          "Mary Ann Glendons 'A World Made New' ueber Eleanor Roosevelt erschien 2001 bei Random House.",
          "Książka Mary Ann Glendon 'A World Made New' ukazała się w 2001 r. nakładem Random House.",
        ),
        source:
          "https://www.penguinrandomhouse.com/books/61907/a-world-made-new-by-mary-ann-glendon/",
      },
      {
        text: T(
          "The Nuremberg International Military Tribunal operated from November 1945 to October 1946, establishing individual criminal accountability under international law.",
          "Die Nuernberger Prozesse von 1945/46 begruendeten das moderne Voelkerstrafrecht fuer Einzeltaeter.",
          "Międzynarodowy Trybunał Wojskowy w Norymberdze (1945-1946) po raz pierwszy ustanowił indywidualną odpowiedzialność karną w prawie międzynarodowym.",
        ),
        source: "https://www.roberthjackson.org/nuremberg-trials/",
      },
      {
        text: T(
          "Global wartime military spending during WW2 consumed over 50% of national GDP in major combatant nations including the UK, Germany, and the USSR.",
          "Grossbritannien, Deutschland und die Sowjetunion investierten im Krieg ueber 50% ihres BIP in die Ruestung.",
          "Wielka Brytania, Niemcy i ZSRR przeznaczały podczas II wojny światowej ponad 50% swojego rocznego PKB bezpośrednio na cele militarne.",
        ),
        source: "https://ourworldindata.org/military-spending",
      },
    ],
    simplified: [
      T(
        "Complex multilateral treaty covenants, central bank gold reserve parity rules, and wartime sovereign debt schedules are translated into interactive human rights defense toys and clear civic narratives.",
        "Komplexe Voelkerrechtsklauseln und historische Waehrungsverhaeltnisse wurden in interaktive Schutzschild-Spiele und packende Berichte verstaendlich aufbereitet.",
        "Skomplikowane klauzule prawa międzynarodowego i parytety rezerw walutowych przedstawiono w formie czytelnych symulacji obrony praw obywatelskich i zrozumiałej narracji.",
      ),
    ],
  },
};
