# 📘 مستندات پروژه User Management

این پروژه یک سیستم مدیریت کاربران با استفاده از React، Redux Toolkit، TypeScript و Ant Design است که به صورت آفلاین با JSON Server پیاده‌سازی شده است.

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant_Design-5.0+-0170FE?style=for-the-badge&logo=antdesign&logoColor=white)](https://ant.design/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 🛠 اجرای پروژه

1. نصب پکیج‌ها:

```bash
npm install
```

2. اجرای پروژه و اجرای سرور:

```bash
npm run dev
```

3. اجرای تست‌ها:

```bash
npm run test
```

📋 اطلاعات ورود پیش‌فرض
👤 نام کاربری: admin

🔐 رمز عبور: 123456

4. آدرس لایو (در صورت تنظیم):
   [https://your-live-url.com](https://your-live-url.com)

---

## ⚙️ تکنولوژی‌های استفاده‌شده

- **React** (با TypeScript)
- **Redux Toolkit**
- **React Router**
- **React Query**
- **Ant Design**
- **Vite** (به‌عنوان build tool)
- **Vitest + Testing Library**
- **JSON Server** (برای API mock)

---

## 🔐 مدیریت احراز هویت

- فایل `authService.ts` شامل متدهای لاگین، لاگ‌اوت و ذخیره در localStorage است.
- اطلاعات auth فعلاً در `localStorage` ذخیره می‌شوند.
  ⚠️ در پروژه واقعی باید در **HttpOnly Cookies** ذخیره شوند.
- `authSlice.ts` و `useAuth.ts` برای مدیریت و دسترسی سریع به وضعیت احراز هویت استفاده می‌شوند.
- `ProtectedRoute.tsx` مسیرهای محافظت‌شده را مدیریت می‌کند.

---

## 🎨 مدیریت تم (Theme)

- تم تاریک/روشن با استفاده از Redux و `themeSlice.ts` پیاده‌سازی شده است.
- `ThemeProvider.tsx` تم را به `ConfigProvider` آنت‌دیزاین تزریق می‌کند.
- وضعیت انتخاب‌شده در `localStorage` نگهداری می‌شود.

---

## 🧪 تست‌نویسی

- تست‌های مربوط به هوک‌ها در مسیر `__tests__/hook/` قرار دارند.
- `Vitest` به همراه `@testing-library/react` برای رندر کردن هوک‌ها استفاده شده است.
- تست شده:
  - `useAuth`: شبیه‌سازی کاربر لاگین شده و نشده
  - `usePaginatedUsers`: فیلتر، pagination و سناریوهای مختلف

---

🙏 بابت بررسی پروژه ممنون

## ✍️ نویسنده

پروژه توسط [amirzack](https://github.com/amirzack) توسعه داده شده است.

<div align=“center”>

Made with ❤️

</div>
