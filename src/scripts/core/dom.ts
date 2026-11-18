// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Every scene is a [data-scene] root; its pieces are [data-part] children.
// Looking parts up inside their own scene keeps selectors from leaking between chapters.

export function scene(name: string): HTMLElement {
  const el = document.querySelector<HTMLElement>(`[data-scene="${name}"]`);
  if (!el) throw new Error(`scene "${name}" not found`);
  return el;
}

export function part<T extends Element = HTMLElement>(root: ParentNode, name: string): T {
  const el = root.querySelector<T>(`[data-part="${name}"]`);
  if (!el) throw new Error(`part "${name}" not found`);
  return el;
}

export function parts<T extends Element = HTMLElement>(root: ParentNode, name: string): T[] {
  return [...root.querySelectorAll<T>(`[data-part="${name}"]`)];
}

export function caption(root: ParentNode, name: string | number): HTMLElement {
  const el = root.querySelector<HTMLElement>(`[data-caption="${name}"]`);
  if (!el) throw new Error(`caption "${name}" not found`);
  return el;
}
