import { useEffect, useState } from "react";
import { CAST } from "../components/cast";
import { InlineIcon, Person } from "../components/icons";
import { CheckButton, Slider, Stage, ToyButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import type { Lang } from "../progress";
import {
  BusyTownDiagram,
  CentralBankDiagram,
  FamilyDiagram,
  KeyRateDiagram,
  LowerDiagram,
  RaiseDiagram,
  SlowDiagram,
} from "./rates.diagrams";
import { BankBuilding, Dial, Thermometer, TownScene, ZONE_COLOR } from "./rates.icons";
import "./rates.css";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

/* ---------- Town thermostat model (kept simple on purpose) ---------- */

export interface Sim {
  /** The key rate the child has set, in percent. */
  rate: number;
  /** The rate people in town actually feel. It follows `rate` slowly. */
  felt: number;
  /** How hot the town is, 0 to 100. 40 to 60 is "just right". */
  heat: number;
}

export type Zone = "hot" | "right" | "cold";

export const START_SIM: Sim = { rate: 1, felt: 1, heat: 85 };
/** At this felt rate the town settles at 50, which is just right. */
const NEUTRAL_RATE = 3;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** One tick of time. Rates reach people slowly, and the town reacts slowly to rates. */
export function stepSim(s: Sim): Sim {
  const felt = s.felt + (s.rate - s.felt) * 0.2;
  const target = clamp(50 - 12 * (felt - NEUTRAL_RATE), 0, 100);
  const heat = s.heat + (target - s.heat) * 0.1;
  return { ...s, felt, heat };
}

export function zoneOf(heat: number): Zone {
  if (heat > 60) return "hot";
  if (heat < 40) return "cold";
  return "right";
}

/** Jobs stay plentiful while the town is warm and drop when it gets cold. */
export function jobsOf(heat: number): number {
  return clamp(90 - Math.max(0, 45 - heat) * 2, 0, 100);
}

const TICK_MS = 400;

function useSim() {
  const [sim, setSim] = useState<Sim>(START_SIM);
  useEffect(() => {
    const id = window.setInterval(() => setSim((s) => stepSim(s)), TICK_MS);
    return () => window.clearInterval(id);
  }, []);
  return [sim, setSim] as const;
}

const OTTO_SAYS: Record<Zone, Text> = {
  hot: T(
    "Otto reads the gauge: prices are rising fast. Too hot!",
    "Otto liest die Anzeige: Die Preise steigen schnell. Zu heiß!",
    "Otto odczytuje wskaźnik: ceny szybko rosną. Za gorąco!",
  ),
  right: T(
    "Otto reads the gauge: prices and jobs look fine. Just right!",
    "Otto liest die Anzeige: Preise und Arbeit sehen gut aus. Genau richtig!",
    "Otto odczytuje wskaźnik: ceny i praca wyglądają dobrze. W sam raz!",
  ),
  cold: T(
    "Otto reads the gauge: prices barely rise and jobs are going. Too cold!",
    "Otto liest die Anzeige: Die Preise steigen kaum und Arbeit geht verloren. Zu kalt!",
    "Otto odczytuje wskaźnik: ceny prawie nie rosną, a ubywa pracy. Za zimno!",
  ),
};

const TOWN_LABEL: Record<Zone, Text> = {
  hot: T("The town is too hot.", "Die Stadt ist zu heiß.", "Miasto jest zbyt rozgrzane."),
  right: T("The town is just right.", "Die Stadt ist genau richtig.", "W mieście jest w sam raz."),
  cold: T("The town is too cold.", "Die Stadt ist zu kalt.", "Miasto jest zbyt zimne."),
};

const fmt = (n: number, lang: Lang) => {
  const s = n.toFixed(1);
  return lang === "en" ? `${s}%` : `${s.replace(".", ",")} %`;
};

function Thermostat({ lang, sim, setSim }: { lang: Lang; sim: Sim; setSim: (s: Sim) => void }) {
  const zone = zoneOf(sim.heat);
  const jobs = jobsOf(sim.heat);
  const catchingUp = Math.abs(sim.rate - sim.felt) > 0.3;

  const stageLabel =
    lang === "pl" ? "Termostat miasta" : lang === "de" ? "Stadt-Thermostat" : "Town thermostat";
  const rateLabel =
    lang === "pl" ? "Główna stopa w %" : lang === "de" ? "Leitzins in %" : "Key rate in %";
  const rateLeft =
    lang === "pl" ? "tanie kredyty" : lang === "de" ? "Kredite billig" : "loans cheap";
  const rateRight =
    lang === "pl" ? "drogie kredyty" : lang === "de" ? "Kredite teuer" : "loans costly";
  const ratesFeltLabel =
    lang === "pl"
      ? "Stopy, które ludzie w mieście teraz odczuwają"
      : lang === "de"
        ? "Zinsen, die die Leute jetzt spüren"
        : "Rates people in town feel now";
  const catchingUpText =
    lang === "pl"
      ? "Stopy dopiero powoli docierają..."
      : lang === "de"
        ? "Die Zinsen kommen erst langsam an..."
        : "Rates are still catching up...";
  const startAgainText = lang === "pl" ? "Od nowa" : lang === "de" ? "Von vorn" : "Start again";
  const pricesRisingLabel =
    lang === "pl" ? "Wzrost cen" : lang === "de" ? "Preise steigen" : "Prices rising";
  const slowlyLabel = lang === "pl" ? "wolno" : lang === "de" ? "langsam" : "slowly";
  const justRightLabel =
    lang === "pl" ? "w sam raz" : lang === "de" ? "genau richtig" : "just right";
  const fastLabel = lang === "pl" ? "szybko" : lang === "de" ? "schnell" : "fast";
  const jobsLabel = lang === "pl" ? "Miejsca pracy" : lang === "de" ? "Arbeit" : "Jobs";
  const fewJobsLabel = lang === "pl" ? "mało pracy" : lang === "de" ? "wenig Arbeit" : "few jobs";
  const plentyJobsLabel =
    lang === "pl" ? "dużo pracy" : lang === "de" ? "viel Arbeit" : "plenty of jobs";

  const ariaTown = TOWN_LABEL[zone][lang] || TOWN_LABEL[zone].en;

  return (
    <Stage label={stageLabel}>
      <div className="thermo">
        <svg className="thermo-town" viewBox="0 0 640 176" role="img" aria-label={ariaTown}>
          <Dial x={6} y={14} size={170} value={sim.rate} ghost={sim.felt} />
          <TownScene zone={zone} people scale={1.2} x={236} y={4} />
        </svg>
        <div className="thermo-controls">
          <Slider
            label={rateLabel}
            value={sim.rate}
            min={0}
            max={8}
            step={1}
            onChange={(v) => setSim({ ...sim, rate: v })}
            left={rateLeft}
            right={rateRight}
          />
          <p className="thermo-rates">
            <InlineIcon size={26}>
              <BankBuilding />
            </InlineIcon>
            <span>
              {ratesFeltLabel}: <strong>{fmt(sim.felt, lang)}</strong>
            </span>
          </p>
          <p className="thermo-wait" role="status">
            {catchingUp ? catchingUpText : ""}
          </p>
          <ToyButton onClick={() => setSim(START_SIM)}>
            <span className="sr-only">{startAgainText}</span>
            <span aria-hidden="true">↺</span>
          </ToyButton>
        </div>
        <div className="thermo-gauges">
          <div>
            <div className="gauge-name">
              <InlineIcon size={30}>
                <Thermometer level={sim.heat / 100} color={ZONE_COLOR[zone]} />
              </InlineIcon>
              <span>{pricesRisingLabel}</span>
            </div>
            <div
              className="gauge-track"
              role="meter"
              aria-label={pricesRisingLabel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sim.heat)}
            >
              <div className="gauge-band" />
              <div className={`gauge-fill ${zone}`} style={{ width: `${sim.heat}%` }} />
            </div>
            <div className="gauge-ends">
              <span>{slowlyLabel}</span>
              <span>{justRightLabel}</span>
              <span>{fastLabel}</span>
            </div>
          </div>
          <div>
            <div className="gauge-name">
              <InlineIcon size={26}>
                <Person hat="hardhat" shirt={CAST.Pip.shirt} />
              </InlineIcon>
              <span>{jobsLabel}</span>
            </div>
            <div
              className="gauge-track"
              role="meter"
              aria-label={jobsLabel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(jobs)}
            >
              <div className="gauge-fill jobs" style={{ width: `${jobs}%` }} />
            </div>
            <div className="gauge-ends">
              <span>{fewJobsLabel}</span>
              <span>{plentyJobsLabel}</span>
            </div>
          </div>
          <p className="thermo-otto" role="status">
            {OTTO_SAYS[zone][lang] || OTTO_SAYS[zone].en}
          </p>
        </div>
      </div>
    </Stage>
  );
}

