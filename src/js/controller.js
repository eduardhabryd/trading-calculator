// ============================================
// CONTROLLER — Wires model ↔ views
// ============================================

import * as model from './model.js';
import { DEFAULT_VALUES, TIMEOUT_SEC } from './config.js';
import calculatorView from './views/calculatorView.js';
import resultsView from './views/resultsView.js';
import toastView from './views/toastView.js';
import themeView from './views/themeView.js';
import faqView from './views/faqView.js';

/**
 * Handle calculate action.
 */
const controlCalculate = function () {
  // 1. Clear previous errors
  calculatorView.clearErrors();

  // 2. Get input data
  const data = calculatorView.getData();

  // 3. Validate
  const { valid, errors } = model.validateInputs(data);
  if (!valid) {
    Object.entries(errors).forEach(([field, msg]) => {
      calculatorView.showValidationError(field, msg);
    });
    return;
  }

  // 4. Set values and calculate
  model.setValues(data);
  model.calculatePosition();
  model.saveInputs(data);

  // 5. Render results
  resultsView.renderResults(model.state);
};

/**
 * Handle copy action.
 */
const controlCopy = async function () {
  const success = await model.copyToClipboard(model.state.position);
  if (success) {
    resultsView.showCopied(TIMEOUT_SEC);
    toastView.show(`Copied $${model.state.position.toLocaleString()} to clipboard`);
  }
};

/**
 * Handle theme toggle.
 */
const controlTheme = function () {
  themeView.toggle();
};

/**
 * Persist current form values (no validation gate).
 */
const controlPersist = function (data) {
  model.saveInputs(data);
};

/**
 * Handle clear / reset.
 */
const controlClear = function () {
  calculatorView.resetInputs(DEFAULT_VALUES);
  model.saveInputs(DEFAULT_VALUES);
  resultsView.hideResults();
};

/**
 * Escape: close FAQ first, otherwise clear form.
 */
const controlEscape = function () {
  if (faqView.isOpen()) {
    faqView.close();
    return;
  }
  controlClear();
};

/**
 * Initialize the application.
 */
const init = function () {
  // Theme
  themeView.init();
  themeView.addHandlerToggle(controlTheme);

  // FAQ
  faqView.init();
  faqView.addHandlerOpen(() => faqView.open());
  faqView.addHandlerClose(() => faqView.close());
  faqView.addHandlerLang((lang) => faqView.setLang(lang));

  // Restore saved inputs, then calculate if valid
  const saved = model.loadSavedInputs();
  calculatorView.resetInputs(saved);
  const { valid } = model.validateInputs(saved);
  if (valid) {
    model.setValues(saved);
    model.calculatePosition();
    resultsView.renderResults(model.state);
  }

  // Calculator
  calculatorView.addHandlerCalculate(controlCalculate);
  calculatorView.addHandlerClear(controlEscape);
  calculatorView.addHandlerPersist(controlPersist);
  calculatorView.addHandlerAdvancedToggle();

  // Results
  resultsView.addHandlerCopy(controlCopy);
};

init();
