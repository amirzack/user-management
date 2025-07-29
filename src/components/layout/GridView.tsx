/**
 * GridView
 * ========
 * Stateless UI component for showing a user list Grid.
 * Each user item shows avatar, name, email, id, status, and a "view details" action.
 *
 * این کامپوننت فقط نمایش لیست کاربران را بر عهده دارد (فاقد منطق فچ، فیلتر و ...).
 *
 * Props:
 *   - users: User[] : آرایه کاربران که باید نمایش داده شود.
 *
 * Usage:
 *   <GridView users={usersData} />
 */

import { Card, Col, Row, Avatar, Tag, Button } from "antd";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { User } from "../../types";
import { CustomTitle } from "../common/typography/CustomTitle";
import { CustomText } from "../common/typography/CustomText";

export const GridView = ({
  users,
  isDark,
}: {
  users: User[];
  isDark?: boolean;
}) => (
  <Row gutter={[16, 16]}>
    {users.map((user) => (
      <Col xs={24} sm={12} lg={8} xl={6} key={user.id}>
        <Card
          hoverable
          style={{
            borderRadius: 12,
            overflow: "hidden",
            transition: "all 0.3s",
          }}
          cover={
            <div
              style={{
                textAlign: "center",
                padding: "24px 0 16px 0",
                background: isDark ? "#1f1f1f" : "#fafafa",
              }}
            >
              <Avatar
                size={80}
                src={user.avatar}
                icon={<UserOutlined />}
                style={{
                  border: "4px solid #fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />
            </div>
          }
          actions={[
            <Link to={`/users/${user.id}`} key="view">
              <Button type="primary" ghost icon={<EyeOutlined />} size="small">
                جزئیات
              </Button>
            </Link>,
          ]}
        >
          <div style={{ textAlign: "center" }}>
            <CustomTitle level={5}>
              {user.first_name} {user.last_name}
            </CustomTitle>
            <CustomText type="secondary" style={{ fontSize: 12 }}>
              {user.email}
            </CustomText>
            <div style={{ marginTop: 12 }}>
              <Tag color="blue">ID: {user.id}</Tag>
              <Tag color="success">فعال</Tag>
            </div>
          </div>
        </Card>
      </Col>
    ))}
  </Row>
);
