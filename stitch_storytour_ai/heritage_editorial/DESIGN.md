---
name: Heritage Editorial
colors:
  surface: '#fbf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#fbf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#eae8e5'
  surface-container-highest: '#e4e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#44474c'
  inverse-surface: '#30312f'
  inverse-on-surface: '#f2f0ed'
  outline: '#75777c'
  outline-variant: '#c5c6cc'
  surface-tint: '#535f70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#101c2a'
  on-primary-container: '#798596'
  inverse-primary: '#bbc7db'
  secondary: '#655e4d'
  on-secondary: '#ffffff'
  secondary-container: '#e9dfc9'
  on-secondary-container: '#696251'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca730'
  on-tertiary-container: '#4f3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3f7'
  primary-fixed-dim: '#bbc7db'
  on-primary-fixed: '#101c2a'
  on-primary-fixed-variant: '#3c4857'
  secondary-fixed: '#ece2cc'
  secondary-fixed-dim: '#cfc6b0'
  on-secondary-fixed: '#201b0e'
  on-secondary-fixed-variant: '#4c4636'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fbf9f6'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2df'
typography:
  display-lg:
    fontFamily: Noto Serif
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Noto Serif
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Noto Serif
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Noto Serif
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Manrope
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1.25rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-caliber cultural storytelling aesthetic tailored for intelligent heritage travel. Balancing the archival authority of an international cultural magazine with the instantaneous clarity of an AI docent, the interface invites contemplative discovery rather than hurried sightseeing.

- **Brand Philosophy**: "From sightseeing to story-living." The product transforms physical heritage monuments into living narratives through empathetic, multi-layered AI voice docents and contextual visual overlays.
- **Visual Personality**: Intellectually refined, classical yet contemporary, grounded, and luminously technological. The atmosphere evokes artisanal paper, timeless ink, gilded architectural accents, and quiet ambient intelligence.
- **Design Style**: A synthesis of **Editorial Magazine** layout sensibilities and **Tactile Glassmorphism** (utilized strictly for floating audio controls and camera AR HUD viewports). Clean card modules, understated hair-line dividers, generous storytelling margins, and rich typographic hierarchy dominate the visual canvas.

## Colors

The color palette anchors historical gravity with modern clarity. The architecture uses four coordinated tonal pillars:

- **Primary (`#0F1B29` - Midnight Navy)**: Symbolizes temporal depth, archival ink, and institutional trust. Used for dominant typography, high-priority icons, primary interactive buttons, and high-contrast night/camera UI backdrops (`#0A1118`).
- **Secondary (`#E8DEC8` - Warm Antique Sand)**: Provides historical warmth, tactile card framing, and paper-textured tonal depth. Sub-shades `#F9F6F0` (Ivory Surface) and `#F3ECE1` (Muted Warm Surface) soften the canvas and reduce optical strain.
- **Tertiary (`#D4AF37` - Imperial Royal Gold)**: Infuses heritage authority and precious accents. Reserved for primary level status badges, bookmark states, premium audio highlights, and golden metadata tags.
- **Supporting Accent (`#2C7A7B` - Celadon Teal)**: Represents AI smart docent actions, active audio waveform progress, dynamic geo-fencing indicators, and live intelligent speech prompts.
- **Neutral Canvas (`#FAF8F5` - Archival Off-White)**: Replaces stark optical whites with a warmer, glare-free editorial reading surface. Structural borders rely on `#E5DFD5` for featherlight, crisp division.

## Typography

Typography prioritizes long-form storytelling immersion and on-site outdoor glanceability:

- **Headlines & Titles (`Noto Serif`)**: Brings literary prestige and timeless grace to monument titles, chapter headlines, and editorial pull quotes. Generous letter spacing and proportional leading preserve elegance even under dense Korean and Latin character pairings.
- **Narrative Body & UI (`Manrope`)**: Delivers crisp, hyper-legible geometric clarity for AI transcripts, tour directions, system states, and metadata labels.
- **Storytelling Rhythm**: Narrative body text features a generous `1.75x` line-height ratio (`body-lg` at 28px leading for 16px size) to provide maximum readability while walking or navigating outdoors.

