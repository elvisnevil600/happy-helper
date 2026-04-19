/**
 * Subtle celestial backdrop: soft glows + slowly drifting stars.
 * Sits fixed behind all content.
 */
const CelestialBackground = () => {
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  }));

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-gold animate-shimmer"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default CelestialBackground;
