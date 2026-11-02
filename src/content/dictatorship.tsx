import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { TakeoverDiagram, SilencedFeedbackDiagram, ContrastDiagram, SafeguardsDiagram, VigilanceDiagram } from "./dictatorship.diagrams";
import { DictatorshipToy } from "./dictatorship.toy";

const T = (en: string, de: string): Text => ({ en, de });

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
          "Im Fernen Hafen übernahm ein neuer Machthaber namens Barnaby mit Gewalt die Kontrolle."
        ),
        T(
          "A *dictatorship* is a system where one leader or small group rules with unchecked power.",
          "Eine *Diktatur* ist ein System, in dem ein Anführer oder eine kleine Gruppe mit unkontrollierter Macht herrscht."
        ),
        T(
          "At first, Barnaby promised: 'No more slow debates or meetings, I make decisions fast!'",
          "Zuerst versprach Barnaby: 'Keine langsamen Debatten oder Treffen mehr, ich entscheide schnell!'"
        ),
        T(
          "But soon, Barnaby banned public gatherings and shut down the town newspaper.",
          "Doch bald verbot Barnaby Versammlungen und schloss die Dorfzeitung."
        ),
      ],
      TakeoverDiagram
    ),
    animatedBeat(
      [
        T(
          "Barnaby took people's fishing boats and told workers where they were forced to work.",
          "Barnaby nahm den Menschen die Fischerboote weg und zwang Arbeiter an bestimmte Plätze."
        ),
        T(
          "One cold night, a major fresh water pipe cracked right under Main Street.",
          "In einer kalten Nacht platzte ein großes Trinkwasserrohr direkt unter der Hauptstraße."
        ),
        T(
          "Workers saw water leaking, but they were terrified to report the bad news to Barnaby.",
          "Arbeiter sahen das Wasser austreten, hatten aber schreckliche Angst, Barnaby die schlechte Nachricht zu bringen."
        ),
        T(
          "In a dictatorship, anyone who speaks about problems or mistakes is often punished.",
          "In einer Diktatur wird oft jeder bestraft, der über Probleme oder Fehler berichtet."
        ),
      ],
      SilencedFeedbackDiagram
    ),
    animatedBeat(
      [
        T(
          "Because nobody was allowed to speak the truth, the small leak flooded the cellars for weeks.",
          "Weil niemand die Wahrheit sagen durfte, überschwemmte das Leck wochenlang die Keller."
        ),
        T(
          "Otto explains: 'Freedom of speech is not just an idea, it is a practical tool to fix mistakes.'",
          "Otto erklärt: 'Meinungsfreiheit ist nicht nur eine Idee, sondern ein Werkzeug um Fehler zu beheben.'"
        ),
        T(
          "Without free elections, citizens have no peaceful way to replace harmful leaders.",
          "Ohne freie Wahlen haben die Bürger keinen friedlichen Weg, schädliche Anführer abzulösen."
        ),
        T(
          "When power is unchecked, fear replaces trust and common problems stay broken.",
          "Wenn Macht unkontrolliert ist, ersetzt Angst das Vertrauen und gemeinsame Probleme bleiben ungelöst."
        ),
      ],
      ContrastDiagram
    ),
    animatedBeat(
      [
        T(
          "To protect against dictatorship, societies build permanent safeguards into their laws.",
          "Um sich vor Diktaturen zu schützen, bauen Gesellschaften dauerhafte Schutzregeln in Gesetze ein."
        ),
        T(
          "These include independent courts, a free press, and constitutional rights that cannot be cancelled.",
          "Dazu gehören unabhängige Gerichte, eine freie Presse und unveräußerliche Grundrechte."
        ),
        T(
          "Protecting every person's dignity and freedom ensures that power serves the people, not the other way around.",
          "Der Schutz von Würde und Freiheit sichert, dass Macht dem Volk dient und nicht umgekehrt."
        ),
      ],
      SafeguardsDiagram
    ),
    animatedBeat(
      [
        T(
          "Citizens must stay attentive and care for their democratic community.",
          "Bürger müssen aufmerksam bleiben und sich um ihre demokratische Gemeinschaft kümmern."
        ),
        T(
          "Every generation has the responsibility to defend freedom, dignity, and fair laws.",
          "Jede Generation hat die Verantwortung, Freiheit, Würde und faire Gesetze zu verteidigen."
        ),
      ],
      VigilanceDiagram
    ),
  ],
  toyIntro: T(
    "Experience the difference between silenced communication in a dictatorship and open problem-solving.",
    "Erlebe den Unterschied zwischen unterdrückter Rückmeldung in einer Diktatur und offener Problemlösung."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is a dictatorship dangerous for a community?",
        "Warum ist eine Diktatur gefährlich für eine Gemeinschaft?"
      ),
      options: [
        {
          text: T(
            "Power is unchecked, people cannot speak up about mistakes, and bad leaders cannot be voted out",
            "Macht ist unkontrolliert, Menschen dürfen Fehler nicht ansprechen und schlechte Anführer nicht abwählen"
          ),
          correct: true,
        },
        {
          text: T(
            "It gives everyone too many free holidays and ice cream",
            "Sie gibt jedem zu viele freie Urlaubstage und Eis"
          ),
        },
        {
          text: T(
            "There are too many elections happening every single day",
            "Es finden jeden Tag viel zu viele Wahlen statt"
          ),
        },
      ],
      hint: T(
        "Without checks and balances, leaders cannot be held accountable and citizens live in fear.",
        "Ohne Kontrollen können Anführer nicht zur Rechenschaft gezogen werden und Bürger leben in Angst."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is freedom of speech essential for solving community problems?",
        "Warum ist freie Meinungsäußerung unverzichtbar, um Probleme in der Gemeinschaft zu lösen?"
      ),
      options: [
        {
          text: T(
            "It allows citizens and the press to point out broken pipes and errors without fear",
            "Sie erlaubt Bürgern und der Presse, auf kaputte Rohre und Fehler ohne Angst hinzuweisen"
          ),
          correct: true,
        },
        {
          text: T(
            "It makes megaphones cheaper to buy in town shops",
            "Sie macht Megafone in Dorfläden billiger zu kaufen"
          ),
        },
        {
          text: T(
            "It forces everyone to sing songs together every morning",
            "Sie zwingt jeden, jeden Morgen zusammen Lieder zu singen"
          ),
        },
      ],
      hint: T(
        "Free speech allows people to report bad news early so problems can be patched quickly.",
        "Freie Rede ermöglicht es, schlechte Nachrichten früh zu melden, damit Probleme rasch behoben werden."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Why does an open society fix problems faster than a dictatorship where people are silenced?",
        "Warum löst eine offene Gesellschaft Probleme schneller als eine Diktatur, in der Menschen schweigen müssen?"
      ),
      Widget: Widget,
      hint: T(
        "Think about what happens when citizens can openly speak the truth and report leaks.",
        "Überlege, was passiert, wenn Bürger offen die Wahrheit sagen und Schäden melden können."
      ),
    },
  ],
  askDad: T(
    "Papa, why does Germany's Basic Law (Grundgesetz) have rules that can never be changed, even by a majority vote?",
    "Papa, warum hat das deutsche Grundgesetz Regeln, die niemals geändert werden dürfen, nicht einmal durch Mehrheitsbeschluss?"
  ),
  realLife: {
    title: T("The Eternity Clause in the Basic Law", "Die Ewigkeitsklausel im Grundgesetz"),
    body: T(
      "Germany suffered under the Nazi dictatorship (1933 to 1945) and the communist dictatorship in East Germany (1949 to 1989). To ensure this never happens again, the German Grundgesetz created an 'eternity clause' (Article 79, Paragraph 3) protecting human dignity, democracy, and the rule of law forever.",
      "Deutschland litt unter der NS-Diktatur (1933 bis 1945) und der SED-Diktatur in der DDR (1949 bis 1989). Damit dies nie wieder geschieht, schuf das Grundgesetz eine 'Ewigkeitsklausel' (Art. 79 Abs. 3), die Menschenwürde, Demokratie und Rechtsstaatlichkeit für immer schützt."
    ),
  },
  factCard: {
    claims: [
      {
        text: "Article 79, Paragraph 3 of the German Basic Law (the 'Eternity Clause') prohibits amendments affecting human dignity or the democratic, social, and federal principles.",
        source: "https://www.gesetze-im-internet.de/gg/art_79.html",
      },
      {
        text: "Historical scholarship documents how total executive power under the National Socialist regime dismantled the rule of law, basic rights, and independent courts.",
        source: "https://www.dhm.de/lemo/",
      },
      {
        text: "The concept of 'fortified democracy' (wehrhafte Demokratie) empowers constitutional institutions to defend civil liberties against authoritarian overthrow.",
        source: "https://www.bundesverfassungsgericht.de/",
      },
      {
        text: "The Federal Commissioner for Data Protection and Freedom of Information oversees public access to government files to maintain transparency.",
        source: "https://www.bfdi.bund.de/",
      },
      {
        text: "Civic education materials define dictatorship by the absence of separation of powers, lack of legitimate opposition, and suppression of basic human rights.",
        source: "https://www.bpb.de/themen/politisches-system/politik-einfach-fuer-alle/",
      },
    ],
    simplified: [
      "We demonstrate the danger of dictatorship through a silenced leaking water pipe, illustrating the failure of feedback loops.",
      "We portray dictatorships as systems where fear replaces cooperation and accountability.",
      "We explain constitutional guardrails and eternity clauses as permanent safety locks that protect human rights.",
    ],
  },
};
