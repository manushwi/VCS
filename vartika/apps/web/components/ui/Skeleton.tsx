export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-bg3 rounded-8 ${className}`}
    />
  );
}
