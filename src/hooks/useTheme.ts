/**
 * useTheme
 * ========
 * Custom hook for theme management (dark/light) in React+Redux apps.
 *
 * Provides current theme mode, booleans for dark/light, and theme control methods.
 * All updates are dispatched directly to Redux; great for separation of concerns between UI and logic.
 *
 * هوک سفارشی برای مدیریت تم (روشن/تاریک).
 * مقدار فعلی تم، boolean حالت‌های روشن/تاریک، و توابع تغییر تم را (set/toggle)
 * بصورت آماده برای مصرف کامپوننت‌های UI ارائه می‌دهد.
 *
 * Usage Example:
 *   const { mode, isDark, setTheme, toggle } = useTheme();
 *   <button onClick={toggle}>{isDark ? "Switch to Light" : "Switch to Dark"}</button>
 *پیشنهاداتی برای بهبوت :
 *در زمان ورود کاربر میتوان تم سیستمی را چک کرد و براساس تم سیستمی تم را روشن یا تاریک تعریف کرد
 */

import { useCallback } from "react";
import { setThemeMode, toggleTheme } from "../store/themeSlice";
import type { ThemeMode } from "../types";
import type { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "./redux";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const { mode, isDark } = useAppSelector((state: RootState) => state.theme);

  const setTheme = useCallback(
    (newMode: ThemeMode) => {
      dispatch(setThemeMode(newMode));
    },
    [dispatch]
  );
  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return {
    mode,
    isDark,
    isLight: !isDark,
    setTheme,
    toggle,
  };
};
