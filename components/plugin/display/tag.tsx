import * as React from "react";

export interface TagProps {
  text?: string;
}

export function Tag({ text = "Guitar" }: TagProps) {
  return (
    <span
      className="inline-flex flex-row items-center box-border"
      style={{
        gap: "var(--space-2)",
        height: 24,
        padding: "var(--space-1) var(--space-2)",
        background: "var(--color-dark-lightest)",
        borderRadius: "var(--radius-2)",
      }}
    >
      <span
        className="type-4 text-trim whitespace-nowrap"
        style={{
          color: "var(--color-copy-secondary)",
        }}
      >
        {text}
      </span>
    </span>
  );
}
