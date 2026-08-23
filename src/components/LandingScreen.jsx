import React, { useState } from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { TraitIcon, UIIcon } from '../assets/natureIcons';
import { ALL_ANIMALS_DATA, TRAIT_MAP, TRAIT_COLORS } from '../utils/traits';
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
    title: 'เล่นกับเพื่อน',
    desc: 'สร้างห้องประลองออนไลน์ 2-4 คน ชวนเพื่อนมาร่วมโต๊ะ',
    tag: 'ออนไลน์',
  },
  {
    key: 'vs_bot',
    iconName: 'bot',
    title: 'แข่งกับบอท AI',
    desc: 'ฝึกซ้อมคนเดียว ประลองปัญญากับบอทจำลอง 3 ตัว',
    tag: 'เล่นเดี่ยว',
  },
  {
    key: 'time_attack',
    iconName: 'timer',
    title: 'สปีดรันจับเวลา',
    desc: 'ท้าทายความเร็ว ทำคะแนนสูงสุดก่อนหมดเวลา',
    tag: 'จับเวลา',
  },
];

const TIME_OPTIONS = [30, 60, 90, 120];

export default function LandingScreen({ onCreateRoom, onJoinRoom }) {
  const [selectedAvatarId, setSelectedAvatarId] = useState('lion');
  const [playerName, setPlayerName] = useState('');
  const [mode, setMode] = useState('multiplayer');
  const [timeLimit, setTimeLimit] = useState(60);
  const [roomCode, setRoomCode] = useState('');
  const [mascotBounce, setMascotBounce] = useState(false);
  const [nameError, setNameError] = useState('');
  const [codeError, setCodeError] = useState('');

  const curAnimalData = ALL_ANIMALS_DATA.find((a) => a.id === selectedAvatarId) || ALL_ANIMALS_DATA[0];
  const curAvatarMeta = ANIMAL_AVATARS.find((a) => a.id === selectedAvatarId) || ANIMAL_AVATARS[0];

  // Extract Latin binomial name from englishName
  const latinNameMatch = curAnimalData.englishName?.match(/\((.*?)\)/);
  const latinName = latinNameMatch ? latinNameMatch[1] : curAnimalData.englishName;

  const getFullPlayerName = () => {
    const raw = playerName.trim();
    if (!raw) return '';
    return raw;
  };

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
        particleCount: 40,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#285422', '#487a39', '#bfd575', '#d49a26', '#ffffff']
      });
    } catch (e) {}
    onCreateRoom(getFullPlayerName(), selectedAvatarId, mode, timeLimit);
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
    onJoinRoom(getFullPlayerName(), selectedAvatarId, code);
  };

  const handleSelectAvatar = (id) => {
    playSfx('pop');
    setSelectedAvatarId(id);
    setMascotBounce(true);
    setTimeout(() => setMascotBounce(false), 400);
  };

  return (
    <section className="landing-container">
      {/* Tabletop Playmat Canvas */}
      <div className="game-art-backdrop" aria-hidden="true" />
      <div className="game-art-overlay" aria-hidden="true" />

      {/* Main Naturalist Folio Card */}
      <div className="naturalist-folio-portal">
        {/* ─── LEFT: Signature Biological Specimen Card & Selector ─── */}
        <div className="folio-specimen-column">
          <div className="folio-section-header">
            <span className="folio-section-title">บัตรตัวอย่างสายพันธุ์ประจำตัว</span>
            <span className="folio-catalog-id">CATALOG #{curAvatarMeta.num}</span>
          </div>

          {/* 🌟 SIGNATURE ELEMENT: Naturalist Museum Specimen Card */}
          <div
            className={`museum-specimen-card ${mascotBounce ? 'card-bounce' : ''}`}
            onClick={() => handleSelectAvatar(selectedAvatarId)}
          >
            {/* Card Specimen Artwork Frame */}
            <div className="specimen-frame-box">
              <AnimalAvatar id={curAnimalData.id} size={64} />
              <div className="specimen-rarity-seal">{curAnimalData.rarity?.toUpperCase()}</div>
            </div>

            {/* Specimen Taxonomy Meta */}
            <div className="specimen-meta-box">
              <div className="specimen-title-row">
                <span className="specimen-thai-name">{curAnimalData.name}</span>
                <span className="specimen-latin-name">{latinName}</span>
              </div>
              <div className="specimen-habitat-text">{curAnimalData.habitat}</div>

              {/* Systematic Trait Index Badges */}
              <div className="specimen-trait-tags">
                {curAnimalData.traits.slice(0, 3).map((t) => {
                  const colors = TRAIT_COLORS[t] || { bg: '#252F28', text: '#EDE8DC', border: '#3D4B40', iconName: 'backbone' };
                  return (
                    <span
                      key={t}
                      className="taxon-trait-badge"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <TraitIcon name={colors.iconName} size={11} color={colors.text} />
                      <span>{TRAIT_MAP[t]?.replace(/^[^a-zA-Z0-9\u0E00-\u0E7F]+\s*/, '')}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 18 Specimen Selector Stamps */}
          <div className="selector-label-row">
            <span>เลือกสัตว์คู่หูของคุณ:</span>
            <span className="selector-count-badge">18 สายพันธุ์</span>
          </div>

          <div className="specimen-stamp-grid">
            {ANIMAL_AVATARS.map((av) => {
              const isSelected = selectedAvatarId === av.id;
              return (
                <button
                  key={av.id}
                  type="button"
                  className={`specimen-stamp-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectAvatar(av.id)}
                  title={av.name}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                >
                  <AnimalAvatar id={av.id} size={30} />
                </button>
              );
            })}
          </div>

          {/* Explorer Nickname Input */}
          <div className="explorer-name-wrap">
            <div className="explorer-avatar-badge" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AnimalAvatar id={curAnimalData.id} size={28} />
            </div>
            <input
              className={`explorer-name-input${nameError ? ' input-error' : ''}`}
              type="text"
              placeholder="พิมพ์ชื่อนักสำรวจของคุณ..."
              maxLength={16}
              value={playerName}
              onChange={(e) => { setPlayerName(e.target.value); if (nameError) setNameError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            {nameError && <div className="input-error-msg">{nameError}</div>}
          </div>
        </div>

        {/* ─── RIGHT: Expedition Modes & Arena Entry ─── */}
        <div className="folio-expedition-column">
          <div className="folio-section-header">
            <span className="folio-section-title">เลือกรูปแบบการประลอง</span>
          </div>

          {/* 3 Expedition Mode Cards (No Emojis, Line-art Icons) */}
          <div className="expedition-modes-list">
            {MODES.map((m) => {
              const isActive = mode === m.key;
              return (
                <div
                  key={m.key}
                  className={`expedition-mode-card ${isActive ? 'selected' : ''}`}
                  onClick={() => {
                    playSfx('select');
                    setMode(m.key);
                  }}
                >
                  <div className="mode-icon-frame">
                    <UIIcon name={m.iconName} size={20} color="var(--forest-primary)" />
                  </div>
                  <div className="mode-text-content">
                    <div className="mode-header-line">
                      <span className="mode-main-title">{m.title}</span>
                      <span className="mode-tag-pill">{m.tag}</span>
                    </div>
                    <div className="mode-desc-text">{m.desc}</div>
                  </div>
                  <div className="mode-select-indicator">
                    {isActive && <div className="indicator-dot" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Speedrun Duration Selector */}
          {mode === 'time_attack' && (
            <div className="time-select-strip">
              <span className="time-strip-label">
                <UIIcon name="timer" size={14} color="var(--terracotta)" />
                <span>จำกัดเวลา:</span>
              </span>
              <div className="time-pill-group">
                {TIME_OPTIONS.map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    className={`time-select-pill ${timeLimit === sec ? 'active' : ''}`}
                    onClick={() => {
                      playSfx('select');
                      setTimeLimit(sec);
                    }}
                  >
                    {sec} วินาที
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Solid 3D Action Button (Light from above, no emoji padding) */}
          <button className="btn-enter-arena" onClick={handleCreate}>
            <UIIcon name="trophy" size={16} color="#ffffff" />
            <span>{mode === 'multiplayer' ? 'สร้างห้องประลองการ์ด' : 'เริ่มเล่นทันที'}</span>
          </button>

          {/* Join Room Box */}
          {mode !== 'time_attack' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div className="join-expedition-box">
                <input
                  className={`join-expedition-input${codeError ? ' input-error' : ''}`}
                  type="text"
                  placeholder="รหัสห้อง 6 หลัก"
                  maxLength={6}
                  value={roomCode}
                  onChange={(e) => { setRoomCode(e.target.value.toUpperCase()); if (codeError) setCodeError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                />
                <button className="btn-join-expedition" onClick={handleJoin}>
                  <UIIcon name="exit" size={14} color="var(--forest-primary)" />
                  <span>เข้าห้อง</span>
                </button>
              </div>
              {codeError && <div className="input-error-msg">{codeError}</div>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
