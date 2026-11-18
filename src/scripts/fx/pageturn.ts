// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// A page peels off from its bottom-right corner and folds over towards the top-left, like a sheet
// being turned. Two full-size layers are cut with clip-path along the moving fold line: `front` keeps
// the part of the page not turned yet, `back` shows the folded flap (the part already turned,
// reflected across the fold). turn(0) = flat page, turn(1) = the page has left the screen.
type Pt = [number, number];

// the part of a polygon where side(p) >= 0 (one cut of Sutherland–Hodgman)
function cut(poly: Pt[], side: (p: Pt) => number) {
  const out: Pt[] = [];
  poly.forEach((a, i) => {
    const b = poly[(i + 1) % poly.length];
    const sa = side(a), sb = side(b);
    if (sa >= 0) out.push(a);
    if (sa >= 0 !== sb >= 0) {
      const k = sa / (sa - sb);
      out.push([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]);
    }
  });
  return out;
}

const polygon = (poly: Pt[]) => (poly.length > 2 ? `polygon(${poly.map(([x, y]) => `${x}px ${y}px`).join(',')})` : 'polygon(0 0, 0 0, 0 0)');

export function createPageTurn(front: HTMLElement, back: HTMLElement) {
  return (progress: number) => {
    const w = front.offsetWidth, h = front.offsetHeight;
    // the fold travels from the bottom-right corner along u, a little flatter than the diagonal
    const n = Math.hypot(w, h * 0.7), u: Pt = [-w / n, (-h * 0.7) / n];
    const along = (p: Pt) => (p[0] - w) * u[0] + (p[1] - h) * u[1];
    const page: Pt[] = [[0, 0], [w, 0], [w, h], [0, h]];
    const fold = progress * along([0, 0]);
    front.style.clipPath = polygon(cut(page, (p) => along(p) - fold));
    back.style.clipPath = polygon(cut(page, (p) => fold - along(p)).map((p) => {
      const d = 2 * (fold - along(p));
      return [p[0] + d * u[0], p[1] + d * u[1]];
    }));
  };
}
