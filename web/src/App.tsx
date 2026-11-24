import { useEffect, useState } from "react";
import {
  ApiError,
  changeProfile,
  createProfile,
  fetchFamily,
  removeProfile,
  saveBadge,
  type Profile,
  type ProfileChanges,
} from "./api";
import { getSessionEmail, logOut } from "./auth";
import { loadDeviceLang, saveDeviceLang } from "./deviceLang";
import { FactCards } from "./components/FactCards";
import { FamilySettings } from "./components/FamilySettings";
import { FirstKidScreen } from "./components/FirstKidScreen";
import { LoginScreen } from "./components/LoginScreen";
import { ProfilePicker } from "./components/ProfilePicker";
import { LegalScreen } from "./components/LegalScreen";
import type { LegalPage } from "./legal/texts";
import { getLesson } from "./content";
import { NO_LESSONS, fetchFeatures, pausedLessons } from "./features";
import { t } from "./i18n";
import { LessonRunner } from "./lesson/LessonRunner";
import { LESSONS } from "./lessons";
import { LessonPlaceholder } from "./components/LessonPlaceholder";
import { MapScreen } from "./components/MapScreen";
import { TimelineScreen } from "./components/TimelineScreen";
import { emptyProgress, progressFromProfile, toggleLesson, type Lang } from "./progress";
import { setMuted } from "./sound";
import { stopSpeaking } from "./speech";

type Screen =
  | { kind: "loading" }
  | { kind: "login" }
  | { kind: "firstKid" }
  | { kind: "picker" }
  | { kind: "settings"; gated: boolean }
  | { kind: "map" }
  | { kind: "lesson"; id: string }
  | { kind: "facts" }
  | { kind: "timeline" }
  | { kind: "legal"; page: LegalPage; back: Screen };

