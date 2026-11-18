// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// A barrage of small ink check stamps landing over the page (comic metaphor for verified marks).
// Drawn on one canvas (no DOM per stamp): set(p) shows the first p × count stamps,
// each falling in, so scrubbing back lifts them off again. Count is visual density, not a claimed metric.

const FALL = 0.06; // share of the barrage during which one stamp is still landing

function seeded(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

export function createCheckRain(canvas: HTMLCanvasElement, count: number) {
  const ctx = canvas.getContext('2d')!;
  const rnd = seeded(734);
  const stamps = Array.from({ length: count }, (_, i) => ({
    x: rnd(), y: rnd(), r: 0.6 + rnd() * 0.8, tilt: (rnd() - 0.5) * 0.9,
    at: (i / count) * (1 - FALL), rose: rnd() < 0.12,
  }));
  const ink = getComputedStyle(canvas).color;
  const rose = getComputedStyle(canvas).getPropertyValue('--rose-deep');
  let progress = 0;

  const draw = () => {
    const dpr = Math.min(devicePixelRatio, 1.5);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const size = Math.max(14, Math.min(w, h) * 0.028);
    for (const s of stamps) {
      const t = (progress - s.at) / FALL;
      if (t <= 0) break;
      const land = Math.min(t, 1);
      const scale = s.r * size * (1 + (1 - land) * 1.8); // drops from above the page and lands
      ctx.save();
      ctx.translate(s.x * w, s.y * h);
      ctx.rotate(s.tilt);
      ctx.globalAlpha = land;
      ctx.strokeStyle = s.rose ? rose : ink;
      ctx.lineWidth = scale * 0.12;
      ctx.lineCap = ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.arc(0, 0, scale, 0, Math.PI * 2);
      ctx.moveTo(-scale * 0.45, 0);
      ctx.lineTo(-scale * 0.1, scale * 0.38);
      ctx.lineTo(scale * 0.5, -scale * 0.36);
      ctx.stroke();
      ctx.restore();
    }
  };

  addEventListener('resize', draw);
  return { set: (p: number) => { progress = p; draw(); } };
}
