import { useSiteConfig } from "../hooks/useSiteConfig";

// Fixed full-page background image, configured in the admin settings
// ("background.image"). Rendered once at the app root, behind everything.
// The image is softened (slight blur + a light scrim) so it reads as
// ambience; content surfaces stay near-solid above it and the wallpaper
// shows through the gaps and margins like a frame.
export function SiteBackground() {
  const { backgroundImage } = useSiteConfig();
  const url = backgroundImage.trim();
  if (!url) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <img src={url} alt="" className="h-full w-full scale-[1.04] object-cover blur-[2px]" />
      <div className="absolute inset-0 bg-white/30 dark:bg-black/45" />
    </div>
  );
}
