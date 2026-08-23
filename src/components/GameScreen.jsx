import React, { useState, useEffect } from 'react';
import QuestCard from './QuestCard';
import ScoreboardChips from './ScoreboardChips';
import HandDock from './HandDock';
import GameStartSplash from './GameStartSplash';
import { UIIcon } from '../assets/natureIcons';

export default function GameScreen({
  room,
  myId,
  selectedCardId,
  timeAttackSeconds,
  onSelectCard,
  onSlotClick,
  onDropCardOnSlot,
  onPassTurn,
  onDiscardSingle,
  onDiscardSelectedOrFirst,
  onSendEmote,
  onLeaveRoom,
}) {
  const [showStartSplash, setShowStartSplash] = useState(() => {
    // Show splash if game started less than 3 seconds ago
    return room && room.startTime && Date.now() - room.startTime < 4000;
  });

  if (!room) return null;

  const me = room.players.find((p) => p.id === myId);
  const activeIndex = room.currentTurnIndex ?? 0;
  const activePlayer = room.players[activeIndex];
  const isMyTurn = room.roomMode === 'time_attack' || (activePlayer && activePlayer.id === myId);
  const isTimeAttack = room.roomMode === 'time_attack';

  const selectedAnimal = me?.hand?.find((c) => c.id === selectedCardId);
  const activeAnimal = selectedAnimal || null;

  const turnMessage = isTimeAttack
    ? '⏱️ โหมดจับเวลา: ลากหรือแตะการ์ดวางลงช่อง'
    : isMyTurn
    ? '🌟 ถึงตาของคุณแล้ว: เลือกการ์ดแล้ววางลงช่อง'
    : `⏳ รอตาของ: ${activePlayer?.name || 'ผู้เล่นอื่น'}`;

  const passLabel = selectedAnimal
    ? `ทิ้ง "${selectedAnimal.name}"`
    : 'ข้ามตา / จั่วใหม่';

  return (
    <section className="game-screen-wrap page-screen-anim">
      {/* 🎲 Randomized Turn Order Intro Splash */}
      {showStartSplash && (
        <GameStartSplash
          room={room}
          myId={myId}
          onDismiss={() => setShowStartSplash(false)}
        />
      )}
      {/* ─── Header Bar ─── */}
      <div className="game-header-bar">
        <div className={`turn-badge ${isMyTurn ? 'my-turn' : ''}`}>
          <span>{turnMessage}</span>
        </div>

        {isTimeAttack && (
          <div className="timer-pill" style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
            <UIIcon name="timer" size={14} color="#fff" />
            <span>{timeAttackSeconds}s</span>
          </div>
        )}

        <ScoreboardChips
          players={room.players}
          activeIndex={activeIndex}
          isTimeAttack={isTimeAttack}
          myId={myId}
        />

        <div style={{ display: 'flex', gap: 5, flexShrink: 0, alignItems: 'center' }}>
          <button
            className="btn btn-dark btn-sm"
            onClick={onPassTurn}
            disabled={!isMyTurn && !isTimeAttack}
            title="ทิ้งการ์ดเพื่อข้ามตาและจั่วใบใหม่"
          >
            <UIIcon name="recycle" size={13} color="var(--terracotta-light)" />
            <span>{passLabel}</span>
          </button>
          <button className="btn btn-danger btn-sm" onClick={onLeaveRoom} title="ออกจากห้อง">
            <UIIcon name="exit" size={13} color="#ffffff" />
            <span>ออก</span>
          </button>
        </div>
      </div>

      {/* ─── 3x2 Category Quests ─── */}
      <div className="categories-board-area">
        <div className="category-grid">
          {room.centerCategories.map((categoryItem, centerIdx) => (
            <QuestCard
              key={centerIdx}
              centerIdx={centerIdx}
              categoryItem={categoryItem}
              activeAnimal={activeAnimal}
              isMyTurn={isMyTurn}
              onSlotClick={onSlotClick}
              onDropCard={onDropCardOnSlot}
            />
          ))}
        </div>
      </div>

      {/* ─── Hand Dock (Dynamic Expansion based on Turn) ─── */}
      <HandDock
        hand={me?.hand || []}
        selectedCardId={selectedCardId}
        isMyTurn={isMyTurn}
        onSelectCard={onSelectCard}
        onDiscardSingle={onDiscardSingle}
        onDiscardSelectedOrFirst={onDiscardSelectedOrFirst}
        onSendEmote={onSendEmote}
      />
    </section>
  );
}
