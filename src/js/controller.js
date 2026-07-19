// ============================================
// CONTROLLER — Wires model ↔ views
// ============================================

import * as model from './model.js';
import { DEFAULT_VALUES, TIMEOUT_SEC } from './config.js';
import calculatorView from './views/calculatorView.js';
import resultsView from './views/resultsView.js';
import toastView from './views/toastView.js';
import themeView from './views/themeView.js';

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
 * Handle clear / reset.
 */
const controlClear = function () {
  calculatorView.resetInputs(DEFAULT_VALUES);
  resultsView.hideResults();
};

/**
 * Initialize the application.
 */
const init = function () {
  // Theme
  themeView.init();
  themeView.addHandlerToggle(controlTheme);

  // Calculator
  calculatorView.addHandlerCalculate(controlCalculate);
  calculatorView.addHandlerClear(controlClear);

  // Results
  resultsView.addHandlerCopy(controlCopy);
};

init();
