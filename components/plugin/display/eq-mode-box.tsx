"use client";

import * as React from "react";
import { motion } from "framer-motion";

export interface EQModeBoxProps {
  variant?: "disabled" | "highCut" | "lowCut" | "bandPass";
  active?: boolean;
  /** Unique layoutId for animated active indicator. If provided, uses motion animation. */
  layoutId?: string;
}

export function EQModeBox({
  variant = "disabled",
  active = false,
  layoutId,
}: EQModeBoxProps) {

  const bandBase: React.CSSProperties = {
    boxSizing: "border-box",
    height: 20,
    background:
      "linear-gradient(180deg, var(--color-heather-200) 0%, var(--color-accent-gray-1) 100%)",
    borderStyle: "solid",
    borderColor: "var(--color-heather-200)",
  };

  const HighCutBand = (
    <span
      style={{
        ...bandBase,
        width: 20,
        borderWidth: "0.5px 0.5px 0px 0px", // top right only
        borderRadius: "0px 40px 0px 0px",
      }}
    />
  );

  const LowCutBand = (
    <span
      style={{
        ...bandBase,
        width: 20,
        borderWidth: "0.5px 0px 0px 0.5px", // top left only
        borderRadius: "40px 0px 0px 0px",
      }}
    />
  );

  const BandPassRight = (
    <span
      style={{
        ...bandBase,
        width: 10,
        borderWidth: "0.5px 0.5px 0px 0px", // top right only
        borderRadius: "0px 40px 0px 0px",
      }}
    />
  );

  const BandPassLeft = (
    <span
      style={{
        ...bandBase,
        width: 10,
        borderWidth: "0.5px 0px 0px 0.5px", // top left only
        borderRadius: "40px 0px 0px 0px",
      }}
    />
  );

  const framePadding =
    variant === "highCut"
      ? "0px var(--space-2) 0px 0px"
      : variant === "lowCut"
      ? "0px 0px 0px var(--space-2)"
      : "0px";

  const frameChildren =
    variant === "highCut"
      ? HighCutBand
      : variant === "lowCut"
      ? LowCutBand
      : variant === "bandPass"
      ? (
          <>
            {BandPassRight}
            {BandPassLeft}
          </>
        )
      : null;

  return (
    <span
      className="flex flex-col justify-end items-center relative box-border"
      style={{
        padding: "var(--space-2) 0px 0px",
        width: 28,
        height: 28,
        minWidth: 28,
        maxWidth: 28,
        minHeight: 28,
        maxHeight: 28,
        background: "var(--color-dark-lightest)",
        border: "1px solid transparent",
        overflow: "hidden",
      }}
    >
      {/* Animated active border indicator */}
      {active && layoutId && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 pointer-events-none"
          style={{
            border: "1px solid var(--color-copy-primary)",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 35,
            bounce: 0,
            duration: 0.25,
          }}
        />
      )}
      {/* Static border when no layoutId (fallback) */}
      {active && !layoutId && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            border: "1px solid var(--color-copy-primary)",
          }}
        />
      )}
      {/* EQ Frame */}
      <span
        className="flex flex-row items-end box-border"
        style={{
          gap: "var(--space-2)",
          width: 28,
          height: 20,
          padding: framePadding,
          background:
            "linear-gradient(180deg, var(--color-heather-100) 0%, var(--color-accent-gray-2) 100%)",
          borderTop: "1px solid var(--color-heather-200)",
        }}
      >
        {frameChildren}
      </span>
    </span>
  );
}
