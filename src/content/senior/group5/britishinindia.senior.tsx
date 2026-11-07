import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function ColonialTradeDiagram({ lang, step }: DiagramProps) {
  const abhiName = lang === "pl" ? "Adam" : lang === "de" ? "Arne" : "Abhi";
  const label = lang === "pl" ? "Adam bada brytyjską Kompanię Wschodnioindyjską: cła, deindustrializację i odpływ bogactwa" : lang === "de" ? "Arne untersucht die Britische Ostindien-Kompanie: Zoelle, Deindustrialisierung und Rohstoffabfluss" : "Abhi examining the British East India Company: tariffs, de-industrialization, and colonial wealth drain";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#dc2626" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#dc2626" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#991b1b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#b91c1c" stroke="#dc2626" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fecaca">{abhiName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#dc2626" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fee2e2">
          🏭 {lang === "pl" ? "Kompania Wschodnioindyjska (EIC)" : lang === "de" ? "Die East India Company (EIC)" : "East India Company Corporate Rule"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#b91c1c" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="16">🧵 📉 🚢</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f87171">
            {lang === "pl" ? "Upadek rękodzieła • Asymetria celna" : lang === "de" ? "Niedergang der Weberei • Einseitige Zoelle" : "De-industrialization • Unequal Tariff Barrier"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#991b1b" />
          <text x="250" y="170" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Z eksportera w dostawcę surowców" : lang === "de" ? "Vom Textil-Exporteur zum Rohstofflieferanten" : "From global producer to raw commodity exporter"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#fecaca">
            {lang === "pl" ? "Brytyjskie maszyny wyparły indyjskich tkaczy" : lang === "de" ? "Britische Fabriken verdraengten indische Handweber" : "Manchester mills flooded markets duty-free"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DeindustrializationMechanismDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Mechanizm asymetrii celnej: cła na indyjskie tkaniny w Anglii i brak ceł w Indiach" : lang === "de" ? "Zollasymmetrie: Hohe Schutzzoelle in England, Nullzoelle in Indien" : "Tariff asymmetry: heavy tariffs in Britain, zero protection in India";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="40" y="50" width="130" height="70" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="105" y="75" textAnchor="middle" fontSize="16">🇬🇧 🏭</text>
        <text x="105" y="95" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">Britain (Manchester)</text>
        <text x="105" y="108" textAnchor="middle" fontSize="7.5" fill="#1d4ed8">Steam-powered mills</text>

        <rect x="230" y="50" width="130" height="70" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="295" y="75" textAnchor="middle" fontSize="16">🇮🇳 🧵</text>
        <text x="295" y="95" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b">India (Bengal Weavers)</text>
        <text x="295" y="108" textAnchor="middle" fontSize="7.5" fill="#7f1d1d">Artisanal handlooms</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f87171">
            Asymmetric Tariff Policy: 70-80% on Indian textiles into Britain
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl" ? "Jednocześnie brytyjskie tkaniny wwożono do Indii bez jakichkolwiek ceł" : lang === "de" ? "Waehrend britische Stoffe zollfrei nach Indien stroemten" : "While British industrial cloth entered India with virtually zero import duties"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#b91c1c" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Polityka kolonialna celowo zniszczyła tradycyjne ośrodki produkcyjne" : lang === "de" ? "Koloniale Handelspolitik zerstoerte einheimische Produktionszentren" : "Commercial policy systematically dismantled native manufacturing centers"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DrainOfWealthTheoryDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Teoria drenażu bogactwa Dadabhai Naorojiego: transfer podatków bez rekompensaty" : lang === "de" ? "Dadabhai Naorojis Theorie des Wohlstandsabflusses ('Drain of Wealth')" : "Dadabhai Naoroji's Drain of Wealth theory: uncompensated fiscal extraction";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fefce8" stroke="#ca8a04" strokeWidth="2" />
      <g>
        <circle cx="90" cy="95" r="32" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
        <text x="90" y="90" textAnchor="middle" fontSize="18">🌾 🪙</text>
        <text x="90" y="110" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#991b1b">Indian Land Taxes</text>

        <circle cx="310" cy="95" r="32" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="310" y="90" textAnchor="middle" fontSize="18">🏛️ 💼</text>
        <text x="310" y="110" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e40af">Home Charges (UK)</text>

        <path d="M 125 95 L 275 95" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrow)" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="140" width="320" height="42" rx="6" fill="#713f12" />
          <text x="200" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Dadabhai Naoroji: The "Drain of Wealth" Theory (1901)
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="8.5" fill="#fef08a">
            {lang === "pl" ? "Podatki zebrane w Indiach służyły do zakupu surowców wywożonych do Londynu" : lang === "de" ? "In Indien erhobene Steuern finanzierten Rohstoffexporte nach London" : "Taxes collected from Indian farmers bought exports without any commercial return"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Brak reinwestycji kapitału w lokalną edukację i przemysł" : lang === "de" ? "Fehlende Reinvestition in lokale Bildung und Industrie" : "Absence of capital reinvestment inside the domestic economy"}
          </text>
        </g>
      )}
    </svg>
  );
}

function InfrastructureExtractiveDesignDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Projekt sieci kolejowej: z kopalń i pól bawełny wprost do portów morskich" : lang === "de" ? "Das Schienennetz: Direkte Anbindung von Minen und Baumwollfeldern an Haefen" : "Railway design: routing raw agricultural commodities straight to ocean export ports";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <circle cx="80" cy="90" r="30" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="80" y="85" textAnchor="middle" fontSize="16">🌾 ⛏️</text>
        <text x="80" y="105" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#92400e">Inland Resources</text>

        <rect x="160" y="75" width="80" height="30" rx="4" fill="#334155" />
        <text x="200" y="94" textAnchor="middle" fontSize="14">🚂 🛤️</text>

        <circle cx="320" cy="90" r="30" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="320" y="85" textAnchor="middle" fontSize="16">🚢 ⚓</text>
        <text x="320" y="105" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#0369a1">Export Ports</text>

        <line x1="110" y1="90" x2="160" y2="90" stroke="#475569" strokeWidth="2.5" />
        <line x1="240" y1="90" x2="290" y2="90" stroke="#475569" strokeWidth="2.5" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f8fafc">
            Guaranteed return contracts for British railway investors
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#94a3b8">
            {lang === "pl" ? "Koleje łączyły interior z portami, a nie miasta między sobą" : lang === "de" ? "Schienen verbanden das Hinterland mit Haefen, nicht Regionen untereinander" : "Railways connected mines to ports rather than stimulating internal domestic trade"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#0f766e" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Infrastruktura zorientowana na eksport surowca, nie rozwój lokalnego rynku" : lang === "de" ? "Infrastruktur fuer Rohstoffexport statt fuer lokalen Wohlstand" : "Infrastructure oriented toward raw material extraction over domestic integration"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ColonialLegacyInsightsDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Wnioski z epoki kolonialnej: wolny handel bez suwerenności politycznej" : lang === "de" ? "Lehren der Kolonialzeit: Scheinbar freier Handel ohne politische Souveraenitaet" : "Lessons of the colonial era: asymmetric terms of trade and institutional sovereignty";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
      <g>
        <circle cx="200" cy="80" r="34" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">⚖️ 🏛️</text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#9a3412">Sovereignty</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#7c2d12" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            True economic development requires domestic sovereignty over trade policy
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#ffedd5">
            {lang === "pl" ? "Brak prawa do ochrony własnych rzemieślników doprowadził do biedy" : lang === "de" ? "Ohne Schutz der eigenen Produzenten verarmte die laendliche Bevoelkerung" : "Without authority to enact balanced commercial policy, domestic industries wilt"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Współczesne narody chronią swoje strategiczne technologie i przemysł" : lang === "de" ? "Moderne Staaten foerdern und schuetzen eigene Schluesselindustrien" : "Modern sovereign nations carefully balance open trade with industrial resilience"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [artisanTariff, setArtisanTariff] = useState(30);
  const [importDuty, setImportDuty] = useState(0);
  const artisanIncome = Math.max(1, Math.round(10 - artisanTariff * 0.25 + importDuty * 0.2));
  const isFair = artisanTariff <= 5 && importDuty >= 15;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Export Tariff on Artisans: {artisanTariff}% | Import Duty on Factory Goods: {importDuty}% | Artisan Wage: ${artisanIncome}/wk
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setArtisanTariff(0);
            setImportDuty(20);
            onDone?.();
          }}
        >
          Enact Fair Trade Protections
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setArtisanTariff(40);
            setImportDuty(0);
          }}
        >
          Impose Colonial Extraction Policy
        </button>
      </div>
      <div style={{ padding: "12px", background: isFair ? "#eef8ef" : "#fef2f2", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {isFair
          ? "Sovereign Industrial Vitality: Eliminating punitive tariffs on local craftsmen while protecting developing workshops from predatory dumping allows domestic wealth to multiply!"
          : "Colonial De-industrialization: Punitive foreign duties cripple handlooms while untaxed mass imports eliminate artisan livelihoods."}
      </div>
    </div>
  );
}

function BritishInIndiaWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What was the primary economic mechanism causing India's de-industrialization during the 19th-century colonial era?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Weavers decided to convert their cotton looms into musical flutes</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Asymmetric colonial trade policies imposed heavy tariffs on Indian finished textiles entering Britain while allowing British machine-made cloth to enter India duty-free, wiping out local artisan weavers</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>A flock of carrier pigeons flew away with all the sewing needles in Bengal</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "britishinindia",
  story: [
    animatedBeat(
      [
        T("Meet Abhi. He examines historical trade graphs tracing the tragic collapse of India's textile exports across the 1800s.", "Das ist Arne. Er studiert Wirtschaftsdaten und entdeckt den drastischen Rueckgang indischer Textilproduktion im 19. Jahrhundert.", "Poznaj Adama. Bada wykresy gospodarcze przedstawiające załamanie indyjskiego eksportu tkanin w XIX wieku."),
        T("Following the 1757 Battle of Plassey, the British East India Company transitioned from commercial merchants into imperial tax collectors in Bengal.", "Nach der Schlacht von Plassey 1757 wandelte sich die Britische Ostindien-Kompanie von Haendlern zu Steuereintreibern.", "Po bitwie pod Plassey w 1757 r. brytyjska Kompania Wschodnioindyjska z kupców przekształciła się w poborcę podatkowego w Bengalu."),
        T("With military garrisons and civil courts under corporate control, company officials dictated prices, monopolized trade, and extracted revenue.", "Mit eigener Privatarmee und Behoerden diktierte die Gesellschaft Preise, erzwang Monopole und zog Vermoegen ab.", "Dysponując prywatną armią i urzędami, kompania dyktowała ceny rękodzieła, zmonopolizowała handel i ściągała gigantyczne daniny."),
      ],
      ColonialTradeDiagram,
    ),
    animatedBeat(
      [
        T("As the Industrial Revolution took off in Britain, mechanized factories in Manchester and Lancashire turned out miles of cheap cotton cloth.", "Waehrend der industriellen Revolution webten britische Fabriken in Manchester billige Baumwollstoffe in Massen.", "Wraz z rewolucją przemysłową w Wielkiej Brytanii mechaniczne fabryki w Manchesterze produkowały masowo tanie tkaniny bawełniane."),
        T("To protect their own nascent factories, the British Parliament slapped tariffs of 70% to 80% on fine Indian handloom textiles arriving in London.", "Um eigene Fabriken zu schuetzen, verhaengte das britische Parlament Zoelle von 70% bis 80% auf indische Textilien.", "Aby chronić własny przemysł, brytyjski parlament nałożył cła zaporowe rzędu 70-80% na indyjskie tekstylia wwożone do Londynu."),
        T("Simultaneously, colonial administrators forced India to accept British factory goods with near-zero import duties, crushing local handloom artisans.", "Gleichzeitig durften britische Stoffe fast zollfrei nach Indien stroemen, was die Existenz indischer Weber zerstoerte.", "Jednocześnie władze kolonialne zmusiły Indie do bezcłowego wpuszczania brytyjskich towarów, co zrujnowało miliony lokalnych tkaczy."),
      ],
      DeindustrializationMechanismDiagram,
    ),
    animatedBeat(
      [
        T("In 1901, the pioneering Indian economist Dadabhai Naoroji formulated the famous 'Drain of Wealth' theory.", "1901 formulierte der Oekonom Dadabhai Naoroji die beruehmte Theorie des Wohlstandsabflusses ('Drain of Wealth').", "W 1901 roku indyjski ekonomista Dadabhai Naoroji sformułował słynną teorię 'drenażu bogactwa' (Drain of Wealth)."),
        T("He proved that tax revenues extracted from Indian peasants were used by the colonial government to purchase raw cotton, jute, and tea for export to Britain.", "Er bewies, dass Steuern indischer Bauern genutzt wurden, um Rohstoffe wie Baumwolle und Tee fuer den Export nach London zu kaufen.", "Wykazał, że podatki ściągane od indyjskich chłopów służyły do skupowania surowców (bawełny, juty, herbaty) wywożonych do Londynu bez ekwiwalentu."),
        T("Unlike sovereign states that reinvest tax revenue into domestic schools, clinics, and infrastructure, colonial surpluses were transferred abroad as 'Home Charges'.", "Statt Steuern in Schulen, Spitaeler und heimische Betriebe zu investieren, floss das Kapital als Abgabe nach London ab.", "Zamiast inwestować podatki w miejscowe szkoły, szpitale i fabryki, nadwyżki transferowano za granicę jako tzw. koszty zarządu (Home Charges)."),
      ],
      DrainOfWealthTheoryDiagram,
    ),
    animatedBeat(
      [
        T("Colonial authorities laid down thousands of kilometers of railway lines across India starting in the 1850s.", "Ab den 1850er-Jahren bauten die Kolonialherren tausende Kilometer Eisenbahnstrecken durch Indien.", "Od lat 50. XIX wieku władze kolonialne wybudowały w Indiach tysiące kilometrów linii kolejowych."),
        T("These rail networks were specifically routed to connect interior cotton fields and coal mines directly to coastal export ports like Bombay and Calcutta.", "Die Strecken verbanden Rohstofffelder und Minen gezielt mit Haefen wie Bombay, um Gueter rasch zu verschiffen.", "Trasy te projektowano celowo tak, by łączyć pola bawełny i kopalnie bezpośrednio z portami morskimi, takimi jak Bombaj czy Kalkuta."),
        T("British investors in these railway lines were guaranteed a 5% annual return paid directly out of taxes collected from Indian taxpayers, regardless of commercial profit.", "Britischen Investoren wurde eine Rendite von 5% garantiert, finanziert aus den Steuern indischer Buerger.", "Brytyjskim inwestorom gwarantowano 5% rocznego zysku wypłacanego bezpośrednio z podatków indyjskich obywateli, niezależnie od rentowności kolei."),
      ],
      InfrastructureExtractiveDesignDiagram,
    ),
    animatedBeat(
      [
        T("The economic history of colonial extraction illustrates the vital importance of economic and political sovereignty.", "Die Wirtschaftsgeschichte des Kolonialismus zeigt den unersetzlichen Wert politischer Souveraenitaet fuer den Wohlstand.", "Historia kolonialnego drenażu gospodarczego dowodzi, jak kluczowe znaczenie ma suwerenność polityczna dla dobrobytu obywateli."),
        T("Without the freedom to set their own tariff laws, support young industries, and invest tax wealth domestically, nations face structural impoverishment.", "Ohne eigene Handelspolitik und heimische Investitionen verarmen Laender trotz harter Arbeit ihrer Bevoelkerung.", "Bez prawa do kształtowania własnych ceł, wspierania rodzimego przemysłu i reinwestowania podatków na miejscu, naród ubożeje mimo ciężkiej pracy."),
        T("Modern international trade agreements must be transparent, reciprocal, and founded upon mutual respect between sovereign partners.", "Moderner Welthandel muss transparent, partnerschaftlich und auf Augenhoehe gestaltet sein.", "Nowoczesny handel międzynarodowy musi być przejrzysty, partnerski i oparty na wzajemnym poszanowaniu interesów obydwu stron."),
      ],
      ColonialLegacyInsightsDiagram,
    ),
  ],
  toyIntro: T(
    "Balance trade policies: contrast colonial tariff extraction with sovereign industrial protections to see how handloom artisan incomes respond.",
    "Steuere die Handelspolitik: Vergleiche koloniale Ausbeutungstarife mit souveraener Industriepolitik und beobachte das Einkommen der Handweber.",
    "Zarządzaj polityką celną: porównaj kolonialny drenaż celny z suwerenną ochroną przemysłu i zobacz, jak zmienia się dochód tkaczy."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What was the core thesis of Dadabhai Naoroji's 1901 'Drain of Wealth' economic theory?",
        "Was war der Kern von Dadabhai Naorojis Oekonomie-Theorie 'Drain of Wealth' (1901)?",
        "Co było istotą teorii 'drenażu bogactwa' (Drain of Wealth) Dadabhai Naorojiego z 1901 roku?",
      ),
      options: [
        { text: T("That Indian tax revenues were extracted by the colonial government to purchase and export raw resources to Britain without bringing any commercial or social reinvestment back to India", "Dass in Indien erhobene Steuern genutzt wurden, um Rohstoffe nach Grossbritannien zu exportieren, ohne dass Gegenwerte zurueckflossen", "Że podatki ściągane od mieszkańców Indii służyły do zakupu i wywozu surowców do Wielkiej Brytanii bez żadnego ekwiwalentu ani inwestycji w Indiach"), correct: true },
        { text: T("That copper pipes underneath the city of Delhi were leaking bathwater into the ocean", "Dass Kupferrohre unter Delhi warmes Badewasser ins Meer leiteten", "Że rury kanalizacyjne pod Delhi przeciekały i odprowadzały wodę do oceanu"), correct: false },
        { text: T("That gold coins were turning into breadcrumbs whenever it rained in monsoon season", "Dass sich Goldmuenzen bei Monsunregen in Brotkruemel verwandelten", "Że złote monety zamieniały się w okruchy chleba podczas deszczów monsunowych"), correct: false },
      ],
      hint: T(
        "Think about what happened to the tax revenues collected in India and where they were spent.",
        "Denke darueber nach, wohin die in Indien erhobenen Steuergelder letztlich flossen.",
        "Pomyśl o tym, dokąd transferowano podatki zebrane w Indiach i czy były one reinwestowane w kraju."),
    },
    {
      kind: "choice",
      prompt: T(
        "How did 19th-century colonial tariff policies contribute to India's de-industrialization?",
        "Wie fuehrte die koloniale Zollpolitik des 19. Jahrhunderts zur Deindustrialisierung Indiens?",
        "W jaki sposób XIX-wieczna kolonialna polityka celna doprowadziła do deindustrializacji Indii?",
      ),
      options: [
        { text: T("By placing punitive tariffs (70-80%) on Indian manufactured textiles entering Britain while forcing India to import British machine goods with zero tariff protections", "Durch hohe Schutzzoelle auf indische Stoffe in London bei gleichzeitig zollfreiem Import britischer Fabrikwaren nach Indien", "Poprzez nałożenie wysokich ceł zaporowych na indyjskie tkaniny w Anglii przy jednoczesnym bezcłowym wwozie brytyjskich wyrobów fabrycznych do Indii"), correct: true },
        { text: T("By mandating that cotton fabric only be woven using giant wooden chopsticks", "Indem vorgeschrieben wurde, Stoffe nur noch mit riesigen Essstaebchen zu weben", "Nakazując tkanie tkanin wyłącznie za pomocą wielkich drewnianych pałeczek"), correct: false },
        { text: T("By turning all weaving looms into playground swings for monkeys", "Indem alle Webstuehle in Schaukeln fuer Affen umgebaut wurden", "Zamieniając wszystkie krosna tkackie w huśtawki dla małp"), correct: false },
      ],
      hint: T(
        "Examine the asymmetry between British import duties and Indian import duties.",
        "Achte auf das Ungleichgewicht der Zoelle zwischen beiden Laendern.",
        "Zwróć uwagę na nierówność ceł nakładanych w Londynie i tych stosowanych w portach indyjskich."),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze the structural cause behind India's transition from a textile exporter to a raw material supplier.",
        "Analysiere die Ursache fuer Indiens Wandel vom Textil-Exporteur zum Rohstofflieferanten.",
        "Przeanalizuj przyczyny przekształcenia Indii z eksportera tkanin w dostawcę surowców naturalnych.",
      ),
      Widget: BritishInIndiaWidget,
      hint: T(
        "Focus on asymmetric trade tariffs and the destruction of domestic artisan handloom competitiveness.",
        "Achte auf ungleiche Zoelle und den Zusammenbruch der traditionellen Handweberei.",
        "Skup się na nierównych cłach i załamaniu konkurencyjności tradycyjnego rękodzieła."),
    },
  ],
  askDad: T(
    "Ask your parent: Why do countries today protect their key industries and set their own trade tariffs, rather than letting foreign powers decide for them?",
    "Frage deine Eltern: Warum schuetzen Laender heute ihre Schluesselindustrien und bestimmen ihre Zoelle selbst, statt Fremden die Entscheidung zu ueberlassen?",
    "Zapytaj rodziców: Dlaczego państwa na świecie same decydują o swoich cłach i chronią rodzimy przemysł, zamiast oddawać tę władzę obcym mocarstwom?"),
  realLife: {
    title: T(
      "Real world: Shashi Tharoor's 'Inglorious Empire: What the British Did to India'",
      "Echte Welt: Shashi Tharoor ueber die wirtschaftlichen Folgen der Kolonialherrschaft in Indien",
      "Prawdziwy świat: Shashi Tharoor o skutkach gospodarczych rządów kolonialnych w Indiach",
    ),
    body: T(
      "In his widely acclaimed 2017 historical work 'Inglorious Empire', Indian diplomat and parliamentarian Shashi Tharoor assembled extensive historical and economic documentation regarding the East India Company and the British Raj. He demonstrated that India's share of global GDP fell from approximately 23% in 1700 to below 4% at the time of independence in 1947, demonstrating how imperial governance dismantled domestic industry to serve metropolitan manufacturing centers.",
      "In seinem Werk 'Inglorious Empire' (2017) analysiert der Diplomat Shashi Tharoor die Wirtschaftsgeschichte der Kolonialzeit. Er zeigt, dass Indiens Anteil an der Weltwirtschaft von rund 23% im Jahr 1700 auf unter 4% bei der Unabhaengigkeit 1947 fiel. Dies veranschaulicht, wie koloniale Strukturen die heimische Wirtschaft laehmten.",
      "W głośnej książce 'Inglorious Empire' (2017) dyplomata i poseł Shashi Tharoor zebrał szczegółowe dane historyczne dotyczące rządów Kompanii i Korony Brytyjskiej. Wykazał, że udział Indii w globalnym PKB spadł z około 23% w 1700 roku do poniżej 4% w momencie odzyskania niepodległości w 1947 roku, pokazując skutki deindustrializacji na rzecz metropolii."),
  },
  factCard: {
    claims: [
      { text: T("Dadabhai Naoroji published 'Poverty and Un-British Rule in India' in 1901, formulating the quantitative drain-of-wealth framework.", "Dadabhai Naoroji veroeffentlichte 1901 sein Hauptwerk ueber den Wohlstandsabfluss aus Indien.", "Dadabhai Naoroji opublikował w 1901 r. 'Poverty and Un-British Rule in India', przedstawiając ramy ilościowe drenażu bogactwa."), source: "https://archive.org/details/povertyandunbri00naorgoog" },
      { text: T("Economic historian Amiya Kumar Bagchi (1976) documented the historical de-industrialization of Gangetic Bihar and Bengal throughout the 19th century.", "Amiya Kumar Bagchi belegte 1976 die Deindustrialisierung Bengalens im 19. Jahrhundert.", "Historyk gospodarczy Amiya Kumar Bagchi (1976) udokumentował proces deindustrializacji Bengalu i Niziny Gangesu w XIX wieku."), source: "https://www.jstor.org/stable/20779929" },
      { text: T("Shashi Tharoor's 'Inglorious Empire: What the British Did to India' was published by Penguin Random House in 2017.", "Shashi Tharoors 'Inglorious Empire' erschien 2017 und fasst wirtschaftliche Schaeden der Kolonialzeit zusammen.", "Książka Shashiego Tharoora 'Inglorious Empire' ukazała się w 2017 r., analizując straty gospodarcze czasów kolonialnych."), source: "https://www.penguin.co.uk/books/305943/inglorious-empire-by-shashi-tharoor/9780141987149" },
      { text: T("Under the 1850s guarantee system, the colonial government ensured railway investors a 5% sterling dividend funded by Indian taxpayer revenue.", "Britischen Eisenbahn-Investoren wurden in den 1850ern jaehrlich 5% Rendite aus indischen Steuern garantiert.", "W latach 50. XIX w. inwestorom kolejowym zagwarantowano w prawie kolonialnym 5% zysku rocznie pokrywanego z podatków ludności Indii."), source: "https://www.jstor.org/stable/2598588" },
      { text: T("The 1757 Battle of Plassey led to the 1765 Treaty of Allahabad, granting the British East India Company the Diwani (tax collection rights) over Bengal.", "Der Vertrag von Allahabad von 1765 uebertrug der East India Company das Recht zur Steuereintreibung (Diwani) in Bengalen.", "Traktat w Allahabadzie z 1765 r. przyznał Kompanii Wschodnioindyjskiej prawo poboru podatków (Diwani) w Bengalu, Biharze i Orisie."), source: "https://www.britannica.com/event/Treaty-of-Allahabad" },
    ],
    simplified: [
      T(
        "Complex imperial customs ledgers, colonial Home Charges accounts, and multi-decade agricultural export schedules are translated into interactive trade-tariff balancing toys and accessible economic explanations.",
        "Komplexe Kolonialzollakten und historische Abrechnungen wurden durch anschauliche Zollregler und verstaendliche Wirtschaftsanalysen aufbereitet.",
        "Skomplikowane kolonialne rejestry celne i rachunki transferowe przedstawiono za pomocą czytelnych suwaków ceł i przystępnych wyjaśnień mechanizmów wymiany."),
    ],
  },
};
