import { THEME_KEY } from "../constants/theme";
import type { ThemeMode } from "../types";

export class ThemeService {
  static getStoredTheme(): ThemeMode {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored && (stored === 'light' || stored === 'dark')) {
      return stored;
    }
    
    // System preference detection
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  }

  static setTheme(mode: ThemeMode): void {
    localStorage.setItem(THEME_KEY, mode);
    this.applyThemeToDocument(mode);
  }

  static applyThemeToDocument(mode: ThemeMode): void {
    const root = document.documentElement;
    
    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    // Meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        mode === 'dark' ? '#1f1f1f' : '#ffffff'
      );
    }
  }

  static initializeTheme(): ThemeMode {
    const mode = this.getStoredTheme();
    this.applyThemeToDocument(mode);
    return mode;
  }

  static watchSystemTheme(callback: (mode: ThemeMode) => void): () => void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handler = (e: MediaQueryListEvent) => {
      const newMode = e.matches ? 'dark' : 'light';
      callback(newMode);
    };

    mediaQuery.addEventListener('change', handler);
    
    // Return cleanup function
    return () => mediaQuery.removeEventListener('change', handler);
  }
}