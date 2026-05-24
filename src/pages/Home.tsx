import { Link } from "react-router-dom";
import { DragGallery } from "../components/DragGallery";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import "./Home.css";

const marquees = [
  "PDPs",
  "Editorial",
  "Lifestyle",
  "Street style",
  "Campaign",
  "Essentials",
  "New drops",
  "Lookbooks",
];

const steps = [
  {
    code: "01",
    title: "Discover the edit",
    body: "Browse curated drops with H&M-style filters and editorial grids.",
  },
  {
    code: "02",
    title: "Style your cart",
    body: "Pick size and color with instant bag updates — minimal like OUTFIT®.",
  },
  {
    code: "03",
    title: "Campaign-ready assets",
    body: "Fourmula-inspired visuals: studio shots and lifestyle scenes in one place.",
  },
  {
    code: "04",
    title: "Checkout in minutes",
    body: "Fast guest checkout flow built for mobile-first shoppers.",
  },
];

export function Home() {
  const featured = products.slice(0, 8);

  return (
    <div className="home page-enter">
      <section className="hero">
        <div className="hero__content container">
          <p className="eyebrow">New season · SS26</p>
          <h1 className="display hero__title">
            Your wardrobe,
            <br />
            instantly re-shot.
          </h1>
          <p className="hero__lede">
            Studio-quality clothing for everyday ritual. On-brand visuals,
            editorial drops, and essentials that move from PDP to street.
          </p>
          <div className="hero__actions">
            <Link to="/shop" className="btn btn--primary">
              Shop collection
            </Link>
            <Link to="/about" className="btn btn--ghost">
              Our story
            </Link>
          </div>
        </div>
        <div className="hero__visual">
          <img
            src="https://outfit.hellohello.is/preloader/image-01.jpg"
            alt="Editorial fashion"
            className="hero__img hero__img--main"
          />
          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80"
            alt=""
            className="hero__img hero__img--float"
          />
        </div>
        <div className="hero__scroll">
          <span>Scroll</span>
          <span className="hero__scroll-line" />
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marquees, ...marquees].map((label, i) => (
            <span key={`${label}-${i}`}>{label}</span>
          ))}
        </div>
      </div>

      <DragGallery />

      <section className="upload-zone container">
        <div className="upload-zone__copy">
          <p className="eyebrow">Visual workflow</p>
          <h2 className="display upload-zone__title">
            Upload or drop your assets
          </h2>
          <p>
            Inspired by Fourmula — one product, infinite scenes. Replace these
            placeholders with your campaign photography when ready.
          </p>
        </div>
        <div className="upload-zone__grid">
          {[
            "https://outfit.hellohello.is/preloader/image-02.jpg",
            "https://outfit.hellohello.is/preloader/image-03.jpg",
            "https://outfit.hellohello.is/preloader/image-04.jpg",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1503342217505-9e6cf27fe70f?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
          ].map((src, i) => (
            <div key={src} className="upload-zone__cell" style={{ animationDelay: `${i * 0.05}s` }}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <section className="featured container">
        <div className="featured__head">
          <div>
            <p className="eyebrow">Shop the edit</p>
            <h2 className="display featured__title">New arrivals</h2>
          </div>
          <Link to="/shop" className="featured__link">
            View all
          </Link>
        </div>
        <div className="featured__grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="steps">
        <div className="container">
          <p className="eyebrow">How it works</p>
          <h2 className="display steps__title">From browse to doorstep</h2>
        </div>
        <div className="steps__grid container">
          {steps.map((step) => (
            <article key={step.code} className="steps__card">
              <span className="steps__code">{step.code}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <h2 className="display">Made to be worn. Or judged. Or both.</h2>
          <Link to="/shop" className="btn btn--cream">
            Get started
          </Link>
        </div>
      </section>
    </div>
  );
}
