# Tomato Food Delivery

Tomato Food Delivery is a full-stack food ordering application with separate customer and admin interfaces backed by an Express and MongoDB API.

> **Project status:** This README documents the functionality verified in the current source code. Production deployment details and end-to-end production readiness have not been verified.

## Features

### Customer application

Verified in `client/`:

- Browse food items loaded from the backend API.
- Filter food items by category.
- Add and remove items from the cart.
- View cart totals and delivery fees.
- Register a customer account.
- Log in and receive a JWT authentication token.
- Store the authentication token in browser `localStorage`.
- Navigate between the home, cart, and order pages.
- Display food images served by the backend.

### Admin application

Verified in `admin/`:

- Add food items with a name, description, category, price, and image.
- View the food item list.
- Remove food items.
- Display operation feedback using React Toastify.
- Navigate between add, list, and orders sections.

The orders page is currently present as a route but contains no implemented order-management UI.

### Server application

Verified in `server/`:

- Connect to MongoDB with Mongoose.
- Register and authenticate users.
- Hash passwords with bcrypt.
- Generate JWT tokens for authenticated users.
- Manage food records.
- Upload food images with Multer.
- Serve uploaded images through the `/images` path.
- Add, remove, and retrieve cart data for authenticated users.
- Enable CORS for frontend applications.

## Technology stack

### Customer client

- React `19.2.8`
- React Router DOM `7.18.3`
- Axios `1.20.0`
- Vite `8.2.2`
- ESLint

### Admin client

- React `19.2.8`
- React Router DOM `7.18.4`
- Axios `1.20.0`
- React Toastify `11.1.0`
- Vite `8.2.2`
- ESLint

### Server

- Node.js with native ES modules
- Express `5.2.1`
- Mongoose `9.9.5`
- MongoDB
- bcrypt `6.0.0`
- JSON Web Token (`jsonwebtoken`)
- Multer `2.3.0`
- CORS
- dotenv
- Nodemon

## Architecture

The repository contains three independent npm projects. There is no root-level `package.json` or shared workspace configuration.

```text
Customer browser
      |
      v
client/  --------------------\
                               \
admin/   -----------------------> server/ Express API ---> MongoDB
                               /
Uploaded images <-------------/
```

### Client

The customer-facing React application is located in `client/`.

Entry point:

```text
client/src/main.jsx
```

The client uses `BrowserRouter` for client-side routing and `StoreContextProvider` from `client/src/context/StoreContext.jsx` for shared food, cart, token, and API URL state.

Customer routes are defined in `client/src/App.jsx`:

| Route | Purpose |
|---|---|
| `/` | Home page |
| `/cart` | Cart page |
| `/order` | Place-order page |

The client currently uses `http://localhost:4000` as its API base URL.

### Admin

The admin dashboard is located in `admin/`.

Entry point:

```text
admin/src/main.jsx
```

Routes are defined in `admin/src/App.jsx`:

| Route | Purpose |
|---|---|
| `/add` | Add a food item |
| `/list` | View and remove food items |
| `/orders` | Orders page placeholder |

The admin application also uses `http://localhost:4000` as its API base URL.

### Server

The backend entry point is `server/server.js`.

The server:

- Runs on port `4000`.
- Enables JSON request parsing.
- Enables CORS.
- Connects to MongoDB.
- Registers user, food, and cart route groups.
- Serves uploaded files from `server/uploads/`.

The backend follows a route/controller/model structure:

```text
HTTP request
    |
    v
server/routes/
    |
    v
server/controllers/
    |
    v
server/models/
    |
    v
MongoDB
```

## Project structure

```text
.
├── admin/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── package.json
│   └── server.js
└── README.md
```

## Prerequisites

The repository does not specify exact runtime versions. The following are required based on the project configuration:

- Node.js
- npm
- MongoDB database access
- A modern web browser

> **To verify:** Add the supported Node.js and npm versions when they are defined.

## Installation

The repository does not contain a root `package.json`, so install dependencies separately in each project:

```powershell
git clone <repository-url>
cd Tomato_Food_Delivery_App

cd server
npm install

cd ..\client
npm install

cd ..\admin
npm install
```

Replace `<repository-url>` with the repository's actual clone URL.

## Environment variables

