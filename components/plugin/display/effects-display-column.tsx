import * as React from "react";
import { EffectStatus } from "./effect-status";
import { BypassIcon, ChorusIcon, ReverseIcon, GateIcon } from "../icons";

export interface EffectButtonStates {
  bypass: boolean;
  chorus: boolean;
  reverse: boolean;
  gate: boolean;
}

export interface EffectsDisplayColumnProps {
  buttonStates?: EffectButtonStates;
}

// Default: all inactive
const defaultButtonStates: EffectButtonStates = {
  bypass: false,
  chorus: false,
  reverse: false,
  gate: false,
};

export function EffectsDisplayColumn({
  buttonStates = defaultButtonStates,
}: EffectsDisplayColumnProps) {
  // Layout mapping:
  // Left column: top = chorus (index 0), bottom = bypass (index 1)
  // Right column: top = reverse (index 2), bottom = gate (index 3)
  
  return (
    <div
      className="flex flex-row justify-center items-center"
      style={{
        padding: 0,
        gap: "var(--space-1)",
        flex: 1,
      }}
    >
      {/* Left column */}
      <div
        className="flex flex-col items-start"
        style={{
          padding: 0,
          gap: "var(--space-1)",
        }}
      >
        {/* Left top = Chorus */}
        <EffectStatus active={buttonStates.chorus}>
          <ChorusIcon />
        </EffectStatus>
        {/* Left bottom = Bypass */}
        <EffectStatus active={buttonStates.bypass}>
          <BypassIcon />
        </EffectStatus>
      </div>
      {/* Right column */}
      <div
        className="flex flex-col items-start"
        style={{
          padding: 0,
          gap: "var(--space-1)",
        }}
      >
        {/* Right top = Reverse */}
        <EffectStatus active={buttonStates.reverse}>
          <ReverseIcon />
        </EffectStatus>
        {/* Right bottom = Gate */}
        <EffectStatus active={buttonStates.gate}>
          <GateIcon />
        </EffectStatus>
      </div>
    </div>
  );
}
