import { forwardRef } from "react";

/** Wordmark paths — same reveal technique as OUTFIT® preloader (hellohello) */
export const SartaLogo = forwardRef<
  SVGSVGElement,
  { className?: string }
>(function SartaLogo({ className = "" }, ref) {
  return (
    <svg
      ref={ref}
      className={className}
      width="28rem"
      viewBox="0 0 720 120"
      aria-label="SARTA"
      role="img"
    >
      <g className="logo-paths" fill="currentColor">
        <path
          className="logo-path"
          d="M12 108V12h52c28 0 46 16 46 40 0 18-10 32-28 36l36 20h-34L54 90H44v18H12zm32-52h18c12 0 18-6 18-14s-6-14-18-14H44v28z"
        />
        <path
          className="logo-path"
          d="M134 108V12h32v72h56v24H134z"
        />
        <path
          className="logo-path"
          d="M238 108V12h32v96h-32z"
        />
        <path
          className="logo-path"
          d="M290 108V12h52c28 0 46 16 46 40 0 24-18 40-46 40h-52V12zm32 72h18c12 0 18-6 18-14s-6-14-18-14h-18v28z"
        />
        <path
          className="logo-path"
          d="M412 108V12h32v96h-32z"
        />
        <path
          className="logo-path"
          d="M464 12h32l44 60V12h32v96h-32l-44-60v60h-32V12z"
        />
      </g>
    </svg>
  );
});
