# Cloudy Crafting 🎨

A luxury handcrafted art e-commerce storefront — handcrafted coasters, ocean-wave trays, geode clocks, and custom flower-preservation keepsakes.

**Live site:** [cloudy-crafting.netlify.app]

## Features

- Product catalog with category filters, sorting, and search
- Product detail pages with foil/finish options and gallery images
- Shopping cart & wishlist (persisted locally)
- Simulated checkout flow
- Custom commission request form for bespoke orders
- Instagram-style "Reels" showcase for social proof
- Fully responsive, mobile-first design

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tooling
- **Tailwind CSS v4** — styling
- **React Router v7** — routing
- **Framer Motion** — animations
- **Lucide React** — icons

## Run Locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

## Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder.

## Deployment

This project is configured for one-click deployment on **Netlify** via `Netlify.toml`.