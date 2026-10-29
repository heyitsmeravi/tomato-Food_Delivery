# Tomato Food Delivery

Tomato Food Delivery is a full-stack food ordering platform with a customer web application, an admin dashboard, and an Express/MongoDB API.

## Overview

The repository contains three independent npm projects:

| Project | Directory | Description |
|---|---|---|
| Customer application | `client/` | Browse food, manage a cart, authenticate, and place orders |
| Admin dashboard | `admin/` | Add/remove food items and manage orders |
| API server | `server/` | Authentication, food, cart, order, image-upload, and Stripe endpoints |

There is no root-level `package.json`; install and run each project separately.

## Features

### Customer application

- Browse food items by category
- Add and remove cart items
- Register and log in with JWT authentication
- Persist the authentication token in browser `localStorage`
- Submit delivery information
- Create Stripe Checkout sessions
- Verify successful or cancelled payments
- View customer orders

### Admin dashboard

- Add food items with image uploads
- View and remove food items
- View orders and update order statuses
- Display operation feedback with React Toastify

### API server

- Express 5 API with MongoDB/Mongoose
- User registration and login with bcrypt and JWT
- Food and cart management
- Order creation and payment verification with Stripe
- Multer image uploads
- Static image serving through `/images/<filename>`

## Technology stack

- React 19
- Vite
- React Router
- Axios
- Node.js and Express
- MongoDB and Mongoose
- bcrypt
- JSON Web Token
- Stripe
- Multer
- React Toastify

## Project structure

```text
.
├── admin/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── client/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env.example
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB database
- Stripe account and secret key for checkout

## Installation

Clone the repository and install dependencies in each project:

```powershell
git clone <repository-url>
Set-Location Tomato_Food_Delivery_App

Set-Location server
npm install

Set-Location ..\client
npm install

Set-Location ..\admin
npm install
```

## Environment configuration

Use the provided example files:

```text
client/.env.example
admin/.env.example
server/.env.example
```

### Customer frontend

Create `client/.env`:

```env
VITE_API_URL=http://localhost:4000
```

### Admin frontend

Create `admin/.env`:

```env
VITE_API_URL=http://localhost:4000
```

### API server

Create `server/.env`:

```env
PORT=4000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-long-random-jwt-secret
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
```

Never commit `.env` files or real credentials. Frontend variables must use the `VITE_` prefix because Vite exposes only prefixed variables to browser code.

## Local development

Start the API server:

```powershell
Set-Location server
npm run server
```

The server uses `process.env.PORT` and falls back to port `4000`. Verify it with:

```text
GET http://localhost:4000/
```

Expected response:

```text
API Working
```

Start the customer application in a separate terminal:

```powershell
Set-Location client
npm run dev
```

Start the admin application in another terminal:

```powershell
Set-Location admin
npm run dev
```

## Available scripts

### Client and admin

Run these commands from the relevant directory:

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

### Server

```powershell
npm run server
```

The server's `npm test` command is currently a placeholder and no server test runner is configured.

## Deployment

### Backend on Render

Create a Render Web Service connected to the repository with:

| Setting | Value |
|---|---|
| Root Directory | `server` |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `node server.js` |

Add these environment variables in Render:

```env
PORT=<provided by Render or omit>
MONGO_URI=<production MongoDB connection string>
JWT_SECRET=<long production secret>
STRIPE_SECRET_KEY=<production Stripe secret key>
```

The current deployed API URL is:

```text
https://tomato-food-delivery-1v8c.onrender.com
```

Test the deployment:

```text
GET https://tomato-food-delivery-1v8c.onrender.com/
```

### Customer frontend on Vercel

Create a Vercel project using the repository and configure:

| Setting | Value |
|---|---|
| Root Directory | `client` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Add this environment variable in Vercel for the required deployment environments:

```env
VITE_API_URL=https://tomato-food-delivery-1v8c.onrender.com
```

Redeploy after adding or changing the variable because Vite injects environment values during the build.

### Admin frontend on Vercel

Create a second Vercel project:

| Setting | Value |
|---|---|
| Root Directory | `admin` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Add the same API variable:

```env
VITE_API_URL=https://tomato-food-delivery-1v8c.onrender.com
```

## Production considerations

- Set `FRONTEND_URL` on the server and use it for Stripe success and cancellation redirects. The current order controller still contains a local frontend URL and should be updated before production payment testing.
- Restrict CORS to the deployed customer and admin frontend domains instead of allowing every origin.
- Render's local filesystem is ephemeral. Uploaded files in `server/uploads/` may be lost after redeployments or service restarts. Use persistent object storage such as Cloudinary or Amazon S3 for production images.
- Use Stripe live keys only for real payments and keep all secret keys server-side.
- Configure MongoDB Atlas network access for the Render service.
- Do not place `MONGO_URI`, `JWT_SECRET`, or `STRIPE_SECRET_KEY` in frontend environment variables.
- Configure SPA rewrites on the frontend host if direct navigation to routes such as `/cart`, `/order`, `/add`, or `/orders` returns a 404.

## API reference

### Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API health check |

### Users

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/user/register` | Register a user and return a JWT |
| `POST` | `/api/user/login` | Authenticate a user and return a JWT |

### Food

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/food/add` | Add a food item using multipart form data |
| `GET` | `/api/food/list` | List food items |
| `POST` | `/api/food/remove` | Remove a food item and its image |

### Cart

Cart endpoints require the JWT in the `token` request header.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/cart/add` | Add an item to the authenticated user's cart |
| `POST` | `/api/cart/remove` | Remove one item quantity |
| `POST` | `/api/cart/get` | Retrieve the authenticated user's cart |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/order/place` | Create an order and Stripe Checkout session |
| `POST` | `/api/order/verify` | Verify or cancel an order after checkout |
| `POST` | `/api/order/userorders` | Retrieve orders for the authenticated user |
| `GET` | `/api/order/list` | List all orders for the admin dashboard |
| `POST` | `/api/order/status` | Update an order status |

## Troubleshooting

### Requests go to `/undefined/api/...`

The deployed frontend does not have `VITE_API_URL`. Add it to the frontend hosting provider and redeploy:

```env
VITE_API_URL=https://tomato-food-delivery-1v8c.onrender.com
```

### Requests still go to `localhost:4000`

The frontend was built before the production variable was added. Trigger a fresh deployment and rebuild.

### The API is unreachable

Check the Render service logs, confirm MongoDB connectivity, and open:

```text
https://tomato-food-delivery-1v8c.onrender.com/
```

### Authentication fails

Check that the request reaches `/api/user/login` or `/api/user/register`, that the credentials are valid, and that the server has a configured `JWT_SECRET`.

## Current deployment status

- Backend: deployed on Render at `https://tomato-food-delivery-1v8c.onrender.com`
- Frontend deployments: configure `VITE_API_URL` in the hosting provider before rebuilding
- Admin and customer applications remain separate deployments
