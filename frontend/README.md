# BOA TECH frontend

The public interface is built with React and TypeScript. Symfony renders the
application shell and exposes the `/api` endpoints consumed by React.

## Development

Start Symfony on `http://127.0.0.1:8000`, then run these commands from this
directory:

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:5173`. Vite forwards `/api` requests to Symfony, so the
frontend and backend can be developed separately while using the same API.

## Production assets

Build the React application before serving the Symfony site:

```sh
npm run build
```

Vite writes the compiled assets to `public/build`. Symfony's Twig application
shell loads these assets and serves the public site from its `/` route.

The homepage currently receives sample catalogue and marketing content from
`HomeController`; the API contract can later be backed by Doctrine entities and
repositories as the project modules are implemented.
