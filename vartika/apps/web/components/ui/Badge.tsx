interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "warm" | "muted";
  className?: string;
}

export default function Badge({
  children,
  variant = "accent",
  className = "",
}: BadgeProps) {
  const variants = {
    accent: "bg-[rgba(61,89,72,0.07)] text-accent",
    warm: "bg-warm2 text-warm",
    muted: "bg-bg3 text-ink3",
  };

  return (
    <span
      className={`inline-block text-[11px] tracking-widest uppercase px-3 py-1 rounded-full font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
