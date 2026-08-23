import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import confetti from 'canvas-confetti';
import TopNavbar from './components/TopNavbar';
import LandingScreen from './components/LandingScreen';
import LobbyScreen from './components/LobbyScreen';
import GameScreen from './components/GameScreen';
import VictoryModal from './components/VictoryModal';
import EncyclopediaModal from './components/EncyclopediaModal';
import CookieBanner from './components/CookieBanner';
import { playSfx } from './utils/audio';

const socket = io();

export default function App() {
  const [isOnline, setIsOnline] = useState(socket.connected);
  const [myId, setMyId] = useState(socket.id);
  const [room, setRoom] = useState(null);
  const [toast, setToast] = useState({ text: '', type: 'error', visible: false });
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [timeAttackSeconds, setTimeAttackSeconds] = useState(60);
  const [showVictory, setShowVictory] = useState(false);
  const [showDex, setShowDex] = useState(false);

  const toastTimerRef = useRef(null);
  const timeAttackTimerRef = useRef(null);

  const showToastMsg = (msg, type = 'error') => {
    setToast({ text: msg, type, visible: true });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  useEffect(() => {
    socket.on('connect', () => {
      setIsOnline(true);
      setMyId(socket.id);
    });

    socket.on('disconnect', () => {
      setIsOnline(false);
    });

    socket.on('error_message', (msg) => {
      playSfx('discard');
      showToastMsg(msg, 'error');
    });

    socket.on('room_created', (newRoom) => {
      playSfx('pop');
      setRoom(newRoom);
      setShowVictory(false);

      // Auto-start for vs_bot and time_attack modes (no need to wait in lobby)
      if (newRoom.roomMode === 'vs_bot' || newRoom.roomMode === 'time_attack') {
        setTimeout(() => {
          socket.emit('start_game', (res) => {
            if (res && !res.ok) console.warn('Auto-start failed:', res.error);
          });
        }, 300);
      }
    });

    socket.on('room_updated', (newRoom) => {
      setRoom(newRoom);
    });

    socket.on('game_started', (newRoom) => {
      playSfx('fanfare');
      setRoom(newRoom);
      setShowVictory(false);

      if (newRoom.roomMode === 'time_attack') {
        const sec = newRoom.timeLimitSec || 60;
        setTimeAttackSeconds(sec);
        clearInterval(timeAttackTimerRef.current);
        timeAttackTimerRef.current = setInterval(() => {
          setTimeAttackSeconds((prev) => {
            if (prev <= 1) {
              clearInterval(timeAttackTimerRef.current);
              socket.emit('finish_game');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    });

    socket.on('category_completed', (info) => {
      playSfx('fanfare');
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2E7D32', '#0288D1', '#F57F17', '#7C3AED', '#5D4037']
        });
      } catch (e) {}

      showToastMsg(
        `${info.winnerName} พิชิตการ์ดหมวด "${info.categoryTitle}" (+${info.points} แต้ม)`,
        'success'
      );

      if (info.centerIdx !== undefined) {
        const cardEl = document.getElementById(`catCard-${info.centerIdx}`);
        if (cardEl) {
          cardEl.classList.add('flash-win');
          setTimeout(() => cardEl.classList.remove('flash-win'), 900);

          const rect = cardEl.getBoundingClientRect();
          const scorePop = document.createElement('div');
          scorePop.className = 'floating-score';
          scorePop.innerText = `+${info.points} แต้ม`;
          scorePop.style.left = `${rect.left + rect.width / 2}px`;
          scorePop.style.top = `${rect.top + rect.height / 2}px`;
          document.body.appendChild(scorePop);
          setTimeout(() => scorePop.remove(), 1400);
        }
      }
    });

    socket.on('card_discarded', (info) => {
      const isMe = info.playerId === socket.id;
      if (isMe) {
        playSfx('draw');
        showToastMsg(
          `ทิ้ง "${info.discardedAnimal?.name || 'การ์ด'}" ➜ จั่วได้ "${info.newAnimal?.name || 'การ์ดใหม่'}"`,
          'success'
        );
      } else {
        showToastMsg(`${info.playerName} ทิ้ง "${info.discardedAnimal?.name || 'การ์ด'}" แล้วจั่วใบใหม่`, 'info');
      }
    });

    socket.on('player_emote', ({ playerId, emote }) => {
      playSfx('sparkle');
      const chipEl = document.getElementById(`scoreChip-${playerId}`);
      if (chipEl) {
        const bubble = document.createElement('div');
        bubble.className = 'emote-bubble';
        bubble.innerText = emote;
        chipEl.appendChild(bubble);
        setTimeout(() => bubble.remove(), 2000);
      }
    });

    socket.on('game_ended', (finalRoom) => {
      clearInterval(timeAttackTimerRef.current);
      playSfx('victory');
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#2E7D32', '#0288D1', '#F57F17', '#7C3AED', '#5D4037']
        });
      } catch (e) {}
      setRoom(finalRoom);
      setShowVictory(true);
    });

    socket.on('room_rematch', (newRoom) => {
      playSfx('fanfare');
      setRoom(newRoom);
      setShowVictory(false);
      setSelectedCardId(null);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('error_message');
      socket.off('room_created');
      socket.off('room_updated');
      socket.off('game_started');
      socket.off('category_completed');
      socket.off('card_discarded');
      socket.off('player_emote');
      socket.off('game_ended');
      socket.off('room_rematch');
      clearInterval(timeAttackTimerRef.current);
    };
  }, []);

  // Socket Actions
  const handleCreateRoom = (playerName, avatarId, roomMode, timeLimitSec) => {
    socket.emit('create_room', { playerName, avatarId, roomMode, timeLimitSec }, (res) => {
      if (res && !res.ok) showToastMsg(res.error || 'สร้างห้องไม่สำเร็จ');
    });
  };

  const handleJoinRoom = (playerName, avatarId, roomId) => {
    socket.emit('join_room', { playerName, avatarId, roomId }, (res) => {
      if (res && !res.ok) showToastMsg(res.error || 'เข้าร่วมห้องไม่สำเร็จ');
    });
  };

  const handleAddBot = () => {
    playSfx('pop');
    socket.emit('add_bot', (res) => {
      if (res && !res.ok) showToastMsg(res.error || 'ไม่สามารถเพิ่มผู้เล่นจำลองได้');
    });
  };

  const handleStartGame = () => {
    socket.emit('start_game', (res) => {
      if (res && !res.ok) showToastMsg(res.error || 'ไม่สามารถเริ่มเกมได้');
    });
  };

  const handleLeaveRoom = () => {
    playSfx('discard');
    clearInterval(timeAttackTimerRef.current);
    socket.emit('leave_room');
    setRoom(null);
    setSelectedCardId(null);
    setShowVictory(false);
  };

  const handleCopyCode = () => {
    if (!room?.roomId) return;
    playSfx('sparkle');
    navigator.clipboard.writeText(room.roomId).then(() => {
      showToastMsg('คัดลอกรหัสห้องแล้ว ส่งให้เพื่อนได้ทันที', 'success');
    });
  };

  const handleSendEmote = (emote) => {
    playSfx('sparkle');
    socket.emit('send_emote', { emote });
  };

  const handleSelectCard = (animalId) => {
    playSfx('select');
    setSelectedCardId((prev) => (prev === animalId ? null : animalId));
  };

  const executeMoveAction = (centerIdx, slotIdx, animalId) => {
    if (!room) return;
    const activePlayer = room.players[room.currentTurnIndex ?? 0];
    if (room.roomMode !== 'time_attack' && activePlayer?.id !== socket.id) {
      playSfx('discard');
      return showToastMsg(`ยังไม่ถึงตาของคุณ (รอตาของ: ${activePlayer ? activePlayer.name : 'เพื่อน'})`);
    }

    socket.emit('play_card', { centerIdx, slotIdx, animalCardId: animalId }, (res) => {
      if (res && res.ok) {
        playSfx('snap');
        setSelectedCardId(null);
      } else {
        playSfx('discard');
        showToastMsg(res?.error || 'คุณสมบัติของการ์ดไม่ตรงกับช่องนี้');
      }
    });
  };

  const handleSlotClick = (centerIdx, slotIdx) => {
    if (!selectedCardId) {
      playSfx('select');
      return showToastMsg('กรุณาแตะเลือกการ์ดสัตว์ในมือ หรือลากมาวางที่ช่อง');
    }
    executeMoveAction(centerIdx, slotIdx, selectedCardId);
  };

  const handleDiscardSingleCard = (animalCardId) => {
    if (!room) return;
    const activePlayer = room.players[room.currentTurnIndex ?? 0];
    if (room.roomMode !== 'time_attack' && activePlayer?.id !== socket.id) {
      playSfx('discard');
      return showToastMsg(`ยังไม่ถึงตาของคุณ (รอตาของ: ${activePlayer ? activePlayer.name : 'เพื่อน'})`);
    }

    const cardEl = document.getElementById(`handCard-${animalCardId}`);
    if (cardEl) cardEl.classList.add('burn-discard-anim');

    playSfx('discard');

    socket.emit('discard_card', { animalCardId }, (res) => {
      if (res && res.ok) {
        setSelectedCardId(null);
      } else {
        showToastMsg(res?.error || 'ไม่สามารถทิ้งการ์ดได้');
        if (cardEl) cardEl.classList.remove('burn-discard-anim');
      }
    });
  };

  const handleDiscardSelectedOrFirst = () => {
    if (!room) return;
    const me = room.players.find((p) => p.id === socket.id);
    if (!me || !me.hand || me.hand.length === 0) return;
    const cardToDiscard = selectedCardId || me.hand[0].id;
    handleDiscardSingleCard(cardToDiscard);
  };

  const activeCenterCount = room?.centerCategories?.filter((c) => c !== null).length || 0;
  const deckRemaining = (room?.categoryDeck ? room.categoryDeck.length : 0) + activeCenterCount;

  return (
    <>
      <TopNavbar
        isOnline={isOnline}
        showDeckCounter={room && room.status === 'playing'}
        deckCount={deckRemaining}
        totalDeck={room?.totalCategories || 12}
        onOpenDex={() => setShowDex(true)}
      />

      {/* Global Toast */}
      <div id="toastBox" className={`${toast.type} ${toast.visible ? 'show' : ''}`}>
        {toast.text}
      </div>

      <main className="app-screen">
        {!room && (
          <LandingScreen
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
          />
        )}

        {room && room.status === 'waiting' && (
          <LobbyScreen
            room={room}
            myId={socket.id}
            onAddBot={handleAddBot}
            onStartGame={handleStartGame}
            onLeaveRoom={handleLeaveRoom}
            onCopyCode={handleCopyCode}
            onSendEmote={handleSendEmote}
          />
        )}

        {room && room.status === 'playing' && (
          <GameScreen
            room={room}
            myId={socket.id}
            selectedCardId={selectedCardId}
            timeAttackSeconds={timeAttackSeconds}
            onSelectCard={handleSelectCard}
            onSlotClick={handleSlotClick}
            onDropCardOnSlot={executeMoveAction}
            onPassTurn={handleDiscardSelectedOrFirst}
            onDiscardSingle={handleDiscardSingleCard}
            onDiscardSelectedOrFirst={handleDiscardSelectedOrFirst}
            onSendEmote={handleSendEmote}
            onLeaveRoom={handleLeaveRoom}
          />
        )}
      </main>

      {/* Victory Modal */}
      {showVictory && (
        <VictoryModal
          room={room}
          myId={socket.id}
          onRematch={() => {
            playSfx('fanfare');
            socket.emit('rematch');
          }}
          onLeave={handleLeaveRoom}
        />
      )}

      {/* Dex Encyclopedia Modal */}
      {showDex && (
        <EncyclopediaModal onClose={() => setShowDex(false)} />
      )}

      {/* Cookie Consent Banner */}
      <CookieBanner />
    </>
  );
}
