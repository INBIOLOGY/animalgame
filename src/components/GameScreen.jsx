import React from 'react';
import QuestCard from './QuestCard';
import ScoreboardChips from './ScoreboardChips';
import HandDock from './HandDock';
import { UIIcon } from '../assets/natureIcons';

export default function GameScreen({
  room,
  myId,
  selectedCardId,
  timeAttackSeconds,
  showDropHints = true,
  onSelectCard,
  onPlaySpecialCard,
  onSlotClick,
  onDropCardOnSlot,
  onPassTurn,
  onDiscardSingle,
  onDiscardSelectedOrFirst,
  onSendEmote,
  onLeaveRoom,
}) {
  if (!room) return null;

  const me = room.players.find((p) => p.id === myId);
  const activeIndex = room.currentTurnIndex ?? 0;
  const activePlayer = room.players[activeIndex];
  const isMyTurn = room.roomMode === 'time_attack' || (activePlayer && activePlayer.id === myId);
  const isTimeAttack = room.roomMode === 'time_attack';

  const selectedAnimal = me?.hand?.find((c) => (c.cardInstanceId && c.cardInstanceId === selectedCardId) || c.id === selectedCardId);
  const activeAnimal = selectedAnimal || null;

  const isShielded = room.shieldedPlayerIds?.includes(myId);
  const isDoublePlay = room.doublePlayPlayerId === myId;
  const playDirText = (room.playDirection || 1) === 1 ? '↻ ตามเข็ม' : '↺ ทวนเข็ม';

  const turnMessageDesktop = isTimeAttack
    ? '⏱️ โหมดจับเวลา: วางการ์ดลงช่อง'
    : isMyTurn
    ? '🌟 ถึงตาของคุณแล้ว: เลือกการ์ดแล้ววางลงช่อง'
    : `⏳ รอตาของ: ${activePlayer?.name || 'ผู้เล่นอื่น'}`;

  const turnMessageMobile = isTimeAttack
    ? '⏱️ จับเวลา'
    : isMyTurn
    ? '🌟 ถึงตาคุณแล้ว'
    : `⏳ รอตา: ${activePlayer?.name || 'คนอื่น'}`;

  const passLabel = selectedAnimal
    ? `ทิ้ง "${selectedAnimal.name || selectedAnimal.title || 'การ์ดนี้'}"`
    : 'ข้ามตา / จั่วใหม่';

  return (
    <section className="game-screen-wrap page-screen-anim">
      {/* ─── Header Bar ─── */}
      <div className="game-header-bar">
        <div className="game-header-main-row">
          <div className="game-header-left-group">
            <div className={`turn-badge ${isMyTurn ? 'my-turn' : ''}`}>
              <span className="turn-msg-desktop">{turnMessageDesktop}</span>
              <span className="turn-msg-mobile">{turnMessageMobile}</span>
              {isDoublePlay && <span className="double-play-tag">⚔️ x2</span>}
              {isShielded && <span className="shield-active-tag">🛡️ เกราะ</span>}
            </div>

            {isTimeAttack && (
              <div className="timer-pill">
                <UIIcon name="timer" size={14} color="#fff" />
                <span>{timeAttackSeconds}s</span>
              </div>
            )}

            <div className="turn-direction-indicator" title="ทิศทางการเล่น">
              <span>{playDirText}</span>
            </div>
          </div>

          <div className="game-header-actions">
            <button
              type="button"
              className="cute-action-btn cute-btn-pass"
              onClick={onPassTurn}
              disabled={!isMyTurn && !isTimeAttack}
              title="ทิ้งการ์ดเพื่อข้ามตาและจั่วใบใหม่"
            >
              <UIIcon name="recycle" size={12} color="#EA580C" />
              <span className="pass-btn-desktop">{passLabel}</span>
              <span className="pass-btn-mobile">{selectedAnimal ? 'ทิ้ง' : 'จั่วใหม่'}</span>
            </button>

            <button
              type="button"
              className="cute-action-btn cute-btn-leave"
              onClick={onLeaveRoom}
              title="ออกจากห้อง"
            >
              <UIIcon name="exit" size={12} color="#DC2626" />
              <span>ออก</span>
            </button>
          </div>
        </div>

        <div className="game-header-score-row">
          <ScoreboardChips
            players={room.players}
            activeIndex={activeIndex}
            isTimeAttack={isTimeAttack}
            myId={myId}
          />
        </div>
      </div>

      {/* ─── 3x2 Category Quests with Real Card Images ─── */}
      <div className="categories-board-area">
        <div className="category-grid">
          {room.centerCategories.map((categoryItem, centerIdx) => (
            <QuestCard
              key={centerIdx}
              centerIdx={centerIdx}
              categoryItem={categoryItem}
              activeAnimal={activeAnimal}
              myHand={me?.hand || []}
              isMyTurn={isMyTurn}
              showDropHints={showDropHints}
              onSlotClick={onSlotClick}
              onDropCard={onDropCardOnSlot}
            />
          ))}
        </div>
      </div>

      {/* ─── Hand Dock ─── */}
      <HandDock
        hand={me?.hand || []}
        selectedCardId={selectedCardId}
        isMyTurn={isMyTurn}
        onSelectCard={onSelectCard}
        onPlaySpecialCard={onPlaySpecialCard}
        onDiscardSingle={onDiscardSingle}
        onDiscardSelectedOrFirst={onDiscardSelectedOrFirst}
        onSendEmote={onSendEmote}
      />
    </section>
  );
}
