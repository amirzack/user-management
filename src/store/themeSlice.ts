/**
 * themeSlice
 * ----------
 * مدیریت وضعیت پوسته (Theme) برنامه با استفاده از Redux Toolkit.
 *
 * - مقدار اولیه تم (روشن/تاریک) از localStorage گرفته می‌شود.
 * - دو حالت اصلی: 'light' و 'dark' (می‌توان توسعه داد به system).
 * - تغییر تم باعث بروزرسانی وضعیت و ذخیره مقدار جدید در localStorage می‌شود.
 * - دو اکشن: setThemeMode و toggleTheme برای تغییر یا سوییچ تم.
 *
 * Theme slice for global state management of app appearance mode (dark/light).
 * Initial value is read from localStorage for persistence across sessions.
 * Provides two reducers:
 *   - setThemeMode: explicitly set to 'dark' or 'light'
 *   - toggleTheme: switch between current modes
 *
 * مناسب برای استفاده مستقیم در ThemeProvider یا هرجای دیگر.
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ThemeMode } from "../types";

/**
 * خواندن مقدار اولیه حالت تم از localStorage
 * اگر چیزی ذخیره نشده بود، مقدار پیش‌فرض 'light' در نظر گرفته می‌شود.
 * Read initial theme mode from localStorage (default is 'light' if nothing found).
 */
const getInitialMode = (): ThemeMode => {
  const stored = localStorage.getItem("theme");
  return stored === "dark" ? "dark" : "light";
};

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
}

const initialMode = getInitialMode();

const initialState: ThemeState = {
  mode: initialMode,
  isDark: initialMode === "dark",
};
/**
 * Slice تغییر تم روشن تاریک
 * - نام: "theme"
 * ست‌کردن تم به مقدار صریح ('dark' یا 'light')
 * toggleTheme: تغییر تم با هر بار فراخوانی (dark/ light)
 */

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      state.isDark = action.payload === "dark";
      localStorage.setItem("theme", action.payload);
    },
    toggleTheme: (state) => {
      const newMode = state.mode === "dark" ? "light" : "dark";
      state.mode = newMode;
      state.isDark = newMode === "dark";
      localStorage.setItem("theme", newMode);
    },
  },
});

export const { setThemeMode, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
