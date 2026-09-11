import React from 'react';
import SlotCell from './SlotCell';
import { UIIcon } from '../assets/natureIcons';
import { isTraitCompatible } from '../utils/traits';

/** ช่วยคำนวณป้ายคะแนนแบบ breakdown ตามระบบ 5/15 */
function getScoreBadgeLabel(totalSlots, totalPoints) {
  if (totalSlots === 2) return '+5→15★';
  if (totalSlots === 3) return '+5→5→20★';
  return `+${totalPoints || 20}★`;
}

export default function QuestCard({
  centerIdx,
  categoryItem,
  selectedAnimal,
  onInspectQuest,
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
  const totalSlots = cat.slots?.length || 2;
  const filledCount = categoryItem.filledSlots.filter(s => s !== null).length;
  const openCount = totalSlots - filledCount;
  const scoreBadgeLabel = getScoreBadgeLabel(totalSlots, cat.points);

  return (
    <div id={`catCard-${centerIdx}`} className={`vertical-quest-card layout-${layout}`}>
      {/* Top Header Floating Badge */}
      <div className="quest-card-top-pill">
        <span className="quest-pill-idx">#{centerIdx + 1}</span>
        <span className="quest-pill-pts" title={`วางถูก +5 แต้ม / ปิดครบ +${totalSlots === 2 ? 15 : 20} แต้ม`}>{scoreBadgeLabel}</span>
        {openCount > 0 && (
          <span className="quest-pill-slots" title={`ยังว่าง ${openCount} ช่อง`}>
            {'○'.repeat(openCount)}{'●'.repeat(filledCount)}
          </span>
        )}
        {onInspectQuest && (
          <button
            type="button"
            className="quest-pill-inspect-btn"
            onClick={(e) => {
              e.stopPropagation();
              onInspectQuest(centerIdx);
            }}
            title="กดดูคำถามขนาดใหญ่ คมชัด 100%"
          >
            🔍
          </button>
        )}
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
            return (
              <SlotCell
                key={slotIdx}
                centerIdx={centerIdx}
                slotIdx={slotIdx}
                slotData={slotData}
                slotConfig={slotConfig}
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
