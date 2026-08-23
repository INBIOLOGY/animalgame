import React, { useState } from 'react';
import { ALL_ANIMALS_DATA, TRAIT_MAP, TRAIT_COLORS, ANIMAL_RARITIES } from '../utils/traits';
import { AnimalSVG } from '../assets/animalIllustrations';
import { TraitIcon, UIIcon } from '../assets/natureIcons';
import { playSfx } from '../utils/audio';

export default function EncyclopediaModal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrait, setSelectedTrait] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [selectedAnimal, setSelectedAnimal] = useState(ALL_ANIMALS_DATA[0]);

  const traitsList = Object.keys(TRAIT_MAP);
  const raritiesList = Object.keys(ANIMAL_RARITIES);

  const filteredAnimals = ALL_ANIMALS_DATA.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrait =
      selectedTrait === 'all' || animal.traits.includes(selectedTrait);
    const matchesRarity =
      selectedRarity === 'all' || animal.rarity === selectedRarity;
    return matchesSearch && matchesTrait && matchesRarity;
  });

  const curRarity = ANIMAL_RARITIES[selectedAnimal?.rarity] || ANIMAL_RARITIES.common;

  return (
    <div className="modal-backdrop" style={{ zIndex: 1200 }}>
      <div
        className="modal-box"
        style={{
          maxWidth: '780px',
          width: '95%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '22px',
          textAlign: 'left',
          gap: '12px',
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: 'var(--r-2xl)',
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2ebd0', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--bg-matcha-soft)',
                border: '1.5px solid var(--card-border-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UIIcon name="book" size={20} color="var(--forest-primary)" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-thai)', fontSize: '18px', fontWeight: 800, color: 'var(--forest-primary)' }}>
                สารานุกรมสัตว์โลก (Nature Field Guide)
              </div>
              <div style={{ fontSize: '12px', color: 'var(--forest-accent)', fontWeight: 600 }}>
                ข้อมูลชีววิทยาและการจำแนกคุณสมบัติสัตว์ทั้ง 32 ชนิด
              </div>
            </div>
          </div>
          <button
            className="btn btn-dark btn-sm"
            onClick={() => {
              playSfx('pop');
              onClose();
            }}
            style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0 }}
          >
            ✕
          </button>
        </div>

        {/* Filters Bar */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <input
              className="clean-input"
              type="text"
              placeholder="ค้นหาชื่อสัตว์, ถิ่นที่อยู่..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ margin: 0, paddingLeft: '34px', fontSize: '13px', background: '#fafdf7', border: '1.5px solid #dce8ce' }}
            />
            <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.7, color: 'var(--forest-primary)' }}>
              <UIIcon name="search" size={16} />
            </div>
          </div>

          <select
            className="clean-input"
            value={selectedTrait}
            onChange={(e) => {
              playSfx('select');
              setSelectedTrait(e.target.value);
            }}
            style={{
              margin: 0,
              width: 'auto',
              padding: '8px 12px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--forest-primary)',
              background: '#fafdf7',
              border: '1.5px solid #dce8ce',
              cursor: 'pointer',
            }}
          >
            <option value="all">🔍 ทุกคุณสมบัติ</option>
            {traitsList.map((t) => (
              <option key={t} value={t}>
                {TRAIT_MAP[t]}
              </option>
            ))}
          </select>

          <select
            className="clean-input"
            value={selectedRarity}
            onChange={(e) => {
              playSfx('select');
              setSelectedRarity(e.target.value);
            }}
            style={{
              margin: 0,
              width: 'auto',
              padding: '8px 12px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--forest-primary)',
              background: '#fafdf7',
              border: '1.5px solid #dce8ce',
              cursor: 'pointer',
            }}
          >
            <option value="all">⭐ ทุกระดับความหายาก</option>
            {raritiesList.map((r) => (
              <option key={r} value={r}>
                {ANIMAL_RARITIES[r].label}
              </option>
            ))}
          </select>
        </div>

        {/* Content Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '12px', flex: 1, minHeight: '280px', overflow: 'hidden' }}>
          {/* Left Grid List */}
          <div
            style={{
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))',
              gap: '8px',
              paddingRight: '4px',
              maxHeight: '340px',
            }}
          >
            {filteredAnimals.map((animal) => {
              const isSelected = selectedAnimal?.id === animal.id;
              const r = ANIMAL_RARITIES[animal.rarity] || ANIMAL_RARITIES.common;
              return (
                <div
                  key={animal.id}
                  onClick={() => {
                    playSfx('select');
                    setSelectedAnimal(animal);
                  }}
                  style={{
                    background: isSelected ? 'var(--bg-matcha-soft)' : '#fafdf7',
                    border: `1.5px solid ${isSelected ? 'var(--forest-primary)' : '#e2ebd0'}`,
                    borderRadius: 'var(--r-md)',
                    padding: '8px 4px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    boxShadow: isSelected ? '0 3px 8px rgba(42, 68, 30, 0.15)' : '0 1px 3px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <AnimalSVG id={animal.id} size={38} />
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--forest-primary)', marginTop: '4px' }}>
                    {animal.name}
                  </div>
                  <div style={{ fontSize: '8.5px', color: r.color, fontWeight: 700, fontFamily: 'var(--font-game)' }}>
                    {r.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detailed View */}
          {selectedAnimal && (
            <div
              style={{
                background: '#fafdf7',
                border: '1.5px solid #e2ebd0',
                borderRadius: 'var(--r-lg)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                overflowY: 'auto',
                maxHeight: '340px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    background: '#ffffff',
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--r-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid #e2ebd0',
                    flexShrink: 0,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  }}
                >
                  <AnimalSVG id={selectedAnimal.id} size={52} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-thai)', fontSize: '20px', fontWeight: 800, color: 'var(--forest-primary)' }}>
                    {selectedAnimal.name}
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '12px', color: 'var(--forest-accent)', fontWeight: 600 }}>
                    {selectedAnimal.englishName}
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '9px',
                      fontWeight: 800,
                      background: curRarity.bg,
                      color: curRarity.color,
                      padding: '2px 8px',
                      borderRadius: 'var(--r-pill)',
                      border: `1px solid ${curRarity.border}`,
                      marginTop: '4px',
                      fontFamily: 'var(--font-game)',
                    }}
                  >
                    ระดับความหายาก: {curRarity.label}
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '12.5px', color: 'var(--ink-primary)', fontWeight: 700 }}>
                <strong style={{ color: 'var(--forest-primary)' }}>ถิ่นที่อยู่อาศัย:</strong> {selectedAnimal.habitat}
              </div>

              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2ebd0',
                  borderRadius: 'var(--r-md)',
                  padding: '9px 12px',
                  fontSize: '12.5px',
                  lineHeight: '1.6',
                  color: 'var(--ink-primary)',
                  fontWeight: 500,
                }}
              >
                {selectedAnimal.desc}
              </div>

              {selectedAnimal.funFact && (
                <div
                  style={{
                    background: 'var(--bg-matcha-soft)',
                    border: '1px solid var(--card-border-green)',
                    borderRadius: 'var(--r-md)',
                    padding: '9px 12px',
                    fontSize: '12.5px',
                    lineHeight: '1.6',
                    color: 'var(--forest-primary)',
                    fontWeight: 700,
                  }}
                >
                  <strong>💡 เกร็ดชีววิทยา:</strong> {selectedAnimal.funFact}
                </div>
              )}

              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--forest-primary)', marginBottom: '5px' }}>
                  คุณสมบัติจำแนกประเภท (Traits):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {selectedAnimal.traits.map((t) => {
                    const colors = TRAIT_COLORS[t] || { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7', iconName: 'backbone' };
                    return (
                      <span
                        key={t}
                        style={{
                          background: colors.bg,
                          color: colors.text,
                          border: `1px solid ${colors.border}`,
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 9px',
                          borderRadius: 'var(--r-pill)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <TraitIcon name={colors.iconName} size={12} color={colors.text} />
                        <span>{TRAIT_MAP[t]?.replace(/^[^a-zA-Z0-9\u0E00-\u0E7F]+\s*/, '')}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          className="btn btn-green btn-block"
          onClick={() => {
            playSfx('place');
            onClose();
          }}
          style={{ marginTop: '2px', padding: '10px' }}
        >
          กลับเข้าสู่เกม
        </button>
      </div>
    </div>
  );
}
