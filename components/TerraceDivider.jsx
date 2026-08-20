export default function TerraceDivider({ flip = false, className = "text-paper", bgClass = "text-forest" }) {
  return (
    <div className={`terrace-divider ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="h-14 w-full sm:h-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,90 L0,50 L160,50 L160,30 L320,30 L320,60 L480,60 L480,20 L640,20 L640,45 L800,45 L800,10 L960,10 L960,40 L1120,40 L1120,15 L1280,15 L1280,55 L1440,55 L1440,90 Z"
          className={bgClass}
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
