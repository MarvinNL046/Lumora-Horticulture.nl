# Lumora Horticulture Design System Brief
## Voor SEO Landing Page Generatie

**Versie:** 1.0
**Datum:** 2025-11-24
**Doel:** Consistente design implementatie voor 50 SEO landing pages

---

## 🎨 Brand Identity

**Brand Naam:** Lumora Horticulture
**Tagline:** Professional Paper Plug Solutions
**Tone of Voice:**
- Professional & authoritative
- Educational & helpful
- Sustainable & innovative
- B2B focused (niet consumer)

**Brand Personality:**
- Expert in horticultural propagation
- Sustainability leader
- Innovation-driven
- Reliable partner voor professionele kwekers

---

## 🎨 Color Palette

### Primary Colors
```css
/* Main brand colors */
--lumora-cream: #FAF3C3;      /* Light cream background - soft, natural */
--lumora-dark: #404F4A;       /* Dark green - primary text, headers */
--lumora-green-500: #2D7D46;  /* Primary green - CTAs, links, accents */
--lumora-gold: #D4AF37;       /* Gold accent - from logo, highlights */
```

### Lumora Dark Variants
```css
--lumora-dark-700: #354540;   /* Darker variant for hover states */
--lumora-dark-800: #2A3632;   /* Even darker for emphasis */
```

### Lumora Green Scale
```css
--lumora-green-50: #E6F5EB;   /* Very light - backgrounds */
--lumora-green-100: #C1E5CD;  /* Light - subtle highlights */
--lumora-green-200: #9BD5AF;  /* Lighter accent */
--lumora-green-300: #74C490;  /* Medium light */
--lumora-green-400: #4DB472;  /* Medium */
--lumora-green-500: #2D7D46;  /* Primary (MAIN CTA COLOR) */
--lumora-green-600: #256B3D;  /* Darker - hover states */
--lumora-green-700: #1D5935;  /* Dark accent */
--lumora-green-800: #16472C;  /* Very dark */
--lumora-green-900: #0F3523;  /* Darkest */
```

### Lumora Gold Scale
```css
--lumora-gold-50: #FBF6E3;    /* Very light gold background */
--lumora-gold-100: #F7E9BA;   /* Light gold */
--lumora-gold-200: #F2DC91;   /* Lighter accent */
--lumora-gold-300: #ECCF67;   /* Medium light */
--lumora-gold-400: #E6C33E;   /* Medium */
--lumora-gold-500: #D4AF37;   /* Primary (ACCENT COLOR) */
--lumora-gold-600: #B69221;   /* Darker - hover */
--lumora-gold-700: #97761C;   /* Dark */
--lumora-gold-800: #785B16;   /* Very dark */
--lumora-gold-900: #594111;   /* Darkest */
```

### Neutral Grays
```css
--gray-50: #F7F7F8;    /* Very light background */
--gray-100: #EEEEF0;   /* Light background */
--gray-200: #DEDEDF;   /* Borders, dividers */
--gray-300: #CACBCD;   /* Subtle borders */
--gray-400: #A8A9AC;   /* Placeholder text */
--gray-500: #87888C;   /* Secondary text */
--gray-600: #696A6E;   /* Body text (alternative) */
--gray-700: #4C4D50;   /* Dark text */
--gray-800: #323234;   /* Very dark text */
--gray-900: #17181A;   /* Almost black */
```

### Usage Guidelines

