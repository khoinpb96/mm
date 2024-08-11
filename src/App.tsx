import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ExpensesProvider } from '@/contexts/expenses.context';
import '@/index.css';
import Dashboard from '@/pages/dashboard.page';

const App: React.FC = () => {
  return (
    <ExpensesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ExpensesProvider>
  );
};

export default App;
