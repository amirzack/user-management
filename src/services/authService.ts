// services/authService.ts
import axios from "axios";
import type { AuthState, LoginCredentials, User } from "../types";
import { apiClient } from "./api";

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<any> {
    try {
      const response = await axios.get<User[]>("http://localhost:3001/users", {
        params: {
          username: credentials.name,
          password: credentials.password,
        },
      });

      const user = response.data[0];
      if (user) {
        // Store user in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      } else {
        throw new Error("نام کاربری و رمز عبور اشتباه است");
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "مشکل در ثبت لاگین");
    }
  }

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
}
