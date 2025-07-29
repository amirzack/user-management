/**
 * LoginPage
 * --------------
 * container هوشمند برای صفحه ورود.
 * مسئول منطق ورود، navigation، مدیریت state و اتصال به hook احراز هویت.
 * هیچ عنصر UI مربوط به فرم داخل این فایل نیست.
 *
 * Smart container for Login (handles auth logic, navigation & error handling).
 * Uses LoginForm as a presentational, stateless component.
 */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Card } from "antd";
import type { LoginCredentials } from "../types";
import { LoginForm } from "../components/ui/loginForm";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loginAttempted, setLoginAttempted] = useState(false);

  // اگر قبلاً لاگین کرده بود
  useEffect(() => {
    if (isAuthenticated && !loginAttempted) {
      navigate("/users", { replace: true });
    }
  }, [isAuthenticated, loginAttempted, navigate]);

  // بعد از لاگین موفق
  useEffect(() => {
    if (isAuthenticated && loginAttempted) {
      toast.success("ورود موفقیت‌آمیز بود!");
      setTimeout(() => {
        navigate("/users", { replace: true });
      }, 500);
    }
  }, [isAuthenticated, loginAttempted, navigate]);
  // هندل لاگین فرم
  const handleSubmit = async (values: LoginCredentials) => {
    setLoginAttempted(true);
    try {
      await login(values);
    } catch (error) {
      toast.error("نام کاربری یا رمز عبور اشتباه است");
      setLoginAttempted(false);
    }
  };

  return (
    <div className="center-con">
      <Card title="ورود به سیستم" style={{ width: 400 }}>
        {/*Login Form */}
        <LoginForm
          isLoading={isLoading}
          error={error}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
};
