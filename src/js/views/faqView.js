// ============================================
// FAQ VIEW — Bilingual how-to modal
// ============================================

import { FAQ_LANG_KEY } from '../config.js';
import { FAQ_CONTENT } from '../faqContent.js';

class FaqView {
  _overlay = document.getElementById('faq-overlay');
  _modal = document.getElementById('faq-modal');
  _title = document.getElementById('faq-title');
  _body = document.getElementById('faq-body');
  _btnOpen = document.getElementById('faq-btn');
  _btnClose = document.getElementById('faq-close');
  _langEn = document.getElementById('faq-lang-en');
  _langUa = document.getElementById('faq-lang-ua');
  _lang = 'en';
  _open = false;

  init() {
    const saved = localStorage.getItem(FAQ_LANG_KEY);
    this._lang = saved === 'ua' || saved === 'en' ? saved : 'en';
    this._render();
    this._syncLangButtons();
  }

  isOpen() {
    return this._open;
  }

  open() {
    this._open = true;
    this._overlay.hidden = false;
    // Force reflow so transition runs
    void this._overlay.offsetWidth;
    this._overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this._btnClose.focus();
  }

  close() {
    if (!this._open) return;
    this._open = false;
    this._overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    window.setTimeout(() => {
      if (!this._open) this._overlay.hidden = true;
    }, 200);
    this._btnOpen.focus();
  }

  setLang(lang) {
    if (lang !== 'en' && lang !== 'ua') return;
    this._lang = lang;
    try {
      localStorage.setItem(FAQ_LANG_KEY, lang);
    } catch {
      // ignore
    }
    this._syncLangButtons();
    this._render();
  }

  _syncLangButtons() {
    this._langEn.classList.toggle('is-active', this._lang === 'en');
    this._langUa.classList.toggle('is-active', this._lang === 'ua');
    this._langEn.setAttribute('aria-pressed', String(this._lang === 'en'));
    this._langUa.setAttribute('aria-pressed', String(this._lang === 'ua'));
  }

  _render() {
    const content = FAQ_CONTENT[this._lang] ?? FAQ_CONTENT.en;
    this._title.textContent = content.title;
    this._body.innerHTML = content.sections
      .map(
        (section) => `
      <section class="faq-section">
        <h3 class="faq-section-title">${section.title}</h3>
        <p class="faq-section-text">${section.text}</p>
      </section>`
      )
      .join('');
  }

  addHandlerOpen(handler) {
    this._btnOpen.addEventListener('click', handler);
  }

  addHandlerClose(handler) {
    this._btnClose.addEventListener('click', handler);
    this._overlay.addEventListener('click', (e) => {
      if (e.target === this._overlay) handler();
    });
  }

  addHandlerLang(handler) {
    this._langEn.addEventListener('click', () => handler('en'));
    this._langUa.addEventListener('click', () => handler('ua'));
  }
}

export default new FaqView();
