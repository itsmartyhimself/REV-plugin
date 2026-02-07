"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  open?: boolean
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, side = "bottom", open, style, ...props }, ref) => {
  return (
    <AnimatePresence>
      {open && (
        <PopoverPrimitive.Portal forceMount>
          <PopoverPrimitive.Content
            ref={ref}
            align={align}
            side={side}
            sideOffset={sideOffset}
            asChild
            forceMount
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 20,
                mass: 0.8
              }}
              style={{ 
                transformOrigin: side === "top" ? "bottom" : side === "bottom" ? "top" : "center",
                ...style
              }}
              className={cn(
                "z-50 rounded-md border text-popover-foreground shadow-md outline-none",
                className
              )}
            >
              {props.children}
            </motion.div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      )}
    </AnimatePresence>
  )
})
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
