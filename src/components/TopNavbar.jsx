import React, { useState } from 'react';
import { toggleBgm, playSfx } from '../utils/audio';
import { UIIcon, GameLogoMark } from '../assets/natureIcons';

export default function TopNavbar({
  isOnline,
  showDeckCounter,
  deckCount,
  totalDeck = 12,
  showDropHints = true,
  onToggleDropHints,
  onOpenDex,
  onOpenTutorial,
}) {
  const [bgmActive, setBgmActive] = useState(false);
  const [sfxActive, setSfxActive] = useState(() => {
    return localStorage.getItem('animalgame_sfx_muted') !== 'true';
  });

  const handleBgmToggle = () => {
    const newState = toggleBgm(!bgmActive);
    setBgmActive(newState);
    if (sfxActive) playSfx('select');
  };

  const handleSfxToggle = () => {
    const nextState = !sfxActive;
    setSfxActive(nextState);
    localStorage.setItem('animalgame_sfx_muted', nextState ? 'false' : 'true');
    if (nextState) playSfx('pop');
  };

  return (
    <header className="cute-topbar">
      <div className="cute-brand-logo" onClick={() => window.location.reload()} title="รีเฟรชหน้าเว็บ">
        <GameLogoMark size={32} />
        <div className="brand-title-wrap">
          <div className="brand-title-row">
            <span className="cute-brand-name">สัตว์น่ารู้</span>
            <span className="cute-brand-tag">TCG</span>
          </div>
          <span className="cute-brand-sub">ANIMAL CARD GAME</span>
        </div>
      </div>

      <div className="cute-topbar-right">
        {/* Tutorial Button */}
        <button
          type="button"
          className="cute-nav-btn cute-nav-tutorial-btn"
          onClick={() => {
            if (sfxActive) playSfx('pop');
            onOpenTutorial();
          }}
          title="ดูวิธีเล่นและโหมดสอนเล่น (Interactive Tutorial)"
        >
          <span>🎓 วิธีเล่น</span>
        </button>

        {/* Drop Hint Toggle Button (เปิด/ปิด ตัวช่วยวางการ์ด) */}
        <button
          type="button"
          className={`cute-nav-btn ${showDropHints ? 'hint-on' : 'hint-off'}`}
          onClick={() => {
            if (sfxActive) playSfx('select');
            onToggleDropHints();
          }}
          title={showDropHints ? 'ตัวช่วยบอกช่องวาง: เปิดอยู่ (คลิกเพื่อปิด)' : 'ตัวช่วยบอกช่องวาง: ปิดอยู่ (คลิกเพื่อเปิด)'}
        >
          <span>{showDropHints ? '💡 ตัวช่วย: เปิด' : '🔒 ตัวช่วย: ปิด'}</span>
        </button>

        {/* Dex Encyclopedia Button */}
        <button
          type="button"
          className="cute-nav-btn"
          onClick={() => {
            if (sfxActive) playSfx('pop');
            onOpenDex();
          }}
          title="เปิดสมุดภาพสารานุกรมสัตว์ (Field Guide)"
        >
          <UIIcon name="book" size={14} color="var(--forest-primary)" />
          <span>สารานุกรม</span>
        </button>

        {/* BGM Toggle */}
        <button
          type="button"
          className={`cute-nav-btn ${bgmActive ? 'active-bgm' : ''}`}
          onClick={handleBgmToggle}
          title="เปิด/ปิด เสียงเพลงประกอบ"
        >
          <UIIcon
            name={bgmActive ? 'music_on' : 'music_off'}
            size={13}
            color={bgmActive ? '#ffffff' : 'var(--forest-primary)'}
          />
          <span>{bgmActive ? 'เพลง: เปิด' : 'เพลง: ปิด'}</span>
        </button>

        {/* SFX Toggle */}
        <button
          type="button"
          className={`cute-nav-btn ${!sfxActive ? 'muted-sfx' : ''}`}
          onClick={handleSfxToggle}
          title="เปิด/ปิด เสียงเอฟเฟกต์ (SFX)"
        >
          <span>{sfxActive ? '🔊 เอฟเฟกต์' : '🔇 ปิดเสียง'}</span>
        </button>

        {showDeckCounter && (
          <span className="cute-deck-pill">
            <UIIcon name="trophy" size={13} color="var(--warm-gold-dark)" />
            <span>เหลือ <strong>{deckCount}/{totalDeck}</strong> หมวด</span>
          </span>
        )}

        <div className="cute-conn-pill">
          <span className={`cute-conn-dot ${isOnline ? 'online' : ''}`} />
          <span>{isOnline ? 'ออนไลน์' : 'เชื่อมต่อ...'}</span>
        </div>
      </div>
    </header>
  );
}
