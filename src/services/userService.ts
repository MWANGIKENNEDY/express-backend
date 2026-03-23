// Services for business logic, DB queries
import { db } from '../db/drizzle.js';
import { usersTable } from '../db/schema/user.js';
import { eq } from 'drizzle-orm';
import type { User, NewUser } from '../models/userModel.js';

export class UserService {
  
  static async getAllUsers(): Promise<User[]> {
    return await db.select().from(usersTable);
  }

  static async getUserById(id: number): Promise<User | undefined> {
    const users = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return users[0];
  }

  static async createUser(userData: NewUser): Promise<User> {
    const [user] = await db.insert(usersTable).values(userData).returning();
    return user!;
  }
}