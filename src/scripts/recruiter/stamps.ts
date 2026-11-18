// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// A click (or a tap) on empty paper pops a little sticker that fades after 1.5 s: one of the drawn
// stamps, or now and then one of her colour stickers already on the page (images marked data-stamp).
// Never on links, buttons, images, text or anything that can be dragged. At most 8 on screen.
import { art, stampSet, type ArtName } from './art';

const busy = 'a, button, input, textarea, select, label, summary, img, svg, video, [role=dialog], [data-peel], [data-mascot], [data-bar]';
const PHOTO_ODDS = 0.3; // how often a colour sticker pops instead of a drawn one
let layer: HTMLElement | null = null;
let last = '';

// is (x, y) on a line of text? (a click to select words never stamps)
function overText(x: number, y: number) {
  const node = document.caretPositionFromPoint?.(x, y)?.offsetNode;
  if (!node || node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) return false;
  const range = document.createRange();
  range.selectNodeContents(node);
  return [...range.getClientRects()].some((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);
}

const pick = <T>(list: T[]) => list[Math.floor(Math.random() * list.length)];

// the next stamp, never the one just shown: a drawing's markup or a colour sticker's image
function next(): { svg?: string; src?: string } {
  const photos = [...document.querySelectorAll<HTMLImageElement>('img[data-stamp]')].map((img) => img.currentSrc || img.src);
  for (;;) {
    const usePhoto = photos.length && Math.random() < PHOTO_ODDS;
    const key = usePhoto ? pick(photos) : pick(stampSet);
    if (key === last) continue;
    last = key;
    return usePhoto ? { src: key } : { svg: art[key as ArtName] };
  }
}

export function stampAt(x: number, y: number, name?: ArtName) {
  if (!layer?.isConnected) {
    layer = Object.assign(document.createElement('div'), { className: 'stamps' });
    layer.setAttribute('aria-hidden', 'true');
    document.body.append(layer);
  }
  while (layer.childElementCount >= 8) layer.firstElementChild!.remove();
  const stamp = name ? { svg: art[name] } : next();
  const el = document.createElement('div');
  el.className = stamp.src ? 'stamp lift' : 'stamp die';
  if (stamp.src) el.append(Object.assign(new Image(), { src: stamp.src, alt: '' }));
  else el.innerHTML = stamp.svg!;
  const size = stamp.src ? 46 + Math.random() * 18 : 26 + Math.random() * 16;
  el.style.cssText = `left:${x}px;top:${y}px;--size:${size.toFixed(0)}px;--rot:${Math.round(Math.random() * 36 - 18)}deg`;
  el.addEventListener('animationend', () => el.remove(), { once: true });
  layer.append(el);
}

export function initStamps() {
  document.addEventListener('click', (e) => {
    const target = e.target as Element | null;
    if (e.defaultPrevented || e.detail > 1 || !target || target.closest(busy)) return;
    if (!getSelection()?.isCollapsed || overText(e.clientX, e.clientY)) return;
    stampAt(e.clientX, e.clientY);
  });
}
