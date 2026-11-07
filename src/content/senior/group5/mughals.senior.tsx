import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function MughalsTradeDiagram({ lang, step }: DiagramProps) {
  const aaravName = lang === "pl" ? "Adam" : lang === "de" ? "Arne" : "Aarav";
  const label = lang === "pl" ? "Adam bada szlaki handlowe imperium Mogołów: bawełna, jedwab i srebro" : lang === "de" ? "Arne untersucht die Handelswege des Mogulreichs: Textilien, Seide und Silber" : "Aarav studying Mughal trade networks: global textile dominance and bullion inflows";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#d97706" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#d97706" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#92400e" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#b45309" stroke="#d97706" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fde68a">{aaravName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#d97706" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fef3c7">
          🏺 {lang === "pl" ? "Mogołowie: Warsztat Świata (1600)" : lang === "de" ? "Das Mogulreich: Werkstatt der Welt" : "Mughal Empire: The World Workshop"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#b45309" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="16">🧵 ⛵ 🪙</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fcd34d">
            {lang === "pl" ? "25% globalnego PKB • Tkaniny i Srebro" : lang === "de" ? "25% des Welt-BIP • Textil & Silber" : "25% Global GDP • Textiles & Silver Sink"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#78350f" />
          <text x="250" y="170" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Złoty wiek rzemiosła i handlu" : lang === "de" ? "Goldenes Zeitalter des Welthandels" : "A pre-industrial manufacturing powerhouse"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#fde68a">
            {lang === "pl" ? "Dakański muślin i kaliko pożądane na całym świecie" : lang === "de" ? "Feinste Seide und Baumwolle weltweit begehrt" : "Muslin and calico traded across Afro-Eurasia"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ManufacturingPowerhouseDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Przewaga produkcyjna: indyjski warsztat włókienniczy i napływ kruszców" : lang === "de" ? "Produktionsvorsprung: Indische Webereien und globaler Silberzufluss" : "Production supremacy: Indian handlooms and the global silver drain";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafaf9" stroke="#78350f" strokeWidth="2" />
      <g>
        <circle cx="90" cy="110" r="32" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="90" y="105" textAnchor="middle" fontSize="18">🧵</text>
        <text x="90" y="125" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#92400e">Textiles</text>

        <circle cx="310" cy="110" r="32" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="310" y="105" textAnchor="middle" fontSize="18">🪙</text>
        <text x="310" y="125" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#1e40af">Silver Bullion</text>

        <path d="M 125 95 Q 200 60 275 95" stroke="#059669" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" />
        <path d="M 275 125 Q 200 160 125 125" stroke="#d97706" strokeWidth="2.5" fill="none" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="175" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="193" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fde68a">
            Bengal Subah: Handloom specialization and immense trade surpluses
          </text>
          <text x="200" y="207" textAnchor="middle" fontSize="8.5" fill="#e2e8f0">
            {lang === "pl" ? "Srebro z obu Ameryk płynęło przez Europę prosto do Indii" : lang === "de" ? "Amerikanisches Silber floss ueber Europa nach Indien" : "Spanish American silver flowed through Europe straight into Indian markets"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CurrencyUnifiedEmpireDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Zunifikowany system walutowy: rupia srebrna i złoty mohur" : lang === "de" ? "Einheitliches Waehrungssystem: Silberne Rupie und goldener Mohur" : "Standardized monetary system: the silver rupee and golden mohur";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fefce8" stroke="#ca8a04" strokeWidth="2" />
      <g>
        <circle cx="140" cy="85" r="34" fill="#e2e8f0" stroke="#64748b" strokeWidth="2.5" />
        <text x="140" y="80" textAnchor="middle" fontSize="16">🥈</text>
        <text x="140" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#334155">Silver Rupee</text>

        <circle cx="260" cy="85" r="34" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
        <text x="260" y="80" textAnchor="middle" fontSize="16">🥇</text>
        <text x="260" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#854d0e">Gold Mohur</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="140" width="320" height="42" rx="6" fill="#713f12" />
          <text x="200" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Sher Shah Suri and Akbar standardized pure coin standards
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="8.5" fill="#fef08a">
            {lang === "pl" ? "Wysoka próba kruszcu zapewniła zaufanie kupców od Londynu po Kanton" : lang === "de" ? "Hohe Reinheit schuf Vertrauen von London bis Kanton" : "High metallurgical purity created commercial trust across international trade ports"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Zarządzanie cłami i drogami (Wielki Szlak Kołowy) napędzało rynek" : lang === "de" ? "Zollreformen und die Grand Trunk Road foerderten den Handel" : "Infrastructure like the Grand Trunk Road connected inner heartlands with sea ports"}
          </text>
        </g>
      )}
    </svg>
  );
}

function EuropeanCharterCompaniesDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Przybycie europejskich kompanii handlowych: forty, licencje i monopol" : lang === "de" ? "Ankunft europaeischer Handelskompanien: Festungen und Monopole" : "Arrival of European charter corporations: fortified trading posts and monopolies";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <rect x="50" y="50" width="120" height="65" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="110" y="75" textAnchor="middle" fontSize="16">🏰 ⚓</text>
        <text x="110" y="95" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b">European Forts</text>
        <text x="110" y="108" textAnchor="middle" fontSize="7.5" fill="#7f1d1d">Surat, Calcutta, Madras</text>

        <rect x="230" y="50" width="120" height="65" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="290" y="75" textAnchor="middle" fontSize="16">📜 ⚖️</text>
        <text x="290" y="95" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#92400e">Imperial Firmans</text>
        <text x="290" y="108" textAnchor="middle" fontSize="7.5" fill="#78350f">Royal trade concessions</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f8fafc">
            Merchants morphed into armed state-backed monopolies
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#94a3b8">
            {lang === "pl" ? "Początkowo pokorni kupcy stopniowo wznosili mury obronne i zbrojne garnizony" : lang === "de" ? "Erst demuetige Kaufleute, bauten sie bald Festungen und Privatarmeen" : "What began as humble coastal trade factories evolved into fortified commercial enclaves"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#b91c1c" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Przenikanie interesów handlowych i militarnej dominacji" : lang === "de" ? "Verschmelzung von Handelsmacht und militaerischer Gewalt" : "The shift from voluntary bilateral trade to coercive corporate militarism"}
          </text>
        </g>
      )}
    </svg>
  );
}

function GlobalEconomicLegacyDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Lekcja z historii gospodarczej imperium Mogołów: handel, instytucje i upadek" : lang === "de" ? "Die Lehre der Mogul-Wirtschaft: Handel, Institutionen und Niedergang" : "Institutional lessons of the Mughal economy: trade openness, industrial vigor, and systemic decline";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fdf4ff" stroke="#a21caf" strokeWidth="2" />
      <g>
        <circle cx="200" cy="80" r="34" fill="#fae8ff" stroke="#a21caf" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">🌍 📚</text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#701a75">Global Legacy</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#701a75" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Internal administrative fragmentation opened the door to foreign conquest
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#f5d0fe">
            {lang === "pl" ? "Potęga przemysłowa bez trwałych instytucji politycznych i morskich ulega presji zewnętrznej" : lang === "de" ? "Wirtschaftliche Groesse braucht stabile Institutionen und moderne Schifffahrt" : "Economic output alone cannot survive without inclusive political stability and naval power"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Historia pokazuje, jak wielkie centra gospodarcze mogą dynamicznie zmieniać swoje położenie" : lang === "de" ? "Wirtschaftszentren verschieben sich im Laufe der Jahrhunderte drastisch" : "Economic gravity is not static; it shifts dynamically across centuries"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [textileOutput, setTextileOutput] = useState(50);
  const [tariffLevel, setTariffLevel] = useState(10);
  const silverInflow = Math.round((textileOutput * 2.5) / (1 + tariffLevel / 100));
  const isOptimal = textileOutput >= 70 && tariffLevel <= 15;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Textile Production: {textileOutput} | Port Tariffs: {tariffLevel}% | Silver Inflow: {silverInflow} Tons
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setTextileOutput(80);
            setTariffLevel(8);
            onDone?.();
          }}
        >
          Maximize Export Output (Low Tariffs)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setTextileOutput(30);
            setTariffLevel(50);
          }}
        >
          Restrictive Port Tariffs (50%)
        </button>
      </div>
      <div style={{ padding: "12px", background: isOptimal ? "#eef8ef" : "#fef2f2", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {isOptimal
          ? "Thriving Commercial Empire: High artisan productivity combined with low trade barriers draws global silver bullion into Indian mints!"
          : "Subdued Commerce: High internal transit duties or low workshop output curtail overseas trade revenues."}
      </div>
    </div>
  );
}

function MughalsWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What primary dynamic drove vast quantities of silver into the Mughal economy between 1550 and 1700?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Mughal astronomers traded secret maps of Mars for moonstones</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Huge European and Asian demand for high-quality Indian manufactured textiles (calico, silk, muslin) meant foreign merchants had to settle massive trade deficits using silver bullion</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Silver was magically raining down during every full moon over Delhi</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "mughals",
  story: [
    animatedBeat(
      [
        T("Meet Aarav. He opens a global economic atlas and studies the year 1600, discovering a surprising economic superpower.", "Das ist Arne. Er schlaegt einen historischen Weltwirtschaftsatlas auf und entdeckt eine wirtschaftliche Supermacht um das Jahr 1600.", "Poznaj Adama. Otwiera historyczny atlas gospodarczy i bada rok 1600, odkrywając ówczesną potęgę gospodarczą świata."),
        T("The Mughal Empire produced roughly one quarter of the entire world's manufactured output, surpassing all of Western Europe combined.", "Das Mogulreich erwirtschaftete etwa ein Viertel der gesamten Weltproduktion, mehr als ganz Westeuropa zusammen.", "Imperium Mogołów wytwarzało blisko jedną czwartą globalnej produkcji przemysłowej, przewyższając całą Europę Zachodnią razem wziętą."),
        T("Its dense networks of skilled artisans in Bengal, Gujarat, and the Coromandel coast wove cottons and silks of peerless quality.", "Dichte Netzwerke meisterhafter Handwerker in Bengalen und Gujarat webten Stoffe von weltweit unerreichter Feinheit.", "Gęsta sieć wyspecjalizowanych rzemieślników w Bengalu i Gudźaracie tkała bawełnę i jedwab o niezrównanej jakości."),
      ],
      MughalsTradeDiagram,
    ),
    animatedBeat(
      [
        T("European merchants arriving in India faced an immediate dilemma: India had little interest in European goods.", "Europaeische Haendler standen vor einem Dilemma: Indien brauchte kaum europaeische Waren.", "Europejscy kupcy przybywający do Indii stanęli przed problemem: Indie nie potrzebowały niemal żadnych towarów z Europy."),
        T("To purchase fine calico, muslin, indigo, and pepper, foreign traders were forced to pay in physical silver and gold.", "Fuer feine Stoffe, Indigo und Pfeffer mussten Kaufleute mit purem Gold und Silber bezahlen.", "Aby kupić cienki muślin, kaliko, indygo i pieprz, zagraniczni kupcy musieli płacić czystym srebrem i złotem."),
        T("Consequently, Spanish treasure fleets carrying silver from Potosi in South America saw much of their bullion end up settled in Indian mints.", "Amerikanisches Silber aus den Minen von Potosi landete so ueber europaeische Haendler direkt in indischen Praegestaetten.", "W rezultacie srebro wydobywane przez hiszpańską koronę w Ameryce Południowej ostatecznie lądowało w mennicach subkontynentu indyjskiego."),
      ],
      ManufacturingPowerhouseDiagram,
    ),
    animatedBeat(
      [
        T("Under rulers like Sher Shah Suri and Akbar, the empire instituted a standardized, highly trusted monetary standard: the silver *rupee*.", "Herrscher wie Akbar schufen einen einheitlichen und verlaesslichen Waehrungsstandard: die silberne Rupie.", "Pod rządami Akbara i jego poprzedników imperium wprowadziło jednolity, cieszący się powszechnym zaufaniem standard walutowy: srebrną rupię."),
        T("With uniform weight and high purity, the rupee facilitated trade across thousands of kilometers of highways and bustling river ports.", "Mit konstantem Gewicht und hoher Reinheit erleichterte die Rupie den Handel ueber Tausende von Kilometern.", "Dzięki stałej wadze i wysokiej czystości kruszcu rupia ułatwiała wymianę handlową wzdłuż tysięcy kilometrów dróg i portów rzecznych."),
        T("Massive public investments in the Grand Trunk Road provided secure caravan routes, security posts, and inns for traveling merchants.", "Grosse Bauprojekte wie die Grand Trunk Road sicherten Karawanenwege und Unterkuenfte fuer Haendler.", "Inwestycje infrastrukturalne, jak Wielki Szlak Kołowy, zapewniały bezpieczne szlaki karawanowe, posterunki i zajazdy dla kupców."),
      ],
      CurrencyUnifiedEmpireDiagram,
    ),
    animatedBeat(
      [
        T("Attracted by vast profit margins, European charter companies, including the Dutch VOC and English East India Company, established fortified trade factories.", "Angelockt von hohen Gewinnen gruendeten europaeische Handelsgesellschaften wie die VOC befestigte Handelsstuetzpunkte.", "Przyciągnięte ogromnymi zyskami europejskie kompanie handlowe, takie jak VOC i brytyjska Kompania Wschodnioindyjska, zakładały ufortyfikowane faktorie."),
        T("Initially, they operated strictly as commercial buyers paying taxes and customs duties to local Mughal governors.", "Zunaechst agierten sie als reine Kaeufer und zahlten brav Zoelle an die regionalen Gouverneure.", "Początkowo działały wyłącznie jako komercyjni kontrahenci płacący cła i podatki lokalnym gubernatorom mogołskim."),
        T("Over time, however, internal succession wars weakened the central empire, allowing armed corporate enclaves to gain political leverage.", "Interne Thronkaempfe schwaechten jedoch das Reich, sodass die bewaffneten Firmenquartiere zunehmend Macht gewannen.", "Z czasem wewnętrzne wojny sukcesyjne osłabiły władzę centralną, co pozwoliło uzbrojonym enklawom korporacyjnym zdobyć wpływy polityczne."),
      ],
      EuropeanCharterCompaniesDiagram,
    ),
    animatedBeat(
      [
        T("The Mughal economic story demonstrates that early global trade was multipolar and centered on Asian manufacturing superiority.", "Die Mogul-Wirtschaft zeigt: Der fruehe Welthandel war multipolar und durch asiatische Produktionskraft gepraegt.", "Historia gospodarcza Mogołów dowodzi, że wczesny handel globalny był wielobiegunowy i opierał się na przewadze produkcyjnej Azji."),
        T("Yet without political stability, naval defenses, and modernizing legal protections, economic wealth can rapidly vanish under external pressure.", "Doch ohne dauerhaften Frieden, Seemacht und moderne Rechtsinstitutionen kann Reichtum schnell verloren gehen.", "Jednak bez trwałych instytucji prawnych, stabilności politycznej i floty morskiej bogactwo gospodarcze może łatwo ulec zewnętrznej presji."),
        T("Studying historical economic leadership reminds us that global trade leadership shifts dynamically over centuries.", "Der Blick in die Wirtschaftsgeschichte erinnert uns daran, wie dynamisch Weltwirtschaftszentren wandern.", "Badanie historii gospodarczej przypomina, że centra światowego handlu i innowacji nieustannie zmieniają swoje położenie na przestrzeni wieków."),
      ],
      GlobalEconomicLegacyDiagram,
    ),
  ],
  toyIntro: T(
    "Manage the Mughal export economy: balance artisan textile output and port tariffs to maximize silver inflows into the national treasury.",
    "Steuere die Mogul-Exportwirtschaft: Balanciere Weberei-Produktion und Hafenzoelle, um den Silberzufluss in die Staatskasse zu maximieren.",
    "Zarządzaj gospodarką eksportową Mogołów: dostosuj produkcję tkanin i cła portowe, aby zmaksymalizować napływ srebra do skarbca."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did European merchants export vast quantities of silver bullion to the Mughal Empire in the 17th century?",
        "Warum exportierten europaeische Haendler im 17. Jahrhundert riesige Mengen an Silber ins Mogulreich?",
        "Dlaczego europejscy kupcy w XVII wieku wywozili ogromne ilości srebra do imperium Mogołów?",
      ),
      options: [
        { text: T("Because European markets desperately demanded Indian fine textiles and spices, but Indian producers wanted silver bullion rather than European manufactured goods", "Weil Europa dringend indische Textilien und Gewuerze nachfragte, Indien aber statt europaeischer Waren pures Silber verlangte", "Ponieważ Europa pożądała indyjskich tkanin i przypraw, podczas gdy indyjscy rzemieślnicy nie potrzebowali towarów z Europy i żądali zapłaty w srebrze"), correct: true },
        { text: T("Because European governments had run out of closets to store their shiny coins", "Weil europaeischen Regierungen die Schraenke fuer Muenzen ausgingen", "Ponieważ w europejskich pałacach zabrakło szaf na przechowywanie monet"), correct: false },
        { text: T("Because Indian elephants were fed a diet consisting exclusively of crushed silver spoons", "Weil indische Elefanten ausschliesslich mit zerkleinerten Silberloeffeln gefuettert wurden", "Ponieważ słonie w Indiach karmiono wyłącznie przetopionymi srebrnymi łyżkami"), correct: false },
      ],
      hint: T(
        "Think about bilateral trade balances and what goods India actually needed from the outside world.",
        "Denke an die Handelsbilanz und welche Gegenwerte indische Produzenten fuer ihre Spitzenprodukte akzeptierten.",
        "Zastanów się nad bilansem handlowym i tym, czym kupcy z Europy mogli zapłacić za poszukiwane luksusowe tekstylia."),
    },
    {
      kind: "choice",
      prompt: T(
        "What key monetary innovation during the Mughal era helped unify markets across the subcontinent?",
        "Welche Waehrungsreform der Mogulzeit half, Maerkte auf dem Subkontinent zu verbinden?",
        "Jaka kluczowa innowacja monetarna czasów Mogołów zintegrowała rynki na subkontynencie?",
      ),
      options: [
        { text: T("The introduction of a standardized, highly pure silver rupee of consistent weight and legal backing", "Die Einfuehrung einer standardisierten, hochreinen Silber-Rupie mit einheitlichem Gewicht", "Wprowadzenie ujednoliconej, bitej w czystym srebrze rupii o stałej wadze i gwarancji państwowej"), correct: true },
        { text: T("Replacing all money with promises whispered into glass jars", "Der Ersatz allen Geldes durch in Glaeser gefluesterte Versprechen", "Zastąpienie monet obietnicami szeptanymi do glinianych dzbanów"), correct: false },
        { text: T("Allowing every village baker to mint their own square wooden coins", "Die Erlaubnis fuer Baecker, eigene eckige Holzmuenzen zu praegen", "Pozwolenie każdemu wiejskiemu piekarzowi na wybicie własnych drewnianych monet"), correct: false },
      ],
      hint: T(
        "Consider how uniform currency units reduce transaction costs across long trade journeys.",
        "Achte darauf, wie eine einheitliche, verlaessliche Waehrung Transaktionskosten senkt.",
        "Zwróć uwagę na rolę zaufanej, ustandaryzowanej monety w obniżaniu kosztów transakcyjnych."),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify the primary economic engine responsible for Mughal India's massive international trade surplus.",
        "Bestimme die treibende Wirtschaftskraft hinter dem enormen Handelsueberschuss des Mogulreichs.",
        "Wskaż główną siłę napędową olbrzymiej nadwyżki w handlu zagranicznym imperium Mogołów.",
      ),
      Widget: MughalsWidget,
      hint: T(
        "Focus on the global competitiveness of Indian textile manufacturing (calico and muslin).",
        "Achte auf die globale Wettbewerbsfaehigkeit indischer Webwaren und Stoffe.",
        "Skup się na światowej pozycji indyjskiego przemysłu włókienniczego i zapotrzebowaniu na te towary."),
    },
  ],
  askDad: T(
    "Ask your parent: Did you know that 400 years ago, India produced nearly a quarter of all manufactured goods in the world?",
    "Frage deine Eltern: Wusstet ihr, dass Indien vor 400 Jahren fast ein Viertel aller industriellen Gueter der Welt herstellte?",
    "Zapytaj rodziców: Czy wiedzieliście, że 400 lat temu Indie wytwarzały prawie jedną czwartą wszystkich wyrobów rzemieślniczych na świecie?"),
  realLife: {
    title: T(
      "Real world: Angus Maddison's historical world GDP reconstructions",
      "Echte Welt: Angus Maddisons historische Rekonstruktion des Welt-BIP",
      "Prawdziwy świat: Historyczne rekonstrukcje PKB świata Angusa Maddisona",
    ),
    body: T(
      "The British economic historian Angus Maddison (1926-2010) spent decades reconstructing historical global economic data for the OECD. His seminal findings revealed that around the year 1600, the Mughal Empire alone accounted for roughly 24% to 25% of total world GDP, rivaling the entire European continent combined. Only with the Industrial Revolution in 18th-century Britain did mechanical factory production decisively shift global manufacturing dominance toward Europe.",
      "Der Wirtschaftshistoriker Angus Maddison rekonstruierte fuer die OECD historische Wirtschaftsdaten. Seine Forschungen belegen, dass das Mogulreich um 1600 rund 25% der weltweiten Wirtschaftsleistung erbrachte, mehr als ganz Europa. Erst die industrielle Revolution im 18. Jahrhundert in Grossbritannien verschob die globale Produktionsfuehrung nach Europa.",
      "Brytyjski historyk gospodarczy Angus Maddison poświęcił dekady na rekonstrukcję historycznych danych dla OECD. Z jego badań wynika, że około 1600 roku imperium Mogołów generowało 24-25% światowego PKB, dorównując całej Europie. Dopiero rewolucja przemysłowa w XVIII-wiecznej Wielkiej Brytanii trwale przesunęła przemysłowy środek ciężkości świata na zachód."),
  },
  factCard: {
    claims: [
      { text: T("Angus Maddison's research published by the OECD in 'The World Economy: A Millennial Perspective' (2001) estimates Mughal India accounted for approximately 24.3% of global income in 1600.", "Angus Maddison schaetzte in seiner OECD-Studie von 2001 den Anteil des Mogulreichs am Welt-BIP um 1600 auf etwa 24,3%.", "Badania Angusa Maddisona opublikowane przez OECD w 2001 r. szacują udział imperium Mogołów w globalnym dochodzie w 1600 r. na 24,3%."), source: "https://www.oecd.org/en/publications/the-world-economy_9789264189980-en.html" },
      { text: T("Historian Shireen Moosvi calculated that the Mughal Empire under Akbar sustained sophisticated mint networks producing millions of uniform silver rupees annually.", "Die Historikerin Shireen Moosvi belegte das hochentwickelte Muenznetzwerk des Mogulreichs unter Akbar.", "Historyk Shireen Moosvi wykazała, że imperium Mogołów pod rządami Akbara posiadało rozbudowaną sieć mennic bijącą miliony jednolitych srebrnych rupii rocznie."), source: "https://global.oup.com/academic/product/the-economy-of-the-mughal-empire-c-1595-9780195637625" },
      { text: T("Prasannan Parthasarathi's study 'Why Europe Grew Rich and Asia Did Not' (2011) showed 18th-century Indian textile weavers enjoyed competitive real wages relative to their British counterparts.", "Prasannan Parthasarathis Werk von 2011 zeigt die hohe Wettbewerbsfaehigkeit indischer Weber vor der Mechanisierung.", "Studium Prasannana Parthasarathiego z 2011 r. dowodzi, że indyjscy tkacze cieszyli się konkurencyjnymi płacami realnymi w porównaniu z robotnikami w Wielkiej Brytanii."), source: "https://www.cambridge.org/core/books/why-europe-grew-rich-and-asia-did-not/63D311F5E178F598ED7715C8DF252F17" },
      { text: T("Dennis Flynn and Arturo Giraldez (1995) documented that silver mined in Spanish America flowed across the Pacific and Atlantic, with substantial volumes settling permanently in China and India.", "Flynn und Giraldez dokumentierten 1995, wie amerikanisches Silber ueber den Welthandel letztlich nach Asien floss.", "Dennis Flynn i Arturo Giraldez (1995) udokumentowali, jak srebro z hiszpańskiej Ameryki zasilało rynki w Azji, w tym w Indiach."), source: "https://www.jstor.org/stable/2123751" },
      { text: T("The Grand Trunk Road was renovated and expanded under Sher Shah Suri in the 1540s, connecting Kabul and Chittagong across over 2,500 kilometers.", "Die Grand Trunk Road wurde ab 1540 unter Sher Shah Suri ueber 2.500 Kilometer hinweg ausgebaut.", "Wielki Szlak Kołowy został zmodernizowany przez Szer Szaha Suriego w latach 40. XVI wieku na długości ponad 2500 kilometrów."), source: "https://whc.unesco.org/en/tentativelists/6056/" },
    ],
    simplified: [
      T(
        "Complex econometric trade matrices and pre-modern metallurgical assay datasets are translated into interactive export-tariff balancing toys and accessible historical narratives.",
        "Komplexe oekonometrische Handelsmatrizen und historische Muenzdaten wurden durch spielerische Exportregler und anschauliche Berichte verstaendlich aufbereitet.",
        "Skomplikowane ekonometryczne macierze handlowe i dane o dawnych stopach menniczych przedstawiono w formie czytelnych suwaków handlu i barwnej opowieści historycznej."),
    ],
  },
};
