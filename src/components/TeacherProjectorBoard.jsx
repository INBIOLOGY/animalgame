import React from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { getPlayerColorObj } from '../utils/playerColors';

export default function TeacherProjectorBoard({ room }) {
  if (!room) return null;

  const students = (room.players || []).filter((p) => !p.isSpectator && !p.isTeacher);
  const sortedStudents = [...students].sort((a, b) => (b.score || 0) - (a.score || 0));
  const activeIndex = room.currentTurnIndex ?? 0;
  const activePlayer = room.players[activeIndex];

  const rankThemes = [
    { bg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', border: '#F59E0B', text: '#B45309', icon: '👑 อันดับ 1' },
    { bg: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)', border: '#94A3B8', text: '#475569', icon: '🥈 อันดับ 2' },
    { bg: 'linear-gradient(135deg, #FFEDD5, #FED7AA)', border: '#F97316', text: '#C2410C', icon: '🥉 อันดับ 3' },
  ];

  return (
    <div className="teacher-projector-container page-screen-anim">
      {/* Projector Notice Banner */}
      <div className="teacher-projector-banner">
        <div className="teacher-projector-banner-left">
          <span className="teacher-projector-badge">📽️ โหมดฉายโปรเจกเตอร์ (Classroom View)</span>
          <span className="teacher-projector-notice">
            🔒 ซ่อนการ์ดในมือ ป้องกันนักเรียนแอบมองจอ · แสดงเฉพาะชื่อและคะแนนสะสมแบบเรียลไทม์
          </span>
        </div>
        <div className="teacher-projector-stats">
          <div className="projector-stat-pill">
            <span className="stat-label">นักเรียน:</span>
            <strong>{students.length} คน</strong>
          </div>
          {activePlayer && (
            <div className="projector-stat-pill active-pill">
              <span className="stat-label">กำลังคิด:</span>
              <strong>{activePlayer.name}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Classroom Scoreboard Grid */}
      <div className="teacher-projector-grid">
        {sortedStudents.map((student, rank) => {
          const isTurn = activePlayer && activePlayer.id === student.id;
          const colorObj = getPlayerColorObj(student.color || (student.isBot ? '#0284C7' : '#10B981'));
          const rankTheme = rankThemes[rank] || {
            bg: '#FFFFFF',
            border: '#E2E8F0',
            text: '#64748B',
            icon: `#${rank + 1}`,
          };

          return (
            <div
              key={student.id}
              className={`teacher-projector-card ${isTurn ? 'is-turn-active' : ''} ${rank === 0 ? 'is-leader' : ''}`}
              style={{
                borderColor: isTurn ? colorObj.hex : rankTheme.border,
                boxShadow: isTurn
                  ? `0 0 0 3px ${colorObj.hex}66, 0 8px 24px ${colorObj.shadow || 'rgba(0,0,0,0.2)'}`
                  : '0 4px 12px rgba(0,0,0,0.06)',
              }}
            >
              {/* Card Top Row: Rank Tag & Turn status */}
              <div className="projector-card-top-bar">
                <div
                  className="projector-card-rank-tag"
                  style={{
                    background: rankTheme.bg,
                    borderColor: rankTheme.border,
                    color: rankTheme.text,
                  }}
                >
                  <span>{rankTheme.icon}</span>
                </div>
                {isTurn && (
                  <span className="projector-turn-alert" style={{ background: colorObj.hex }}>
                    ⚡ กำลังคิด & เล่น
                  </span>
                )}
              </div>

              {/* Student Avatar & Identity */}
              <div className="projector-card-body">
                <div
                  className="projector-avatar-circle"
                  style={{
                    border: `3px solid ${colorObj.hex}`,
                    boxShadow: `0 3px 10px ${colorObj.shadow || 'rgba(0,0,0,0.15)'}`,
                  }}
                >
                  <AnimalAvatar id={student.avatarId || (student.isBot ? 'sponge_glass' : 'lion')} size={48} />
                  {rank === 0 && student.score > 0 && <span className="projector-crown-icon">👑</span>}
                </div>

                <div className="projector-name-group">
                  <div className="projector-name-row">
                    <span className="projector-student-name" style={{ color: isTurn ? colorObj.hex : '#1E293B' }}>
                      {student.name}
                    </span>
                    {student.isBot && <span className="cute-bot-pill">บอท</span>}
                  </div>
                  <div className="projector-sub-details">
                    <span className="projector-hand-count">🃏 การ์ดในมือ {student.handLength ?? student.hand?.length ?? 0} ใบ</span>
                  </div>
                </div>

                {/* Score Section */}
                <div className="projector-score-badge">
                  <span className="projector-star-icon">⭐</span>
                  <div className="projector-score-numbers">
                    <span className="projector-score-val">{student.score || 0}</span>
                    <span className="projector-score-unit">คะแนน</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
