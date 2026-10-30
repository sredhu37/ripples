import type { ComponentType } from "react";
import { CAST } from "../components/cast";
import { DiagramCanvas } from "../components/diagram";
import { Bread, Coin, Person, Shoe } from "../components/icons";
import type { IconProps } from "../components/icons";
import { Slider, Stage } from "../lesson/toolkit";
import type { Text } from "../lesson/types";
import type { Lang } from "../progress";
import { Cross, FireTruck, Park, Pot, Road, School, Tick } from "./taxes.icons";
import "./taxes.css";

const T = (en: string, de: string): Text => ({ en, de });

/** Every person in Ripple Town earns this many coins a week. */
export const INCOME = 10;
/** How many people put coins into the pot. */
export const PEOPLE = 10;
/** Coins a person needs to keep for bread and shoes. */
export const NEED = 6;
/** The slider goes from none up to this many coins out of every 10. */
export const MAX_TAX = 6;

export type ItemId = "road" | "school" | "fire" | "park";

interface Item {
  id: ItemId;
  Icon: ComponentType<IconProps & { holes?: boolean }>;
  name: Text;
  cost: number;
}

/** Mayor Moss pays for these in this order, until the pot runs out. */
export const ITEMS: Item[] = [
  { id: "road", Icon: Road, name: T("Road", "Straße"), cost: 10 },
  { id: "school", Icon: School, name: T("School", "Schule"), cost: 20 },
  { id: "fire", Icon: FireTruck, name: T("Fire brigade", "Feuerwehr"), cost: 10 },
  { id: "park", Icon: Park, name: T("Park", "Park"), cost: 10 },
];

/** What a tax rate does. Pure, so the toy and the question agree. */
export function budget(tax: number) {
  const pot = PEOPLE * tax;
  let left = pot;
  const funded: ItemId[] = [];
  for (const item of ITEMS) {
    if (left >= item.cost) {
      left -= item.cost;
      funded.push(item.id);
    } else break;
  }
  const keep = INCOME - tax;
  return { pot, funded, keep, enough: keep >= NEED };
}

const TILE_W = 147;
const TILE_GAP = 10;
const COIN = 30;
const PITCH = 26;
const STRIP_X = 362;
const STRIP_Y = 160;

