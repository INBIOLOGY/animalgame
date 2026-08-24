// 🎵 Cozy Wildlife & Biology TCG — Procedural Cute BGM & Sound Engine
// 100% Royalty-Free, Zero Copyright, Procedurally Synthesized with Web Audio API

let audioCtx = null;
let bgmMasterGain = null;
let bgmPlaying = false;
let bgmInterval = null;

function getAudioContext() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!audioCtx) {
    audioCtx = new AudioCtx();
    bgmMasterGain = audioCtx.createGain();
    bgmMasterGain.gain.setValueAtTime(0.35, audioCtx.currentTime);
    bgmMasterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSfx(type) {
  try {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('animalgame_sfx_muted') === 'true') {
      return;
    }
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'select' || type === 'bubble' || type === 'pop') {
      // Crystal bubble pop with upper harmonic chime
      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const g = ctx.createGain();
      o1.type = 'sine';
      o2.type = 'triangle';
      o1.frequency.setValueAtTime(587.33, now); // D5
      o1.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08);
      o2.frequency.setValueAtTime(880, now); // A5
      o2.frequency.exponentialRampToValueAtTime(1760, now + 0.08);
      g.gain.setValueAtTime(0.18, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      o1.connect(g); o2.connect(g);
      g.connect(ctx.destination);
      o1.start(now); o2.start(now);
      o1.stop(now + 0.09); o2.stop(now + 0.09);
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
      gain.gain.setValueAtTime(0.14, now);
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
        gain.gain.setValueAtTime(0.16, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.45);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.45);
      });
    } else if (type === 'sparkle' || type === 'cheer' || type === 'special') {
      // Magical sparkling star shimmer for special card activation
      [783.99, 1046.5, 1318.5, 1567.98, 2093.0, 2637.0].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.12, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.28);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.28);
      });
    } else if (type === 'whoosh') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now + 0.2);
    }
  } catch (e) {}
}

// 🌸 Playful & Cozy Island Kalimba / Marimba BGM (Animal Crossing / Pokemon Cafe Style)
// 100% Procedurally Synthesized & Royalty-Free
export function toggleBgm(onState) {
  try {
    const ctx = getAudioContext();
    if (onState === false || (onState === undefined && bgmPlaying)) {
      bgmPlaying = false;
      clearInterval(bgmInterval);
      return false;
    }

    bgmPlaying = true;

    // Charming pentatonic cute melodic patterns & warm bassline
    // C Major / G Major Pentatonic (C4, D4, E4, G4, A4, C5, D5, E5, G5)
    const melodySeq = [
      { note: 523.25, dur: 0.35, bass: 261.63 }, // C5 + C4
      { note: 659.25, dur: 0.35 },               // E5
      { note: 783.99, dur: 0.35 },               // G5
      { note: 659.25, dur: 0.35 },               // E5
      { note: 880.00, dur: 0.45, bass: 220.00 }, // A5 + A3
      { note: 783.99, dur: 0.35 },               // G5
      { note: 659.25, dur: 0.35 },               // E5
      { note: 587.33, dur: 0.35 },               // D5
      { note: 523.25, dur: 0.45, bass: 174.61 }, // C5 + F3
      { note: 587.33, dur: 0.35 },               // D5
      { note: 659.25, dur: 0.35 },               // E5
      { note: 523.25, dur: 0.35 },               // C5
      { note: 783.99, dur: 0.50, bass: 196.00 }, // G5 + G3
      { note: 880.00, dur: 0.35 },               // A5
      { note: 1046.50, dur: 0.55 },              // C6
      { note: 783.99, dur: 0.35 },               // G5
    ];

    let step = 0;

    const playStep = () => {
      if (!bgmPlaying) return;
      try {
        const now = ctx.currentTime;
        const current = melodySeq[step % melodySeq.length];

        // 1. Kalimba / Marimba Melody Bell
        const osc = ctx.createOscillator();
        const oscHarmonic = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(current.note, now);

        oscHarmonic.type = 'sine';
        oscHarmonic.frequency.setValueAtTime(current.note * 2, now);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + (current.dur || 0.35));

        osc.connect(gain);
        oscHarmonic.connect(gain);
        gain.connect(bgmMasterGain || ctx.destination);

        osc.start(now);
        oscHarmonic.start(now);
        osc.stop(now + (current.dur || 0.35));
        oscHarmonic.stop(now + (current.dur || 0.35));

        // 2. Soft Ambient Warm Bass
        if (current.bass) {
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          bassOsc.type = 'sine';
          bassOsc.frequency.setValueAtTime(current.bass, now);
          bassGain.gain.setValueAtTime(0.035, now);
          bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

          bassOsc.connect(bassGain);
          bassGain.connect(bgmMasterGain || ctx.destination);

          bassOsc.start(now);
          bassOsc.stop(now + 0.65);
        }

        step++;
      } catch (e) {}
    };

    playStep();
    bgmInterval = setInterval(playStep, 380);

    return true;
  } catch (e) {
    return false;
  }
}

