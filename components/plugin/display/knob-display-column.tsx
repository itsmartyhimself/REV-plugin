import * as React from "react";

export interface KnobDisplayItem {
  label: string;
  value: string;
}

export interface KnobDisplayColumnProps {
  items?: KnobDisplayItem[];
}

const defaultItems: KnobDisplayItem[] = [
  { label: "Signal", value: "50%" },
  { label: "Delay", value: "80ms" },
  { label: "Decay", value: "4.2s" },
  { label: "Spread", value: "∅" },
  { label: "Shimmer", value: "0.510" },
];

function KnobDisplayRow({ label, value }: KnobDisplayItem) {
  const formattedValue =
    label === "Spread"
      ? value === "0%"
        ? "Center"
        : value === "200%"
          ? "Wide"
          : value
      : value;

  return (
    <div
      className="flex flex-row items-center self-stretch"
      style={{
        padding: 0,
        height: 10,
      }}
    >
      {/* Label: 2fr, Geist Sans */}
      <span
        className="type-4"
        style={{
          flex: 2,
          lineHeight: 1,
          color: "var(--color-copy-secondary)",
          textAlign: "left",
        }}
      >
        {label}
      </span>
      {/* Value: 1fr, Geist Mono */}
      <span
        className="type-4"
        style={{
          flex: 1,
          lineHeight: 1,
          fontFamily: "var(--font-mono)",
          color: "var(--color-copy-secondary)",
          textAlign: "left",
        }}
      >
        {formattedValue}
      </span>
    </div>
  );
}

export function KnobDisplayColumn({
  items = defaultItems,
}: KnobDisplayColumnProps) {
  return (
    <div
      className="flex flex-col items-start"
      style={{
        padding: 0,
        gap: "var(--space-3)",
        flex: 1,
      }}
    >
      {items.map((item, index) => (
        <KnobDisplayRow key={index} label={item.label} value={item.value} />
      ))}
    </div>
  );
}
