# SARTA — Source Architecture

**Stack:** React 19 · TypeScript 6 · Vite 8 · GSAP · Lenis  
**Pattern:** Feature-based modules + shared components + typed data layer

---

## Folder Map

```
src/
├── ARCHITECTURE.md         ← you are here
│
├── App.tsx                 ← root: providers + router + global UI shell
├── main.tsx                ← Vite entry point (do not move)
│
├── components/             ── SHARED UI (used by 2+ features or site-wide)
│   ├── layout/
│   │   ├── Header.tsx/css  ← global nav, audio toggle, bag count
│   │   └── Footer.tsx/css  ← global footer
│   └── ui/
│       ├── Preloader/      ← full-screen entry animation (images + wordmark)
│       └── CustomCursor/   ← GSAP magnetic cursor + audio feedback
│
├── features/               ── FEATURE MODULES (own their domain fully)
│   ├── cart/
│   │   ├── CartContext.tsx ← useCart() hook + CartProvider
│   │   ├── CartDrawer.tsx  ← slide-out bag panel
│   │   ├── CartPage.tsx    ← /cart full page
│   │   └── *.css
│   ├── checkout/
│   │   ├── CheckoutPage.tsx ← /checkout form + order summary
│   │   └── *.css
│   ├── editorial/
│   │   ├── DragGallery.tsx ← horizontal drag-to-explore rail
│   │   └── *.css
│   ├── home/
│   │   ├── Home.tsx        ← / full homepage (hero, tales, lookbook, featured)
│   │   ├── Home.css
│   │   └── HomeGallery.css
│   ├── product/
│   │   ├── ProductCard.tsx ← grid card (shop + home featured)
│   │   ├── ProductPage.tsx ← /product/:slug PDP
│   │   └── *.css
│   ├── shop/
│   │   ├── Shop.tsx        ← /shop filter + sort + grid
│   │   └── *.css
│   └── about/
│       ├── AboutPage.tsx   ← /about brand story
│       └── *.css
│
├── data/                   ── STATIC DATA (replace with API calls via lib/api/)
│   ├── products.ts         ← 36 products, categories, hero/drag gallery items
│   ├── lookbook-data.ts    ← lookbook grid items (image + video)
│   └── content-manifest.ts ← all media asset paths with JSDoc descriptions
│
├── lib/                    ── UTILITIES & SERVICES
│   ├── audio.ts            ← Web Audio API ambient synth (sartaAudio singleton)
│   ├── utils.ts            ← formatPrice, slugify, clamp, padNumber
│   └── api/
│       └── products.ts     ← async API stub → swap in real fetch() when backend ready
│
├── types/                  ── CANONICAL TYPESCRIPT TYPES
│   └── product.ts          ← Product, Category, CartItem, HeroSlide, DragGalleryItem
│
├── styles/                 ── GLOBAL DESIGN SYSTEM
│   └── global.css          ← CSS vars, resets, typography, utility classes
│
└── assets/                 ── SRC-BUNDLED STATIC ASSETS
    └── images/             ← images imported directly into components (if any)
```

---

## Path Aliases

All imports use `@/` resolving to `src/`. Never use deep relative paths.

```ts
// ✓ correct
import { useCart } from "@/features/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/product";
import { images } from "@/data/content-manifest";

// ✗ wrong — breaks on refactor
import { useCart } from "../../../context/CartContext";
```

Configured in `vite.config.ts` → `resolve.alias` and `tsconfig.app.json` → `paths`.

---

## Adding a New Feature

1. Create `src/features/<name>/` folder
2. Put page, components, and CSS inside
3. Register route in `App.tsx`
4. Add types to `src/types/` if needed
5. Expose async data via `src/lib/api/<name>.ts`

## Adding a New Page

Same as above — pages live inside their feature folder, not a flat `pages/` directory.

## Adding Media

- Campaign images/videos → `public/media/<campaign-slug>/images|videos/`
- Register the path in `src/data/content-manifest.ts` with JSDoc description
- Import via: `import { images } from "@/data/content-manifest"`

## Adding a Product

Open `src/data/products.ts` and add an entry to the `products` array.  
Image path pattern: `/products/<category>/<filename>.jpg`  
Put image file in `public/products/<category>/`.

## Future Backend Integration

When a real API is ready:
1. Implement fetch calls in `src/lib/api/products.ts`
2. No other files need to change — they already import from the API layer

---

## Public Media Structure

```
public/
├── media/
│   ├── campaign-equestrian/
│   │   ├── images/   ← hero, editorial, lifestyle shots
│   │   └── videos/   ← hero-main, lookbook series, editorial clips
│   └── campaign-curated-suits/
│       ├── images/
│       └── videos/
└── products/
    ├── women/       ← dress-01.jpg, top-03.jpg, coat-02.jpg …
    ├── men/         ← suit-01.jpg, shirt-04.jpg …
    ├── bags/        ← bag-01.jpg …
    └── accessories/ ← acc-01.jpg …
```
