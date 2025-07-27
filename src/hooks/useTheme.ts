// hooks/useTheme.ts
import { useCallback, useEffect } from "react";

import {
  setThemeMode,
  toggleTheme,
  setSystemThemeWatcher,
  syncWithSystemTheme,
} from "../store/themeSlice";
import { ThemeService } from "../services/themeService";
import type { ThemeMode } from "../types";
import type { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "./redux";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const { mode, isDark, systemThemeWatcher } = useAppSelector(
    (state: RootState) => state.theme
  );

  const setTheme = useCallback(
    (newMode: ThemeMode) => {
      dispatch(setThemeMode(newMode));
    },
    [dispatch]
  );

  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const enableSystemWatcher = useCallback(
    (enable: boolean) => {
      dispatch(setSystemThemeWatcher(enable));
    },
    [dispatch]
  );

  // System theme watcher effect
  useEffect(() => {
    if (!systemThemeWatcher) return;

    const cleanup = ThemeService.watchSystemTheme((newMode) => {
      dispatch(syncWithSystemTheme(newMode));
    });

    return cleanup;
  }, [systemThemeWatcher, dispatch]);

  return {
    mode,
    isDark,
    isLight: !isDark,
    systemThemeWatcher,
    setTheme,
    toggle,
    enableSystemWatcher,
  };
};
