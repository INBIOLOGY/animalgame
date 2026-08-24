import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import confetti from 'canvas-confetti';
import TopNavbar from './components/TopNavbar';
import LandingScreen from './components/LandingScreen';
import LobbyScreen from './components/LobbyScreen';
import GameScreen from './components/GameScreen';
import VictoryModal from './components/VictoryModal';
import EncyclopediaModal from './components/EncyclopediaModal';
import TutorialModal from './components/TutorialModal';
import SpecialCardShowcase from './components/SpecialCardShowcase';
import CookieBanner from './components/CookieBanner';
import { playSfx } from './utils/audio';

const SOCKET_SERVER = import.meta.env.VITE_SERVER_URL || '';
const socket = io(SOCKET_SERVER, {
  transports: ['websocket', 'polling'],
});

export default function App() {
  const [isOnline, setIsOnline] = useState(socket.connected);
  const [myId, setMyId] = useState(socket.id);
  const [room, setRoom] = useState(null);
  const [toast, setToast] = useState({ text: '', type: 'error', visible: false });
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [timeAttackSeconds, setTimeAttackSeconds] = useState(60);
  const [showVictory, setShowVictory] = useState(false);
  const [showDex, setShowDex] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [activeSpecialEvent, setActiveSpecialEvent] = useState(null);
  const [showDropHints, setShowDropHints] = useState(() => {
    return localStorage.getItem('animalgame_drop_hints') !== 'false';
  });

  const toastTimerRef = useRef(null);
  const timeAttackTimerRef = useRef(null);

  const showToastMsg = (msg, type = 'error') => {
    setToast({ text: msg, type, visible: true });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
  };

  const handleToggleDropHints = () => {
    const nextState = !showDropHints;
    setShowDropHints(nextState);
    localStorage.setItem('animalgame_drop_hints', nextState ? 'true' : 'false');
    if (nextState) {
      showToastMsg('💡 เปิดตัวช่วยบอกช่องวางการ์ดแล้ว', 'info');
    } else {
      showToastMsg('🔒 ปิดตัวช่วยแล้ว (โหมดท้าทายความรู้ชีววิทยา!)', 'info');
    }
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

      // Auto-start for vs_bot and time_attack modes
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

    socket.on('special_card_played', (info) => {
      playSfx('sparkle');
      setActiveSpecialEvent(info);
      try {
        confetti({
          particleCount: 45,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#EF4444', '#8B5CF6', '#10B981']
        });
      } catch (e) {}

      showToastMsg(info.message || `${info.actorName} ใช้การ์ดพิเศษ "${info.cardTitle}"`, 'success');
    });

    socket.on('category_completed', (info) => {
      playSfx('fanfare');
      try {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899']
        });
      } catch (e) {}

      showToastMsg(
        `🏆 ${info.winnerName} พิชิตการ์ดคำถาม "${info.categoryTitle}" (+${info.points} แต้ม)`,
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
          `ทิ้ง "${info.discardedAnimal?.name || info.discardedAnimal?.title || 'การ์ด'}" ➜ จั่วได้ "${info.newAnimal?.name || info.newAnimal?.title || 'การ์ดใหม่'}"`,
          'success'
        );
      } else {
        showToastMsg(`${info.playerName} ทิ้งการ์ดแล้วจั่วใบใหม่`, 'info');
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
          particleCount: 120,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899']
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
      socket.off('special_card_played');
      socket.off('category_completed');
      socket.off('card_discarded');
      socket.off('player_emote');
      socket.off('game_ended');
      socket.off('room_rematch');
      clearInterval(timeAttackTimerRef.current);
    };
  }, []);

  // Socket Actions
  const handleCreateRoom = (playerName, avatarId, roomMode, timeLimitSec, maxPlayers = 8, botDifficulty = 'medium') => {
    socket.emit('create_room', { playerName, avatarId, roomMode, timeLimitSec, maxPlayers, botDifficulty }, (res) => {
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

  const handleSelectCard = (cardId) => {
    playSfx('select');
    setSelectedCardId((prev) => (prev === cardId ? null : cardId));
  };

  const handlePlaySpecialCard = (cardId) => {
    if (!room) return;
    const activePlayer = room.players[room.currentTurnIndex ?? 0];
    if (room.roomMode !== 'time_attack' && activePlayer?.id !== socket.id) {
      playSfx('discard');
      return showToastMsg(`ยังไม่ถึงตาของคุณ (รอตาของ: ${activePlayer ? activePlayer.name : 'เพื่อน'})`);
    }

    playSfx('sparkle');
    socket.emit('play_special_card', { cardId }, (res) => {
      if (res && res.ok) {
        setSelectedCardId(null);
      } else {
        playSfx('discard');
        showToastMsg(res?.error || 'ไม่สามารถใช้การ์ดพิเศษใบนี้ได้');
      }
    });
  };

  const executeMoveAction = (centerIdx, slotIdx, cardId) => {
    if (!room) return;
    const activePlayer = room.players[room.currentTurnIndex ?? 0];
    if (room.roomMode !== 'time_attack' && activePlayer?.id !== socket.id) {
      playSfx('discard');
      return showToastMsg(`ยังไม่ถึงตาของคุณ (รอตาของ: ${activePlayer ? activePlayer.name : 'เพื่อน'})`);
    }

    socket.emit('play_card', { centerIdx, slotIdx, animalCardId: cardId }, (res) => {
      if (res && res.ok) {
        playSfx('snap');
        setSelectedCardId(null);
      } else {
        playSfx('discard');
        showToastMsg(res?.error || 'คุณสมบัติของการ์ดไม่ตรงกับช่องคำถามนี้');
      }
    });
  };

  const handleSlotClick = (centerIdx, slotIdx) => {
    if (!selectedCardId) {
      playSfx('select');
      return showToastMsg('กรุณาแตะเลือกการ์ดในมือ หรือลากมาวางที่ช่อง');
    }
    executeMoveAction(centerIdx, slotIdx, selectedCardId);
  };

  const handleDiscardSingleCard = (cardId) => {
    if (!room) return;
    const activePlayer = room.players[room.currentTurnIndex ?? 0];
    if (room.roomMode !== 'time_attack' && activePlayer?.id !== socket.id) {
      playSfx('discard');
      return showToastMsg(`ยังไม่ถึงตาของคุณ (รอตาของ: ${activePlayer ? activePlayer.name : 'เพื่อน'})`);
    }

    const cardEl = document.getElementById(`handCard-${cardId}`);
    if (cardEl) cardEl.classList.add('burn-discard-anim');

    playSfx('discard');

    socket.emit('discard_card', { animalCardId: cardId }, (res) => {
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
        showDropHints={showDropHints}
        onToggleDropHints={handleToggleDropHints}
        onOpenDex={() => setShowDex(true)}
        onOpenTutorial={() => setShowTutorial(true)}
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
            onOpenTutorial={() => setShowTutorial(true)}
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
            showDropHints={showDropHints}
            onSelectCard={handleSelectCard}
            onPlaySpecialCard={handlePlaySpecialCard}
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

      {/* Interactive Animated Tutorial Modal */}
      {showTutorial && (
        <TutorialModal
          onClose={() => setShowTutorial(false)}
          onStartPlaying={() => {
            setShowTutorial(false);
          }}
        />
      )}

      {/* Cinematic Special Card Showcase Overlay */}
      {activeSpecialEvent && (
        <SpecialCardShowcase
          specialEvent={activeSpecialEvent}
          onComplete={() => setActiveSpecialEvent(null)}
        />
      )}

      {/* Cookie Consent Banner */}
      <CookieBanner />
    </>
  );
}
