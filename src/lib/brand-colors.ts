/**
 * Lumora Horticulture Brand Colors
 * TypeScript/JavaScript color definitions
 */

export const brandColors = {
  // Primary Brand Colors
  cream: '#FAF3C3',
  dark: {
    DEFAULT: '#404F4A',
    700: '#354540',
    800: '#2A3632',
  },
  
  // Gold Colors
  gold: {
    DEFAULT: '#D4AF37',
    50: '#FBF6E3',
    100: '#F7E9BA',
    200: '#F2DC91',
    300: '#ECCF67',
    400: '#E6C33E',
    500: '#D4AF37',
    600: '#B69221',
    700: '#97761C',
    800: '#785B16',
    900: '#594111',
  },
  
  // Green Colors
  green: {
    50: '#E6F5EB',
    100: '#C1E5CD',
    200: '#9BD5AF',
    300: '#74C490',
    400: '#4DB472',
    500: '#2D7D46',
    600: '#256B3D',
    700: '#1D5935',
    800: '#16472C',
    900: '#0F3523',
  },
  
  // Gray Colors
  gray: {
    50: '#F7F7F8',
    100: '#EEEEF0',
    200: '#DEDEDF',
    300: '#CACBCD',
    400: '#A8A9AC',
    500: '#87888C',
    600: '#696A6E',
    700: '#4C4D50',
    800: '#323234',
    900: '#17181A',
  },
};

// Color combinations
export const colorPairs = {
  // Text color + Background color
  darkOnCream: {
    text: brandColors.dark.DEFAULT,
    bg: brandColors.cream,
  },
  creamOnDark: {
    text: brandColors.cream,
    bg: brandColors.dark.DEFAULT,
  },
  goldOnDark: {
    text: brandColors.gold.DEFAULT,
    bg: brandColors.dark.DEFAULT,
  },
  darkOnGold: {
    text: brandColors.dark.DEFAULT,
    bg: brandColors.gold.DEFAULT,
  },
  whiteOnGreen: {
    text: '#FFFFFF',
    bg: brandColors.green[500],
  },
};

// Gradients
export const gradients = {
  primary: `linear-gradient(135deg, ${brandColors.dark.DEFAULT} 0%, ${brandColors.green[700]} 100%)`,
  accent: `linear-gradient(135deg, ${brandColors.gold[400]} 0%, ${brandColors.gold[600]} 100%)`,
  soft: `linear-gradient(135deg, ${brandColors.cream} 0%, ${brandColors.gold[100]} 100%)`,
  darkToLight: `linear-gradient(180deg, ${brandColors.dark.DEFAULT} 0%, ${brandColors.dark[700]} 100%)`,
};

// Shadow styles
export const shadows = {
  soft: '0 5px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
  glowGreen: `0 0 15px rgba(45, 125, 70, 0.35)`,
  glowGold: `0 0 15px rgba(212, 175, 55, 0.35)`,
};

// Usage helper functions
export const getBrandColor = (colorPath: string): string => {
  const keys = colorPath.split('.');
  let color: any = brandColors;
  
  for (const key of keys) {
    color = color[key];
    if (!color) return '#000000'; // fallback
  }
  
  return typeof color === 'string' ? color : color.DEFAULT || '#000000';
};

// Tailwind class helpers
export const tailwindColors = {
  text: {
    cream: 'text-lumora-cream',
    dark: 'text-lumora-dark',
    gold: 'text-lumora-gold-500',
    green: 'text-lumora-green-500',
  },
  bg: {
    cream: 'bg-lumora-cream',
    dark: 'bg-lumora-dark',
    gold: 'bg-lumora-gold-500',
    green: 'bg-lumora-green-500',
  },
  border: {
    cream: 'border-lumora-cream',
    dark: 'border-lumora-dark',
    gold: 'border-lumora-gold-500',
    green: 'border-lumora-green-500',
  },
};

/**
 * Usage Examples:
 * 
 * // In React components:
 * import { brandColors, gradients } from '@/lib/brand-colors';
 * 
 * <div style={{ backgroundColor: brandColors.cream }}>
 *   <h1 style={{ color: brandColors.dark.DEFAULT }}>Title</h1>
 * </div>
 * 
 * // With Tailwind:
 * <div className="bg-lumora-cream text-lumora-dark">
 *   <button className="bg-lumora-gold-500 text-white">Click me</button>
 * </div>
 * 
 * // Gradients:
 * <div style={{ background: gradients.primary }}>
 *   Gradient background
 * </div>
 */