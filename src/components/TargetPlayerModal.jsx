import React, { useState } from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { getPlayerColorObj } from '../utils/playerColors';
import { playSfx } from '../utils/audio';

export default function TargetPlayerModal({
  isOpen,
  onClose,
  card,
  players = [],
  shieldedPlayerIds = [],
  myId,
  onConfirmTarget,
}) {
  if (!isOpen || !card) return null;

  const opponents = players.filter((p) => p.id !== myId);
  const [selectedTargetId, setSelectedTargetId] = useState(
    opponents.length > 0 ? opponents[0].id : null
  );

  const handleSelect = (playerId) => {
    playSfx('select');
    setSelectedTargetId(playerId);
  };

  const handleConfirm = () => {
    if (!selectedTargetId) return;
    playSfx('pop');
    onConfirmTarget(selectedTargetId);
  };

  return (
    <div className="cute-modal-backdrop page-screen-anim" onClick={onClose}>
      <div
        className="cute-modal-box target-player-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cute-modal-header">
          <div className="cute-modal-title-box">
            <span className="cute-modal-icon">🎯</span>
            <h2 className="cute-modal-title">เลือกผู้เล่นเป้าหมาย</h2>
          </div>
          <button
            type="button"
            className="cute-modal-close-btn"
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
          >
            ✕
          </button>
        </div>

        {/* Card Info Banner */}
        <div className="target-card-info-banner">
          <img
            src={card.image || card.origImage || '/cards/specials/special_swap.png'}
            alt={card.title || card.name}
            className="target-card-preview-img"
          />
          <div className="target-card-text">
            <div className="target-card-tag-row">
              <span className="target-card-badge">⚡ SPECIAL CARD</span>
            </div>
            <h3 className="target-card-name">{card.title || card.name}</h3>
            <p className="target-card-desc">{card.description || 'เลือกผู้เล่นคู่แข่งที่จะได้รับผลของการ์ดพิเศษนี้'}</p>
          </div>
        </div>

        {/* Player Selection List */}
        <div className="target-players-scroll-list">
          {opponents.length > 0 ? (
            opponents.map((p) => {
              const isSelected = p.id === selectedTargetId;
              const handCount = p.handLength ?? p.hand?.length ?? 0;
              const isShielded = shieldedPlayerIds.includes(p.id) || p.hasShield;
              const isOnline = p.connected !== false;
              const colorObj = getPlayerColorObj(p.color || (p.isBot ? '#0284C7' : '#10B981'));

              return (
                <div
                  key={p.id}
                  className={`target-player-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleSelect(p.id)}
                  style={{
                    borderColor: isSelected ? colorObj.hex : undefined,
                    boxShadow: isSelected
                      ? `0 0 0 2.5px ${colorObj.hex}, 0 6px 20px ${colorObj.shadow || 'rgba(0,0,0,0.18)'}`
                      : undefined,
                  }}
                >
                  <div
                    className="target-item-avatar-frame"
                    style={{
                      border: `2.5px solid ${colorObj.hex}`,
                      boxShadow: `0 2px 8px ${colorObj.shadow || 'rgba(0,0,0,0.15)'}`,
                    }}
                  >
                    <AnimalAvatar id={p.avatarId || (p.isBot ? 'sponge_glass' : 'lion')} size={46} />
                  </div>

                  <div className="target-item-info">
                    <div className="target-item-name-row">
                      <span className="target-item-name">{p.name}</span>
                      {p.isBot && <span className="cute-bot-pill">บอท</span>}
                      {isShielded && (
                        <span className="target-shield-badge" title="ผู้เล่นมีเกราะ Crab Shield ป้องกันการโจมตี">
                          🛡️ มีโล่
                        </span>
                      )}
                      {isOnline ? (
                        <span className="target-online-badge online">🟢 ออนไลน์</span>
                      ) : (
                        <span className="target-online-badge offline">🔴 หลุดชั่วคราว</span>
                      )}
                    </div>
                    <div className="target-item-sub-row">
                      <span className="target-item-score">⭐ {p.score || 0} แต้ม</span>
                      <span className="target-item-hand">🎴 การ์ดบนมือ {handCount} ใบ</span>
                    </div>
                  </div>

                  <div
                    className={`target-item-radio ${isSelected ? 'is-checked' : ''}`}
                    style={{
                      background: isSelected ? colorObj.hex : undefined,
                      borderColor: isSelected ? colorObj.hex : undefined,
                    }}
                  >
                    {isSelected && <span>✓</span>}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="target-empty-msg">
              <span>ไม่มีคู่ต่อสู้ในห้อง</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="cute-modal-actions">
          <button
            type="button"
            className="cute-btn cute-btn-secondary"
            onClick={onClose}
          >
            ยกเลิก
          </button>
          <button
            type="button"
            className="cute-btn cute-btn-primary"
            disabled={!selectedTargetId || opponents.length === 0}
            onClick={handleConfirm}
          >
            ✨ ใช้การ์ดใส่ผู้เล่นนี้
          </button>
        </div>
      </div>
    </div>
  );
}
