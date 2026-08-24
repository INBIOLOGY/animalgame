import React, { useState } from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { TraitIcon, UIIcon } from '../assets/natureIcons';
import { ALL_ANIMALS_DATA, TRAIT_MAP, TRAIT_COLORS } from '../utils/traits';
import { CUTE_ARENA_BACKDROP } from '../assets/artAssets';
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
    title: 'เล่นกับเพื่อน (2-10 คน)',
    desc: 'สร้างห้องเล่นออนไลน์ ชวนเพื่อนๆ มาร่วมโต๊ะการ์ดสุดน่ารัก',
    tag: 'หลายคน',
    pillBg: '#EAF5E3',
    pillColor: '#2D6A28',
  },
  {
    key: 'vs_bot',
    iconName: 'bot',
    title: 'เล่นกับบอท AI',
    desc: 'ฝึกซ้อมคนเดียวกับบอทสุดฉลาด 3 ระดับความยาก',
    tag: 'เล่นเดี่ยว',
    pillBg: '#FEF3C7',
    pillColor: '#92400E',
  },
  {
    key: 'time_attack',
    iconName: 'timer',
    title: 'สปีดรันจับเวลา',
    desc: 'ท้าทายความเร็ว จัดหมวดหมู่สัตว์ให้เร็วที่สุดก่อนหมดเวลา',
    tag: 'จับเวลา',
    pillBg: '#FFE4E6',
    pillColor: '#BE123C',
  },
];

const TIME_OPTIONS = [30, 60, 90, 120];

