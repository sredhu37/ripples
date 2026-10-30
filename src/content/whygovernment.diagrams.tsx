import { DiagramCanvas } from "../components/diagram";
import type { DiagramProps } from "../lesson/types";

const alt = (en: string, de: string, lang: DiagramProps["lang"]) => (lang === "en" ? en : de);

export function WellDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Town drinking well and carts", "Dorfbrunnen und Kutschen", lang)}>
      <rect x="50" y="50" width="540" height="180" fill="#f0f8ff" rx="10" />
      <text x="70" y="90" fontSize="16" fill="#333">
        {lang === "en" ? "Ripple Town Well" : "Ripple Town Brunnen"}
      </text>
      {step >= 1 && (
        <text x="70" y="120" fontSize="14" fill="#666">
          {lang === "en" ? "Huts by the river" : "Hütten am Fluss"}
        </text>
      )}
      {step >= 2 && (
        <text x="70" y="150" fontSize="14" fill="#666">
          {lang === "en" ? "Village grew bigger" : "Dorf wurde größer"}
        </text>
      )}
      {step >= 3 && (
        <text x="70" y="180" fontSize="14" fill="#e74c3c">
          {lang === "en" ? "Carts bump into each other" : "Kutschen stoßen zusammen"}
        </text>
      )}
      {step >= 4 && (
        <text x="70" y="210" fontSize="14" fill="#e74c3c">
          {lang === "en" ? "Well water turns brown" : "Brunnenwasser wird braun"}
        </text>
      )}
    </DiagramCanvas>
  );
}

export function ProblemDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Shared problems in town", "Gemeinsame Probleme im Dorf", lang)}>
      <rect x="50" y="50" width="540" height="180" fill="#fff5f5" rx="10" />
      <text x="70" y="90" fontSize="16" fill="#c0392b">
        {lang === "en" ? "Shared Spaces Falling Apart" : "Gemeinsame Räume verfallen"}
      </text>
      {step >= 1 && (
        <text x="70" y="120" fontSize="14" fill="#666">
          {lang === "en" ? "Everyone cares for own doorstep" : "Jeder sorgt für die eigene Haustür"}
        </text>
      )}
      {step >= 2 && (
        <text x="70" y="150" fontSize="14" fill="#e74c3c">
          {lang === "en" ? "Nobody fixes the shared road" : "Niemand repariert die gemeinsame Straße"}
        </text>
      )}
      {step >= 3 && (
        <text x="70" y="180" fontSize="14" fill="#e74c3c">
          {lang === "en" ? "Cracked stones at the well" : "Rissige Steine am Brunnen"}
        </text>
      )}
    </DiagramCanvas>
  );
}

export function CouncilDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Town council meeting", "Gemeinderatssitzung", lang)}>
      <rect x="50" y="50" width="540" height="180" fill="#f5f5f5" rx="10" />
      <text x="70" y="90" fontSize="16" fill="#333">
        {lang === "en" ? "Town Council Meeting" : "Gemeinderatssitzung"}
      </text>
      {step >= 1 && (
        <text x="70" y="120" fontSize="14" fill="#2ecc71">
          {lang === "en" ? "Otto gathers the villagers" : "Otto versammelt die Dorfbewohner"}
        </text>
      )}
      {step >= 2 && (
        <text x="70" y="150" fontSize="14" fill="#2ecc71">
          {lang === "en" ? "Need a plan for shared spaces" : "Brauchen einen Plan für gemeinsame Räume"}
        </text>
      )}
      {step >= 3 && (
        <text x="70" y="180" fontSize="14" fill="#2ecc71">
          {lang === "en" ? "Agree on traffic rules" : "Verkehrsregeln vereinbaren"}
        </text>
      )}
    </DiagramCanvas>
  );
}

export function PotDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Shared town pot", "Gemeinsamer Dorftopf", lang)}>
      <rect x="50" y="50" width="540" height="180" fill="#fef9e7" rx="10" />
      <text x="70" y="90" fontSize="16" fill="#d35400">
        {lang === "en" ? "The Shared Pot" : "Der gemeinsame Topf"}
      </text>
      {step >= 1 && (
        <text x="70" y="120" fontSize="14" fill="#666">
          {lang === "en" ? "Every family contributes coins" : "Jede Familie steuert Münzen bei"}
        </text>
      )}
      {step >= 2 && (
        <text x="70" y="150" fontSize="14" fill="#27ae60">
          {lang === "en" ? "Pay a town mason" : "Einen Dorfmaurer bezahlen"}
        </text>
      )}
      {step >= 3 && (
        <text x="70" y="180" fontSize="14" fill="#27ae60">
          {lang === "en" ? "Clean well and safe bridges" : "Sauberer Brunnen und sichere Brücken"}
        </text>
      )}
    </DiagramCanvas>
  );
}

export function RulesDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Public goods and government rules", "Öffentliche Güter und staatliche Regeln", lang)}>
      <rect x="50" y="50" width="540" height="180" fill="#e8f8f5" rx="10" />
      <text x="70" y="90" fontSize="16" fill="#333">
        {lang === "en" ? "Government and Public Goods" : "Regierung und öffentliche Güter"}
      </text>
      {step >= 1 && (
        <text x="70" y="120" fontSize="14" fill="#666">
          {lang === "en" ? "Coordination solves problems" : "Koordination löst Probleme"}
        </text>
      )}
      {step >= 2 && (
        <text x="70" y="150" fontSize="14" fill="#e67e22">
          {lang === "en" ? "Tragedy of the commons avoided" : "Tragik der Allmende vermieden"}
        </text>
      )}
      {step >= 3 && (
        <text x="70" y="180" fontSize="14" fill="#27ae60">
          {lang === "en" ? "Government organizes public goods" : "Regierung organisiert öffentliche Güter"}
        </text>
      )}
    </DiagramCanvas>
  );
}