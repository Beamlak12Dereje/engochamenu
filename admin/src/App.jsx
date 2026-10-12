import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import LoginPage from './pages/LoginPage';
import ItemsPage from './pages/ItemsPage';
import CategoriesPage from './pages/CategoriesPage';
import SuggestionsPage from './pages/SuggestionsPage';
import NotFoundPage from './pages/NotFoundPage';

// Smart root redirect: go to login if not authenticated, items if authenticated
const RootRedirect = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#F9A809]"></div>
      </div>
    );
  }

  return <Navigate to={token ? '/items' : '/login'} replace />;
};

// If already logged in, don't show the login page — send them to items
const RequireGuest = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#F9A809]"></div>
      </div>
    );
  }

  if (token) {
    return <Navigate to="/items" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Route - redirect to items if already logged in */}
              <Route
                path="/login"
                element={
                  <RequireGuest>
                    <LoginPage />
                  </RequireGuest>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/items"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <ItemsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <CategoriesPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/suggestions"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <SuggestionsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Redirects */}
              <Route path="/" element={<RootRedirect />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
