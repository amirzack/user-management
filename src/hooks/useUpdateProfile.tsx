/**
 * useUpdateProfile
 * ================
 * React hook for updating the authenticated user's profile using React Query and Redux.
 *
 * پس از موفقیت، اطلاعات کاربر را هم در استور Redux و هم در cache ری‌اکت‌کوئری آپدیت می‌کند.
 * در صورت بروز خطا، پیام خطا را نشان می‌دهد.
 * در صورتی که کاربر وارد نشده باشد، خطا برمی‌گرداند.
 *
 * خروجی:
 *     mutate, mutateAsync, وضعیت های استاندارد mutation ری‌اکت‌کوئری
 *
 * رفتار side effect:
 *   - dispatch کردن تغییرات به redux (updateUser)
 *   - بروزرسانی و invalid کردن cache پروفایل ری‌اکت‌کوئری
 *   - پیام آنتی‌دی (AntD) مناسب موفقیت یا خطا
 *
 * مناسب مصرف مستقیم در فرم تغییر اطلاعات کاربری (Profile Edit).
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import type { UpdateUserRequest } from "../types";
import { AuthService } from "../services/authService";
import { updateUser } from "../store/authSlice";
import { useAppDispatch } from "./redux";
import toast from "react-hot-toast";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => {
      if (!user) {
        throw new Error("کاربر وارد نشده است");
      }
      return AuthService.updateProfile(user.id, data);
    },
    // پس از موفقیت: بروزرسانی استور و کش و نمایش پیام موفقیت
    onSuccess: (updatedUser) => {
      dispatch(updateUser(updatedUser));
      // بروزرسانی React Query cache
      queryClient.setQueryData(["profile", updatedUser!.id], updatedUser);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("ویرایش انجام شد");
    },
    // مدیریت خطا: ثبت لاگ و پیام خطا
    onError: (error) => {
      console.error("❌ Profile update failed:", error);
      toast.error(`خطا: ${error.message}`);
    },
  });
};
