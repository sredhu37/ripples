// Runs Vite (the app) and the API together. Stops both when either one exits or on Ctrl-C.
import { spawn } from "node:child_process";

const commands = [
  ["vite", ["npx", "vite"]],
  ["api", ["npx", "tsx", "watch", "server/index.ts"]],
];

const children = commands.map(([name, [cmd, ...args]]) => {
  const child = spawn(cmd, args, { stdio: "inherit" });
  child.on("exit", (code) => {
    console.log(`[dev] ${name} exited with code ${code}`);
    stop(code ?? 1);
  });
  return child;
});

let stopping = false;
function stop(code) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill("SIGTERM");
  setTimeout(() => process.exit(code), 500);
}
process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
