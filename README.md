# My App

A Node.js/Express API with TypeScript and Drizzle ORM.

## Project Structure

```
src/
├── api/           # All route handlers (like controllers)
├── db/            # Database setup & Drizzle ORM configs
├── models/        # Optional: business logic / ORM models
├── services/      # Services for business logic, DB queries
├── middlewares/   # Express middlewares (auth, logging, error handling)
├── utils/         # Utility functions (helpers, constants)
├── app.ts         # Express app setup (middleware, routes)
└── server.ts      # Server startup file
```

## Getting Started

1. Install dependencies: `npm install`
2. Set up your `.env` file with `DATABASE_URL`
3. Run the server: `npm run dev`

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

- `DATABASE_URL` - Your Neon PostgreSQL database URL
- `CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key
- `CLERK_SECRET_KEY` - Your Clerk secret key
- `PORT` - Server port (default: 3000)

## API Endpoints

- `GET /api/groceries` - Get all grocery items
- `GET /api/groceries/:id` - Get specific item
- `POST /api/groceries` - Create new item
- `PATCH /api/groceries/:id` - Update item
- `DELETE /api/groceries/:id` - Delete item
- `GET /api/groceries/purchased` - Get purchased items
- `GET /api/groceries/unpurchased` - Get unpurchased items
- `POST /api/groceries/clear-purchased` - Clear all purchased items
- `GET /api/groceries/category/:category` - Get items by category