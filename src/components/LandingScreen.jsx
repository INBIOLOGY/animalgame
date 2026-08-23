import React, { useState } from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { TraitIcon, UIIcon } from '../assets/natureIcons';
import { ALL_ANIMALS_DATA, TRAIT_MAP, TRAIT_COLORS } from '../utils/traits';
import { getAnimalArt, TCG_ARENA_BACKDROP } from '../assets/artAssets';
import { playSfx } from '../utils/audio';
import confetti from 'canvas-confetti';

const ANIMAL_AVATARS = [
  { id: 'lion',       num: '01', name: 'สิงโต' },
  { id: 'tiger',      num: '02', name: 'เสือโคร่ง' },
  { id: 'cheetah',   num: '03', name: 'ชีตาห์' },
  { id: 'elephant',  num: '04', name: 'ช้าง' },
  { id: 'eagle',     num: '05', name: 'นกอินทรี' },
  { id: 'owl',       num: '06', name: 'นกฮูก' },
  { id: 'penguin',   num: '07', name: 'เพนกวิน' },
  { id: 'shark',     num: '08', name: 'ฉลาม' },
  { id: 'dolphin',   num: '09', name: 'โลมา' },
  { id: 'frog',      num: '10', name: 'กบ' },
  { id: 'turtle',    num: '11', name: 'เต่าบก' },
  { id: 'octopus',   num: '12', name: 'หมึกยักษ์' },
  { id: 'butterfly', num: '13', name: 'ผีเสื้อ' },
  { id: 'kangaroo',  num: '14', name: 'จิงโจ้' },
  { id: 'koala',     num: '15', name: 'โคอาลา' },
  { id: 'wolf',      num: '16', name: 'หมาป่า' },
  { id: 'chimp',     num: '17', name: 'ชิมแปนซี' },
  { id: 'polar_bear',num: '18', name: 'หมีขั้วโลก' },
];

const MODES = [
  {
    key: 'multiplayer',
    iconName: 'users',
    title: 'เล่นกับเพื่อน (Online Arena)',
    desc: 'สร้างห้องประลองการ์ดออนไลน์ 2-10 คน ชวนเพื่อนมาร่วมโต๊ะประลอง',
    tag: 'ผู้เล่นหลายคน',
    glow: 'rgba(56, 189, 248, 0.4)',
  },
  {
    key: 'vs_bot',
    iconName: 'bot',
    title: 'ฝึกซ้อมกับบอท AI',
    desc: 'ประลองปัญญากับหุ่นจำลอง 3 ระดับความฉลาด (ง่าย / ปานกลาง / ยาก)',
    tag: 'เล่นเดี่ยว / AI',
    glow: 'rgba(234, 179, 8, 0.4)',
  },
  {
    key: 'time_attack',
    iconName: 'timer',
    title: 'สปีดรันจับเวลา (Chrono Run)',
    desc: 'ท้าทายความเร็วในการจัดหมวดหมู่สัตว์ ทำคะแนนสูงสุดก่อนหมดเวลา',
    tag: 'จับเวลา',
    glow: 'rgba(239, 68, 68, 0.4)',
  },
];

const TIME_OPTIONS = [30, 60, 90, 120];

