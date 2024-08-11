import React, { useState } from 'react';

import { useExpenses } from '@/lib/hooks';
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
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
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

// function isReadyToSubmit({ amount, category, description }: Partial<Expense>) {
//   return amount && category && description;
// }

function ExpenseForm({
  expense,
  onClose,
}: {
  expense?: Expense;
  onClose: () => void;
}) {
  const { dispatch } = useExpenses();
  const [formData, setFormData] = useState<Expense>({
    id: expense ? expense.id : '',
    amount: expense ? expense.amount : 0,
    date: expense ? expense.date : '',
    category: expense ? expense.category : '',
    description: expense ? expense.description : '',
    source: 'cash',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expense) {
      dispatch({ type: 'EDIT_EXPENSE', payload: formData });
    } else {
      dispatch({
        type: 'ADD_EXPENSE',
        payload: { ...formData, id: Date.now().toString() },
      });
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
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
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
          value={formData.source}
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
  const { state, dispatch } = useExpenses();

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-medium mb-4">Expense List</h2>
      <ul className="space-y-4">
        {state.expenses.map((expense) => (
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
              <span className="text-sm text-gray-500">{expense.source}</span>
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
