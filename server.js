const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
      : ['http://localhost:3000', 'http://localhost:5173', 'https://animalgame-five.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3000;
const MAX_PLAYERS = 10;
const MIN_NAME_LEN = 1;
const MAX_NAME_LEN = 16;
const RECONNECT_GRACE_MS = 15000;

// ให้ความสำคัญกับไฟล์ build ของ React (dist) ก่อน ถ้าไม่มีให้ใช้ public
if (fs.existsSync(path.join(__dirname, 'dist'))) {
  app.use(express.static(path.join(__dirname, 'dist')));
}
app.use(express.static(path.join(__dirname, 'public')));

// โหลดฐานข้อมูลการ์ดสัตว์และการ์ดหมวดหมู่
const ALL_ANIMALS = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/animals.json'), 'utf8'));
const ALL_CATEGORIES = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/categories.json'), 'utf8'));

const rooms = new Map();
const disconnectTimers = new Map();

function generateRoomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function createUniqueRoomCode() {
  let roomId = generateRoomCode();
  while (rooms.has(roomId)) {
    roomId = generateRoomCode();
  }
  return roomId;
}

function sanitizeName(raw) {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim().slice(0, MAX_NAME_LEN);
  if (trimmed.length < MIN_NAME_LEN) return null;
  return trimmed;
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function findRoomBySocket(socketId) {
  for (const [roomId, room] of rooms.entries()) {
    const player = room.players.find((p) => p.id === socketId);
    if (player) return { roomId, room, player };
  }
  return null;
}

function broadcastRoomState(roomId) {
  const room = rooms.get(roomId);
  if (room) {
    io.to(roomId).emit('room_updated', room);
  }
}

function checkValidMove(animalCard, categoryCard, slotIndex) {
  if (!animalCard || !categoryCard || slotIndex < 0 || slotIndex >= categoryCard.slots.length) {
    return false;
  }
  const requiredTrait = categoryCard.slots[slotIndex];
  if (animalCard.traits.includes(requiredTrait)) return true;

  const aliases = {
    backbone: ['has_backbone', 'backbone'],
    has_backbone: ['has_backbone', 'backbone'],
    no_backbone: ['no_backbone', 'invertebrate'],
    invertebrate: ['no_backbone', 'invertebrate'],
    fly: ['can_fly', 'fly'],
    can_fly: ['can_fly', 'fly'],
    swim: ['water_living', 'swim'],
    water_living: ['water_living', 'swim'],
    terrestrial: ['land_living', 'terrestrial'],
    land_living: ['land_living', 'terrestrial'],
  };

  const matches = aliases[requiredTrait];
  if (matches) {
    return matches.some((t) => animalCard.traits.includes(t));
  }
  return false;
}

function advanceTurn(room) {
  if (!room || room.players.length === 0) return;
  room.currentTurnIndex = (room.currentTurnIndex + 1) % room.players.length;
  broadcastRoomState(room.roomId);

  // ถ้าถึงตาของ Bot ให้รัน Bot AI ตามระดับความยาก
  const activePlayer = room.players[room.currentTurnIndex];
  if (activePlayer && activePlayer.isBot && room.status === 'playing') {
    const diff = room.botDifficulty || 'medium';
    const delay = diff === 'easy' ? 1800 : diff === 'hard' ? 900 : 1300;
    setTimeout(() => {
      runBotTurn(room, activePlayer);
    }, delay);
  }
}

function runBotTurn(room, botPlayer) {
  if (!room || room.status !== 'playing') return;

  // ตรวจสอบว่าเป็นตาของบอทตัวนี้จริงๆ
  const currentActive = room.players[room.currentTurnIndex];
  if (!currentActive || currentActive.id !== botPlayer.id) return;

  const difficulty = room.botDifficulty || 'medium';

  let possibleMoves = [];

  if (botPlayer.hand && botPlayer.hand.length > 0) {
    botPlayer.hand.forEach((animal) => {
      room.centerCategories.forEach((centerItem, centerIdx) => {
        if (!centerItem || !centerItem.category) return;
        centerItem.filledSlots.forEach((slot, slotIdx) => {
          if (slot === null) {
            if (checkValidMove(animal, centerItem.category, slotIdx)) {
              const emptyCount = centerItem.filledSlots.filter((s) => s === null).length;
              const points = centerItem.category.points || 15;
              possibleMoves.push({
                animal,
                centerIdx,
                slotIdx,
                isWinningMove: emptyCount === 1,
                emptyCount,
                points
              });
            }
          }
        });
      });
    });
  }

  if (possibleMoves.length > 0) {
    let chosen = null;

    if (difficulty === 'easy') {
      // 🟢 โหมดง่าย: เล่นสบายๆ 40% ปิดแต้ม, 60% วางตามใจชอบ
      const winningMoves = possibleMoves.filter((m) => m.isWinningMove);
      if (winningMoves.length > 0 && Math.random() < 0.4) {
        chosen = winningMoves[Math.floor(Math.random() * winningMoves.length)];
      } else {
        chosen = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      }
    } else if (difficulty === 'hard') {
      // 🔴 โหมดยาก: เล่นเชิงกลยุทธ์ แย่งแต้มสูงสุดและดักทางคู่แข่ง
      possibleMoves.sort((a, b) => {
        if (a.isWinningMove !== b.isWinningMove) {
          return b.isWinningMove ? 1 : -1;
        }
        if (a.isWinningMove && b.isWinningMove) {
          return b.points - a.points; // ปิดเควสต์ที่แต้มสูงกว่าก่อน
        }
        // เลี่ยงการวางแล้วเหลือ 1 ช่องเปิดทางให้คนอื่นแย่งแต้ม
        const aRisk = a.emptyCount === 2 ? -10 : 0;
        const bRisk = b.emptyCount === 2 ? -10 : 0;
        return (b.points + bRisk) - (a.points + aRisk);
      });
      chosen = possibleMoves[0];
    } else {
      // 🟡 โหมดปานกลาง: เน้นปิดแต้มเควสต์ตามปกติ 85%
      possibleMoves.sort((a, b) => (b.isWinningMove ? 1 : 0) - (a.isWinningMove ? 1 : 0) || b.points - a.points);
      if (possibleMoves[0].isWinningMove || Math.random() < 0.85) {
        chosen = possibleMoves[0];
      } else {
        chosen = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      }
    }

    if (chosen) {
      executeMove(room, botPlayer.id, chosen.centerIdx, chosen.slotIdx, chosen.animal.id);
      return;
    }
  }

  // หากไม่มีท่าที่ลงได้ ให้บอททิ้งการ์ด 1 ใบ แล้วจั่วใหม่
  let discardIdx = 0;
  if (difficulty === 'hard' && botPlayer.hand.length > 1) {
    let leastUsefulIdx = 0;
    let minMatches = 999;
    botPlayer.hand.forEach((card, idx) => {
      let matches = 0;
      room.centerCategories.forEach((centerItem) => {
        if (!centerItem || !centerItem.category) return;
        centerItem.filledSlots.forEach((slot, slotIdx) => {
          if (slot === null && checkValidMove(card, centerItem.category, slotIdx)) {
            matches++;
          }
        });
      });
      if (matches < minMatches) {
        minMatches = matches;
        leastUsefulIdx = idx;
      }
    });
    discardIdx = leastUsefulIdx;
  }

  const discardedAnimal = botPlayer.hand.splice(discardIdx, 1)[0] || botPlayer.hand.shift();
  if (room.animalDeck.length === 0) {
    room.animalDeck = shuffle(ALL_ANIMALS);
  }
  const newAnimal = room.animalDeck.pop();
  botPlayer.hand.push(newAnimal);

  io.to(room.roomId).emit('card_discarded', {
    playerId: botPlayer.id,
    playerName: botPlayer.name,
    discardedAnimal,
    newAnimal
  });
  advanceTurn(room);
}

function executeMove(room, playerId, centerIdx, slotIdx, animalCardId) {
  const player = room.players.find((p) => p.id === playerId);
  if (!player || !player.hand) return { ok: false, error: 'ไม่พบผู้เล่น' };

  // ตรวจสอบตาวิธีเล่น (Turn Validation) เฉพาะโหมดที่มีผู้เล่นมากกว่า 1 คน
  if (room.roomMode !== 'time_attack') {
    const activePlayer = room.players[room.currentTurnIndex];
    if (!activePlayer || activePlayer.id !== playerId) {
      return { ok: false, error: `ยังไม่ถึงตาของคุณ (ตาของ: ${activePlayer ? activePlayer.name : 'คนอื่น'})` };
    }
  }

  const centerItem = room.centerCategories[centerIdx];
  if (!centerItem || !centerItem.category) return { ok: false, error: 'ไม่พบการ์ดหมวดหมู่' };

  if (centerItem.filledSlots[slotIdx] !== null) {
    return { ok: false, error: 'ช่องนี้มีคนวางการ์ดไปแล้ว' };
  }

  const animalIdx = player.hand.findIndex((a) => a.id === animalCardId);
  if (animalIdx === -1) return { ok: false, error: 'ไม่มีการ์ดใบนี้ในมือ' };
  const animalCard = player.hand[animalIdx];

  if (!checkValidMove(animalCard, centerItem.category, slotIdx)) {
    return { ok: false, error: 'การ์ดตัวนี้ไม่มีคุณสมบัติที่ช่องต้องการ' };
  }

  // วางการ์ดลงช่อง
  centerItem.filledSlots[slotIdx] = {
    animalCard,
    playerId: player.id,
    playerName: player.name,
    isBot: player.isBot
  };

  // ลบการ์ดออกจากมือ และจั่วใบใหม่ขึ้นมือ
  player.hand.splice(animalIdx, 1);
  if (room.animalDeck.length === 0) {
    room.animalDeck = shuffle(ALL_ANIMALS);
  }
  player.hand.push(room.animalDeck.pop());

  let completedNotice = null;

  // ตรวจสอบว่าเติมเต็มครบทุกช่องแล้วหรือยัง
  if (centerItem.filledSlots.every((s) => s !== null)) {
    const gainedPoints = centerItem.category.points;
    player.score += gainedPoints;
    player.wonCount = (player.wonCount || 0) + 1;

    completedNotice = {
      winnerId: player.id,
      winnerName: player.name,
      categoryTitle: centerItem.category.title,
      points: gainedPoints,
      centerIdx
    };

    if (room.categoryDeck.length > 0) {
      const nextCategory = room.categoryDeck.pop();
      room.centerCategories[centerIdx] = {
        category: nextCategory,
        filledSlots: new Array(nextCategory.slots.length).fill(null)
      };
    } else {
      room.centerCategories[centerIdx] = null;
    }
  }

  if (completedNotice) {
    io.to(room.roomId).emit('category_completed', completedNotice);
  }

  // ตรวจสอบว่าการ์ดหมวดหมู่หมดเกลี้ยงทุกใบแล้วหรือยัง (Game Over condition)
  if (room.centerCategories.every((c) => c === null)) {
    room.status = 'ended';
    io.to(room.roomId).emit('game_ended', room);
    broadcastRoomState(room.roomId);
    return { ok: true };
  }

  // สลับตาเล่นไปยังคนถัดไป
  if (room.roomMode !== 'time_attack') {
    advanceTurn(room);
  } else {
    broadcastRoomState(room.roomId);
  }

  return { ok: true };
}

function removePlayerFromRoom(roomId, socketId) {
  const room = rooms.get(roomId);
  if (!room) return;

  const idx = room.players.findIndex((p) => p.id === socketId);
  if (idx === -1) return;

  room.players.splice(idx, 1);

  if (room.players.length === 0 || room.players.every((p) => p.isBot)) {
    rooms.delete(roomId);
    return;
  }

  if (room.currentTurnIndex >= room.players.length) {
    room.currentTurnIndex = 0;
  }

  if (!room.players.some((p) => p.isHost && !p.isBot)) {
    const nextHuman = room.players.find((p) => !p.isBot);
    if (nextHuman) nextHuman.isHost = true;
  }

  broadcastRoomState(roomId);
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // 1. สร้างห้องใหม่
  socket.on('create_room', ({ playerName, avatarId = 'lion', roomMode = 'multiplayer', timeLimitSec = 60, maxPlayers = 8, botDifficulty = 'medium' } = {}, ack) => {
    const name = sanitizeName(playerName);
    if (!name) {
      const msg = 'กรุณาใส่ชื่อผู้เล่นให้ถูกต้อง (1-16 ตัวอักษร)';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    const roomId = createUniqueRoomCode();
    const hostPlayer = {
      id: socket.id,
      name,
      avatarId: avatarId || 'lion',
      isHost: true,
      connected: true,
      isBot: false,
      score: 0,
      hand: []
    };

    const players = [hostPlayer];

    // ถ้าเป็นโหมด vs_bot ให้สร้าง Bot 3 ตัว
    if (roomMode === 'vs_bot') {
      const botAvatars = ['owl', 'tiger', 'cheetah'];
      for (let i = 1; i <= 3; i++) {
        players.push({
          id: `bot_${roomId}_${i}`,
          name: `บอท ${i}`,
          avatarId: botAvatars[i - 1] || 'owl',
          isHost: false,
          connected: true,
          isBot: true,
          score: 0,
          hand: []
        });
      }
    }

    const finalMaxPlayers = roomMode === 'time_attack' ? 1 : Math.min(10, Math.max(2, Number(maxPlayers) || 4));

    const newRoom = {
      roomId,
      roomMode,
      botDifficulty: ['easy', 'medium', 'hard'].includes(botDifficulty) ? botDifficulty : 'medium',
      timeLimitSec: Number(timeLimitSec) || 60,
      players,
      maxPlayers: finalMaxPlayers,
      status: 'waiting',
      currentTurnIndex: 0,
      animalDeck: [],
      categoryDeck: [],
      centerCategories: [],
      createdAt: Date.now()
    };

    rooms.set(roomId, newRoom);
    socket.join(roomId);
    socket.data.roomId = roomId;

    socket.emit('room_created', newRoom);
    if (typeof ack === 'function') ack({ ok: true, room: newRoom });
  });

  // 2. เข้าร่วมห้อง
  socket.on('join_room', ({ roomId, playerName, avatarId = 'lion' } = {}, ack) => {
    const name = sanitizeName(playerName);
    if (!name) {
      const msg = 'กรุณาใส่ชื่อผู้เล่นให้ถูกต้อง (1-16 ตัวอักษร)';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    const room = rooms.get(roomId);
    if (!room) {
      const msg = 'ไม่พบห้องนี้ในระบบ';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }
    if (room.roomMode === 'time_attack') {
      const msg = 'ห้องโหมดแข่งกับตัวเองไม่สามารถมีผู้เล่นอื่นร่วมได้';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }
    if (room.players.length >= room.maxPlayers) {
      const msg = `ห้องนี้ผู้เล่นเต็มแล้ว (สูงสุด ${room.maxPlayers} คน)`;
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }
    if (room.status !== 'waiting') {
      const msg = 'เกมกำลังดำเนินอยู่ ไม่สามารถเข้าร่วมได้';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }
    if (room.players.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      const msg = 'มีชื่อนี้อยู่ในห้องแล้ว กรุณาใช้ชื่ออื่น';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    const player = { id: socket.id, name, avatarId: avatarId || 'lion', isHost: false, connected: true, isBot: false, score: 0, hand: [] };
    room.players.push(player);
    socket.join(roomId);
    socket.data.roomId = roomId;

    broadcastRoomState(roomId);
    if (typeof ack === 'function') ack({ ok: true, room });
  });

  // 3. เพิ่มบอทลงห้อง
  socket.on('add_bot', (ack) => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);
    if (!room) return;
    const requester = room.players.find((p) => p.id === socket.id);
    if (!requester || !requester.isHost) {
      const msg = 'มีแค่ Host เท่านั้นที่เพิ่มบอทได้';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }
    if (room.players.length >= room.maxPlayers) {
      const msg = `ห้องผู้เล่นเต็มแล้ว (สูงสุด ${room.maxPlayers} คน)`;
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    const botAvatars = ['owl', 'tiger', 'cheetah', 'koala', 'dolphin', 'elephant', 'wolf', 'penguin'];
    const botIndex = room.players.filter((p) => p.isBot).length + 1;
    const botPlayer = {
      id: `bot_${roomId}_${Date.now()}_${botIndex}`,
      name: `บอท ${botIndex}`,
      avatarId: botAvatars[(botIndex - 1) % botAvatars.length],
      isHost: false,
      connected: true,
      isBot: true,
      score: 0,
      hand: []
    };
    room.players.push(botPlayer);
    broadcastRoomState(roomId);
    if (typeof ack === 'function') ack({ ok: true, room });
  });

  // 4. เริ่มเกม
  socket.on('start_game', (ack) => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);
    if (!room) return;

    const requester = room.players.find((p) => p.id === socket.id);
    if (!requester || !requester.isHost) {
      const msg = 'มีแค่ Host เท่านั้นที่เริ่มเกมได้';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }
    if (room.roomMode === 'multiplayer' && room.players.length < 2) {
      const msg = 'โหมดเล่นหลายคน ต้องมีผู้เล่นอย่างน้อย 2 คนถึงจะเริ่มเกมได้';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    room.animalDeck = shuffle(ALL_ANIMALS);
    while (room.animalDeck.length < room.players.length * 4 + 10) {
      room.animalDeck = [...room.animalDeck, ...shuffle(ALL_ANIMALS)];
    }
    const selectedCats = shuffle(ALL_CATEGORIES).slice(0, 12);
    room.totalCategories = selectedCats.length;
    room.categoryDeck = selectedCats;

    room.centerCategories = [];
    for (let i = 0; i < 6; i++) {
      if (room.categoryDeck.length > 0) {
        const cat = room.categoryDeck.pop();
        room.centerCategories.push({
          category: cat,
          filledSlots: new Array(cat.slots.length).fill(null)
        });
      }
    }

    room.players.forEach((p) => {
      p.score = 0;
      p.wonCount = 0;
      p.hand = room.animalDeck.splice(0, 4);
    });

    room.status = 'playing';
    room.currentTurnIndex = 0;
    room.startTime = Date.now();

    io.to(roomId).emit('game_started', room);
    broadcastRoomState(roomId);

    // หากคนแรกที่ได้เล่นคือ บอท ให้สั่ง บอท เล่น
    const firstPlayer = room.players[0];
    if (firstPlayer && firstPlayer.isBot) {
      setTimeout(() => runBotTurn(room, firstPlayer), 1500);
    }

    if (typeof ack === 'function') ack({ ok: true, room });
  });

  // 5. วางการ์ดลงช่อง (Play Card)
  socket.on('play_card', ({ centerIdx, slotIdx, animalCardId } = {}, ack) => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);
    if (!room || room.status !== 'playing') {
      const msg = 'เกมยังไม่เริ่มหรือจบไปแล้ว';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    const res = executeMove(room, socket.id, centerIdx, slotIdx, animalCardId);
    if (!res.ok) {
      socket.emit('error_message', res.error);
    }
    if (typeof ack === 'function') ack(res);
  });

  // 6. ข้ามตา (Pass Turn)
  socket.on('pass_turn', (ack) => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);
    if (!room || room.status !== 'playing') return;

    if (room.roomMode !== 'time_attack') {
      const activePlayer = room.players[room.currentTurnIndex];
      if (!activePlayer || activePlayer.id !== socket.id) {
        const msg = 'ยังไม่ถึงตาของคุณ';
        socket.emit('error_message', msg);
        return typeof ack === 'function' && ack({ ok: false, error: msg });
      }

      // ทิ้งการ์ด 1 ใบแรก (หรือใบที่เลือก) แล้วจั่วใหม่ 1 ใบ
      const discardedAnimal = activePlayer.hand.shift();
      if (room.animalDeck.length === 0) {
        room.animalDeck = shuffle(ALL_ANIMALS);
      }
      const newAnimal = room.animalDeck.pop();
      activePlayer.hand.push(newAnimal);

      io.to(room.roomId).emit('card_discarded', {
        playerId: activePlayer.id,
        playerName: activePlayer.name,
        discardedAnimal,
        newAnimal
      });

      advanceTurn(room);
      if (typeof ack === 'function') ack({ ok: true });
    } else {
      const player = room.players.find(p => p.id === socket.id);
      if (player && player.hand.length > 0) {
        const discardedAnimal = player.hand.shift();
        if (room.animalDeck.length === 0) {
          room.animalDeck = shuffle(ALL_ANIMALS);
        }
        const newAnimal = room.animalDeck.pop();
        player.hand.push(newAnimal);

        io.to(room.roomId).emit('card_discarded', {
          playerId: player.id,
          playerName: player.name,
          discardedAnimal,
          newAnimal
        });
        io.to(room.roomId).emit('room_updated', room);
        if (typeof ack === 'function') ack({ ok: true });
      }
    }
  });

  // 6.2 ทิ้งการ์ดใบที่เลือกเจาะจง 1 ใบ (Discard Specific Single Card & Draw 1)
  socket.on('discard_card', ({ animalCardId } = {}, ack) => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);
    if (!room || room.status !== 'playing') return;

    if (room.roomMode !== 'time_attack') {
      const activePlayer = room.players[room.currentTurnIndex];
      if (!activePlayer || activePlayer.id !== socket.id) {
        const msg = 'ยังไม่ถึงตาของคุณ';
        socket.emit('error_message', msg);
        return typeof ack === 'function' && ack({ ok: false, error: msg });
      }

      const cardIdx = activePlayer.hand.findIndex(c => c.id === animalCardId);
      const discardedAnimal = cardIdx !== -1 ? activePlayer.hand.splice(cardIdx, 1)[0] : activePlayer.hand.shift();

      if (room.animalDeck.length === 0) {
        room.animalDeck = shuffle(ALL_ANIMALS);
      }
      const newAnimal = room.animalDeck.pop();
      activePlayer.hand.push(newAnimal);

      io.to(room.roomId).emit('card_discarded', {
        playerId: activePlayer.id,
        playerName: activePlayer.name,
        discardedAnimal,
        newAnimal
      });

      advanceTurn(room);
      if (typeof ack === 'function') ack({ ok: true, newAnimal });
    } else {
      const player = room.players.find(p => p.id === socket.id);
      if (player && player.hand.length > 0) {
        const cardIdx = player.hand.findIndex(c => c.id === animalCardId);
        const discardedAnimal = cardIdx !== -1 ? player.hand.splice(cardIdx, 1)[0] : player.hand.shift();

        if (room.animalDeck.length === 0) {
          room.animalDeck = shuffle(ALL_ANIMALS);
        }
        const newAnimal = room.animalDeck.pop();
        player.hand.push(newAnimal);

        io.to(room.roomId).emit('card_discarded', {
          playerId: player.id,
          playerName: player.name,
          discardedAnimal,
          newAnimal
        });
        io.to(room.roomId).emit('room_updated', room);
        if (typeof ack === 'function') ack({ ok: true, newAnimal });
      }
    }
  });

  // 7. ส่งอีโมจิสื่ออารมณ์ (Emotes / Reactions)
  socket.on('send_emote', ({ emote } = {}) => {
    const roomId = socket.data.roomId;
    if (!roomId || !emote) return;
    io.to(roomId).emit('player_emote', { playerId: socket.id, emote });
  });

  // 8. ออกจากห้อง
  socket.on('leave_room', () => {
    const roomId = socket.data.roomId;
    if (!roomId) return;
    socket.leave(roomId);
    socket.data.roomId = null;
    removePlayerFromRoom(roomId, socket.id);
  });

  // 8. จบเกม
  socket.on('finish_game', () => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);
    if (!room) return;

    room.status = 'ended';
    io.to(roomId).emit('game_ended', room);
    broadcastRoomState(roomId);
  });

  // 9. เล่นใหม่อีกรอบ (Rematch / Return to Lobby)
  socket.on('rematch', (ack) => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);
    if (!room) return;

    room.status = 'waiting';
    room.players.forEach((p) => {
      p.score = 0;
      p.wonCount = 0;
      p.hand = [];
    });
    room.currentTurnIndex = 0;
    room.animalDeck = [];
    room.categoryDeck = [];
    room.centerCategories = [];

    broadcastRoomState(roomId);
    io.to(roomId).emit('room_rematch', room);
    if (typeof ack === 'function') ack({ ok: true, room });
  });

  // 10. จัดการหลุดการเชื่อมต่อ
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    const found = findRoomBySocket(socket.id);
    if (!found) return;

    const { roomId, room, player } = found;
    player.connected = false;
    broadcastRoomState(roomId);

    const timer = setTimeout(() => {
      disconnectTimers.delete(socket.id);
      const stillThere = rooms.get(roomId)?.players.find((p) => p.id === socket.id);
      if (stillThere && !stillThere.connected) {
        removePlayerFromRoom(roomId, socket.id);
      }
    }, RECONNECT_GRACE_MS);

    disconnectTimers.set(socket.id, timer);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Error: Port ${PORT} is already in use.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});
