import { logOut } from "../auth";
import { t } from "../i18n";
import type { Lang } from "../progress";
import type { LegalPage } from "../legal/texts";
import { LangSwitch } from "./LangSwitch";
import { LegalLinks } from "./LegalLinks";

interface Props {
  lang: Lang;
  email: string;
  onLang: (l: Lang) => void;
  onLoggedOut: () => void;
  onClose: () => void;
  onLegal: (page: LegalPage) => void;
}

/** Where a parent lands after login. Kid profiles come in a later ticket. */
export function ProfileScreen({ lang, email, onLang, onLoggedOut, onClose, onLegal }: Props) {
  return (
    <main className="screen center">
      <div className="panel">
        <div className="panel-head">
          <h2>{t(lang, "profileTitle")}</h2>
          <LangSwitch lang={lang} onLang={onLang} />
        </div>
        <p>{t(lang, "profileAs", { email })}</p>
        <p>{t(lang, "profileSoon")}</p>
        <div className="row">
          <button
            className="btn btn-quiet"
            type="button"
            onClick={() => void logOut().then(onLoggedOut)}
          >
            {t(lang, "logout")}
          </button>
          <button className="btn btn-quiet" type="button" onClick={onClose}>
            {t(lang, "back")}
          </button>
        </div>
        <LegalLinks lang={lang} onOpen={onLegal} />
      </div>
    </main>
  );
}
