interface Props {
  className?: string;
}

/** AIC-inspired mark: arc, cross and open book. */
const BrandMark = ({ className }: Props) => (
  <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Luo Hymnal">
    <circle cx="24" cy="24" r="23" fill="currentColor" opacity="0.12" />
    <path
      d="M9 26a15 15 0 0 1 30 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M24 8v18M18 14h12"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path
      d="M6 30c6-3 12-3 18 0 6-3 12-3 18 0v8c-6-3-12-3-18 0-6-3-12-3-18 0z"
      fill="currentColor"
      opacity="0.9"
    />
  </svg>
);

export default BrandMark;
