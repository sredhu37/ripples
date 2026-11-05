import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  DemandDiagram,
  FewManyDiagram,
  HoursDiagram,
  JobsDiagram,
  KeepDiagram,
  LearnDiagram,
  PayDiagram,
  WhyDiagram,
} from "./work.diagrams";
import { JobMarket, LOW_PAY, NORMAL, payPerHour } from "./work.toy";

// The pay logic lives in work.toy.tsx; re-exported here for the tests.
export { LOW_PAY, NORMAL_PEOPLE, payPerHour, pushes } from "./work.toy";
export type { Market } from "./work.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <JobMarket lang={lang} start={NORMAL} onChange={() => onDone?.()} />;
}

function PayMoreWidget({ lang, onAnswer }: WidgetProps) {
  const [pay, setPay] = useState(payPerHour(LOW_PAY));
  return (
    <>
      <JobMarket lang={lang} start={LOW_PAY} onChange={setPay} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(pay > payPerHour(LOW_PAY))} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "work",
  story: [
    animatedBeat(
      [
        T(
          "Everybody in Ripple Town does some kind of work. Finn is a fisherman. That means he catches fish.",
          "Alle in Ripple Town arbeiten. Finn ist Fischer. Das heißt, er fängt Fische.",
          "Każdy w Ripple Town wykonuje jakąś pracę. Finn jest rybakiem. To znaczy, że łowi ryby.",
        ),
        T(
          "Bea is a baker. That means she bakes bread.",
          "Bea ist Bäckerin. Das heißt, sie backt Brot.",
          "Bea jest piekarzem. To znaczy, że piecze chleb.",
        ),
        T(
          "Sam is a shoemaker. That means he makes shoes.",
          "Sam ist Schuhmacher. Das heißt, er macht Schuhe.",
          "Sam jest szewcem. To znaczy, że robi buty.",
        ),
        T(
          "The work a person does every day has a name. It is called a *job*.",
          "Die Arbeit, die ein Mensch jeden Tag macht, hat einen Namen. Sie heißt *Beruf*.",
          "Praca, którą człowiek wykonuje codziennie, ma nazwę. Nazywa się to *zawód*.",
        ),
      ],
      JobsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Bea bakes bread, and lots of people in town want it.",
          "Bea backt Brot, und viele Leute in der Stadt wollen es haben.",
          "Bea piecze chleb i wielu ludzi w mieście go potrzebuje.",
        ),
        T(
          "Pip wants some, too. Pip gives Bea 3 coins for the bread.",
          "Pip möchte auch welches. Pip gibt Bea 3 Münzen für das Brot.",
          "Pip też go chce. Pip daje Bei 3 monety za chleb.",
        ),
        T(
          "Coins that you get for your work have a name. They are called *pay*.",
          "Münzen, die du für deine Arbeit bekommst, haben einen Namen. Sie heißen *Lohn*.",
          "Monety, które dostajesz za swoją pracę, mają nazwę. To jest *płaca*.",
        ),
        T(
          "Pip pays Bea because her bread is worth something to Pip. So pay is coins for work that other people value.",
          "Pip bezahlt Bea, weil ihr Brot für Pip etwas wert ist. Lohn sind also Münzen für Arbeit, die anderen etwas wert ist.",
          "Pip płaci Bei, bo jej chleb ma dla niego wartość. Płaca to monety za pracę cenioną przez innych.",
        ),
      ],
      PayDiagram,
    ),
    animatedBeat(
      [
        T(
          "Pay is often counted by the hour. Bea gets 3 coins for each hour that she works.",
          "Lohn wird oft nach Stunden gezählt. Bea bekommt 3 Münzen für jede Stunde, die sie arbeitet.",
          "Płacę często liczy się na godziny. Bea dostaje 3 monety za każdą godzinę pracy.",
        ),
        T("Today Bea works for 4 hours.", "Heute arbeitet Bea 4 Stunden.", "Dzisiaj Bea pracuje przez 4 godziny."),
        T(
          "In every one of those hours she earns 3 coins.",
          "In jeder dieser Stunden verdient sie 3 Münzen.",
          "W każdej z tych godzin zarabia 3 monety.",
        ),
        T(
          "Four hours with 3 coins each: 4 times 3 makes 12 coins.",
          "Vier Stunden mit je 3 Münzen: 4 mal 3 sind 12 Münzen.",
          "Cztery godziny po 3 monety: 4 razy 3 daje 12 monet.",
        ),
      ],
      HoursDiagram,
    ),
    animatedBeat(
      [
        T("Bea gets 3 coins for each hour of her work.", "Bea bekommt 3 Münzen für jede Stunde Arbeit.", "Bea dostaje 3 monety za każdą godzinę pracy."),
        T(
          "But Sam gets 5 coins for each hour. That is more than Bea!",
          "Aber Sam bekommt 5 Münzen für jede Stunde. Das ist mehr als bei Bea!",
          "Ale Sam dostaje 5 monet za każdą godzinę. To więcej niż Bea!",
        ),
        T(
          "Why does one job pay more than another? There are three reasons. Let's find them.",
          "Warum zahlt ein Beruf mehr als ein anderer? Dafür gibt es drei Gründe. Wir suchen sie gemeinsam.",
          "Dlaczego za jeden zawód płaci się więcej niż za inny? Są trzy powody. Odkryjmy je.",
        ),
      ],
      WhyDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "The first reason is learning time. Some jobs take a long time to learn.",
          "Der erste Grund ist die Lernzeit. Manche Berufe muss man lange lernen.",
          "Pierwszym powodem jest czas nauki. Niektórych zawodów trzeba uczyć się bardzo długo.",
        ),
        T(
          "Sam practiced for three years to make good shoes.",
          "Sam hat drei Jahre lang geübt, um gute Schuhe zu machen.",
          "Sam ćwiczył przez trzy lata, aby robić dobre buty.",
        ),
        T(
          "The longer a job takes to learn, the more it usually pays.",
          "Je länger man einen Beruf lernt, desto mehr zahlt er meistens.",
          "Im dłużej trwa nauka zawodu, tym wyższe jest zazwyczaj wynagrodzenie.",
        ),
      ],
      LearnDiagram,
    ),
    animatedBeat(
      [
        T(
          "The second reason is how many people can do a job. Let's look at people who fix boats. They make broken boats work again.",
          "Der zweite Grund ist, wie viele Leute einen Beruf können. Schauen wir uns Leute an, die Boote reparieren. Sie machen kaputte Boote wieder heil.",
          "Drugim powodem jest to, ile osób potrafi wykonywać daną pracę. Zobaczmy naprawiaczy łodzi. Sprawiają, że zepsute łodzie znów pływają.",
        ),
        T(
          "If only a few people can fix boats, the town pays more coins to each one of them.",
          "Wenn nur wenige Leute Boote reparieren können, zahlt die Stadt jedem von ihnen mehr Münzen.",
          "Jeśli tylko nieliczni potrafią naprawiać łodzie, miasto płaci każdemu z nich więcej monet.",
        ),
        T(
          "If many people can fix boats, each one of them gets fewer coins.",
          "Wenn viele Leute Boote reparieren können, bekommt jeder von ihnen weniger Münzen.",
          "Jeśli wielu ludzi potrafi naprawiać łodzie, każdy z nich dostaje mniej monet.",
        ),
      ],
      FewManyDiagram,
    ),
    animatedBeat(
      [
        T(
          "The third reason is how much people need the work. At the moment, only one boat in town needs fixing.",
          "Der dritte Grund ist, wie sehr die Leute die Arbeit brauchen. Im Moment muss in der Stadt nur ein Boot repariert werden.",
          "Trzecim powodem jest to, jak bardzo ludzie potrzebują danej pracy. W tej chwili w mieście tylko jedna łódź wymaga naprawy.",
        ),
        T(
          "How much people want or need something has a name. It is called *demand*.",
          "Wie sehr die Leute etwas wollen oder brauchen, hat einen Namen. Es heißt *Nachfrage*.",
          "To, jak bardzo ludzie czegoś chcą lub potrzebują, ma swoją nazwę. To jest *popyt*.",
        ),
        T(
          "Now lots of boats are broken. The demand for boat fixing is high!",
          "Jetzt sind viele Boote kaputt. Die Nachfrage nach Bootsreparaturen ist hoch!",
          "Teraz wiele łodzi jest zepsutych. Popyt na naprawę łodzi jest wysoki!",
        ),
        T(
          "The more the town needs the work, the more coins that work is worth.",
          "Je mehr die Stadt die Arbeit braucht, desto mehr Münzen ist sie wert.",
          "Im bardziej miasto potrzebuje tej pracy, tym więcej monet jest ona warta.",
        ),
      ],
      DemandDiagram,
    ),
    animatedBeat(
      [
        T("The coins you earn are yours.", "Die Münzen, die du verdienst, gehören dir.", "Monety, które zarobisz, należą do ciebie."),
        T("You can spend them, for example on bread.", "Du kannst sie ausgeben, zum Beispiel für Brot.", "Możesz je wydać, na przykład na chleb."),
        T("Or you can save some of them for later.", "Oder du sparst einen Teil für später.", "Albo odłożyć część z nich na później."),
      ],
      KeepDiagram,
    ),
  ],
  toyIntro: T(
    "Boat fixing is a job in Ripple Town. Move the three sliders and watch the pay change.",
    "Boote reparieren ist ein Beruf in Ripple Town. Schiebe die drei Regler und schau, wie sich der Lohn verändert.",
    "Naprawa łodzi to zawód w Ripple Town. Przesuwaj trzy suwaki i obserwuj, jak zmienia się płaca.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Sam spent three years learning to make shoes. Tim's job took one afternoon to learn. Which job usually pays more per hour?",
        "Sam hat drei Jahre lang gelernt, Schuhe zu machen. Tims Beruf hat man an einem Nachmittag gelernt. Welcher Beruf zahlt meistens mehr pro Stunde?",
        "Sam uczył się robić buty przez trzy lata. Zawodu Tima można nauczyć się w jedno popołudnie. Który zawód zazwyczaj przynosi większy zarobek na godzinę?",
      ),
      options: [
        { text: T("Tim's job, learned in one afternoon", "Tims Beruf, an einem Nachmittag gelernt", "Zawód Tima, poznany w jedno popołudnie") },
        { text: T("Sam's job, learned in three years", "Sams Beruf, in drei Jahren gelernt", "Zawód Sama, wymagający trzech lat nauki"), correct: true },
        { text: T("They always pay exactly the same", "Sie zahlen immer genau gleich viel", "Oba przynoszą zawsze dokładnie tyle samo") },
      ],
      hint: T(
        "A job that takes years to learn is harder to find people for. So it usually pays more per hour.",
        "Für einen Beruf, den man Jahre lernt, findet man schwerer Leute. Darum zahlt er meistens mehr pro Stunde.",
        "Trudniej znaleźć ludzi do pracy, której nauka trwa latami. Dlatego zazwyczaj płaci się za nią więcej na godzinę.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Boat fixers only get 1 coin an hour right now. Move the sliders so that boat fixing pays more. Then press Check.",
        "Wer Boote repariert, bekommt gerade nur 1 Münze pro Stunde. Verschiebe die Regler so, dass die Arbeit mehr Lohn bringt. Drücke dann Prüfen.",
        "Naprawiacze łodzi dostają teraz tylko 1 monetę na godzinę. Przesuń suwaki, aby naprawa łodzi przynosiła większy zarobek. Następnie naciśnij Sprawdź.",
      ),
      Widget: PayMoreWidget,
      hint: T(
        "The pay is still 1 coin. It goes up when fewer people can do the job, when it takes longer to learn, or when the town needs it more.",
        "Der Lohn ist noch 1 Münze. Er steigt, wenn weniger Leute den Beruf können, wenn man ihn länger lernt oder wenn die Stadt ihn mehr braucht.",
        "Płaca wynosi nadal 1 monetę. Wzrasta, gdy mniej ludzi potrafi wykonywać tę pracę, gdy nauka trwa dłużej lub gdy miasto bardziej jej potrzebuje.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Suddenly the whole town needs its boats fixed. But there are still only 3 boat fixers. What happens to their pay?",
        "Plötzlich will die ganze Stadt ihre Boote repariert haben. Aber es gibt immer noch nur 3 Leute, die Boote reparieren. Was passiert mit ihrem Lohn?",
        "Nagle całe miasto potrzebuje naprawy swoich łodzi. Ale nadal jest tylko 3 naprawiaczy. Co stanie się z ich płacą?",
      ),
      options: [
        { text: T("It goes up", "Er steigt", "Wzrasta"), correct: true },
        { text: T("It goes down", "Er sinkt", "Spada") },
        { text: T("It stays exactly the same", "Er bleibt genau gleich", "Pozostaje dokładnie taka sama") },
      ],
      hint: T(
        "Lots of work and only a few people who can do it. So the town has to pay more coins to get a boat fixed.",
        "Viel Arbeit und nur wenige, die sie können. Darum muss die Stadt mehr Münzen zahlen, damit ein Boot repariert wird.",
        "Dużo pracy, a mało ludzi, którzy potrafią ją wykonać. Dlatego miasto musi zapłacić więcej monet za naprawę łodzi.",
      ),
    },
  ],
  askDad: T(
    "What was your first job, and what did you get paid for it? What did you have to learn for the job you do now, and how long did that take?",
    "Was war dein erster Job, und was hast du dafür bekommen? Was musstest du für deinen Beruf heute lernen, und wie lange hat das gedauert?",
    "Jaka była twoja pierwsza praca i ile za nią zarobiłeś? Czego musiałeś się nauczyć do obecnej pracy i ile czasu ci to zajęło?",
  ),
  realLife: {
    title: {
      en: "Pay in India",
      de: "Lohn in Deutschland",
      pl: "Wynagrodzenie w Polsce",
    },
    body: {
      en: "In India, workers are paid wages or monthly salaries. The government sets minimum wage floors for different states and skills. From gross monthly pay, deductions like Provident Fund (EPF) and taxes are made, and what the worker takes home is called the in-hand or net salary.",
      de: "Die meisten Arbeitnehmer in Deutschland müssen mindestens den Mindestlohn bekommen: etwa 13,90 Euro für jede Stunde. Das sind Bruttobeträge vor Abzügen. Auf der Gehaltsabrechnung geht Geld an Steuern und Versicherungen, und was übrig bleibt, ist netto.",
      pl: "Większość pracowników w Polsce otrzymuje co najmniej płacę minimalną (w 2026 r. ok. 4666 zł brutto miesięcznie, czyli ok. 30,50 zł za godzinę). Kwota brutto to pensja przed potrąceniem składek ZUS i podatku dochodowego. Pieniądze, które trafiają na konto pracownika, to pensja netto, czyli na rękę.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "In the labor market, the 'good' that is bought and sold is labor, and its price is the wage. The labor market works like other markets, with buyers and sellers who set a price.",
          de: "Auf dem Arbeitsmarkt ist das gehandelte Gut die Arbeit, und ihr Preis ist der Lohn. Der Arbeitsmarkt funktioniert wie andere Märkte mit Angebot und Nachfrage.",
          pl: "Na rynku pracy 'towarem', który podlega kupnu i sprzedaży, jest praca, a jej ceną jest wynagrodzenie. Rynek pracy działa jak inne rynki z kupującymi i sprzedającymi.",
        },
        source: "https://www.federalreserveeducation.org/teaching-resources/economics/labor-income/the-labor-market-podcast",
      },
      {
        text: {
          en: "Workers can raise their productivity and wages by gaining skill, education and training. For higher wages, economists advise professions with high demand but relatively small supply of qualified providers.",
          de: "Arbeitskräfte können ihre Produktivität und Löhne durch Fähigkeiten, Bildung und Ausbildung steigern. Höhere Löhne erzielen Berufe mit hoher Nachfrage und knappem Angebot an Fachkräften.",
          pl: "Pracownicy mogą podnosić swoją produktywność i zarobki poprzez zdobywanie umiejętności i wykształcenia. Wyższe płace oferują zawody o wysokim popycie i ograniczonej liczbie wykwalifikowanych specjalistów.",
        },
        source: "https://www.federalreserveeducation.org/teaching-resources/economics/labor-income/the-labor-market-podcast",
      },
      {
        text: {
          en: "Pay within a job type varies with market conditions such as the number of jobs available and the number of qualified candidates, and consumer demand for what the worker produces affects earnings.",
          de: "Die Bezahlung variiert mit den Marktbedingungen wie der Anzahl offener Stellen, der Zahl qualifizierter Bewerber und der Nachfrage nach den erzeugten Gütern.",
          pl: "Płace w danym zawodzie zależą od warunków rynkowych, takich jak liczba dostępnych miejsc pracy, liczba kandydatów oraz popyt na wytwarzane dobra.",
        },
        source: "https://www.dallasfed.org/~/media/documents/educate/navigate/navigateunit1.pdf",
      },
      {
        text: {
          en: "Statutory minimum wages protect workers by ensuring a legally mandated wage floor across sectors, while skilled roles command higher market earnings based on training.",
          de: "Gesetzliche Mindestlöhne schützen Arbeitnehmer durch eine verbindliche Lohnuntergrenze, während qualifizierte Berufe je nach Ausbildung höhere Marktlöhne erzielen.",
          pl: "Ustawowa płaca minimalna chroni pracowników, zapewniając prawnie gwarantowany próg zarobków, podczas gdy zawody specjalistyczne osiągają wyższe wynagrodzenia rynkowe.",
        },
        source: "https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/Informationen-zum-Mindestlohn/informationen-zum-mindestlohn-deutsch.html",
      },
      {
        text: {
          en: "Gross (brutto) pay is earnings before taxes and social security contributions are deducted. Net (netto) pay is the take-home amount after mandatory statutory deductions.",
          de: "Der Bruttolohn ist das Gehalt vor Abzug von Steuern und Sozialabgaben. Der Nettolohn ist der Auszahlungsbetrag, der nach allen Abzügen übrig bleibt.",
          pl: "Wynagrodzenie brutto to kwota przed potrąceniem podatków i składek na ubezpieczenia społeczne. Wynagrodzenie netto (na rękę) to kwota wypłacana pracownikowi po potrąceniach.",
        },
        source: "https://www.bpb.de/kurz-knapp/lexika/das-junge-politik-lexikon/319967/bruttolohn-nettolohn/",
      },
    ],
    simplified: [
      {
        en: "Real pay depends on many more things than three: working conditions, union agreements, company profits. The lesson highlights three key factors an 8-year-old can see.",
        de: "Reale Löhne hängen von vielen weiteren Faktoren ab: Arbeitsbedingungen, Tarifverträge, Unternehmensgewinne. Die Lektion zeigt drei Kernfaktoren, die für Kinder verständlich sind.",
        pl: "Rzeczywiste zarobki zależą od wielu czynników: warunków pracy, układów zbiorowych, zysków firm. Lekcja wyróżnia trzy kluczowe czynniki zrozumiałe dla dziecka.",
      },
      {
        en: "The pay formula in the toy is simplified to show direction only. Real wages adjust gradually through contracts and negotiations.",
        de: "Die Lohnformel im Spielzeug veranschaulicht nur die Wirkungsrichtung. Reale Löhne passen sich schrittweise durch Verträge und Verhandlungen an.",
        pl: "Wzór płac w minigrze służy jedynie zilustrowaniu zależności. Rzeczywiste pensje zmieniają się stopniowo poprzez umowy i negocjacje.",
      },
      {
        en: "Longer learning leading to higher pay is a tendency, not an absolute rule. Dangerous or scarce jobs can also earn high wages.",
        de: "Längere Ausbildung führt tendenziell zu höherem Lohn, ist aber kein Naturgesetz. Auch gefährliche oder seltene Arbeiten werden oft gut bezahlt.",
        pl: "Dłuższa nauka zazwyczaj prowadzi do wyższych zarobków, ale nie jest to reguła bez wyjątków. Prace niebezpieczne lub rzadkie również bywają wysoko opłacane.",
      },
      {
        en: "Gross and net are introduced as core concepts: what is earned versus what remains after public contributions.",
        de: "Brutto und Netto werden als Grundbegriffe eingeführt: was verdient wird und was nach Abgaben übrig bleibt.",
        pl: "Pojęcia brutto i netto wprowadzono jako podstawę: co zostaje wypracowane, a co trafia do kieszeni po potrąceniach.",
      },
    ],
  },
};
