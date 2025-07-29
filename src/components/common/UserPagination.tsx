/**
 * UserPagination
 * ==============
 * Stateless pagination UI for user lists.
 *
 * این کامپوننت صرفاً کنترل ساختار صفحه‌بندی را انجام می‌دهد و فاقد منطق داخلی است.
 *
 * Props:
 *   - page: صفحه فعلی (شماره 1-based)
 *   - total: تعداد کل آیتم‌ها (کل کاربران)
 *   - perPage: تعداد آیتم‌ در هر صفحه
 *   - onChange: تابع تغییر صفحه (callback)
 *
 * Usage:
 *   <UserPagination page={page} total={totalUsers} perPage={perPage} onChange={setPage} />
 */

import { Pagination } from "antd";

type Props = {
  page: number;
  total: number;
  perPage: number;
  onChange: (p: number) => void;
};

export const UserPagination = ({ page, total, perPage, onChange }: Props) => (
  <Pagination
    current={page}
    total={total}
    pageSize={perPage}
    onChange={onChange}
    showSizeChanger={false}
    showQuickJumper
    showTotal={(t, range) => `${range[0]} - ${range[1]} از ${t} کاربر`}
    style={{ marginTop: 16, textAlign: "center" }}
  />
);
