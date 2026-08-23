import React from 'react';
import SlotCell from './SlotCell';
import { UIIcon } from '../assets/natureIcons';
import { isTraitCompatible } from '../utils/traits';

export default function QuestCard({
  centerIdx,
  categoryItem,
  activeAnimal,
  isMyTurn,
  onSlotClick,
  onDropCard,
}) {
  if (!categoryItem || !categoryItem.category) {
    return (
      <div className="cute-quest-card empty-cat">
        <UIIcon name="trophy" size={24} color="var(--warm-gold-dark)" />
        <span style={{ color: 'var(--ink-secondary)', fontWeight: 800, marginTop: '4px' }}>
          ✨ พิชิตหมวดนี้แล้ว
        </span>
      </div>
    );
  }

  const cat = categoryItem.category;
  const numSlots = cat.slots.length;
  const layoutClass = `layout-${numSlots}`;

  return (
    <div id={`catCard-${centerIdx}`} className="cute-quest-card">
      <div className="cute-card-header">
        <div className="cute-quest-title-wrap">
          <span className="cute-quest-num">หมวด #{centerIdx + 1}</span>
          <span className="cute-card-title">{cat.title}</span>
        </div>
        <span className="cute-card-pts">
          ⭐ +{cat.points} แต้ม
        </span>
      </div>

      <div className={`cute-slots-layout ${layoutClass}`}>
        {categoryItem.filledSlots.map((slotData, slotIdx) => {
          const requiredTrait = cat.slots[slotIdx];
          const isCompatible = activeAnimal && isTraitCompatible(activeAnimal.traits, requiredTrait);

          return (
            <SlotCell
              key={slotIdx}
              centerIdx={centerIdx}
              slotIdx={slotIdx}
              slotData={slotData}
              requiredTrait={requiredTrait}
              isCompatible={isCompatible}
              isMyTurn={isMyTurn}
              onSlotClick={onSlotClick}
              onDropCard={onDropCard}
            />
          );
        })}
      </div>
    </div>
  );
}