export default function LandingScreen({ onCreateRoom, onJoinRoom }) {
  const [selectedAvatarId, setSelectedAvatarId] = useState('lion');
  const [playerName, setPlayerName] = useState('');
  const [mode, setMode] = useState('multiplayer');
  const [timeLimit, setTimeLimit] = useState(60);
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [botDifficulty, setBotDifficulty] = useState('medium');
  const [roomCode, setRoomCode] = useState('');
  const [mascotBounce, setMascotBounce] = useState(false);
  const [nameError, setNameError] = useState('');
  const [codeError, setCodeError] = useState('');

  const curAnimalData = ALL_ANIMALS_DATA.find((a) => a.id === selectedAvatarId) || ALL_ANIMALS_DATA[0];
  const curAvatarMeta = ANIMAL_AVATARS.find((a) => a.id === selectedAvatarId) || ANIMAL_AVATARS[0];
  const heroArt = getAnimalArt(curAnimalData.id);

  // Extract Latin binomial name
  const latinNameMatch = curAnimalData.englishName?.match(/\((.*?)\)/);
  const latinName = latinNameMatch ? latinNameMatch[1] : curAnimalData.englishName;

  // Deduplicate traits so none appear twice
  const distinctTraits = Array.from(
    new Set((curAnimalData.traits || []).map((t) => TRAIT_MAP[t] || t))
  ).slice(0, 3);

  const handleCreate = () => {
    const raw = playerName.trim();
    if (!raw) {
      playSfx('discard');
      setNameError('กรุณากรอกชื่อผู้เล่นของคุณก่อน');
      return;
    }
    setNameError('');
    setCodeError('');
    playSfx('fanfare');
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#285422', '#d49a26', '#38bdf8', '#f59e0b', '#ffffff'],
      });
    } catch (e) {}
    onCreateRoom(raw, selectedAvatarId, mode, timeLimit, maxPlayers, botDifficulty);
  };

  const handleJoin = () => {
    const raw = playerName.trim();
    const code = roomCode.trim();
    if (!raw) {
      playSfx('discard');
      setNameError('กรุณากรอกชื่อผู้เล่นของคุณก่อน');
      return;
    }
    if (!code || code.length !== 6) {
      playSfx('discard');
      setCodeError('กรุณากรอกรหัสห้อง 6 หลักให้ถูกต้อง');
      return;
    }
    setNameError('');
    setCodeError('');
    playSfx('select');
    onJoinRoom(raw, selectedAvatarId, code);
  };

  const handleSelectAvatar = (id) => {
    playSfx('pop');
    setSelectedAvatarId(id);
    setMascotBounce(true);
    setTimeout(() => setMascotBounce(false), 400);
  };

  return (
    <section className="landing-container page-screen-anim">
      {/* 🌲 Cinematic TCG Arena Tabletop Background Art */}
      <div
        className="tcg-cinematic-backdrop"
        style={{ backgroundImage: `url(${TCG_ARENA_BACKDROP})` }}
        aria-hidden="true"
      />
      <div className="tcg-cinematic-overlay" aria-hidden="true" />

      {/* 🎴 Glassmorphic TCG Lobby Portal */}
      <div className="naturalist-folio-portal">
        {/* ─── LEFT: Signature Hero Card Showcase & Avatar Picker ─── */}
        <div className="folio-specimen-column">
          <div className="folio-section-header">
            <span className="folio-section-title">การ์ดตัวละครหลักของคุณ</span>
            <span className="folio-catalog-id">CARD #{curAvatarMeta.num}</span>
          </div>

          {/* 🌟 AAA Hero Showcase Card with Digital Artwork */}
          <div
            className={`hero-showcase-card ${mascotBounce ? 'card-bounce' : ''}`}
            onClick={() => handleSelectAvatar(selectedAvatarId)}
          >
            {/* Card Visual Artwork Window */}
            <div className="hero-card-art-frame">
              <img src={heroArt} alt={curAnimalData.name} className="hero-card-img" />
              <div className="hero-card-vignette" />
              <div className="hero-card-shimmer" />
              <span className="hero-card-rarity-badge">
                {curAnimalData.rarity === 'legendary' ? '✨ LEGENDARY' : '⭐ TCG SPECIMEN'}
              </span>
            </div>

            {/* Hero Card Taxonomy & Stats */}
            <div className="hero-card-meta-panel">
              <div className="hero-card-title-row">
                <h2 className="hero-card-thai-name">{curAnimalData.name}</h2>
                <span className="hero-card-latin-name">{latinName}</span>
              </div>
              <div className="hero-card-habitat">📍 {curAnimalData.habitat}</div>

              {/* Deduplicated Trait Badges */}
              <div className="hero-card-traits-row">
                {distinctTraits.map((tLabel, idx) => {
                  const originalKey = curAnimalData.traits.find((k) => (TRAIT_MAP[k] || k) === tLabel) || 'backbone';
                  const colors = TRAIT_COLORS[originalKey] || { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7', iconName: 'backbone' };
                  return (
                    <span
                      key={idx}
                      className="hero-trait-pill"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        borderColor: colors.border,
                      }}
                    >
                      <TraitIcon name={colors.iconName} size={12} color={colors.text} />
                      <span>{tLabel}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 18-Avatar Grid Selection */}
          <div className="specimen-selector-section">
            <div className="section-label-line">
              <span className="section-label-text">เลือกสัตว์ประจำตัว (18 ชนิด):</span>
            </div>

            <div className="collector-stamp-grid">
              {ANIMAL_AVATARS.map((av) => {
                const isSelected = selectedAvatarId === av.id;
                return (
                  <button
                    key={av.id}
                    type="button"
                    className={`collector-stamp-cell ${isSelected ? 'active-stamp' : ''}`}
                    onClick={() => handleSelectAvatar(av.id)}
                    title={av.name}
                  >
                    <AnimalAvatar id={av.id} size={34} showArt={true} />
                    {isSelected && <span className="active-seal-dot" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Player Name Input */}
          <div className="researcher-signature-group">
            <label className="signature-field-label">
              <span>ชื่อผู้เล่นของคุณ:</span>
            </label>
            <div className="signature-input-wrap">
              <div className="signature-avatar-seal">
                <AnimalAvatar id={curAnimalData.id} size={24} showArt={true} />
              </div>
              <input
                className={`signature-text-input${nameError ? ' input-error' : ''}`}
                type="text"
                placeholder="พิมพ์ชื่อของคุณ..."
                maxLength={16}
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  if (nameError) setNameError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              />
            </div>
            {nameError && <div className="folio-error-alert">{nameError}</div>}
          </div>
        </div>

        {/* ─── RIGHT: Game Modes & Room Controls ─── */}
        <div className="folio-expedition-column">
          <div className="folio-section-header">
            <span className="folio-section-title">เลือกโหมดการเล่น</span>
            <span className="folio-catalog-id">GAME MODE</span>
          </div>

          {/* Mode Selector Cards */}
          <div className="expedition-missions-stack">
            {MODES.map((m) => {
              const isActive = mode === m.key;
              return (
                <div
                  key={m.key}
                  className={`expedition-mission-card ${isActive ? 'mission-active' : ''}`}
                  onClick={() => {
                    playSfx('select');
                    setMode(m.key);
                  }}
                >
                  <div className="mission-brass-compass">
                    <UIIcon name={m.iconName} size={20} color={isActive ? '#1b4d18' : '#64748b'} />
                  </div>

                  <div className="mission-content-column">
                    <div className="mission-title-row">
                      <span className="mission-primary-name">{m.title}</span>
                      <span className="mission-classification-badge">{m.tag}</span>
                    </div>
                    <p className="mission-synopsis">{m.desc}</p>
                  </div>

                  <div className="mission-stamp-marker">
                    {isActive ? <span className="stamp-verified-check">✓</span> : <span className="stamp-open-ring" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Configuration Panel */}
          <div className="expedition-parameters-panel">
            {mode === 'multiplayer' && (
              <div className="param-config-row">
                <div className="param-label-group">
                  <span className="param-main-label">จำนวนผู้เล่นสูงสุด:</span>
                  <span className="param-sub-desc">รองรับ 2 ถึง 10 คน</span>
                </div>
                <div className="researcher-stepper-box">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => {
                      playSfx('pop');
                      setMaxPlayers((prev) => Math.max(2, prev - 1));
                    }}
                    disabled={maxPlayers <= 2}
                  >
                    -
                  </button>
                  <span className="stepper-value-display">
                    <strong>{maxPlayers}</strong> <small>คน</small>
                  </span>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => {
                      playSfx('pop');
                      setMaxPlayers((prev) => Math.min(10, prev + 1));
                    }}
                    disabled={maxPlayers >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {mode === 'vs_bot' && (
              <div className="param-config-row">
                <div className="param-label-group">
                  <span className="param-main-label">ระดับความฉลาด AI:</span>
                  <span className="param-sub-desc">ปรับระดับความท้าทาย</span>
                </div>
                <div className="ai-difficulty-strip">
                  {[
                    { key: 'easy', label: 'ง่าย', icon: '🟢' },
                    { key: 'medium', label: 'ปานกลาง', icon: '🟡' },
                    { key: 'hard', label: 'ยากมาก', icon: '🔴' },
                  ].map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      className={`difficulty-pill-btn ${botDifficulty === d.key ? 'active-diff' : ''}`}
                      onClick={() => {
                        playSfx('click');
                        setBotDifficulty(d.key);
                      }}
                    >
                      <span>{d.icon}</span>
                      <span>{d.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === 'time_attack' && (
              <div className="param-config-row">
                <div className="param-label-group">
                  <span className="param-main-label">เวลาที่กำหนด:</span>
                  <span className="param-sub-desc">ทำแต้มให้ได้มากที่สุด</span>
                </div>
                <div className="time-options-strip">
                  {TIME_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`time-pill-btn ${timeLimit === t ? 'active-time' : ''}`}
                      onClick={() => {
                        playSfx('click');
                        setTimeLimit(t);
                      }}
                    >
                      {t} วิ
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Dispatch Button */}
          <button
            type="button"
            className="expedition-dispatch-button"
            onClick={handleCreate}
          >
            <span className="dispatch-icon">⚔️</span>
            <span className="dispatch-text">สร้างห้องประลองทันที</span>
          </button>

          {/* Join Room Code Section */}
          <div className="join-expedition-section">
            <div className="join-divider-line">
              <span>หรือเข้าร่วมด้วยรหัสห้อง</span>
            </div>

            <div className="join-input-group">
              <input
                className={`join-code-input${codeError ? ' input-error' : ''}`}
                type="text"
                placeholder="ใส่รหัสห้อง 6 หลัก..."
                maxLength={6}
                value={roomCode}
                onChange={(e) => {
                  setRoomCode(e.target.value.toUpperCase());
                  if (codeError) setCodeError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
              />
              <button
                type="button"
                className="join-action-btn"
                onClick={handleJoin}
              >
                เข้าร่วม
              </button>
            </div>
            {codeError && <div className="folio-error-alert">{codeError}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
