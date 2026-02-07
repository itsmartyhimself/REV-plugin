"use client";

import * as React from "react";
import { KnobLarge } from "./knob-large";
import { KnobSmall } from "./knob-small";

export interface KnobsSectionProps {
  onValueChange?: (knobId: string, angle: number) => void;
}

export function KnobsSection({ onValueChange }: KnobsSectionProps) {
  return (
    <div
      className="flex flex-row items-end self-stretch"
      style={{
        paddingLeft: "var(--space-7)",
        paddingRight: "var(--space-7)",
        gap: "var(--space-8)",
      }}
    >
      {/* Left column (1fr): Signal */}
      <div
        className="flex flex-col items-center"
        style={{
          flex: "1 1 0%",
          gap: "var(--space-3)",
        }}
      >
        <KnobSmall
          ariaLabel="Signal"
          onValueChange={(angle) => onValueChange?.("signal", angle)}
        />
        <span
          className="type-3 text-trim"
          style={{
            color: "var(--color-copy-secondary)",
          }}
        >
          Signal
        </span>
      </div>

      {/* Center column (3fr): Delay, Decay, Spread */}
      <div
        className="flex flex-row justify-center items-center"
        style={{
          flex: "3 1 0%",
        }}
      >
        {/* Delay small knob */}
        <div
          className="flex flex-col items-center"
          style={{
            gap: "var(--space-3)",
            width: "100%",
            height: "100%",
          }}
        >
          <KnobSmall
            ariaLabel="Delay"
            onValueChange={(angle) => onValueChange?.("delay", angle)}
          />
          <span
            className="type-3 text-trim"
            style={{
              color: "var(--color-copy-secondary)",
            }}
          >
            Delay
          </span>
        </div>

        {/* Decay large knob */}
        <div
          className="flex flex-col items-center"
          style={{
            gap: "var(--space-3)",
            width: "100%",
          }}
        >
          <KnobLarge
            ariaLabel="Decay"
            onValueChange={(angle) => onValueChange?.("decay", angle)}
          />
          <span
            className="type-3 text-trim"
            style={{
              color: "var(--color-copy-secondary)",
            }}
          >
            Decay
          </span>
        </div>

        {/* Spread small knob */}
        <div
          className="flex flex-col items-center"
          style={{
            gap: "var(--space-3)",
            width: "100%",
          }}
        >
          <KnobSmall
            ariaLabel="Spread"
            onValueChange={(angle) => onValueChange?.("spread", angle)}
          />
          <span
            className="type-3 text-trim"
            style={{
              color: "var(--color-copy-secondary)",
            }}
          >
            Spread
          </span>
        </div>
      </div>

      {/* Right column (1fr): Shimmer */}
      <div
        className="flex flex-col items-center"
        style={{
          flex: "1 1 0%",
          gap: "var(--space-3)",
        }}
      >
        <KnobSmall
          ariaLabel="Shimmer"
          onValueChange={(angle) => onValueChange?.("shimmer", angle)}
        />
        <span
          className="type-3 text-trim"
          style={{
            color: "var(--color-copy-secondary)",
          }}
        >
          Shimmer
        </span>
      </div>
    </div>
  );
}
