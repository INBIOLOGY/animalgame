// 🔬 Biological Trait Taxonomy & Encyclopedia — FIT me / PORIFERA TCG Edition

export const PHYLA_MAP = {
  Porifera: 'ไฟลัมพอริเฟอรา (ฟองน้ำ)',
  Cnidaria: 'ไฟลัมไนดาเรีย (สัตว์มีเข็มพิษ)',
  Platyhelminthes: 'ไฟลัมแพลทิเฮลมินธิส (หนอนตัวแบน)',
  Nematoda: 'ไฟลัมเนมาโทดา (หนอนตัวกลม)',
  Annelida: 'ไฟลัมแอนเนลิดา (หนอนปล้อง)',
  Mollusca: 'ไฟลัมมอลลัสกา (สัตว์ลำตัวนิ่ม/หอย/หมึก)',
  Arthropoda: 'ไฟลัมอาร์โทรโพดา (สัตว์ขาข้อ)',
  Echinodermata: 'ไฟลัมเอคไคโนเดอร์มาตา (สัตว์ผิวหนาม)',
  Chordata: 'ไฟลัมคอร์ดาตา (สัตว์มีแกนสันหลัง)',
};

export const TRAIT_MAP = {
  // ไฟลัมหลัก
  phylum_porifera: 'ไฟลัมพอริเฟอรา (ฟองน้ำ)',
  phylum_cnidaria: 'ไฟลัมไนดาเรีย (มีเข็มพิษ)',
  phylum_platyhelminthes: 'ไฟลัมแพลทิเฮลมินธิส (หนอนตัวแบน)',
  phylum_nematoda: 'ไฟลัมเนมาโทดา (หนอนตัวกลม)',
  phylum_annelida: 'ไฟลัมแอนเนลิดา (หนอนปล้อง)',
  phylum_mollusca: 'ไฟลัมมอลลัสกา (หอยและหมึก)',
  phylum_arthropoda: 'ไฟลัมอาร์โทรโพดา (สัตว์ขาข้อ)',
  phylum_echinodermata: 'ไฟลัมเอคไคโนเดอร์มาตา (สัตว์ผิวหนาม)',
  phylum_chordata: 'ไฟลัมคอร์ดาตา (สัตว์มีแกนสันหลัง)',

  // Porifera
  no_tissue: 'ไม่มีเนื้อเยื่อแท้จริง',
  asymmetry: 'อสมมาตร (Asymmetry)',
  spongin_spicule: 'มี Spongin หรือ Spicule',
  choanocyte: 'มีรูพรุน พบ Choanocyte',
  spongocoel_osculum: 'มี Ostia, Spongocoel & Osculum',
  no_nervous_digestive: 'ไม่มีระบบประสาทและทางเดินอาหาร',

  // Cnidaria
  radial_symmetry: 'มีสมมาตรรัศมี',
  incomplete_gut: 'ทางเดินอาหารไม่สมบูรณ์',
  nerve_net: 'ประสาทร่างแห (Nerve Net)',
  cnidocyte: 'มีเซลล์เข็มพิษ (Cnidocyte)',
  polyp_medusa: 'รูปร่าง Polyp & Medusa',
  tentacle_nematocyst: 'มี Tentacle & Nematocysts',

  // Platyhelminthes
  flat_body: 'ลำตัวแบน',
  pharynx_incomplete_gut: 'ทางเดินอาหารไม่สมบูรณ์ พบ Pharynx',
  flame_cell: 'ขับถ่ายด้วย Flame Cell',
  ladder_nerve: 'ประสาทขั้นบันได (Ladder Type)',
  triploblastic_acoelomate: 'เนื้อเยื่อ 3 ชั้น ไร้ช่องว่างลำตัว',
  parasitic_sucker: 'ปรสิต มีปุ่มดูด (Sucker)',

  // Nematoda
  longitudinal_muscle: 'กล้ามเนื้อตามยาวชุดเดียว',
  shiny_parasite: 'ผิวเรียบมันวาว เป็นปรสิต',
  pseudocoelom: 'ช่องว่างลำตัวเทียม (Pseudocoelom)',
  thick_cuticle: 'มี Cuticle หนาปกคลุม',
  ecdysozoa_pseudocoelom: 'ตัวอ่อน Ecdysozoa ช่องตัวเทียม',

  // Annelida
  closed_circulation: 'ระบบเลือดแบบปิด',
  lophophore_closed_blood: 'ตัวอ่อน Lophophore เลือดปิด',
  nephridium: 'ขับถ่ายด้วย Nephridium',
  segmented_round_body: 'ลำตัวกลมยาวเป็นปล้อง',
  parapodia: 'มี Parapodia แลกเปลี่ยนแก๊ส',
  clitellum: 'ลำตัวเป็นปล้อง พบ Clitellum',
  gizzard_crop: 'ช่องตัวแท้ มีกึ๋นและกระเพาะพัก',

  // Mollusca
  mantle_cavity: 'พบ Mantle Cavity',
  mantle: 'มี Mantle หุ้มอวัยวะ',
  radula: 'มีฟันลิ้น (Radula) ขูดอาหาร',
  siphon: 'มีท่อไซฟอน (Siphon) พ่นน้ำ',
  exoskeleton_endoskeleton_shell: 'มีโครงร่างแข็งนอกหรือใน',
  visceral_mass: 'มีก้อนเครื่องใน (Visceral Mass)',

  // Arthropoda
  jointed_appendages: 'ลำตัวและรยางค์เป็นข้อปล้อง',
  exoskeleton_chitin: 'เปลือกไคติน / Exoskeleton',
  head_thorax_abdomen: 'ลำตัวแบ่ง 3 ส่วน (หัว อก ท้อง)',
  open_circulatory_molting: 'เลือดเปิด ตัวอ่อนลอกคราบ',
  triploblastic_jointed: 'เนื้อเยื่อ 3 ชั้น ข้อปล้อง',

  // Echinodermata
  all_marine: 'อาศัยอยู่ในทะเลทั้งหมด',
  bilateral_larva_radial_adult: 'ตัวอ่อนสมมาตรครึ่งซีก ตัวเต็มวัยรัศมี',
  spiny_water_vascular: 'ผิวหนาม ระบบ Water Vascular',
  tube_feet: 'เคลื่อนที่ด้วย Tube Feet',
  nerve_ring: 'มีวงแหวนประสาท (Nerve Ring)',

  // Chordata
  notochord: 'มีโครงสร้างสันหลังอ่อน (Notochord) ในระยะหนึ่งของวงจรชีวิต',
  dorsal_nerve_cord: 'ท่อประสาทกลวงด้านหลัง',
  gill_slits: 'มีช่องเหงือก (Gill Slits)',
  post_anal_tail: 'มี Notochord & Post-anal Tail',
  vertebrate_closed_blood: 'พัฒนากระดูกสันหลัง เลือดปิด',
};

