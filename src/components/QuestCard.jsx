import React from 'react';
import SlotCell from './SlotCell';
import { UIIcon } from '../assets/natureIcons';
import { isTraitCompatible } from '../utils/traits';

export default function QuestCard({
  centerIdx,
  categoryItem,
  activeAnimal,
  myHand = [],
  isMyTurn,
  showDropHints = true,
  onSlotClick,
  onDropCard,
}) {
  if (!categoryItem || !categoryItem.category) {
    return (
      <div className="vertical-quest-card conquered-state">
        <div className="conquered-badge-box">
          <UIIcon name="trophy" size={28} color="#FBBF24" />
          <span className="conquered-text">พิชิตแล้ว!</span>
        </div>
      </div>
    );
  }

  const cat = categoryItem.category;
  const layout = cat.layout || (cat.slots?.length === 3 ? 'three_slots' : 'two_slots');
  const questionImg = cat.image || (cat.id ? `/cards/questions/${cat.id}.png` : `/cards/questions/q_01.png`);

  return (
    <div id={`catCard-${centerIdx}`} className={`vertical-quest-card layout-${layout}`}>
      {/* Top Header Floating Badge */}
      <div className="quest-card-top-pill">
        <span className="quest-pill-idx">#{centerIdx + 1}</span>
        <span className="quest-pill-pts">+{cat.points || 20}★</span>
      </div>

      {/* Real Full-Sized Question Card Artwork */}
      <div className="quest-card-art-wrap">
        <img
          src={questionImg}
          alt={cat.title || 'Question Card'}
          className="quest-card-full-img"
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />

        {/* Fallback Question Header (always present underneath in case of network lag) */}
        <div className="quest-card-fallback-header">
          <span className="quest-card-fallback-title">{cat.title || 'คำถามชีววิทยา'}</span>
        </div>

        {/* Overlay Interactive Drop Slots */}
        <div className={`quest-overlay-slots layout-${layout}`}>
          {categoryItem.filledSlots.map((slotData, slotIdx) => {
            const slotConfig = cat.slots[slotIdx];
            const requiredTrait = typeof slotConfig === 'object' ? slotConfig.requiredTrait : slotConfig;
            const isCompatible = activeAnimal && isTraitCompatible(activeAnimal, requiredTrait);
            const hasMatchingInHand = !activeAnimal && isMyTurn && myHand.some((c) => isTraitCompatible(c, requiredTrait));

            return (
              <SlotCell
                key={slotIdx}
                centerIdx={centerIdx}
                slotIdx={slotIdx}
                slotData={slotData}
                slotConfig={slotConfig}
                isCompatible={isCompatible}
                hasMatchingInHand={hasMatchingInHand}
                isMyTurn={isMyTurn}
                showDropHints={showDropHints}
                onSlotClick={onSlotClick}
                onDropCard={onDropCard}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
