import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function TaxPoolLaunchDiagram({ lang, step }: DiagramProps) {
  const karanName = lang === "pl" ? "Kamil" : lang === "de" ? "Klaus" : "Karan";
  const label = lang === "pl" ? "Kamil analizuje budżet państwa i podatki" : lang === "de" ? "Klaus untersucht Steuern und den oeffentlichen Haushalt" : "Karan inspecting public tax revenue and state budgets";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#f59e0b" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#78350f" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fde68a">{karanName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#fef3c7">
          💰 {lang === "pl" ? "Podatki: Finansowanie Państwa" : lang === "de" ? "Steuern: Wie Staaten sich finanzieren" : "Taxes: Fueling Public Infrastructure"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#d97706" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">🏥 🏫 🛣️</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#fbbf24">
            {lang === "pl" ? "Szpitale, szkoły i autostrady" : lang === "de" ? "Krankenhaeuser, Schulen & Strassen" : "Hospitals, public schools & transit"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#92400e" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Cena za cywilizowane społeczeństwo" : lang === "de" ? "Der Preis fuer eine zivilisierte Welt" : "The price for a civilized society"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#fef3c7">
            {lang === "pl" ? "Wspólne finansowanie wspólnych potrzeb" : lang === "de" ? "Gemeinsame Vorsorge fuer alle" : "Pooling resources for shared prosperity"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DirectVsIndirectDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Podatki bezpośrednie (dochodowe) a pośrednie (VAT, akcyza)" : lang === "de" ? "Direkte Steuern (Einkommen) vs Indirekte Steuern (MwSt)" : "Direct income taxes vs indirect consumption taxes (VAT)";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="150" height="85" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Direct Taxes</text>
        <text x="110" y="90" textAnchor="middle" fontSize="14">💼 🧾</text>
        <text x="110" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">Income & Corporate</text>
        <text x="110" y="124" textAnchor="middle" fontSize="8" fill="#2563eb">Paid directly to treasury</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="150" height="85" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">Indirect Taxes</text>
          <text x="290" y="90" textAnchor="middle" fontSize="14">🛒 🏷️</text>
          <text x="290" y="112" textAnchor="middle" fontSize="9" fill="#065f46">VAT / Sales & Tariffs</text>
          <text x="290" y="124" textAnchor="middle" fontSize="8" fill="#047857">Collected at purchase checkout</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#1e293b" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Zróżnicowane źródła podatków zapewniają stabilność wpływów państwa" : lang === "de" ? "Ein ausgewogener Steuermix sichert die Handlungsfaehigkeit des Staates" : "A diversified tax base stabilizes revenue across economic cycles"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl" ? "VAT przynosi regularne dochody, a podatek PIT dostosowuje się do zarobków" : lang === "de" ? "Konsumsteuern fliessen bestaendig, waehrend Einkommensteuern staffeln" : "Consumption taxes provide steady flows while income taxes adjust to earnings"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ProgressiveBracketDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Progresywna skala podatkowa i progi podatkowe" : lang === "de" ? "Progressive Einkommensteuer und Steuerstufen" : "Progressive tax brackets: marginal rates explained";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <g>
        <rect x="50" y="120" width="80" height="60" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="90" y="145" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#15803d">Bracket 1</text>
        <text x="90" y="165" textAnchor="middle" fontSize="9" fill="#166534">0% to 10%</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="150" y="85" width="80" height="95" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="190" y="120" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">Bracket 2</text>
          <text x="190" y="140" textAnchor="middle" fontSize="9" fill="#b45309">20%</text>

          <rect x="250" y="45" width="80" height="135" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="290" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c">Bracket 3</text>
          <text x="290" y="110" textAnchor="middle" fontSize="9" fill="#dc2626">35%+</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="30" rx="6" fill="#78350f" />
          <text x="200" y="214" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Wyższa stawka dotyczy TYLKO dochodu powyżej danego progu, a nie całości!" : lang === "de" ? "Der hoehere Steuersatz gilt NUR fuer den Teil ueber der Grenze, nicht fuer alles!" : "Marginal rate applies ONLY to earnings above the bracket threshold, not total income!"}
          </text>
        </g>
      )}
    </svg>
  );
}

function PigouvianExternalitiesDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Podatki Pigou: opodatkowanie zanieczyszczeń i negatywnych efektów zewnętrznych" : lang === "de" ? "Pigou-Steuern: Bepreisung von Umweltverschmutzung und Schaeden" : "Pigouvian taxes: internalizing negative environmental externalities";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="145" height="85" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">Free Pollution</text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">🏭 💨 😷</text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">Smokestack dumps soot</text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">Public pays hospital bills</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="145" height="85" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="287" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">Carbon / Pigou Fee</text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">🌱 💶 ⚙️</text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#065f46">Polluter pays per ton</text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#047857">Incentivizes clean filters</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#1e293b" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Podatki mogą kształtować zachowania rynkowe ku lepszemu dobru wspólnemu" : lang === "de" ? "Steuern koennen Anreize setzen, um Umwelt und Gesundheit zu schuetzen" : "Taxes can steer economic behavior away from harmful collective damage"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl" ? "Opłata emisyjna sprawia, że trucie powietrza przestaje być darmowe" : lang === "de" ? "CO2-Abgaben machen klimafreundliche Innovationen wirtschaftlich attraktiv" : "Pricing carbon emissions encourages cleaner technology investments"}
          </text>
        </g>
      )}
    </svg>
  );
}

function TransparentPublicBudgetDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Przejrzysty budżet państwa i zaufanie obywateli" : lang === "de" ? "Transparente Haushaltsfuehrung staerkt das Vertrauen der Buerger" : "Transparent public accounting fostering civic trust";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <g>
        <circle cx="200" cy="90" r="38" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fontSize="20">📊 🏛️</text>
        <text x="200" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">Public Audit</text>
        <rect x="40" y="45" width="105" height="65" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1" />
        <text x="92" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">Taxpayer Voice</text>
        <text x="92" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">No taxation w/o rep.</text>
        <rect x="255" y="45" width="105" height="65" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1" />
        <text x="307" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">Value Delivered</text>
        <text x="307" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">Safe roads & rail</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="140" width="300" height="42" rx="6" fill="#ede9fe" stroke="#a855f7" strokeWidth="1" />
          <text x="200" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#581c87">
            "Taxes are what we pay for civilized society"
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="8.5" fill="#7e22ce">
            Oliver Wendell Holmes Jr.
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Świadomi podatnicy wymagają uczciwości i efektywności od instytucji państwa" : lang === "de" ? "Wachsame Steuerzahler fordern Effizienz und Sparsamkeit von ihren Behoerden" : "Informed taxpayers demand integrity and efficient public delivery"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [taxRate, setTaxRate] = useState(20);
  const revenue = Math.round(taxRate * (100 - taxRate * 0.8));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Tax Rate: {taxRate}% | Estimated Public Revenue: {revenue} M€
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setTaxRate((r) => {
              const next = Math.min(80, r + 10);
              if (next >= 30 && next <= 40) onDone?.();
              return next;
            });
          }}
        >
          Raise Tax Rate (+10%)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setTaxRate((r) => {
              const next = Math.max(0, r - 10);
              if (next >= 30 && next <= 40) onDone?.();
              return next;
            });
          }}
        >
          Lower Tax Rate (-10%)
        </button>
      </div>
      <div style={{ padding: "12px", background: taxRate >= 30 && taxRate <= 40 ? "#eef8ef" : "#fffbeb", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {taxRate < 20
          ? "Underfunded State: Roads have potholes, fire trucks lack spare tires, and public clinics have month-long waits."
          : taxRate > 60
          ? "Excessive Burden (Laffer Curve effect): High taxes discourage entrepreneurs from building companies or hiring workers."
          : "Optimal Revenue Balance: Ample public funding for clean parks, high-speed rail, and public hospitals without suffocating business growth!"}
      </div>
    </div>
  );
}

function TaxesWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>If a country has a progressive income tax with a 30% bracket starting at 50,000€, and you earn 50,001€, does your entire salary get taxed at 30%?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Yes, you immediately lose thousands of euros because your whole salary gets hit with 30%</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>No, only the single additional 1€ above 50,000€ is taxed at 30%; your previous earnings remain at lower bracket rates</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>No, earning one euro over the bracket makes all taxes completely free</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "taxes",
  story: [
    animatedBeat(
      [
        T("Meet Karan. He gets his first summer internship paycheck, but when he opens the paystub, he notices that 150 euros have been withheld in taxes.", "Das ist Klaus. Er erhaelt sein erstes Gehalt aus einem Sommerpraktikum, sieht aber auf der Abrechnung, dass 150 Euro Steuern abgezogen wurden.", "Poznaj Kamila. Otrzymuje swoje pierwsze wynagrodzenie za wakacyjny staż, ale na pasku wypłaty widzi, że 150 euro potrącono na podatki."),
        T("At first he is startled, but as he rides the clean electric commuter train past a newly renovated public hospital and across a modern suspension bridge, he sees where that money goes.", "Zuerst wundert er sich, doch auf der Fahrt in der modernen S-Bahn vorbei am neuen staedtischen Klinikum versteht er den Zweck.", "Początkowo jest zaskoczony, lecz jadąc czystym pociągiem podmiejskim obok nowoczesnego szpitala miejskiego i przez most, uświadamia sobie cel tych opłat."),
        T("Taxes are the shared lifeblood of public infrastructure, civil protection, and national defense.", "Steuern sind der gemeinsame finanzielle Grundstein fuer funktionierende Infrastruktur, Sicherheit und Bildung.", "Podatki stanowią wspólny fundament finansowania infrastruktury publicznej, bezpieczeństwa i edukacji."),
      ],
      TaxPoolLaunchDiagram,
    ),
    animatedBeat(
      [
        T("Governments collect revenue using two broad categories: *direct taxes* and *indirect taxes*.", "Staaten erheben Einnahmen ueber zwei Hauptwege: *direkte* und *indirekte Steuern*.", "Państwa gromadzą dochody poprzez dwa główne strumienie: *podatki bezpośrednie* oraz *pośrednie*."),
        T("Direct taxes, such as personal income tax and corporate profits tax, are paid directly by individuals and businesses to the treasury based on what they earn.", "Direkte Steuern wie die Einkommensteuer oder Koerperschaftsteuer zahlen Buerger und Firmen direkt an das Finanzamt.", "Podatki bezpośrednie, jak PIT czy CIT, są wpłacane bezpośrednio do urzędu skarbowego na podstawie osiąganych dochodów."),
        T("Indirect taxes, like the Value Added Tax (VAT) or sales tax, are automatically added to the retail price of shoes, books, and fuel at the checkout counter.", "Indirekte Steuern wie die Mehrwertsteuer (MwSt) werden direkt an der Supermarktkasse auf Waren und Dienstleistungen erhoben.", "Podatki pośrednie, takie jak VAT czy akcyza, doliczane są bezpośrednio do ceny butów, paliwa czy książek przy kasie sklepowej."),
      ],
      DirectVsIndirectDiagram,
    ),
    animatedBeat(
      [
        T("Most democratic nations structure their personal income tax using a *progressive tax bracket system*.", "Die meisten Demokratien nutzen ein *progressives Einkommensteuersystem* mit Stufentarifen.", "Większość państw demokratycznych stosuje *progresywną skalę podatkową* z progami dochodowymi."),
        T("A widespread misconception is that crossing into a higher tax bracket reduces your take-home pay.", "Ein weit verbreiteter Irrglaube ist, dass ein Sprung in die naechste Steuerklasse das Nettogehalt senkt.", "Powszechnym mitem jest przekonanie, że przekroczenie progu podatkowego obniża pensję 'na rękę'."),
        T("In reality, the higher *marginal tax rate* applies exclusively to the additional dollars earned within that specific upper tier, never to your initial earnings below it.", "In Wahrheit gilt der hoehere *Grenzsteuersatz* immer nur fuer den Einkommensteil oberhalb der Schwelle, nie fuer das gesamte Gehalt.", "W rzeczywistości wyższa *stawka krańcowa* dotyczy wyłącznie nadwyżki dochodu ponad dany próg, a nie całego dotychczasowego zarobku."),
      ],
      ProgressiveBracketDiagram,
    ),
    animatedBeat(
      [
        T("Taxes are also used as policy incentives: *Pigouvian taxes* penalize harmful activities to offset negative externalities.", "Steuern koennen auch das Verhalten steuern: *Pigou-Steuern* bepreisen Schaeden fuer die Allgemeinheit.", "Podatki mogą również korygować zachowania rynkowe: *podatki Pigou* obciążają negatywne efekty zewnętrzne."),
        T("If a chemical factory dumps toxic smoke into the sky, nearby residents suffer respiratory illness and the public pays higher medical bills.", "Stoesst eine Fabrik giftigen Rauch aus, zahlen Anwohner mit ihrer Gesundheit und der Staat fuer Klinikbehandlungen.", "Gdy fabryka bezkarnie zatruwa powietrze, mieszkańcy chorują na astmę, a koszty leczenia ponosi cały system zdrowia."),
        T("By placing a tax on each ton of carbon or pollution emitted, the government forces companies to pay for the damage they cause and motivates clean green engineering.", "Eine Steuer auf CO2 oder Schadstoffe zwingt Verursacher, fuer ihre Schaeden aufzukommen, und foerdert saubere Filtertechnik.", "Opodatkowanie każdej tony zanieczyszczeń zmusza trucicieli do pokrycia kosztów szkód i zachęca do inwestycji w czyste technologie."),
      ],
      PigouvianExternalitiesDiagram,
    ),
    animatedBeat(
      [
        T("In a healthy democracy, the principle of *no taxation without representation* demands complete fiscal transparency.", "In einer gesunden Demokratie verlangt das Prinzip *Keine Besteuerung ohne Mitsprache* absolute Transparenz.", "W dojrzałej demokracji zasada *żadnych podatków bez reprezentacji* wymaga pełnej przejrzystości wydatków budżetowych."),
        T("Citizens have the right to audit how ministries spend public funds, ensuring money is not wasted on vanity monuments or corrupt sweetheart contracts.", "Buerger haben das Recht zu erfahren, wohin ihre Steuergelder fliessen, um Vetternwirtschaft und Verschwendung zu unterbinden.", "Obywatele mają prawo kontrolować, na co wydawane są ich podatki, zapobiegając marnotrawstwu i korupcji."),
        T("When public revenue is spent wisely on world-class schools, reliable bridges, and biomedical research, the entire nation flourishes.", "Wenn Steuermittel verlaesslich in Bildung, Bruecken und medizinische Forschung fliessen, blueht das ganze Land.", "Gdy wpływy podatkowe są mądrze inwestowane w szkoły, drogi i badania naukowe, zyskuje całe społeczeństwo."),
      ],
      TransparentPublicBudgetDiagram,
    ),
  ],
  toyIntro: T(
    "Calibrate tax policy: adjust national tax rates to balance funding for public hospitals against economic incentives for business growth.",
    "Justiere die Steuerpolitik: Finde das Gleichgewicht zwischen ausreichenden Mitteln fuer Kliniken und wirtschaftlicher Dynamik.",
    "Zarządzaj polityką podatkową: dostosuj stawki podatkowe, aby zapewnić fundusze na szpitale bez hamowania rozwoju przedsiębiorczości."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "How do progressive marginal tax brackets work in income taxation?",
        "Wie funktionieren progressive Grenzsteuerstufen bei der Einkommensteuer?",
        "Jak działają progresywne krańcowe progi podatkowe w podatku dochodowym?",
      ),
      options: [
        { text: T("The higher tax percentage rate applies only to income earned above the specific threshold, preserving lower rates for earnings below it", "Der hoehere Steuersatz gilt ausschliesslich fuer den Einkommensbetrag ueber der Stufengrenze, waehrend Voreinkommen niedriger besteuert bleibt", "Wyższa stawka procentowa dotyczy wyłącznie kwoty dochodu powyżej określonego progu, a zarobki poniżej są opodatkowane według niższych stawek"), correct: true },
        { text: T("Earning one additional euro instantly forces your entire lifetime salary to be taxed at 90%", "Ein zusaetzlicher Euro fuehrt dazu, dass das gesamte Lebenseinkommen mit 90% besteuert wird", "Zarobienie dodatkowego jednego euro powoduje natychmiastowe opodatkowanie całego dotychczasowego dochodu stawką 90%"), correct: false },
        { text: T("Only people with green eyes are subject to income tax", "Nur Personen mit gruenen Augen muessen Steuern zahlen", "Podatek dochodowy płacą wyłącznie osoby o zielonych oczach"), correct: false },
      ],
      hint: T(
        "Remember that crossing into a 30% bracket does not suddenly tax your first earned euro at 30%.",
        "Denke daran: Wenn du die 30%-Stufe erreichst, wird dein erster verdiente Euro nicht ploetzlich mit 30% besteuert.",
        "Pamiętaj, że wejście w drugi próg nie oznacza, że Twój pierwszy zarobiony tysiąc złotych zostanie nagle opodatkowany wyższą stawką."),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the economic goal of a Pigouvian tax (like a carbon or pollution tax)?",
        "Was ist das wirtschaftliche Ziel einer Pigou-Steuer (wie der CO2-Abgabe)?",
        "Jaki jest cel ekonomiczny podatku Pigou (np. podatku od emisji CO2 lub zanieczyszczeń)?",
      ),
      options: [
        { text: T("To internalize negative externalities by making polluters pay for the societal damage they create, incentivizing cleaner alternatives", "Negative externe Effekte zu internalisieren, indem Verursacher fuer Schaeden zahlen und so zu saubereren Methoden angeregt werden", "Internacjonalizacja negatywnych efektów zewnętrznych poprzez obciążenie trucicieli kosztami szkód, co skłania do wyboru czystszych rozwiązań"), correct: true },
        { text: T("To make buying bicycles completely illegal nationwide", "Das Kaufen von Fahrraedern im ganzen Land unter Strafe zu stellen", "Całkowity zakaz zakupu rowerów na terenie całego kraju"), correct: false },
        { text: T("To force all factories to close down on sunny afternoons", "Alle Fabriken an sonnigen Nachmittagen zur Schliessung zu zwingen", "Zmuszenie fabryk do przerywania pracy w słoneczne popołudnia"), correct: false },
      ],
      hint: T(
        "Think about making companies pay for the smog they pump into public air.",
        "Ueberlege, warum Unternehmen fuer den Rauch zahlen sollten, den sie in die Atemluft aller blasen.",
        "Zastanów się, dlaczego przedsiębiorstwo powinno płacić za zanieczyszczenia wprowadzane do powietrza, którym wszyscy oddychamy."),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze what happens when you cross into a higher marginal income tax bracket.",
        "Analysiere, was passiert, wenn dein Einkommen eine hoehere Grenzsteuerstufe erreicht.",
        "Przeanalizuj skutki wejścia dochodu w wyższy krańcowy próg podatkowy.",
      ),
      Widget: TaxesWidget,
      hint: T(
        "Focus on the difference between average tax rate and marginal tax rate.",
        "Achte auf den Unterschied zwischen Durchschnittssteuersatz und Grenzsteuersatz.",
        "Zwróć uwagę na różnicę między średnią a krańcową stawką opodatkowania."),
    },
  ],
  askDad: T(
    "Ask your parent: What taxes appear on their household payslips and store receipts, and how do they file their annual tax return?",
    "Frage deine Eltern: Welche Steuern stehen auf ihrer Gehaltsabrechnung und auf Kassenbons, und wie machen sie ihre Steuererklaerung?",
    "Zapytaj rodziców: Jakie podatki widnieją na ich pasku wynagrodzenia oraz na paragonach sklepowych, i jak rozliczają coroczny PIT?"),
  realLife: {
    title: T(
      "Real world: Arthur Pigou, the invention of VAT in France, and modern carbon pricing in the European Union",
      "Echte Welt: Arthur Pigou, die Erfindung der Mehrwertsteuer in Frankreich und der EU-Emissionshandel",
      "Prawdziwy świat: Arthur Pigou, narodziny podatku VAT we Francji i unijny system handlu emisjami (EU ETS)",
    ),
    body: T(
      "In 1920, Cambridge economist Arthur Cecil Pigou published 'The Economics of Welfare', formulating how corrective taxes can fix environmental harm. In 1954, French tax administrator Maurice Lauré designed the Value Added Tax (VAT), which prevents cascading taxation on business supplies and is now adopted by over 160 nations. Today, the European Union's Emissions Trading System (ETS) applies Pigouvian market incentives across power plants and industrial factories.",
      "1920 veroeffentlichte der britische Oekonom Arthur Pigou sein Werk 'The Economics of Welfare' ueber Steuern gegen Marktversagen. 1954 erfand der franzoesische Finanzbeamte Maurice Lauré die Mehrwertsteuer, die kumulierende Abgaben vermeidet und heute in ueber 160 Laendern gilt. Heute setzt das Europaeische Emissionshandelssystem (EU ETS) genau dieses Prinzip bei Kraftwerken und Industrieanlagen um.",
      "W 1920 roku Arthur Cecil Pigou opublikował 'The Economics of Welfare', wyjaśniając, jak podatki mogą korygować szkody środowiskowe. W 1954 roku francuski urzędnik Maurice Lauré opracował podatek od wartości dodanej (VAT), który wyeliminował kaskadowe opodatkowanie i funkcjonuje dziś w ponad 160 krajach. Obecnie unijny system handlu emisjami (EU ETS) wykorzystuje ten mechanizm wobec elektrociepłowni i fabryk."),
  },
  factCard: {
    claims: [
      { text: T("Arthur Cecil Pigou introduced corrective taxation for negative externalities in 'The Economics of Welfare' in 1920.", "Arthur Cecil Pigou fuehrte 1920 in 'The Economics of Welfare' Steuern zur Korrektur negativer externer Effekte ein.", "Arthur Cecil Pigou przedstawił koncepcję podatków korygujących efekty zewnętrzne w dziele 'The Economics of Welfare' w 1920 roku."), source: "https://www.britannica.com/biography/Arthur-Cecil-Pigou" },
      { text: T("Maurice Lauré invented the Value Added Tax (TVA) in France in 1954 to eliminate compounding turnover taxes on production chains.", "Maurice Lauré entwickelte 1954 in Frankreich die Mehrwertsteuer, um Mehrfachbesteuerung entlang der Wertschoepfungskette zu verhindern.", "Maurice Lauré stworzył podatek od towarów i usług (VAT) we Francji w 1954 roku, eliminując wielokrotne opodatkowanie tego samego towaru."), source: "https://www.economie.gouv.fr/facile-eco/tva-taxe-sur-la-valeur-ajoutee" },
      { text: T("Adam Smith laid down the four fundamental canons of taxation (equity, certainty, convenience, and economy) in 'The Wealth of Nations' (1776).", "Adam Smith formulierte 1776 im 'Wohlstand der Nationen' die vier klassischen Besteuerungsgrundsaetze.", "Adam Smith sformułował w 'Bogactwie narodów' (1776) cztery kanony podatkowe: równość, pewność, dogodność i taniość poboru."), source: "https://www.adamsmith.org/the-wealth-of-nations" },
      { text: T("The European Union Emissions Trading System (EU ETS), established in 2005, is the world's first major carbon market implementing Pigouvian pricing.", "Das 2005 gegruendete EU-Emissionshandelssystem ist der weltweit groesste marktbasierte CO2-Preismechanismus.", "Unijny system handlu uprawnieniami do emisji (EU ETS), działający od 2005 roku, stanowi największy na świecie rynek wyceny emisji gazów cieplarnianych."), source: "https://climate.ec.europa.eu/eu-action/eu-emissions-trading-system-eu-ets_en" },
      { text: T("The OECD Centre for Tax Policy and Administration sets international transfer pricing guidelines to combat cross-border tax evasion.", "Das OECD-Zentrum fuer Steuerpolitik koordiniert weltweite Standards gegen Steuervermeidung multinationaler Konzerne.", "Centrum Polityki Podatkowej OECD wyznacza międzynarodowe wytyczne w zakresie cen transferowych i walki z unikaniem opodatkowania."), source: "https://www.oecd.org/tax/" },
    ],
    simplified: [
      T(
        "Complex statutory tax codes and effective vs nominal marginal calculations are explained through clear income tier diagrams and relatable paycheck withholding examples.",
        "Komplexe Einkommensteuertarife und Grenzsteuersaetze wurden anhand intuitiver Stufengrafiken und alltagsnaher Gehaltsabrechnungen verstaendlich gemacht.",
        "Skomplikowane skale podatkowe i różnice między średnią a krańcową stawką podatku wyjaśniono za pomocą prostych wykresów schodkowych i przykładu paska wypłaty."),
    ],
  },
};
