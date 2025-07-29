/**
 * UserService
 * -----------
 * Handles API calls related to user resources.
 *
 * توضیحات:
 * - متد getUsers یک درخواست GET به مسیر `/users` می‌زند و لیست کاربران را در قالب ApiResponse<User[]> برمی‌گرداند.
 * - تمام عملیات مرتبط با کاربر (مانند فراخوانی APIهای لیست، افزودن، ویرایش و ...) را می‌توانید در این کلاس تجمیع کنید تا ساختار پروژه خواناتر و مقیاس‌پذیرتر شود.
 *متد getUsersById برای دریفات اطلاعات کاربر به صورت تکی 
 با آیدی کاربر از آدرس 
 `/users/${id}`
 دریافت می شود
 */

import type { ApiResponse, User } from "../types";
import { apiClient } from "./api";

export class UserService {
  static async getUsers(): Promise<ApiResponse<User[]>> {
    const response = await apiClient.get(`/users`);
    return response.data;
  }

  static async getUserById(id: number): Promise<ApiResponse<User>> {
    if (typeof id !== "number" || isNaN(id))
      throw new Error("User id must be a valid number");
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  }
}
