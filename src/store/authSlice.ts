/**
 * Auth Slice - مدیر وضعیت احراز هویت کاربر در اپلیکیشن
 * =======================================================
 *
 * این ماژول با استفاده از Redux Toolkit وضعیت احراز هویت (authentication) را مدیریت می‌کند.
 * مسئول هماهنگی بین وضعیت ورود/خروج، وضعیت بارگذاری، خطاها و داده‌های کاربر در سطح کل اپ.
 * - با AuthService ارتباط دارد برای عملیات احراز هویت.
 * - شامل AsyncThunk برای لاگین، لاگ‌اوت و خواندن وضعیت ذخیره شده.
 * - مدیریت کننده متدهای جانبی مثل پاک‌کردن خطا و بروزرسانی پروفایل.
 *
 * This slice manages user authentication state in Redux global store.
 * It uses AsyncThunk for async logic (login, logout, status), delegates API calls to AuthService,
 * and keeps the UI in sync regarding isAuthenticated, isLoading, isInitialized, user, and error.
 *
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginCredentials } from "../types";
import { AuthService } from "../services/authService";
/**
 * AsyncThunk: بازیابی وضعیت فعلی احراز هویت از localStorage
 * - در اپ راه‌اندازی اولیه، چک می‌کند کاربر لاگین هست یا نه.
 */
export const userAuthStatus = createAsyncThunk(
  "auth/status",
  async (_, { rejectWithValue }) => {
    try {
      const storedAuth = AuthService.getStoredAuth();
      return storedAuth;
    } catch (error: any) {
      AuthService.logout();
      return rejectWithValue(error.message || "Authentication  failed");
    }
  }
);
/**
 * AsyncThunk: عملیات ورود (login) کاربر به صورت async
 * - داده‌ی کاربری را از سرور mock می‌گیرد (AuthService.login)
 * - در localStorage ذخیره می‌شود و state بروزرسانی می‌شود
 */
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const user = await AuthService.login(credentials);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

/**
 * AsyncThunk: عملیات خروج (logout) کاربر
 * - داده‌های احراز هویت را هم از سرور (در صورت نیاز) و هم از localStorage پاک می‌کند
 */
export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      return {
        isAuthenticated: false,
        user: null,
        isInitialized: true,
        isLoading: false,
        error: null,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);
// مقدار اولیه state با توجه به اطلاعات ذخیره‌شده قبلی (در صورت وجود)

const initialState = AuthService.getStoredAuth();
/**
 * Slice اصلی وضعیت احراز هویت
 * - نام: "auth"
 * - initialState: وضعیت فعلی احراز هویت (خوانده شده از localStorage)
 * - reducers: توابع هم‌زمان برای عملیات ساده (خروج، پاک‌کردن خطا، آپدیت یوزر)
 * - extraReducers: مدیریت حالت‌های async (در انتظار، موفق، خطا)
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      AuthService.logout();
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Auth status
      .addCase(userAuthStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userAuthStatus.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.isInitialized = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(userAuthStatus.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
        state.isInitialized = true;
        state.error = action.payload as string;
      })
      // Login cases
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isInitialized = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout cases
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.isInitialized = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isInitialized = true;
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
