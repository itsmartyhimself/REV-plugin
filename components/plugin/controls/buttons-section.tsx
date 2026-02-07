"use client";

import * as React from "react";
import { ButtonFlatSquare } from "./button-flat-square";
import { FourWayToggle, FourWayToggleValue } from "./four-way-toggle";
import { BypassIcon, ChorusIcon, ReverseIcon, GateIcon } from "../icons";

export interface ButtonsSectionProps {
  onButtonClick?: (buttonId: string) => void;
  toggleValue?: FourWayToggleValue;
  onToggleValueChange?: (value: FourWayToggleValue) => void;
}

export function ButtonsSection({ 
  onButtonClick,
  toggleValue,
  onToggleValueChange,
}: ButtonsSectionProps) {
  return (
    <div
      className="flex flex-row items-end self-stretch"
      style={{
        paddingLeft: 160,
        paddingRight: 160,
        gap: "var(--space-5)",
      }}
    >
      {/* Bypass */}
      <div
        className="flex flex-col items-center"
        style={{
          flex: "1 1 0%",
          gap: "var(--space-3)",
        }}
      >
        <ButtonFlatSquare
          ariaLabel="Bypass"
          onClick={() => onButtonClick?.("bypass")}
        >
          <BypassIcon />
        </ButtonFlatSquare>
        <span
          className="type-3 text-trim"
          style={{
            color: "var(--color-copy-secondary)",
          }}
        >
          Bypass
        </span>
      </div>

      {/* Chorus - dark button */}
      <div
        className="flex flex-col items-center"
        style={{
          flex: "1 1 0%",
          gap: "var(--space-3)",
        }}
      >
        <ButtonFlatSquare
          ariaLabel="Chorus"
          onClick={() => onButtonClick?.("chorus")}
        >
          <ChorusIcon />
        </ButtonFlatSquare>
        <span
          className="type-3 text-trim"
          style={{
            color: "var(--color-copy-secondary)",
          }}
        >
          Chorus
        </span>
      </div>

      {/* Filter - toggle */}
      <div
        className="flex flex-col items-center"
        style={{
          flex: "0 0 auto",
          gap: "var(--space-3)",
        }}
      >
        <FourWayToggle 
          value={toggleValue}
          onValueChange={onToggleValueChange}
        />
        <span
          className="type-3 text-trim"
          style={{
            color: "var(--color-copy-secondary)",
          }}
        >
          Filter
        </span>
      </div>

      {/* Reverse - dark button */}
      <div
        className="flex flex-col items-center"
        style={{
          flex: "1 1 0%",
          gap: "var(--space-3)",
        }}
      >
        <ButtonFlatSquare
          ariaLabel="Reverse"
          onClick={() => onButtonClick?.("reverse")}
        >
          <ReverseIcon />
        </ButtonFlatSquare>
        <span
          className="type-3 text-trim"
          style={{
            color: "var(--color-copy-secondary)",
          }}
        >
          Reverse
        </span>
      </div>

      {/* Gate - dark button */}
      <div
        className="flex flex-col items-center"
        style={{
          flex: "1 1 0%",
          gap: "var(--space-3)",
        }}
      >
        <ButtonFlatSquare
          ariaLabel="Gate"
          onClick={() => onButtonClick?.("gate")}
        >
          <GateIcon />
        </ButtonFlatSquare>
        <span
          className="type-3 text-trim"
          style={{
            color: "var(--color-copy-secondary)",
          }}
        >
          Gate
        </span>
      </div>
    </div>
  );
}
