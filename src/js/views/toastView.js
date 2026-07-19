// ============================================
// TOAST VIEW — Notification pill
// ============================================

import { TIMEOUT_SEC } from '../config.js';

class ToastView {
  _toast = document.getElementById('toast');
  _timer = null;

  /**
   * Show a toast notification message.
   * @param {string} message — text to display
   * @param {number} duration — seconds before auto-dismiss (default: TIMEOUT_SEC)
   */
  show(message, duration = TIMEOUT_SEC) {
    clearTimeout(this._timer);

    this._toast.textContent = message;
    this._toast.classList.add('visible');

    this._timer = setTimeout(() => {
      this._toast.classList.remove('visible');
    }, duration * 1000);
  }
}

export default new ToastView();
