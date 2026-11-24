// PROTOTYPE, throwaway. World-map timeline: three variants switchable with ?variant=A|B|C.
// Standalone entry (prototype-timeline-map.html) because the real timeline screen sits behind login.
import { useEffect, useState } from "react";
import { BackButton } from "../components/BackButton";
import { LangSwitch } from "../components/LangSwitch";
import { t } from "../i18n";
import type { Lang } from "../progress";
import "./proto.css";
import { lessonTitle, S } from "./shared";
import { VariantA, VariantB, VariantC } from "./variants";
import { VariantD } from "./variantD";

const VARIANTS = [
  { key: "D", name: "Mix of A, B and C", C: VariantD },
  { key: "A", name: "Cloud at the pin", C: VariantA },
  { key: "B", name: "Otto thinks it", C: VariantB },
  { key: "C", name: "Zoom into a region", C: VariantC },
];

function readParam(name: string, fallback: string) {
  return new URLSearchParams(location.search).get(name) ?? fallback;
}

interface Props {
  lang: Lang;
  onLang: (l: Lang) => void;
  onClose: () => void;
}

/** Mounted by the World Timeline button on the prototype branch, and by the standalone page. */
export function TimelineMapPrototype({ lang, onLang: setLang, onClose }: Props) {
  const [variant, setVariant] = useState(readParam("variant", "D"));
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
      if (el?.getAttribute("role") === "slider") return;
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
      <BackButton label={t(lang, "allLessons")} onClick={onClose} />
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
