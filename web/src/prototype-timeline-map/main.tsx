// PROTOTYPE, throwaway. World-map timeline: three variants switchable with ?variant=A|B|C.
// Standalone entry (prototype-timeline-map.html) because the real timeline screen sits behind login.
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BackButton } from "../components/BackButton";
import { LangSwitch } from "../components/LangSwitch";
import { t } from "../i18n";
import type { Lang } from "../progress";
import "../styles.css";
import "./proto.css";
import { lessonTitle, S } from "./shared";
import { VariantA, VariantB, VariantC } from "./variants";

const VARIANTS = [
  { key: "A", name: "Cloud at the pin", C: VariantA },
  { key: "B", name: "Otto thinks it", C: VariantB },
  { key: "C", name: "Zoom into a region", C: VariantC },
];

function readParam(name: string, fallback: string) {
  return new URLSearchParams(location.search).get(name) ?? fallback;
}

function Proto() {
  const [variant, setVariant] = useState(readParam("variant", "A"));
  const [lang, setLang] = useState<Lang>(readParam("lang", "en") as Lang);
  const [toast, setToast] = useState<string | null>(null);
  const i = Math.max(
    0,
    VARIANTS.findIndex((v) => v.key === variant),
  );
  const V = VARIANTS[i];

  const go = (d: number) => {
    const next = VARIANTS[(i + d + VARIANTS.length) % VARIANTS.length].key;
    const u = new URL(location.href);
    u.searchParams.set("variant", next);
    history.replaceState(null, "", u);
    setVariant(next);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <main className="screen timeline-screen tm-screen">
      <BackButton label={t(lang, "allLessons")} onClick={() => setToast("Prototype: back to the trail")} />
      <header className="topbar">
        <h1 className="logo">{t(lang, "worldTimeline")}</h1>
        <LangSwitch lang={lang} onLang={setLang} />
      </header>
      <V.C
        key={V.key}
        lang={lang}
        onReadMore={(id) => setToast(`${S.opens[lang]}: ${lessonTitle(id, lang)}`)}
      />
      {toast && <div className="tm-toast">{toast}</div>}
      <nav className="tm-switcher" aria-label="Prototype variants">
        <button type="button" onClick={() => go(-1)} aria-label="Previous variant">
          ←
        </button>
        <span>
          {V.key} ({V.name})
        </span>
        <button type="button" onClick={() => go(1)} aria-label="Next variant">
          →
        </button>
      </nav>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Proto />
  </StrictMode>,
);
