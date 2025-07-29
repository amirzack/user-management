import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { UserService } from "../services/userService";
import type { User } from "../types";
/**
 * useUsers
 * ========
 * Hook for fetching all users list via React Query.
 *
 * لیست تمام کاربران را از سرویس API می‌گیرد و cache می‌کند.
 * مناسب مصرف مستقیم لیست کاربران برای صفحه‌ها یا جداول.
 *
 * خروجی: وضعیت و دیتا مشابه ری‌اکت‌کوئری
 */

export const useUsers = () => {
  // گرفتن لیست کامل کاربران و نگهداری cache تا ۵ دقیقه
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await UserService.getUsers();
      return res.data; // فقط دیتای اصلی
    },
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * useUser
 * =======
 * Hook for fetching a single user detail by id via React Query.
 *
 * جزییات یک کاربر را با id از API می‌گیرد.
 * اگر id داده نشود، یا NaN باشد، query اجرا نمی‌شود.
 *
 * خروجی: وضعیت و دیتا مشابه ری‌اکت‌کوئری
 */

export const useUser = (id?: number): UseQueryResult<User, Error> => {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: async () => {
      if (id === undefined || id === null)
        throw new Error("User id must be provided");
      const res = await UserService.getUserById(id);
      return res.data; // فقط دیتای اصلی
    },
    enabled: typeof id === "number" && !isNaN(id),
  });
};
