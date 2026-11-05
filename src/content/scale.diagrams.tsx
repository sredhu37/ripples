import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Person } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import { BootsIcon } from "./marketing.diagrams";

export function SamWorkshopDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Warsztat rzemieślniczy Sama"
      : lang === "de"
      ? "Sams Handwerkswerkstatt"
      : "Sam's artisan workshop";
  const artisanTitle =
    lang === "pl" ? "Warsztat rzemieślniczy" : lang === "de" ? "Handwerksbetrieb" : "Artisan Workshop";
  const customMade =
    lang === "pl"
      ? "Szyte na miarę, para po parze"
      : lang === "de"
      ? "Maßgefertigt, Paar für Paar"
      : "Custom made, one pair at a time";
  const highFlex =
    lang === "pl" ? "Duża elastyczność" : lang === "de" ? "Hohe Flexibilität" : "High flexibility";
  const personalFit =
    lang === "pl" ? "Indywidualne dopasowanie" : lang === "de" ? "Persönliche Passform" : "Personal fit";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Sam} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Sam
        </text>
      </Pop>
      <Pop x={200} y={60}>
        <rect x="0" y="0" width="220" height="120" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="110" y="35" textAnchor="middle" fill="#b45309" fontSize={14} fontWeight="bold">
          {artisanTitle}
        </text>
        <BootsIcon x={85} y={45} size={50} />
        <text x="110" y="105" textAnchor="middle" fill="#78350f" fontSize={12}>
          {customMade}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={450} y={70}>
          <rect x="0" y="0" width="160" height="90" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="80" y="35" textAnchor="middle" fill="#15803d" fontSize={13} fontWeight="bold">
            {highFlex}
          </text>
          <text x="80" y="65" textAnchor="middle" fill="#166534" fontSize={12}>
            {personalFit}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function GrandHarborFactoryDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Fabryka butów w Grand Harbor"
      : lang === "de"
      ? "Die Schuhfabrik im Großen Hafen"
      : "Grand Harbor Shoe Factory";
  const factoryTitle =
    lang === "pl" ? "Fabryka w Grand Harbor" : lang === "de" ? "Große Schuhfabrik" : "Grand Harbor Factory";
  const mechanicalCutters =
    lang === "pl"
      ? "Mechaniczne maszyny wykrawające"
      : lang === "de"
      ? "Mechanische Stanzmaschinen"
      : "Mechanical Cutting Machines";
  const outputDaily =
    lang === "pl" ? "100 par każdego dnia!" : lang === "de" ? "100 Stiefel jeden Tag!" : "100 boots every day!";
  const massProduction =
    lang === "pl" ? "Produkcja masowa" : lang === "de" ? "Massenproduktion" : "Mass Production";
  const identicalBoots =
    lang === "pl" ? "Identyczne buty robocze" : lang === "de" ? "Gleiche Arbeitsstiefel" : "Identical work boots";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={50}>
        <rect x="0" y="0" width="240" height="150" rx="14" fill="#f1f5f9" stroke="#64748b" strokeWidth="3" />
        <text x="120" y="35" textAnchor="middle" fill="#1e293b" fontSize={14} fontWeight="bold">
          {factoryTitle}
        </text>
        <rect x="30" y="55" width="180" height="40" rx="8" fill="#e2e8f0" />
        <text x="120" y="80" textAnchor="middle" fill="#475569" fontSize={12} fontWeight="bold">
          {mechanicalCutters}
        </text>
        <text x="120" y="125" textAnchor="middle" fill="#0284c7" fontSize={13} fontWeight="bold">
          {outputDaily}
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
          <text x="75" y="35" textAnchor="middle" fill="#1d4ed8" fontSize={13} fontWeight="bold">
            {massProduction}
          </text>
          <text x="75" y="65" textAnchor="middle" fill="#2563eb" fontSize={12}>
            {identicalBoots}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function ScaleDiscountDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Zakupy hurtowe obniżają koszty"
      : lang === "de"
      ? "Großeinkauf spart Kosten"
      : "Wholesale bulk discounts";
  const smallShopTitle =
    lang === "pl" ? "Mały warsztat: 1 płat skóry" : lang === "de" ? "Kleiner Laden: 1 Leder" : "Small Shop: 1 Sheet";
  const smallShopPrice =
    lang === "pl" ? "2 monety za płat" : lang === "de" ? "2 Münzen pro Stück" : "2 coins per sheet";
  const smallBatchNote =
    lang === "pl"
      ? "Kupowane w małych ilościach"
      : lang === "de"
      ? "In kleinen Mengen gekauft"
      : "Bought in small batches";
  const factoryTitle =
    lang === "pl" ? "Fabryka: 100 płatów skóry" : lang === "de" ? "Fabrik: 100 Leder" : "Factory: 100 Sheets";
  const factoryPrice =
    lang === "pl" ? "1 moneta za płat!" : lang === "de" ? "1 Münze pro Stück!" : "1 coin per sheet!";
  const boatloadDiscount =
    lang === "pl"
      ? "Rabat hurtowy za cały ładunek statku"
      : lang === "de"
      ? "Schiffsladung mit Mengenrabatt"
      : "Wholesale boatload discount";
  const scaleAdvantage =
    lang === "pl"
      ? "Tą przewagą jest efekt skali!"
      : lang === "de"
      ? "Dieser Vorteil ist der Größenvorteil!"
      : "This advantage is scale!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={50} y={50}>
        <rect x="0" y="0" width="240" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="120" y="35" textAnchor="middle" fill="#23383f" fontSize={14} fontWeight="bold">
          {smallShopTitle}
        </text>
        <text x="120" y="80" textAnchor="middle" fill="#991b1b" fontSize={16} fontWeight="bold">
          {smallShopPrice}
        </text>
        <text x="120" y="120" textAnchor="middle" fill="#64748b" fontSize={12}>
          {smallBatchNote}
        </text>
      </Pop>
      <Pop x={330} y={50}>
        <rect x="0" y="0" width="260" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="130" y="35" textAnchor="middle" fill="#23383f" fontSize={14} fontWeight="bold">
          {factoryTitle}
        </text>
        <text x="130" y="80" textAnchor="middle" fill="#15803d" fontSize={16} fontWeight="bold">
          {factoryPrice}
        </text>
        <text x="130" y="120" textAnchor="middle" fill="#166534" fontSize={12}>
          {boatloadDiscount}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={220} y={180}>
          <rect x="0" y="0" width="200" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="100" y="25" textAnchor="middle" fill="#0369a1" fontSize={13} fontWeight="bold">
            {scaleAdvantage}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function MayaBulkOrderDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Maya zamawia buty hurtowo dla sadowników"
      : lang === "de"
      ? "Maya bestellt viele Stiefel für die Plantage"
      : "Maya orders bulk boots for the orchard";
  const bulkOrderTitle =
    lang === "pl" ? "Zamówienie hurtowe: 40 par" : lang === "de" ? "Großbestellung: 40 Stiefel" : "Bulk Order: 40 Boots";
  const forWorkers =
    lang === "pl" ? "Dla wszystkich pracowników sadu" : lang === "de" ? "Für alle Plantagenhelfer" : "For all orchard workers";
  const fastDelivery =
    lang === "pl" ? "Fabryka dostarcza szybko i tanio" : lang === "de" ? "Fabrik liefert günstig" : "Factory delivers quickly";
  const lowUnitCost =
    lang === "pl" ? "Niski koszt jednostkowy" : lang === "de" ? "Geringe Stückkosten" : "Low unit cost";
  const bootPrice =
    lang === "pl" ? "3 monety za parę" : lang === "de" ? "3 Münzen pro Stiefel" : "3 coins per boot";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Maya} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Maya
        </text>
      </Pop>
      <Pop x={200} y={60}>
        <rect x="0" y="0" width="220" height="120" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        <text x="110" y="35" textAnchor="middle" fill="#1d4ed8" fontSize={14} fontWeight="bold">
          {bulkOrderTitle}
        </text>
        <text x="110" y="65" textAnchor="middle" fill="#2563eb" fontSize={12}>
          {forWorkers}
        </text>
        <text x="110" y="95" textAnchor="middle" fill="#1e40af" fontSize={13} fontWeight="bold">
          {fastDelivery}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={450} y={70}>
          <rect x="0" y="0" width="160" height="90" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="80" y="35" textAnchor="middle" fill="#15803d" fontSize={13} fontWeight="bold">
            {lowUnitCost}
          </text>
          <text x="80" y="65" textAnchor="middle" fill="#166534" fontSize={12}>
            {bootPrice}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function MossCustomOrderDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Burmistrz Moss zamawia buty na miarę"
      : lang === "de"
      ? "Bürgermeister Moss bestellt Maßstiefel"
      : "Mayor Moss orders custom boots";
  const customOrderTitle =
    lang === "pl"
      ? "Zamówienie na miarę: specjalny krój"
      : lang === "de"
      ? "Maßanfertigung: Feine Passform"
      : "Custom Order: Special Fit";
  const carvedInitials =
    lang === "pl"
      ? "Grawerowane inicjały i miękka skóra"
      : lang === "de"
      ? "Verzierte Initialen und feines Leder"
      : "Carved initials and soft calf leather";
  const handCrafted =
    lang === "pl" ? "Sam tworzy je ręcznie" : lang === "de" ? "Sam fertigt es von Hand" : "Sam crafts it by hand";
  const uniqueCraft =
    lang === "pl" ? "Unikatowe rękodzieło" : lang === "de" ? "Unikat-Handwerk" : "Unique Craft";
  const artisanCare =
    lang === "pl" ? "Rzemieślnicza staranność" : lang === "de" ? "Persönliche Sorgfalt" : "Artisan care";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Moss} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Mayor Moss
        </text>
      </Pop>
      <Pop x={200} y={60}>
        <rect x="0" y="0" width="220" height="120" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="110" y="35" textAnchor="middle" fill="#b45309" fontSize={14} fontWeight="bold">
          {customOrderTitle}
        </text>
        <text x="110" y="65" textAnchor="middle" fill="#d97706" fontSize={12}>
          {carvedInitials}
        </text>
        <text x="110" y="95" textAnchor="middle" fill="#78350f" fontSize={13} fontWeight="bold">
          {handCrafted}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={450} y={70}>
          <rect x="0" y="0" width="160" height="90" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="80" y="35" textAnchor="middle" fill="#15803d" fontSize={13} fontWeight="bold">
            {uniqueCraft}
          </text>
          <text x="80" y="65" textAnchor="middle" fill="#166534" fontSize={12}>
            {artisanCare}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BothThriveDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Oba rodzaje firm pełnią niezastąpione role"
      : lang === "de"
      ? "Beide Betriebsarten haben ihren Platz"
      : "Both businesses serve essential roles";
  const bothTitle =
    lang === "pl"
      ? "Małe rzemiosło i wielka fabryka"
      : lang === "de"
      ? "Kleinbetrieb und Großfabrik"
      : "Small Business and Large Factory";
  const smallPerks =
    lang === "pl"
      ? "Małe warsztaty oferują osobistą opiekę, naprawy i indywidualne projekty"
      : lang === "de"
      ? "Kleinbetriebe bieten persönlichen Service, Reparatur und Maßarbeit"
      : "Small shops provide personal care, repairs, and custom fit";
  const factoryPerks =
    lang === "pl"
      ? "Fabryki dostarczają masowe towary codziennego użytku w przystępnych cenach"
      : lang === "de"
      ? "Fabriken liefern verlässliche Großmengen zu günstigen Preisen"
      : "Factories provide reliable bulk items at affordable prices";
  const prosperityBadge =
    lang === "pl"
      ? "Razem budują dobrobyt!"
      : lang === "de"
      ? "Gemeinsam schaffen sie Wohlstand!"
      : "Together they build prosperity!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={80} y={50}>
        <rect x="0" y="0" width="480" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="240" y="40" textAnchor="middle" fill="#23383f" fontSize={16} fontWeight="bold">
          {bothTitle}
        </text>
        <text x="240" y="80" textAnchor="middle" fill="#475569" fontSize={14}>
          {smallPerks}
        </text>
        <text x="240" y="120" textAnchor="middle" fill="#475569" fontSize={14}>
          {factoryPerks}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={200} y={180}>
          <rect x="0" y="0" width="240" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="120" y="25" textAnchor="middle" fill="#15803d" fontSize={13} fontWeight="bold">
            {prosperityBadge}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
