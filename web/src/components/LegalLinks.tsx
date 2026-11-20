import { t } from "../i18n";
import type { Lang } from "../progress";
import type { LegalPage } from "../legal/texts";

const PAGES: { page: LegalPage; label: "legalImpressum" | "legalPrivacy" | "legalTerms" }[] = [
  { page: "impressum", label: "legalImpressum" },
  { page: "privacy", label: "legalPrivacy" },
  { page: "terms", label: "legalTerms" },
];

interface Props {
  lang: Lang;
  onOpen: (page: LegalPage) => void;
}

/** Links to the Impressum, privacy policy and terms. Shown on the login and profile screens. */
export function LegalLinks({ lang, onOpen }: Props) {
  return (
    <nav className="legal-links">
      {PAGES.map(({ page, label }) => (
        <button key={page} type="button" onClick={() => onOpen(page)}>
          {t(lang, label)}
        </button>
      ))}
    </nav>
  );
}
