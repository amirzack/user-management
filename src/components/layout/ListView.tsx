/**
 * ListView
 * ========
 * Stateless UI component for showing a user list.
 * Each user item shows avatar, name, email, id, status, and a "view details" action.
 *
 * این کامپوننت فقط نمایش لیست کاربران را بر عهده دارد (فاقد منطق فچ، فیلتر و ...).
 *
 * Props:
 *   - users: User[] : آرایه کاربران که باید نمایش داده شود.
 *
 * Usage:
 *   <ListView users={usersData} />
 */
import { List, Avatar, Tag, Space, Button, Grid } from "antd";
import { EyeOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { User } from "../../types";
import { CustomTitle } from "../common/typography/CustomTitle";
import { CustomText } from "../common/typography/CustomText";

const { useBreakpoint } = Grid;

export const ListView = ({ users }: { users: User[] }) => {
  const screens = useBreakpoint();

  // 📱 تشخیص سایز صفحه
  const isMobile = !screens.md; // زیر 768px
  const isTablet = screens.md && !screens.lg; // 768-1024px

  return (
    <List
      itemLayout={isMobile ? "vertical" : "horizontal"}
      dataSource={users}
      split={!isMobile}
      renderItem={(user) => (
        <List.Item
          key={user.id}
          actions={
            isMobile
              ? []
              : [
                  <Link to={`/users/${user.id}`} key="view">
                    <Button
                      type="primary"
                      ghost
                      icon={<EyeOutlined />}
                      size={isTablet ? "small" : "middle"}
                    >
                      {isTablet ? "جزئیات" : "مشاهده جزئیات"}
                    </Button>
                  </Link>,
                ]
          }
          style={{
            padding: isMobile ? "12px 0" : "16px 0",
            borderRadius: 8,
            transition: "all 0.3s",
            flexDirection: isMobile ? "column" : "row",
          }}
          className="user-list-item"
        >
          <List.Item.Meta
            avatar={
              <Avatar
                size={isMobile ? 48 : isTablet ? 56 : 64}
                src={user.avatar}
                icon={<UserOutlined />}
                style={{
                  border: `${isMobile ? 2 : 3}px solid #f0f0f0`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  flexShrink: 0,
                }}
              />
            }
            title={
              <Space
                direction={isMobile ? "horizontal" : "vertical"}
                size={4}
                style={{ width: "100%" }}
              >
                <CustomTitle level={isMobile ? 5 : 4} style={{ margin: 0 }}>
                  {user.first_name} {user.last_name}
                </CustomTitle>
                <Space wrap size="small">
                  <Tag
                    color="processing"
                    style={{ fontSize: isMobile ? 10 : 12 }}
                  >
                    ID: {user.id}
                  </Tag>
                  <Tag color="success" style={{ fontSize: isMobile ? 10 : 12 }}>
                    فعال
                  </Tag>
                </Space>
              </Space>
            }
            description={
              <Space
                direction="vertical"
                size={isMobile ? 4 : 8}
                style={{ width: "100%" }}
              >
                <Space size="small" wrap>
                  <MailOutlined style={{ color: "#1890ff" }} />
                  <CustomText
                    copyable={{ text: user.email }}
                    style={{ fontSize: isMobile ? 12 : 14 }}
                  >
                    {user.email}
                  </CustomText>
                </Space>

                {/* 📱 دکمه برای موبایل */}
                {isMobile && (
                  <Link to={`/users/${user.id}`}>
                    <Button
                      type="primary"
                      ghost
                      icon={<EyeOutlined />}
                      size="small"
                      style={{ marginTop: 8 }}
                    >
                      مشاهده جزئیات
                    </Button>
                  </Link>
                )}
              </Space>
            }
          />
        </List.Item>
      )}
    />
  );
};
