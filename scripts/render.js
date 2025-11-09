import { join } from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";

const __dirname = new URL(".", import.meta.url).pathname;
const root = join(__dirname, "..");
const dist = join(root, "dist");
const htmlPath = join(dist, "hzzh_poster_48x36_compact.html");
const pdfPath  = join(dist, "hzzh_poster_48x36_compact.pdf");
const pngPath  = join(dist, "hzzh_poster_48x36_compact.png");

async function main() {
  await mkdir(dist, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // 48 × 36 inches at CSS 96 dpi => 4608 × 3456 px viewport for PNG.
  await page.setViewport({ width: 4608, height: 3456, deviceScaleFactor: 1 });

  await page.goto("file://" + htmlPath, { waitUntil: "networkidle0" });

  // PDF with exact inches.
  await page.pdf({
    path: pdfPath,
    printBackground: true,
    width: "48in",
    height: "36in",
    margin: { top: "0in", right: "0in", bottom: "0in", left: "0in" }
  });

  // PNG screenshot at 96 dpi. Increase deviceScaleFactor for higher pixel density if needed.
  await page.screenshot({ path: pngPath, fullPage: true, type: "png" });

  await browser.close();
  console.log("Wrote", pdfPath);
  console.log("Wrote", pngPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
