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

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <InternetToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <InternetToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "internet",
  story: [
    animatedBeat(
      [
        T(
          "For decades, computers were massive machines locked in separate basement rooms.",
          "Jahrzehntelang standen Computer als riesige Schraenke in getrennten Kellerräumen.",
          "Przez dziesięciolecia komputery były gigantycznymi maszynami zamkniętymi w osobnych salach piwnicznych.",
        ),
        T(
          "If a scientist in London wanted data from Paris, someone had to mail a heavy tape reel in a box.",
          "Wollte ein Forscher in London Daten aus Paris, musste jemand schwere Magnetbaender per Post schicken.",
          "Gdy naukowiec w Londynie potrzebował danych z Paryża, ktoś musiał wysłać pocztą ciężką szpulę taśmy magnetycznej.",
        ),
        T(
          "Transferring records took days, and researchers could not collaborate on discoveries in real time.",
          "Der Datentausch dauerte Tage, und Wissenschaftler konnten nicht gemeinsam forschen.",
          "Przesyłanie informacji trwało całymi dniami, a badacze nie mogli współpracować na bieżąco w czasie rzeczywistym.",
        ),
      ],
      IsolatedTapesDiagram,
    ),
    animatedBeat(
      [
        T(
          "In the 1960s, computer scientists invented a clever technique called *packet switching*.",
          "In den 1960er-Jahren erfanden Informatiker eine clevere Methode namens *Paketvermittlung*.",
          "W latach sześćdziesiątych XX wieku informatycy wymyślili pomysłową technikę zwaną *komutacją pakietów*.",
        ),
        T(
          "Instead of sending an entire giant file at once, computers slice messages into small digital parcels.",
          "Statt eine riesige Datei auf einmal zu senden, zerlegen Rechner Nachrichten in kleine digitale Paeckchen.",
          "Zamiast przesyłać ogromny plik w całości, komputery dzielą wiadomości na małe paczki cyfrowe zwane pakietami.",
        ),
        T(
          "Each packet gets a numbered stamp showing its destination address and its sequence number.",
          "Jedes Paket erhaelt eine Nummer und die genaue Zieladresse aufgestempelt.",
          "Każdy pakiet otrzymuje stempel z adresem docelowym oraz numerem porządkowym w kolejce.",
        ),
      ],
      PacketSlicingDiagram,
    ),
    animatedBeat(
      [
        T(
          "Specialized computers called routers direct these packets across thousands of different cables.",
          "Spezielle Knotenrechner namens Router leiten diese Pakete ueber tausende Leitungen weiter.",
          "Wyspecjalizowane komputery zwane routerami kierują tymi pakietami przez tysiące różnych kabli i łączy.",
        ),
        T(
          "One packet might zip through the North line while another races along the South line.",
          "Ein Paket reist vielleicht ueber die Nordleitung, waehrend ein anderes die Suedroute nimmt.",
          "Jeden pakiet może mknąć kablem północnym, podczas gdy inny leci trasą południową.",
        ),
        T(
          "At the destination, the receiving computer puts the numbered puzzle pieces back in perfect order.",
          "Am Zielort setzt der Empfaenger-Computer alle nummerierten Puzzlestuecke passgenau zusammen.",
          "U celu komputer odbiorcy układa ponumerowane klocki układanki z powrotem w nienagannym porządku.",
        ),
      ],
      NetworkRoutersDiagram,
    ),
    animatedBeat(
      [
        T(
          "In 1989 at CERN in Switzerland, British scientist Tim Berners-Lee invented the *World Wide Web*.",
          "1989 erfand der britische Forscher Tim Berners-Lee am CERN in der Schweiz das *World Wide Web*.",
          "W 1989 roku w instytucie CERN w Szwajcarii brytyjski fizyk Tim Berners-Lee stworzył *World Wide Web*.",
        ),
        T(
          "He created web addresses, browsers, and clickable hyperlinks that link documents together.",
          "Er erfand Webadressen, Browser und klickbare Hyperlinks, die Dokumente miteinander verknuepfen.",
          "Stworzył adresy internetowe, przeglądarki i klikalne hiperłącza, które łączą ze sobą dokumenty na całym świecie.",
        ),
        T(
          "Now anyone could click a highlighted word to jump instantly to an article on another continent.",
          "Nun konnte jeder auf ein blaues Wort klicken, um sofort einen Text auf einem anderen Kontinent zu oeffnen.",
          "Od tej pory każdy mógł kliknąć wyróżnione słowo, by błyskawicznie przejść do artykułu na innym kontynencie.",
        ),
      ],
      TimBernersLeeWebDiagram,
    ),
    animatedBeat(
      [
        T(
          "Today, thousands of *fiber optic* cables stretch across ocean floors connecting all continents.",
          "Heute spannen sich tausende *Glasfaserkabel* ueber den Meeresboden und verbinden alle Kontinente.",
          "Dziś setki podmorskich kabli *światłowodowych* ciągnie się po dnie oceanów, łącząc wszystkie kontynenty.",
        ),
        T(
          "Inside these glass strands, pulses of laser light carry billions of voice calls and video streams.",
          "In den duennen Glasfaeden tragen Laser-Lichtblitze Milliarden von Anrufen und Videostreams.",
          "Wewnątrz tych szklanych włókien impulsy światła laserowego przenoszą miliardy rozmów i filmów wideo.",
        ),
        T(
          "The internet connects the human family, allowing friends across the globe to learn and talk together.",
          "Das Internet verbindet die Menschheit, sodass Freunde rund um den Globus gemeinsam lernen koennen.",
          "Internet łączy rodzinę ludzką, umożliwiając przyjaciołom z całego globu wspólną naukę i rozmowę bez granic.",
        ),
      ],
      UnderseaFiberCablesDiagram,
    ),
  ],
  toyIntro: T(
    "Connect the network cables to route all three data packets and reassemble the greeting message.",
    "Verbinde die Netzwerkkabel, um alle drei Datenpakete zu uebertragen und die Nachricht zusammenzusetzen.",
    "Podłącz kable sieciowe, aby przesłać wszystkie trzy pakiety danych i złożyć powitalną wiadomość.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "How does packet switching send messages across the internet?",
        "Wie verschickt die Paketvermittlung Nachrichten durch das Internet?",
        "W jaki sposób komutacja pakietów przesyła wiadomości przez internet?",
      ),
      options: [
        {
          text: T(
            "It breaks data into small numbered packets that travel independently and reassemble at the end",
            "Sie zerlegt Daten in kleine nummerierte Pakete, die getrennt reisen und am Ziel zusammengesetzt werden",
            "Dzieli dane na małe, ponumerowane pakiety, które podróżują osobno i składają się u celu",
          ),
          correct: true,
        },
        {
          text: T(
            "It trains carrier pigeons to wear tiny running shoes across telephone wires",
            "Sie trainiert Brieftauben, kleine Laufschuhe auf Telefonleitungen zu tragen",
            "Szkoli gołębie pocztowe do biegania w małych butach po drutach telegraficznych",
          ),
        },
        {
          text: T(
            "It rolls giant parchment scrolls through underground water pipes",
            "Sie rollt riesige Pergamentrollen durch unterirdische Wasserrohre",
            "Turla wielkie zwoje pergaminu przez podziemne rury wodociągowe",
          ),
        },
      ],
      hint: T(
        "Packets travel separately across different cables and reassemble in correct order.",
        "Pakete reisen getrennt ueber verschiedene Wege und fuegen sich am Ziel wieder zusammen.",
        "Pakiety podróżują oddzielnie różnymi trasami i łączą się w całość w odpowiedniej kolejności.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What did Tim Berners-Lee create at CERN in 1989?",
        "Was erfand Tim Berners-Lee im Jahr 1989 am CERN?",
        "Co stworzył Tim Berners-Lee w instytucie CERN w 1989 roku?",
      ),
      options: [
        {
          text: T(
            "The World Wide Web, introducing web browsers, URLs, and clickable hyperlinks",
            "Das World Wide Web mit Webseiten, Internetadressen und klickbaren Hyperlinks",
            "World Wide Web, wprowadzając przeglądarki internetowe, adresy stron i klikalne linki",
          ),
          correct: true,
        },
        {
          text: T(
            "A motorized skateboard that plays banjo music whenever you turn left",
            "Ein motorisiertes Skateboard, das Banjomusik spielt, wenn man links abbiegt",
            "Deskorolkę z silnikiem, która gra na banjo przy każdym skręcie w lewo",
          ),
        },
        {
          text: T(
            "A mechanical toaster that sends toasted waffles into orbit",
            "Einen Toaster, der geroestete Waffeln in die Erdumlaufbahn katapultiert",
            "Toster parowy wystrzeliwujący chrupiące gofry na orbitę okołoziemską",
          ),
        },
      ],
      hint: T(
        "Tim Berners-Lee created the web to help scientists share documents easily.",
        "Tim Berners-Lee schuf das Web, damit Forscher Dokumente einfach teilen konnten.",
        "Tim Berners-Lee stworzył sieć WWW, aby naukowcy mogli bez trudu dzielić się artykułami i wiedzą.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Connect all three router cables so that 3 of 3 data packets arrive and display HELLO RIPPLES!.",
        "Verbinde alle drei Routerkabel, damit 3 von 3 Pakete ankommen und HELLO RIPPLES! anzeigen.",
        "Podłącz wszystkie trzy kable sieciowe, aby 3 z 3 pakietów dotarły i wyświetliły napis HELLO RIPPLES!.",
      ),
      Widget,
      hint: T(
        "Click each unconnected cable until North, Central, and South are active, then tap check.",
        "Klicke auf die Kabel, bis Nord, Zentral und Sued aktiv sind, und tippe auf pruefen.",
        "Klikaj niepodłączone kable, aż Północ, Środek i Południe będą aktywne, a potem kliknij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, when I video call my grandparents across the world, how does my voice travel under the ocean so fast?",
    "Papa, wenn ich mit Oma und Opa telefoniere, wie reist meine Stimme so schnell unter dem Meer hindurch?",
    "Tato, kiedy rozmawiam na wideo z dziadkami na drugim końcu świata, jak mój głos leci przez ocean tak szybko?",
  ),
  realLife: {
    title: {
      en: "DE-CIX Internet Exchange in Frankfurt",
      de: "Der Internet-Knoten DE-CIX in Frankfurt",
      pl: "Węzły internetowe i narodziny polskiego internetu w NASK",
    },
    body: {
      en: "In Frankfurt am Main, Germany hosts DE-CIX, one of the largest internet exchange points in the world. Deep underground in secure data centers, fiber-optic switches route hundreds of terabits of data every second, connecting internet service providers from across Europe, Asia, and North America.",
      de: "In Frankfurt am Main betreibt Deutschland mit dem DE-CIX einen der weltweit groessten Internet-Knoten. In hochsicheren Rechenzentren leiten Hochgeschwindigkeits-Glasfaserverteiler jede Sekunde hunderte Terabit an Daten weiter und verbinden Netzanbieter aus Europa, Asien und Amerika.",
      pl: "W Polsce kluczowym węzłem wymiany ruchu internetowego jest m.in. PLIX w Warszawie oraz ośrodki NASK (Naukowa i Akademicka Sieć Komputerowa). To w sierpniu 1991 roku z Wydziału Fizyki Uniwersytetu Warszawskiego wysłano pierwszy oficjalny e-mail do Kopenhagi, łącząc Polskę z globalnym internetem. Dziś gigabitowe światłowody łączą polskie szkoły, szpitale i domy z całym światem.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Paul Baran and Donald Davies independently pioneered the concept of packet switching in the early 1960s.",
          de: "Paul Baran und Donald Davies entwickelten unabhaengig voneinander die Paketvermittlung in den fruehen 1960er-Jahren.",
          pl: "Paul Baran i Donald Davies niezależnie od siebie stworzyli koncepcję komutacji pakietów na początku lat sześćdziesiątych XX wieku.",
        },
        source: "https://www.britannica.com/technology/packet-switching",
      },
      {
        text: {
          en: "The ARPANET made its first successful host-to-host transmission between UCLA and Stanford on 29 October 1969.",
          de: "Das ARPANET uebertrug am 29. Oktober 1969 die erste erfolgreiche Verbindung zwischen der UCLA und Stanford.",
          pl: "Sieć ARPANET przeprowadziła pierwszą udaną transmisję między uniwersytetami UCLA i Stanford 29 października 1969 roku.",
        },
        source: "https://www.history.com/this-day-in-history/first-computer-to-computer-link",
      },
      {
        text: {
          en: "Tim Berners-Lee submitted his proposal for an information management system at CERN in March 1989, creating the World Wide Web.",
          de: "Tim Berners-Lee reichte im Maerz 1989 am CERN seinen Vorschlag fuer das World Wide Web ein.",
          pl: "Tim Berners-Lee przedstawił w instytucie CERN w marcu 1989 roku projekt systemu zarządzania informacją, dając początek World Wide Web.",
        },
        source: "https://home.cern/science/computing/birth-web",
      },
      {
        text: {
          en: "Over 500 undersea fiber-optic cable systems span hundreds of thousands of miles along the global ocean floor.",
          de: "Ueber 500 Untersee-Glasfaserkabel durchziehen mit Hunderttausenden Kilometern Laenge die Ozeane der Welt.",
          pl: "Ponad 500 podmorskich kabli światłowodowych o długości setek tysięcy kilometrów spoczywa na dnie oceanów.",
        },
        source: "https://www.submarinecablemap.com/",
      },
      {
        text: {
          en: "DE-CIX in Frankfurt reached a record data peak throughput of more than 16 terabits per second in 2023.",
          de: "Der DE-CIX in Frankfurt erreichte 2023 einen neuen Spitzenwert von ueber 16 Terabit Daten pro Sekunde.",
          pl: "17 sierpnia 1991 roku z Wydziału Fizyki UW wysłano pierwszy w Polsce e-mail do Kopenhagi, inaugurując polskie połączenie z internetem.",
        },
        source: "https://nask.pl/pl/o-nask/historia-nask/3257,Historia-NASK.html",
      },
    ],
    simplified: [
      {
        en: "We explain packet switching by slicing a long sentence into numbered envelopes sent across different routes.",
        de: "Wir erklaeren die Paketvermittlung, indem wir einen Satz in nummerierte Umschlaege aufteilen, die getrennte Wege nehmen.",
        pl: "Tłumaczymy komutację pakietów jako cięcie zdania na ponumerowane koperty podróżujące różnymi drogami.",
      },
      {
        en: "We show how routers navigate traffic around blocked or damaged cables automatically.",
        de: "Wir zeigen, wie Router Datenstroeme automatisch um beschaedigte oder ueberlastete Kabel herumleiten.",
        pl: "Pokazujemy, jak routery samoczynnie kierują ruchem z dala od uszkodzonych lub przeciążonych linii.",
      },
      {
        en: "We connect everyday video calls to real undersea fiber-optic cables flashing laser light.",
        de: "Wir verbinden taegliche Videoanrufe mit echten Untersee-Glasfaserkabeln, in denen Laserblitze pulsieren.",
        pl: "Łączymy codzienne rozmowy wideo z prawdziwymi podmorskimi światłowodami, w których pulsuje światło lasera.",
      },
    ],
  },
};
