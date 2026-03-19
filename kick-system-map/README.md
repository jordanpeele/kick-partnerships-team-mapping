# KICK System Map

Interactive force-directed visualization of KICK's partnerships ecosystem — influence flows, reporting structure, deal pipelines, and power concentration.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

### Option A: CLI
```bash
npm i -g vercel
vercel
```

### Option B: GitHub
1. Push this directory to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo — framework auto-detected as Next.js
4. Deploy (zero config needed)

## Views

- **Influence** — who shapes decisions
- **Reporting** — org reporting lines
- **Deal Flow** — how deals move through the system
- **Heat** — power concentration across the network
- **Case: xQc** — replay of the $100M deal path

## Features

- Force-directed graph with animated glow effects
- Spotlight mode: click a node to dim unrelated nodes and highlight connections
- Zoom-aware labels: labels hide at low zoom, show on hover/selection
- Edge visual distinction: dashed for execution/collaboration, green glow for influence, thick for negotiations
- Power modeling with 4-dimension scoring (capital control, deal authority, narrative influence, network centrality)
- Detailed node panel with power breakdown bars
- Intro overlay with localStorage-based dismissal
- Mobile-responsive layout

## Data

All graph data lives in `src/lib/graphData.ts`. Edit nodes/edges there to update the visualization. Types are in `src/lib/types.ts`.

## Stack

- Next.js 15 (App Router)
- React 19
- react-force-graph-2d
- TypeScript
