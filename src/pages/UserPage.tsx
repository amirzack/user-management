/**
 * UsersPage
 * ==============
 *  مسئول مدیریت state، ارتباط با هوک‌ها و ارائه داده به UsersView.
 *  Container for users logic, hooks and data flow.
 */

import { useEffect, useState } from "react";
import { usePaginatedUsers } from "../hooks/usePaginatedUsers";
import { useTheme } from "../hooks/useTheme";
import type { ViewType } from "../types";
import { useUsers } from "../hooks/useUsers";
import { useSearch } from "../hooks/useSearch";
import { UsersView } from "../components/ui/usersList";

export const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [viewType, setViewType] = useState<ViewType>("list");
  const { isDark } = useTheme();
  const { search, handleSearch } = useSearch();

  const { data: allUsers = [], isLoading } = useUsers();
  // داده‌های صفحه‌بندی
  const { users, total, totalPages, perPage } = usePaginatedUsers({
    users: allUsers,
    search,
    page,
    perPage: 10,
  });

  // اگر سرچ تغییر کرد، صفحه برگرده به یک
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <UsersView
      users={users}
      allUsersCount={allUsers.length}
      isLoading={isLoading}
      viewType={viewType}
      search={search}
      page={page}
      totalPages={totalPages}
      total={total}
      perPage={perPage}
      isDark={isDark}
      onSearch={handleSearch}
      setViewType={setViewType}
      onPageChange={setPage}
    />
  );
};
