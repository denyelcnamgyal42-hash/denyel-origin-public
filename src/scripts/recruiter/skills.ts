// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Skills: a press on a skill sticker writes, under its group, where she used it (one note shown per group).
export function initSkills() {
  document.querySelectorAll<HTMLElement>('[data-skills]').forEach((group) => {
    const stickers = [...group.querySelectorAll<HTMLButtonElement>('button[aria-controls]')];
    stickers.forEach((pressed) => pressed.addEventListener('click', () => stickers.forEach((s) => {
      const on = s === pressed;
      s.setAttribute('aria-pressed', String(on));
      document.getElementById(s.getAttribute('aria-controls')!)!.hidden = !on;
    })));
  });
}
