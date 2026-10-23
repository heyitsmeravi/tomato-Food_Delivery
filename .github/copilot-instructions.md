# Copilot instructions

## Repository layout and architecture

This repository contains three separate npm projects rather than a root workspace:

- `server/` is an Express 5 API running on port `4000`. It loads `server/.env`, connects to MongoDB with `MONGO_URI`, and exposes `/api/user`, `/api/food`, and `/api/cart` routes. Food images uploaded through Multer are stored in `server/uploads/` and served at `/images/<filename>`.
- `client/` is the customer-facing React 19/Vite app. `BrowserRouter` mounts the app through `StoreContextProvider`; the context fetches food from the API, owns the in-memory cart and auth token state, and provides the API base URL to components. Customer routes are `/`, `/cart`, and `/order`.
- `admin/` is a separate React 19/Vite dashboard. It routes `/add`, `/list`, and `/orders`, uses Axios against the same API, and displays operation feedback with `react-toastify`. Food creation uses multipart form data and the server's Multer upload endpoint; list/removal use the food endpoints. The orders page is currently a placeholder.

The API follows a route → controller → Mongoose model structure. User registration/login uses bcrypt and JWT; cart routes require the JWT middleware, which reads the token from the request `token` header and places the decoded user id in `req.body.userId`. API responses conventionally use `{ success, message, data }` (with endpoint-specific fields such as `token` or `cartData`).

## Commands

Run commands from the relevant project directory because there is no root `package.json`.

### Customer app

```powershell
cd client
npm install
npm run dev       # Vite development server
npm run build     # production build
npm run lint      # ESLint
npm run preview   # preview the production build
```

### Admin app

```powershell
cd admin
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

### API server

```powershell
cd server
npm install
npm run server    # nodemon server.js
```

The server's `npm test` script is only the default placeholder (`Error: no test specified`) and exits with failure. There are currently no test files or configured test runner, so there is no single-test command.

## Configuration and integration points

- Keep `server/.env` local and provide `MONGO_URI` and `JWT_SECRET`; do not commit their values.
- Both frontends currently use `http://localhost:4000` as the API base URL. Keep client and admin requests aligned with the server route prefixes and the `/images/` static path unless deliberately introducing a shared configuration mechanism.
- The client stores the login token in `localStorage`, but cart operations are still primarily represented in `StoreContext` state. Changes to authentication or cart persistence need to account for both the React context and the protected `/api/cart` endpoints.
- Food records use the fields `name`, `description`, `price`, `image`, and `category`. The admin add form's category values must remain consistent with the customer menu/filter values and the stored MongoDB documents.

## Code conventions specific to this repository

- JavaScript uses native ES modules (`"type": "module"`), with imports/exports in both the server and Vite apps.
- React components are organized by feature under `src/components/<Feature>/` or `src/pages/<Feature>/`, normally with a same-name `.jsx` and `.css` file. Reuse `StoreContext` for customer-wide food, cart, token, and URL state instead of introducing parallel state in individual customer components.
- Frontend HTTP calls use Axios directly in components/context and branch on the API's `response.data.success` flag; success and error messages are surfaced with the existing UI mechanism (`alert` in the customer login flow and `react-toastify` in the admin).
- Server controllers return JSON responses directly and use Mongoose models from `server/models/`. Preserve the existing endpoint paths and response field names when changing a controller because both frontends depend on them.
- Uploaded food filenames are generated from `Date.now()` plus the original filename. When removing a food item, remove its corresponding file from `server/uploads/` as well as its MongoDB record.
- Frontend linting is ESLint flat config with the recommended JavaScript, React Hooks, and React Refresh rules. The Vite `dist` directory is ignored by the configs.
