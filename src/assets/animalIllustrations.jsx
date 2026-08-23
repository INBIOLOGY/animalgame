import React from 'react';
import { ANIMAL_EMOJI_MAP } from '../utils/traits';

// 🌸 Cute & Cozy Pastel Habitat Palette (Animal Crossing / Pokemon Cafe Style)
const CUTE_PASTEL_PALETTES = {
  lion:       { bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', border: '#FCD34D', shadow: 'rgba(245, 158, 11, 0.25)' },
  tiger:      { bg: 'linear-gradient(135deg, #FFEDD5 0%, #FED7AA 100%)', border: '#FDBA74', shadow: 'rgba(234, 88, 12, 0.22)' },
  cheetah:    { bg: 'linear-gradient(135deg, #FEF9C3 0%, #FEF08A 100%)', border: '#FDE047', shadow: 'rgba(202, 138, 4, 0.22)' },
  elephant:   { bg: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)', border: '#CBD5E1', shadow: 'rgba(100, 116, 139, 0.2)' },
  eagle:      { bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', border: '#FCD34D', shadow: 'rgba(217, 119, 6, 0.22)' },
  falcon:     { bg: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)', border: '#7DD3FC', shadow: 'rgba(2, 132, 199, 0.2)' },
  owl:        { bg: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)', border: '#D8B4FE', shadow: 'rgba(147, 51, 234, 0.22)' },
  penguin:    { bg: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)', border: '#7DD3FC', shadow: 'rgba(2, 132, 199, 0.22)' },
  shark:      { bg: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)', border: '#38BDF8', shadow: 'rgba(2, 132, 199, 0.25)' },
  dolphin:    { bg: 'linear-gradient(135deg, #E0F2FE 0%, #7DD3FC 100%)', border: '#38BDF8', shadow: 'rgba(2, 132, 199, 0.25)' },
  whale:      { bg: 'linear-gradient(135deg, #BAE6FD 0%, #7DD3FC 100%)', border: '#38BDF8', shadow: 'rgba(2, 132, 199, 0.25)' },
  blue_whale: { bg: 'linear-gradient(135deg, #BAE6FD 0%, #7DD3FC 100%)', border: '#38BDF8', shadow: 'rgba(2, 132, 199, 0.25)' },
  salmon:     { bg: 'linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%)', border: '#FDA4AF', shadow: 'rgba(225, 29, 72, 0.2)' },
  frog:       { bg: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)', border: '#86EFAC', shadow: 'rgba(22, 163, 74, 0.22)' },
  turtle:     { bg: 'linear-gradient(135deg, #ECFCCB 0%, #D9F99D 100%)', border: '#BEF264', shadow: 'rgba(101, 163, 13, 0.22)' },
  sea_turtle: { bg: 'linear-gradient(135deg, #CCFBF1 0%, #99F6E4 100%)', border: '#5EEAD4', shadow: 'rgba(13, 148, 136, 0.22)' },
  snake:      { bg: 'linear-gradient(135deg, #FEF08A 0%, #FACC15 100%)', border: '#EAB308', shadow: 'rgba(202, 138, 4, 0.22)' },
  chameleon:  { bg: 'linear-gradient(135deg, #D9F99D 0%, #BEF264 100%)', border: '#A3E635', shadow: 'rgba(101, 163, 13, 0.22)' },
  crocodile:  { bg: 'linear-gradient(135deg, #DCFCE7 0%, #86EFAC 100%)', border: '#4ADE80', shadow: 'rgba(22, 163, 74, 0.22)' },
  komodo:     { bg: 'linear-gradient(135deg, #FDE047 0%, #EAB308 100%)', border: '#CA8A04', shadow: 'rgba(161, 98, 7, 0.22)' },
  crab:       { bg: 'linear-gradient(135deg, #FEE2E2 0%, #FCA5A5 100%)', border: '#F87171', shadow: 'rgba(220, 38, 38, 0.22)' },
  octopus:    { bg: 'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)', border: '#F472B6', shadow: 'rgba(219, 39, 119, 0.22)' },
  butterfly:  { bg: 'linear-gradient(135deg, #FDF4FF 0%, #FAE8FF 100%)', border: '#F0ABFC', shadow: 'rgba(192, 38, 211, 0.22)' },
  bee:        { bg: 'linear-gradient(135deg, #FEF9C3 0%, #FEF08A 100%)', border: '#FDE047', shadow: 'rgba(202, 138, 4, 0.22)' },
  kangaroo:   { bg: 'linear-gradient(135deg, #FFEDD5 0%, #FED7AA 100%)', border: '#FDBA74', shadow: 'rgba(234, 88, 12, 0.22)' },
  koala:      { bg: 'linear-gradient(135deg, #F1F5F9 0%, #CBD5E1 100%)', border: '#94A3B8', shadow: 'rgba(100, 116, 139, 0.2)' },
  platypus:   { bg: 'linear-gradient(135deg, #ECFEFF 0%, #A5F3FC 100%)', border: '#67E8F9', shadow: 'rgba(8, 145, 178, 0.2)' },
  beaver:     { bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', border: '#FCD34D', shadow: 'rgba(217, 119, 6, 0.22)' },
  otter:      { bg: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)', border: '#7DD3FC', shadow: 'rgba(2, 132, 199, 0.22)' },
  chimp:      { bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', border: '#FCD34D', shadow: 'rgba(217, 119, 6, 0.22)' },
  bat:        { bg: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)', border: '#C4B5FD', shadow: 'rgba(124, 58, 237, 0.22)' },
  wolf:       { bg: 'linear-gradient(135deg, #F1F5F9 0%, #CBD5E1 100%)', border: '#94A3B8', shadow: 'rgba(100, 116, 139, 0.2)' },
  polar_bear: { bg: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)', border: '#CBD5E1', shadow: 'rgba(148, 163, 184, 0.2)' },
};

/**
 * 🐾 Cute Pastel Animal Avatar Badge Component
 * Soft, squishy, charming presentation with delightful micro-shadows.
 */
export function AnimalAvatar({ id, size = 32, className = '', style = {} }) {
  const emoji = ANIMAL_EMOJI_MAP[id] || '🐾';
  const palette = CUTE_PASTEL_PALETTES[id] || {
    bg: 'linear-gradient(135deg, #EAF5E3 0%, #D4EDC9 100%)',
    border: '#A3D995',
    shadow: 'rgba(110, 168, 78, 0.25)',
  };

  const fontSize = Math.round(size * 0.62);
  const borderRadius = size > 46 ? '20px' : size > 30 ? '14px' : '10px';

  return (
    <div
      className={`cute-animal-avatar ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius,
        background: palette.bg,
        border: `2px solid ${palette.border}`,
        boxShadow: `0 3px 10px ${palette.shadow}, inset 0 1.5px 1.5px rgba(255, 255, 255, 0.85)`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        userSelect: 'none',
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        ...style,
      }}
      title={id}
    >
      <span
        style={{
          transform: 'translateY(-1px)',
          filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.12))',
        }}
      >
        {emoji}
      </span>
    </div>
  );
}

export const AnimalSVG = AnimalAvatar;
export default AnimalAvatar;
