// SARTA — Content Manifest
// Maps every media asset to its static public absolute URL path

// ─── IMAGES ──────────────────────────────────────────────────────────────────

export const images = {
  /**
   * HERO — Full-bleed, above the fold
   * Usage: homepage hero section
   * Shot: Model on black horse, sequin slip dress, red headscarf, blue sky
   * Vibe: Cinematic / equestrian luxury
   */
  heroModelSequinHorse: '/media/campaign-equestrian/images/hero-model-sequin-horse.jpg',

  /**
   * EDITORIAL 01 — Dark background, gold tones
   * Usage: About page feature / homepage editorial strip
   * Shot: Close-up model, ornate gold necklace & earrings, dark bg
   * Vibe: Opulent / old-money darkness
   */
  editorialGoldJewelry: '/media/campaign-equestrian/images/editorial-gold-jewelry.jpg',

  /**
   * EDITORIAL 02 — Silver/pearl, grey studio
   * Usage: Homepage editorial section / lookbook
   * Shot: Model in embroidered silver cape, jewelled headpiece
   * Vibe: Haute couture / otherworldly
   */
  editorialOrnateCrownCape: '/media/campaign-equestrian/images/editorial-ornate-crown-cape.png',

  /**
   * EDITORIAL 03 — All-white sculptural
   * Usage: Homepage feature / collection banner
   * Shot: Model, oversized white shirt + wide-leg trousers, white fedora
   * Vibe: Minimal luxury / architectural fashion
   */
  editorialWhiteSculptural: '/media/campaign-equestrian/images/editorial-white-sculptural.png',

  /**
   * EDITORIAL 04 — Futuristic / silver
   * Usage: New arrivals banner / editorial carousel
   * Shot: Model, silver hair, white structured top, intense gaze
   * Vibe: Avant-garde / future luxury
   */
  editorialSilverFuturistic: '/media/campaign-equestrian/images/editorial-silver-futuristic.png',

  /**
   * LIFESTYLE — Urban motion
   * Usage: Brand story section / About page
   * Shot: Woman, grey long coat, metro platform, motion-blurred train
   * Vibe: Contemporary / effortlessly chic city life
   */
  lifestyleCoatMetro: '/media/campaign-equestrian/images/lifestyle-coat-metro.jpg',

  /**
   * PRODUCT — Clean editorial background
   * Usage: Shop page / product card
   * Shot: Model, denim & lace wide-leg pants + crop top, white studio bg
   * Vibe: Product-focused editorial
   */
  productDenimLacePants: '/media/campaign-equestrian/images/product-denim-lace-pants.jpg',

  // ─── NEW EDITORIAL CAMPAIGN (2026-05) ───
  editorialPerfumeSilhouette:   '/media/campaign-equestrian/images/editorial-perfume-silhouette.png',
  campaignMenSuitsRooftop:      '/media/campaign-equestrian/images/campaign-men-suits-rooftop.png',
  editorialManSalmonProfile:    '/media/campaign-equestrian/images/editorial-man-salmon-profile.png',
  editorialWomanStripedGown:    '/media/campaign-equestrian/images/editorial-woman-striped-gown.png',
  editorialManSuedeCar:         '/media/campaign-equestrian/images/editorial-man-suede-car.png',
  editorialWomanColorblockTeal: '/media/campaign-equestrian/images/editorial-woman-colorblock-teal.png',
  editorialGirlWolfNight:       '/media/campaign-equestrian/images/editorial-girl-wolf-night.png',
  editorialCoutureLeafRunway:   '/media/campaign-equestrian/images/editorial-couture-leaf-runway.png',
  editorialPantherPinkWater:    '/media/campaign-equestrian/images/editorial-panther-pink-water.png',
  editorialRedVeilPortrait:     '/media/campaign-equestrian/images/editorial-red-veil-portrait.jpeg',
  editorialWomanMistPortrait:   '/media/campaign-equestrian/images/editorial-woman-mist-portrait.jpeg',

  // ─── CURATED SUITS CAMPAIGN (2026-05) ───
  curatedHeroWomanUrbanSuit: '/media/campaign-curated-suits/images/hero-woman-urban-suit.jpg',
  curatedCampaignTwoWomenSuits: '/media/campaign-curated-suits/images/campaign-two-women-suits.jpg',
  curatedEditorialBlackSuitStudio: '/media/campaign-curated-suits/images/editorial-black-suit-studio.jpg',
  curatedEditorialElegantBlackSuit: '/media/campaign-curated-suits/images/editorial-elegant-black-suit.jpg',
  curatedEditorialWomanBlackSuit: '/media/campaign-curated-suits/images/editorial-woman-black-suit.jpg',
  curatedEditorialStudioBlackSuit: '/media/campaign-curated-suits/images/editorial-studio-black-suit.jpg',
  curatedRetailClothingRackNeutral: '/media/campaign-curated-suits/images/retail-clothing-rack-neutral.jpg',
  curatedRetailBoutiqueRackWarm: '/media/campaign-curated-suits/images/retail-boutique-rack-warm.jpg',
  curatedRetailPhoneRackSelection: '/media/campaign-curated-suits/images/retail-phone-rack-selection.jpg',
  curatedRetailLightBoutiqueRack: '/media/campaign-curated-suits/images/retail-light-boutique-rack.jpg',
  curatedRetailDarkRackDetail: '/media/campaign-curated-suits/images/retail-dark-rack-detail.jpg',
} as const