export default function LandingScreen({ onCreateRoom, onJoinRoom, onOpenTutorial }) {
  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'join' (Mobile & Desktop Tab switcher)
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

  // Deduplicate traits
  const distinctTraits = Array.from(
    new Set((curAnimalData.traits || []).map((t) => TRAIT_MAP[t] || t))
  ).slice(0, 3);

  const handleCreate = () => {
    const raw = playerName.trim();
    if (!raw) {
      playSfx('discard');
      setNameError('กรุณาพิมพ์ชื่อของคุณก่อนนะ');
      return;
    }
    setNameError('');
    setCodeError('');
    playSfx('fanfare');
    try {
      confetti({
        particleCount: 45,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#A8C686', '#FDE68A', '#FED7AA', '#93C5FD', '#FFFFFF'],
      });
    } catch (e) {}
    onCreateRoom(raw, selectedAvatarId, mode, timeLimit, maxPlayers, botDifficulty);
  };

  const handleJoin = () => {
    const raw = playerName.trim();
    const code = roomCode.trim();
    if (!raw) {
      playSfx('discard');
      setNameError('กรุณาพิมพ์ชื่อของคุณก่อนนะ');
      return;
    }
    if (!code || code.length !== 6) {
      playSfx('discard');
      setCodeError('กรุณากรอกรหัสห้อง 6 หลัก');
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
    <section className="cute-landing-section page-screen-anim">
      {/* 🌸 Cute Animal Crossing Meadow Backdrop */}
      <div
        className="cute-meadow-backdrop"
        style={{ backgroundImage: `url(${CUTE_ARENA_BACKDROP})` }}
        aria-hidden="true"
      />
      <div className="cute-meadow-overlay" aria-hidden="true" />

      {/* 📱 Mobile Mode Switcher Tabs (สร้างห้อง vs เข้าร่วมห้อง) */}
      <div className="mobile-main-tab-bar">
        <button
          type="button"
          className={`mobile-tab-btn ${activeTab === 'create' ? 'active-tab' : ''}`}
          onClick={() => {
            playSfx('pop');
            setActiveTab('create');
          }}
        >
          <span>✨ สร้างห้องเล่น</span>
        </button>
        <button
          type="button"
          className={`mobile-tab-btn ${activeTab === 'join' ? 'active-tab' : ''}`}
          onClick={() => {
            playSfx('pop');
            setActiveTab('join');
          }}
        >
          <span>🔑 ใส่รหัสเข้าห้อง</span>
        </button>
      </div>

      {/* 🍡 Cozy Minimalist Container */}
      <div className={`cute-lobby-card view-tab-${activeTab}`}>
        {/* ─── LEFT: Cute Character Card & Avatar Picker ─── */}
        <div className="cute-lobby-column left-column">
          <div className="cute-column-header">
            <span className="cute-column-title">🐾 สัตว์ประจำตัวของคุณ</span>
            <span className="cute-badge-tag">NO. {curAvatarMeta.num}</span>
          </div>

          {/* 🌟 Cute Mascot Card */}
          <div
            className={`cute-mascot-card ${mascotBounce ? 'card-bounce' : ''}`}
            onClick={() => handleSelectAvatar(selectedAvatarId)}
          >
            <div className="cute-mascot-avatar-wrap">
              <AnimalAvatar id={curAnimalData.id} size={64} />
            </div>

            <div className="cute-mascot-info">
              <div className="cute-mascot-name-line">
                <h2 className="cute-mascot-name">{curAnimalData.name}</h2>
                <span className="cute-mascot-eng">({curAnimalData.englishName})</span>
              </div>
              <div className="cute-mascot-habitat">📍 {curAnimalData.habitat}</div>

              {/* Deduplicated Trait Badges */}
              <div className="cute-traits-list">
                {distinctTraits.map((tLabel, idx) => {
                  const originalKey = curAnimalData.traits.find((k) => (TRAIT_MAP[k] || k) === tLabel) || 'backbone';
                  const colors = TRAIT_COLORS[originalKey] || { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7', iconName: 'backbone' };
                  return (
                    <span
                      key={idx}
                      className="cute-trait-tag"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        borderColor: colors.border,
                      }}
                    >
                      <TraitIcon name={colors.iconName} size={11} color={colors.text} />
                      <span>{tLabel}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 18-Animal Cute Avatar Picker Grid */}
          <div className="cute-avatar-picker-section">
            <div className="cute-picker-header">
              <span className="cute-picker-label">เลือกสัตว์ประจำตัว (18 ชนิด):</span>
            </div>

            <div className="cute-avatar-grid">
              {ANIMAL_AVATARS.map((av) => {
                const isSelected = selectedAvatarId === av.id;
                return (
                  <button
                    key={av.id}
                    type="button"
                    className={`cute-avatar-btn ${isSelected ? 'active-avatar' : ''}`}
                    onClick={() => handleSelectAvatar(av.id)}
                    title={av.name}
                  >
                    <AnimalAvatar id={av.id} size={28} />
                    {isSelected && <span className="cute-active-dot" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Player Name Input */}
          <div className="cute-name-input-group">
            <label className="cute-input-label">ชื่อผู้เล่น:</label>
            <div className="cute-input-box">
              <div className="cute-input-avatar">
                <AnimalAvatar id={curAnimalData.id} size={22} />
              </div>
              <input
                className={`cute-text-input${nameError ? ' input-error' : ''}`}
                type="text"
                placeholder="พิมพ์ชื่อของคุณตรงนี้..."
                maxLength={16}
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  if (nameError) setNameError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (activeTab === 'join') handleJoin();
                    else handleCreate();
                  }
                }}
              />
            </div>
            {nameError && <div className="cute-error-text">{nameError}</div>}
          </div>

          {/* 📱 Mobile Instant Join Box (เมื่อกดแท็บ 'ใส่รหัสเข้าห้อง') */}
          <div className="mobile-join-panel">
            <div className="mobile-join-header">
              <span className="mobile-join-title">🔑 กรอกรหัสห้อง 6 หลักเพื่อเข้าร่วม</span>
            </div>
            <div className="cute-join-inputs">
              <input
                className={`cute-code-input${codeError ? ' input-error' : ''}`}
                type="text"
                placeholder="รหัส 6 หลัก (เช่น 123456)"
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
                className="cute-btn-join"
                onClick={handleJoin}
              >
                🚀 เข้าร่วม
              </button>
            </div>
            {codeError && <div className="cute-error-text">{codeError}</div>}
          </div>
        </div>

        {/* ─── RIGHT: Minimal Game Modes & Controls ─── */}
        <div className="cute-lobby-column right-column">
          <div className="cute-column-header">
            <span className="cute-column-title">🎮 เลือกโหมดการเล่น</span>
            <button
              type="button"
              className="cute-tutorial-pill-btn"
              onClick={() => {
                playSfx('pop');
                if (onOpenTutorial) onOpenTutorial();
              }}
              title="เปิดโหมดสอนเล่น (Interactive Tutorial)"
            >
              🎓 วิธีเล่น
            </button>
          </div>

          {/* Mode Options List */}
          <div className="cute-modes-list">
            {MODES.map((m) => {
              const isActive = mode === m.key;
              return (
                <div
                  key={m.key}
                  className={`cute-mode-card ${isActive ? 'active-mode' : ''}`}
                  onClick={() => {
                    playSfx('select');
                    setMode(m.key);
                  }}
                >
                  <div className="cute-mode-icon-box">
                    <UIIcon name={m.iconName} size={18} color={isActive ? '#2D6A28' : '#64748B'} />
                  </div>

                  <div className="cute-mode-info">
                    <div className="cute-mode-top">
                      <span className="cute-mode-title">{m.title}</span>
                      <span
                        className="cute-mode-tag"
                        style={{ background: m.pillBg, color: m.pillColor }}
                      >
                        {m.tag}
                      </span>
                    </div>
                    <p className="cute-mode-desc">{m.desc}</p>
                  </div>

                  <div className="cute-mode-check">
                    {isActive ? <span className="cute-check-mark">✓</span> : <span className="cute-check-circle" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mode Configuration Parameters */}
          <div className="cute-params-panel">
            {mode === 'multiplayer' && (
              <div className="cute-param-row">
                <div className="cute-param-label-group">
                  <span className="cute-param-title">จำนวนผู้เล่นสูงสุด:</span>
                  <span className="cute-param-sub">รองรับ 2 - 10 คน</span>
                </div>
                <div className="cute-stepper-box">
                  <button
                    type="button"
                    className="cute-step-btn"
                    onClick={() => {
                      playSfx('pop');
                      setMaxPlayers((prev) => Math.max(2, prev - 1));
                    }}
                    disabled={maxPlayers <= 2}
                  >
                    -
                  </button>
                  <span className="cute-step-val">
                    <strong>{maxPlayers}</strong> <small>คน</small>
                  </span>
                  <button
                    type="button"
                    className="cute-step-btn"
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
              <div className="cute-param-row">
                <div className="cute-param-label-group">
                  <span className="cute-param-title">ระดับความยาก AI:</span>
                  <span className="cute-param-sub">ปรับความเก่งของบอท</span>
                </div>
                <div className="cute-diff-strip">
                  {[
                    { key: 'easy', label: 'ง่าย', icon: '🟢' },
                    { key: 'medium', label: 'ปานกลาง', icon: '🟡' },
                    { key: 'hard', label: 'ยาก', icon: '🔴' },
                  ].map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      className={`cute-pill-btn ${botDifficulty === d.key ? 'active-pill' : ''}`}
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
              <div className="cute-param-row">
                <div className="cute-param-label-group">
                  <span className="cute-param-title">เวลาที่กำหนด:</span>
                  <span className="cute-param-sub">ทำคะแนนก่อนหมดเวลา</span>
                </div>
                <div className="cute-time-strip">
                  {TIME_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`cute-pill-btn ${timeLimit === t ? 'active-pill' : ''}`}
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

          {/* Big Bouncy Create Room Button */}
          <button
            type="button"
            className="cute-btn-create-room"
            onClick={handleCreate}
          >
            <span>✨ สร้างห้องเล่นเกม</span>
          </button>

          {/* Join with Code (Desktop View) */}
          <div className="cute-join-section desktop-join-section">
            <div className="cute-join-divider">
              <span>หรือใส่รหัสห้องเพื่อเข้าร่วม</span>
            </div>

            <div className="cute-join-inputs">
              <input
                className={`cute-code-input${codeError ? ' input-error' : ''}`}
                type="text"
                placeholder="รหัสห้อง 6 หลัก..."
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
                className="cute-btn-join"
                onClick={handleJoin}
              >
                เข้าร่วม
              </button>
            </div>
            {codeError && <div className="cute-error-text">{codeError}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
