import React from 'react';
import { UIIcon } from '../assets/natureIcons';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { CUTE_ARENA_BACKDROP } from '../assets/artAssets';
import { playSfx } from '../utils/audio';

const CUTE_LOBBY_EMOTES = ['🎉', '💖', '🐾', '🦁', '😎', '💡', '✨', '👑', '⚡', '🥳'];

export default function LobbyScreen({ room, myId, onAddBot, onStartGame, onLeaveRoom, onCopyCode, onSendEmote }) {
  if (!room) return null;

  const me = room.players.find((p) => p.id === myId);
  const isHost = me?.isHost;
  const isTeacher = room.roomMode === 'teacher' || me?.isTeacher || me?.isSpectator;
  const studentsCount = room.players.filter((p) => !p.isTeacher && !p.isSpectator).length;
  const canAddBot = isHost && room.roomMode !== 'time_attack' && room.players.length < room.maxPlayers;
  const canStart = isHost && (
    (room.roomMode === 'time_attack' && room.players.length >= 1) ||
    (room.roomMode === 'vs_bot' && room.players.length >= 1) ||
    (room.roomMode === 'teacher' && studentsCount >= 1) ||
    (room.roomMode === 'multiplayer' && room.players.length >= 2)
  );

  const modeLabels = {
    multiplayer: '👥 เล่นกับเพื่อน',
    teacher: '👨‍🏫 ห้องเรียนคุณครู (Classroom)',
    vs_bot: '🤖 เล่นกับบอท AI',
    time_attack: '⏱️ ท้าทายเวลา (Solo)',
  };

  const statusText = canStart
    ? room.roomMode === 'teacher'
      ? '✨ นักเรียนพร้อมแล้ว คุณครูกดเริ่มเกมได้เลย'
      : '✨ สมาชิกพร้อมแล้ว กดเริ่มเกมได้เลย'
    : room.roomMode === 'teacher'
    ? '⏳ รอนักเรียนเข้าร่วมห้อง (อย่างน้อย 1 คน หรือเพิ่มบอท)...'
    : room.roomMode === 'multiplayer'
    ? '⏳ รอผู้เล่นเข้าร่วม (ต้องการอย่างน้อย 2 คน)...'
    : '⏳ รอผู้เล่นเข้าร่วม...';

  const handleEmoteClick = (emoji) => {
    playSfx('sparkle');
    if (onSendEmote) onSendEmote(emoji);
  };

  return (
    <section className="cute-landing-section page-screen-anim">
      {/* 🌸 Cute Animal Crossing Meadow Backdrop */}
      <div
        className="cute-meadow-backdrop"
        style={{ backgroundImage: `url(${CUTE_ARENA_BACKDROP})` }}
        aria-hidden="true"
      />
      <div className="cute-meadow-overlay" aria-hidden="true" />

      <div className="cute-lobby-card cute-lobby-wide">
        {/* Left Side: Room Code & Emotes */}
        <div className="cute-lobby-column left-column" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="cute-column-header">
              <span className="cute-column-title">🏠 ห้องรอเริ่มเกม</span>
              <span className="cute-badge-tag">ROOM CODE</span>
            </div>

            <div className="cute-room-code-box">
              <div className="cute-room-code-sub">รหัสห้องสำหรับชวนเพื่อน</div>
              <div className="cute-room-code-val">{room.roomId}</div>
              <div className="cute-room-mode-tag">
                {modeLabels[room.roomMode] || room.roomMode}
              </div>
              <div className="cute-room-status-indicator" style={{
                marginTop: '8px',
                fontSize: '12px',
                fontWeight: 600,
                color: canStart ? '#2D6A28' : '#B45309',
                background: canStart ? '#EAF5E3' : '#FEF3C7',
                padding: '4px 10px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <span style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: canStart ? '#2D6A28' : '#F59E0B',
                  display: 'inline-block'
                }} />
                {statusText}
              </div>
            </div>

            <button type="button" className="cute-btn-copy-code" onClick={onCopyCode}>
              <UIIcon name="copy" size={15} color="var(--forest-primary)" />
              <span>คัดลอกรหัสห้อง</span>
            </button>
          </div>

          {/* Lobby Quick Emotes */}
          <div className="cute-lobby-emotes-section">
            <span className="cute-emotes-label">ส่งอีโมจิทักทาย:</span>
            <div className="cute-emotes-grid">
              {CUTE_LOBBY_EMOTES.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className="cute-mini-emote"
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
        <div className="cute-lobby-column right-column" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="cute-column-header">
              <span className="cute-column-title">👥 ผู้เล่นในห้อง</span>
              <span className="cute-badge-tag">{room.players.length}/{room.maxPlayers} คน</span>
            </div>

            <div className="cute-players-grid">
              {room.players.map((p) => {
                const isMe = p.id === myId;
                return (
                  <div key={p.id} className={`cute-player-slot ${isMe ? 'is-me' : ''}`} id={`scoreChip-${p.id}`}>
                    <div
                      className="cute-slot-avatar-wrap"
                      style={
                        p.color
                          ? {
                              border: `2.5px solid ${p.color}`,
                              boxShadow: `0 0 8px ${p.color}66`,
                            }
                          : undefined
                      }
                    >
                      <AnimalAvatar id={p.avatarId || (p.isBot ? 'sponge_glass' : 'lion')} size={32} />
                    </div>
                    <div className="cute-slot-details">
                      <div className="cute-slot-name">
                        <span>{p.name}</span>
                        {isMe && <span className="cute-me-pill">คุณ</span>}
                      </div>
                      <div className="cute-slot-status">
                        {p.isTeacher && <span className="cute-host-tag" style={{ background: '#4F46E5', color: '#FFFFFF' }}>👨‍🏫 คุณครู</span>}
                        {p.isHost && !p.isTeacher && <span className="cute-host-tag">👑 เจ้าของห้อง</span>}
                        {p.isBot && <span className="cute-bot-pill">บอท</span>}
                        {!p.connected && <span className="cute-offline-tag">⚠️ หลุดการเชื่อมต่อ</span>}
                      </div>
                    </div>
                  </div>
                );
              })}

              {Array.from({ length: Math.min(4, Math.max(0, room.maxPlayers - room.players.length)) }).map((_, i) => (
                <div key={`empty-${i}`} className="cute-player-slot empty">
                  <span className="cute-empty-text">+ รอผู้เล่นเข้าร่วม...</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: '14px' }}>
            {canAddBot && (
              <button type="button" className="cute-btn-add-bot" onClick={onAddBot}>
                <UIIcon name="bot" size={15} color="var(--forest-primary)" />
                <span>เพิ่มบอท AI ร่วมเล่น</span>
              </button>
            )}

            {isHost && (
              <button
                type="button"
                className={`cute-btn-start-game ${!canStart ? 'disabled' : ''}`}
                onClick={onStartGame}
                disabled={!canStart}
              >
                <UIIcon name="trophy" size={16} color="#ffffff" />
                <span>
                  {!canStart && room.roomMode === 'teacher'
                    ? 'รอนักเรียนอย่างน้อย 1 คน (หรือเพิ่มบอท)...'
                    : !canStart && room.roomMode === 'multiplayer'
                    ? 'รอผู้เล่นอย่างน้อย 2 คน...'
                    : room.roomMode === 'teacher'
                    ? 'เริ่มคาบเรียน / แข่งขัน! 🎓'
                    : 'เริ่มเกมทันที! ✨'}
                </span>
              </button>
            )}

            {!isHost && (
              <div className="cute-guest-waiting-box">
                <span className="cute-loading-spin" />
                <span>กำลังรอเจ้าของห้องกดเริ่มเกม...</span>
              </div>
            )}

            <button type="button" className="cute-btn-leave" onClick={onLeaveRoom}>
              ออกจากห้อง
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
