import type { Text } from "../lesson/types";
import { TIMELINE_EVENTS, eventYear } from "./data";
import type { TimelineEvent } from "./types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });
const W = (slug: string) => `https://en.wikipedia.org/wiki/${slug}`;

/** One reference per event, so every concurrent claim a lesson shows has a source. */
export const EVENT_SOURCES: Record<string, string> = {
  indus: W("Indus_Valley_Civilisation"),
  giza: W("Great_Pyramid_of_Giza"),
  oracle: W("Oracle_bone"),
  olmec: W("Olmecs"),
  athens: W("Athenian_democracy"),
  archimedes: W("Archimedes"),
  zero: W("Aryabhata"),
  charlemagne: W("Charlemagne"),
  haytham: W("Ibn_al-Haytham"),
  bisheng: W("Bi_Sheng"),
  mansa: W("Mansa_Musa"),
  inca: W("Inca_Empire"),
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
  curie1903: W("Marie_Curie"),
  einstein1905: W("Annus_mirabilis_papers"),
  modelt1908: W("Ford_Model_T"),
  panama1914: W("Panama_Canal"),
  insulin1921: W("Insulin"),
  tutankhamun1922: W("Tutankhamun"),
  salt1930: W("Salt_March"),
  hoover1931: W("Hoover_Dam"),
  bbc1936: W("BBC_Television"),
  dna1953: W("Molecular_structure_of_Nucleic_Acids:_A_Structure_for_Deoxyribose_Nucleic_Acid"),
  salk1955: W("Polio_vaccine"),
  bandung1955: W("Bandung_Conference"),
  sputnik1957: W("Sputnik_1"),
  washington1963: W("March_on_Washington_for_Jobs_and_Freedom"),
  shinkansen1964: W("Shinkansen"),
  aryabhata1975: W("Aryabhata_(satellite)"),
  apple1976: W("Apple_I"),
  louise1978: W("Louise_Brown"),
  walkman1979: W("Walkman"),
  smallpox1980: W("Eradication_of_smallpox"),
  chernobyl1986: W("Chernobyl_disaster"),
  ww1: "https://www.history.com/topics/world-war-i/world-war-i-history",
  gandhi1915: W("Mahatma_Gandhi"),
  revolution1917: W("Russian_Revolution"),
  ottoman1922: W("Abolition_of_the_Ottoman_sultanate"),
  ww2: "https://www.history.com/topics/world-war-ii/world-war-ii-history",
  holocaust: "https://encyclopedia.ushmm.org/content/en/article/introduction-to-the-holocaust",
  quitindia: W("Quit_India_Movement"),
  bengal1943: "https://www.environmentandsociety.org/tools/keywords/bengal-famine-1943",
  atom: W("Atomic_bombings_of_Hiroshima_and_Nagasaki"),
  marshall1948: W("Marshall_Plan"),
  india1947: "https://nam.ac.uk/explore/independence-and-partition-1947",
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
  hubble: "https://science.nasa.gov/mission/hubble/",
  liberalisation1991: W("Economic_liberalisation_in_India"),
  mandela1994: W("1994_South_African_general_election"),
  dolly: "https://www.ed.ac.uk/roslin/about/dolly",
  higgs: "https://home.cern/science/physics/higgs-boson",
  rosetta: "https://www.esa.int/Science_Exploration/Space_Science/Rosetta",
  paris2015: "https://unfccc.int/process-and-meetings/the-paris-agreement",
  covidvaccine: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/covid-19-vaccines",
  webb: "https://science.nasa.gov/mission/webb/",
  chandrayaan3: "https://www.isro.gov.in/Chandrayaan3.html",
  confucius: W("Confucius"),
  hagia: W("Hagia_Sophia"),
  borobudur: W("Borobudur"),
  wisdom: W("House_of_Wisdom"),
  petersburg: W("Saint_Petersburg"),
  linnaeus: W("Carl_Linnaeus"),
  watt: W("James_Watt"),
  volta: W("Alessandro_Volta"),
  braille: W("Braille"),
  darwin: W("Charles_Darwin"),
};

export interface Meanwhile {
  from: number;
  to: number;
  text: Text;
}

