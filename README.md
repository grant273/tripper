# Tripper

A lightweight React app for managing two kinds of checklists:

- **Shopping List** — Organize grocery items into three priority tiers (This Trip, Needed, Not Needed). Items can be grouped into bundles (e.g. "Buffalo Dip" containing cream cheese, hot sauce, and ranch) that expand into individual items when promoted and collapse back when all sub-items are demoted. All data persists to localStorage.
- **Travel List** — Track packing progress across three statuses (Not Packed, Packed, Not Bringing). Items can be added, renamed, deleted, and bulk-reset. Data persists to localStorage.

Both lists include an "Edit Data" menu option that exposes the raw JSON for manual editing.

## Deployment

The site is deployed using [GitHub Pages](https://pages.github.com/) from the `gh-pages` branch. Running `npm run deploy` builds the app and publishes it to that branch.

## Available Scripts

### `npm run deploy`
Builds and deploys to the `gh-pages` branch.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
