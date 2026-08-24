import React from 'react';
import { UIIcon } from '../assets/natureIcons';

const CUTE_EMOTES = ['🎉', '💖', '🐾', '🦁', '✨', '👏'];

export default function HandDock({
  hand = [],
  selectedCardId,
  isMyTurn = true,
  onSelectCard,
  onPlaySpecialCard,
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
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      onDiscardSingle(cardId);
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
              <span className="cute-turn-sub">(แตะเลือกการ์ด หรือลากไปวางในช่องคำถาม หรือกดใช้การ์ดพิเศษ)</span>
            </>
          ) : (
            <>
              <span className="cute-turn-hourglass">⏳</span>
              <span className="cute-turn-muted">รอตาของผู้เล่นอื่น...</span>
            </>
          )}
        </div>

        {/* Emotes Bar */}
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
        <div id="playerHandScroll" className="hand-vertical-scroll-list">
          {hand.length > 0 ? (
            hand.map((card, idx) => {
              const isSelected = card.id === selectedCardId;
              const isSpecial = card.cardType === 'special';
              const cardImg = card.image || card.origImage || '/cards/animals/animal_01.png';

              return (
                <div
                  key={card.id}
                  id={`handCard-${card.id}`}
                  className={`vertical-hand-card card-deal-anim ${isSpecial ? 'special-foil' : ''} ${isSelected ? 'is-selected' : ''}`}
                  style={{ animationDelay: `${idx * 0.07}s` }}
                  draggable={true}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', card.id);
                    onSelectCard(card.id);
                  }}
                  onClick={() => onSelectCard(card.id)}
                >
                  {/* Full Vertical Trading Card Image */}
                  <img
                    src={cardImg}
                    alt={card.name || card.title}
                    className="hand-card-img"
                    loading="lazy"
                  />

                  {/* Top Discard Pill on Selected */}
                  {isSelected && (
                    <button
                      type="button"
                      className="card-quick-discard-tag"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDiscardSingle(card.id);
                      }}
                      title="ทิ้งการ์ดใบนี้เพื่อจั่วใหม่"
                    >
                      ✕ ทิ้งใบนี้
                    </button>
                  )}

                  {/* Special Action Card Trigger Button */}
                  {isSpecial && card.actionType !== 'wildcard' && isMyTurn && (
                    <button
                      type="button"
                      className="btn-use-special-floating"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onPlaySpecialCard) onPlaySpecialCard(card.id);
                      }}
                      title="กดใช้ความสามารถการ์ดพิเศษใบนี้ทันที"
                    >
                      ✨ ใช้ความสามารถ
                    </button>
                  )}
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

        {/* Discard Zone */}
        <div
          id="discardDropZone"
          className="vertical-discard-card"
          onClick={onDiscardSelectedOrFirst}
          onDragOver={handleDiscardDragOver}
          onDragEnter={handleDiscardDragEnter}
          onDragLeave={handleDiscardDragLeave}
          onDrop={handleDrop}
          title="แตะหรือลากการ์ดมาที่นี่เพื่อทิ้งและจั่วใบใหม่"
        >
          <div className="cute-discard-icon-frame">
            <UIIcon name="recycle" size={20} color="#EA580C" />
          </div>
          <span className="cute-discard-main">ทิ้งการ์ด</span>
          <span className="cute-discard-sub">(จั่วใหม่)</span>
        </div>
      </div>
    </div>
  );
}
