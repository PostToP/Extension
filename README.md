# postToP Extension

postToP Extension is a Chrome Manifest V3 extension that detects currently playing content on YouTube and YouTube Music, then publishes presence updates to the postToP backend.

## Stack

TypeScript, Preact, Webpack, Tailwind CSS, and Biome.

## Setup

```bash
npm install
npm run dev
```

`npm run dev` builds in watch mode and outputs assets to `dist/`.

## Build

```bash
npm run build
```

## Releases

Prebuilt extension packages are available on GitHub Releases:

https://github.com/PostToP/Extension/releases

If you use a release package, extract it and load the unpacked folder from `chrome://extensions`.

## Load the Extension (Chrome)

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose the `dist/` directory.

## Available Scripts

- `npm run dev` - Development build in watch mode
- `npm run build` - Production build
- `npm run lint` - Static checks via Biome
- `npm run format` - Format source files via Biome

## Repository Structure

- `src/background` - MV3 service worker and WebSocket integration
- `src/script` - Content scripts for YouTube and YouTube Music
- `src/popup` - Extension popup UI
- `src/settings` - Options/settings page
- `src/common` - Shared models, utilities, and repositories
- `public` - Manifest and static assets

## Host Permissions

The extension requests access to the following hosts:

- `https://music.youtube.com/*`
- `https://www.youtube.com/*`
- `https://posttopserver.devla.dev/*`
- `https://posttop.devla.dev/*`
- `http://localhost:3000/*` (local development)
