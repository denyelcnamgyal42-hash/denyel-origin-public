// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// The campus cat: greets by the time of day, opens its chat on a question (from its own list or an
// "ask me about…" note in the hero), jumps when petted, naps on request.
import { stampAt } from './stamps';

export function initMascot() {
  const root = document.querySelector<HTMLElement>('[data-mascot]');
  if (!root) return;
  const chat = root.querySelector<HTMLElement>('[data-chat]')!;
  const bubble = root.querySelector<HTMLElement>('.mascot__bubble')!;
  const home = root.querySelector<HTMLButtonElement>('[data-home]')!;
  const answers = [...root.querySelectorAll<HTMLElement>('[data-qa]')];
  const asks = [...root.querySelectorAll<HTMLButtonElement>('.mascot__asks [data-ask]')];
  const pose = (p: string) => (root.dataset.pose = p);

  // the greeting balloon only while the hero is on screen (further down it would cover the content)
  new IntersectionObserver(([e]) => root.classList.toggle('is-quiet', !e.isIntersecting))
    .observe(document.querySelector('#about')!);

  // on phones the cat tucks half behind the edge while the page scrolls, and peeks back once it stops
  const phone = matchMedia('(max-width: 760px)');
  let rest = 0;
  addEventListener('scroll', () => {
    if (!phone.matches || !chat.hidden) return;
    root.classList.add('is-tucked');
    clearTimeout(rest);
    rest = window.setTimeout(() => root.classList.remove('is-tucked'), 450);
  }, { passive: true });

  const greet = root.querySelector<HTMLElement>('[data-greet]')!;
  const hour = new Date().getHours();
  greet.textContent = greet.dataset[hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'] ?? '';

  // id = the question to answer; none = the list of questions
  const open = (id?: string) => {
    chat.hidden = false;
    bubble.hidden = true;
    answers.forEach((a) => (a.hidden = a.dataset.qa !== id));
    asks.forEach((b) => (b.parentElement!.hidden = b.dataset.ask === id));
    home.hidden = !id;
    pose('wave');
  };
  const close = () => { chat.hidden = true; };

  root.querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => (chat.hidden ? open() : close())));
  root.querySelector('[data-close]')!.addEventListener('click', close);
  home.addEventListener('click', () => open());
  asks.forEach((b) => b.addEventListener('click', () => open(b.dataset.ask)));
  document.querySelectorAll<HTMLElement>('.hero [data-ask]').forEach((note) => note.addEventListener('click', () => open(note.dataset.ask)));
  root.querySelectorAll('[data-go]').forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && close());

  const cat = root.querySelector<HTMLElement>('.mascot__cat')!;
  const jump = () => {
    pose('jump');
    const box = cat.getBoundingClientRect();
    for (let i = 0; i < 3; i++) setTimeout(() => stampAt(box.left + 20 + i * 26, box.top - 6 - (i % 2) * 18, 'heart'), i * 140);
    cat.addEventListener('animationend', () => pose('wave'), { once: true });
  };
  root.querySelector('[data-act="jump"]')!.addEventListener('click', (e) => { jump(); (e.currentTarget as HTMLElement).blur(); });
  root.querySelector('[data-act="nap"]')!.addEventListener('click', () => { pose('nap'); close(); });

  // the cat hunt (hunt.ts): it cheers each kitten found; the last one makes it jump and point to the contact note
  const say = root.querySelector<HTMLAnchorElement>('[data-say]')!;
  let hush = 0;
  document.addEventListener('cat-found', (e) => {
    const { found, total } = (e as CustomEvent<{ found: number; total: number }>).detail;
    const done = found === total;
    say.textContent = done ? say.dataset.done! : say.dataset.found!.replace('{n}', String(found)).replace('{total}', String(total));
    say.href = done ? '#contact' : '#about';
    say.hidden = false;
    bubble.hidden = true;
    if (done) jump(); else pose('wave');
    clearTimeout(hush);
    hush = window.setTimeout(() => (say.hidden = true), done ? 7000 : 3500);
  });
  say.addEventListener('click', () => (say.hidden = true));
}
