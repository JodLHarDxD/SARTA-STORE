import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SartaLogo } from "./SartaLogo";
import { images } from "../../assets/content-manifest";
import "./Preloader.css";

// 5 images chosen for maximum contrast diversity when stacked/rotated:
// blue sky · dark-gold · grey-silver · pure white · neutral-intense
// Each reads clearly at any angle — avoids the same-palette blur
const PRELOADER_IMAGES = [
  images.heroModelSequinHorse,       // blue sky, red headscarf — cinematic anchor
  images.editorialGoldJewelry,       // black bg, gold tones — opulent
  images.editorialOrnateCrownCape,   // grey studio, silver crown — ethereal
  images.editorialWhiteSculptural,   // pure white bg — minimal luxury
  images.editorialSilverFuturistic,  // neutral bg, intense gaze — avant-garde
];

type PreloaderProps = {
  onComplete: () => void;
};

/**
 * Recreation of the OUTFIT® (hellohello) GSAP preloader:
 * stacked portraits, path wordmark reveal, 000→100 counter, clip-path exit.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imagesLayerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const imagesLayer = imagesLayerRef.current;
    const logo = logoRef.current;
    const counter = counterRef.current;
    if (!overlay || !imagesLayer || !logo || !counter) return;

    const images = gsap.utils.toArray<HTMLElement>(
      imagesLayer.querySelectorAll(".preloader__image"),
    );
    const paths = gsap.utils.toArray<SVGPathElement>(
      logo.querySelectorAll(".logo-path"),
    );

    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const intro = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: "power3.out", force3D: true },
      onStart: () => {
        imagesLayer.classList.remove("is-hidden");
        logo.classList.remove("is-hidden");
      },
    });

    intro
      .fromTo(
        images,
        { scale: 0, rotate: 0 },
        {
          scale: 1,
          rotate: () => gsap.utils.random(-20, 20),
          stagger: { each: 0.2, from: "start" },
        },
      )
      .fromTo(
        paths,
        { yPercent: 110 },
        { yPercent: 0, stagger: { each: 0.2, from: "random" } },
        "<",
      );

    const main = gsap.timeline({
      delay: 0.4,
      defaults: { force3D: true },
      onComplete: () => {
        document.documentElement.classList.add("loaded");
        document.documentElement.style.overflow = "";
        onComplete();
      },
    });

    main
      .call(() => intro.play())
      .to(
        counter,
        {
          duration: 3,
          innerText: 100,
          modifiers: {
            innerText: (value) =>
              String(Math.round(Number(value))).padStart(3, "0"),
          },
          ease: "circ.inOut",
          snap: { innerText: 1 },
        },
        0,
      )
      .to(
        counter,
        { yPercent: -100, duration: 1, autoAlpha: 0, ease: "circ.inOut" },
        "<90%",
      )
      .to(
        paths,
        {
          yPercent: -120,
          duration: 1.2,
          ease: "expo.inOut",
          stagger: { each: 0.08, from: "random" },
        },
        "<",
      )
      .to(
        images,
        {
          scale: 0,
          rotate: () => gsap.utils.random(-20, 20),
          duration: 0.6,
          ease: "expo.inOut",
          stagger: { each: 0.1, from: "end" },
        },
        "<",
      )
      .to(
        overlay,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.4,
          ease: "power2.inOut",
        },
        "<30%",
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
              width={450}
              height={600}
              loading="eager"
              decoding="async"
              style={{ zIndex: index }}
            />
          ))}
        </div>

        <div className="preloader__logo-wrap">
          <SartaLogo className="preloader__logo is-hidden" ref={logoRef} />
        </div>

        <div className="preloader__counter-wrap">
          <span ref={counterRef} className="preloader__counter">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
