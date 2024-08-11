export interface Expense {
  id: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  source: 'cash';
}
