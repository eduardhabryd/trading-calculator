// ============================================
// FAQ CONTENT — EN / UA how-to copy
// ============================================

export const FAQ_CONTENT = {
  en: {
    title: 'How to use',
    sections: [
      {
        title: 'Deposit',
        text: 'Enter your account balance in USDT. Position size is calculated from this amount.',
      },
      {
        title: 'Risk %',
        text: 'How much of your deposit you are willing to lose if the stop loss hits. Example: 1% on a $1,000 deposit means you risk $10.',
      },
      {
        title: 'Stop Loss %',
        text: 'The distance from entry to your stop, as a percent of price. A tighter stop means a larger position for the same risk amount.',
      },
      {
        title: 'Calculate',
        text: 'Press Calculate (or Enter) to get position size, dollar risk, risk/reward ratio, and projected profit.',
      },
      {
        title: 'Exchange fees',
        text: 'Fees use a worst-case market open + market close (2 × taker). Binance and Kraken futures VIP0 / Tier 1 taker is 0.05% each way (0.10% round-trip).',
      },
      {
        title: 'Advanced',
        text: 'Optional fields: Leverage caps position size at deposit × leverage. Take Profit % sets R:R and projected profit. Leave them closed if you do not need them — saved values still apply.',
      },
      {
        title: 'Keyboard',
        text: 'Enter — calculate. Esc — reset inputs to defaults (or close this FAQ if it is open).',
      },
    ],
  },
  ua: {
    title: 'Як користуватися',
    sections: [
      {
        title: 'Депозит',
        text: 'Вкажіть баланс рахунку в USDT. Розмір позиції рахується від цієї суми.',
      },
      {
        title: 'Ризик %',
        text: 'Частка депозиту, яку ви готові втратити при спрацюванні стоп-лосу. Наприклад: 1% від $1 000 — це ризик $10.',
      },
      {
        title: 'Стоп-лос %',
        text: 'Відстань від входу до стопу у відсотках від ціни. Менший стоп дає більшу позицію за тієї ж суми ризику.',
      },
      {
        title: 'Розрахунок',
        text: 'Натисніть Calculate (або Enter), щоб отримати розмір позиції, ризик у $, співвідношення R:R і очікуваний прибуток.',
      },
      {
        title: 'Комісії біржі',
        text: 'Комісії рахуються за найгіршим сценарієм: ринковий вхід + ринковий вихід (2 × taker). Для Binance і Kraken futures VIP0 / Tier 1 taker — 0.05% в кожен бік (0.10% туди-назад).',
      },
      {
        title: 'Додатково (Advanced)',
        text: 'Необовʼязкові поля: Leverage обмежує позицію як депозит × плече. Take Profit % задає R:R і прогноз прибутку. Якщо не потрібні — залиште секцію закритою; збережені значення все одно враховуються.',
      },
      {
        title: 'Клавіатура',
        text: 'Enter — розрахунок. Esc — скинути поля до значень за замовчуванням (або закрити цей FAQ, якщо він відкритий).',
      },
    ],
  },
};
