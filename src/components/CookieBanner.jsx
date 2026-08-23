import React, { useState, useEffect } from 'react';
import { AnimalSVG } from '../assets/animalIllustrations';
import { playSfx } from '../utils/audio';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('wildlife_tcg_cookie_consent');
      if (!consent) {
        // Small timeout so it slides up gently after page load
        const t = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(t);
      }
    } catch (e) {}
  }, []);

  const handleAcceptAll = () => {
    playSfx('sparkle');
    try {
      localStorage.setItem('wildlife_tcg_cookie_consent', 'all');
    } catch (e) {}
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    playSfx('select');
    try {
      localStorage.setItem('wildlife_tcg_cookie_consent', 'essential');
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent-bar" role="dialog" aria-label="แถบแจ้งเตือนคุกกี้">
      <div className="cookie-consent-inner">
        <div className="cookie-mascot-wrap">
          <div className="cookie-lion-badge">
            <AnimalSVG id="lion" size={32} />
          </div>
        </div>

        <div className="cookie-text-area">
          <div className="cookie-title">นโยบายคุกกี้และความเป็นส่วนตัว</div>
          <p className="cookie-desc">
            เราใช้คุกกี้ที่จำเป็นเพื่อให้เว็บไซต์ทำงาน และคุกกี้เพื่อการวิเคราะห์สถิติ (เมื่อท่านยินยอม) เพื่อปรับปรุงบริการ อ่านเพิ่มเติมที่{' '}
            <span className="cookie-link" onClick={() => alert('เว็บไซต์นี้ใช้คุกกี้เพื่อบันทึกการตั้งค่าห้องเกมและสถิติคะแนนการเล่นเท่านั้น')}>
              นโยบายคุกกี้
            </span>
          </p>
        </div>

        <div className="cookie-actions">
          <button
            type="button"
            className="cookie-btn-secondary"
            onClick={handleEssentialOnly}
          >
            เฉพาะที่จำเป็น
          </button>
          <button
            type="button"
            className="cookie-btn-primary"
            onClick={handleAcceptAll}
          >
            ยอมรับทั้งหมด
          </button>
        </div>
      </div>
    </div>
  );
}
