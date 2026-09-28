import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync, copyFileSync } from "fs";
import path from "path";

const INPUT_DIR = "public/images";
const OUTPUT_DIR = "public/images-optimized";
const MAX_WIDTH = 800;

async function processDir(inputDir, outputDir) {
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

  const entries = readdirSync(inputDir, { withFileTypes: true });
  for (const entry of entries) {
    const inputPath = path.join(inputDir, entry.name);

    if (entry.isDirectory()) {
      // recurse into products/, brands/, categories/
      await processDir(inputPath, path.join(outputDir, entry.name));
      continue;
    }

    if (/\.(jpe?g|png)$/i.test(entry.name)) {
      const webpName = entry.name.replace(/\.(jpe?g|png)$/i, ".webp");
      const outputPath = path.join(outputDir, webpName);

      await sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(outputPath);

      console.log(`${inputPath} -> ${outputPath}`);
    } else if (/\.webp$/i.test(entry.name)) {
      // e.g. nova.webp is already webp — just carry it over unchanged
      const outputPath = path.join(outputDir, entry.name);
      copyFileSync(inputPath, outputPath);
      console.log(`${inputPath} -> ${outputPath} (already webp, copied)`);
    }
  }
}

await processDir(INPUT_DIR, OUTPUT_DIR);
console.log("Done.");
