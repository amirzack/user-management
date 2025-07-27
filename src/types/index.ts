export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: any | null; // یا User type اگه داری
  isLoading?: boolean; // ✅ اضافه کن
  error?: string | null; // ✅ اضافه کن
}

export interface LoginCredentials {
  name: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

//Theme
export type ThemeMode = "light" | "dark" | "auto";
export interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
}
