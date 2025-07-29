export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
export interface UsersViewProps {
  users: User[];
  allUsersCount: number;
  isLoading: boolean;
  viewType: ViewType;
  search: string;
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  isDark: boolean;
  onSearch: (v: string) => void;
  setViewType: (v: ViewType) => void;
  onPageChange: (p: number) => void;
}

export interface UserDetailViewProps {
  user: User;
  isDark: boolean;
  activeTab: string;
  isEditModalOpen: boolean;
  onTabChange: (key: string) => void;
  onBack: () => void;
  onEdit: () => void;
  onShare: () => void;
  onEditModalClose: () => void;
}


export interface Admin {
  id: number;
  email: string;
  username: string;
  password: string;
  name: string;
  phone: string;
  bio: string;
  role: string;
}
export interface EditProfileModalProps {
  open: boolean;
  onCancel: () => void;
  user: Admin;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  phone: string;
  bio: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: any | null;
  isLoading?: boolean;
  error?: string | null;
}

export interface LoginCredentials {
  name: string;
  password: string;
}

export interface LoginFormProps {
  isLoading?: boolean;
  error?: string | null;
  onSubmit: (values: LoginCredentials) => void;
}
export interface ApiResponse<T> {
  data: T;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ThemeToggleProps {
  size?: "small" | "middle" | "large";
  showLabel?: boolean;
  showSettings?: boolean;
}

//Theme
export type ThemeMode = "light" | "dark" | "auto";
export type ViewType = "list" | "grid";
export interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
}
