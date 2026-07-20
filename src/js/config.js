// ============================================
// CONFIG — Constants & defaults
// ============================================

export const TIMEOUT_SEC = 3;

// Futures VIP0 / Tier 1 rates (%). Sizing uses worst-case round-trip: 2 × taker.
export const COMMISSIONS = {
  BINANCE: {
    maker: 0.02,
    taker: 0.05,
    label: 'Binance',
  },
  KRAKEN: {
    maker: 0.02,
    taker: 0.05,
    label: 'Kraken',
  },
};

export const DEFAULT_VALUES = {
  deposit: 1000,
  risk: 1,
  stop: 2,
  leverage: 1,
  takeProfit: 4,
  broker: 'BINANCE',
};

export const THEME_KEY = 'trading-calc-theme';
export const INPUTS_KEY = 'trading-calc-inputs';
