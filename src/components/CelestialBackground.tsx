/**
 * Ambient backdrop: soft red and navy glows behind all content.
 */
const CelestialBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
    <div className="absolute bottom-[-10rem] right-[-6rem] h-[420px] w-[420px] rounded-full bg-secondary/60 blur-3xl" />
  </div>
);

export default CelestialBackground;
