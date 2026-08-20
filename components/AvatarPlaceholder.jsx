export default function AvatarPlaceholder({ name = "", className = "" }) {
  const initials = name
    .replace(/^(H\.|Hj\.|Drs\.|Dra\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-forest-light to-forest-dark font-display font-extrabold text-gold ${className}`}
      aria-hidden="true"
    >
      {initials || "?"}
    </div>
  );
}
