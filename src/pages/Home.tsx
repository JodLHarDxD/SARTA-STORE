import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { DragGallery } from "../components/DragGallery";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { images } from "../assets/content-manifest";
import { lookbookItems } from "../data/lookbook-data";
import "./Home.css";
import "./HomeGallery.css";

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
  const [activeTab, setActiveTab] = useState<"all" | "equestrian" | "suits" | "editorial">("all");

  const filteredLookbook = useMemo(() => {
    if (activeTab === "all") return lookbookItems;
    return lookbookItems.filter((item) => item.collection === activeTab);
  }, [activeTab]);

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
            src={images.curatedHeroWomanUrbanSuit}
            alt="Editorial fashion"
            className="hero__img hero__img--main"
          />
          <img
            src={images.curatedCampaignTwoWomenSuits}
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

      <section className="lookbook-section">
        <div className="container lookbook-head">
          <p className="eyebrow">The Archives</p>
          <h2 className="display lookbook-title">editorial cinema & lookbooks</h2>
          <p className="lookbook-subtitle">
            explore our visual world — dynamic video captures, campaign details, and modern boutique showroom atmosphere.
          </p>
        </div>

        <div className="container">
          <div className="lookbook-filters">
            {(["all", "equestrian", "suits", "editorial"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`lookbook-filter-btn ${activeTab === tab ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "all" ? "All Works" : tab === "suits" ? "suits curated" : tab === "editorial" ? "editorial classics" : tab}
              </button>
            ))}
          </div>

          <div className="lookbook-grid">
            {filteredLookbook.map((item) => (
              <article key={item.id} className="lookbook-card">
                <div className="lookbook-media-wrap">
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img src={item.src} alt={item.title} loading="lazy" />
                  )}
                  <div className="lookbook-overlay">
                    <div className="lookbook-info">
                      <h3 className="lookbook-card-title">{item.title}</h3>
                      <p className="lookbook-card-subtitle">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
