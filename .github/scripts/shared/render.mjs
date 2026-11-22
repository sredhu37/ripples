// Fills a prompt template from .github/prompts/ and prints the prompt.
// Spec: docs/factory.md, section Engine (prompt text lives in templates, rules in .claude/agents/).
//
//   node .github/scripts/shared/render.mjs <template>
//
// ${NAME} becomes the environment variable NAME, or the text of the file named by NAME_FILE
// (trailing newlines dropped, like $(cat file) in bash). One pass: text put in is never scanned
// again, so an issue body that contains ${...} stays as written. A name with no value fails, so a
// typo in a template stops the run instead of reaching the agent.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const PLACEHOLDER = /\$\{([A-Z][A-Z0-9_]*)\}/g;

/** Fills every ${NAME} in text from values; throws on a name values does not have. */
export function render(text, values) {
  return text.replace(PLACEHOLDER, (_, name) => {
    if (!(name in values)) throw new Error(`render: no value for \${${name}}`);
    return values[name];
  });
}

/** The value of NAME from env: NAME itself, or the file at NAME_FILE. */
export function valuesFromEnv(text, env) {
  const values = {};
  for (const [, name] of text.matchAll(PLACEHOLDER)) {
    if (env[name] !== undefined) values[name] = env[name];
    else if (env[`${name}_FILE`] !== undefined)
      values[name] = readFileSync(env[`${name}_FILE`], "utf8").replace(/\n+$/, "");
  }
  return values;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const template = process.argv[2];
  if (!template) {
    console.error("usage: shared/render.mjs <template>");
    process.exit(2);
  }
  const text = readFileSync(template, "utf8").replace(/\n+$/, "");
  try {
    process.stdout.write(render(text, valuesFromEnv(text, process.env)) + "\n");
  } catch (err) {
    console.error(`${err.message} (template ${template})`);
    process.exit(1);
  }
}
