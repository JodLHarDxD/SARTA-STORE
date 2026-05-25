import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { images } from "../../assets/content-manifest";
import { sartaAudio } from "../AudioManager";
import "./Preloader.css";

// 9 high-impact fashion editorial images
const PRELOADER_IMAGES = [
  images.editorialPantherPinkWater,
  images.editorialWomanColorblockTeal,
  images.editorialManSalmonProfile,
  images.editorialWomanMistPortrait,
  images.editorialGoldJewelry,
  images.editorialWomanStripedGown,
  images.editorialCoutureLeafRunway,
  images.editorialGirlWolfNight,
  images.heroModelSequinHorse,
];

type PreloaderProps = {
  onComplete: () => void;
};

/**
 * SARTA Preloader Redesign:
 * 1. Fans in editorial cards from center.
 * 2. Ticks counter 000 -> 100 with dynamic typography.
 * 3. Halts on 100 to present a beautiful, minimalist "Acoustic Permission" sensory overlay.
 * 4. Animates exit upon user choice and initializes sartaAudio.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imagesLayerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  
  const [showChoice, setShowChoice] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const imagesLayer = imagesLayerRef.current;
    const wordmark = wordmarkRef.current;
    const counter = counterRef.current;
    if (!overlay || !imagesLayer || !wordmark || !counter) return;

    const imgEls = Array.from(
      imagesLayer.querySelectorAll<HTMLImageElement>(".preloader__image"),
    );
    const imgs = imgEls as HTMLElement[];

    // Disable scrolling during load
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Initial states — GPU compositor layers created NOW, before decode wait
    gsap.set(imgs, { scale: 0, rotate: 0, willChange: "transform" });
    gsap.set(wordmark, { yPercent: 110, opacity: 0 });
    gsap.set(counter, { opacity: 1, yPercent: 0 });

    const intro = gsap.timeline({
      paused: true,
      defaults: { duration: 0.75, ease: "power3.out", force3D: true },
      onStart: () => {
        imagesLayer.classList.remove("is-hidden");
        wordmark.classList.remove("is-hidden");
      },
    });

    intro
      .to(imgs, {
        scale: 1,
        rotate: () => gsap.utils.random(-15, 15),
        stagger: { each: 0.15, from: "center" },
      })
      .to(
        wordmark,
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
        "<0.2",
      );

    const main = gsap.timeline({
      paused: true,
      defaults: { force3D: true },
    });

    main
      .call(() => intro.play())
      // Tick 000 → 100
      .to(
        counter,
        {
          duration: 2.8,
          innerText: 100,
          modifiers: {
            innerText: (v) => String(Math.round(Number(v))).padStart(3, "0"),
          },
          ease: "power2.inOut",
          snap: { innerText: 1 },
        },
        0,
      )
      // Fade out counter when 100 is achieved, then display sound choice
      .to(counter, {
        yPercent: -100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          setShowChoice(true);
        }
      }, "<92%");

    // Wait for ALL images to fully decode + GPU texture upload before animating.
    // This is why fan-in was laggy: decode was racing the animation.
    // fan-out was smooth because images were already on GPU.
    let cancelled = false;
    Promise.all(
      imgEls.map((img) =>
        img.complete
          ? Promise.resolve()
          : img.decode().catch(() => {}),
      ),
    ).then(() => {
      if (!cancelled) main.play();
    });

    return () => {
      cancelled = true;
      main.kill();
      intro.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  const handleChoice = (muted: boolean) => {
    // 1. Initialise and set audio state
    sartaAudio.init();
    sartaAudio.setMuted(muted);
    if (!muted) {
      sartaAudio.play();
    }

    // 2. Animate out preloader layers
    const overlay = overlayRef.current;
    const imagesLayer = imagesLayerRef.current;
    const wordmark = wordmarkRef.current;
    const choiceEl = document.querySelector(".preloader__choice-wrap");
    if (!overlay || !imagesLayer || !wordmark || !choiceEl) return;

    const imgs = gsap.utils.toArray<HTMLElement>(
      imagesLayer.querySelectorAll(".preloader__image"),
    );

    const exitTl = gsap.timeline({
      onComplete: () => {
        document.documentElement.classList.add("loaded");
        document.documentElement.style.overflow = "";
        onComplete();
      },
    });

    exitTl
      // Fade out acoustic permit menu
      .to(choiceEl, {
        opacity: 0,
        y: -24,
        duration: 0.5,
        ease: "power2.inOut",
      })
      // Slide up wordmark
      .to(
        wordmark,
        { yPercent: -120, opacity: 0, duration: 0.8, ease: "expo.inOut" },
        "<0.1",
      )
      // Collapses cards back to center
      .to(
        imgs,
        {
          scale: 0,
          rotate: () => gsap.utils.random(-15, 15),
          duration: 0.65,
          ease: "expo.inOut",
          stagger: { each: 0.05, from: "end" },
        },
        "<",
      )
      // Dramatic curtain upward wipe
      .to(
        overlay,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.2,
          ease: "power3.inOut",
        },
        "<0.2",
      );
  };

  return (
    <div ref={overlayRef} className="preloader" aria-hidden="true">
      <div className="preloader__inner">
        {/* Fan gallery stack */}
        <div ref={imagesLayerRef} className="preloader__images is-hidden">
          {PRELOADER_IMAGES.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className="preloader__image"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              style={{ zIndex: index }}
            />
          ))}
        </div>

        {/* Cinematic difference wordmark */}
        <div className="preloader__wordmark-wrap">
          <span ref={wordmarkRef} className="preloader__wordmark is-hidden">
            sarta
          </span>
        </div>

        {/* Dynamic choice or ticking counter overlay */}
        <div className="preloader__interaction">
          {!showChoice ? (
            <div className="preloader__counter-wrap">
              <span ref={counterRef} className="preloader__counter">
                000
              </span>
            </div>
          ) : (
            <div className="preloader__choice-wrap page-enter">
              <p className="preloader__choice-eyebrow">Acoustic Sarta Laboratory</p>
              <h2 className="preloader__choice-title">EXPERIENCE THIS SHOWCASE WITH ATMOSPHERIC SOUND?</h2>
              <div className="preloader__choice-actions">
                <button
                  type="button"
                  className="btn btn--cream"
                  onClick={() => handleChoice(false)}
                  data-cursor="sound"
                >
                  Enter with Sound
                </button>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => handleChoice(true)}
                >
                  Enter Muted
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
