// 🎵 Studio-Grade Procedural Web Audio Engine (AAA Game Sound Design)
let audioCtx = null;
let bgmOscillators = [];
let bgmPlaying = false;
let bgmInterval = null;

function getAudioContext() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!audioCtx) audioCtx = new AudioCtx();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

export function playSfx(type) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'select' || type === 'bubble' || type === 'pop') {
      // Crystal bubble pop with upper harmonic chime
      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const g = ctx.createGain();
      o1.type = 'sine';
      o2.type = 'triangle';
      o1.frequency.setValueAtTime(540, now);
      o1.frequency.exponentialRampToValueAtTime(1180, now + 0.08);
      o2.frequency.setValueAtTime(1080, now);
      o2.frequency.exponentialRampToValueAtTime(2360, now + 0.08);
      g.gain.setValueAtTime(0.16, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      o1.connect(g); o2.connect(g);
      g.connect(ctx.destination);
      o1.start(now); o2.start(now);
      o1.stop(now + 0.08); o2.stop(now + 0.08);
    } else if (type === 'click' || type === 'tap') {
      // Crisp mechanical UI tap
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);
      g.gain.setValueAtTime(0.12, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(now); osc.stop(now + 0.04);
    } else if (type === 'place' || type === 'snap') {
      // Heavy tactile snap (sub-thud + wooden click + celestial shimmer)
      const oThud = ctx.createOscillator();
      const oSnap = ctx.createOscillator();
      const oShimmer = ctx.createOscillator();
      const gThud = ctx.createGain();
      const gSnap = ctx.createGain();
      const gShimmer = ctx.createGain();

      oThud.type = 'sine';
      oThud.frequency.setValueAtTime(180, now);
      oThud.frequency.exponentialRampToValueAtTime(40, now + 0.12);
      gThud.gain.setValueAtTime(0.25, now);
      gThud.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      oSnap.type = 'triangle';
      oSnap.frequency.setValueAtTime(440, now);
      oSnap.frequency.exponentialRampToValueAtTime(1200, now + 0.09);
      gSnap.gain.setValueAtTime(0.2, now);
      gSnap.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      oShimmer.type = 'sine';
      oShimmer.frequency.setValueAtTime(1760, now);
      oShimmer.frequency.exponentialRampToValueAtTime(3520, now + 0.15);
      gShimmer.gain.setValueAtTime(0.08, now);
      gShimmer.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      oThud.connect(gThud); gThud.connect(ctx.destination);
      oSnap.connect(gSnap); gSnap.connect(ctx.destination);
      oShimmer.connect(gShimmer); gShimmer.connect(ctx.destination);

      oThud.start(now); oSnap.start(now); oShimmer.start(now);
      oThud.stop(now + 0.12); oSnap.stop(now + 0.09); oShimmer.stop(now + 0.15);
    } else if (type === 'draw') {
      // Crisp card slide whoosh
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now + 0.12);
    } else if (type === 'discard' || type === 'poof') {
      // Magic stardust dissolve
      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const g = ctx.createGain();
      o1.type = 'sine';
      o2.type = 'sawtooth';
      o1.frequency.setValueAtTime(800, now);
      o1.frequency.exponentialRampToValueAtTime(140, now + 0.18);
      o2.frequency.setValueAtTime(400, now);
      o2.frequency.exponentialRampToValueAtTime(60, now + 0.18);
      g.gain.setValueAtTime(0.12, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      o1.connect(g); o2.connect(g); g.connect(ctx.destination);
      o1.start(now); o2.start(now);
      o1.stop(now + 0.18); o2.stop(now + 0.18);
    } else if (type === 'fanfare' || type === 'victory') {
      // Epic Victory Arpeggio (C Major 9 chord with bell sparkle)
      const chord = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98];
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.15, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.45);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.45);
      });
    } else if (type === 'sparkle' || type === 'cheer') {
      // Star twinkle arpeggio
      [1046.5, 1318.5, 1567.98, 2093.0].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);
        gain.gain.setValueAtTime(0.09, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.18);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.18);
      });
    } else if (type === 'roar' || type === 'fierce') {
      // Low warm playful rumble
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.22);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now + 0.22);
    }
  } catch (e) {}
}

// 🍃 Cozy Island Lofi Pentatonic Ambient Music
export function toggleBgm(onState) {
  try {
    const ctx = getAudioContext();
    if (onState === false || (onState === undefined && bgmPlaying)) {
      bgmPlaying = false;
      clearInterval(bgmInterval);
      bgmOscillators.forEach(o => { try { o.stop(); } catch(e){} });
      bgmOscillators = [];
      return false;
    }

    bgmPlaying = true;
    const melody = [523.25, 587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 523.25, 659.25, 880.00, 783.99];
    let noteIdx = 0;

    bgmInterval = setInterval(() => {
      if (!bgmPlaying) return;
      try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(melody[noteIdx % melody.length], now);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
        noteIdx++;
      } catch(e) {}
    }, 420);

    return true;
  } catch (e) {
    return false;
  }
}
