import React from 'react';
import { UIIcon } from '../assets/natureIcons';
import { AnimalSVG } from '../assets/animalIllustrations';

export default function VictoryModal({ room, myId, onRematch, onLeave }) {
  if (!room) return null;

  const sorted = [...room.players].sort((a, b) => b.score - a.score);
  const titles = ['👑 แชมเปียนอันดับ 1', '🥈 รองชนะเลิศอันดับ 1', '🥉 รองชนะเลิศอันดับ 2', '🎖️ ผู้ร่วมแข่งขัน'];
  const rankColors = [
    { bg: '#fef3c7', border: '#d49a26', badge: '#f5b73d', text: '#2a1d15' },
    { bg: '#f1f5f9', border: '#94a3b8', badge: '#cbd5e1', text: '#1e293b' },
    { bg: '#ffedd5', border: '#c85a32', badge: '#fb923c', text: '#ffffff' },
    { bg: '#f8fafc', border: '#e2e8f0', badge: '#e2e8f0', text: '#475569' },
  ];

  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: '440px', width: '92%', padding: '24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#fef3c7',
              border: '2px solid #d49a26',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(212, 154, 38, 0.3)',
            }}
          >
            <UIIcon name="trophy" size={34} color="#d49a26" />
          </div>
        </div>

        <div className="hero-title" style={{ fontSize: '22px', color: 'var(--forest-primary)', marginBottom: '2px', textShadow: 'none' }}>
          สรุปผลการแข่งขัน
        </div>
        <div style={{ fontSize: 13, color: 'var(--forest-accent)', marginBottom: 16, fontWeight: 500 }}>
          คะแนนรวมจากการพิชิตเควสต์จำแนกคุณสมบัติสัตว์
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
          {sorted.map((p, rank) => {
            const isMe = p.id === myId;
            const rStyle = rankColors[rank] || rankColors[3];
            return (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: rStyle.bg,
                  border: `1.5px solid ${rStyle.border}`,
                  borderRadius: 'var(--r-lg)',
                  padding: '10px 14px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-num)',
                    fontWeight: 900,
                    fontSize: '15px',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: rStyle.badge,
                    color: rStyle.text,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {rank + 1}
                </div>

                <div style={{ width: 28, height: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AnimalSVG id={p.avatarId || (p.isBot ? 'owl' : 'lion')} size={28} />
                </div>

                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 14,
                      color: isMe ? 'var(--forest-primary)' : 'var(--ink-primary)',
                    }}
                  >
                    {p.name}
                    {isMe && ' (คุณ)'}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink-muted)', fontWeight: 600 }}>
                    {titles[rank] || ''} · พิชิต {p.wonCount || 0} หมวดหมู่
                  </div>
                </div>

                <div
                  style={{
                    fontWeight: 900,
                    color: 'var(--warm-gold-dark)',
                    fontSize: 20,
                    fontFamily: 'var(--font-num)',
                  }}
                >
                  {p.score}
                  <span style={{ fontSize: 11, marginLeft: 3, fontWeight: 700, color: 'var(--ink-secondary)' }}>แต้ม</span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-green btn-block" onClick={onRematch} style={{ padding: '11px' }}>
            <UIIcon name="star" size={16} color="#ffffff" />
            <span>เล่นอีกรอบ</span>
          </button>
          <button className="btn btn-dark btn-block" onClick={onLeave} style={{ padding: '11px' }}>
            <UIIcon name="exit" size={16} />
            <span>กลับหน้าแรก</span>
          </button>
        </div>
      </div>
    </div>
  );
}
