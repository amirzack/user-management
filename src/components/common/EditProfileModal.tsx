/**
 * EditProfileModal
 * ================
 * --- English Description ---
 * - Pure UI component for editing user's profile inside a modal.
 * - Contains NO data logic and NO internal state except AntD form instance.
 * - Form values are pre-filled from `user`. Submission and submit loading state are handled via props.
 * - For maximum flexibility: `form`, `onSubmit`, `loading`, and `onCancel` are injected from parent/container.
 *
 * --- مشخصات فارسی ---
 * - کامپوننت فرم ویرایش پروفایل به صورت مودال
 * - فاقد هرگونه لاجیک دیتا (mutation یا مدیریت state)
 * - کنترل نمایش/بستن و ثبت فرم به صورت کامل توسط پراپ‌ها (از parent) انجام می‌شود
 * - فرم با اطلاعات `user` پر می‌شود و فقط هنگام ثبت، رویداد را بالا می‌فرستد
 *
 * Props:
 *  - open: نمایش / مخفی بودن مودال (از بالا کنترل می‌شود)
 *  - onCancel: تابع بستن مودال (reset/close)
 *  - user: اطلاعات یوزر جاری برای pre-fill فرم (type: Admin)
 *  - onSubmit: هندلر ارسال فرم (callback)
 *  - loading: وضعیت لودینگ حین ثبت (isSubmitting)
 *  - form: اینستنس فرم AntD (برای کنترل و validation بیرونی)
 *
 * ---------------------------------
 * Usage مثال:
 *
 *   <EditProfileModal
 *     open={editVisible}
 *     onCancel={handleCancel}
 *     user={user}
 *     onSubmit={handleSubmit}
 *     loading={isLoading}
 *     form={form}
 *   />

 */
import { Modal, Form, Input, Button, Row, Col, Space, Avatar } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { EditProfileModalProps } from "../../types";

const { TextArea } = Input;

export const EditProfileModal = ({
  open,
  onCancel,
  user,
  onSubmit,
  loading,
  form,
}: EditProfileModalProps & {
  onSubmit: (values: any) => void;
  loading: boolean;
  form: any;
}) => {
  return (
    <Modal
      title={
        <Space>
          <EditOutlined style={{ color: "#1890ff" }} />
          <span>ویرایش پروفایل</span>
        </Space>
      }
      open={open}
      onCancel={onCancel}
      width={600}
      footer={null}
      centered
      style={{ borderRadius: "12px" }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: 24,
          padding: "16px 0",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Avatar
          size={80}
          icon={<UserOutlined />}
          style={{
            backgroundColor: "#1890ff",
            marginBottom: 8,
          }}
        />
        <div style={{ color: "#595959" }}>{user.email}</div>
      </div>
      {/*Form Section */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          name: user.name,
          email: user.email,
          phone: user.phone,
          bio: user.bio,
        }}
        size="large"
        requiredMark={false}
      >
        {/* Inputs */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
              label="نام"
              rules={[
                { required: true, message: "لطفاً نام خود را وارد کنید" },
                { min: 2, message: "نام باید حداقل ۲ کاراکتر باشد" },
                { max: 50, message: "نام نباید بیش از ۵۰ کاراکتر باشد" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#1890ff" }} />}
                placeholder="نام و نام خانوادگی"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="email"
              label="ایمیل"
              rules={[
                { required: true, message: "لطفاً ایمیل خود را وارد کنید" },
                { type: "email", message: "فرمت ایمیل صحیح نیست" },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#1890ff" }} />}
                placeholder="example@email.com"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="phone"
              label="شماره تماس"
              rules={[
                {
                  required: true,
                  pattern: /^[0-9+\-\s]+$/,
                  message: "شماره تماس معتبر نیست",
                },
                { min: 10, message: "شماره تماس باید حداقل ۱۰ رقم باشد" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined style={{ color: "#1890ff" }} />}
                placeholder="09123456789"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              name="bio"
              label="درباره من"
              rules={[
                { max: 500, message: "توضیحات نباید بیش از ۵۰۰ کاراکتر باشد" },
              ]}
            >
              <TextArea
                placeholder="کمی در مورد خودتان بنویسید..."
                rows={4}
                showCount
                maxLength={500}
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end" style={{ marginTop: 24 }}>
          <Space>
            <Button
              onClick={onCancel}
              size="large"
              style={{ borderRadius: "8px" }}
            >
              انصراف
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              style={{ borderRadius: "8px", minWidth: "120px" }}
            >
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </Space>
        </Row>
      </Form>
    </Modal>
  );
};
