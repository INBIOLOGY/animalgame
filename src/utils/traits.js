// 🌿 Biological Trait Taxonomy — Chalkboard Biology Lab Edition
export const TRAIT_MAP = {
  backbone: 'มีกระดูกสันหลัง',
  has_backbone: 'มีกระดูกสันหลัง',
  no_backbone: 'ไม่มีกระดูกสันหลัง',
  invertebrate: 'ไม่มีกระดูกสันหลัง',
  warm_blooded: 'สัตว์เลือดอุ่น',
  cold_blooded: 'สัตว์เลือดเย็น',
  mammal: 'เลี้ยงลูกด้วยนม',
  lays_eggs: 'ออกลูกเป็นไข่',
  bird: 'สัตว์ปีก',
  reptile: 'สัตว์เลื้อยคลาน',
  fish: 'สัตว์น้ำ / ปลา',
  fly: 'บินได้',
  can_fly: 'บินได้',
  swim: 'ว่ายน้ำได้',
  water_living: 'สัตว์น้ำ',
  terrestrial: 'สัตว์บก',
  land_living: 'สัตว์บก',
  amphibian: 'สะเทินน้ำสะเทินบก',
  herbivore: 'กินพืช',
  carnivore: 'กินเนื้อ',
  omnivore: 'กินทั้งพืชและสัตว์',
  has_fur: 'มีขนปุกปุย',
  has_scales: 'มีเกล็ดปกคลุม',
  has_feathers: 'มีขนแบบขนนก',
};

// 🎨 Chalk Palette: Soft Chalk Dust on Blackboard Slate
export const TRAIT_COLORS = {
  // 🦴 โครงสร้างและอุณหภูมิร่างกาย (Anatomy & Physiology - Chalk White & Rust)
  backbone: { bg: '#252F28', text: '#EDE8DC', border: '#3D4B40', iconName: 'backbone' },
  has_backbone: { bg: '#252F28', text: '#EDE8DC', border: '#3D4B40', iconName: 'backbone' },
  no_backbone: { bg: '#202822', text: '#C4BCAB', border: '#354238', iconName: 'no_backbone' },
  invertebrate: { bg: '#202822', text: '#C4BCAB', border: '#354238', iconName: 'no_backbone' },
  warm_blooded: { bg: '#33231E', text: '#E5987A', border: '#5C382C', iconName: 'warm_blooded' },
  cold_blooded: { bg: '#1E2C2E', text: '#89BDC7', border: '#324F54', iconName: 'cold_blooded' },
  mammal: { bg: '#30262C', text: '#DBABC3', border: '#543B4B', iconName: 'mammal' },
  bird: { bg: '#1E2833', text: '#9BB8D9', border: '#32465C', iconName: 'fly' },
  reptile: { bg: '#1E2C2E', text: '#89BDC7', border: '#324F54', iconName: 'has_scales' },
  fish: { bg: '#1A292C', text: '#89BDC7', border: '#2C494F', iconName: 'swim' },
  lays_eggs: { bg: '#332C1E', text: '#D9B44A', border: '#5C4E2D', iconName: 'lays_eggs' },
  has_fur: { bg: '#253022', text: '#A9C49F', border: '#3D5437', iconName: 'has_fur' },
  has_scales: { bg: '#1E2C2E', text: '#89BDC7', border: '#324F54', iconName: 'has_scales' },
  has_feathers: { bg: '#1E2833', text: '#9BB8D9', border: '#32465C', iconName: 'has_feathers' },

  // 🌊 ถิ่นอาศัยและการเคลื่อนที่ (Habitat & Locomotion - Sky Slate & Sage Green)
  fly: { bg: '#1E2833', text: '#9BB8D9', border: '#32465C', iconName: 'fly' },
  can_fly: { bg: '#1E2833', text: '#9BB8D9', border: '#32465C', iconName: 'fly' },
  swim: { bg: '#1A292C', text: '#89BDC7', border: '#2C494F', iconName: 'swim' },
  water_living: { bg: '#1A292C', text: '#89BDC7', border: '#2C494F', iconName: 'swim' },
  terrestrial: { bg: '#243022', text: '#A9C49F', border: '#3D5437', iconName: 'terrestrial' },
  land_living: { bg: '#243022', text: '#A9C49F', border: '#3D5437', iconName: 'terrestrial' },
  amphibian: { bg: '#1E2E28', text: '#89C7B0', border: '#325447', iconName: 'amphibian' },

  // 🌿 โภชนาการ (Dietary Trophic Level - Sage, Rust, Mustard)
  herbivore: { bg: '#243022', text: '#7A9471', border: '#3D5437', iconName: 'herbivore' },
  carnivore: { bg: '#33231E', text: '#B5643A', border: '#5C382C', iconName: 'carnivore' },
  omnivore: { bg: '#332C1E', text: '#D9B44A', border: '#5C4E2D', iconName: 'omnivore' },
};

