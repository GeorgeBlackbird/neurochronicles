# Neurochronicles

A Russian-language website about Soviet films from 1941 to 1945, with a historical timeline, film pages and AI-generated posters and commentary. Built with Vue, Vue Router, Vite and SCSS.

This was my first web project. I made it for a small college competition marking 9 May. It didn't win, but I am still proud of it. Looking back, there are parts I would build differently. I keep this version as a record of where I started.

## What is in the site

- A catalogue organised by year, alongside wartime events.
- Individual film pages with descriptions, cast and crew information.
- Galleries with film stills and video, opened in a media viewer.
- Alternative posters and commentary attributed to different AI models.

Film information, event descriptions and the AI-related content are stored in local data modules. The site does not send requests to an AI service to analyse a film when you open it.

## Run locally

```sh
git clone https://github.com/GeorgeBlackbird/neurochronicles.git
cd neurochronicles
npm ci
npm run dev
```

Open the local address printed by Vite.

To build and preview the static site:

```sh
npm run build
npm run preview
```

The build output is written to `dist/`.

## Source layout

| Path                                                             | Purpose                                                  |
| ---------------------------------------------------------------- | -------------------------------------------------------- |
| [`src/views`](src/views)                                         | Home, catalogue and film pages                           |
| [`src/components`](src/components)                               | Shared layout, timeline, film rows and media sections    |
| [`src/assets/data/moviesData.js`](src/assets/data/moviesData.js) | Film details and model-attributed commentary             |
| [`src/assets/data/warData.js`](src/assets/data/warData.js)       | Events and film listings grouped by year                 |
| [`src/assets/data/movies`](src/assets/data/movies)               | References to posters, cast images, stills and video     |
| [`src/assets/styles`](src/assets/styles)                         | SCSS for layout, pages and components                    |
| [`src/router/index.js`](src/router/index.js)                     | Hash-based routes for the home, catalogue and film pages |

The app uses Vue Router's hash history. Vite currently uses `base: './'`, so built asset references are relative. Pinia is listed as a dependency but is not registered in the app's entry point.

## Publishing

The repository includes a GitHub Pages deployment script:

```sh
npm run build
npm run deploy
```

`npm run deploy` publishes `dist/` to the repository's `gh-pages` branch. It requires GitHub access and is separate from building or previewing the site locally.

## About this version

This repository preserves an early college project. Its structure and implementation reflect that stage of my learning.

There is no configured automated test suite or typecheck command. ESLint and Prettier are listed as development dependencies, but the repository does not include a lint configuration. Building the site does not establish that all interactions, media or layouts work across browsers.
