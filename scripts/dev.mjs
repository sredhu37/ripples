// Runs the app (web/) and the API (server/) together. Stops both when either one exits or on Ctrl-C.
import { spawn } from "node:child_process";

const commands = [
  ["web", "web"],
  ["api", "server"],
];

const children = commands.map(([name, dir]) => {
  const child = spawn("npm", ["run", "dev"], { stdio: "inherit", cwd: dir });
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
