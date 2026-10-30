import type { ReactNode } from "react";

/** Words between *stars* are new terms: shown highlighted, read aloud without the stars. */
export function plain(text: string): string {
  return text.replace(/\*/g, "");
}

export function Marked({ text }: { text: string }): ReactNode {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <mark key={i} className="term">
        {part.slice(1, -1)}
      </mark>
    ) : (
      part
    ),
  );
}
