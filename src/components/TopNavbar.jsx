import React, { useState } from 'react';
import { toggleBgm, playSfx } from '../utils/audio';
import { UIIcon } from '../assets/natureIcons';
import { TCG_GAME_LOGO } from '../assets/artAssets';

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
        <div className="brand-logo-img-wrap">
          <img src={TCG_GAME_LOGO} alt="Wildlife TCG Logo" className="brand-logo-img" />
        </div>
        <div className="brand-title-wrap">
          <span className="brand-title-main">สัตว์น่ารู้</span>
          <span className="brand-title-sub">WILDLIFE TCG</span>
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
          <UIIcon name="book" size={15} color="var(--warm-gold)" />
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
            color={bgmActive ? '#ffffff' : 'var(--warm-gold)'}
          />
          <span>{bgmActive ? 'เพลง: เปิด' : 'เพลง: ปิด'}</span>
        </button>

        {showDeckCounter && (
          <span className="conn-pill" style={{ background: 'rgba(254, 243, 199, 0.15)', borderColor: 'rgba(212, 154, 38, 0.4)' }}>
            <UIIcon name="trophy" size={14} color="var(--warm-gold)" />
            <span>เหลือ <strong style={{ color: 'var(--warm-gold)', fontFamily: 'var(--font-num)' }}>{deckCount}/{totalDeck}</strong> หมวด</span>
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
