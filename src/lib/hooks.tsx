import { useContext } from 'react';

import { ExpensesContext } from '@/contexts/expenses.context';

export const useExpenses = () => {
  const context = useContext(ExpensesContext);

  if (context === null) {
    throw new Error('useExpenses must be used inside ExpensesProvider');
  }

  return context;
};
