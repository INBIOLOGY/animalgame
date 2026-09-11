import React, { useState } from 'react';
import QuestCard from './QuestCard';
import ScoreboardChips from './ScoreboardChips';
import HandDock from './HandDock';
import QuestInspectModal from './QuestInspectModal';
import CardInspectModal from './CardInspectModal';
import { UIIcon } from '../assets/natureIcons';
import { CUTE_ARENA_BACKDROP } from '../assets/artAssets';

export default function GameScreen({
  room,
  myId,
  selectedCardId,
  timeAttackSeconds,
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
  const [inspectingCenterIdx, setInspectingCenterIdx] = useState(null);
  const [inspectingCard, setInspectingCard] = useState(null);

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
  const doubleStep = room.doublePlayStep || 1;
  const playDirText = (room.playDirection || 1) === 1 ? '↻ ตามเข็ม' : '↺ ทวนเข็ม';

  const turnMessageDesktop = isTimeAttack
    ? '⏱️ โหมดจับเวลา: วางการ์ดลงช่อง'
    : isMyTurn
    ? isDoublePlay
      ? doubleStep === 2
        ? '⚡ Play Double (ใบที่ 2/2): วางการ์ดใบที่สองได้ทันที!'
        : '⚔️ Play Double (ใบที่ 1/2): เลือกการ์ดแล้ววางใบแรกได้เลย!'
      : '🌟 ถึงตาของคุณแล้ว: เลือกการ์ดแล้ววางลงช่อง'
    : `⏳ รอตาของ: ${activePlayer?.name || 'ผู้เล่นอื่น'}`;

  const turnMessageMobile = isTimeAttack
    ? '⏱️ จับเวลา'
    : isMyTurn
    ? isDoublePlay
      ? `⚔️ ใบที่ ${doubleStep}/2`
      : '🌟 ถึงตาคุณแล้ว'
    : `⏳ รอตา: ${activePlayer?.name || 'คนอื่น'}`;

  const passLabel = selectedAnimal
    ? `ทิ้ง "${selectedAnimal.name || selectedAnimal.title || 'การ์ดนี้'}"`
    : 'ข้ามตา / จั่วใหม่';

  return (
    <section className="game-screen-wrap page-screen-anim">
      {/* 🌸 Cute Animal Crossing Meadow Backdrop */}
      <div
        className="cute-meadow-backdrop"
        style={{ backgroundImage: `url(${CUTE_ARENA_BACKDROP})` }}
        aria-hidden="true"
      />
      <div className="cute-meadow-overlay" aria-hidden="true" />

      {/* ─── Header Bar ─── */}
      <div className="game-header-bar">
        <div className="game-header-main-row">
          <div className="game-header-left-group">
            <div className={`turn-badge ${isMyTurn ? 'my-turn' : ''} ${isDoublePlay ? 'double-active' : ''}`}>
              <span className="turn-msg-desktop">{turnMessageDesktop}</span>
              <span className="turn-msg-mobile">{turnMessageMobile}</span>
              {isDoublePlay && <span className="double-play-tag">⚔️ ลง 2 ใบ ({doubleStep}/2)</span>}
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
              selectedAnimal={activeAnimal}
              onInspectQuest={(idx) => setInspectingCenterIdx(idx)}
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
        centerCategories={room.centerCategories}
        onSelectCard={onSelectCard}
        onInspectCard={(card) => setInspectingCard(card)}
        onPlaySpecialCard={onPlaySpecialCard}
        onDiscardSingle={onDiscardSingle}
        onDiscardSelectedOrFirst={onDiscardSelectedOrFirst}
        onDropCardOnSlot={onDropCardOnSlot}
        onSendEmote={onSendEmote}
      />

      {/* ─── High-Res Quest Inspection Modal ─── */}
      {inspectingCenterIdx !== null && room.centerCategories[inspectingCenterIdx] && (
        <QuestInspectModal
          centerIdx={inspectingCenterIdx}
          categoryItem={room.centerCategories[inspectingCenterIdx]}
          selectedCard={activeAnimal}
          myHand={me?.hand || []}
          onClose={() => setInspectingCenterIdx(null)}
          onSlotClick={onSlotClick}
        />
      )}

      {/* ─── High-Res Card Detail Inspection Modal ─── */}
      {inspectingCard && (
        <CardInspectModal
          card={inspectingCard}
          room={room}
          isMyTurn={isMyTurn}
          onClose={() => setInspectingCard(null)}
          onDiscard={onDiscardSingle}
        />
      )}
    </section>
  );
}
