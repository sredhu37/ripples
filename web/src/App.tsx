import { useCallback, useEffect, useState } from "react";
import { getSessionEmail } from "./auth";
import { FactCards } from "./components/FactCards";
import { LoginScreen } from "./components/LoginScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { LegalScreen } from "./components/LegalScreen";
import type { LegalPage } from "./legal/texts";
import { getLesson } from "./content";
import { NO_LESSONS, fetchFeatures, pausedLessons } from "./features";
import { LessonRunner } from "./lesson/LessonRunner";
import { LESSONS } from "./lessons";
import { LessonPlaceholder } from "./components/LessonPlaceholder";
import { MapScreen } from "./components/MapScreen";
import { NameScreen } from "./components/NameScreen";
import { TimelineScreen } from "./components/TimelineScreen";
import { ParentPanel } from "./components/ParentPanel";
import {
  cleanName,
  earnBadge,
  emptyProgress,
  loadProgress,
  saveProgress,
  toggleLesson,
  type Lang,
  type Progress,
} from "./progress";
import { setMuted } from "./sound";
import { stopSpeaking } from "./speech";

type Screen =
  | { kind: "map" }
  | { kind: "lesson"; id: string }
  | { kind: "parents" }
  | { kind: "login" }
  | { kind: "profile"; email: string }
  | { kind: "facts" }
  | { kind: "timeline" }
  | { kind: "legal"; page: LegalPage; back: Screen };

export function App() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress(window.localStorage));
  const [paused, setPaused] = useState<ReadonlySet<string>>(NO_LESSONS);
  const [screen, setScreen] = useState<Screen>({ kind: "map" });
  // true when the name was already saved at load time ("welcome back")
  const [returning] = useState(() => progress.name !== "");

  useEffect(() => {
    saveProgress(window.localStorage, progress);
    setMuted(progress.muted);
    document.documentElement.lang = progress.lang;
  }, [progress]);

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
  }, [screen]);

  // Ask the browser not to evict the saved progress.
  useEffect(() => {
    void navigator.storage?.persist?.();
  }, []);

  const awardBadge = useCallback((id: string) => setProgress((p) => earnBadge(p, id)), []);

  const setLang = (lang: Lang) => setProgress((p) => ({ ...p, lang }));

  if (progress.name === "") {
    return (
      <NameScreen
        lang={progress.lang}
        onLang={setLang}
        onDone={(name) => setProgress((p) => ({ ...p, name: cleanName(name) }))}
      />
    );
  }

  if (screen.kind === "parents") {
    return (
      <ParentPanel
        progress={progress}
        paused={paused}
        onRestore={setProgress}
        onFacts={() => setScreen({ kind: "facts" })}
        onAccount={() =>
          // A parent who is already logged in goes straight to the profile screen.
          void getSessionEmail().then((email) =>
            setScreen(email ? { kind: "profile", email } : { kind: "login" }),
          )
        }
        onReset={() => {
          setProgress(emptyProgress());
          setScreen({ kind: "map" });
        }}
        onClose={() => setScreen({ kind: "map" })}
        onLang={setLang}
        onToggleLesson={(id, enabled) => setProgress((p) => toggleLesson(p, id, enabled))}
      />
    );
  }

  if (screen.kind === "login") {
    return (
      <LoginScreen
        lang={progress.lang}
        onLang={setLang}
        onLoggedIn={(email) => setScreen({ kind: "profile", email })}
        onClose={() => setScreen({ kind: "parents" })}
        onLegal={(page) => setScreen({ kind: "legal", page, back: screen })}
      />
    );
  }

  if (screen.kind === "profile") {
    return (
      <ProfileScreen
        lang={progress.lang}
        email={screen.email}
        onLang={setLang}
        onLoggedOut={() => setScreen({ kind: "login" })}
        onClose={() => setScreen({ kind: "map" })}
        onLegal={(page) => setScreen({ kind: "legal", page, back: screen })}
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
        onClose={() => setScreen({ kind: "parents" })}
      />
    );
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
      returning={returning}
      paused={paused}
      onLang={setLang}
      onToggleMute={() => setProgress((p) => ({ ...p, muted: !p.muted }))}
      onOpenLesson={(id) => setScreen({ kind: "lesson", id })}
      onParents={() => setScreen({ kind: "parents" })}
      onTimeline={() => setScreen({ kind: "timeline" })}
    />
  );
}
