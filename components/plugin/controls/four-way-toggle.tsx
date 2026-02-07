"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type FourWayToggleValue = "" | "none" | "h" | "l" | "b";

export interface FourWayToggleProps {
  value?: FourWayToggleValue;
  defaultValue?: FourWayToggleValue;
  onValueChange?: (value: FourWayToggleValue) => void;
  className?: string;
  "aria-label"?: string;
  /**
   * Unique layoutId for independent animation when rendering multiple instances.
   * Defaults to "four-way-toggle-active".
   */
  layoutId?: string;
}

const ITEMS: Array<{
  value: Exclude<FourWayToggleValue, "">;
  label: string;
  ariaLabel: string;
  isMono?: boolean;
}> = [
  { value: "none", label: "∅", ariaLabel: "Set mode to none", isMono: true },
  { value: "h", label: "H", ariaLabel: "Set mode to H" },
  { value: "l", label: "L", ariaLabel: "Set mode to L" },
  { value: "b", label: "B", ariaLabel: "Set mode to B" },
];

export function FourWayToggle({
  value,
  defaultValue = "none",
  onValueChange,
  className,
  layoutId = "four-way-toggle-active",
  "aria-label": ariaLabel = "Four way toggle",
}: FourWayToggleProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<FourWayToggleValue>(defaultValue);

  const currentValue = isControlled ? value : uncontrolledValue;

  const handleValueChange = (next: string) => {
    // Radix ToggleGroup (single) can emit "" when deselecting
    let safe = (next ?? "") as FourWayToggleValue;

    // If Radix deselects (returns ""), reset to "none"
    if (safe === "") {
      safe = "none";
    }

    // If user clicks the same active item (and it's not "none"), reset to "none"
    if (safe === currentValue && currentValue !== "none") {
      safe = "none";
    }

    if (!isControlled) setUncontrolledValue(safe);
    onValueChange?.(safe);
  };

  // Ensure ToggleGroup always receives a valid value (never "")
  const safeCurrentValue = currentValue === "" ? "none" : currentValue;

  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={safeCurrentValue}
      onValueChange={handleValueChange}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center",
        "p-[var(--space-0)] gap-[var(--space-0)]",
        "bg-[var(--color-bg-primary)] rounded-[var(--radius-2)]",
        className
      )}
    >
      {ITEMS.map((item) => {
        const isOn = currentValue === item.value;

        return (
          <ToggleGroupPrimitive.Item key={item.value} value={item.value} asChild>
            <motion.button
              type="button"
              aria-label={item.ariaLabel}
              // Press feedback (scale down on press, not hover)
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                duration: 0.25,
              }}
              className={cn(
                "group relative grid place-items-center",
                "w-[26px] h-[26px] min-w-[26px] min-h-[26px]",
                "rounded-[var(--radius-2)]",
                "outline-none select-none cursor-pointer",
                // Default: transparent background
                "bg-transparent",
                "text-[var(--color-copy-secondary)]",
                // Hover: background changes to tertiary
                "hover:bg-[var(--color-bg-tertiary)]",
                // Active: no background override (active indicator shows instead)
                "data-[state=on]:bg-transparent data-[state=on]:hover:bg-transparent"
              )}
            >
              {/* Active indicator: travels between items using layoutId */}
              {isOn && (
                <motion.div
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-[var(--radius-2)] bg-[var(--color-accent-gray-2)]"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    duration: 0.25,
                  }}
                />
              )}

              {/* Label text */}
              <span
                className={cn(
                  "relative z-10 type-4 text-trim",
                  // Hover dims text to 60%, active overrides back to 100%
                  "group-hover:opacity-60 group-data-[state=on]:opacity-100",
                  item.isMono ? "font-mono" : ""
                )}
              >
                {item.label}
              </span>
            </motion.button>
          </ToggleGroupPrimitive.Item>
        );
      })}
    </ToggleGroupPrimitive.Root>
  );
}
