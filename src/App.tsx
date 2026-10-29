import { useCallback, useEffect, useState } from "react";
import { FactCards } from "./components/FactCards";
import { getLesson } from "./content";
import { LessonRunner } from "./lesson/LessonRunner";
import { LESSONS } from "./lessons";
import { LessonPlaceholder } from "./components/LessonPlaceholder";
import { MapScreen } from "./components/MapScreen";
import { NameScreen } from "./components/NameScreen";
import { ParentPanel } from "./components/ParentPanel";
import { cleanName, earnBadge, emptyProgress, loadProgress, saveProgress, type Lang, type Progress } from "./progress";
import { setMuted } from "./sound";
import { stopSpeaking } from "./speech";

type Screen = { kind: "map" } | { kind: "lesson"; id: string } | { kind: "parents" } | { kind: "facts" };

export function App() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress(window.localStorage));
  const [screen, setScreen] = useState<Screen>({ kind: "map" });
  // true when the name was already saved at load time ("welcome back")
  const [returning] = useState(() => progress.name !== "");

  useEffect(() => {
    saveProgress(window.localStorage, progress);
    setMuted(progress.muted);
    document.documentElement.lang = progress.lang;
  }, [progress]);

  useEffect(() => {
    stopSpeaking();
  }, [screen]);

  // Ask the browser not to evict the saved progress.
  useEffect(() => {
    void navigator.storage?.persist?.();
  }, []);

  const awardBadge = useCallback(
    (id: string) => setProgress((p) => earnBadge(p, id)),
    [],
  );

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
        onRestore={setProgress}
        onFacts={() => setScreen({ kind: "facts" })}
        onReset={() => {
          setProgress(emptyProgress());
          setScreen({ kind: "map" });
        }}
        onClose={() => setScreen({ kind: "map" })}
      />
    );
  }

  if (screen.kind === "facts") {
    return <FactCards lang={progress.lang} onClose={() => setScreen({ kind: "parents" })} />;
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
        />
      );
    }
    return (
      <LessonPlaceholder lessonId={screen.id} progress={progress} onBack={() => setScreen({ kind: "map" })} />
    );
  }

  return (
    <MapScreen
      progress={progress}
      returning={returning}
      onLang={setLang}
      onToggleMute={() => setProgress((p) => ({ ...p, muted: !p.muted }))}
      onOpenLesson={(id) => setScreen({ kind: "lesson", id })}
      onParents={() => setScreen({ kind: "parents" })}
    />
  );
}
