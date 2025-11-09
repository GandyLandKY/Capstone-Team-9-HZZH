import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = new URL(".", import.meta.url).pathname;
const root = join(__dirname, "..");
const cfgDir = join(root, "config");
const outDir = join(root, "dist");
const tmplPath = join(root, "template.html");
const outHtml = join(outDir, "hzzh_poster_48x36_compact.html");

async function load(name) {
  const p = join(cfgDir, name + ".json");
  return JSON.parse(await readFile(p, "utf8"));
}

function inject(json) {
  // Keep JSON blocks as literal text inside <script type="application/json">.
  // This preserves real text layers and keeps runtime simple.
  return String(json)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
}

async function main() {
  const tmpl = await readFile(tmplPath, "utf8");

  const title = inject(JSON.stringify(await load("title")));
  const intro = inject(JSON.stringify(await load("introduction")));
  const arch  = inject(JSON.stringify(await load("architecture")));
  const tech  = inject(JSON.stringify(await load("tech")));
  const team  = inject(JSON.stringify(await load("team")));
  const time  = inject(JSON.stringify(await load("timeline")));
  const rev   = inject(JSON.stringify(await load("revenue")));

  const html = tmpl
    .replace("/*CFG_TITLE*/", title)
    .replace("/*CFG_INTRO*/", intro)
    .replace("/*CFG_ARCH*/", arch)
    .replace("/*CFG_TECH*/", tech)
    .replace("/*CFG_TEAM*/", team)
    .replace("/*CFG_TIME*/", time)
    .replace("/*CFG_REV*/", rev);

  await mkdir(outDir, { recursive: true });
  await writeFile(outHtml, html, "utf8");
  console.log("Wrote", outHtml);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
