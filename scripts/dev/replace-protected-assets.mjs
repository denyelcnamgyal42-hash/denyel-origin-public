/**
 * Overwrites LICENSE-ASSETS–protected media with original DENYEL placeholders.
 * Labels every raster so nothing from VOL.01 ships in the tree.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLUE = '#00b7ff';
const WHITE = '#f5f8fc';

async function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function svgFor(label, w, h, kind = 'panel') {
  const lines = String(label)
    .replace(/\\/g, '/')
    .split('/')
    .slice(-3)
    .join(' · ');
  const sub = kind === 'og' ? 'DENYEL — ORIGIN' : 'ORIGINAL PLACEHOLDER · DENYEL';
  const escaped = lines.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1a2e"/>
      <stop offset="55%" stop-color="#102848"/>
      <stop offset="100%" stop-color="#071018"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="none" stroke="${BLUE}" stroke-width="3" stroke-dasharray="10 8" opacity="0.85"/>
  <text x="50%" y="42%" text-anchor="middle" fill="${WHITE}" font-family="Georgia, serif" font-size="${Math.max(22, Math.min(w, h) / 14)}" letter-spacing="2">${sub}</text>
  <text x="50%" y="54%" text-anchor="middle" fill="${BLUE}" font-family="ui-monospace, monospace" font-size="${Math.max(12, Math.min(w, h) / 28)}">${escaped}</text>
  <text x="50%" y="66%" text-anchor="middle" fill="${WHITE}" font-family="ui-sans-serif, sans-serif" font-size="${Math.max(11, Math.min(w, h) / 32)}" opacity="0.7">Art TBD · not VOL.01 material</text>
  <circle cx="${w - 72}" cy="72" r="28" fill="none" stroke="${BLUE}" stroke-width="2"/>
  <text x="${w - 72}" y="78" text-anchor="middle" fill="${BLUE}" font-family="Georgia, serif" font-size="22">D</text>
</svg>`);
}

async function writeRaster(file, w, h, kind) {
  const ext = path.extname(file).toLowerCase();
  const label = path.relative(root, file);
  const svg = svgFor(label, w, h, kind);
  const img = sharp(svg).resize(w, h, { fit: 'fill' });
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (ext === '.png') await img.png().toFile(file);
  else if (ext === '.jpg' || ext === '.jpeg') await img.jpeg({ quality: 82 }).toFile(file);
  else if (ext === '.webp') await img.webp({ quality: 82 }).toFile(file);
  else if (ext === '.svg') {
    fs.writeFileSync(file, svgFor(label, w, h, kind));
  } else {
    await img.png().toFile(file);
  }
}

function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="#0b1a2e"/>
  <rect x="6" y="6" width="52" height="52" rx="6" fill="none" stroke="#00b7ff" stroke-width="2"/>
  <text x="32" y="42" text-anchor="middle" fill="#f5f8fc" font-family="Georgia, serif" font-size="28">D</text>
</svg>`;
}

function simpleLogoSvg(mark) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="80" viewBox="0 0 240 80">
  <rect width="240" height="80" fill="#0b1a2e"/>
  <text x="120" y="48" text-anchor="middle" fill="#00b7ff" font-family="Georgia, serif" font-size="28">${mark}</text>
</svg>`;
}

const EXTRA = [
  ['src/assets/logos/jaggle.svg', 'svg', 240, 80],
  ['src/assets/logos/gcit.png', 'png', 320, 160],
  ['src/assets/photos/experience/jaggle-desk.jpg', 'jpg', 1200, 800],
  ['src/assets/photos/education/gcit-campus.jpg', 'jpg', 1200, 800],
  ['src/assets/photos/projects/dzonglish-ui.jpg', 'jpg', 1400, 900],
  ['src/assets/photos/projects/attendance-demo.jpg', 'jpg', 1400, 900],
  ['src/assets/photos/projects/hotelbot-chat.jpg', 'jpg', 1400, 900],
  ['src/assets/photos/projects/jobscout-ui.jpg', 'jpg', 1400, 900],
  ['src/assets/photos/community/cyber-lab.jpg', 'jpg', 1200, 800],
  ['public/og/story.jpg', 'jpg', 1200, 630],
  ['public/og/recruiter.jpg', 'jpg', 1200, 630],
  ['media/cover.jpg', 'jpg', 1280, 720],
];

const SIZE_HINTS = [
  [/port-wide|panorama|dawn|board|land|ink\.jpg|arrival|night|workshop/, [1584, 900]],
  [/ines\.png|walk\/|faces\/|kitten|mascot|mini-|hero\/ines/, [480, 720]],
  [/scroll\.png|seal\.png/, [600, 800]],
  [/og\//, [1200, 630]],
  [/cover/, [1280, 720]],
];

function sizeFor(file) {
  const rel = file.replace(/\\/g, '/');
  for (const [re, size] of SIZE_HINTS) if (re.test(rel)) return size;
  if (rel.endsWith('.svg')) return [240, 80];
  if (rel.includes('/walk/')) return [240, 320];
  if (rel.includes('/places/') || rel.includes('/ornaments/')) return [360, 360];
  if (rel.includes('/recruiter/')) return [640, 640];
  return [1200, 800];
}

async function main() {
  const dirs = [path.join(root, 'src/assets'), path.join(root, 'public/og'), path.join(root, 'media')];
  const files = [];
  for (const d of dirs) await walk(d, files);

  const media = files.filter((f) => /\.(png|jpe?g|webp|svg)$/i.test(f) && !f.includes('node_modules'));
  console.log(`Replacing ${media.length} protected media files…`);
  for (const file of media) {
    const [w, h] = sizeFor(file);
    const kind = /[\\/]og[\\/]/.test(file) ? 'og' : 'panel';
    await writeRaster(file, w, h, kind);
  }

  for (const [rel, , w, h] of EXTRA) {
    const file = path.join(root, rel);
    await writeRaster(file, w, h, /og\//.test(rel) ? 'og' : 'panel');
  }

  fs.writeFileSync(path.join(root, 'public/favicon.svg'), faviconSvg());
  fs.writeFileSync(path.join(root, 'src/assets/logos/jaggle.svg'), simpleLogoSvg('Jaggle.ai'));
  await sharp(Buffer.from(simpleLogoSvg('GCIT'))).png().toFile(path.join(root, 'src/assets/logos/gcit.png'));
  await sharp(Buffer.from(simpleLogoSvg('Cyber'))).png().toFile(path.join(root, 'src/assets/logos/cyber.png'));

  // Remove protected CVs from publish tree
  const cvDir = path.join(root, 'public/cv');
  fs.mkdirSync(cvDir, { recursive: true });
  for (const name of fs.readdirSync(cvDir)) {
    if (/\.pdf$/i.test(name)) fs.unlinkSync(path.join(cvDir, name));
  }
  fs.writeFileSync(
    path.join(cvDir, 'CV-PLACEHOLDER.txt'),
    'DENYEL — ORIGIN\n\nDownloadable CV PDF: MISSING — not invented for this phase.\nAdd your CV here later (e.g. Denyel_CV.pdf) and update src/data/story.ts links.\n\nDo not redistribute third-party CVs from the original VOL.01 project.\n',
  );

  // Do not redistribute VOL.01 demo video
  const demo = path.join(root, 'media/demo.mp4');
  if (fs.existsSync(demo)) fs.unlinkSync(demo);
  fs.writeFileSync(
    path.join(root, 'media/README.md'),
    '# Media\n\n`cover.jpg` is an original DENYEL placeholder.\nThe original VOL.01 `demo.mp4` was removed and must not be redistributed.\n',
  );

  console.log('Done. Protected assets overwritten with DENYEL placeholders.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
