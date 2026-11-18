/**
 * Validates that critical DENYEL artwork slots exist and aspect ratios are near targets.
 * Does not modify files. Safe to run after dropping external illustrations.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/** Critical homepage + character slots (Phase 2 priority). ratio = width/height */
const CRITICAL = [
  { rel: 'src/assets/frames/ch1-origin/ines.png', ratio: 480 / 712, tol: 0.08, alphaHint: true },
  { rel: 'src/assets/frames/ch1-origin/port-wide.jpg', ratio: 16 / 9, tol: 0.12 },
  { rel: 'src/assets/frames/ch1-origin/port.jpg', ratio: 16 / 9, tol: 0.15 },
  { rel: 'src/assets/frames/ch1-origin/eyes.jpg', ratio: 16 / 9, tol: 0.15 },
  { rel: 'src/assets/frames/ch1-origin/hand.jpg', ratio: 16 / 9, tol: 0.15 },
  { rel: 'src/assets/frames/intro/ink.jpg', ratio: 16 / 9, tol: 0.15 },
  { rel: 'src/assets/frames/intro/ink-tall.jpg', ratio: 9 / 16, tol: 0.35 }, // placeholder may still be landscape
  { rel: 'src/assets/frames/ch2-training/arrival.jpg', ratio: 16 / 9, tol: 0.15 },
  { rel: 'src/assets/frames/ch3-missions/board.jpg', ratio: 16 / 9, tol: 0.15 },
  { rel: 'src/assets/frames/ch4-sidequests/land.png', ratio: 1408 / 768, tol: 0.08 },
  { rel: 'src/assets/frames/ch5-powersheet/ines.png', ratio: 480 / 720, tol: 0.15, alphaHint: true },
  { rel: 'src/assets/frames/ch6-finale/dawn.jpg', ratio: 16 / 9, tol: 0.15 },
  { rel: 'src/assets/frames/recruiter/hero/ines.png', ratio: 480 / 720, tol: 0.2, alphaHint: true },
];

const WALK = Array.from({ length: 8 }, (_, i) => `src/assets/frames/ch4-sidequests/walk/${i + 1}.png`);
const LIE = [
  'src/assets/frames/ch3-missions/talan/lie.jpg',
  'src/assets/frames/ch3-missions/talan/lie-cracks.jpg',
  'src/assets/frames/ch3-missions/talan/lie-breaking.jpg',
  'src/assets/frames/ch3-missions/talan/lie-shatter.jpg',
];

let errors = 0;
let warnings = 0;

function fail(msg) {
  console.error(`ERROR  ${msg}`);
  errors++;
}
function warn(msg) {
  console.warn(`WARN   ${msg}`);
  warnings++;
}
function ok(msg) {
  console.log(`OK     ${msg}`);
}

async function meta(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return null;
  return { file, ...(await sharp(file).metadata()) };
}

async function checkSlot({ rel, ratio, tol, alphaHint }) {
  const m = await meta(rel);
  if (!m) {
    fail(`missing ${rel}`);
    return;
  }
  if (!m.width || !m.height) {
    fail(`unreadable ${rel}`);
    return;
  }
  const actual = m.width / m.height;
  const drift = Math.abs(actual - ratio) / ratio;
  if (drift > tol) {
    warn(`${rel}: aspect ${m.width}×${m.height} (ratio ${actual.toFixed(3)}) vs target ${ratio.toFixed(3)} — crop carefully or adjust art`);
  } else {
    ok(`${rel} ${m.width}×${m.height}`);
  }
  if (alphaHint && m.format === 'jpeg') {
    warn(`${rel}: expected PNG with transparency for cutout/sticker`);
  }
}

async function checkSet(label, rels) {
  const sizes = [];
  for (const rel of rels) {
    const m = await meta(rel);
    if (!m) {
      fail(`missing ${rel}`);
      continue;
    }
    sizes.push(`${m.width}x${m.height}`);
    ok(`${rel} ${m.width}×${m.height}`);
  }
  if (sizes.length > 1 && new Set(sizes).size > 1) {
    warn(`${label}: frames differ in pixel size (${[...new Set(sizes)].join(', ')}). Keep identical framing for animation.`);
  }
}

async function checkCertifications() {
  console.log('\nCredentials');
  const manifestPath = path.join(root, 'certification-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    warn('certification-manifest.json missing — skip credential file checks');
    return;
  }
  const items = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  for (const item of items) {
    for (const key of ['previewPath', 'originalPath']) {
      const rel = String(item[key] || '').replace(/^\//, '');
      if (!rel) {
        fail(`${item.slug}: missing ${key}`);
        continue;
      }
      // paths in manifest are /certifications/... → public/certifications/...
      const resolved = path.join(root, 'public', rel);
      if (!fs.existsSync(resolved)) fail(`missing public/${rel}`);
      else ok(`public/${rel}`);
    }
  }
}

async function main() {
  console.log('DENYEL — ORIGIN asset validation\n');
  for (const slot of CRITICAL) await checkSlot(slot);
  console.log('\nWalk cycle');
  await checkSet('walk', WALK);
  console.log('\nLie / false-match stages');
  await checkSet('lie', LIE);
  await checkCertifications();
  console.log(`\nDone. ${errors} error(s), ${warnings} warning(s).`);
  if (errors) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
