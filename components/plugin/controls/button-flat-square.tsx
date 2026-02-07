"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonFlatSquareProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode; // pass an SVG here
  ariaLabel?: string;
}

const ButtonFlatSquare = React.forwardRef<
  HTMLButtonElement,
  ButtonFlatSquareProps
>(({ children, ariaLabel = "Flat square button", className, onClick }, ref) => {
  const [isActive, setIsActive] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(!isActive);
    onClick?.(e);
  };

  return (
    // Button Holder (stable 44x44, 2px padding) - non-interactive wrapper
    <span
      className="flex justify-center items-center relative box-border"
      style={{
        padding: "var(--space-0)",
        width: 44,
        height: 44,
        background: "var(--color-bg-primary)",
        borderRadius: "var(--radius-0)",
      }}
    >
      {/* Flat Square Button Dark (40x40) - interactive button */}
      <motion.button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        onClick={handleClick}
        className={cn(
          // Reset button styles
          "appearance-none border-none p-0 m-0 bg-transparent cursor-pointer",
          // Remove default styles
          "h-auto w-auto rounded-none shadow-none",
          className
        )}
        style={{
          width: 40,
          height: 40,
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <span
          className="flex justify-center items-center relative box-border"
          style={{
            padding: "var(--space-2)",
            width: 40,
            height: 40,
            borderRadius: "var(--radius-2)",
            // Angular gradient with updated color stops from design
            background:
              "conic-gradient(from 180deg at 50% 50%, " +
              "var(--color-accent-gray-2) 10%, " +
              "var(--color-heather-100) 40%, " +
              "var(--color-bg-secondary) 60%, " +
              "var(--color-dark-lightest) 90%, " +
              "var(--color-accent-gray-2) 100%)",
          }}
        >
          {/* Press (24x24 with 4px padding) */}
          <span
            className="flex justify-center items-center box-border"
            style={{
              padding: "var(--space-1)",
              width: 24,
              height: 24,
              borderRadius: "var(--radius-2)",
              background:
                "linear-gradient(135deg, var(--color-accent-gray-1) 20%, var(--color-dark-lightest) 80%)",
              boxShadow:
                "0px 0px 4px 1px rgba(255, 255, 255, 0.1), inset 0px 1px 2px rgba(13, 14, 15, 0.9)",
            }}
          >
            {/* Icon slot locked to 16x16 - CSS constrains any child SVG */}
            <motion.span
              className="block flex-none [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
              style={{
                width: 16,
                height: 16,
              }}
              animate={{
                opacity: isActive ? 1 : 0.5,
                color: isActive ? "#ECEDEE" : "var(--color-heather-100)",
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {children}
            </motion.span>
          </span>
        </span>
      </motion.button>
    </span>
  );
});

ButtonFlatSquare.displayName = "ButtonFlatSquare";

export { ButtonFlatSquare };
