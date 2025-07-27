// hooks/useAuth.ts
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import type { LoginCredentials } from "../types";
import {
  userAuthStatus,
  loginAsync,
  logoutAsync,
} from "../store/authSlice";
// ✅ مسیر درست

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isInitialized, isLoading, error } =
    useAppSelector((state) => state.auth);

  const authenticateUser = useCallback(async () => {
    const result = await dispatch(userAuthStatus());
    return result;
  }, [dispatch]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await dispatch(loginAsync(credentials)).unwrap();
      return { success: true, data: result };
    },
    [dispatch]
  );

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
