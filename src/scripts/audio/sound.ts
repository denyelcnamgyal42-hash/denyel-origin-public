// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// All effects are synthesised with the Web Audio API: no audio files to download.
// Nothing plays until the visitor chooses "Enter with sound".
// Halal rule (Ines): no music and nothing tonal. Only noise (wind, waves, rumble, paper) and impacts.
// Her one exception: the HOLD hum (charge), kept from the first version.
//
//   beds (one place sound per chapter) ───────────────────────────────────┐
//   tension (a rumble scenes turn up before a reveal) ────────────────────┼─ breath (silence before a hit) ─ master
//   effects ───────────────────────────────────────────────────────────────────────────────────────────────┘

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let breathGain: GainNode | null = null;
let rumble: { gain: GainNode; filter: BiquadFilterNode } | null = null;
let enabled = false;
let brown: AudioBuffer | null = null;
let white: AudioBuffer | null = null;

function noiseBuffer(c: AudioContext, soft: boolean) {
  const len = c.sampleRate * 2;
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    if (!soft) { data[i] = w * 0.5; continue; }
    // brown-ish noise: softer than white noise, sounds like wind and water
    last = (last + 0.02 * w) / 1.02;
    data[i] = last * 3.5;
  }
  return buf;
}

function loop(c: AudioContext, buf: AudioBuffer) {
  const src = c.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  src.loopStart = Math.random(); // two layers on the same buffer never line up
  src.start(0, Math.random() * 2);
  return src;
}

// ---------- beds: the sound of the place, crossfaded between chapters ----------

type Bed = { gain: GainNode; stop: () => void };

function wind(c: AudioContext, out: AudioNode, level = 0.35): Bed {
  const src = loop(c, brown!);
  const band = c.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.value = 420;
  band.Q.value = 0.6;
  // slow gusts
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.07;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 220;
  lfo.connect(lfoGain).connect(band.frequency);
  const gain = c.createGain();
  gain.gain.value = level;
  src.connect(band).connect(gain).connect(out);
  lfo.start();
  return { gain, stop: () => { src.stop(); lfo.stop(); } };
}

// waves on the quay: each one swells, breaks into foam and drains back; a light breeze above
function harbour(c: AudioContext, out: AudioNode): Bed {
  const gain = c.createGain();
  gain.connect(out);
  const body = loop(c, brown!);
  const low = c.createBiquadFilter();
  low.type = 'lowpass';
  low.frequency.value = 380;
  const swell = c.createGain();
  swell.gain.value = 0.08;
  body.connect(low).connect(swell).connect(gain);
  const foam = loop(c, white!);
  const hiss = c.createBiquadFilter();
  hiss.type = 'bandpass';
  hiss.frequency.value = 2600;
  hiss.Q.value = 0.5;
  const spray = c.createGain();
  spray.gain.value = 0;
  foam.connect(hiss).connect(spray).connect(gain);
  const breeze = wind(c, gain, 0.1);

  let timer = 0;
  const wave = () => {
    const t = c.currentTime, rise = 1.8 + Math.random() * 1.2, size = 0.6 + Math.random() * 0.5;
    swell.gain.setTargetAtTime(0.55 * size, t, rise / 3);
    low.frequency.setTargetAtTime(380 + 500 * size, t, rise / 3);
    spray.gain.setTargetAtTime(0.16 * size, t + rise * 0.8, 0.25); // it breaks
    swell.gain.setTargetAtTime(0.08, t + rise, 1.4); // and drains back over the stones
    low.frequency.setTargetAtTime(380, t + rise, 1.4);
    spray.gain.setTargetAtTime(0, t + rise + 0.4, 0.9);
    timer = window.setTimeout(wave, (rise + 3.5 + Math.random() * 3) * 1000);
  };
  wave();
  return { gain, stop: () => { clearTimeout(timer); body.stop(); foam.stop(); breeze.stop(); } };
}

// one looping noise through one filter: the brick every bed is built from
function layer(c: AudioContext, out: AudioNode, buf: AudioBuffer, type: BiquadFilterType, freq: number, q: number, level: number) {
  const src = loop(c, buf);
  const filter = c.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  filter.Q.value = q;
  const gain = c.createGain();
  gain.gain.value = level;
  src.connect(filter).connect(gain).connect(out);
  return { src, filter, gain };
}

// a bed made of layers plus an optional pulse (waves, keys, gusts) that reschedules itself
function makeBed(c: AudioContext, out: AudioNode, build: (into: GainNode) => { stop: () => void }[], pulse?: (into: GainNode) => number): Bed {
  const gain = c.createGain();
  gain.connect(out);
  const parts = build(gain);
  let timer = 0;
  const beat = () => { timer = window.setTimeout(beat, pulse!(gain) * 1000); };
  if (pulse) beat();
  return { gain, stop: () => { clearTimeout(timer); parts.forEach((p) => p.stop()); } };
}
const stops = (l: { src: AudioBufferSourceNode }) => ({ stop: () => l.src.stop() });

