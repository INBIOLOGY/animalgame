import React, { useState, useRef, useEffect } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [menuOpen]);

  const navButtons = (
    <>
      {/* Tutorial Button */}
      <button
        type="button"
        className="cute-nav-btn cute-nav-tutorial-btn"
        onClick={() => {
          if (sfxActive) playSfx('pop');
          onOpenTutorial();
          setMenuOpen(false);
        }}
        title="ดูวิธีเล่นและโหมดสอนเล่น"
      >
        <span>🎓 วิธีเล่น</span>
      </button>

      {/* Drop Hint Toggle */}
      <button
        type="button"
        className={`cute-nav-btn ${showDropHints ? 'hint-on' : 'hint-off'}`}
        onClick={() => {
          if (sfxActive) playSfx('select');
          onToggleDropHints();
          setMenuOpen(false);
        }}
        title={showDropHints ? 'ตัวช่วยบอกช่องวาง: เปิดอยู่' : 'ตัวช่วยบอกช่องวาง: ปิดอยู่'}
      >
        <span>{showDropHints ? '💡 ตัวช่วย: เปิด' : '🔒 ตัวช่วย: ปิด'}</span>
      </button>

      {/* Dex Encyclopedia */}
      <button
        type="button"
        className="cute-nav-btn"
        onClick={() => {
          if (sfxActive) playSfx('pop');
          onOpenDex();
          setMenuOpen(false);
        }}
        title="เปิดสมุดภาพสารานุกรมสัตว์"
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
        title="เปิด/ปิด เสียงเอฟเฟกต์"
      >
        <span>{sfxActive ? '🔊 เอฟเฟกต์' : '🔇 ปิดเสียง'}</span>
      </button>

      {showDeckCounter && (
        <span className="cute-deck-pill">
          <UIIcon name="trophy" size={13} color="var(--warm-gold-dark)" />
          <span>เหลือ <strong>{deckCount}/{totalDeck}</strong> หมวด</span>
        </span>
      )}
    </>
  );

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

      {/* Desktop: show all buttons inline */}
      <div className="cute-topbar-right topbar-desktop-only">
        {navButtons}
        <div className="cute-conn-pill">
          <span className={`cute-conn-dot ${isOnline ? 'online' : ''}`} />
          <span>{isOnline ? 'ออนไลน์' : 'เชื่อมต่อ...'}</span>
        </div>
      </div>

      {/* Mobile: hamburger icon + popup menu */}
      <div className="topbar-mobile-only" ref={menuRef}>
        {/* Online dot always visible */}
        <div className="cute-conn-pill mobile-conn">
          <span className={`cute-conn-dot ${isOnline ? 'online' : ''}`} />
        </div>

        {showDeckCounter && (
          <span className="cute-deck-pill mobile-deck">
            <UIIcon name="trophy" size={12} color="var(--warm-gold-dark)" />
            <span><strong>{deckCount}/{totalDeck}</strong></span>
          </span>
        )}

        <button
          type="button"
          className={`topbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="เมนูเพิ่มเติม"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Popup dropdown */}
        {menuOpen && (
          <div className="topbar-popup-menu">
            <div className="topbar-popup-inner">
              {navButtons}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
