import fs from 'node:fs';

function scan(path) {
  const h = fs.readFileSync(path, 'utf8');
  const meta = [...h.matchAll(/<(?:link rel="canonical"[^>]+|meta property="og:[^"]+"[^>]+)>/g)].map((m) => m[0]);
  return {
    path,
    meta,
    exampleCom: h.includes('example.com'),
    badCopy: /Original placeholder|ORIGINAL PLACEHOLDER|\bMISSING\b|\bTBD\b|CV-PLACEHOLDER/.test(h),
    mailto: h.includes('mailto:denyelcnamgyal42@gmail.com'),
    github: h.includes('https://github.com/denyelcnamgyal42-hash'),
    linkedin: h.includes('https://www.linkedin.com/in/denyelcnamgyal'),
    jobscout: h.includes('JobScout-AI'),
    cvHref: /href="\/cv\//.test(h),
  };
}

for (const p of ['dist/index.html', 'dist/recruiter/index.html']) {
  console.log(JSON.stringify(scan(p), null, 2));
}
