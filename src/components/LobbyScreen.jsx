import React from 'react';
import { UIIcon } from '../assets/natureIcons';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { TCG_ARENA_BACKDROP } from '../assets/artAssets';
import { playSfx } from '../utils/audio';

const QUICK_LOBBY_EMOTES = ['🎉', '🔥', '🐾', '🦁', '😎', '💡', '💖', '👑', '⚡', '🥳'];

export default function LobbyScreen({ room, myId, onAddBot, onStartGame, onLeaveRoom, onCopyCode, onSendEmote }) {
  if (!room) return null;

  const me = room.players.find((p) => p.id === myId);
  const isHost = me?.isHost;
  const canAddBot = isHost && room.roomMode !== 'time_attack' && room.players.length < room.maxPlayers;
  const canStart = isHost && (room.roomMode !== 'time_attack' || room.players.length >= 1) && (room.roomMode !== 'multiplayer' || room.players.length >= 2);

  const modeLabels = {
    multiplayer: '👥 เล่นกับเพื่อน (2-10 คน)',
    vs_bot: '🤖 เล่นกับบอท AI',
    time_attack: '⏱️ ท้าทายเวลา (Solo)',
  };

  const handleEmoteClick = (emoji) => {
    playSfx('sparkle');
    if (onSendEmote) onSendEmote(emoji);
  };

  return (
    <section className="landing-container page-screen-anim">
      {/* 🌲 Cinematic Arena Tabletop Backdrop */}
      <div
        className="tcg-cinematic-backdrop"
        style={{ backgroundImage: `url(${TCG_ARENA_BACKDROP})` }}
        aria-hidden="true"
      />
      <div className="tcg-cinematic-overlay" aria-hidden="true" />

      <div className="naturalist-folio-portal lobby-wide-card">
        {/* Left Side: Room Code & Emotes */}
        <div className="folio-specimen-column" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="folio-section-header">
              <span className="folio-section-title">ห้องรอเริ่มเกม</span>
              <span className="folio-catalog-id">ROOM CODE</span>
            </div>

            <div className="lobby-room-code-box">
              <div className="room-code-sub">รหัสห้องสำหรับชวนเพื่อน</div>
              <div className="room-code-display">{room.roomId}</div>
              <div className="room-mode-pill">
                {modeLabels[room.roomMode] || room.roomMode}
              </div>
            </div>

            <button className="btn-copy-code" onClick={onCopyCode}>
              <UIIcon name="copy" size={15} color="var(--forest-primary)" />
              <span>คัดลอกรหัสห้อง</span>
            </button>
          </div>

          {/* Lobby Quick Emotes */}
          <div className="emote-quick-bar" style={{ marginTop: '16px' }}>
            <span className="emote-bar-title">ส่งอีโมจิทักทาย:</span>
            <div className="emote-bar-buttons">
              {QUICK_LOBBY_EMOTES.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className="mini-emote-circle"
                  onClick={() => handleEmoteClick(emoji)}
                  title="ส่งอีโมจิ"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Player Slots & Control Actions */}
        <div className="folio-expedition-column" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="folio-section-header">
              <span className="folio-section-title">ผู้เล่นในห้อง</span>
              <span className="folio-catalog-id">{room.players.length}/{room.maxPlayers} คน</span>
            </div>

            <div className="lobby-slots-grid">
              {room.players.map((p) => {
                const isMe = p.id === myId;
                return (
                  <div key={p.id} className={`lobby-player-slot ${isMe ? 'is-me' : ''}`} id={`scoreChip-${p.id}`}>
                    <div className="slot-avatar-circle">
                      <AnimalAvatar id={p.avatarId || (p.isBot ? 'owl' : 'lion')} size={34} showArt={true} />
                    </div>
                    <div className="slot-player-details">
                      <div className="slot-player-name">
                        {p.name}
                        {isMe && ' (คุณ)'}
                      </div>
                      <div className="slot-player-status">
                        {p.isHost && <span className="host-badge">👑 เจ้าของห้อง</span>}
                        {p.isBot && <span className="bot-badge">🤖 Bot AI</span>}
                        {!p.connected && <span className="offline-badge">⚠️ ขาดการเชื่อมต่อ</span>}
                      </div>
                    </div>
                  </div>
                );
              })}

              {Array.from({ length: Math.max(0, room.maxPlayers - room.players.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="lobby-player-slot empty">
                  <span className="empty-slot-text">+ รอผู้เล่นเข้าร่วม...</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: '14px' }}>
            {canAddBot && (
              <button className="action-btn-secondary" onClick={onAddBot}>
                <UIIcon name="bot" size={16} color="var(--forest-primary)" />
                <span>เพิ่มบอท AI ร่วมเล่น</span>
              </button>
            )}

            {isHost && (
              <button
                className="btn-enter-arena"
                onClick={onStartGame}
                disabled={!canStart}
                style={{
                  opacity: canStart ? 1 : 0.6,
                  cursor: canStart ? 'pointer' : 'not-allowed',
                  marginTop: 0,
                }}
              >
                <UIIcon name="trophy" size={16} color="#ffffff" />
                <span>
                  {!canStart && room.roomMode === 'multiplayer'
                    ? 'รอผู้เล่นอย่างน้อย 2 คน...'
                    : 'เริ่มเกมทันที!'}
                </span>
              </button>
            )}

            {!isHost && (
              <div className="guest-waiting-box">
                <span className="loading-spinner" />
                <span>กำลังรอเจ้าของห้องกดเริ่มเกม...</span>
              </div>
            )}

            <button className="btn-leave-lobby" onClick={onLeaveRoom}>
              ออกจากห้อง
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
