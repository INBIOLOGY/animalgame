import React from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';

export default function ScoreboardChips({ players = [], activeIndex, isTimeAttack, myId }) {
  // Find highest score among players to display leader crown
  const maxScore = Math.max(...players.map((p) => p.score || 0), 0);
  const showCrown = maxScore > 0;

  return (
    <div className="scoreboard-chips-hud">
      {players.map((p, idx) => {
        const isCur = idx === activeIndex && !isTimeAttack;
        const isMe = p.id === myId;
        const isLeader = showCrown && p.score === maxScore;

        return (
          <div
            key={p.id}
            id={`scoreChip-${p.id}`}
            className={`hud-player-chip ${isCur ? 'active-turn-hud' : ''} ${isMe ? 'is-me-hud' : ''}`}
            title={`คะแนนของ ${p.name}: ${p.score} แต้ม`}
          >
            {/* Avatar with Leader Crown */}
            <div className="hud-avatar-wrapper">
              <AnimalAvatar id={p.avatarId || (p.isBot ? 'owl' : 'lion')} size={26} />
              {isLeader && <span className="hud-crown-badge">👑</span>}
            </div>

            {/* Name & Status */}
            <div className="hud-info-column">
              <div className="hud-player-name">
                {p.name}
                {isMe && <span className="hud-me-tag">คุณ</span>}
              </div>
              <div className="hud-score-badge">
                <span className="hud-star-icon">⭐</span>
                <span className="hud-score-num">{p.score}</span>
                <span className="hud-score-unit">แต้ม</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
