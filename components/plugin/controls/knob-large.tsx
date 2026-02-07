"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface KnobLargeProps {
  defaultAngle?: number;
  ariaLabel?: string;
  onValueChange?: (angle: number) => void;
  className?: string;
}

// Constants for knob behavior
const MIN_ANGLE = -135;
const MAX_ANGLE = 135;
const SENSITIVITY_NORMAL = 1.5;
const SENSITIVITY_FINE = 0.3;

// Clamp value between min and max
const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const KnobLarge = React.forwardRef<HTMLDivElement, KnobLargeProps>(
  (
    {
      defaultAngle = 0,
      ariaLabel = "Knob",
      className,
      onValueChange,
    },
    ref
  ) => {
    const [angle, setAngle] = React.useState(defaultAngle);
    const [isDragging, setIsDragging] = React.useState(false);
    const dragStartY = React.useRef<number>(0);
    const dragStartAngle = React.useRef<number>(0);

    // Handle pointer down to start drag
    const handlePointerDown = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsDragging(true);
        dragStartY.current = event.clientY;
        dragStartAngle.current = angle;
      },
      [angle]
    );

    // Handle pointer move during drag
    const handlePointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement>) => {
        if (!isDragging) return;

        // Calculate vertical movement delta (inverted: up = positive)
        const deltaY = dragStartY.current - event.clientY;

        // Check for fine control modifier key (Cmd/Meta only)
        const isFineControl = event.metaKey;
        const sensitivity = isFineControl
          ? SENSITIVITY_FINE
          : SENSITIVITY_NORMAL;

        // Convert vertical pixels to rotation degrees
        const angleChange = deltaY * sensitivity;

        // Calculate new angle from start position
        const newAngle = dragStartAngle.current + angleChange;

        // Clamp to range
        const clampedAngle = clamp(newAngle, MIN_ANGLE, MAX_ANGLE);

        setAngle(clampedAngle);
        onValueChange?.(clampedAngle);
      },
      [isDragging, onValueChange]
    );

    // Handle pointer up to end drag
    const handlePointerUp = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement>) => {
        event.currentTarget.releasePointerCapture(event.pointerId);
        setIsDragging(false);
      },
      []
    );

    // Global backup listener for pointer release outside component
    React.useEffect(() => {
      if (!isDragging) return;

      const handleGlobalPointerUp = () => setIsDragging(false);

      window.addEventListener("pointerup", handleGlobalPointerUp);
      window.addEventListener("pointercancel", handleGlobalPointerUp);

      return () => {
        window.removeEventListener("pointerup", handleGlobalPointerUp);
        window.removeEventListener("pointercancel", handleGlobalPointerUp);
      };
    }, [isDragging]);

    return (
      <div
        ref={ref}
        className={cn("inline-block", className)}
      >
        {/* Outer shell (stable 80x80 footprint) - visual only */}
        <div
          className="flex justify-center items-center relative box-border"
          style={{
            padding: "var(--space-4)",
            width: "100%",
            height: 80,
            background:
              "linear-gradient(135deg, var(--color-accent-gray-2) 40%, var(--color-bg-secondary) 80%)",
            border: "1px solid var(--color-heather-100)",
            borderRadius: "var(--radius-full)",
          }}
        >
          {/* Rotating knob - interactive element */}
          <motion.button
            type="button"
            aria-label={ariaLabel}
            aria-valuemin={MIN_ANGLE}
            aria-valuemax={MAX_ANGLE}
            aria-valuenow={Math.round(angle)}
            role="slider"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={() => {
              setAngle(0);
              onValueChange?.(0);
            }}
            animate={{ rotate: angle }}
            transition={
              isDragging
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                    mass: 0.4,
                  }
            }
            className={cn(
              "relative box-border appearance-none border-none p-0 bg-transparent rounded-none shadow-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            style={{
              width: 48,
              height: 48,
              background:
                "linear-gradient(135deg, var(--color-accent-gray-2) 40%, var(--color-bg-secondary) 80%)",
              border: "1px solid #4A4B4D",
              borderRadius: "var(--radius-full)",
              boxShadow: "0px 0px 6px 6px rgba(13, 14, 15, 0.8)",
              transformOrigin: "50% 50%",
              touchAction: "none",
            }}
          >
            {/* Indicator at 12 o'clock; rotates automatically with knob */}
            <span
              className="absolute"
              style={{
                top: "var(--space-1-5)",
                left: "50%",
                transform: "translateX(-50%)",
                width: "var(--space-1)",
                height: "var(--space-2)",
                background: "var(--color-copy-secondary)",
                borderRadius: "0px 0px var(--radius-0) var(--radius-0)",
              }}
            />
          </motion.button>
        </div>
      </div>
    );
  }
);

KnobLarge.displayName = "KnobLarge";

export { KnobLarge };
