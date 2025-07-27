import type { ThemeConfig } from "antd";
export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorBgLayout: "#f5f5f5",
    colorText: "#000000d9",
    colorTextSecondary: "#00000073",
    colorBorder: "#d9d9d9",
    borderRadius: 6,
    fontFamily: "'irfont', sans-serif",
  },
  components: {
    Layout: {
      headerBg: "#001529",
      siderBg: "#001529",
    },
    Menu: {
      darkItemBg: "#001529",
      darkSubMenuItemBg: "#000c17",
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    colorBgContainer: "#141414",
    colorBgElevated: "#1f1f1f",
    colorBgLayout: "#000000",
    colorText: "#ffffffd9",
    colorTextSecondary: "#ffffff73",
    colorBorder: "#424242",
    borderRadius: 6,
    fontFamily: "'irfont', sans-serif",
  },
  components: {
    Layout: {
      headerBg: "#1f1f1f",
      siderBg: "#1f1f1f",
    },
    Menu: {
      darkItemBg: "#1f1f1f",
      darkSubMenuItemBg: "#141414",
    },
    Card: {
      colorBgContainer: "#1f1f1f",
    },
    Table: {
      colorBgContainer: "#1f1f1f",
      headerBg: "#141414",
    },
    Input: {
      colorBgContainer: "#141414",
    },
    Select: {
      colorBgContainer: "#141414",
    },
  },
};

export const THEME_KEY = "app-theme-mode";
