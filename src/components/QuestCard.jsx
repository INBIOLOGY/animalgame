import React from 'react';
import SlotCell from './SlotCell';
import { UIIcon } from '../assets/natureIcons';

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
      <div className="tcg-quest-card empty-cat">
        <UIIcon name="trophy" size={24} color="var(--warm-gold-dark)" />
        <span style={{ color: 'var(--ink-secondary)', fontWeight: 700, marginTop: '4px' }}>
          ✨ พิชิตหมวดนี้แล้ว
        </span>
      </div>
    );
  }

  const cat = categoryItem.category;
  const numSlots = cat.slots.length;
  const layoutClass = `layout-${numSlots}`;

  return (
    <div id={`catCard-${centerIdx}`} className="tcg-quest-card">
      <div className="tcg-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', minWidth: 0 }}>
          <span className="tcg-card-title">{cat.title}</span>
        </div>
        <span className="tcg-card-pts">
          +{cat.points} แต้ม
        </span>
      </div>
      <div className={`tcg-slots-layout ${layoutClass}`}>
        {categoryItem.filledSlots.map((slotData, slotIdx) => {
          const requiredTrait = cat.slots[slotIdx];
          const isCompatible = activeAnimal && activeAnimal.traits.includes(requiredTrait);

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