// ─── VIDEOS ──────────────────────────────────────────────────────────────────

export const videos = {
  /**
   * HERO MAIN — 30MB, longest / highest quality
   * Usage: Homepage hero background video (autoplay, muted, loop)
   */
  heroMain: '/media/campaign-equestrian/videos/hero-main.mp4',

  /**
   * HERO SECONDARY — 21MB
   * Usage: Secondary hero or homepage split-screen
   */
  heroSecondary: '/media/campaign-equestrian/videos/hero-secondary.mp4',

  /**
   * EDITORIAL SERIES — 3 clips, mid-length
   * Usage: Homepage editorial section, scroll-triggered reveals
   */
  editorial01: '/media/campaign-equestrian/videos/editorial-01.mp4',
  editorial02: '/media/campaign-equestrian/videos/editorial-02.mp4',
  editorial03: '/media/campaign-equestrian/videos/editorial-03.mp4',

  /**
   * LOOKBOOK SERIES — 6 clips
   * Usage: Lookbook/Shop page grid, product detail pages
   */
  lookbook01: '/media/campaign-equestrian/videos/lookbook-01.mp4',
  lookbook02: '/media/campaign-equestrian/videos/lookbook-02.mp4',
  lookbook03: '/media/campaign-equestrian/videos/lookbook-03.mp4',
  lookbook04: '/media/campaign-equestrian/videos/lookbook-04.mp4',
  lookbook05: '/media/campaign-equestrian/videos/lookbook-05.mp4',
  lookbook06: '/media/campaign-equestrian/videos/lookbook-06.mp4',

  /**
   * PROMO SHORTS — 2 small clips (~400KB each)
   * Usage: Social-style clips, loading transitions, micro-interactions
   */
  promoShort01: '/media/campaign-equestrian/videos/promo-short-01.mp4',
  promoShort02: '/media/campaign-equestrian/videos/promo-short-02.mp4',

  // ─── NEW EDITORIAL VIDEOS (2026-05) ───
  // Portrait 1152×1744, ~6s each — perfect for editorial grid/autoplay
  editorialVideoPerfumeSilhouette: '/media/campaign-equestrian/videos/editorial-perfume-silhouette.mp4',
  editorialVideoCoutureLeafRunway: '/media/campaign-equestrian/videos/editorial-couture-leaf-runway.mp4',
  editorialVideoPantherPinkWater:  '/media/campaign-equestrian/videos/editorial-panther-pink-water.mp4',

  // ─── CURATED SUITS CAMPAIGN (2026-05) ───
  curatedVideoBlackSuitStudio: '/media/campaign-curated-suits/videos/video-black-suit-studio.mp4',
  curatedVideoPinkSuitPortrait: '/media/campaign-curated-suits/videos/video-pink-suit-portrait.mp4',
  curatedVideoTwoWomenTailoredSuits: '/media/campaign-curated-suits/videos/video-two-women-tailored-suits.mp4',
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
