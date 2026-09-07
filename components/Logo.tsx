export function LogoMark({ size = 26, iconSize = 14, radius }: { size?: number; iconSize?: number; radius?: number }) {
  return (
    <span
      style={{
        display: 'flex',
        width: size,
        height: size,
        borderRadius: radius ?? (size > 28 ? 10 : 8),
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
      }}
    >
      <svg
        aria-hidden="true"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.2" y="7" width="17.6" height="14" rx="3" stroke="#0f1c2e" />
        <path d="M9 7V5.4A1.4 1.4 0 0 1 10.4 4h3.2A1.4 1.4 0 0 1 15 5.4V7" stroke="#0f1c2e" />
        <path d="M4.2 13.2h15.6" stroke="#fbbf24" strokeWidth={3.4} />
      </svg>
    </span>
  );
}
