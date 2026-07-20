// ============================================
// MODEL — State, calculation, validation
// ============================================

import { COMMISSIONS, DEFAULT_VALUES, INPUTS_KEY } from './config.js';

export const state = {
  deposit: 0,
  risk: 0,
  stop: 0,
  leverage: 1,
  takeProfit: 0,
  broker: 'BINANCE',
  // Computed
  position: 0,
  riskAmount: 0,
  rrRatio: 0,
  projectedProfit: 0,
  currentCommission: 0,
};

const INPUT_KEYS = ['deposit', 'risk', 'stop', 'leverage', 'takeProfit', 'broker'];

/**
 * Normalize persisted/raw input data against defaults.
 * @param {Object} raw
 * @returns {Object}
 */
const sanitizeInputs = function (raw) {
  const merged = { ...DEFAULT_VALUES, ...raw };
  return {
    deposit: Number(merged.deposit) || DEFAULT_VALUES.deposit,
    risk: Number(merged.risk) || DEFAULT_VALUES.risk,
    stop: Number(merged.stop) || DEFAULT_VALUES.stop,
    leverage: Number(merged.leverage) || DEFAULT_VALUES.leverage,
    takeProfit: Number(merged.takeProfit) >= 0 ? Number(merged.takeProfit) : DEFAULT_VALUES.takeProfit,
    broker:
      merged.broker && COMMISSIONS[merged.broker]
        ? merged.broker
        : DEFAULT_VALUES.broker,
  };
};

/**
 * Load saved calculator inputs from localStorage.
 * @returns {Object} safe inputs object
 */
export const loadSavedInputs = function () {
  try {
    const raw = localStorage.getItem(INPUTS_KEY);
    if (!raw) return { ...DEFAULT_VALUES };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_VALUES };
    return sanitizeInputs(parsed);
  } catch {
    return { ...DEFAULT_VALUES };
  }
};

/**
 * Persist calculator inputs to localStorage.
 * @param {Object} data
 */
export const saveInputs = function (data) {
  const payload = {};
  for (const key of INPUT_KEYS) {
    if (key in data) payload[key] = data[key];
  }
  try {
    localStorage.setItem(INPUTS_KEY, JSON.stringify(payload));
  } catch {
    // Quota / private mode — ignore
  }
};

/**
 * Validate input data.
 * @param {Object} data — raw form data
 * @returns {Object} — { valid: boolean, errors: { field: message } }
 */
export const validateInputs = function (data) {
  const errors = {};

  if (!data.deposit || data.deposit <= 0)
    errors.deposit = 'Must be greater than 0';

  if (!data.risk || data.risk <= 0 || data.risk > 100)
    errors.risk = 'Must be between 0 and 100';

  if (!data.stop || data.stop <= 0 || data.stop > 100)
    errors.stop = 'Must be between 0 and 100';

  if (data.leverage < 1 || data.leverage > 125)
    errors.leverage = 'Must be between 1 and 125';

  if (data.takeProfit < 0 || data.takeProfit > 1000)
    errors.tp = 'Must be between 0 and 1000';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Worst-case round-trip commission: pure market in/out = 2 × taker.
 * @returns {number} decimal fraction (e.g. 0.001 for 0.10%)
 */
const getCommission = function (broker) {
  const rates = COMMISSIONS[broker];
  if (!rates) return 0;
  return (rates.taker * 2) / 100;
};

/**
 * Set state values from validated input data.
 */
export const setValues = function (data) {
  state.deposit = data.deposit;
  state.risk = data.risk;
  state.stop = data.stop;
  state.leverage = data.leverage || 1;
  state.takeProfit = data.takeProfit || 0;
  state.broker = data.broker;
  state.currentCommission = getCommission(data.broker);
};

/**
 * Calculate position size and derived values.
 *
 * Formula:
 *   riskAmount = deposit × (risk / 100)
 *   position   = riskAmount / (stop / 100)
 *   position  -= position × (2 × taker)   // worst-case market in/out
 *   position   = min(position, deposit × leverage)   // leverage cap
 *   rrRatio    = takeProfit / stop
 *   projectedProfit = position × (takeProfit / 100) − position × (2 × taker)
 */
export const calculatePosition = function () {
  const { deposit, risk, stop, leverage, takeProfit, currentCommission } = state;

  // Risk amount in USD
  const riskAmount = deposit * (risk / 100);

  // Base position size
  let position = riskAmount / (stop / 100);

  // Subtract worst-case fees (market open + market close)
  position = position - position * currentCommission;

  // Cap at leveraged deposit
  if (leverage > 1) {
    position = Math.min(position, deposit * leverage);
  }

  // Truncate to whole number
  position = Math.trunc(position);

  // Risk-reward ratio
  const rrRatio = stop > 0 && takeProfit > 0 ? takeProfit / stop : 0;

  // Projected profit at TP
  let projectedProfit = 0;
  if (takeProfit > 0 && position > 0) {
    projectedProfit = position * (takeProfit / 100) - position * currentCommission;
    projectedProfit = Math.round(projectedProfit * 100) / 100; // 2 decimal places
  }

  state.position = position;
  state.riskAmount = Math.round(riskAmount * 100) / 100;
  state.rrRatio = Math.round(rrRatio * 100) / 100;
  state.projectedProfit = projectedProfit;
};

/**
 * Copy text to clipboard with fallback.
 */
export const copyToClipboard = async function (text) {
  try {
    await navigator.clipboard.writeText(String(text));
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = String(text);
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  }
};
