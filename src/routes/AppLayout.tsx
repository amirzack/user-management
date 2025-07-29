import { useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { useLocation, Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Space,
  Col,
  Row,
  Divider,
  Button,
  Drawer,
  Grid,
} from "antd";
import { UserOutlined, ProfileOutlined, MenuOutlined } from "@ant-design/icons";
import { ThemeToggle } from "../components/ui/themeToggle";
import { CustomTitle } from "../components/common/typography/CustomTitle";
import { CustomText } from "../components/common/typography/CustomText";

const { useBreakpoint } = Grid;

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { Header, Sider, Content } = Layout;
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);

  //  تشخیص سایز صفحه
  const isMobile = !screens.md; // زیر 768px
  const isTablet = screens.md && !screens.lg; // 768-1024px
  const isDesktop = screens.lg; // بالای 1024px

  // For border and background color CSS variables
  const borderColor = isDark ? "#424242" : "#f0f0f0";
  const headerBg = isDark ? "#1f1f1f" : "#fff";
  const contentBg = isDark ? "#000" : "#f5f5f5";

  // Menu Items
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

  //  رندر کردن بخش راست هدر بر اساس سایز صفحه
  const renderHeaderActions = () => {
    if (isMobile) {
      //  حالت موبایل - فقط آیکن‌ها
      return (
        <Space size="small">
          <ThemeToggle showSettings={false} />
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
          />
        </Space>
      );
    }

    if (isTablet) {
      //  حالت تبلت - کمی فشرده‌تر
      return (
        <Space size="middle">
          <ThemeToggle showSettings />
          <Divider type="vertical" />
          <Space size="small">
            <CustomText>{user?.name}</CustomText>
            <Button type="primary" ghost size="small" onClick={logout}>
              خروج
            </Button>
          </Space>
        </Space>
      );
    }

    //  حالت دسکتاپ - کامل
    return (
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
    );
  };

  //  رندر تایتل بر اساس سایز صفحه
  const renderTitle = () => {
    if (isMobile) {
      return <CustomTitle level={4}>مدیریت</CustomTitle>;
    }
    return <CustomTitle level={3}>مدیریت کاربران</CustomTitle>;
  };

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
      {/*  Sider فقط در دسکتاپ نمایش داده می‌شه */}
      {isDesktop && (
        <Sider
          theme={isDark ? "dark" : "light"}
          breakpoint="lg"
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
      )}

      <Layout>
        {/*  Header ریسپانسیو */}
        <Header className="headerMain">
          <Row
            justify="space-between"
            align="middle"
            style={{ height: "100%" }}
          >
            <Col flex="auto">{renderTitle()}</Col>
            <Col flex="none">{renderHeaderActions()}</Col>
          </Row>
        </Header>

        <Content className="contentMain">{children}</Content>
      </Layout>

      {/*  Drawer برای موبایل و تبلت */}
      {(isMobile || isTablet) && (
        <Drawer
          title={
            <Space>
              <CustomTitle level={4}>منوی ناوبری</CustomTitle>
            </Space>
          }
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={280}
        >
          {/* منوی ناوبری */}
          <Menu
            items={menuItems}
            theme={isDark ? "dark" : "light"}
            mode="vertical"
            selectedKeys={[selectedKey]}
            onClick={() => setDrawerVisible(false)}
            style={{ border: "none" }}
          />

          <Divider />

          {/* اطلاعات کاربر */}
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space>
              <UserOutlined />
              <CustomText>خوش آمدید {user?.name}</CustomText>
            </Space>
            <Button
              type="primary"
              ghost
              block
              onClick={() => {
                logout();
                setDrawerVisible(false);
              }}
            >
              خروج از حساب
            </Button>
          </Space>
        </Drawer>
      )}
    </Layout>
  );
};
