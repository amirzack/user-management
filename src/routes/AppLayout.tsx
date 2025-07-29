import { useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { useLocation, Link } from "react-router-dom";
import { Layout, Menu, Space, Col, Row, Divider, Button } from "antd";
import { UserOutlined, ProfileOutlined } from "@ant-design/icons";
import { ThemeToggle } from "../components/ui/themeToggle";
import { CustomTitle } from "../components/common/typography/CustomTitle";
import { CustomText } from "../components/common/typography/CustomText";

/*
این کامپوننت وظیفه پیاده سازی صفحه بندی اصلی را شامل هدر، سایدبارکه شامل منو است وظیفه دارد.
دکمه خروج ، دکمه تنظیم تم صفحه در این کامپوننت قرار دارد.
.محتوا به صورت فرزند در این کامپوننت قرار دارد
*/

interface AppLayoutProps {
  children: React.ReactNode;
}
export const AppLayout = ({ children }: AppLayoutProps) => {
  const { Header, Sider, Content } = Layout;
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();

  // For border and background color CSS variables
  const borderColor = isDark ? "#424242" : "#f0f0f0";
  const headerBg = isDark ? "#1f1f1f" : "#fff";
  const contentBg = isDark ? "#000" : "#f5f5f5";

  // Menu Item
  const menuItems = useMemo(
    () => [
      {
        key: "users",
        icon: <UserOutlined />,
        label: <Link to="/users">کاربران</Link>,
      },
      {
        key: "profile",
        icon: <ProfileOutlined />,
        label: <Link to="/profile">پروفایل</Link>,
      },
    ],
    []
  );
  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith("/users")) return "users";
    if (location.pathname.startsWith("/profile")) return "profile";
    return "users";
  }, [location.pathname]);

  return (
    <Layout
      className="layoutRoot"
      style={
        {
          "--border-color": borderColor,
          "--header-bg": headerBg,
          "--content-bg": contentBg,
        } as React.CSSProperties
      }
    >
      {/* Sider Section */}
      <Sider
        theme={isDark ? "dark" : "light"}
        breakpoint="md"
        collapsedWidth={0}
      >
        <div className="siderLogo">
          <CustomTitle level={4}>داشبورد</CustomTitle>
        </div>
        <Menu
          items={menuItems}
          theme={isDark ? "dark" : "light"}
          mode="inline"
          selectedKeys={[selectedKey]}
        />
      </Sider>
      <Layout>
        {/* Header Section */}
        <Header className="headerMain">
          <Row justify="space-between" align="middle">
            <Col>
              <CustomTitle level={3}>مدیریت کاربران</CustomTitle>
            </Col>
            <Col>
              <Space size="large">
                <ThemeToggle showSettings />
                <Divider type="vertical" />
                <Space>
                  <CustomText>خوش آمدید {user?.name}</CustomText>
                  <Button type="primary" ghost onClick={logout}>
                    خروج
                  </Button>
                </Space>
              </Space>
            </Col>
          </Row>
        </Header>
        <Content className="contentMain">{children}</Content>
      </Layout>
    </Layout>
  );
};
