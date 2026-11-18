// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
import { gsap } from 'gsap';

// Living frames: her drawing stays the drawing, a shader only moves the zones the markup names
// (cloth flutters from an anchor, water shimmers, the sky drifts; a still zone pins a face), so a still frame breathes.
// Works on plates (jpg, cover) and cutouts (png with transparency).
// Markup: <div data-part="x" data-live='[{"kind":"cloth","box":[x0,y0,x1,y1],"anchor":[x,y],"amp":0.03}]'><img></div>
// (box and anchor in fractions of the drawing). The <img> stays as the fallback and the alt text.

type Zone = { kind: 'cloth' | 'water' | 'sky' | 'still'; box: [number, number, number, number]; anchor?: [number, number]; amp?: number };
type Options = { boil?: number; lift?: number };
const KINDS = { cloth: 1, water: 2, sky: 3, still: 4 };
const MAX = 4;

const vert = `
attribute vec2 pos;
varying vec2 uv;
void main() { uv = pos * 0.5 + 0.5; uv.y = 1.0 - uv.y; gl_Position = vec4(pos, 0.0, 1.0); }`;

const frag = `
precision mediump float;
uniform sampler2D tex;
uniform vec2 res, img, focus;
uniform float time, walk, gust, boil, lift;
uniform vec4 box[${MAX}];
uniform vec4 prm[${MAX}]; // kind, amp, anchor x, anchor y
varying vec2 uv;

vec2 cover(vec2 p) {
  float s = max(res.x / img.x, res.y / img.y);
  return (p * res - (res - img * s) * focus) / (img * s);
}
float inside(vec2 p, vec4 b) {
  return smoothstep(b.x, b.x + 0.03, p.x) * (1.0 - smoothstep(b.z - 0.03, b.z, p.x))
       * smoothstep(b.y, b.y + 0.03, p.y) * (1.0 - smoothstep(b.w - 0.03, b.w, p.y));
}

void main() {
  vec2 p = cover(uv);
  vec2 d = vec2(0.0);
  float pin = 0.0;
  float stride = sin(walk * 3.14159);
  for (int i = 0; i < ${MAX}; i++) {
    float kind = prm[i].x, amp = prm[i].y;
    float w = inside(p, box[i]) * amp;
    if (kind == 1.0) {
      // cloth: a wave runs away from where it is held, stronger at the free end; a gust or a step shakes it
      // (measured in heights of the drawing, so a tall cutout and a wide plate wave alike)
      float r = length((p - prm[i].zw) * vec2(img.x / img.y, 1.0));
      float s = sin(r * 14.0 - time * 4.5 + p.y * 8.0);
      d += vec2(s * 0.35 + stride * 0.5, cos(r * 11.0 - time * 3.6)) * w * r * (1.0 + gust * 2.0) / vec2(img.x / img.y, 1.0);
    } else if (kind == 2.0) {
      d.x += sin(p.y * 260.0 + time * 1.6 + sin(p.x * 9.0 + time) * 2.0) * w;
    } else if (kind == 3.0) {
      d += vec2(sin(p.y * 7.0 + time * 0.35) + sin(p.x * 4.0 - time * 0.22), cos(p.x * 5.0 + time * 0.3)) * w;
    } else if (kind == 4.0) {
      pin = max(pin, inside(p, box[i]));
    }
  }
  // a step lifts the body and stretches the hem; the feet stay on the ground
  d.y += lift * abs(stride) * (1.0 - smoothstep(0.6, 0.93, p.y));
  // line boil: the ink trembles a little, eight times a second, like hand-drawn animation
  float b = floor(time * 8.0);
  d += vec2(sin(p.y * 60.0 + b * 1.7), cos(p.x * 60.0 + b * 2.3)) * boil;
  // a still zone (her face) never moves: only the cloth around it does
  d *= 1.0 - pin;
  vec4 c = texture2D(tex, clamp(p + d, 0.0, 1.0));
  gl_FragColor = vec4(c.rgb * c.a, c.a);
}`;

const frames: { draw: (t: number) => void }[] = [];
let gust = 0;

// one ticker and one pointer listener for every living frame: a fast mouse is a gust of wind
function start() {
  let last = { x: 0, y: 0, t: 0 };
  addEventListener('pointermove', (e) => {
    const dt = Math.max(e.timeStamp - last.t, 8);
    const speed = Math.hypot(e.clientX - last.x, e.clientY - last.y) / dt;
    gust = Math.min(1, Math.max(gust, speed / 2.5));
    last = { x: e.clientX, y: e.clientY, t: e.timeStamp };
  });
  gsap.ticker.add((t) => {
    gust *= 0.96;
    for (const f of frames) f.draw(t);
  });
}

// a gust from the story itself (a power-up), on top of the visitor's mouse
export function blow(strength = 1) {
  gust = Math.max(gust, strength);
}

export function liveFrame(el: HTMLElement, { boil = 0, lift = 0 }: Options = {}) {
  let walk = 0;
  const control = { walk: (steps: number) => { walk = steps; } };
  const img = el.querySelector('img')!;
  const zones = JSON.parse(el.dataset.live ?? '[]') as Zone[];
  const canvas = document.createElement('canvas');
  canvas.className = 'layer';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false });
  if (!gl) return control;

  const sh = (type: number, code: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, code);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'pos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (n: string) => gl.getUniformLocation(prog, n);

  const boxes = new Float32Array(MAX * 4), prms = new Float32Array(MAX * 4);
  zones.slice(0, MAX).forEach((z, i) => {
    boxes.set(z.box, i * 4);
    prms.set([KINDS[z.kind], z.amp ?? 0, ...(z.anchor ?? [0, 0])], i * 4);
  });
  gl.uniform4fv(u('box'), boxes);
  gl.uniform4fv(u('prm'), prms);
  gl.uniform1f(u('boil'), boil);
  gl.uniform1f(u('lift'), lift);
  const uRes = u('res'), uTime = u('time'), uWalk = u('walk'), uGust = u('gust');

  // draw only while the frame is on screen and not hidden by its timeline
  let onScreen = false;
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }).observe(el);
  const visible = () => onScreen && el.style.visibility !== 'hidden' && el.style.opacity !== '0';

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const [fx, fy] = getComputedStyle(img).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
  gl.uniform2f(u('focus'), Number.isFinite(fx) ? fx : 0.5, Number.isFinite(fy) ? fy : 0.5);

  // Re-upload whenever the <img> bitmap changes (responsive srcset can start small, then swap).
  const upload = () => {
    if (!img.naturalWidth) return;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); // cutouts keep their transparency
    gl.uniform2f(u('img'), img.naturalWidth, img.naturalHeight);
  };

  const arm = () => {
    upload();
    if (!canvas.isConnected) {
      el.append(canvas);
      img.style.visibility = 'hidden';
      if (!frames.length) start();
      frames.push({
        draw(t) {
          if (!visible()) return;
          const dpr = Math.min(devicePixelRatio, 1.5);
          const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
          if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
          gl.uniform2f(uRes, w, h);
          gl.uniform1f(uTime, t % 1000); // keeps precision on phones (mediump)
          gl.uniform1f(uWalk, walk);
          gl.uniform1f(uGust, gust);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        },
      });
    }
  };

  img.addEventListener('load', upload);
  if (img.complete) img.decode().then(arm).catch(arm);
  else img.addEventListener('load', arm, { once: true });
  return control;
}
