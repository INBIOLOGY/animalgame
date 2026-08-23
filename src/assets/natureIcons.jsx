import React from 'react';

// 📜 Naturalist Field Journal & Biology Lab SVG Icon Library (Peterson Field Guide Style)
export function TraitIcon({ name, size = 15, color = 'currentColor' }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 },
  };

  switch (name) {
    case 'backbone':
      // Vertebral Column Specimen
      return (
        <svg {...props}>
          <path d="M12 2v20M7 5h10M6 9h12M7 13h10M8 17h8" />
          <circle cx="12" cy="5" r="1.5" fill={color} />
          <circle cx="12" cy="9" r="1.5" fill={color} />
          <circle cx="12" cy="13" r="1.5" fill={color} />
          <circle cx="12" cy="17" r="1.5" fill={color} />
        </svg>
      );
    case 'no_backbone':
    case 'invertebrate':
      // Nautilus Invertebrate Shell Specimen
      return (
        <svg {...props}>
          <path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9z" />
          <path d="M12 7a5 5 0 0 0-5 5c0 2.76 2.24 5 5 5s5-2.24 5-5a5 5 0 0 0-5-5z" strokeDasharray="1.5 2" />
        </svg>
      );
    case 'warm_blooded':
      // Solar Metabolic Heart
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" fill={color} fillOpacity="0.15" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
        </svg>
      );
    case 'cold_blooded':
      // Ectothermic Cryo Crystal
      return (
        <svg {...props}>
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
          <circle cx="12" cy="12" r="2.5" fill={color} />
        </svg>
      );
    case 'mammal':
      // Maternal Nurture Droplet Flask
      return (
        <svg {...props}>
          <path d="M9 2h6v3H9zM8 5h8l2 15H6L8 5z" fill={color} fillOpacity="0.1" />
          <path d="M10 11v5M14 11v5" />
        </svg>
      );
    case 'lays_eggs':
      // Field Specimen Egg in Straw Nest
      return (
        <svg {...props}>
          <ellipse cx="12" cy="12" rx="5.5" ry="7.5" fill={color} fillOpacity="0.15" />
          <path d="M5 20h14M7 18c3 2 7 2 10 0" />
        </svg>
      );
    case 'fly':
      // Avian Flight Wing Quill
      return (
        <svg {...props}>
          <path d="M3 16c4-7 11-10 18-10-2 4-4 8-8 11-3 2-6 2-10-1z" fill={color} fillOpacity="0.15" />
          <path d="M8 12c3-2 7-3 10-3" />
        </svg>
      );
    case 'swim':
      // Marine Hydrofoil Wave
      return (
        <svg {...props}>
          <path d="M2 12c2.5-2 5.5-2 8 0s5.5 2 8 0 4-1.5 4-1.5" />
          <path d="M2 17c2.5-2 5.5-2 8 0s5.5 2 8 0 4-1.5 4-1.5" />
          <path d="M17 7l4 3-4 3" />
        </svg>
      );
    case 'terrestrial':
      // Terrestrial Animal Track Print
      return (
        <svg {...props}>
          <ellipse cx="12" cy="15" rx="4.5" ry="3.5" fill={color} fillOpacity="0.2" />
          <circle cx="7.5" cy="9.5" r="1.8" fill={color} />
          <circle cx="11" cy="7.5" r="1.8" fill={color} />
          <circle cx="14.5" cy="7.5" r="1.8" fill={color} />
          <circle cx="17.5" cy="10" r="1.6" fill={color} />
        </svg>
      );
    case 'amphibian':
      // Dual Amphibious Metamorphosis
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4v16" strokeDasharray="2 2" />
          <path d="M7 12a5 5 0 0 0 5 5" fill={color} fillOpacity="0.2" />
        </svg>
      );
    case 'herbivore':
      // Botanical Herbarium Leaf
      return (
        <svg {...props}>
          <path d="M11 20A7 7 0 0 1 4 13C4 7 10 3 20 3c0 10-4 16-9 17z" fill={color} fillOpacity="0.15" />
          <path d="M4 20l7-7" />
        </svg>
      );
    case 'carnivore':
      // Predator Canine Incisor
      return (
        <svg {...props}>
          <path d="M6 4c2 5 4 14 6 17 2-3 4-12 6-17-3 2-9 2-12 0z" fill={color} fillOpacity="0.15" />
          <path d="M10 8c1 1 3 1 4 0" />
        </svg>
      );
    case 'omnivore':
      // Balanced Dietary Scale
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 3.5v17M6 10c2-1 4-1 6 0M12 14c2 1 4 1 6 0" />
        </svg>
      );
    case 'has_fur':
      // Mammalian Fur Hatching
      return (
        <svg {...props}>
          <path d="M4 18c2-4 3-8 4-12M9 19c2-4 3-8 4-12M14 18c2-4 3-8 4-12M19 17c1-3 2-6 2-9" />
        </svg>
      );
    case 'has_scales':
      // Reptilian Scale Pattern
      return (
        <svg {...props}>
          <path d="M4 8c4 3 8 3 12 0M8 14c4 3 8 3 12 0M2 14c2 1.5 4 1.5 6 0M6 20c4 3 8 3 12 0" />
        </svg>
      );
    case 'has_feathers':
      // Naturalist Feather Plume
      return (
        <svg {...props}>
          <path d="M20 2C9 3 4 12 4 22M20 2c-3 9-10 14-16 20" />
          <path d="M16 6l-6 6M13 11l-5 5" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.5" fill={color} />
        </svg>
      );
  }
}

