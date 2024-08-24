export type Expense = {
  id: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  paymentMethod: string;
};

export type Category = {
  name: string;
};

export interface BaseDatabase {
  // Category
  getAllCategory: () => Promise<Category[]>;
  addCategory: (category: Category) => Promise<void>;
  deleteCategory: (name: string) => Promise<void>;

  // Expense
  getAllExpense: () => Promise<Expense[]>;
  addExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

export interface BaseCategoryService {
  addCategory(category: Category): Promise<Error | null>;
  deleteCategory: (name: string) => Promise<Error | null>;
}

export interface BaseExpenseService {
  addExpense(expense: Expense): Promise<Error | null>;
  deleteExpense(id: string): Promise<Error | null>;
}
