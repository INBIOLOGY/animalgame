import React from 'react';
import { TRAIT_MAP } from '../utils/traits';
import { UIIcon } from '../assets/natureIcons';

export default function SlotCell({
  centerIdx,
  slotIdx,
  slotData,
  slotConfig,
  isCompatible,
  isMyTurn,
  showDropHints = true,
  onSlotClick,
  onDropCard,
}) {
  const reqTraitKey = typeof slotConfig === 'object' ? slotConfig.requiredTrait : slotConfig;
  const slotName = typeof slotConfig === 'object' ? slotConfig.name : (TRAIT_MAP[reqTraitKey] || reqTraitKey);
  const position = typeof slotConfig === 'object' ? slotConfig.position : (slotIdx === 0 ? 'top' : 'bottom');

  const slotPosClass = `slot-pos-${position}`;

  if (slotData === null) {
    const canDrop = isMyTurn && isCompatible;
    const canShowHighlight = canDrop && showDropHints;

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
        className={`real-slot-zone empty-slot ${slotPosClass} ${canShowHighlight ? 'droppable-highlight' : ''}`}
        data-center-idx={centerIdx}
        data-slot-idx={slotIdx}
        onClick={() => onSlotClick(centerIdx, slotIdx)}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        title={slotName}
      >
        {canShowHighlight && (
          <div className="slot-place-hint">
            <UIIcon name="check" size={12} color="#ffffff" />
            <span>วางที่นี่</span>
          </div>
        )}
      </div>
    );
  }

  // Placed Answer Card (การ์ดคำตอบที่วางทับบนการ์ดคำถามจริงๆ)
  const animalCard = slotData.animalCard;
  const isBot = slotData.isBot;
  const cardImg = animalCard?.image || animalCard?.origImage || '/cards/animals/animal_01.png';

  return (
    <div
      id={`slot-${centerIdx}-${slotIdx}`}
      className={`real-slot-zone filled-slot ${slotPosClass}`}
      title={`${animalCard?.name || 'การ์ด'} (วางโดย ${slotData.playerName})`}
    >
      <div className="stacked-mini-card animate-slam-down">
        <img
          src={cardImg}
          alt={animalCard?.name || 'Placed Card'}
          className="stacked-mini-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/cards/specials/special_fit_free.png';
          }}
        />
        <div className="stacked-card-badge">
          <span className="stacked-owner-tag" style={{ background: isBot ? '#4F46E5' : '#10B981' }}>
            {isBot ? '🤖' : '👤'} {slotData.playerName}
          </span>
        </div>
      </div>
    </div>
  );
}
