import React from 'react';
import { TRAIT_MAP } from '../utils/traits';
import { UIIcon } from '../assets/natureIcons';

export default function SlotCell({
  centerIdx,
  slotIdx,
  slotData,
  slotConfig,
  isCompatible,
  hasMatchingInHand,
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
    const canShowHighlight = isMyTurn && isCompatible && showDropHints;
    const canShowReady = isMyTurn && !isCompatible && hasMatchingInHand && showDropHints;

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    };

    const handleDragEnter = (e) => {
      e.currentTarget.classList.add('drag-over');
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
        className={`real-slot-zone empty-slot ${slotPosClass} ${canShowHighlight ? 'droppable-highlight' : ''} ${canShowReady ? 'slot-ready-hint' : ''}`}
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
        {canShowReady && (
          <div className="slot-ready-badge">
            <span>💡 มีการ์ด</span>
          </div>
        )}
      </div>
    );
  }

  // Placed Answer Card (การ์ดคำตอบที่วางทับบนการ์ดคำถาม - แสดงรูปสัตว์เต็มใบ 100% ไม่โดนชื่อบัง)
  const animalCard = slotData.animalCard;
  const isBot = slotData.isBot;
  const cardImg = animalCard?.image || animalCard?.origImage || '/cards/animals/animal_01.png';

  return (
    <div
      id={`slot-${centerIdx}-${slotIdx}`}
      className={`real-slot-zone filled-slot ${slotPosClass}`}
      title={`${animalCard?.name || 'การ์ด'} (วางโดย: ${slotData.playerName})`}
    >
      <div className="stacked-mini-card animate-slam-down">
        {/* รูปการ์ดสัตว์เต็มใบ ชัดเจน 100% ไม่ถูกบัง */}
        <img
          src={cardImg}
          alt={animalCard?.name || 'Placed Card'}
          className="stacked-mini-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/cards/specials/special_fit_free.png';
          }}
        />

        {/* ตราประทับมุมการ์ดขนาดกะทัดรัด บอกว่าใครเป็นคนวาง โดยไม่บังรูปสัตว์ */}
        <div
          className={`stacked-corner-seal ${isBot ? 'seal-bot' : 'seal-player'}`}
          title={`วางโดย: ${slotData.playerName}`}
        >
          <span className="seal-icon">{isBot ? '🤖' : '✓'}</span>
        </div>

        {/* ขอบทองเรืองแสงด้านล่าง */}
        <div className="stacked-card-glass-edge" />
      </div>
    </div>
  );
}
