import React from 'react';
import { ANIMAL_EMOJI_MAP } from '../utils/traits';

// 🎨 Habitat-themed gradient presets for rich specimen presentation
const HABITAT_GRADIENTS = {
  lion: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  tiger: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
  cheetah: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  elephant: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
  eagle: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
  falcon: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
  owl: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
  penguin: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
  shark: 'linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 100%)',
  dolphin: 'linear-gradient(135deg, #e0f2fe 0%, #38bdf8 100%)',
  whale: 'linear-gradient(135deg, #bae6fd 0%, #7dd3fc 100%)',
  blue_whale: 'linear-gradient(135deg, #bae6fd 0%, #7dd3fc 100%)',
  salmon: 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)',
  frog: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
  turtle: 'linear-gradient(135deg, #ecfccb 0%, #d9f99d 100%)',
  sea_turtle: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)',
  snake: 'linear-gradient(135deg, #fef08a 0%, #facc15 100%)',
  chameleon: 'linear-gradient(135deg, #d9f99d 0%, #bef264 100%)',
  crocodile: 'linear-gradient(135deg, #dcfce7 0%, #86efac 100%)',
  komodo: 'linear-gradient(135deg, #fde047 0%, #eab308 100%)',
  crab: 'linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%)',
  octopus: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
  butterfly: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)',
  bee: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)',
  kangaroo: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
  koala: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)',
  platypus: 'linear-gradient(135deg, #ecfeff 0%, #a5f3fc 100%)',
  beaver: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  otter: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
  chimp: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  bat: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
  wolf: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)',
  polar_bear: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  panda: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
  fox: 'linear-gradient(135deg, #ffedd5 0%, #fdba74 100%)',
  rabbit: 'linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 100%)',
  giraffe: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)',
  flamingo: 'linear-gradient(135deg, #fce7f3 0%, #f472b6 100%)',
  peacock: 'linear-gradient(135deg, #ccfbf1 0%, #5eead4 100%)',
};

/**
 * 🌟 Universal Crisp Animal Badge / Avatar Component
 * Renders a tactile, rounded 3D emoji badge with ambient lighting and shadow.
 */
export function AnimalAvatar({ id, size = 32, className = '', style = {} }) {
  const emoji = ANIMAL_EMOJI_MAP[id] || '🐾';
  const background = HABITAT_GRADIENTS[id] || 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)';
  const fontSize = Math.round(size * 0.62);

  return (
    <div
      className={`animal-avatar-badge ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: size > 42 ? '16px' : '50%',
        background,
        border: '1.5px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        userSelect: 'none',
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        transition: 'transform 0.15s ease',
        ...style,
      }}
      title={id}
    >
      <span style={{ transform: 'translateY(-1px)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.18))' }}>
        {emoji}
      </span>
    </div>
  );
}

// 🦁 Backward compatibility alias
export const AnimalSVG = AnimalAvatar;
export default AnimalAvatar;
