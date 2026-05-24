# SARTA — B2C Clothing Store (Demo)

A full-featured fashion e-commerce front end built with React, Vite, and GSAP. Design draws from:

- [OUTFIT®](https://outfit.hellohello.is/) — preloader (000 counter, stacked images, wordmark reveal)
- [Fourmula](https://fourmula.ai/) — hero copy rhythm, asset grid, category marquee, 4-step flow
- [Palmer](https://www.palmer-dinnerware.com/) — drag-to-explore horizontal gallery
- H&M-style catalog — filters, sort, editorial product grid

## Features

- Outfit-style GSAP preloader (runs once per browser session)
- Home, Shop, Product, Cart, Checkout, About
- Cart drawer + full cart page
- Size/color selection, related products
- Placeholder images from Unsplash and reference sites (swap with your assets)

## Run locally

```bash
cd sarta-store
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Replace media

- Preloader images: `src/components/Preloader/Preloader.tsx` (`PRELOADER_IMAGES`)
- Products: `src/data/products.ts`
- Home hero/gallery: `src/pages/Home.tsx`, `src/data/products.ts`

## Build for production

```bash
npm run build
npm run preview
```