/** The tax board: four things to pay for on top, the pot and one person's coins below. */
export function BudgetBoard({ lang, tax, onTax }: { lang: Lang; tax: number; onTax: (v: number) => void }) {
  const b = budget(tax);
  const en = lang === "en";
  const heap = (b.pot === 0 ? 0 : b.pot < 20 ? 1 : b.pot < 40 ? 2 : 3) as 0 | 1 | 2 | 3;
  const keptX = STRIP_X + tax * PITCH;
  const keptW = b.keep * PITCH - (PITCH - COIN);
  const status = en
    ? `Pot: ${b.pot} coins. Paid for: ${b.funded.length} of ${ITEMS.length}. Each person keeps ${b.keep} coins, ${b.enough ? "enough" : "too few"} (needs ${NEED}).`
    : `Topf: ${b.pot} Münzen. Bezahlt: ${b.funded.length} von ${ITEMS.length}. Jeder behält ${b.keep} Münzen, ${b.enough ? "genug" : "zu wenig"} (nötig: ${NEED}).`;

  return (
    <Stage label={en ? "Mayor Moss's tax board" : "Bürgermeister Moss' Steuer-Tafel"}>
      <div className="tb">
        <DiagramCanvas label={status}>
          {ITEMS.map((it, i) => {
            const on = b.funded.includes(it.id);
            return (
              <g key={it.id} transform={`translate(${6 + i * (TILE_W + TILE_GAP)} 4)`}>
                <rect
                  width={TILE_W}
                  height="140"
                  rx="18"
                  fill={on ? "#e3f6d9" : "#fff"}
                  stroke={on ? "#3f9b4a" : "#23383f"}
                  strokeWidth="4"
                  strokeDasharray={on ? undefined : "9 7"}
                />
                <g key={on ? "on" : "off"} className="pop" opacity={on ? 1 : 0.5} style={on ? undefined : { filter: "grayscale(1)" }}>
                  <it.Icon x={(TILE_W - 74) / 2} y={6} size={74} holes={it.id === "road" && !on} />
                </g>
                <text className="diagram-name" x={TILE_W / 2} y="100" textAnchor="middle" style={{ fontSize: 19 }}>
                  {it.name[lang]}
                </text>
                <Coin x={TILE_W / 2 - 34} y={106} size={26} />
                <text className="diagram-name" x={TILE_W / 2 - 3} y="126" style={{ fontSize: 22 }}>
                  {it.cost}
                </text>
                {on && (
                  <g key="tick" className="pop">
                    <Tick x={TILE_W - 28} y={-12} size={36} />
                  </g>
                )}
              </g>
            );
          })}

          {/* the pot */}
          <g key={`pot${heap}`} className="pop">
            <Pot x={8} y={158} size={104} heap={heap} />
          </g>
          <text className="diagram-name" x="122" y="214" style={{ fontSize: 44 }}>
            {b.pot}
          </text>
          <text className="diagram-small" x="122" y="242">
            {PEOPLE} × {tax}
          </text>

          {/* one person and their ten coins */}
          <Person {...CAST.Pip} mood={b.enough ? "happy" : "sad"} x={252} y={150} size={86} />
          {tax > 0 && (
            <rect
              x={STRIP_X - 4}
              y={STRIP_Y - 4}
              width={tax * PITCH + (COIN - PITCH) + 8}
              height={COIN + 8}
              rx={(COIN + 8) / 2}
              fill="#1b8a9a"
            />
          )}
          {Array.from({ length: INCOME }, (_, i) => (
            <g key={i}>
              <Coin x={STRIP_X + i * PITCH} y={STRIP_Y} size={COIN} />
            </g>
          ))}
          {tax > 0 && (
            <>
              <path d={`M${STRIP_X} 200 H${STRIP_X + tax * PITCH - (PITCH - COIN) - 2}`} stroke="#1b8a9a" strokeWidth="5" strokeLinecap="round" />
              <text className="diagram-name" x={STRIP_X + (tax * PITCH) / 2 - 8} y="226" textAnchor="middle" style={{ fill: "#1b8a9a" }}>
                {tax}
              </text>
            </>
          )}
          <path
            d={`M${keptX} 200 H${keptX + keptW}`}
            stroke={b.enough ? "#3f9b4a" : "#d6403a"}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text
            className="diagram-name"
            x={keptX + keptW / 2}
            y="226"
            textAnchor="middle"
            style={{ fill: b.enough ? "#2d7a37" : "#c0392b" }}
          >
            {en ? "keeps" : "behält"} {b.keep}
          </text>

          {/* what a person needs */}
          <Bread x={STRIP_X} y={236} size={38} />
          <Shoe x={STRIP_X + 40} y={236} size={38} />
          <text className="diagram-name" x={STRIP_X + 86} y="264">
            {en ? "needs" : "braucht"} {NEED}
          </text>
          <g key={b.enough ? "ok" : "low"} className="pop">
            {b.enough ? <Tick x={STRIP_X + 218} y={236} size={38} /> : <Cross x={STRIP_X + 218} y={236} size={38} />}
          </g>
        </DiagramCanvas>
        <p className="sr-only" role="status">
          {status}
        </p>
        <Slider
          label={en ? "Tax from every 10 coins" : "Steuer von je 10 Münzen"}
          value={tax}
          min={0}
          max={MAX_TAX}
          onChange={onTax}
          left={en ? "0 (no tax)" : "0 (keine Steuer)"}
          right={String(MAX_TAX)}
        />
      </div>
    </Stage>
  );
}
