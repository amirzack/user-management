/// <reference types="vitest/globals" />
import { renderHook } from "@testing-library/react";
import { usePaginatedUsers } from "../../hooks/usePaginatedUsers";
/**
 * تست یونیت برای هوک usePaginatedUsers
 * ===============================
 * این تست‌ها بررسی می‌کنند که هوک:
 *  - صفحه‌بندی (pagination) را درست انجام دهد
 *  - فیلترکردن بر اساس search term را پیاده‌سازی کند
 *  - تعداد کاربران در هر صفحه و تعداد کل صفحات را صحیح محاسبه کند
 *  - در شرایط خاص مثل لیست خالی درست رفتار کند
 */
const mockUsers = [
  {
    id: 1,
    first_name: "Ali",
    last_name: "Rezaei",
    email: "ali@test.com",
    avatar: "",
  },
  {
    id: 2,
    first_name: "Sara",
    last_name: "Ahmadi",
    email: "sara@test.com",
    avatar: "",
  },
  {
    id: 3,
    first_name: "Reza",
    last_name: "Karimi",
    email: "reza@test.com",
    avatar: "",
  },
  {
    id: 4,
    first_name: "Nima",
    last_name: "Hosseini",
    email: "nima@test.com",
    avatar: "",
  },
  {
    id: 5,
    first_name: "Leila",
    last_name: "Jafari",
    email: "leila@test.com",
    avatar: "",
  },
  {
    id: 6,
    first_name: "Amir",
    last_name: "Nasiri",
    email: "amir@test.com",
    avatar: "",
  },
  {
    id: 7,
    first_name: "Mona",
    last_name: "Dari",
    email: "mona@test.com",
    avatar: "",
  },
];

describe("usePaginatedUsers", () => {
  it("returns correct users for first page", () => {
    const { result } = renderHook(() =>
      usePaginatedUsers({
        users: mockUsers,
        search: "",
        page: 1,
        perPage: 5,
      })
    );

    expect(result.current.users).toHaveLength(5);
    expect(result.current.total).toBe(7);
    expect(result.current.totalPages).toBe(2);
  });

  it("returns correct users for second page", () => {
    const { result } = renderHook(() =>
      usePaginatedUsers({
        users: mockUsers,
        search: "",
        page: 2,
        perPage: 5,
      })
    );

    expect(result.current.users).toHaveLength(2);
    expect(result.current.totalPages).toBe(2);
  });

  it("filters by name", () => {
    const { result } = renderHook(() =>
      usePaginatedUsers({
        users: mockUsers,
        search: "reza",
        page: 1,
        perPage: 10,
      })
    );

    expect(result.current.total).toBe(2); 
    expect(result.current.users.map((u) => u.first_name)).toEqual([
      "Ali",
      "Reza",
    ]);
  });

  it("filters by email", () => {
    const { result } = renderHook(() =>
      usePaginatedUsers({
        users: mockUsers,
        search: "leila@",
        page: 1,
        perPage: 10,
      })
    );

    expect(result.current.total).toBe(1);
    expect(result.current.users[0].email).toBe("leila@test.com");
  });

  it("handles empty user list", () => {
    const { result } = renderHook(() =>
      usePaginatedUsers({
        users: [],
        search: "",
        page: 1,
        perPage: 5,
      })
    );

    expect(result.current.total).toBe(0);
    expect(result.current.totalPages).toBe(1); 
    expect(result.current.users).toEqual([]);
  });
});
