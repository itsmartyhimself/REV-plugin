import * as React from "react";

function normalizeSvg(icon: React.ReactNode, color: string) {
  // Most common + least confusing SVG pattern:
  // - Icon uses `stroke="currentColor"` (and/or `fill="currentColor"` when needed)
  // - We set `color` on the wrapper so the SVG inherits it
  // - We force the svg to 16x16
  if (React.isValidElement(icon)) {
    type IconProps = { style?: React.CSSProperties; width?: string; height?: string; color?: string };
    return React.cloneElement(icon as React.ReactElement<IconProps>, {
      width: "100%",
      height: "100%",
      style: {
        display: "block",
        width: "100%",
        height: "100%",
        ...((icon.props as IconProps).style ?? {}),
      },
      // If the SVG is authored with currentColor, this will control stroke/fill.
      color,
    });
  }
  return icon;
}

export interface EffectStatusProps {
  active?: boolean;
  children?: React.ReactNode;
}

export function EffectStatus({ active = false, children }: EffectStatusProps) {
  const bg = active
    ? "var(--color-dark-lightest)"
    : "var(--color-accent-gray-2)";
  const iconColor = active
    ? "var(--color-copy-primary)"
    : "var(--color-heather-100)";

  const icon = normalizeSvg(children, iconColor);

  return (
    <span
      aria-hidden="true"
      className="flex justify-center items-center box-border"
      style={{
        padding: "var(--space-1)",
        width: 24,
        height: 24,
        minWidth: 24,
        maxWidth: 24,
        minHeight: 24,
        maxHeight: 24,
        background: bg,
        // key: makes currentColor work for the svg
        color: iconColor,
      }}
    >
      <span className="block" style={{ width: 16, height: 16 }}>
        {icon}
      </span>
    </span>
  );
}
