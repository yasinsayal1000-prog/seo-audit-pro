import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  stroke?: number;
  showLabel?: boolean;
  label?: string;
  animate?: boolean;
}

export function ScoreRing({ score, size = 120, stroke = 10, showLabel = true, label, animate = true }: ScoreRingProps) {
  const [displayed, setDisplayed] = useState(animate ? 0 : score);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (displayed / 100) * circumference;

  useEffect(() => {
    if (!animate) {
      setDisplayed(clamped);
      return;
    }
    let raf: number;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(eased * clamped));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [clamped, animate]);

  const color = scoreColor(clamped);
  const id = `ring-${size}-${Math.round(clamped)}`;

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={color} stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-bold leading-none" style={{ fontSize: size * 0.28, color: "#0f172a" }}>
            {displayed}
          </span>
          <span className="text-ink-400 mt-1" style={{ fontSize: size * 0.1 }}>of 100</span>
        </div>
      </div>
      {showLabel && label && <span className="mt-2 text-sm font-medium text-ink-600">{label}</span>}
    </div>
  );
}

function scoreColor(score: number): string {
  if (score >= 80) return "#16a34a";
  if (score >= 60) return "#f59e0b";
  if (score >= 40) return "#f97316";
  return "#dc2626";
}
