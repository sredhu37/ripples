import { villagerOf } from "../avatar";
import { CAST } from "./cast";
import { Person } from "./icons";

interface Props {
  nickname: string;
  /** Stored avatar value. One the app cannot draw shows the first villager. */
  avatar: string;
  /** Makes the tile a button. Without it the tile is a plain picture and name. */
  onClick?: () => void;
  selected?: boolean;
  /** Accessible name of the button. Defaults to the nickname. */
  label?: string;
}

/** A villager picture with the nickname under it. Used by the picker and family settings. */
export function ProfileTile({ nickname, avatar, onClick, selected = false, label }: Props) {
  const who = villagerOf(avatar);
  const inner = (
    <>
      <svg className="tile-face" data-avatar={who} viewBox="0 0 100 100" aria-hidden="true">
        <Person {...CAST[who]} />
      </svg>
      <span className="tile-name">{nickname}</span>
    </>
  );
  if (!onClick) return <div className="tile">{inner}</div>;
  return (
    <button
      type="button"
      className={selected ? "tile tile-btn tile-on" : "tile tile-btn"}
      aria-label={label ?? nickname}
      aria-pressed={selected ? true : undefined}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
