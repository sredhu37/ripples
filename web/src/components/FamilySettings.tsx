import { useState } from "react";
import { MAX_PROFILES, type Profile } from "../api";
import { VILLAGERS, defaultAvatar } from "../avatar";
import { NO_LESSONS } from "../features";
import { t } from "../i18n";
import { CURRICULUM_GROUPS, LESSONS, getGroupTitle, getLessonTitle } from "../lessons";
import { cleanName, type Lang } from "../progress";
import { BackButton } from "./BackButton";
import { ConfirmDialog } from "./ConfirmDialog";
import { LangSwitch } from "./LangSwitch";
import { ProfileTile } from "./ProfileTile";

interface Props {
  lang: Lang;
  profiles: Profile[];
  /** The kid whose trail opened this screen. The screen starts on this kid's detail. */
  activeId?: string | null;
  /** Ask the maths question first. False right after login with no profile yet. */
  gated: boolean;
  /** Paused lessons (see `features.ts`): left out of the lesson list. Default: none. */
  paused?: ReadonlySet<string>;
  onLang: (l: Lang) => void;
  /** Resolves to false when the profile was not saved. */
  onAdd: (nickname: string, avatar: string) => Promise<boolean>;
  onChange: (id: string, changes: { nickname?: string; avatar?: string }) => void;
  onDelete: (id: string) => void;
  onToggleLesson: (id: string, lessonId: string, enabled: boolean) => void;
  onFacts: () => void;
  onLogout: () => void;
  onClose: () => void;
  /** Opened from the picker's "Add a kid" tile: the add form starts open and focused. */
  addKid?: boolean;
  /** Called after a profile was saved from the "Add a kid" path. */
  onAdded?: () => void;
}

function makeGate() {
  return { a: 6 + Math.floor(Math.random() * 5), b: 6 + Math.floor(Math.random() * 5) };
}

interface FormProps {
  lang: Lang;
  initial: { nickname: string; avatar: string };
  submitLabel: string;
  autoFocus?: boolean;
  onSubmit: (nickname: string, avatar: string) => void;
  onCancel?: () => void;
}

/** Nickname field with its hint, and the grid of villagers to pick from. */
export function ProfileForm({
  lang,
  initial,
  submitLabel,
  autoFocus,
  onSubmit,
  onCancel,
}: FormProps) {
  const [nickname, setNickname] = useState(initial.nickname);
  const [avatar, setAvatar] = useState(initial.avatar);
  const clean = cleanName(nickname);
  return (
    <form
      className="profile-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (clean) onSubmit(clean, avatar);
      }}
    >
      <label htmlFor="profile-nickname">{t(lang, "nicknameLabel")}</label>
      <input
        id="profile-nickname"
        className="text-input"
        value={nickname}
        maxLength={20}
        autoFocus={autoFocus}
        autoComplete="off"
        aria-describedby="profile-nickname-hint"
        onChange={(e) => setNickname(e.target.value)}
      />
      <p id="profile-nickname-hint" className="login-hint">
        {t(lang, "nicknameHint")}
      </p>
      <p>{t(lang, "pickAvatar")}</p>
      <ul className="tile-grid tile-grid-small">
        {VILLAGERS.map((name) => (
          <li key={name}>
            <ProfileTile
              nickname={name}
              avatar={name}
              selected={avatar === name}
              onClick={() => setAvatar(name)}
            />
          </li>
        ))}
      </ul>
      <div className="row">
        <button className="btn" type="submit" disabled={!clean}>
          {submitLabel}
        </button>
        {onCancel && (
          <button className="btn btn-quiet" type="button" onClick={onCancel}>
            {t(lang, "cancel")}
          </button>
        )}
      </div>
    </form>
  );
}

interface LessonListProps {
  lang: Lang;
  profile: Profile;
  paused: ReadonlySet<string>;
  onToggleLesson: (id: string, lessonId: string, enabled: boolean) => void;
}

/** One kid's lessons: a group accordion per curriculum group, a switch per lesson. */
function LessonList({ lang, profile, paused, onToggleLesson }: LessonListProps) {
  return (
    <div className="curriculum-groups">
      {CURRICULUM_GROUPS.map((group) => {
        const groupLessons = LESSONS.filter(
          (l) => group.lessonIds.includes(l.id) && !paused.has(l.id),
        );
        if (groupLessons.length === 0) return null;
        const disabledCount = groupLessons.filter((l) =>
          profile.disabledLessons.includes(l.id),
        ).length;
        return (
          <details key={group.id} className="lesson-group-accordion">
            <summary className="lesson-group-summary">
              <span className="lesson-group-title">{getGroupTitle(group, lang)}</span>
              <span className="lesson-group-count">
                {groupLessons.length - disabledCount} / {groupLessons.length}
              </span>
            </summary>
            <div className="lesson-toggle-list">
              {groupLessons.map((l) => {
                const isOff = profile.disabledLessons.includes(l.id);
                const title = getLessonTitle(l, lang);
                return (
                  <label
                    key={l.id}
                    className={`lesson-toggle-row ${isOff ? "lesson-toggle-row-off" : ""}`}
                  >
                    <span className="lesson-toggle-info">
                      <span className="lesson-toggle-title">{title}</span>
                      <span className="lesson-toggle-status">
                        {t(lang, isOff ? "lessonDisabled" : "lessonEnabled")}
                      </span>
                    </span>
                    <span className="toggle-switch">
                      <input
                        type="checkbox"
                        className="toggle-input"
                        checked={!isOff}
                        onChange={(e) => onToggleLesson(profile.id, l.id, e.target.checked)}
                        aria-label={`${title}: ${t(lang, isOff ? "lessonDisabled" : "lessonEnabled")}`}
                      />
                      <span className="toggle-slider" aria-hidden="true" />
                    </span>
                  </label>
                );
              })}
            </div>
          </details>
        );
      })}
    </div>
  );
}