**Backgrounds:**
- Primary: `lumora-cream` (#FAF3C3) - used for main page background
- Secondary: `white` or `gray-50` - for content cards/sections
- Accent: `lumora-green-50` - for highlighted sections

**Text:**
- Headings: `lumora-dark` (#404F4A) - all h1, h2, h3
- Body: `gray-700` (#4C4D50) or `lumora-dark` - paragraph text
- Secondary: `gray-600` (#696A6E) - captions, metadata

**CTAs (Call-to-Actions):**
- Primary CTA: `lumora-green-500` background + `white` text
- Primary CTA Hover: `lumora-green-600` background
- Secondary CTA: `lumora-dark` background + `white` text
- Secondary CTA Hover: `lumora-dark-700` background
- Tertiary CTA: `white` background + `lumora-green-500` border/text

**Accents:**
- Highlights: `lumora-gold` (#D4AF37) - sparingly!
- Links: `lumora-green-500` (#2D7D46)
- Link Hover: `lumora-green-600` (#256B3D)
- Badges/Labels: `lumora-green-100` background + `lumora-green-700` text

---

## 📝 Typography

### Font Families
```css
/* Sans-serif for body text - clean, modern, professional */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Display serif for headings - elegant, premium, authoritative */
font-family: 'Playfair Display', Georgia, serif;
```

### Font Loading (Next.js)
```tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})
```

### Typography Scale

**Display Heading (Hero H1):**
```css
font-family: var(--font-playfair);
font-size: 3.5rem;       /* 56px */
line-height: 1.1;
font-weight: 700;
color: var(--lumora-dark);
letter-spacing: -0.02em;

@media (max-width: 768px) {
  font-size: 2.5rem;     /* 40px */
}
```

**H1 (Page Title):**
```css
font-family: var(--font-playfair);
font-size: 2.5rem;       /* 40px */
line-height: 1.2;
font-weight: 700;
color: var(--lumora-dark);
letter-spacing: -0.01em;
margin-bottom: 1.5rem;

@media (max-width: 768px) {
  font-size: 2rem;       /* 32px */
}
```

**H2 (Section Heading):**
```css
font-family: var(--font-playfair);
font-size: 2rem;         /* 32px */
line-height: 1.3;
font-weight: 600;
color: var(--lumora-dark);
margin-bottom: 1.25rem;

@media (max-width: 768px) {
  font-size: 1.75rem;    /* 28px */
}
```

**H3 (Subsection):**
```css
font-family: var(--font-inter);
font-size: 1.5rem;       /* 24px */
line-height: 1.4;
font-weight: 600;
color: var(--lumora-dark);
margin-bottom: 1rem;

@media (max-width: 768px) {
  font-size: 1.25rem;    /* 20px */
}
```

**H4 (Minor Heading):**
```css
font-family: var(--font-inter);
font-size: 1.25rem;      /* 20px */
line-height: 1.5;
font-weight: 600;
color: var(--lumora-dark);
margin-bottom: 0.75rem;
```

**Body Text (Paragraph):**
```css
font-family: var(--font-inter);
font-size: 1.125rem;     /* 18px */
line-height: 1.75;       /* 31.5px - comfortable reading */
font-weight: 400;
color: var(--gray-700);
margin-bottom: 1.5rem;

@media (max-width: 768px) {
  font-size: 1rem;       /* 16px */
  line-height: 1.7;
}
```

**Lead Paragraph (Intro):**
```css
font-family: var(--font-inter);
font-size: 1.25rem;      /* 20px */
line-height: 1.7;
font-weight: 400;
color: var(--gray-600);
margin-bottom: 2rem;
```

**Small Text (Captions, Metadata):**
```css
font-family: var(--font-inter);
font-size: 0.875rem;     /* 14px */
line-height: 1.6;
font-weight: 400;
color: var(--gray-600);
```

**Button/CTA Text:**
```css
font-family: var(--font-inter);
font-size: 1rem;         /* 16px */
line-height: 1.5;
font-weight: 600;
letter-spacing: 0.01em;
```

---

## 🔲 Spacing System

### Scale (Tailwind-based)
```
0.5 = 0.125rem = 2px
1   = 0.25rem  = 4px
2   = 0.5rem   = 8px
3   = 0.75rem  = 12px
4   = 1rem     = 16px
5   = 1.25rem  = 20px
6   = 1.5rem   = 24px
8   = 2rem     = 32px
10  = 2.5rem   = 40px
12  = 3rem     = 48px
16  = 4rem     = 64px
20  = 5rem     = 80px
24  = 6rem     = 96px
32  = 8rem     = 128px
```

### Common Spacing Patterns

**Section Padding:**
- Desktop: `py-16` (64px) or `py-20` (80px)
- Mobile: `py-12` (48px) or `py-16` (64px)

**Container Max Width:**
- Content: `max-w-4xl` (896px)
- Wide content: `max-w-6xl` (1152px)
- Full width: `max-w-7xl` (1280px)

**Card Padding:**
- Desktop: `p-8` (32px)
- Mobile: `p-6` (24px)

**Element Spacing:**
- Between paragraphs: `mb-6` (24px)
- Between sections: `mb-12` (48px) or `mb-16` (64px)
- Between list items: `mb-3` (12px) or `mb-4` (16px)

---

## 🎭 Shadows

### Custom Soft Shadows
```css
/* Subtle elevation - cards, buttons */
box-shadow: 0 2px 8px -1px rgba(0, 0, 0, 0.05),
            0 1px 2px -1px rgba(0, 0, 0, 0.03);
/* Tailwind: shadow-soft-sm */

/* Standard elevation - primary cards */
box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.05),
            0 4px 6px -2px rgba(0, 0, 0, 0.03);
/* Tailwind: shadow-soft */

/* Medium elevation - important elements */
box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05),
            0 8px 10px -6px rgba(0, 0, 0, 0.03);
/* Tailwind: shadow-soft-md */

/* High elevation - modals, popovers */
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
/* Tailwind: shadow-soft-lg */

/* Inner shadow - inputs, inset elements */
box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
/* Tailwind: shadow-inner-soft */

/* Brand accent glows */
box-shadow: 0 0 15px rgba(45, 125, 70, 0.35);  /* Green glow */
/* Tailwind: shadow-glow-green */

box-shadow: 0 0 15px rgba(212, 175, 55, 0.35);  /* Gold glow */
/* Tailwind: shadow-glow-gold */
```

---

## 🔄 Border Radius

```css
/* Subtle rounding */
border-radius: 0.375rem;  /* 6px - default */

/* Medium rounding - cards */
border-radius: 0.5rem;    /* 8px - rounded-lg */

/* Large rounding - images, feature cards */
border-radius: 0.75rem;   /* 12px - rounded-xl */

/* Extra large - hero sections */
border-radius: 1rem;      /* 16px - rounded-2xl */

/* Maximum rounding - special elements */
border-radius: 1.5rem;    /* 24px - rounded-3xl */

/* Full circle - avatars, icons */
border-radius: 9999px;    /* rounded-full */
```

---

## 🎬 Animations

### Float Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

### Pulse Animations
```css
/* Slow pulse - attention grabbers */
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Subtle pulse - backgrounds */
.animate-pulse-subtle {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Hover Transitions
```css
/* Standard transition for interactive elements */
transition: all 0.2s ease-in-out;

/* Smooth color transitions */
transition: background-color 0.2s ease, color 0.2s ease;

/* Transform transitions */
transition: transform 0.3s ease;
```

---

## 🔘 Component Patterns

### Primary CTA Button
```tsx
<button className="
  bg-lumora-green-500
  hover:bg-lumora-green-600
  text-white
  font-semibold
  px-8
  py-4
  rounded-xl
  shadow-soft
  hover:shadow-soft-md
  transition-all
  duration-200
  inline-flex
  items-center
  gap-2
">
  Bestel Nu
  <svg>...</svg>
</button>
```

### Secondary CTA Button
```tsx
<button className="
  bg-lumora-dark
  hover:bg-lumora-dark-700
  text-white
  font-semibold
  px-6
  py-3
  rounded-lg
  shadow-soft
  hover:shadow-soft-md
  transition-all
  duration-200
">
  Meer Info
</button>
```

### Outline/Ghost CTA
```tsx
<button className="
  bg-white
  hover:bg-lumora-green-50
  text-lumora-green-500
  border-2
  border-lumora-green-500
  font-semibold
  px-6
  py-3
  rounded-lg
  transition-all
  duration-200
">
  Download Brochure
</button>
```

### Content Card
```tsx
<div className="
  bg-white
  rounded-2xl
  shadow-soft
  p-8
  hover:shadow-soft-md
  transition-shadow
  duration-300
">
  {/* Card content */}
</div>
```

### Feature Section
```tsx
<section className="
  py-16
  md:py-20
  bg-lumora-cream
">
  <div className="
    max-w-6xl
    mx-auto
    px-6
    md:px-8
  ">
    {/* Section content */}
  </div>
</section>
```

### Badge/Label
```tsx
<span className="
  inline-block
  bg-lumora-green-100
  text-lumora-green-700
  text-sm
  font-medium
  px-3
  py-1
  rounded-full
">
  Duurzaam
</span>
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
/* Default: < 640px (mobile) */

sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Responsive Patterns
```tsx
// Stack on mobile, side-by-side on desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

// Hide on mobile, show on desktop
<div className="hidden md:block">

// Different padding
<div className="px-4 md:px-8 py-8 md:py-16">

// Responsive font sizes
<h1 className="text-2xl md:text-4xl lg:text-5xl">
```

---

## 🌐 Multilingual Considerations

### Language-Specific Adjustments

**German (DE):**
- Longer words → increase min-width for buttons
- Compound nouns → ensure line-breaking works
- Formal tone → use "Sie" form

**Dutch (NL):**
- Standard length, similar to English
- Use appropriate spellings (ë, ö, etc.)

**English (EN):**
- Shorter, more concise
- International audience

### Font Stack Supports:
- Latin characters (EN, NL, DE)
- Special characters: é, ë, ö, ü, ä, ß
- Accents and diacritics

---

## ✅ SEO Landing Page Template Structure

```tsx
// Structure for all 50 pages
<main className="min-h-screen bg-lumora-cream">

  {/* Hero Section */}
  <section className="py-16 md:py-24 bg-gradient-to-br from-lumora-cream to-lumora-green-50">
    <div className="max-w-6xl mx-auto px-6 md:px-8">
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-lumora-dark mb-6">
        {/* Target keyword in H1 */}
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-3xl">
        {/* Lead paragraph with USP */}
      </p>

      {/* Primary CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-lumora-green-500 ...">
          Primary CTA
        </button>
        <button className="bg-white border-2 border-lumora-green-500 ...">
          Secondary CTA
        </button>
      </div>
    </div>
  </section>

  {/* Main Content */}
  <section className="py-16 md:py-20">
    <div className="max-w-4xl mx-auto px-6 md:px-8">

      {/* Content sections with h2, h3 */}
      <article className="prose prose-lg max-w-none">
        {/* 1200-1800 words SEO content */}
      </article>

      {/* Mid-content CTA */}
      <div className="my-12 p-8 bg-lumora-green-50 rounded-2xl">
        <h3>CTA Headline</h3>
        <button>CTA Button</button>
      </div>

    </div>
  </section>

  {/* Related Content */}
  <section className="py-16 bg-white">
    <div className="max-w-6xl mx-auto px-6 md:px-8">
      <h2>Related Articles</h2>
      {/* 3-5 internal links */}
    </div>
  </section>

  {/* Final CTA Section */}
  <section className="py-16 md:py-20 bg-lumora-dark text-white">
    <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
      <h2 className="text-3xl md:text-4xl mb-6">
        Final CTA Headline
      </h2>
      <button className="bg-lumora-green-500 ...">
        Strong CTA
      </button>
    </div>
  </section>

</main>
```

---

## 🎯 Design Principles

1. **Clarity First**: Information should be easy to scan and understand
2. **Breathing Room**: Generous whitespace makes content more digestible
3. **Hierarchy**: Clear visual hierarchy guides the reader
4. **Consistency**: All pages follow the same patterns
5. **B2B Professional**: Not flashy, but sophisticated and trustworthy
6. **Sustainability**: Design reflects eco-friendly values (natural colors, organic shapes)
7. **Accessibility**: WCAG 2.1 AA compliance minimum
8. **Performance**: Fast loading, optimized images, minimal animation

---

## 📋 Quality Checklist per Page

- [ ] Uses lumora-cream background
- [ ] Primary headings use Playfair Display
- [ ] Body text uses Inter
- [ ] All CTAs use lumora-green-500 or lumora-dark
- [ ] Shadows are soft (shadow-soft variants)
- [ ] Rounded corners (rounded-xl or rounded-2xl)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Sufficient color contrast (WCAG AA)
- [ ] Consistent spacing (multiples of 4px)
- [ ] Maximum 3 CTAs per page
- [ ] Internal links styled with lumora-green-500
- [ ] Hover states on all interactive elements

---

**Design System Eigenaar:** Lumora Horticulture Development Team
**Laatste Update:** 2025-11-24
**Versie:** 1.0
