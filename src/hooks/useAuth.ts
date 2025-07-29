/**
 * useAuth
 * =======
 * Custom hook for authentication state and actions.
 *
 * Provides unified access to the authentication state (user, status, errors)
 * and async functions to authenticate, log in, and log out users.
 * Wraps Redux selectors and dispatchers for better DX and testability.
 *
 * هوک سفارشی برای انجام عملیات احراز هویت و مدیریت وضعیت ورود کاربر.
 * این هوک اطلاعات وضعیت، کاربر، لودینگ و خطا را از state می‌گیرد
 * و همچنین توابع login، logout و بررسی وضعیت ورود را ارائه می‌دهد
 * که همگی به صورت memoized با useCallback نوشته شده‌اند.
 *
 *
 * Usage:
 *   const { user, login, logout, error, isAuthenticated } = useAuth();
 *
 */
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import type { LoginCredentials } from "../types";
import { userAuthStatus, loginAsync, logoutAsync } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isInitialized, isLoading, error } =
    useAppSelector((state) => state.auth);
  /**
   * Check user authentication status (e.g., after reload)
   * بررسی وضعیت فعلی احراز هویت کاربر؛ معمولاً در startup app یا refresh.
   */
  const authenticateUser = useCallback(async () => {
    const result = await dispatch(userAuthStatus());
    return result;
  }, [dispatch]);
  /**
   * Log in with given credentials (username/password)
   * ورود کاربر با نام کاربری و رمز عبور
   */
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await dispatch(loginAsync(credentials)).unwrap();
      return { success: true, data: result };
    },
    [dispatch]
  );
  /**
   * Log out the current user
   * خروج کاربر از سیستم و پاکسازی session
   */
  const logout = useCallback(async () => {
    const result = await dispatch(logoutAsync());
    return result;
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isInitialized,
    isLoading,
    error,
    authenticateUser,
    login,
    logout,
  };
};