Create the file `server/.env` with placeholder values:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-signing-secret>
```

| Variable | Used by | Purpose |
|---|---|---|
| `MONGO_URI` | `server/config/db.js` | MongoDB connection string |
| `JWT_SECRET` | `server/controllers/userController.js` and `server/middleware/auth.js` | Signs and verifies JWT tokens |

Do not commit real credentials, connection strings, passwords, or JWT secrets.

## Local development

Start the backend first.

### Start the server

```powershell
cd server
npm run server
```

This runs `nodemon server.js`. The API listens on:

```text
http://localhost:4000
```

Use this health-check endpoint:

```text
GET http://localhost:4000/
```

The verified response is:

```text
API Working
```

### Start the customer client

In a separate terminal:

```powershell
cd client
npm run dev
```

Other verified client commands:

```powershell
npm run build
npm run lint
npm run preview
```

### Start the admin client

In another terminal:

```powershell
cd admin
npm run dev
```

Other verified admin commands:

```powershell
npm run build
npm run lint
npm run preview
```

## Production deployment

Production deployment is not configured or verified in the current repository.

The following details still need to be confirmed before publishing production instructions:

- Production frontend URL: `<live-deployment-url>`
- Production API URL: `<production-api-url>`
- Hosting providers and deployment commands
- Production MongoDB configuration
- Production CORS configuration
- How frontend builds are served

Do not treat the local `http://localhost:4000` configuration as a production configuration.

## API endpoints

The following endpoints are registered in `server/server.js` and the route files under `server/routes/`.

### Health check

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Returns `API Working` |

### User endpoints

Defined in `server/routes/userRoute.js`.

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/api/user/register` | `name`, `email`, `password` | Registers a user and returns a JWT on success |
| `POST` | `/api/user/login` | `email`, `password` | Authenticates a user and returns a JWT on success |

Example request body:

```json
{
  "name": "Example Customer",
  "email": "customer@example.com",
  "password": "<your-password>"
}
```

The `name` field is not required by the login controller.

### Food endpoints

Defined in `server/routes/foodRoute.js`.

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/api/food/add` | Multipart form data: `image`, `name`, `description`, `category`, `price` | Adds a food item and uploads its image |
| `GET` | `/api/food/list` | None | Returns all food items |
| `POST` | `/api/food/remove` | JSON body containing `id` | Removes a food item and attempts to remove its uploaded image |

Food images are served from:

```text
/images/<image-filename>
```

### Cart endpoints

Defined in `server/routes/cartRoute.js`.

These endpoints use `server/middleware/auth.js` and require a token in the request `token` header.

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/api/cart/add` | `foodId` | Adds a food item to the authenticated user's cart |
| `POST` | `/api/cart/remove` | `foodId` | Removes one quantity of a food item |
| `POST` | `/api/cart/get` | None | Retrieves the authenticated user's cart |

Example header:

```text
token: <jwt-token>
```

Example request body:

```json
{
  "foodId": "<food-document-id>"
}
```

## Screenshots

Screenshots have not been added to the repository yet.

### Customer home page

```text
<!-- Add customer-home.png here -->
```

### Customer cart or login interface

```text
<!-- Add customer-cart.png or customer-login.png here -->
```

### Admin dashboard

```text
<!-- Add admin-dashboard.png here -->
```

> **To verify:** Confirm the screenshots to publish and their final filenames.

## Troubleshooting

### The frontend cannot connect to the API

Confirm that:

1. The server is running:

   ```powershell
   cd server
   npm run server
   ```

2. The server is listening on port `4000`.
3. MongoDB is reachable through the configured `MONGO_URI`.
4. The frontend is configured to use `http://localhost:4000`.

The client API URL is defined in `client/src/context/StoreContext.jsx`.

The admin API URL is defined in `admin/src/App.jsx` and `admin/src/assets/assets.js`.

### MongoDB connection errors

Confirm that `server/.env` contains:

```env
MONGO_URI=<your-mongodb-connection-string>
```

Also confirm that the MongoDB deployment permits connections from the machine running the server.

### Authentication errors

Confirm that `server/.env` contains:

```env
JWT_SECRET=<your-jwt-signing-secret>
```

Protected cart requests must use the header name expected by `server/middleware/auth.js`:

```text
token: <jwt-token>
```

### `npm test` fails in the server project

The server package currently defines `npm test` as the default placeholder command:

```text
Error: no test specified
```

There is currently no configured server test runner or test suite.

### Customer order page navigation

`client/src/pages/PlaceOrder/PlaceOrder.jsx` currently references `navigate` without defining it with React Router's navigation hook. The checkout button may therefore require code changes before it can navigate successfully.

### Admin orders page is empty

The `/orders` route exists, but `admin/src/pages/Orders/Order.jsx` currently contains only an empty page structure. Order management is not implemented yet.

## Details to verify before publishing

- Replace `<repository-url>` with the actual repository URL.
- Confirm supported Node.js and npm versions.
- Add the live deployment URL when available.
- Confirm the production API URL and deployment process.
- Confirm production MongoDB and CORS settings.
- Add final customer and admin screenshots.
- Confirm production functionality and end-to-end order flow.
