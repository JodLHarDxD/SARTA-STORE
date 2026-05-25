import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { DragGallery } from "../components/DragGallery";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { images, videos } from "../assets/content-manifest";
import { lookbookItems } from "../data/lookbook-data";
import { sartaAudio } from "../components/AudioManager";
import "./Home.css";
import "./HomeGallery.css";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const TALES = [
  {
    code: "01",
    title: "The Equestrian",
    subtitle: "tale i · equestrian motion",
    image: images.heroModelSequinHorse,
    video: videos.heroSecondary,
    desc: "Cinematic, raw landscapes where high tailoring meets equestrian freedom. A study on sequined slip draping and sharp linen outlines.",
    link: "/shop?category=new",
    coords: "45.464° N / 9.191° E",
    alt: "122m",
    pressure: "1011 hPa",
    temp: "19.5°C"
  },
  {
    code: "02",
    title: "The Atelier",
    subtitle: "tale ii · quiet suiting",
    image: images.curatedCampaignTwoWomenSuits,
    video: videos.curatedVideoPinkSuitPortrait,
    desc: "A silent space for heritage tailoring. Double-breasted chalk-pinks and structural midnight wools structured for modern everyday ritual.",
    link: "/shop?category=women",
    coords: "40.712° N / 74.006° W",
    alt: "10m",
    pressure: "1014 hPa",
    temp: "22.1°C"
  },
  {
    code: "03",
    title: "Avant-Garde",
    subtitle: "tale iii · pink water & leaves",
    image: images.editorialCoutureLeafRunway,
    video: videos.editorialVideoPantherPinkWater,
    desc: "Surreal nature and sculptural digital couture. A dark fantasy of sculpted branches, flowing gowns, and wolves under deep midnight skies.",
    link: "/about",
    coords: "35.676° N / 139.650° E",
    alt: "44m",
    pressure: "1009 hPa",
    temp: "17.8°C"
  }
];

const marquees = [
  "ATELIER SHOWCASE",
  "EDITORIAL ESSENTIALS",
  "SILENT LUXURY",
  "EQUESTRIAN CINEMA",
  "HAUTE COUTURE",
  "THE ARCHIVES",
];

const steps = [
  {
    code: "01",
    title: "Explore the Tales",
    body: "Browse through SARTA's visual tales, detailing campaign cinema, mood boards, and boutique showroom atmospheres.",
  },
  {
    code: "02",
    title: "Select Your Artifact",
    body: "Pick sizing and premium fabric variants with a clean, high-contrast bag drawer — minimal like design studios.",
  },
  {
    code: "03",
    title: "Tactile Cart",
    body: "Review items in your bag with real-time feedback and plink sound ticks on every action.",
  },
  {
    code: "04",
    title: "Seamless Delivery",
    body: "Fast architectural checkout flow built for instant mobile-first and high-street luxury shipping.",
  },
];

