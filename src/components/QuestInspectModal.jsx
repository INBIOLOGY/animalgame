import React from 'react';
import { TRAIT_MAP } from '../utils/traits';
import { isTraitCompatible } from '../utils/traits';

export default function QuestInspectModal({
  centerIdx,
  categoryItem,
  onClose,
  onSlotClick,
  selectedCard,
  myHand = [],
}) {
  if (!categoryItem || !categoryItem.category) return null;

  const cat = categoryItem.category;
  const layout = cat.layout || (cat.slots?.length === 3 ? 'three_slots' : 'two_slots');
  const questionImg = cat.image || (cat.id ? `/cards/questions/${cat.id}.png` : `/cards/questions/q_01.png`);
  const totalSlots = cat.slots?.length || 2;
  const filledCount = categoryItem.filledSlots.filter((s) => s !== null).length;
  const openCount = totalSlots - filledCount;

  return (
    <div className="cute-modal-backdrop page-screen-anim" onClick={onClose}>
      <div
        className="cute-inspect-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cute-inspect-header">
          <div className="cute-inspect-title-group">
            <span className="cute-inspect-tag">ภารกิจ #{centerIdx + 1}</span>
            <h3 className="cute-inspect-heading">{cat.title || 'คำถามชีววิทยา'}</h3>
          </div>
          <button
            type="button"
            className="cute-btn-close-circle"
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: 2 Columns on Tablet/Desktop, Stack on Mobile */}
        <div className="cute-inspect-body">
          {/* Card Image Preview */}
          <div className="cute-inspect-art-wrap">
            <img
              src={questionImg}
              alt={cat.title || 'Question Card'}
              className="cute-inspect-full-img"
              loading="eager"
            />
          </div>

          {/* Slots Requirements Details */}
          <div className="cute-inspect-details">
            <div className="cute-inspect-score-pill">
              <span>🏆 วางถูก +5 แต้ม</span>
              <span>⭐ ปิดครบ +{totalSlots === 2 ? 15 : 20} แต้ม</span>
              <span className="slots-left-tag">ว่าง {openCount}/{totalSlots} ช่อง</span>
            </div>

            <div className="cute-inspect-slots-list">
              {cat.slots.map((slotConfig, slotIdx) => {
                const slotData = categoryItem.filledSlots[slotIdx];
                const reqTraitKey = typeof slotConfig === 'object' ? slotConfig.requiredTrait : slotConfig;
                const slotTraitThai = typeof slotConfig === 'object' ? slotConfig.name : (TRAIT_MAP[reqTraitKey] || reqTraitKey);
                const isFilled = slotData !== null;
                const position = typeof slotConfig === 'object' ? slotConfig.position : (slotIdx === 0 ? 'ช่องบน' : 'ช่องล่าง');

                // Check if user has a matching card
                const matchingCard = selectedCard
                  ? (isTraitCompatible(selectedCard, reqTraitKey) ? selectedCard : null)
                  : myHand.find((c) => isTraitCompatible(c, reqTraitKey));

                return (
                  <div
                    key={slotIdx}
                    className={`cute-inspect-slot-item ${isFilled ? 'is-filled' : 'is-open'}`}
                  >
                    <div className="slot-item-header">
                      <span className="slot-item-pos">{position === 'top' ? 'ช่องบน' : position === 'bottom' ? 'ช่องล่าง' : position}</span>
                      {isFilled ? (
                        <span className="slot-badge-filled">✓ วางสำเร็จแล้ว</span>
                      ) : (
                        <span className="slot-badge-open">○ รอการตอบ</span>
                      )}
                    </div>

                    <div className="slot-item-question">
                      <span className="slot-req-label">คุณสมบัติที่ต้องตอบ:</span>
                      <strong className="slot-req-value">{slotTraitThai}</strong>
                    </div>

                    {isFilled ? (
                      <div className="slot-filled-preview">
                        <img
                          src={slotData.animalCard?.image || '/cards/animals/animal_01.png'}
                          alt={slotData.animalCard?.name}
                          className="slot-filled-thumb"
                        />
                        <div className="slot-filled-meta">
                          <span className="slot-filled-name">{slotData.animalCard?.name || 'การ์ดสัตว์'}</span>
                          <span className="slot-filled-player">วางโดย: {slotData.playerName}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="slot-action-row">
                        {matchingCard ? (
                          <button
                            type="button"
                            className="btn-slot-place-fast"
                            onClick={() => {
                              onSlotClick(centerIdx, slotIdx);
                              onClose();
                            }}
                          >
                            ⚡ วาง "{matchingCard.name || matchingCard.title || 'การ์ดนี้'}" ลงช่องนี้
                          </button>
                        ) : (
                          <span className="slot-no-match-hint">ไม่มีการ์ดที่ตรงในมือ</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="cute-inspect-footer">
          <button type="button" className="cute-action-btn btn-secondary" onClick={onClose}>
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}
