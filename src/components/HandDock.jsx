import React from 'react';
import { TRAIT_MAP, TRAIT_COLORS, ANIMAL_RARITIES, ALL_ANIMALS_DATA } from '../utils/traits';
import { TraitIcon, UIIcon } from '../assets/natureIcons';
import { AnimalAvatar } from '../assets/animalIllustrations';

const EMOTES = ['🎉', '🔥', '😎', '🐾', '💡', '👏'];

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
    <div className={`bottom-hand-dock ${isMyTurn ? 'my-turn-active' : 'waiting-turn'}`}>
      <div className="hand-top-header">
        <div className="hand-guide-text">
          {isMyTurn ? (
            <>
              <span className="turn-indicator-star">🌟</span>
              <span style={{ color: '#ffffff', fontWeight: 800 }}>ถึงตาของคุณแล้ว!</span>
              <span className="hand-guide-subtext">(แตะเลือกการ์ด หรือลากไปวางในช่องเควสต์)</span>
            </>
          ) : (
            <>
              <span className="turn-indicator-hourglass">⏳</span>
              <span style={{ color: '#cbd5e1', fontWeight: 700 }}>รอเทิร์นของผู้เล่นอื่น...</span>
              <span className="hand-guide-subtext">(การ์ดจะขยายเต็มจอเมื่อถึงตาคุณ)</span>
            </>
          )}
        </div>

        {/* Emotes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {EMOTES.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onSendEmote && onSendEmote(emoji)}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: 'var(--r-pill)',
                padding: '2px 7px',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              title={`ส่งอีโมจิ ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="hand-dock-content-row">
        <div id="playerHandScroll" className="hand-cards-list">
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
                  className={`animal-card card-deal-anim ${isSelected ? 'selected' : ''}`}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                  draggable={true}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', animal.id);
                    onSelectCard(animal.id);
                  }}
                  onClick={() => onSelectCard(animal.id)}
                >
                  {/* Card Top: Rarity Pill & Discard Action */}
                  <div className="animal-card-header">
                    <div
                      className="card-rarity-pill"
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
                        className="card-quick-discard-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDiscardSingle(animal.id);
                        }}
                        title="ทิ้งการ์ดใบนี้เพื่อจั่วใบใหม่"
                      >
                        ทิ้งใบนี้
                      </button>
                    )}
                  </div>

                  {/* Animal Name */}
                  <div className="animal-card-name" title={animal.name}>
                    {animal.name}
                  </div>

                  {/* Animal 3D High-Production Digital Artwork Frame */}
                  <div className="animal-card-avatar-frame">
                    <AnimalAvatar id={animal.id} size={50} showArt={true} />
                  </div>

                  {/* Trait Pills */}
                  <div className="a-traits-wrap">
                    {distinctTraits.map((tLabel, tIdx) => {
                      const originalKey = animal.traits.find((k) => (TRAIT_MAP[k] || k) === tLabel) || 'backbone';
                      const colors = TRAIT_COLORS[originalKey] || { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7', iconName: 'backbone' };
                      return (
                        <span
                          key={tIdx}
                          className="trait-pill"
                          style={{
                            background: colors.bg,
                            color: colors.text,
                            border: `1px solid ${colors.border}`,
                          }}
                        >
                          <TraitIcon name={colors.iconName} size={10} color={colors.text} />
                          <span>{tLabel}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="hand-empty-loading">
              <span className="loading-spinner" />
              <span>กำลังแจกการ์ดเข้ามือ...</span>
            </div>
          )}
        </div>

        {/* Discard Target Box */}
        <div
          id="discardDropZone"
          className="discard-drop-zone"
          onClick={onDiscardSelectedOrFirst}
          onDragOver={handleDiscardDragOver}
          onDragEnter={handleDiscardDragEnter}
          onDragLeave={handleDiscardDragLeave}
          onDrop={handleDrop}
          title="แตะหรือลากการ์ดมาที่นี่เพื่อทิ้งและจั่วใบใหม่"
        >
          <div className="discard-icon-frame">
            <UIIcon name="recycle" size={20} color="var(--terracotta)" />
          </div>
          <span className="discard-main-text">ทิ้งการ์ด</span>
          <span className="discard-sub-text">(จั่วใบใหม่)</span>
        </div>
      </div>
    </div>
  );
}
