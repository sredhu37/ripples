import { useEffect, useState } from "react";
import { t } from "../i18n";
import type { Lang } from "../progress";
import { getLegalDetails, type LegalDetails } from "../legal/api";
import { IMPRESSUM_LABELS, TEXTS, UPDATED, UPDATED_LABEL, type LegalPage } from "../legal/texts";
import { LangSwitch } from "./LangSwitch";

interface Props {
  lang: Lang;
  page: LegalPage;
  onLang: (l: Lang) => void;
  onPage: (page: LegalPage) => void;
  onClose: () => void;
}

const TABS: { page: LegalPage; label: "legalImpressum" | "legalPrivacy" | "legalTerms" }[] = [
  { page: "impressum", label: "legalImpressum" },
  { page: "privacy", label: "legalPrivacy" },
  { page: "terms", label: "legalTerms" },
];

function Impressum({ lang }: { lang: Lang }) {
  const [details, setDetails] = useState<LegalDetails | null | "loading">("loading");
  useEffect(() => {
    let live = true;
    void getLegalDetails().then((d) => live && setDetails(d));
    return () => {
      live = false;
    };
  }, []);

  if (details === "loading") return null;
  const labels = IMPRESSUM_LABELS[lang];
  const rows: [string, string[]][] = details
    ? [
        [labels.name, details.name ? [details.name] : []],
        [labels.address, details.address],
        [labels.email, details.email ? [details.email] : []],
        [labels.phone, details.phone ? [details.phone] : []],
        [labels.vatId, details.vatId ? [details.vatId] : []],
      ]
    : [];
  const shown = rows.filter(([, lines]) => lines.length > 0);
  if (shown.length === 0) return <p role="status">{labels.missing}</p>;
  return (
    <dl>
      {shown.map(([label, lines]) => (
        <div key={label}>
          <dt>
            <strong>{label}</strong>
          </dt>
          <dd>
            {lines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** One legal page (Impressum, privacy policy or terms) with tabs for the other two. */
export function LegalScreen({ lang, page, onLang, onPage, onClose }: Props) {
  const text = TEXTS[page][lang];
  return (
    <main className="screen center">
      <div className="panel">
        <div className="panel-head">
          <h2>{text.title}</h2>
          <LangSwitch lang={lang} onLang={onLang} />
        </div>
        <nav className="legal-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.page}
              type="button"
              aria-current={tab.page === page ? "page" : undefined}
              onClick={() => onPage(tab.page)}
            >
              {t(lang, tab.label)}
            </button>
          ))}
        </nav>
        <div className="legal-text">
          {text.sections.map((s) => (
            <section key={s.heading}>
              <h3>{s.heading}</h3>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
          {page === "impressum" && <Impressum lang={lang} />}
          <p className="legal-updated">
            {UPDATED_LABEL[lang]}: {UPDATED}
          </p>
        </div>
        <div className="row">
          <button className="btn btn-quiet" type="button" onClick={onClose}>
            {t(lang, "back")}
          </button>
        </div>
      </div>
    </main>
  );
}
