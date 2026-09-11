// 🎨 Player Theme Colors & Palettes — Wildlife TCG

export const PLAYER_COLORS = [
  { id: 'emerald', name: 'มัทฉะกรีน', hex: '#10B981', soft: '#ECFDF5', border: '#A7F3D0', text: '#065F46' },
  { id: 'ocean',   name: 'โอเชียนบลู', hex: '#0284C7', soft: '#F0F9FF', border: '#BAE6FD', text: '#075985' },
  { id: 'sakura',  name: 'ซากุระพิงค์', hex: '#EC4899', soft: '#FDF2F8', border: '#FBCFE8', text: '#9D174D' },
  { id: 'amber',   name: 'วอร์มแอมเบอร์', hex: '#F59E0B', soft: '#FFFBEB', border: '#FDE68A', text: '#92400E' },
  { id: 'purple',  name: 'เมจิกไวโอเล็ต', hex: '#8B5CF6', soft: '#F5F3FF', border: '#DDD6FE', text: '#5B21B6' },
  { id: 'coral',   name: 'ซันเซ็ตคอรัล', hex: '#F97316', soft: '#FFF7ED', border: '#FED7AA', text: '#9A3412' },
  { id: 'ruby',    name: 'รูบี้คริมสัน', hex: '#EF4444', soft: '#FEF2F2', border: '#FECACA', text: '#991B1B' },
  { id: 'cyan',    name: 'มินต์ไซอัน', hex: '#0D9488', soft: '#F0FDFA', border: '#99F6E4', text: '#115E59' },
];

export const DEFAULT_PLAYER_COLOR = PLAYER_COLORS[0].hex;

export function getPlayerColorObj(colorIdOrHex) {
  if (!colorIdOrHex) return PLAYER_COLORS[0];
  const found = PLAYER_COLORS.find(c => c.id === colorIdOrHex || c.hex.toLowerCase() === colorIdOrHex.toLowerCase());
  if (found) return found;
  return {
    id: 'custom',
    name: 'กำหนดเอง',
    hex: colorIdOrHex,
    soft: `${colorIdOrHex}18`,
    border: `${colorIdOrHex}66`,
    text: colorIdOrHex
  };
}
