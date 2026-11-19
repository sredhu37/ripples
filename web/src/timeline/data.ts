import type { Text } from "../lesson/types";
import type { TimelineEra, TimelineEvent, TimelineEraId, TimelineRegion } from "./types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

export const TIMELINE_ERAS: TimelineEra[] = [
  {
    id: "ancient",
    label: T("Ancient Civilizations", "Alte Hochkulturen", "Starożytne cywilizacje"),
    dateRange: T("3000 BCE to 500 CE", "3000 v. Chr. bis 500 n. Chr.", "3000 p.n.e. do 500 n.e."),
    description: T(
      "First cities, writing and trade.",
      "Erste Staedte, Schrift und Handel.",
      "Pierwsze miasta, pismo i handel.",
    ),
  },
  {
    id: "middle_ages",
    label: T(
      "Silk Road and Middle Ages",
      "Seidenstrasse und Mittelalter",
      "Jedwabny Szlak i średniowiecze",
    ),
    dateRange: T("500 to 1500", "500 bis 1500", "500 do 1500"),
    description: T(
      "Caravans, kingdoms and big ideas travel far.",
      "Karawanen, Koenigreiche und grosse Ideen reisen weit.",
      "Karawany, królestwa i wielkie idee wędrują daleko.",
    ),
  },
  {
    id: "trade_empires",
    label: T("Global Trade and Empires", "Welthandel und Reiche", "Światowy handel i imperia"),
    dateRange: T("1500 to 1600", "1500 bis 1600", "1500 do 1600"),
    description: T(
      "Ships link the continents.",
      "Schiffe verbinden die Kontinente.",
      "Statki łączą kontynenty.",
    ),
  },
  {
    id: "scientific_rev",
    label: T("Scientific Revolution", "Wissenschaftliche Revolution", "Rewolucja naukowa"),
    dateRange: T("1600 to 1800", "1600 bis 1800", "1600 do 1800"),
    description: T(
      "Telescopes, gravity and new ways to think.",
      "Fernrohre, Schwerkraft und neues Denken.",
      "Teleskopy, grawitacja i nowy sposób myślenia.",
    ),
  },
  {
    id: "industrial",
    label: T("Industrial Revolution", "Industrielle Revolution", "Rewolucja przemysłowa"),
    dateRange: T("1800 to 1900", "1800 bis 1900", "1800 do 1900"),
    description: T(
      "Steam, electricity and medicine change daily life.",
      "Dampf, Strom und Medizin veraendern den Alltag.",
      "Para, prąd i medycyna zmieniają codzienne życie.",
    ),
  },
  {
    id: "twentieth",
    label: T("The 20th Century", "Das 20. Jahrhundert", "Wiek XX"),
    dateRange: T("1900 to 1999", "1900 bis 1999", "1900 do 1999"),
    description: T(
      "Flight, world wars, freedom and the Moon.",
      "Fliegen, Weltkriege, Freiheit und der Mond.",
      "Loty, wojny światowe, wolność i Księżyc.",
    ),
  },
  {
    id: "digital",
    label: T("Digital and Modern Era", "Digitale Moderne", "Era cyfrowa"),
    dateRange: T("1990 to today", "1990 bis heute", "1990 do dziś"),
    description: T(
      "The web, phones and AI.",
      "Netz, Handys und KI.",
      "Sieć, telefony i sztuczna inteligencja.",
    ),
  },
];

const ev = (
  id: string,
  era: TimelineEraId,
  region: TimelineRegion,
  year: Text,
  title: Text,
  summary: Text,
  lessonId?: string,
): TimelineEvent => ({ id, era, region, year, title, summary, lessonId });

