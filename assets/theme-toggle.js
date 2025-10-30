/**
 * Theme Toggle functionality
 * Handles switching between light and dark mode
 */

class ThemeToggle {
  constructor() {
    this.storageKey = 'theme-preference';
    this.storageAvailable = this.checkStorageAvailability();
    this.storedPreference = this.getStoredTheme();
    this.theme = this.storedPreference || this.getSystemPreference();

    this.init();
  }

  checkStorageAvailability() {
    try {
      const testKey = '__theme_test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  getStoredTheme() {
    if (!this.storageAvailable) {
      return null;
    }

    try {
      return localStorage.getItem(this.storageKey);
    } catch (error) {
      return null;
    }
  }

  getSystemPreference() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  saveTheme(theme) {
    if (!this.storageAvailable) {
      return;
    }

    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (error) {
      // noop - storage might be unavailable
    }
  }

  setTheme(theme, { persist = true } = {}) {
    this.theme = theme;

    if (persist) {
      this.storedPreference = theme;
      this.saveTheme(theme);
    }

    this.applyTheme(theme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    const isDarkMode = theme === 'dark';
    const label = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';

    toggleButtons.forEach(button => {
      button.setAttribute('aria-pressed', isDarkMode ? 'true' : 'false');
      button.setAttribute('aria-label', label);
    });
  }

  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  attachEventListeners() {
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => this.toggleTheme());
    });

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', event => {
        if (this.storedPreference) {
          return;
        }

        this.setTheme(event.matches ? 'dark' : 'light', { persist: false });
      });
    }
  }

  init() {
    this.applyTheme(this.theme);
    this.attachEventListeners();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.themeToggle = new ThemeToggle();
  });
} else {
  window.themeToggle = new ThemeToggle();
}
