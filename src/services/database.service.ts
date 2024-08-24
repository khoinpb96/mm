import { DBSchema, IDBPDatabase, openDB } from 'idb';

import { BaseDatabase, Category, Expense } from '@/models';

const DB_NAME = 'expenses-db';
const DB_VERSION = 1;
const EXPENSES_STORE = 'expenses';
const CATEGORIES_STORE = 'categories';

interface MyDBSchema extends DBSchema {
  [EXPENSES_STORE]: {
    key: string;
    value: Expense;
  };
  [CATEGORIES_STORE]: {
    key: string;
    value: Category;
  };
}

export default class Database implements BaseDatabase {
  private idb: IDBPDatabase<MyDBSchema> | null = null;

  async getAllCategory() {
    const db = await this.getDB();
    return await db.getAll(CATEGORIES_STORE);
  }

  async addCategory(category: Category) {
    const db = await this.getDB();
    await db.add(CATEGORIES_STORE, category);
  }

  async deleteCategory(name: string) {
    const db = await this.getDB();
    await db.delete(CATEGORIES_STORE, name);
  }

  async getAllExpense() {
    const db = await this.getDB();
    return await db.getAll(EXPENSES_STORE);
  }

  async addExpense(expense: Expense) {
    const db = await this.getDB();
    await db.add(EXPENSES_STORE, expense);
  }

  async deleteExpense(id: string) {
    const db = await this.getDB();
    await db.delete(EXPENSES_STORE, id);
  }

  private async getDB() {
    if (this.idb === null) {
      this.idb = await openDB<MyDBSchema>(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(EXPENSES_STORE)) {
            db.createObjectStore(EXPENSES_STORE, { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains(CATEGORIES_STORE)) {
            db.createObjectStore(CATEGORIES_STORE, { keyPath: 'name' });
          }
        },
      });
    }

    return this.idb;
  }
}