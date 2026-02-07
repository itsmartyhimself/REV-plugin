"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/animate-ui/animateui-tooltip";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Constants for pulse animation
// ─────────────────────────────────────────────────────────────────────────────

const PULSE_EASE = [0.39, 0.24, 0.3, 1] as const;
const PULSE_DUR_IDLE = 1.6;
const PULSE_DUR_HOVER = 2.2;

const pulseRingVariants = {
  idle: {
    scale: [1, 1.28, 1],
    opacity: [0.25, 0.06, 0.25],
    transition: { duration: PULSE_DUR_IDLE, ease: PULSE_EASE, repeat: Infinity },
  },
  hover: {
    scale: [1, 1.18, 1],
    opacity: [0.25, 0.08, 0.25],
    transition: { duration: PULSE_DUR_HOVER, ease: PULSE_EASE, repeat: Infinity },
  },
};

const pulseMidVariants = {
  idle: {
    scale: [1, 1.12, 1],
    opacity: [0.5, 0.28, 0.5],
    transition: {
      duration: PULSE_DUR_IDLE,
      ease: PULSE_EASE,
      repeat: Infinity,
      delay: 0.08,
    },
  },
  hover: {
    scale: [1, 1.08, 1],
    opacity: [0.5, 0.32, 0.5],
    transition: {
      duration: PULSE_DUR_HOVER,
      ease: PULSE_EASE,
      repeat: Infinity,
      delay: 0.08,
    },
  },
};

const pulseCoreVariants = {
  idle: {
    scale: [1, 1.05, 1],
    transition: {
      duration: PULSE_DUR_IDLE,
      ease: PULSE_EASE,
      repeat: Infinity,
      delay: 0.04,
    },
  },
  hover: {
    scale: [1, 1.03, 1],
    transition: {
      duration: PULSE_DUR_HOVER,
      ease: PULSE_EASE,
      repeat: Infinity,
      delay: 0.04,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PulseTrigger - The animated visual indicator (three concentric circles)
// ─────────────────────────────────────────────────────────────────────────────

export interface PulseTriggerProps {
  className?: string;
}

export const PulseTrigger = React.forwardRef<HTMLSpanElement, PulseTriggerProps>(
  ({ className }, ref) => {
    const reduce = useReducedMotion();

    if (reduce) {
      return (
        <span
          ref={ref}
          className={cn(
            "relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
            className
          )}
          aria-hidden
        >
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-heather-400) 25%, transparent)",
            }}
          />
          <span
            className="absolute h-4 w-4 rounded-full pointer-events-none"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-heather-400) 50%, transparent)",
            }}
          />
          <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-heather-400)] pointer-events-none" />
        </span>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(
          "relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
          className
        )}
        aria-hidden
      >
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-heather-400) 25%, transparent)",
          }}
          variants={pulseRingVariants}
        />
        <motion.span
          className="absolute h-4 w-4 rounded-full pointer-events-none"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-heather-400) 50%, transparent)",
          }}
          variants={pulseMidVariants}
        />
        <motion.span
          className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-heather-400)] pointer-events-none"
          variants={pulseCoreVariants}
        />
      </span>
    );
  }
);

PulseTrigger.displayName = "PulseTrigger";

// ─────────────────────────────────────────────────────────────────────────────
// PulseTooltip - Complete tooltip with pulse trigger
// ─────────────────────────────────────────────────────────────────────────────

export interface PulseTooltipProps {
  label: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const PulseTooltip = React.forwardRef<HTMLButtonElement, PulseTooltipProps>(
  ({ label, className, ariaLabel }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const reduce = useReducedMotion();

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            ref={ref}
            type="button"
            className={cn(
              "inline-flex w-8 h-8 items-center justify-center rounded-full",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-heather-400)]",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]",
              className
            )}
            aria-label={ariaLabel ?? (typeof label === "string" ? label : "Info")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            animate={reduce ? {} : isHovered ? "hover" : "idle"}
          >
            <PulseTrigger />
          </motion.button>
        </TooltipTrigger>

        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    );
  }
);

PulseTooltip.displayName = "PulseTooltip";

// ─────────────────────────────────────────────────────────────────────────────
// PulseTooltipGroup - Provider wrapper with optimized defaults for pulse tooltips
// ─────────────────────────────────────────────────────────────────────────────

export interface PulseTooltipGroupProps {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
}

export function PulseTooltipGroup({
  children,
  openDelay = 0,
  closeDelay = 180,
}: PulseTooltipGroupProps) {
  return (
    <TooltipProvider openDelay={openDelay} closeDelay={closeDelay}>
      {children}
    </TooltipProvider>
  );
}
