interface DiceIconProps {
  symbol: string;
}

export const DiceIcon = ({symbol}: DiceIconProps)  => {
  switch (symbol) {
    case "SWORD":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
        <g transform="rotate(-45 50 50)">
            {/* Blade */}
            <rect x="45" y="10" width="10" height="50" fill="currentColor" />
            <polygon points="50,5 55,10 45,10" fill="currentColor" />
            {/* Guard */}
            <rect x="35" y="60" width="30" height="5" fill="currentColor" />
            {/* Handle */}
            <rect x="47" y="65" width="6" height="20" fill="currentColor" />
            {/* Pommel */}
            <circle cx="50" cy="88" r="5" fill="currentColor" />
        </g>
        </svg>
      );
    case "BANG":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
        <circle cx="50" cy="50" r="20" fill="currentColor" />
        <path
            d="M50 15 L55 35 M50 85 L55 65 M15 50 L35 45 M85 50 L65 55 M25 25 L40 40 M75 75 L60 60 M75 25 L60 40 M25 75 L40 60"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
        />
        </svg>
      );
    case "HEART":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
        <path
            d="M50 85 C25 65, 10 50, 10 35 C10 20, 20 10, 32 10 C40 10, 47 15, 50 22 C53 15, 60 10, 68 10 C80 10, 90 20, 90 35 C90 50, 75 65, 50 85 Z"
            fill="currentColor"
        />
        </svg>
      );
    default:
      return <span>?</span>;
  }
};