"use client";

import * as React from "react";
import { motion } from "framer-motion";

import {
  TooltipProvider as TooltipProviderPrimitive,
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
  TooltipContent as TooltipContentPrimitive,
  TooltipArrow as TooltipArrowPrimitive,
  type TooltipProviderProps as TooltipProviderPrimitiveProps,
  type TooltipProps as TooltipPrimitiveProps,
  type TooltipTriggerProps as TooltipTriggerPrimitiveProps,
  type TooltipContentProps as TooltipContentPrimitiveProps,
} from "@/components/ui/animate-ui/tooltip";
import { cn } from "@/lib/utils";

type TooltipProviderProps = TooltipProviderPrimitiveProps;

export function TooltipProvider({
  openDelay = 0,
  closeDelay = 180,
  transition = { type: "spring", stiffness: 300, damping: 35 },
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipProviderPrimitive
      openDelay={openDelay}
      closeDelay={closeDelay}
      transition={transition}
      {...props}
    />
  );
}

type TooltipProps = TooltipPrimitiveProps;

export function Tooltip({ sideOffset = 10, ...props }: TooltipProps) {
  return <TooltipPrimitive sideOffset={sideOffset} {...props} />;
}

type TooltipTriggerProps = TooltipTriggerPrimitiveProps;

export function TooltipTrigger(props: TooltipTriggerProps) {
  return <TooltipTriggerPrimitive {...props} />;
}

type TooltipContentProps = Omit<TooltipContentPrimitiveProps, "asChild"> & {
  children: React.ReactNode;
  layout?: boolean | "position" | "size" | "preserve-aspect";
};

export function TooltipContent({
  className,
  children,
  layout = "preserve-aspect",
  ...props
}: TooltipContentProps) {
  return (
    <TooltipContentPrimitive
      className={cn(
        "z-50 w-fit rounded-[var(--radius-2)] shadow-md",
        "bg-[var(--color-bg-light)] text-[var(--color-gray-200)]",
        "text-[length:var(--type-4-size)] font-[weight:var(--type-4-weight)] leading-[var(--type-4-lh)]",
        className
      )}
      {...props}
    >
      <motion.div className="overflow-hidden px-[var(--space-3)] py-[var(--space-2)]">
        <motion.div layout={layout}>{children}</motion.div>
      </motion.div>

      <TooltipArrowPrimitive
          className={cn(
            "fill-[var(--color-bg-light)] size-3",
            "data-[side='bottom']:translate-y-[1px]",
            "data-[side='top']:translate-y-[-1px]",
            "data-[side='right']:translate-x-[1px]",
            "data-[side='left']:translate-x-[-1px]"
          )}
          tipRadius={2}
      />
    </TooltipContentPrimitive>
  );
}
