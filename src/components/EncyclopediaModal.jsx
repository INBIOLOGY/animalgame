import React, { useState, useEffect } from 'react';
import { PHYLA_MAP, TRAIT_MAP, TRAIT_COLORS, ANIMAL_RARITIES } from '../utils/traits';
import { TraitIcon, UIIcon } from '../assets/natureIcons';
import { playSfx } from '../utils/audio';

export default function EncyclopediaModal({ onClose }) {
  const [animalsData, setAnimalsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhylum, setSelectedPhylum] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    fetch('/data/animals.json')
      .then((res) => res.json())
      .then((data) => {
        setAnimalsData(data);
        if (data.length > 0) setSelectedAnimal(data[0]);
      })
      .catch((err) => console.error('Failed to load animals data:', err));
  }, []);

  // Keyboard shortcut: Escape to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const phylaList = Object.keys(PHYLA_MAP);
  const raritiesList = Object.keys(ANIMAL_RARITIES);

  const cleanQuery = searchTerm.trim().toLowerCase();

  const filteredAnimals = animalsData.filter((animal) => {
    const matchesPhylum =
      selectedPhylum === 'all' || animal.phylum === selectedPhylum;
    const matchesRarity =
      selectedRarity === 'all' || animal.rarity === selectedRarity;

    if (!matchesPhylum || !matchesRarity) return false;
    if (!cleanQuery) return true;

    const thaiPhylum = PHYLA_MAP[animal.phylum] || '';
    const traitLabels = (animal.traits || []).map((t) => TRAIT_MAP[t] || t).join(' ');

    return (
      (animal.name && animal.name.toLowerCase().includes(cleanQuery)) ||
      (animal.englishName && animal.englishName.toLowerCase().includes(cleanQuery)) ||
      (animal.sciName && animal.sciName.toLowerCase().includes(cleanQuery)) ||
      (animal.phylum && animal.phylum.toLowerCase().includes(cleanQuery)) ||
      (thaiPhylum && thaiPhylum.toLowerCase().includes(cleanQuery)) ||
      (animal.className && animal.className.toLowerCase().includes(cleanQuery)) ||
      (animal.habitat && animal.habitat.toLowerCase().includes(cleanQuery)) ||
      (animal.desc && animal.desc.toLowerCase().includes(cleanQuery)) ||
      (animal.funFact && animal.funFact.toLowerCase().includes(cleanQuery)) ||
      traitLabels.toLowerCase().includes(cleanQuery)
    );
  });

  // Keep selected animal synced with current filtered list
  useEffect(() => {
    if (filteredAnimals.length > 0) {
      if (!selectedAnimal || !filteredAnimals.some((a) => a.id === selectedAnimal.id)) {
        setSelectedAnimal(filteredAnimals[0]);
      }
    } else {
      setSelectedAnimal(null);
    }
  }, [searchTerm, selectedPhylum, selectedRarity, animalsData]);

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
              <UIIcon name="book" size={24} color="#FBBF24" />
            </div>
            <div>
              <h2 className="cute-dex-title">📖 สารานุกรมสัตว์และอนุกรมวิธานชีววิทยา</h2>
              <p className="cute-dex-subtitle">ข้อมูลการจำแนก 56 สิ่งมีชีวิต ครอบคลุม 9 ไฟลัมแห่งอาณาจักรสัตว์</p>
            </div>
          </div>
          <button
            type="button"
            className="cute-btn-close-circle"
            onClick={() => {
              playSfx('pop');
              onClose();
            }}
            title="ปิดหน้าต่าง (Esc)"
            aria-label="ปิดหน้าต่างสารานุกรม"
          >
            ✕
          </button>
        </div>

        {/* Search & Filters */}
        <div className="cute-dex-filters">
          <div className="cute-dex-search-wrap">
            <UIIcon name="search" size={15} color="#A7F3D0" />
            <input
              id="dex-search-input"
              type="text"
              placeholder="ค้นหาชื่อสัตว์, ไฟลัม, ถิ่นที่อยู่, ลักษณะ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cute-dex-search-input"
              aria-label="ค้นหาสัตว์ในสารานุกรม"
            />
            {searchTerm && (
              <button
                type="button"
                className="cute-dex-search-clear-btn"
                onClick={() => setSearchTerm('')}
                title="ล้างคำค้นหา"
                aria-label="ล้างคำค้นหา"
              >
                ✕
              </button>
            )}
          </div>

          {/* Phylum & Rarity Dropdowns + Count Badge */}
          <div className="cute-dex-dropdowns">
            <select
              className="cute-dex-select"
              value={selectedPhylum}
              onChange={(e) => setSelectedPhylum(e.target.value)}
              aria-label="กรองตามไฟลัม"
            >
              <option value="all">🌐 ไฟลัมทั้งหมด (9 Phyla)</option>
              {phylaList.map((pKey) => (
                <option key={pKey} value={pKey}>
                  {PHYLA_MAP[pKey]}
                </option>
              ))}
            </select>

            <select
              className="cute-dex-select"
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              aria-label="กรองตามความหายาก"
            >
              <option value="all">⭐ ความหายากทั้งหมด</option>
              {raritiesList.map((r) => (
                <option key={r} value={r}>
                  {ANIMAL_RARITIES[r].label}
                </option>
              ))}
            </select>

            <span className="cute-dex-count-badge">
              พบ <strong>{filteredAnimals.length}</strong>/{animalsData.length} ชนิด
            </span>
          </div>
        </div>

        {/* Content Body: Grid & Detail Pane */}
        <div className="cute-dex-body">
          {/* Left: Animal Grid */}
          <div className="cute-dex-grid">
            {filteredAnimals.map((animal) => {
              const isSelected = selectedAnimal?.id === animal.id;
              const thumbImg = animal.image || `/cards/animals/${animal.id}.png`;
              return (
                <div
                  key={animal.id}
                  className={`cute-dex-item ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    playSfx('pop');
                    setSelectedAnimal(animal);
                  }}
                >
                  <img src={thumbImg} alt={animal.name} className="dex-thumb-img" loading="lazy" />
                  <span className="cute-dex-item-name">{animal.name}</span>
                </div>
              );
            })}
            {filteredAnimals.length === 0 && (
              <div className="cute-dex-empty">
                <span>🔍 ไม่พบสัตว์ที่ตรงกับเงื่อนไข</span>
              </div>
            )}
          </div>

          {/* Right: Selected Animal Detail Card */}
          {selectedAnimal && (
            <div className="cute-dex-detail-pane">
              <div className="cute-detail-header">
                <div className="dex-large-card-preview">
                  <img
                    src={selectedAnimal.image || '/cards/animals/animal_01.png'}
                    alt={selectedAnimal.name}
                    className="dex-large-card-img"
                  />
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
                  {selectedAnimal.sciName && (
                    <div className="cute-detail-sciname">
                      <em>🔬 {selectedAnimal.sciName}</em>
                    </div>
                  )}
                  <div className="dex-taxonomy-pills">
                    <span className="taxonomy-pill phylum-pill">
                      🧬 ไฟลัม: {selectedAnimal.phylum} ({PHYLA_MAP[selectedAnimal.phylum] || selectedAnimal.phylum})
                    </span>
                    {selectedAnimal.className && (
                      <span className="taxonomy-pill class-pill">
                        🏷️ ชั้น: {selectedAnimal.className}
                      </span>
                    )}
                    {selectedAnimal.dietType && (
                      <span className="taxonomy-pill diet-pill">
                        🍽️ {selectedAnimal.dietType}
                      </span>
                    )}
                  </div>
                  <div className="cute-detail-habitat">📍 ถิ่นที่อยู่: {selectedAnimal.habitat}</div>
                </div>
              </div>

              {/* Bio Description */}
              <p className="cute-detail-desc">{selectedAnimal.desc}</p>

              {/* Fun Fact Callout */}
              {selectedAnimal.funFact && (
                <div className="dex-fun-fact-box">
                  <span className="fun-fact-icon">💡</span>
                  <span className="fun-fact-text">{selectedAnimal.funFact}</span>
                </div>
              )}

              {/* Traits Breakdown */}
              <div className="cute-detail-traits-section">
                <div className="cute-detail-traits-label">คุณสมบัติทางชีววิทยาที่ตรงกับช่องคำถาม:</div>
                <div className="cute-detail-traits-grid">
                  {distinctTraits.map((tLabel, idx) => {
                    const originalKey = selectedAnimal.traits.find((k) => (TRAIT_MAP[k] || k) === tLabel) || 'no_tissue';
                    const colors = TRAIT_COLORS[originalKey] || { bg: '#252F28', text: '#EDE8DC', border: '#3D4B40', iconName: 'backbone' };
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
