/**
 * LoginForm
 * ---------
 * فرم ورود (stateless) که فقط نمایش UI و مقادیر ورودی را مدیریت می‌کند.
 * هیچ وابستگی به منطق auth یا navigation ندارد.
 *
 * Stateless Login Form component – displays username/password fields and handles submission.
 * Presentation only (UI), logic comes from parent.
 */

import { Form, Input, Button } from "antd";
import type { LoginFormProps, LoginCredentials } from "../../types";
import { CustomText } from "../common/typography/CustomText";

export const LoginForm = ({ isLoading, error, onSubmit }: LoginFormProps) => {
  const [form] = Form.useForm<LoginCredentials>();

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        style={{ width: "100%" }}
      >
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
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
            data-testid="submit-btn"
          >
            ورود
          </Button>
        </Form.Item>

        {/* نمایش خطا در صورت وجود */}
        {error && (
          <div style={{ marginTop: 8, color: "red" }}>خطا: {error}</div>
        )}
      </Form>
      <CustomText>نام کاربری:admin رمز عبور:123456</CustomText>
    </>
  );
};
