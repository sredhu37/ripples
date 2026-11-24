interface Props {
  /** Name of the screen the button goes to, for example "All lessons". */
  label: string;
  onClick: () => void;
}

/** The one way to leave a sub-screen: an arrow and the name of the destination, at the top left. */
export function BackButton({ label, onClick }: Props) {
  return (
    <button type="button" className="btn btn-quiet back-btn" onClick={onClick}>
      <span aria-hidden="true">←</span> {label}
    </button>
  );
}
