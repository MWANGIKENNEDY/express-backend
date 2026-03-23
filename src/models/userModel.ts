// Optional: business logic / ORM models
import { usersTable } from '../db/schema/user.js';

// Core table types
export type User = typeof usersTable.$inferSelect;       // Complete row from SELECT
export type NewUser = typeof usersTable.$inferInsert;   // Data for INSERT
//export type UserUpdate = typeof usersTable.$inferUpdate; // Data for UPDATE (all optional)
// Custom query types (examples)
// export type UserSummary = { id: number; name: string; email: string };
// export type UserProfile = Omit<User, 'id'>;
// export type PublicUser = Omit<User, 'email'>;