export function App() {
  const [deviceLang, setDeviceLang] = useState<Lang>(() => loadDeviceLang(window.localStorage));
  // The family's profiles and the active profile: the API is the source of truth.
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [notSaved, setNotSaved] = useState(false);
  const [paused, setPaused] = useState<ReadonlySet<string>>(NO_LESSONS);
  const [screen, setScreen] = useState<Screen>({ kind: "loading" });

  const active = profiles.find((p) => p.id === activeId) ?? null;
  const progress = active ? progressFromProfile(active) : { ...emptyProgress(), lang: deviceLang };

  useEffect(() => {
    setMuted(progress.muted);
    if (progress.muted) stopSpeaking();
    document.documentElement.lang = progress.lang;
  }, [progress.muted, progress.lang]);

  /** Loads the family, then shows the picker, or the first-run screen when there is no profile. */
  async function enterFamily() {
    try {
      const family = await fetchFamily();
      setProfiles(family);
      setActiveId(null);
      setScreen(family.length === 0 ? { kind: "firstKid" } : { kind: "picker" });
    } catch {
      setScreen({ kind: "login" });
    }
  }

  // A device with a parent session opens the picker; one without opens the login screen.
  useEffect(() => {
    void getSessionEmail().then((email) => {
      if (email) void enterFamily();
      else setScreen({ kind: "login" });
    });
  }, []);

  // Feature flags are read once at start. No API or a failed request: no Paused lessons.
  useEffect(() => {
    void fetchFeatures().then((features) =>
      setPaused(
        pausedLessons(
          features,
          LESSONS.map((l) => l.id),
        ),
      ),
    );
  }, []);

  useEffect(() => {
    stopSpeaking();
    // Every screen starts at the top, not where the last one was scrolled.
    window.scrollTo(0, 0);
  }, [screen]);

  function backToLogin() {
    setProfiles([]);
    setActiveId(null);
    setScreen({ kind: "login" });
  }

  /** Saves through the API. The screen already shows the change; a failure only shows the notice. */
  async function save(call: () => Promise<unknown>): Promise<boolean> {
    try {
      await call();
      setNotSaved(false);
      return true;
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) backToLogin();
      else setNotSaved(true);
      return false;
    }
  }

  function updateProfile(id: string, changes: ProfileChanges) {
    setProfiles((ps) => ps.map((p) => (p.id === id ? { ...p, ...changes } : p)));
    void save(() => changeProfile(id, changes));
  }

  function awardBadge(lessonId: string) {
    if (!active || active.badges.includes(lessonId)) return;
    const id = active.id;
    setProfiles((ps) =>
      ps.map((p) => (p.id === id ? { ...p, badges: [...p.badges, lessonId] } : p)),
    );
    void save(() => saveBadge(id, lessonId));
  }

  function setLang(lang: Lang) {
    setDeviceLang(lang);
    saveDeviceLang(window.localStorage, lang);
    if (active) updateProfile(active.id, { lang });
  }

  function setLessonEnabled(id: string, lessonId: string, enabled: boolean) {
    const profile = profiles.find((p) => p.id === id);
    if (!profile) return;
    updateProfile(id, {
      disabledLessons: toggleLesson(progressFromProfile(profile), lessonId, enabled)
        .disabledLessons,
    });
  }

  async function addProfile(nickname: string, avatar: string): Promise<boolean> {
    let created: Profile | undefined;
    const saved = await save(async () => {
      created = await createProfile(nickname, avatar);
    });
    if (created) setProfiles((ps) => [...ps, created!]);
    return saved;
  }

  function deleteProfile(id: string) {
    setProfiles((ps) => ps.filter((p) => p.id !== id));
    if (activeId === id) setActiveId(null);
    void save(() => removeProfile(id));
  }

  function renderScreen() {
    if (screen.kind === "loading") return null;

    if (screen.kind === "login") {
      return (
        <LoginScreen
          lang={progress.lang}
          onLang={setLang}
          onLoggedIn={() => void enterFamily()}
          onLegal={(page) => setScreen({ kind: "legal", page, back: screen })}
        />
      );
    }

    if (screen.kind === "firstKid") {
      return (
        <FirstKidScreen
          lang={progress.lang}
          onLang={setLang}
          onAdd={addProfile}
          onAdded={() => setScreen({ kind: "picker" })}
        />
      );
    }

    if (screen.kind === "picker") {
      return (
        <ProfilePicker
          lang={progress.lang}
          profiles={profiles}
          onLang={setLang}
          onPick={(id) => {
            setActiveId(id);
            setScreen({ kind: "map" });
          }}
          onParents={() => setScreen({ kind: "settings", gated: true })}
          onLegal={(page) => setScreen({ kind: "legal", page, back: screen })}
        />
      );
    }

    if (screen.kind === "settings") {
      return (
        <FamilySettings
          lang={progress.lang}
          profiles={profiles}
          activeId={activeId}
          gated={screen.gated}
          paused={paused}
          onLang={setLang}
          onAdd={addProfile}
          onChange={updateProfile}
          onDelete={deleteProfile}
          onToggleLesson={setLessonEnabled}
          onFacts={() => setScreen({ kind: "facts" })}
          onLogout={() => void logOut().then(backToLogin)}
          onClose={() => setScreen({ kind: activeId ? "map" : "picker" })}
        />
      );
    }

    if (screen.kind === "legal") {
      const { back } = screen;
      return (
        <LegalScreen
          lang={progress.lang}
          page={screen.page}
          onLang={setLang}
          onPage={(page) => setScreen({ kind: "legal", page, back })}
          onClose={() => setScreen(back)}
        />
      );
    }

    if (screen.kind === "timeline") {
      return (
        <TimelineScreen
          lang={progress.lang}
          onLang={setLang}
          onClose={() => setScreen({ kind: "map" })}
        />
      );
    }

    if (screen.kind === "facts") {
      return (
        <FactCards
          lang={progress.lang}
          paused={paused}
          onLang={setLang}
          // Still the same visit to the parents area: no second maths question.
          onClose={() => setScreen({ kind: "settings", gated: false })}
        />
      );
    }

    // The trail and lessons need an active profile.
    if (!active) {
      setScreen({ kind: "picker" });
      return null;
    }

    // A Paused lesson opened by a stored screen or link goes back to the trail.
    if (screen.kind === "lesson" && paused.has(screen.id)) {
      setScreen({ kind: "map" });
      return null;
    }

    if (screen.kind === "lesson") {
      const lesson = getLesson(screen.id);
      const meta = LESSONS.find((l) => l.id === screen.id);
      if (lesson && meta) {
        return (
          <LessonRunner
            key={screen.id}
            lesson={lesson}
            meta={meta}
            lang={progress.lang}
            alreadyDone={progress.badges.includes(screen.id)}
            onBadge={() => awardBadge(screen.id)}
            onExit={() => setScreen({ kind: "map" })}
            onLang={setLang}
            muted={progress.muted}
            onToggleMute={() => active && updateProfile(active.id, { muted: !active.muted })}
          />
        );
      }
      return (
        <LessonPlaceholder
          lessonId={screen.id}
          progress={progress}
          onBack={() => setScreen({ kind: "map" })}
          onLang={setLang}
        />
      );
    }

    return (
      <MapScreen
        progress={progress}
        returning={progress.badges.length > 0}
        paused={paused}
        onLang={setLang}
        onToggleMute={() => updateProfile(active.id, { muted: !active.muted })}
        onOpenLesson={(id) => setScreen({ kind: "lesson", id })}
        onParents={() => setScreen({ kind: "settings", gated: true })}
        onTimeline={() => setScreen({ kind: "timeline" })}
        onChangeKid={() => {
          setActiveId(null);
          setScreen({ kind: "picker" });
        }}
      />
    );
  }

  return (
    <>
      {renderScreen()}
      {notSaved && (
        <p role="status" className="save-notice">
          {t(progress.lang, "notSaved")}
        </p>
      )}
    </>
  );
}
