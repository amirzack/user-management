/**
 * useSearch
 * =========
 * Simple React Hook to manage search keyword state.
 *
 * Provides a state value for search, a setter, and a convenience handler
 * (e.g., for input fields or debounced search).
 *
 * هوک ساده برای مدیریت عبارت جستجو.
 * دارای مقدار state، متد set و handler پیشنهادی جهت استفاده در input های جستجو یا با debounce.
 *
 * Usage:
 *   const { search, handleSearch } = useSearch();
 *   <input value={search} onChange={e => handleSearch(e.target.value)} />
 *
 * نکته:
 *   - برای استیت جداگانه جستجو (محلی/local) مناسب است، نه برای sync با URL/Global state/redux.
 *   - اگر سرچ به دفعات زیاد فراخوانی شود، استفاده از debounce یا اتصال به useEffect هم معمولا توصیه می‌شود.
 */

import { useState } from "react";

export const useSearch = (initial = "") => {
  const [search, setSearch] = useState(initial);

  const handleSearch = (val: string) => {
    setSearch(val);
  };

  return { search, setSearch, handleSearch };
};
