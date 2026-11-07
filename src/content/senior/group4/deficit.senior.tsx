import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function FiscalLedgerLaunchDiagram({ lang, step }: DiagramProps) {
  const aishName = lang === "pl" ? "Ania" : lang === "de" ? "Anna" : "Aish";
  const label = lang === "pl" ? "Ania bada deficyt budżetowy i dług publiczny" : lang === "de" ? "Anna analysiert Haushaltsdefizit und Staatsverschuldung" : "Aish reviewing state fiscal deficit and national debt ledger";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#ef4444" strokeWidth="2" />
        <path d="M 52 110 C 52 70 108 70 108 110" fill="#450a0a" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#b91c1c" stroke="#ef4444" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fca5a5">{aishName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#fecaca">
          📉 {lang === "pl" ? "Deficyt Budżetowy i Dług" : lang === "de" ? "Haushaltsdefizit und Schulden" : "Deficit vs National Debt"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#dc2626" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">💸 🧾 🏦</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#f87171">
            {lang === "pl" ? "Roczny deficyt (przepływ) a skumulowany dług (zasób)" : lang === "de" ? "Jaehrliches Defizit vs Gesamtschuldenberg" : "Annual deficit flow vs total debt stock"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#7f1d1d" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Inwestycje a konsumpcja na kredyt" : lang === "de" ? "Zukunftsinvestitionen vs Konsumkredit" : "Capital investments vs spending beyond means"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#fee2e2">
            {lang === "pl" ? "Obligacje skarbowe finansują infrastrukturę" : lang === "de" ? "Staatsanleihen finanzieren Schienen & Netze" : "Sovereign bonds funding long-term growth"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DeficitVsDebtFlowDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Wanna deficytu i długu: kran to deficyt, woda w wannie to dług" : lang === "de" ? "Die Badewannen-Metapher: Wasserzufluss ist Defizit, Wasserstand die Schulden" : "Bathtub metaphor: tap flow is deficit, water level is accumulated debt";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="145" height="85" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">Annual Deficit (Flow)</text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">🚰 💧</text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">One year gap</text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">Spending exceeds taxes</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="145" height="85" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="287" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">National Debt (Stock)</text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">🛁 🌊</text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">Cumulative sum</text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#2563eb">All past deficits minus surpluses</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#1e293b" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Nawet gdy zmniejszasz deficyt, woda w wannie (dług) wciąż powoli rośnie!" : lang === "de" ? "Selbst wenn das Defizit sinkt, steigt der Schuldenberg weiter, solange Zufluss da ist!" : "Even when shrinking the deficit, accumulated debt grows unless run in surplus!"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl" ? "Tylko nadwyżka budżetowa spłaca dług i obniża poziom wody" : lang === "de" ? "Erst ein Haushaltsueberschuss traegt Altschulden aktiv ab" : "Only a fiscal budget surplus actively drains accumulated principal"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ProductiveBorrowingDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Dług produktywny (inwestycje) a konsumpcyjny" : lang === "de" ? "Produktivschulden (Investitionen) vs Konsumschulden" : "Productive capital investments vs consumptive deficits";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="145" height="85" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">Productive Borrowing</text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">🚅 ⚡ 🎓</text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#065f46">Bridges, research, grids</text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#047857">Expands future GDP yield</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="145" height="85" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="287" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">Unproductive Deficit</text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">🎉 💸 ⏳</text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#991b1b">Short-term consumption</text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#ef4444">Leaves debt with no return</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#78350f" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Inwestycje w naukę i infrastrukturę same zarabiają na spłatę obligacji" : lang === "de" ? "Investitionen in Bildung und Netze refinanzieren sich durch Wachstum" : "Infrastructure and STEM research yield future tax returns exceeding interest costs"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#fde68a">
            {lang === "pl" ? "Mądrze zaciągnięty dług buduje lepszy świat dla kolejnych pokoleń" : lang === "de" ? "Kluge Schulden hinterlassen kuenftigen Generationen echten Wohlstand" : "Responsible borrowing builds lasting wealth for rising generations"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DebtToGDPDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Wskaźnik długu do PKB (Debt-to-GDP Ratio)" : lang === "de" ? "Schuldenstandsquote im Verhaeltnis zum BIP" : "Debt-to-GDP ratio: measuring sustainable debt load";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <circle cx="120" cy="90" r="38" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="120" y="85" textAnchor="middle" fontSize="20">🧾</text>
        <text x="120" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">Debt Load</text>

        <circle cx="280" cy="90" r="48" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <text x="280" y="85" textAnchor="middle" fontSize="22">🏭 📈</text>
        <text x="280" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065f46">Annual GDP</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="150" width="300" height="34" rx="6" fill="#1e293b" />
          <text x="200" y="172" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#38bdf8">
            Debt-to-GDP Ratio = National Debt / Total National Economy
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="30" rx="6" fill="#334155" />
          <text x="200" y="214" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Jeśli gospodarka rośnie szybciej niż odsetki, relacja długu naturalnie maleje" : lang === "de" ? "Waechst die Wirtschaft schneller als der Zins, sinkt die Schuldenquote automatisch" : "If GDP growth exceeds the interest rate, the debt burden stabilizes and falls"}
          </text>
        </g>
      )}
    </svg>
  );
}

function IntergenerationalResponsibilityDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Międzypokoleniowa odpowiedzialność i dyscyplina fiskalna" : lang === "de" ? "Generationengerechtigkeit und solide Staatsfinanzen" : "Intergenerational equity and sustainable fiscal balance";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <g>
        <rect x="50" y="40" width="300" height="50" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="200" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#581c87">
          {lang === "pl" ? "Solidarność Międzypokoleniowa" : lang === "de" ? "Generationengerechtigkeit" : "Intergenerational Fairness"}
        </text>
        <text x="200" y="78" textAnchor="middle" fontSize="9" fill="#7e22ce">
          {lang === "pl" ? "Nie przerzucajmy długów za bieżącą konsumpcję na nasze dzieci" : lang === "de" ? "Keine Schuldenberge fuer fluechtigen Konsum an Kinder vererben" : "Borrow for productive bridges and schools, not perishable consumption"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="105" width="150" height="75" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="115" y="130" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">Fiscal Anchor</text>
          <text x="115" y="152" textAnchor="middle" fontSize="14">⚓ 📜</text>
          <text x="115" y="168" textAnchor="middle" fontSize="8.5" fill="#166534">Debt brake / rules</text>

          <rect x="210" y="105" width="150" height="75" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="285" y="130" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Resilience in Crisis</text>
          <text x="285" y="152" textAnchor="middle" fontSize="14">🛡️ 💰</text>
          <text x="285" y="168" textAnchor="middle" fontSize="8.5" fill="#1d4ed8">Room for emergencies</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Zdrowe finanse publiczne dają państwu siłę do walki z kryzysami i pandemiami" : lang === "de" ? "Solide Finanzen ermoeglichen beherztes Handeln in Katastrophen und Notlagen" : "Fiscal discipline gives governments dry powder to respond courageously to emergencies"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [borrowing, setBorrowing] = useState(30);
  const interestCost = Math.round(borrowing * 0.05 * 10) / 10;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Annual Sovereign Debt Issued: {borrowing} B€ | Annual Interest Service: {interestCost} B€
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setBorrowing((b) => {
              const next = Math.min(100, b + 15);
              if (next >= 40 && next <= 60) onDone?.();
              return next;
            });
          }}
        >
          Issue More Bonds (+15 B€)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setBorrowing((b) => {
              const next = Math.max(0, b - 15);
              if (next >= 40 && next <= 60) onDone?.();
              return next;
            });
          }}
        >
          Tighten Fiscal Deficit (-15 B€)
        </button>
      </div>
      <div style={{ padding: "12px", background: borrowing <= 60 ? "#eef8ef" : "#fff1f2", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {borrowing > 75
          ? "Heavy Debt Stress: Bond yields spike! Ballooning interest payments crowd out funding for schools and hospitals."
          : borrowing < 15
          ? "Severe Austerity: Zero borrowing means crumbling rail bridges, shuttered libraries, and stalled green transition."
          : "Sustainable Prudence: Borrowing finances high-return clean energy grids while keeping bond ratings pristine!"}
      </div>
    </div>
  );
}

function DeficitWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What is the precise difference between the 'budget deficit' and the 'national debt'?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>They are identical synonyms for the amount of gold coins in treasury vaults</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>The deficit is the annual shortfall when yearly spending exceeds revenue, while the national debt is the cumulative total of all unpaid past deficits</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>The deficit is owed to foreign countries, while debt is owed only to astronauts</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "deficit",
  story: [
    animatedBeat(
      [
        T("Meet Aish. She is reading headlines reporting that her country's national debt has reached hundreds of billions of euros.", "Das ist Anna. Sie liest in der Zeitung, dass die Staatsverschuldung ihres Landes Hunderte Milliarden Euro erreicht hat.", "Poznaj Anię. Czyta w gazecie, że dług publiczny jej kraju sięga setek miliardów euro."),
        T("Alarmist articles claim the government will go bankrupt tomorrow, while other commentators argue borrowing is completely harmless.", "Einige Schlagzeilen warnen vor dem Staatsbankrott, waehrend andere behaupten, Schulden seien voellig bedeutungslos.", "Część nagłówków straszy natychmiastowym bankructwem, a inni komentatorzy twierdzą, że pożyczanie pieniędzy jest bez znaczenia."),
        T("To understand sovereign finance without fear, we must separate economic facts from sensational slogans.", "Um Staatsfinanzen nuechtern zu verstehen, muessen wir oekonomische Fakten von Parolen trennen.", "Aby trzeźwo ocenić finanse państwa, musimy oddzielić fakty ekonomiczne od politycznych haseł."),
      ],
      FiscalLedgerLaunchDiagram,
    ),
    animatedBeat(
      [
        T("The most crucial distinction is between a *flow* and a *stock*: the annual budget deficit versus the accumulated national debt.", "Der wichtigste Unterschied besteht zwischen *Stromgroesse* und *Bestandsgroesse*: Defizit versus Gesamtverschuldung.", "Kluczowe jest rozróżnienie między *strumieniem* a *zasobem*: rocznym deficytem a skumulowanym długiem."),
        T("Think of a bathtub: the water pouring from the faucet represents the *budget deficit*, the single-year difference between state spending and tax intake.", "Stell dir eine Badewanne vor: Das aus dem Hahn fliessende Wasser ist das *Haushaltsdefizit* des laufenden Jahres.", "Wyobraź sobie wannę: woda lecąca z kranu to *deficyt budżetowy*, czyli roczna różnica między wydatkami państwa a podatkami."),
        T("The rising pool of water inside the tub represents the *national debt*, the cumulative sum of all past deficits minus past surpluses.", "Der Pegelstand in der Wanne ist der *Schuldenstand*, die Summe aller bisherigen Fehlbetraege abwaegend gegen Ueberschuesse.", "Poziom wody w wannie to *dług publiczny*, czyli łączna suma wszystkich niespłaconych deficytów z ubiegłych lat."),
      ],
      DeficitVsDebtFlowDiagram,
    ),
    animatedBeat(
      [
        T("Not all government borrowing is created equal: economists distinguish *productive investment* from short-term consumption.", "Schulden sind nicht gleich Schulden: Oekonomen unterscheiden zwischen *produktiven Investitionen* und Konsumkrediten.", "Nie każdy dług jest taki sam: ekonomiści odróżniają *pożyczki inwestycyjne* od bieżącej konsumpcji."),
        T("When a state issues 30-year sovereign bonds to construct a high-speed rail line, a nuclear power plant, or advanced semiconductor labs, it creates productive assets.", "Finanziert der Staat ueber 30-jaehrige Anleihen Schnellbahntrassen, Hochschulen oder Netze, entstehen echte Vermoegenswerte.", "Gdy państwo emituje 30-letnie obligacje na budowę kolei dużych prędkości, elektrowni czy laboratoriów, tworzy trwały majątek."),
        T("Those modern assets accelerate private commerce, train skilled workers, and generate more tax revenue than the bond's interest payments.", "Diese Infrastruktur staerkt die Wirtschaft, bildet Fachkraefte aus und erwirtschaftet kuenftig mehr Steuern als Zinskosten.", "Taka infrastruktura napędza gospodarkę, podnosi kwalifikacje obywateli i generuje podatki przewyższające koszty obsługi długu."),
      ],
      ProductiveBorrowingDiagram,
    ),
    animatedBeat(
      [
        T("To judge whether a national debt is dangerous, we compare it against the size of the whole economy using the *Debt-to-GDP ratio*.", "Ob Staatsschulden tragfaehig sind, misst man an der Wirtschaftskraft: der *Schuldenstandsquote zum BIP*.", "Bezpieczeństwo długu publicznego mierzy się relacją do siły gospodarki: *wskaźnikiem długu do PKB*."),
        T("A mortgage of 200,000 euros is crushing for someone earning 10,000 euros a year, but easily manageable for someone earning 200,000 euros.", "Ein Kredit von 200.000 Euro erdrueckt jemanden mit 10.000 Euro Einkommen, ist aber fuer einen Gutverdiener tragbar.", "Kredyt w wysokości 200 tysięcy euro zrujnuje osobę zarabiającą 10 tysięcy rocznie, lecz jest łatwy do spłaty dla kogoś z pensją 200 tysięcy."),
        T("If a nation's economy grows faster than its debt accumulation, its debt burden naturally shrinks in proportion even without austerity.", "Waechst das Bruttoinlandsprodukt rascher als die Schuldenzinsen, sinkt die reale Last voellig ohne schmerzhaften Sparkurs.", "Jeśli gospodarka kraju rośnie szybciej niż przyrasta zadłużenie, względny ciężar długu maleje samoczynnie."),
      ],
      DebtToGDPDiagram,
    ),
    animatedBeat(
      [
        T("Maintaining fiscal credibility is essential for long-term national independence and resilience.", "Solide Staatsfinanzen sind das Rueckgrat staatlicher Souveraenitaet und Krisenfestigkeit.", "Wiarygodność fiskalna stanowi fundament niezależności i odporności każdego państwa na wstrząsy."),
        T("Countries with prudent finances can borrow at rock-bottom interest rates to support citizens during unexpected pandemics, wars, or natural floods.", "Finanziell solide Staaten koennen in Krisen wie Pandemien oder Naturkatastrophen zu Niedrigzinsen Hilfe leisten.", "Kraje o zdrowych finansach mogą w chwilach wojen, powodzi czy pandemii tanio pożyczyć środki na pomoc obywatelom."),
        T("By balancing investment for tomorrow with fiscal discipline today, democracies protect both current well-being and future generations.", "Indem eine Demokratie Zukunftsinvestitionen mit Sparsamkeit verbindet, schuetzt sie Gegenwart und Nachkommen gleichermassen.", "Łącząc odważne inwestycje rozwojowe z dyscypliną budżetową, społeczeństwo dba o teraźniejszość i o przyszłość swoich dzieci."),
      ],
      IntergenerationalResponsibilityDiagram,
    ),
  ],
  toyIntro: T(
    "Manage the sovereign bond issuance: issue bonds to fund high-return energy infrastructure without letting interest payments swamp the budget.",
    "Steuere die Staatsverschuldung: Begib Staatsanleihen fuer Netze, ohne dass Zinszahlungen den Haushalt erdruecken.",
    "Zarządzaj emisją obligacji skarbowych: pożyczaj środki na nowoczesną energetykę, pilnując, by koszty odsetek nie zdusiły budżetu."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the difference between a country's annual budget deficit and its national debt?",
        "Was ist der Unterschied zwischen dem jaehrlichen Haushaltsdefizit und den gesamten Staatsschulden?",
        "Jaka jest różnica między rocznym deficytem budżetowym a długiem publicznym kraju?",
      ),
      options: [
        { text: T("The deficit is the single-year shortfall when annual spending exceeds revenue, while the national debt is the cumulative total of all past unpaid borrowing", "Das Defizit ist das jaehrliche Minus im Haushalt, waehrend die Staatsschulden die Gesamtsumme aller unbeglichenen Altschulden darstellen", "Deficyt to jednoroczna różnica między wydatkami a dochodami państwa, podczas gdy dług publiczny to skumulowana suma wszystkich przeszłych pożyczek"), correct: true },
        { text: T("Deficits only happen in summer, while national debt only happens on snowy days", "Defizite entstehen nur im Sommer, waehrend Staatsschulden nur bei Schneefall existieren", "Deficyt powstaje wyłącznie latem, a dług publiczny tylko w mroźne zimowe dni"), correct: false },
        { text: T("National debt is money owed by kindergarten students for toy building blocks", "Staatsschulden sind Gelder, die Kindergartenkinder fuer Bauklotzverleih schulden", "Dług publiczny to należności przedszkolaków za wypożyczone klocki"), correct: false },
      ],
      hint: T(
        "Remember the bathtub metaphor: tap flow versus water level in the tub.",
        "Erinnere dich an das Badewannenbeispiel: Der Wasserhahnzulauf entspricht dem Defizit, der Füllstand den Schulden.",
        "Przypomnij sobie metaforę wanny: woda płynąca z kranu to deficyt, a poziom wody w wannie to dług."),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is borrowing to build a high-speed railway or university research center considered 'productive debt'?",
        "Warum gilt die Kreditaufnahme fuer Bahnstrecken oder Hochschullabore als 'produktive Verschuldung'?",
        "Dlaczego pożyczanie pieniędzy na budowę kolei dużych prędkości lub laboratoriów uniwersyteckich uznaje się za 'dług produktywny'?",
      ),
      options: [
        { text: T("Because the infrastructure expands long-term productivity and future GDP, generating tax returns that comfortably surpass the debt interest", "Weil die Infrastruktur das kuenftige Wirtschaftswachstum staerkt und mehr Steuern einbringt als an Zinsen anfallen", "Ponieważ taka infrastruktura podnosi długoterminową produktywność gospodarki i generuje przyszłe podatki przewyższające koszty odsetek"), correct: true },
        { text: T("Because trains can run on free magical starlight without paying conductor wages", "Weil Zuege mit Sternenstaub fahren und Lokfuehrer kein Gehalt verlangen", "Ponieważ pociągi jeżdżą na darmowy pył gwiezdny i maszynistom nie trzeba płacić pensji"), correct: false },
        { text: T("Because university buildings are made of solid platinum bricks", "Weil Universitaetsgebaeude aus reinem Platin errichtet werden", "Ponieważ mury uniwersyteckie stawia się wyłącznie z platynowych cegieł"), correct: false },
      ],
      hint: T(
        "Think about investments that pay for themselves through future economic wealth generation.",
        "Ueberlege, welche Investitionen sich durch kuenftigen Wohlstandsgewinn von selbst refinanzieren.",
        "Pomyśl o inwestycjach, które z czasem zwracają się z nawiązką dzięki przyspieszeniu rozwoju gospodarczego."),
    },
    {
      kind: "widget",
      prompt: T(
        "Clarify the relationship between sovereign debt and annual fiscal deficits.",
        "Klaere den Zusammenhang zwischen Staatsschulden und dem jaehrlichen Haushaltsdefizit.",
        "Wyjaśnij relację między długiem publicznym a rocznym deficytem budżetowym.",
      ),
      Widget: DeficitWidget,
      hint: T(
        "Focus on the distinction between flow (deficit) and accumulated stock (debt).",
        "Achte auf den Unterschied zwischen Stromgroesse (Defizit) und Bestandsgroesse (Schulden).",
        "Zwróć uwagę na różnicę między bieżącym strumieniem (deficyt) a skumulowanym zasobem (dług)."),
    },
  ],
  askDad: T(
    "Ask your parent: How does taking on a home mortgage compare to a country borrowing money to build bridges or power grids?",
    "Frage deine Eltern: Wie laesst sich ein Immobilienkredit fuer ein Haus mit staatlichen Anleihen fuer Bruecken oder Stromnetze vergleichen?",
    "Zapytaj rodziców: Czym różni się kredyt hipoteczny na budowę domu od państwowych obligacji emitowanych na budowę mostów czy sieci energetycznych?"),
  realLife: {
    title: T(
      "Real world: Alexander Hamilton, the US national debt as a national blessing, and Germany's 'Schuldenbremse'",
      "Echte Welt: Alexander Hamiltons Gruendung der US-Staatsfinanzen und die deutsche Schuldenbremse",
      "Prawdziwy świat: Alexander Hamilton i dług publiczny USA oraz niemiecki hamulec długu (Schuldenbremse)",
    ),
    body: T(
      "In 1790, the first US Secretary of the Treasury, Alexander Hamilton, persuaded Congress to assume state debts from the Revolutionary War, creating a unified federal bond market and establishing global creditworthiness that funded American expansion. In contrast, in 2009, Germany passed the constitutional 'Schuldenbremse' (debt brake), capping the structural federal deficit at 0.35% of GDP to prevent unsustainable accumulation during normal peacetime economic years.",
      "1790 ueberzeugte der erste US-Finanzminister Alexander Hamilton den Kongress, die Kriegsschulden der Bundesstaaten zu uebernehmen, was einen starken Anleihemarkt schuf und das Vertrauen der Weltmaerkte sicherte. Im Jahr 2009 verankerte Deutschland hingegen die 'Schuldenbremse' im Grundgesetz, die das strukturelle Bundesdefizit auf 0,35% des BIP begrenzt, um Generationengerechtigkeit zu wahren.",
      "W 1790 roku pierwszy sekretarz skarbu USA Alexander Hamilton przekonał Kongres do przejęcia długów wojennych poszczególnych stanów, tworząc jednolity rynek obligacji federalnych i budując zaufanie inwestorów. Z kolei w 2009 roku Niemcy wprowadziły do konstytucji tzw. hamulec zadłużenia (Schuldenbremse), ograniczający strukturalny deficyt do 0,35% PKB, aby chronić finanse przed niekontrolowanym wzrostem długu."),
  },
  factCard: {
    claims: [
      { text: T("Alexander Hamilton submitted his 'Report on Public Credit' to Congress in January 1790, laying the institutional bedrock of US sovereign debt.", "Alexander Hamilton legte im Januar 1790 seinen wegweisenden 'Report on Public Credit' vor dem US-Kongress vor.", "Alexander Hamilton przedłożył w Kongresie swój przełomowy 'Raport o kredycie publicznym' w styczniu 1790 roku."), source: "https://founders.archives.gov/documents/Hamilton/01-06-02-0076-0002" },
      { text: T("The Maastricht Treaty (1992) established European fiscal convergence criteria, targeting government deficits below 3% and public debt below 60% of GDP.", "Der Vertrag von Maastricht setzte 1992 die europaeischen Konvergenzkriterien fest (maximal 3% Defizit und 60% Schuldenstand zum BIP).", "Traktat z Maastricht (1992) wyznaczył europejskie kryteria konwergencji: deficyt poniżej 3% i dług publiczny poniżej 60% PKB."), source: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:11992M/TXT" },
      { text: T("Article 109 and Article 115 of the German Basic Law codify the 'Schuldenbremse' (debt brake), restricting structural federal deficits to 0.35% of GDP.", "Artikel 109 und 115 des Grundgesetzes verankern die deutsche Schuldenbremse fuer Bund und Laender.", "Artykuły 109 i 115 Ustawy Zasadniczej RFN określają zasady niemieckiego hamulca długu, ograniczając deficyt federalny do 0,35% PKB."), source: "https://www.gesetze-im-internet.de/gg/art_115.html" },
      { text: T("John Maynard Keynes published 'The General Theory of Employment, Interest and Money' in 1936, advocating countercyclical deficit spending during severe recessions.", "John Maynard Keynes begruendete 1936 die antizyklische Finanzpolitik zur Abfederung von Wirtschaftskrisen.", "John Maynard Keynes w 1936 roku opublikował 'Ogólną teorię zatrudnienia, procentu i pieniądza', postulując antycykliczne wydatki budżetowe w kryzysie."), source: "https://www.hetwebsite.net/het/profiles/keynes.htm" },
      { text: T("The International Monetary Fund (IMF) publishes biannual Fiscal Monitor reports tracking global government deficits, gross debt stocks, and borrowing sustainability.", "Der Internationale Waehrungsfonds (IWF) ueberwacht im 'Fiscal Monitor' weltweit die Tragfaehigkeit von Staatsschulden.", "Międzynarodowy Fundusz Walutowy (MFW) w raportach 'Fiscal Monitor' bada stabilność zadłużenia i deficytów państw świata."), source: "https://www.imf.org/en/Publications/FM" },
    ],
    simplified: [
      T(
        "Complex macro fiscal dynamics and sovereign bond spreads are rendered approachable using bathtub flow/stock analogies and sensible household mortgage comparisons.",
        "Komplexe makrooekonomische Haushaltsregeln und Renditeaufschlaege wurden anhand von Badewannen-Analogien und Baufinanzierungsbeispielen anschaulich erklaert.",
        "Złożone mechanizmy finansów publicznych i spreadów obligacji skarbowych wyjaśniono za pomocą metafory wanny oraz porównania do rodzinnego kredytu mieszkaniowego."),
    ],
  },
};
