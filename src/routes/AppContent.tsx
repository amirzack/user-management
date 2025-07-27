import { useEffect } from "react";
import { ThemeService } from "../services/themeService";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/ui/loadingSpinner";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "../components/layout/Applayout";
import { UsersPage } from "../pages/UserPage";
import { UserDetail } from "../pages/UserDetail";
import { ProfilePage } from "../pages/ProfilePage";
export const AppContent: React.FC = () => {
  const { authenticateUser, isInitialized } = useAuth();

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  if (!isInitialized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <LoadingSpinner />
        <span style={{ marginTop: 10 }}>در حال راه‌اندازی برنامه...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Routes>
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/users/:id" element={<UserDetail />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/" element={<Navigate to="/users" replace />} />
                  <Route path="*" element={<div>صفحه پیدا نشد</div>} />
                </Routes>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="*" element={<div>صفحه پیدا نشد</div>} />
      </Routes>
    </BrowserRouter>
  );
};
