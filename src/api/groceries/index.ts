// Groceries-related routes
import { Router } from 'express';
import type { Request, Response } from 'express';
import { GroceryService } from '../../services/groceryService.js';
import { getAuth } from '@clerk/express';

const groceriesRouter = Router();

// Apply auth to all routes - returns JSON error for API
groceriesRouter.use((req, res, next) => {
  console.log('Auth middleware - Checking authentication');
  const { userId } = getAuth(req);
  console.log('Auth middleware - userId:', userId);
  if (!userId) {
    console.log('Auth middleware - No userId found, returning 401');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  console.log('Auth middleware - Authentication successful, proceeding to route');
  next();
});

// GET /api/groceries - Get all grocery items
groceriesRouter.get('/', async (req: Request, res: Response) => {
  try {
    console.log('GET /api/groceries - Fetching all items');
    const items = await GroceryService.getAllItems();
    console.log(`GET /api/groceries - Found ${items.length} items`);
    res.json(items);
  } catch (error) {
    console.error('Error fetching grocery items:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ error: 'Failed to fetch grocery items' });
  }
});

// GET /api/groceries/:id - Get specific grocery item
groceriesRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    console.log(`GET /api/groceries/${id} - Fetching item`);
    const item = await GroceryService.getItemById(id);
    
    if (!item) {
      console.log(`GET /api/groceries/${id} - Item not found`);
      return res.status(404).json({ error: 'Grocery item not found' });
    }
    
    console.log(`GET /api/groceries/${id} - Item found:`, item);
    res.json(item);
  } catch (error) {
    const id = req.params.id as string;
    console.error(`Error fetching grocery item ${id}:`, error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ error: 'Failed to fetch grocery item' });
  }
});

// GET /api/groceries/category/:category - Get items by category
groceriesRouter.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const category = req.params.category as string;
    console.log(`GET /api/groceries/category/${category} - Fetching items`);
    const items = await GroceryService.getItemsByCategory(category);
    console.log(`GET /api/groceries/category/${category} - Found ${items.length} items`);
    res.json(items);
  } catch (error) {
    const category = req.params.category as string;
    console.error(`Error fetching items by category ${category}:`, error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ error: 'Failed to fetch items by category' });
  }
});

// GET /api/groceries/purchased - Get purchased items
groceriesRouter.get('/purchased', async (req: Request, res: Response) => {
  try {
    console.log('GET /api/groceries/purchased - Fetching purchased items');
    const items = await GroceryService.getPurchasedItems();
    console.log(`GET /api/groceries/purchased - Found ${items.length} items`);
    res.json(items);
  } catch (error) {
    console.error('Error fetching purchased items:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ error: 'Failed to fetch purchased items' });
  }
});

// GET /api/groceries/unpurchased - Get unpurchased items
groceriesRouter.get('/unpurchased', async (req: Request, res: Response) => {
  try {
    console.log('GET /api/groceries/unpurchased - Fetching unpurchased items');
    const items = await GroceryService.getUnpurchasedItems();
    console.log(`GET /api/groceries/unpurchased - Found ${items.length} items`);
    res.json(items);
  } catch (error) {
    console.error('Error fetching unpurchased items:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ error: 'Failed to fetch unpurchased items' });
  }
});

// POST /api/groceries - Create new grocery item
groceriesRouter.post('/', async (req: Request, res: Response) => {
  try {
    console.log('POST /api/groceries - Creating item with data:', req.body);
    const itemData = {
      ...req.body,
      updated_at: Date.now(),
    };
    
    const item = await GroceryService.createItem(itemData);
    console.log('POST /api/groceries - Item created:', item);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating grocery item:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ error: 'Failed to create grocery item' });
  }
});

// PUT /api/groceries/:id - Update grocery item
groceriesRouter.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    console.log(`PATCH /api/groceries/${id} - Updating item with data:`, req.body);
    const item = await GroceryService.updateItem(id, req.body);
    
    if (!item) {
      console.log(`PATCH /api/groceries/${id} - Item not found`);
      return res.status(404).json({ error: 'Grocery item not found' });
    }
    
    console.log(`PATCH /api/groceries/${id} - Item updated:`, item);
    res.json(item);
  } catch (error) {
    const id = req.params.id as string;
    console.error(`Error updating grocery item ${id}:`, error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ error: 'Failed to update grocery item' });
  }
});

// DELETE /api/groceries/:id - Delete grocery item
groceriesRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    console.log(`DELETE /api/groceries/${id} - Deleting item`);
    const deleted = await GroceryService.deleteItem(id);
    
    if (!deleted) {
      console.log(`DELETE /api/groceries/${id} - Item not found`);
      return res.status(404).json({ error: 'Grocery item not found' });
    }
    
    console.log(`DELETE /api/groceries/${id} - Item deleted successfully`);
    res.json({ success: true });
  } catch (error) {
    const id = req.params.id as string;
    console.error(`Error deleting grocery item ${id}:`, error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ error: 'Failed to delete grocery item' });
  }
});

// POST /api/groceries/clear-purchased - Clear all purchased items
groceriesRouter.post('/clear-purchased', async (req: Request, res: Response) => {
  try {
    console.log('POST /api/groceries/clear-purchased - Clearing purchased items');
    const result = await GroceryService.clearPurchasedItems();
    console.log('POST /api/groceries/clear-purchased - Cleared items:', result);
    res.json(result);
  } catch (error) {
    console.error('Error clearing purchased items:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ error: 'Failed to clear purchased items' });
  }
});

export { groceriesRouter };