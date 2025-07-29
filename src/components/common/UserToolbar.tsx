/**
 * UserToolbar
 * ===========
 * Stateless UI toolbar for controlling user list filters and view type (list/grid).
 *
 * این کامپوننت فقط کنترل ابزارهای نمایشی (نوار ابزار) برای لیست کاربران را بر عهده دارد.
 * - شامل: جستجو (Search) و انتخاب نوع نمایش (لیست/کارت)
 * - هیچ state داخلی ندارد و تمام state/handler از Parent دریافت می‌شود.
 *
 * Props:
 *   - viewType: نوع نمایش فعلی ("list" یا "grid")
 *   - setViewType: تابع تغییر حالت نمایش
 *   - search: مقدار فعلی عبارت جستجو
 *   - onSearch: تابع هندل جستجو (هم تغییر مقدار هم سرچ نهایی)
 *
 * Usage:
 *   <UserToolbar
 *     viewType={viewType}
 *     setViewType={setViewType}
 *     search={searchText}
 *     onSearch={handleSearch}
 *   />
 */

import { Input, Space, Radio } from "antd";
import {
  SearchOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import type { ViewType } from "../../types";

const { Search } = Input;

type Props = {
  viewType: ViewType;
  setViewType: (v: ViewType) => void;
  search: string;
  onSearch: (val: string) => void;
};

export const UserToolbar = ({ viewType, setViewType, search, onSearch }: Props) => (
  <Space style={{ width: "100%", justifyContent: "space-between" }} wrap>
    {/* فیلد جستجوی کاربر */}
    <Search
      placeholder="جستجو..."
      allowClear
      enterButton={<SearchOutlined />}
      size="large"
      onSearch={onSearch}
      onChange={(e) => onSearch(e.target.value)}
      style={{ maxWidth: 300 }}
      value={search}
    />
    {/* انتخاب نوع نمایش: لیست/کارت با Radio.Group */}
    <Radio.Group
      value={viewType}
      onChange={(e) => setViewType(e.target.value)}
      buttonStyle="solid"
      size="middle"
    >
      <Radio.Button value="list">
        <UnorderedListOutlined /> لیست
      </Radio.Button>
      <Radio.Button value="grid">
        <AppstoreOutlined /> کارت
      </Radio.Button>
    </Radio.Group>
  </Space>
);
