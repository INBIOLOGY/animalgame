import React from 'react';
import { ANIMAL_EMOJI_MAP } from '../utils/traits';
import { getAnimalArt } from './artAssets';

// 🎨 Luxury Animal Avatar & Card Portrait Component with high-production game digital art
export function AnimalAvatar({ id, size = 32, showArt = true, className = '', style = {} }) {
  const artSrc = getAnimalArt(id);
  const emoji = ANIMAL_EMOJI_MAP[id] || '🐾';
  const isLarge = size >= 36;

  if (showArt && artSrc && isLarge) {
    return (
      <div
        className={`game-art-portrait-frame ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: size > 50 ? '16px' : '10px',
          overflow: 'hidden',
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: '1.5px solid rgba(212, 154, 38, 0.45)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
          background: '#142817',
          ...style,
        }}
        title={id}
      >
        <img
          src={artSrc}
          alt={id}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.3)',
            pointerEvents: 'none',
          }}
        />
      </div>
    );
  }

  // Compact circular badge with emoji and glowing rim
  return (
    <div
      className={`animal-avatar-badge ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #2b5523 0%, #153213 100%)',
        border: '1.5px solid rgba(212, 154, 38, 0.6)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: `${Math.round(size * 0.6)}px`,
        lineHeight: 1,
        ...style,
      }}
      title={id}
    >
      <span style={{ transform: 'translateY(-1px)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }}>
        {emoji}
      </span>
    </div>
  );
}

// 🦁 Full TCG Card Hero Artwork Plate
export function AnimalCardArt({ id, className = '', style = {} }) {
  const artSrc = getAnimalArt(id);
  return (
    <div
      className={`tcg-card-art-box ${className}`}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '10px',
        ...style,
      }}
    >
      <img
        src={artSrc}
        alt={id}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
      <div className="card-art-vignette" />
    </div>
  );
}

export const AnimalSVG = AnimalAvatar;
export default AnimalAvatar;
