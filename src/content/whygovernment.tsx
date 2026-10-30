import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { WellDiagram, ProblemDiagram, CouncilDiagram, PotDiagram, RulesDiagram } from "./whygovernment.diagrams";
import { WhyGovernmentToy } from "./whygovernment.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <WhyGovernmentToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <WhyGovernmentToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "whygovernment",
  story: [
    animatedBeat(
      [
        T(
          "Ripple Town started as a few small huts by the river.",
          "Ripple Town begann als ein paar kleine Hütten am Fluss."
        ),
        T(
          "As more families arrived, the village grew bigger and busier.",
          "Als mehr Familien ankamen, wurde das Dorf größer und geschäftiger."
        ),
        T(
          "Carts bumped into each other on narrow unpaved tracks.",
          "Kutschen stießen auf engen unbefestigten Wegen zusammen."
        ),
        T(
          "The town's shared drinking well cracked because nobody felt responsible for fixing shared stones.",
          "Der gemeinsame Dorfbrunnen bekam Risse, weil sich niemand für die gemeinsamen Steine verantwortlich fühlte."
        ),
      ],
      WellDiagram
    ),
    animatedBeat(
      [
        T(
          "Everyone took good care of their own doorstep.",
          "Jeder kümmerte sich gut um seine eigene Haustür."
        ),
        T(
          "People swept their own paths and repaired their own roofs.",
          "Die Menschen fegten ihre eigenen Wege und reparierten ihre eigenen Dächer."
        ),
        T(
          "But nobody felt responsible for fixing the main road.",
          "Aber niemand fühlte sich verantwortlich, die Hauptstraße zu reparieren."
        ),
        T(
          "Shared spaces started to fall apart because everyone waited for someone else.",
          "Gemeinsame Räume begannen auseinanderzufallen, weil jeder auf jemand anderen wartete."
        ),
      ],
      ProblemDiagram
    ),
    animatedBeat(
      [
        T(
          "Otto gathered all the villagers at the central square.",
          "Otto versammelte alle Dorfbewohner auf dem zentralen Platz."
        ),
        T(
          "He said: 'We need to make a plan together for the things we all use.'",
          "Er sagte: 'Wir müssen gemeinsam einen Plan für die Dinge machen, die wir alle nutzen.'"
        ),
        T(
          "'We need traffic rules so our carts do not crash.'",
          "'Wir brauchen Verkehrsregeln, damit unsere Kutschen nicht zusammenstoßen.'"
        ),
        T(
          "The villagers agreed to form a council to organize these rules.",
          "Die Dorfbewohner stimmten zu, einen Rat zu bilden, um diese Regeln zu organisieren."
        ),
      ],
      CouncilDiagram
    ),
    animatedBeat(
      [
        T(
          "The council suggested creating a shared town pot.",
          "Der Rat schlug vor, einen gemeinsamen Dorftopf anzulegen."
        ),
        T(
          "Every family puts a few coins into the pot each month.",
          "Jede Familie legt jeden Monat ein paar Münzen in den Topf."
        ),
        T(
          "The shared pot pays a town mason to repair the well and fix bridges.",
          "Der gemeinsame Topf bezahlt einen Dorfmaurer, um den Brunnen und Brücken zu reparieren."
        ),
        T(
          "Now clean drinking water flows into every bucket, and the roads are safe.",
          "Jetzt fließt sauberes Trinkwasser in jeden Eimer und die Straßen sind sicher."
        ),
      ],
      PotDiagram
    ),
    animatedBeat(
      [
        T(
          "Without shared rules and public coordination, shared resources fall into disrepair.",
          "Ohne gemeinsame Regeln und öffentliche Koordination verfallen gemeinsame Ressourcen."
        ),
        T(
          "This problem is called the *tragedy of the commons* or a *coordination failure*.",
          "Dieses Problem nennt man *Tragik der Allmende* oder *Koordinationsversagen*."
        ),
        T(
          "A *government* is the group of people chosen to organize shared *rules*, resolve disputes, and maintain *public goods* that no single family can build alone.",
          "Eine *Regierung* ist die Gruppe von Menschen, die gewählt wird, um gemeinsame *Regeln* zu organisieren, Streitigkeiten zu lösen und *öffentliche Güter* zu erhalten, die keine Familie allein bauen kann."
        ),
      ],
      RulesDiagram
    ),
  ],
  toyIntro: T(
    "Set the town rules slider so carts can deliver food smoothly and the shared water well stays clean.",
    "Stelle den Dorfregler-Schieber so ein, dass Kutschen Lebensmittel reibungslos liefern können und der gemeinsame Wasserbrunnen sauber bleibt."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why does a village need a government?",
        "Warum braucht ein Dorf eine Regierung?"
      ),
      options: [
        {
          text: T(
            "To coordinate shared rules and maintain public goods that no single family can build alone",
            "Um gemeinsame Regeln zu koordinieren und öffentliche Güter zu erhalten, die keine Familie allein bauen kann"
          ),
          correct: true,
        },
        {
          text: T(
            "To make sure nobody ever plays outside",
            "Damit niemand jemals draußen spielt"
          ),
        },
        {
          text: T(
            "To hide all the coins in the river",
            "Um alle Münzen im Fluss zu verstecken"
          ),
        },
      ],
      hint: T(
        "A government helps solve coordination failures and looks after shared resources.",
        "Eine Regierung hilft, Koordinationsprobleme zu lösen und sich um gemeinsame Ressourcen zu kümmern."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What happens when nobody is responsible for shared spaces like roads and wells?",
        "Was passiert, wenn niemand für gemeinsame Räume wie Straßen und Brunnen verantwortlich ist?"
      ),
      options: [
        {
          text: T(
            "They fall into disrepair because of the tragedy of the commons",
            "Sie verfallen wegen der Tragik der Allmende"
          ),
          correct: true,
        },
        {
          text: T(
            "They automatically repair themselves with magic",
            "Sie reparieren sich automatisch durch Magie"
          ),
        },
        {
          text: T(
            "They turn into chocolate cake",
            "Sie verwandeln sich in Schokoladenkuchen"
          ),
        },
      ],
      hint: T(
        "When everyone expects someone else to fix shared things, nobody fixes them.",
        "Wenn jeder erwartet, dass jemand anderes gemeinsame Dinge repariert, repariert sie niemand."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Find the balanced rules setting where carts drive smoothly and the well stays clean.",
        "Finde die ausgewogene Regeleinstellung, bei der Kutschen reibungslos fahren und der Brunnen sauber bleibt."
      ),
      Widget: Widget,
      hint: T(
        "Move the slider to the green balanced zone in the middle.",
        "Bewege den Schieberegler in die grüne ausgewogene Zone in der Mitte."
      ),
    },
  ],
  askDad: T(
    "Papa, what are some important things our city looks after that our family could not build on our own?",
    "Papa, was sind wichtige Dinge, um die sich unsere Stadt kümmert, die unsere Familie nicht allein bauen könnte?"
  ),
  realLife: {
    title: T("Municipal Councils in Germany", "Gemeinderäte in Deutschland"),
    body: T(
      "In German towns and cities, municipal councils (Gemeinderat) and local offices (Ordnungsamt) coordinate road repairs, street lights, clean drinking water, fire departments, and waste collection for all residents.",
      "In deutschen Städten und Gemeinden koordinieren Gemeinderäte und Ordnungsämter Straßenreparaturen, Straßenbeleuchtung, sauberes Trinkwasser, Feuerwehren und Müllabfuhr für alle Bewohner."
    ),
  },
  factCard: {
    claims: [
      {
        text: "Municipal councils (Gemeinderat) and local offices (Ordnungsamt) coordinate road repairs, street lights, clean drinking water, fire departments, and waste collection in German towns and cities.",
        source: "https://www.bpb.de/themen/politisches-system/politik-einfach-fuer-alle/",
      },
      {
        text: "The German Basic Law (Grundgesetz Article 20) defines Germany as a democratic and social federal state that ensures peace, security, and public welfare.",
        source: "https://www.bundestag.de/parlament/aufgaben",
      },
      {
        text: "Public authorities in Germany spend tax revenues on public goods like education, healthcare, infrastructure, and social security.",
        source: "https://www.destatis.de/DE/Themen/Staat/Oeffentliche-Finanzen/_inhalt.html",
      },
      {
        text: "Clean drinking water access is considered a mandatory public service (Daseinsvorsorge) guaranteed by German municipalities.",
        source: "https://www.umweltbundesamt.de/themen/wasser/trinkwasser",
      },
      {
        text: "Article 20 of the German Basic Law establishes that all state authority derives from the people and is exercised through elections and voting.",
        source: "https://www.gesetze-im-internet.de/gg/art_20.html",
      },
    ],
    simplified: [
      "We explain the tragedy of the commons through a cracked town well and bumpy roads so an 8-year-old child understands why shared coordination is necessary.",
      "We show government as a helpful coordination mechanism rather than diving into party politics or complex bureaucracy.",
      "We frame rules as safety agreements that keep everyone moving smoothly rather than restrictive prohibitions.",
    ],
  },
};