/**
 * ThemeToggle
 * ===========
 * Toggle button for switching between dark and light theme using useTheme hook.
 *
 * دکمه سوییچ تم (روشن/تاریک) با ظاهر آیکونی و پشتیبانی از حالت‌های مختلف سایز.
 *
 * Props:
 *   - size: سایز دکمه ("small" | "middle" | "large")
 *   - showLabel: نمایش متن کنار آیکون (پیش‌فرض: true)
 *   - showSettings: (رزرو برای آینده یا دکمه جداگانه)
 *
 * مصرف:
 *   <ThemeToggle size="middle" showLabel={false} />
 */

import { Button } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "../../hooks/useTheme";
import type { ThemeToggleProps } from "../../types";


export const ThemeToggle = ({
  size = "large",
  showLabel = true,
}: ThemeToggleProps) => {
  const { isDark, toggle } = useTheme();

  return (
    <Button
      type="text"
      size={size}
      icon={isDark ? <MoonOutlined /> : <SunOutlined />}
      onClick={toggle}
    >
      {showLabel && (isDark ? "تاریک" : "روشن")}
    </Button>
  );
};