// 🎨 Trait Colors tailored for high contrast biology badges
export const TRAIT_COLORS = {
  // Porifera
  no_tissue: { bg: '#252F28', text: '#EDE8DC', border: '#3D4B40', iconName: 'no_backbone' },
  asymmetry: { bg: '#202822', text: '#C4BCAB', border: '#354238', iconName: 'no_backbone' },
  spongin_spicule: { bg: '#332C1E', text: '#D9B44A', border: '#5C4E2D', iconName: 'has_scales' },
  choanocyte: { bg: '#243022', text: '#A9C49F', border: '#3D5437', iconName: 'water_living' },
  spongocoel_osculum: { bg: '#1A292C', text: '#89BDC7', border: '#2C494F', iconName: 'swim' },
  no_nervous_digestive: { bg: '#252F28', text: '#EDE8DC', border: '#3D4B40', iconName: 'no_backbone' },

  // Cnidaria
  radial_symmetry: { bg: '#30262C', text: '#DBABC3', border: '#543B4B', iconName: 'swim' },
  incomplete_gut: { bg: '#33231E', text: '#E5987A', border: '#5C382C', iconName: 'carnivore' },
  nerve_net: { bg: '#2A1F3D', text: '#C084FC', border: '#581C87', iconName: 'cold_blooded' },
  cnidocyte: { bg: '#3B1828', text: '#F472B6', border: '#831843', iconName: 'carnivore' },
  polyp_medusa: { bg: '#1E2C2E', text: '#89BDC7', border: '#324F54', iconName: 'swim' },
  tentacle_nematocyst: { bg: '#3B1828', text: '#FB7185', border: '#881337', iconName: 'carnivore' },

  // Platyhelminthes
  flat_body: { bg: '#243022', text: '#A9C49F', border: '#3D5437', iconName: 'terrestrial' },
  pharynx_incomplete_gut: { bg: '#33231E', text: '#E5987A', border: '#5C382C', iconName: 'carnivore' },
  flame_cell: { bg: '#332C1E', text: '#FBBF24', border: '#78350F', iconName: 'warm_blooded' },
  ladder_nerve: { bg: '#1E2833', text: '#9BB8D9', border: '#32465C', iconName: 'cold_blooded' },
  triploblastic_acoelomate: { bg: '#252F28', text: '#EDE8DC', border: '#3D4B40', iconName: 'no_backbone' },
  parasitic_sucker: { bg: '#331E1E', text: '#F87171', border: '#7F1D1D', iconName: 'carnivore' },

  // Nematoda
  longitudinal_muscle: { bg: '#1E2C2E', text: '#89BDC7', border: '#324F54', iconName: 'swim' },
  shiny_parasite: { bg: '#331E1E', text: '#F87171', border: '#7F1D1D', iconName: 'carnivore' },
  pseudocoelom: { bg: '#243022', text: '#A9C49F', border: '#3D5437', iconName: 'terrestrial' },
  thick_cuticle: { bg: '#332C1E', text: '#D9B44A', border: '#5C4E2D', iconName: 'has_scales' },
  ecdysozoa_pseudocoelom: { bg: '#253022', text: '#86EFAC', border: '#14532D', iconName: 'terrestrial' },

  // Annelida
  closed_circulation: { bg: '#331E1E', text: '#FCA5A5', border: '#7F1D1D', iconName: 'warm_blooded' },
  lophophore_closed_blood: { bg: '#1A292C', text: '#89BDC7', border: '#2C494F', iconName: 'swim' },
  nephridium: { bg: '#332C1E', text: '#FDE047', border: '#713F12', iconName: 'cold_blooded' },
  segmented_round_body: { bg: '#243022', text: '#A9C49F', border: '#3D5437', iconName: 'terrestrial' },
  parapodia: { bg: '#1A292C', text: '#67E8F9', border: '#164E63', iconName: 'swim' },
  clitellum: { bg: '#30262C', text: '#F472B6', border: '#831843', iconName: 'terrestrial' },
  gizzard_crop: { bg: '#33231E', text: '#FDBA74', border: '#7C2D12', iconName: 'carnivore' },

  // Mollusca
  mantle_cavity: { bg: '#1A292C', text: '#89BDC7', border: '#2C494F', iconName: 'swim' },
  mantle: { bg: '#30262C', text: '#DBABC3', border: '#543B4B', iconName: 'swim' },
  radula: { bg: '#332C1E', text: '#D9B44A', border: '#5C4E2D', iconName: 'carnivore' },
  siphon: { bg: '#1A292C', text: '#38BDF8', border: '#075985', iconName: 'swim' },
  exoskeleton_endoskeleton_shell: { bg: '#332C1E', text: '#FDE047', border: '#713F12', iconName: 'has_scales' },
  visceral_mass: { bg: '#2A1F3D', text: '#E879F9', border: '#701A75', iconName: 'cold_blooded' },

  // Arthropoda
  jointed_appendages: { bg: '#33231E', text: '#FB923C', border: '#7C2D12', iconName: 'terrestrial' },
  exoskeleton_chitin: { bg: '#332C1E', text: '#FBBF24', border: '#78350F', iconName: 'has_scales' },
  head_thorax_abdomen: { bg: '#1E2833', text: '#93C5FD', border: '#1E3A8A', iconName: 'fly' },
  open_circulatory_molting: { bg: '#331E1E', text: '#F87171', border: '#7F1D1D', iconName: 'terrestrial' },
  triploblastic_jointed: { bg: '#243022', text: '#86EFAC', border: '#14532D', iconName: 'terrestrial' },

  // Echinodermata
  all_marine: { bg: '#1A292C', text: '#38BDF8', border: '#075985', iconName: 'swim' },
  bilateral_larva_radial_adult: { bg: '#30262C', text: '#E879F9', border: '#701A75', iconName: 'swim' },
  spiny_water_vascular: { bg: '#1A292C', text: '#67E8F9', border: '#164E63', iconName: 'swim' },
  tube_feet: { bg: '#1A292C', text: '#89BDC7', border: '#2C494F', iconName: 'swim' },
  nerve_ring: { bg: '#2A1F3D', text: '#C084FC', border: '#581C87', iconName: 'cold_blooded' },

  // Chordata
  notochord: { bg: '#252F28', text: '#86EFAC', border: '#166534', iconName: 'backbone' },
  dorsal_nerve_cord: { bg: '#1E2833', text: '#93C5FD', border: '#1E3A8A', iconName: 'backbone' },
  gill_slits: { bg: '#1A292C', text: '#38BDF8', border: '#075985', iconName: 'swim' },
  post_anal_tail: { bg: '#332C1E', text: '#FDE047', border: '#713F12', iconName: 'backbone' },
  vertebrate_closed_blood: { bg: '#331E1E', text: '#F87171', border: '#7F1D1D', iconName: 'backbone' },
};

