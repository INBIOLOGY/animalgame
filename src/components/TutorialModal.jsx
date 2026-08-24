import React, { useState } from 'react';
import { UIIcon } from '../assets/natureIcons';
import { playSfx } from '../utils/audio';

const TUTORIAL_STEPS = [
  {
    step: 1,
    badge: 'ขั้นตอนที่ 1 / 6',
    title: '🎴 รู้จักกระดานและการ์ดคำถาม',
    desc: 'บนกระดานจะมี "การ์ดคำถาม" แนวตั้ง 6 ใบ แต่ละใบจะมี 2 หรือ 3 ช่องสี (เหลืองบน, ชมพูล่าง) ซึ่งระบุคุณสมบัติทางชีววิทยาที่สัตว์ต้องมี เช่น "มีเนื้อเยื่อแท้จริง", "อสมมาตร", "มีท่อประสาทกลวง"',
    demoType: 'board_intro',
    demoImg: '/cards/questions/q_01.png',
  },
  {
    step: 2,
    badge: 'ขั้นตอนที่ 2 / 6',
    title: '🐾 การ์ดสัตว์ในมือและไฟลัมทั้ง 9',
    desc: 'ในมือของคุณจะมีการ์ดสัตว์ 4 ใบ สัตว์แต่ละชนิดจะสังกัด 1 ใน 9 ไฟลัม (Porifera, Cnidaria, Mollusca ฯลฯ) และมีคุณสมบัติเฉพาะตัว ให้อ่านคุณสมบัติของสัตว์เพื่อหาว่าตรงกับคำถามช่องไหนบนกระดาน',
    demoType: 'hand_intro',
    demoImg: '/cards/animals/animal_01.png',
  },
  {
    step: 3,
    badge: 'ขั้นตอนที่ 3 / 6',
    title: '✨ วิธีการวางการ์ดลงช่อง (Match & Fit)',
    desc: 'เมื่อถึงตาของคุณ ให้แตะเลือกการ์ดในมือ 1 ใบ จากนั้นแตะช่องคำถามบนกระดานที่มีคุณสมบัติตรงกัน (หรือเปิด "💡 ตัวช่วย" เพื่อให้ระบบเรืองแสงสีเขียวบอกช่องที่วางได้) การ์ดคำตอบจะบินไปวางทับช่องนั้นทันที!',
    demoType: 'card_match_anim',
  },
  {
    step: 4,
    badge: 'ขั้นตอนที่ 4 / 6',
    title: '⚡ การใช้การ์ดพิเศษทั้ง 7 ชนิด',
    desc: 'ในกองการ์ดจะมีการ์ดพิเศษปนอยู่ด้วย เช่น "Fit Free" (วางตรงไหนก็ได้), "Crab Shield" (กางเกราะป้องกัน), "Play Double" (วาง 2 ใบในตาเดียว), "Reverse" (สลับทิศทาง), "Skip" (ข้ามตา), "Shuffle" (สลับไพ่ทุกคน), "Drop It" (บังคับทิ้งการ์ด)',
    demoType: 'specials_grid',
  },
  {
    step: 5,
    badge: 'ขั้นตอนที่ 5 / 6',
    title: '🔄 การทิ้งการ์ดเพื่อจั่วใหม่ (Discard)',
    desc: 'หากไม่มีการ์ดที่สามารถวางบนกระดานได้ ให้แตะปุ่ม "ข้ามตา / จั่วใหม่" หรือลากการ์ดไปยังกล่อง "ทิ้งการ์ด" ด้านขวาล่าง ระบบจะทิ้งการ์ดใบนั้นและจั่วใบใหม่จากกองขึ้นมือทันที แล้วสลับตาให้ผู้เล่นคนถัดไป',
    demoType: 'discard_demo',
  },
  {
    step: 6,
    badge: 'ขั้นตอนที่ 6 / 6',
    title: '🏆 การพิชิตหมวดและการชนะเกม',
    desc: 'เมื่อผู้เล่นวางการ์ดครบทุกช่องในการ์ดคำถามใบใด ผู้ที่วางใบสุดท้ายจะได้รับแต้มของหมวดนั้น (เช่น +20 หรือ +30 แต้ม) และการ์ดคำถามใบใหม่จะถูกเปิดขึ้นมา เมื่อการ์ดคำถามหมดกอง ผู้ที่มีคะแนนสูงสุดจะเป็นผู้ชนะ!',
    demoType: 'victory_demo',
  },
];

