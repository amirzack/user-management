import React, { useMemo } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import faIR from "antd/locale/fa_IR";
import { useTheme } from "../hooks/useTheme";
import { lightTheme, darkTheme } from "../constants/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
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