// 👑 Rarity Tiers
export const ANIMAL_RARITIES = {
  common: { label: 'ทั่วไป', color: '#C4BCAB', bg: '#222B24', border: '#38473B' },
  rare: { label: 'หายาก', color: '#89BDC7', bg: '#1E2C2E', border: '#324F54' },
  epic: { label: 'ล้ำค่า', color: '#DBABC3', bg: '#30262C', border: '#543B4B' },
  legendary: { label: 'ตำนาน', color: '#D9B44A', bg: '#332C1E', border: '#5C4E2D' },
};

// 🐾 Emojis for Avatars & Icons
export const ANIMAL_EMOJI_MAP = {
  sponge_bath: '🧽',
  sponge_calcareous: '🧽',
  sponge_glass: '💎',
  sponge_calcarea: '🧽',
  sea_anemone: '🌸',
  brain_coral: '🧠',
  sea_pen: '✒️',
  sea_fan: '🪸',
  jellyfish_sea_nettle: '🪼',
  obelia: '🌿',
  planaria: '🪱',
  hammerhead_worm: '🔨',
  marine_flatworm: '🌊',
  fluke_liver: '🍃',
  tapeworm: '🎗️',
  nematode_roundworm: '🪱',
  ascaris_lumbricoides: '🪱',
  hookworm: '🪝',
  whipworm: '🥢',
  gnathostoma: '🦠',
  filarial_worm: '🐘',
  earthworm: '🪱',
  leech: '🩸',
  land_leech: '🩸',
  nereis_ragworm: '🐛',
  christmas_tree_worm: '🎄',
  scale_worm: '🛡️',
  snail_land: '🐌',
  tusk_shell: '🐚',
  nautilus: '🐚',
  squid_common: '🦑',
  sea_hare: '🐰',
  nudibranch: '🐉',
  crab_blue: '🦀',
  horseshoe_crab: '🛡️',
  spider: '🕷️',
  dragonfly: '🛸',
  centipede: '🐛',
  millipede: '🐛',
  barnacle: '🪨',
  starfish: '⭐',
  brittle_star: '🌟',
  sea_urchin: '⚫',
  sea_cucumber: '🥒',
  sea_lily: '🪷',
  frog: '🐸',
  snake: '🐍',
  caecilian: '🪱',
  shark: '🦈',
  turtle: '🐢',
  bird: '🐦',
  clownfish: '🐠',
  coelacanth: '🐟',
  tunicate_sea_squirt: '🧅',
  lamprey: '🦈',
  lancelet: '🗡️',
  // legacy aliases
  lion: '🦁',
  tiger: '🐯',
  cheetah: '🐆',
  elephant: '🐘',
  eagle: '🦅',
  owl: '🦉',
  penguin: '🐧',
  dolphin: '🐬',
  whale: '🐳',
  crocodile: '🐊',
  crab: '🦀',
  octopus: '🐙',
  butterfly: '🦋',
  kangaroo: '🦘',
  koala: '🐨',
  wolf: '🐺',
  chimp: '🐵',
  polar_bear: '🐻‍❄️'
};

