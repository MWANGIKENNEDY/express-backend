// Users-related routes
import { Router } from 'express';
import { UserService } from '../../services/userService.js';

const usersRouter = Router();

// TODO: Implement user routes
usersRouter.get('/', async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});



usersRouter.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

export { usersRouter };