## Layout & Spacing

The layout is built around a mobile-first, content-fluid architecture that scales seamlessly into multi-column desktop editorial layouts.

- **Mobile Viewport (up to 767px)**: Single column with `1.25rem` (20px) outer margins. Cards, docent feeds, and audio controllers span full content width with 16px vertical element stacking. Bottom viewport reserves a persistent 80px safe area for the floating audio docent bar.
- **Tablet / Desktop Viewport (768px+)**: 12-column grid system capped at 1280px max-width with `2.5rem` margins and `1.5rem` gutters. Narrative text maintains a comfortable 680px optical reading column width, with audio transcripts and spatial map navigation occupying adjacent sticky rail columns.

## Elevation & Depth

Depth mimics high-end tactile bookbinding layered with clean digital precision:

- **Surface Tiers**: Base canvas sits on `#FAF8F5`. Resting cards elevate with `#FFFFFF` or `#F9F6F0`, framed by a distinct, whisper-thin 1px border (`#E5DFD5`) to preserve structure in bright outdoor sunlight.
- **Ambient Shadow System**: Shadows are low-opacity, warm-tinted spreads (`rgba(15, 27, 41, 0.04)` to `rgba(15, 27, 41, 0.08)`) with wide blurs, avoiding heavy unnatural drops.
- **Camera & Audio Glassmorphism**: Interactive overlays (AR camera viewports and floating docent controls) switch to deep dark glass (`rgba(15, 27, 41, 0.85)` background with 16px backdrop-blur and a subtle top-edge gold hairline) to maximize video contrast.

## Shapes

The shape vocabulary uses structured, architectural rounding:

- **Standard Containers & Cards**: Defined at 0.5rem (8px) for crisp, book-like corners.
- **Interactive Buttons & Large Sheets**: Rounded at 1rem (16px) for approachable, thumb-friendly tap targets.
- **Time Chips, Docent Badges & Status Indicators**: Full pill treatment (9999px) to distinctly separate inline micro-metadata from content containers.

## Components

### Buttons
- **Primary Action**: Deep Midnight Navy background (`#0F1B29`), crisp white text, 12px vertical padding, subtle gold focus rings (`#D4AF37`).
- **Secondary / Narrative Listen**: Antique Ivory background (`#F3ECE1`), midnight navy text, 1px border (`#E5DFD5`), hover shift to warm gold tint.
- **Ghost Action**: Transparent background, 1px border (`#D4AF37`), gold text for secondary heritage actions.

### Audio Player Sticky Bar
- Persistent bottom sheet anchored with 12px margin on mobile. Deep navy glass background (`rgba(15, 27, 41, 0.92)`), 16px blur radius, pill shape or rounded 16px card.
- Features real-time voice docent waveform animated in Celadon Teal (`#319795`), royal gold scrub bar, speed multiplier toggle (1.0x, 1.2x, 1.5x), and play/pause haptic controls.

### AI Docent Chat Bubbles
- **AI Heritage Guide**: Framed in `#FFFFFF`, 1px border (`#E8DEC8`), with a distinctive Celadon Teal docent avatar seal. Body text utilizes editorial serif accents for quotes.
- **User Prompts**: Right-aligned, Midnight Navy fill with white Manrope typography, 16px border-radius with an asymmetrical bottom-right tail.

### Time & Level Badges
- **Duration Chips**: Pill-shaped, compact padding (4px 10px), antique beige background, labeled cleanly: `30초 핵심`, `3분 스토리`, `5분 심화`.
- **Target Audience Level Badges**: Dual-tone status pills with gold/celadon rim: `초등 탐험`, `일반 교양`, `전문 역사`, `온가족 동반`.

### Camera HUD Overlay
- Ultra-minimalist dark mode viewport (`#0A1118` translucent framing) with subtle corner reticles in Imperial Gold.
- Real-time heritage recognition tags with floating translucent anchor chips revealing monument name and audio play trigger.

### B2B SaaS Metric Badges
- High-density data modules for institutional tourism boards: `#F3ECE1` background, hairline divider, bold Midnight Navy metrics, and positive delta tags highlighted in Celadon Teal.