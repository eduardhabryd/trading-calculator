# Trading Calculator ⚡

A premium crypto trading position calculator with leverage, risk/reward ratio, and commission-aware sizing.

## Features

- **Position size calculation** — based on deposit, risk %, and stop-loss %
- **Leverage support** — 1×–125× with position capping
- **Take-profit projection** — projected profit at TP with commission factored in
- **Risk/Reward ratio** — automatic R:R display
- **Commission-aware** — Binance & Kraken maker/taker fees built in
- **Dark / Light theme** — toggle with localStorage persistence + system preference detection
- **Copy to clipboard** — one-click copy of position size with toast notification
- **Keyboard shortcuts** — `Enter` to calculate, `Escape` to clear
- **Responsive** — mobile, tablet, and desktop layouts
- **Glassmorphism UI** — frosted glass card on animated gradient background

## Tech Stack

- **Vite** — fast dev server & build tool
- **Vanilla JS** — no frameworks, ES modules, MVC architecture
- **Vanilla CSS** — custom properties, glassmorphism, CSS animations
- **Google Fonts** — Inter + JetBrains Mono

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Formula

```
riskAmount = deposit × (risk / 100)
position   = riskAmount / (stop / 100)
position  -= position × (makerFee + takerFee)
position   = min(position, deposit × leverage)
```

## License

ISC