import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';

import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Budget from './pages/Budget';
import Income from './pages/Income';
import Categories from './pages/Categories';
import Login from './pages/Login';
import ProtectedRoute from './shared/auth/ProtectedRoute';
import Profile from './pages/Profile';
import Deductions from './pages/Deductions';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login public */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/deduction" element={<Deductions />} />
                  <Route path="/income" element={<Income />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
