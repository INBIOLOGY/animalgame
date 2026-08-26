import React from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';

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

        return (
          <div
            key={p.id}
            id={`scoreChip-${p.id}`}
            className={`cute-player-chip ${isCur ? 'active-turn' : ''} ${isMe ? 'is-me' : ''}`}
            title={`คะแนนของ ${p.name}: ${p.score} แต้ม`}
          >
            {/* Avatar with Leader Crown */}
            <div className="cute-chip-avatar-box">
              <AnimalAvatar id={p.avatarId || (p.isBot ? 'owl' : 'lion')} size={32} />
              {isLeader && <span className="cute-crown-badge">👑</span>}
            </div>

            {/* Name & Status */}
            <div className="cute-chip-info">
              <div className="cute-chip-name">
                <span>{p.name}</span>
                {isMe && <span className="cute-me-pill">คุณ</span>}
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
