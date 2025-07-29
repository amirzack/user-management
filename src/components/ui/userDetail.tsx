/**
 * UserDetailView
 * ==============
 * Stateless view component for showing user profile.
 * هیچ منطق یا State داخلی ندارد فقط نمایش‌گر اطلاعات است.
 * مودال ویرایش کاربر بدون فانکشنالیتی قرار گرفته است
 */

import {
  Card,
  Avatar,
  Space,
  Button,
  Row,
  Col,
  Tag,
  Divider,
  Descriptions,
  Tabs,
  List,
  Badge,
  Tooltip,
  Modal,
} from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  MailOutlined,
  EditOutlined,
  ShareAltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { CustomTitle } from "../../components/common/typography/CustomTitle";
import { CustomText } from "../../components/common/typography/CustomText";
import { CustomParagraph } from "../../components/common/typography/CustomParagraph";
import type { UserDetailViewProps } from "../../types";

const { TabPane } = Tabs;

export const UserDetailView = ({
  user,
  isDark,
  activeTab,
  isEditModalOpen,
  onTabChange,
  onBack,
  onEdit,
  onShare,
  onEditModalClose,
}: UserDetailViewProps) => {
  return (
    <div style={{ padding: "0 4px" }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={onBack}
              size="large"
            >
              بازگشت
            </Button>
            <Divider type="vertical" />
            <CustomTitle level={2} style={{ margin: 0 }}>
              جزئیات کاربر
            </CustomTitle>
          </Space>
        </Col>
        <Col>
          <Space>
            <Tooltip title="اشتراک‌گذاری">
              <Button
                type="text"
                icon={<ShareAltOutlined />}
                onClick={onShare}
              />
            </Tooltip>
            <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
              ویرایش
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        {/* Profile Card */}
        <Col xs={24} lg={8}>
          <Card
            style={{
              textAlign: "center",
              borderRadius: 16,
              background: isDark
                ? "linear-gradient(135deg, #1f1f1f 0%, #2d2d2d 100%)"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              color: "white",
            }}
            bodyStyle={{ padding: 32 }}
          >
            <Badge.Ribbon text="فعال" color="green">
              <div>
                <Avatar
                  size={120}
                  src={user.avatar}
                  icon={<UserOutlined />}
                  style={{
                    border: "6px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                    marginBottom: 24,
                  }}
                />

                <CustomTitle level={2} style={{ color: "white", margin: 0 }}>
                  {user.first_name} {user.last_name}
                </CustomTitle>

                <CustomText
                  style={{ color: "rgba(255,255,255,0.8)", fontSize: 16 }}
                >
                  {user.email}
                </CustomText>

                <div style={{ marginTop: 24 }}>
                  <Tag color="gold" style={{ margin: "4px 2px" }}>
                    ID: {user.id}
                  </Tag>
                  <Tag color="success" style={{ margin: "4px 2px" }}>
                    تایید شده
                  </Tag>
                  <Tag color="processing" style={{ margin: "4px 2px" }}>
                    کاربر فعال
                  </Tag>
                </div>
              </div>
            </Badge.Ribbon>
          </Card>
        </Col>

        {/* Details Tabs */}
        <Col xs={24} lg={16}>
          <Card style={{ borderRadius: 12 }}>
            <Tabs activeKey={activeTab} onChange={onTabChange} size="large">
              {/* پروفایل */}
              <TabPane
                tab={
                  <span>
                    <UserOutlined />
                    اطلاعات شخصی
                  </span>
                }
                key="profile"
              >
                <Descriptions bordered column={{ xs: 1, sm: 2 }} size="middle">
                  <Descriptions.Item
                    label={
                      <>
                        <UserOutlined /> نام
                      </>
                    }
                    span={2}
                  >
                    {user.first_name}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <UserOutlined /> نام خانوادگی
                      </>
                    }
                    span={2}
                  >
                    {user.last_name}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <MailOutlined /> ایمیل
                      </>
                    }
                    span={3}
                  >
                    <CustomText copyable>{user.email}</CustomText>
                  </Descriptions.Item>
                  <Descriptions.Item label="درباره من" span={2}>
                    <CustomParagraph>
                      توسعه‌دهنده فرانت‌اند با بیش از 3 سال تجربه در React و
                      TypeScript. علاقه‌مند به یادگیری تکنولوژی‌های جدید و کار
                      تیمی.
                    </CustomParagraph>
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>

              {/* فعالیت‌ها */}
              <TabPane
                tab={
                  <span>
                    <TrophyOutlined />
                    فعالیت‌ها
                  </span>
                }
                key="activity"
              >
                <List
                  dataSource={[
                    {
                      action: "عضویت در سیستم",
                      time: "1402/08/15",
                      type: "success",
                    },
                    {
                      action: "آپدیت پروفایل",
                      time: "1402/09/01",
                      type: "info",
                    },
                    {
                      action: "ارسال پیام",
                      time: "1402/09/10",
                      type: "processing",
                    },
                    {
                      action: "تغییر رمز عبور",
                      time: "1402/09/15",
                      type: "warning",
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Badge
                            status={item.type as any}
                            style={{ marginTop: 4 }}
                          />
                        }
                        title={item.action}
                        description={item.time}
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal
        title="ویرایش اطلاعات کاربر"
        open={isEditModalOpen}
        onCancel={onEditModalClose}
        footer={[
          <Button key="cancel" onClick={onEditModalClose}>
            لغو
          </Button>,
          <Button key="save" type="primary">
            ذخیره تغییرات
          </Button>,
        ]}
      >
        <p>فرم ویرایش اطلاعات کاربر اینجا قرار می‌گیره...</p>
      </Modal>
    </div>
  );
};
