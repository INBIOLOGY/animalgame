import React, { useEffect, useState } from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { playSfx } from '../utils/audio';

export default function GameStartSplash({ room, myId, onDismiss }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    playSfx('fanfare');
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDismiss) onDismiss();
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  if (!visible || !room || !room.players || room.players.length === 0) return null;

  const firstPlayer = room.players[0];
  const isMeFirst = firstPlayer?.id === myId;

  return (
    <div className="game-start-splash-backdrop" onClick={() => setVisible(false)}>
      <div className="game-start-splash-card">
        {/* Animated Dice & Sparks */}
        <div className="splash-dice-icon">🎲</div>
        
        <h2 className="splash-title">สุ่มลำดับผู้เล่นเรียบร้อย!</h2>
        <p className="splash-subtitle">ผู้เล่นคนแรกที่ได้เปิดกระดานคือ...</p>

        {/* 1st Player Spotlight */}
        <div className="splash-first-player-spotlight">
          <div className="splash-crown-badge">👑 คนแรก</div>
          <AnimalAvatar id={firstPlayer.avatarId || (firstPlayer.isBot ? 'owl' : 'lion')} size={64} />
          <div className="splash-first-player-name">
            {firstPlayer.name} {isMeFirst && <span className="splash-me-tag">(คุณ)</span>}
          </div>
        </div>

        {/* Turn Order Strip */}
        <div className="splash-order-strip">
          <span className="splash-order-label">ลำดับการเล่น:</span>
          <div className="splash-order-players">
            {room.players.map((p, idx) => (
              <div key={p.id} className="splash-order-chip">
                <span className="splash-order-num">{idx + 1}</span>
                <AnimalAvatar id={p.avatarId || (p.isBot ? 'owl' : 'lion')} size={20} />
                <span className="splash-order-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="splash-cta-hint">แตะเพื่อเริ่มทันที ⚡</div>
      </div>
    </div>
  );
}
