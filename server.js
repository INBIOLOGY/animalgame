const express = require('express');
const compression = require('compression');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');

const app = express();
app.use(compression()); // ⚡ Ultra-fast Gzip / Deflate compression for all HTTP assets

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 30000,
  pingInterval: 10000,
});

// ⚡ Fast Healthcheck & Server Wakeup endpoint
app.get('/api/health', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ status: 'ok', timestamp: Date.now(), activeRooms: rooms.size });
});
app.get('/healthz', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send('OK');
});

const PORT = process.env.PORT || 3000;
const MAX_PLAYERS = 10;
const MIN_NAME_LEN = 1;
const MAX_NAME_LEN = 16;
const RECONNECT_GRACE_MS = 15000;

// ให้ความสำคัญกับไฟล์ build ของ React (dist) ก่อน พร้อมตั้งค่า Cache-Control เพื่อความเร็วสูงสุด
if (fs.existsSync(path.join(__dirname, 'dist'))) {
  app.use(express.static(path.join(__dirname, 'dist'), {
    maxAge: '1y',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        // ห้ามแคช HTML เพื่อให้ผู้ใช้ได้รับเวอร์ชันล่าสุดเสมอทันที
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else if (filePath.includes('assets') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
        // แคชไฟล์ JS/CSS ที่มี hash ได้ยาวนานเพื่อความเร็วสูงสุด
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));
}
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '7d',
  setHeaders: (res, filePath) => {
    if (filePath.match(/\.(png|jpg|jpeg|webp|svg|gif|mp3|ogg|wav)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    }
  }
}));

// โหลดฐานข้อมูลการ์ดสัตว์ การ์ดคำถาม และการ์ดพิเศษ
const ALL_ANIMALS = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/animals.json'), 'utf8'));
const ALL_CATEGORIES = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/categories.json'), 'utf8'));
const ALL_SPECIALS = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/specials.json'), 'utf8'));

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

