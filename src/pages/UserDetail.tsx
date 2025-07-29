/**
 * UserDetailContainer
 * ===================
 * مسئول گرفتن داده، هندل State و رویدادها (navigation، modal، delete و ...) است.
 * هیچ چیزی از UI را خودش نگه نمی‌دارد بلکه همه چیز را به UserDetailView پاس می‌دهد.
 */

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUsers";
import { Button, Alert } from "antd";
import { useTheme } from "../hooks/useTheme";
import { CustomTitle } from "../components/common/typography/CustomTitle";
import { UserDetailView } from "../components/ui/userDetail";
import Spinner from "../components/ui/spinner";
import toast from "react-hot-toast";

export const UserDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const userId = id ? Number(id) : undefined;
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  //دریافت داده
  const { data: user, isLoading, error } = useUser(userId);
  // بازگشت به لیست کاربران
  const handleBack = () => {
    navigate("/users");
  };
  // باز کردن مودال ویرایش
  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  // بستن مودال ویرایش
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  //دکمه اشتراک مخاطب یوزر
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("لینک کپی شد!");
  };

  // Loading State
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0" }}>
        <Spinner />
        <div style={{ marginTop: 16 }}>
          <CustomTitle>در حال بارگذاری اطلاعات کاربر...</CustomTitle>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !user) {
    return (
      <div style={{ padding: "50px 0" }}>
        <Alert
          message="خطا در بارگذاری"
          description="کاربر مورد نظر یافت نشد یا خطایی رخ داده است."
          type="error"
          showIcon
          action={
            <Button type="primary" onClick={handleBack}>
              بازگشت به لیست
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <UserDetailView
      user={user}
      isDark={isDark}
      activeTab={activeTab}
      isEditModalOpen={isEditModalOpen}
      onTabChange={setActiveTab}
      onBack={handleBack}
      onEdit={handleEdit}
      onShare={handleShare}
      onEditModalClose={handleEditModalClose}
    />
  );
};
