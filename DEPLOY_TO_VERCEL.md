# Deploy instructions (Vercel)

Framework Preset: **Vite**

1. Build command: `npm run build`
2. Output directory: `dist`
3. Environment variables: add any `VITE_*` variables in Vercel Project Settings if needed.

Scripts added:
- `build:server`: `esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`
- `vercel-build`: `npm run build`

If you want the server bundled as a Node bundle, run locally:
```
npm run build
npm run build:server
```
This will put server bundle (if created) under `dist/`.