export const TIMELINE_EVENTS: TimelineEvent[] = [
  // Ancient
  ev(
    "indus",
    "ancient",
    "india",
    T("c. 2500 BCE", "um 2500 v. Chr.", "ok. 2500 p.n.e."),
    T("Indus Valley cities", "Die Staedte am Indus", "Miasta doliny Indusu"),
    T(
      "People build neat cities with drains and shared wells.",
      "Menschen bauen ordentliche Staedte mit Abwasserkanaelen und Brunnen.",
      "Ludzie budują zadbane miasta z kanałami i wspólnymi studniami.",
    ),
  ),
  ev(
    "giza",
    "ancient",
    "mideast_africa",
    T("c. 2560 BCE", "um 2560 v. Chr.", "ok. 2560 p.n.e."),
    T("The Great Pyramid of Giza", "Die Cheops-Pyramide", "Wielka Piramida w Gizie"),
    T(
      "Thousands of workers stack huge stones for a king's tomb.",
      "Tausende Arbeiter stapeln riesige Steine fuer das Grab eines Koenigs.",
      "Tysiące robotników układa ogromne kamienie na grobowiec króla.",
    ),
  ),
  ev(
    "oracle",
    "ancient",
    "east_asia",
    T("c. 1200 BCE", "um 1200 v. Chr.", "ok. 1200 p.n.e."),
    T("Writing on oracle bones", "Schrift auf Orakelknochen", "Pismo na kościach wróżebnych"),
    T(
      "Kings in China scratch questions on bones to ask the future.",
      "Koenige in China ritzen Fragen in Knochen, um die Zukunft zu erfragen.",
      "Królowie w Chinach rysują pytania na kościach, by zapytać o przyszłość.",
    ),
  ),
  ev(
    "olmec",
    "ancient",
    "americas",
    T("c. 1200 BCE", "um 1200 v. Chr.", "ok. 1200 p.n.e."),
    T(
      "The Olmec carve giant stone heads",
      "Die Olmeken meisseln riesige Steinkoepfe",
      "Olmekowie rzeźbią olbrzymie kamienne głowy",
    ),
    T(
      "In Mexico, artists carve heads as tall as a person.",
      "In Mexiko meisseln Kuenstler Koepfe, die so gross sind wie ein Mensch.",
      "W Meksyku artyści rzeźbią głowy wielkie jak człowiek.",
    ),
  ),
  ev(
    "athens",
    "ancient",
    "europe",
    T("508 BCE", "508 v. Chr.", "508 p.n.e."),
    T(
      "Athens tries democracy",
      "Athen probiert die Demokratie aus",
      "Ateny wprowadzają demokrację",
    ),
    T(
      "Citizens in Athens vote on laws together.",
      "Buerger in Athen stimmen gemeinsam ueber Gesetze ab.",
      "Obywatele Aten wspólnie głosują nad prawami.",
    ),
    "democracy",
  ),
  ev(
    "archimedes",
    "ancient",
    "science",
    T("c. 250 BCE", "um 250 v. Chr.", "ok. 250 p.n.e."),
    T(
      "Archimedes explains floating",
      "Archimedes erklaert das Schwimmen",
      "Archimedes wyjaśnia pływanie",
    ),
    T(
      "A thinker in a bath works out why things float.",
      "Ein Denker in der Badewanne findet heraus, warum Dinge schwimmen.",
      "Myśliciel w wannie odkrywa, dlaczego rzeczy pływają.",
    ),
  ),
  // Middle Ages
  ev(
    "zero",
    "middle_ages",
    "india",
    T("499", "499", "499"),
    T(
      "Aryabhata and the power of zero",
      "Aryabhata und die Kraft der Null",
      "Aryabhata i potęga zera",
    ),
    T(
      "Indian mathematicians use zero as a real number.",
      "Indische Mathematiker nutzen die Null als echte Zahl.",
      "Indyjscy matematycy używają zera jak prawdziwej liczby.",
    ),
  ),
  ev(
    "charlemagne",
    "middle_ages",
    "europe",
    T("800", "800", "800"),
    T(
      "Charlemagne is crowned emperor",
      "Karl der Grosse wird Kaiser",
      "Karol Wielki zostaje cesarzem",
    ),
    T(
      "A Frankish king gets a crown in Rome.",
      "Ein fraenkischer Koenig bekommt in Rom eine Krone.",
      "Frankijski król dostaje koronę w Rzymie.",
    ),
  ),
  ev(
    "haytham",
    "middle_ages",
    "science",
    T("c. 1011", "um 1011", "ok. 1011"),
    T(
      "Ibn al-Haytham studies light",
      "Ibn al-Haytham erforscht das Licht",
      "Ibn al-Hajsam bada światło",
    ),
    T(
      "A scholar in Cairo tests how eyes see.",
      "Ein Gelehrter in Kairo testet, wie Augen sehen.",
      "Uczony w Kairze sprawdza, jak widzą oczy.",
    ),
  ),
  ev(
    "bisheng",
    "middle_ages",
    "east_asia",
    T("c. 1040", "um 1040", "ok. 1040"),
    T(
      "Bi Sheng invents movable type",
      "Bi Sheng erfindet bewegliche Lettern",
      "Bi Sheng wynajduje ruchomą czcionkę",
    ),
    T(
      "In China, clay letters can be rearranged to print pages.",
      "In China lassen sich Tonbuchstaben neu ordnen, um Seiten zu drucken.",
      "W Chinach gliniane litery można układać na nowo, by drukować strony.",
    ),
  ),
  ev(
    "mansa",
    "middle_ages",
    "mideast_africa",
    T("1324", "1324", "1324"),
    T(
      "Mansa Musa travels to Mecca",
      "Mansa Musa pilgert nach Mekka",
      "Mansa Musa pielgrzymuje do Mekki",
    ),
    T(
      "The king of Mali brings so much gold that prices in Cairo jump.",
      "Der Koenig von Mali bringt so viel Gold mit, dass in Kairo die Preise steigen.",
      "Król Mali przywozi tyle złota, że ceny w Kairze rosną.",
    ),
  ),
  ev(
    "inca",
    "middle_ages",
    "americas",
    T("1438", "1438", "1438"),
    T("The Inca Empire grows", "Das Inka-Reich waechst", "Imperium Inków rośnie"),
    T(
      "Runners carry messages along mountain roads.",
      "Laeufer tragen Nachrichten ueber Bergstrassen.",
      "Gońcy niosą wieści górskimi drogami.",
    ),
  ),
  // Trade and empires
  ev(
    "mughal",
    "trade_empires",
    "india",
    T("1526", "1526", "1526"),
    T(
      "Babur founds the Mughal Empire",
      "Babur gruendet das Mogulreich",
      "Babur zakłada imperium Mogołów",
    ),
    T(
      "A new empire grows in northern India.",
      "Im Norden Indiens waechst ein neues Reich.",
      "Na północy Indii rośnie nowe imperium.",
    ),
    "mughals",
  ),
  ev(
    "luther",
    "trade_empires",
    "europe",
    T("1517", "1517", "1517"),
    T(
      "Luther starts the Reformation",
      "Luther loest die Reformation aus",
      "Luter rozpoczyna reformację",
    ),
    T(
      "A German monk argues about church rules, and printed leaflets spread his ideas.",
      "Ein deutscher Moench streitet ueber Kirchenregeln, und gedruckte Flugblaetter verbreiten seine Ideen.",
      "Niemiecki mnich spiera się o zasady Kościoła, a drukowane ulotki roznoszą jego pomysły.",
    ),
  ),
  ev(
    "aztec",
    "trade_empires",
    "americas",
    T("1521", "1521", "1521"),
    T("The Aztec capital falls", "Die Aztekenhauptstadt faellt", "Upada stolica Azteków"),
    T(
      "Tenochtitlan, a city on a lake, is conquered by Spain and its allies.",
      "Tenochtitlan, eine Stadt im See, wird von Spanien und seinen Verbuendeten erobert.",
      "Tenochtitlan, miasto na jeziorze, zostaje podbite przez Hiszpanię i jej sojuszników.",
    ),
  ),
  ev(
    "manila",
    "trade_empires",
    "east_asia",
    T("1571", "1571", "1571"),
    T(
      "Manila galleons link Asia and the Americas",
      "Manila-Galeonen verbinden Asien und Amerika",
      "Galeony z Manili łączą Azję i Ameryki",
    ),
    T(
      "Ships carry Chinese silk across the Pacific for silver.",
      "Schiffe bringen chinesische Seide ueber den Pazifik gegen Silber.",
      "Statki wożą chiński jedwab przez Pacyfik w zamian za srebro.",
    ),
    "spicetrade",
  ),
  ev(
    "timbuktu",
    "trade_empires",
    "mideast_africa",
    T("1500s", "1500er", "XVI wiek"),
    T(
      "Timbuktu is a city of books",
      "Timbuktu wird zur Stadt der Buecher",
      "Timbuktu miastem ksiąg",
    ),
    T(
      "Traders and students meet in a desert city.",
      "Haendler und Schueler treffen sich in einer Wuestenstadt.",
      "Kupcy i uczniowie spotykają się w pustynnym mieście.",
    ),
  ),
  ev(
    "copernicus",
    "trade_empires",
    "science",
    T("1543", "1543", "1543"),
    T(
      "Copernicus puts the Sun in the middle",
      "Kopernikus stellt die Sonne in die Mitte",
      "Kopernik stawia Słońce w centrum",
    ),
    T(
      "A Polish astronomer says Earth travels around the Sun.",
      "Ein polnischer Astronom sagt, die Erde kreist um die Sonne.",
      "Polski astronom twierdzi, że Ziemia krąży wokół Słońca.",
    ),
  ),
  // Scientific revolution
  ev(
    "galileo",
    "scientific_rev",
    "science",
    T("1609", "1609", "1609"),
    T(
      "Galileo turns a telescope to the sky",
      "Galilei richtet ein Fernrohr zum Himmel",
      "Galileusz kieruje teleskop w niebo",
    ),
    T(
      "He sees moons circling Jupiter.",
      "Er sieht Monde, die um den Jupiter kreisen.",
      "Widzi księżyce krążące wokół Jowisza.",
    ),
  ),
  ev(
    "newton",
    "scientific_rev",
    "science",
    T("1687", "1687", "1687"),
    T("Newton explains gravity", "Newton erklaert die Schwerkraft", "Newton wyjaśnia grawitację"),
    T(
      "The same pull makes an apple fall and the Moon circle Earth.",
      "Dieselbe Kraft laesst einen Apfel fallen und den Mond die Erde umkreisen.",
      "Ta sama siła sprawia, że jabłko spada, a Księżyc krąży wokół Ziemi.",
    ),
  ),
  ev(
    "voc",
    "scientific_rev",
    "europe",
    T("1602", "1602", "1602"),
    T(
      "The Dutch East India Company starts",
      "Die Niederlaendische Ostindien-Kompanie entsteht",
      "Powstaje Holenderska Kompania Wschodnioindyjska",
    ),
    T(
      "People can buy shares in a trading fleet.",
      "Menschen koennen Anteile an einer Handelsflotte kaufen.",
      "Ludzie mogą kupować udziały we flocie handlowej.",
    ),
    "stocks",
  ),
  ev(
    "taj",
    "scientific_rev",
    "india",
    T("1632", "1632", "1632"),
    T(
      "Shah Jahan begins the Taj Mahal",
      "Schah Jahan beginnt den Taj Mahal",
      "Szahdżahan rozpoczyna budowę Tadż Mahal",
    ),
    T(
      "Thousands of builders make a white marble tomb.",
      "Tausende Bauleute errichten ein Grabmal aus weissem Marmor.",
      "Tysiące budowniczych wznosi grobowiec z białego marmuru.",
    ),
    "mughals",
  ),
  ev(
    "tokugawa",
    "scientific_rev",
    "east_asia",
    T("1603", "1603", "1603"),
    T(
      "Tokugawa rule begins in Japan",
      "In Japan beginnt die Tokugawa-Zeit",
      "W Japonii zaczynają się rządy Tokugawów",
    ),
    T(
      "Peace comes and cities like Edo grow big.",
      "Es herrscht Frieden und Staedte wie Edo werden gross.",
      "Nastaje pokój, a miasta takie jak Edo rosną.",
    ),
  ),
  ev(
    "usa1776",
    "scientific_rev",
    "americas",
    T("1776", "1776", "1776"),
    T(
      "The United States declares independence",
      "Die USA erklaeren ihre Unabhaengigkeit",
      "Stany Zjednoczone ogłaszają niepodległość",
    ),
    T(
      "Thirteen colonies say they will rule themselves.",
      "Dreizehn Kolonien sagen, sie regieren sich selbst.",
      "Trzynaście kolonii oświadcza, że będą rządzić się same.",
    ),
    "democracy",
  ),
  // Industrial
  ev(
    "stephenson",
    "industrial",
    "europe",
    T("1829", "1829", "1829"),
    T(
      "Steam locomotives race at Rainhill",
      "Dampflokomotiven fahren in Rainhill um die Wette",
      "Parowozy ścigają się w Rainhill",
    ),
    T(
      "Stephenson's Rocket shows trains can be fast.",
      "Stephensons Rocket zeigt, dass Zuege schnell sein koennen.",
      "Rakieta Stephensona pokazuje, że pociągi mogą być szybkie.",
    ),
    "tools",
  ),
  ev(
    "mutiny",
    "industrial",
    "india",
    T("1857", "1857", "1857"),
    T("The Rebellion of 1857", "Der Aufstand von 1857", "Powstanie 1857 roku"),
    T(
      "Soldiers and others rise up against the East India Company.",
      "Soldaten und andere erheben sich gegen die Ostindien-Kompanie.",
      "Żołnierze i inni powstają przeciw Kompanii Wschodnioindyjskiej.",
    ),
    "britishinindia",
  ),
  ev(
    "meiji",
    "industrial",
    "east_asia",
    T("1868", "1868", "1868"),
    T(
      "Meiji Japan modernises",
      "Das Meiji-Japan modernisiert sich",
      "Japonia Meiji się modernizuje",
    ),
    T(
      "Japan builds railways and schools very quickly.",
      "Japan baut sehr schnell Eisenbahnen und Schulen.",
      "Japonia bardzo szybko buduje koleje i szkoły.",
    ),
  ),
  ev(
    "suez",
    "industrial",
    "mideast_africa",
    T("1869", "1869", "1869"),
    T("The Suez Canal opens", "Der Suezkanal wird eroeffnet", "Otwarto Kanał Sueski"),
    T(
      "Ships can sail from Europe to Asia without going around Africa.",
      "Schiffe koennen von Europa nach Asien fahren, ohne Afrika zu umrunden.",
      "Statki mogą płynąć z Europy do Azji bez opływania Afryki.",
    ),
  ),
  ev(
    "rail_us",
    "industrial",
    "americas",
    T("1869", "1869", "1869"),
    T(
      "The first US transcontinental railroad",
      "Die erste Eisenbahn quer durch die USA",
      "Pierwsza kolej transkontynentalna w USA",
    ),
    T(
      "Two railways meet in Utah and join east and west.",
      "Zwei Bahnlinien treffen sich in Utah und verbinden Ost und West.",
      "Dwie linie kolejowe spotykają się w Utah i łączą wschód z zachodem.",
    ),
  ),
  ev(
    "edison",
    "industrial",
    "science",
    T("1879", "1879", "1879"),
    T(
      "Edison's long-lasting light bulb",
      "Edisons langlebige Gluehbirne",
      "Trwała żarówka Edisona",
    ),
    T(
      "A glowing bulb lights a room for hours.",
      "Eine leuchtende Birne erhellt einen Raum stundenlang.",
      "Świecąca żarówka oświetla pokój przez wiele godzin.",
    ),
  ),
  ev(
    "pasteur",
    "industrial",
    "science",
    T("1885", "1885", "1885"),
    T(
      "Pasteur's rabies vaccine",
      "Pasteurs Tollwutimpfstoff",
      "Szczepionka Pasteura na wściekliznę",
    ),
    T(
      "A doctor finds a way to protect people from a dangerous germ.",
      "Ein Arzt findet einen Weg, Menschen vor einem gefaehrlichen Keim zu schuetzen.",
      "Lekarz znajduje sposób, by chronić ludzi przed groźnym zarazkiem.",
    ),
  ),
  // 20th century
  ev(
    "wright",
    "twentieth",
    "science",
    T("1903", "1903", "1903"),
    T("The Wright brothers fly", "Die Gebrueder Wright fliegen", "Bracia Wright latają"),
    T(
      "A small plane stays in the air for twelve seconds.",
      "Ein kleines Flugzeug bleibt zwoelf Sekunden in der Luft.",
      "Mały samolot utrzymuje się w powietrzu przez dwanaście sekund.",
    ),
  ),
  ev(
    "penicillin",
    "twentieth",
    "science",
    T("1928", "1928", "1928"),
    T("Fleming finds penicillin", "Fleming entdeckt das Penicillin", "Fleming odkrywa penicylinę"),
    T(
      "Mould on a dish kills germs around it.",
      "Schimmel auf einer Schale toetet Keime in seiner Naehe.",
      "Pleśń na szalce zabija zarazki wokół siebie.",
    ),
  ),
  ev(
    "ww2",
    "twentieth",
    "europe",
    T("1939 to 1945", "1939 bis 1945", "1939 do 1945"),
    T("The Second World War", "Der Zweite Weltkrieg", "II wojna światowa"),
    T(
      "A huge war touches almost every country.",
      "Ein riesiger Krieg erfasst fast jedes Land.",
      "Ogromna wojna dotyka niemal każdego kraju.",
    ),
    "ww2",
  ),
  ev(
    "atom",
    "twentieth",
    "science",
    T("1945", "1945", "1945"),
    T("The first atomic bombs", "Die ersten Atombomben", "Pierwsze bomby atomowe"),
    T(
      "Scientists learn how to release the power inside atoms, and the world sees how dangerous it is.",
      "Forscher lernen, die Kraft in Atomen freizusetzen, und die Welt sieht, wie gefaehrlich sie ist.",
      "Naukowcy uczą się uwalniać moc atomu, a świat widzi, jak jest groźna.",
    ),
    "ww2",
  ),
  ev(
    "india1947",
    "twentieth",
    "india",
    T("1947", "1947", "1947"),
    T("India becomes independent", "Indien wird unabhaengig", "Indie stają się niepodległe"),
    T(
      "After a long struggle, India raises its own flag.",
      "Nach langem Kampf hisst Indien seine eigene Flagge.",
      "Po długiej walce Indie podnoszą własną flagę.",
    ),
    "independence",
  ),
  ev(
    "prc",
    "twentieth",
    "east_asia",
    T("1949", "1949", "1949"),
    T(
      "The People's Republic of China is founded",
      "Die Volksrepublik China wird gegruendet",
      "Powstaje Chińska Republika Ludowa",
    ),
    T(
      "A new government forms after a long civil war.",
      "Nach einem langen Buergerkrieg entsteht eine neue Regierung.",
      "Po długiej wojnie domowej powstaje nowy rząd.",
    ),
    "communism",
  ),
  ev(
    "africa1960",
    "twentieth",
    "mideast_africa",
    T("1960", "1960", "1960"),
    T("The Year of Africa", "Das Afrikajahr", "Rok Afryki"),
    T(
      "Seventeen African countries become independent in one year.",
      "Siebzehn afrikanische Laender werden in einem Jahr unabhaengig.",
      "Siedemnaście krajów afrykańskich uzyskuje niepodległość w jednym roku.",
    ),
  ),
  ev(
    "moon",
    "twentieth",
    "americas",
    T("1969", "1969", "1969"),
    T("People walk on the Moon", "Menschen betreten den Mond", "Ludzie chodzą po Księżycu"),
    T(
      "Two astronauts step out onto the Moon's dusty ground.",
      "Zwei Astronauten steigen auf den staubigen Mondboden.",
      "Dwóch astronautów schodzi na zakurzoną powierzchnię Księżyca.",
    ),
  ),
  ev(
    "wall",
    "twentieth",
    "europe",
    T("1989", "1989", "1989"),
    T("The Berlin Wall falls", "Die Berliner Mauer faellt", "Pada mur berliński"),
    T(
      "Families in Germany can cross between East and West again.",
      "Familien in Deutschland koennen wieder zwischen Ost und West wechseln.",
      "Rodziny w Niemczech znów mogą przechodzić między wschodem a zachodem.",
    ),
  ),
  ev(
    "ww1",
    "twentieth",
    "europe",
    T("1914 to 1918", "1914 bis 1918", "1914 do 1918"),
    T("The First World War", "Der Erste Weltkrieg", "I wojna światowa"),
    T(
      "Countries that had promised to help each other are pulled into a huge war.",
      "Laender, die sich Hilfe versprochen hatten, werden in einen riesigen Krieg gezogen.",
      "Kraje, które obiecały sobie pomoc, zostają wciągnięte w ogromną wojnę.",
    ),
    "ww1",
  ),
  ev(
    "gandhi1915",
    "twentieth",
    "india",
    T("1915", "1915", "1915"),
    T("Gandhi returns to India", "Gandhi kehrt nach Indien zurueck", "Gandhi wraca do Indii"),
    T(
      "A lawyer comes home from South Africa with a plan to protest peacefully.",
      "Ein Anwalt kehrt aus Suedafrika mit dem Plan zurueck, friedlich zu protestieren.",
      "Prawnik wraca z Afryki Południowej z planem pokojowego protestu.",
    ),
    "independence",
  ),
  ev(
    "revolution1917",
    "twentieth",
    "europe",
    T("1917", "1917", "1917"),
    T("The Russian Revolution", "Die Russische Revolution", "Rewolucja rosyjska"),
    T(
      "The Tsar loses his throne and a new kind of government begins.",
      "Der Zar verliert den Thron und eine neue Art von Regierung beginnt.",
      "Car traci tron i zaczyna się nowy rodzaj rządów.",
    ),
    "communism",
  ),
  ev(
    "ottoman1922",
    "twentieth",
    "mideast_africa",
    T("1922", "1922", "1922"),
    T(
      "The Ottoman sultanate ends",
      "Das osmanische Sultanat endet",
      "Koniec sułtanatu osmańskiego",
    ),
    T(
      "A very old empire is replaced by a new country, Turkey.",
      "Ein sehr altes Reich wird durch ein neues Land ersetzt, die Tuerkei.",
      "Bardzo stare imperium zostaje zastąpione nowym krajem, Turcją.",
    ),
  ),
  ev(
    "holocaust",
    "twentieth",
    "europe",
    T("1941 to 1945", "1941 bis 1945", "1941 do 1945"),
    T("The Holocaust", "Der Holocaust", "Holokaust"),
    T(
      "During the war, the Nazi government hurt and killed millions of people, especially Jewish families. We remember so it never happens again.",
      "Im Krieg verletzte und toetete die Nazi-Regierung Millionen Menschen, vor allem juedische Familien. Wir erinnern uns, damit es nie wieder geschieht.",
      "W czasie wojny rząd nazistowski krzywdził i zabijał miliony ludzi, zwłaszcza żydowskie rodziny. Pamiętamy, by to się nigdy nie powtórzyło.",
    ),
    "ww2",
  ),
  ev(
    "quitindia",
    "twentieth",
    "india",
    T("1942", "1942", "1942"),
    T("The Quit India Movement", "Die Quit-India-Bewegung", "Ruch Quit India"),
    T(
      "While Europe is at war, Gandhi asks the British to leave India.",
      "Waehrend Europa im Krieg ist, bittet Gandhi die Briten, Indien zu verlassen.",
      "Gdy Europa jest w stanie wojny, Gandhi prosi Brytyjczyków o opuszczenie Indii.",
    ),
    "independence",
  ),
  ev(
    "bengal1943",
    "twentieth",
    "india",
    T("1943", "1943", "1943"),
    T("The Bengal famine", "Die Hungersnot in Bengalen", "Głód w Bengalu"),
    T(
      "Many families in Bengal cannot get enough food during the war.",
      "Viele Familien in Bengalen bekommen waehrend des Krieges nicht genug zu essen.",
      "Wiele rodzin w Bengalu nie ma dość jedzenia w czasie wojny.",
    ),
    "britishinindia",
  ),
  ev(
    "marshall1948",
    "twentieth",
    "europe",
    T("1948", "1948", "1948"),
    T(
      "The Marshall Plan rebuilds Europe",
      "Der Marshallplan baut Europa wieder auf",
      "Plan Marshalla odbudowuje Europę",
    ),
    T(
      "America sends money, food and machines to help broken cities in Europe.",
      "Amerika schickt Geld, Essen und Maschinen, um zerstoerte Staedte in Europa zu unterstuetzen.",
      "Ameryka wysyła pieniądze, żywność i maszyny, by pomóc zniszczonym miastom Europy.",
    ),
    "rebuilding",
  ),
  // Digital
  ev(
    "web",
    "digital",
    "science",
    T("1989 to 1991", "1989 bis 1991", "1989 do 1991"),
    T(
      "The World Wide Web is invented",
      "Das World Wide Web wird erfunden",
      "Powstaje World Wide Web",
    ),
    T(
      "A scientist in Switzerland links pages together so anyone can read them.",
      "Ein Forscher in der Schweiz verknuepft Seiten, damit jeder sie lesen kann.",
      "Naukowiec w Szwajcarii łączy strony, aby każdy mógł je czytać.",
    ),
    "internet",
  ),
  ev(
    "euro",
    "digital",
    "europe",
    T("2002", "2002", "2002"),
    T(
      "Euro coins and notes arrive",
      "Euro-Muenzen und Scheine kommen",
      "Pojawiają się monety i banknoty euro",
    ),
    T(
      "Many countries start using the same money.",
      "Viele Laender nutzen auf einmal dasselbe Geld.",
      "Wiele krajów zaczyna używać tych samych pieniędzy.",
    ),
    "rates",
  ),
  ev(
    "mpesa",
    "digital",
    "mideast_africa",
    T("2007", "2007", "2007"),
    T(
      "M-Pesa sends money by phone",
      "M-Pesa verschickt Geld per Handy",
      "M-Pesa wysyła pieniądze telefonem",
    ),
    T(
      "In Kenya, people pay each other with simple phones.",
      "In Kenia bezahlen sich Menschen mit einfachen Handys.",
      "W Kenii ludzie płacą sobie prostymi telefonami.",
    ),
    "banks",
  ),
  ev(
    "iphone",
    "digital",
    "americas",
    T("2007", "2007", "2007"),
    T(
      "The smartphone era begins",
      "Das Smartphone-Zeitalter beginnt",
      "Zaczyna się era smartfonów",
    ),
    T(
      "A phone with a touch screen fits the internet in a pocket.",
      "Ein Handy mit Touchscreen steckt das Internet in die Tasche.",
      "Telefon z ekranem dotykowym mieści internet w kieszeni.",
    ),
    "computers",
  ),
  ev(
    "hsr",
    "digital",
    "east_asia",
    T("2008", "2008", "2008"),
    T(
      "China builds high speed trains",
      "China baut Hochgeschwindigkeitszuege",
      "Chiny budują koleje dużych prędkości",
    ),
    T(
      "Trains zoom between big cities faster than cars.",
      "Zuege sausen schneller als Autos zwischen grossen Staedten.",
      "Pociągi mkną między dużymi miastami szybciej niż samochody.",
    ),
  ),
  ev(
    "upi",
    "digital",
    "india",
    T("2016", "2016", "2016"),
    T(
      "India launches UPI payments",
      "Indien startet UPI-Zahlungen",
      "Indie uruchamiają płatności UPI",
    ),
    T(
      "People pay with a quick scan on their phone.",
      "Menschen zahlen mit einem schnellen Scan auf dem Handy.",
      "Ludzie płacą szybkim skanem w telefonie.",
    ),
    "money",
  ),
  ev(
    "chatgpt",
    "digital",
    "science",
    T("2022", "2022", "2022"),
    T(
      "AI chatbots reach millions",
      "KI-Chatbots erreichen Millionen",
      "Chatboty AI docierają do milionów",
    ),
    T(
      "Computers can now write and answer questions in plain words.",
      "Computer koennen jetzt in einfachen Worten schreiben und Fragen beantworten.",
      "Komputery potrafią teraz pisać i odpowiadać na pytania prostymi słowami.",
    ),
    "ai",
  ),
];

export const TIMELINE_REGIONS: TimelineRegion[] = [
  "india",
  "europe",
  "americas",
  "east_asia",
  "mideast_africa",
  "science",
];

export function eventsFor(era: TimelineEraId, region: TimelineRegion | "all"): TimelineEvent[] {
  return TIMELINE_EVENTS.filter((e) => e.era === era && (region === "all" || e.region === region));
}

/** Sort key in years. BCE is negative. "1500s" counts as 1500. */
export function eventYear(e: TimelineEvent): number {
  const n = Number(/\d+/.exec(e.year.en)?.[0] ?? "0");
  return /BCE/.test(e.year.en) ? -n : n;
}
