import * as React from "react";
import { EQModeBox } from "./eq-mode-box";

type EQVariant = "disabled" | "highCut" | "lowCut" | "bandPass";

// Toggle value to EQ variant mapping
type ToggleValue = "none" | "h" | "l" | "b" | "";

export interface EQDisplayItem {
  variant: EQVariant;
  label: string;
  active?: boolean;
}

export interface EQDisplayColumnProps {
  items?: EQDisplayItem[];
  activeVariant?: EQVariant;
  /** Toggle value from FourWayToggle (none, h, l, b) - maps to EQ variant */
  toggleValue?: ToggleValue;
}

const defaultItems: EQDisplayItem[] = [
  { variant: "disabled", label: "Disabled" },
  { variant: "highCut", label: "High-cut" },
  { variant: "lowCut", label: "Low-cut" },
  { variant: "bandPass", label: "Band-pass" },
];

// Map toggle values to EQ variants
function toggleToVariant(toggle: ToggleValue): EQVariant {
  switch (toggle) {
    case "h":
      return "highCut";
    case "l":
      return "lowCut";
    case "b":
      return "bandPass";
    case "none":
    case "":
    default:
      return "disabled";
  }
}

interface EQItemWithLabelProps {
  variant: EQVariant;
  label: string;
  active: boolean;
  layoutId: string;
}

function EQItemWithLabel({ variant, label, active, layoutId }: EQItemWithLabelProps) {
  return (
    <div
      className="flex flex-col items-center"
      style={{
        padding: 0,
        gap: "var(--space-3)",
        flex: 1,
      }}
    >
      <EQModeBox variant={variant} active={active} layoutId={layoutId} />
      <span
        className="type-2 text-trim text-center self-stretch"
        style={{
          color: active
            ? "var(--color-copy-secondary)"
            : "rgba(214, 216, 219, 0.5)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function EQDisplayColumn({
  items = defaultItems,
  activeVariant,
  toggleValue = "none",
}: EQDisplayColumnProps) {
  // Determine which variant is active - toggle value takes precedence
  const computedActiveVariant = activeVariant ?? toggleToVariant(toggleValue);

  return (
    <div
      className="flex flex-row items-start"
      style={{
        padding: 0,
        gap: "var(--space-2)",
        flex: 1,
      }}
    >
      {items.map((item, index) => (
        <EQItemWithLabel
          key={index}
          variant={item.variant}
          label={item.label}
          active={item.variant === computedActiveVariant}
          layoutId="eq-display-active-indicator"
        />
      ))}
    </div>
  );
}
