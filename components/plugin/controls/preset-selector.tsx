"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Star01Icon, Star02Icon } from "../icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CATEGORIES, PRESETS } from "./preset-selector-data";
import { Tag } from "../display/tag";

export interface PresetSelectorProps {
  onSelectPreset?: (presetId: string) => void;
  defaultPreset?: string;
  onOpenChange?: (open: boolean) => void;
}

export function PresetSelector({
  onSelectPreset,
  defaultPreset,
  onOpenChange,
}: PresetSelectorProps) {
  // Primary state
  const [open, setOpen] = useState(false);

  // Wrapper to call both internal and external open change handlers
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };
  const [selectedPreset, setSelectedPreset] = useState<string | null>(
    defaultPreset || null
  );
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredPreset, setHoveredPreset] = useState<string | null>(null);
  const [isResetHovered, setIsResetHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Derived state
  const isSearching = searchQuery.length > 0;

  const selectedPresetData = useMemo(
    () => PRESETS.find((p) => p.id === selectedPreset),
    [selectedPreset]
  );

  const filteredPresets = useMemo(() => {
    if (isSearching) {
      return PRESETS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (hoveredCategory === "favorites") {
      return PRESETS.filter((p) => favorites.has(p.id));
    }

    if (hoveredCategory) {
      // Filter presets by their actual category
      return PRESETS.filter((p) => p.category === hoveredCategory);
    }

    return [];
  }, [searchQuery, hoveredCategory, favorites, isSearching]);

  const showCategories = !isSearching;
  const showPresets = hoveredCategory !== null || isSearching;
  const showInfo =
    hoveredPreset !== null || (isSearching && filteredPresets.length === 1);

  // Auto-show info for single search result
  const displayedPreset = useMemo(() => {
    if (hoveredPreset) {
      return PRESETS.find((p) => p.id === hoveredPreset);
    }
    if (isSearching && filteredPresets.length === 1) {
      return filteredPresets[0];
    }
    return null;
  }, [hoveredPreset, isSearching, filteredPresets]);

  const toggleFavorite = (presetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(presetId)) {
        next.delete(presetId);
      } else {
        next.add(presetId);
      }
      return next;
    });
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    handleOpenChange(false);
    onSelectPreset?.(presetId);
  };

  const handleCategoryHover = (categoryId: string) => {
    setHoveredCategory(categoryId);
    setHoveredPreset(null);
    setIsResetHovered(false);
  };

  const handleResetHover = () => {
    setIsResetHovered(true);
    setHoveredCategory(null);
    setHoveredPreset(null);
  };

  const handleResetClick = () => {
    setSelectedPreset(null);
    handleOpenChange(false);
  };

  const handleColumnsLeave = () => {
    setHoveredCategory(null);
    setHoveredPreset(null);
    setIsResetHovered(false);
  };

  const handlePresetZoneLeave = () => {
    setHoveredPreset(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setHoveredCategory(null);
      setHoveredPreset(null);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          aria-label="Select preset"
          className="flex flex-row items-center box-border transition-colors bg-[var(--color-accent-gray-2)] hover:bg-[var(--color-accent-gray-1)]"
          style={{
            padding: "var(--space-3)",
            width: 320,
            minWidth: 320,
            maxWidth: 320,
            height: 34,
            borderRadius: "var(--radius-3)",
          }}
        >
          <span
            className="type-4 text-trim truncate"
            style={{
              flex: 1,
              textAlign: "left",
              color: "var(--color-copy-secondary)",
            }}
          >
            {selectedPresetData?.name || "Select preset"}
          </span>
          <ChevronDown
            className={cn(
              "flex-none transition-transform duration-200",
              open && "rotate-180"
            )}
            style={{
              width: 12,
              height: 12,
              marginLeft: "var(--space-2)",
              color: "var(--color-heather-200)",
              strokeWidth: 1.5,
            }}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        open={open}
        side="top"
        align="center"
        sideOffset={8}
        className="w-fit p-0 border-0"
        style={{
          background: "var(--color-accent-gray-1)",
          border: "1px solid var(--color-dark-lightest)",
          borderRadius: "var(--radius-3)",
          padding: "var(--space-3)",
        }}
      >
        <div
          className="flex flex-col items-center box-border"
          style={{
            gap: 0,
            width: 584,
            minHeight: 320,
            maxHeight: 320,
          }}
        >
          {/* Search Bar */}
          <div
            className="flex flex-row items-center self-stretch box-border"
            style={{
              padding: "var(--space-2)",
              gap: "var(--space-2)",
              height: 28,
              background: "var(--color-dark-lightest)",
              borderRadius: "var(--radius-2)",
            }}
          >
            <Search
              style={{
                width: 12,
                height: 12,
                color: "var(--color-copy-secondary)",
                strokeWidth: 2,
              }}
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search presets"
              className="type-4 text-trim bg-transparent border-none outline-none flex-1"
              style={{
                color: "var(--color-copy-secondary)",
              }}
            />
          </div>

          {/* 3-Column Layout */}
          <div
            className="flex flex-row items-start"
            style={{
              gap: 0,
              width: 560,
              height: 252,
            }}
            onMouseLeave={handleColumnsLeave}
          >
            {/* Categories Column */}
            <div
              className={cn(
                "flex flex-col transition-all duration-200",
                isSearching && "w-0 opacity-0"
              )}
              style={{
                gap: "var(--space-2)",
                paddingTop: "var(--space-4)",
                paddingRight: isSearching ? 0 : "var(--space-2)",
                flexBasis: isSearching ? "0%" : "33.33%",
                flexShrink: 0,
                flexGrow: 0,
                height: "100%",
              }}
            >
              {CATEGORIES.map((category) => {
                const isHovered = hoveredCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onMouseEnter={() => handleCategoryHover(category.id)}
                    className="relative flex flex-row justify-between items-center self-stretch box-border cursor-pointer"
                    style={{
                      padding: "var(--space-2)",
                      height: 26,
                      borderRadius: "var(--radius-2)",
                      background: "transparent",
                    }}
                  >
                    {isHovered && (
                      <motion.div
                        layoutId="category-highlight"
                        className="absolute inset-0"
                        style={{
                          background: "var(--color-dark-lightest)",
                          borderRadius: "var(--radius-2)",
                        }}
                        transition={{ type: "spring", duration: 0.25, bounce: 0 }}
                      />
                    )}
                    <span
                      className="relative z-10 type-4 text-trim text-left"
                      style={{
                        flex: "1 1 auto",
                        minWidth: 0,
                        color: "var(--color-copy-secondary)",
                      }}
                    >
                      {category.name}
                    </span>
                    <ChevronRight
                      className="relative z-10"
                      style={{
                        width: 12,
                        height: 12,
                        flexShrink: 0,
                        color: "var(--color-copy-secondary)",
                        strokeWidth: 1.5,
                      }}
                    />
                  </button>
                );
              })}

              {/* Reset Instance Button - isolated from category/preset logic */}
              <button
                onMouseEnter={handleResetHover}
                onClick={handleResetClick}
                className="relative flex flex-row justify-start items-center self-stretch box-border cursor-pointer"
                style={{
                  padding: "var(--space-2)",
                  height: 26,
                  borderRadius: "var(--radius-2)",
                  background: "transparent",
                  marginTop: "var(--space-2)",
                }}
              >
                {isResetHovered && (
                  <motion.div
                    layoutId="category-highlight"
                    className="absolute inset-0"
                    style={{
                      background: "var(--color-dark-lightest)",
                      borderRadius: "var(--radius-2)",
                    }}
                    transition={{ type: "spring", duration: 0.25, bounce: 0 }}
                  />
                )}
                <span
                  className="relative z-10 type-4 text-trim text-left"
                  style={{
                    flex: "1 1 auto",
                    minWidth: 0,
                    color: "var(--color-copy-secondary)",
                  }}
                >
                  Reset instance
                </span>
              </button>
            </div>

            {/* Preset + Info Hover Zone */}
            <div
              className="flex flex-row"
              style={{
                flexBasis: isSearching ? "100%" : "66.67%",
                flexShrink: 0,
                flexGrow: 0,
                height: "100%",
                paddingTop: "var(--space-4)",
                overflow: "hidden",
              }}
              onMouseLeave={handlePresetZoneLeave}
            >
              {/* Presets Column */}
              <div
                className={cn(
                  "flex flex-col transition-opacity duration-200 preset-list",
                  !showPresets && "opacity-0 pointer-events-none"
                )}
                style={{
                  gap: "var(--space-2)",
                  flexBasis: "50%",
                  flexShrink: 0,
                  flexGrow: 0,
                  height: "auto",
                  maxHeight: "100%",
                  paddingRight: "var(--space-2)",
                  overflow: "hidden",
                  overflowY: "auto",
                }}
              >
              {filteredPresets.length === 0 && showPresets && (
                <div
                  className="flex items-center justify-center type-4"
                  style={{
                    padding: "var(--space-4)",
                    color: "var(--color-heather-100)",
                    pointerEvents: "none",
                  }}
                >
                  {hoveredCategory === "favorites"
                    ? "No current favorites"
                    : isSearching
                    ? "No presets found"
                    : "No presets"}
                </div>
              )}

              {filteredPresets.map((preset) => {
                const isHovered = hoveredPreset === preset.id;

                return (
                  <button
                    key={preset.id}
                    onMouseEnter={() => setHoveredPreset(preset.id)}
                    onClick={() => handleSelectPreset(preset.id)}
                    className="relative flex flex-row justify-start items-center self-stretch box-border cursor-pointer"
                    style={{
                      padding: "var(--space-2)",
                      gap: "var(--space-2)",
                      height: 26,
                      borderRadius: "var(--radius-2)",
                      width: "100%",
                      background: "transparent",
                    }}
                  >
                    {isHovered && (
                      <motion.div
                        layoutId="preset-highlight"
                        className="absolute inset-0"
                        style={{
                          background: "var(--color-dark-lightest)",
                          borderRadius: "var(--radius-2)",
                        }}
                        transition={{ type: "spring", duration: 0.25, bounce: 0 }}
                      />
                    )}
                    <span
                      className="relative z-10 type-4 text-trim truncate text-left"
                      style={{
                        flex: "1 1 0%",
                        minWidth: 0,
                        color: "var(--color-copy-secondary)",
                      }}
                    >
                      {preset.name}
                    </span>
                  </button>
                );
              })}
              </div>

              {/* Preset Info Column */}
              <div
                className={cn(
                  "flex flex-col transition-opacity duration-200",
                  !showInfo && "opacity-0 pointer-events-none"
                )}
                style={{
                  gap: "var(--space-4)",
                  flexBasis: "50%",
                  flexShrink: 0,
                  flexGrow: 0,
                  height: "100%",
                  paddingLeft: "var(--space-1)",
                  overflow: "hidden",
                  overflowY: "auto",
                }}
              >
              {displayedPreset && (
                <>
                  {/* Title & Favorite */}
                  <div
                    className="flex flex-row items-start"
                    style={{
                      gap: "var(--space-2)",
                      width: "100%",
                    }}
                  >
                    <span
                      className="type-7 font-semibold text-trim"
                      style={{
                        flex: "1 1 0%",
                        minWidth: 0,
                        width: "100%",
                        wordWrap: "break-word",
                        color: "var(--color-copy-primary)",
                      }}
                    >
                      {displayedPreset.name}
                    </span>
                    <motion.button
                      onClick={(e) => toggleFavorite(displayedPreset.id, e)}
                      aria-label="Toggle favorite"
                      aria-pressed={favorites.has(displayedPreset.id)}
                      className="flex-none cursor-pointer"
                      whileTap={{ scale: 0.93 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      style={{
                        color: "var(--color-copy-primary)",
                      }}
                    >
                      {favorites.has(displayedPreset.id) ? (
                        <Star02Icon
                          style={{
                            width: 16,
                            height: 15,
                          }}
                        />
                      ) : (
                        <Star01Icon
                          style={{
                            width: 16,
                            height: 15,
                          }}
                        />
                      )}
                    </motion.button>
                  </div>

                  {/* Tags */}
                  <div
                    className="flex flex-row flex-wrap"
                    style={{
                      gap: "var(--space-1)",
                      width: "100%",
                    }}
                  >
                    {displayedPreset.tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      height: 1,
                      width: "100%",
                      background: "var(--color-dark-lightest)",
                    }}
                  />

                  {/* Description */}
                  <div
                    className="type-3 font-medium text-trim"
                    style={{
                      color: "var(--color-copy-primary)",
                      width: "100%",
                      wordWrap: "break-word",
                    }}
                  >
                    {displayedPreset.description}
                  </div>
                </>
              )}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
