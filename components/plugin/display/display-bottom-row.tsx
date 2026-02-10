import * as React from "react";
import { MeterInputOutput, MeterInputOutputProps } from "./meter-input-output";

export interface DisplayBottomRowProps {
  versionText?: string;
  meterProps?: MeterInputOutputProps;
}

export function DisplayBottomRow({
  versionText = "Untitled REV 2026 v.01",
  meterProps,
}: DisplayBottomRowProps) {
  return (
    <div
      className="flex flex-row justify-between items-end self-stretch"
      style={{
        padding: 0,
        flexShrink: 0,
      }}
    >
      {/* Left side: version text */}
      <span
        className="type-3"
        style={{
          fontFamily: "var(--font-mono)",
          lineHeight: 1,
          color: "var(--color-copy-secondary)",
          flexShrink: 0,
        }}
      >
        {versionText}
      </span>
      {/* Meter: right-aligned */}
      <MeterInputOutput {...meterProps} />
    </div>
  );
}
