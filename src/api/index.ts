// API route aggregator
// This file centralizes all API route exports for cleaner imports

// Current usage (direct imports):
// import { usersRouter } from './users/index.js';

// Alternative usage with this aggregator:
// import { usersRouter } from './api/index.js';
// or import multiple: import { usersRouter, groceriesRouter } from './api/index.js';

// When you have many routes, this becomes more valuable:
// Instead of:
//   import { usersRouter } from './api/users/index.js';
//   import { groceriesRouter } from './api/groceries/index.js';
//   import { productsRouter } from './api/products/index.js';
//   import { ordersRouter } from './api/orders/index.js';
// You can do:
//   import { usersRouter, groceriesRouter, productsRouter, ordersRouter } from './api/index.js';

export * from './users/index.js';
export * from './groceries/index.js';

// Add more route exports as you create them:
// export * from './products/index.js';
// export * from './orders/index.js';
// export * from './auth/index.js';

// Alternative pattern - create a single API router:
// import { Router } from 'express';
// import { usersRouter } from './users/index.js';
// import { groceriesRouter } from './groceries/index.js';
// 
// const apiRouter = Router();
// apiRouter.use('/users', usersRouter);
// apiRouter.use('/groceries', groceriesRouter);
// apiRouter.use('/products', productsRouter);
// 
// export { apiRouter };
//
// Then in app.ts: app.use('/api', apiRouter);
// This gives you URLs like: /api/users, /api/groceries, /api/products