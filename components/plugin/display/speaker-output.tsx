import * as React from "react";
import { useMemo } from "react";

interface DotProps {
  left: number;
  top: number;
}

function Dot({ left, top }: DotProps) {
  return (
    <span
      className="absolute box-border"
      style={{
        left,
        top,
        width: "var(--space-0)",
        height: "var(--space-0)",
        borderRadius: "var(--radius-full)",
        background:
          "linear-gradient(180deg, var(--color-accent-gray-1) 20%, var(--color-heather-100) 100%)",
        boxShadow: "inset 0px 0px 0.5px 0.1px var(--color-gray-300)",
      }}
    />
  );
}

export interface SpeakerOutputProps {
  dotStep?: number; // spacing
  dotRadiusInset?: number; // empty rim inside the circle
  stagger?: boolean; // speaker-grille vibe
}

export function SpeakerOutput({
  dotStep = 8,
  dotRadiusInset = 6,
  stagger = true,
}: SpeakerOutputProps) {
  const dots = useMemo(() => {
    const size = 80;
    const dotSize = 2;
    const center = size / 2;
    const radius = center - dotRadiusInset;
    const radiusSq = radius * radius;

    const points: Array<{ x: number; y: number }> = [];
    let row = 0;

    for (let y = 0; y <= size - dotSize; y += dotStep) {
      const rowOffset = stagger && row % 2 === 1 ? dotStep / 2 : 0;

      for (let x = 0; x <= size - dotSize; x += dotStep) {
        const px = x + rowOffset;

        // keep dots inside bounds after offset
        if (px < 0 || px > size - dotSize) continue;

        const cx = px + dotSize / 2;
        const cy = y + dotSize / 2;

        const dx = cx - center;
        const dy = cy - center;

        if (dx * dx + dy * dy <= radiusSq) {
          points.push({ x: Math.round(px), y });
        }
      }

      row += 1;
    }

    return points;
  }, [dotStep, dotRadiusInset, stagger]);

  return (
    <span
      className="flex items-center box-border"
      style={{
        padding: "var(--space-1)",
        width: 96,
        height: 96,
        background:
          "linear-gradient(134.69deg, var(--color-bg-primary) 20.43%, var(--color-accent-gray-2) 80.11%)",
        border: "1px solid var(--color-heather-100)",
        borderRadius: "var(--radius-full)",
      }}
    >
      <span
        className="flex items-center box-border overflow-hidden"
        style={{
          padding: "var(--space-1)",
          width: 88,
          height: 88,
          background:
            "linear-gradient(135deg, var(--color-bg-secondary) 20%, var(--color-accent-gray-2) 80%)",
          boxShadow: "inset 2px 2px 4px 2px rgba(13, 14, 15, 0.9)",
          borderRadius: "var(--radius-full)",
        }}
      >
        <span
          className="relative flex-none"
          style={{ width: 80, height: 80 }}
        >
          {dots.map((p, i) => (
            <Dot key={`${p.x}-${p.y}-${i}`} left={p.x} top={p.y} />
          ))}
        </span>
      </span>
    </span>
  );
}
