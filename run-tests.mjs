// run-tests.mjs — esegue vitest run e stampa l'output
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const child = spawn("node", ["node_modules/vitest/vitest.mjs", "run"], {
  cwd: __dirname,
  stdio: ["ignore", "pipe", "pipe"],
});

let out = "";
child.stdout.on("data", (d) => { out += d.toString(); });
child.stderr.on("data", (d) => { out += d.toString(); });
child.on("close", (code) => {
  console.log(out);
  process.exit(code ?? 0);
});
