# SARTA — Luxury Artistic Showroom & E-Commerce

SARTA is an ultra-premium, sensory B2C fashion e-commerce showcase built with **React**, **Vite**, **TypeScript**, and **GSAP (GreenSock Animation Platform)**. 

The site's visual framework and interactive motion are deeply inspired by the award-winning **[Indigo Laboratory](https://indigo-laboratory.it/)** digital jewelry experience, transforming a standard clothing storefront into an immersive, theatrical museum of digital fashion.

---

## 🎨 Sensory & Artistic Highlights

SARTA merges cutting-edge interactive web features with editorial luxury photography to create a breathtaking user journey:

1. **Midnight Laboratory Aesthetic**
   - A deep, high-contrast luxury dark theme (`#080808` background) detailed with gold (`#d4b26f`) and warm linen white (`#f5f3ef`) highlights.
   - An active **dynamic film-grain noise overlay** built using an offline, high-performance inline SVG turbulence loop that shakes randomly to simulate real cinematic 35mm film texturing.
   - Architectural, clean-edge layouts replacing standard pill-shaped buttons with sharp geometry and massive typographic contrast.

2. **Generative Web Audio API Soundscape**
   - An atmospheric synthesizer running **100% client-side** in the browser. It loads instantly and requires zero audio file downloads.
   - Detuned warm triangle waves are modulated in real-time. Mouse coordinates and vertical page scroll alter the filter frequency and oscillator detuning to create a breathing, organic soundtrack.
   - A high-frequency mechanical **plink/tick micro-audio sound** triggers whenever navigation links, close buttons, or filters are hovered or clicked.

3. **Fluid Inertial Custom Cursor**
   - An inertia-driven custom circular cursor follows the mouse coordinates using GSAP interpolation for smooth easing.
   - Set to `mix-blend-mode: difference`, the cursor inverts color registers on the screen. It dynamically morphs and displays typographic tags (like `"DRAG"` over galleries, `"VIEW"` over lookbook grids, and `"SOUND"` over sound bars) on hover.

4. **Interactive Acoustic Permit Preloader**
   - Fans in nine stunning visual cards from the center while ticking a Bodoni counter from `000` to `100` with difference-blended typography.
   - Halts at `100` to present a gorgeous sensory permission modal requesting the visitor to choose **"Enter with Sound"** or **"Enter Muted"**, complying fully with modern browser autoplay policies.

5. **Animated EQ Wave Visualizer**
   - An EQ visualizer in the header featuring four vertical lines that bounce to dynamic CSS keyframe waves when unmuted, and flatten out when muted.

6. **Cinematic Hero Chapters: The Tales of SARTA**
   - Redesigned hero section divided into three expanding split-screen cards: **Tale I: The Equestrian**, **Tale II: The Atelier**, and **Tale III: Avant-Garde**.
   - Hovering over a card dynamically scales the panel width, slides up editorial descriptions, and fades in an autoplaying premium vertical video campaign loop.

7. **Asymmetrical alternate Lookbook Grid**
   - Replaced uniform cards with a dynamic lookbook archive utilizing alternating vertical offsets and margins. Cards float and slide independently to mimic physical gallery panels.

8. **Luxurious Brand Manifest**
   - A beautifully reimagined About page that reads like an editorial fashion manifest, incorporating screen-spanning quotes, asymmetrical column panels, and stats boards.

---

## 🛠️ Technical Stack

- **Framework**: React 19 (TypeScript)
- **Bundler**: Vite 8
- **Animation Platform**: GSAP (GreenSock) & `@gsap/react`
- **Scrolling Physics**: Lenis Smooth Scroll
- **Audio Synthesizer**: Web Audio API (Oscillators, Biquad Filters, Gain Nodes)
- **Styling**: Vanilla CSS with filmic SVG noise overlays

---

## 🚀 Running Locally

Follow these quick commands to spin up SARTA in your local environment:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/JodLHarDxD/SARTA-STORE.git
   cd SARTA-STORE
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

Open `http://localhost:5173` in your browser. Ensure your speakers are turned on to experience the synthesised ambient pad!

---

## 📦 Production Compilations

To bundle SARTA for high-performance production hosting:

```bash
npm run build
```

This compiles TypeScript, compresses CSS, and bundles resources into a highly optimized static build under `/dist` in ~1 second. Run `npm run preview` to inspect the production bundle.
