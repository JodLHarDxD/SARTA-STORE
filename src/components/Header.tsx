import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { sartaAudio } from "./AudioManager";
import "./Header.css";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=new", label: "New In" },
  { to: "/shop?category=women", label: "Women" },
  { to: "/shop?category=men", label: "Men" },
  { to: "/about", label: "About" },
];

export function Header() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Sync muted state periodically or on load
    setIsMuted(sartaAudio.isMuted());

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // If preloader has completed, check the updated audio state
    setIsMuted(sartaAudio.isMuted());
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    sartaAudio.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__bar container">
        <button
          type="button"
          className="site-header__menu"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span />
          <span />
        </button>

        <Link to="/" className="site-header__logo">
          SARTA
        </Link>

        <nav
          id="site-nav"
          className={`site-header__nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary"
        >
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `site-header__link ${isActive ? "is-active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          {/* Animated Web Audio API EQ sound control */}
          <button
            type="button"
            className={`site-header__audio-toggle ${isMuted ? "is-muted" : "is-playing"}`}
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute atmospheric audio" : "Mute atmospheric audio"}
            data-cursor="sound"
          >
            <div className="audio-bars">
              <span className="audio-bar bar-1" />
              <span className="audio-bar bar-2" />
              <span className="audio-bar bar-3" />
              <span className="audio-bar bar-4" />
            </div>
            <span className="audio-toggle-label">{isMuted ? "sound off" : "sound on"}</span>
          </button>

          <Link to="/shop" className="site-header__search">
            Search
          </Link>
          
          <button
            type="button"
            className="site-header__bag"
            onClick={openCart}
            aria-label={`Open bag, ${count} items`}
          >
            Bag ({String(count).padStart(2, "0")})
          </button>
        </div>
      </div>
    </header>
  );
}

