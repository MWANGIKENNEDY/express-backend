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

- `DATABASE_URL` - Neon DB URL, JWT secret