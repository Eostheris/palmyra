import React from "react";

interface ProgressDotsProps {
  total: number;
  current: number; // 0-based index
  accent: string;  // css color
}

export default function ProgressDots({ total, current, accent }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2" aria-label="Progress">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`inline-block h-2 w-2 rounded-full ${i <= current ? "opacity-100" : "opacity-30"}`}
          style={{ backgroundColor: accent }}
        />
      ))}
    </div>
  );
}
