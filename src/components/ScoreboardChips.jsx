import React from 'react';
import { AnimalSVG } from '../assets/animalIllustrations';

export default function ScoreboardChips({ players = [], activeIndex, isTimeAttack, myId }) {
  return (
    <div className="scoreboard-chips">
      {players.map((p, idx) => {
        const isCur = idx === activeIndex && !isTimeAttack;
        const isMe = p.id === myId;
        return (
          <div
            key={p.id}
            id={`scoreChip-${p.id}`}
            className={`score-chip ${isCur ? 'active-turn' : ''}`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: 20, height: 20, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AnimalSVG id={p.avatarId || (p.isBot ? 'owl' : 'lion')} size={20} />
              </div>
              <span style={{ fontWeight: isMe ? 800 : 700 }}>
                {p.name}
                {isMe && ' (คุณ)'}
              </span>
            </span>
            <span className="pts">{p.score} <small style={{ fontSize: '9.5px', fontWeight: 600 }}>แต้ม</small></span>
          </div>
        );
      })}
    </div>
  );
}
