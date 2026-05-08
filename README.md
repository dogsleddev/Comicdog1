# ComicDog

ComicDog is a mobile-first, client-side Next.js app that turns a dog photo and a few details into a shareable 4-panel comic poster.

Tagline: **Your dog. Their origin story.**

## Privacy model

- No paid APIs
- No API keys
- No backend routes
- No Supabase
- No database
- No cloud image storage
- No image uploads
- Uploaded dog photos stay in temporary browser memory only
- Photos are not saved to localStorage, sessionStorage, IndexedDB, a server, or a database

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Or run the complete local verification gate:

```bash
npm run verify
```

## Build and start

```bash
npm run build
npm run start
```

## GitHub upload

1. Create a new GitHub repository named `ComicDog`.
2. Upload this project folder, or push it from a local terminal.
3. Keep the root directory as the folder that contains `package.json`.
4. Make sure generated folders like `.next/`, `node_modules/`, and `tsconfig.tsbuildinfo` are not committed.

## Vercel deployment

1. In Vercel, choose **Add New Project**.
2. Import the GitHub repository.
3. Framework Preset should auto-detect as **Next.js**.
4. Keep defaults unless you intentionally changed the project root:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: Next.js default
5. Do not add environment variables. ComicDog does not need them.
6. Deploy.

## Test coverage

This project includes Vitest coverage for:

- Local comic generation model
- Notes personalization
- Regeneration variation
- Personality and theme behavior
- Manual description fallback
- Temporary object URL handling
- Image validation utilities
- Home screen CTAs and privacy note
- Create form submission
- Manual description form submission
- Combined 4-panel poster rendering

## Local generation engine

The app uses reusable local templates in `src/lib/comicTemplates.ts` and deterministic random selection in `src/lib/comicGenerator.ts`. The generator varies title, subtitle, panel captions, speech bubbles, and action words based on dog name, personality, theme, notes, and a fresh seed. Regenerate keeps the user inputs but creates a new seed.

The uploaded dog photo is represented by a temporary `blob:` object URL stored only in React state. It is revoked when replaced or when the app unmounts.
