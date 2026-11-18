import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const sources = [
  'src/assets/frames/intro/ink.jpg',
  'src/assets/frames/intro/ink-tall.jpg',
  'src/assets/frames/ch1-origin/port-wide.jpg',
  'src/assets/frames/ch1-origin/port.jpg',
  'src/assets/frames/ch1-origin/ines.png',
  'src/assets/frames/ch1-origin/eyes.jpg',
  'src/assets/frames/ch1-origin/hand.jpg',
  'src/assets/frames/ch2-training/arrival.jpg',
];

function sha(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 12);
}

const distDir = 'dist/_astro';
const distFiles = fs.existsSync(distDir) ? fs.readdirSync(distDir) : [];

for (const rel of sources) {
  const buf = fs.readFileSync(rel);
  const m = await sharp(buf).metadata();
  const base = path.basename(rel).replace(/\.(jpg|png)$/i, '');
  const matches = distFiles.filter((f) => f.startsWith(base + '.') || f.startsWith(base + '-'));
  console.log('\n' + rel);
  console.log('  source:', m.width + 'x' + m.height, buf.length + 'B', 'sha=' + sha(buf));
  for (const f of matches.sort()) {
    const p = path.join(distDir, f);
    const dbuf = fs.readFileSync(p);
    let dim = '?';
    try {
      const dm = await sharp(dbuf).metadata();
      dim = dm.width + 'x' + dm.height;
    } catch {}
    console.log('  dist:', f, dim, dbuf.length + 'B', 'sha=' + sha(dbuf));
  }
  if (!matches.length) console.log('  dist: (no matching hashed files — rebuild needed?)');
}