function Toy({ lang, onDone }: ToyProps) {
  const [sim, setSim] = useSim();
  return (
    <Thermostat
      lang={lang}
      sim={sim}
      setSim={(next) => {
        setSim(next);
        onDone?.();
      }}
    />
  );
}

/** Start with a hot town. The child sets the rate, waits, and presses Check when the town is just right. */
function CoolDownWidget({ lang, onAnswer }: WidgetProps) {
  const [sim, setSim] = useSim();
  return (
    <>
      <Thermostat lang={lang} sim={sim} setSim={setSim} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(zoneOf(sim.heat) === "right")} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "rates",
  story: [
    animatedBeat(
      [
        T(
          "Ripple Town is very busy this week.",
          "In Ripple Town ist diese Woche richtig viel los.",
          "W Ripple Town jest w tym tygodniu bardzo tłoczno.",
        ),
        T(
          "Everybody is out shopping, and everybody wants to buy a lot.",
          "Alle sind zum Einkaufen unterwegs, und alle wollen ganz viel kaufen.",
          "Wszyscy robią zakupy i każdy chce kupić mnóstwo rzeczy.",
        ),
        T(
          "Bread costs more than last week, and shoes cost more too.",
          "Das Brot kostet mehr als letzte Woche, und die Schuhe kosten auch mehr.",
          "Chleb kosztuje więcej niż w zeszłym tygodniu i buty także zdrożały.",
        ),
        T(
          "Prices are going up fast. You know that from inflation. We say the town is too hot!",
          "Die Preise steigen schnell. Das kennst du von der Inflation. Wir sagen: Die Stadt ist zu heiß!",
          "Ceny szybko rosną. Pamiętasz to z lekcji o inflacji. Mówimy, że miasto jest zbyt rozgrzane!",
        ),
      ],
      BusyTownDiagram,
    ),
    animatedBeat(
      [
        T(
          "Do you remember banks? People bring their coins to a bank.",
          "Erinnerst du dich an Banken? Die Leute bringen ihre Münzen zu einer Bank.",
          "Pamiętasz banki? Ludzie przynoszą do nich swoje monety.",
        ),
        T(
          "And guess what: banks have a bank of their own, too!",
          "Und stell dir vor: Auch die Banken haben eine eigene Bank!",
          "I wyobraź sobie: banki też mają swój własny bank!",
        ),
        T(
          "It is the bank for the banks. It is called the *central bank*.",
          "Das ist die Bank für die Banken. Sie heißt *Zentralbank*.",
          "To jest bank dla banków. Nazywa się *bank centralny*.",
        ),
        T(
          "The central bank also looks after the money of the whole country, even the printing of the notes.",
          "Die Zentralbank kümmert sich auch um das Geld des ganzen Landes, sogar um das Drucken der Scheine.",
          "Bank centralny dba również o pieniądze w całym kraju, a nawet o drukowanie banknotów.",
        ),
      ],
      CentralBankDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "The central bank decides on one special interest rate for the whole country.",
          "Die Zentralbank legt einen besonderen Zinssatz für das ganze Land fest.",
          "Bank centralny decyduje o jednej wyjątkowej stopie procentowej dla całego kraju.",
        ),
        T(
          "You know interest rates from before. This special one is called the *key rate*.",
          "Zinsen kennst du schon. Dieser besondere heißt *Leitzins*.",
          "Znasz już odsetki. Ta wyjątkowa stopa to *główna stopa procentowa* (stopa referencyjna).",
        ),
        T(
          "All the other banks watch the key rate closely.",
          "Alle anderen Banken schauen genau auf den Leitzins.",
          "Wszystkie inne banki uważnie obserwują tę stopę.",
        ),
        T(
          "When the key rate moves, the interest rates for loans and for saving usually move the same way.",
          "Wenn sich der Leitzins bewegt, ziehen die Zinsen für Kredite und fürs Sparen meistens mit.",
          "Gdy główna stopa się zmienia, oprocentowanie kredytów i oszczędności zazwyczaj podąża w tę samą stronę.",
        ),
      ],
      KeyRateDiagram,
    ),
    animatedBeat(
      [
        T(
          "Remember the hot town? The central bank can cool it down.",
          "Weißt du noch, die heiße Stadt? Die Zentralbank kann sie abkühlen.",
          "Pamiętasz rozgrzane miasto? Bank centralny może je ostudzić.",
        ),
        T(
          "To do that, it raises the key rate.",
          "Dafür erhöht sie den Leitzins.",
          "Aby to zrobić, podnosi stopę procentową.",
        ),
        T(
          "Now loans cost more, so people borrow less and buy less.",
          "Jetzt kosten Kredite mehr. Darum leihen sich die Leute weniger Geld und kaufen weniger.",
          "Teraz kredyty kosztują więcej, więc ludzie pożyczają mniej i mniej kupują.",
        ),
        T(
          "Saving pays more now, too. The bank gives more interest for coins you leave there.",
          "Sparen bringt jetzt auch mehr. Die Bank gibt mehr Zinsen für Münzen, die du dort lässt.",
          "Oszczędzanie przynosi teraz więcej. Bank daje wyższe odsetki za monety, które w nim trzymasz.",
        ),
        T(
          "When people buy less, prices calm down. The town cools off and is just right again.",
          "Wenn weniger gekauft wird, beruhigen sich die Preise. Die Stadt kühlt ab und ist wieder genau richtig.",
          "Kiedy ludzie mniej kupują, ceny się uspokajają. Miasto stygnie i znów jest w sam raz.",
        ),
      ],
      RaiseDiagram,
    ),
    animatedBeat(
      [
        T(
          "Sometimes it is the other way round, and the town is too cold.",
          "Manchmal ist es umgekehrt, und die Stadt ist zu kalt.",
          "Czasami bywa odwrotnie i w mieście jest zbyt chłodno.",
        ),
        T(
          "The shops are empty and people lose their jobs.",
          "Die Läden sind leer, und Leute verlieren ihre Arbeit.",
          "Sklepy stoją puste, a ludzie tracą pracę.",
        ),
        T(
          "Then the central bank lowers the key rate.",
          "Dann senkt die Zentralbank den Leitzins.",
          "Wtedy bank centralny obniża stopę procentową.",
        ),
        T(
          "Loans get cheaper, so people build and buy again, and there is more work.",
          "Kredite werden billiger. Darum bauen und kaufen die Leute wieder, und es gibt mehr Arbeit.",
          "Kredyty stają się tańsze, więc ludzie znowu budują, kupują i przybywa miejsc pracy.",
        ),
      ],
      LowerDiagram,
    ),
    animatedBeat(
      [
        T(
          "But there is a catch: the key rate works slowly.",
          "Aber es gibt einen Haken: Der Leitzins wirkt nur langsam.",
          "Jest jednak pewien haczyk: stopy procentowe działają powoli.",
        ),
        T(
          "After the central bank turns the dial, it can take many months until people in town feel it.",
          "Wenn die Zentralbank am Regler dreht, kann es viele Monate dauern, bis die Leute in der Stadt es spüren.",
          "Gdy bank centralny przestawia wskaźnik, może minąć wiele miesięcy, zanim mieszkańcy to odczują.",
        ),
        T(
          "It is like a thermostat in a big house. After you turn it up, the house needs time to warm up.",
          "Das ist wie bei einem Thermostat in einem großen Haus. Wenn du aufdrehst, braucht es Zeit, bis es warm wird.",
          "To działa jak termostat w dużym domu. Po podkręceniu ogrzewania dom potrzebuje czasu, aby się nagrzać.",
        ),
        T(
          "The central bank never gets it exactly right. Sometimes the town ends up a bit too warm.",
          "Ganz genau trifft die Zentralbank es nie. Manchmal wird die Stadt etwas zu warm.",
          "Bank centralny rzadko trafia idealnie w punkt. Czasem miasto staje się odrobinę za ciepłe.",
        ),
        T(
          "And sometimes it ends up a bit too cool.",
          "Und manchmal wird sie etwas zu kühl.",
          "A czasami robi się nieco za chłodne.",
        ),
      ],
      SlowDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "The key rate reaches families, too. Imagine a family that wants a new house and needs a loan.",
          "Der Leitzins betrifft auch Familien. Stell dir vor, eine Familie will ein Haus und braucht einen Kredit.",
          "Główna stopa wpływa również na rodziny. Wyobraź sobie rodzinę, która chce kupić dom i potrzebuje kredytu.",
        ),
        T(
          "When rates are high, a new loan costs more.",
          "Sind die Zinsen hoch, kostet ein neuer Kredit mehr.",
          "Gdy stopy są wysokie, nowy kredyt kosztuje więcej.",
        ),
        T(
          "When rates are low, a new loan costs less.",
          "Sind die Zinsen niedrig, kostet ein neuer Kredit weniger.",
          "Gdy stopy są niskie, nowy kredyt kosztuje mniej.",
        ),
        T(
          "And there is good news for savers: when rates are high, saving pays more.",
          "Und für Sparer gibt es gute Nachrichten: Sind die Zinsen hoch, bringt Sparen mehr.",
          "Jest też dobra wiadomość dla oszczędzających: gdy stopy są wysokie, lokaty przynoszą większy zysk.",
        ),
      ],
      FamilyDiagram,
    ),
  ],
  toyIntro: T(
    "Turn the key rate like a thermostat. Watch prices and jobs. Be patient: the town reacts slowly!",
    "Dreh am Leitzins wie an einem Thermostat. Schau auf Preise und Arbeit. Hab Geduld: Die Stadt reagiert langsam!",
    "Ustawiaj stopę procentową niczym termostat. Obserwuj ceny i pracę. Bądź cierpliwy: miasto reaguje powoli!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "The town is too quiet. Shops are empty and people lose their jobs. What can the central bank do?",
        "Die Stadt ist zu still. Die Läden sind leer und Leute verlieren ihre Arbeit. Was kann die Zentralbank tun?",
        "W mieście panuje zbyt wielka cisza. Sklepy są puste, a ludzie tracą pracę. Co może zrobić bank centralny?",
      ),
      options: [
        {
          text: T("Raise the key rate", "Den Leitzins erhöhen", "Podnieść stopę procentową"),
        },
        {
          text: T("Lower the key rate", "Den Leitzins senken", "Obniżyć stopę procentową"),
          correct: true,
        },
        {
          text: T(
            "Never change the key rate",
            "Den Leitzins nie ändern",
            "Nigdy nie zmieniać stóp procentowych",
          ),
        },
      ],
      hint: T(
        "A cold town needs warming up. A lower key rate makes loans cheaper, so people build, buy and give work to others.",
        "Eine kalte Stadt muss warm werden. Ein niedrigerer Leitzins macht Kredite billiger, und die Leute bauen, kaufen und geben anderen Arbeit.",
        "Zimne miasteczko trzeba rozgrzać. Niższa stopa sprawia, że kredyty są tańsze, więc ludzie budują, kupują i dają pracę innym.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "The town is too hot. Set the key rate so it becomes just right. Wait and watch the gauge, then press Check.",
        "Die Stadt ist zu heiß. Stelle den Leitzins so ein, dass sie genau richtig wird. Warte und schau auf die Anzeige. Drücke dann Prüfen.",
        "Miasto jest zbyt rozgrzane. Ustaw stopę tak, aby było w sam raz. Poczekaj i obserwuj wskaźnik, a potem naciśnij Sprawdź.",
      ),
      Widget: CoolDownWidget,
      hint: T(
        "Not yet just right. A hot town needs a higher key rate. But it works slowly, so wait until the gauge is inside the 'just right' box before you press Check.",
        "Noch nicht genau richtig. Eine heiße Stadt braucht einen höheren Leitzins. Aber es wirkt langsam. Warte, bis die Anzeige im Kasten „genau richtig“ ist, und drücke dann Prüfen.",
        "Jeszcze nie w sam raz. Rozgrzane miasto potrzebuje wyższej stopy. Zmiana działa powoli, więc poczekaj, aż wskaźnik znajdzie się w polu „w sam raz”, zanim naciśniesz Sprawdź.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "A family wants a new loan for a house. The key rate has gone up. What usually happens?",
        "Eine Familie will einen neuen Kredit für ein Haus. Der Leitzins ist gestiegen. Was passiert meistens?",
        "Rodzina chce wziąć kredyt na dom. Główna stopa wzrosła. Co zazwyczaj się dzieje?",
      ),
      options: [
        {
          text: T("The loan costs less", "Der Kredit kostet weniger", "Kredyt kosztuje mniej"),
        },
        {
          text: T(
            "The loan costs the same",
            "Der Kredit kostet gleich viel",
            "Kredyt kosztuje tyle samo",
          ),
        },
        {
          text: T("The loan costs more", "Der Kredit kostet mehr", "Kredyt kosztuje więcej"),
          correct: true,
        },
      ],
      hint: T(
        "When the key rate goes up, banks usually charge more interest on loans too. So the loan costs more.",
        "Wenn der Leitzins steigt, verlangen die Banken meistens auch mehr Zinsen für Kredite. Der Kredit kostet also mehr.",
        "Gdy główna stopa procentowa rośnie, banki komercyjne zazwyczaj podnoszą oprocentowanie kredytów. Kredyt kosztuje więc więcej.",
      ),
    },
  ],
  askDad: T(
    "Have you noticed something getting more expensive lately? Why do you think that happens? And what would change for our family if loans got more expensive?",
    "Hast du in letzter Zeit bemerkt, dass etwas teurer geworden ist? Warum, glaubst du, passiert das? Und was würde sich für unsere Familie ändern, wenn Kredite teurer würden?",
    "Czy zauważyłeś, że coś ostatnio podrożało? Jak myślisz, dlaczego tak się dzieje? I co zmieniłoby się dla naszej rodziny, gdyby kredyty stały się droższe?",
  ),
  realLife: {
    title: {
      en: "Who sets interest rates in India?",
      de: "Wer bestimmt die Zinsen in Deutschland?",
      pl: "Kto ustala stopy procentowe w Polsce?",
    },
    body: {
      en: "In India, the Reserve Bank of India (RBI) sets the policy repo rate through its Monetary Policy Committee (MPC). The MPC meets regularly to decide whether to raise, lower, or hold rates to keep inflation around 4 percent while supporting economic growth.",
      de: "In Deutschland nutzen wir den Euro, deshalb legt die Europäische Zentralbank (EZB) in Frankfurt die Leitzinsen fest. Die Deutsche Bundesbank entscheidet mit. Die EZB möchte, dass die Preise um etwa 2 Prozent im Jahr steigen. Von Juli 2022 bis September 2023 hat sie ihre Zinsen 10 Mal erhöht, weil die Preise zu schnell stiegen.",
      pl: "W Polsce stopy procentowe ustala Rada Polityki Pieniężnej (RPP), która działa przy Narodowym Banku Polskim (NBP). RPP spotyka się co miesiąc, by ustalić stopę referencyjną. Jej celem jest utrzymanie inflacji na poziomie 2,5 procent z dopuszczalnym przedziałem wahań, dbając o stabilność złotego.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The ECB is the central bank for the euro, and the Bundesbank participates in its decisions; its main objective is price stability.",
          de: "Die EZB ist die Zentralbank für den Euro; ihr vorrangiges Ziel ist die Gewährleistung von Preisstabilität im Euroraum.",
          pl: "Narodowy Bank Polski (NBP) wraz z Radą Polityki Pieniężnej (RPP) odpowiada za stabilność polskiego złotego i poziom stóp procentowych.",
        },
        source:
          "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/five_things.en.html",
      },
      {
        text: {
          en: "The central bank sets key policy rates (such as the repo rate or deposit facility rate), which influence bank lending rates and deposit rates across the economy.",
          de: "Die Zentralbank legt die Leitzinsen fest, an denen sich die Kreditzinsen und Sparzinsen der Geschäftsbanken orientieren.",
          pl: "Bank centralny ustala stopy referencyjne, które wyznaczają poziom oprocentowania kredytów i depozytów w bankach komercyjnych.",
        },
        source:
          "https://www.ecb.europa.eu/ecb-and-you/explainers/html/interest-rates-changes.en.html",
      },
      {
        text: {
          en: "Raising interest rates cools demand and lowers inflation, while cutting rates stimulates borrowing, spending, and economic activity.",
          de: "Höhere Leitzinsen dämpfen die Nachfrage und bremsen die Inflation; Zinssenkungen kurbeln Investitionen und Konsum an.",
          pl: "Podwyżka stóp chłodzi popyt i tłumi inflację, a obniżka pobudza akcję kredytową i ożywia gospodarkę.",
        },
        source:
          "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/five_things.en.html",
      },
      {
        text: {
          en: "Monetary policy transmission works with long and variable time lags: it can take several quarters for rate adjustments to fully affect inflation.",
          de: "Die geldpolitische Transmission wirkt mit langen und variablen zeitlichen Verzögerungen.",
          pl: "Oddziaływanie polityki pieniężnej na gospodarkę cechuje się długimi opóźnieniami czasowymi sięgającymi kilku kwartałów.",
        },
        source: "https://www.ecb.europa.eu/mopo/intro/transmission/html/index.en.html",
      },
      {
        text: {
          en: "Central banks aim for moderate inflation (e.g. 2% for ECB, 2.5% for NBP, 4% for RBI), avoiding both harmful inflation and destructive deflation.",
          de: "Zentralbanken streben eine moderate Zielinflation an, um sowohl Inflation als auch Deflationsspiralen zu verhindern.",
          pl: "Banki centralne dążą do umiarkowanego celu inflacyjnego (np. 2,5% dla NBP, 2% dla EBC), zapobiegając zarówno wysokiej inflacji, jak i deflacji.",
        },
        source: "https://www.ecb.europa.eu/mopo/strategy/pricestab/html/index.en.html",
      },
    ],
    simplified: [
      {
        en: "The town thermostat is a metaphor: central banks influence interest rates to steer economic temperature rather than directly fixing prices.",
        de: "Das Stadt-Thermostat ist ein Bild: Zentralbanken steuern Zinsen, um die wirtschaftliche Aktivität indirekt zu lenken.",
        pl: "Termostat miejski to metafora: bank centralny steruje stopami, aby pośrednio regulować tempo wzrostu gospodarczego i cen.",
      },
      {
        en: "The toy models delayed reactions, showing why central bankers must anticipate conditions months in advance.",
        de: "Das Spielzeug veranschaulicht Zeitverzögerungen, weshalb Zinsentscheidungen vorausschauend getroffen werden müssen.",
        pl: "Zabawka obrazuje opóźnienia, przez które decyzje o stopach muszą być podejmowane ze znacznym wyprzedzeniem.",
      },
      {
        en: "Real economies are subject to external shocks (energy, supply chains, international trade) that complicate interest rate policy.",
        de: "Reale Volkswirtschaften werden durch weltweite Schocks beeinflusst, was die Zinspolitik zusätzlich herausfordert.",
        pl: "Rzeczywiste gospodarki podlegają wpływom zewnętrznym (ceny surowców, handel międzynarodowy), co utrudnia precyzyjne sterowanie.",
      },
    ],
  },
};
