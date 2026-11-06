import type { Text } from "../lesson/types";
import { TIMELINE_EVENTS, eventYear } from "./data";
import type { TimelineEvent } from "./types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });
const W = (slug: string) => `https://en.wikipedia.org/wiki/${slug}`;

/** One reference per event, so every concurrent claim a lesson shows has a source. */
export const EVENT_SOURCES: Record<string, string> = {
  copernicus: W("Nicolaus_Copernicus"),
  luther: W("Martin_Luther"),
  aztec: W("Fall_of_Tenochtitlan"),
  manila: W("Manila_galleon"),
  timbuktu: W("Timbuktu"),
  mughal: W("Mughal_Empire"),
  galileo: W("Galileo_Galilei"),
  newton: W("Isaac_Newton"),
  voc: W("Dutch_East_India_Company"),
  taj: W("Taj_Mahal"),
  tokugawa: W("Tokugawa_shogunate"),
  usa1776: W("United_States_Declaration_of_Independence"),
  stephenson: W("Stephenson%27s_Rocket"),
  mutiny: W("Indian_Rebellion_of_1857"),
  meiji: W("Meiji_Restoration"),
  suez: W("Suez_Canal"),
  rail_us: W("First_transcontinental_railroad"),
  edison: W("Thomas_Edison"),
  pasteur: W("Louis_Pasteur"),
  wright: W("Wright_brothers"),
  penicillin: W("Alexander_Fleming"),
  ww1: W("World_War_I"),
  gandhi1915: W("Mahatma_Gandhi"),
  revolution1917: W("Russian_Revolution"),
  ottoman1922: W("Abolition_of_the_Ottoman_sultanate"),
  ww2: W("World_War_II"),
  holocaust: W("Holocaust"),
  quitindia: W("Quit_India_Movement"),
  bengal1943: W("Bengal_famine_of_1943"),
  atom: W("Atomic_bombings_of_Hiroshima_and_Nagasaki"),
  marshall1948: W("Marshall_Plan"),
  india1947: W("Partition_of_India"),
  prc: W("People%27s_Republic_of_China"),
  africa1960: W("Year_of_Africa"),
  moon: W("Apollo_11"),
  wall: W("Berlin_Wall"),
  web: W("World_Wide_Web"),
  euro: W("Euro"),
  mpesa: W("M-Pesa"),
  iphone: W("IPhone"),
  hsr: W("High-speed_rail_in_China"),
  upi: W("Unified_Payments_Interface"),
  chatgpt: W("ChatGPT"),
};

export interface Meanwhile {
  from: number;
  to: number;
  junior: Text;
  senior: Text;
}