export function getAnimalEmoji(animalId) {
  return ANIMAL_EMOJI_MAP[animalId] || '🐾';
}

// 🌿 Trait Compatibility Engine
export function isTraitCompatible(animalTraitsOrCard = [], requiredTrait) {
  if (!requiredTrait) return false;

  let animalTraits = [];

  // If a card object was passed directly
  if (typeof animalTraitsOrCard === 'object' && animalTraitsOrCard !== null && !Array.isArray(animalTraitsOrCard)) {
    const card = animalTraitsOrCard;
    // Fit Free (Wildcard) can be placed in ANY slot
    if (
      card.actionType === 'wildcard' ||
      card.id === 'special_fit_free' ||
      card.id?.startsWith('special_fit_free') ||
      card.cardInstanceId?.startsWith('special_fit_free') ||
      card.isPlayableOnSlot
    ) {
      return true;
    }
    animalTraits = card.traits || [];
  } else if (Array.isArray(animalTraitsOrCard)) {
    animalTraits = animalTraitsOrCard;
  }

  if (
    animalTraits.includes('wildcard') ||
    animalTraits.includes('fit_free') ||
    animalTraits.includes('special_fit_free')
  ) {
    return true;
  }

  const target = typeof requiredTrait === 'object' ? requiredTrait.requiredTrait : requiredTrait;
  if (!target) return false;

  if (animalTraits.includes(target)) return true;

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

  const matches = aliases[target];
  if (matches) {
    return matches.some((t) => animalTraits.includes(t));
  }

  return false;
}

