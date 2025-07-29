/**
 * usePaginatedUsers
 * =================
 * React hook for filtering and paginating a user list.
 *
 * Takes a user array, search term, current page, and page size, and returns
 * the paginated, filtered results along with pagination info (total, totalPages).
 *
 * هوک ساده و کاملاً Pure برای فیلترکردن و صفحه‌بندی لیست کاربران.
 * ورودی: لیست کامل کاربران، term جستجو صفحه فعلی، تعداد در صفحه.
 * خروجی: فقط کاربران همین صفحه و مقادیر موردنیاز برای pagination.
 *
 * Usage Sample:
 *   const { users, total, totalPages } = usePaginatedUsers({
 *     users: userList, search, page, perPage: 20
 *   });
 *
 */
import { useMemo } from "react";
import type { User } from "../types";

type Params = {
  users: User[] | undefined;
  search: string;
  page: number;
  perPage?: number;
};

export const usePaginatedUsers = ({
  users = [],
  search,
  page,
  perPage = 10,
}: Params) => {
  /**
   * filter کاربران بر اساس search term
   * اگر search مقدار معتبر نبود، همه را برمی‌گرداند.
   */
  const filtered = useMemo(() => {
    if (!users || !Array.isArray(users)) return [];

    if (!search) return users;
    const term = search.toLowerCase().trim();
    return users.filter(
      (user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }, [users, search]);

  const startIdx = (page - 1) * perPage;
  /**
   * فقط کاربران همین صفحه برگشت داده می‌شوند
   */
  const paginated = useMemo(
    () => filtered.slice(startIdx, startIdx + perPage),
    [filtered, startIdx, perPage]
  );
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return {
    users: paginated,
    total,
    totalPages,
    perPage,
  };
};
