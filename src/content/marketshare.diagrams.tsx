import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Apple, Person } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

export function GreenApple(pos: { x?: number; y?: number; size?: number }) {
  const { x = 0, y = 0, size = 65 } = pos;
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`}>
      <path d="M50 30 C34 20 12 32 14 56 C16 78 34 90 50 84 C66 90 84 78 86 56 C88 32 66 20 50 30 Z" fill="#4fa75a" />
      <path d="M24 46 C26 38 32 34 38 34" stroke="#86efac" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M50 30 C50 20 52 14 58 8" stroke="#6b4423" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M56 22 C62 10 76 12 78 16 C72 26 62 26 56 22 Z" fill="#22c55e" />
    </g>
  );
}

export function FruitMarketIntroDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "10 mieszkańców kupuje owoce każdego ranka"
      : lang === "de"
      ? "10 Leute kaufen jeden Morgen Obst"
      : "10 villagers buy fruit every morning";
  const title =
    lang === "pl"
      ? "Targ owocowy w Ripple Town"
      : lang === "de"
      ? "Der Obstmarkt in Ripple Town"
      : "The Ripple Town Fruit Market";
  const badge =
    lang === "pl"
      ? "Łącznie 10 klientów kupujących owoce"
      : lang === "de"
      ? "Insgesamt 10 Obst-Käufer"
      : "10 fruit shoppers in total";

  return (
    <DiagramCanvas label={label}>
      <Pop x={40} y={40}>
        <rect x="0" y="0" width="560" height="180" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="280" y="32" textAnchor="middle" fill="#23383f" fontSize={15} fontWeight="bold">
          {title}
        </text>
        <g transform="translate(30, 50)">
          {[CAST.Pip, CAST.Sam, CAST.Bea, CAST.Pim, CAST.Moss].map((p, i) => (
            <Person key={i} {...p} x={i * 100} y={0} size={80} />
          ))}
        </g>
      </Pop>
      {step >= 2 && (
        <Pop x={180} y={150}>
          <rect x="0" y="0" width="280" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="140" y="25" textAnchor="middle" fill="#0369a1" fontSize={13} fontWeight="bold">
            {badge}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function FinnGreenApplesDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Finn sprzedaje zielone jabłka 7 klientom"
      : lang === "de"
      ? "Finn verkauft grüne Äpfel an 7 Leute"
      : "Finn sells green apples to 7 shoppers";
  const greenApples =
    lang === "pl" ? "Zielone jabłka" : lang === "de" ? "Grüne Äpfel" : "Green apples";
  const chooseFinn =
    lang === "pl" ? "7 klientów wybiera Finna" : lang === "de" ? "7 Leute kaufen bei Finn" : "7 customers choose Finn";
  const ratioText =
    lang === "pl" ? "7 z 10 kupujących" : lang === "de" ? "7 von 10 Käufern" : "7 out of 10 shoppers";

  return (
    <DiagramCanvas label={label}>
      <Pop x={50} y={60}>
        <Person {...CAST.Finn} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Finn
        </text>
      </Pop>
      <Pop x={180} y={70}>
        <GreenApple x={0} y={0} size={65} />
        <text x="32" y="75" textAnchor="middle" fill="#2e7d32" fontSize={12} fontWeight="bold">
          {greenApples}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={300} y={60}>
          <rect x="0" y="0" width="280" height="130" rx="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="140" y="35" textAnchor="middle" fill="#15803d" fontSize={15} fontWeight="bold">
            {chooseFinn}
          </text>
          <text x="140" y="65" textAnchor="middle" fill="#166534" fontSize={13}>
            {ratioText}
          </text>
          <text x="140" y="95" textAnchor="middle" fill="#15803d" fontSize={18} fontWeight="bold">
            70%
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function ClaraRedApplesDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Clara sprzedaje czerwone jabłka 3 klientom"
      : lang === "de"
      ? "Clara verkauft rote Äpfel an 3 Leute"
      : "Clara sells red apples to 3 shoppers";
  const redApples =
    lang === "pl" ? "Czerwone jabłka" : lang === "de" ? "Rote Äpfel" : "Red apples";
  const chooseClara =
    lang === "pl" ? "3 klientów wybiera Clarę" : lang === "de" ? "3 Leute kaufen bei Clara" : "3 customers choose Clara";
  const ratioText =
    lang === "pl" ? "3 z 10 kupujących" : lang === "de" ? "3 von 10 Käufern" : "3 out of 10 shoppers";

  return (
    <DiagramCanvas label={label}>
      <Pop x={50} y={60}>
        <Person {...CAST.Clara} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Clara
        </text>
      </Pop>
      <Pop x={180} y={70}>
        <Apple x={0} y={0} size={65} />
        <text x="32" y="75" textAnchor="middle" fill="#c62828" fontSize={12} fontWeight="bold">
          {redApples}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={300} y={60}>
          <rect x="0" y="0" width="280" height="130" rx="12" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
          <text x="140" y="35" textAnchor="middle" fill="#991b1b" fontSize={15} fontWeight="bold">
            {chooseClara}
          </text>
          <text x="140" y="65" textAnchor="middle" fill="#b91c1c" fontSize={13}>
            {ratioText}
          </text>
          <text x="140" y="95" textAnchor="middle" fill="#991b1b" fontSize={18} fontWeight="bold">
            30%
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function MarketSharePieDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Wykres kołowy udziału w rynku"
      : lang === "de"
      ? "Marktanteil im Kreisdiagramm"
      : "Market share pie chart";
  const marketTitle =
    lang === "pl" ? "Rynek owoców" : lang === "de" ? "Der Obstmarkt" : "The Fruit Market";
  const finnLegend =
    lang === "pl" ? "Finn: 70% (7 z 10)" : lang === "de" ? "Finn: 70% (7 von 10)" : "Finn: 70% (7 of 10)";
  const claraLegend =
    lang === "pl" ? "Clara: 30% (3 z 10)" : lang === "de" ? "Clara: 30% (3 von 10)" : "Clara: 30% (3 of 10)";
  const sliceCaption =
    lang === "pl"
      ? "Kawałek tortu każdego sprzedawcy to jego udział w rynku"
      : lang === "de"
      ? "Das Stück vom Kuchen ist der Marktanteil"
      : "Each seller's slice is their market share";

  return (
    <DiagramCanvas label={label}>
      <Pop x={80} y={50}>
        <circle cx="80" cy="80" r="75" fill="#df4a3f" />
        <path d="M80 80 L80 5 A75 75 0 1 1 27 132 Z" fill="#4fa75a" />
        <circle cx="80" cy="80" r="25" fill="#ffffff" stroke="#23383f" strokeWidth="3" />
      </Pop>
      <Pop x={280} y={50}>
        <rect x="0" y="0" width="300" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="150" y="35" textAnchor="middle" fill="#23383f" fontSize={16} fontWeight="bold">
          {marketTitle}
        </text>
        <rect x="30" y="55" width="20" height="20" rx="4" fill="#4fa75a" />
        <text x="60" y="70" fill="#2e7d32" fontSize={13} fontWeight="bold">
          {finnLegend}
        </text>
        <rect x="30" y="90" width="20" height="20" rx="4" fill="#df4a3f" />
        <text x="60" y="105" fill="#c62828" fontSize={13} fontWeight="bold">
          {claraLegend}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={300} y={170}>
          <text x="130" y="25" textAnchor="middle" fill="#0369a1" fontSize={13} fontWeight="bold">
            {sliceCaption}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function ClaraHoneyApplesDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Clara dodaje słodki miód i zdobywa klientów"
      : lang === "de"
      ? "Clara lockt mit Honig und gewinnt Kunden"
      : "Clara adds sweet honey and wins customers";
  const honeyApples =
    lang === "pl" ? "Miodowe jabłka!" : lang === "de" ? "Honig-Äpfel!" : "Honey Apples!";
  const newRecipe =
    lang === "pl" ? "Nowy pyszny przepis" : lang === "de" ? "Neues Rezept" : "Sweet new recipe";
  const newBalance =
    lang === "pl" ? "Nowa równowaga" : lang === "de" ? "Neues Gleichgewicht" : "New Balance";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={50}>
        <Person {...CAST.Clara} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Clara
        </text>
      </Pop>
      <Pop x={190} y={60}>
        <rect x="0" y="0" width="160" height="90" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="80" y="35" textAnchor="middle" fill="#b45309" fontSize={14} fontWeight="bold">
          {honeyApples}
        </text>
        <text x="80" y="65" textAnchor="middle" fill="#d97706" fontSize={12}>
          {newRecipe}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={380} y={50}>
          <rect x="0" y="0" width="200" height="150" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
          <text x="100" y="35" textAnchor="middle" fill="#23383f" fontSize={14} fontWeight="bold">
            {newBalance}
          </text>
          <text x="100" y="70" textAnchor="middle" fill="#4fa75a" fontSize={14} fontWeight="bold">
            Finn: 50% (5)
          </text>
          <text x="100" y="105" textAnchor="middle" fill="#df4a3f" fontSize={14} fontWeight="bold">
            Clara: 50% (5)
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function MarketDynamicsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Udział w rynku zmienia się wraz z wyborami klientów"
      : lang === "de"
      ? "Marktanteil ändert sich mit Kundenwünschen"
      : "Market share changes with customer choices";
  const header =
    lang === "pl"
      ? "Zrozumieć udział w rynku"
      : lang === "de"
      ? "Den Marktanteil verstehen"
      : "Understanding Market Share";
  const line1 =
    lang === "pl"
      ? "Rynek to wszyscy klienci kupujący dany produkt"
      : lang === "de"
      ? "Ein Markt umfasst alle Kunden für ein Produkt"
      : "A market is all the customers buying that product";
  const line2 =
    lang === "pl"
      ? "Lepszy smak, niższa cena lub miła obsługa zdobywają większy udział"
      : lang === "de"
      ? "Besserer Geschmack, guter Preis oder Service bringen mehr Anteil"
      : "Better taste, lower price, or nicer stalls win more share";
  const decisionBadge =
    lang === "pl"
      ? "To klienci decydują o sukcesie!"
      : lang === "de"
      ? "Die Kundschaft entscheidet!"
      : "Customers decide the winners!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={80} y={50}>
        <rect x="0" y="0" width="480" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="240" y="40" textAnchor="middle" fill="#23383f" fontSize={16} fontWeight="bold">
          {header}
        </text>
        <text x="240" y="80" textAnchor="middle" fill="#475569" fontSize={14}>
          {line1}
        </text>
        <text x="240" y="120" textAnchor="middle" fill="#475569" fontSize={14}>
          {line2}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={200} y={180}>
          <rect x="0" y="0" width="240" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="120" y="25" textAnchor="middle" fill="#0369a1" fontSize={13} fontWeight="bold">
            {decisionBadge}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
