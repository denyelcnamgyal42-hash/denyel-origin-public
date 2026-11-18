// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
import { isTallScreen } from '../core/env';

// Ink dissolve: a painted ink texture is used both as the colour and as the mask,
// so the ink spreads with real brush-stroke edges (the trick Santioni uses in WebGL).

const vert = `
attribute vec2 pos;
varying vec2 uv;
void main() { uv = pos * 0.5 + 0.5; uv.y = 1.0 - uv.y; gl_Position = vec4(pos, 0.0, 1.0); }`;

const frag = `
precision mediump float;
uniform sampler2D tex;
uniform float progress;
uniform vec2 res;
uniform vec2 img;
varying vec2 uv;

vec2 cover(vec2 p) {
  float s = max(res.x / img.x, res.y / img.y);
  return (p * res - (res - img * s) * 0.5) / (img * s);
}
float lum(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

void main() {
  vec2 cuv = cover(uv);
  vec3 ink = texture2D(tex, cuv).rgb;

  // brush-shaped noise: the texture itself, sampled large and rotated, so edges follow strokes
  vec2 nuv = vec2(uv.y, uv.x) * 0.55 + 0.2;
  float n = lum(texture2D(tex, nuv).rgb) * 2.2 + lum(texture2D(tex, fract(uv * 1.7)).rgb) * 1.3;
  n = clamp(n, 0.0, 1.0);

  // the ink closes in from the edges towards the light in the centre
  float d = distance(uv * vec2(res.x / res.y, 1.0), vec2(0.5 * res.x / res.y, 0.42));
  float field = (1.0 - clamp(d * 1.25, 0.0, 1.0)) * 0.62 + n * 0.38;

  float thr = progress * 1.32 - 0.12;
  float a = clamp((thr - field) / 0.07, 0.0, 1.0);
  // a darker, wet rim where the ink is still spreading
  float rim = 1.0 - clamp((thr - field) / 0.18, 0.0, 1.0);
  vec3 col = ink * (1.0 - rim * 0.55);
  gl_FragColor = vec4(col * a, a);
}`;

// progress 0 = no ink, 1 = the screen is fully inked
export function createInkWipe(canvas: HTMLCanvasElement) {
  const src = (isTallScreen() ? canvas.dataset.inkTall : canvas.dataset.inkWide)!;
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true });
  let progress = 0;
  let ready = false;
  if (!gl) {
    // no WebGL: fall back to a plain fade
    return { set: (p: number) => { canvas.style.background = '#141113'; canvas.style.opacity = String(p); } };
  }

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

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'pos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (n: string) => gl.getUniformLocation(prog, n);
  const uProgress = u('progress');
  const uRes = u('res');
  const uImg = u('img');
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const draw = () => {
    if (!ready) return;
    const dpr = Math.min(devicePixelRatio, 1.5);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uRes, w, h);
    gl.uniform1f(uProgress, progress);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (progress > 0) gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const image = new Image();
  image.onload = () => {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform2f(uImg, image.naturalWidth, image.naturalHeight);
    ready = true;
    draw();
  };
  image.src = src;
  addEventListener('resize', draw);

  return { set: (p: number) => { progress = p; draw(); } };
}
