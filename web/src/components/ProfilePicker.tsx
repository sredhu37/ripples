import { t } from "../i18n";
import type { Profile } from "../api";
import type { Lang } from "../progress";
import { LangSwitch } from "./LangSwitch";
import { LegalLinks } from "./LegalLinks";
import type { LegalPage } from "../legal/texts";
import { Otto } from "./Otto";
import { ProfileTile } from "./ProfileTile";

interface Props {
  lang: Lang;
  profiles: Profile[];
  onLang: (l: Lang) => void;
  onPick: (id: string) => void;
  onParents: () => void;
  onLegal: (page: LegalPage) => void;
}

/** The start screen of a logged-in device: a kid taps their own picture. No password for kids. */
export function ProfilePicker({ lang, profiles, onLang, onPick, onParents, onLegal }: Props) {
  return (
    <main className="screen center">
      <div className="lang-row">
        <LangSwitch lang={lang} onLang={onLang} />
      </div>
      <Otto size={140} />
      <h1>{t(lang, "pickerTitle")}</h1>
      {profiles.length === 0 && <p>{t(lang, "pickerNone")}</p>}
      <ul className="tile-grid">
        {profiles.map((p) => (
          <li key={p.id}>
            <ProfileTile nickname={p.nickname} avatar={p.avatar} onClick={() => onPick(p.id)} />
          </li>
        ))}
      </ul>
      <button className="btn btn-quiet" type="button" onClick={onParents}>
        {t(lang, "parents")}
      </button>
      <LegalLinks lang={lang} onOpen={onLegal} />
    </main>
  );
}