function buildGameDeck() {
  const deck = [];
  // เพิ่มการ์ดสัตว์ทั้งหมด (56 ชนิด) พร้อม cardInstanceId เฉพาะใบ
  ALL_ANIMALS.forEach(animal => {
    deck.push({
      ...animal,
      cardInstanceId: `${animal.id}_${Math.random().toString(36).substr(2, 7)}`,
      cardType: 'animal'
    });
  });

  // เพิ่มการ์ดพิเศษตามจำนวน copies
  ALL_SPECIALS.forEach(special => {
    const count = special.copiesInDeck || 2;
    for (let i = 0; i < count; i++) {
      deck.push({
        ...special,
        cardInstanceId: `${special.id}_${i}_${Math.random().toString(36).substr(2, 7)}`,
        cardType: 'special'
      });
    }
  });

  // 3-pass Fisher-Yates shuffle เพื่อการกระจายไพ่ที่สมบูรณ์แบบ
  let shuffled = deck;
  for (let pass = 0; pass < 3; pass++) {
    shuffled = shuffle(shuffled);
  }
  return shuffled;
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

function checkValidMove(card, categoryCard, slotIndex) {
  if (!card || !categoryCard || slotIndex < 0 || slotIndex >= categoryCard.slots.length) {
    return false;
  }

  // การ์ด Fit Free (Wildcard) ลงได้ทุกช่อง
  if (
    card.actionType === 'wildcard' ||
    card.id === 'special_fit_free' ||
    card.id?.startsWith('special_fit_free') ||
    card.cardInstanceId?.startsWith('special_fit_free') ||
    card.isPlayableOnSlot
  ) {
    return true;
  }

  const slot = categoryCard.slots[slotIndex];
  const requiredTrait = typeof slot === 'object' ? slot.requiredTrait : slot;
  if (!requiredTrait) return false;

  const animalTraits = card.traits || [];
  if (animalTraits.includes(requiredTrait)) return true;

  const aliases = {
    phylum_porifera: ['no_tissue', 'asymmetry', 'spongin_spicule', 'choanocyte', 'spongocoel_osculum', 'no_nervous_digestive'],
    phylum_cnidaria: ['radial_symmetry', 'incomplete_gut', 'nerve_net', 'cnidocyte', 'polyp_medusa', 'tentacle_nematocyst'],
    phylum_platyhelminthes: ['flat_body', 'pharynx_incomplete_gut', 'flame_cell', 'ladder_nerve', 'triploblastic_acoelomate'],
    phylum_nematoda: ['longitudinal_muscle', 'shiny_parasite', 'pseudocoelom', 'thick_cuticle', 'ecdysozoa_pseudocoelom'],
    phylum_annelida: ['closed_circulation', 'lophophore_closed_blood', 'nephridium', 'segmented_round_body', 'parapodia', 'clitellum', 'gizzard_crop'],
    phylum_mollusca: ['mantle_cavity', 'mantle', 'radula', 'siphon', 'exoskeleton_endoskeleton_shell', 'visceral_mass'],
    phylum_arthropoda: ['jointed_appendages', 'exoskeleton_chitin', 'head_thorax_abdomen', 'open_circulatory_molting', 'triploblastic_jointed'],
    phylum_echinodermata: ['all_marine', 'bilateral_larva_radial_adult', 'spiny_water_vascular', 'tube_feet', 'nerve_ring'],
    phylum_chordata: ['notochord', 'dorsal_nerve_cord', 'gill_slits', 'post_anal_tail', 'vertebrate_closed_blood'],
    backbone: ['notochord', 'vertebrate_closed_blood', 'phylum_chordata'],
    has_backbone: ['notochord', 'vertebrate_closed_blood', 'phylum_chordata'],
    no_backbone: ['phylum_porifera', 'phylum_cnidaria', 'phylum_platyhelminthes', 'phylum_nematoda', 'phylum_annelida', 'phylum_mollusca', 'phylum_arthropoda', 'phylum_echinodermata'],
    invertebrate: ['phylum_porifera', 'phylum_cnidaria', 'phylum_platyhelminthes', 'phylum_nematoda', 'phylum_annelida', 'phylum_mollusca', 'phylum_arthropoda', 'phylum_echinodermata'],
  };

  const matches = aliases[requiredTrait];
  if (matches) {
    return matches.some((t) => animalTraits.includes(t));
  }
  return false;
}

function advanceTurn(room, step = 1) {
  if (!room || room.players.length === 0) return;
  const dir = room.playDirection || 1;
  const numPlayers = room.players.length;
  room.currentTurnIndex = (room.currentTurnIndex + step * dir + numPlayers * 100) % numPlayers;
  broadcastRoomState(room.roomId);

  // ถ้าถึงตาของ Bot ให้รัน Bot AI
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

  const currentActive = room.players[room.currentTurnIndex];
  if (!currentActive || currentActive.id !== botPlayer.id) return;

  const difficulty = room.botDifficulty || 'medium';

  // 1. ตรวจสอบว่าบอทมีท่าลงการ์ดคำตอบทั่วไปหรือไม่
  let possibleMoves = [];

  if (botPlayer.hand && botPlayer.hand.length > 0) {
    botPlayer.hand.forEach((card) => {
      room.centerCategories.forEach((centerItem, centerIdx) => {
        if (!centerItem || !centerItem.category) return;
        centerItem.filledSlots.forEach((slot, slotIdx) => {
          if (slot === null) {
            if (checkValidMove(card, centerItem.category, slotIdx)) {
              const emptyCount = centerItem.filledSlots.filter((s) => s === null).length;
              const points = centerItem.category.points || 20;
              possibleMoves.push({
                card,
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
      const winningMoves = possibleMoves.filter((m) => m.isWinningMove);
      if (winningMoves.length > 0 && Math.random() < 0.4) {
        chosen = winningMoves[Math.floor(Math.random() * winningMoves.length)];
      } else {
        chosen = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      }
    } else if (difficulty === 'hard') {
      possibleMoves.sort((a, b) => {
        if (a.isWinningMove !== b.isWinningMove) {
          return b.isWinningMove ? 1 : -1;
        }
        if (a.isWinningMove && b.isWinningMove) {
          return b.points - a.points;
        }
        const aRisk = a.emptyCount === 2 ? -10 : 0;
        const bRisk = b.emptyCount === 2 ? -10 : 0;
        return (b.points + bRisk) - (a.points + aRisk);
      });
      chosen = possibleMoves[0];
    } else {
      possibleMoves.sort((a, b) => (b.isWinningMove ? 1 : 0) - (a.isWinningMove ? 1 : 0) || b.points - a.points);
      if (possibleMoves[0].isWinningMove || Math.random() < 0.85) {
        chosen = possibleMoves[0];
      } else {
        chosen = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      }
    }

    if (chosen) {
      const cardRef = chosen.card.cardInstanceId || chosen.card.id;
      executeMove(room, botPlayer.id, chosen.centerIdx, chosen.slotIdx, cardRef);
      return;
    }
  }

  // 2. ถ้าไม่มีช่องที่วางได้ ตรวจสอบว่ามีการ์ดพิเศษที่จะช่วยแก้สถานการณ์หรือไม่
  const specialCard = botPlayer.hand?.find(c => c.cardType === 'special' && c.actionType !== 'wildcard');
  if (specialCard && Math.random() < 0.4) {
    const cardRef = specialCard.cardInstanceId || specialCard.id;
    executeSpecialCard(room, botPlayer.id, cardRef);
    return;
  }

  // 3. หากไม่มีท่าที่ลงได้ ให้บอททิ้งการ์ด 1 ใบ แล้วจั่วใหม่
  if (botPlayer.hand && botPlayer.hand.length > 0) {
    const discardedCard = botPlayer.hand.shift();
    if (room.animalDeck.length === 0) {
      room.animalDeck = buildGameDeck();
    }
    const newCard = room.animalDeck.pop();
    botPlayer.hand.push(newCard);

    io.to(room.roomId).emit('card_discarded', {
      playerId: botPlayer.id,
      playerName: botPlayer.name,
      discardedAnimal: discardedCard,
      newAnimal: newCard
    });
  }
  advanceTurn(room);
}

function executeSpecialCard(room, playerId, cardId, targetPlayerId = null, targetCardIndex = null) {
  const player = room.players.find(p => p.id === playerId);
  if (!player || !player.hand) return { ok: false, error: 'ไม่พบผู้เล่น' };

  // การ์ดโล่ปู (Crab Shield) สามารถกดใช้ได้ตลอดเวลา (Instant Reactive Defense)
  if (room.roomMode !== 'time_attack' && cardId !== 'special_crab_shield') {
    const cardObj = player.hand.find(c => (c.cardInstanceId && c.cardInstanceId === cardId) || c.id === cardId);
    if (cardObj && cardObj.actionType !== 'shield') {
      const activePlayer = room.players[room.currentTurnIndex];
      if (!activePlayer || activePlayer.id !== playerId) {
        return { ok: false, error: `ยังไม่ถึงตาของคุณ (ตาของ: ${activePlayer ? activePlayer.name : 'คนอื่น'})` };
      }
    }
  }

  const cardIdx = player.hand.findIndex(c => (c.cardInstanceId && c.cardInstanceId === cardId) || c.id === cardId);
  if (cardIdx === -1) return { ok: false, error: 'ไม่มีการ์ดใบนี้ในมือ' };
  const card = player.hand[cardIdx];

  // นำการ์ดออกจากมือ และจั่วใบใหม่ทันที
  player.hand.splice(cardIdx, 1);
  if (room.animalDeck.length === 0) {
    room.animalDeck = buildGameDeck();
  }
  const drawnCard = room.animalDeck.pop();
  player.hand.push(drawnCard);

  let actionNotice = {
    actorId: player.id,
    actorName: player.name,
    actorAvatar: player.avatarId || 'lion',
    cardId: card.id,
    cardTitle: card.title || card.name,
    cardDesc: card.description || '',
    cardImg: card.image || card.origImage || '/cards/specials/special_fit_free.png',
    actionType: card.actionType,
    message: ''
  };

  room.shieldedPlayerIds = room.shieldedPlayerIds || [];

  switch (card.actionType) {
    case 'shield': {
      if (!room.shieldedPlayerIds.includes(player.id)) {
        room.shieldedPlayerIds.push(player.id);
      }
      actionNotice.message = `🛡️ ${player.name} กางโล่ Crab Shield ป้องกันการโจมตี 1 ครั้ง!`;
      break;
    }

    case 'double_play': {
      room.doublePlayPlayerId = player.id;
      actionNotice.message = `⚔️ ${player.name} ใช้ Play Double !! สามารถวางการ์ดได้ 2 ใบในตานี้!`;
      break;
    }

    case 'reverse': {
      room.playDirection = (room.playDirection || 1) * -1;
      const dirText = room.playDirection === 1 ? 'ตามเข็มนาฬิกา ↻' : 'ทวนเข็มนาฬิกา ↺';
      actionNotice.message = `🔄 ${player.name} ใช้ Reverse สลับทิศทางเทิร์นเป็น: ${dirText}!`;
      break;
    }

    case 'skip': {
      const dir = room.playDirection || 1;
      const numPlayers = room.players.length;
      const nextIdx = (room.currentTurnIndex + 1 * dir + numPlayers * 100) % numPlayers;
      const nextPlayer = room.players[nextIdx];

      const hasShieldInHand = nextPlayer?.hand?.some(c => c.actionType === 'shield' || c.id === 'special_crab_shield');
      const hasActiveShield = nextPlayer && room.shieldedPlayerIds?.includes(nextPlayer.id);

      if (nextPlayer && (hasActiveShield || hasShieldInHand)) {
        if (hasActiveShield) {
          room.shieldedPlayerIds = room.shieldedPlayerIds.filter(id => id !== nextPlayer.id);
        } else {
          const sIdx = nextPlayer.hand.findIndex(c => c.actionType === 'shield' || c.id === 'special_crab_shield');
          if (sIdx !== -1) {
            nextPlayer.hand.splice(sIdx, 1);
            if (room.animalDeck.length === 0) room.animalDeck = buildGameDeck();
            nextPlayer.hand.push(room.animalDeck.pop());
          }
        }
        actionNotice.message = `🛡️ ${nextPlayer.name} มีการ์ด Crab Shield จึงป้องกันผลของ Skip จาก ${player.name} ได้สำเร็จ! (ไม่ถูกข้ามตา)`;
        io.to(room.roomId).emit('special_card_played', actionNotice);
        broadcastRoomState(room.roomId);
        advanceTurn(room, 1);
        return { ok: true, room };
      }

      actionNotice.message = `⏭️ ${player.name} ใช้ Skip ข้ามตาผู้เล่นคนถัดไปทันที!`;
      io.to(room.roomId).emit('special_card_played', actionNotice);
      broadcastRoomState(room.roomId);
      advanceTurn(room, 2);
      return { ok: true, room };
    }

    case 'shuffle': {
      // รวบรวมการ์ดบนมือทุกคนเข้ากอง
      const allHandsCards = [];
      const handCounts = new Map();
      room.players.forEach(p => {
        handCounts.set(p.id, p.hand.length);
        allHandsCards.push(...p.hand);
        p.hand = [];
      });

      room.animalDeck = shuffle([...room.animalDeck, ...allHandsCards]);
      room.players.forEach(p => {
        const count = handCounts.get(p.id) || 4;
        p.hand = room.animalDeck.splice(0, count);
      });

      actionNotice.message = `🔀 ${player.name} ใช้ Shuffle สลับการ์ดบนมือทุกคนเข้ากองแล้วแจกใหม่!`;
      break;
    }

    case 'drop_it': {
      let target = null;
      if (targetPlayerId) {
        target = room.players.find(p => p.id === targetPlayerId);
      }
      if (!target) {
        const otherPlayers = room.players.filter(p => p.id !== player.id);
        target = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
      }

      if (target) {
        const hasShieldInHand = target.hand?.some(c => c.actionType === 'shield' || c.id === 'special_crab_shield');
        const hasActiveShield = room.shieldedPlayerIds?.includes(target.id);

        if (hasActiveShield || hasShieldInHand) {
          if (hasActiveShield) {
            room.shieldedPlayerIds = room.shieldedPlayerIds.filter(id => id !== target.id);
          } else {
            const sIdx = target.hand.findIndex(c => c.actionType === 'shield' || c.id === 'special_crab_shield');
            if (sIdx !== -1) {
              target.hand.splice(sIdx, 1);
              if (room.animalDeck.length === 0) room.animalDeck = buildGameDeck();
              target.hand.push(room.animalDeck.pop());
            }
          }
          actionNotice.message = `🛡️ ${target.name} ใช้ Crab Shield ป้องกันการ์ด Drop It ของ ${player.name} ได้สำเร็จ!`;
        } else if (target.hand && target.hand.length > 0) {
          let dropIndex = 0;
          if (typeof targetCardIndex === 'number' && targetCardIndex >= 0 && targetCardIndex < target.hand.length) {
            dropIndex = targetCardIndex;
          } else {
            dropIndex = Math.floor(Math.random() * target.hand.length);
          }
          const droppedCard = target.hand.splice(dropIndex, 1)[0];
          if (room.animalDeck.length === 0) room.animalDeck = buildGameDeck();
          target.hand.push(room.animalDeck.pop());
          actionNotice.message = `💥 ${player.name} บังคับให้ ${target.name} ทิ้งการ์ด "${droppedCard.name || droppedCard.title}" ลงกองทิ้ง!`;
        }
      }
      break;
    }

    default:
      actionNotice.message = `✨ ${player.name} ใช้การ์ดพิเศษ "${card.title || card.name}"`;
      break;
  }

  io.to(room.roomId).emit('special_card_played', actionNotice);

  // การใช้ Shield, Double Play ไม่นับเป็นการจบเทิร์น สามารถวางการ์ดต่อได้
  if (card.actionType === 'shield') {
    broadcastRoomState(room.roomId);
    return { ok: true, room };
  } else if (card.actionType === 'double_play') {
    broadcastRoomState(room.roomId);
    if (player.isBot) {
      setTimeout(() => runBotTurn(room, player), 1000);
    }
  } else {
    advanceTurn(room, 1);
  }

  return { ok: true, room };
}

function executeMove(room, playerId, centerIdx, slotIdx, animalCardId) {
  const player = room.players.find((p) => p.id === playerId);
  if (!player || !player.hand) return { ok: false, error: 'ไม่พบผู้เล่น' };

  if (room.roomMode !== 'time_attack') {
    const activePlayer = room.players[room.currentTurnIndex];
    if (!activePlayer || activePlayer.id !== playerId) {
      return { ok: false, error: `ยังไม่ถึงตาของคุณ (ตาของ: ${activePlayer ? activePlayer.name : 'คนอื่น'})` };
    }
  }

  const centerItem = room.centerCategories[centerIdx];
  if (!centerItem || !centerItem.category) return { ok: false, error: 'ไม่พบการ์ดคำถาม' };

  if (centerItem.filledSlots[slotIdx] !== null) {
    return { ok: false, error: 'ช่องนี้มีคนวางการ์ดไปแล้ว' };
  }

  const animalIdx = player.hand.findIndex((a) => (a.cardInstanceId && a.cardInstanceId === animalCardId) || a.id === animalCardId);
  if (animalIdx === -1) return { ok: false, error: 'ไม่มีการ์ดใบนี้ในมือ' };
  const cardToPlace = player.hand[animalIdx];

  if (!checkValidMove(cardToPlace, centerItem.category, slotIdx)) {
    return { ok: false, error: 'การ์ดใบนี้ไม่มีคุณสมบัติที่ช่องคำถามต้องการ' };
  }

  // วางการ์ดทับลงช่อง
  centerItem.filledSlots[slotIdx] = {
    animalCard: cardToPlace,
    playerId: player.id,
    playerName: player.name,
    isBot: player.isBot
  };

  // ลบการ์ดออกจากมือ และจั่วใบใหม่ขึ้นมือ
  player.hand.splice(animalIdx, 1);
  if (room.animalDeck.length === 0) {
    room.animalDeck = buildGameDeck();
  }
  player.hand.push(room.animalDeck.pop());

  let completedNotice = null;

  // ตรวจสอบว่าเติมเต็มครบทุกช่องแล้วหรือยัง
  if (centerItem.filledSlots.every((s) => s !== null)) {
    const gainedPoints = centerItem.category.points || 20;
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

  // ตรวจสอบ Game Over
  if (room.centerCategories.every((c) => c === null)) {
    room.status = 'ended';
    io.to(room.roomId).emit('game_ended', room);
    broadcastRoomState(room.roomId);
    return { ok: true };
  }

  // ตรวจสอบ Double Play
  if (room.doublePlayPlayerId === playerId) {
    room.doublePlayPlayerId = null; // ใช้สิทธิ์ใบที่ 1 แล้ว เหลือใบที่ 2 ในเทิร์นนี้
    broadcastRoomState(room.roomId);
    if (player.isBot) {
      setTimeout(() => runBotTurn(room, player), 1100);
    }
    return { ok: true, doublePlayRemaining: true };
  }

  // สลับตาเล่นไปยังคนถัดไป
  if (room.roomMode !== 'time_attack') {
    advanceTurn(room, 1);
  } else {
    broadcastRoomState(room.roomId);
  }

  return { ok: true };
}

function removePlayerFromRoom(roomId, socketId) {
  const room = rooms.get(roomId);
  if (!room) return;

  // Clean up any pending disconnect timer for this socket
  if (disconnectTimers.has(socketId)) {
    clearTimeout(disconnectTimers.get(socketId));
    disconnectTimers.delete(socketId);
  }

  const idx = room.players.findIndex((p) => p.id === socketId);
  if (idx === -1) return;

  room.players.splice(idx, 1);

  if (room.players.length === 0 || room.players.every((p) => p.isBot)) {
    rooms.delete(roomId);
    return;
  }

  if (room.hostId === socketId && room.players.length > 0) {
    const nextHuman = room.players.find((p) => !p.isBot) || room.players[0];
    room.hostId = nextHuman.id;
    nextHuman.isHost = true;
  }

  if (room.currentTurnIndex >= room.players.length) {
    room.currentTurnIndex = 0;
  }

  broadcastRoomState(roomId);
}

io.on('connection', (socket) => {
  // 1. สร้างห้อง
  socket.on('create_room', ({ playerName, avatarId, roomMode, timeLimitSec, maxPlayers, botDifficulty } = {}, ack) => {
    const cleanName = sanitizeName(playerName);
    if (!cleanName) {
      const msg = 'กรุณาใส่ชื่อผู้เล่นที่ถูกต้อง (1-16 ตัวอักษร)';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    const roomId = createUniqueRoomCode();
    socket.join(roomId);
    socket.data.roomId = roomId;

    const hostPlayer = {
      id: socket.id,
      name: cleanName,
      avatarId: avatarId || 'sponge_bath',
      isHost: true,
      isBot: false,
      score: 0,
      wonCount: 0,
      hand: [],
      connected: true
    };

    const room = {
      roomId,
      hostId: socket.id,
      roomMode: roomMode || 'multiplayer',
      timeLimitSec: timeLimitSec || 60,
      maxPlayers: Math.min(Math.max(maxPlayers || 6, 2), MAX_PLAYERS),
      botDifficulty: botDifficulty || 'medium',
      players: [hostPlayer],
      animalDeck: [],
      categoryDeck: [],
      centerCategories: [],
      status: 'waiting',
      currentTurnIndex: 0,
      playDirection: 1,
      shieldedPlayerIds: [],
      doublePlayPlayerId: null,
      startTime: null
    };

    if (room.roomMode === 'vs_bot') {
      const botNames = ['Dr. Sponge 🧽', 'Prof. Hydra 🐙', 'BioBot Coral 🪸'];
      const botAvatars = ['sponge_glass', 'sea_anemone', 'brain_coral'];
      room.players.push({
        id: `bot-${Date.now()}`,
        name: botNames[0],
        avatarId: botAvatars[0],
        isHost: false,
        isBot: true,
        score: 0,
        wonCount: 0,
        hand: [],
        connected: true
      });
    }

    rooms.set(roomId, room);
    socket.emit('room_created', room);
    if (typeof ack === 'function') ack({ ok: true, room });
  });

  // 2. เข้าร่วมห้อง
  socket.on('join_room', ({ playerName, avatarId, roomId } = {}, ack) => {
    const cleanName = sanitizeName(playerName);
    if (!cleanName) {
      const msg = 'กรุณาใส่ชื่อผู้เล่นที่ถูกต้อง (1-16 ตัวอักษร)';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    const room = rooms.get(roomId);
    if (!room) {
      const msg = 'ไม่พบห้องรหัสนี้ กรุณาตรวจสอบรหัสห้องอีกครั้ง';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    if (room.status !== 'waiting') {
      const msg = 'ห้องนี้กำลังเล่นอยู่ ไม่สามารถเข้าร่วมได้';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    if (room.players.length >= room.maxPlayers) {
      const msg = 'ห้องเต็มแล้ว ไม่สามารถเข้าร่วมได้';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    socket.join(roomId);
    socket.data.roomId = roomId;

    const newPlayer = {
      id: socket.id,
      name: cleanName,
      avatarId: avatarId || 'sponge_bath',
      isHost: false,
      isBot: false,
      score: 0,
      wonCount: 0,
      hand: [],
      connected: true
    };

    room.players.push(newPlayer);
    broadcastRoomState(roomId);
    if (typeof ack === 'function') ack({ ok: true, room });
  });

  // 3. เพิ่มบอท
  socket.on('add_bot', (ack) => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);
    if (!room) return;

    if (room.players.length >= room.maxPlayers) {
      const msg = 'ห้องเต็มแล้ว ไม่สามารถเพิ่มบอทได้';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    const botAvatars = ['sponge_glass', 'sea_fan', 'jellyfish_sea_nettle', 'starfish', 'dragonfly', 'horseshoe_crab'];
    const botNames = ['Dr. Sponge 🧽', 'Prof. Fan 🪸', 'Bot Nettle 🌊', 'Starry Bot ⭐', 'Dragonfly AI 🛸', 'Ancient Crab 🦀'];
    const botIdx = room.players.filter(p => p.isBot).length;

    const botPlayer = {
      id: `bot-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: botNames[botIdx % botNames.length],
      avatarId: botAvatars[botIdx % botAvatars.length],
      isHost: false,
      isBot: true,
      score: 0,
      wonCount: 0,
      hand: [],
      connected: true
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

    room.animalDeck = buildGameDeck();
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

    if (room.roomMode !== 'time_attack') {
      room.players = shuffle(room.players);
    }

    // แจกการ์ด 4 ใบเริ่มต้น: เน้นการ์ดสัตว์ (การ์ดพิเศษเริ่มต้นไม่เกิน 1 ใบ)
    room.players.forEach((p) => {
      p.score = 0;
      p.wonCount = 0;
      p.hand = [];
      const phylaInHand = new Set();
      let specialCount = 0;
      let attempts = 0;
      while (p.hand.length < 4 && room.animalDeck.length > 0 && attempts < 100) {
        attempts++;
        const candidateIdx = room.animalDeck.findIndex(c => {
          if (c.cardType === 'special') {
            return specialCount === 0;
          }
          return !phylaInHand.has(c.phylum);
        });
        if (candidateIdx !== -1) {
          const card = room.animalDeck.splice(candidateIdx, 1)[0];
          p.hand.push(card);
          if (card.cardType === 'special') specialCount++;
          if (card.phylum) phylaInHand.add(card.phylum);
        } else {
          const card = room.animalDeck.pop();
          p.hand.push(card);
          if (card.cardType === 'special') specialCount++;
        }
      }
    });

    room.status = 'playing';
    room.currentTurnIndex = 0;
    room.playDirection = 1;
    room.shieldedPlayerIds = [];
    room.doublePlayPlayerId = null;
    room.startTime = Date.now();

    io.to(roomId).emit('game_started', room);
    broadcastRoomState(roomId);

    const firstPlayer = room.players[0];
    if (firstPlayer && firstPlayer.isBot) {
      const diff = room.botDifficulty || 'medium';
      const delay = diff === 'easy' ? 2000 : diff === 'hard' ? 1000 : 1500;
      setTimeout(() => runBotTurn(room, firstPlayer), delay);
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

  // 5.1 เล่นการ์ดพิเศษ (Play Special Card Action)
  socket.on('play_special_card', ({ cardId, targetPlayerId, targetCardIndex } = {}, ack) => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);
    if (!room || room.status !== 'playing') {
      const msg = 'เกมยังไม่เริ่มหรือจบไปแล้ว';
      socket.emit('error_message', msg);
      return typeof ack === 'function' && ack({ ok: false, error: msg });
    }

    const res = executeSpecialCard(room, socket.id, cardId, targetPlayerId, targetCardIndex);
    if (!res.ok) {
      socket.emit('error_message', res.error);
    }
    if (typeof ack === 'function') ack(res);
  });

  // 6. ข้ามตา / ทิ้งการ์ด (Pass Turn)
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

      const discardedCard = activePlayer.hand.shift();
      if (room.animalDeck.length === 0) {
        room.animalDeck = buildGameDeck();
      }
      const newCard = room.animalDeck.pop();
      activePlayer.hand.push(newCard);

      io.to(room.roomId).emit('card_discarded', {
        playerId: activePlayer.id,
        playerName: activePlayer.name,
        discardedAnimal: discardedCard,
        newAnimal: newCard
      });

      advanceTurn(room);
      if (typeof ack === 'function') ack({ ok: true });
    } else {
      const player = room.players.find(p => p.id === socket.id);
      if (player && player.hand.length > 0) {
        const discardedCard = player.hand.shift();
        if (room.animalDeck.length === 0) {
          room.animalDeck = buildGameDeck();
        }
        const newCard = room.animalDeck.pop();
        player.hand.push(newCard);

        io.to(room.roomId).emit('card_discarded', {
          playerId: player.id,
          playerName: player.name,
          discardedAnimal: discardedCard,
          newAnimal: newCard
        });
        io.to(room.roomId).emit('room_updated', room);
        if (typeof ack === 'function') ack({ ok: true });
      }
    }
  });

  // 6.2 ทิ้งการ์ดใบที่เลือกเจาะจง 1 ใบ
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

      const cardIdx = activePlayer.hand.findIndex(c => (c.cardInstanceId && c.cardInstanceId === animalCardId) || c.id === animalCardId);
      const discardedCard = cardIdx !== -1 ? activePlayer.hand.splice(cardIdx, 1)[0] : activePlayer.hand.shift();

      if (room.animalDeck.length === 0) {
        room.animalDeck = buildGameDeck();
      }
      const newCard = room.animalDeck.pop();
      activePlayer.hand.push(newCard);

      io.to(room.roomId).emit('card_discarded', {
        playerId: activePlayer.id,
        playerName: activePlayer.name,
        discardedAnimal: discardedCard,
        newAnimal: newCard
      });

      advanceTurn(room);
      if (typeof ack === 'function') ack({ ok: true, newAnimal: newCard });
    } else {
      const player = room.players.find(p => p.id === socket.id);
      if (player && player.hand.length > 0) {
        const cardIdx = player.hand.findIndex(c => (c.cardInstanceId && c.cardInstanceId === animalCardId) || c.id === animalCardId);
        const discardedCard = cardIdx !== -1 ? player.hand.splice(cardIdx, 1)[0] : player.hand.shift();

        if (room.animalDeck.length === 0) {
          room.animalDeck = buildGameDeck();
        }
        const newCard = room.animalDeck.pop();
        player.hand.push(newCard);

        io.to(room.roomId).emit('card_discarded', {
          playerId: player.id,
          playerName: player.name,
          discardedAnimal: discardedCard,
          newAnimal: newCard
        });
        io.to(room.roomId).emit('room_updated', room);
        if (typeof ack === 'function') ack({ ok: true, newAnimal: newCard });
      }
    }
  });

  // 7. ส่งอีโมจิ
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

  // 9. จบเกม
  socket.on('finish_game', () => {
    const roomId = socket.data.roomId;
    const room = rooms.get(roomId);
    if (!room || room.status === 'ended') return;

    room.status = 'ended';
    io.to(roomId).emit('game_ended', room);
    broadcastRoomState(roomId);
  });

  // 10. เล่นใหม่
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
    room.playDirection = 1;
    room.shieldedPlayerIds = [];
    room.doublePlayPlayerId = null;
    room.animalDeck = [];
    room.categoryDeck = [];
    room.centerCategories = [];

    broadcastRoomState(roomId);
    io.to(roomId).emit('room_rematch', room);
    if (typeof ack === 'function') ack({ ok: true, room });
  });

  // 11. หลุดการเชื่อมต่อ
  socket.on('disconnect', () => {
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

app.get('*', (req, res) => {
  const distIndex = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(distIndex)) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(distIndex);
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

server.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});
