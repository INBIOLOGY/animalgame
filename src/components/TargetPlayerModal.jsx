import React, { useState } from 'react';

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
    setSelectedTargetId(playerId);
  };

  const handleConfirm = () => {
    if (!selectedTargetId) return;
    onConfirmTarget(selectedTargetId);
  };

  return (
    <div className="cute-modal-backdrop page-screen-anim" onClick={onClose}>
      <div
        className="cute-modal-card target-player-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cute-modal-header">
          <div className="cute-modal-title-box">
            <span className="cute-modal-icon">🎯</span>
            <span className="cute-modal-title">เลือกผู้เล่นเป้าหมาย</span>
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
            src={card.image || card.origImage || '/cards/specials/special_fit_free.png'}
            alt={card.title || card.name}
            className="target-card-preview-img"
          />
          <div className="target-card-text">
            <span className="target-card-name">{card.title || card.name}</span>
            <span className="target-card-desc">{card.description || 'เลือกผู้เล่นที่จะได้รับผลของการ์ดพิเศษนี้'}</span>
          </div>
        </div>

        {/* Player Selection List */}
        <div className="target-players-scroll-list">
          {opponents.length > 0 ? (
            opponents.map((p) => {
              const isSelected = p.id === selectedTargetId;
              const avatarImg = p.avatarId ? `/avatars/${p.avatarId}.png` : '/avatars/lion.png';
              const handCount = p.handLength ?? p.hand?.length ?? 0;
              const isShielded = shieldedPlayerIds.includes(p.id) || p.hasShield;
              const isOnline = p.connected !== false;

              return (
                <div
                  key={p.id}
                  className={`target-player-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleSelect(p.id)}
                >
                  <div className="target-item-avatar-frame">
                    <img
                      src={avatarImg}
                      alt={p.name}
                      className="target-item-avatar-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/avatars/lion.png';
                      }}
                    />
                  </div>

                  <div className="target-item-info">
                    <div className="target-item-name-row">
                      <span className="target-item-name">{p.name}</span>
                      {p.isBot && <span className="bot-tag">🤖 บอท</span>}
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

                  <div className="target-item-radio">
                    {isSelected ? '✓' : ''}
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
