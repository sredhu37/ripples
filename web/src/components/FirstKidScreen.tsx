import { defaultAvatar } from "../avatar";
import { t } from "../i18n";
import type { Lang } from "../progress";
import { ProfileForm } from "./FamilySettings";
import { LangSwitch } from "./LangSwitch";
import { Otto } from "./Otto";

interface Props {
  lang: Lang;
  onLang: (l: Lang) => void;
  /** Resolves to false when the profile was not saved. */
  onAdd: (nickname: string, avatar: string) => Promise<boolean>;
  /** Called after the kid was saved. */
  onAdded: () => void;
}

/** First run: a family with no kid profile adds the first one. No maths gate here. */
export function FirstKidScreen({ lang, onLang, onAdd, onAdded }: Props) {
  return (
    <main className="screen center">
      <div className="lang-row">
        <LangSwitch lang={lang} onLang={onLang} />
      </div>
      <Otto size={140} />
      <h1>{t(lang, "firstKidTitle")}</h1>
      <p>{t(lang, "firstKidIntro")}</p>
      <ProfileForm
        lang={lang}
        initial={{ nickname: "", avatar: defaultAvatar([]) }}
        submitLabel={t(lang, "firstKidAdd")}
        onSubmit={(nickname, avatar) =>
          void onAdd(nickname, avatar).then((saved) => {
            if (saved) onAdded();
          })
        }
      />
    </main>
  );
}
