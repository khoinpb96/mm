import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from '@/components/layout';
import { ExpensesProvider } from '@/contexts/expenses.context';
import '@/index.css';
import CategoryPage from '@/pages/category.page';
import DashboardPage from '@/pages/dashboard.page';

const App: React.FC = () => {
  return (
    <ExpensesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="2" element={<div>Implementing...</div>} />
            <Route path="3" element={<div>Implementing...</div>} />
          </Route>
        </Routes>
      </Router>
    </ExpensesProvider>
  );
};

export default App;
