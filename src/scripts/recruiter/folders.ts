// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Folders stacked on each other (Experience, Projects): a press on a tab opens its card; the arrow keys move
// between the tabs. A link to a card that is closed (the skills' "used in", "See SurgiGuard") opens it first.
export function initFolders() {
  const stacks = [...document.querySelectorAll<HTMLElement>('[data-folders]')];
  if (!stacks.length) return;

  const open = (tab: HTMLButtonElement, focus = false) => {
    const tabs = [...tab.parentElement!.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')!)?.classList.toggle('is-open', on);
    });
    if (focus) tab.focus();
  };
  const tabFor = (card: Element) => document.querySelector<HTMLButtonElement>(`[aria-controls="${card.id}"]`);

  stacks.forEach((stack) => {
    const list = stack.querySelector<HTMLElement>('[role="tablist"]')!;
    list.addEventListener('click', (e) => {
      const tab = (e.target as Element).closest<HTMLButtonElement>('[role="tab"]');
      if (tab) open(tab);
    });
    list.addEventListener('keydown', (e) => {
      const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
      const k = tabs.indexOf(document.activeElement as HTMLButtonElement);
      const to = { ArrowRight: k + 1, ArrowLeft: k - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (k < 0 || to === undefined) return;
      e.preventDefault();
      open(tabs[(to + tabs.length) % tabs.length], true);
    });
  });

  // a link to a closed card: open its folder before the browser jumps to it
  const reveal = (hash: string) => {
    const card = hash.length > 1 ? document.getElementById(hash.slice(1)) : null;
    const tab = card?.matches('.stack__card') ? tabFor(card) : null;
    if (tab) open(tab);
  };
  document.addEventListener('click', (e) => {
    const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (link) reveal(link.hash);
  });
  reveal(location.hash);
}