export default function TutorialModal({ onClose, onStartPlaying }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const cur = TUTORIAL_STEPS[currentStepIdx];
  const isFirst = currentStepIdx === 0;
  const isLast = currentStepIdx === TUTORIAL_STEPS.length - 1;

  const handleNext = () => {
    playSfx('select');
    if (!isLast) {
      setCurrentStepIdx((prev) => prev + 1);
    } else {
      if (onStartPlaying) onStartPlaying();
      onClose();
    }
  };

  const handlePrev = () => {
    playSfx('select');
    if (!isFirst) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  return (
    <div className="cute-modal-backdrop page-screen-anim">
      <div className="cute-modal-box tutorial-box">
        {/* Header Bar */}
        <div className="cute-tutorial-header">
          <div className="cute-tutorial-title-group">
            <div className="tutorial-icon-badge">🎓</div>
            <div>
              <h2 className="cute-tutorial-title">โหมดสอนเล่น — FIT me Biology TCG</h2>
              <span className="cute-tutorial-step-tag">{cur.badge}</span>
            </div>
          </div>
          <button
            type="button"
            className="cute-btn-close-circle"
            onClick={() => {
              playSfx('pop');
              onClose();
            }}
          >
            ✕
          </button>
        </div>

        {/* Step Progress Dots */}
        <div className="tutorial-progress-strip">
          {TUTORIAL_STEPS.map((s, idx) => (
            <div
              key={s.step}
              className={`tutorial-progress-dot ${idx === currentStepIdx ? 'active-dot' : idx < currentStepIdx ? 'done-dot' : ''}`}
              onClick={() => {
                playSfx('pop');
                setCurrentStepIdx(idx);
              }}
            />
          ))}
        </div>

        {/* Dynamic Animation / Interactive Stage */}
        <div className="tutorial-stage-container">
          {cur.demoType === 'board_intro' && (
            <div className="tutorial-demo-scene demo-board">
              <div className="demo-quest-card-wrap animate-float">
                <img src="/cards/questions/q_01.png" alt="Question Card Demo" className="demo-vertical-card" />
                <div className="demo-slot-target slot-top-highlight">
                  <span className="demo-highlight-tag">🌟 ช่องบน: คำถาม #1</span>
                </div>
                <div className="demo-slot-target slot-bottom-highlight">
                  <span className="demo-highlight-tag">🌸 ช่องล่าง: คำถาม #2</span>
                </div>
              </div>
              <div className="demo-coach-bubble">
                <span className="coach-avatar">🧽</span>
                <span>ดูข้อความบนการ์ดคำถามเพื่อหาสัตว์ที่มีคุณสมบัติตรงกัน!</span>
              </div>
            </div>
          )}

          {cur.demoType === 'hand_intro' && (
            <div className="tutorial-demo-scene demo-hand">
              <div className="demo-hand-cards-row">
                <div className="demo-vertical-card-mini animate-card-fan-1">
                  <img src="/cards/animals/animal_01.png" alt="Bath Sponge" />
                  <span className="demo-card-subtag">Porifera</span>
                </div>
                <div className="demo-vertical-card-mini animate-card-fan-2">
                  <img src="/cards/animals/animal_05.png" alt="Sea Anemone" />
                  <span className="demo-card-subtag">Cnidaria</span>
                </div>
                <div className="demo-vertical-card-mini animate-card-fan-3">
                  <img src="/cards/animals/animal_11.png" alt="Planaria" />
                  <span className="demo-card-subtag">Platyhelminthes</span>
                </div>
              </div>
              <div className="demo-coach-bubble">
                <span className="coach-avatar">💡</span>
                <span>การ์ดในมือคุณคือตัวเลือกคำตอบ 4 ใบ สลับกันลงตามเทิร์น</span>
              </div>
            </div>
          )}

          {cur.demoType === 'card_match_anim' && (
            <div className="tutorial-demo-scene demo-match-action">
              <div className="demo-match-board-preview">
                <div className="demo-mini-quest-card">
                  <img src="/cards/questions/q_01.png" alt="Question" />
                  <div className="demo-target-slot-glow">
                    <span className="demo-target-label">วางที่นี่!</span>
                  </div>
                </div>
                <div className="demo-moving-card-anim">
                  <img src="/cards/animals/animal_01.png" alt="Moving Card" />
                  <div className="demo-hand-cursor">👆</div>
                </div>
              </div>
              <div className="demo-coach-bubble">
                <span className="coach-avatar">✨</span>
                <span>1. แตะการ์ดในมือ ➜ 2. แตะช่องบนกระดานเพื่อวางทับ</span>
              </div>
            </div>
          )}

          {cur.demoType === 'specials_grid' && (
            <div className="tutorial-demo-scene demo-specials">
              <div className="demo-specials-grid">
                {[
                  { name: 'Fit Free', desc: 'ลงตรงไหนก็ได้', img: '/cards/specials/special_fit_free.png' },
                  { name: 'Crab Shield', desc: 'ป้องกันการขัดขวาง', img: '/cards/specials/special_crab_shield.png' },
                  { name: 'Play Double', desc: 'เล่น 2 ใบใน 1 ตา', img: '/cards/specials/special_play_double.png' },
                  { name: 'Reverse', desc: 'สลับทิศทางการเล่น', img: '/cards/specials/special_reverse.png' },
                  { name: 'Skip', desc: 'ข้ามตาผู้เล่นถัดไป', img: '/cards/specials/special_skip.png' },
                  { name: 'Shuffle', desc: 'สลับไพ่ทุกคนแล้วแจกใหม่', img: '/cards/specials/special_shuffle.png' },
                ].map((sp) => (
                  <div key={sp.name} className="demo-special-chip">
                    <img src={sp.img} alt={sp.name} className="demo-special-chip-img" />
                    <div className="demo-special-chip-info">
                      <strong>{sp.name}</strong>
                      <small>{sp.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cur.demoType === 'discard_demo' && (
            <div className="tutorial-demo-scene demo-discard-action">
              <div className="demo-discard-showcase">
                <div className="demo-discard-card-item">
                  <img src="/cards/animals/animal_15.png" alt="Discard Card" />
                </div>
                <div className="demo-arrow-recycle">➜ ♻️ ➜</div>
                <div className="demo-draw-new-card">
                  <span className="demo-new-card-sparkle">✨ จั่วใบใหม่ขึ้นมือ</span>
                </div>
              </div>
              <div className="demo-coach-bubble">
                <span className="coach-avatar">🔄</span>
                <span>ถ้าไม่มีตัวที่ลงได้ ให้กดปุ่ม "ข้ามตา / จั่วใหม่" เพื่อเปลี่ยนการ์ด</span>
              </div>
            </div>
          )}

          {cur.demoType === 'victory_demo' && (
            <div className="tutorial-demo-scene demo-victory-scene">
              <div className="demo-trophy-celebrate">
                <div className="demo-large-trophy">🏆</div>
                <div className="demo-stars-burst">⭐ +20 แต้ม! ⭐</div>
              </div>
              <div className="demo-coach-bubble">
                <span className="coach-avatar">🎉</span>
                <span>วางครบทุกช่อง = พิชิตหมวด! สะสมแต้มให้ได้มากที่สุดเพื่อคว้าชัยชนะ!</span>
              </div>
            </div>
          )}
        </div>

        {/* Text Description Box */}
        <div className="tutorial-info-box">
          <h3 className="tutorial-step-headline">{cur.title}</h3>
          <p className="tutorial-step-desc">{cur.desc}</p>
        </div>

        {/* Action Controls */}
        <div className="tutorial-footer-actions">
          <button
            type="button"
            className="cute-tutorial-btn btn-prev"
            onClick={handlePrev}
            disabled={isFirst}
          >
            ◀ ย้อนกลับ
          </button>

          <button
            type="button"
            className="cute-tutorial-btn btn-next"
            onClick={handleNext}
          >
            {isLast ? '🎮 พร้อมแล้ว! เริ่มเล่นเกม' : 'ถัดไป ▶'}
          </button>
        </div>
      </div>
    </div>
  );
}
