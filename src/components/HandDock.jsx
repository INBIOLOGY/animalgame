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
              const cardIdKey = card.cardInstanceId || card.id;
              const isSelected = cardIdKey === selectedCardId;
              const isSpecial = card.cardType === 'special';
              const cardImg = card.image || card.origImage || '/cards/animals/animal_01.png';

              return (
                <div
                  key={cardIdKey}
                  id={`handCard-${cardIdKey}`}
                  className={`hand-card-wrap ${isSpecial ? 'has-special' : ''} ${isSelected ? 'wrap-selected' : ''}`}
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  {/* The actual card — overflow hidden, no button inside */}
                  <div
                    className={`vertical-hand-card card-deal-anim ${isSpecial ? 'special-foil' : ''} ${isSelected ? 'is-selected' : ''}`}
                    draggable={true}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', cardIdKey);
                      onSelectCard(cardIdKey);
                    }}
                    onClick={() => onSelectCard(cardIdKey)}
                  >
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
                          onDiscardSingle(cardIdKey);
                        }}
                        title="ทิ้งการ์ดใบนี้เพื่อจั่วใหม่"
                      >
                        ✕ ทิ้งใบนี้
                      </button>
                    )}
                  </div>

                  {/* Special Action Button — sibling BELOW the card, NOT inside it */}
                  {isSpecial && card.actionType !== 'wildcard' && isMyTurn && (
                    <button
                      type="button"
                      className="btn-use-special-floating"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onPlaySpecialCard) onPlaySpecialCard(cardIdKey);
                      }}
                      title="กดใช้ความสามารถการ์ดพิเศษใบนี้ทันที"
                    >
                      ✨ ใช้
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

        {/* Realistic Vertical Discard Bin */}
        <div
          id="discardZone"
          className="vertical-discard-card"
          onDragOver={handleDiscardDragOver}
          onDragEnter={handleDiscardDragEnter}
          onDragLeave={handleDiscardDragLeave}
          onDrop={handleDrop}
          onClick={onDiscardSelectedOrFirst}
          title="ลากการ์ดมาวางที่นี่ หรือคลิกเพื่อทิ้งการ์ดที่เลือกแล้วจั่วใบใหม่"
        >
          <div className="cute-discard-icon-frame">
            <UIIcon name="recycle" size={16} color="var(--terracotta-primary)" />
          </div>
          <span className="cute-discard-main">ทิ้งการ์ด</span>
          <span className="cute-discard-sub">(จั่วใหม่)</span>
        </div>
      </div>
    </div>
  );
}
