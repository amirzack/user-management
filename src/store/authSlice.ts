// store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginCredentials } from "../types";
import { AuthService } from "../services/authService";

export const userAuthStatus = createAsyncThunk(
  "auth/status",
  async (_, { rejectWithValue }) => {
    try {
      const storedAuth = AuthService.getStoredAuth();
      return storedAuth;
    } catch (error: any) {
      AuthService.logout();
      return rejectWithValue(error.message || "Authentication  failed");
    }
  }
);
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const user = await AuthService.login(credentials);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      return {
        isAuthenticated: false,
        user: null,
        isInitialized: true,
        isLoading: false,
        error: null,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);
const initialState = AuthService.getStoredAuth();
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      AuthService.logout();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Auth status
      .addCase(userAuthStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userAuthStatus.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.isInitialized = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(userAuthStatus.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
        state.isInitialized = true;
        state.error = action.payload as string;
      })
      // Login cases
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isInitialized = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout cases
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.isInitialized = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isInitialized = true;
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
