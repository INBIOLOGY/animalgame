import React from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { getPlayerColorObj } from '../utils/playerColors';

export default function ScoreboardChips({ players = [], activeIndex, isTimeAttack, myId }) {
  // Find highest score among playing students to display leader crown
  const playingStudents = players.filter((p) => !p.isTeacher && !p.isSpectator);
  const maxScore = Math.max(...playingStudents.map((p) => p.score || 0), 0);
  const showCrown = maxScore > 0;

  return (
    <div className="cute-scoreboard-chips">
      {players.map((p, idx) => {
        const isCur = idx === activeIndex && !isTimeAttack && !p.isTeacher;
        const isMe = p.id === myId;
        const isLeader = showCrown && !p.isTeacher && p.score === maxScore;
        const colorObj = getPlayerColorObj(p.color || (p.isTeacher ? '#4F46E5' : p.isBot ? '#0284C7' : '#10B981'));

        return (
          <div
            key={p.id}
            id={`scoreChip-${p.id}`}
            className={`cute-player-chip ${isCur ? 'active-turn' : ''} ${isMe ? 'is-me' : ''} ${p.isTeacher ? 'is-teacher-chip' : ''}`}
            style={{
              position: 'relative',
              zIndex: isCur ? 3 : 2,
              borderColor: colorObj.hex,
              borderWidth: isCur ? '2.5px' : '2px',
              borderStyle: 'solid',
              boxShadow: isCur
                ? `0 0 0 2.5px ${colorObj.hex}55, 0 4px 14px ${colorObj.shadow || 'rgba(0,0,0,0.18)'}`
                : `0 2px 8px ${colorObj.shadow || 'rgba(0,0,0,0.07)'}`,
              background: isCur
                ? `linear-gradient(135deg, #FFFFFF 45%, ${colorObj.hex}22)`
                : p.isTeacher
                ? 'linear-gradient(135deg, #FFFFFF 70%, #EEF2FF)'
                : `linear-gradient(135deg, #FFFFFF 72%, ${colorObj.hex}10)`,
            }}
            title={p.isTeacher ? `คุณครูผู้ดูแลห้อง: ${p.name}` : `คะแนนของ ${p.name}: ${p.score} แต้ม`}
          >
            {/* Avatar with Leader Crown & Color Ring */}
            <div
              className="cute-chip-avatar-box"
              style={{
                borderRadius: '50%',
                padding: '2px',
                border: `2px solid ${colorObj.hex}`,
                background: '#FFFFFF',
                boxShadow: `0 2px 6px ${colorObj.shadow || 'rgba(0,0,0,0.12)'}`,
              }}
            >
              <AnimalAvatar id={p.avatarId || (p.isBot ? 'sponge_glass' : 'lion')} size={36} />
              {isLeader && <span className="cute-crown-badge">👑</span>}
            </div>

            {/* Name & Status & Score */}
            <div className="cute-chip-info">
              <div className="cute-chip-name-row">
                <span className="cute-chip-name-text" style={{ color: isCur ? colorObj.hex : '#0F172A' }}>
                  {p.name}
                </span>
                {isMe && (
                  <span
                    className="cute-me-pill"
                    style={{
                      background: `linear-gradient(135deg, ${colorObj.hex}, ${colorObj.hex}DD)`,
                      boxShadow: `0 1px 4px ${colorObj.shadow || 'rgba(0,0,0,0.2)'}`,
                    }}
                  >
                    คุณ
                  </span>
                )}
                {p.isTeacher && <span className="cute-bot-pill" style={{ background: '#EEF2FF', color: '#4F46E5', borderColor: '#C7D2FE' }}>ครู</span>}
                {p.isBot && <span className="cute-bot-pill">บอท</span>}
              </div>
              {p.isTeacher ? (
                <div className="cute-chip-score" style={{ color: '#4F46E5', fontWeight: 700 }}>
                  <span style={{ fontSize: '11px' }}>🎓 ผู้ดูแลห้อง</span>
                </div>
              ) : (
                <div className="cute-chip-score">
                  <span className="cute-star-icon">⭐</span>
                  <span className="cute-score-val">{p.score}</span>
                  <span className="cute-score-unit">แต้ม</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
