# Lumina — Interactive Learning Platform

A polished, multi-page frontend application for an online learning experience — featuring course exploration, progress tracking, learning paths, a personal dashboard, and user profile/settings pages.

**[Live Demo →](https://interactive-learning-platform-px26.vercel.app/)**

---

## Overview

Lumina is a UI-complete learning platform built to demonstrate production-grade frontend architecture. It includes a full design system, smooth page transitions, and a cohesive component library — all without a backend or UI component framework.

## Pages

- **Home** — Hero section, stats, continue-learning rail, course library with category filters
- **Explore** — Searchable and filterable course catalog
- **Paths** — Curated learning paths by topic
- **Dashboard** — Progress overview, activity streaks, enrolled courses
- **Profile** — User info and achievements
- **Settings** — Preferences and account management

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Routing and page structure |
| React 18 | Component-driven UI |
| Framer Motion 11 | Page transitions and micro-animations |
| Pure CSS3 | Custom design system — no Tailwind, no component library |

## Design Decisions

- **No CSS framework** — All styling is handwritten CSS with custom properties (variables) for consistent theming. This was a deliberate choice to demonstrate understanding of the cascade, specificity, and layout primitives.
- **Framer Motion over CSS animations** — Used for orchestrated, stateful animations (e.g. staggered card entrances, route transitions) where CSS alone would require more complex coordination.
- **App Router** — Chose Next.js 14's App Router for colocated layouts and page-level loading states.

## Getting Started
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure
```
app/          # Next.js App Router pages and layouts
components/   # Reusable UI components
lib/          # Data and utility functions
```
