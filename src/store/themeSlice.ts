// store/slices/themeSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ThemeMode } from "../types";

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  systemThemeWatcher: boolean;
}

const initialState: ThemeState = {
  mode: "light",
  isDark: false,
  systemThemeWatcher: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      state.isDark = action.payload === "dark";
    },
    toggleTheme: (state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      state.mode = newMode;
      state.isDark = newMode === "dark";
    },
    setSystemThemeWatcher: (state, action: PayloadAction<boolean>) => {
      state.systemThemeWatcher = action.payload;
    },
    syncWithSystemTheme: (state, action: PayloadAction<ThemeMode>) => {
      if (state.systemThemeWatcher) {
        state.mode = action.payload;
        state.isDark = action.payload === "dark";
      }
    },
  },
});

export const {
  setThemeMode,
  toggleTheme,
  setSystemThemeWatcher,
  syncWithSystemTheme,
} = themeSlice.actions;
export default themeSlice.reducer;
