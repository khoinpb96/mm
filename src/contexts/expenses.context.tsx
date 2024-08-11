import React, { createContext, useReducer } from 'react';

import { Expense } from '@/models';

type State = {
  expenses: Expense[];
};

type Action =
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'EDIT_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string };

const initialState: State = {
  expenses: [],
};

export const ExpensesContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function expensesReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'EDIT_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((exp) =>
          exp.id === action.payload.id ? action.payload : exp,
        ),
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((exp) => exp.id !== action.payload),
      };
    default:
      return state;
  }
}

export function ExpensesProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(expensesReducer, initialState);

  return (
    <ExpensesContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpensesContext.Provider>
  );
}
