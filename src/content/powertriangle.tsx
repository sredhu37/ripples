import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { TriangleNodesDiagram, FlowArrowsDiagram, ImbalanceFailureDiagram, EquilibriumDiagram, HarmonyDiagram } from "./powertriangle.diagrams";
import { PowerTriangleToy } from "./powertriangle.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <PowerTriangleToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <PowerTriangleToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "powertriangle",
  story: [
    animatedBeat(
      [
        T(
          "Otto sits at a large triangular wooden table in the middle of Ripple Town.",
          "Otto sitzt an einem großen dreieckigen Holztisch in der Mitte von Ripple Town."
        ),
        T(
          "At one corner stands Pip representing Citizens and voters.",
          "An einer Ecke steht Pip und vertritt die Bürger und Wähler."
        ),
        T(
          "At the second corner stands Bea representing Businesses and producers.",
          "An der zweiten Ecke steht Bea und vertritt Unternehmen und Produzenten."
        ),
        T(
          "At the third corner stands Moss representing Government and public institutions.",
          "An der dritten Ecke steht Moss und vertritt Regierung und öffentliche Einrichtungen."
        ),
      ],
      TriangleNodesDiagram
    ),
    animatedBeat(
      [
        T(
          "These three corners do not work in isolation; they are connected by continuous flows of cooperation.",
          "Diese drei Ecken arbeiten nicht isoliert; sie sind durch ständige Ströme der Zusammenarbeit verbunden."
        ),
        T(
          "Pip works for Bea, earns wages, buys fresh bread, and votes in elections to choose Moss.",
          "Pip arbeitet für Bea, verdient Lohn, kauft frisches Brot und wählt Moss bei der Wahl."
        ),
        T(
          "Bea pays taxes into the town treasury and relies on Moss for paved roads, clean water, and honest courts.",
          "Bea zahlt Steuern in die Dorfkasse und verlässt sich auf befestigte Straßen, sauberes Wasser und Gerichte."
        ),
        T(
          "Moss creates fair laws that protect Pip from unsafe workshops and keep Bea from forming an unfair monopoly.",
          "Moss schafft faire Gesetze, die Pip vor unsicheren Betrieben schützen und Monopole verhindern."
        ),
      ],
      FlowArrowsDiagram
    ),
    animatedBeat(
      [
        T(
          "Otto pulls one corner of the table away: 'Look what happens if any single corner dominates unchecked.'",
          "Otto zieht an einer Tischecke: 'Schaut, was passiert, wenn eine einzelne Ecke die Kontrolle übernimmt.'"
        ),
        T(
          "If Government takes complete control, personal freedom and private creativity vanish.",
          "Wenn der Staat die totale Kontrolle übernimmt, verschwinden persönliche Freiheit und Kreativität."
        ),
        T(
          "If Businesses dominate unchecked, workers are exploited and natural resources are damaged.",
          "Wenn Unternehmen unkontrolliert herrschen, werden Arbeiter ausgebeutet und Natur geschädigt."
        ),
        T(
          "If Citizens demand endless public benefits without contributing taxes or obeying laws, the town collapses.",
          "Wenn Bürger endlose Leistungen verlangen ohne Steuern zu zahlen, bricht das Dorf zusammen."
        ),
      ],
      ImbalanceFailureDiagram
    ),
    animatedBeat(
      [
        T(
          "A free, prosperous society requires a dynamic, healthy balance among all three corners.",
          "Eine freie, wohlhabende Gesellschaft braucht ein lebendiges Gleichgewicht aller drei Ecken."
        ),
        T(
          "This dynamic relationship is the *Power Triangle*.",
          "Diese dynamische Beziehung ist das *Macht-Dreieck*."
        ),
        T(
          "When Citizens, Businesses, and Government check and balance each other, democracy and freedom flourish.",
          "Wenn Bürger, Unternehmen und Staat sich gegenseitig ausbalancieren, blühen Freiheit und Wohlstand."
        ),
      ],
      EquilibriumDiagram
    ),
    animatedBeat(
      [
        T(
          "When citizens actively participate, businesses innovate responsibly, and governments protect rights, the community thrives.",
          "Wenn Bürger sich aktiv beteiligen, Unternehmen verantwortlich handeln und der Staat Rechte schützt, blüht die Gemeinschaft auf."
        ),
        T(
          "No single group has all the answers, but together in balance they build a peaceful, prosperous world.",
          "Keine Gruppe allein hat alle Antworten, aber gemeinsam im Gleichgewicht bauen sie eine friedliche, gerechte Welt."
        ),
      ],
      HarmonyDiagram
    ),
  ],
  toyIntro: T(
    "Adjust the three power sliders to find the stable equilibrium where Citizens, Businesses, and Government balance each other.",
    "Stelle die drei Machtregler ein, um das stabile Gleichgewicht zwischen Bürgern, Wirtschaft und Staat zu finden."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Who are the three corners of the Power Triangle?",
        "Wer sind die drei Ecken des Macht-Dreiecks?"
      ),
      options: [
        {
          text: T(
            "Citizens (Voters & Workers), Businesses (Producers), and Government (Public Laws & Infrastructure)",
            "Bürger (Wähler & Arbeiter), Unternehmen (Produzenten) und Staat (Gesetze & Infrastruktur)"
          ),
          correct: true,
        },
        {
          text: T(
            "Cats, dogs, and pigeons",
            "Katzen, Hunde und Tauben"
          ),
        },
        {
          text: T(
            "The sun, the moon, and the stars",
            "Die Sonne, der Mond und die Sterne"
          ),
        },
      ],
      hint: T(
        "The Power Triangle models the interaction between citizens, market producers, and public institutions.",
        "Das Macht-Dreieck beschreibt das Zusammenspiel von Bürgern, Marktbetrieben und öffentlichen Institutionen."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What happens if any one corner takes total control without checks and balances?",
        "Was passiert, wenn eine einzelne Ecke ohne Kontrollen die absolute Kontrolle übernimmt?"
      ),
      options: [
        {
          text: T(
            "The balance breaks down, harming freedoms, fairness, or public goods",
            "Das Gleichgewicht bricht zusammen und schadet Freiheit, Gerechtigkeit oder öffentlichen Gütern"
          ),
          correct: true,
        },
        {
          text: T(
            "Everything automatically turns into gold and chocolate",
            "Alles verwandelt sich automatisch in Gold und Schokolade"
          ),
        },
        {
          text: T(
            "People stop needing food or water forever",
            "Menschen brauchen für immer weder Nahrung noch Wasser"
          ),
        },
      ],
      hint: T(
        "Checks and balances prevent domination and keep the democratic system healthy.",
        "Gewaltenteilung und gegenseitige Kontrollen verhindern Vorherrschaft und sichern die Demokratie."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Balance the three sliders so that Citizens, Businesses, and Government reach the green equilibrium zone.",
        "Bringe die drei Regler ins Gleichgewicht, sodass Bürger, Wirtschaft und Staat die grüne Zone erreichen."
      ),
      Widget: Widget,
      hint: T(
        "Adjust all three sliders toward the balanced middle zone (approx 50 each).",
        "Bewege alle drei Schieberegler in die mittlere ausgewogene Zone (jeweils ca. 50)."
      ),
    },
  ],
  askDad: T(
    "Papa, who keeps watch over the government to make sure it doesn't take too much power?",
    "Papa, wer passt auf die Regierung auf, damit sie nicht zu viel Macht übernimmt?"
  ),
  realLife: {
    title: T("Checks, Balances, and Social Partnership in Germany", "Gewaltenteilung und Sozialpartnerschaft in Deutschland"),
    body: T(
      "Germany's democratic order is built on checks and balances (Gewaltenteilung between Bundestag, Bundesrat, and courts) and the 'Sozialpartnerschaft' (social partnership between trade unions representing workers, employer associations, and federal regulators negotiating collective agreements).",
      "Deutschlands demokratische Ordnung stützt sich auf Gewaltenteilung (Bundestag, Bundesrat, Gerichte) und die 'Sozialpartnerschaft' (Zusammenarbeit von Gewerkschaften, Arbeitgeberverbänden und Gesetzgeber bei Tarifverträgen)."
    ),
  },
  factCard: {
    claims: [
      {
        text: "Article 20, Paragraph 2 of the German Basic Law mandates the separation of powers into legislative, executive, and judicial branches.",
        source: "https://www.gesetze-im-internet.de/gg/art_20.html",
      },
      {
        text: "The German Federal Constitutional Court functions as an independent judicial safeguard against executive or legislative overreach.",
        source: "https://www.bundesverfassungsgericht.de/",
      },
      {
        text: "Germany's collective bargaining autonomy (Tarifautonomie) empowers trade unions and employer associations to negotiate wages and conditions independently.",
        source: "https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Tarifvertraege/tarifvertraege.html",
      },
      {
        text: "Civic education materials explain that institutional checks and balances maintain societal equilibrium between citizen rights, market dynamism, and state regulation.",
        source: "https://www.bpb.de/themen/politisches-system/politik-einfach-fuer-alle/gewaltenteilung/",
      },
      {
        text: "The parliamentary control mechanisms of the Deutscher Bundestag scrutinize federal government operations through inquiries, committees, and budget audits.",
        source: "https://www.bundestag.de/parlament/aufgaben/gewaltenteilung",
      },
    ],
    simplified: [
      "We model society as an equilateral triangle with Citizens, Businesses, and Government balancing each other.",
      "We show that each corner depends on the others through reciprocal flows: wages, taxes, votes, and public goods.",
      "We illustrate the risks of extreme imbalance when any single corner dominates unchecked.",
    ],
  },
};
