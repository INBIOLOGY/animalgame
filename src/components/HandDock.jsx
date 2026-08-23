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

  const handleDiscardDrop = (e) => {
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
              <span style={{ color: 'var(--forest-primary)', fontWeight: 800 }}>ถึงตาของคุณแล้ว!</span>
              <span className="hand-guide-subtext">(แตะเลือกการ์ด หรือลากไปวางในช่อง)</span>
            </>
          ) : (
            <>
              <span className="turn-indicator-hourglass">⏳</span>
              <span style={{ color: 'var(--ink-muted)', fontWeight: 700 }}>รอเทิร์นของผู้เล่นอื่น...</span>
              <span className="hand-guide-subtext">(การ์ดจะขยายเมื่อถึงตาคุณ)</span>
            </>
          )}
        </div>

        {/* Emotes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {EMOTES.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onSendEmote && onSendEmote(emoji)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--r-pill)',
                padding: '2px 6px',
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
            hand.map((animal) => {
              const isSelected = animal.id === selectedCardId;
              const animalInfo = ALL_ANIMALS_DATA.find((a) => a.id === animal.id);
              const rarity = animalInfo?.rarity || 'common';
              const rData = ANIMAL_RARITIES[rarity] || ANIMAL_RARITIES.common;

              return (
                <div
                  key={animal.id}
                  id={`handCard-${animal.id}`}
                  className={`animal-card ${isSelected ? 'selected' : ''}`}
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

                  {/* Animal 3D Avatar Artwork Frame */}
                  <div className="animal-card-avatar-frame">
                    <AnimalAvatar id={animal.id} size={48} />
                  </div>

                  {/* Trait Pills */}
                  <div className="a-traits-wrap">
                    {animal.traits.slice(0, 3).map((t) => {
                      const colors = TRAIT_COLORS[t] || { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7', iconName: 'backbone' };
                      return (
                        <span
                          key={t}
                          className="trait-pill"
                          style={{
                            background: colors.bg,
                            color: colors.text,
                            border: `1px solid ${colors.border}`,
                          }}
                        >
                          <TraitIcon name={colors.iconName} size={10} color={colors.text} />
                          <span>{TRAIT_MAP[t]?.replace(/^[^a-zA-Z0-9\u0E00-\u0E7F]+\s*/, '')}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="hand-empty-loading">
              <span>กำลังแจกการ์ดเข้ามือ...</span>
            </div>
          )}
        </div>

        {/* Discard & Draw Deck Box */}
        <div
          id="discardDropZone"
          className="discard-drop-zone"
          onClick={onDiscardSelectedOrFirst}
          onDragOver={handleDiscardDragOver}
          onDragEnter={handleDiscardDragEnter}
          onDragLeave={handleDiscardDragLeave}
          onDrop={handleDiscardDrop}
          title="แตะหรือลากการ์ดมาวางที่นี่เพื่อทิ้งและจั่วใบใหม่"
        >
          <div className="discard-icon-frame">
            <UIIcon name="recycle" size={24} color="#ea580c" />
          </div>
          <span className="discard-title">จั่วเปลี่ยนใบ</span>
          <span className="discard-subtext">(แตะ/ลากมาทิ้ง)</span>
        </div>
      </div>
    </div>
  );
}
