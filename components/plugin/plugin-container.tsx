"use client";

import * as React from "react";
import { KnobsSection } from "./controls/knobs-section";
import { ButtonsSection } from "./controls/buttons-section";
import { FourWayToggleValue } from "./controls/four-way-toggle";
import { BottomSection } from "./controls/bottom-section";

export interface PluginContainerProps {
  children?: React.ReactNode;
  onKnobValueChange?: (knobId: string, angle: number) => void;
  onButtonClick?: (buttonId: string) => void;
  toggleValue?: FourWayToggleValue;
  onToggleValueChange?: (value: FourWayToggleValue) => void;
  onSelectPreset?: (presetId: string) => void;
  defaultPreset?: string;
}

export function PluginContainer({ 
  children,
  onKnobValueChange,
  onButtonClick,
  toggleValue,
  onToggleValueChange,
  onSelectPreset,
  defaultPreset,
}: PluginContainerProps) {
  const [isPresetSelectorOpen, setIsPresetSelectorOpen] = React.useState(false);

  return (
    <div
      className="flex flex-col items-center relative"
      style={{
        padding: "var(--space-4)",
        justifyContent: "space-between",
        width: 800,
        minWidth: 800,
        maxWidth: 800,
        height: 600,
        minHeight: 600,
        maxHeight: 600,
        background:
          "linear-gradient(180deg, var(--color-accent-gray-1) 0%, var(--color-bg-tertiary) 50%, var(--color-bg-secondary) 100%)",
        borderRadius: "var(--radius-3)",
      }}
    >
      {/* Backdrop overlay - confined to container, shown when preset selector is open */}
      {isPresetSelectorOpen && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 30,
            backgroundColor: "rgba(13, 14, 15, 0.2)",
            pointerEvents: "none",
            borderRadius: "var(--radius-3)",
          }}
        />
      )}

      {/* Top Display */}
      {children}

      {/* Knobs Section */}
      <KnobsSection onValueChange={onKnobValueChange} />

      {/* Buttons Section */}
      <ButtonsSection 
        onButtonClick={onButtonClick}
        toggleValue={toggleValue}
        onToggleValueChange={onToggleValueChange}
      />

      {/* Bottom Section: Speakers + Preset Selector */}
      <BottomSection
        onSelectPreset={onSelectPreset}
        defaultPreset={defaultPreset}
        onPresetSelectorOpenChange={setIsPresetSelectorOpen}
      />
    </div>
  );
}
