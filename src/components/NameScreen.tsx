import { useState } from "react";
import { t } from "../i18n";
import { cleanName, type AgeGroup, type Lang } from "../progress";
import { sfx } from "../sound";
import { LangSwitch } from "./LangSwitch";
import { Otto } from "./Otto";
import { SpeechBubble } from "./SpeechBubble";

export { LangSwitch };

interface Props {
  lang: Lang;
  onLang: (l: Lang) => void;
  onDone: (name: string, ageGroup: AgeGroup) => void;
}

export function NameScreen({ lang, onLang, onDone }: Props) {
  const [value, setValue] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("junior");
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
          onDone(name, ageGroup);
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

        <div className="age-group-field" role="group" aria-label={t(lang, "ageGroupTitle")}>
          <div className="age-pill-row">
            <button
              type="button"
              className={`age-pill-btn ${ageGroup === "junior" ? "active" : ""}`}
              onClick={() => {
                sfx.tap();
                setAgeGroup("junior");
              }}
              aria-pressed={ageGroup === "junior"}
            >
              <span className="age-pill-label">{t(lang, "ageJunior")}</span>
              <span className="age-pill-desc">{t(lang, "ageJuniorDesc")}</span>
            </button>
            <button
              type="button"
              className={`age-pill-btn ${ageGroup === "senior" ? "active" : ""}`}
              onClick={() => {
                sfx.tap();
                setAgeGroup("senior");
              }}
              aria-pressed={ageGroup === "senior"}
            >
              <span className="age-pill-label">{t(lang, "ageSenior")}</span>
              <span className="age-pill-desc">{t(lang, "ageSeniorDesc")}</span>
            </button>
          </div>
        </div>

        <button className="btn" type="submit" disabled={!name}>
          {t(lang, "nameGo")}
        </button>
      </form>
    </main>
  );
}
