import { t } from "../i18n";
import type { Lang } from "../progress";
import { sfx } from "../sound";

const LANG_OPTIONS: { lang: Lang; label: string }[] = [
  { lang: "en", label: "EN" },
  { lang: "de", label: "DE" },
  { lang: "pl", label: "PL" },
];

export function LangSwitch({ lang, onLang }: { lang: Lang; onLang: (l: Lang) => void }) {
  return (
    <div className="seg" role="group" aria-label={t(lang, "language")}>
      {LANG_OPTIONS.map(({ lang: l, label }) => (
        <button
          key={l}
          type="button"
          className={l === lang ? "seg-on" : ""}
          aria-pressed={l === lang}
          onClick={() => {
            sfx.tap();
            onLang(l);
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
