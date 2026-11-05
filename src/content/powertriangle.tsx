import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  TriangleNodesDiagram,
  FlowArrowsDiagram,
  ImbalanceFailureDiagram,
  EquilibriumDiagram,
  HarmonyDiagram,
} from "./powertriangle.diagrams";
import { PowerTriangleToy } from "./powertriangle.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

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
          "Otto sitzt an einem großen dreieckigen Holztisch in der Mitte von Ripple Town.",
          "Otto siada przy wielkim, trójkątnym drewnianym stole na rynku Ripple Town.",
        ),
        T(
          "At one corner stands Pip representing Citizens and voters.",
          "An einer Ecke steht Pip und vertritt die Bürger und Wähler.",
          "Przy jednym rogu stoi Pip, reprezentując Obywateli i wyborców.",
        ),
        T(
          "At the second corner stands Bea representing Businesses and producers.",
          "An der zweiten Ecke steht Bea und vertritt Unternehmen und Produzenten.",
          "Przy drugim rogu stoi Bea, reprezentując Przedsiębiorców i twórców.",
        ),
        T(
          "At the third corner stands Moss representing Government and public institutions.",
          "An der dritten Ecke steht Moss und vertritt Regierung und öffentliche Einrichtungen.",
          "Przy trzecim rogu stoi Moss, reprezentując Państwo i instytucje publiczne.",
        ),
      ],
      TriangleNodesDiagram,
    ),
    animatedBeat(
      [
        T(
          "These three corners do not work in isolation; they are connected by continuous flows of cooperation.",
          "Diese drei Ecken arbeiten nicht isoliert; sie sind durch ständige Ströme der Zusammenarbeit verbunden.",
          "Te trzy rogi nie działają w odosobnieniu; łączy je nieustanny obieg współpracy.",
        ),
        T(
          "Pip works for Bea, earns wages, buys fresh bread, and votes in elections to choose Moss.",
          "Pip arbeitet für Bea, verdient Lohn, kauft frisches Brot und wählt Moss bei der Wahl.",
          "Pip pracuje u Bei, otrzymuje pensję, kupuje chleb i bierze udział w wyborach, by wybrać Mossa.",
        ),
        T(
          "Bea pays taxes into the town treasury and relies on Moss for paved roads, clean water, and honest courts.",
          "Bea zahlt Steuern in die Dorfkasse und verlässt sich auf befestigte Straßen, sauberes Wasser und Gerichte.",
          "Bea płaci podatki do wspólnej kasy i liczy na utwardzone drogi, czystą wodę oraz uczciwe sądy.",
        ),
        T(
          "Moss creates fair laws that protect Pip from unsafe workshops and keep Bea from forming an unfair monopoly.",
          "Moss schafft faire Gesetze, die Pip vor unsicheren Betrieben schützen und Monopole verhindern.",
          "Moss tworzy sprawiedliwe prawo, które chroni Pipa w pracy i nie pozwala Bei na stworzenie monopolu.",
        ),
      ],
      FlowArrowsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Otto pulls one corner of the table away: 'Look what happens if any single corner dominates unchecked.'",
          "Otto zieht an einer Tischecke: 'Schaut, was passiert, wenn eine einzelne Ecke die Kontrolle übernimmt.'",
          "Otto unosi jeden róg stołu: 'Zobaczcie, co się stanie, gdy jeden biegun zdominuje pozostałe bez żadnej kontroli.'",
        ),
        T(
          "If Government takes complete control, personal freedom and private creativity vanish.",
          "Wenn der Staat die totale Kontrolle übernimmt, verschwinden persönliche Freiheit und Kreativität.",
          "Gdy Państwo przejmuje całkowitą kontrolę, znikają osobista wolność i twórcza inicjatywa.",
        ),
        T(
          "If Businesses dominate unchecked, workers are exploited and natural resources are damaged.",
          "Wenn Unternehmen unkontrolliert herrschen, werden Arbeiter ausgebeutet und Natur geschädigt.",
          "Gdy Biznes rządzi bez ograniczeń, pracownicy są wyzyskiwani, a rzeka i lasy ulegają zniszczeniu.",
        ),
        T(
          "If Citizens demand endless public benefits without contributing taxes or obeying laws, the town collapses.",
          "Wenn Bürger endlose Leistungen verlangen ohne Steuern zu zahlen, bricht das Dorf zusammen.",
          "Gdy Obywatele żądają nieskończonych zasiłków, nie płacąc podatków ani nie przestrzegając praw, miasteczko upada.",
        ),
      ],
      ImbalanceFailureDiagram,
    ),
    animatedBeat(
      [
        T(
          "A free, prosperous society requires a dynamic, healthy balance among all three corners.",
          "Eine freie, wohlhabende Gesellschaft braucht ein lebendiges Gleichgewicht aller drei Ecken.",
          "Wolne i pomyślne społeczeństwo wymaga zdrowej, dynamicznej równowagi wszystkich trzech biegunów.",
        ),
        T(
          "This dynamic relationship is the *Power Triangle*.",
          "Diese dynamische Beziehung ist das *Macht-Dreieck*.",
          "Tę wzajemną relację nazywamy *Trójkątem Władzy*.",
        ),
        T(
          "When Citizens, Businesses, and Government check and balance each other, democracy and freedom flourish.",
          "Wenn Bürger, Unternehmen und Staat sich gegenseitig ausbalancieren, blühen Freiheit und Wohlstand.",
          "Gdy Obywatele, Przedsiębiorcy i Państwo nawzajem się kontrolują i wspierają, kwitną demokracja i dobrobyt.",
        ),
      ],
      EquilibriumDiagram,
    ),
    animatedBeat(
      [
        T(
          "When citizens actively participate, businesses innovate responsibly, and governments protect rights, the community thrives.",
          "Wenn Bürger sich aktiv beteiligen, Unternehmen verantwortlich handeln und der Staat Rechte schützt, blüht die Gemeinschaft auf.",
          "Gdy obywatele są aktywni, firmy działają odpowiedzialnie, a państwo strzeże praw, cała społeczność rozkwita.",
        ),
        T(
          "No single group has all the answers, but together in balance they build a peaceful, prosperous world.",
          "Keine Gruppe allein hat alle Antworten, aber gemeinsam im Gleichgewicht bauen sie eine friedliche, gerechte Welt.",
          "Żadna grupa nie ma monopolu na mądrość, lecz wspólnie w równowadze tworzą bezpieczny i sprawiedliwy świat.",
        ),
      ],
      HarmonyDiagram,
    ),
  ],
  toyIntro: T(
    "Adjust the three power sliders to find the stable equilibrium where Citizens, Businesses, and Government balance each other.",
    "Stelle die drei Machtregler ein, um das stabile Gleichgewicht zwischen Bürgern, Wirtschaft und Staat zu finden.",
    "Ustaw trzy suwaki, by odnaleźć stabilną równowagę między Państwem, Obywatelami i Przedsiębiorcami.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Who are the three corners of the Power Triangle?",
        "Wer sind die drei Ecken des Macht-Dreiecks?",
        "Kto tworzy trzy wierzchołki Trójkąta Władzy?",
      ),
      options: [
        {
          text: T(
            "Citizens (Voters & Workers), Businesses (Producers), and Government (Public Laws & Infrastructure)",
            "Bürger (Wähler & Arbeiter), Unternehmen (Produzenten) und Staat (Gesetze & Infrastruktur)",
            "Obywatele (wyborcy i pracownicy), Biznes (wytwórcy i rzemieślnicy) oraz Państwo (prawo i instytucje)",
          ),
          correct: true,
        },
        {
          text: T(
            "Cats, dogs, and pigeons",
            "Katzen, Hunde und Tauben",
            "Koty, psy i gołębie",
          ),
        },
        {
          text: T(
            "The sun, the moon, and the stars",
            "Die Sonne, der Mond und die Sterne",
            "Słońce, księżyc i gwiazdy na niebie",
          ),
        },
      ],
      hint: T(
        "The Power Triangle models the interaction between citizens, market producers, and public institutions.",
        "Das Macht-Dreieck beschreibt das Zusammenspiel von Bürgern, Marktbetrieben und öffentlichen Institutionen.",
        "Trójkąt Władzy opisuje wzajemne oddziaływanie obywateli, przedsiębiorców i instytucji publicznych.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What happens if any one corner takes total control without checks and balances?",
        "Was passiert, wenn eine einzelne Ecke ohne Kontrollen die absolute Kontrolle übernimmt?",
        "Co się stanie, jeśli którykolwiek wierzchołek przejmie władzę absolutną bez kontroli?",
      ),
      options: [
        {
          text: T(
            "The balance breaks down, harming freedoms, fairness, or public goods",
            "Das Gleichgewicht bricht zusammen und schadet Freiheit, Gerechtigkeit oder öffentlichen Gütern",
            "Równowaga upada, niszcząc wolność obywateli, sprawiedliwość lub wspólne dobra",
          ),
          correct: true,
        },
        {
          text: T(
            "Everything automatically turns into gold and chocolate",
            "Alles verwandelt sich automatisch in Gold und Schokolade",
            "Wszystkie domy zamieniają się automatycznie w czekoladę",
          ),
        },
        {
          text: T(
            "People stop needing food or water forever",
            "Menschen brauchen für immer weder Nahrung noch Wasser",
            "Ludzie przestają na zawsze potrzebować jedzenia i wody",
          ),
        },
      ],
      hint: T(
        "Checks and balances prevent domination and keep the democratic system healthy.",
        "Gewaltenteilung und gegenseitige Kontrollen verhindern Vorherrschaft und sichern die Demokratie.",
        "Wzajemne hamulce i równowaga chronią społeczeństwo przed tyranią i wyzyskiem.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Balance the three sliders so that Citizens, Businesses, and Government reach the green equilibrium zone.",
        "Bringe die drei Regler ins Gleichgewicht, sodass Bürger, Wirtschaft und Staat die grüne Zone erreichen.",
        "Zrównoważ trzy suwaki, aby Obywatele, Biznes i Państwo znaleźli się w zielonej strefie równowagi.",
      ),
      Widget,
      hint: T(
        "Adjust all three sliders toward the balanced middle zone (approx 50 each).",
        "Bewege alle drei Schieberegler in die mittlere ausgewogene Zone (jeweils ca. 50).",
        "Przesuń wszystkie trzy suwaki w okolice środka (około 50 każdy).",
      ),
    },
  ],
  askDad: T(
    "Papa, who keeps watch over the government to make sure it doesn't take too much power?",
    "Papa, wer passt auf die Regierung auf, damit sie nicht zu viel Macht übernimmt?",
    "Tato, kto pilnuje rządu, aby nie skupił w swoich rękach zbyt dużej władzy?",
  ),
  realLife: {
    title: {
      en: "Trilateral Democratic Balance and Tripartite Dialogue in India",
      de: "Gewaltenteilung und Sozialpartnerschaft in Deutschland",
      pl: "Trójpodział władzy i dialog społeczny w Polsce",
    },
    body: {
      en: "India balances power through the constitutional separation between Parliament, the Executive, and an independent Supreme Court. In the economic arena, tripartite institutions like the Indian Labour Conference bring together central trade unions, employer federations, and government ministries to negotiate fair labor policies, minimum wages, and worker protections.",
      de: "Deutschlands demokratische Ordnung stützt sich auf Gewaltenteilung (Bundestag, Bundesrat, Gerichte) und die 'Sozialpartnerschaft' (Zusammenarbeit von Gewerkschaften, Arbeitgeberverbänden und Gesetzgeber bei Tarifverträgen).",
      pl: "Ustrój Rzeczypospolitej Polskiej opiera się na trójpodziale i równowadze władzy ustawodawczej (Sejm i Senat), wykonawczej (Prezydent i Rada Ministrów) oraz sądowniczej (niezależne sądy i trybunały). W sferze gospodarczej art. 20 Konstytucji RP nakazuje dialog partnerów społecznych. W Radzie Dialogu Społecznego przedstawiciele rządu, związków zawodowych i organizacji pracodawców wspólnie negocjują warunki pracy, płacę minimalną i reformy gospodarcze.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Constitutional separation of powers mandates institutional checks and balances among legislative, executive, and independent judicial branches.",
          de: "Artikel 20, Absatz 2 des Grundgesetzes verankert die Gewaltenteilung in Gesetzgebung, vollziehende Gewalt und Rechtsprechung.",
          pl: "Art. 10 Konstytucji Rzeczypospolitej Polskiej stanowi: 'Ustrój Rzeczypospolitej Polskiej opiera się na podziale i równowadze władzy ustawodawczej, władzy wykonawczej i władzy sądowniczej'.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
      {
        text: {
          en: "Constitutional courts and independent tribunals safeguard individual rights against executive overreach and ensure statutory compliance.",
          de: "Das Bundesverfassungsgericht wacht als Hüter der Verfassung über die Einhaltung der Grundrechte und Grenzen staatlicher Macht.",
          pl: "Trybunał Konstytucyjny oraz niezawisłe sądy (art. 173 Konstytucji RP) stoją na straży praw obywatelskich i zgodności ustaw z konstytucją, chroniąc przed nadużyciami władzy.",
        },
        source: "https://trybunal.gov.pl",
      },
      {
        text: {
          en: "Tripartite social dialogue councils institutionalize negotiations between national trade unions, employer federations, and government ministries.",
          de: "Die Tarifautonomie sichert den Sozialpartnern das Recht zu, Arbeitsbedingungen ohne staatlichen Eingriff eigenverantwortlich auszuhandeln.",
          pl: "Ustawa o Radzie Dialogu Społecznego z 2015 r. tworzy platformę trójstronnej współpracy pracowników, pracodawców i rządu w celu prowadzenia dialogu społecznego i zapewnienia pokoju społecznego.",
        },
        source: "https://rds.gov.pl",
      },
      {
        text: {
          en: "Supreme audit institutions provide independent parliamentary oversight, auditing state finances, budget execution, and public administration transparency.",
          de: "Der Bundesrechnungshof prüft als unabhängiges Organ die gesamte Haushalts- und Wirtschaftsführung des Bundes.",
          pl: "Najwyższa Izba Kontroli (NIK), podległa Sejmowi, jest naczelnym organem kontroli państwowej badającym gospodarność i legalność wydatków publicznych.",
        },
        source: "https://www.nik.gov.pl",
      },
      {
        text: {
          en: "Political philosophy and Montesquieu's doctrine of 'The Spirit of the Laws' establish that liberty requires power checking power through autonomous counterweights.",
          de: "Die Bundeszentrale für politische Bildung dokumentiert Gewaltenteilung als unverzichtbares Wesensmerkmal freiheitlicher Demokratien.",
          pl: "Doktryna Monteskiusza o podziale władz oraz tradycje demokratyczne dowodzą, że wolność obywateli jest bezpieczna tylko wtedy, gdy władza powstrzymuje władzę.",
        },
        source: "https://www.sejm.gov.pl",
      },
    ],
    simplified: [
      {
        en: "We model society as an equilateral triangle with Citizens, Businesses, and Government balancing each other.",
        de: "Wir stellen die Gesellschaft als gleichseitiges Dreieck dar, in dem Bürger, Betriebe und Staat sich balancieren.",
        pl: "Przedstawiamy społeczeństwo jako trójkąt, w którym Obywatele, Przedsiębiorcy i Państwo wzajemnie się równoważą.",
      },
      {
        en: "We show that each corner depends on the others through reciprocal flows: wages, taxes, votes, and public goods.",
        de: "Wir zeigen die gegenseitige Abhängigkeit über Löhne, Steuern, Wahlen und öffentliche Infrastruktur.",
        pl: "Pokazujemy wzajemną zależność poprzez przepływy: podatki, płace, wybory oraz infrastrukturę i prawo.",
      },
      {
        en: "We illustrate the risks of extreme imbalance when any single corner dominates unchecked.",
        de: "Wir veranschaulichen die Gefahren extremer Schieflage, wenn eine einzelne Ecke ungehemmt dominuje.",
        pl: "Wyjaśniamy ryzyko kryzysu i utraty wolności, gdy którykolwiek biegun przejmie władzę absolutną.",
      },
    ],
  },
};