// open air, barely moving (dawn, the map, the character file)
const breeze = (c: AudioContext, out: AudioNode) => wind(c, out, 0.14);

// a quiet room at night, and somebody typing in bursts (the training)
function study(c: AudioContext, out: AudioNode): Bed {
  return makeBed(c, out, (g) => [stops(layer(c, g, brown!, 'lowpass', 260, 0.7, 0.18))], (g) => {
    const keys = 4 + Math.floor(Math.random() * 14);
    let at = c.currentTime;
    for (let i = 0; i < keys; i++) {
      at += 0.07 + Math.random() * 0.12;
      tick(at, 1800 + Math.random() * 1600, 2, 0.05 + Math.random() * 0.04, 0.03, g);
    }
    return 1.5 + Math.random() * 3.5;
  });
}

// a dark room lit by one candle: its flame flutters (the mission board, the reports)
function candle(c: AudioContext, out: AudioNode): Bed {
  let flame: ReturnType<typeof layer>;
  return makeBed(c, out, (g) => {
    flame = layer(c, g, white!, 'bandpass', 520, 0.8, 0.03);
    return [stops(layer(c, g, brown!, 'lowpass', 140, 0.7, 0.2)), stops(flame)];
  }, () => {
    flame.gain.gain.setTargetAtTime(0.01 + Math.random() * 0.06, c.currentTime, 0.04);
    return 0.06 + Math.random() * 0.12;
  });
}

// a gale full of paper: hard gusts and sheets snapping past (the data storm, the finale's night)
function storm(c: AudioContext, out: AudioNode): Bed {
  return makeBed(c, out, (g) => [wind(c, g, 0.7)], (g) => {
    const n = 2 + Math.floor(Math.random() * 6);
    for (let i = 0; i < n; i++) tick(c.currentTime + Math.random() * 0.4, 2500 + Math.random() * 2500, 1.2, 0.12, 0.05 + Math.random() * 0.05, g);
    return 0.3 + Math.random() * 0.6;
  });
}

// a city far below: a low, steady hum of streets under the wind (Urban Mind)
function city(c: AudioContext, out: AudioNode): Bed {
  return makeBed(c, out, (g) => [stops(layer(c, g, brown!, 'lowpass', 170, 0.5, 0.45)), wind(c, g, 0.12)]);
}

// running water (the four agent rivers)
function river(c: AudioContext, out: AudioNode): Bed {
  let flow: ReturnType<typeof layer>;
  return makeBed(c, out, (g) => {
    flow = layer(c, g, white!, 'bandpass', 900, 0.7, 0.07);
    return [stops(layer(c, g, brown!, 'lowpass', 500, 0.7, 0.25)), stops(flow)];
  }, () => {
    flow.filter.frequency.setTargetAtTime(700 + Math.random() * 700, c.currentTime, 0.2);
    return 0.4 + Math.random() * 0.5;
  });
}

// almost nothing: a held breath of room (the library, the face-off)
function hush(c: AudioContext, out: AudioNode): Bed {
  return makeBed(c, out, (g) => [stops(layer(c, g, brown!, 'lowpass', 120, 0.7, 0.1))]);
}

const beds = { wind, harbour, breeze, study, candle, storm, city, river, hush };
export type BedName = keyof typeof beds;
let bed: { name: BedName; node: Bed } | null = null;

let wantedBed: BedName = 'wind';

// crossfade to the sound of another place
function setBed(name: BedName) {
  if (!ctx || !breathGain || bed?.name === name) return;
  const t = ctx.currentTime;
  if (bed) {
    const old = bed.node;
    old.gain.gain.setTargetAtTime(0, t, 0.8);
    setTimeout(old.stop, 4000);
  }
  const node = beds[name](ctx, breathGain);
  const level = node.gain.gain.value;
  node.gain.gain.setValueAtTime(0, t);
  node.gain.gain.setTargetAtTime(level, t, 0.8);
  bed = { name, node };
}

// a scene names the place it happens in; it is heard as soon as sound is on
export function placeSound(name: BedName) {
  wantedBed = name;
  if (enabled) setBed(name);
}

// ---------- switching on and off ----------

export function enableSound() {
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    breathGain = ctx.createGain();
    breathGain.connect(master);
    brown = noiseBuffer(ctx, true);
    white = noiseBuffer(ctx, false);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 90;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    loop(ctx, brown).connect(filter).connect(gain).connect(breathGain);
    rumble = { gain, filter };
  }
  ctx.resume();
  enabled = true;
  setBed(wantedBed);
  master!.gain.setTargetAtTime(0.5, ctx.currentTime, 0.8);
}

export function disableSound() {
  enabled = false;
  if (ctx && master) master.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
}

export const isSoundOn = () => enabled;

// ---------- suspense ----------

// a low rumble that grows before a reveal, 0 = gone, 1 = at its peak (scenes scrub it)
export function tension(p: number) {
  if (!ctx || !rumble) return;
  const t = ctx.currentTime, k = Math.max(0, Math.min(1, p));
  rumble.gain.gain.setTargetAtTime(enabled ? 0.9 * k * k : 0, t, 0.08);
  rumble.filter.frequency.setTargetAtTime(90 + 900 * k * k, t, 0.08);
}

