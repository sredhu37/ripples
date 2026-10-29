import { useState } from "react";
import { t } from "../i18n";
import { cleanName, type Lang } from "../progress";
import { sfx } from "../sound";
import { Otto } from "./Otto";
import { SpeechBubble } from "./SpeechBubble";

interface Props {
  lang: Lang;
  onLang: (l: Lang) => void;
  onDone: (name: string) => void;
}

export function NameScreen({ lang, onLang, onDone }: Props) {
  const [value, setValue] = useState("");
  const name = cleanName(value);

  return (
    <main className="screen center">
      <div className="lang-row">
        <LangSwitch lang={lang} onLang={onLang} />
      </div>
      <Otto size={180} />
      <SpeechBubble text={t(lang, "askName")} lang={lang} />
      <form
        className="name-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name) return;
          sfx.pop();
          onDone(name);
        }}
      >
        <input
          className="text-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t(lang, "namePlaceholder")}
          maxLength={20}
          autoComplete="off"
          autoCapitalize="words"
          aria-label={t(lang, "namePlaceholder")}
        />
        <button className="btn" type="submit" disabled={!name}>
          {t(lang, "nameGo")}
        </button>
      </form>
    </main>
  );
}

export function LangSwitch({ lang, onLang }: { lang: Lang; onLang: (l: Lang) => void }) {
  return (
    <div className="seg" role="group" aria-label={t(lang, "language")}>
      {(["en", "de"] as const).map((l) => (
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
          {l === "en" ? "EN" : "DE"}
        </button>
      ))}
    </div>
  );
}
