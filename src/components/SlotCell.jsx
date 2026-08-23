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
    bg: '#E8F5E9',
    text: '#2E7D32',
    border: '#A5D6A7',
    iconName: 'backbone'
  };
  const slotItemClass = `cute-slot-${slotIdx}`;

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
        className={`cute-slot-cell empty-slot ${slotItemClass} ${canDrop ? 'droppable' : ''}`}
        data-center-idx={centerIdx}
        data-slot-idx={slotIdx}
        onClick={() => onSlotClick(centerIdx, slotIdx)}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="cute-slot-trait-label">
          <div className="cute-slot-icon-box" style={{ background: traitColor.bg, borderColor: traitColor.border }}>
            <TraitIcon name={traitColor.iconName} size={13} color={traitColor.text} />
          </div>
          <span className="cute-trait-name">{traitLabel}</span>
        </div>

        {canDrop && (
          <span className="cute-droppable-pill">
            <UIIcon name="check" size={10} color="#ffffff" />
            <span>วางตรงนี้</span>
          </span>
        )}
      </div>
    );
  }

  // Filled Slot Cell
  return (
    <div className={`cute-slot-cell filled-slot ${slotItemClass}`}>
      <div className="cute-filled-left">
        <AnimalAvatar id={slotData.animalCard?.id} size={22} />
        <span className="cute-filled-name">{slotData.animalCard?.name}</span>
      </div>

      <div className="cute-filled-right">
        <span
          className="cute-filled-trait-tag"
          style={{
            background: traitColor.bg,
            color: traitColor.text,
            border: `1px solid ${traitColor.border}`,
          }}
        >
          <TraitIcon name={traitColor.iconName} size={10} color={traitColor.text} />
          <span>{traitLabel}</span>
        </span>
        <span className="cute-filled-player-tag">
          {slotData.playerName}
        </span>
      </div>
    </div>
  );
}