export const ALL_ANIMALS_DATA = [
  // 🦁 18 Selectable Avatars with Full Biological Profiles
  {
    id: 'lion', name: 'สิงโต', englishName: 'Lion', sciName: 'Panthera leo',
    phylum: 'Chordata', className: 'Mammalia', rarity: 'legendary',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ทุ่งหญ้าสะวันนา แอฟริกา', dietType: 'สัตว์กินเนื้อ',
    desc: 'สัตว์เลี้ยงลูกด้วยนมชั้น Mammalia กินเนื้อ เจ้าป่าผู้ทรงพลัง อาศัยอยู่รวมกันเป็นฝูง (Pride)',
    funFact: 'เพศเมียเป็นผู้ล่าหลักของฝูง ขณะที่เพศผู้มีหน้าที่ปกป้องอาณาเขต'
  },
  {
    id: 'tiger', name: 'เสือโคร่ง', englishName: 'Tiger', sciName: 'Panthera tigris',
    phylum: 'Chordata', className: 'Mammalia', rarity: 'legendary',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ป่าทึบและป่าเบญจพรรณ เอเชีย', dietType: 'สัตว์กินเนื้อ',
    desc: 'สัตว์ตระกูลแมวที่ใหญ่ที่สุด มีลวดลายพรางตัวเป็นเอกลักษณ์ เป็นสัตว์เดี่ยว',
    funFact: 'ว่ายน้ำได้เก่งมาก ต่างจากแมวชนิดอื่น ชอบแช่น้ำเพื่อคลายร้อน'
  },
  {
    id: 'cheetah', name: 'ชีตาห์', englishName: 'Cheetah', sciName: 'Acinonyx jubatus',
    phylum: 'Chordata', className: 'Mammalia', rarity: 'epic',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ทุ่งหญ้าโล่ง แอฟริกาและเอเชียตะวันตก', dietType: 'สัตว์กินเนื้อ',
    desc: 'สัตว์บกที่วิ่งเร็วที่สุดในโลก มีกรงเล็บที่ไม่หดได้ ต่างจากแมวชนิดอื่น',
    funFact: 'วิ่งเร็วสุดถึง 120 กม./ชม. เร่งความเร็วจาก 0 ถึง 100 กม./ชม. ได้ภายใน 3 วินาที'
  },
  {
    id: 'elephant', name: 'ช้าง', englishName: 'Elephant', sciName: 'Elephas maximus',
    phylum: 'Chordata', className: 'Mammalia', rarity: 'epic',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ป่าเขตร้อนและทุ่งหญ้า เอเชียและแอฟริกา', dietType: 'สัตว์กินพืช',
    desc: 'สัตว์บกเลี้ยงลูกด้วยนมขนาดใหญ่ที่สุด มีงวงอเนกประสงค์และความจำดีเลิศ',
    funFact: 'งวงของช้างมีกล้ามเนื้อมากกว่า 100,000 มัด และสามารถยกน้ำหนักได้มากกว่า 300 กิโลกรัม'
  },
  {
    id: 'eagle', name: 'นกอินทรี', englishName: 'Eagle', sciName: 'Aquila chrysaetos',
    phylum: 'Chordata', className: 'Aves', rarity: 'epic',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ภูเขาสูง ป่าทึบ และทุ่งกว้าง', dietType: 'สัตว์กินเนื้อ',
    desc: 'นกล่าเหยื่อสายตาคมกริบ กรงเล็บแข็งแรง โฉบจับเหยื่อได้อย่างแม่นยำ',
    funFact: 'มองเห็นได้ไกลและคมชัดกว่ามนุษย์ถึง 4–5 เท่า สามารถมองเห็นเหยื่อจากระยะกว่า 3 กิโลเมตร'
  },
  {
    id: 'owl', name: 'นกฮูก', englishName: 'Owl', sciName: 'Strix sp.',
    phylum: 'Chordata', className: 'Aves', rarity: 'rare',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ป่าไม้ทั่วโลก และโพรงไม้', dietType: 'สัตว์กินเนื้อ',
    desc: 'นกล่าเหยื่อกลางคืน บินได้เงียบกริบ หมุนคอได้รอบทิศเกือบ 270 องศา',
    funFact: 'บินเงียบกริบได้เพราะขอบขนปีกมีลักษณะพิเศษที่ดูดซับเสียง ทำให้เหยื่อไม่รู้ตัว'
  },
  {
    id: 'penguin', name: 'เพนกวิน', englishName: 'Penguin', sciName: 'Spheniscus sp.',
    phylum: 'Chordata', className: 'Aves', rarity: 'rare',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ขั้วโลกใต้และชายฝั่งหนาวเย็น', dietType: 'สัตว์กินปลา',
    desc: 'นกน้ำที่ไม่บิน แต่ว่ายน้ำดำน้ำจับปลาได้อย่างคล่องแคล่วว่องไว',
    funFact: 'แม้บินไม่ได้ แต่ว่ายน้ำได้เร็วกว่า 36 กม./ชม. และดำน้ำได้ลึกกว่า 500 เมตร'
  },
  {
    id: 'shark', name: 'ฉลาม', englishName: 'Shark', sciName: 'Carcharodon sp.',
    phylum: 'Chordata', className: 'Chondrichthyes (ปลากระดูกอ่อน)', rarity: 'epic',
    traits: ['phylum_chordata', 'notochord', 'gill_slits', 'vertebrate_closed_blood'],
    habitat: 'มหาสมุทรทั่วโลก', dietType: 'สัตว์กินเนื้อ',
    desc: 'ปลากระดูกอ่อนนักล่าแห่งท้องทะเล มีฟันคมหลายแถว และประสาทสัมผัสกระแสไฟฟ้า',
    funFact: 'มีอวัยวะพิเศษที่เรียกว่า Ampullae of Lorenzini ที่ตรวจจับกระแสไฟฟ้าจากสัตว์เหยื่อได้'
  },
  {
    id: 'dolphin', name: 'โลมา', englishName: 'Dolphin', sciName: 'Delphinus sp.',
    phylum: 'Chordata', className: 'Mammalia', rarity: 'epic',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ทะเลอบอุ่นและชายฝั่ง', dietType: 'สัตว์กินปลา',
    desc: 'สัตว์เลี้ยงลูกด้วยนมในน้ำ ฉลาด แสนรู้ ใช้คลื่นเสียงโซนาร์สื่อสารและล่าเหยื่อ',
    funFact: 'ใช้คลื่นเสียงความถี่สูง (Echolocation / โซนาร์) ล่าเหยื่อในน้ำขุ่นและสื่อสารกันในฝูง'
  },
  {
    id: 'frog', name: 'กบ', englishName: 'Frog', sciName: 'Rana sp.',
    phylum: 'Chordata', className: 'Amphibia (สัตว์ครึ่งบกครึ่งน้ำ)', rarity: 'common',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'แหล่งน้ำจืดและป่าชื้น', dietType: 'สัตว์กินเนื้อ',
    desc: 'สัตว์สะเทินน้ำสะเทินบก (Amphibia) มีการเปลี่ยนแปลงรูปร่าง ลูกอ๊อดอยู่ในน้ำ ตัวเต็มวัยอยู่บก',
    funFact: 'หายใจด้วยผิวหนังได้ถึง 50% ทำให้ผิวหนังต้องชุ่มชื้นตลอดเวลา'
  },
  {
    id: 'turtle', name: 'เต่าบก', englishName: 'Tortoise', sciName: 'Geochelone sp.',
    phylum: 'Chordata', className: 'Reptilia (สัตว์เลื้อยคลาน)', rarity: 'rare',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ป่าโปร่งและทะเลทราย', dietType: 'สัตว์กินพืช',
    desc: 'สัตว์เลื้อยคลานโบราณ มีกระดองแข็งปกป้องร่างกาย อายุยืนยาวหลายร้อยปี',
    funFact: 'กระดองของเต่าเชื่อมกับกระดูกสันหลังและกระดูกซี่โครง ถอดออกไม่ได้ เป็นส่วนหนึ่งของร่างกาย'
  },
  {
    id: 'octopus', name: 'หมึกยักษ์', englishName: 'Octopus', sciName: 'Octopus vulgaris',
    phylum: 'Mollusca', className: 'Cephalopoda (หมวดหนวดเท้า)', rarity: 'epic',
    traits: ['phylum_mollusca', 'mantle_cavity', 'mantle', 'radula', 'siphon', 'visceral_mass'],
    habitat: 'โขดหินใต้ทะเลลึก', dietType: 'สัตว์กินเนื้อ',
    desc: 'สัตว์ไม่มีกระดูกสันหลัง (Mollusca) ฉลาดสูง มี 8 หนวด พ่นหมึกพรางตัวและเปลี่ยนสีได้',
    funFact: 'มีเลือดสีน้ำเงิน (Hemocyanin) และมีสมองถึง 9 ก้อน — 1 ก้อนกลาง และ 8 ก้อนในแต่ละหนวด'
  },
  {
    id: 'butterfly', name: 'ผีเสื้อ', englishName: 'Butterfly', sciName: 'Lepidoptera sp.',
    phylum: 'Arthropoda', className: 'Insecta (แมลง)', rarity: 'common',
    traits: ['phylum_arthropoda', 'jointed_appendages', 'exoskeleton_chitin', 'head_thorax_abdomen', 'open_circulatory_molting', 'triploblastic_jointed'],
    habitat: 'ทุ่งดอกไม้และป่าไม้ทั่วโลก', dietType: 'สัตว์กินน้ำหวาน',
    desc: 'แมลง (Insecta) ปีกสวยงาม มีการเปลี่ยนแปลงรูปร่างครบขั้น (ไข่ → หนอน → ดักแด้ → ผีเสื้อ)',
    funFact: 'รับรสอาหารด้วยขา มีตาประกอบ (Compound Eye) ที่ประกอบด้วยเลนส์มากกว่า 6,000 ดวง'
  },
  {
    id: 'kangaroo', name: 'จิงโจ้', englishName: 'Kangaroo', sciName: 'Macropus sp.',
    phylum: 'Chordata', className: 'Mammalia (Marsupial)', rarity: 'rare',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ทุ่งหญ้าและพุ่มไม้ออสเตรเลีย', dietType: 'สัตว์กินพืช',
    desc: 'สัตว์มีกระเป๋าหน้าท้อง (Marsupial) กระโดดด้วยขาหลังอันทรงพลัง ใช้หางทรงตัว',
    funFact: 'ลูกจิงโจ้เมื่อแรกเกิดมีขนาดเล็กเท่าเมล็ดถั่วลิสง ต้องคลานเข้าถุงแม่เพื่อพัฒนาต่อ'
  },
  {
    id: 'koala', name: 'โคอาลา', englishName: 'Koala', sciName: 'Phascolarctos cinereus',
    phylum: 'Chordata', className: 'Mammalia (Marsupial)', rarity: 'rare',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ป่ายูคาลิปตัส ออสเตรเลีย', dietType: 'สัตว์กินพืช',
    desc: 'สัตว์มีกระเป๋าหน้าท้องที่น่ารัก กินใบยูคาลิปตัสเป็นอาหารหลัก ซึ่งมีพิษต่อสัตว์ชนิดอื่น',
    funFact: 'นอนหลับวันละ 18–22 ชั่วโมง เพื่อประหยัดพลังงานจากใบยูคาลิปตัสที่มีคุณค่าทางอาหารต่ำ'
  },
  {
    id: 'wolf', name: 'หมาป่า', englishName: 'Wolf', sciName: 'Canis lupus',
    phylum: 'Chordata', className: 'Mammalia', rarity: 'rare',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ป่าสนและทุ่งทุนดรา ซีกโลกเหนือ', dietType: 'สัตว์กินเนื้อ',
    desc: 'สัตว์กินเนื้อสังคมสูง อยู่รวมกันเป็นฝูง (Pack) ล่าเหยื่อร่วมกันอย่างเป็นระบบ',
    funFact: 'สื่อสารด้วยการหอนที่ได้ยินได้ไกลกว่า 10 กิโลเมตร ใช้ส่งสัญญาณรวมฝูง'
  },
  {
    id: 'chimp', name: 'ชิมแปนซี', englishName: 'Chimpanzee', sciName: 'Pan troglodytes',
    phylum: 'Chordata', className: 'Mammalia', rarity: 'epic',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'ป่าดิบชื้นแอฟริกา', dietType: 'สัตว์กินทุกอย่าง',
    desc: 'ไพรเมตที่มีดีเอ็นเอใกล้เคียงมนุษย์ที่สุด ฉลาด รู้จักใช้เครื่องมือและสอนทักษะให้กัน',
    funFact: 'มีโครงสร้าง DNA ตรงกับมนุษย์ถึง 98.7% จึงถือเป็นสัตว์ที่ใกล้ชิดกับมนุษย์มากที่สุด'
  },
  {
    id: 'polar_bear', name: 'หมีขั้วโลก', englishName: 'Polar Bear', sciName: 'Ursus maritimus',
    phylum: 'Chordata', className: 'Mammalia', rarity: 'legendary',
    traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'vertebrate_closed_blood'],
    habitat: 'แผ่นน้ำแข็งอาร์กติกและมหาสมุทรอาร์กติก', dietType: 'สัตว์กินเนื้อ',
    desc: 'สัตว์กินเนื้อบนบกขนาดใหญ่ที่สุดในโลก ขนสีขาวช่วยพรางตัวบนน้ำแข็ง',
    funFact: 'ว่ายน้ำได้ต่อเนื่องหลายร้อยกิโลเมตรในมหาสมุทรน้ำแข็ง ขาหน้าแบนเหมือนพาย'
  },

  // 🧽 Core Phylum Specimens (TCG Cards)
  { id: 'sponge_bath', name: 'ฟองน้ำถูตัว', englishName: 'Bath Sponge', phylum: 'Porifera', rarity: 'common', traits: ['phylum_porifera', 'no_tissue', 'asymmetry', 'spongin_spicule', 'choanocyte', 'spongocoel_osculum', 'no_nervous_digestive'], habitat: 'แนวปะการังน้ำตื้น', desc: 'โครงร่างค้ำจุนเป็นเส้นใยโปรตีนสปอนจิน (Spongin) นุ่มยืดหยุ่น' },
  { id: 'sea_anemone', name: 'ดอกไม้ทะเล', englishName: 'Sea Anemone', phylum: 'Cnidaria', rarity: 'common', traits: ['phylum_cnidaria', 'radial_symmetry', 'incomplete_gut', 'nerve_net', 'cnidocyte', 'polyp_medusa', 'tentacle_nematocyst'], habitat: 'แนวปะการัง', desc: 'มีรูปร่างแบบ Polyp เกาะติดที่ ใช้หนวดที่มีเข็มพิษดักจับเหยื่อ' },
  { id: 'planaria', name: 'พลานาเรีย', englishName: 'Planaria', phylum: 'Platyhelminthes', rarity: 'common', traits: ['phylum_platyhelminthes', 'flat_body', 'pharynx_incomplete_gut', 'flame_cell', 'ladder_nerve', 'triploblastic_acoelomate'], habitat: 'น้ำจืดใส', desc: 'หนอนตัวแบนดำรงชีวิตอิสระ มีจุดรับแสงและคอหอยยื่นจับอาหาร' },
  { id: 'earthworm', name: 'ไส้เดือนดิน', englishName: 'Earthworm', phylum: 'Annelida', rarity: 'common', traits: ['phylum_annelida', 'closed_circulation', 'lophophore_closed_blood', 'nephridium', 'segmented_round_body', 'clitellum', 'gizzard_crop'], habitat: 'ดินชื้น', desc: 'ลำตัวเป็นปล้องชัดเจน มีไคลเทลลัมและกึ๋นบดอาหาร' },
  { id: 'snail_land', name: 'หอยทาก', englishName: 'Land Snail', phylum: 'Mollusca', rarity: 'common', traits: ['phylum_mollusca', 'mantle_cavity', 'mantle', 'radula', 'exoskeleton_endoskeleton_shell', 'visceral_mass'], habitat: 'สวนและป่าชื้น', desc: 'มีเปลือกหินปูน มีเยื่อแมนเทิล ใช้ฟันลิ้น (Radula) ขูดกินพืช' },
  { id: 'crab_blue', name: 'ปู', englishName: 'Crab', phylum: 'Arthropoda', rarity: 'common', traits: ['phylum_arthropoda', 'jointed_appendages', 'exoskeleton_chitin', 'open_circulatory_molting', 'triploblastic_jointed'], habitat: 'ชายหาดและทะเล', desc: 'มีกระดองหินปูนและไคตินหุ้ม มีรยางค์ข้อปล้อง ก้ามหน้าแข็งแรง' },
  { id: 'starfish', name: 'ดาวทะเล', englishName: 'Starfish', phylum: 'Echinodermata', rarity: 'common', traits: ['phylum_echinodermata', 'all_marine', 'bilateral_larva_radial_adult', 'spiny_water_vascular', 'tube_feet', 'nerve_ring'], habitat: 'พื้นทะเล', desc: 'ตัวเต็มวัยสมมาตร 5 แฉก ผิวหนาม เคลื่อนที่ด้วย Tube feet' },
  { id: 'clownfish', name: 'ปลาการ์ตูน', englishName: 'Clownfish', phylum: 'Chordata', rarity: 'common', traits: ['phylum_chordata', 'notochord', 'dorsal_nerve_cord', 'gill_slits', 'post_anal_tail', 'vertebrate_closed_blood'], habitat: 'ดอกไม้ทะเล', desc: 'ปลากระดูกแข็ง มีเกล็ดและครีบ อยู่ร่วมกับดอกไม้ทะเล' }
];
