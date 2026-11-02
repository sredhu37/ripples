import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { TimberDiagram, DebateDiagram, BoothDiagram, CountDiagram, PrinciplesDiagram } from "./elections.diagrams";
import { ElectionsToy } from "./elections.toy";

const T = (en: string, de: string): Text => ({ en, de });

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
          "Ripple Town hatte in dieser Saison nur genug stabiles Bauholz für ein einziges großes Projekt."
        ),
        T(
          "Moss wanted to build a stone and timber harbor pier so fishing boats could dock safely.",
          "Moss wollte einen Hafenanleger aus Stein und Holz bauen, damit Fischerboote sicher anlegen können."
        ),
        T(
          "Pip wanted to build a shaded market pavilion where families could sell crafts and children could play.",
          "Pip wollte einen schattigen Marktpavillon bauen, in dem Familien Handwerk verkaufen und Kinder spielen können."
        ),
        T(
          "Both ideas were wonderful, but the town had limited resources and had to choose.",
          "Beide Ideen waren wunderbar, aber das Dorf hatte begrenzte Mittel und musste sich entscheiden."
        ),
      ],
      TimberDiagram
    ),
    animatedBeat(
      [
        T(
          "Some villagers started shouting loudly, trying to see who had the loudest voice.",
          "Einige Dorfbewohner fingen an laut zu rufen, um zu sehen, wer die lauteste Stimme hatte."
        ),
        T(
          "Otto stepped forward: 'Shouting does not tell us what the whole town truly needs.'",
          "Otto trat vor: 'Schreien zeigt uns nicht, was das ganze Dorf wirklich braucht.'"
        ),
        T(
          "'Instead of fighting or letting the strongest person decide, we will hold an election.'",
          "'Statt zu streiten oder den Stärksten entscheiden zu lassen, halten wir eine Wahl ab.'"
        ),
        T(
          "In an election, every single adult gets one equal voice and one equal vote.",
          "Bei einer Wahl erhält jeder einzelne Erwachsene eine gleiche Stimme."
        ),
      ],
      DebateDiagram
    ),
    animatedBeat(
      [
        T(
          "The villagers set up a wooden booth with a curtain so nobody could peek inside.",
          "Die Dorfbewohner bauten eine Holzkabine mit einem Vorhang auf, damit niemand hineinschauen konnte."
        ),
        T(
          "Each person marked their paper ballot completely in private.",
          "Jede Person kreuzte ihren Stimmzettel ganz privat an."
        ),
        T(
          "Secret voting protects everyone so people can vote their conscience without fear of pressure.",
          "Die geheime Wahl schützt jeden, damit man ohne Angst vor Druck nach seinem Gewissen wählen kann."
        ),
        T(
          "Each voter folded their paper and dropped it into a locked wooden ballot box.",
          "Jeder Wähler faltete sein Papier und warf es in eine verschlossene hölzerne Wahlurne."
        ),
      ],
      BoothDiagram
    ),
    animatedBeat(
      [
        T(
          "When all ballots were inside, the town council opened the box in front of everyone.",
          "Als alle Stimmzettel drin waren, öffnete der Dorfrat die Kiste vor allen Leuten."
        ),
        T(
          "Every vote was unfolded and counted out loud on the community board.",
          "Jede Stimme wurde auseinandergefaltet und laut an der Gemeinschaftstafel gezählt."
        ),
        T(
          "Three votes were for the harbor pier, and two votes were for the market pavilion.",
          "Drei Stimmen waren für den Hafenanleger und zwei Stimmen für den Marktpavillon."
        ),
        T(
          "Because the count was open and honest, everyone respected the winning result peacefully.",
          "Weil die Auszählung offen und ehrlich war, respektierten alle das Ergebnis friedlich."
        ),
      ],
      CountDiagram
    ),
    animatedBeat(
      [
        T(
          "Elections provide a peaceful way to make shared decisions and choose leaders.",
          "Wahlen bieten einen friedlichen Weg, gemeinsame Entscheidungen zu treffen und Anführer zu wählen."
        ),
        T(
          "The three golden rules of elections are: equal votes, secret ballots, and freedom from pressure.",
          "Die drei goldenen Regeln von Wahlen sind: gleiche Stimmen, geheime Wahl und Freiheit von Druck."
        ),
        T(
          "If leaders do a poor job, citizens can peacefully choose someone else at the next election.",
          "Wenn Anführer schlechte Arbeit leisten, können die Bürger bei der nächsten Wahl friedlich andere wählen."
        ),
      ],
      PrinciplesDiagram
    ),
  ],
  toyIntro: T(
    "Step into the voting hall, cast secret ballots for the villagers, and count the final results.",
    "Tritt in das Wahllokal ein, gib geheime Stimmen für die Dorfbewohner ab und zähle das Ergebnis."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is it important that voting happens secretly inside a curtained booth?",
        "Warum ist es wichtig, dass die Wahl geheim hinter einem Vorhang stattfindet?"
      ),
      options: [
        {
          text: T(
            "So everyone can vote their honest conscience without fear of pressure or punishment",
            "Damit jeder ehrlich nach seinem Gewissen wählen kann, ohne Angst vor Druck oder Bestrafung"
          ),
          correct: true,
        },
        {
          text: T(
            "Because voting booths are fun places to play hide and seek",
            "Weil Wahlkabinen lustige Orte zum Versteckspielen sind"
          ),
        },
        {
          text: T(
            "So that ballots can dry faster in the dark",
            "Damit die Stimmzettel im Dunkeln schneller trocknen"
          ),
        },
      ],
      hint: T(
        "Secret voting ensures that nobody can bully or force you to vote against your will.",
        "Die geheime Wahl stellt sicher, dass dich niemand einschüchtern oder gegen deinen Willen zwingen kann."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What happens in an election if people disagree on which leader or project to pick?",
        "Was passiert bei einer Wahl, wenn Menschen unterschiedlicher Meinung über Anführer oder Projekte sind?"
      ),
      options: [
        {
          text: T(
            "The option or candidate that receives the most votes wins peacefully",
            "Die Option oder der Kandidat mit den meisten Stimmen gewinnt friedlich"
          ),
          correct: true,
        },
        {
          text: T(
            "The person who shouts the loudest gets their way",
            "Die Person, die am lautesten schreit, setzt sich durch"
          ),
        },
        {
          text: T(
            "The village cancels all projects and closes down",
            "Das Dorf bricht alle Projekte ab und schließt"
          ),
        },
      ],
      hint: T(
        "Elections count every voice equally so decisions are made by majority rule without fighting.",
        "Wahlen zählen jede Stimme gleich, sodass Entscheidungen durch Mehrheitsentscheid ohne Streit fallen."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Three villagers voted for the harbor pier and two voted for the pavilion. Select the winning project.",
        "Drei Dorfbewohner stimmten für den Hafenanleger und zwei für den Pavillon. Wähle das Gewinnerprojekt."
      ),
      Widget: Widget,
      hint: T(
        "Select the harbor pier since 3 votes is greater than 2 votes.",
        "Wähle den Hafenanleger, da 3 Stimmen mehr als 2 Stimmen sind."
      ),
    },
  ],
  askDad: T(
    "Papa, why is it so important that nobody is allowed to look at your ballot when you vote behind the curtain?",
    "Papa, warum ist es so wichtig, dass niemand auf deinen Stimmzettel schauen darf, wenn du hinter dem Vorhang wählst?"
  ),
  realLife: {
    title: T("Elections to the German Bundestag", "Wahlen zum Deutschen Bundestag"),
    body: T(
      "Every four years, German citizens elect the German Bundestag in a general election. Grundgesetz Article 38 guarantees that elections are general, direct, free, equal, and secret.",
      "Alle vier Jahre wählen die deutschen Bürger den Deutschen Bundestag in einer allgemeinen Wahl. Grundgesetz Artikel 38 garantiert, dass Wahlen allgemein, unmittelbar, frei, gleich und geheim sind."
    ),
  },
  factCard: {
    claims: [
      {
        text: "Article 38 of the German Basic Law guarantees that members of the German Bundestag are elected in general, direct, free, equal, and secret elections.",
        source: "https://www.gesetze-im-internet.de/gg/art_38.html",
      },
      {
        text: "The Federal Returning Officer (Die Bundeswahlleiterin) supervises elections to ensure transparency, neutrality, and equal voting standards across Germany.",
        source: "https://www.bundeswahlleiterin.de/bundestagswahlen/2025/informationen-waehler/wahlsystem.html",
      },
      {
        text: "Federal elections to the Bundestag occur every four years unless the parliament is dissolved early under constitutional provisions.",
        source: "https://www.bundestag.de/wahlen",
      },
      {
        text: "The German Federal Electoral Act (Bundeswahlgesetz) specifies balloting procedures, private voting compartments, and public ballot counts.",
        source: "https://www.gesetze-im-internet.de/bwo_1975/",
      },
      {
        text: "Civic education standards emphasize that competitive democratic elections enable peaceful succession of power and accountable representation.",
        source: "https://www.bpb.de/themen/politisches-system/wahlen/",
      },
    ],
    simplified: [
      "We explain voting using two concrete village construction choices so an 8-year-old child grasps majority decisions.",
      "We highlight the private voting booth and secret paper slips to show why privacy protects voter conscience.",
      "We show public counting as the key reason why all citizens trust and accept the election outcome.",
    ],
  },
};