// 🏛️ Naturalist Journal UI & Lab Icons (Hand-drawn Single-ink Style)
export function UIIcon({ name, size = 18, color = 'currentColor' }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 },
  };

  switch (name) {
    case 'book':
      // Field Expedition Journal
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8M8 11h6" />
          <path d="M4 6h2.5" />
        </svg>
      );
    case 'music_on':
      // Acoustic Note
      return (
        <svg {...props}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" fill={color} />
          <circle cx="18" cy="16" r="3" fill={color} />
        </svg>
      );
    case 'music_off':
      // Muted Acoustic Note
      return (
        <svg {...props}>
          <path d="M9 18V5l12-2v13M2 2l20 20" />
          <circle cx="6" cy="18" r="3" fill={color} />
          <circle cx="18" cy="16" r="3" fill={color} />
        </svg>
      );
    case 'trophy':
      // Explorer's Medal Stamp
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="6" fill={color} fillOpacity="0.1" />
          <path d="M8 13l-2 9 6-3 6 3-2-9" />
          <circle cx="12" cy="8" r="3" />
        </svg>
      );
    case 'recycle':
      // Specimen Exchange Archive
      return (
        <svg {...props}>
          <path d="M7 19H4.8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2H10l2 2h7.2a2 2 0 0 1 2 2v2" />
          <path d="M14 16l3 3 3-3M17 19v-6" />
        </svg>
      );
    case 'exit':
      // Field Station Exit Door
      return (
        <svg {...props}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
      );
    case 'bot':
      // Mechanical Laboratory Automaton
      return (
        <svg {...props}>
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v3M8 15h.01M16 15h.01M9 18h6" />
        </svg>
      );
    case 'star':
      // Observation Pin / Seal
      return (
        <svg {...props}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={color} fillOpacity="0.2" />
        </svg>
      );
    case 'users':
      // Field Expedition Team
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'timer':
      // Brass Pocket Watch
      return (
        <svg {...props}>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l3 2M12 5V2M10 2h4" />
        </svg>
      );
    case 'search':
      // Naturalist Brass Magnifier
      return (
        <svg {...props}>
          <circle cx="10.5" cy="10.5" r="7" />
          <path d="M21 21l-5.2-5.2M10.5 7.5a3 3 0 0 0-3 3" />
        </svg>
      );
    case 'copy':
      // Field Specimen Duplicate
      return (
        <svg {...props}>
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      );
    case 'check':
    case 'stamp':
      // Verified Ink Stamp
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" strokeDasharray="3 2" />
          <path d="M8 12l3 3 5-6" strokeWidth={2.2} />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

// 🌿 Authentic Vector Logo Emblem for Wildlife TCG
export function GameLogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ flexShrink: 0 }}>
      {/* Shield Base */}
      <path
        d="M24 4 L40 10 V24 C40 33 33 41 24 44 C15 41 8 33 8 24 V10 L24 4 Z"
        fill="url(#shieldGrad)"
        stroke="#143011"
        strokeWidth="2"
      />
      {/* Golden Inner Ring */}
      <circle cx="24" cy="22" r="12" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Animal Paw / Leaf Emblem */}
      <ellipse cx="24" cy="25" rx="5" ry="4" fill="#FEF3C7" />
      <circle cx="18" cy="18" r="2.2" fill="#FEF3C7" />
      <circle cx="22" cy="15" r="2.2" fill="#FEF3C7" />
      <circle cx="26" cy="15" r="2.2" fill="#FEF3C7" />
      <circle cx="30" cy="18" r="2.2" fill="#FEF3C7" />
      {/* Star Laurel */}
      <path d="M24 38 L25.5 35 L28.5 35 L26 33 L27 30 L24 32 L21 30 L22 33 L19.5 35 L22.5 35 Z" fill="#F59E0B" />
      <defs>
        <linearGradient id="shieldGrad" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B7D2C" />
          <stop offset="1" stopColor="#1B4214" />
        </linearGradient>
      </defs>
    </svg>
  );
}

