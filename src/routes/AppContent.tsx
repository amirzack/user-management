import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "../routes/AppLayout";
import { UsersPage } from "../pages/UserPage";
import { UserDetail } from "../pages/UserDetail";
import { ProfilePage } from "../pages/ProfilePage";
import Spinner from "../components/ui/spinner";
import { Toaster } from "react-hot-toast";

/**
 * AppContent
 * -------------
 * Single entry-point for app routing, authentication state initialization, and layout structure.
 *
 * توضیحات کلی:
 * - با mount کامپوننت، تابع authenticateUser اجرا می‌شود (برای بررسی لاگین بودن کاربر یا بارگذاری داده auth از سرور/localStorage).
 * - در صورت آماده نشدن اپ ("isInitialized" بعد از احراز هویت)، فقط spinner لودینگ نمایش داده می‌شود (جلوگیری از نمایش کامپوننت‌های داخلی تا وقتی auth تکمیل نشده).
 * - پس از آماده شدن، مسیرهای برنامه با react-router تعریف می‌شود:
 *   - "/login": صفحه لاگین (عمومی)
 *   - سایر مسیرها فقط بعد از احراز هویت و در لایه <ProtectedRoute> و در Layout:
 *      - "/users": لیست کاربران
 *      - "/users/:id": جزئیات کاربر
 *      - "/profile": پروفایل کاربر
 *   - هر مسیری ناشناس، پیام خطا ("صفحه پیدا نشد") می‌دهد.
 *   - روت "/" همیشه به "/users" ریدایرکت می‌کند.
 * 
 * اجزای کلیدی:
 * - استفاده از <ProtectedRoute> برای جلوگیری از دسترسی به صفحات داخلی بدون احراز هویت
 * - نمایش spinner و پیام آماده‌سازی حین راه‌اندازی اولیه برنامه
 * - ساختاردهی روتینگ داخل <AppLayout> برای داشتن هدر، سایدبار و ... سراسری
 
 */

export const AppContent = () => {
  const { authenticateUser, isInitialized } = useAuth();

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  if (!isInitialized) {
    return (
      <div className="center-con">
        <Spinner />
        <span style={{ marginTop: 10 }}>در حال راه‌اندازی برنامه...</span>
      </div>
    );
  }

  return (
    <>
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
                    <Route
                      path="/"
                      element={<Navigate to="/users" replace />}
                    />
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
      {/*Toaster Component */}
      <Toaster
        position="top-left"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
};
