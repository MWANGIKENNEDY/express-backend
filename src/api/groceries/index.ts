// Groceries-related routes
import { Router } from 'express';
import type { Request, Response } from 'express';
import { GroceryService } from '../../services/groceryService.js';

const groceriesRouter = Router();

// GET /api/groceries - Get all grocery items
groceriesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const items = await GroceryService.getAllItems();
    res.json(items);
  } catch (error) {
    console.error('Error fetching grocery items:', error);
    res.status(500).json({ error: 'Failed to fetch grocery items' });
  }
});

// GET /api/groceries/:id - Get specific grocery item
groceriesRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await GroceryService.getItemById(id);
    
    if (!item) {
      return res.status(404).json({ error: 'Grocery item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error fetching grocery item:', error);
    res.status(500).json({ error: 'Failed to fetch grocery item' });
  }
});

// GET /api/groceries/category/:category - Get items by category
groceriesRouter.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const items = await GroceryService.getItemsByCategory(category);
    res.json(items);
  } catch (error) {
    console.error('Error fetching items by category:', error);
    res.status(500).json({ error: 'Failed to fetch items by category' });
  }
});

// GET /api/groceries/status/purchased - Get purchased items
groceriesRouter.get('/status/purchased', async (req: Request, res: Response) => {
  try {
    const items = await GroceryService.getPurchasedItems();
    res.json(items);
  } catch (error) {
    console.error('Error fetching purchased items:', error);
    res.status(500).json({ error: 'Failed to fetch purchased items' });
  }
});

// GET /api/groceries/status/unpurchased - Get unpurchased items
groceriesRouter.get('/status/unpurchased', async (req: Request, res: Response) => {
  try {
    const items = await GroceryService.getUnpurchasedItems();
    res.json(items);
  } catch (error) {
    console.error('Error fetching unpurchased items:', error);
    res.status(500).json({ error: 'Failed to fetch unpurchased items' });
  }
});

// POST /api/groceries - Create new grocery item
groceriesRouter.post('/', async (req: Request, res: Response) => {
  try {
    const itemData = {
      ...req.body,
      updated_at: Date.now(),
    };
    
    const item = await GroceryService.createItem(itemData);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating grocery item:', error);
    res.status(500).json({ error: 'Failed to create grocery item' });
  }
});

// PUT /api/groceries/:id - Update grocery item
groceriesRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await GroceryService.updateItem(id, req.body);
    
    if (!item) {
      return res.status(404).json({ error: 'Grocery item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error updating grocery item:', error);
    res.status(500).json({ error: 'Failed to update grocery item' });
  }
});

// DELETE /api/groceries/:id - Delete grocery item
groceriesRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await GroceryService.deleteItem(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Grocery item not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting grocery item:', error);
    res.status(500).json({ error: 'Failed to delete grocery item' });
  }
});

export { groceriesRouter };