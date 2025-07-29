/**
 * AuthService
 * -----------
 * سرویس مدیریت احراز هویت و پروفایل کاربر.
 * شامل لاگین، لاگ‌اوت، ذخیره/خواندن کاربر از localStorage و به‌روزرسانی اطلاعات حساب.
 *
 * - login: احراز هویت کاربر با کوئری ساده به mock-backend (get, no JWT).
 * - logout: پاکسازی localStorage و درخواست لاگ‌اوت به سرور
 * - getStoredAuth: قرائت و اعتبارسنجی وضعیت احراز هویت از localStorage.
 * - updateProfile: ویرایش اطلاعات پروفایل کاربر در backend و بروزرسانی localStorage.
 *
 * نکته: با معماری فعلی، حساسیت امنیتی در استور کردن اطلاعات کاربر وجود دارد (localStorage - عدم استفاده از JWT).
 */
/**
 * نکته امنیتی:
 * در پروژه‌های واقعی توصیه می‌شود اطلاعات حساس و توکن احراز هویت را روی کوکی امن (HttpOnly cookie) ذخیره کنید.
 * اما در این پروژه‌ی mock و آموزشی، چون توکنی از سمت سرور نداریم، اطلاعات کاربر فقط جهت تست در localStorage ذخیره می‌شود.
 */

import axios from "axios";
import type {
  Admin,
  AuthState,
  LoginCredentials,
  UpdateUserRequest,
} from "../types";
import { apiClient } from "./api";

export class AuthService {
  /**
   * ورود کاربر (Login)
   * - ارسال کوئری GET با نام کاربری و رمز به mock-backend
   * - در صورت موفقیت، کاربر در localStorage ذخیره می‌شود (بدون رمز)
   */
  static async login(credentials: LoginCredentials): Promise<any> {
    try {
      const response = await axios.get<Admin[]>("http://localhost:3001/users", {
        params: {
          username: credentials.name,
          password: credentials.password,
        },
      });

      const user = response.data[0];
      if (!user) {
        throw new Error("نام کاربری و رمز عبور اشتباه است");
      }
      const { password, ...safeUser } = user;
      // Store user in localStorage
      // NOTE: In real-world apps, sensitive user info or auth tokens should be stored in secure cookies (HttpOnly).
      // Here we use localStorage just for learning/demo purpose, since there's no real server-side token.
      localStorage.setItem("user", JSON.stringify(safeUser));
      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "مشکل در ثبت لاگین");
    }
  }
  /**
   * خروج کاربر (Logout)
   * - حذف داده‌های حساس از localStorage
   * - ارسال درخواست لاگ‌اوت به سرور (در صورت نیاز)
   */
  static async logout(): Promise<void> {
    try {
      // Optional server call
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.warn("Server logout failed");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
  /**
   * بازیابی وضعیت فعلی احراز هویت کاربر از حافظه محلی (localStorage)
   * - اگر داده کرپت شده باشد، پاکسازی می‌کند.
   * - برای راه‌اندازی اولیه برنامه استفاده می‌شود.
   */
  static getStoredAuth(): AuthState {
    const userStr = localStorage.getItem("user");

    let user = null;
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch (error) {
        localStorage.removeItem("user");
      }
    }

    return {
      isAuthenticated: !!user,
      user: user,
      isInitialized: true,
      isLoading: false,
      error: null,
    };
  }
  /**
   * ویرایش پروفایل کاربر
   * - به صورت PATCH به آدرس /users/:id
   * - پس از موفقیت، user جدید در localStorage ذخیره می‌شود (بدون پسورد)
   */
  static async updateProfile(userId: number, data: UpdateUserRequest) {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error("خطا در بروزرسانی پروفایل");
    }
    const updatedUser = await response.json();
    const { password, ...safeUser } = updatedUser;
    localStorage.setItem("user", JSON.stringify(safeUser));
    return updatedUser;
  }
}