// everything holds its breath: the place, the rumble, before the hit lands (or comes back alone if none does)
export function breath() {
  if (!enabled || !ctx || !breathGain) return;
  const g = breathGain.gain, t = ctx.currentTime;
  g.cancelScheduledValues(t);
  g.setTargetAtTime(0.04, t, 0.05);
  g.setTargetAtTime(1, t + 0.8, 0.4);
}

// the hit after the silence: a deep boom, and the world comes back
export function boom(strength = 1) {
  if (!enabled || !ctx || !master || !brown || !breathGain) return;
  const c = ctx, t = c.currentTime;
  thump(t, 1.1 * strength, 0.9);
  const src = c.createBufferSource();
  src.buffer = brown;
  const f = c.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.setValueAtTime(1400, t);
  f.frequency.exponentialRampToValueAtTime(120, t + 1.2);
  const g = c.createGain();
  g.gain.setValueAtTime(1.6 * strength, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
  src.connect(f).connect(g).connect(master);
  src.start(t);
  src.stop(t + 1.5);
  breathGain.gain.cancelScheduledValues(t);
  breathGain.gain.setTargetAtTime(1, t + 0.25, 0.5);
}

// a very low body hit (the boom, the stamp, the heartbeat): felt more than heard
function thump(t: number, level: number, length: number) {
  const c = ctx!;
  const o = c.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(110, t);
  o.frequency.exponentialRampToValueAtTime(34, t + length * 0.5);
  const g = c.createGain();
  g.gain.setValueAtTime(level, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + length);
  o.connect(g).connect(master!);
  o.start(t);
  o.stop(t + length + 0.05);
}

// ---------- effects ----------

// a page-turn / camera whoosh
export function whoosh(strength = 1) {
  if (!enabled || !ctx || !master || !brown) return;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = brown;
  const f = ctx.createBiquadFilter();
  f.type = 'bandpass';
  f.Q.value = 1.2;
  f.frequency.setValueAtTime(300, t);
  f.frequency.exponentialRampToValueAtTime(2400, t + 0.35);
  f.frequency.exponentialRampToValueAtTime(500, t + 0.9);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.9 * strength, t + 0.25);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1);
  src.connect(f).connect(g).connect(master);
  src.start(t);
  src.stop(t + 1.1);
}

// a soft ink stamp: low thump + paper tick
export function stamp() {
  if (!enabled || !ctx || !master) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(140, t);
  o.frequency.exponentialRampToValueAtTime(45, t + 0.18);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.7, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.3);
}

// a short burst of filtered noise: a footstep, a splinter, a paper tick
function tick(at: number, freq: number, q: number, level: number, length: number, out: AudioNode = master!) {
  const c = ctx!;
  const src = c.createBufferSource();
  src.buffer = white;
  const f = c.createBiquadFilter();
  f.type = 'bandpass';
  f.frequency.value = freq;
  f.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(level, at);
  g.gain.exponentialRampToValueAtTime(0.0001, at + length);
  src.connect(f).connect(g).connect(out);
  src.start(at, Math.random() * 1.5);
  src.stop(at + length + 0.02);
}

// a soft step on the stones of the quay
export function step() {
  if (!enabled || !ctx || !master || !white) return;
  const t = ctx.currentTime;
  tick(t, 700 + Math.random() * 300, 1.4, 0.5 + Math.random() * 0.2, 0.09);
  tick(t + 0.03, 2200, 0.8, 0.12, 0.05); // grit under the sole
}

// rising hum while a HOLD button is pressed; returns setters for progress and stop
// (Ines kept this one from the first version: she prefers it to the heartbeat)
export function charge() {
  if (!enabled || !ctx || !master) return { set: (_p: number) => {}, stop: () => {} };
  const c = ctx;
  const o = c.createOscillator();
  o.type = 'sawtooth';
  const f = c.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = 400;
  const g = c.createGain();
  g.gain.value = 0;
  o.frequency.value = 70;
  o.connect(f).connect(g).connect(master);
  o.start();
  g.gain.setTargetAtTime(0.18, c.currentTime, 0.1);
  return {
    set(p: number) {
      o.frequency.setTargetAtTime(70 + p * 160, c.currentTime, 0.05);
      f.frequency.setTargetAtTime(400 + p * 2200, c.currentTime, 0.05);
    },
    stop() {
      g.gain.setTargetAtTime(0, c.currentTime, 0.08);
      o.stop(c.currentTime + 0.4);
    },
  };
}

// a title breaking: a sharp crack of noise and a few glassy splinters, on an ink thump
export function shatter() {
  if (!enabled || !ctx || !master || !white) return;
  const t = ctx.currentTime;
  tick(t, 3200, 0.4, 2.4, 0.45);
  for (let i = 0; i < 6; i++) tick(t + 0.02 + Math.random() * 0.3, 4000 + Math.random() * 4000, 6, 0.5, 0.06);
  stamp();
}
