// PROTOTYPE, throwaway. Standalone page for the world-map timeline variants.
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import type { Lang } from "../progress";
import "../styles.css";
import { TimelineMapPrototype } from "./TimelineMapPrototype";

function Standalone() {
  const [lang, setLang] = useState<Lang>(
    (new URLSearchParams(location.search).get("lang") ?? "en") as Lang,
  );
  return <TimelineMapPrototype lang={lang} onLang={setLang} onClose={() => {}} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Standalone />
  </StrictMode>,
);
