import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function PacketSwitchingMeshDiagram({ lang, step }: DiagramProps) {
  const name = lang === "pl" ? "Kasia" : lang === "de" ? "Klara" : "Kriti";
  const label = lang === "pl" ? "Kasia i komutacja pakietów: decentralizacja i routing danych" : lang === "de" ? "Klara und Paketvermittlung: Dezentrale Netze und dynamisches Routing" : "Kriti and packet switching: decentralized networks and resilient dynamic routing";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#06b6d4" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#0e7490" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#0891b2" stroke="#06b6d4" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#cffafe">{name}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ecfeff">
          🌐 {lang === "pl" ? "Internet i Komutacja Pakietów" : lang === "de" ? "Das Internet und Paketvermittlung" : "Packet-Switched Networks"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#0891b2" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="16">📦 ➡️ 🔀 ➡️ 🛰️</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#22d3ee">
            {lang === "pl" ? "Dynamiczny routing i odporność na awarie" : lang === "de" ? "Dynamische Pfadwahl und Ausfallsicherheit" : "Decentralized Dynamic Routing"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#164e63" />
          <text x="250" y="170" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Brak jednego punktu awarii" : lang === "de" ? "Kein zentraler Ausfallpunkt" : "No Single Point of Failure"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#cffafe">
            {lang === "pl" ? "Pakiety omijają uszkodzone węzły sieci" : lang === "de" ? "Datenpakete umgehen blockierte Knoten" : "Packets dynamically bypass severed links"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CircuitVsPacketSwitchingDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Komutacja łączy kontra komutacja pakietów" : lang === "de" ? "Leitungsvermittlung gegen Paketvermittlung" : "Circuit switching versus packet switching efficiency";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="140" height="65" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="14">📞 🔒</text>
        <text x="110" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#991b1b">Circuit Switching</text>
        <text x="110" y="102" textAnchor="middle" fontSize="8" fill="#b91c1c">Dedicated line: blocked if cut</text>

        <rect x="220" y="45" width="140" height="65" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
        <text x="290" y="70" textAnchor="middle" fontSize="14">📦 🔀</text>
        <text x="290" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#155e75">Packet Switching</text>
        <text x="290" y="102" textAnchor="middle" fontSize="8" fill="#0e7490">Shared lines: auto re-routed</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#1e293b" />
          <text x="200" y="150" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#38bdf8">
            Statistical Multiplexing Maximizes Bandwidth
          </text>
          <text x="200" y="165" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl" ? "Miliony użytkowników dzielą te same kable bez marnowania pustego pasma" : lang === "de" ? "Millionen Nutzer teilen Leitungen ohne Leerlauf-Verschwendung" : "Multiple data streams interleave across common optical fibers"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#0e7490" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Fundament odporności stworzony w ramach projektu ARPANET" : lang === "de" ? "ARPANET schuf das unzerstoerbare digitale Netz" : "Created under ARPANET to survive extreme disruptions"}
          </text>
        </g>
      )}
    </svg>
  );
}

function TcpIpProtocolStackDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Stos protokołów TCP/IP i otwarte standardy sieciowe" : lang === "de" ? "TCP/IP-Protokollstapel und offene Standards" : "TCP/IP protocol stack and open interoperable standards";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <rect x="80" y="40" width="240" height="22" rx="4" fill="#0891b2" />
        <text x="200" y="55" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">Application: HTTP, DNS, SMTP</text>

        <rect x="80" y="66" width="240" height="22" rx="4" fill="#0284c7" />
        <text x="200" y="81" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">Transport: TCP (Reliable Transmission)</text>

        <rect x="80" y="92" width="240" height="22" rx="4" fill="#2563eb" />
        <text x="200" y="107" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">Internet: IP (Global Addressing)</text>

        <rect x="80" y="118" width="240" height="22" rx="4" fill="#475569" />
        <text x="200" y="133" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">Physical Link: Fiber, Copper, Wi-Fi</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="150" width="320" height="38" rx="6" fill="#1e293b" />
          <text x="200" y="167" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#38bdf8">
            The Hourglass Model: Anyone Can Build on Open Protocols
          </text>
          <text x="200" y="180" textAnchor="middle" fontSize="8" fill="#e2e8f0">
            {lang === "pl" ? "Żadna firma nie jest właścicielem protokołu IP; każdy może tworzyć aplikacje" : lang === "de" ? "Niemand besitzt IP: Universelle Basis fuer weltweite Innovation" : "Permissionless innovation allows anyone to invent services without gatekeepers"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e3a8a" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Vint Cerf i Bob Kahn zunifikowali wszystkie komputery świata" : lang === "de" ? "Cerf und Kahn verbanden alle Rechner zu einem Netz" : "Vint Cerf and Bob Kahn unified diverse machines into one network"}
          </text>
        </g>
      )}
    </svg>
  );
}

function TimBernersLeeWebDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Tim Berners-Lee i World Wide Web: hipertekst i wolna licencja CERN" : lang === "de" ? "Tim Berners-Lee und das World Wide Web: Hypertext und freie CERN-Lizenz" : "Tim Berners-Lee and the World Wide Web: hypertext and CERN's royalty-free release";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fdf4ff" stroke="#a21caf" strokeWidth="2" />
      <g>
        <circle cx="100" cy="85" r="30" fill="#fae8ff" stroke="#a21caf" strokeWidth="2" />
        <text x="100" y="80" textAnchor="middle" fontSize="18">🔗 📄</text>
        <text x="100" y="100" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#701a75">HTML & URLs</text>

        <rect x="230" y="60" width="130" height="55" rx="6" fill="#701a75" />
        <text x="295" y="83" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">Royalty-Free (1993)</text>
        <text x="295" y="100" textAnchor="middle" fontSize="8" fill="#f5d0fe">CERN gifted Web to humanity</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f472b6">
            A Public Knowledge Commons for the Entire Planet
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl" ? "Gdyby Web był opatentowany, internet byłby podzielony na płatne silosy" : lang === "de" ? "Waer das Web patentiert worden, gaebe es nur getrennte Bezahlsilos" : "If proprietary, the web would have fractured into balkanized commercial silos"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#86198f" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Miliardy ludzi zyskały bezpłatny dostęp do bibliotek i wiedzy" : lang === "de" ? "Milliarden Menschen erhielten freien Zugang zum Weltwissen" : "Universal access democratized human scientific and civic discourse"}
          </text>
        </g>
      )}
    </svg>
  );
}

function GlobalInterconnectedEconomyDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Globalna gospodarka cyfrowa: platformy, praca zdalna i handel" : lang === "de" ? "Globale digitale Wirtschaft: Plattformen und Remote-Arbeit" : "Global digital economy: platforms, global coordination, and distributed work";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <g>
        <circle cx="200" cy="80" r="34" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">🌍 💻</text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#15803d">Global Network</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#15803d" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Geography Decoupled From Economic Contribution
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#bbf7d0">
            {lang === "pl" ? "Programistka z Krakowa i inżynier z Pune mogą tworzyć wspólny system w czasie rzeczywistym" : lang === "de" ? "Ingenieure weltweit koennen in Echtzeit am selben Projekt arbeiten" : "Collaborators on opposite sides of the globe synchronize effort at speed-of-light latencies"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Internet stał się nerwowym układem całej ludzkości" : lang === "de" ? "Das Internet wurde zum zentralen Nervensystem der Menschheit" : "The Internet became the primary nervous system of human civilization"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [nodesOnline, setNodesOnline] = useState(2);
  const [severedPath, setSeveredPath] = useState(false);
  const throughput = nodesOnline * 250;
  const isMeshResilient = nodesOnline >= 5 && severedPath;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Mesh Network Nodes: {nodesOnline} | Throughput: {throughput} Mbps | Severed Link Bypassed: {severedPath ? "YES" : "NO"}
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            const next = Math.min(5, nodesOnline + 1);
            setNodesOnline(next);
            if (next >= 5 && severedPath) onDone?.();
          }}
        >
          Add Distributed Router Node
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setSeveredPath(true);
            if (nodesOnline >= 5) onDone?.();
          }}
        >
          Simulate Undersea Cable Cut (Auto-Reroute)
        </button>
      </div>
      <div style={{ padding: "12px", background: isMeshResilient ? "#eef8ef" : "#ecfeff", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {isMeshResilient
          ? "Packet-Switched Resilience Confirmed: Even with major undersea fiber severed, TCP/IP packets dynamically rerouted through secondary satellites and relays with zero data loss!"
          : "Network Active: Data packets traversing primary hops. Cut a line to test autonomous packet rerouting."}
      </div>
    </div>
  );
}

function InternetWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>Why was CERN's 1993 decision to release Tim Berners-Lee's World Wide Web software into the public domain royalty-free so consequential?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>It allowed scientists to print web pages on edible rice paper</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>It prevented proprietary corporations from locking up the web in walled commercial gardens, ensuring that anyone anywhere could build websites, browsers, and services on open protocols</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>It banned all music and video from being transmitted across phone lines</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "internet",
  story: [
    animatedBeat(
      [
        T("Meet Kriti. She presses 'Send' on a video message and marvels as it lands on her cousin's tablet in Tokyo six thousand miles away in milliseconds.", "Das ist Klara. Sie tippt auf 'Senden' und staunt, wie ihre Nachricht in Millisekunden auf einem Tablet in Tokio landet.", "Poznaj Kriti. Naciska 'Wyślij' i z zachwytem obserwuje, jak jej wiadomość wideo w ułamku sekundy dociera na tablet kuzyna w Tokio, odległy o dziesięć tysięcy kilometrów."),
        T("Before the late 1960s, telecommunications relied exclusively on rigid 'circuit switching'.", "Vor den 1960er Jahren basierte Telefonie ausschliesslich auf starrer Leitungsvermittlung.", "Do końca lat 60. XX wieku telekomunikacja opierała się wyłącznie na sztywnej komutacji łączy."),
        T("To connect two callers, telephone exchanges physically reserved a dedicated continuous copper wire; if that single wire broke, the call instantly died.", "Fuer jedes Gespraech wurde ein fester Kupferdraht reserviert; riss dieser Draht, brach das Gespraech ab.", "Aby połączyć dwóch rozmówców, centrala rezerwowała na wyłączność fizyczny kabel miedziany; jego przerwanie natychmiast zrywało połączenie."),
      ],
      PacketSwitchingMeshDiagram,
    ),
    animatedBeat(
      [
        T("Computer scientists Paul Baran and Donald Davies independently conceptualized a radically resilient alternative: packet switching.", "Paul Baran und Donald Davies erfanden unabhaengig voneinander die geniale Paketvermittlung.", "Naukowcy Paul Baran i Donald Davies niezależnie opracowali rewolucyjną koncepcję: komutację pakietów."),
        T("Instead of reserving entire circuits, messages are chopped into small digital chunks called packets, stamped with destination addresses.", "Nachrichten werden in kleine Datenpakete zerlegt, die jeweils Ziel- und Absenderadresse tragen.", "Zamiast rezerwować całe łącza, dane są dzielone na małe porcje zwane pakietami, zaopatrzone w adres docelowy."),
        T("Packets travel independently across whatever network paths are open and are assembled seamlessly in perfect order at the destination.", "Pakete reisen unabhaengig ueber freie Knotenpunkte und fuegen sich am Ziel wieder nahtlos zusammen.", "Pakiety podróżują niezależnie różnymi wolnymi trasami, a u odbiorcy łączą się na powrót w idealną całość."),
      ],
      CircuitVsPacketSwitchingDiagram,
    ),
    animatedBeat(
      [
        T("In the 1970s, Vint Cerf and Bob Kahn designed the Transmission Control Protocol and Internet Protocol (TCP/IP).", "In den 1970er Jahren entwarfen Vint Cerf und Bob Kahn die Internet-Protokolle TCP/IP.", "W latach 70. Vint Cerf i Bob Kahn opracowali protokoły TCP/IP, które zjednoczyły cyfrowy świat."),
        T("IP assigns unique numeric coordinates to every device, while TCP guarantees that dropped or garbled packets are re-transmitted automatically.", "IP vergibt weltweite Adressen, waehrend TCP dafuer sorgt, dass verlorene Pakete automatisch nachgeliefert werden.", "Protokół IP nadaje unikalny adres każdemu urządzeniu, a TCP dba o to, by zagubione pakiety zostały bezbłędnie dosłane."),
        T("Because TCP/IP was open and vendor-neutral, diverse computers manufactured by rivals could speak a universal common language.", "Da TCP/IP ein offener Standard war, konnten Rechner aller Hersteller weltweit miteinander sprechen.", "Dzięki temu, że TCP/IP był otwartym i neutralnym standardem, komputery różnych producentów mogły porozumiewać się wspólnym językiem."),
      ],
      TcpIpProtocolStackDiagram,
    ),
    animatedBeat(
      [
        T("In 1989 at CERN, British scientist Tim Berners-Lee invented the World Wide Web by marrying hypertext to the internet.", "1989 erfand Tim Berners-Lee am CERN das World Wide Web, indem er Hypertext mit dem Internet verband.", "W 1989 roku w ośrodku CERN brytyjski naukowiec Tim Berners-Lee stworzył World Wide Web, łącząc hipertekst z internetem."),
        T("He created URLs to identify resources, HTML to structure documents, and HTTP to transfer linked multimedia pages.", "Er erfand URLs als Adressen, HTML fuer Dokumente und HTTP als Uebertragungsprotokoll.", "Opracował adresy URL, język HTML do tworzenia stron oraz protokół HTTP do ich przesyłania."),
        T("Critically, in April 1993, CERN placed the web software into the public domain royalty-free, sparking an unprecedented global explosion of creativity.", "Im April 1993 schenkte das CERN das Web der Menschheit lizenzfrei, was eine weltweite Innovationswelle ausloeste.", "W kwietniu 1993 roku CERN przekazał technologię WWW do domeny publicznej całkowicie bezpłatnie, wyzwalając globalny rozkwit innowacji."),
      ],
      TimBernersLeeWebDiagram,
    ),
    animatedBeat(
      [
        T("The internet dissolved geographic distance and transformed human cooperation across every discipline.", "Das Internet ueberwand Entfernungen und revolutionierte die menschliche Zusammenarbeit grundlegend.", "Internet zniósł bariery odległości i zrewolucjonizował współpracę ludzi w każdej dziedzinie życia."),
        T("Open-source software projects, global scientific research databases, and decentralized financial transactions operate 24 hours a day.", "Open-Source-Projekte, wissenschaftliche Datenbanken und digitaler Handel laufen nun rund um die Uhr global.", "Projekty open source, globalne bazy wiedzy medycznej i międzynarodowy handel działają bez przerw przez 24 godziny na dobę."),
        T("By turning knowledge into a globally shared resource, the internet democratized learning and interconnected humanity like never before.", "Indem es Wissen fuer jeden zugaenglich machte, schuf das Netz die vernetzteste Gesellschaft der Geschichte.", "Czyniąc wiedzę wspólnym dorobkiem całej planety, internet zdemokratyzował naukę i połączył ludzkość jak żadne inne narzędzie."),
      ],
      GlobalInterconnectedEconomyDiagram,
    ),
  ],
  toyIntro: T(
    "Operate a distributed packet-switching mesh: add independent router nodes and simulate an undersea fiber cable cut to observe instantaneous packet rerouting.",
    "Bediene ein verteiltes Paketnetz: Fuege Router-Knoten hinzu und kappe ein Seekabel, um die automatische Neuverteilung der Pakete zu testen.",
    "Zarządzaj siecią komutacji pakietów: dodawaj węzły i przetnij kabel podmorski, by sprawdzić natychmiastowe samoczynne przekierowanie danych."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is packet switching fundamentally more resilient to catastrophic disruption than traditional circuit-switched telephone lines?",
        "Warum ist Paketvermittlung gegenueber Leitungsvermittlung so viel widerstandsfaehiger bei Ausfaellen?",
        "Dlaczego komutacja pakietów jest znacznie bardziej odporna na awarie niż tradycyjna komutacja łączy telefonicznych?",
      ),
      options: [
        { text: T("Packets are individually addressed digital segments that dynamically find any alternative available path through the network mesh if a link is severed", "Pakete sind eigenstaendige Datenschnipsel, die bei Kabelbruechen automatisch freie Alternativrouten durch das Netz finden", "Pakiety są niezależnymi segmentami cyfrowymi, które w razie uszkodzenia łącza automatycznie znajdują inną wolną drogę w sieci"), correct: true },
        { text: T("Packets are carried across continents in tiny backpacks worn by trained racing turtles", "Pakete werden in kleinen Rucksaecken von trainierten Rennschildkroeten transportiert", "Pakiety przenoszone są w małych plecaczkach przez wytresowane żółwie wyścigowe"), correct: false },
        { text: T("Circuit-switched lines explode whenever someone says the word 'hello' too loudly", "Telefonleitungen explodieren, sobald jemand zu laut 'Guten Tag' sagt", "Łącza komutowane wybuchają, gdy ktoś za głośno powie 'dzień dobry'"), correct: false },
      ],
      hint: T(
        "Think about decentralized mesh routing versus single point-of-failure dedicated wires.",
        "Denke an dezentrale Netzstrukturen gegenueber anfaelligen festen Standleitungen.",
        "Pomyśl o zdecentralizowanej sieci powiązań w porównaniu ze sztywnym pojedynczym kablem."),
    },
    {
      kind: "choice",
      prompt: T(
        "What fundamental role does the Transmission Control Protocol (TCP) perform in the TCP/IP suite?",
        "Welche grundlegende Aufgabe erfuellt das Transmission Control Protocol (TCP) im Internet?",
        "Jakie fundamentalne zadanie realizuje protokół TCP w pakiecie TCP/IP?",
      ),
      options: [
        { text: T("It provides reliable, ordered, and error-checked delivery of a stream of data packets, requesting re-transmission of lost chunks", "Es garantiert eine verlaessliche, vollstaendige und geordnete Uebertragung und fordert verlorene Pakete nach", "Gwarantuje niezawodne, uporządkowane i bezbłędne dostarczenie strumienia danych, żądając ponownego przesłania zgubionych pakietów"), correct: true },
        { text: T("It formats text messages exclusively using purple wingdings fonts", "Es wandelt alle Webseiten automatisch in altgriechische Hieroglyphen um", "Formatuje wszystkie wiadomości wyłącznie fioletową czcionką ze znaczkami"), correct: false },
        { text: T("It shuts down every computer in the world at midnight to save electricity", "Es schaltet puenktlich um Mitternacht alle Rechner ab, um Strom zu sparen", "Wyłącza wszystkie komputery na świecie o północy, aby oszczędzać prąd"), correct: false },
      ],
      hint: T(
        "Think about what guarantees that your downloaded file is not missing random pieces.",
        "Achte darauf, wie sichergestellt wird, dass keine Daten auf der Reise verloren gehen.",
        "Zastanów się, co sprawia, że pobrany plik nie ma brakujących fragmentów."),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze why CERN's public domain release of the World Wide Web in 1993 prevented digital balkanization.",
        "Analysiere, warum die Freigabe des Webs durch das CERN 1993 die Spaltung des Netzes verhinderte.",
        "Zbadaj, dlaczego bezpłatne udostępnienie World Wide Web przez CERN w 1993 roku zapobiegło podziałowi internetu na zamknięte strefy.",
      ),
      Widget: InternetWidget,
      hint: T(
        "Focus on open royalty-free protocols, public commons, and permissionless innovation.",
        "Achte auf lizenzfreie Standards, offenes Wissen und universelle Zugaenglichkeit.",
        "Skup się na otwartych standardach wolnych od opłat licencyjnych i swobodzie innowacji."),
    },
  ],
  askDad: T(
    "Ask your parent: Do you remember the distinct sound of a 1990s dial-up modem connecting to the internet?",
    "Frage deine Eltern: Erinnert ihr euch noch an das quietschende Einwahlgeraeusch alter Modems aus den 1990ern?",
    "Zapytaj rodziców: Czy pamiętacie charakterystyczny piskliwy dźwięk modemu telefonicznego łączącego się z internetem w latach 90.?"),
  realLife: {
    title: T(
      "Real world: CERN's Declaration of April 30, 1993",
      "Echte Welt: Die historische Erklaerung des CERN vom 30. April 1993",
      "Prawdziwy świat: Historyczna deklaracja CERN z 30 kwietnia 1993 roku",
    ),
    body: T(
      "On April 30, 1993, CERN management published an official document declaring that World Wide Web technology, including Tim Berners-Lee's basic web client, modular server, and library of common code, was placed into the public domain without royalties or licensing restrictions. Had CERN or Berners-Lee patented HTTP and HTML, the web likely would have fragmented into proprietary, incompatible networks owned by telecom monopolies. This selfless open-access gift unlocked trillions of dollars in global economic value.",
      "Am 30. April 1993 stellte das CERN-Direktorium die Web-Technologie offiziell und bedingungslos in die Public Domain. Jeder durfte Server, Browser und Codezeilen kostenlos nutzen und weiterentwickeln. Haette das CERN Patente angemeldet, waere das Netz in inkompatible Bezahldienste zerfallen. Dieses Geschenk schuf unbezahlbaren globalen Wohlstand und weltweite Bildungschancen.",
      "30 kwietnia 1993 roku dyrekcja CERN wydała oficjalny dokument przekazujący technologię World Wide Web do domeny publicznej bez jakichkolwiek opłat licencyjnych. Gdyby CERN lub Berners-Lee opatentowali protokół HTTP i język HTML, sieć podzieliłaby się na zamknięte, płatne systemy korporacji telekomunikacyjnych. Ten bezinteresowny gest stworzył podwaliny pod rozwój globalnej gospodarki wartej biliony dolarów."),
  },
  factCard: {
    claims: [
      { text: T("Paul Baran published his 11-volume RAND Corporation paper proposing distributed packet switching in August 1964.", "Paul Baran legte im August 1964 fuer die RAND Corporation die Grundlagen der Paketvermittlung vor.", "Paul Baran opublikował w sierpniu 1964 r. 11-tomową pracę dla korporacji RAND opisującą komutację pakietów."), source: "https://www.rand.org/pubs/research_memoranda/RM3420.html" },
      { text: T("The first ARPANET message between UCLA and Stanford University was transmitted on October 29, 1969, sending the letters 'L-O'.", "Die erste ARPANET-Verbindung uebertrug am 29. Oktober 1969 die Buchstaben 'L-O' zwischen UCLA und Stanford.", "Pierwsza transmisja w sieci ARPANET odbyła się 29 października 1969 r. między uniwersytetami UCLA i Stanford, przesyłając litery 'L-O'."), source: "https://www.internethalloffame.org/official-biography-leonard-kleinrock/" },
      { text: T("Vinton Cerf and Robert Kahn published 'A Protocol for Packet Network Intercommunication' (TCP) in IEEE Transactions in May 1974.", "Vint Cerf und Bob Kahn veroeffentlichten die Spezifikation von TCP im Mai 1974 im IEEE-Journal.", "Vinton Cerf i Robert Kahn opublikowali specyfikację protokołu TCP w czasopiśmie IEEE w maju 1974 r."), source: "https://doi.org/10.1109/TCOM.1974.1092259" },
      { text: T("Tim Berners-Lee submitted his proposal 'Information Management: A Proposal' at CERN in March 1989, launching the World Wide Web.", "Tim Berners-Lee reichte im Maerz 1989 am CERN seinen Entwurf fuer das World Wide Web ein.", "Tim Berners-Lee przedstawił w marcu 1989 r. w CERN projekt 'Information Management: A Proposal', dający początek WWW."), source: "https://www.w3.org/History/1989/proposal.html" },
      { text: T("CERN officially released the World Wide Web software into the public domain on April 30, 1993, making it permanently royalty-free.", "Das CERN stellte das World Wide Web am 30. April 1993 offiziell gemeinfrei und dauerhaft lizenzfrei.", "CERN oficjalnie przekazał oprogramowanie World Wide Web do domeny publicznej 30 kwietnia 1993 r. bez opłat patentowych."), source: "https://home.cern/news/news/computing/thirty-years-free-and-open-web" },
    ],
    simplified: [
      T(
        "Complex border gateway protocol routing tables, autonomous system interconnections, and fiber-optic wavelength multiplexing are made accessible through intuitive packet routing toys and clear networking principles.",
        "BGP-Routing-Tabellen und optische Wellenlaengenmultiplexing-Technik wurden in spielerische Paketrouten und klare Netzwerkprinzipien uebersetzt.",
        "Złożone tablice routingu BGP i optyczne systemy przesyłu falowego przedstawiono w postaci przystępnych symulacji przepływu pakietów i zrozumiałych reguł sieciowych."),
    ],
  },
};
