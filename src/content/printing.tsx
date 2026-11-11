import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BreadPriceDiagram,
  FineDiagram,
  HyperDiagram,
  IdeaDiagram,
  InflationDiagram,
  PriceUpDiagram,
  PrintDiagram,
  ProblemDiagram,
} from "./printing.diagrams";
import { PrintToy } from "./printing.toy";
import "./printing.css";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <PrintToy lang={lang} onInteract={onDone} />;
}

/** Print some new coins but keep a loaf at 2 coins: the widget only passes when it really is 2 coins. */
function KeepPriceWidget({ lang, onAnswer }: WidgetProps) {
  return <PrintToy lang={lang} onCheck={onAnswer} />;
}

export const lesson: Lesson = {
  id: "printing",
  story: [
    animatedBeat(
      [
        T(
          "This is Mayor Moss. He looks after Ripple Town.",
          "Das ist Bürgermeister Moss. Er kümmert sich um Ripple Town.",
          "To jest burmistrz Moss. Opiekuje się Ripple Town.",
        ),
        T(
          "The town needs a new bridge over the river.",
          "Die Stadt braucht eine neue Brücke über den Fluss.",
          "Miasto potrzebuje nowego mostu na rzece.",
        ),
        T(
          "But there is a problem. The town chest is empty, so there are no coins left to pay for the bridge.",
          "Aber es gibt ein Problem. Die Stadtkasse ist leer, also sind keine Münzen mehr da, um die Brücke zu bezahlen.",
          "Lecz pojawił się problem. Miejska skrzynia jest pusta, więc nie ma monet, by zapłacić za most.",
        ),
      ],
      ProblemDiagram,
    ),
    animatedBeat(
      [
        T(
          "Then Moss has an idea. He owns a coin press. That is a machine that makes new coins.",
          "Da hat Moss eine Idee. Er hat eine Münzpresse. Das ist eine Maschine, die neue Münzen macht.",
          "Wtedy Moss wpada na pomysł. Ma prasę do monet. To maszyna, która wytłacza nowe monety.",
        ),
        T(
          "He thinks: I will make lots and lots of new coins, and then the whole town will be rich!",
          "Er denkt: Ich mache ganz viele neue Münzen, und dann ist die ganze Stadt reich!",
          "Myśli: Zrobię mnóstwo nowych monet i całe miasto będzie bogate!",
        ),
        T(
          "Making new money just because you want more has a name. It is called *printing money*.",
          "Neues Geld zu machen, nur weil man mehr haben will, hat einen Namen. Es heißt *Geld drucken*.",
          "Wytwarzanie nowych pieniędzy tylko dlatego, że chce się mieć ich więcej, ma swoją nazwę. Nazywa się to *drukowaniem pieniędzy*.",
        ),
      ],
      IdeaDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "But first, let's look at the bread. Bea the baker bakes 10 loaves every day.",
          "Aber schauen wir zuerst aufs Brot. Bäckerin Bea backt jeden Tag 10 Brote.",
          "Lecz najpierw spójrzmy na chleb. Piekarka Bea piecze 10 bochenków każdego dnia.",
        ),
        T(
          "Right now, the whole town has 20 coins.",
          "Im Moment hat die ganze Stadt 20 Münzen.",
          "W tej chwili całe miasteczko ma 20 monet.",
        ),
        T(
          "20 coins for 10 loaves: one loaf costs 2 coins. That is its price.",
          "20 Münzen für 10 Brote: Ein Brot kostet 2 Münzen. Das ist sein Preis.",
          "20 monet za 10 bochenków: jeden bochenek kosztuje 2 monety. To jest jego cena.",
        ),
      ],
      BreadPriceDiagram,
    ),
    animatedBeat(
      [
        T(
          "Now Moss uses the coin press. It makes 20 new coins.",
          "Jetzt benutzt Moss die Münzpresse. Sie macht 20 neue Münzen.",
          "Teraz Moss używa prasy do monet. Wytłacza 20 nowych monet.",
        ),
        T(
          "Before, there were 20 coins in town. Now there are 40!",
          "Vorher gab es 20 Münzen in der Stadt. Jetzt sind es 40!",
          "Wcześniej w mieście było 20 monet. Teraz jest ich 40!",
        ),
        T(
          "Everybody feels rich and runs to Bea to buy bread.",
          "Alle fühlen sich reich und rennen zu Bea, um Brot zu kaufen.",
          "Wszyscy czują się bogaci i biegną do Bei kupić chleb.",
        ),
      ],
      PrintDiagram,
    ),
    animatedBeat(
      [
        T(
          "But Bea still bakes only 10 loaves a day. Coins cannot bake bread!",
          "Aber Bea backt immer noch nur 10 Brote am Tag. Münzen können kein Brot backen!",
          "Ale Bea wciąż piecze tylko 10 bochenków dziennie. Monety nie potrafią upiec chleba!",
        ),
        T(
          "Now 40 coins want the same 10 loaves. That is twice as many coins as before.",
          "Jetzt wollen 40 Münzen die gleichen 10 Brote. Das sind doppelt so viele Münzen wie vorher.",
          "Teraz 40 monet rywalizuje o te same 10 bochenków. To dwa razy więcej monet niż wcześniej.",
        ),
        T(
          "Everybody offers more coins for the little bread there is. Now one loaf costs 4 coins.",
          "Alle bieten mehr Münzen für das wenige Brot, das es gibt. Jetzt kostet ein Brot 4 Münzen.",
          "Każdy oferuje więcej monet za tę samą ilość chleba. Teraz bochenek kosztuje 4 monety.",
        ),
      ],
      PriceUpDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Prices went up. When most prices in a town go up, that is called inflation. You already know this word.",
          "Die Preise sind gestiegen. Wenn die meisten Preise in einer Stadt steigen, nennt man das Inflation. Das Wort kennst du schon.",
          "Ceny poszły w górę. Kiedy większość cen w miasteczku rośnie, to się nazywa inflacja. Znasz już to słowo.",
        ),
        T(
          "The town has more coins, but still only 10 loaves. Nobody can buy more bread than before.",
          "Die Stadt hat mehr Münzen, aber immer noch nur 10 Brote. Niemand kann mehr Brot kaufen als vorher.",
          "Miasto ma więcej monet, ale wciąż tylko 10 bochenków. Nikt nie może kupić więcej chleba niż dawniej.",
        ),
        T(
          "So nobody got richer. Printing coins does not make real things appear.",
          "Also ist niemand reicher geworden. Münzen zu drucken lässt keine echten Dinge entstehen.",
          "Więc nikt się nie wzbogacił. Samo robienie monet nie sprawia, że przybywa prawdziwych rzeczy.",
        ),
      ],
      InflationDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "What if Moss keeps printing and printing? Then a loaf costs 10 coins, and then 100 coins.",
          "Was, wenn Moss immer weiter druckt? Dann kostet ein Brot 10 Münzen und danach 100 Münzen.",
          "A co, jeśli Moss drukuje bez końca? Wtedy bochenek kosztuje 10 monet, a potem 100 monet.",
        ),
        T(
          "When prices shoot up this fast, it has its own name. It is called *hyperinflation*.",
          "Wenn Preise so schnell in die Höhe schießen, hat das einen eigenen Namen. Es heißt *Hyperinflation*.",
          "Kiedy ceny szybują w górę w tak zawrotnym tempie, ma to swoją nazwę. To jest *hiperinflacja*.",
        ),
        T(
          "People stop trusting the coins. Then the coins are just pieces of metal.",
          "Die Leute vertrauen den Münzen nicht mehr. Dann sind die Münzen nur noch Stücke aus Metall.",
          "Ludzie przestają ufać monetom. Wtedy monety stają się po prostu kawałkami metalu.",
        ),
      ],
      HyperDiagram,
    ),
    animatedBeat(
      [
        T(
          "Does that mean a town may never make new coins? No. A few new coins can be fine.",
          "Heißt das, eine Stadt darf nie neue Münzen machen? Nein. Ein paar neue Münzen können in Ordnung sein.",
          "Czy to znaczy, że miasto nigdy nie może stworzyć nowych monet? Nie. Kilka nowych monet jest w porządku.",
        ),
        T(
          "It works when the town also makes more bread and other things to buy.",
          "Das klappt, wenn die Stadt auch mehr Brot und andere Dinge zum Kaufen herstellt.",
          "Działa to wtedy, gdy miasto wytwarza także więcej chleba i innych rzeczy do kupienia.",
        ),
        T(
          "Then a loaf still costs 2 coins. Coins are worth something because you can buy real things with them.",
          "Dann kostet ein Brot weiter 2 Münzen. Münzen sind etwas wert, weil man echte Dinge damit kaufen kann.",
          "Wtedy bochenek nadal kosztuje 2 monety. Monety są coś warte, ponieważ można za nie kupić prawdziwe rzeczy.",
        ),
        T(
          "In real life, a special bank looks after a country's money. It is called the *central bank*.",
          "Im echten Leben kümmert sich eine besondere Bank um das Geld eines Landes. Sie heißt *Zentralbank*.",
          "W prawdziwym życiu specjalny bank dba o pieniądze w kraju. Nazywa się to *bank centralny*.",
        ),
        T(
          "Its main job is to keep prices steady, so that your coins buy about the same tomorrow.",
          "Ihre wichtigste Aufgabe ist es, die Preise stabil zu halten, damit deine Münzen morgen ungefähr so viel kaufen wie heute.",
          "Jego głównym zadaniem jest dbanie o stabilność cen, aby twoje monety jutro kupiły mniej więcej tyle samo co dziś.",
        ),
      ],
      FineDiagram,
      "happy",
    ),
  ],
  toyIntro: T(
    "The coin press is ready! Print new coins and watch the bread price. Then make Bea bake more bread.",
    "Die Münzpresse ist bereit! Drucke neue Münzen und schau auf den Brotpreis. Dann lass Bea mehr Brot backen.",
    "Prasa do monet jest gotowa! Wydrukuj nowe monety i obserwuj cenę chleba. Potem spraw, by Bea upiekła więcej chleba.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Mayor Moss prints lots of new coins, but Bea still bakes 10 loaves. What happens to the price of bread?",
        "Bürgermeister Moss druckt viele neue Münzen, aber Bea backt immer noch 10 Brote. Was passiert mit dem Brotpreis?",
        "Burmistrz Moss drukuje wiele nowych monet, lecz Bea nadal piecze 10 bochenków. Co stanie się z ceną chleba?",
      ),
      options: [
        { text: T("It goes down", "Er sinkt", "Spadnie") },
        { text: T("It goes up", "Er steigt", "Wzrośnie"), correct: true },
        { text: T("It stays the same", "Er bleibt gleich", "Pozostanie bez zmian") },
      ],
      hint: T(
        "Think of the bread. There are more coins, but the same 10 loaves. More coins want the same bread, so each loaf costs more coins.",
        "Denk ans Brot. Es gibt mehr Münzen, aber die gleichen 10 Brote. Mehr Münzen wollen das gleiche Brot, also kostet jedes Brot mehr Münzen.",
        "Pomyśl o chlebie. Jest więcej monet, ale wciąż te same 10 bochenków. Więcej monet rywalizuje o ten sam chleb, więc każdy bochenek kosztuje więcej monet.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Print some new coins, but keep a loaf at 2 coins. Use the buttons, then press Check.",
        "Drucke ein paar neue Münzen, aber lass ein Brot bei 2 Münzen. Nutze die Knöpfe und drücke dann Prüfen.",
        "Wydrukuj trochę nowych monet, ale utrzymaj cenę bochenka na poziomie 2 monet. Użyj przycisków, a potem naciśnij Sprawdź.",
      ),
      Widget: KeepPriceWidget,
      hint: T(
        "Not exactly 2 coins yet, or nothing was printed. New coins need new bread too. If the town has 40 coins, Bea must bake 20 loaves.",
        "Es sind noch nicht genau 2 Münzen, oder es wurde nichts gedruckt. Zu neuen Münzen gehört auch neues Brot. Hat die Stadt 40 Münzen, muss Bea 20 Brote backen.",
        "Cena nie wynosi dokładnie 2 monet lub nic nie wydrukowano. Do nowych monet potrzeba też nowego chleba. Jeśli miasto ma 40 monet, Bea musi upiec 20 bochenków.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "When is it fine for a town to add a few new coins?",
        "Wann ist es in Ordnung, wenn eine Stadt ein paar neue Münzen dazugibt?",
        "Kiedy miasto może bezpiecznie wprowadzić kilka nowych monet?",
      ),
      options: [
        {
          text: T(
            "Whenever the mayor wants to build something",
            "Immer, wenn der Bürgermeister etwas bauen will",
            "Zawsze, gdy burmistrz chce coś wybudować",
          ),
        },
        {
          text: T("Never, not for any reason", "Nie, aus keinem Grund", "Nigdy, z żadnego powodu"),
        },
        {
          text: T(
            "When the town also makes more bread and things",
            "Wenn die Stadt auch mehr Brot und Sachen herstellt",
            "Gdy miasto wytwarza także więcej chleba i innych dóbr",
          ),
          correct: true,
        },
      ],
      hint: T(
        "Remember the toy: when Bea baked more bread, the price could stay the same. New coins are fine when there are more real things to buy too.",
        "Denk an das Spielzeug: Wenn Bea mehr Brot backte, konnte der Preis gleich bleiben. Neue Münzen sind in Ordnung, wenn es auch mehr echte Dinge zu kaufen gibt.",
        "Pamiętasz zabawkę: gdy Bea upiekła więcej chleba, cena mogła pozostać bez zmian. Nowe monety są bezpieczne, gdy jest też więcej prawdziwych rzeczy do kupienia.",
      ),
    },
  ],
  askDad: T(
    "If you were mayor and the town chest was empty, what would you do instead of printing coins? And what do you think would happen to our pocket money if all prices doubled?",
    "Wenn du Bürgermeister wärst und die Stadtkasse leer wäre, was würdest du statt Münzen zu drucken tun? Und was würde mit unserem Taschengeld passieren, wenn alle Preise doppelt so hoch wären?",
    "Gdybyś był burmistrzem, a kasa miejska była pusta, co byś zrobił zamiast drukować monety? I co stałoby się z naszym kieszonkowym, gdyby wszystkie ceny wzrosły dwukrotnie?",
  ),
  realLife: {
    title: {
      en: "Why India does not just print money",
      de: "Warum Deutschland nicht einfach Geld druckt",
      pl: "Dlaczego Polska nie drukuje po prostu pieniędzy",
    },
    body: {
      en: "In the past, governments sometimes asked central banks to create money to pay bills, called automatic monetization. In India, the Reserve Bank of India (RBI) phased out ad-hoc Treasury bills in 1997. Today, under the Fiscal Responsibility and Budget Management framework, the RBI does not print money directly to cover government deficits, preventing rapid inflation.",
      de: "Im Jahr 1923 hat Deutschland so viel Geld gedruckt, dass ein Brot 201 Milliarden Mark kostete. Arbeiter trugen ihren Lohn in Säcken und auf Wagen nach Hause und gaben ihn schnell aus. Heute kümmert sich die Europäische Zentralbank um den Euro. Ihr wichtigstes Ziel sind stabile Preise, und EU-Regeln erlauben ihr nicht, einfach Geld für die Rechnungen eines Staates zu drucken.",
      pl: "W latach 1989-1990 w Polsce panowała hiperinflacja sięgająca niemal 600 procent rocznie, przez co ceny rosły z dnia na dzień. W 1995 roku przeprowadzono denominację: 10 000 starych złotych zamieniono na 1 nowy złoty. Dziś artykuł 220 Konstytucji RP zabrania rządowi pokrywania defizytu budżetowego poprzez drukowanie pieniędzy w Narodowym Banku Polskim (NBP).",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Inflation is a broad increase in the prices of goods and services: you can buy less for 1 euro today than yesterday, so inflation reduces the value of the currency.",
          de: "Inflation ist ein breit angelegter Anstieg der Preise von Waren und Dienstleistungen, der den Wert der Währung mindert.",
          pl: "Inflacja to powszechny wzrost cen towarów i usług, który obniża wartość i siłę nabywczą waluty.",
        },
        source:
          "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_inflation.en.html",
      },
      {
        text: {
          en: "In 1923 the German government borrowed from the Reichsbank, which printed more and more banknotes. This was not matched by growth in the supply of goods, so huge price increases resulted.",
          de: "1923 druckte die Reichsbank immer mehr Banknoten ohne entsprechendes Güterwachstum, was zu enormen Preissteigerungen führte.",
          pl: "W 1923 roku rząd niemiecki pożyczał od Reichsbanku, który drukował masowo banknoty bez pokrycia w towarach, wywołując hiperinflację.",
        },
        source:
          "https://www.bundesbank.de/en/tasks/topics/inflation-lessons-learnt-from-history-666006",
      },
      {
        text: {
          en: "The nominal price of a loaf of bread in Germany was 0.80 Mark in December 1919 and 201 billion Mark in November 1923. Workers collected their pay in sacks and rushed to spend it.",
          de: "Der Brotpreis stieg in Deutschland von 0,80 Mark (1919) auf 201 Milliarden Mark (November 1923). Löhne wurden teils mit Schubkarren abgeholt.",
          pl: "Cena bochenka chleba w Niemczech wzrosła z 0,80 marki w 1919 roku do 201 miliardów marek w listopadzie 1923 roku.",
        },
        source:
          "https://www.bundestag.de/parlament/geschichte/100-jahre-weimar/hyperinflation-970722",
      },
      {
        text: {
          en: "Article 123 of the Treaty on the Functioning of the European Union prohibits central banks from directly financing governments and public bodies.",
          de: "Artikel 123 des AEU-Vertrags verbietet der EZB und nationalen Zentralbanken die direkte Finanzierung staatlicher Haushalte.",
          pl: "Artykuł 123 Traktatu o funkcjonowaniu Unii Europejskiej zabrania bankom centralnym bezpośredniego finansowania instytucji publicznych.",
        },
        source: "https://eur-lex.europa.eu/eli/treaty/tfeu_2016/art_123/oj/eng",
      },
      {
        text: {
          en: "Article 220, paragraph 2 of the Polish Constitution prohibits financing the state budget deficit by borrowing from the central bank (NBP).",
          de: "Artikel 220 der polnischen Verfassung verbietet die Deckung des Haushaltsdefizits durch Kredite bei der Zentralbank.",
          pl: "Artykuł 220 ust. 2 Konstytucji Rzeczypospolitej Polskiej zabrania pokrywania deficytu budżetowego przez zaciąganie zobowiązań w centralnym banku państwa.",
        },
        source: "https://www.sejm.gov.pl/prawo/konst/polski/kon1.htm",
      },
      {
        text: {
          en: "The primary objective of central banks (such as ECB, NBP, and RBI) is price stability, and independence protects them from political pressure to print money.",
          de: "Hauptziel unabhängiger Zentralbanken ist die Preisstabilität, geschützt vor politischem Druck zur Geldschöpfung.",
          pl: "Głównym celem niezależnych banków centralnych (jak NBP czy EBC) jest utrzymanie stabilności cen.",
        },
        source:
          "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/five_things.en.html",
      },
    ],
    simplified: [
      {
        en: "The town numbers (20 coins, 10 loaves, 2-coin price) are a model showing that more money chasing the same goods raises prices.",
        de: "Die Zahlen des Dorfes veranschaulichen das Prinzip: Mehr Geld bei gleichem Güterangebot treibt die Preise.",
        pl: "Liczby w miasteczku obrazują regułę: więcej pieniędzy ubiegających się o tę samą ilość towaru winduje ceny.",
      },
      {
        en: "Real central banks manage money growth carefully, and issuing new money is safe when economic output expands proportionally.",
        de: "Reale Zentralbanken steuern das Geldmengenwachstum behutsam im Einklang mit der Wirtschaftsleistung.",
        pl: "W rzeczywistości banki centralne dbają o to, by przyrost podaży pieniądza odpowiadał rozwojowi gospodarki.",
      },
      {
        en: "Constitutional and legal frameworks strictly prevent governments from directly using central banks to fund deficits.",
        de: "Gesetzliche Regeln verbieten Staaten die direkte Finanzierung ihrer Ausgaben über die Notenpresse.",
        pl: "Konstytucyjne i międzynarodowe przepisy uniemożliwiają rządom bezpośrednie drukowanie pieniędzy na spłatę długów.",
      },
    ],
  },
};