/** Parent area: kid list, one detail per kid, fact cards, account. Behind a maths gate. */
export function FamilySettings({
  lang,
  profiles,
  activeId = null,
  gated,
  paused = NO_LESSONS,
  onLang,
  onAdd,
  onChange,
  onDelete,
  onToggleLesson,
  onFacts,
  onLogout,
  onClose,
  addKid = false,
  onAdded,
}: Props) {
  const [gate] = useState(makeGate);
  const [open, setOpen] = useState(!gated);
  const [answer, setAnswer] = useState("");
  const [gateWrong, setGateWrong] = useState(false);
  // "add", the id of the kid whose detail is open, or null for the kid list.
  // With no profile yet, or from the picker's Add a kid tile, the add form starts open.
  // From a trail it starts on that kid.
  const [view, setView] = useState<string | null>(() =>
    profiles.length === 0 || addKid
      ? "add"
      : profiles.some((p) => p.id === activeId)
        ? activeId
        : null,
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Both the gate and the settings leave to the trail with a kid active, else the picker.
  const backButton = (
    <BackButton label={t(lang, activeId ? "allLessons" : "pickerTitle")} onClick={onClose} />
  );

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
          {backButton}
          <div className="panel-head">
            <h2>{t(lang, "parents")}</h2>
            <LangSwitch lang={lang} onLang={onLang} />
          </div>
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
          </div>
        </form>
      </main>
    );
  }

  const kid = profiles.find((p) => p.id === view);

  if (kid) {
    return (
      <main className="screen parent-screen">
        <div className="panel parent-panel">
          <div className="panel-head">
            <BackButton label={t(lang, "backToKids")} onClick={() => setView(null)} />
            <LangSwitch lang={lang} onLang={onLang} />
          </div>

          <h2>{kid.nickname}</h2>
          <ProfileForm
            key={kid.id}
            lang={lang}
            initial={kid}
            submitLabel={t(lang, "save")}
            onSubmit={(nickname, avatar) => {
              onChange(kid.id, { nickname, avatar });
              setView(null);
            }}
          />

          <h2>{t(lang, "lessonsOf", { name: kid.nickname })}</h2>
          <p>{t(lang, "lessonSelectionHelp")}</p>
          <LessonList lang={lang} profile={kid} paused={paused} onToggleLesson={onToggleLesson} />

          <button className="btn-text-danger" type="button" onClick={() => setConfirmDelete(true)}>
            {t(lang, "deleteProfile", { name: kid.nickname })}
          </button>
        </div>
        {confirmDelete && (
          <ConfirmDialog
            title={t(lang, "deleteTitle", { name: kid.nickname })}
            message={t(lang, "deleteSure", { name: kid.nickname })}
            confirmLabel={t(lang, "delete")}
            cancelLabel={t(lang, "cancel")}
            onCancel={() => setConfirmDelete(false)}
            onConfirm={() => {
              setConfirmDelete(false);
              setView(null);
              onDelete(kid.id);
            }}
          />
        )}
      </main>
    );
  }

  return (
    <main className="screen parent-screen">
      <div className="panel parent-panel">
        {backButton}
        <div className="panel-head">
          <h2>{t(lang, "familyTitle")}</h2>
          <LangSwitch lang={lang} onLang={onLang} />
        </div>

        <h2>{t(lang, "profilesTitle")}</h2>
        <ul className="profile-list">
          {profiles.map((p) => (
            <li key={p.id} className="profile-row">
              <ProfileTile nickname={p.nickname} avatar={p.avatar} onClick={() => setView(p.id)} />
              <button
                className="btn btn-quiet"
                type="button"
                aria-label={t(lang, "editProfile", { name: p.nickname })}
                onClick={() => setView(p.id)}
              >
                {t(lang, "edit")}
              </button>
            </li>
          ))}
        </ul>
        {profiles.length >= MAX_PROFILES ? (
          <p role="status">{t(lang, "profileLimit", { n: MAX_PROFILES })}</p>
        ) : view === "add" ? (
          <ProfileForm
            lang={lang}
            initial={{ nickname: "", avatar: defaultAvatar(profiles) }}
            submitLabel={t(lang, "addProfile")}
            autoFocus={addKid}
            onSubmit={(nickname, avatar) =>
              void onAdd(nickname, avatar).then((saved) => {
                if (!saved) return;
                setView(null);
                if (addKid) onAdded?.();
              })
            }
            onCancel={profiles.length > 0 ? () => setView(null) : undefined}
          />
        ) : (
          <button className="btn" type="button" onClick={() => setView("add")}>
            {t(lang, "addProfile")}
          </button>
        )}

        <h2>{t(lang, "factCards")}</h2>
        <p>{t(lang, "factCardsHelp")}</p>
        <button className="btn" type="button" onClick={onFacts}>
          {t(lang, "factCards")}
        </button>

        <section className="account-section" aria-labelledby="account-title">
          <h2 id="account-title">{t(lang, "accountTitle")}</h2>
          <button className="btn-text" type="button" onClick={onLogout}>
            {t(lang, "logout")}
          </button>
        </section>
      </div>
    </main>
  );
}
