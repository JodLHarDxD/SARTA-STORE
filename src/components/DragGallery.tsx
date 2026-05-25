import { useEffect, useRef, useState } from "react";
import { dragGalleryItems } from "../data/products";
import "./DragGallery.css";

/** Palmer-inspired horizontal drag-to-explore gallery with hover autoplay videos & horizontal wheel scroll */
export function DragGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onDown = (clientX: number) => {
      isDragging.current = true;
      startX.current = clientX;
      scrollLeft.current = track.scrollLeft;
      track.classList.add("is-dragging");
    };

    const onMove = (clientX: number) => {
      if (!isDragging.current) return;
      const walk = (clientX - startX.current) * 1.2;
      track.scrollLeft = scrollLeft.current - walk;
    };

    const onUp = () => {
      isDragging.current = false;
      track.classList.remove("is-dragging");
    };

    const onWheel = (e: WheelEvent) => {
      // Intercept vertical scroll on track and convert to smooth horizontal scroll
      if (e.deltaY !== 0) {
        e.preventDefault();
        track.scrollLeft += e.deltaY * 0.85;
      }
    };

    const mouseDown = (e: MouseEvent) => onDown(e.pageX);
    const mouseMove = (e: MouseEvent) => onMove(e.pageX);
    const touchStart = (e: TouchEvent) => onDown(e.touches[0].pageX);
    const touchMove = (e: TouchEvent) => onMove(e.touches[0].pageX);

    track.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", onUp);
    track.addEventListener("touchstart", touchStart, { passive: true });
    track.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("touchend", onUp);
    track.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      track.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", onUp);
      track.removeEventListener("touchstart", touchStart);
      track.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", onUp);
      track.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section className="drag-gallery">
      <div className="container drag-gallery__head">
        <div>
          <p className="eyebrow">Collections</p>
          <h2 className="display drag-gallery__title">
            Drag to explore
          </h2>
        </div>
        <p className="drag-gallery__hint">
          Pull the rail — inspired by tactile catalog browsing.
        </p>
      </div>
      <div ref={trackRef} className="drag-gallery__track">
        {dragGalleryItems.map((item) => (
          <article
            key={item.title}
            className="drag-gallery__card"
            onMouseEnter={() => setHoveredTitle(item.title)}
            onMouseLeave={() => setHoveredTitle(null)}
          >
            <div className="drag-gallery__media-wrap">
              <img src={item.src} alt={item.title} loading="lazy" />
              {item.video && (
                <video
                  src={item.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ opacity: hoveredTitle === item.title ? 1 : 0 }}
                />
              )}
            </div>
            <div>
              <p className="eyebrow">{item.subtitle}</p>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
