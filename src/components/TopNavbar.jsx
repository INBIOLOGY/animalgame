import React, { useState } from 'react';
import { toggleBgm, playSfx } from '../utils/audio';
import { UIIcon, GameLogoMark } from '../assets/natureIcons';

export default function TopNavbar({ isOnline, showDeckCounter, deckCount, totalDeck = 12, onOpenDex }) {
  const [bgmActive, setBgmActive] = useState(false);

  const handleBgmToggle = () => {
    const newState = toggleBgm(!bgmActive);
    setBgmActive(newState);
    playSfx('select');
  };

  return (
    <header className="topbar">
      <div className="brand-logo" onClick={() => window.location.reload()} title="รีเฟรชหน้าเว็บ">
        <GameLogoMark size={30} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontWeight: 800, fontSize: '15px', color: 'var(--forest-primary)' }}>สัตว์น่ารู้</span>
          <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--forest-accent)', letterSpacing: '0.8px' }}>WILDLIFE TCG</span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Dex Encyclopedia Button */}
        <button
          className="btn btn-dark btn-sm"
          onClick={() => {
            playSfx('pop');
            onOpenDex();
          }}
          title="เปิดสมุดภาพสารานุกรมสัตว์ (Field Guide)"
        >
          <UIIcon name="book" size={15} color="var(--forest-primary)" />
          <span>สารานุกรมสัตว์</span>
        </button>

        {/* BGM Toggle */}
        <button
          className={`btn btn-sm ${bgmActive ? 'btn-green' : 'btn-dark'}`}
          onClick={handleBgmToggle}
          title="เปิด/ปิด เสียงเพลงประกอบ"
        >
          <UIIcon
            name={bgmActive ? 'music_on' : 'music_off'}
            size={15}
            color={bgmActive ? '#ffffff' : 'var(--forest-primary)'}
          />
          <span>{bgmActive ? 'เพลง: เปิด' : 'เพลง: ปิด'}</span>
        </button>

        {showDeckCounter && (
          <span className="conn-pill" style={{ background: 'var(--bg-matcha-soft)', borderColor: 'var(--card-border-green)' }}>
            <UIIcon name="trophy" size={14} color="var(--forest-primary)" />
            <span>เหลือ <strong style={{ color: 'var(--forest-primary)', fontFamily: 'var(--font-num)' }}>{deckCount}/{totalDeck}</strong> หมวด</span>
          </span>
        )}

        <div className="conn-pill">
          <span className={`conn-dot ${isOnline ? 'online' : ''}`} />
          <span>{isOnline ? 'ออนไลน์' : 'กำลังเชื่อมต่อ...'}</span>
        </div>
      </div>
    </header>
  );
}
