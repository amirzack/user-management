/**
 * UsersView
 * =========
 * فقط نمایش کاربران و کنترل‌های صفحه
 * هیچ استیتی داخلی ندارد و هوک استفاده نمی‌کند.
 *شامل بخش pagination اگر صفحه بیشتر از  بود
 *کنترل نمایش صفحه با تول بار
 * Stateless presentational component for UsersPage.
 */

import { Card, Row, Col, Tag, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { GridView } from "../../components/layout/GridView";
import { ListView } from "../../components/layout/ListView";
import { UserToolbar } from "../../components/common/UserToolbar";
import { UserPagination } from "../../components/common/UserPagination";
import Spinner from "../ui/spinner";
import { CustomText } from "../../components/common/typography/CustomText";
import { CustomTitle } from "../../components/common/typography/CustomTitle";
import type { UsersViewProps } from "../../types";

export const UsersView = ({
  users,
  allUsersCount,
  isLoading,
  viewType,
  search,
  page,
  totalPages,
  total,
  perPage,
  isDark,
  onSearch,
  setViewType,
  onPageChange,
}: UsersViewProps) => {
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spinner />
        <div style={{ marginTop: 16 }}>
          <CustomText>در حال بارگذاری کاربران...</CustomText>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 4 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <CustomTitle level={2} style={{ margin: 0 }}>
            لیست کاربران
          </CustomTitle>
          <CustomText type="secondary">مجموع {allUsersCount} کاربر</CustomText>
        </Col>
        <Col>
          <Tag color="blue">
            صفحه {page} از {totalPages}
          </Tag>
        </Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        {/*User Toolbar section */}
        <UserToolbar
          viewType={viewType}
          setViewType={setViewType}
          search={search}
          onSearch={onSearch}
        />
      </Card>

      <Card
        title={
          <span>
            <UserOutlined /> کاربران ({users.length})
          </span>
        }
        style={{ marginBottom: 24 }}
      >
        {users.length === 0 ? (
          <Empty
            description={
              search
                ? `هیچ کاربری با "${search}" پیدا نشد`
                : "هیچ کاربری یافت نشد"
            }
            style={{ padding: "50px 0" }}
          />
        ) : viewType === "list" ? (
          <ListView users={users} />
        ) : (
          <GridView users={users} isDark={isDark} />
        )}
      </Card>
      {/*Pagination Section*/}
      {totalPages > 1 && (
        <UserPagination
          page={page}
          total={total}
          perPage={perPage}
          onChange={onPageChange}
        />
      )}
    </div>
  );
};
