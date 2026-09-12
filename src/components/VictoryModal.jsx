import React from 'react';
import { UIIcon } from '../assets/natureIcons';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { playSfx } from '../utils/audio';

export default function VictoryModal({ room, myId, onRematch, onLeave }) {
  if (!room) return null;

  const sorted = [...room.players].sort((a, b) => b.score - a.score);
  const titles = ['👑 แชมเปียนอันดับ 1', '🥈 รองชนะเลิศอันดับ 1', '🥉 รองชนะเลิศอันดับ 2', '🎖️ ผู้ร่วมแข่งขัน'];
  
  const rankBadges = [
    { bg: '#FEF3C7', border: '#FCD34D', text: '#92400E', icon: '👑' },
    { bg: '#F1F5F9', border: '#CBD5E1', text: '#334155', icon: '🥈' },
    { bg: '#FFEDD5', border: '#FDBA74', text: '#9A3412', icon: '🥉' },
    { bg: '#FAFDF7', border: '#E2E8F0', text: '#64748B', icon: '🎖️' },
  ];

  return (
    <div className="cute-modal-backdrop page-screen-anim">
      <div className="cute-modal-box victory-box">
        {/* Trophy Header */}
        <div className="cute-victory-trophy-wrap">
          <div className="cute-trophy-circle">
            <span className="cute-trophy-emoji">🏆</span>
          </div>
        </div>

        <h2 className="cute-modal-title">🎉 สรุปผลการแข่งขัน!</h2>
        <p className="cute-modal-subtitle">
          คะแนนรวมจากการพิชิตเควสต์จำแนกคุณสมบัติสัตว์โลก
        </p>

        {/* Players Leaderboard */}
        <div className="cute-victory-roster">
          {sorted.map((p, rank) => {
            const isMe = p.id === myId;
            const rBadge = rankBadges[rank] || rankBadges[3];
            return (
              <div
                key={p.id}
                className={`cute-victory-row ${isMe ? 'is-me' : ''}`}
                style={{ background: rBadge.bg, borderColor: rBadge.border }}
              >
                <div className="cute-rank-num" style={{ color: rBadge.text }}>
                  {rBadge.icon}
                </div>

                <div
                  className="cute-rank-avatar"
                  style={{
                    borderRadius: '50%',
                    padding: '2px',
                    border: `2.5px solid ${p.color || '#CBD5E1'}`,
                    background: '#FFFFFF',
                    boxShadow: `0 2px 6px ${p.color ? p.color + '44' : 'rgba(0,0,0,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AnimalAvatar id={p.avatarId || (p.isBot ? 'sponge_glass' : 'lion')} size={34} />
                </div>

                <div className="cute-rank-info">
                  <div className="cute-rank-name">
                    <span>{p.name}</span>
                    {isMe && <span className="cute-me-pill">คุณ</span>}
                    {p.isBot && <span className="cute-bot-pill">บอท</span>}
                  </div>
                  <div className="cute-rank-title">
                    {titles[rank] || 'ผู้ร่วมประลอง'} · พิชิต {p.wonCount || 0} หมวดหมู่
                  </div>
                </div>

                <div className="cute-rank-score">
                  <span className="cute-star-icon">⭐</span>
                  <span className="cute-score-num">{p.score}</span>
                  <span className="cute-score-unit">แต้ม</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="cute-victory-actions">
          <button
            type="button"
            className="cute-btn-rematch"
            onClick={() => {
              playSfx('fanfare');
              onRematch();
            }}
          >
            <span>🔄 เล่นอีกครั้ง</span>
          </button>

          <button
            type="button"
            className="cute-btn-modal-close"
            onClick={() => {
              playSfx('select');
              onLeave();
            }}
          >
            <span>กลับสู่หน้าแรก</span>
          </button>
        </div>
      </div>
    </div>
  );
}