// 👑 Rarity Tiers (Chalkboard Stamp Colors)
export const ANIMAL_RARITIES = {
  common: { label: 'ทั่วไป', color: '#C4BCAB', bg: '#222B24', border: '#38473B' },
  rare: { label: 'หายาก', color: '#89BDC7', bg: '#1E2C2E', border: '#324F54' },
  epic: { label: 'ล้ำค่า', color: '#DBABC3', bg: '#30262C', border: '#543B4B' },
  legendary: { label: 'ตำนาน', color: '#D9B44A', bg: '#332C1E', border: '#5C4E2D' },
};

// 🌿 Trait Compatibility & Taxonomy Helper
export function isTraitCompatible(animalTraits = [], requiredTrait) {
  if (!requiredTrait || !animalTraits) return false;
  if (animalTraits.includes(requiredTrait)) return true;

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
    return matches.some((t) => animalTraits.includes(t));
  }
  return false;
}

export const ANIMAL_EMOJI_MAP = {
  lion: '🦁',
  tiger: '🐯',
  cheetah: '🐆',
  elephant: '🐘',
  eagle: '🦅',
  falcon: '🦅',
  owl: '🦉',
  penguin: '🐧',
  ostrich: '🦩',
  shark: '🦈',
  dolphin: '🐬',
  whale: '🐳',
  blue_whale: '🐋',
  salmon: '🐟',
  frog: '🐸',
  turtle: '🐢',
  sea_turtle: '🐢',
  tortoise: '🐢',
  snake: '🐍',
  chameleon: '🦎',
  komodo: '🐉',
  crocodile: '🐊',
  crab: '🦀',
  octopus: '🐙',
  butterfly: '🦋',
  bee: '🐝',
  kangaroo: '🦘',
  koala: '🐨',
  platypus: '🦆',
  beaver: '🦫',
  otter: '🦦',
  chimp: '🐵',
  bat: '🦇',
  wolf: '🐺',
  polar_bear: '🐻‍❄️',
  panda: '🐼',
  fox: '🦊',
  rabbit: '🐰',
  giraffe: '🦒',
  flamingo: '🦩',
  peacock: '🦚',
  parrot: '🦜',
};

export function getAnimalEmoji(animalId) {
  return ANIMAL_EMOJI_MAP[animalId] || '🐾';
}

