# Project Context — FA Wedding

## Overview

This is a static React SPA built with Vite and deployed to GitHub Pages.

The project is intended to be a lightweight wedding website with static hosting.

## Stack

* React
* Vite
* Bun (package manager and runtime)
* React Router
* TanStack React Query
* Lovable UI components

## Dev Commands

Install dependencies:

```
bun install
```

Run development server:

```
bun run dev
```

Build production:

```
bun run build
```

Preview production build:

```
bunx vite preview
```

## Routing Rules

* This project uses BrowserRouter
* The app runs under the base path `/fawedding/` in production
* Router must use:

```
basename={import.meta.env.PROD ? "/fawedding/" : "/"}
```

* Always ensure routes work with static hosting fallback

## Deployment

Deployment is done via GitHub Actions to GitHub Pages.

Build output directory:

```
dist/
```

Actions must copy:

```
dist/index.html → dist/404.html
```

to enable SPA routing fallback.

## Code Style Rules

* Prefer functional React components
* Use hooks instead of class components
* Use React Query for async state
* Avoid global state unless strictly necessary
* Keep pages inside `/pages`
* Keep UI components inside `/components`

## Important Notes

* Never change the Vite `base` without considering GitHub Pages path.
* Do not introduce server-side dependencies.
* This project must remain static-deployable.
