import { CategoryAction } from '@/contexts/expenses.context';
import { BaseCategoryService, BaseDatabase, Category } from '@/models';

export default class CategoryService implements BaseCategoryService {
  constructor(
    private dispatch: React.Dispatch<CategoryAction>,
    private db: BaseDatabase,
  ) {}

  async addCategory(category: Category) {
    try {
      await this.db.addCategory(category);
    } catch (e) {
      return e instanceof Error
        ? e
        : new Error('An error occurred while adding the category');
    }

    this.dispatch({ type: 'ADD_CATEGORY', payload: category });
    return null;
  }

  async deleteCategory(name: string) {
    try {
      await this.db.deleteCategory(name);
    } catch (e) {
      return e instanceof Error
        ? e
        : new Error('An error occurred while removing the category');
    }

    this.dispatch({ type: 'DELETE_CATEGORY', payload: name });
    return null;
  }
}
