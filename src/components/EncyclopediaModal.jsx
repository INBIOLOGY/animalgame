import React, { useState } from 'react';
import { ALL_ANIMALS_DATA, TRAIT_MAP, TRAIT_COLORS, ANIMAL_RARITIES } from '../utils/traits';
import { AnimalAvatar } from '../assets/animalIllustrations';
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
  const distinctTraits = Array.from(
    new Set((selectedAnimal?.traits || []).map((t) => TRAIT_MAP[t] || t))
  );

  return (
    <div className="cute-modal-backdrop page-screen-anim">
      <div className="cute-modal-box dex-box">
        {/* Header */}
        <div className="cute-dex-header">
          <div className="cute-dex-title-row">
            <div className="cute-dex-icon-frame">
              <UIIcon name="book" size={20} color="var(--forest-primary)" />
            </div>
            <div>
              <h2 className="cute-dex-title">📖 สารานุกรมสัตว์น่ารู้</h2>
              <p className="cute-dex-subtitle">ข้อมูลชีววิทยาและการจำแนกคุณสมบัติสัตว์ทั้ง 32 ชนิด</p>
            </div>
          </div>
          <button
            type="button"
            className="cute-btn-close-circle"
            onClick={() => {
              playSfx('pop');
              onClose();
            }}
          >
            ✕
          </button>
        </div>

        {/* Search & Filters */}
        <div className="cute-dex-filters">
          <div className="cute-dex-search-wrap">
            <UIIcon name="search" size={15} color="var(--forest-primary)" />
            <input
              type="text"
              placeholder="ค้นหาชื่อสัตว์, ถิ่นที่อยู่..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cute-dex-search-input"
            />
          </div>

          {/* Rarity & Trait Dropdowns */}
          <div className="cute-dex-dropdowns">
            <select
              className="cute-dex-select"
              value={selectedTrait}
              onChange={(e) => setSelectedTrait(e.target.value)}
            >
              <option value="all">🔍 คุณสมบัติทั้งหมด</option>
              {traitsList.map((t) => (
                <option key={t} value={t}>
                  {TRAIT_MAP[t]}
                </option>
              ))}
            </select>

            <select
              className="cute-dex-select"
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
            >
              <option value="all">⭐ ระดับความหายากทั้งหมด</option>
              {raritiesList.map((r) => (
                <option key={r} value={r}>
                  {ANIMAL_RARITIES[r].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Body: Grid & Detail Pane */}
        <div className="cute-dex-body">
          {/* Left: Animal Grid */}
          <div className="cute-dex-grid">
            {filteredAnimals.map((animal) => {
              const isSelected = selectedAnimal?.id === animal.id;
              return (
                <div
                  key={animal.id}
                  className={`cute-dex-item ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    playSfx('pop');
                    setSelectedAnimal(animal);
                  }}
                >
                  <AnimalAvatar id={animal.id} size={36} />
                  <span className="cute-dex-item-name">{animal.name}</span>
                </div>
              );
            })}
            {filteredAnimals.length === 0 && (
              <div className="cute-dex-empty">
                <span>🔍 ไม่พบสัตว์ที่ตรงกับคำค้นหา</span>
              </div>
            )}
          </div>

          {/* Right: Selected Animal Detail Card */}
          {selectedAnimal && (
            <div className="cute-dex-detail-pane">
              <div className="cute-detail-header">
                <div className="cute-detail-avatar-box">
                  <AnimalAvatar id={selectedAnimal.id} size={64} />
                </div>
                <div className="cute-detail-title-group">
                  <div className="cute-detail-name-row">
                    <h3 className="cute-detail-name">{selectedAnimal.name}</h3>
                    <span
                      className="cute-rarity-pill"
                      style={{
                        background: curRarity.bg,
                        color: curRarity.color,
                        border: `1px solid ${curRarity.border}`,
                      }}
                    >
                      {curRarity.label}
                    </span>
                  </div>
                  <div className="cute-detail-subname">{selectedAnimal.englishName}</div>
                  <div className="cute-detail-habitat">📍 {selectedAnimal.habitat}</div>
                </div>
              </div>

              {/* Bio Description */}
              <p className="cute-detail-desc">{selectedAnimal.desc}</p>

              {/* Traits Breakdown */}
              <div className="cute-detail-traits-section">
                <div className="cute-detail-traits-label">คุณสมบัติทางชีววิทยา:</div>
                <div className="cute-detail-traits-grid">
                  {distinctTraits.map((tLabel, idx) => {
                    const originalKey = selectedAnimal.traits.find((k) => (TRAIT_MAP[k] || k) === tLabel) || 'backbone';
                    const colors = TRAIT_COLORS[originalKey] || { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7', iconName: 'backbone' };
                    return (
                      <span
                        key={idx}
                        className="cute-trait-tag"
                        style={{
                          background: colors.bg,
                          color: colors.text,
                          borderColor: colors.border,
                        }}
                      >
                        <TraitIcon name={colors.iconName} size={11} color={colors.text} />
                        <span>{tLabel}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
