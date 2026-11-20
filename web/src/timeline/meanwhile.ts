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
  text: Text;
}

/** "Meanwhile around the world" content for the Group 5 history lessons, keyed by lesson id. */
export const MEANWHILE: Record<string, Meanwhile> = {
  mughals: {
    from: 1500,
    to: 1700,
    text: T(
      "While the Mughals built palaces and gardens in India, a Dutch company sold shares in ships and Galileo looked at moons through a telescope.",
      "Waehrend die Moguln in Indien Palaeste und Gaerten bauten, verkaufte eine niederlaendische Firma Anteile an Schiffen und Galilei sah Monde durch ein Fernrohr.",
      "Gdy Mogołowie budowali w Indiach pałace i ogrody, holenderska firma sprzedawała udziały w statkach, a Galileusz oglądał księżyce przez teleskop.",
    ),
  },
  spicetrade: {
    from: 1500,
    to: 1650,
    text: T(
      "While ships carried spices across the seas, Spain met the Aztecs, Timbuktu filled with books and a Polish astronomer moved the Sun to the middle.",
      "Waehrend Schiffe Gewuerze ueber die Meere brachten, traf Spanien auf die Azteken, Timbuktu fuellte sich mit Buechern und ein polnischer Astronom stellte die Sonne in die Mitte.",
      "Gdy statki wiozły przyprawy przez morza, Hiszpania spotkała Azteków, Timbuktu zapełniało się książkami, a polski astronom postawił Słońce w centrum.",
    ),
  },
  britishinindia: {
    from: 1770,
    to: 1900,
    text: T(
      "While the British ruled in India, trains started to roar in Europe, Japan built modern schools, and Edison made a bulb that glowed for hours.",
      "Waehrend die Briten in Indien herrschten, begannen in Europa Zuege zu rollen, Japan baute moderne Schulen und Edison schuf eine Gluehbirne, die stundenlang leuchtete.",
      "Gdy Brytyjczycy rządzili w Indiach, w Europie ruszyły pociągi, Japonia budowała nowoczesne szkoły, a Edison stworzył żarówkę świecącą przez wiele godzin.",
    ),
  },
  independence: {
    from: 1900,
    to: 1960,
    text: T(
      "While India worked for freedom, the world saw the first airplane, two world wars, and many African countries becoming free too.",
      "Waehrend Indien fuer die Freiheit arbeitete, erlebte die Welt das erste Flugzeug, zwei Weltkriege und viele afrikanische Laender, die ebenfalls frei wurden.",
      "Gdy Indie pracowały na wolność, świat zobaczył pierwszy samolot, dwie wojny światowe i wiele krajów afrykańskich, które również odzyskały wolność.",
    ),
  },
  ww1: {
    from: 1900,
    to: 1930,
    text: T(
      "While armies fought in Europe, Gandhi came home to India, Russia got a new government, and a scientist noticed mould that kills germs.",
      "Waehrend in Europa Armeen kaempften, kehrte Gandhi nach Indien zurueck, Russland bekam eine neue Regierung und ein Forscher bemerkte Schimmel, der Keime toetet.",
      "Gdy w Europie walczyły armie, Gandhi wrócił do Indii, Rosja dostała nowy rząd, a naukowiec zauważył pleśń zabijającą zarazki.",
    ),
  },
  ww2: {
    from: 1935,
    to: 1950,
    text: T(
      "While Europe was at war, India's people asked the British to leave, and when the war ended India became free and China started a new government.",
      "Waehrend Europa im Krieg war, baten Indiens Menschen die Briten zu gehen, und nach dem Krieg wurde Indien frei und China bekam eine neue Regierung.",
      "Gdy Europa była w stanie wojny, mieszkańcy Indii prosili Brytyjczyków o odejście, a po wojnie Indie stały się wolne, a Chiny dostały nowy rząd.",
    ),
  },
  rebuilding: {
    from: 1945,
    to: 1990,
    text: T(
      "While Europe rebuilt its cities, new countries in Africa and Asia became free, people walked on the Moon, and a wall in Berlin finally came down.",
      "Waehrend Europa seine Staedte wieder aufbaute, wurden neue Laender in Afrika und Asien frei, Menschen gingen auf dem Mond und eine Mauer in Berlin fiel endlich.",
      "Gdy Europa odbudowywała miasta, nowe kraje w Afryce i Azji stawały się wolne, ludzie chodzili po Księżycu, a mur w Berlinie wreszcie runął.",
    ),
  },
  whyhistory: {
    from: 1950,
    to: 2022,
    text: T(
      "History is many stories at once. Right now people are paying by phone in India and Kenya, riding fast trains in China, and talking to computers.",
      "Geschichte sind viele Geschichten gleichzeitig. Heute bezahlen Menschen in Indien und Kenia per Handy, fahren in China mit Schnellzuegen und sprechen mit Computern.",
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
