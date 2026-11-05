import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./internet.css";

export function calcPacketRouting(north: boolean, central: boolean, south: boolean) {
  const deliveredCount = (north ? 1 : 0) + (central ? 1 : 0) + (south ? 1 : 0);
  const isComplete = deliveredCount === 3;
  const latencyMs = isComplete ? 28 : deliveredCount === 2 ? 65 : deliveredCount === 1 ? 120 : 0;
  const status = isComplete ? ("delivered" as const) : ("routing" as const);
  const assembledMessage = isComplete
    ? "HELLO RIPPLES!"
    : deliveredCount === 2
    ? "HEL... RIP..."
    : deliveredCount === 1
    ? "H... ..."
    : "...";

  return {
    deliveredCount,
    isComplete,
    latencyMs,
    status,
    assembledMessage,
  };
}

interface InternetToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function InternetToy({ lang, mode = "toy", onDone }: InternetToyProps) {
  const [north, setNorth] = useState(mode !== "quiz");
  const [central, setCentral] = useState(mode !== "quiz");
  const [south, setSouth] = useState(mode !== "quiz");
  const [showFeedback, setShowFeedback] = useState(false);

  const { deliveredCount, isComplete, latencyMs, assembledMessage } = calcPacketRouting(
    north,
    central,
    south
  );

  useEffect(() => {
    if (mode === "toy" && isComplete && onDone) {
      onDone();
    }
  }, [isComplete, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (isComplete && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  const northLabel = north
    ? lang === "pl"
      ? "Kabel Północny: Aktywny (Pakiet 1)"
      : lang === "de"
      ? "Nord-Kabel: Aktiv (Paket 1)"
      : "North Cable: Active (Packet 1)"
    : lang === "pl"
    ? "Podłącz Kabel Północny"
    : lang === "de"
    ? "Nord-Kabel verbinden"
    : "Connect North Cable";

  const centralLabel = central
    ? lang === "pl"
      ? "Kabel Środkowy: Aktywny (Pakiet 2)"
      : lang === "de"
      ? "Zentral-Kabel: Aktiv (Paket 2)"
      : "Central Cable: Active (Packet 2)"
    : lang === "pl"
    ? "Podłącz Kabel Środkowy"
    : lang === "de"
    ? "Zentral-Kabel verbinden"
    : "Connect Central Cable";

  const southLabel = south
    ? lang === "pl"
      ? "Kabel Południowy: Aktywny (Pakiet 3)"
      : lang === "de"
      ? "Sued-Kabel: Aktiv (Paket 3)"
      : "South Cable: Active (Packet 3)"
    : lang === "pl"
    ? "Podłącz Kabel Południowy"
    : lang === "de"
    ? "Sued-Kabel verbinden"
    : "Connect South Cable";

  const deliveredLabel =
    lang === "pl"
      ? "Dostarczone pakiety danych:"
      : lang === "de"
      ? "Zugestellte Datenpakete:"
      : "Data Packets Delivered:";

  const latencyLabel =
    lang === "pl"
      ? "Czas przesyłu przez ocean:"
      : lang === "de"
      ? "Untersee-Laufzeit:"
      : "Undersea Transit Time:";

  const reassembledLabel =
    lang === "pl"
      ? "Złożona wiadomość:"
      : lang === "de"
      ? "Zusammengesetzte Nachricht:"
      : "Reassembled Message:";

  return (
    <div className="internet-wrap">
      {/* 3 Router Selection Bar */}
      <div className="internet-routers-bar">
        <button
          type="button"
          className={`internet-router-btn ${north ? "active" : ""}`}
          onClick={() => {
            setNorth((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          {northLabel}
        </button>

        <button
          type="button"
          className={`internet-router-btn ${central ? "active" : ""}`}
          onClick={() => {
            setCentral((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          {centralLabel}
        </button>

        <button
          type="button"
          className={`internet-router-btn ${south ? "active" : ""}`}
          onClick={() => {
            setSouth((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          {southLabel}
        </button>
      </div>

      {/* Network transmission status card */}
      <div className={`internet-network-card ${isComplete ? "complete" : ""}`}>
        <div className="network-stat-row">
          <span>{deliveredLabel}</span>
          <strong className="packet-count">{deliveredCount} / 3</strong>
        </div>

        <div className="network-stat-row">
          <span>{latencyLabel}</span>
          <strong>{latencyMs > 0 ? `${latencyMs} ms` : "-"}</strong>
        </div>

        <div className="network-message-box">
          <span className="msg-label">{reassembledLabel}</span>
          <code className="msg-content">{assembledMessage}</code>
        </div>
      </div>

      <div className="internet-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`internet-feedback ${isComplete ? "success" : "warning"}`}>
            {isComplete
              ? lang === "pl"
                ? "Wspaniale! Wszystkie 3 pakiety dotarły bez uszkodzeń i złożyły się w kompletną wiadomość!"
                : lang === "de"
                ? "Hervorragend! Alle 3 Pakete kamen an und wurden zur vollstaendigen Nachricht zusammengesetzt!"
                : "Brilliant! All 3 packets arrived intact and assembled into the original message!"
              : lang === "pl"
              ? "Podłącz wszystkie trzy kable sieciowe, aby przesłać każdy pakiet danych."
              : lang === "de"
              ? "Verbinde alle drei Netzwerkkabel, um jedes Datenpaket zu uebertragen."
              : "Connect all three network cables to deliver every packet."}
          </div>
        )}
      </div>
    </div>
  );
}
