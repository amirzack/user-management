import {  useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Button, Card, Form, Input, message } from "antd";
import type { LoginCredentials } from "../types";

export const LoginPage: React.FC = () => {
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
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
      message.success("ورود موفقیت‌آمیز بود!");
      setTimeout(() => {
        navigate("/users", { replace: true });
      }, 500);
    }
  }, [isAuthenticated, loginAttempted, navigate]);

  const handleSubmit = async (values: LoginCredentials) => {
    setLoginAttempted(true);

    try {
      await login(values);
    } catch (error) {
      console.error("Login failed:", error);
      message.error("نام کاربری یا رمز عبور اشتباه است");
      setLoginAttempted(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card title="ورود به سیستم" style={{ width: 400 }}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="نام کاربری"
            rules={[{ required: true, message: "نام الزامی است" }]}
          >
            <Input placeholder="admin" />
          </Form.Item>

          <Form.Item
            name="password"
            label="رمز عبور"
            rules={[{ required: true, message: "رمز عبور الزامی است" }]}
          >
            <Input.Password placeholder="123456" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              ورود
            </Button>
          </Form.Item>
        </Form>

        {error && (
          <div style={{ marginTop: 16, color: "red" }}>خطا: {error}</div>
        )}
      </Card>
    </div>
  );
};