/** "Meanwhile around the world" content for the Group 5 history lessons, keyed by lesson id. */
export const MEANWHILE: Record<string, Meanwhile> = {
  mughals: {
    from: 1500,
    to: 1700,
    text: T(
      "While the Mughals built palaces and gardens in India, a Dutch company sold shares in ships and Galileo looked at moons through a telescope.",
      "Während die Moguln in Indien Paläste und Gärten bauten, verkaufte eine niederländische Firma Anteile an Schiffen und Galilei sah Monde durch ein Fernrohr.",
      "Gdy Mogołowie budowali w Indiach pałace i ogrody, holenderska firma sprzedawała udziały w statkach, a Galileusz oglądał księżyce przez teleskop.",
    ),
  },
  spicetrade: {
    from: 1500,
    to: 1650,
    text: T(
      "While ships carried spices across the seas, Spain met the Aztecs, Timbuktu filled with books and a Polish astronomer moved the Sun to the middle.",
      "Während Schiffe Gewürze über die Meere brachten, traf Spanien auf die Azteken, Timbuktu füllte sich mit Büchern und ein polnischer Astronom stellte die Sonne in die Mitte.",
      "Gdy statki wiozły przyprawy przez morza, Hiszpania spotkała Azteków, Timbuktu zapełniało się książkami, a polski astronom postawił Słońce w centrum.",
    ),
  },
  britishinindia: {
    from: 1770,
    to: 1900,
    text: T(
      "While the British ruled in India, trains started to roar in Europe, Japan built modern schools, and Edison made a bulb that glowed for hours.",
      "Während die Briten in Indien herrschten, begannen in Europa Züge zu rollen, Japan baute moderne Schulen und Edison schuf eine Glühbirne, die stundenlang leuchtete.",
      "Gdy Brytyjczycy rządzili w Indiach, w Europie ruszyły pociągi, Japonia budowała nowoczesne szkoły, a Edison stworzył żarówkę świecącą przez wiele godzin.",
    ),
  },
  independence: {
    from: 1900,
    to: 1960,
    text: T(
      "While India worked for freedom, the world saw the first airplane, two world wars, and many African countries becoming free too.",
      "Während Indien für die Freiheit arbeitete, erlebte die Welt das erste Flugzeug, zwei Weltkriege und viele afrikanische Länder, die ebenfalls frei wurden.",
      "Gdy Indie pracowały na wolność, świat zobaczył pierwszy samolot, dwie wojny światowe i wiele krajów afrykańskich, które również odzyskały wolność.",
    ),
  },
  ww1: {
    from: 1900,
    to: 1930,
    text: T(
      "While armies fought in Europe, Gandhi came home to India, Russia got a new government, and a scientist noticed mould that kills germs.",
      "Während in Europa Armeen kämpften, kehrte Gandhi nach Indien zurück, Russland bekam eine neue Regierung und ein Forscher bemerkte Schimmel, der Keime tötet.",
      "Gdy w Europie walczyły armie, Gandhi wrócił do Indii, Rosja dostała nowy rząd, a naukowiec zauważył pleśń zabijającą zarazki.",
    ),
  },
  ww2: {
    from: 1935,
    to: 1950,
    text: T(
      "While Europe was at war, India's people asked the British to leave, and when the war ended India became free and China started a new government.",
      "Während Europa im Krieg war, baten Indiens Menschen die Briten zu gehen, und nach dem Krieg wurde Indien frei und China bekam eine neue Regierung.",
      "Gdy Europa była w stanie wojny, mieszkańcy Indii prosili Brytyjczyków o odejście, a po wojnie Indie stały się wolne, a Chiny dostały nowy rząd.",
    ),
  },
  rebuilding: {
    from: 1945,
    to: 1990,
    text: T(
      "While Europe rebuilt its cities, new countries in Africa and Asia became free, people walked on the Moon, and a wall in Berlin finally came down.",
      "Während Europa seine Städte wieder aufbaute, wurden neue Länder in Afrika und Asien frei, Menschen gingen auf dem Mond und eine Mauer in Berlin fiel endlich.",
      "Gdy Europa odbudowywała miasta, nowe kraje w Afryce i Azji stawały się wolne, ludzie chodzili po Księżycu, a mur w Berlinie wreszcie runął.",
    ),
  },
  whyhistory: {
    from: 1950,
    to: 2022,
    text: T(
      "History is many stories at once. Right now people are paying by phone in India and Kenya, riding fast trains in China, and talking to computers.",
      "Geschichte sind viele Geschichten gleichzeitig. Heute bezahlen Menschen in Indien und Kenia per Handy, fahren in China mit Schnellzügen und sprechen mit Computern.",
      "Historia to wiele opowieści naraz. Dziś ludzie płacą telefonem w Indiach i Kenii, jeżdżą szybkimi pociągami w Chinach i rozmawiają z komputerami.",
    ),
  },
};

export function getMeanwhile(lessonId: string): Meanwhile | undefined {
  return MEANWHILE[lessonId];
}

export function meanwhileEvents(m: Meanwhile): TimelineEvent[] {
  return TIMELINE_EVENTS.filter((e) => eventYear(e) >= m.from && eventYear(e) <= m.to).sort(
    (a, b) => eventYear(a) - eventYear(b),
  );
}

/** Latest event per track on or before `year`, within the window. */
export function snapshotAt(m: Meanwhile, year: number): TimelineEvent[] {
  const latest = new Map<string, TimelineEvent>();
  for (const e of meanwhileEvents(m)) if (eventYear(e) <= year) latest.set(e.region, e);
  return Array.from(latest.values());
}
