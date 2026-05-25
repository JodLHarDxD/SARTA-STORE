import { useEffect, useRef } from "react";
import gsap from "gsap";
import { images } from "../../assets/content-manifest";
import "./Preloader.css";

// 9 images — maximum tonal/color spread so each reads at any rotation:
// pink · red+teal · salmon · white mist · dark gold · grey striped · dark couture · dark night · blue sky
const PRELOADER_IMAGES = [
  images.editorialPantherPinkWater,      // pink water, black panther — surreal, unexpected
  images.editorialWomanColorblockTeal,   // split red+teal bg — most colorful
  images.editorialManSalmonProfile,      // salmon/peach bg, man silhouette — warm
  images.editorialWomanMistPortrait,     // white misty bg — ghost-minimal
  images.editorialGoldJewelry,           // black bg, gold tones — opulent dark
  images.editorialWomanStripedGown,      // grey studio, navy+white gown — classical
  images.editorialCoutureLeafRunway,     // dark architectural bg, ultra-couture
  images.editorialGirlWolfNight,         // dark night field, white dress — ethereal
  images.heroModelSequinHorse,           // blue sky, red headscarf — cinematic anchor
];

type PreloaderProps = {
  onComplete: () => void;
};

/**
 * SARTA preloader — stacked editorial portraits, Cormorant wordmark with
 * mix-blend-mode:difference (images show through in inverse colour),
 * 000→100 counter, clip-path wipe exit.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imagesLayerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const imagesLayer = imagesLayerRef.current;
    const wordmark = wordmarkRef.current;
    const counter = counterRef.current;
    if (!overlay || !imagesLayer || !wordmark || !counter) return;

    const imgs = gsap.utils.toArray<HTMLElement>(
      imagesLayer.querySelectorAll(".preloader__image"),
    );

    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Set initial state
    gsap.set(imgs, { scale: 0, rotate: 0 });
    gsap.set(wordmark, { yPercent: 110, opacity: 0 });
    gsap.set(counter, { opacity: 1 });

    const intro = gsap.timeline({
      paused: true,
      defaults: { duration: 0.7, ease: "power3.out", force3D: true },
      onStart: () => {
        imagesLayer.classList.remove("is-hidden");
        wordmark.classList.remove("is-hidden");
      },
    });

    intro
      // Cards fan in from centre
      .to(imgs, {
        scale: 1,
        rotate: () => gsap.utils.random(-18, 18),
        stagger: { each: 0.18, from: "center" },
      })
      // Wordmark slides up simultaneously
      .to(
        wordmark,
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out" },
        "<0.2",
      );

    const main = gsap.timeline({
      delay: 0.3,
      defaults: { force3D: true },
      onComplete: () => {
        document.documentElement.classList.add("loaded");
        document.documentElement.style.overflow = "";
        onComplete();
      },
    });

    main
      .call(() => intro.play())
      // Counter 000 → 100
      .to(
        counter,
        {
          duration: 3.2,
          innerText: 100,
          modifiers: {
            innerText: (v) => String(Math.round(Number(v))).padStart(3, "0"),
          },
          ease: "circ.inOut",
          snap: { innerText: 1 },
        },
        0,
      )
      // Counter fades out
      .to(counter, { yPercent: -120, autoAlpha: 0, duration: 0.8, ease: "circ.inOut" }, "<88%")
      // Wordmark rises out
      .to(wordmark, { yPercent: -120, autoAlpha: 0, duration: 1.0, ease: "expo.inOut" }, "<")
      // Cards collapse
      .to(
        imgs,
        {
          scale: 0,
          rotate: () => gsap.utils.random(-18, 18),
          duration: 0.7,
          ease: "expo.inOut",
          stagger: { each: 0.08, from: "end" },
        },
        "<",
      )
      // Curtain wipe upward
      .to(
        overlay,
        { clipPath: "inset(0% 0% 100% 0%)", duration: 1.4, ease: "power2.inOut" },
        "<25%",
      );

    return () => {
      main.kill();
      intro.kill();
      document.documentElement.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="preloader" aria-hidden="true">
      <div className="preloader__inner">
        {/* Stacked editorial cards */}
        <div
          ref={imagesLayerRef}
          className="preloader__images is-hidden"
          aria-hidden="true"
        >
          {PRELOADER_IMAGES.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className="preloader__image"
              loading="eager"
              decoding="async"
              style={{ zIndex: index }}
            />
          ))}
        </div>

        {/* SARTA wordmark — mix-blend-mode:difference so images invert under the text */}
        <div className="preloader__wordmark-wrap">
          <span ref={wordmarkRef} className="preloader__wordmark is-hidden">
            SARTA
          </span>
        </div>

        {/* 000 → 100 counter */}
        <div className="preloader__counter-wrap">
          <span ref={counterRef} className="preloader__counter">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
