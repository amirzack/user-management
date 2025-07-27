// components/common/ThemeToggle/ThemeToggle.tsx

import { Button, Dropdown, Space, Switch } from "antd";
import {
  SunOutlined,
  MoonOutlined,

  BulbOutlined,
} from "@ant-design/icons";
import { useTheme } from "../../hooks/useTheme";

interface ThemeToggleProps {
  size?: "small" | "middle" | "large";
  showLabel?: boolean;
  showSettings?: boolean;
}

export const ThemeToggle = ({
  size = "middle",
  showLabel = false,
  showSettings = true,
}: ThemeToggleProps) => {
  const {
    mode,
    isDark,
    systemThemeWatcher,
    toggle,
    setTheme,
    enableSystemWatcher,
  } = useTheme();

  const settingsMenu = {
    items: [
      {
        key: "light",
        label: (
          <Space>
            <SunOutlined />
            روشن
          </Space>
        ),
        onClick: () => setTheme("light"),
      },
      {
        key: "dark",
        label: (
          <Space>
            <MoonOutlined />
            تاریک
          </Space>
        ),
        onClick: () => setTheme("dark"),
      },
      {
        type: "divider" as const,
      },
      {
        key: "system",
        label: (
          <Space>
            <BulbOutlined />
            <span>تشخیص خودکار سیستم</span>
            <Switch
              size="small"
              checked={systemThemeWatcher}
              onChange={enableSystemWatcher}
            />
          </Space>
        ),
      },
    ],
  };

  if (showSettings) {
    return (
      <Dropdown menu={settingsMenu} placement="bottomRight">
        <Button
          type="text"
          size={size}
          icon={isDark ? <MoonOutlined /> : <SunOutlined />}
        >
          {showLabel && (isDark ? "تاریک" : "روشن")}
        </Button>
      </Dropdown>
    );
  }

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
