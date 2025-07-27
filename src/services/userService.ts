import type { ApiResponse, User } from "../types";
import { apiClient } from "./api";

export class UserService {
  static async getUsers(page = 1): Promise<ApiResponse<User[]>> {
    const response = await apiClient.get(`/users?page=${page}`);
    return response.data;
  }

  static async getUserById(id: number): Promise<{ data: User }> {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  }

  static async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  }
}
