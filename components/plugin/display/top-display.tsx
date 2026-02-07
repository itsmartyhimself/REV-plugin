import * as React from "react";

export interface TopDisplayProps {
  children?: React.ReactNode;
}

export function TopDisplay({ children }: TopDisplayProps) {
  return (
    <div
      className="flex flex-col items-start relative"
      style={{
        padding: "var(--space-4)",
        gap: "var(--space-4)",
        width: "100%",
        height: 200,
        minHeight: 200,
        maxHeight: 200,
        borderRadius: "var(--radius-1)",
        boxShadow: "inset 0px 4px 2px 1px rgba(13, 14, 15, 0.7)",
        /* Base gradient */
        background:
          "linear-gradient(93.58deg, var(--color-accent-gray-1) 0%, var(--color-accent-gray-2) 50%, var(--color-dark-lightest) 100%)",
      }}
    >
      {/* LensTexture overlay at 20% opacity */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/textures/LensTexture.png)",
          backgroundRepeat: "repeat",
          opacity: 0.2,
          borderRadius: "var(--radius-1)",
        }}
      />
      {/* GlassTexture overlay at 10% opacity with plus-darker blend */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/textures/GlassTexture.png)",
          backgroundRepeat: "repeat",
          opacity: 0.1,
          mixBlendMode: "color-burn",
          borderRadius: "var(--radius-1)",
        }}
      />
      {/* Content sits above the texture overlays */}
      <div
        className="relative flex flex-col w-full z-10"
        style={{
          flex: 1,
          gap: "var(--space-4)",
          justifyContent: "space-between",
        }}
      >
        {children}
      </div>
    </div>
  );
}
