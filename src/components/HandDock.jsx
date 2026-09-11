import React, { useState, useRef } from 'react';
import { PHYLA_MAP, isTraitCompatible } from '../utils/traits';
import { UIIcon } from '../assets/natureIcons';

const CUTE_EMOTES = ['🎉', '💖', '🐾', '🦁', '✨', '👏'];

export default function HandDock({
  hand = [],
  selectedCardId,
  isMyTurn = true,
  centerCategories = [],
  onSelectCard,
  onInspectCard,
  onPlaySpecialCard,
  onDiscardSingle,
  onDiscardSelectedOrFirst,
  onDropCardOnSlot,
  onSendEmote,
}) {
  const ghostRef = useRef(null);

  const [dragInfo, setDragInfo] = useState({
    pointerId: null,
    targetEl: null,
    cardId: null,
    cardImg: '',
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isDragging: false,
    hasMoved: false,
  });

  const dragRef = useRef(dragInfo);
  dragRef.current = dragInfo;

  const handlePointerDown = (e, card) => {
    if (e.target.closest('button')) return;

    const cardIdKey = card.cardInstanceId || card.id;
    const cardImg = card.image || card.origImage || '/cards/animals/animal_01.png';

    setDragInfo({
      pointerId: e.pointerId,
      targetEl: e.currentTarget,
      cardId: cardIdKey,
      cardImg,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      isDragging: false,
      hasMoved: false,
    });
  };

  const handlePointerMove = (e) => {
    const cur = dragRef.current;
    if (!cur.pointerId || cur.pointerId !== e.pointerId) return;

    const dist = Math.hypot(e.clientX - cur.startX, e.clientY - cur.startY);
    const clampedX = Math.max(42, Math.min(e.clientX, window.innerWidth - 42));
    const clampedY = Math.max(60, Math.min(e.clientY, window.innerHeight - 60));

    cur.currentX = clampedX;
    cur.currentY = clampedY;

    if (dist > 6 && !cur.isDragging) {
      cur.isDragging = true;
      cur.hasMoved = true;
      try {
        cur.targetEl.setPointerCapture(e.pointerId);
      } catch (err) {}
      setDragInfo((prev) => ({
        ...prev,
        isDragging: true,
        hasMoved: true,
        currentX: clampedX,
        currentY: clampedY,
      }));
    } else if (cur.isDragging) {
      // Direct GPU transform update without React re-render: 120fps zero-lag!
      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate3d(${clampedX - 42}px, ${clampedY - 60}px, 0)`;
      }
    }
  };

  const handlePointerUp = (e) => {
    const cur = dragRef.current;
    if (!cur.pointerId || cur.pointerId !== e.pointerId) return;

    if (cur.isDragging) {
      // Use clamped coords for hit-testing so it works consistently with ghost position
      const dropX = Math.max(0, Math.min(e.clientX, window.innerWidth - 1));
      const dropY = Math.max(0, Math.min(e.clientY, window.innerHeight - 1));

      const elUnder = document.elementFromPoint(dropX, dropY);
      const slotEl = elUnder?.closest('.real-slot-zone');
      const discardEl = elUnder?.closest('#discardZone');

      if (slotEl) {
        const centerIdx = parseInt(slotEl.getAttribute('data-center-idx'), 10);
        const slotIdx = parseInt(slotEl.getAttribute('data-slot-idx'), 10);
        if (!isNaN(centerIdx) && !isNaN(slotIdx) && onDropCardOnSlot) {
          try { navigator?.vibrate?.(15); } catch (err) {}
          onDropCardOnSlot(centerIdx, slotIdx, cur.cardId);
        }
      } else if (discardEl && onDiscardSingle) {
        try { navigator?.vibrate?.(10); } catch (err) {}
        onDiscardSingle(cur.cardId);
      }
    } else if (!cur.hasMoved) {
      try { navigator?.vibrate?.(10); } catch (err) {}
      onSelectCard(cur.cardId);
    }

    try {
      cur.targetEl.releasePointerCapture(e.pointerId);
    } catch (err) {}

    setDragInfo({
      pointerId: null,
      targetEl: null,
      cardId: null,
      cardImg: '',
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      isDragging: false,
      hasMoved: false,
    });
  };

  const handlePointerCancel = (e) => {
    handlePointerUp(e);
  };

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
    if (cardId && onDiscardSingle) {
      onDiscardSingle(cardId);
    } else if (selectedCardId && onDiscardSingle) {
      onDiscardSingle(selectedCardId);
    }
  };

  const selectedCard = hand.find(
    (c) => (c.cardInstanceId && c.cardInstanceId === selectedCardId) || c.id === selectedCardId
  );

  const matchingQuestNums = [];
  if (selectedCard && centerCategories && selectedCard.cardType !== 'special') {
    centerCategories.forEach((catItem, idx) => {
      if (!catItem?.category?.slots) return;
      const hasMatch = catItem.category.slots.some((s, sIdx) => {
        if (catItem.filledSlots[sIdx] !== null) return false;
        const req = typeof s === 'object' ? s.requiredTrait : s;
        return isTraitCompatible(selectedCard, req);
      });
      if (hasMatch) matchingQuestNums.push(idx + 1);
    });
  }

  return (
    <div className={`cute-hand-dock ${isMyTurn ? 'my-turn-active' : 'waiting-turn'} ${selectedCard ? 'has-active-card' : ''}`}>
      {/* 🌟 Floating Active Card Info Ribbon for Crystal Clear Reading on Phone/Tablet */}
      {selectedCard && (
        <div className="cute-active-card-ribbon animate-slide-up">
          <div className="active-ribbon-left">
            <img
              src={selectedCard.image || selectedCard.origImage || '/cards/animals/animal_01.png'}
              alt={selectedCard.name}
              className="active-ribbon-thumb"
            />
            <div className="active-ribbon-text">
              <div className="active-ribbon-title-row">
                <strong className="active-ribbon-name">{selectedCard.name || selectedCard.title}</strong>
                {selectedCard.phylum && (
                  <span className="active-ribbon-phylum">
                    {PHYLA_MAP[selectedCard.phylum] || selectedCard.phylum}
                  </span>
                )}
              </div>
              <div className="active-ribbon-match-hint">
                {selectedCard.cardType === 'special' ? (
                  <span className="match-special-hint">✨ การ์ดเวทมนตร์พิเศษ</span>
                ) : matchingQuestNums.length > 0 ? (
                  <span className="match-success-hint">
                    ✨ ตรงกับภารกิจ #{matchingQuestNums.join(', #')} (แตะช่องบนกระดานเพื่อวาง)
                  </span>
                ) : (
                  <span className="match-none-hint">
                    ยังไม่มีช่องบนกระดานที่ตรงกับการ์ดใบนี้
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="active-ribbon-actions">
            {onInspectCard && (
              <button
                type="button"
                className="btn-ribbon-action btn-ribbon-zoom"
                onClick={() => onInspectCard(selectedCard)}
                title="กดดูใบใหญ่และลักษณะเด่น"
              >
                🔍 ดูใบเต็ม
              </button>
            )}
            {onDiscardSingle && isMyTurn && (
              <button
                type="button"
                className="btn-ribbon-action btn-ribbon-discard"
                onClick={() => onDiscardSingle(selectedCard.cardInstanceId || selectedCard.id)}
                title="ทิ้งการ์ดใบนี้เพื่อจั่วใหม่"
              >
                ✕ ทิ้ง
              </button>
            )}
          </div>
        </div>
      )}

      <div className="cute-hand-header">
        <div className="cute-turn-guide">
          {isMyTurn ? (
            <>
              <span className="cute-turn-star">🌟</span>
              <span className="cute-turn-bold">ถึงตาคุณแล้ว!</span>
              <span className="cute-turn-sub">(แตะเลือกการ์ด หรือลากไปวางในช่องคำถาม)</span>
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
            hand.map((card) => {
              const cardIdKey = card.cardInstanceId || card.id;
              const isSelected = cardIdKey === selectedCardId;
              const isSpecial = card.cardType === 'special';
              const cardImg = card.image || card.origImage || '/cards/animals/animal_01.png';

              return (
                <div
                  key={cardIdKey}
                  id={`handCard-${cardIdKey}`}
                  className={`vertical-hand-card ${isSpecial ? 'special-foil' : ''} ${isSelected ? 'is-selected' : ''}`}
                  style={{ touchAction: 'none' }}
                  draggable={true}
                  onPointerDown={(e) => handlePointerDown(e, card)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', cardIdKey);
                    onSelectCard(cardIdKey);
                  }}
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

                  {/* Special Action Card Trigger Button */}
                  {isSpecial && card.actionType !== 'wildcard' && (isMyTurn || card.actionType === 'shield') && (
                    <button
                      type="button"
                      className={`btn-use-special-floating ${card.actionType === 'shield' ? 'btn-shield-special' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onPlaySpecialCard) onPlaySpecialCard(cardIdKey);
                      }}
                      title={card.actionType === 'shield' ? 'กดกางโล่ปูป้องกันการโจมตีได้ทันที!' : 'กดใช้ความสามารถการ์ดพิเศษใบนี้ทันที'}
                    >
                      {card.actionType === 'shield' ? '🛡️ กางโล่ปู' : '✨ ใช้การ์ด'}
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

      {/* Floating Pointer Drag Ghost Card */}
      {dragInfo.isDragging && (
        <div
          ref={ghostRef}
          className="drag-ghost-card"
          style={{
            transform: `translate3d(${dragInfo.currentX - 42}px, ${dragInfo.currentY - 60}px, 0)`,
          }}
        >
          <img src={dragInfo.cardImg} alt="Dragging Ghost" />
        </div>
      )}
    </div>
  );
}

