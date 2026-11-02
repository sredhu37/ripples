import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CompetingFleetsDiagram,
  AllianceBlocksDiagram,
  DominoTumbleDiagram,
  RuinedBridgeArmisticeDiagram,
  LeagueOfNationsGenevaDiagram,
} from "./ww1.diagrams";
import { Ww1Toy } from "./ww1.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <Ww1Toy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <Ww1Toy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "ww1",
  story: [
    animatedBeat(
      [
        T(
          "In the early twentieth century, European nations competed to build the largest armies.",
          "Im fruehen zwanzigsten Jahrhundert wetteiferten europaeische Staaten um die groessten Heere."
        ),
        T(
          "Heavy steel battleships and artillery filled military depots across the continent.",
          "Gepanzerte Schlachtschiffe und Artillerie fuellten die militaerischen Lagerhallen."
        ),
        T(
          "Leaders believed that building more weapons would make their nations safe from attack.",
          "Die Herrscher glaubten, mehr Waffen wuerden ihre Laender vor Angriffen schuetzen."
        ),
        T(
          "Instead, suspicion and fear grew between neighboring capitals with each passing year.",
          "Stattdessen wuchsen Misstrauen und Furcht zwischen den Hauptstaedten von Jahr zu Jahr."
        ),
      ],
      CompetingFleetsDiagram
    ),
    animatedBeat(
      [
        T(
          "To guarantee security, leaders signed secret mutual defense treaties with their friends.",
          "Um Sicherheit zu garantieren, schlossen Herrscher geheime Verteidigungsvertraege ab."
        ),
        T(
          "Europe was split into two armed camps: the Central Powers and the Allied Powers.",
          "Europa spaltete sich in zwei Bloecke: die Mittelmaechte und die Alliierten."
        ),
        T(
          "Each treaty promised: if an ally is attacked, all treaty partners must immediately declare war.",
          "Jeder Vertrag versprach: Wird ein Partner angegriffen, ziehen alle Verbuendeten in den Krieg."
        ),
        T(
          "These *alliances* linked nations together like a tightly strung web of tripwires.",
          "Diese *Buendnisse* verbanden die Staaten wie ein dicht gespanntes Netz von Stolperdrahten."
        ),
      ],
      AllianceBlocksDiagram
    ),
    animatedBeat(
      [
        T(
          "In the summer of 1914, a political crisis in Sarajevo sparked a chain reaction.",
          "Im Sommer 1914 loeste eine Krise in Sarajevo eine verhaengnisvolle Kettenreaktion aus."
        ),
        T(
          "Because of mutual treaties, *mobilization* orders fired in Berlin, Paris, Vienna, and St. Petersburg.",
          "Wegen der Vertraege folgten *Mobilmachungen* in Berlin, Paris, Wien und St. Petersburg."
        ),
        T(
          "Railway timetables moved millions of young soldiers to the frontiers within days.",
          "Fahrplaene der Eisenbahn brachten binnen Tagen Millionen junger Soldaten an die Fronten."
        ),
        T(
          "Like falling dominoes, nations were dragged into World War 1 by their own promises.",
          "Wie fallende Dominosteine wurden die Staaten durch ihre eigenen Zusagen in den Krieg gerissen."
        ),
      ],
      DominoTumbleDiagram
    ),
    animatedBeat(
      [
        T(
          "For four long years, industrial weapons brought immense devastation across Europe.",
          "Vier lange Jahre lang brachten Industriewaffen unendliche Zerstoerung ueber Europa."
        ),
        T(
          "Bridges, farms, and historic towns were reduced to rubble by artillery.",
          "Bruecken, Hoefe und Staedte wurden von Artillerie in Truemmer gelegt."
        ),
        T(
          "On the eleventh hour of the eleventh day of November 1918, an armistice silenced the guns.",
          "Am elften Tag des elften Monats 1918 brachte ein Waffenstillstand die Waffen zum Schweigen."
        ),
        T(
          "The continent mourned, realizing that military rivalry had brought only heartbreak.",
          "Der Kontinent trauerte und erkannte, dass militaerischer Wettstreit nur Leid gebracht hatte."
        ),
      ],
      RuinedBridgeArmisticeDiagram
    ),
    animatedBeat(
      [
        T(
          "Looking at the devastation, global leaders gathered to build a new system of diplomacy.",
          "Angesichts der Truemmer versammelten sich fuehrende Politiker fuer ein neues System der Diplomatie."
        ),
        T(
          "In Geneva, they founded the *League of Nations* (der Voelkerbund).",
          "In Genf gruendeten sie den *Voelkerbund*."
        ),
        T(
          "Its principle was simple: disputes between nations must be discussed around an open table.",
          "Sein Grundsatz war einfach: Konflikte zwischen Laendern muessen am offenen Tisch verhandelt werden."
        ),
        T(
          "Though imperfect, it established the first worldwide forum for collective peace.",
          "Obwohl unvollkommen, schuf er das erste weltweite Forum fuer gemeinsamen Frieden."
        ),
      ],
      LeagueOfNationsGenevaDiagram
    ),
  ],
  toyIntro: T(
    "Test the alliance domino cascade and activate the Geneva Peace Table to defuse disputes safely.",
    "Teste den Buendnis-Dominoeffekt und aktiviere den Genfer Tisch, um Streit friedlich zu loesen."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did World War 1 spread so rapidly between European nations in 1914?",
        "Warum breitete sich der Erste Weltkrieg 1914 so rasch zwischen den Staaten aus?"
      ),
      options: [
        {
          text: T(
            "Secret mutual defense alliance treaties dragged partner nations in like falling dominoes",
            "Geheime Buendnisvertraege rissen die Partnerlaender wie fallende Dominosteine mit"
          ),
          correct: true,
        },
        {
          text: T(
            "A sudden invasion of giant green kangaroos from the moon",
            "Eine ploetzliche Invasion von riesigen gruenen Kaengurus vom Mond"
          ),
        },
        {
          text: T(
            "All paper maps in Europe were accidentally washed in the laundry",
            "Alle Landkarten in Europa wurden aus Versehen in der Waschmaschine gewaschen"
          ),
        },
      ],
      hint: T(
        "Interlocking treaty obligations turned a local dispute into a continental conflict.",
        "Verflochtene Vertraege verwandelten einen regionalen Konflikt in einen Weltkrieg."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What was the main purpose of founding the League of Nations (Voelkerbund) in Geneva?",
        "Was war das Hauptziel bei der Gruendung des Voelkerbundes in Genf?"
      ),
      options: [
        {
          text: T(
            "To resolve international disputes through open diplomacy and law rather than war",
            "Streitigkeiten zwischen Laendern am Verhandlungstisch und mit Recht statt mit Krieg zu loesen"
          ),
          correct: true,
        },
        {
          text: T(
            "To build the world biggest bouncy castle in the Alps",
            "Die groesste Huepfburg der Welt in den Alpen aufzubauen"
          ),
        },
        {
          text: T(
            "To replace all train whistles with tuba sounds",
            "Alle Zugpfeifen durch Tuba-Geraeusche zu ersetzen"
          ),
        },
      ],
      hint: T(
        "The League was created to provide a forum for peaceful conflict resolution.",
        "Der Bund wurde geschaffen, um Konflikte friedlich am Tisch zu klaeren."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Switch from 'Rigid Secret Alliances' to the 'Geneva Peace Mediation Table' to protect Europe from the domino trap.",
        "Wechsle von Geheime Buendnisfallen zum Genfer Vermittlungstisch, um den Dominoeffekt zu stoppen."
      ),
      Widget: Widget,
      hint: T(
        "Click Geneva Peace Mediation Table and tap check.",
        "Klicke auf Genfer Vermittlungstisch und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, why is talking openly and listening to others so much better than making secret pacts?",
    "Papa, warum ist offenes Miteinander-Reden so viel besser als geheime Absprachen?"
  ),
  realLife: {
    title: T("The Peace Palace in The Hague", "Der Friedenspalast in Den Haag"),
    body: T(
      "Following the Hague Peace Conferences and World War 1, the Peace Palace (Vredespaleis) was opened in The Hague. Today it houses the International Court of Justice (ICJ), the highest judicial organ of the United Nations, where border treaties and international law questions are argued by jurists rather than armies.",
      "Nach den Haager Friedenskonferenzen und dem Ersten Weltkrieg wurde der Friedenspalast in Den Haag eroeffnet. Heute beherbergt er den Internationalen Gerichtshof (IGH) der Vereinten Nationen, wo Grenzvertraege und Rechtsfragen von Juristen statt von Armeen verhandelt werden."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The Triple Entente and the Triple Alliance divided the major European powers into opposing military blocs prior to 1914.",
        source: "https://www.britannica.com/event/World-War-I/The-initial-stages-of-the-war",
      },
      {
        text: "The assassination of Archduke Franz Ferdinand in Sarajevo triggered a rapid escalation of ultimatums and general mobilizations.",
        source: "https://www.britannica.com/event/assassination-of-Franz-Ferdinand",
      },
      {
        text: "The Armistice of 11 November 1918 ended hostilities on the Western Front, coming into effect at 11:00 a.m. Paris time.",
        source: "https://www.britannica.com/event/Armistice",
      },
      {
        text: "The Covenant of the League of Nations was integrated into the Treaty of Versailles in 1919 with its headquarters located in Geneva.",
        source: "https://www.ungeneva.org/en/about/league-of-nations",
      },
      {
        text: "The Peace Palace in The Hague was completed in 1913 to serve as the seat of the Permanent Court of Arbitration.",
        source: "https://www.vredespaleis.nl/building/history/?lang=en",
      },
    ],
    simplified: [
      "We explain the outbreak of war as a mechanical failure of secret alliance tripwires and rigid mobilization plans.",
      "We focus on the breakdown and subsequent rebuilding of international diplomatic mechanisms.",
      "We strictly avoid graphic depictions of bodily trauma, highlighting instead the imperative of peaceful dispute arbitration.",
    ],
  },
};
