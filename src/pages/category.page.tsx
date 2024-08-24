import React, { useState } from 'react';

import { useExpenses } from '@/contexts/expenses.context';
import { Category } from '@/models';

export default function CategoryPage() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>
      {isFormOpen && (
        <CategoryForm
          category={editingCategory || undefined}
          onClose={handleCloseForm}
        />
      )}
      <CategoryList onEdit={handleEditCategory} />
    </div>
  );
}

const CategoryForm: React.FC<{ category?: Category; onClose: () => void }> = ({
  category,
  onClose,
}) => {
  const { categoryService } = useExpenses();
  const [name, setName] = useState(category ? category.name : '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = await categoryService.addCategory({ name });
    if (err) {
      console.error(err.message);
      return;
    }

    onClose();
  };

  return (
    <form className="bg-white p-4 rounded-md shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Category Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
        >
          {category ? 'Update' : 'Add'} Category
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
};

const CategoryList: React.FC<{ onEdit: (category: Category) => void }> = ({
  onEdit,
}) => {
  const { state, categoryService } = useExpenses();

  const handleDelete = async (name: string) => {
    const err = await categoryService.deleteCategory(name);
    if (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-medium mb-4">Category List</h2>
      <ul className="space-y-4">
        {state.categories.map((category) => (
          <li
            key={category.name}
            className="flex items-center justify-between p-2 border-b last:border-b-0"
          >
            <span className="font-semibold">{category.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(category)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.name)}
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
};
