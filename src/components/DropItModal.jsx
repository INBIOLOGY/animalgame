import React, { useState } from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { UIIcon } from '../assets/natureIcons';
import { playSfx } from '../utils/audio';

export default function DropItModal({
  isOpen,
  onClose,
  opponents = [],
  onConfirmDrop,
}) {
  if (!isOpen || opponents.length === 0) return null;

  // Default target opponent is the first one
  const [selectedOpponentId, setSelectedOpponentId] = useState(opponents[0]?.id || '');
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const targetPlayer = opponents.find((p) => p.id === selectedOpponentId) || opponents[0];
  const targetHand = targetPlayer?.hand || [];

  const handleConfirm = () => {
    playSfx('discard');
    if (onConfirmDrop) {
      onConfirmDrop(targetPlayer.id, selectedCardIndex);
    }
    onClose();
  };

  return (
    <div className="drop-it-modal-overlay page-screen-anim" role="dialog" aria-modal="true">
      <div className="drop-it-modal-card">
        {/* Modal Header */}
        <div className="drop-it-modal-header">
          <div className="drop-it-title-wrap">
            <span className="drop-it-badge">💥 SPECIAL ATTACK</span>
            <h2 className="drop-it-title">Drop It !! เลือกทิ้งการ์ดคู่ต่อสู้</h2>
          </div>
          <button type="button" className="drop-it-close-btn" onClick={onClose} aria-label="ปิด">✕</button>
        </div>

        {/* Subtitle instructions */}
        <p className="drop-it-desc">
          เลือกคู่ต่อสู้และแตะเลือกการ์ด 1 ใบในมือของเขา เพื่อบังคับทิ้งลงกองทิ้งทันที!
        </p>

        {/* Opponent Selector Tabs (if > 1 opponent) */}
        {opponents.length > 1 && (
          <div className="drop-it-opponents-row">
            <span className="drop-it-opp-label">เลือกเป้าหมาย:</span>
            <div className="drop-it-opp-chips">
              {opponents.map((opp) => {
                const isSelected = opp.id === targetPlayer.id;
                return (
                  <button
                    key={opp.id}
                    type="button"
                    className={`drop-it-opp-chip ${isSelected ? 'active-target' : ''}`}
                    onClick={() => {
                      playSfx('select');
                      setSelectedOpponentId(opp.id);
                      setSelectedCardIndex(0);
                    }}
                  >
                    <AnimalAvatar id={opp.avatarId || 'lion'} size={24} />
                    <span>{opp.name}</span>
                    <span className="drop-it-hand-count">({opp.hand?.length || 0} ใบ)</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Target Player Badge */}
        <div className="drop-it-target-preview">
          <AnimalAvatar id={targetPlayer.avatarId || 'lion'} size={36} />
          <div className="drop-it-target-info">
            <span className="drop-it-target-name">{targetPlayer.name}</span>
            <span className="drop-it-target-sub">การ์ดในมือ {targetHand.length} ใบ</span>
          </div>
        </div>

        {/* Opponent's Hand Cards Grid */}
        <div className="drop-it-cards-grid">
          {targetHand.map((card, idx) => {
            const isSelected = idx === selectedCardIndex;
            const cardImg = card.image || card.origImage || '/cards/animals/animal_01.png';
            const cardName = card.name || card.title || `การ์ด #${idx + 1}`;

            return (
              <div
                key={card.cardInstanceId || `${card.id}_${idx}`}
                className={`drop-it-card-item ${isSelected ? 'selected-drop-card' : ''}`}
                onClick={() => {
                  playSfx('pop');
                  setSelectedCardIndex(idx);
                }}
              >
                <div className="drop-it-card-img-wrap">
                  <img src={cardImg} alt={cardName} className="drop-it-card-img" />
                  {isSelected && (
                    <div className="drop-it-card-crosshair">
                      <span>💥 เล็งใบนี้</span>
                    </div>
                  )}
                </div>
                <span className="drop-it-card-name">{cardName}</span>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="drop-it-footer">
          <button type="button" className="drop-it-cancel-btn" onClick={onClose}>
            ยกเลิก
          </button>
          <button
            type="button"
            className="drop-it-action-btn"
            onClick={handleConfirm}
            disabled={targetHand.length === 0}
          >
            <span>💥 บังคับทิ้งใบที่เลือก</span>
          </button>
        </div>
      </div>
    </div>
  );
}
