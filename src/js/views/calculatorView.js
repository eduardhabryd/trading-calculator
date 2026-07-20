// ============================================
// CALCULATOR VIEW — Form inputs & validation
// ============================================

class CalculatorView {
  _form = document.getElementById('calculator-form');
  _inputDeposit = document.getElementById('input-deposit');
  _inputRisk = document.getElementById('input-risk');
  _inputStop = document.getElementById('input-stop');
  _inputLeverage = document.getElementById('input-leverage');
  _inputTp = document.getElementById('input-tp');
  _selectBroker = document.getElementById('broker-select');
  _btnCalculate = document.getElementById('btn-calculate');
  _advancedToggle = document.getElementById('advanced-toggle');
  _advancedPanel = document.getElementById('advanced-panel');

  /**
   * Read all input values and return as an object.
   */
  getData() {
    return {
      deposit: +this._inputDeposit.value,
      risk: +this._inputRisk.value,
      stop: +this._inputStop.value,
      leverage: +this._inputLeverage.value || 1,
      takeProfit: +this._inputTp.value || 0,
      broker: this._selectBroker.value,
    };
  }

  /**
   * Show a validation error on a specific field.
   */
  showValidationError(field, message) {
    const input = document.getElementById(`input-${field}`);
    const errorEl = document.getElementById(`error-${field}`);
    if (input) {
      input.classList.add('error');
      input.classList.add('animate-shake');
      setTimeout(() => input.classList.remove('animate-shake'), 400);
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  /**
   * Clear all validation errors.
   */
  clearErrors() {
    document.querySelectorAll('.input-field').forEach((el) => {
      el.classList.remove('error');
    });
    document.querySelectorAll('.input-error-msg').forEach((el) => {
      el.textContent = '';
      el.classList.remove('visible');
    });
  }

  /**
   * Add ripple effect to calculate button on click.
   */
  _addRipple(e) {
    const btn = this._btnCalculate;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  /**
   * Bind form submit handler.
   */
  addHandlerCalculate(handler) {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._addRipple(e);
      handler();
    });
  }

  /**
   * Bind keyboard shortcut for Escape to clear inputs.
   */
  addHandlerClear(handler) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        handler();
      }
    });
  }

  /**
   * Bind Advanced disclosure toggle (leverage / take profit).
   */
  addHandlerAdvancedToggle() {
    this._advancedToggle.addEventListener('click', () => {
      const open = this._advancedToggle.getAttribute('aria-expanded') === 'true';
      const next = !open;
      this._advancedToggle.setAttribute('aria-expanded', String(next));
      this._advancedPanel.classList.toggle('is-open', next);
    });
  }

  /**
   * Bind form input/change handler for persistence.
   */
  addHandlerPersist(handler) {
    const onPersist = () => handler(this.getData());
    this._form.addEventListener('input', onPersist);
    this._form.addEventListener('change', onPersist);
  }

  /**
   * Reset all inputs to defaults.
   */
  resetInputs(defaults) {
    this._inputDeposit.value = defaults.deposit;
    this._inputRisk.value = defaults.risk;
    this._inputStop.value = defaults.stop;
    this._inputLeverage.value = defaults.leverage;
    this._inputTp.value = defaults.takeProfit;
    this._selectBroker.value = defaults.broker;
    this.clearErrors();
  }
}

export default new CalculatorView();
