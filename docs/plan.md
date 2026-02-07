# Sanity check – setup only

- Verify each checklist item against repo; report pass/fail with paths and evidence.
- Fix only objective gaps: (1) heather-500/copy-primary hex typo #eceded → #ECEDEE, (2) add destructive token so button variant uses our system.
- No new components, no refactors.

---

# Pulse tooltip (current)

- [x] Add @radix-ui/react-tooltip dependency
- [x] Create components/ui/tooltip.tsx (Provider, Root, Trigger, Content) with tokens
- [x] Create PulseTooltip + PulseTrigger + AnimatedTooltipContent + PulseTooltipGroup in components/plugin/pulse-tooltip.tsx
- [x] Add PulseTooltipGroup demo above PluginContainer on app/page.tsx

# Pulse tooltip → Animate UI (migrated)

- [x] Install Animate UI tooltip via shadcn: `npx shadcn@latest add "https://shadcnregistry.com/r/animate-ui/components-animate-tooltip"`
- [x] Create components/ui/animateui-tooltip.tsx wrapper (Provider, Tooltip, Trigger, Content, arrow fill-only, tokens)
- [x] PulseTooltip imports from animateui-tooltip; single TooltipProvider with openDelay=0, closeDelay=180
- [x] Remove TooltipGroupContext, CLOSE_GRACE_MS, openForAnimation, AnimatePresence from pulse-tooltip; keep pulse visuals
