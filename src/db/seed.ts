// Database seeding script
import { db } from './drizzle.js';
import { groceryItems } from './schema/groceryItems.js';
import { usersTable } from './schema/user.js';
import type { NewGroceryItem } from '../models/groceryItemModel.js';
import type { NewUser } from '../models/userModel.js';

// Sample grocery items data
const sampleGroceryItems: NewGroceryItem[] = [
  {
    id: 'item-1',
    name: 'Bananas',
    category: 'Fruits',
    quantity: 6,
    purchased: false,
    priority: 'high',
    updated_at: Date.now(),
  },
  {
    id: 'item-2',
    name: 'Whole Milk',
    category: 'Dairy',
    quantity: 1,
    purchased: false,
    priority: 'high',
    updated_at: Date.now(),
  },
  {
    id: 'item-3',
    name: 'Chicken Breast',
    category: 'Meat',
    quantity: 2,
    purchased: true,
    priority: 'medium',
    updated_at: Date.now(),
  },
  {
    id: 'item-4',
    name: 'Brown Rice',
    category: 'Grains',
    quantity: 1,
    purchased: false,
    priority: 'low',
    updated_at: Date.now(),
  },
  {
    id: 'item-5',
    name: 'Spinach',
    category: 'Vegetables',
    quantity: 1,
    purchased: false,
    priority: 'medium',
    updated_at: Date.now(),
  },
  {
    id: 'item-6',
    name: 'Greek Yogurt',
    category: 'Dairy',
    quantity: 4,
    purchased: true,
    priority: 'medium',
    updated_at: Date.now(),
  },
  {
    id: 'item-7',
    name: 'Olive Oil',
    category: 'Pantry',
    quantity: 1,
    purchased: false,
    priority: 'low',
    updated_at: Date.now(),
  },
  {
    id: 'item-8',
    name: 'Tomatoes',
    category: 'Vegetables',
    quantity: 4,
    purchased: false,
    priority: 'high',
    updated_at: Date.now(),
  },
  {
    id: 'item-9',
    name: 'Bread',
    category: 'Bakery',
    quantity: 1,
    purchased: true,
    priority: 'medium',
    updated_at: Date.now(),
  },
  {
    id: 'item-10',
    name: 'Eggs',
    category: 'Dairy',
    quantity: 12,
    purchased: false,
    priority: 'high',
    updated_at: Date.now(),
  },
  {
    id: 'item-11',
    name: 'Apples',
    category: 'Fruits',
    quantity: 8,
    purchased: false,
    priority: 'medium',
    updated_at: Date.now(),
  },
  {
    id: 'item-12',
    name: 'Cheddar Cheese',
    category: 'Dairy',
    quantity: 1,
    purchased: false,
    priority: 'low',
    updated_at: Date.now(),
  },
  {
    id: 'item-13',
    name: 'Ground Beef',
    category: 'Meat',
    quantity: 2,
    purchased: false,
    priority: 'high',
    updated_at: Date.now(),
  },
  {
    id: 'item-14',
    name: 'Pasta',
    category: 'Grains',
    quantity: 2,
    purchased: false,
    priority: 'medium',
    updated_at: Date.now(),
  },
  {
    id: 'item-15',
    name: 'Carrots',
    category: 'Vegetables',
    quantity: 10,
    purchased: false,
    priority: 'medium',
    updated_at: Date.now(),
  },
  {
    id: 'item-16',
    name: 'Orange Juice',
    category: 'Beverages',
    quantity: 1,
    purchased: true,
    priority: 'low',
    updated_at: Date.now(),
  },
  {
    id: 'item-17',
    name: 'Salmon Fillet',
    category: 'Meat',
    quantity: 2,
    purchased: false,
    priority: 'high',
    updated_at: Date.now(),
  },
  {
    id: 'item-18',
    name: 'Broccoli',
    category: 'Vegetables',
    quantity: 2,
    purchased: false,
    priority: 'medium',
    updated_at: Date.now(),
  },
  {
    id: 'item-19',
    name: 'Peanut Butter',
    category: 'Pantry',
    quantity: 1,
    purchased: false,
    priority: 'low',
    updated_at: Date.now(),
  },
  {
    id: 'item-20',
    name: 'Coffee',
    category: 'Beverages',
    quantity: 1,
    purchased: false,
    priority: 'high',
    updated_at: Date.now(),
  },
];

// Sample users data
const sampleUsers: NewUser[] = [
  {
    name: 'John Doe',
    age: 28,
    email: 'john@example.com',
  },
  {
    name: 'Jane Smith',
    age: 32,
    email: 'jane@example.com',
  },
];

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data (optional - be careful in production!)
    console.log('🗑️  Clearing existing data...');
    await db.delete(groceryItems);
    await db.delete(usersTable);

    // Insert grocery items
    console.log('🛒 Inserting grocery items...');
    await db.insert(groceryItems).values(sampleGroceryItems);
    console.log(`✅ Inserted ${sampleGroceryItems.length} grocery items`);

    // Insert users
    console.log('👥 Inserting users...');
    await db.insert(usersTable).values(sampleUsers);
    console.log(`✅ Inserted ${sampleUsers.length} users`);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => {
      console.log('✨ Seeding finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
}

export { seed };