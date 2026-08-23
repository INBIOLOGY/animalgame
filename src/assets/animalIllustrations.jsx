import React from 'react';

// 🎨 Complete Custom Vector SVG Illustrations for all 32 Zoological Specimens in Wildlife TCG
export const AnimalSVG = ({ id, size = 64, className = "" }) => {
  switch (id) {
    case 'lion':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          <path d="M50 10 C65 14 80 20 84 34 C88 48 86 64 78 76 C68 88 52 90 40 86 C26 82 14 70 14 54 C14 38 24 22 36 14 C42 11 46 10 50 10Z" fill="#B45309" />
          <circle cx="28" cy="30" r="9" fill="#F59E0B" /><circle cx="28" cy="30" r="5" fill="#FDE68A" />
          <circle cx="72" cy="30" r="9" fill="#F59E0B" /><circle cx="72" cy="30" r="5" fill="#FDE68A" />
          <ellipse cx="50" cy="54" rx="26" ry="22" fill="#FBBF24" />
          <ellipse cx="50" cy="62" rx="14" ry="10" fill="#FFFBEB" />
          <circle cx="38" cy="48" r="4" fill="#1E293B" /><circle cx="36.5" cy="46.5" r="1.5" fill="#FFF" />
          <circle cx="62" cy="48" r="4" fill="#1E293B" /><circle cx="60.5" cy="46.5" r="1.5" fill="#FFF" />
          <path d="M46 56 L54 56 L50 61 Z" fill="#78350F" />
          <path d="M50 61 L50 66 M50 66 Q45 69 42 66 M50 66 Q55 69 58 66" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'tiger':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FFEDD5" />
          <circle cx="26" cy="26" r="11" fill="#EA580C" /><circle cx="26" cy="26" r="6" fill="#1E293B" /><circle cx="26" cy="26" r="3" fill="#FFF" />
          <circle cx="74" cy="26" r="11" fill="#EA580C" /><circle cx="74" cy="26" r="6" fill="#1E293B" /><circle cx="74" cy="26" r="3" fill="#FFF" />
          <ellipse cx="50" cy="54" rx="32" ry="26" fill="#F97316" />
          <path d="M50 28 L50 38 M44 30 L46 36 M56 30 L54 36" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <path d="M22 48 L32 50 M20 56 L30 56 M78 48 L68 50 M80 56 L70 56" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="50" cy="62" rx="16" ry="11" fill="#FFF" />
          <circle cx="36" cy="48" r="4.5" fill="#FBBF24" /><circle cx="36" cy="48" r="2.5" fill="#1E293B" /><circle cx="35" cy="46.5" r="1" fill="#FFF" />
          <circle cx="64" cy="48" r="4.5" fill="#FBBF24" /><circle cx="64" cy="48" r="2.5" fill="#1E293B" /><circle cx="63" cy="46.5" r="1" fill="#FFF" />
          <path d="M46 58 L54 58 L50 63 Z" fill="#E11D48" />
        </svg>
      );

    case 'panda':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#F1F5F9" />
          <circle cx="26" cy="26" r="12" fill="#0F172A" />
          <circle cx="74" cy="26" r="12" fill="#0F172A" />
          <ellipse cx="50" cy="54" rx="32" ry="26" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <ellipse cx="36" cy="48" rx="8" ry="10" transform="rotate(-15 36 48)" fill="#0F172A" />
          <ellipse cx="64" cy="48" rx="8" ry="10" transform="rotate(15 64 48)" fill="#0F172A" />
          <circle cx="36" cy="47" r="3.5" fill="#FFFFFF" /><circle cx="36" cy="47" r="2" fill="#0F172A" /><circle cx="35" cy="46" r="1" fill="#FFF" />
          <circle cx="64" cy="47" r="3.5" fill="#FFFFFF" /><circle cx="64" cy="47" r="2" fill="#0F172A" /><circle cx="63" cy="46" r="1" fill="#FFF" />
          <ellipse cx="50" cy="58" rx="5" ry="3.5" fill="#0F172A" />
          <path d="M50 62 Q45 66 42 63 M50 62 Q55 66 58 63" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="26" cy="58" r="4.5" fill="#FDA4AF" fillOpacity="0.6" />
          <circle cx="74" cy="58" r="4.5" fill="#FDA4AF" fillOpacity="0.6" />
        </svg>
      );

    case 'fox':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FFEDD5" />
          <path d="M22 42 L18 16 L44 32 Z" fill="#EA580C" /><path d="M26 36 L24 24 L38 32 Z" fill="#1E293B" />
          <path d="M78 42 L82 16 L56 32 Z" fill="#EA580C" /><path d="M74 36 L76 24 L62 32 Z" fill="#1E293B" />
          <path d="M18 42 C18 64 34 82 50 82 C66 82 82 64 82 42 C82 32 72 26 50 26 C28 26 18 32 18 42 Z" fill="#F97316" />
          <path d="M18 48 C18 70 34 82 50 82 C66 82 82 70 82 48 C74 46 62 48 50 60 C38 48 26 46 18 48 Z" fill="#FFFFFF" />
          <circle cx="36" cy="46" r="4" fill="#0F172A" /><circle cx="35" cy="44.5" r="1.5" fill="#FFF" />
          <circle cx="64" cy="46" r="4" fill="#0F172A" /><circle cx="63" cy="44.5" r="1.5" fill="#FFF" />
          <circle cx="50" cy="68" r="4" fill="#0F172A" />
        </svg>
      );

    case 'rabbit':
    case 'bunny':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FCE7F3" />
          <ellipse cx="36" cy="24" rx="8" ry="18" fill="#F8FAFC" /><ellipse cx="36" cy="24" rx="4.5" ry="13" fill="#FDA4AF" />
          <ellipse cx="64" cy="24" rx="8" ry="18" fill="#F8FAFC" /><ellipse cx="64" cy="24" rx="4.5" ry="13" fill="#FDA4AF" />
          <ellipse cx="50" cy="58" rx="28" ry="24" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="38" cy="52" r="4" fill="#0F172A" /><circle cx="37" cy="50.5" r="1.5" fill="#FFF" />
          <circle cx="62" cy="52" r="4" fill="#0F172A" /><circle cx="61" cy="50.5" r="1.5" fill="#FFF" />
          <path d="M47 58 L53 58 L50 62 Z" fill="#F472B6" />
          <path d="M50 62 Q46 66 42 63 M50 62 Q54 66 58 63" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="58" r="5" fill="#FDA4AF" fillOpacity="0.6" />
          <circle cx="72" cy="58" r="5" fill="#FDA4AF" fillOpacity="0.6" />
        </svg>
      );

    case 'giraffe':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          <path d="M38 24 L38 12 M62 24 L62 12" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <circle cx="38" cy="12" r="4" fill="#78350F" /><circle cx="62" cy="12" r="4" fill="#78350F" />
          <ellipse cx="22" cy="30" rx="9" ry="5" transform="rotate(-30 22 30)" fill="#FBBF24" />
          <ellipse cx="78" cy="30" rx="9" ry="5" transform="rotate(30 78 30)" fill="#FBBF24" />
          <path d="M38 60 L38 88 L62 88 L62 60 Z" fill="#FBBF24" />
          <circle cx="44" cy="74" r="5" fill="#B45309" /><circle cx="56" cy="82" r="4" fill="#B45309" />
          <ellipse cx="50" cy="42" rx="24" ry="20" fill="#FBBF24" />
          <ellipse cx="50" cy="52" rx="16" ry="12" fill="#FDE68A" />
          <circle cx="43" cy="52" r="2.5" fill="#78350F" /><circle cx="57" cy="52" r="2.5" fill="#78350F" />
          <circle cx="38" cy="38" r="4" fill="#1E293B" /><circle cx="37" cy="36.5" r="1.5" fill="#FFF" />
          <circle cx="62" cy="38" r="4" fill="#1E293B" /><circle cx="61" cy="36.5" r="1.5" fill="#FFF" />
        </svg>
      );

    case 'flamingo':
    case 'ostrich':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FCE7F3" />
          <path d="M50 48 Q64 36 56 22 Q48 10 38 18 Q30 26 40 38 L42 66" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" fill="none" />
          <circle cx="38" cy="22" r="12" fill="#F472B6" />
          <path d="M30 22 L14 26 Q12 36 22 34 L32 26 Z" fill="#FDA4AF" />
          <path d="M14 26 L12 34 L20 34 Z" fill="#1E293B" />
          <circle cx="36" cy="18" r="3.5" fill="#0F172A" /><circle cx="35" cy="17" r="1.2" fill="#FFF" />
          <ellipse cx="54" cy="68" rx="22" ry="16" fill="#EC4899" />
          <path d="M46 64 Q64 60 68 74" stroke="#BE185D" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'parrot':
    case 'peacock':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#CCFBF1" />
          <path d="M50 20 L50 6 M44 22 L38 8 M56 22 L62 8" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="6" r="3" fill="#06B6D4" /><circle cx="38" cy="8" r="3" fill="#06B6D4" /><circle cx="62" cy="8" r="3" fill="#06B6D4" />
          <ellipse cx="50" cy="54" rx="24" ry="28" fill="#0D9488" />
          <ellipse cx="50" cy="62" rx="14" ry="18" fill="#5EEAD4" />
          <circle cx="40" cy="40" r="4" fill="#0F172A" /><circle cx="39" cy="38.5" r="1.5" fill="#FFF" />
          <circle cx="60" cy="40" r="4" fill="#0F172A" /><circle cx="59" cy="38.5" r="1.5" fill="#FFF" />
          <path d="M45 44 L55 44 L50 52 Z" fill="#F59E0B" />
        </svg>
      );

    case 'cheetah':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          <circle cx="28" cy="26" r="9" fill="#F59E0B" /><circle cx="28" cy="26" r="5" fill="#1E293B" />
          <circle cx="72" cy="26" r="9" fill="#F59E0B" /><circle cx="72" cy="26" r="5" fill="#1E293B" />
          <ellipse cx="50" cy="54" rx="28" ry="24" fill="#FBBF24" />
          <circle cx="30" cy="40" r="2.5" fill="#78350F" /><circle cx="70" cy="40" r="2.5" fill="#78350F" />
          <circle cx="24" cy="54" r="2.5" fill="#78350F" /><circle cx="76" cy="54" r="2.5" fill="#78350F" />
          <path d="M38 50 Q36 62 44 64 M62 50 Q64 62 56 64" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="38" cy="46" r="4" fill="#1E293B" /><circle cx="37" cy="44.5" r="1.5" fill="#FFF" />
          <circle cx="62" cy="46" r="4" fill="#1E293B" /><circle cx="61" cy="44.5" r="1.5" fill="#FFF" />
          <ellipse cx="50" cy="62" rx="12" ry="8" fill="#FFF" />
          <path d="M47 58 L53 58 L50 62 Z" fill="#1E293B" />
        </svg>
      );

    case 'eagle':
    case 'falcon':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#E0F2FE" />
          <ellipse cx="50" cy="52" rx="28" ry="32" fill="#78350F" />
          <path d="M50 20 C64 20 72 32 72 46 C72 60 62 70 50 70 C38 70 28 60 28 46 C28 32 36 20 50 20 Z" fill="#F8FAFC" />
          <path d="M32 40 L44 44 M68 40 L56 44" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <circle cx="38" cy="46" r="4.5" fill="#F59E0B" /><circle cx="38" cy="46" r="2.5" fill="#0F172A" /><circle cx="37" cy="45" r="1" fill="#FFF" />
          <circle cx="62" cy="46" r="4.5" fill="#F59E0B" /><circle cx="62" cy="46" r="2.5" fill="#0F172A" /><circle cx="61" cy="45" r="1" fill="#FFF" />
          <path d="M42 48 L58 48 C60 58 54 68 50 68 C46 68 40 58 42 48 Z" fill="#FBBF24" />
          <path d="M50 54 L50 64" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'owl':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#F3E8FF" />
          <path d="M26 34 L18 18 L36 26 Z" fill="#581C87" /><path d="M74 34 L82 18 L64 26 Z" fill="#581C87" />
          <ellipse cx="50" cy="54" rx="28" ry="30" fill="#6B21A8" />
          <ellipse cx="50" cy="62" rx="18" ry="20" fill="#E9D5FF" />
          <circle cx="36" cy="40" r="12" fill="#FEF08A" /><circle cx="36" cy="40" r="7" fill="#1E1B4B" /><circle cx="34" cy="38" r="2" fill="#FFF" />
          <circle cx="64" cy="40" r="12" fill="#FEF08A" /><circle cx="64" cy="40" r="7" fill="#1E1B4B" /><circle cx="62" cy="38" r="2" fill="#FFF" />
          <path d="M46 44 L54 44 L50 54 Z" fill="#F59E0B" />
        </svg>
      );

    case 'penguin':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#E0F2FE" />
          <ellipse cx="38" cy="84" rx="9" ry="4" fill="#F97316" /><ellipse cx="62" cy="84" rx="9" ry="4" fill="#F97316" />
          <ellipse cx="50" cy="50" rx="28" ry="32" fill="#0F172A" />
          <path d="M22 42 Q12 58 18 70 Q24 64 26 52 Z" fill="#1E293B" />
          <path d="M78 42 Q88 58 82 70 Q76 64 74 52 Z" fill="#1E293B" />
          <ellipse cx="50" cy="54" rx="18" ry="24" fill="#F8FAFC" />
          <circle cx="40" cy="36" r="3.5" fill="#0F172A" /><circle cx="39" cy="34.5" r="1.2" fill="#FFF" />
          <circle cx="60" cy="36" r="3.5" fill="#0F172A" /><circle cx="59" cy="34.5" r="1.2" fill="#FFF" />
          <path d="M44 40 L56 40 L50 50 Z" fill="#F59E0B" />
          <circle cx="32" cy="42" r="3.5" fill="#FDA4AF" /><circle cx="68" cy="42" r="3.5" fill="#FDA4AF" />
        </svg>
      );

    case 'shark':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#CFFAFE" />
          <path d="M46 16 Q56 24 52 36 L40 36 Z" fill="#0284C7" />
          <path d="M16 54 C16 34 38 30 66 38 C84 44 90 56 90 56 C90 56 80 66 58 70 C32 74 16 68 16 54 Z" fill="#0EA5E9" />
          <path d="M24 58 C34 58 50 58 66 52 C76 56 84 58 84 58 C76 66 54 68 34 66 C24 64 24 60 24 58 Z" fill="#F0F9FF" />
          <path d="M44 62 L32 80 Q44 76 50 64 Z" fill="#0284C7" />
          <circle cx="70" cy="46" r="4" fill="#0F172A" /><circle cx="69" cy="44.5" r="1.5" fill="#FFF" />
          <path d="M54 46 Q52 52 54 56 M58 46 Q56 52 58 56 M62 46 Q60 52 62 56" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
          <path d="M64 56 Q72 58 76 54" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'dolphin':
    case 'whale':
    case 'blue_whale':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#DBEAFE" />
          <path d="M46 14 Q42 6 36 8 M50 14 Q50 4 50 6 M54 14 Q58 6 64 8" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 54 C14 34 36 24 68 28 C86 32 92 48 88 64 C82 78 52 80 30 76 C18 72 14 64 14 54 Z" fill="#3B82F6" />
          <path d="M22 62 C34 66 54 68 76 60 C80 66 74 74 58 76 C36 78 24 70 22 62 Z" fill="#EFF6FF" />
          <path d="M48 58 Q42 72 34 74 Q42 66 52 56 Z" fill="#1D4ED8" />
          <circle cx="72" cy="46" r="4" fill="#0F172A" /><circle cx="71" cy="44.5" r="1.5" fill="#FFF" />
          <path d="M74 54 Q80 58 84 52" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'salmon':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FFE4E6" />
          <path d="M20 50 L10 36 L14 50 L10 64 Z" fill="#FB7185" />
          <path d="M18 50 C24 34 50 32 76 42 C88 48 90 54 86 58 C78 66 48 68 28 62 C20 58 18 52 18 50 Z" fill="#F43F5E" />
          <path d="M26 56 C38 60 56 60 76 54 C82 58 76 64 60 64 C42 66 28 62 26 56 Z" fill="#FECDD3" />
          <circle cx="74" cy="46" r="4" fill="#0F172A" /><circle cx="73" cy="44.5" r="1.5" fill="#FFF" />
          <path d="M48 34 Q54 26 60 36 Z" fill="#E11D48" />
          <path d="M46 62 Q52 72 58 60 Z" fill="#E11D48" />
        </svg>
      );

    case 'crab':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FEE2E2" />
          <path d="M24 50 Q12 60 16 76 M28 58 Q18 72 24 84 M76 50 Q88 60 84 76 M72 58 Q82 72 76 84" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          <path d="M26 42 Q14 26 22 18 Q30 22 28 36" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" fill="#EF4444" />
          <path d="M74 42 Q86 26 78 18 Q70 22 72 36" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" fill="#EF4444" />
          <ellipse cx="50" cy="54" rx="28" ry="22" fill="#EF4444" />
          <ellipse cx="50" cy="58" rx="20" ry="14" fill="#F87171" />
          <circle cx="40" cy="36" r="5.5" fill="#FFF" /><circle cx="40" cy="36" r="3.5" fill="#0F172A" /><circle cx="39" cy="34.5" r="1.2" fill="#FFF" />
          <circle cx="60" cy="36" r="5.5" fill="#FFF" /><circle cx="60" cy="36" r="3.5" fill="#0F172A" /><circle cx="59" cy="34.5" r="1.2" fill="#FFF" />
          <path d="M44 58 Q50 64 56 58" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'octopus':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FCE7F3" />
          <path d="M24 64 Q10 74 16 88 Q24 92 28 78 Q32 68 36 66" stroke="#DB2777" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M38 68 Q30 84 38 92 Q46 88 44 74" stroke="#DB2777" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M62 68 Q70 84 62 92 Q54 88 56 74" stroke="#DB2777" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M76 64 Q90 74 84 88 Q76 92 72 78 Q68 68 64 66" stroke="#DB2777" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <ellipse cx="50" cy="44" rx="28" ry="24" fill="#F472B6" />
          <circle cx="38" cy="46" r="5.5" fill="#FFF" /><circle cx="38" cy="46" r="3" fill="#0F172A" /><circle cx="37" cy="44.5" r="1" fill="#FFF" />
          <circle cx="62" cy="46" r="5.5" fill="#FFF" /><circle cx="62" cy="46" r="3" fill="#0F172A" /><circle cx="61" cy="44.5" r="1" fill="#FFF" />
          <ellipse cx="50" cy="56" rx="4" ry="5" fill="#9D174D" />
          <circle cx="28" cy="52" r="3.5" fill="#BE185D" fillOpacity="0.4" /><circle cx="72" cy="52" r="3.5" fill="#BE185D" fillOpacity="0.4" />
        </svg>
      );

    case 'frog':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#DCFCE7" />
          <circle cx="30" cy="30" r="14" fill="#16A34A" /><circle cx="30" cy="30" r="10" fill="#FEF08A" /><circle cx="30" cy="30" r="5.5" fill="#0F172A" /><circle cx="28" cy="27.5" r="2" fill="#FFF" />
          <circle cx="70" cy="30" r="14" fill="#16A34A" /><circle cx="70" cy="30" r="10" fill="#FEF08A" /><circle cx="70" cy="30" r="5.5" fill="#0F172A" /><circle cx="68" cy="27.5" r="2" fill="#FFF" />
          <ellipse cx="50" cy="56" rx="34" ry="26" fill="#22C55E" />
          <ellipse cx="50" cy="62" rx="22" ry="16" fill="#86EFAC" />
          <circle cx="28" cy="58" r="5" fill="#F472B6" fillOpacity="0.6" /><circle cx="72" cy="58" r="5" fill="#F472B6" fillOpacity="0.6" />
          <path d="M30 54 Q50 72 70 54" stroke="#14532D" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'turtle':
    case 'tortoise':
    case 'sea_turtle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#CCFBF1" />
          <ellipse cx="50" cy="54" rx="28" ry="24" fill="#15803D" /><ellipse cx="50" cy="54" rx="23" ry="19" fill="#84CC16" />
          <path d="M50 38 L62 46 L58 62 L42 62 L38 46 Z" stroke="#166534" strokeWidth="2" fill="#65A30D" />
          <ellipse cx="50" cy="26" rx="12" ry="10" fill="#22C55E" />
          <circle cx="43" cy="24" r="3" fill="#0F172A" /><circle cx="42" cy="23" r="1" fill="#FFF" />
          <circle cx="57" cy="24" r="3" fill="#0F172A" /><circle cx="56" cy="23" r="1" fill="#FFF" />
          <ellipse cx="22" cy="40" rx="10" ry="5" transform="rotate(-30 22 40)" fill="#16A34A" />
          <ellipse cx="78" cy="40" rx="10" ry="5" transform="rotate(30 78 40)" fill="#16A34A" />
        </svg>
      );

    case 'snake':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#ECFCCB" />
          <path d="M30 68 Q20 54 34 40 Q48 26 66 36 Q80 46 72 64 Q64 78 46 76 Q34 74 36 62" stroke="#65A30D" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M30 68 Q20 54 34 40 Q48 26 66 36 Q80 46 72 64 Q64 78 46 76 Q34 74 36 62" stroke="#A3E635" strokeWidth="6" strokeLinecap="round" fill="none" />
          <ellipse cx="34" cy="40" rx="12" ry="10" fill="#4D7C0F" />
          <circle cx="30" cy="38" r="3.5" fill="#FEF08A" /><circle cx="30" cy="38" r="2" fill="#0F172A" />
          <path d="M22 40 L12 40 L8 36 M12 40 L8 44" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'chameleon':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#ECFCCB" />
          {/* Chameleon Body & Spiral Tail */}
          <path d="M78 68 C78 78 66 82 58 74 C50 66 60 56 68 56 C74 56 76 62 72 66 C68 70 62 66 64 62" stroke="#16A34A" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <ellipse cx="44" cy="50" rx="24" ry="18" fill="#22C55E" />
          <circle cx="30" cy="42" r="9" fill="#15803D" />
          <circle cx="30" cy="42" r="5" fill="#FEF08A" />
          <circle cx="30" cy="42" r="2.5" fill="#0F172A" />
          <path d="M24 48 L14 48 Q10 44 14 44" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'komodo':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          {/* Komodo Dragon Body & Spikes */}
          <path d="M22 62 Q16 42 36 34 Q56 26 78 40 Q84 56 68 68 Q44 76 22 62 Z" fill="#65A30D" />
          <path d="M42 30 L46 22 L50 30 M56 32 L60 24 L64 33 M68 37 L74 30 L76 39" stroke="#3F6212" strokeWidth="2.5" strokeLinecap="round" fill="#84CC16" />
          <circle cx="62" cy="44" r="4.5" fill="#FEF08A" />
          <circle cx="62" cy="44" r="2.5" fill="#0F172A" />
          <circle cx="61" cy="43" r="1" fill="#FFF" />
          {/* Forked Tongue */}
          <path d="M78 54 L92 54 L98 48 M92 54 L98 60" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="74" cy="48" r="1.5" fill="#365314" />
          <circle cx="44" cy="52" r="2" fill="#3F6212" /><circle cx="52" cy="58" r="2.5" fill="#3F6212" />
        </svg>
      );

    case 'crocodile':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#DCFCE7" />
          {/* Crocodile Snout & Ridges */}
          <path d="M18 56 Q30 38 60 42 L84 48 Q88 56 82 62 L54 66 Q26 68 18 56 Z" fill="#15803D" />
          <path d="M34 40 L38 34 L42 41 M46 41 L50 35 L54 42 M58 42 L62 36 L66 43" stroke="#166534" strokeWidth="2" fill="#4ADE80" />
          <circle cx="44" cy="38" r="4" fill="#FEF08A" />
          <circle cx="44" cy="38" r="2" fill="#0F172A" />
          <circle cx="43" cy="37" r="1" fill="#FFF" />
          {/* Sharp Teeth */}
          <path d="M60 54 L63 58 L66 54 L69 58 L72 54" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="78" cy="50" r="1.5" fill="#14532D" />
        </svg>
      );

    case 'elephant':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#F1F5F9" />
          <ellipse cx="22" cy="44" rx="14" ry="18" fill="#94A3B8" /><ellipse cx="22" cy="44" rx="9" ry="12" fill="#F472B6" fillOpacity="0.4" />
          <ellipse cx="78" cy="44" rx="14" ry="18" fill="#94A3B8" /><ellipse cx="78" cy="44" rx="9" ry="12" fill="#F472B6" fillOpacity="0.4" />
          <circle cx="50" cy="48" r="24" fill="#64748B" />
          <path d="M38 56 Q36 66 28 64 Q34 58 40 56 Z" fill="#FEF08A" />
          <path d="M62 56 Q64 66 72 64 Q66 58 60 56 Z" fill="#FEF08A" />
          <path d="M44 48 C44 64 42 74 54 76 C60 78 62 70 54 68 C48 66 50 56 52 48 Z" fill="#475569" />
          <circle cx="38" cy="42" r="3.5" fill="#0F172A" /><circle cx="37" cy="40.5" r="1.2" fill="#FFF" />
          <circle cx="62" cy="42" r="3.5" fill="#0F172A" /><circle cx="61" cy="40.5" r="1.2" fill="#FFF" />
        </svg>
      );

    case 'bee':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FEF9C3" />
          <ellipse cx="38" cy="30" rx="10" ry="16" transform="rotate(-25 38 30)" fill="#E0F2FE" fillOpacity="0.8" stroke="#38BDF8" strokeWidth="1.5" />
          <ellipse cx="62" cy="30" rx="10" ry="16" transform="rotate(25 62 30)" fill="#E0F2FE" fillOpacity="0.8" stroke="#38BDF8" strokeWidth="1.5" />
          <ellipse cx="50" cy="56" rx="22" ry="26" fill="#FBBF24" />
          <path d="M30 46 L70 46 M28 56 L72 56 M32 66 L68 66" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
          <circle cx="42" cy="40" r="3.5" fill="#0F172A" /><circle cx="41" cy="39" r="1" fill="#FFF" />
          <circle cx="58" cy="40" r="3.5" fill="#0F172A" /><circle cx="57" cy="39" r="1" fill="#FFF" />
          <path d="M46 26 Q40 16 34 18 M54 26 Q60 16 66 18" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'butterfly':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FCE7F3" />
          <path d="M50 45 C30 15 6 30 18 55 C24 66 38 64 50 52 Z" fill="#F472B6" />
          <path d="M50 45 C70 15 94 30 82 55 C76 66 62 64 50 52 Z" fill="#F472B6" />
          <path d="M50 52 C34 54 18 68 26 82 C34 90 48 76 50 60 Z" fill="#A855F7" />
          <path d="M50 52 C66 54 82 68 74 82 C66 90 52 76 50 60 Z" fill="#A855F7" />
          <circle cx="28" cy="42" r="4" fill="#FEF08A" /><circle cx="72" cy="42" r="4" fill="#FEF08A" />
          <ellipse cx="50" cy="54" rx="4.5" ry="18" fill="#3B0764" />
          <path d="M48 36 Q40 22 34 24 M52 36 Q60 22 66 24" stroke="#3B0764" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'kangaroo':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          {/* Long Kangaroo Ears */}
          <ellipse cx="32" cy="22" rx="7" ry="16" transform="rotate(-15 32 22)" fill="#B45309" />
          <ellipse cx="32" cy="22" rx="4" ry="11" transform="rotate(-15 32 22)" fill="#FDE68A" />
          <ellipse cx="68" cy="22" rx="7" ry="16" transform="rotate(15 68 22)" fill="#B45309" />
          <ellipse cx="68" cy="22" rx="4" ry="11" transform="rotate(15 68 22)" fill="#FDE68A" />
          <ellipse cx="50" cy="54" rx="26" ry="24" fill="#D97706" />
          <ellipse cx="50" cy="62" rx="16" ry="14" fill="#FEF3C7" />
          <circle cx="38" cy="46" r="3.5" fill="#0F172A" /><circle cx="37" cy="44.5" r="1.2" fill="#FFF" />
          <circle cx="62" cy="46" r="3.5" fill="#0F172A" /><circle cx="61" cy="44.5" r="1.2" fill="#FFF" />
          <ellipse cx="50" cy="56" rx="5" ry="3.5" fill="#78350F" />
          <path d="M38 68 Q50 76 62 68" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'koala':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#F1F5F9" />
          <circle cx="22" cy="28" r="14" fill="#94A3B8" /><circle cx="22" cy="28" r="9" fill="#E2E8F0" /><circle cx="22" cy="28" r="5" fill="#FDA4AF" />
          <circle cx="78" cy="28" r="14" fill="#94A3B8" /><circle cx="78" cy="28" r="9" fill="#E2E8F0" /><circle cx="78" cy="28" r="5" fill="#FDA4AF" />
          <ellipse cx="50" cy="52" rx="28" ry="24" fill="#64748B" />
          <circle cx="30" cy="56" r="5" fill="#FDA4AF" fillOpacity="0.6" /><circle cx="70" cy="56" r="5" fill="#FDA4AF" fillOpacity="0.6" />
          <ellipse cx="50" cy="52" rx="9" ry="13" fill="#1E293B" />
          <ellipse cx="48" cy="46" rx="2.5" ry="3.5" fill="#475569" />
          <circle cx="34" cy="42" r="3.5" fill="#0F172A" /><circle cx="33" cy="40.5" r="1.2" fill="#FFF" />
          <circle cx="66" cy="42" r="3.5" fill="#0F172A" /><circle cx="65" cy="40.5" r="1.2" fill="#FFF" />
        </svg>
      );

    case 'platypus':
    case 'beaver':
    case 'otter':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          <circle cx="26" cy="28" r="8" fill="#78350F" /><circle cx="74" cy="28" r="8" fill="#78350F" />
          <ellipse cx="50" cy="50" rx="28" ry="24" fill="#92400E" />
          <path d="M36 52 C36 44 64 44 64 52 C64 64 36 64 36 52 Z" fill="#3B2516" />
          <circle cx="44" cy="52" r="1.5" fill="#000" /><circle cx="56" cy="52" r="1.5" fill="#000" />
          <circle cx="36" cy="40" r="3.5" fill="#0F172A" /><circle cx="35" cy="38.5" r="1.2" fill="#FFF" />
          <circle cx="64" cy="40" r="3.5" fill="#0F172A" /><circle cx="63" cy="38.5" r="1.2" fill="#FFF" />
          <ellipse cx="28" cy="74" rx="8" ry="4" fill="#3B2516" /><ellipse cx="72" cy="74" rx="8" ry="4" fill="#3B2516" />
        </svg>
      );

    case 'chimp':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          <circle cx="20" cy="44" r="12" fill="#78350F" /><circle cx="20" cy="44" r="7" fill="#FED7AA" />
          <circle cx="80" cy="44" r="12" fill="#78350F" /><circle cx="80" cy="44" r="7" fill="#FED7AA" />
          <circle cx="50" cy="48" r="26" fill="#451A03" />
          <ellipse cx="50" cy="56" rx="18" ry="14" fill="#FED7AA" />
          <circle cx="38" cy="42" r="4" fill="#0F172A" /><circle cx="37" cy="40.5" r="1.5" fill="#FFF" />
          <circle cx="62" cy="42" r="4" fill="#0F172A" /><circle cx="61" cy="40.5" r="1.5" fill="#FFF" />
          <circle cx="46" cy="52" r="1.5" fill="#78350F" /><circle cx="54" cy="52" r="1.5" fill="#78350F" />
          <path d="M42 60 Q50 66 58 60" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'bat':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#EDE9FE" />
          <path d="M50 48 C32 20 8 36 12 60 C20 54 28 62 36 56 C42 62 48 54 50 48 Z" fill="#3B0764" />
          <path d="M50 48 C68 20 92 36 88 60 C80 54 72 62 64 56 C58 62 52 54 50 48 Z" fill="#3B0764" />
          <path d="M34 38 L24 14 L42 26 Z" fill="#6B21A8" /><path d="M66 38 L76 14 L58 26 Z" fill="#6B21A8" />
          <ellipse cx="50" cy="52" rx="16" ry="18" fill="#4C1D95" />
          <circle cx="43" cy="46" r="3" fill="#FBBF24" /><circle cx="43" cy="46" r="1.5" fill="#0F172A" />
          <circle cx="57" cy="46" r="3" fill="#FBBF24" /><circle cx="57" cy="46" r="1.5" fill="#0F172A" />
          <path d="M47 54 L49 57 L51 54 M49 54 L51 57 L53 54" stroke="#FFF" strokeWidth="1.5" />
        </svg>
      );

    case 'wolf':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#F1F5F9" />
          {/* Pointy Wolf Ears */}
          <path d="M24 38 L16 12 L38 26 Z" fill="#475569" /><path d="M26 30 L22 18 L34 26 Z" fill="#94A3B8" />
          <path d="M76 38 L84 12 L62 26 Z" fill="#475569" /><path d="M74 30 L78 18 L66 26 Z" fill="#94A3B8" />
          {/* Wolf Head */}
          <ellipse cx="50" cy="54" rx="28" ry="24" fill="#64748B" />
          {/* White Snout and Cheeks */}
          <path d="M34 52 Q26 68 50 78 Q74 68 66 52 Q50 62 34 52 Z" fill="#F8FAFC" />
          {/* Amber Eyes */}
          <circle cx="38" cy="46" r="4" fill="#F59E0B" /><circle cx="38" cy="46" r="2" fill="#0F172A" /><circle cx="37" cy="45" r="1" fill="#FFF" />
          <circle cx="62" cy="46" r="4" fill="#F59E0B" /><circle cx="62" cy="46" r="2" fill="#0F172A" /><circle cx="61" cy="45" r="1" fill="#FFF" />
          {/* Dark Snout */}
          <ellipse cx="50" cy="64" rx="5" ry="4" fill="#0F172A" />
        </svg>
      );

    case 'polar_bear':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#E0F2FE" />
          <circle cx="28" cy="24" r="10" fill="#E2E8F0" /><circle cx="28" cy="24" r="5" fill="#FDA4AF" />
          <circle cx="72" cy="24" r="10" fill="#E2E8F0" /><circle cx="72" cy="24" r="5" fill="#FDA4AF" />
          <ellipse cx="50" cy="52" rx="30" ry="26" fill="#F8FAFC" />
          <ellipse cx="50" cy="60" rx="15" ry="11" fill="#E2E8F0" />
          <ellipse cx="50" cy="54" rx="6" ry="4.5" fill="#0F172A" />
          <path d="M50 58 L50 64 M50 64 Q46 66 43 64 M50 64 Q54 66 57 64" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="36" cy="44" r="3.5" fill="#0F172A" /><circle cx="35" cy="42.5" r="1.2" fill="#FFF" />
          <circle cx="64" cy="44" r="3.5" fill="#0F172A" /><circle cx="63" cy="42.5" r="1.2" fill="#FFF" />
        </svg>
      );
  }
};