// 📖 Complete 34 Zoological Specimens Knowledge Base
export const ALL_ANIMALS_DATA = [
  { id: 'lion', name: 'สิงโต', englishName: 'Lion (Panthera leo)', icon: '🦁', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'carnivore', 'land_living', 'terrestrial'], rarity: 'legendary', habitat: 'ทุ่งหญ้าสะวันนา แอฟริกา', desc: 'เจ้าป่าสัตว์กินเนื้อ อาศัยอยู่รวมกันเป็นฝูง ตัวผู้มีแผงคอสง่างาม', funFact: 'เสียงคำรามของสิงโตดังก้องได้ไกลถึง 8 กิโลเมตร!' },
  { id: 'tiger', name: 'เสือโคร่ง', englishName: 'Tiger (Panthera tigris)', icon: '🐯', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'carnivore', 'land_living', 'terrestrial'], rarity: 'legendary', habitat: 'ป่าดิบชื้น เอเชีย', desc: 'สัตว์ตระกูลแมวที่ใหญ่ที่สุด ลายพาดกลอนพรางตัวในป่าทึบได้อย่างดีเยี่ยม', funFact: 'เสือแต่ละตัวมีลายพาดกลอนบนตัวที่ไม่ซ้ำกันเลยแม้แต่ตัวเดียว!' },
  { id: 'cheetah', name: 'ชีตาห์', englishName: 'Cheetah (Acinonyx jubatus)', icon: '🐆', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'carnivore', 'land_living', 'terrestrial'], rarity: 'epic', habitat: 'ทุ่งหญ้าโล่ง แอฟริกา', desc: 'สัตว์บกที่วิ่งเร็วที่สุดในโลก เร่งความเร็ว 0-100 กม./ชม. ได้ใน 3 วินาที', funFact: 'ชีตาห์มีแถบรอยน้ำตาสีดำใต้ตาช่วยลดแสงสะท้อนของดวงอาทิตย์' },
  { id: 'elephant', name: 'ช้าง', englishName: 'Elephant (Elephas maximus)', icon: '🐘', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'herbivore', 'land_living', 'terrestrial'], rarity: 'epic', habitat: 'ป่าเบญจพรรณและทุ่งหญ้า', desc: 'สัตว์บกที่ตัวใหญ่ที่สุด งวงทำหน้าที่เหมือนจมูกและมือที่ทรงพลัง', funFact: 'งวงช้างมีกล้ามเนื้อมากกว่า 40,000 มัด ช่วยให้หยิบใบไม้จิ๋วได้!' },
  { id: 'eagle', name: 'นกอินทรี', englishName: 'Eagle (Aquila chrysaetos)', icon: '🦅', traits: ['has_backbone', 'backbone', 'warm_blooded', 'bird', 'lays_eggs', 'can_fly', 'fly', 'carnivore'], rarity: 'epic', habitat: 'ยอดเขาสูงและป่าโปร่ง', desc: 'เจ้านภานักล่า สายตาคมชัดกว่ามนุษย์ 4-8 เท่า กรงเล็บแหลมคม', funFact: 'นกอินทรีสามารถมองเห็นกระต่ายที่ซ่อนอยู่ห่างออกไป 3 กิโลเมตรได้!' },
  { id: 'owl', name: 'นกฮูก', englishName: 'Owl (Strigiformes)', icon: '🦉', traits: ['has_backbone', 'backbone', 'warm_blooded', 'bird', 'lays_eggs', 'can_fly', 'fly', 'carnivore'], rarity: 'rare', habitat: 'ป่าไม้และโพรงต้นไม้', desc: 'นักล่าราตรีที่บินได้เงียบกริบ หมุนคอได้รอบทิศทางถึง 270 องศา', funFact: 'ขนปีกของนกฮูกออกแบบพิเศษจนบินได้แบบไม่มีเสียงลมแม้แต่น้อย' },
  { id: 'penguin', name: 'เพนกวิน', englishName: 'Penguin (Spheniscidae)', icon: '🐧', traits: ['has_backbone', 'backbone', 'warm_blooded', 'bird', 'lays_eggs', 'water_living', 'swim', 'land_living', 'terrestrial', 'carnivore'], rarity: 'rare', habitat: 'ทวีปแอนตาร์กติกาและขั้วโลกใต้', desc: 'นกที่บินไม่ได้ แต่ว่ายน้ำได้อย่างคล่องแคล่วราวกับบินในน้ำ', funFact: 'เพนกวินจักรพรรดิดำน้ำได้ลึกกว่า 500 เมตรและกลั้นหายใจได้ 20 นาที!' },
  { id: 'ostrich', name: 'นกกระจอกเทศ', englishName: 'Ostrich (Struthio camelus)', icon: '🦩', traits: ['has_backbone', 'backbone', 'warm_blooded', 'bird', 'lays_eggs', 'land_living', 'terrestrial', 'herbivore'], rarity: 'rare', habitat: 'ทุ่งหญ้ากึ่งทะเลทราย แอฟริกา', desc: 'นกที่ตัวใหญ่และวิ่งเร็วที่สุดในโลก ขาแข็งแกร่งเตะศัตรูได้', funFact: 'ดวงตาของนกกระจอกเทศมีขนาดใหญ่กว่าสมองของมันเสียอีก!' },
  { id: 'shark', name: 'ฉลาม', englishName: 'Great White Shark (Carcharodon carcharias)', icon: '🦈', traits: ['has_backbone', 'backbone', 'cold_blooded', 'fish', 'water_living', 'swim', 'carnivore'], rarity: 'legendary', habitat: 'มหาสมุทรทั่วโลก', desc: 'นักล่าอันดับหนึ่งแห่งท้องทะเล มีฟันคมกริบหลายแถวที่งอกใหม่ได้ตลอดชีวิต', funFact: 'ฉลามสามารถรับกลิ่นเลือดที่เจือจางในน้ำทะเลได้ไกลถึง 5 กิโลเมตร' },
  { id: 'dolphin', name: 'โลมา', englishName: 'Dolphin (Delphinidae)', icon: '🐬', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'water_living', 'swim', 'carnivore'], rarity: 'epic', habitat: 'ทะเลอบอุ่นทั่วโลก', desc: 'สัตว์เลี้ยงลูกด้วยนมในน้ำที่ฉลาดมาก สื่อสารด้วยคลื่นเสียงสะท้อน (Echolocation)', funFact: 'เวลาโลมานอนหลับ สมองจะพักผ่อนทีละครึ่งซีกและลืมตาข้างหนึ่งเสมอ' },
  { id: 'whale', name: 'วาฬสีน้ำเงิน', englishName: 'Blue Whale (Balaenoptera musculus)', icon: '🐳', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'water_living', 'swim', 'carnivore'], rarity: 'legendary', habitat: 'มหาสมุทรเปิด', desc: 'สิ่งมีชีวิตที่ใหญ่ที่สุดเท่าที่เคยมีมาบนโลก หัวใจมีขนาดเท่ารถยนต์คันเล็ก', funFact: 'ลิ้นของวาฬสีน้ำเงินมีน้ำหนักเท่ากับช้างทั้งตัว!' },
  { id: 'blue_whale', name: 'วาฬสีน้ำเงิน', englishName: 'Blue Whale (Balaenoptera musculus)', icon: '🐋', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'water_living', 'swim', 'carnivore'], rarity: 'legendary', habitat: 'มหาสมุทรเปิด', desc: 'สิ่งมีชีวิตที่ใหญ่ที่สุดเท่าที่เคยมีมาบนโลก หัวใจมีขนาดเท่ารถยนต์คันเล็ก', funFact: 'ลิ้นของวาฬสีน้ำเงินมีน้ำหนักเท่ากับช้างทั้งตัว!' },
  { id: 'salmon', name: 'ปลาแซลมอน', englishName: 'Salmon (Salmo salar)', icon: '🐟', traits: ['has_backbone', 'backbone', 'cold_blooded', 'fish', 'water_living', 'swim', 'omnivore', 'carnivore', 'lays_eggs'], rarity: 'common', habitat: 'แม่น้ำน้ำจืดและมหาสมุทร', desc: 'ปลายอดนักว่ายทวนกระแสน้ำเพื่อกลับไปวางไข่ยังแม่น้ำบ้านเกิด', funFact: 'แซลมอนใช้ประสาทรับกลิ่นจดจำกลิ่นแม่น้ำที่มันเกิดได้อย่างแม่นยำ' },
  { id: 'frog', name: 'กบ', englishName: 'Tree Frog (Anura)', icon: '🐸', traits: ['has_backbone', 'backbone', 'cold_blooded', 'amphibian', 'water_living', 'land_living', 'swim', 'terrestrial', 'carnivore', 'lays_eggs'], rarity: 'common', habitat: 'หนองน้ำ ป่าชื้น และริมลำธาร', desc: 'สัตว์สะเทินน้ำสะเทินบก หายใจได้ทั้งทางปอดและผิวหนังเปียกชื้น', funFact: 'กบดื่มน้ำผ่านทางผิวหนังโดยไม่ต้องอ้าปากดื่มเลย!' },
  { id: 'turtle', name: 'เต่าบก', englishName: 'Tortoise (Testudinidae)', icon: '🐢', traits: ['has_backbone', 'backbone', 'cold_blooded', 'reptile', 'lays_eggs', 'land_living', 'terrestrial', 'herbivore'], rarity: 'rare', habitat: 'ป่าโปร่งและพื้นที่แห้งแล้ง', desc: 'สัตว์เลื้อยคลานอายุยืนยาว มีกระดองแข็งแกร่งเชื่อมติดกับกระดูกสันหลัง', funFact: 'เต่ายักษ์บางตัวมีอายุยืนยาวกว่า 150-200 ปี!' },
  { id: 'sea_turtle', name: 'เต่าทะเล', englishName: 'Sea Turtle (Chelonioidea)', icon: '🐢', traits: ['has_backbone', 'backbone', 'cold_blooded', 'reptile', 'lays_eggs', 'water_living', 'swim', 'omnivore'], rarity: 'rare', habitat: 'แนวปะการังและทะเลเขตร้อน', desc: 'เต่าที่อาศัยในทะเล ว่ายน้ำได้คล่องแคล่ว ขึ้นมาวางไข่บนหาดทราย', funFact: 'เต่าทะเลใช้สนามแม่เหล็กโลกในการนำทางข้ามมหาสมุทร!' },
  { id: 'snake', name: 'งูเหลือม', englishName: 'Reticulated Python (Malayopython reticulatus)', icon: '🐍', traits: ['has_backbone', 'backbone', 'cold_blooded', 'reptile', 'lays_eggs', 'land_living', 'terrestrial', 'carnivore'], rarity: 'rare', habitat: 'ป่าดงดิบและพื้นที่ชุ่มน้ำ', desc: 'สัตว์เลื้อยคลานไม่มีขา อ้าปากได้กว้างกว่าหัวหลายเท่าเพื่อกลืนเหยื่อ', funFact: 'งูใช้ลิ้นสองแฉกในการดมกลิ่นและสัมผัสอนุภาคเคมีในอากาศ' },
  { id: 'chameleon', name: 'กิ้งก่าคาเมเลียน', englishName: 'Chameleon (Chamaeleonidae)', icon: '🦎', traits: ['has_backbone', 'backbone', 'cold_blooded', 'reptile', 'lays_eggs', 'land_living', 'terrestrial', 'carnivore'], rarity: 'epic', habitat: 'กิ่งไม้ในป่าเขตร้อน', desc: 'เปลี่ยนสีผิวตามอารมณ์และอุณหภูมิ ดวงตามองแยกอิสระได้ 360 องศา', funFact: 'ลิ้นของกิ้งก่ายืดได้ยาวเป็น 2 เท่าของความยาวลำตัว!' },
  { id: 'crocodile', name: 'จระเข้', englishName: 'Crocodile (Crocodylinae)', icon: '🐊', traits: ['has_backbone', 'backbone', 'cold_blooded', 'reptile', 'carnivore', 'water_living', 'land_living', 'swim', 'terrestrial', 'lays_eggs'], rarity: 'epic', habitat: 'แม่น้ำและหนองน้ำเขตร้อน', desc: 'สัตว์เลื้อยคลานโบราณที่มีแรงกัดมหาศาลที่สุดในโลก', funFact: 'จระเข้อยู่บนโลกมาตั้งแต่ยุคเดียวกับไดโนเสาร์!' },
  { id: 'komodo', name: 'มังกรโคโมโด', englishName: 'Komodo Dragon (Varanus komodoensis)', icon: '🐉', traits: ['has_backbone', 'backbone', 'cold_blooded', 'reptile', 'carnivore', 'land_living', 'terrestrial', 'lays_eggs'], rarity: 'legendary', habitat: 'เกาะโคโมโด อินโดนีเซีย', desc: 'กิ้งก่าที่ใหญ่ที่สุดในโลก น้ำลายมีแบคทีเรียและสารพิษ', funFact: 'มังกรโคโมโดสามารถวิ่งได้เร็วถึง 20 กม./ชม.!' },
  { id: 'crab', name: 'ปูม้า', englishName: 'Blue Swimming Crab (Portunus armatus)', icon: '🦀', traits: ['no_backbone', 'invertebrate', 'cold_blooded', 'water_living', 'land_living', 'swim', 'terrestrial', 'omnivore', 'lays_eggs'], rarity: 'common', habitat: 'ชายฝั่งและพื้นทรายใต้ทะเล', desc: 'สัตว์ไม่มีกระดูกสันหลัง มีกระดองหุ้มตัวและก้ามคู่หน้าทรงพลัง', funFact: 'ปูเดินและว่ายน้ำไปด้านข้างเพราะข้อต่อขาของมันออกแบบมาเช่นนั้น' },
  { id: 'octopus', name: 'หมึกยักษ์', englishName: 'Octopus (Octopoda)', icon: '🐙', traits: ['no_backbone', 'invertebrate', 'cold_blooded', 'water_living', 'swim', 'carnivore', 'lays_eggs'], rarity: 'epic', habitat: 'แนวปะการังและโพรงหินใต้ทะเล', desc: 'มี 8 หนวด หัวใจ 3 ดวง เลือดสีน้ำเงิน และพ่นหมึกพรางตัวได้', funFact: 'หมึกยักษ์สามารถเปลี่ยนสีและผิวสัมผัสให้กลืนกับหินได้ใน 0.2 วินาที' },
  { id: 'butterfly', name: 'ผีเสื้อ', englishName: 'Butterfly (Lepidoptera)', icon: '🦋', traits: ['no_backbone', 'invertebrate', 'cold_blooded', 'can_fly', 'fly', 'herbivore', 'lays_eggs'], rarity: 'common', habitat: 'ทุ่งดอกไม้และสวนธรรมชาติ', desc: 'แมลงปีกสวยงาม ช่วยผสมเกสร มีการเจริญเติบโตแบบเปลี่ยนรูปสมบูรณ์', funFact: 'ผีเสื้อใช้ขาและเท้าในการรับรสชาติของใบไม้และดอกไม้!' },
  { id: 'bee', name: 'ผึ้งหลวง', englishName: 'Honey Bee (Apis)', icon: '🐝', traits: ['no_backbone', 'invertebrate', 'cold_blooded', 'can_fly', 'fly', 'herbivore', 'lays_eggs'], rarity: 'common', habitat: 'รังผึ้งตามกิ่งไม้และโพรงหิน', desc: 'แมลงสังคมยอดขยัน บินเต้นรำเพื่อบอกพิกัดแหล่งน้ำหวานให้เพื่อนในรัง', funFact: 'ผึ้งต้องกระพือปีกถึง 200 ครั้งต่อวินาทีเพื่อให้เกิดเสียงหึ่งๆ' },
  { id: 'kangaroo', name: 'จิงโจ้แดง', englishName: 'Red Kangaroo (Osphranter rufus)', icon: '🦘', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'herbivore', 'land_living', 'terrestrial'], rarity: 'rare', habitat: 'ทุ่งหญ้าออสเตรเลีย', desc: 'สัตว์มีกระเป๋าหน้าท้อง กระโดดได้ไกลถึง 8-9 เมตรในครั้งเดียว', funFact: 'จิงโจ้ใช้หางขนาดใหญ่เป็นขาที่ 5 ช่วยทรงตัวและดีดตัวเวลาวิ่ง' },
  { id: 'koala', name: 'โคอาลา', englishName: 'Koala (Phascolarctos cinereus)', icon: '🐨', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'herbivore', 'land_living', 'terrestrial'], rarity: 'rare', habitat: 'ป่ายูคาลิปตัส ออสเตรเลีย', desc: 'สัตว์น่ารักที่กินแต่ใบยูคาลิปตัส และใช้เวลานอนหลับถึงวันละ 18-22 ชั่วโมง', funFact: 'โคอาลามีลายนิ้วมือที่เหมือนกับลายนิ้วมือของมนุษย์มากจนแยกยาก!' },
  { id: 'platypus', name: 'ตุ่นปากเป็ด', englishName: 'Platypus (Ornithorhynchus anatinus)', icon: '🦆', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'water_living', 'land_living', 'swim', 'terrestrial', 'carnivore', 'lays_eggs'], rarity: 'legendary', habitat: 'ริมแม่น้ำและลำธาร ออสเตรเลีย', desc: 'สัตว์เลี้ยงลูกด้วยนมสุดมหัศจรรย์ที่ออกลูกเป็นไข่ และมีปากเหมือนเป็ด', funFact: 'ตุ่นปากเป็ดตัวผู้มีเดือยพิษที่ข้อเท้าหลังเพื่อป้องกันตัว!' },
  { id: 'beaver', name: 'บีเวอร์', englishName: 'Beaver (Castor canadensis)', icon: '🦫', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'water_living', 'land_living', 'swim', 'terrestrial', 'herbivore'], rarity: 'rare', habitat: 'แม่น้ำและทะเลสาบ อเมริกาเหนือ', desc: 'วิศวกรธรรมชาติ ตัดต้นไม้ด้วยฟันหน้าคมกริบเพื่อสร้างเขื่อนและบ้านกลางน้ำ', funFact: 'ฟันหน้าของบีเวอร์มีแร่เหล็กผสมอยู่ ทำให้มีสีส้มและแข็งแกร่งมาก!' },
  { id: 'otter', name: 'นากแม่น้ำ', englishName: 'River Otter (Lutra lutra)', icon: '🦦', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'water_living', 'land_living', 'swim', 'terrestrial', 'carnivore'], rarity: 'rare', habitat: 'แหล่งน้ำจืดใสสะอาด', desc: 'สัตว์รักสนุก ว่ายน้ำจับปลาได้อย่างคล่องแคล่ว มีขนหนาแน่นกันน้ำได้ดีเยี่ยม', funFact: 'นากทะเลจะนอนจับมือกันเวลาลอยคอบนผิวน้ำเพื่อไม่ให้กระแสน้ำพัดแยกจากกัน' },
  { id: 'chimp', name: 'ชิมแปนซี', englishName: 'Chimpanzee (Pan troglodytes)', icon: '🐵', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'omnivore', 'land_living', 'terrestrial'], rarity: 'epic', habitat: 'ป่าดงดิบ แอฟริกา', desc: 'สัตว์เลี้ยงลูกด้วยนมที่ฉลาดที่สุดในโลก รู้จักประดิษฐ์และใช้กิ่งไม้เป็นเครื่องมือ', funFact: 'ชิมแปนซีมี DNA ตรงกับมนุษย์เราถึง 98.7%!' },
  { id: 'bat', name: 'ค้างคาว', englishName: 'Fruit Bat (Pteropus)', icon: '🦇', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'can_fly', 'fly', 'carnivore', 'herbivore'], rarity: 'common', habitat: 'ต้นไม้ใหญ่และถ้ำเขตร้อน', desc: 'สัตว์เลี้ยงลูกด้วยนมเพียงชนิดเดียวในโลกที่บินได้อย่างแท้จริง', funFact: 'ค้างคาวกินผลไม้ช่วยกระจายเมล็ดพันธุ์และปลูกป่าได้นับล้านต้นต่อปี' },
  { id: 'wolf', name: 'หมาป่าสีเทา', englishName: 'Gray Wolf (Canis lupus)', icon: '🐺', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'carnivore', 'land_living', 'terrestrial'], rarity: 'rare', habitat: 'ป่าสนและทุ่งทุนดรา', desc: 'นักล่าจ่าฝูงที่ซื่อสัตย์ มีการแบ่งหน้าที่และสื่อสารกันด้วยเสียงหอนกังวาน', funFact: 'เสียงหอนของหมาป่าสามารถได้ยินข้ามภูเขาไกลถึง 16 กิโลเมตร!' },
  { id: 'polar_bear', name: 'หมีขั้วโลก', englishName: 'Polar Bear (Ursus maritimus)', icon: '🐻‍❄️', traits: ['has_backbone', 'backbone', 'warm_blooded', 'mammal', 'water_living', 'land_living', 'swim', 'terrestrial', 'carnivore'], rarity: 'legendary', habitat: 'แผ่นน้ำแข็งขั้วโลกเหนือ (Arctic)', desc: 'สัตว์กินเนื้อบนบกที่ใหญ่ที่สุด ขนสีขาวโปร่งแสงช่วยดูดซับความร้อนจากแสงแดด', funFact: 'ผิวหนังที่แท้จริงใต้ขนสีขาวของหมีขั้วโลกเป็นสีดำสนิทเพื่อเก็บความร้อน!' },
  { id: 'falcon', name: 'เหยี่ยวเพเรกริน', englishName: 'Peregrine Falcon (Falco peregrinus)', icon: '🦅', traits: ['has_backbone', 'backbone', 'warm_blooded', 'bird', 'can_fly', 'fly', 'carnivore', 'lays_eggs'], rarity: 'legendary', habitat: 'หน้าผาสูงและท้องฟ้าเปิด', desc: 'สัตว์ที่บินดิ่งได้เร็วที่สุดในโลก ทำความเร็วได้เกิน 380 กม./ชม.', funFact: 'เหยี่ยวมีเปลือกตาพิเศษช่วยปกป้องดวงตาขณะบินดิ่งด้วยความเร็วสูง!' }
];
