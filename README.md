
# 📘 مستندات پروژه User Management

این پروژه یک سیستم مدیریت کاربران با استفاده از React، Redux Toolkit، TypeScript و Ant Design است که به صورت آفلاین با JSON Server پیاده‌سازی شده است.

---

## 📁 ساختار پوشه‌ها

```
src/
├── components/           # کامپوننت‌های قابل استفاده مجدد (UI، Layout)
│   ├── common/           # ابزارهای مربوط به کار با لیست کاربران (pagination, toolbar)
│   ├── layout/           # GridView, ListView
│   └── ui/               # themeToggle, spinner
│
├── hooks/                # هوک‌های سفارشی برای مدیریت state و منطق
│   └── useAuth.ts
│   └── useTheme.ts
│   └── useUsers.ts
│
├── pages/                # صفحات اصلی برنامه
│   └── LoginPage.tsx
│   └── UserPage.tsx
│   └── ProfilePage.tsx
│
├── routes/               # تنظیم مسیرها و Route Protection
│   └── AppContent.tsx
│   └── AppLayout.tsx
│   └── ProtectedRoute.tsx
│
├── services/             # درخواست‌های API و localStorage
│   └── authService.ts
│   └── userService.ts
│
├── store/                # Redux slices و store اصلی
│   └── store.ts
│   └── authSlice.ts
│   └── themeSlice.ts
│
├── theme/                # ThemeProvider و مدیریت حالت روشن/تاریک
│   └── ThemeProvider.tsx
│
├── types/                # تعریف TypeScript types
│   └── index.ts
```

---

## ⚙️ تکنولوژی‌های استفاده‌شده

- **React** (با TypeScript)
- **Redux Toolkit**
- **React Router**
- **React Query**
- **Ant Design**
- **Vite** (به‌عنوان build tool)
- **JSON Server** (برای API mock)

---

## 🎨 مدیریت تم (Theme)

- تم روشن/تاریک با استفاده از `themeSlice.ts` در Redux.
- `useTheme.ts` برای دسترسی به تم و تغییر آن.
- `ThemeToggle.tsx` برای تغییر توسط کاربر.
- `ThemeProvider.tsx` برای اعمال تم به کل اپ با استفاده از `ConfigProvider` آنت دیزاین.

---

 * AuthService فقط برای عملیات احراز هویت و پروفایل ادمین فعلی استفاده می‌شود؛
 * ذخیره و بازیابی وضعیت ورود، ورود/خروج و بروزرسانی اطلاعات ورود کاربر جاری.
 *
 * UserService صرفاً برای عملیات مدیریتیِ داده‌های کاربران سایت است؛ شامل گرفتن لیست کاربران،
 * افزودن، حذف یا بروزرسانی اطلاعات کاربران (ربطی به ورود و خروج یا Session جاری ندارد).


## 🔐 مدیریت احراز هویت

- فایل `authService.ts` شامل لاگین، لاگ‌اوت و گرفتن کاربر از localStorage است.
- `authSlice.ts` وضعیت ورود/خروج را نگه می‌دارد.
- `useAuth.ts` برای استفاده راحت‌تر از اطلاعات auth در کامپوننت‌ها.
- مسیرهای محافظت‌شده با `ProtectedRoute.tsx` پیاده‌سازی شده‌اند.

## 🛠 اجرای پروژه

1. نصب پکیج‌ها:
```bash
npm install
```

2. اجرای پروژه و اجرای سرور 
```bash
npm run dev
```

---

## ✍️ نویسنده

پروژه توسط [amirzack](https://github.com/amirzack) توسعه داده شده است.
