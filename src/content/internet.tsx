import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  IsolatedTapesDiagram,
  PacketSlicingDiagram,
  NetworkRoutersDiagram,
  TimBernersLeeWebDiagram,
  UnderseaFiberCablesDiagram,
} from "./internet.diagrams";
import { InternetToy } from "./internet.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <InternetToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <InternetToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "internet",
  story: [
    animatedBeat(
      [
        T(
          "For decades, computers were massive machines locked in separate basement rooms.",
          "Jahrzehntelang standen Computer als riesige Schraenke in getrennten Kellerräumen."
        ),
        T(
          "If a scientist in London wanted data from Paris, someone had to mail a heavy tape reel in a box.",
          "Wollte ein Forscher in London Daten aus Paris, musste jemand schwere Magnetbaender per Post schicken."
        ),
        T(
          "Transferring records took days, and researchers could not collaborate on discoveries in real time.",
          "Der Datentausch dauerte Tage, und Wissenschaftler konnten nicht gemeinsam forschen."
        ),
      ],
      IsolatedTapesDiagram
    ),
    animatedBeat(
      [
        T(
          "In the 1960s, computer scientists invented a clever technique called *packet switching*.",
          "In den 1960er-Jahren erfanden Informatiker eine clevere Methode namens *Paketvermittlung*."
        ),
        T(
          "Instead of sending an entire giant file at once, computers slice messages into small digital parcels.",
          "Statt eine riesige Datei auf einmal zu senden, zerlegen Rechner Nachrichten in kleine digitale Paeckchen."
        ),
        T(
          "Each packet gets a numbered stamp showing its destination address and its sequence number.",
          "Jedes Paket erhaelt eine Nummer und die genaue Zieladresse aufgestempelt."
        ),
      ],
      PacketSlicingDiagram
    ),
    animatedBeat(
      [
        T(
          "Specialized computers called routers direct these packets across thousands of different cables.",
          "Spezielle Knotenrechner namens Router leiten diese Pakete ueber tausende Leitungen weiter."
        ),
        T(
          "One packet might zip through the North line while another races along the South line.",
          "Ein Paket reist vielleicht ueber die Nordleitung, waehrend ein anderes die Suedroute nimmt."
        ),
        T(
          "At the destination, the receiving computer puts the numbered puzzle pieces back in perfect order.",
          "Am Zielort setzt der Empfaenger-Computer alle nummerierten Puzzlestuecke passgenau zusammen."
        ),
      ],
      NetworkRoutersDiagram
    ),
    animatedBeat(
      [
        T(
          "In 1989 at CERN in Switzerland, British scientist Tim Berners-Lee invented the *World Wide Web*.",
          "1989 erfand der britische Forscher Tim Berners-Lee am CERN in der Schweiz das *World Wide Web*."
        ),
        T(
          "He created web addresses, browsers, and clickable hyperlinks that link documents together.",
          "Er erfand Webadressen, Browser und klickbare Hyperlinks, die Dokumente miteinander verknuepfen."
        ),
        T(
          "Now anyone could click a highlighted word to jump instantly to an article on another continent.",
          "Nun konnte jeder auf ein blaues Wort klicken, um sofort einen Text auf einem anderen Kontinent zu oeffnen."
        ),
      ],
      TimBernersLeeWebDiagram
    ),
    animatedBeat(
      [
        T(
          "Today, thousands of *fiber optic* cables stretch across ocean floors connecting all continents.",
          "Heute spannen sich tausende *Glasfaserkabel* ueber den Meeresboden und verbinden alle Kontinente."
        ),
        T(
          "Inside these glass strands, pulses of laser light carry billions of voice calls and video streams.",
          "In den duennen Glasfaeden tragen Laser-Lichtblitze Milliarden von Anrufen und Videostreams."
        ),
        T(
          "The internet connects the human family, allowing friends across the globe to learn and talk together.",
          "Das Internet verbindet die Menschheit, sodass Freunde rund um den Globus gemeinsam lernen koennen."
        ),
      ],
      UnderseaFiberCablesDiagram
    ),
  ],
  toyIntro: T(
    "Connect the network cables to route all three data packets and reassemble the greeting message.",
    "Verbinde die Netzwerkkabel, um alle drei Datenpakete zu uebertragen und die Nachricht zusammenzusetzen."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "How does packet switching send messages across the internet?",
        "Wie verschickt die Paketvermittlung Nachrichten durch das Internet?"
      ),
      options: [
        {
          text: T(
            "It breaks data into small numbered packets that travel independently and reassemble at the end",
            "Sie zerlegt Daten in kleine nummerierte Pakete, die getrennt reisen und am Ziel zusammengesetzt werden"
          ),
          correct: true,
        },
        {
          text: T(
            "It trains carrier pigeons to wear tiny running shoes across telephone wires",
            "Sie trainiert Brieftauben, kleine Laufschuhe auf Telefonleitungen zu tragen"
          ),
        },
        {
          text: T(
            "It rolls giant parchment scrolls through underground water pipes",
            "Sie rollt riesige Pergamentrollen durch unterirdische Wasserrohre"
          ),
        },
      ],
      hint: T(
        "Packets travel separately across different cables and reassemble in correct order.",
        "Pakete reisen getrennt ueber verschiedene Wege und fuegen sich am Ziel wieder zusammen."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What did Tim Berners-Lee create at CERN in 1989?",
        "Was erfand Tim Berners-Lee im Jahr 1989 am CERN?"
      ),
      options: [
        {
          text: T(
            "The World Wide Web, introducing web browsers, URLs, and clickable hyperlinks",
            "Das World Wide Web mit Webseiten, Internetadressen und klickbaren Hyperlinks"
          ),
          correct: true,
        },
        {
          text: T(
            "A motorized skateboard that plays banjo music whenever you turn left",
            "Ein motorisiertes Skateboard, das Banjomusik spielt, wenn man links abbiegt"
          ),
        },
        {
          text: T(
            "A mechanical toaster that sends toasted waffles into orbit",
            "Einen Toaster, der geroestete Waffeln in die Erdumlaufbahn katapultiert"
          ),
        },
      ],
      hint: T(
        "Tim Berners-Lee created the web to help scientists share documents easily.",
        "Tim Berners-Lee schuf das Web, damit Forscher Dokumente einfach teilen konnten."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Connect all three router cables so that 3 of 3 data packets arrive and display HELLO RIPPLES!.",
        "Verbinde alle drei Routerkabel, damit 3 von 3 Pakete ankommen und HELLO RIPPLES! anzeigen."
      ),
      Widget: Widget,
      hint: T(
        "Click each unconnected cable until North, Central, and South are active, then tap check.",
        "Klicke auf die Kabel, bis Nord, Zentral und Sued aktiv sind, und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, when I video call my grandparents across the world, how does my voice travel under the ocean so fast?",
    "Papa, wenn ich mit Oma und Opa telefoniere, wie reist meine Stimme so schnell unter dem Meer hindurch?"
  ),
  realLife: {
    title: T("DE-CIX Internet Exchange in Frankfurt", "Der Internet-Knoten DE-CIX in Frankfurt"),
    body: T(
      "In Frankfurt am Main, Germany hosts DE-CIX, one of the largest internet exchange points in the world. Deep underground in secure data centers, fiber-optic switches route hundreds of terabits of data every second, connecting internet service providers from across Europe, Asia, and North America.",
      "In Frankfurt am Main betreibt Deutschland mit dem DE-CIX einen der weltweit groessten Internet-Knoten. In hochsicheren Rechenzentren leiten Hochgeschwindigkeits-Glasfaserverteiler jede Sekunde hunderte Terabit an Daten weiter und verbinden Netzanbieter aus Europa, Asien und Amerika."
    ),
  },
  factCard: {
    claims: [
      {
        text: "Paul Baran and Donald Davies independently pioneered the concept of packet switching in the early 1960s.",
        source: "https://www.britannica.com/technology/packet-switching",
      },
      {
        text: "The ARPANET made its first successful host-to-host transmission between UCLA and Stanford on 29 October 1969.",
        source: "https://www.history.com/this-day-in-history/first-computer-to-computer-link",
      },
      {
        text: "Tim Berners-Lee submitted his proposal for an information management system at CERN in March 1989, creating the World Wide Web.",
        source: "https://home.cern/science/computing/birth-web",
      },
      {
        text: "Over 500 undersea fiber-optic cable systems span hundreds of thousands of miles along the global ocean floor.",
        source: "https://www.submarinecablemap.com/",
      },
      {
        text: "DE-CIX in Frankfurt reached a record data peak throughput of more than 16 terabits per second in 2023.",
        source: "https://www.de-cix.net/en/about-de-cix/media-releases/de-cix-frankfurt-sets-new-traffic-record",
      },
    ],
    simplified: [
      "We explain packet switching by slicing a long sentence into numbered envelopes sent across different routes.",
      "We show how routers navigate traffic around blocked or damaged cables automatically.",
      "We connect everyday video calls to real undersea fiber-optic cables flashing laser light.",
    ],
  },
};
