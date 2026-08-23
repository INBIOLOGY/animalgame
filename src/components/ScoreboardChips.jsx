import React from 'react';

const AVATAR_EMOJI = {
  lion:'🦁', tiger:'🐯', cheetah:'🐆', elephant:'🐘', eagle:'🦅', owl:'🦉',
  penguin:'🐧', shark:'🦈', dolphin:'🐬', frog:'🐸', turtle:'🐢', octopus:'🐙',
  butterfly:'🦋', kangaroo:'🦘', koala:'🐨', wolf:'🐺', chimp:'🐵', polar_bear:'🐻‍❄️',
  ostrich:'🦚', whale:'🐳', salmon:'🐟', snake:'🐍', chameleon:'🦎', crab:'🦀',
  bee:'🐝', platypus:'🦆', beaver:'🦫', otter:'🦦', bat:'🦇',
};

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
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '16px', lineHeight: 1, flexShrink: 0 }}>
                {AVATAR_EMOJI[p.avatarId] || (p.isBot ? '🤖' : '🐾')}
              </span>
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
