// Grocery item model types
import { groceryItems } from '../db/schema/groceryItems.js';

// Core table types
export type GroceryItem = typeof groceryItems.$inferSelect;       // Complete row from SELECT
export type NewGroceryItem = typeof groceryItems.$inferInsert;   // Data for INSERT
// export type GroceryItemUpdate = typeof groceryItems.$inferUpdate; // Data for UPDATE (all optional)

// // Custom types for specific use cases
// export type GroceryItemSummary = Pick<GroceryItem, 'id' | 'name' | 'purchased'>;
// export type GroceryItemsByCategory = {
//   category: string;
//   items: GroceryItem[];
// };