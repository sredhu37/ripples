import { useEffect, useState } from "react";
import { sendLoginCode, verifyLoginCode } from "../auth";
import { t } from "../i18n";
import type { Lang } from "../progress";
import { LangSwitch } from "./LangSwitch";

/** Seconds before the parent may ask for another code. The API allows 3 sends a minute. */
export const RESEND_COOLDOWN_S = 30;

interface Props {
  lang: Lang;
  onLang: (l: Lang) => void;
  onLoggedIn: (email: string) => void;
  onClose: () => void;
}

type Failure = "wrong" | "too_many" | "failed" | null;

const FAILURE_TEXT = {
  wrong: "loginWrong",
  too_many: "loginTooMany",
  failed: "loginFailed",
} as const;

/** Parent login in two steps: email, then the 6-digit Login code. */
export function LoginScreen({ lang, onLang, onLoggedIn, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [failure, setFailure] = useState<Failure>(null);
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const cleanEmail = email.trim();

  async function send() {
    setBusy(true);
    setFailure(null);
    const result = await sendLoginCode(cleanEmail);
    setBusy(false);
    if (result === "sent") {
      setStep("code");
      setCode("");
      setCooldown(RESEND_COOLDOWN_S);
    } else {
      setFailure(result);
    }
  }

  async function verify() {
    setBusy(true);
    setFailure(null);
    const result = await verifyLoginCode(cleanEmail, code);
    setBusy(false);
    if (result === "ok") onLoggedIn(cleanEmail);
    else setFailure(result);
  }

  const error = failure && (
    <p role="alert" className="login-error">
      {t(lang, FAILURE_TEXT[failure])}
    </p>
  );

  return (
    <main className="screen center">
      {step === "email" ? (
        <form
          className="panel"
          onSubmit={(e) => {
            e.preventDefault();
            if (cleanEmail) void send();
          }}
        >
          <div className="panel-head">
            <h2>{t(lang, "loginTitle")}</h2>
            <LangSwitch lang={lang} onLang={onLang} />
          </div>
          <label htmlFor="login-email">{t(lang, "loginEmail")}</label>
          <input
            id="login-email"
            className="text-input"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error}
          <div className="row">
            <button className="btn" type="submit" disabled={busy || !cleanEmail}>
              {t(lang, "loginSend")}
            </button>
            <button className="btn btn-quiet" type="button" onClick={onClose}>
              {t(lang, "back")}
            </button>
          </div>
        </form>
      ) : (
        <form
          className="panel"
          onSubmit={(e) => {
            e.preventDefault();
            if (/^\d{6}$/.test(code)) void verify();
          }}
        >
          <div className="panel-head">
            <h2>{t(lang, "loginTitle")}</h2>
            <LangSwitch lang={lang} onLang={onLang} />
          </div>
          <p>{t(lang, "loginSent", { email: cleanEmail })}</p>
          <p className="login-hint">{t(lang, "loginSpam")}</p>
          <label htmlFor="login-code">{t(lang, "loginCode")}</label>
          <input
            id="login-code"
            className="text-input"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          />
          {error}
          <div className="row">
            <button className="btn" type="submit" disabled={busy || code.length !== 6}>
              {t(lang, "loginGo")}
            </button>
            <button
              className="btn btn-quiet"
              type="button"
              disabled={busy || cooldown > 0}
              onClick={() => void send()}
            >
              {cooldown > 0 ? t(lang, "loginResendIn", { s: cooldown }) : t(lang, "loginResend")}
            </button>
          </div>
          <button
            className="btn btn-quiet"
            type="button"
            onClick={() => {
              setStep("email");
              setFailure(null);
            }}
          >
            {t(lang, "loginOtherEmail")}
          </button>
        </form>
      )}
    </main>
  );
}
