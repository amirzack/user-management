/// <reference types="vitest/globals" />
import { renderHook } from "@testing-library/react";
import { useAuth } from "../../hooks/useAuth";
import * as reduxHooks from "../../hooks/redux";
/**
 * تست یونیت برای هوک useAuth
 * ===============================
 * هدف این تست:
 *  اطمینان از اینکه هوک useAuth اطلاعات کاربر را به‌درستی از state می‌خواند
 *  شبیه‌سازی مقدار state مربوط به auth بدون نیاز به Redux واقعی
 *   بررسی مقادیر user, isAuthenticated, isLoading و error
 */
describe("useAuth", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return authenticated user", () => {
    const mockUser = { id: 1, name: "Test User", email: "test@test.com" };

    vi.spyOn(reduxHooks, "useAppSelector").mockImplementation((cb: any) =>
      cb({
        auth: {
          user: mockUser,
          isAuthenticated: true,
          isInitialized: true,
          isLoading: false,
          error: null,
        },
      })
    );
    vi.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(vi.fn());

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
