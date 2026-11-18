// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Stickers peel off: press one, drag it anywhere on the page, let go and it stays there (tilted a bit).
// A sticker that is also a link still opens on a simple click, but not after a drag.
// "Reset" on the sticker sheet puts every sticker back.

const MOVED = 6; // px before a press becomes a drag

function peelable(el: HTMLElement) {
  let start: { x: number; y: number; dx: number; dy: number } | null = null;
  let dragged = false;
  let dx = 0, dy = 0;

  el.addEventListener('pointerdown', (e) => {
    if (e.button) return;
    start = { x: e.clientX, y: e.clientY, dx, dy };
    dragged = false;
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointermove', (e) => {
    if (!start) return;
    const mx = e.clientX - start.x, my = e.clientY - start.y;
    if (!dragged && Math.hypot(mx, my) < MOVED) return;
    if (!dragged) { dragged = true; el.classList.add('is-held'); }
    dx = start.dx + mx;
    dy = start.dy + my;
    el.style.translate = `${dx}px ${dy}px`;
    el.style.rotate = `${Math.max(-14, Math.min(14, mx / 12))}deg`;
  });
  const drop = () => {
    if (!start) return;
    start = null;
    el.classList.remove('is-held');
    if (dragged) el.style.rotate = `${Math.round(Math.random() * 16 - 8)}deg`;
  };
  el.addEventListener('pointerup', drop);
  el.addEventListener('pointercancel', drop);
  // after a drag, the click that follows must not open a link or pop a stamp
  el.addEventListener('click', (e) => {
    if (!dragged) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    dragged = false;
  }, { capture: true });

  return () => { dx = dy = 0; el.style.translate = el.style.rotate = ''; };
}

export function initPeel() {
  const resets = [...document.querySelectorAll<HTMLElement>('[data-peel]')].map(peelable);
  document.querySelectorAll('[data-reset]').forEach((b) => b.addEventListener('click', () => resets.forEach((reset) => reset())));
}
