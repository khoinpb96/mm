import React, { useCallback, useState } from 'react';

import { useExpenses } from '@/contexts/expenses.context';
import { Expense } from '@/models';

export default function Dashboard() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAddExpense = () => {
    setEditingExpense(null);
    setFormOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddExpense}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
        >
          Add Expense
        </button>
      </div>
      {isFormOpen && (
        <ExpenseForm
          expense={editingExpense || undefined}
          onClose={handleCloseForm}
        />
      )}
      <ExpenseList onEdit={handleEditExpense} />
    </div>
  );
}

function ExpenseForm({
  expense,
  onClose,
}: {
  expense?: Expense;
  onClose: () => void;
}) {
  const { state, expenseService } = useExpenses();
  const { categories } = state;

  const [formData, setFormData] = useState<Expense>({
    id: expense ? expense.id : '',
    amount: expense ? expense.amount : 0,
    date: expense ? expense.date : '',
    category: expense ? expense.category : '',
    description: expense ? expense.description : '',
    paymentMethod: expense ? expense.paymentMethod : 'cash',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expense) {
      console.error('Not implemented');
    } else {
      expenseService.addExpense(formData);
    }
    onClose();
  };

  return (
    <form className="bg-white p-4 rounded-md shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category:
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="source"
          className="block text-sm font-medium text-gray-700"
        >
          Payment Method:
        </label>
        <select
          id="source"
          name="source"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="cash">Cash</option>
          <option value="credit">Credit Card</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
        >
          {expense ? 'Update' : 'Add'} Expense
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ExpenseList({ onEdit }: { onEdit: (expense: Expense) => void }) {
  const { state, expenseService } = useExpenses();
  const { expenses } = state;

  const handleDelete = useCallback((id: string) => {
    expenseService.deleteExpense(id);
  }, []);

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-medium mb-4">Expense List</h2>
      <ul className="space-y-4">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex items-center justify-between p-2 border-b last:border-b-0"
          >
            <div className="flex flex-col">
              <span className="font-semibold">{expense.amount}</span>
              <span className="text-sm text-gray-500">{expense.date}</span>
              <span className="text-sm text-gray-500">{expense.category}</span>
              <span className="text-sm text-gray-500">
                {expense.description}
              </span>
              <span className="text-sm text-gray-500">
                {expense.paymentMethod}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(expense)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(expense.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
