import React from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { getPlayerColorObj } from '../utils/playerColors';

export default function ScoreboardChips({ players = [], activeIndex, isTimeAttack, myId }) {
  // Find highest score among players to display leader crown
  const maxScore = Math.max(...players.map((p) => p.score || 0), 0);
  const showCrown = maxScore > 0;

  return (
    <div className="cute-scoreboard-chips">
      {players.map((p, idx) => {
        const isCur = idx === activeIndex && !isTimeAttack;
        const isMe = p.id === myId;
        const isLeader = showCrown && p.score === maxScore;
        const colorObj = getPlayerColorObj(p.color || (p.isBot ? '#0284C7' : '#10B981'));

        return (
          <div
            key={p.id}
            id={`scoreChip-${p.id}`}
            className={`cute-player-chip ${isCur ? 'active-turn' : ''} ${isMe ? 'is-me' : ''}`}
            style={{
              borderColor: isCur ? colorObj.hex : (isMe ? `${colorObj.hex}88` : undefined),
              boxShadow: isCur
                ? `0 0 0 2px ${colorObj.hex}, 0 3px 10px ${colorObj.shadow || 'rgba(0,0,0,0.1)'}`
                : undefined,
              background: isCur
                ? `linear-gradient(135deg, #FFFFFF 60%, ${colorObj.hex}18)`
                : undefined,
            }}
            title={`คะแนนของ ${p.name}: ${p.score} แต้ม`}
          >
            {/* Avatar with Leader Crown & Color Ring */}
            <div
              className="cute-chip-avatar-box"
              style={{
                borderRadius: '50%',
                padding: '1.5px',
                border: `2px solid ${colorObj.hex}`,
                background: '#FFFFFF',
                boxShadow: `0 0 6px ${colorObj.shadow || 'rgba(0,0,0,0.1)'}`,
              }}
            >
              <AnimalAvatar id={p.avatarId || (p.isBot ? 'owl' : 'lion')} size={30} />
              {isLeader && <span className="cute-crown-badge">👑</span>}
            </div>

            {/* Name & Status */}
            <div className="cute-chip-info">
              <div className="cute-chip-name">
                <span style={{ color: isCur ? colorObj.hex : undefined }}>{p.name}</span>
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
              </div>
              <div className="cute-chip-score">
                <span className="cute-star-icon">⭐</span>
                <span className="cute-score-val">{p.score}</span>
                <span className="cute-score-unit">แต้ม</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
