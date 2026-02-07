"use client";

import { useState, useMemo } from "react";
import { PluginContainer } from "@/components/plugin/plugin-container";
import { TopDisplay } from "@/components/plugin/display/top-display";
import { KnobDisplayColumn, KnobDisplayItem } from "@/components/plugin/display/knob-display-column";
import { EffectsDisplayColumn, EffectButtonStates } from "@/components/plugin/display/effects-display-column";
import { EQDisplayColumn } from "@/components/plugin/display/eq-display-column";
import { DisplayBottomRow } from "@/components/plugin/display/display-bottom-row";
import { FourWayToggleValue } from "@/components/plugin/controls/four-way-toggle";

// Knob angle range constants
const MIN_ANGLE = -135;
const MAX_ANGLE = 135;
const ANGLE_RANGE = MAX_ANGLE - MIN_ANGLE; // 270

// Helper to normalize angle to 0-1 range
function normalizeAngle(angle: number): number {
  return (angle - MIN_ANGLE) / ANGLE_RANGE;
}

// Format signal value (0-100%)
function formatSignal(angle: number): string {
  const percent = Math.round(normalizeAngle(angle) * 100);
  return `${percent}%`;
}

// Format delay value (0-250ms)
function formatDelay(angle: number): string {
  const ms = Math.round(normalizeAngle(angle) * 250);
  return `${ms}ms`;
}

// Format decay value (0.1s - 20s, logarithmic scale)
function formatDecay(angle: number): string {
  const normalized = normalizeAngle(angle);
  // Logarithmic scale: 0.1s to 20s
  const minLog = Math.log10(0.1);
  const maxLog = Math.log10(20);
  const seconds = Math.pow(10, minLog + normalized * (maxLog - minLog));
  
  if (seconds < 1) {
    return `${Math.round(seconds * 100) / 100}s`;
  }
  return `${Math.round(seconds * 10) / 10}s`;
}

// Format spread value (center = null, left = narrow, right = wide)
function formatSpread(angle: number): string {
  // Dead zone around center (-10 to +10 degrees)
  if (angle >= -10 && angle <= 10) {
    return "∅";
  }
  
  // Left of center = narrow stereo
  if (angle < -10) {
    const normalized = (angle - MIN_ANGLE) / (-10 - MIN_ANGLE);
    const percent = Math.round(normalized * 100);
    return `${percent}%`;
  }
  
  // Right of center = wide stereo
  const normalized = (angle - 10) / (MAX_ANGLE - 10);
  const percent = Math.round(100 + normalized * 100);
  return `${percent}%`;
}

// Format shimmer value (0.000 - 1.000)
function formatShimmer(angle: number): string {
  const value = normalizeAngle(angle);
  return value.toFixed(3);
}

export default function Home() {
  // Knob angles state (default to center = 0 for most, 50% for signal)
  const [knobAngles, setKnobAngles] = useState({
    signal: 0,    // Center = 50%
    delay: 0,     // Center = ~80ms
    decay: 0,     // Center = ~2.5s
    spread: 0,    // Center = null
    shimmer: 0,   // Center = 0.5
  });

  // FourWayToggle state
  const [toggleValue, setToggleValue] = useState<FourWayToggleValue>("none");

  // Button states for effects (all inactive by default)
  const [buttonStates, setButtonStates] = useState<EffectButtonStates>({
    bypass: false,
    chorus: false,
    reverse: false,
    gate: false,
  });

  // Handle button clicks to toggle states
  const handleButtonClick = (buttonId: string) => {
    if (buttonId in buttonStates) {
      setButtonStates((prev) => ({
        ...prev,
        [buttonId]: !prev[buttonId as keyof EffectButtonStates],
      }));
    }
  };

  // Handle knob value changes
  const handleKnobValueChange = (knobId: string, angle: number) => {
    setKnobAngles((prev) => ({
      ...prev,
      [knobId]: angle,
    }));
  };

  // Compute display items from knob angles
  const displayItems: KnobDisplayItem[] = useMemo(() => [
    { label: "Signal", value: formatSignal(knobAngles.signal) },
    { label: "Delay", value: formatDelay(knobAngles.delay) },
    { label: "Decay", value: formatDecay(knobAngles.decay) },
    { label: "Spread", value: formatSpread(knobAngles.spread) },
    { label: "Shimmer", value: formatShimmer(knobAngles.shimmer) },
  ], [knobAngles]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-[var(--space-6)] bg-[#ECEDEF]">
      <PluginContainer 
        onKnobValueChange={handleKnobValueChange}
        onButtonClick={handleButtonClick}
        toggleValue={toggleValue}
        onToggleValueChange={setToggleValue}
      >
        <TopDisplay>
          {/* Top Items Row: 3 equal columns */}
          <div
            className="flex flex-row items-start self-stretch"
            style={{
              padding: 0,
            }}
          >
            <KnobDisplayColumn items={displayItems} />
            <EffectsDisplayColumn buttonStates={buttonStates} />
            <EQDisplayColumn toggleValue={toggleValue} />
          </div>
          {/* Bottom Items Row */}
          <DisplayBottomRow />
        </TopDisplay>
      </PluginContainer>
    </main>
  );
}
