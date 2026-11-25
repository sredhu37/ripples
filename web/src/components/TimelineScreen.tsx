import { useState } from "react";
import { t } from "../i18n";
import type { Lang } from "../progress";
import { sfx } from "../sound";
import { pinsByStop } from "../timeline/pins";
import { BackButton } from "./BackButton";
import { LangSwitch } from "./LangSwitch";
import { TimelineMap } from "./TimelineMap";
import { TimelineSlider } from "./TimelineSlider";

interface Props {
  lang: Lang;
  onLang: (l: Lang) => void;
  onClose: () => void;
  /** Read more on a pin: opens that lesson. */
  onReadMore: (lessonId: string) => void;
}

const STOP_PINS = pinsByStop();

/** The World timeline: the world map with a slider. A stop draws its start year (spec D1). */
export function TimelineScreen({ lang, onLang, onClose, onReadMore }: Props) {
  const [index, setIndex] = useState(0);
  const { stop, pins } = STOP_PINS[index];

  const pick = (i: number) => {
    if (i === index) return;
    sfx.tap();
    setIndex(i);
  };

  return (
    <main className="screen timeline-screen">
      <BackButton label={t(lang, "allLessons")} onClick={onClose} />
      <header className="topbar">
        <h1 className="logo">{t(lang, "worldTimeline")}</h1>
        <LangSwitch lang={lang} onLang={onLang} />
      </header>

      <TimelineMap lang={lang} pins={pins} defaultYear={stop.year} onReadMore={onReadMore} />
      <TimelineSlider lang={lang} index={index} onChange={pick} />
    </main>
  );
}