export function Home() {
  const featured = products.slice(0, 8);
  const [activeTab, setActiveTab] = useState<"all" | "equestrian" | "suits" | "editorial">("all");
  const [hoveredTale, setHoveredTale] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      // Parallax drift for cards
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const multiplierX = (idx + 1) * 32;
        const multiplierY = (idx + 1) * 18;
        gsap.to(card, {
          x: x * multiplierX,
          y: y * multiplierY,
          rotationY: x * 8,
          rotationX: -y * 8,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      // Parallax drift for Zara brand wordmark letters
      letterRefs.current.forEach((letter, idx) => {
        if (!letter) return;
        const multiplierX = (5 - idx) * 40;
        const multiplierY = (5 - idx) * 20;
        gsap.to(letter, {
          x: x * multiplierX,
          y: y * multiplierY,
          duration: 1.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const filteredLookbook = useMemo(() => {
    if (activeTab === "all") return lookbookItems.slice(0, 16); // Limit for cinematic speed
    return lookbookItems.filter((item) => item.collection === activeTab).slice(0, 12);
  }, [activeTab]);

  return (
    <div className="home page-enter">
      {/* ─── MASTERPIECE EDITORIAL SHOWCASE HERO ─────────────────────────────────── */}
      <section ref={heroRef} className="showcase-hero">
        {/* Giant Zara-inspired wordmark with mix-blend-mode */}
        <div className="showcase-wordmark" aria-hidden="true">
          {["s", "a", "r", "t", "a"].map((letter, idx) => (
            <span
              key={idx}
              ref={(el) => {
                letterRefs.current[idx] = el;
              }}
              className="showcase-wordmark__letter"
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Floating kinetic cards */}
        <div className="showcase-track">
          {TALES.map((tale, index) => {
            const isHovered = hoveredTale === index;
            const isAnyHovered = hoveredTale !== null;
            
            let cardClass = "kinetic-frame";
            if (isHovered) cardClass += " is-active";
            else if (isAnyHovered) cardClass += " is-dimmed";

            return (
              <article
                key={tale.code}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={cardClass}
                onMouseEnter={() => {
                  setHoveredTale(index);
                  sartaAudio.tick(); // click feedback plink
                }}
                onMouseLeave={() => setHoveredTale(null)}
                data-cursor="view"
              >
                {/* Dual-border luxury frames */}
                <div className="kinetic-frame__border-outer" />
                <div className="kinetic-frame__border-inner" />

                {/* Background media elements */}
                <div className="kinetic-frame__media">
                  <img
                    src={tale.image}
                    alt={tale.title}
                    className="kinetic-frame__img"
                  />
                  {/* Autoplay campaign video overlay on hover */}
                  <video
                    src={tale.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`kinetic-frame__video ${isHovered ? "is-visible" : ""}`}
                  />
                  <div className="kinetic-frame__overlay" />
                </div>

                {/* HUD Telemetry Coordinates (Indigo Laboratory style) */}
                <div className="kinetic-frame__hud">
                  <div className="hud-line">
                    <span className="hud-label">COORD</span>
                    <span className="hud-val">{tale.coords}</span>
                  </div>
                  <div className="hud-line">
                    <span className="hud-label">ALT</span>
                    <span className="hud-val">{tale.alt}</span>
                  </div>
                  <div className="hud-line">
                    <span className="hud-label">PRES</span>
                    <span className="hud-val">{tale.pressure}</span>
                  </div>
                  <div className="hud-line">
                    <span className="hud-label">SYS_T</span>
                    <span className="hud-val">{tale.temp}</span>
                  </div>
                  <div className="hud-grid-badge">
                    <span>{tale.code}</span>
                  </div>
                </div>

                {/* Card textual contents */}
                <div className="kinetic-frame__content">
                  <div className="kinetic-frame__header">
                    <span className="kinetic-frame__code">{tale.code}</span>
                    <p className="kinetic-frame__eyebrow">{tale.subtitle}</p>
                  </div>
                  
                  <div className="kinetic-frame__body">
                    <h1 className="display kinetic-frame__title">{tale.title}</h1>
                    <div className="kinetic-frame__expanded-content">
                      <p className="kinetic-frame__desc">{tale.desc}</p>
                      <Link to={tale.link} className="btn btn--cream kinetic-frame__btn">
                        Explore Chapter
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ─── BRAND PROLOGUE ──────────────────────────────────────────────── */}
      <section className="brand-prologue container">
        <div className="prologue-grid">
          <div className="prologue-left">
            <p className="eyebrow">The Prologue</p>
            <h2 className="display prologue-title">
              wardrobe for the <br />in-between moments.
            </h2>
          </div>
          <div className="prologue-right">
            <p className="prologue-text">
              SARTA represents quiet premium fashion, blending tactile boutique atmosphere
              with real-world wearability. Drawing inspiration from modern digital art showcases
              and structural geometry, we craft a shopping journey designed for visual sensory pleasure.
            </p>
            <div className="prologue-actions">
              <Link to="/shop" className="btn btn--primary">
                Shop Collection
              </Link>
              <Link to="/about" className="btn btn--ghost">
                Our Philosophy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DYNAMIC TYPOGRAPHY TAPE ─────────────────────────────────────── */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marquees, ...marquees, ...marquees].map((label, i) => (
            <span key={`${label}-${i}`}>{label}</span>
          ))}
        </div>
      </div>

      {/* ─── INTERACTIVE EXPLORE RAIL ────────────────────────────────────── */}
      <div className="explore-rail-wrap" data-cursor="drag">
        <DragGallery />
      </div>

      {/* ─── ASYMMETRICAL EDITORIAL ARCHIVE ───────────────────────────────── */}
      <section className="lookbook-section">
        <div className="container lookbook-head">
          <p className="eyebrow">The Archives</p>
          <h2 className="display lookbook-title">editorial cinema & lookbooks</h2>
          <p className="lookbook-subtitle">
            Explore our visual world — alternating layouts, dynamic video captures, campaign details, and minimal boutique showroom textures.
          </p>
        </div>

        <div className="container">
          <div className="lookbook-filters">
            {(["all", "equestrian", "suits", "editorial"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`lookbook-filter-btn ${activeTab === tab ? "is-active" : ""}`}
                onClick={() => {
                  setActiveTab(tab);
                  sartaAudio.tick(); // click feedback plink
                }}
              >
                {tab === "all" ? "All Works" : tab === "suits" ? "Suits Curated" : tab === "editorial" ? "Editorial Classics" : tab}
              </button>
            ))}
          </div>

          {/* Alternating Asymmetrical Lookbook Grid */}
          <div className="lookbook-grid">
            {filteredLookbook.map((item, index) => (
              <article
                key={item.id}
                className={`lookbook-card lookbook-card--${item.aspect} lookbook-card--index-${index}`}
                data-cursor="view"
              >
                <div className="lookbook-media-wrap">
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="lookbook-video"
                    />
                  ) : (
                    <img src={item.src} alt={item.title} className="lookbook-img" loading="lazy" />
                  )}
                  <div className="lookbook-overlay">
                    <div className="lookbook-info">
                      <span className="lookbook-card-collection">{item.collection}</span>
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

      {/* ─── NEW ARRIVALS EDIT ────────────────────────────────────────────── */}
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
            <div key={product.id} data-cursor="view" className="featured__card-wrap">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROCESS STEPS ────────────────────────────────────────────────── */}
      <section className="steps">
        <div className="container">
          <p className="eyebrow">Our System</p>
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

      {/* ─── EDITORIAL BANNER ────────────────────────────────────────────── */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <h2 className="display">Made to be worn. Or judged. Or both.</h2>
          <Link to="/shop" className="btn btn--cream">
            Explore All Catalog
          </Link>
        </div>
      </section>
    </div>
  );
}
