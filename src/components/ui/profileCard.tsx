/**
 * ProfileCard
 * ===========
 * Stateless UI component for showing an admin profile summary (avatar, name, email, role).
 *
 *
 * این کامپوننت فقط برای نمایش اطلاعات خلاصه مدیر (آواتار، نام، ایمیل، نقش) استفاده می‌شود.
 * فاقد هرگونه منطق یا State؛ هیچ تغییری مستقیم بر داده‌ها ندارد.
 *
 * Props:
 *   - admin: اطلاعات کاربر (Admin)
 *   - onEdit: تابعی که هنگام کلیک روی دکمه "ویرایش پروفایل" اجرا می‌شود
 *
 * مصرف پیشنهادی:
 *   <ProfileCard admin={adminData} onEdit={handleEdit} />
 */

import { Card, Tag, Button, Space, Avatar } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import type { Admin } from "../../types";
import { CustomTitle } from "../common/typography/CustomTitle";
import { CustomText } from "../common/typography/CustomText";

// این کامپوننت فقط وظیفه نمایش آواتار، نام، ایمیل، نقش کاربر رو داره

interface ProfileCardProps {
  admin: Admin;
  onEdit: () => void;
}

export function ProfileCard({ admin, onEdit }: ProfileCardProps) {
  return (
    <Card
      style={{ maxWidth: 400, margin: "0 auto" }}
      actions={[
        <Button key="edit" icon={<EditOutlined />} onClick={onEdit}>
          ویرایش پروفایل
        </Button>,
      ]}
    >
      <Space
        direction="vertical"
        size="middle"
        style={{ width: "100%", alignItems: "center" }}
      >
        <Avatar icon={<UserOutlined />} size={50} />
        <CustomTitle level={3}>{admin.name || "نام کاربر"}</CustomTitle>
        <CustomText>{admin.email}</CustomText>
        <Tag color="blue">{admin.role || "کاربر عادی"}</Tag>
      </Space>
    </Card>
  );
}
