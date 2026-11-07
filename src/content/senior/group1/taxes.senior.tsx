import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function ProgressiveTaxDiagram({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label="Progressive tax brackets diagram">
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fbfc" stroke="#1d3f47" strokeWidth="2" />
      <rect x="30" y="140" width="90" height="60" rx="6" fill="#d3f9d8" stroke="#2b8a3e" strokeWidth="2" />
      <text x="75" y="165" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2b8a3e">Bracket 1</text>
      <text x="75" y="185" textAnchor="middle" fontSize="10" fill="#2b8a3e">0 - $10k: 10%</text>

      {step >= 1 && (
        <g>
          <rect x="140" y="100" width="90" height="100" rx="6" fill="#fff3bf" stroke="#f59f00" strokeWidth="2" />
          <text x="185" y="135" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#784e03">Bracket 2</text>
          <text x="185" y="155" textAnchor="middle" fontSize="10" fill="#784e03">$10k - $50k</text>
          <text x="185" y="175" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#d9480f">20% Rate</text>
        </g>
      )}

      {step >= 2 && (
        <g>
          <rect x="250" y="60" width="100" height="140" rx="6" fill="#ffe3e3" stroke="#e03131" strokeWidth="2" />
          <text x="300" y="95" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c92a2a">Top Bracket</text>
          <text x="300" y="115" textAnchor="middle" fontSize="10" fill="#c92a2a">&gt; $50k: 35%</text>
          <text x="300" y="145" textAnchor="middle" fontSize="10" fill="#495057">Only on extra</text>
          <text x="300" y="165" textAnchor="middle" fontSize="10" fill="#495057">dollars above $50k</text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [income, setIncome] = useState(40000);

  // Progressive tax calculation:
  // 0 - 10k at 10% = 1000
  // 10k - 50k at 20%
  // > 50k at 35%
  let tax = 0;
  if (income <= 10000) {
    tax = income * 0.10;
  } else if (income <= 50000) {
    tax = 1000 + (income - 10000) * 0.20;
  } else {
    tax = 1000 + 8000 + (income - 50000) * 0.35;
  }
  const effectiveRate = Math.round((tax / income) * 100);
  const marginalRate = income <= 10000 ? 10 : income <= 50000 ? 20 : 35;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Gross Income: ${income.toLocaleString()} | Total Tax: ${tax.toLocaleString()}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setIncome((inc) => {
              const next = inc === 40000 ? 80000 : inc === 80000 ? 15000 : 40000;
              if (next === 80000) onDone?.();
              return next;
            });
          }}
        >
          Change Income (${income === 40000 ? "80,000" : income === 80000 ? "15,000" : "40,000"})
        </button>
      </div>
      <div style={{ padding: "12px", background: "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        Marginal Rate: {marginalRate}% on the last dollar | Effective Rate: {effectiveRate}% on total income.
      </div>
    </div>
  );
}

function TaxWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>If you move into a higher tax bracket, does your take-home pay decrease?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Yes, you lose money because all previous income is taxed at the higher rate</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>No, only the additional income above the bracket threshold is taxed at the higher rate</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Yes, tax brackets take 100% of all wages</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "taxes",
  story: [
    animatedBeat(
      [
        T("Meet Arjun. He loves skateboarding at the community park, where new LED floodlights let everyone skate safely until dark.", "Das ist Lukas. Er faehrt leidenschaftlich Skateboard im Skatepark, wo helle Flutlichter Abendsicherheit bringen.", "Poznaj Jana. Uwielbia jeździć na deskorolce w skateparku, gdzie nowe reflektory LED pozwalają bezpiecznie jeździć po zmroku."),
        T("Neither Arjun nor his friends paid for those lights out of their pockets.", "Weder Lukas noch seine Skater-Freunde haben diese Lampen aus eigener Tasche bezahlt.", "Ani Jan, ani jego koledzy nie zapłacili za te lampy z własnej kieszeni."),
        T("They were funded by the city pool of *taxes*: mandatory contributions from local working citizens and companies.", "Sie wurden aus *Steuern* bezahlt: Beitraege aller arbeitenden Buerger und Firmen fuer die Gemeinschaft.", "Zostały sfinansowane ze wspólnej puli *podatków*: obowiązkowych wpłat mieszkańców i lokalnych firm."),
      ],
      ProgressiveTaxDiagram,
    ),
    animatedBeat(
      [
        T("Taxes pay for shared public goods that everyone uses: roads, emergency firefighters, clean drinking water, and public parks.", "Steuern bezahlen oeffentliche Gueter: Strassen, Feuerwehr, sauberes Trinkwasser und Parks.", "Podatki finansują wspólne dobra, z których korzystają wszyscy: równe drogi, straż pożarną, czystą wodę w kranie i parki."),
        T("Most democratic countries collect income tax using a system called *progressive tax brackets*.", "Die meisten Demokratien nutzen fuer Einkommen ein System namens *Steuerprogression*.", "Większość państw pobiera podatek dochodowy w systemie zwanym *skalą progresywną*."),
        T("Under progressive taxation, people who earn higher salaries contribute a larger percentage of their top earnings.", "Wer sehr viel Geld verdient, zahlt auf seine obersten Einkommen einen hoeheren Prozentsatz.", "W systemie progresywnym osoby zarabiające duże sumy oddają wyższy procent od swoich najwyższych dochodów."),
      ],
      ProgressiveTaxDiagram,
    ),
    animatedBeat(
      [
        T("Many people worry about entering a higher tax bracket because they misunderstand the math.", "Viele Menschen haben unbegruendete Angst vor der naechsten Steuerstufe, weil sie die Formel falsch verstehen.", "Wielu ludzi obawia się wejścia w wyższy próg podatkowy, ponieważ błędnie liczy procenty."),
        T("Tax brackets only apply to the *marginal dollars* above that specific milestone line.", "Eine hoehere Steuerstufe gilt immer nur fuer die *zusaetzlichen Euros* ueber dieser Grenze.", "Wyższa stawka dotyczy wyłącznie *dodatkowych pieniędzy* zarobionych ponad granicę danego progu."),
        T("Getting a pay raise *never* causes you to take home less total net pay than you earned before.", "Eine Gehaltserhoehung fuehrt in einem normalen System *niemals* zu weniger Nettoauszahlung.", "Podwyżka pensji w normalnym systemie *nigdy* nie spowoduje, że na Twoim koncie zostanie mniej pieniędzy niż wcześniej."),
      ],
      ProgressiveTaxDiagram,
    ),
    animatedBeat(
      [
        T("When Arjun buys a new skateboard deck at the skate shop, he also pays a small *sales tax* on the receipt.", "Kauft Lukas ein neues Skateboard im Shop, zahlt er auf dem Kassenzettel zusaetzlich *Mehrwertsteuer*.", "Gdy Jan kupuje nową deskę w sklepie, na paragonie doliczony jest także podatek od sprzedaży (*VAT*)."),
        T("Sales taxes are consumption taxes collected instantly at the store checkout on goods and services.", "Verbrauchssteuern werden direkt beim Einkaufen im Geschaeft fuer Waren und Dienstleistungen faellig.", "Podatek VAT to podatek konsumpcyjny, pobierany automatycznie przy każdej transakcji w kasie."),
        T("Together, income taxes and consumption taxes provide the funds needed to maintain the entire city.", "Zusammen stellen Einkommensteuer und Mehrwertsteuer das Budget bereit, um eine moderne Stadt zu betreiben.", "Wspólnie podatek dochodowy i VAT tworzą budżet potrzebny do utrzymania i rozwoju całego miasta."),
      ],
      ProgressiveTaxDiagram,
    ),
    animatedBeat(
      [
        T("Citizens expect transparent public records showing exactly how their tax money is managed.", "Buerger erwarten Transparenz darueber, wofuer die eingezahlten Steuergelder verwendet werden.", "Obywatele mają prawo do pełnej przejrzystości i wglądu w to, jak wydawane są publiczne pieniądze."),
        T("When public taxes build great community libraries, high-speed rail, and hospitals, everyone benefits.", "Wenn Steuern gute Schulen, schnelle Zuege und moderne Krankenhaeuser bauen, nuetzt das allen.", "Gdy podatki finansują nowoczesne szkoły, szybkie pociągi i szpitale, zyskuje całe społeczeństwo."),
        T("Understanding taxes gives you confidence to navigate contracts, paychecks, and real adult finance.", "Steuern zu verstehen gibt dir Sicherheit fuer Vertraege, Gehaltsabrechnungen und eigene Firmen.", "Zrozumienie mechanizmu podatków daje pewność siebie w czytaniu umów, pensji i prowadzeniu biznesu."),
      ],
      ProgressiveTaxDiagram,
    ),
  ],
  toyIntro: T(
    "Test how progressive tax brackets determine both your marginal and effective tax rates.",
    "Teste, wie progressive Steuerstufen deinen Grenzsteuersatz und effektiven Steuersatz bestimmen.",
    "Sprawdź, jak progresywne progi podatkowe określają Twoją stawkę krańcową i efektywną.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the difference between marginal and effective tax rates?",
        "Was ist der Unterschied zwischen Grenzsteuersatz und effektivem Steuersatz?",
        "Jaka jest różnica między krańcową a efektywną stawką podatkową?",
      ),
      options: [
        { text: T("Marginal is the rate on the next dollar earned; effective is total tax divided by total income", "Grenzsteuer gilt fuer den naechsten Euro; effektiver Satz ist die Gesamtsteuer geteilt durch Gesamteinkommen", "Krańcowa dotyczy kolejnego zarobionego grosza; efektywna to cały podatek podzielony przez dochód"), correct: true },
        { text: T("Marginal applies only to property taxes", "Grenzsteuer gilt nur fuer Grundstuecke", "Krańcowa ma zastosowanie tylko do podatku od nieruchomości") },
        { text: T("Effective tax is always exactly fifty percent in every nation", "Der effektive Satz liegt in jedem Land weltweit bei exakt 50 Prozent", "Efektywna stawka wynosi zawsze dokładnie pięćdziesiąt procent w każdym kraju"), },
      ],
      hint: T(
        "Marginal focuses on the edge; effective looks at the overall average.",
        "Grenzsteuer schaut auf die Spitze; effektiv betrachtet den Gesamtschnitt.",
        "Krańcowa skupia się na kolejnym kroku, efektywna na łącznym uśrednionym wyniku.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is it impossible to end up with less net pay simply from entering a higher tax bracket?",
        "Warum kann man durch den Eintritt in eine hoehere Steuerstufe netto nicht weniger haben?",
        "Dlaczego samo wejście w wyższy próg podatkowy nie może zmniejszyć pensji netto?",
      ),
      options: [
        { text: T("Only the additional income above the threshold is subject to the higher percentage", "Nur das zusaetzliche Einkommen ueber der Schwelle unterliegt dem hoeheren Satz", "Tylko nadwyżka dochodu ponad ustalony próg podlega wyższej stawce procentowej"), correct: true },
        { text: T("All employers automatically refund all income taxes on Fridays", "Arbeitgeber erstatten alle Steuern jeden Freitag bar zurueck", "Wszyscy pracodawcy automatycznie zwracają pracownikom cały podatek w każdy piątek") },
        { text: T("The government cancels tax brackets whenever people complain", "Der Staat streicht Steuerstufen sofort, sobald sich Buerger beschweren", "Rząd likwiduje progi podatkowe za każdym razem, gdy obywatele protestują") },
      ],
      hint: T(
        "Lower bracket earnings stay taxed at their original lower rates.",
        "Einkommensteile in den unteren Stufen behalten ihren niedrigen Satz.",
        "Część dochodu z niższych progów nadal podlega dotychczasowym, niższym stawkom.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Verify how moving into a higher tax bracket affects total take-home pay.",
        "Ueberpruefe, wie sich der Aufstieg in eine hoehere Steuerstufe auf das Netto auswirkt.",
        "Zweryfikuj, jak przejście do wyższego progu wpływa na całkowitą kwotę na rękę.",
      ),
      Widget: TaxWidget,
      hint: T(
        "Tax brackets only increase the percentage on extra earnings above each threshold.",
        "Steuerstufen erhoehen den Prozentsatz nur fuer Zuwachsgewinne ueber der jeweiligen Grenze.",
        "Progi podatkowe podwyższają stawkę tylko dla nadwyżki powyżej danej granicy dochodowej.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: What kinds of taxes exist in your country (like income tax, VAT, or capital gains)?",
    "Frage deine Eltern: Welche Steuerarten gibt es in eurem Land (wie Einkommensteuer, Mehrwertsteuer oder Kapitalertragsteuer)?",
    "Zapytaj rodziców: Jakie rodzaje podatków płaci się w Waszym kraju (np. dochodowy, VAT, od zysków kapitałowych)?",
  ),
  realLife: {
    title: T(
      "Real world: International progressive tax schedules and OECD comparisons",
      "Echte Welt: Progressive Steuertabellen im internationalen OECD-Vergleich",
      "Prawdziwy świat: Skale podatkowe i porównania fiskalne OECD",
    ),
    body: T(
      "Countries like Germany, the United States, and Poland publish explicit income tax schedules with marginal brackets ranging from zero (tax-free allowance) up to top brackets of 42% or 45%. Public finance economists compare tax wedges to analyze how taxation influences economic competitiveness and talent migration.",
      "Staaten wie Deutschland, die USA und Polen veroeffentlichen Steuertarife vom Grundfreibetrag bis zum Spitzensteuersatz von 42% oder 45%. Oekonomen vergleichen Steuerkeile zur Bewertung der Wettbewerbsfaehigkeit.",
      "Kraje takie jak Niemcy, USA czy Polska publikują tabele podatkowe od kwoty wolnej aż po najwyższe stawki rzędu 42% lub 45%. Ekonomiści badają tzw. klin podatkowy, analizując wpływ fiskusa na konkurencyjność gospodarki.",
    ),
  },
  factCard: {
    claims: [
      { text: T("Adam Smith outlined four canons of taxation (equality, certainty, convenience, and economy) in The Wealth of Nations (1776).", "Adam Smith formulierte 1776 in Der Wohlstand der Nationen vier Grundsaetze der Besteuerung.", "Adam Smith sformułował cztery zasady opodatkowania w Bogactwie narodów z 1776 roku."), source: "https://www.econlib.org/library/Smith/smWN.html" },
      { text: T("The OECD Tax Policy Center publishes international comparisons of personal income tax rates and tax wedge burdens.", "Das OECD Tax Policy Center veroeffentlicht Vergleiche von Einkommensteuersaetzen und Steuerkeilen weltweit.", "Centrum Polityki Podatkowej OECD publikuje międzynarodowe zestawienia stawek podatku dochodowego i klina podatkowego."), source: "https://www.oecd.org/tax/tax-policy/" },
      { text: T("The German Federal Ministry of Finance (BMF) outlines the progressive linear income tax tariff in the Einkommensteuergesetz (EStG).", "Das Bundesfinanzministerium dokumentiert den linear-progressiven Steuertarif im Einkommensteuergesetz.", "Niemieckie Ministerstwo Finansów przedstawia skalę progresywną w ustawie o podatku dochodowym (EStG)."), source: "https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/steuern.html" },
      { text: T("The US Internal Revenue Service (IRS) publishes annual marginal income tax brackets and standard deduction adjustments.", "Der US Internal Revenue Service (IRS) veroeffentlicht jaehrliche marginale Steuerstufen und Freibetraege.", "Amerykański urząd podatkowy IRS publikuje coroczne progi podatkowe oraz kwoty odliczeń standardowych."), source: "https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024" },
      { text: T("Public goods are defined in economics as non-excludable and non-rivalrous in consumption.", "Oeffentliche Gueter sind in der Volkswirtschaftslehre als nicht-ausschliessbar und nicht-rivalisierend definiert.", "Dobra publiczne są w ekonomii definiowane jako niewykluczające z konsumpcji i nierywalizacyjne."), source: "https://www.britannica.com/money/public-good" },
    ],
    simplified: [
      T(
        "Complex deductions, tax credits, and municipal surcharges are abstracted into standard progressive bracket tiers.",
        "Komplexe Absetzbetraege und kommunale Zuschlaege werden auf grundlegende Tarifstufen vereinfacht.",
        "Złożone ulgi, odliczenia od podatku i opłaty lokalne uproszczono do czytelnych progów podatkowych.",
      ),
    ],
  },
};
