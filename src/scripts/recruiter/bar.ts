// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// The top bar: the scribbled underline slides to the section being read; on phones, the menu sheet.

function initScribble(bar: HTMLElement) {
  const scribble = bar.querySelector<SVGElement>('[data-scribble]');
  const links = new Map([...bar.querySelectorAll<HTMLAnchorElement>('[data-nav]')].map((a) => [a.dataset.nav!, a]));
  if (!scribble || !links.size) return;

  const underline = (id: string) => {
    const link = links.get(id);
    links.forEach((a) => a.classList.toggle('is-on', a === link));
    if (!link) { scribble.style.opacity = '0'; return; }
    scribble.style.opacity = '1';
    scribble.style.translate = `${link.offsetLeft}px 0`;
    scribble.style.width = `${link.offsetWidth}px`;
  };

  // the section crossing the line just under the bar is the one being read
  const watch = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.isIntersecting && underline(e.target.id));
  }, { rootMargin: '-30% 0px -65% 0px' });
  document.querySelectorAll<HTMLElement>('main > section[id]').forEach((s) => watch.observe(s));
}

function initMenu(bar: HTMLElement) {
  const button = bar.querySelector<HTMLButtonElement>('[data-menu]')!;
  const sheet = bar.querySelector<HTMLElement>('[data-sheet]')!;
  const set = (open: boolean) => {
    button.setAttribute('aria-expanded', String(open));
    sheet.hidden = !open;
  };
  button.addEventListener('click', () => set(sheet.hasAttribute('hidden')));
  sheet.addEventListener('click', (e) => (e.target as Element).closest('a') && set(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && set(false));
}

export function initBar() {
  const bar = document.querySelector<HTMLElement>('[data-bar]');
  if (!bar) return;
  initScribble(bar);
  initMenu(bar);
}
