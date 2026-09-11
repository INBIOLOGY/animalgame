import React from 'react';
import { PHYLA_MAP, TRAIT_MAP, ANIMAL_RARITIES } from '../utils/traits';
import { isTraitCompatible } from '../utils/traits';

export default function CardInspectModal({
  card,
  room,
  isMyTurn,
  onClose,
  onDiscard,
}) {
  if (!card) return null;

  const cardImg = card.image || card.origImage || '/cards/animals/animal_01.png';
  const isSpecial = card.cardType === 'special';
  const rarityInfo = ANIMAL_RARITIES[card.rarity] || ANIMAL_RARITIES.common;
  const phylumThai = PHYLA_MAP[card.phylum] || card.phylum || '';

  // Calculate which active quests on the board this card can fit into
  const matchingQuests = [];
  if (room?.centerCategories && !isSpecial) {
    room.centerCategories.forEach((catItem, cIdx) => {
      if (!catItem?.category?.slots) return;
      catItem.category.slots.forEach((slotConfig, sIdx) => {
        if (catItem.filledSlots[sIdx] === null) {
          const reqTrait = typeof slotConfig === 'object' ? slotConfig.requiredTrait : slotConfig;
          if (isTraitCompatible(card, reqTrait)) {
            matchingQuests.push({
              centerIdx: cIdx,
              slotIdx: sIdx,
              pos: typeof slotConfig === 'object' ? slotConfig.position : (sIdx === 0 ? 'บน' : 'ล่าง'),
              questTitle: catItem.category.title,
            });
          }
        }
      });
    });
  }

  return (
    <div className="cute-modal-backdrop page-screen-anim" onClick={onClose}>
      <div
        className="cute-inspect-modal-card card-view-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cute-inspect-header">
          <div className="cute-inspect-title-group">
            <span className="cute-inspect-tag" style={{ background: rarityInfo.bg, color: rarityInfo.color, borderColor: rarityInfo.border }}>
              {isSpecial ? 'การ์ดเวทมนตร์พิเศษ' : `การ์ดสัตว์ระดับ ${rarityInfo.label}`}
            </span>
            <h3 className="cute-inspect-heading">{card.name || card.title}</h3>
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

        {/* Modal Body */}
        <div className="cute-inspect-body">
          {/* Card Artwork */}
          <div className="cute-inspect-art-wrap card-art-mode">
            <img
              src={cardImg}
              alt={card.name || card.title}
              className="cute-inspect-card-img"
              loading="eager"
            />
          </div>

          {/* Details */}
          <div className="cute-inspect-details">
            {/* Phylum & Names */}
            <div className="card-inspect-names">
              <h2 className="card-inspect-title">{card.name || card.title}</h2>
              {card.englishName && <span className="card-inspect-en">{card.englishName}</span>}
              {card.sciName && <span className="card-inspect-sci">({card.sciName})</span>}
              {phylumThai && <span className="card-inspect-phylum-badge">{phylumThai}</span>}
            </div>

            {/* Description or Special Effect */}
            {card.desc && (
              <p className="card-inspect-desc">{card.desc}</p>
            )}

            {/* Animal Traits List */}
            {card.traits && card.traits.length > 0 && (
              <div className="card-inspect-traits-block">
                <span className="card-traits-header">ลักษณะเด่นทางชีววิทยา:</span>
                <div className="card-traits-chips">
                  {card.traits.map((traitKey) => (
                    <span key={traitKey} className="card-trait-chip">
                      {TRAIT_MAP[traitKey] || traitKey}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Quests on Board */}
            {!isSpecial && (
              <div className="card-inspect-matches-box">
                <span className="matches-box-title">
                  {matchingQuests.length > 0 ? '✨ ตรงกับภารกิจบนกระดาน:' : 'ยังไม่มีช่องคำถามที่ตรงในกระดานตอนนี้'}
                </span>
                {matchingQuests.length > 0 && (
                  <div className="matches-list">
                    {matchingQuests.map((m, i) => (
                      <span key={i} className="match-tag">
                        เควสต์ #{m.centerIdx + 1} ({m.pos})
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="cute-inspect-footer">
          {isMyTurn && onDiscard && (
            <button
              type="button"
              className="cute-action-btn btn-danger"
              onClick={() => {
                onDiscard(card.cardInstanceId || card.id);
                onClose();
              }}
            >
              ✕ ทิ้งการ์ดใบนี้เพื่อจั่วใหม่
            </button>
          )}
          <button type="button" className="cute-action-btn btn-secondary" onClick={onClose}>
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}
