import React from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { isTraitCompatible } from '../utils/traits';
import { getPlayerColorObj } from '../utils/playerColors';
import { playSfx } from '../utils/audio';

function getMatchingSlotHints(card, centerCategories = []) {
  if (!card) return [];
  if (card.cardType === 'special') {
    if (card.actionType === 'wildcard' || card.id?.includes('fit_free')) {
      return [{ label: 'ทุกช่อง 🌟', isWildcard: true }];
    }
    return [{ label: 'การ์ดพิเศษ ⚡', isSpecial: true }];
  }

  const matchedCategories = new Set();
  centerCategories.forEach((catItem, cIdx) => {
    if (!catItem || !catItem.category) return;
    catItem.filledSlots.forEach((slot, sIdx) => {
      if (slot === null) {
        const req = typeof catItem.category.slots[sIdx] === 'object'
          ? catItem.category.slots[sIdx].requiredTrait
          : catItem.category.slots[sIdx];
        if (isTraitCompatible(card, req)) {
          matchedCategories.add(cIdx + 1);
        }
      }
    });
  });

  if (matchedCategories.size > 0) {
    const list = Array.from(matchedCategories).sort((a, b) => a - b);
    return [{ label: `วางได้ที่หมวด #${list.join(', #')}`, isMatch: true }];
  }
  return [{ label: 'ไม่มีช่องลง (รอทิ้ง)', isNoMatch: true }];
}

export default function TeacherHandsMonitor({
  room,
  onInspectCard,
}) {
  if (!room) return null;

  const students = (room.players || []).filter((p) => !p.isSpectator && !p.isTeacher);
  const activeIndex = room.currentTurnIndex ?? 0;
  const activePlayer = room.players[activeIndex];
  const centerCategories = room.centerCategories || [];

  if (students.length === 0) {
    return (
      <div className="teacher-hands-empty">
        <span className="teacher-empty-icon">🎓</span>
        <p>กำลังรอนักเรียนเข้าร่วมห้องเรียนเพื่อเริ่มการแข่งขัน...</p>
      </div>
    );
  }

  return (
    <div className="teacher-hands-monitor-container page-screen-anim">
      <div className="teacher-monitor-header">
        <div className="teacher-monitor-title-group">
          <span className="teacher-badge-pulse">LIVE MONITOR</span>
          <h3 className="teacher-monitor-title">
            👁️ มอนิเตอร์การ์ดบนมือนักเรียนทุกคน ({students.length} คน)
          </h3>
        </div>
        <span className="teacher-monitor-hint">
          💡 คุณครูแตะที่การ์ดเพื่อซูมดูข้อมูลชีววิทยาอธิบายให้นักเรียนได้ทันที
        </span>
      </div>

      <div className="teacher-students-grid">
        {students.map((student) => {
          const isTurn = activePlayer && activePlayer.id === student.id;
          const colorObj = getPlayerColorObj(student.color || (student.isBot ? '#0284C7' : '#10B981'));
          const hand = student.hand || [];

          return (
            <div
              key={student.id}
              className={`teacher-student-card ${isTurn ? 'is-active-turn' : ''}`}
              style={{
                borderColor: isTurn ? colorObj.hex : '#CBD5E1',
                boxShadow: isTurn
                  ? `0 0 0 2.5px ${colorObj.hex}55, 0 6px 18px ${colorObj.shadow || 'rgba(0,0,0,0.18)'}`
                  : '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              {/* Student Header */}
              <div className="teacher-student-top" style={{ borderBottomColor: `${colorObj.hex}25` }}>
                <div className="teacher-student-info">
                  <div
                    className="teacher-student-avatar"
                    style={{
                      border: `2px solid ${colorObj.hex}`,
                      background: '#FFFFFF',
                      boxShadow: `0 2px 6px ${colorObj.shadow || 'rgba(0,0,0,0.12)'}`,
                    }}
                  >
                    <AnimalAvatar id={student.avatarId || (student.isBot ? 'sponge_glass' : 'lion')} size={30} />
                  </div>
                  <div className="teacher-student-names">
                    <span className="teacher-student-name" style={{ color: isTurn ? colorObj.hex : '#0F172A' }}>
                      {student.name}
                    </span>
                    {student.isBot && <span className="cute-bot-pill">บอท</span>}
                  </div>
                </div>

                <div className="teacher-student-badges">
                  {isTurn && (
                    <span className="teacher-turn-pill" style={{ background: colorObj.hex }}>
                      ⚡ กำลังคิด
                    </span>
                  )}
                  <div className="teacher-score-badge">
                    <span>⭐</span>
                    <strong>{student.score || 0}</strong>
                    <small>แต้ม</small>
                  </div>
                </div>
              </div>

              {/* Student Hand Cards (2 บน 2 ล่าง) */}
              <div className="teacher-hand-grid">
                {hand.length > 0 ? (
                  hand.map((card, cIdx) => {
                    const cardImg = card.image || card.origImage || '/cards/animals/animal_01.png';
                    const hints = getMatchingSlotHints(card, centerCategories);
                    const matchInfo = hints[0] || {};
                    const isSpecial = card.cardType === 'special';

                    return (
                      <div
                        key={card.cardInstanceId || `${card.id}_${cIdx}`}
                        className={`teacher-card-item ${matchInfo.isMatch ? 'has-match' : ''} ${isSpecial ? 'is-special-card' : ''}`}
                        onClick={() => {
                          playSfx('select');
                          if (onInspectCard) onInspectCard(card);
                        }}
                        title={`แตะเพื่อดูรายละเอียดชีววิทยาของ ${card.title || card.name}`}
                      >
                        <div className="teacher-card-thumb-wrap">
                          <img src={cardImg} alt={card.title || card.name} className="teacher-card-thumb" />
                          <span className="teacher-inspect-overlay">🔍 ซูม</span>
                        </div>

                        <div className="teacher-card-meta">
                          <span className="teacher-card-name">{card.title || card.name}</span>
                          {card.phylum && (
                            <span className="teacher-card-phylum">{card.phylum}</span>
                          )}
                          <span
                            className={`teacher-match-tag ${
                              matchInfo.isMatch
                                ? 'match-ok'
                                : matchInfo.isSpecial
                                ? 'match-special'
                                : 'match-none'
                            }`}
                          >
                            {matchInfo.label}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="teacher-no-cards">ไม่มีการ์ดในมือ</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
