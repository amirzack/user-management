/**
 * ProfilePage
 * ===========
 * صفحه پروفایل کاربر (Entry Point)
 *
 * ----- English -----
 * User Profile page: Shows current user's profile, handles loading/error states,
 * and displays edit modal for updating profile info.
 *
 * Architecture:
 * - Loads user info via useAuth (Redux or context)
 * - Handles edit modal visibility and AntD Form state
 * - Submits profile updates via mutation hook (useUpdateProfile)
 * - Pure State & logic: No internal data logic in components like ProfileCard or EditProfileModal
 *
 * ---------------------------------
 * --- توضیح فارسی ---
 * صفحه اصلی پروفایل کاربر:
 * - نمایش کارت پروفایل با دکمه ویرایش
 * - مدیریت وضعیت لودینگ/خطا با هوک useAuth
 * - نمایش مودال ویرایش (EditProfileModal) با Ant Design
 * - لاجیک ثبت تغییرات (mutation) توسط useUpdateProfile و هندل پیام موفقیت/خطا توسط AntD message
 * - مقداردهی اولیه فرم و ریست آن هنگام خروج از مدال
 * ---------------------------------
 *
 * Usage:
 *   <ProfilePage />
 *
 */

import { Alert, Form } from "antd";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { ProfileCard } from "../components/ui/profileCard";
import { EditProfileModal } from "../components/common/EditProfileModal";
import Spinner from "../components/ui/spinner";
import toast from "react-hot-toast";

export function ProfilePage() {
  const { user, isLoading, error } = useAuth();
  const [editVisible, setEditVisible] = useState(false);
  const [form] = Form.useForm();
  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    if (editVisible && user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
      });
    }
  }, [editVisible, user, form]);

  const handleSubmit = async (values: any) => {
    try {
      const finalValues = {
        ...user,
        ...values,
      };
      await updateProfileMutation.mutateAsync(finalValues);
      toast.success("پروفایل با موفقیت به روز شد");
      setEditVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("خطا در بروزرسانی پروفایل!");
    }
  };

  if (isLoading) return <Spinner />;
  if (error)
    return <Alert type="error" message="خطا در دریافت اطلاعات کاربر" />;
  if (!user) return <Alert type="warning" message="کاربری پیدا نشد" />;

  return (
    <div>
      <ProfileCard admin={user} onEdit={() => setEditVisible(true)} />
      <EditProfileModal
        open={editVisible}
        onCancel={() => {
          setEditVisible(false);
          form.resetFields();
        }}
        user={user}
        onSubmit={handleSubmit}
        loading={updateProfileMutation.isPending}
        form={form}
      />
    </div>
  );
}
