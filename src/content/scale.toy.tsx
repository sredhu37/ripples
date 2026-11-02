import { useEffect, useState } from "react";
import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Person } from "../components/icons";
import { ActionPrompt, CheckButton, Slider, Stage } from "../lesson/toolkit";
import type { Lang } from "../progress";

export function calcLeatherUnitCost(sheets: number) {
  return sheets >= 20 ? 1 : 2;
}

export function calcTotalMaterialCost(sheets: number) {
  const unitCost = calcLeatherUnitCost(sheets);
  return {
    unitCost,
    totalCost: sheets * unitCost,
    discountActive: sheets >= 20,
  };
}

export function ScaleToy({
  lang,
  onDone,
  isWidget,
  onWidgetAnswer,
}: {
  lang: Lang;
  onDone?: () => void;
  isWidget?: boolean;
  onWidgetAnswer?: (correct: boolean) => void;
}) {
  const en = lang === "en";

  const [sheets, setSheets] = useState(1);
  const [routedCustom, setRoutedCustom] = useState(false);
  const [routedBulk, setRoutedBulk] = useState(false);
  const [testedDiscount, setTestedDiscount] = useState(false);
  const [widgetSelected, setWidgetSelected] = useState<"sam" | "factory" | null>(null);

  const material = calcTotalMaterialCost(sheets);

  const handleSlider = (val: number) => {
    setSheets(val);
    if (!isWidget && val >= 20) {
      setTestedDiscount(true);
    }
  };

  useEffect(() => {
    if (!isWidget && routedCustom && routedBulk && testedDiscount) {
      onDone?.();
    }
  }, [routedCustom, routedBulk, testedDiscount, onDone, isWidget]);

  return (
    <div className="scale-wrap">
      <Stage label={en ? "Scale and craft simulator" : "Größenvorteil und Handwerk"}>
        <DiagramCanvas label={en ? "Artisan vs Factory comparison" : "Handwerksbetrieb und Fabrik im Vergleich"}>
          {/* Sam's Workshop */}
          <Pop x={30} y={35}>
            <rect x="0" y="0" width="260" height="185" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <Person {...CAST.Sam} x={20} y={15} size={80} />
            <text className="diagram-name" x={60} y={105} textAnchor="middle">
              Sam
            </text>
            <rect x="110" y="20" width="135" height="40" rx="8" fill="#fef3c7" />
            <text x="177" y="45" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="bold">
              {en ? "Artisan Workshop" : "Handwerksbetrieb"}
            </text>
            <text x="130" y="85" textAnchor="middle" fill="#64748b" fontSize="11">
              {en ? "Custom, personal fit" : "Maßarbeit, Einzelstücke"}
            </text>

            <rect x="20" y="120" width="220" height="45" rx="8" fill={routedCustom ? "#dcfce7" : "#f1f5f9"} />
            <text
              x="130"
              y="148"
              textAnchor="middle"
              fill={routedCustom ? "#15803d" : "#64748b"}
              fontSize="12"
              fontWeight="bold"
            >
              {routedCustom
                ? en
                  ? "✓ Moss Custom Order Crafted!"
                  : "✓ Moss Maßstiefel gefertigt!"
                : en
                ? "Awaiting Custom Order"
                : "Wartet auf Maßauftrag"}
            </text>
          </Pop>

          {/* Grand Harbor Factory */}
          <Pop x={320} y={35}>
            <rect x="0" y="0" width="290" height="185" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <rect x="15" y="15" width="260" height="45" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
            <text x="145" y="42" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">
              {en ? "Grand Harbor Shoe Factory" : "Schuhfabrik Großer Hafen"}
            </text>
            <text x="145" y="85" textAnchor="middle" fill="#64748b" fontSize="11">
              {en ? "Big machines, identical bulk boots" : "Große Maschinen, günstige Großmengen"}
            </text>

            <rect x="20" y="120" width="250" height="45" rx="8" fill={routedBulk ? "#dcfce7" : "#f1f5f9"} />
            <text
              x="145"
              y="148"
              textAnchor="middle"
              fill={routedBulk ? "#15803d" : "#64748b"}
              fontSize="12"
              fontWeight="bold"
            >
              {routedBulk
                ? en
                  ? "✓ Maya 40 Boots Delivered!"
                  : "✓ Mayas 40 Stiefel geliefert!"
                : en
                ? "Awaiting Bulk Order"
                : "Wartet auf Großauftrag"}
            </text>
          </Pop>
        </DiagramCanvas>
      </Stage>

      {!isWidget && (
        <div className="scale-controls">
          <Slider
            label={
              en
                ? `Leather sheets: ${sheets} | Unit price: ${material.unitCost} coins ${material.discountActive ? "(Wholesale discount!)" : ""}`
                : `Lederstücke: ${sheets} | Stückpreis: ${material.unitCost} Münzen ${material.discountActive ? "(Großkundenrabatt!)" : ""}`
            }
            min={1}
            max={40}
            step={1}
            value={sheets}
            onChange={handleSlider}
          />

          <div className="row">
            <button
              type="button"
              className={`choice-btn ${routedCustom ? "selected" : ""}`}
              onClick={() => setRoutedCustom(true)}
            >
              {en
                ? "Route Moss Custom Order -> Sam's Shop"
                : "Moss Maßstiefel -> Sams Werkstatt"}
            </button>
            <button
              type="button"
              className={`choice-btn ${routedBulk ? "selected" : ""}`}
              onClick={() => setRoutedBulk(true)}
            >
              {en
                ? "Route Maya 40 Bulk Boots -> Factory"
                : "Mayas 40 Arbeitsstiefel -> Fabrik"}
            </button>
          </div>

          <ActionPrompt lang={lang}>
            {!testedDiscount
              ? en
                ? "Move the leather slider to 20 or more sheets to see the bulk discount in action!"
                : "Schiebe den Schieber auf 20 oder mehr Lederstücke, um den Mengenrabatt zu sehen!"
              : !routedCustom || !routedBulk
              ? en
                ? "Route both the custom order and the bulk order to the right business!"
                : "Leite sowohl den Maßauftrag als auch den Großauftrag an den passenden Betrieb weiter!"
              : en
              ? "Notice how small shops excel at custom craft while factories win on scale!"
              : "Siehst du: Kleinbetriebe glänzen bei Maßarbeit, Fabriken beim Größenvorteil!"}
          </ActionPrompt>
        </div>
      )}

      {isWidget && (
        <div className="scale-widget-controls">
          <div className="row">
            <button
              type="button"
              className={`choice-btn ${widgetSelected === "sam" ? "selected" : ""}`}
              onClick={() => setWidgetSelected("sam")}
            >
              {en ? "Sam's Artisan Workshop" : "Sams Handwerkswerkstatt"}
            </button>
            <button
              type="button"
              className={`choice-btn ${widgetSelected === "factory" ? "selected" : ""}`}
              onClick={() => setWidgetSelected("factory")}
            >
              {en ? "Grand Harbor Factory" : "Schuhfabrik Großer Hafen"}
            </button>
          </div>
          {onWidgetAnswer && (
            <div className="row nav">
              <CheckButton
                lang={lang}
                onClick={() => onWidgetAnswer(widgetSelected === "factory")}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
