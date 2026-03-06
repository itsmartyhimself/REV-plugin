# Untitled REV

A reverb AU plugin concept and product design demonstration.

## What it is

Untitled REV is a product design prototype of a reverb plugin built in React. It explores what a modern, minimal plugin interface could look and feel like, with smooth motion, a curated preset library, and a display that reflects every control state in real time.

## Why I built it

Many plugin interfaces are functional and well designed, but some of the most recognizable suites for beginners still feel visually dated. Untitled REV explores the opposite approach: minimal controls, strong visual feedback, and a preset-first workflow for beginners who want great reverb without heavy tweaking.

## Features

- 40 curated presets across Small, Medium, Large, and Ambient categories
- Preset selector as the primary entry point for browsing, reading descriptions, and choosing a sound quickly
- Five knobs: Signal, Delay, Decay, Spread, and Shimmer
- Effect toggles: Bypass, Chorus, Reverse, Gate, and a 4-way Filter
- Top display panel that mirrors all active control states in real time
- Texture-layered display with lens and glass overlays
- Motion powered by Framer Motion to make transitions feel closer to hardware than a typical web UI

## Stack

Next.js 15, React 19, TypeScript, Framer Motion, Radix UI, Tailwind CSS, and Geist

## Run locally

bash
npm install
npm run dev

Open `http://localhost:3000`.

The plugin renders centered at `800x600`.

## Project structure

The project is centered around the plugin UI. `app/` contains the app entry and global styles, `components/plugin/` contains the main interface pieces, `components/ui/` holds shared UI primitives, `lib/` contains utilities, and `public/` stores icons and texture assets.

## Notes

* Fixed at `800x600`. This is intentional and matches standard plugin window dimensions.
* There is no audio engine. All knob values are formatted and displayed only.
* Presets are static data in `components/plugin/controls/preset-selector-data.ts`.
* Design tokens live in `app/globals.css`. Do not invent new ones.
