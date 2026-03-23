// Services for grocery items business logic, DB queries
import { db } from '../db/drizzle.js';
import { groceryItems } from '../db/schema/groceryItems.js';
import { eq } from 'drizzle-orm';
import type { GroceryItem, NewGroceryItem, GroceryItemUpdate } from '../models/groceryItemModel.js';

export class GroceryService {
  static async getAllItems(): Promise<GroceryItem[]> {
    return await db.select().from(groceryItems);
  }

  static async getItemById(id: string): Promise<GroceryItem | undefined> {
    const items = await db.select().from(groceryItems).where(eq(groceryItems.id, id));
    return items[0];
  }

  static async createItem(itemData: NewGroceryItem): Promise<GroceryItem> {
    const [item] = await db.insert(groceryItems).values(itemData).returning();
    return item!;
  }

  static async updateItem(id: string, itemData: GroceryItemUpdate): Promise<GroceryItem | undefined> {
    const [item] = await db
      .update(groceryItems)
      .set({ ...itemData, updated_at: Date.now() })
      .where(eq(groceryItems.id, id))
      .returning();
    return item;
  }

  static async deleteItem(id: string): Promise<boolean> {
    const result = await db.delete(groceryItems).where(eq(groceryItems.id, id));
    return result.rowCount > 0;
  }

  static async getItemsByCategory(category: string): Promise<GroceryItem[]> {
    return await db.select().from(groceryItems).where(eq(groceryItems.category, category));
  }

  static async getPurchasedItems(): Promise<GroceryItem[]> {
    return await db.select().from(groceryItems).where(eq(groceryItems.purchased, true));
  }

  static async getUnpurchasedItems(): Promise<GroceryItem[]> {
    return await db.select().from(groceryItems).where(eq(groceryItems.purchased, false));
  }
}