/** "Meanwhile around the world" content for the Group 5 history lessons, keyed by lesson id. */
export const MEANWHILE: Record<string, Meanwhile> = {
  mughals: {
    from: 1500,
    to: 1700,
    junior: T("While the Mughals built palaces and gardens in India, a Dutch company sold shares in ships and Galileo looked at moons through a telescope.", "Waehrend die Moguln in Indien Palaeste und Gaerten bauten, verkaufte eine niederlaendische Firma Anteile an Schiffen und Galilei sah Monde durch ein Fernrohr.", "Gdy Mogołowie budowali w Indiach pałace i ogrody, holenderska firma sprzedawała udziały w statkach, a Galileusz oglądał księżyce przez teleskop."),
    senior: T("The Mughal golden age ran alongside the Reformation in Europe, Spain's conquest of the Aztecs, the first joint-stock trading companies and Galileo's telescope.", "Das goldene Zeitalter der Moguln lief parallel zur Reformation in Europa, Spaniens Eroberung der Azteken, den ersten Aktiengesellschaften im Handel und Galileis Fernrohr.", "Złoty wiek Mogołów trwał równolegle do reformacji w Europie, hiszpańskiego podboju Azteków, pierwszych spółek akcyjnych w handlu i teleskopu Galileusza."),
  },
  spicetrade: {
    from: 1500,
    to: 1650,
    junior: T("While ships carried spices across the seas, Spain met the Aztecs, Timbuktu filled with books and a Polish astronomer moved the Sun to the middle.", "Waehrend Schiffe Gewuerze ueber die Meere brachten, traf Spanien auf die Azteken, Timbuktu fuellte sich mit Buechern und ein polnischer Astronom stellte die Sonne in die Mitte.", "Gdy statki wiozły przyprawy przez morza, Hiszpania spotkała Azteków, Timbuktu zapełniało się książkami, a polski astronom postawił Słońce w centrum."),
    senior: T("The spice routes were part of a wider global exchange: American silver crossing the Pacific via Manila, the Reformation spreading through print and Copernicus reordering the heavens.", "Die Gewuerzrouten waren Teil eines groesseren weltweiten Austauschs: amerikanisches Silber ueber Manila, die Reformation durch den Buchdruck und Kopernikus, der den Himmel neu ordnete.", "Szlaki przypraw były częścią szerszej globalnej wymiany: amerykańskie srebro płynące przez Manilę, reformacja szerząca się dzięki drukowi i Kopernik porządkujący niebo na nowo."),
  },
  britishinindia: {
    from: 1770,
    to: 1900,
    junior: T("While the British ruled in India, trains started to roar in Europe, Japan built modern schools, and Edison made a bulb that glowed for hours.", "Waehrend die Briten in Indien herrschten, begannen in Europa Zuege zu rollen, Japan baute moderne Schulen und Edison schuf eine Gluehbirne, die stundenlang leuchtete.", "Gdy Brytyjczycy rządzili w Indiach, w Europie ruszyły pociągi, Japonia budowała nowoczesne szkoły, a Edison stworzył żarówkę świecącą przez wiele godzin."),
    senior: T("British rule in India overlapped with American independence, the railway age, the opening of the Suez Canal, Japan's Meiji modernisation and the rise of germ theory.", "Die britische Herrschaft in Indien fiel zusammen mit der amerikanischen Unabhaengigkeit, dem Eisenbahnzeitalter, der Eroeffnung des Suezkanals, Japans Meiji-Modernisierung und der Keimtheorie.", "Rządy brytyjskie w Indiach zbiegły się z niepodległością USA, erą kolei, otwarciem Kanału Sueskiego, modernizacją Japonii Meiji i teorią zarazków."),
  },
  independence: {
    from: 1900,
    to: 1960,
    junior: T("While India worked for freedom, the world saw the first airplane, two world wars, and many African countries becoming free too.", "Waehrend Indien fuer die Freiheit arbeitete, erlebte die Welt das erste Flugzeug, zwei Weltkriege und viele afrikanische Laender, die ebenfalls frei wurden.", "Gdy Indie pracowały na wolność, świat zobaczył pierwszy samolot, dwie wojny światowe i wiele krajów afrykańskich, które również odzyskały wolność."),
    senior: T("India's freedom struggle ran through the same decades as two world wars, the Russian Revolution, the end of the Ottoman sultanate, the Bengal famine and the wave of African independence in 1960.", "Indiens Freiheitskampf lief durch dieselben Jahrzehnte wie zwei Weltkriege, die Russische Revolution, das Ende des osmanischen Sultanats, die Hungersnot in Bengalen und die afrikanische Unabhaengigkeitswelle 1960.", "Walka Indii o wolność toczyła się w tych samych dekadach co dwie wojny światowe, rewolucja rosyjska, koniec sułtanatu osmańskiego, głód w Bengalu i fala afrykańskich niepodległości w 1960 roku."),
  },
  ww1: {
    from: 1900,
    to: 1930,
    junior: T("While armies fought in Europe, Gandhi came home to India, Russia got a new government, and a scientist noticed mould that kills germs.", "Waehrend in Europa Armeen kaempften, kehrte Gandhi nach Indien zurueck, Russland bekam eine neue Regierung und ein Forscher bemerkte Schimmel, der Keime toetet.", "Gdy w Europie walczyły armie, Gandhi wrócił do Indii, Rosja dostała nowy rząd, a naukowiec zauważył pleśń zabijającą zarazki."),
    senior: T("The same years saw the first powered flight, the Russian Revolution, the fall of the Ottoman sultanate, Gandhi's return to India and Fleming's discovery of penicillin.", "In denselben Jahren gab es den ersten Motorflug, die Russische Revolution, das Ende des osmanischen Sultanats, Gandhis Rueckkehr nach Indien und Flemings Entdeckung des Penicillins.", "W tych samych latach miały miejsce pierwszy lot z napędem, rewolucja rosyjska, koniec sułtanatu osmańskiego, powrót Gandhiego do Indii i odkrycie penicyliny przez Fleminga."),
  },
  ww2: {
    from: 1935,
    to: 1950,
    junior: T("While Europe was at war, India's people asked the British to leave, and when the war ended India became free and China started a new government.", "Waehrend Europa im Krieg war, baten Indiens Menschen die Briten zu gehen, und nach dem Krieg wurde Indien frei und China bekam eine neue Regierung.", "Gdy Europa była w stanie wojny, mieszkańcy Indii prosili Brytyjczyków o odejście, a po wojnie Indie stały się wolne, a Chiny dostały nowy rząd."),
    senior: T("Alongside European mobilisation and the Holocaust, India saw the Quit India Movement, Bose's search for allies and the Bengal famine, then Partition in 1947, while the atom bomb and the Marshall Plan remade the postwar world.", "Neben Mobilmachung und Holocaust in Europa erlebte Indien die Quit-India-Bewegung, Boses Suche nach Verbuendeten und die Hungersnot in Bengalen, dann 1947 die Teilung, waehrend Atombombe und Marshallplan die Nachkriegswelt formten.", "Obok europejskiej mobilizacji i Holokaustu Indie przeżyły ruch Quit India, poszukiwania sojuszników przez Bosego i głód w Bengalu, a potem podział w 1947 roku, podczas gdy bomba atomowa i plan Marshalla ukształtowały powojenny świat."),
  },
  rebuilding: {
    from: 1945,
    to: 1990,
    junior: T("While Europe rebuilt its cities, new countries in Africa and Asia became free, people walked on the Moon, and a wall in Berlin finally came down.", "Waehrend Europa seine Staedte wieder aufbaute, wurden neue Laender in Afrika und Asien frei, Menschen gingen auf dem Mond und eine Mauer in Berlin fiel endlich.", "Gdy Europa odbudowywała miasta, nowe kraje w Afryce i Azji stawały się wolne, ludzie chodzili po Księżycu, a mur w Berlinie wreszcie runął."),
    senior: T("Postwar reconstruction in Europe ran alongside Indian independence, the founding of the People's Republic of China, African decolonisation, the space race and the fall of the Berlin Wall.", "Der Wiederaufbau in Europa lief parallel zu Indiens Unabhaengigkeit, der Gruendung der Volksrepublik China, der Dekolonisierung Afrikas, dem Wettlauf ins All und dem Fall der Berliner Mauer.", "Powojenna odbudowa Europy toczyła się równolegle z niepodległością Indii, powstaniem Chińskiej Republiki Ludowej, dekolonizacją Afryki, wyścigiem kosmicznym i upadkiem muru berlińskiego."),
  },
  whyhistory: {
    from: 1950,
    to: 2022,
    junior: T("History is many stories at once. Right now people are paying by phone in India and Kenya, riding fast trains in China, and talking to computers.", "Geschichte sind viele Geschichten gleichzeitig. Heute bezahlen Menschen in Indien und Kenia per Handy, fahren in China mit Schnellzuegen und sprechen mit Computern.", "Historia to wiele opowieści naraz. Dziś ludzie płacą telefonem w Indiach i Kenii, jeżdżą szybkimi pociągami w Chinach i rozmawiają z komputerami."),
    senior: T("Looking back shows many threads running at once: decolonisation, the space race, the end of the Cold War, the web, mobile money, high speed rail and AI all belong to one connected story.", "Der Rueckblick zeigt viele gleichzeitige Faeden: Dekolonisierung, Wettlauf ins All, Ende des Kalten Krieges, Web, mobiles Geld, Hochgeschwindigkeitszuege und KI gehoeren zu einer zusammenhaengenden Geschichte.", "Spojrzenie wstecz pokazuje wiele równoległych wątków: dekolonizacja, wyścig kosmiczny, koniec zimnej wojny, sieć, mobilne pieniądze, szybkie koleje i AI należą do jednej powiązanej historii."),
  },
};

export function getMeanwhile(lessonId: string): Meanwhile | undefined {
  return MEANWHILE[lessonId];
}

export function meanwhileEvents(m: Meanwhile): TimelineEvent[] {
  return TIMELINE_EVENTS.filter((e) => eventYear(e) >= m.from && eventYear(e) <= m.to).sort((a, b) => eventYear(a) - eventYear(b));
}

/** Latest event per track on or before `year`, within the window. */
export function snapshotAt(m: Meanwhile, year: number): TimelineEvent[] {
  const latest = new Map<string, TimelineEvent>();
  for (const e of meanwhileEvents(m)) if (eventYear(e) <= year) latest.set(e.region, e);
  return Array.from(latest.values());
}
