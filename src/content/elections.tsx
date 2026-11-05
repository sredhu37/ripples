import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BoothDiagram,
  CountDiagram,
  DebateDiagram,
  PrinciplesDiagram,
  TimberDiagram,
} from "./elections.diagrams";
import { ElectionsToy } from "./elections.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <ElectionsToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <ElectionsToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "elections",
  story: [
    animatedBeat(
      [
        T(
          "Ripple Town had enough sturdy timber for only one major project this season.",
          "Ripple Town hatte in dieser Saison nur genug stabiles Bauholz für ein einziges großes Projekt.",
          "Ripple Town miało w tym sezonie wystarczająco dużo solidnego drewna tylko na jeden wielki projekt.",
        ),
        T(
          "Moss wanted to build a stone and timber harbor pier so fishing boats could dock safely.",
          "Moss wollte einen Hafenanleger aus Stein und Holz bauen, damit Fischerboote sicher anlegen können.",
          "Moss chciał zbudować mocny pomost rybacki z kamienia i bali, aby łodzie mogły bezpiecznie cumować.",
        ),
        T(
          "Pip wanted to build a shaded market pavilion where families could sell crafts and children could play.",
          "Pip wollte einen schattigen Marktpavillon bauen, in dem Familien Handwerk verkaufen und Kinder spielen können.",
          "Pip wolał postawić zadaszony pawilon targowy, gdzie rodziny mogłyby sprzedawać wyroby, a dzieci bawić się w cieniu.",
        ),
        T(
          "Both ideas were wonderful, but the town had limited resources and had to choose.",
          "Beide Ideen waren wunderbar, aber das Dorf hatte begrenzte Mittel und musste sich entscheiden.",
          "Oba pomysły były wspaniałe, lecz miasteczko miało ograniczone zasoby i musiało dokonać wyboru.",
        ),
      ],
      TimberDiagram,
    ),
    animatedBeat(
      [
        T(
          "Some villagers started shouting loudly, trying to see who had the loudest voice.",
          "Einige Dorfbewohner fingen an laut zu rufen, um zu sehen, wer die lauteste Stimme hatte.",
          "Niektórzy mieszkańcy zaczęli głośno krzyczeć, próbując przekonać innych siłą głosu.",
        ),
        T(
          "Otto stepped forward: 'Shouting does not tell us what the whole town truly needs.'",
          "Otto trat vor: 'Schreien zeigt uns nicht, was das ganze Dorf wirklich braucht.'",
          "Otto wystąpił naprzód: 'Przekrzykiwanie się nie powie nam, czego naprawdę potrzebuje całe miasteczko.'",
        ),
        T(
          "'Instead of fighting or letting the strongest person decide, we will hold an election.'",
          "'Statt zu streiten oder den Stärksten entscheiden zu lassen, halten wir eine Wahl ab.'",
          "'Zamiast kłótni czy oddawania władzy najsilniejszemu, przeprowadzimy uczciwe wybory.'",
        ),
        T(
          "In an election, every single adult gets one equal voice and one equal vote.",
          "Bei einer Wahl erhält jeder einzelne Erwachsene eine gleiche Stimme.",
          "W wyborach każdy dorosły mieszkaniec ma jeden równy głos o dokładnie takiej samej wadze.",
        ),
      ],
      DebateDiagram,
    ),
    animatedBeat(
      [
        T(
          "The villagers set up a wooden booth with a curtain so nobody could peek inside.",
          "Die Dorfbewohner bauten eine Holzkabine mit einem Vorhang auf, damit niemand hineinschauen konnte.",
          "Mieszkańcy ustawili drewnianą kabinę z zasłoną, aby nikt nie mógł podejrzeć cudzej decyzji.",
        ),
        T(
          "Each person marked their paper ballot completely in private.",
          "Jede Person kreuzte ihren Stimmzettel ganz privat an.",
          "Każdy zaznaczał swój wybór na karcie do głosowania w pełnej dyskrecji.",
        ),
        T(
          "Secret voting protects everyone so people can vote their conscience without fear of pressure.",
          "Die geheime Wahl schützt jeden, damit man ohne Angst vor Druck nach seinem Gewissen wählen kann.",
          "Tajność głosowania chroni każdego, pozwalając decydować zgodnie z własnym sumieniem bez obawy o naciski.",
        ),
        T(
          "Each voter folded their paper and dropped it into a locked wooden ballot box.",
          "Jeder Wähler faltete sein Papier und warf es in eine verschlossene hölzerne Wahlurne.",
          "Każdy wyborca składał kartę na pół i wrzucał ją do zapieczętowanej drewnianej urny wyborczej.",
        ),
      ],
      BoothDiagram,
    ),
    animatedBeat(
      [
        T(
          "When all ballots were inside, the town council opened the box in front of everyone.",
          "Als alle Stimmzettel drin waren, öffnete der Dorfrat die Kiste vor allen Leuten.",
          "Gdy wszystkie karty znalazły się w środku, rada otworzyła urnę na oczach zgromadzonych mieszkańców.",
        ),
        T(
          "Every vote was unfolded and counted out loud on the community board.",
          "Jede Stimme wurde auseinandergefaltet und laut an der Gemeinschaftstafel gezählt.",
          "Każdy głos był rozkładany i głośno liczony przy tablicy ogłoszeń.",
        ),
        T(
          "Three votes were for the harbor pier, and two votes were for the market pavilion.",
          "Drei Stimmen waren für den Hafenanleger und zwei Stimmen für den Marktpavillon.",
          "Trzy głosy oddano na pomost rybacki, a dwa głosy na pawilon targowy.",
        ),
        T(
          "Because the count was open and honest, everyone respected the winning result peacefully.",
          "Weil die Auszählung offen und ehrlich war, respektierten alle das Ergebnis friedlich.",
          "Ponieważ liczenie było jawne i uczciwe, wszyscy z szacunkiem i spokojem przyjęli wynik większości.",
        ),
      ],
      CountDiagram,
    ),
    animatedBeat(
      [
        T(
          "Elections provide a peaceful way to make shared decisions and choose leaders.",
          "Wahlen bieten einen friedlichen Weg, gemeinsame Entscheidungen zu treffen und Anführer zu wählen.",
          "Wybory zapewniają pokojowy sposób podejmowania wspólnych decyzji i wyłaniania przywódców.",
        ),
        T(
          "The three golden rules of elections are: equal votes, secret ballots, and freedom from pressure.",
          "Die drei goldenen Regeln von Wahlen sind: gleiche Stimmen, geheime Wahl und Freiheit von Druck.",
          "Trzy złote zasady wyborów to: równość głosów, tajność głosowania oraz wolność od przymusu.",
        ),
        T(
          "If leaders do a poor job, citizens can peacefully choose someone else at the next election.",
          "Wenn Anführer schlechte Arbeit leisten, können die Bürger bei der nächsten Wahl friedlich andere wählen.",
          "Jeśli rządzący zawodzą zaufanie, obywatele mogą pokojowo wybrać kogoś innego w kolejnych wyborach.",
        ),
      ],
      PrinciplesDiagram,
    ),
  ],
  toyIntro: T(
    "Step into the voting hall, cast secret ballots for the villagers, and count the final results.",
    "Tritt in das Wahllokal ein, gib geheime Stimmen für die Dorfbewohner ab und zähle das Ergebnis.",
    "Wejdź do lokalu wyborczego, wrzuć tajne karty mieszkańców do urny i podlicz wyniki.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is it important that voting happens secretly inside a curtained booth?",
        "Warum ist es wichtig, dass die Wahl geheim hinter einem Vorhang stattfindet?",
        "Dlaczego tak ważne jest, aby głosowanie odbywało się w sposób tajny, za zasłoną w kabinie?",
      ),
      options: [
        {
          text: T(
            "So everyone can vote their honest conscience without fear of pressure or punishment",
            "Damit jeder ehrlich nach seinem Gewissen wählen kann, ohne Angst vor Druck oder Bestrafung",
            "Aby każdy mógł zagłosować zgodnie ze swoim sumieniem, bez lęku przed naciskiem czy karą",
          ),
          correct: true,
        },
        {
          text: T(
            "Because voting booths are fun places to play hide and seek",
            "Weil Wahlkabinen lustige Orte zum Versteckspielen sind",
            "Ponieważ kabiny wyborcze to świetne kryjówki do zabawy w chowanego",
          ),
        },
        {
          text: T(
            "So that ballots can dry faster in the dark",
            "Damit die Stimmzettel im Dunkeln schneller trocknen",
            "Aby atrament na kartach do głosowania szybciej sechł w ciemności",
          ),
        },
      ],
      hint: T(
        "Secret voting ensures that nobody can bully or force you to vote against your will.",
        "Die geheime Wahl stellt sicher, dass dich niemand einschüchtern oder gegen deinen Willen zwingen kann.",
        "Tajne głosowanie daje pewność, że nikt nie może cię zastraszyć ani zmusić do wbrew twojej woli.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What happens in an election if people disagree on which leader or project to pick?",
        "Was passiert bei einer Wahl, wenn Menschen unterschiedlicher Meinung über Anführer oder Projekte sind?",
        "Co decyduje w wyborach, gdy obywatele różnią się w zdaniach na temat kandydatów lub projektów?",
      ),
      options: [
        {
          text: T(
            "The option or candidate that receives the most votes wins peacefully",
            "Die Option oder der Kandidat mit den meisten Stimmen gewinnt friedlich",
            "Projekt lub kandydat, który uzyska największą liczbę głosów, wygrywa w sposób pokojowy",
          ),
          correct: true,
        },
        {
          text: T(
            "The person who shouts the loudest gets their way",
            "Die Person, die am lautesten schreit, setzt sich durch",
            "Wygrywa ten, kto potrafi najgłośniej krzyczeć na rynku",
          ),
        },
        {
          text: T(
            "The village cancels all projects and closes down",
            "Das Dorf bricht alle Projekte ab und schließt",
            "Miasteczko zamyka wszystkie bramy i rezygnuje ze wszystkich planów",
          ),
        },
      ],
      hint: T(
        "Elections count every voice equally so decisions are made by majority rule without fighting.",
        "Wahlen zählen jede Stimme gleich, sodass Entscheidungen durch Mehrheitsentscheid ohne Streit fallen.",
        "Wybory liczą każdy głos równo, dzięki czemu decyduje większość bez użycia siły.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Three villagers voted for the harbor pier and two voted for the pavilion. Select the winning project.",
        "Drei Dorfbewohner stimmten für den Hafenanleger und zwei für den Pavillon. Wähle das Gewinnerprojekt.",
        "Troje mieszkańców zagłosowało na pomost, a dwoje na pawilon. Wskaż zwycięski projekt.",
      ),
      Widget,
      hint: T(
        "Select the harbor pier since 3 votes is greater than 2 votes.",
        "Wähle den Hafenanleger, da 3 Stimmen mehr als 2 Stimmen sind.",
        "Wybierz pomost rybacki, ponieważ 3 głosy to więcej niż 2 głosy.",
      ),
    },
  ],
  askDad: T(
    "Papa, why is it so important that nobody is allowed to look at your ballot when you vote behind the curtain?",
    "Papa, warum ist es so wichtig, dass niemand auf deinen Stimmzettel schauen darf, wenn du hinter dem Vorhang wählst?",
    "Tato, dlaczego to takie ważne, by nikt nie mógł podglądać twojej karty, gdy głosujesz za zasłoną?",
  ),
  realLife: {
    title: {
      en: "General Elections to the Lok Sabha in India",
      de: "Wahlen zum Deutschen Bundestag",
      pl: "Wybory do Sejmu i Senatu w Polsce",
    },
    body: {
      en: "India conducts the world's largest democratic election with nearly a billion eligible voters. The independent Election Commission of India (ECI), established under Article 324 of the Constitution, oversees universal adult suffrage, secret voting via Electronic Voting Machines (EVMs with paper audit trail VVPAT), and peaceful transfer of power.",
      de: "Alle vier Jahre wählen die deutschen Bürger den Deutschen Bundestag in einer allgemeinen Wahl. Grundgesetz Artikel 38 garantiert, dass Wahlen allgemein, unmittelbar, frei, gleich und geheim sind.",
      pl: "W Polsce wybory parlamentarne organizuje i nadzoruje Państwowa Komisja Wyborcza (PKW). Zgodnie z art. 96 Konstytucji RP wybory do Sejmu są powszechne, równe, bezpośrednie i proporcjonalne oraz odbywają się w głosowaniu tajnym. Zasłonięte kabiny wyborcze chronią wolność wyboru każdego obywatela.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Constitutional election provisions guarantee that parliamentary deputies are chosen in general, direct, free, equal, and secret elections.",
          de: "Artikel 38 des Grundgesetzes garantiert, dass die Abgeordneten des Deutschen Bundestages in allgemeiner, unmittelbarer, freier, gleicher und geheimer Wahl gewählt werden.",
          pl: "Art. 96 Konstytucji Rzeczypospolitej Polskiej stanowi, że wybory do Sejmu są powszechne, równe, bezpośrednie i proporcjonalne oraz odbywają się w głosowaniu tajnym.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
      {
        text: {
          en: "Independent election management bodies supervise electoral rolls, polling places, balloting neutrality, and tally integrity.",
          de: "Die Bundeswahlleiterin überwacht die ordnungsgemäße Durchführung der Bundestagswahl und verkündet das amtliche Endergebnis.",
          pl: "Kodeks wyborczy powierza stałe sprawowanie nadzoru nad przestrzeganiem prawa wyborczego Państwowej Komisji Wyborczej (PKW) oraz Krajowemu Biuru Wyborczemu.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20110210112",
      },
      {
        text: {
          en: "Constitutional law specifies fixed parliamentary terms ensuring periodic elections and institutional accountability to the electorate.",
          de: "Der Deutsche Bundestag wird auf vier Jahre gewählt; vorzeitige Neuwahlen sind an strenge verfassungsrechtliche Hürden geknüpft.",
          pl: "Art. 98 Konstytucji RP ustala czteroletnią kadencję Sejmu i Senatu, gwarantując regularność weryfikacji władzy przez obywateli.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
      {
        text: {
          en: "Statutory electoral codes define mandatory voter secrecy safeguards including private voting booths and uniform locked ballot receptacles.",
          de: "Das Bundeswahlgesetz regelt detailliert die Bereitstellung von blickdichten Wahlkabinen und versiegelten Wahlurnen in allen Wahllokalen.",
          pl: "Kodeks wyborczy nakazuje zapewnienie w każdym lokalu wyborczym osłoniętych miejsc zapewniających tajność głosowania oraz przezroczystych, zapieczętowanych urn.",
        },
        source: "https://pkw.gov.pl",
      },
      {
        text: {
          en: "Political science consensus highlights competitive universal elections as the core peaceful mechanism for political accountability and power transition.",
          de: "Die Bundeszentrale für politische Bildung betont Wahlen als zentrales Instrument demokratischer Herrschaftskontrolle und friedlichen Regierungswechsels.",
          pl: "Opracowania politologiczne i edukacja obywatelska wskazują wolne wybory jako fundament pokojowej sukcesji władzy oraz odpowiedzialności politycznej przed suwerenem.",
        },
        source: "https://www.batory.org.pl",
      },
    ],
    simplified: [
      {
        en: "We explain voting using two concrete village construction choices so children grasp majority decisions.",
        de: "Wir erklären Wahlen anhand zweier konkreter Bauprojekte, damit Kinder Mehrheitsentscheidungen verstehen.",
        pl: "Tłumaczymy ideę głosowania na przykładzie wyboru między dwoma pożytecznymi budowlami, ułatwiając dzieciom zrozumienie woli większości.",
      },
      {
        en: "We highlight the private voting booth and secret paper slips to show why privacy protects voter conscience.",
        de: "Wir betonen die Wahlkabine und geheime Stimmzettel, um zu zeigen, wie Vertraulichkeit das Gewissen schützt.",
        pl: "Podkreślamy rolę kabiny i tajnych kart do głosowania, pokazując, jak prywatność chroni wolność sumienia każdego człowieka.",
      },
      {
        en: "We show public counting as the key reason why all citizens trust and accept the election outcome peacefully.",
        de: "Wir zeigen die öffentliche Stimmauszählung als Grund dafür, dass alle Bürger das Wahlergebnis friedlich anerkennen.",
        pl: "Wskazujemy jawne podliczanie głosów jako kluczowy powód, dla którego wszyscy obywatele ufają wynikom i szanują je w pokoju.",
      },
    ],
  },
};
