import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { BalanceDiagram, EarnDiagram, NeedsDiagram, PotDiagram, RoadDiagram, ShareDiagram, VoteDiagram } from "./taxes.diagrams";
import { BudgetBoard, budget } from "./taxes.toy";

export { budget };

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  const [tax, setTax] = useState(0);
  return (
    <BudgetBoard
      lang={lang}
      tax={tax}
      onTax={(next) => {
        setTax(next);
        onDone?.();
      }}
    />
  );
}

function BudgetWidget({ lang, onAnswer }: WidgetProps) {
  const [tax, setTax] = useState(0);
  const check = () => {
    const b = budget(tax);
    onAnswer(b.funded.includes("road") && b.funded.includes("school") && b.keep >= 7);
  };
  return (
    <>
      <BudgetBoard lang={lang} tax={tax} onTax={setTax} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={check} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "taxes",
  story: [
    animatedBeat(
      [
        T(
          "Ripple Town has a problem. The road to the harbour is full of holes.",
          "In Ripple Town gibt es ein Problem. Die Straße zum Hafen ist voller Löcher.",
          "Ripple Town ma problem. Droga do portu jest pełna dziur.",
        ),
        T(
          "Look! A cart is stuck in one of the holes. It cannot get through.",
          "Schau! Ein Karren steckt in einem der Löcher fest. Er kommt nicht weiter.",
          "Spójrz! Wóz ugrzązł w jednej z dziur. Nie może przejechać.",
        ),
        T(
          "Finn wants to fix the road all by himself. He has brought his hammer.",
          "Finn will die Straße ganz allein reparieren. Er hat seinen Hammer mitgebracht.",
          "Finn chce naprawić drogę zupełnie sam. Przyniósł nawet swój młotek.",
        ),
        T(
          "But a whole road is much too big for one person. Finn gets tired and sad.",
          "Aber eine ganze Straße ist viel zu groß für einen allein. Finn wird müde und traurig.",
          "Ale cała droga to zbyt wielkie zadanie dla jednej osoby. Finn szybko się męczy i smuci.",
        ),
        T(
          "Bea and Sam use the road too. So the broken road is a problem for the whole town.",
          "Auch Bea und Sam benutzen die Straße. Die kaputte Straße ist also ein Problem für die ganze Stadt.",
          "Bea i Sam również korzystają z tej drogi. Zepsuta droga to problem dla całego miasteczka.",
        ),
      ],
      RoadDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "A town needs more than a road. It needs a school, where children learn.",
          "Eine Stadt braucht mehr als eine Straße. Sie braucht eine Schule, in der Kinder lernen.",
          "Miasto potrzebuje czegoś więcej niż drogi. Potrzebuje szkoły, w której uczą się dzieci.",
        ),
        T(
          "It needs a fire brigade. Firefighters put out fires and help everybody.",
          "Sie braucht eine Feuerwehr. Feuerwehrleute löschen Brände und helfen allen.",
          "Potrzebuje straży pożarnej. Strażacy gaszą pożary i pomagają każdemu w potrzebie.",
        ),
        T(
          "And it needs a park, where everybody can play and rest.",
          "Und sie braucht einen Park, in dem alle spielen und sich ausruhen können.",
          "I potrzebuje parku, gdzie wszyscy mogą się bawić i odpoczywać.",
        ),
        T(
          "Nobody can build these alone. The whole town needs them.",
          "Das kann keiner allein bauen. Die ganze Stadt braucht sie.",
          "Nikt nie jest w stanie zbudować tego sam. Całe miasteczko ich potrzebuje.",
        ),
      ],
      NeedsDiagram,
    ),
    animatedBeat(
      [
        T(
          "This is Moss. He is the leader of Ripple Town. The leader of a town is called a *mayor*.",
          "Das ist Moss. Er leitet Ripple Town. Wer eine Stadt leitet, heißt *Bürgermeister*.",
          "To jest Moss. Jest przywódcą Ripple Town. Przywódca miasta to *burmistrz*.",
        ),
        T(
          "Mayor Moss has an idea. Everybody puts a few coins into one big pot.",
          "Bürgermeister Moss hat eine Idee. Alle legen ein paar Münzen in einen großen Topf.",
          "Burmistrz Moss ma pomysł. Wszyscy wrzucają po kilka monet do jednego wspólnego garnka.",
        ),
        T(
          "The coins that everybody puts into the pot have a name. They are called *taxes*.",
          "Die Münzen, die alle in den Topf legen, haben einen Namen. Sie heißen *Steuern*.",
          "Monety, które wszyscy wrzucają do garnka, mają swoją nazwę. Nazywają się *podatki*.",
        ),
        T(
          "Moss pays from the pot for what the whole town needs: the road, the school, the fire brigade and the park.",
          "Moss bezahlt aus dem Topf, was die ganze Stadt braucht: die Straße, die Schule, die Feuerwehr und den Park.",
          "Moss płaci z garnka za to, czego potrzebuje całe miasteczko: drogę, szkołę, straż pożarną i park.",
        ),
      ],
      PotDiagram,
    ),
    animatedBeat(
      [
        T(
          "Taxes are not a price. You do not pay coins every time you walk or ride on the road.",
          "Steuern sind kein Preis. Du zahlst nicht jedes Mal Münzen, wenn du auf der Straße gehst oder fährst.",
          "Podatki to nie cena biletu. Nie płacisz monet za każdym razem, gdy idziesz lub jedziesz drogą.",
        ),
        T(
          "Taxes are a cost that we share, because everybody can use the road.",
          "Steuern sind Kosten, die wir uns teilen, denn alle dürfen die Straße benutzen.",
          "Podatki to wspólny koszt, którym się dzielimy, ponieważ każdy może korzystać z drogi.",
        ),
      ],
      ShareDiagram,
    ),
    animatedBeat(
      [
        T(
          "Let's see who puts in how much. Finn earns 10 coins.",
          "Schauen wir, wer wie viel einzahlt. Finn verdient 10 Münzen.",
          "Zobaczmy, kto ile wpłaca. Finn zarabia 10 monet.",
        ),
        T(
          "From those 10 coins, he puts 2 into the pot as taxes.",
          "Von diesen 10 Münzen legt er 2 als Steuern in den Topf.",
          "Z tych 10 monet wrzuca 2 monety do garnka jako podatek.",
        ),
        T(
          "Bea earns 20 coins, so she puts 4 coins into the pot.",
          "Bea verdient 20 Münzen, deshalb legt sie 4 Münzen in den Topf.",
          "Bea zarabia 20 monet, więc wrzuca 4 monety do garnka.",
        ),
        T(
          "Whoever earns more usually puts in more. Bea earns more than Finn, so she puts in more.",
          "Wer mehr verdient, zahlt meistens mehr. Bea verdient mehr als Finn, also zahlt sie mehr.",
          "Kto zarabia więcej, ten zazwyczaj wpłaca więcej. Bea zarabia więcej niż Finn, więc wpłaca więcej.",
        ),
      ],
      EarnDiagram,
    ),
    animatedBeat(
      [
        T(
          "Now Moss has a hard job. He must decide how many coins everybody puts in.",
          "Jetzt hat Moss eine schwere Aufgabe. Er muss entscheiden, wie viele Münzen jeder einzahlt.",
          "Teraz Moss ma trudne zadanie. Musi zdecydować, ile monet każdy powinien wpłacić.",
        ),
        T(
          "If the pot is too small, there is not enough for the road and the school.",
          "Ist der Topf zu klein, reicht es nicht für die Straße und die Schule.",
          "Jeśli garnek jest za mały, nie wystarczy na drogę ani na szkołę.",
        ),
        T(
          "If the pot is too big, people keep too few coins for bread and shoes.",
          "Ist der Topf zu groß, bleiben den Leuten zu wenige Münzen für Brot und Schuhe.",
          "Jeśli garnek jest za duży, ludziom zostanie za mało monet na chleb i buty.",
        ),
        T(
          "So Moss has to find the right amount, not too small and not too big.",
          "Moss muss also die richtige Menge finden, nicht zu klein und nicht zu groß.",
          "Moss musi więc znaleźć właściwą równowagę: ani za mało, ani za dużo.",
        ),
      ],
      BalanceDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "But Moss does not choose the taxes all alone. The town decides together.",
          "Aber Moss bestimmt die Steuern nicht ganz allein. Die Stadt entscheidet gemeinsam.",
          "Lecz Moss nie ustala podatków całkiem sam. Miasto decyduje wspólnie.",
        ),
        T(
          "The people of the town *vote*. To vote means to choose together, for example with a paper in a box.",
          "Die Leute der Stadt *wählen*. Wählen heißt, gemeinsam zu entscheiden, zum Beispiel mit einem Zettel in einer Box.",
          "Mieszkańcy miasteczka *głosują*. Głosować oznacza wybierać wspólnie, na przykład wrzucając kartkę do urny.",
        ),
        T(
          "They vote for the mayor and for the council, a group of townspeople who decide together. The mayor and the council choose the taxes.",
          "Sie wählen den Bürgermeister und den Rat, eine Gruppe von Leuten aus der Stadt, die gemeinsam entscheiden. Bürgermeister und Rat bestimmen die Steuern.",
          "Głosują na burmistrza oraz na radę miasta, czyli grupę mieszkańców decydujących wspólnie. Burmistrz i rada ustalają podatki.",
        ),
        T(
          "Now it is your turn. Be Mayor Moss for a day and try the tax board!",
          "Jetzt bist du dran. Sei einen Tag lang Bürgermeister Moss und probier die Steuer-Tafel aus!",
          "Teraz twoja kolej. Bądź burmistrzem Mossem przez jeden dzień i wypróbuj tablicę podatkową!",
        ),
      ],
      VoteDiagram,
    ),
  ],
  toyIntro: T(
    "Be Mayor Moss for a day. Everyone earns 10 coins and needs 6 for bread and shoes. Slide the tax and watch what the pot can pay for.",
    "Sei einen Tag lang Bürgermeister Moss. Alle verdienen 10 Münzen und brauchen 6 für Brot und Schuhe. Schiebe die Steuer und schau, was der Topf bezahlt.",
    "Zostań burmistrzem Mossem na jeden dzień. Każdy zarabia 10 monet i potrzebuje 6 na chleb i buty. Przesuń suwak podatku i zobacz, co garnek może opłacić.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T("What are taxes?", "Was sind Steuern?", "Czym są podatki?"),
      options: [
        {
          text: T(
            "A fee for each time you use the road",
            "Eine Gebühr für jedes Mal, wenn du die Straße benutzt",
            "Opłatą za każdy przejazd drogą",
          ),
        },
        {
          text: T(
            "Coins everyone shares for things the whole town needs",
            "Münzen, die alle für Dinge teilen, die die ganze Stadt braucht",
            "Monetami, którymi wszyscy się dzielą na potrzeby całego miasteczka",
          ),
          correct: true,
        },
        {
          text: T(
            "Coins that Mayor Moss keeps for himself",
            "Münzen, die Bürgermeister Moss für sich behält",
            "Monetami, które burmistrz Moss zatrzymuje dla siebie",
          ),
        },
      ],
      hint: T(
        "Taxes go into one pot that everybody shares. Mayor Moss spends it on the road, the school and more. It is not a price for each use.",
        "Steuern kommen in einen Topf, den alle teilen. Bürgermeister Moss bezahlt davon die Straße, die Schule und mehr. Es ist kein Preis für jede Benutzung.",
        "Podatki trafiają do jednego wspólnego garnka. Burmistrz Moss opłaca z nich drogę, szkołę i inne potrzeby. To nie jest opłata za pojedyncze użycie.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Set the tax so the town can pay for the road and the school, and everyone still keeps at least 7 coins. Then press Check.",
        "Stelle die Steuer so ein, dass die Stadt die Straße und die Schule bezahlen kann und jeder trotzdem mindestens 7 Münzen behält. Drücke dann Prüfen.",
        "Ustaw podatek tak, aby miasteczko mogło opłacić drogę i szkołę, a każdy zachował co najmniej 7 monet. Następnie naciśnij Sprawdź.",
      ),
      Widget: BudgetWidget,
      hint: T(
        "The road and the school cost 30 coins. 10 people with 3 coins each make 30. Less, and there is no school. More, and people keep under 7.",
        "Die Straße und die Schule kosten 30 Münzen. 10 Leute mit je 3 Münzen ergeben 30. Weniger, und es gibt keine Schule. Mehr, und den Leuten bleiben unter 7.",
        "Droga i szkoła kosztują 30 monet. 10 osób po 3 monety daje 30. Przy mniejszym podatku zabraknie na szkołę, a przy większym ludziom zostanie mniej niż 7.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Finn earns 10 coins. Bea earns 20 coins. Who usually puts more coins into the pot?",
        "Finn verdient 10 Münzen. Bea verdient 20 Münzen. Wer legt meistens mehr Münzen in den Topf?",
        "Finn zarabia 10 monet. Bea zarabia 20 monet. Kto zazwyczaj wpłaca więcej monet do garnka?",
      ),
      options: [
        { text: T("Finn puts in more", "Finn legt mehr hinein", "Finn wpłaca więcej") },
        { text: T("They put in the same number of coins", "Sie legen gleich viele Münzen hinein", "Wpłacają tyle samo monet") },
        { text: T("Bea puts in more", "Bea legt mehr hinein", "Bea wpłaca więcej"), correct: true },
      ],
      hint: T(
        "People who earn more usually put in more. Bea earns 20 coins and Finn only 10, so Bea puts more in the pot.",
        "Wer mehr verdient, zahlt meistens mehr. Bea verdient 20 Münzen und Finn nur 10, also legt Bea mehr in den Topf.",
        "Ludzie, którzy zarabiają więcej, zazwyczaj wpłacają więcej. Bea zarabia 20 monet, a Finn tylko 10, więc Bea wpłaca więcej.",
      ),
    },
  ],
  askDad: T(
    "Do we pay taxes in our family? Where can you see them, for example on your payslip? And what would you pay for first in our town: better roads, a bigger school or a new park?",
    "Zahlen wir in unserer Familie Steuern? Wo siehst du sie, zum Beispiel auf deiner Gehaltsabrechnung? Und was würdest du in unserer Stadt zuerst bezahlen: bessere Straßen, eine größere Schule oder einen neuen Park?",
    "Czy w naszej rodzinie płacimy podatki? Gdzie można je zobaczyć, na przykład na pasku wynagrodzenia? I za co zapłaciłbyś najpierw w naszym mieście: za lepsze drogi, większą szkołę czy nowy park?",
  ),
  realLife: {
    title: {
      en: "Taxes in India",
      de: "Steuern in Deutschland",
      pl: "Podatki w Polsce",
    },
    body: {
      en: "In India, taxes are collected by the central and state governments. Income tax is filed with the Income Tax Department via the e-Filing portal. For employees, companies deduct tax each month as TDS (Tax Deducted at Source) shown on Form 16. Local municipal corporations collect property taxes to maintain roads, street lights, and local parks.",
      de: "In Deutschland heißt das Steueramt Finanzamt. Viele Arbeitnehmer sehen ihre Einkommensteuer gar nicht, denn der Arbeitgeber nimmt sie gleich vom Lohn (Lohnsteuer). Eine Steuererklärung ist ein Formular, mit dem man prüft, ob die Stadt den richtigen Betrag bekommen hat; manchmal gibt es Geld zurück, und man kann sie online mit ELSTER abschicken. Für das Jahr 2025 war die übliche Frist für alle, die eine abgeben müssen, der 31. Juli 2026.",
      pl: "W Polsce podatki zbiera Urząd Skarbowy (Krajowa Administracja Skarbowa). Wielu pracowników nie widzi podatku dochodowego (PIT), ponieważ pracodawca potrąca comiesięczną zaliczkę z wynagrodzenia. Raz w roku składa się roczne zeznanie podatkowe PIT, najwygodniej przez usługę Twój e-PIT. Podatki lokalne (np. od nieruchomości) finansują drogi i szkoły w gminie.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Legally, taxes are money payments that are not a payment for a particular service in return, and that a public body charges everyone who meets the conditions set in the law.",
          de: "Rechtlich sind Steuern Geldleistungen ohne Gegenleistung für eine besondere Leistung, die ein öffentlich-rechtliches Gemeinwesen allen auferlegt.",
          pl: "Prawnie podatki to nieodpłatne, przymusowe oraz bezzwrotne świadczenia pieniężne na rzecz państwa lub samorządu terytorialnego.",
        },
        source: "https://www.gesetze-im-internet.de/ao_1977/__3.html",
      },
      {
        text: {
          en: "Taxes are the state's most important source of income, and the money pays for shared tasks such as education, health, transport infrastructure and security.",
          de: "Steuern sind die wichtigste Einnahmequelle des Staates für Bildung, Gesundheit, Verkehrswege und Sicherheit.",
          pl: "Podatki stanowią główne źródło dochodów państwa, finansując edukację, służbę zdrowia, drogi oraz bezpieczeństwo publiczne.",
        },
        source: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Steuern/steuern.html",
      },
      {
        text: {
          en: "The state builds hospitals, schools and roads with tax money, and pays public servants such as police officers and firefighters.",
          de: "Mit Steuergeldern baut der Staat Krankenhäuser, Schulen und Straßen und bezahlt Polizei und Feuerwehr.",
          pl: "Z podatków państwo buduje szpitale, szkoły i drogi oraz opłaca policjantów i strażaków.",
        },
        source: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Service/Leichte_Sprache/steuern.html",
      },
      {
        text: {
          en: "Progressive taxation means that higher earners pay a higher proportion of their income in taxes.",
          de: "Steuerprogression bedeutet, dass höhere Einkommen mit einem höheren Steuersatz besteuert werden.",
          pl: "Progresja podatkowa oznacza, że osoby o wyższych dochodach płacą wyższą stawkę podatkową.",
        },
        source: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Service/Leichte_Sprache/steuern.html",
      },
      {
        text: {
          en: "Employers deduct wage taxes automatically from monthly earnings and remit them to the tax authorities.",
          de: "Arbeitgeber behalten die Lohnsteuer direkt vom Gehalt ein und führen sie an das Finanzamt ab.",
          pl: "Pracodawcy potrącają zaliczki na podatek dochodowy bezpośrednio z wynagrodzenia pracownika i przekazują je do urzędu skarbowego.",
        },
        source: "https://esth.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/VI-Steuererhebung-36-47/2-Steuerabzug-vom-Arbeitslohn-Lohnsteuer-38-42g/Paragraf-38/paragraf-38.html",
      },
      {
        text: {
          en: "Tax administrations offer electronic platforms (such as ELSTER in Germany, Twój e-PIT in Poland, or e-Filing in India) to file tax returns online.",
          de: "Finanzverwaltungen bieten elektronische Portale (z. B. ELSTER in Deutschland) zur Übermittlung von Steuererklärungen an.",
          pl: "Urzędy skarbowe udostępniają platformy elektroniczne (np. Twój e-PIT w Polsce, ELSTER w Niemczech) do składania deklaracji przez internet.",
        },
        source: "https://www.finanzamt.nrw.de/elster-ihr-online-finanzamt",
      },
      {
        text: {
          en: "Tax decisions in democratic societies are made by elected representatives in municipal councils and national parliaments.",
          de: "In der Demokratie werden Steuergesetze von gewählten Vertretern in Gemeinderäten und Parlamenten beschlossen.",
          pl: "W państwach demokratycznych decyzje podatkowe podejmują wybierani przedstawiciele w radach gmin i w parlamencie.",
        },
        source: "https://www.gesetze-im-internet.de/gg/art_20.html",
      },
    ],
    simplified: [
      {
        en: "The simplified budget illustrates a flat tax pool; real fiscal systems feature progressive rates and municipal budgets.",
        de: "Das vereinfachte Budget veranschaulicht ein gemeinsames Steueraufkommen; reale Systeme nutzen progressive Steuertarife.",
        pl: "Uproszczony budżet pokazuje wspólny garnek podatkowy; rzeczywiste systemy stosują progresję podatkową i budżety samorządowe.",
      },
      {
        en: "Public goods such as roads and schools are funded collectively because excludeability and individual charging are impractical.",
        de: "Öffentliche Güter wie Straßen und Schulen werden gemeinsam finanziert, da Einzelabrechnungen unpraktisch sind.",
        pl: "Dobra publiczne, takie jak drogi czy szkoły, są finansowane wspólnie, ponieważ opłaty jednostkowe byłyby uciążliwe.",
      },
      {
        en: "Democratic voting links taxpayer contributions to municipal expenditure decisions.",
        de: "Wahlen verbinden Steuerzahlungen mit kommunalen Haushaltsentscheidungen.",
        pl: "Wybory łączą płacenie podatków z decyzjami o wydatkach publicznych w samorządzie.",
      },
    ],
  },
};
