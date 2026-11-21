# BOA TECH frontend

The public interface is built with React and TypeScript. Symfony renders the
application shell and exposes the `/api` endpoints consumed by React.

## Frontend structure

- `src/App.tsx` defines the React Router routes.
- `src/pages/` contains the home, login, registration, dashboard, and not-found
  pages.
- `src/layouts/` contains shared authentication and admin page shells.
- `src/components/` contains reusable interface components.
- `src/services/` contains API requests.
- `src/types/` contains shared TypeScript types.

The current routes are `/`, `/login`, `/register`, and `/admin/dashboard`.
Symfony serves the React shell for these URLs so direct navigation and page
refreshes work. The registration page is a presentation placeholder; account
creation is not connected to Symfony yet.

The login form uses Google reCAPTCHA v3. Configure `RECAPTCHA_SITE_KEY` and
`RECAPTCHA_SECRET_KEY` in the Symfony environment before enabling logins. The
site key is exposed to the login page; keep the secret key server-side. Login
verification fails closed if either key or a valid token is unavailable.

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
