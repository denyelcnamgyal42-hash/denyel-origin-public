// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Stacks of photo prints ([data-shots]). Each print is a button: pressed behind, it comes to the front
// ("next photo" does the same); pressed in front, it opens large in the viewer ([data-viewer], a <dialog>:
// Esc, the Close button or a click on the veil closes it). Each print carries its place in the stack
// (data-pos, 0 = front) from the page itself, so without this script the first photo simply stays in front.

export function initShots() {
  const viewer = document.querySelector<HTMLDialogElement>('[data-viewer]');
  const open = (btn: HTMLElement) => {
    if (!viewer) return;
    const img = viewer.querySelector('img') ?? viewer.insertBefore(new Image(), viewer.firstChild); // made on first use
    img.src = btn.dataset.open!;
    img.alt = btn.dataset.alt ?? '';
    viewer.querySelector('p')!.textContent = btn.dataset.caption ?? '';
    viewer.showModal();
  };
  viewer?.querySelector('[data-viewer-close]')?.addEventListener('click', () => viewer.close());
  viewer?.addEventListener('click', (e) => { if (e.target === viewer) viewer.close(); });

  document.querySelectorAll<HTMLElement>('[data-shots]').forEach((stack) => {
    const shots = [...stack.querySelectorAll<HTMLElement>('[data-pos]')];
    let front = 0;
    const show = (i: number) => {
      front = i;
      shots.forEach((s, k) => { s.dataset.pos = String((k - front + shots.length) % shots.length); });
    };
    stack.querySelector('[data-shots-next]')?.addEventListener('click', () => show((front + 1) % shots.length));
    shots.forEach((s, k) => s.querySelector<HTMLElement>('[data-open]')?.addEventListener('click', (e) => {
      if (k === front) open(e.currentTarget as HTMLElement);
      else show(k);
    }));
  });
}
