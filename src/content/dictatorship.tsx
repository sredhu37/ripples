import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  ContrastDiagram,
  SafeguardsDiagram,
  SilencedFeedbackDiagram,
  TakeoverDiagram,
  VigilanceDiagram,
} from "./dictatorship.diagrams";
import { DictatorshipToy } from "./dictatorship.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <DictatorshipToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <DictatorshipToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "dictatorship",
  story: [
    animatedBeat(
      [
        T(
          "In Far Harbor, a new ruler named Barnaby took total control by force.",
          "Im Fernen Hafen übernahm ein neuer Machthaber namens Barnaby mit Gewalt die Kontrolle.",
          "W Odległej Przystani nowy przywódca o imieniu Barnaby siłą przejął pełnię kontroli.",
        ),
        T(
          "A *dictatorship* is a system where one leader or small group rules with unchecked power.",
          "Eine *Diktatur* ist ein System, in dem ein Anführer oder eine kleine Gruppe mit unkontrollierter Macht herrscht.",
          "*Dyktatura* to ustrój, w którym jeden przywódca lub wąska grupa rządzi bez żadnej kontroli.",
        ),
        T(
          "At first, Barnaby promised: 'No more slow debates or meetings, I make decisions fast!'",
          "Zuerst versprach Barnaby: 'Keine langsamen Debatten oder Treffen mehr, ich entscheide schnell!'",
          "Początkowo Barnaby obiecywał: 'Koniec z powolnymi naradami i debatami, ja podejmuję decyzje natychmiast!'",
        ),
        T(
          "But soon, Barnaby banned public gatherings and shut down the town newspaper.",
          "Doch bald verbot Barnaby Versammlungen und schloss die Dorfzeitung.",
          "Szybko jednak Barnaby zakazał zgromadzeń mieszkańców i zamknął lokalną gazetę.",
        ),
      ],
      TakeoverDiagram,
    ),
    animatedBeat(
      [
        T(
          "Barnaby took people's fishing boats and told workers where they were forced to work.",
          "Barnaby nahm den Menschen die Fischerboote weg und zwang Arbeiter an bestimmte Plätze.",
          "Barnaby odebrał ludziom łodzie rybackie i rozkazywał robotnikom, gdzie muszą pracować.",
        ),
        T(
          "One cold night, a major fresh water pipe cracked right under Main Street.",
          "In einer kalten Nacht platzte ein großes Trinkwasserrohr direkt unter der Hauptstraße.",
          "Pewnej mroźnej nocy pękła główna rura wodociągowa pod ulicą Główną.",
        ),
        T(
          "Workers saw water leaking, but they were terrified to report the bad news to Barnaby.",
          "Arbeiter sahen das Wasser austreten, hatten aber schreckliche Angst, Barnaby die schlechte Nachricht zu bringen.",
          "Robotnicy widzieli wyciekającą wodę, lecz panicznie bali się przekazać złe wieści Barnaby'emu.",
        ),
        T(
          "In a dictatorship, anyone who speaks about problems or mistakes is often punished.",
          "In einer Diktatur wird oft jeder bestraft, der über Probleme oder Fehler berichtet.",
          "W dyktaturze każdy, kto mówi o problemach lub błędach władzy, jest surowo karany.",
        ),
      ],
      SilencedFeedbackDiagram,
    ),
    animatedBeat(
      [
        T(
          "Because nobody was allowed to speak the truth, the small leak flooded the cellars for weeks.",
          "Weil niemand die Wahrheit sagen durfte, überschwemmte das Leck wochenlang die Keller.",
          "Ponieważ nikomu nie wolno było mówić prawdy, mały wyciek tygodniami zalewał piwnice.",
        ),
        T(
          "Otto explains: 'Freedom of speech is not just an idea, it is a practical tool to fix mistakes.'",
          "Otto erklärt: 'Meinungsfreiheit ist nicht nur eine Idee, sondern ein Werkzeug um Fehler zu beheben.'",
          "Otto wyjaśnia: 'Wolność słowa to nie tylko wzniosła idea, to praktyczne narzędzie do naprawiania błędów.'",
        ),
        T(
          "Without free elections, citizens have no peaceful way to replace harmful leaders.",
          "Ohne freie Wahlen haben die Bürger keinen friedlichen Weg, schädliche Anführer abzulösen.",
          "Bez wolnych wyborów obywatele nie mają pokojowej możliwości zmiany szkodliwych przywódców.",
        ),
        T(
          "When power is unchecked, fear replaces trust and common problems stay broken.",
          "Wenn Macht unkontrolliert ist, ersetzt Angst das Vertrauen und gemeinsame Probleme bleiben ungelöst.",
          "Gdy władza jest poza kontrolą, strach wypiera zaufanie, a wspólne problemy pozostają nienaprawione.",
        ),
      ],
      ContrastDiagram,
    ),
    animatedBeat(
      [
        T(
          "To protect against dictatorship, societies build permanent safeguards into their laws.",
          "Um sich vor Diktaturen zu schützen, bauen Gesellschaften dauerhafte Schutzregeln in Gesetze ein.",
          "Aby uchronić się przed dyktaturą, społeczeństwa wprowadzają do praw trwałe bezpieczniki.",
        ),
        T(
          "These include independent courts, a free press, and constitutional rights that cannot be cancelled.",
          "Dazu gehören unabhängige Gerichte, eine freie Presse und unveräußerliche Grundrechte.",
          "Należą do nich niezawisłe sądy, wolna prasa oraz prawa konstytucyjne, których nikt nie może odebrać.",
        ),
        T(
          "Protecting every person's dignity and freedom ensures that power serves the people, not the other way around.",
          "Der Schutz von Würde und Freiheit sichert, dass Macht dem Volk dient und nicht umgekehrt.",
          "Ochrona godności i wolności każdego człowieka gwarantuje, że władza służy ludziom, a nie ludzie władzy.",
        ),
      ],
      SafeguardsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Citizens must stay attentive and care for their democratic community.",
          "Bürger müssen aufmerksam bleiben und sich um ihre demokratische Gemeinschaft kümmern.",
          "Obywatele muszą zachować czujność i troszczyć się o swoją demokratyczną wspólnotę.",
        ),
        T(
          "Every generation has the responsibility to defend freedom, dignity, and fair laws.",
          "Jede Generation hat die Verantwortung, Freiheit, Würde und faire Gesetze zu verteidigen.",
          "Każde pokolenie ponosi odpowiedzialność za obronę wolności, godności i sprawiedliwych praw.",
        ),
      ],
      VigilanceDiagram,
    ),
  ],
  toyIntro: T(
    "Experience the difference between silenced communication in a dictatorship and open problem-solving.",
    "Erlebe den Unterschied zwischen unterdrückter Rückmeldung in einer Diktatur und offener Problemlösung.",
    "Doświadcz różnicy między uciszaniem ludzi w dyktaturze a otwartym rozwiązywaniem problemów.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is a dictatorship dangerous for a community?",
        "Warum ist eine Diktatur gefährlich für eine Gemeinschaft?",
        "Dlaczego dyktatura jest niebezpieczna dla społeczeństwa?",
      ),
      options: [
        {
          text: T(
            "Power is unchecked, people cannot speak up about mistakes, and bad leaders cannot be voted out",
            "Macht ist unkontrolliert, Menschen dürfen Fehler nicht ansprechen und schlechte Anführer nicht abwählen",
            "Władza jest poza kontrolą, ludzie boją się mówić o błędach, a złych przywódców nie da się odwołać w wyborach",
          ),
          correct: true,
        },
        {
          text: T(
            "It gives everyone too many free holidays and ice cream",
            "Sie gibt jedem zu viele freie Urlaubstage und Eis",
            "Daje każdemu zbyt wiele darmowych wakacji i lodów",
          ),
        },
        {
          text: T(
            "There are too many elections happening every single day",
            "Es finden jeden Tag viel zu viele Wahlen statt",
            "Każdego dnia odbywa się zbyt wiele głosowań",
          ),
        },
      ],
      hint: T(
        "Without checks and balances, leaders cannot be held accountable and citizens live in fear.",
        "Ohne Kontrollen können Anführer nicht zur Rechenschaft gezogen werden und Bürger leben in Angst.",
        "Bez wzajemnej kontroli władz rządzący stają się bezkarni, a obywatele żyją w ciągłym strachu.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is freedom of speech essential for solving community problems?",
        "Warum ist freie Meinungsäußerung unverzichtbar, um Probleme in der Gemeinschaft zu lösen?",
        "Dlaczego wolność słowa jest niezbędna do rozwiązywania problemów we wspólnocie?",
      ),
      options: [
        {
          text: T(
            "It allows citizens and the press to point out broken pipes and errors without fear",
            "Sie erlaubt Bürgern und der Presse, auf kaputte Rohre und Fehler ohne Angst hinzuweisen",
            "Pozwala obywatelom i prasie bez lęku wskazywać awarie, błędy i niegospodarność",
          ),
          correct: true,
        },
        {
          text: T(
            "It makes megaphones cheaper to buy in town shops",
            "Sie macht Megafone in Dorfläden billiger zu kaufen",
            "Sprawia, że tuby nagłaśniające w sklepach stają się tańsze",
          ),
        },
        {
          text: T(
            "It forces everyone to sing songs together every morning",
            "Sie zwingt jeden, jeden Morgen zusammen Lieder zu singen",
            "Zmusza wszystkich do wspólnego śpiewania każdego ranka",
          ),
        },
      ],
      hint: T(
        "Free speech allows people to report bad news early so problems can be patched quickly.",
        "Freie Rede ermöglicht es, schlechte Nachrichten früh zu melden, damit Probleme rasch behoben werden.",
        "Wolność słowa pozwala wcześnie zgłaszać problemy, dzięki czemu usterki można szybko naprawić.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Why does an open society fix problems faster than a dictatorship where people are silenced?",
        "Warum löst eine offene Gesellschaft Probleme schneller als eine Diktatur, in der Menschen schweigen müssen?",
        "Dlaczego otwarte społeczeństwo rozwiązuje problemy szybciej niż dyktatura, w której ucisza się ludzi?",
      ),
      Widget,
      hint: T(
        "Think about what happens when citizens can openly speak the truth and report leaks.",
        "Überlege, was passiert, wenn Bürger offen die Wahrheit sagen und Schäden melden können.",
        "Zastanów się, co się dzieje, gdy obywatele mogą otwarcie mówić prawdę i zgłaszać awarie.",
      ),
    },
  ],
  askDad: T(
    "Papa, why does the constitution protect basic rights and free speech so that no ruler can take them away?",
    "Papa, warum hat das deutsche Grundgesetz Regeln, die niemals geändert werden dürfen, nicht einmal durch Mehrheitsbeschluss?",
    "Tato, dlaczego konstytucja chroni podstawowe prawa i wolność słowa tak, by żaden władca nie mógł ich odebrać?",
  ),
  realLife: {
    title: {
      en: "The Emergency and Constitutional Safeguards in India",
      de: "Die Ewigkeitsklausel im Grundgesetz",
      pl: "Gwarancje konstytucyjne i obrona wolności w Polsce",
    },
    body: {
      en: "During the Emergency in India (1975 to 1977), civil liberties were suspended, press censorship was imposed, and opposition leaders were jailed. Following immense public pushback and democratic elections, Parliament enacted the 44th Constitutional Amendment in 1978, creating ironclad safeguards so that fundamental rights like Article 21 cannot be suspended even during an emergency.",
      de: "Deutschland litt unter der NS-Diktatur (1933 bis 1945) und der SED-Diktatur in der DDR (1949 bis 1989). Damit dies nie wieder geschieht, schuf das Grundgesetz eine 'Ewigkeitsklausel' (Art. 79 Abs. 3), die Menschenwürde, Demokratie und Rechtsstaatlichkeit für immer schützt.",
      pl: "Polska doświadczyła w XX wieku okupacji totalitarnej oraz dziesięcioleci komunistycznej dyktatury PRL z monopolem jednej partii, cenzurą i stanem wojennym. Pokojowy ruch Solidarności doprowadził do odzyskania wolności w 1989 r. Aby wykluczyć powrót tyranii, Konstytucja RP w art. 13 zakazuje partii odwołujących się do metod totalitarnych, w art. 54 zakazuje cenzury prewencyjnej, a w art. 30 uznaje godność człowieka za nienaruszalną.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Constitutional anti-authoritarian clauses prohibit political organizations whose programs appeal to totalitarian methods and practices of Nazism, fascism, or communism.",
          de: "Artikel 79 Absatz 3 des Grundgesetzes (die Ewigkeitsklausel) verbietet jede Änderung der Menschenwürde sowie der demokratischen Grundordnung.",
          pl: "Art. 13 Konstytucji RP zakazuje istnienia partii i organizacji odwołujących się w swoich programach do totalitarnych metod i praktyk nazizmu, faszyzmu i komunizmu.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
      {
        text: {
          en: "Constitutional human dignity clauses establish inherent and inalienable dignity as the untouchable foundation of all state and individual rights.",
          de: "Artikel 1 Absatz 1 des Grundgesetzes bestimmt: 'Die Würde des Menschen ist unantastbar. Sie zu achten und zu schützen ist Verpflichtung aller staatlichen Gewalt.'",
          pl: "Art. 30 Konstytucji RP deklaruje: 'Przyrodzona i niezbywalna godność człowieka stanowi źródło wolności i praw człowieka i obywatela. Jest ona nienaruszalna, a jej poszanowanie i ochrona jest obowiązkiem władz publicznych'.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
      {
        text: {
          en: "Constitutional free speech provisions guarantee freedom of expression and explicitly prohibit preemptive censorship of news media.",
          de: "Artikel 5 des Grundgesetzes garantiert die Pressefreiheit und bestimmt ausdrücklich: 'Eine Zensur findet nicht statt.'",
          pl: "Art. 54 Konstytucji RP gwarantuje wolność wyrażania swoich poglądów oraz pozyskiwania i rozpowszechniania informacji, jednoznacznie zakazując cenzury prewencyjnej.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
      {
        text: {
          en: "Historical archives document that authoritarian suppression of feedback mechanisms and independent journalism causes systemic blindness and governance failures.",
          de: "Historische Studien des Deutschen Historischen Museums belegen den Zusammenbruch staatlicher Fehlerrückmeldung unter totalitärer Pressekontrolle.",
          pl: "Zbiory Europejskiego Centrum Solidarności i Ośrodka KARTA dokumentują, jak monopol informacyjny i brak niezależnej prasy w PRL prowadziły do zatajania katastrof i kryzysów.",
        },
        source: "https://ecs.gda.pl",
      },
      {
        text: {
          en: "Civic education institutions define dictatorship by the lack of separation of powers, absence of legitimate political opposition, and violation of human rights.",
          de: "Materialien der Bundeszentrale für politische Bildung definieren Diktaturen durch das Fehlen von Gewaltenteilung und die Unterdrückung der Opposition.",
          pl: "Opracowania edukacyjne Centrum Edukacji Obywatelskiej definiują dyktaturę poprzez brak trójpodziału władzy, eliminację opozycji i tłumienie praw obywatelskich.",
        },
        source: "https://ceo.org.pl",
      },
    ],
    simplified: [
      {
        en: "We demonstrate the danger of dictatorship through a silenced leaking water pipe, illustrating the failure of feedback loops.",
        de: "Wir zeigen die Gefahr einer Diktatur anhand eines verschwiegenen Wasserrohrbruchs, der das Scheitern von Rückmeldungen verdeutlicht.",
        pl: "Przedstawiamy niebezpieczeństwo dyktatury na przykładzie zatajonego wycieku wody z rury, ilustrując zgubne skutki braku informacji zwrotnej.",
      },
      {
        en: "We portray dictatorships as systems where fear replaces cooperation and accountability.",
        de: "Wir stellen Diktaturen als Systeme dar, in denen Angst das Vertrauen und die Rechenschaftspflicht verdrängt.",
        pl: "Ukazujemy dyktaturę jako ustrój, w którym strach niszczy współpracę, zaufanie i odpowiedzialność.",
      },
      {
        en: "We explain constitutional guardrails and eternity clauses as permanent safety locks that protect human rights.",
        de: "Wir erklären Verfassungsregeln als unumstößliche Schutzschlösser, die Menschenrechte für immer sichern.",
        pl: "Tłumaczymy konstytucyjne bezpieczniki jako trwałe zamki ochronne, które na zawsze zabezpieczają podstawowe prawa człowieka.",
      },
    ],
  },
};
