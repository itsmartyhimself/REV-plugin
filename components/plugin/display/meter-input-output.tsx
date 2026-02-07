import * as React from "react";
import { useMemo } from "react";

interface DotProps {
  on: boolean;
}

function Dot({ on }: DotProps) {
  return (
    <span
      className="flex-none"
      style={{
        width: "var(--space-1)",
        height: "var(--space-1)",
        borderRadius: "var(--radius-full)",
        background: on
          ? "var(--color-white)"
          : "var(--color-heather-100)",
      }}
    />
  );
}

interface DBBarProps {
  dots: Array<{ leftOn: boolean; rightOn: boolean }>;
}

function DBBar({ dots }: DBBarProps) {
  return (
    <span
      className="flex flex-row items-center flex-none"
      style={{
        gap: "var(--space-0)",
        width: 10,
        height: 46,
      }}
    >
      {/* Left column */}
      <span
        className="flex flex-col items-start flex-none"
        style={{
          gap: "var(--space-0)",
          width: "var(--space-1)",
          height: 46,
        }}
      >
        {dots.map((d, i) => (
          <Dot key={`L-${i}`} on={d.leftOn} />
        ))}
      </span>

      {/* Right column */}
      <span
        className="flex flex-col items-start flex-none"
        style={{
          gap: "var(--space-0)",
          width: "var(--space-1)",
          height: 46,
        }}
      >
        {dots.map((d, i) => (
          <Dot key={`R-${i}`} on={d.rightOn} />
        ))}
      </span>
    </span>
  );
}

interface VerticalLabelProps {
  text: string;
}

function VerticalLabel({ text }: VerticalLabelProps) {
  return (
    <span
      className="type-3 flex items-center justify-end flex-none"
      style={{
        width: 12,
        height: 46,
        color: "var(--color-copy-secondary)",
        writingMode: "vertical-rl",
        textOrientation: "mixed",
      }}
    >
      {text}
    </span>
  );
}

interface ValueTextProps {
  text: string;
}

function ValueText({ text }: ValueTextProps) {
  return (
    <span
      className="type-2 flex-none"
      style={{
        lineHeight: 1,
        textAlign: "center",
        color: "var(--color-copy-secondary)",
      }}
    >
      {text}
    </span>
  );
}

interface FullColumnProps {
  dots: Array<{ leftOn: boolean; rightOn: boolean }>;
  label: string;
  value: string;
}

function FullColumn({ dots, label, value }: FullColumnProps) {
  return (
    <div
      className="flex flex-col items-center"
      style={{
        padding: 0,
        gap: "var(--space-2)",
      }}
    >
      {/* Meter row: DB bar + rotated label */}
      <div
        className="flex flex-row items-end"
        style={{
          padding: 0,
          gap: "var(--space-0)",
        }}
      >
        <DBBar dots={dots} />
        <VerticalLabel text={label} />
      </div>

      <ValueText text={value} />
    </div>
  );
}

export interface MeterInputOutputProps {
  inputValueText?: string;
  outputValueText?: string;
  inputLabel?: string;
  outputLabel?: string;
  // 0..8 (top-to-bottom in your Figma stacks)
  inputLeftLit?: number;
  inputRightLit?: number;
  outputLeftLit?: number;
  outputRightLit?: number;
}

export function MeterInputOutput({
  inputValueText = "-0.6",
  outputValueText = "-3",
  inputLabel = "Input",
  outputLabel = "Output",
  inputLeftLit = 5,
  inputRightLit = 7,
  outputLeftLit = 5,
  outputRightLit = 7,
}: MeterInputOutputProps) {
  const clampDots = (n: number) => Math.max(0, Math.min(8, n));

  const meter = (leftLit: number, rightLit: number) => {
    const L = clampDots(leftLit);
    const R = clampDots(rightLit);

    // Figma order is top -> bottom. We'll render top->bottom.
    const dots = Array.from({ length: 8 }, (_, i) => {
      const litIndexFromBottom = 7 - i; // bottom is "more lit"
      return {
        leftOn: litIndexFromBottom < L,
        rightOn: litIndexFromBottom < R,
      };
    });

    return dots;
  };

  const inputDots = useMemo(
    () => meter(inputLeftLit, inputRightLit),
    [inputLeftLit, inputRightLit]
  );
  const outputDots = useMemo(
    () => meter(outputLeftLit, outputRightLit),
    [outputLeftLit, outputRightLit]
  );

  return (
    <div
      className="flex flex-row"
      style={{
        padding: 0,
        gap: "var(--space-3)",
      }}
    >
      <FullColumn dots={inputDots} label={inputLabel} value={inputValueText} />
      <FullColumn
        dots={outputDots}
        label={outputLabel}
        value={outputValueText}
      />
    </div>
  );
}
