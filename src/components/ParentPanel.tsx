import { useState } from "react";
import { LESSON_ORDER } from "../lessons";
import { t } from "../i18n";
import { exportCode, importCode, type Progress } from "../progress";

interface Props {
  progress: Progress;
  onRestore: (p: Progress) => void;
  onReset: () => void;
  onFacts: () => void;
  onClose: () => void;
}

function makeGate() {
  return { a: 6 + Math.floor(Math.random() * 5), b: 6 + Math.floor(Math.random() * 5) };
}

/** Parent area. A small multiplication gate keeps a young child out of it. */
export function ParentPanel({ progress, onRestore, onReset, onFacts, onClose }: Props) {
  const lang = progress.lang;
  const [gate] = useState(makeGate);
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [gateWrong, setGateWrong] = useState(false);
  const [pasted, setPasted] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const code = exportCode(progress, LESSON_ORDER);

  if (!open) {
    return (
      <main className="screen center">
        <form
          className="panel"
          onSubmit={(e) => {
            e.preventDefault();
            if (Number(answer) === gate.a * gate.b) setOpen(true);
            else setGateWrong(true);
          }}
        >
          <h2>{t(lang, "parents")}</h2>
          <p>{t(lang, "gateQuestion", gate)}</p>
          <input
            className="text-input"
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            aria-label={t(lang, "gateQuestion", gate)}
          />
          {gateWrong && <p role="alert">{t(lang, "gateWrong")}</p>}
          <div className="row">
            <button className="btn" type="submit">
              {t(lang, "gateGo")}
            </button>
            <button className="btn btn-quiet" type="button" onClick={onClose}>
              {t(lang, "back")}
            </button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className="screen center">
      <div className="panel">
        <h2>{t(lang, "factCards")}</h2>
        <p>{t(lang, "factCardsHelp")}</p>
        <button className="btn" type="button" onClick={onFacts}>
          {t(lang, "factCards")}
        </button>

        <h2>{t(lang, "saveTitle")}</h2>
        <p>{t(lang, "saveHelp")}</p>
        <textarea className="text-input code" readOnly value={code} rows={3} aria-label={t(lang, "saveTitle")} />
        <button
          className="btn"
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? t(lang, "copied") : t(lang, "copy")}
        </button>

        <h2>{t(lang, "restoreTitle")}</h2>
        <p>{t(lang, "restoreHelp")}</p>
        <textarea
          className="text-input code"
          rows={3}
          value={pasted}
          onChange={(e) => setPasted(e.target.value)}
          aria-label={t(lang, "restoreTitle")}
        />
        <button
          className="btn"
          type="button"
          onClick={() => {
            const restored = importCode(pasted, LESSON_ORDER);
            if (restored) {
              onRestore({ ...restored, muted: progress.muted });
              setMessage(t(restored.lang, "restoreOk"));
            } else {
              setMessage(t(lang, "restoreBad"));
            }
          }}
        >
          {t(lang, "restoreGo")}
        </button>
        {message && <p role="status">{message}</p>}

        <h2>{t(lang, "resetTitle")}</h2>
        <p>{t(lang, "resetHelp")}</p>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {
            if (window.confirm(t(lang, "resetSure"))) onReset();
          }}
        >
          {t(lang, "resetGo")}
        </button>

        <button className="btn btn-quiet" type="button" onClick={onClose}>
          {t(lang, "close")}
        </button>
      </div>
    </main>
  );
}
