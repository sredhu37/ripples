import { useState } from "react";
import { MAX_PROFILES, type Profile } from "../api";
import { VILLAGERS, defaultAvatar } from "../avatar";
import { NO_LESSONS } from "../features";
import { t } from "../i18n";
import { CURRICULUM_GROUPS, LESSONS, getGroupTitle, getLessonTitle } from "../lessons";
import { cleanName, type Lang } from "../progress";
import { BackButton } from "./BackButton";
import { LangSwitch } from "./LangSwitch";
import { ProfileTile } from "./ProfileTile";

interface Props {
  lang: Lang;
  profiles: Profile[];
  /** The kid whose trail opened this screen. The lesson list starts on this kid. */
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
}

function makeGate() {
  return { a: 6 + Math.floor(Math.random() * 5), b: 6 + Math.floor(Math.random() * 5) };
}

interface FormProps {
  lang: Lang;
  initial: { nickname: string; avatar: string };
  submitLabel: string;
  onSubmit: (nickname: string, avatar: string) => void;
  onCancel?: () => void;
}

/** Nickname field with its hint, and the grid of villagers to pick from. */
function ProfileForm({ lang, initial, submitLabel, onSubmit, onCancel }: FormProps) {
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

/** Parent area: profiles, lessons per profile, fact cards, log out. Behind a maths gate. */
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
}: Props) {
  const [gate] = useState(makeGate);
  const [open, setOpen] = useState(!gated);
  const [answer, setAnswer] = useState("");
  const [gateWrong, setGateWrong] = useState(false);
  // "add", a profile id being edited, or nothing. With no profile yet the add form starts open.
  const [editing, setEditing] = useState<string | null>(profiles.length === 0 ? "add" : null);
  const [selectedId, setSelectedId] = useState<string | null>(activeId);

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

  const selected = profiles.find((p) => p.id === selectedId) ?? profiles[0];

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
          {profiles.map((p) =>
            editing === p.id ? (
              <li key={p.id}>
                <ProfileForm
                  lang={lang}
                  initial={p}
                  submitLabel={t(lang, "save")}
                  onSubmit={(nickname, avatar) => {
                    onChange(p.id, { nickname, avatar });
                    setEditing(null);
                  }}
                  onCancel={() => setEditing(null)}
                />
              </li>
            ) : (
              <li key={p.id} className="profile-row">
                <ProfileTile nickname={p.nickname} avatar={p.avatar} />
                <button
                  className="btn btn-quiet"
                  type="button"
                  aria-label={t(lang, "editProfile", { name: p.nickname })}
                  onClick={() => setEditing(p.id)}
                >
                  {t(lang, "edit")}
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  aria-label={t(lang, "deleteProfile", { name: p.nickname })}
                  onClick={() => {
                    if (window.confirm(t(lang, "deleteSure", { name: p.nickname }))) onDelete(p.id);
                  }}
                >
                  {t(lang, "delete")}
                </button>
              </li>
            ),
          )}
        </ul>
        {profiles.length >= MAX_PROFILES ? (
          <p role="status">{t(lang, "profileLimit", { n: MAX_PROFILES })}</p>
        ) : editing === "add" ? (
          <ProfileForm
            lang={lang}
            initial={{ nickname: "", avatar: defaultAvatar(profiles) }}
            submitLabel={t(lang, "addProfile")}
            onSubmit={(nickname, avatar) =>
              void onAdd(nickname, avatar).then((saved) => {
                if (saved) setEditing(null);
              })
            }
            onCancel={profiles.length > 0 ? () => setEditing(null) : undefined}
          />
        ) : (
          <button className="btn" type="button" onClick={() => setEditing("add")}>
            {t(lang, "addProfile")}
          </button>
        )}

        {selected && (
          <>
            <h2>{t(lang, "lessonSelectionTitle")}</h2>
            <p>{t(lang, "lessonSelectionHelp")}</p>
            <label htmlFor="lessons-for">{t(lang, "lessonsFor")}</label>
            <select
              id="lessons-for"
              className="text-input"
              value={selected.id}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nickname}
                </option>
              ))}
            </select>
            <div className="curriculum-groups">
              {CURRICULUM_GROUPS.map((group) => {
                const groupLessons = LESSONS.filter(
                  (l) => group.lessonIds.includes(l.id) && !paused.has(l.id),
                );
                if (groupLessons.length === 0) return null;
                const disabledCount = groupLessons.filter((l) =>
                  selected.disabledLessons.includes(l.id),
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
                        const isOff = selected.disabledLessons.includes(l.id);
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
                                onChange={(e) =>
                                  onToggleLesson(selected.id, l.id, e.target.checked)
                                }
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
          </>
        )}

        <h2>{t(lang, "factCards")}</h2>
        <p>{t(lang, "factCardsHelp")}</p>
        <button className="btn" type="button" onClick={onFacts}>
          {t(lang, "factCards")}
        </button>

        <div className="row">
          <button className="btn btn-quiet" type="button" onClick={onLogout}>
            {t(lang, "logout")}
          </button>
        </div>
      </div>
    </main>
  );
}
