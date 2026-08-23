import React from 'react';
import { TRAIT_MAP, TRAIT_COLORS } from '../utils/traits';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { TraitIcon, UIIcon } from '../assets/natureIcons';

export default function SlotCell({
  centerIdx,
  slotIdx,
  slotData,
  requiredTrait,
  isCompatible,
  isMyTurn,
  onSlotClick,
  onDropCard,
}) {
  const traitLabel = TRAIT_MAP[requiredTrait] || requiredTrait;
  const traitColor = TRAIT_COLORS[requiredTrait] || {
    bg: '#e8f5e9',
    text: '#2e7d32',
    border: '#a5d6a7',
    iconName: 'backbone'
  };
  const slotItemClass = `slot-item-${slotIdx}`;

  if (slotData === null) {
    const canDrop = isMyTurn && isCompatible;

    const handleDragOver = (e) => {
      if (canDrop) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      }
    };

    const handleDragEnter = (e) => {
      if (canDrop) e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
      e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.currentTarget.classList.remove('drag-over');
      const animalId = e.dataTransfer.getData('text/plain');
      if (animalId && onDropCard) {
        onDropCard(centerIdx, slotIdx, animalId);
      }
    };

    return (
      <div
        id={`slot-${centerIdx}-${slotIdx}`}
        className={`tcg-slot-cell empty-slot ${slotItemClass} ${canDrop ? 'droppable' : ''}`}
        data-center-idx={centerIdx}
        data-slot-idx={slotIdx}
        onClick={() => onSlotClick(centerIdx, slotIdx)}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <span
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '11px',
            fontWeight: 700,
            color: canDrop ? 'var(--pine-green-dark)' : 'var(--ink-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <TraitIcon name={traitColor.iconName} size={14} color={canDrop ? 'var(--pine-green)' : 'var(--ink-secondary)'} />
          <span>{traitLabel}</span>
        </span>
        {canDrop && (
          <span
            style={{
              fontSize: '9.5px',
              background: 'linear-gradient(135deg, #275220, #386b2e)',
              color: '#ffffff',
              padding: '2px 7px',
              borderRadius: 'var(--r-pill)',
              fontWeight: 800,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              boxShadow: '0 2px 6px rgba(45, 106, 79, 0.4)',
            }}
          >
            <UIIcon name="check" size={10} color="#ffffff" />
            <span>วางที่นี่</span>
          </span>
        )}
      </div>
    );
  }

  // Filled Slot Cell
  return (
    <div className={`tcg-slot-cell filled-slot ${slotItemClass}`}>
      <div className="mini-card-left">
        <AnimalAvatar id={slotData.animalCard?.id} size={24} showArt={true} />
        <span className="mini-card-name">{slotData.animalCard?.name}</span>
      </div>
      <div className="mini-card-right">
        <span
          className="mini-trait-chip"
          style={{
            background: traitColor.bg,
            color: traitColor.text,
            border: `1px solid ${traitColor.border}`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <TraitIcon name={traitColor.iconName} size={10} color={traitColor.text} />
          <span>{traitLabel}</span>
        </span>
        <span className="mini-player-tag">
          {slotData.playerName}
        </span>
      </div>
    </div>
  );
}
