import React from 'react';
import { TRAIT_MAP, TRAIT_COLORS, ANIMAL_RARITIES, ALL_ANIMALS_DATA } from '../utils/traits';
import { TraitIcon, UIIcon } from '../assets/natureIcons';
import { AnimalAvatar } from '../assets/animalIllustrations';

const CUTE_EMOTES = ['🎉', '💖', '🐾', '🦁', '✨', '👏'];

export default function HandDock({
  hand = [],
  selectedCardId,
  isMyTurn = true,
  onSelectCard,
  onDiscardSingle,
  onDiscardSelectedOrFirst,
  onSendEmote,
}) {
  const handleDiscardDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDiscardDragEnter = (e) => {
    e.currentTarget.classList.add('drag-over');
  };

  const handleDiscardDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const animalId = e.dataTransfer.getData('text/plain');
    if (animalId) {
      onDiscardSingle(animalId);
    } else if (selectedCardId) {
      onDiscardSingle(selectedCardId);
    }
  };

  return (
    <div className={`cute-hand-dock ${isMyTurn ? 'my-turn-active' : 'waiting-turn'}`}>
      <div className="cute-hand-header">
        <div className="cute-turn-guide">
          {isMyTurn ? (
            <>
              <span className="cute-turn-star">🌟</span>
              <span className="cute-turn-bold">ถึงตาของคุณแล้ว!</span>
              <span className="cute-turn-sub">(แตะเลือกการ์ด หรือลากไปวางในช่องเควสต์)</span>
            </>
          ) : (
            <>
              <span className="cute-turn-hourglass">⏳</span>
              <span className="cute-turn-muted">รอตาของผู้เล่นอื่น...</span>
              <span className="cute-turn-sub">(การ์ดจะขยายเมื่อถึงตาคุณ)</span>
            </>
          )}
        </div>

        {/* Cute Emotes */}
        <div className="cute-emotes-bar">
          {CUTE_EMOTES.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className="cute-emote-pill-btn"
              onClick={() => onSendEmote && onSendEmote(emoji)}
              title={`ส่งอีโมจิ ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="cute-hand-cards-row">
        <div id="playerHandScroll" className="cute-cards-scroll-list">
          {hand.length > 0 ? (
            hand.map((animal, idx) => {
              const isSelected = animal.id === selectedCardId;
              const animalInfo = ALL_ANIMALS_DATA.find((a) => a.id === animal.id);
              const rarity = animalInfo?.rarity || 'common';
              const rData = ANIMAL_RARITIES[rarity] || ANIMAL_RARITIES.common;
              const distinctTraits = Array.from(
                new Set((animal.traits || []).map((t) => TRAIT_MAP[t] || t))
              ).slice(0, 3);

              return (
                <div
                  key={animal.id}
                  id={`handCard-${animal.id}`}
                  className={`cute-hand-card card-deal-anim ${isSelected ? 'selected' : ''}`}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                  draggable={true}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', animal.id);
                    onSelectCard(animal.id);
                  }}
                  onClick={() => onSelectCard(animal.id)}
                >
                  {/* Card Top: Rarity Pill & Discard Action */}
                  <div className="cute-card-top-bar">
                    <div
                      className="cute-rarity-pill"
                      style={{
                        color: rData.color,
                        background: rData.bg,
                        border: `1px solid ${rData.border}`,
                      }}
                    >
                      {rData.label}
                    </div>

                    {isSelected && (
                      <button
                        type="button"
                        className="cute-quick-discard"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDiscardSingle(animal.id);
                        }}
                        title="ทิ้งการ์ดใบนี้เพื่อจั่วใหม่"
                      >
                        ทิ้งใบนี้
                      </button>
                    )}
                  </div>

                  {/* Animal Vernacular Name */}
                  <div className="cute-card-name" title={animal.name}>
                    {animal.name}
                  </div>

                  {/* Cute Animal Mascot Avatar */}
                  <div className="cute-card-avatar-box">
                    <AnimalAvatar id={animal.id} size={46} />
                  </div>

                  {/* Deduplicated Trait Pills */}
                  <div className="cute-card-traits-stack">
                    {distinctTraits.map((tLabel, tIdx) => {
                      const originalKey = animal.traits.find((k) => (TRAIT_MAP[k] || k) === tLabel) || 'backbone';
                      const colors = TRAIT_COLORS[originalKey] || { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7', iconName: 'backbone' };
                      return (
                        <span
                          key={tIdx}
                          className="cute-trait-chip"
                          style={{
                            background: colors.bg,
                            color: colors.text,
                            border: `1px solid ${colors.border}`,
                          }}
                        >
                          <TraitIcon name={colors.iconName} size={9} color={colors.text} />
                          <span>{tLabel}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="cute-hand-empty">
              <span className="cute-loading-spin" />
              <span>กำลังแจกการ์ดเข้ามือ...</span>
            </div>
          )}
        </div>

        {/* Cute Discard Zone */}
        <div
          id="discardDropZone"
          className="cute-discard-zone"
          onClick={onDiscardSelectedOrFirst}
          onDragOver={handleDiscardDragOver}
          onDragEnter={handleDiscardDragEnter}
          onDragLeave={handleDiscardDragLeave}
          onDrop={handleDrop}
          title="แตะหรือลากการ์ดมาที่นี่เพื่อทิ้งและจั่วใบใหม่"
        >
          <div className="cute-discard-icon-frame">
            <UIIcon name="recycle" size={18} color="#EA580C" />
          </div>
          <span className="cute-discard-main">ทิ้งการ์ด</span>
          <span className="cute-discard-sub">(จั่วใหม่)</span>
        </div>
      </div>
    </div>
  );
}
