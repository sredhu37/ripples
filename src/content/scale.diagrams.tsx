import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Person } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import { BootsIcon } from "./marketing.diagrams";

export function SamWorkshopDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Sam's artisan workshop" : "Sams Handwerkswerkstatt"}>
      <Pop x={60} y={60}>
        <Person {...CAST.Sam} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Sam
        </text>
      </Pop>
      <Pop x={200} y={60}>
        <rect x="0" y="0" width="220" height="120" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="110" y="35" textAnchor="middle" fill="#b45309" fontSize="14" fontWeight="bold">
          {en ? "Artisan Workshop" : "Handwerksbetrieb"}
        </text>
        <BootsIcon x={85} y={45} size={50} />
        <text x="110" y="105" textAnchor="middle" fill="#78350f" fontSize="12">
          {en ? "Custom made, one pair at a time" : "Maßgefertigt, Paar für Paar"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={450} y={70}>
          <rect x="0" y="0" width="160" height="90" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="80" y="35" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">
            {en ? "High flexibility" : "Hohe Flexibilität"}
          </text>
          <text x="80" y="65" textAnchor="middle" fill="#166534" fontSize="12">
            {en ? "Personal fit" : "Persönliche Passform"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function GrandHarborFactoryDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Grand Harbor Shoe Factory" : "Die Schuhfabrik im Großen Hafen"}>
      <Pop x={60} y={50}>
        <rect x="0" y="0" width="240" height="150" rx="14" fill="#f1f5f9" stroke="#64748b" strokeWidth="3" />
        <text x="120" y="35" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">
          {en ? "Grand Harbor Factory" : "Große Schuhfabrik"}
        </text>
        <rect x="30" y="55" width="180" height="40" rx="8" fill="#e2e8f0" />
        <text x="120" y="80" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold">
          {en ? "Mechanical Cutting Machines" : "Mechanische Stanzmaschinen"}
        </text>
        <text x="120" y="125" textAnchor="middle" fill="#0284c7" fontSize="13" fontWeight="bold">
          {en ? "100 boots every day!" : "100 Stiefel jeden Tag!"}
        </text>
      </Pop>
      <Pop x={330} y={60}>
        <Person {...CAST.Maya} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Maya
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={460} y={70}>
          <rect x="0" y="0" width="150" height="90" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
          <text x="75" y="35" textAnchor="middle" fill="#1d4ed8" fontSize="13" fontWeight="bold">
            {en ? "Mass Production" : "Massenproduktion"}
          </text>
          <text x="75" y="65" textAnchor="middle" fill="#2563eb" fontSize="12">
            {en ? "Identical work boots" : "Gleiche Arbeitsstiefel"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function ScaleDiscountDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Wholesale bulk discounts" : "Großeinkauf spart Kosten"}>
      <Pop x={50} y={50}>
        <rect x="0" y="0" width="240" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="120" y="35" textAnchor="middle" fill="#23383f" fontSize="14" fontWeight="bold">
          {en ? "Small Shop: 1 Sheet" : "Kleiner Laden: 1 Leder"}
        </text>
        <text x="120" y="80" textAnchor="middle" fill="#991b1b" fontSize="16" fontWeight="bold">
          2 {en ? "coins per sheet" : "Münzen pro Stück"}
        </text>
        <text x="120" y="120" textAnchor="middle" fill="#64748b" fontSize="12">
          {en ? "Bought in small batches" : "In kleinen Mengen gekauft"}
        </text>
      </Pop>
      <Pop x={330} y={50}>
        <rect x="0" y="0" width="260" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="130" y="35" textAnchor="middle" fill="#23383f" fontSize="14" fontWeight="bold">
          {en ? "Factory: 100 Sheets" : "Fabrik: 100 Leder"}
        </text>
        <text x="130" y="80" textAnchor="middle" fill="#15803d" fontSize="16" fontWeight="bold">
          1 {en ? "coin per sheet!" : "Münze pro Stück!"}
        </text>
        <text x="130" y="120" textAnchor="middle" fill="#166534" fontSize="12">
          {en ? "Wholesale boatload discount" : "Schiffsladung mit Mengenrabatt"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={220} y={180}>
          <rect x="0" y="0" width="200" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="100" y="25" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">
            {en ? "This advantage is scale!" : "Dieser Vorteil ist der Größenvorteil!"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function MayaBulkOrderDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Maya orders bulk boots for the orchard" : "Maya bestellt viele Stiefel für die Plantage"}>
      <Pop x={60} y={60}>
        <Person {...CAST.Maya} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Maya
        </text>
      </Pop>
      <Pop x={200} y={60}>
        <rect x="0" y="0" width="220" height="120" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        <text x="110" y="35" textAnchor="middle" fill="#1d4ed8" fontSize="14" fontWeight="bold">
          {en ? "Bulk Order: 40 Boots" : "Großbestellung: 40 Stiefel"}
        </text>
        <text x="110" y="65" textAnchor="middle" fill="#2563eb" fontSize="12">
          {en ? "For all orchard workers" : "Für alle Plantagenhelfer"}
        </text>
        <text x="110" y="95" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="bold">
          {en ? "Factory delivers quickly" : "Fabrik liefert günstig"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={450} y={70}>
          <rect x="0" y="0" width="160" height="90" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="80" y="35" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">
            {en ? "Low unit cost" : "Geringe Stückkosten"}
          </text>
          <text x="80" y="65" textAnchor="middle" fill="#166534" fontSize="12">
            {en ? "3 coins per boot" : "3 Münzen pro Stiefel"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function MossCustomOrderDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Mayor Moss orders custom boots" : "Bürgermeister Moss bestellt Maßstiefel"}>
      <Pop x={60} y={60}>
        <Person {...CAST.Moss} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Mayor Moss
        </text>
      </Pop>
      <Pop x={200} y={60}>
        <rect x="0" y="0" width="220" height="120" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="110" y="35" textAnchor="middle" fill="#b45309" fontSize="14" fontWeight="bold">
          {en ? "Custom Order: Special Fit" : "Maßanfertigung: Feine Passform"}
        </text>
        <text x="110" y="65" textAnchor="middle" fill="#d97706" fontSize="12">
          {en ? "Carved initials and soft calf leather" : "Verzierte Initialen und feines Leder"}
        </text>
        <text x="110" y="95" textAnchor="middle" fill="#78350f" fontSize="13" fontWeight="bold">
          {en ? "Sam crafts it by hand" : "Sam fertigt es von Hand"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={450} y={70}>
          <rect x="0" y="0" width="160" height="90" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="80" y="35" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">
            {en ? "Unique Craft" : "Unikat-Handwerk"}
          </text>
          <text x="80" y="65" textAnchor="middle" fill="#166534" fontSize="12">
            {en ? "Artisan care" : "Persönliche Sorgfalt"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BothThriveDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Both businesses serve essential roles" : "Beide Betriebsarten haben ihren Platz"}>
      <Pop x={80} y={50}>
        <rect x="0" y="0" width="480" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="240" y="40" textAnchor="middle" fill="#23383f" fontSize="16" fontWeight="bold">
          {en ? "Small Business and Large Factory" : "Kleinbetrieb und Großfabrik"}
        </text>
        <text x="240" y="80" textAnchor="middle" fill="#475569" fontSize="14">
          {en ? "Small shops provide personal care, repairs, and custom fit" : "Kleinbetriebe bieten persönlichen Service, Reparatur und Maßarbeit"}
        </text>
        <text x="240" y="120" textAnchor="middle" fill="#475569" fontSize="14">
          {en ? "Factories provide reliable bulk items at affordable prices" : "Fabriken liefern verlässliche Großmengen zu günstigen Preisen"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={200} y={180}>
          <rect x="0" y="0" width="240" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="120" y="25" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">
            {en ? "Together they build prosperity!" : "Gemeinsam schaffen sie Wohlstand!"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
