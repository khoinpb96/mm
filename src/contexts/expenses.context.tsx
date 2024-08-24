/* eslint-disable react-refresh/only-export-components */
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import {
  BaseCategoryService,
  BaseDatabase,
  BaseExpenseService,
  Category,
  Expense,
} from '@/models';
import { databaseService } from '@/services';
import CategoryService from '@/services/category.service';
import ExpenseService from '@/services/expense.service';

type State = {
  expenses: Expense[];
  categories: Category[];
};

type DbAction = { type: 'SYNC_FROM_DB'; payload: State };

export type ExpenseAction =
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'EDIT_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string };

export type CategoryAction =
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'EDIT_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string };

type Action = DbAction | ExpenseAction | CategoryAction;

type Context = {
  state: State;
  expenseService: BaseExpenseService;
  categoryService: BaseCategoryService;
};

const initialState: State = {
  expenses: [],
  categories: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SYNC_FROM_DB':
      return { ...action.payload };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(
          (cat) => cat.name !== action.payload,
        ),
      };
    default:
      return state;
  }
}

export function useSyncFromDb(
  dispatch: React.Dispatch<DbAction>,
  db: BaseDatabase,
) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );

  useEffect(() => {
    (async () => {
      setStatus('loading');
      try {
        const categories = await db.getAllCategory();
        const expenses = await db.getAllExpense();
        dispatch({ type: 'SYNC_FROM_DB', payload: { categories, expenses } });
        setStatus('success');
      } catch (e) {
        console.error(e);
        setStatus('error');
      }
    })();
  }, []);

  return { isLoading: status === 'loading', isSuccess: status === 'success' };
}

export const ExpensesContext = createContext<Context | null>(null);

export const ExpensesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useSyncFromDb(dispatch, databaseService);

  return (
    <ExpensesContext.Provider
      value={{
        state,
        expenseService: new ExpenseService(dispatch, databaseService),
        categoryService: new CategoryService(dispatch, databaseService),
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (context === null) {
    throw new Error('useExpenses must be used within a ExpensesProvider');
  }
  return context;
};
