import React, { useEffect, useState, useRef } from 'react';
import { AnimalAvatar } from '../assets/animalIllustrations';
import { playSfx } from '../utils/audio';

export default function SpecialCardShowcase({ specialEvent, onComplete }) {
  const [animStage, setAnimStage] = useState('spinIn'); // 'spinIn' -> 'showcase' -> 'flyToDiscard'
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const currentEventId = specialEvent?.eventId || specialEvent?.cardInstanceId || specialEvent?.cardId || 'special';

  useEffect(() => {
    if (!specialEvent) return;

    setAnimStage('spinIn');

    const t1 = setTimeout(() => {
      setAnimStage('showcase');
    }, 550);

    const t2 = setTimeout(() => {
      setAnimStage('flyToDiscard');
      playSfx('draw');
    }, 1800);

    const t3 = setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [currentEventId]);

  if (!specialEvent) return null;

  const {
    actorName = 'ผู้เล่น',
    actorAvatar = 'lion',
    cardTitle = 'การ์ดพิเศษ',
    cardDesc = '',
    cardImg = '/cards/specials/special_fit_free.png',
    actionType = 'wildcard',
    message = '',
  } = specialEvent;

  const actionIcons = {
    shield: '🛡️',
    double_play: '⚔️',
    reverse: '🔄',
    skip: '⏭️',
    shuffle: '🔀',
    drop_it: '💥',
    wildcard: '✨',
  };

  const badgeIcon = actionIcons[actionType] || '✨';

  return (
    <div
      className={`special-showcase-overlay stage-${animStage}`}
      onClick={() => onComplete && onComplete()}
      title="คลิกเพื่อข้ามแอนิเมชัน"
    >
      <div className="special-showcase-backdrop" />

      {/* Floating Announcement Header */}
      <div className={`special-actor-pill anim-${animStage}`}>
        <AnimalAvatar id={actorAvatar} size={28} />
        <span className="special-actor-name">{actorName}</span>
        <span className="special-actor-action">ใช้การ์ดพิเศษ!</span>
      </div>

      {/* 3D Animated Card Container */}
      <div className={`special-card-stage-box stage-${animStage}`}>
        <div className="special-card-halo" />
        <div className="special-card-frame">
          <img
            src={cardImg}
            alt={cardTitle}
            className="special-card-art"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/cards/specials/special_fit_free.png';
            }}
          />
        </div>

        {/* Card Title & Power Description Callout */}
        <div className={`special-card-banner anim-${animStage}`}>
          <div className="special-banner-title">
            <span className="special-badge-emoji">{badgeIcon}</span>
            <span>{cardTitle}</span>
          </div>
          {cardDesc && <div className="special-banner-desc">{cardDesc}</div>}
          {message && <div className="special-banner-msg">{message}</div>}
        </div>
      </div>
    </div>
  );
}
