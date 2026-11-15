import { useSiteConfig } from "../hooks/useSiteConfig";

// Fixed full-page background image, configured in the admin settings
// ("background.image"). Rendered once at the app root, behind everything,
// so glass surfaces (header, cards) have something to refract.
export function SiteBackground() {
  const { backgroundImage } = useSiteConfig();
  const url = backgroundImage.trim();
  if (!url) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <img src={url} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-white/25 dark:bg-black/35" />
    </div>
  );
}
