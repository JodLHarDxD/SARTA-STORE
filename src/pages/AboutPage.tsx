import { Link } from "react-router-dom";
import { images } from "../assets/content-manifest";
import "./AboutPage.css";

export function AboutPage() {
  return (
    <div className="about page page-enter" style={{ backgroundColor: "#ffffff" }}>
      {/* ═══════════════════════════════════════════════════════════════
          ZARA-STYLE LANDSCAPE POSTER HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="zara-poster-hero">
        <div className="zara-poster-hero__frame">
          <img src="/media/campaign_both.png" alt="SARTA Atelier Story" className="zara-poster-hero__img" />
          <div className="zara-poster-hero__logo">Sarta</div>
        </div>

        <div className="zara-poster-hero__label-box">
          <h2 className="zara-poster-hero__label-title">THE ATELIER</h2>
          <p className="zara-poster-hero__label-subtitle">POETRY IN LIVING MATERIALS / SS26</p>
        </div>

        <div className="zara-poster-hero__sidebar">
          <div className="zara-poster-hero__sidebar-inner">
            <span className="zara-poster-hero__sidebar-link">BAG [0]</span>
            <span className="zara-poster-hero__sidebar-link">LOG IN</span>
            <span className="zara-poster-hero__sidebar-link">HELP</span>
          </div>
          <div className="zara-poster-hero__sidebar-arrow">→</div>
        </div>
      </section>

      {/* ─── MANIFEST QUOTE ──────────────────────────────────────────────── */}
      <section className="about-quote container">
        <div className="quote-wrap">
          <span className="quote-mark">“</span>
          <blockquote className="display brand-quote">
            we make clothes not just to be worn, but to be judged. and remembered. a quiet canvas for the everyday ritual.
          </blockquote>
          <p className="quote-author">— sarta creative manifest, ss26</p>
        </div>
      </section>

      {/* ─── ASYMMETRICAL STORY BLOCKS ───────────────────────────────────── */}
      <section className="about-story container">
        <div className="story-block">
          <div className="story-block__image" data-cursor="view">
            <img
              src={images.curatedRetailBoutiqueRackWarm}
              alt="Atelier showroom"
            />
          </div>
          <div className="story-block__content">
            <p className="eyebrow">our core why</p>
            <h2 className="display story-block__title">The Silent Ritual</h2>
            <p className="story-block__text">
              SARTA was founded to bridge high-street efficiency with exclusive design studio restraint. 
              We stripped away loud branding and transactional noise to focus on architectural posture 
              and pure textiles. Every linen sleeve, gabardine double-stitch, and cashmere weave is 
              conceived as a silent ritual.
            </p>
          </div>
        </div>

        <div className="story-block story-block--reverse">
          <div className="story-block__image" data-cursor="view">
            <img
              src={images.curatedRetailDarkRackDetail}
              alt="Tailoring design detail"
            />
          </div>
          <div className="story-block__content">
            <p className="eyebrow">The Aesthetics</p>
            <h2 className="display story-block__title">Structured Freedom</h2>
            <p className="story-block__text">
              Inspired by structural concrete architecture and organic, evolving materials, SARTA garments 
              rely on loose drapes and box blazers. It is structured freedom — clothing that responds 
              fluidly to metropolitan motion. We believe a wardrobe should feel like a sensory, 
              atmospheric gallery.
            </p>
          </div>
        </div>
      </section>

      {/* ─── STATS SHOWCASE ──────────────────────────────────────────────── */}
      <section className="about-stats">
        <div className="container stats-grid">
          <div className="stat-item">
            <span className="stat-num display">SS26</span>
            <p className="stat-label">Current Chapter</p>
          </div>
          <div className="stat-item">
            <span className="stat-num display">100%</span>
            <p className="stat-label">Organic Linen & Wool</p>
          </div>
          <div className="stat-item">
            <span className="stat-num display">003</span>
            <p className="stat-label">Tales of Luxury</p>
          </div>
          <div className="stat-item">
            <span className="stat-num display">ATEL</span>
            <p className="stat-label">Showroom Atelier</p>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────────────────────── */}
      <section className="container about-cta">
        <div className="about-cta__inner">
          <h2 className="display">Enter the atelier showcase.</h2>
          <Link to="/shop" className="btn btn--cream">
            Explore All Artifacts
          </Link>
        </div>
      </section>
    </div>
  );
}
