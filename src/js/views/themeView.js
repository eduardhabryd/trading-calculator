// ============================================
// THEME VIEW — Dark / Light mode toggle
// ============================================

import { THEME_KEY } from '../config.js';

class ThemeView {
  _toggle = document.getElementById('theme-toggle');
  _knob = this._toggle.querySelector('.theme-toggle-knob');

  /**
   * Initialize theme from localStorage or system preference.
   */
  init() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      this._setTheme(saved);
    } else {
      // Default to dark, or match system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this._setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  /**
   * Apply theme to document.
   */
  _setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this._knob.textContent = theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem(THEME_KEY, theme);
  }

  /**
   * Get current theme.
   */
  _getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  /**
   * Toggle between dark and light.
   */
  toggle() {
    const current = this._getTheme();
    this._setTheme(current === 'dark' ? 'light' : 'dark');
  }

  /**
   * Bind toggle click handler.
   */
  addHandlerToggle(handler) {
    this._toggle.addEventListener('click', handler);
  }
}

export default new ThemeView();
