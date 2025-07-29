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
import { List, Avatar, Tag, Space, Button } from "antd";
import { EyeOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { User } from "../../types";
import { CustomTitle } from "../common/typography/CustomTitle";
import { CustomText } from "../common/typography/CustomText";

export const ListView = ({ users }: { users: User[] }) => (
  <List
    itemLayout="horizontal"
    dataSource={users}
    renderItem={(user) => (
      <List.Item
        key={user.id}
        actions={[
          <Link to={`/users/${user.id}`} key="view">
            <Button type="primary" ghost icon={<EyeOutlined />}>
              مشاهده جزئیات
            </Button>
          </Link>,
        ]}
        style={{
          padding: "16px 0",
          borderRadius: 8,
          transition: "all 0.3s",
        }}
        className="user-list-item"
      >
        <List.Item.Meta
          avatar={
            <Avatar
              size={64}
              src={user.avatar}
              icon={<UserOutlined />}
              style={{
                border: "3px solid #f0f0f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
          }
          title={
            <Space direction="vertical" size={4}>
              <CustomTitle level={4} style={{ margin: 0 }}>
                {user.first_name} {user.last_name}
              </CustomTitle>
              <Space>
                <Tag color="processing">ID: {user.id}</Tag>
                <Tag color="success">فعال</Tag>
              </Space>
            </Space>
          }
          description={
            <Space direction="vertical" size={8}>
              <Space>
                <MailOutlined style={{ color: "#1890ff" }} />
                <CustomText copyable={{ text: user.email }}>
                  {user.email}
                </CustomText>
              </Space>
            </Space>
          }
        />
      </List.Item>
    )}
  />
);
