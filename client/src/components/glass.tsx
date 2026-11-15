import type { CSSProperties, ReactNode } from "react";

// Liquid glass surfaces built on the <lg-panel> custom element
// (vendored from https://liquidglass.dev, MIT — see
// client/public/lib/liquid-glass/, loaded once in index.html).
// The element refracts the marked page backdrop — the global background
// image (components/site-background.tsx) — with the same rendering in
// Chromium, Safari and Firefox. Until the element is upgraded, or if its
// script is blocked, the .rin-glass-css fallback in components.css keeps
// the surface looking like frosted glass.
//
// The optics are deliberately calm: low rim refraction, a narrow bezel,
// almost no chromatic fringe and a soft specular, so the edges bend the
// backdrop gently instead of scattering busy light.
const CALM_OPTICS = {
  refraction: 12,
  bezel: 0.2,
  chroma: 0.02,
  specular: 0.35,
  specularWidth: 1.5,
} as const;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lg-panel": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        radius?: number | string;
        refraction?: number | string;
        bezel?: number | string;
        curvature?: number | string;
        chroma?: number | string;
        blur?: number | string;
        specular?: number | string;
        "specular-width"?: number | string;
        "light-angle"?: number | string;
        tone?: string;
        backdrop?: string;
      };
    }
  }
}

export type GlassSurfaceProps = {
  children: ReactNode;
  cornerRadius?: number;
  /** Layout classes for the surface box itself (margins, width, display). */
  className?: string;
  /** Classes for the inner content wrapper (padding, flex layout, text). */
  contentClassName?: string;
  /** Rim bend in px (0-60); lower is calmer. Defaults to the calm preset. */
  refraction?: number;
  /** Frost in px. */
  blur?: number;
  style?: CSSProperties;
};

export function GlassSurface({
  children,
  cornerRadius = 24,
  className = "",
  contentClassName = "",
  refraction = CALM_OPTICS.refraction,
  blur = 2,
  style,
}: GlassSurfaceProps) {
  return (
    <lg-panel
      className={`rin-glass-panel ${className}`}
      radius={cornerRadius}
      refraction={refraction}
      bezel={CALM_OPTICS.bezel}
      chroma={CALM_OPTICS.chroma}
      specular={CALM_OPTICS.specular}
      specular-width={CALM_OPTICS.specularWidth}
      blur={blur}
      style={
        {
          "--rin-glass-radius": `${cornerRadius}px`,
          ...style,
        } as CSSProperties
      }
    >
      <div className={contentClassName}>{children}</div>
    </lg-panel>
  );
}
