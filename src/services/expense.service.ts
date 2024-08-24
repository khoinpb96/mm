import { ExpenseAction } from '@/contexts/expenses.context';
import { BaseDatabase, BaseExpenseService, Expense } from '@/models';

export default class ExpenseService implements BaseExpenseService {
  constructor(
    private dispatch: React.Dispatch<ExpenseAction>,
    private db: BaseDatabase,
  ) {}

  async addExpense(expense: Expense) {
    try {
      await this.db.addExpense(expense);
    } catch (e) {
      return e instanceof Error
        ? e
        : new Error('An error occurred while adding the Expense');
    }

    this.dispatch({ type: 'ADD_EXPENSE', payload: expense });
    return null;
  }

  async deleteExpense(name: string) {
    try {
      await this.db.deleteExpense(name);
    } catch (e) {
      return e instanceof Error
        ? e
        : new Error('An error occurred while removing the Expense');
    }

    this.dispatch({ type: 'DELETE_EXPENSE', payload: name });
    return null;
  }
}