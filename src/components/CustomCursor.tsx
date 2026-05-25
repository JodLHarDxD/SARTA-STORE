import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { sartaAudio } from "./AudioManager";
import "./CustomCursor.css";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "view" | "drag" | "sound">("default");
  const [labelText, setLabelText] = useState("");

  useEffect(() => {
    // Check if device supports hover/fine pointer
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.body.classList.add("custom-cursor-active");

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 1 });

    const onMouseMove = (e: MouseEvent) => {
      // Smoothly animate the cursor container to the coordinates using GSAP
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Pass coordinates to Audio Manager to update ambient frequency & pitch detuning
      sartaAudio.update(e.clientX, e.clientY, window.scrollY);
    };

    const onScroll = () => {
      // Update audio parameters on scroll
      sartaAudio.update(0, 0, window.scrollY);
    };

    // Attach mouse listeners to interactive tags
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, select, textarea, .lookbook-card, .drag-gallery__card");
      
      if (!interactive) {
        setCursorState("default");
        setLabelText("");
        return;
      }

      // Play soft mechanical tick on entering navigation links or buttons
      if (interactive.tagName === "A" || interactive.tagName === "BUTTON") {
        sartaAudio.tick();
      }

      // Custom attributes to change cursor state
      const cursorAttr = interactive.getAttribute("data-cursor");
      if (cursorAttr === "view") {
        setCursorState("view");
        setLabelText("VIEW");
      } else if (cursorAttr === "drag") {
        setCursorState("drag");
        setLabelText("DRAG");
      } else if (cursorAttr === "sound") {
        setCursorState("sound");
        setLabelText("SOUND");
      } else {
        setCursorState("hover");
        setLabelText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  // Return null if pointer is coarse (mobile / touch device)
  const isFinePointer = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
  if (!isFinePointer) return null;

  return (
    <div ref={cursorRef} className={`custom-cursor custom-cursor--${cursorState}`} aria-hidden="true">
      <div className="custom-cursor__circle">
        <span ref={labelRef} className="custom-cursor__label">
          {labelText}
        </span>
      </div>
      <div className="custom-cursor__dot" />
    </div>
  );
}
