// ─── Design Tokens ───────────────────────────────────────────────────────────

export const Colors = {
  // Backgrounds
  bgBase: '#0C0D10',
  bgSurface: '#141519',
  bgCard: '#1A1B22',
  bgCardAlt: '#1E1F28',
  bgInput: '#16171E',
  bgHover: '#222430',

  // Borders
  borderSubtle: '#252730',
  borderMedium: '#2E3040',
  borderAccent: '#4B4E7A',

  // Accent – Indigo / Lavender
  accent: '#7C83F5',
  accentMuted: '#4B4E7A',
  accentLight: '#B8BCFF',
  accentDim: '#242638',

  // Text
  textPrimary: '#F2F3F8',
  textSecondary: '#9CA3B4',
  textMuted: '#636B7D',
  textDisabled: '#444955',

  // Priority colours
  priorityHigh: '#FF6B6B',
  priorityHighBg: '#2D1B1B',
  priorityMedium: '#F4CF76',
  priorityMediumBg: '#29240F',
  priorityLow: '#6EE7B7',
  priorityLowBg: '#0F2821',

  // Status
  warning: '#F4CF76',
  warningBg: '#202019',
  warningBorder: '#45412B',

  // Category badge
  badgeBg: '#1E2033',
  badgeText: '#B8BCFF',

  // Misc
  white: '#FFFFFF',
  divider: '#1E2029',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 40,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

export const Typography = {
  labelXs: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 1.2 },
  labelSm: { fontSize: 11, fontWeight: '600' as const },
  body: { fontSize: 13, lineHeight: 21 },
  bodySm: { fontSize: 12, lineHeight: 19 },
  title: { fontSize: 16, fontWeight: '700' as const },
  titleLg: { fontSize: 20, fontWeight: '800' as const },
  display: { fontSize: 30, fontWeight: '800' as const, letterSpacing: -0.8 },
} as const;

// Responsive breakpoint
export const SIDEBAR_BREAKPOINT = 720;
