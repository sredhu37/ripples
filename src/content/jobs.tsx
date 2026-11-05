import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  HistoricalVanishedTradesDiagram,
  ElectricSwitchboardAutomatedDiagram,
  NewTechCareersWindCyberDiagram,
  TransitionCareerShiftDiagram,
  LifelongLearningCuriosityDiagram,
} from "./jobs.diagrams";
import { JobsToy } from "./jobs.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <JobsToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <JobsToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "jobs",
  story: [
    animatedBeat(
      [
        T(
          "A hundred years ago, cities employed thousands of people to walk streets every evening lighting gas lanterns.",
          "Vor hundert Jahren beschaeftigten Staedte tausende Menschen, um abends Strassenlaternen von Hand anzuenden.",
          "Sto lat temu miasta zatrudniały tysiące ludzi, którzy każdego wieczoru przemierzali ulice, ręcznie zapalając latarnie gazowe.",
        ),
        T(
          "Telephone exchanges were filled with operators plugging cords into wooden boards by hand all day long.",
          "In Telefonzentralen steckten hunderte Vermittlerinnen den ganzen Tag Verbindungskabel in Stecktafeln.",
          "W centralach telefonicznych setki telefonistek przez cały dzień ręcznie wciskały kable w drewniane pulpity łączeniowe.",
        ),
        T(
          "At bowling alleys, young pin-setters hurried down the lane after each roll to set pins back upright.",
          "Auf Kegelbahnen stellten fleissige Helfer nach jedem Wurf die umgefallenen Holzkegel muehsam wieder auf.",
          "Na torach kręglarskich pomocnicy zbiegali po każdym rzucie na koniec toru, by mozolnie ustawiać przewrócone kręgle.",
        ),
      ],
      HistoricalVanishedTradesDiagram,
    ),
    animatedBeat(
      [
        T(
          "When electric streetlights and automatic telephone switches were invented, those jobs disappeared.",
          "Als elektrische Laternen und automatische Telefonvermittlungen kamen, verschwanden diese alten Berufe.",
          "Gdy wynaleziono elektryczne oświetlenie ulic i automatyczne centrale, te dawne zawody bezpowrotnie zniknęły.",
        ),
        T(
          "This continuous transformation of human work caused by technology is called *automation*.",
          "Diesen fortlaufenden Wandel der Arbeitswelt durch neue Maschinen nennt man *Automatisierung*.",
          "Tę nieustanną transformację rynku pracy pod wpływem technologii nazywamy *automatyzacją*.",
        ),
        T(
          "While repetitive tasks vanish, society becomes more productive and discovers new needs.",
          "Waehrend monotone Handgriffe weichen, wird die Gesellschaft produktiver und neue Beduerfnisse entstehen.",
          "Podczas gdy monotonne czynności znikają, społeczeństwo staje się bardziej produktywne i odkrywa nowe potrzeby.",
        ),
      ],
      ElectricSwitchboardAutomatedDiagram,
    ),
    animatedBeat(
      [
        T(
          "Technology has never eliminated human work: it continuously creates jobs our ancestors never imagined.",
          "Technik hat menschliche Arbeit nie abgeschafft: Sie schafft staendig Berufe, die frueher undenkbar waren.",
          "Technologia nigdy nie zlikwidowała ludzkiej pracy: nieustannie tworzy zawody, o których nasi przodkowie nawet nie śnili.",
        ),
        T(
          "No one in 1900 could have worked as an aerospace engineer, a web designer, or a mobile app developer.",
          "Um 1900 konnte niemand als Luftfahrtingenieur, Webdesigner oder Smartphone-Entwickler arbeiten.",
          "W 1900 roku nikt nie mógł pracować jako inżynier lotniczy, projektant stron WWW czy twórca aplikacji na smartfony.",
        ),
        T(
          "Each invention unlocks hundreds of new specializations, services, and creative fields.",
          "Jede Erfindung eroeffnet hunderte neue Fachgebiete, Dienstleistungen und kreative Taetigkeiten.",
          "Każdy wynalazek otwiera setki nowych specjalizacji, usług i fascynujących obszarów twórczości.",
        ),
      ],
      NewTechCareersWindCyberDiagram,
    ),
    animatedBeat(
      [
        T(
          "Today, growing fields like clean energy and environmental engineering offer thousands of *green jobs*.",
          "Heute bieten erneuerbare Energien und Umweltschutz tausende neue *Zukunftsberufe*.",
          "Dziś dynamicznie rosnące dziedziny, takie jak czysta energia i ochrona środowiska, oferują tysiące *zielonych miejsc pracy*.",
        ),
        T(
          "Wind turbine technicians climb high towers, and battery chemists engineer cleaner electric buses.",
          "Windkraft-Techniker klettern auf hohe Tuerme, waehrend Batterie-Forscher saubere Busse ermoeglichen.",
          "Technicy turbin wiatrowych wspinają się na wysokie maszty, a chemicy baterii projektują czyste autobusy elektryczne.",
        ),
        T(
          "Hospitals need healthcare workers and therapists who bring genuine human warmth to patient care.",
          "Kliniken brauchen Pflegekraefte und Therapeuten, die Patienten echte menschliche Waerme schenken.",
          "Szpitale potrzebują opiekunów, pielęgniarek i terapeutów, którzy wnoszą prawdziwe ludzkie ciepło do opieki nad chorymi.",
        ),
      ],
      TransitionCareerShiftDiagram,
    ),
    animatedBeat(
      [
        T(
          "The greatest skill you can build for the future is a mindset of *lifelong learning*.",
          "Die wertvollste Faehigkeit fuer deine Zukunft ist die Freude an *lebenslanges Lernen*.",
          "Najwspanialszą umiejętnością, jaką możesz w sobie rozwinąć na przyszłość, jest postawa *uczenia się przez całe życie*.",
        ),
        T(
          "Curiosity, adaptability, and learning how to learn matter more than memorizing any single tool.",
          "Neugier und die Bereitschaft, Neues zu probieren, zaehlen weit mehr als starres Auswendiglernen.",
          "Ciekawość świata, elastyczność i umiejętność zdobywania wiedzy liczą się o wiele bardziej niż pamięciowa nauka jednego narzędzia.",
        ),
        T(
          "By exploring new ideas, you can comfortably master whatever tools the future brings.",
          "Wer neugierig bleibt, meistert mit Leichtigkeit jedes neue Werkzeug, das die Zukunft bringt.",
          "Poznając nowe idee, ze spokojem opanujesz każde narzędzie, jakie przyniesie nadchodząca przyszłość.",
        ),
      ],
      LifelongLearningCuriosityDiagram,
    ),
  ],
  toyIntro: T(
    "Choose a workforce training policy to invest in green and tech skills and reach over 90% resilience.",
    "Waehle die Foerderstrategie fuer Zukunftsberufe, um ueber 90% Zukunftsfaehigkeit zu erreichen.",
    "Wybierz strategię szkolenia i rozwoju kadr, aby zainwestować w zawody przyszłości i osiągnąć ponad 90% odporności.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What happened to jobs like street lamplighters and telephone switchboard operators?",
        "Was geschah mit Berufen wie Laternenanzuender und Telefon-Stoepselvermittler?",
        "Co stało się z zawodami takimi jak latarnicy uliczni czy telefonistki w centrali?",
      ),
      options: [
        {
          text: T(
            "They were automated by electricity and digital circuits, opening room for new modern careers",
            "Sie wurden durch Strom und Digitaltechnik ersetzt und machten Platz fuer moderne Zukunftsberufe",
            "Zostały zautomatyzowane przez elektryczność i układy cyfrowe, otwierając miejsce na nowoczesne zawody",
          ),
          correct: true,
        },
        {
          text: T(
            "They were turned into stone statues and moved to an underwater museum",
            "Sie wurden in Steinstatuen verwandelt und in ein Unterwassermuseum gebracht",
            "Zostali zamienieni w kamienne posągi i przeniesieni do podwodnego muzeum",
          ),
        },
        {
          text: T(
            "They moved to Mars to set up bowling alleys on the red dunes",
            "Sie zogen auf den Mars, um Bowlingbahnen auf den roten Duenen zu bauen",
            "Przeprowadzili się na Marsa, aby budować kręgielnie na czerwonych wydmach",
          ),
        },
      ],
      hint: T(
        "Routine tasks were replaced by automatic systems, paving the way for newer, higher-skilled jobs.",
        "Monotone Handgriffe wurden automatisiert und schufen Raum fuer anspruchsvollere Berufe.",
        "Rutynowe czynności zostały zastąpione automatyzacją, torując drogę nowym, ciekawszym zawodom.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is lifelong learning the most valuable mindset for navigating the future?",
        "Warum ist lebenslanges Lernen die wichtigste Faehigkeit fuer die Zukunft?",
        "Dlaczego uczenie się przez całe życie to najcenniejsza umiejętność na przyszłość?",
      ),
      options: [
        {
          text: T(
            "Because technology evolves constantly, and curiosity helps us adopt new tools and skills",
            "Weil Technik sich staendig wandelt und Neugier uns hilft, neue Werkzeuge schnell zu lernen",
            "Ponieważ technologia ciągle się zmienia, a ciekawość pomaga nam szybko opanowywać nowe narzędzia",
          ),
          correct: true,
        },
        {
          text: T(
            "Because it allows people to avoid brushing their teeth before going to bed",
            "Weil man sich dadurch abends vor dem Schlafen nicht mehr die Zaehne putzen muss",
            "Ponieważ pozwala unikać mycia zębów wieczorem przed pójściem spać",
          ),
        },
        {
          text: T(
            "Because it lets you win every board game without reading the rules",
            "Weil man dadurch jedes Brettspiel gewinnt, ohne jemals die Regeln gelesen zu haben",
            "Ponieważ pozwala wygrać każdą grę planszową bez czytania jej zasad",
          ),
        },
      ],
      hint: T(
        "Being adaptable and eager to learn allows workers to thrive through economic changes.",
        "Wer anpassungsfaehig und lernbereit bleibt, meistert wirtschaftliche Veraenderungen souveraen.",
        "Elastyczność i chęć do nauki pozwalają ze spokojem odnaleźć się w zmieniającej się gospodarce.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select 'Invest in Green & Tech Skills' to achieve over 90% future workforce resilience.",
        "Waehle 'Investition in Zukunftsberufe', um ueber 90% Zukunftsfaehigkeit der Wirtschaft zu erreichen.",
        "Wybierz opcję 'Inwestycja w zawody przyszłości', aby uzyskać ponad 90% odporności gospodarki.",
      ),
      Widget,
      hint: T(
        "Tap the green button for skills investment, check the resilience bar, and tap check.",
        "Tippe auf den Button fuer Zukunftsberufe, pruefe den Balken und druecke auf pruefen.",
        "Kliknij przycisk inwestycji w umiejętności, sprawdź pasek odporności i kliknij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, if machines can do many jobs in the future, what skills should I learn while I grow up?",
    "Papa, wenn Maschinen spaeter viele Berufe uebernehmen, welche Faehigkeiten soll ich heute lernen?",
    "Tato, jeśli maszyny w przyszłości przejmą wiele zadań, jakich umiejętności warto się uczyć, dorastając?",
  ),
  realLife: {
    title: {
      en: "The Dual Vocational Training System in Germany",
      de: "Das duale Ausbildungssystem in Deutschland",
      pl: "Kształcenie branżowe i Baza Usług Rozwojowych w Polsce",
    },
    body: {
      en: "In Germany, the dual vocational training system (Duale Ausbildung) combines classroom study at trade schools with paid on-the-job apprenticeship at real companies. Working with chambers of commerce (IHK and Handwerkskammern), the curriculum is regularly updated to train young people in cutting-edge robotics, solar installation, and digital manufacturing.",
      de: "In Deutschland kombiniert das duale Ausbildungssystem Berufsschulunterricht mit bezahlter Praxis im Betrieb. Gemeinsam mit Industrie- und Handelskammern (IHK) sowie Handwerkskammern werden Lehrplaene laufend modernisiert, um junge Menschen in Robotik, Solartechnik und digitaler Fertigung auszubilden.",
      pl: "W Polsce dynamicznie rozwija się szkolnictwo branżowe i techniczne we współpracy z przedsiębiorstwami oraz inicjatywy takie jak Baza Usług Rozwojowych (BUR) PARP czy Krajowy Fundusz Szkoleniowy (KFS). Dzięki państwowym i unijnym dofinansowaniom pracownicy zdobywają nowe kwalifikacje w zakresie obsługi robotów przemysłowych, montażu instalacji OZE i programowania.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The World Economic Forum's Future of Jobs Report estimates that 69 million new roles will emerge in green technology, data, and education by 2027.",
          de: "Der Future of Jobs Report des Weltwirtschaftsforums schaetzt, dass bis 2027 weltweit 69 Millionen neue Stellen in Umwelt, Daten und Bildung entstehen.",
          pl: "Raport Future of Jobs Światowego Forum Ekonomicznego szacuje, że do 2027 roku w zielonych technologiach, analizie danych i edukacji powstanie 69 milionów nowych miejsc pracy.",
        },
        source: "https://www.weforum.org/publications/the-future-of-jobs-report-2023/",
      },
      {
        text: {
          en: "The OECD Employment Outlook shows that technological progress shifts job composition toward higher-skilled, non-routine tasks.",
          de: "Der OECD Employment Outlook belegt, dass technischer Fortschritt die Beschaeftigung hin zu anspruchsvollen Taetigkeiten verschiebt.",
          pl: "Raport OECD Employment Outlook wykazuje, że postęp technologiczny przesuwa strukturę zatrudnienia w kierunku zadań nierutynowych i wyższych kwalifikacji.",
        },
        source: "https://www.oecd.org/employment/Employment-Outlook-2023-Key-Findings.pdf",
      },
      {
        text: {
          en: "According to the German Federal Statistical Office (Destatis), employment in renewable energy and green technologies has grown steadily over two decades.",
          de: "Laut Destatis ist die Beschaeftigung im Bereich erneuerbare Energien und Umweltschutz ueber zwei Jahrzehnte kontinuierlich gewachsen.",
          pl: "Badania rynku pracy (NBER) wykazują, że chociaż ponad 60% zawodów z 1940 roku nie istnieje w tamtej formie, ogólna liczba miejsc pracy ogromnie wzrosła.",
        },
        source: "https://www.nber.org/papers/w29974",
      },
      {
        text: {
          en: "Historical labor studies show that while 60% of jobs in 1940 no longer exist in the same form, overall employment has expanded dramatically.",
          de: "Historische Arbeitsmarktstudien zeigen, dass 60% der Berufe von 1940 heute nicht mehr existieren, die Gesamtbeschaeftigung jedoch stark stieg.",
          pl: "W Polsce Krajowy Fundusz Szkoleniowy (KFS) dofinansowuje podnoszenie kwalifikacji dorosłych pracowników w zakresie nowoczesnych technologii.",
        },
        source: "https://psz.praca.gov.pl/krajowy-fundusz-szkoleniowy",
      },
      {
        text: {
          en: "The German Federal Institute for Vocational Education and Training (BIBB) continuously adapts training regulations for emerging technological occupations.",
          de: "Das Bundesinstitut fuer Berufsbildung (BIBB) passt Ausbildungsordnungen laufend an neue technologische Berufe an.",
          pl: "Zintegrowany System Kwalifikacji (ZSK) w Polsce umożliwia formalne potwierdzanie umiejętności zdobytych w ramach uczenia się przez całe życie.",
        },
        source: "https://kwalifikacje.gov.pl/",
      },
    ],
    simplified: [
      {
        en: "We explain that technology automates routine manual chores while creating new professions.",
        de: "Wir erklaeren, dass Technik monotone Handarbeit automatisiert und gleichzeitig neue Berufe schafft.",
        pl: "Tłumaczymy, że technologia automatyzuje rutynowe czynności, tworząc jednocześnie zupełnie nowe zawody.",
      },
      {
        en: "We highlight emerging jobs in clean energy, healthcare, and digital technology.",
        de: "Wir heben neue Berufsfelder in erneuerbaren Energien, Pflege und Digitaltechnik hervor.",
        pl: "Wskazujemy rozwijające się branże czystej energii, opieki zdrowotnej i technologii cyfrowych.",
      },
      {
        en: "We show that lifelong learning, curiosity, and adaptability are key skills for the future.",
        de: "Wir zeigen, dass lebenslanges Lernen, Neugier und Anpassungsfaehigkeit der Schluessel zur Zukunft sind.",
        pl: "Pokazujemy, że uczenie się przez całe życie, ciekawość świata i elastyczność są najważniejszymi kompetencjami na przyszłość.",
      },
    ],
  },
};
