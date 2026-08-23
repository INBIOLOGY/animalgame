import React from 'react';
import { TRAIT_MAP, TRAIT_COLORS, ANIMAL_RARITIES, ALL_ANIMALS_DATA } from '../utils/traits';
import { AnimalSVG } from '../assets/animalIllustrations';
import { TraitIcon, UIIcon } from '../assets/natureIcons';

const EMOTES = ['🎉', '🔥', '😎', '🐾', '💡', '👏'];

export default function HandDock({
  hand = [],
  selectedCardId,
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
    <div className="bottom-hand-dock">
      <div className="hand-top-header">
        <div className="hand-guide-text">
          <UIIcon name="star" size={14} color="var(--warm-gold-light)" />
          <span>การ์ดในมือ</span>
          <span style={{ fontWeight: 500, color: 'var(--ink-on-dark-sub)', fontSize: '11px', marginLeft: 4 }}>
            (แตะเลือกการ์ด หรือลากไปวางในช่อง)
          </span>
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

      <div style={{ display: 'flex', gap: 10, alignItems: 'stretch', height: '126px' }}>
        <div id="playerHandScroll" className="hand-cards-list" style={{ flex: 1, minWidth: 0 }}>
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
                  {/* Quick Discard Button */}
                  {isSelected && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDiscardSingle(animal.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: 3,
                        left: 3,
                        fontSize: '9px',
                        padding: '1px 5px',
                        zIndex: 30,
                        borderRadius: 'var(--r-xs)',
                        whiteSpace: 'nowrap',
                      }}
                      title="ทิ้งการ์ดใบนี้เพื่อจั่วใบใหม่"
                    >
                      ทิ้งใบนี้
                    </button>
                  )}

                  {/* Rarity Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 3,
                      right: 3,
                      fontSize: '8px',
                      fontWeight: 800,
                      color: rData.color,
                      background: rData.bg,
                      borderRadius: 'var(--r-pill)',
                      padding: '1px 5px',
                      border: `1px solid ${rData.border}`,
                      zIndex: 10,
                      fontFamily: 'var(--font-game)',
                    }}
                  >
                    {rData.label}
                  </div>

                  {/* Animal Name */}
                  <div
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      fontFamily: 'var(--font-thai)',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: 'var(--ink-primary)',
                      marginBottom: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {animal.name}
                  </div>

                  {/* Animal Art Box */}
                  <div
                    style={{
                      width: '100%',
                      height: '48px',
                      background: '#f4ede0',
                      borderRadius: 'var(--r-sm)',
                      border: '1px solid #ded5c2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      flexShrink: 0,
                      marginBottom: '3px',
                    }}
                  >
                    <AnimalSVG id={animal.id} size={42} />
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
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
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
            <div
              style={{
                padding: 12,
                color: 'var(--ink-on-dark-sub)',
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
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
          <UIIcon name="recycle" size={22} color="#fed7aa" />
          <span style={{ fontSize: '11px', fontWeight: 800, whiteSpace: 'nowrap' }}>จั่วเปลี่ยนใบ</span>
          <span style={{ fontSize: '9px', opacity: 0.8 }}>(ลากมาทิ้ง)</span>
        </div>
      </div>
    </div>
  );
}
