import { useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { useLocation } from "react-router-dom";
import {
  Layout,
  Menu,
  Space,
  Col,
  Row,
  Divider,
  Button,
  Typography,
} from "antd";
import { UserOutlined, ProfileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../ui/themeToggle";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { Header, Sider, Content } = Layout;
  const { Title, Text } = Typography;
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();

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

  // ✅ تشخیص صفحه فعال
  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith("/users")) return "users";
    if (location.pathname.startsWith("/profile")) return "profile";
    return "users";
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme={isDark ? "dark" : "light"}>
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            borderBottom: `1px solid ${isDark ? "#424242" : "#f0f0f0"}`,
          }}
        >
          <Title
            level={4}
            style={{
              color: isDark ? "#fff" : "#000",
              margin: 0,
            }}
          >
            داشبورد
          </Title>
        </div>
        <Menu
          items={menuItems}
          theme={isDark ? "dark" : "light"}
          mode="inline"
          selectedKeys={[selectedKey]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: isDark ? "#1f1f1f" : "#fff",
            borderBottom: `1px solid ${isDark ? "#424242" : "#f0f0f0"}`,
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Title
                level={3}
                style={{
                  color: isDark ? "#fff" : "#000",
                  margin: 0,
                }}
              >
                مدیریت کاربران
              </Title>
            </Col>
            <Col>
              <Space size="large">
                <ThemeToggle showSettings />
                <Divider type="vertical" />
                <Space>
                  <Text style={{ color: isDark ? "#fff" : "#000" }}>
                    خوش آمدید، {user?.first_name}
                  </Text>
                  <Button type="primary" ghost onClick={logout}>
                    خروج
                  </Button>
                </Space>
              </Space>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            padding: "24px",
            background: isDark ? "#000" : "#f5f5f5",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
