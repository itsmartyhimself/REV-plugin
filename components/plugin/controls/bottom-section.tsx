"use client";

import * as React from "react";
import { SpeakerOutput } from "../display/speaker-output";
import { PresetSelector } from "./preset-selector";

export interface BottomSectionProps {
  onSelectPreset?: (presetId: string) => void;
  defaultPreset?: string;
  onPresetSelectorOpenChange?: (open: boolean) => void;
}

export function BottomSection({ 
  onSelectPreset, 
  defaultPreset,
  onPresetSelectorOpenChange 
}: BottomSectionProps) {
  return (
    <div
      className="flex flex-row justify-between items-end self-stretch"
      style={{
        height: 96,
        minHeight: 96,
        maxHeight: 96,
        position: "relative",
        zIndex: 40,
      }}
    >
      {/* Left speaker output */}
      <SpeakerOutput />

      {/* Center preset selector - Portal renders outside DOM hierarchy so no z-index wrapper needed */}
      <PresetSelector
        onSelectPreset={onSelectPreset}
        defaultPreset={defaultPreset}
        onOpenChange={onPresetSelectorOpenChange}
      />

      {/* Right speaker output */}
      <SpeakerOutput />
    </div>
  );
}
