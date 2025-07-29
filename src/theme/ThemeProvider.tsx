import React, { useMemo } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import faIR from "antd/locale/fa_IR";
import { useTheme } from "../hooks/useTheme";
import { lightTheme, darkTheme } from "../constants/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * ThemeProvider
 * -------------
 * Ant Design theme context wrapper for switching between light and dark mode,
 * propagating design tokens, and applying Persian RTL + fa_IR locale across the app.
 *
 * توضیحات:
 * - این کامپوننت همه‌ی فرزندان خود را داخل ConfigProvider آنت‌دیزاین رپ می‌کند.
 * - تم نور/تاریک را بر اساس مقدار isDark از هوک useTheme انتخاب می‌کند و تم مناسب (lightTheme یا darkTheme) را وارد کانفیگ می‌کند.
 * - الگوریتم رنگ Ant Design به طور داینامیک (default یا dark) ست می‌شود برای پشتیبانی تمینگ کامل.
 * - زبان را به fa-IR (فارسی) ست می‌کند و همچنین راست‌چین (direction="rtl") می‌شود.
 * - از useMemo استفاده شده تا تغییر تم فقط زمانی که نیاز باشد محاسبه شود (optimization).
 *
 * Usage:
 * این کامپوننت باید در بالاترین سطح اپلیکیشن (معمولاً نزدیک به App یا AppContent) برای فراهم کردن تم سرتاسری استفاده شود.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { isDark } = useTheme();

  const currentTheme = useMemo(() => {
    const baseTheme = isDark ? darkTheme : lightTheme;

    return {
      ...baseTheme,
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    };
  }, [isDark]);

  return (
    <ConfigProvider locale={faIR} theme={currentTheme} direction="rtl">
      {children}
    </ConfigProvider>
  );
};
