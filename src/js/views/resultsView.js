// ============================================
// RESULTS VIEW — Render calculated values
// ============================================

class ResultsView {
  _panel = document.getElementById('results-panel');
  _divider = document.getElementById('results-divider');
  _position = document.getElementById('result-position');
  _risk = document.getElementById('result-risk');
  _rr = document.getElementById('result-rr');
  _profit = document.getElementById('result-profit');
  _btnCopy = document.getElementById('btn-copy');
  _copyText = document.getElementById('copy-text');
  _copyIcon = document.getElementById('copy-icon');

  /**
   * Render all results with animations.
   */
  renderResults(state) {
    // Show panel
    this._divider.style.display = 'block';
    this._panel.classList.add('visible');

    // Animate the position number
    this._animateValue(this._position, state.position, '$');

    // Supporting stats
    this._risk.textContent = `$${state.riskAmount}`;
    this._rr.textContent =
      state.rrRatio > 0 ? `1:${state.rrRatio}` : '—';
    this._profit.textContent =
      state.projectedProfit > 0
        ? `+$${state.projectedProfit}`
        : state.projectedProfit < 0
        ? `-$${Math.abs(state.projectedProfit)}`
        : '$0';

    // Re-trigger stagger animation
    const grid = this._panel.querySelector('.result-grid');
    if (grid) {
      grid.classList.remove('stagger');
      // Force reflow
      void grid.offsetWidth;
      grid.classList.add('stagger');
    }
  }

  /**
   * Animate a number counting up from 0 to target.
   */
  _animateValue(el, target, prefix = '') {
    el.classList.remove('animate-count-up');
    void el.offsetWidth;
    el.classList.add('animate-count-up');

    const duration = 400;
    const start = performance.now();
    const from = 0;

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (target - from) * eased);
      el.textContent = `${prefix}${current.toLocaleString()}`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  /**
   * Hide the results panel.
   */
  hideResults() {
    this._panel.classList.remove('visible');
    this._divider.style.display = 'none';
  }

  /**
   * Bind copy button handler.
   */
  addHandlerCopy(handler) {
    this._btnCopy.addEventListener('click', handler);
  }

  /**
   * Show "copied" state on button.
   */
  showCopied(timeoutSec) {
    this._btnCopy.classList.add('copied');
    this._copyText.textContent = 'Copied ✓';
    this._copyIcon.textContent = '✅';

    setTimeout(() => {
      this._btnCopy.classList.remove('copied');
      this._copyText.textContent = 'Copy Position Size';
      this._copyIcon.textContent = '📋';
    }, timeoutSec * 1000);
  }
}

export default new ResultsView();
