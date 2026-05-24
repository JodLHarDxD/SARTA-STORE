// SARTA — Content Manifest
// Maps every media asset to its intended site role

// ─── IMAGES ──────────────────────────────────────────────────────────────────

export const images = {
  /**
   * HERO — Full-bleed, above the fold
   * Usage: homepage hero section
   * Shot: Model on black horse, sequin slip dress, red headscarf, blue sky
   * Vibe: Cinematic / equestrian luxury
   */
  heroModelSequinHorse: new URL('./images/hero-model-sequin-horse.jpg', import.meta.url).href,

  /**
   * EDITORIAL 01 — Dark background, gold tones
   * Usage: About page feature / homepage editorial strip
   * Shot: Close-up model, ornate gold necklace & earrings, dark bg
   * Vibe: Opulent / old-money darkness
   */
  editorialGoldJewelry: new URL('./images/editorial-gold-jewelry.jpg', import.meta.url).href,

  /**
   * EDITORIAL 02 — Silver/pearl, grey studio
   * Usage: Homepage editorial section / lookbook
   * Shot: Model in embroidered silver cape, jewelled headpiece
   * Vibe: Haute couture / otherworldly
   */
  editorialOrnateCrownCape: new URL('./images/editorial-ornate-crown-cape.png', import.meta.url).href,

  /**
   * EDITORIAL 03 — All-white sculptural
   * Usage: Homepage feature / collection banner
   * Shot: Model, oversized white shirt + wide-leg trousers, white fedora
   * Vibe: Minimal luxury / architectural fashion
   */
  editorialWhiteSculptural: new URL('./images/editorial-white-sculptural.png', import.meta.url).href,

  /**
   * EDITORIAL 04 — Futuristic / silver
   * Usage: New arrivals banner / editorial carousel
   * Shot: Model, silver hair, white structured top, intense gaze
   * Vibe: Avant-garde / future luxury
   */
  editorialSilverFuturistic: new URL('./images/editorial-silver-futuristic.png', import.meta.url).href,

  /**
   * LIFESTYLE — Urban motion
   * Usage: Brand story section / About page
   * Shot: Woman, grey long coat, metro platform, motion-blurred train
   * Vibe: Contemporary / effortlessly chic city life
   */
  lifestyleCoatMetro: new URL('./images/lifestyle-coat-metro.jpg', import.meta.url).href,

  /**
   * PRODUCT — Clean editorial background
   * Usage: Shop page / product card
   * Shot: Model, denim & lace wide-leg pants + crop top, white studio bg
   * Vibe: Product-focused editorial
   */
  productDenimLacePants: new URL('./images/product-denim-lace-pants.jpg', import.meta.url).href,
} as const

// ─── VIDEOS ──────────────────────────────────────────────────────────────────

export const videos = {
  /**
   * HERO MAIN — 30MB, longest / highest quality
   * Usage: Homepage hero background video (autoplay, muted, loop)
   */
  heroMain: new URL('./videos/hero-main.mp4', import.meta.url).href,

  /**
   * HERO SECONDARY — 21MB
   * Usage: Secondary hero or homepage split-screen
   */
  heroSecondary: new URL('./videos/hero-secondary.mp4', import.meta.url).href,

  /**
   * EDITORIAL SERIES — 3 clips, mid-length
   * Usage: Homepage editorial section, scroll-triggered reveals
   */
  editorial01: new URL('./videos/editorial-01.mp4', import.meta.url).href,
  editorial02: new URL('./videos/editorial-02.mp4', import.meta.url).href,
  editorial03: new URL('./videos/editorial-03.mp4', import.meta.url).href,

  /**
   * LOOKBOOK SERIES — 6 clips
   * Usage: Lookbook/Shop page grid, product detail pages
   */
  lookbook01: new URL('./videos/lookbook-01.mp4', import.meta.url).href,
  lookbook02: new URL('./videos/lookbook-02.mp4', import.meta.url).href,
  lookbook03: new URL('./videos/lookbook-03.mp4', import.meta.url).href,
  lookbook04: new URL('./videos/lookbook-04.mp4', import.meta.url).href,
  lookbook05: new URL('./videos/lookbook-05.mp4', import.meta.url).href,
  lookbook06: new URL('./videos/lookbook-06.mp4', import.meta.url).href,

  /**
   * PROMO SHORTS — 2 small clips (~400KB each)
   * Usage: Social-style clips, loading transitions, micro-interactions
   */
  promoShort01: new URL('./videos/promo-short-01.mp4', import.meta.url).href,
  promoShort02: new URL('./videos/promo-short-02.mp4', import.meta.url).href,
} as const

// ─── SITE LAYOUT MAP ─────────────────────────────────────────────────────────

export const siteContentMap = {
  homepage: {
    hero: { video: 'heroMain', fallbackImage: 'heroModelSequinHorse' },
    editorialStrip: ['editorialGoldJewelry', 'editorialOrnateCrownCape', 'editorialWhiteSculptural'],
    videoSection: ['editorial01', 'editorial02', 'editorial03'],
    brandStory: { image: 'lifestyleCoatMetro' },
  },
  shop: {
    bannerVideo: 'heroSecondary',
    lookbookGrid: ['lookbook01', 'lookbook02', 'lookbook03', 'lookbook04', 'lookbook05', 'lookbook06'],
    productImages: ['productDenimLacePants'],
  },
  about: {
    heroImage: 'editorialGoldJewelry',
    featureImage: 'editorialSilverFuturistic',
    lifestyleImage: 'lifestyleCoatMetro',
  },
} as const
