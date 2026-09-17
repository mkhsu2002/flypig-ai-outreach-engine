(() => {
  const STORAGE_KEY = 'flypig-language';

  const pageTitles = {
    'index.html': {
      en: 'FlyPig AI Outreach Engine v0.1.0',
      zh: 'FlyPig AI Outreach Engine v0.1.0｜開源 LLM 潛在客戶研究流程'
    },
    'test-01.html': {
      en: 'Golden Test 01 · FlyPig AI Outreach Engine',
      zh: 'Golden Test 01｜日本戶外市場驗證 · FlyPig AI Outreach Engine'
    },
    'test-02.html': {
      en: 'Golden Test 02 · FlyPig AI Outreach Engine',
      zh: 'Golden Test 02｜德國工業水質市場驗證 · FlyPig AI Outreach Engine'
    },
    'test-03.html': {
      en: 'Golden Test 03 · FlyPig AI Outreach Engine',
      zh: 'Golden Test 03｜FlyPig Dogfooding 與裸 LLM 對照 · FlyPig AI Outreach Engine'
    }
  };

  function normalizeLanguage(value) {
    const lang = (value || '').toLowerCase();
    if (lang === 'zh' || lang === 'zh-tw' || lang === 'zh-hant' || lang === 'zh-hk' || lang === 'zh-mo') {
      return 'zh';
    }
    if (lang === 'en' || lang.startsWith('en-')) {
      return 'en';
    }
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const requested = normalizeLanguage(params.get('lang'));
  const saved = normalizeLanguage(localStorage.getItem(STORAGE_KEY));
  const browser = normalizeLanguage(navigator.language || navigator.languages?.[0]);
  const initial = requested || saved || browser || 'en';

  function currentPageName() {
    const path = window.location.pathname;
    const name = path.split('/').pop();
    return name || 'index.html';
  }

  function setLanguage(lang, { persist = true, syncUrl = false } = {}) {
    const normalized = normalizeLanguage(lang) || 'en';

    document.documentElement.setAttribute('data-language', normalized);
    document.documentElement.lang = normalized === 'zh' ? 'zh-Hant-TW' : 'en';

    if (persist) {
      localStorage.setItem(STORAGE_KEY, normalized);
    }

    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      const active = btn.getAttribute('data-set-lang') === normalized;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    const title = pageTitles[currentPageName()]?.[normalized];
    if (title) document.title = title;

    if (syncUrl) {
      const url = new URL(window.location.href);
      if (normalized === 'zh') {
        url.searchParams.set('lang', 'zh-TW');
      } else {
        url.searchParams.set('lang', 'en');
      }
      window.history.replaceState({}, '', url);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(initial, { persist: true, syncUrl: false });

    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        setLanguage(btn.getAttribute('data-set-lang'), { persist: true, syncUrl: true });
      });
    });
  });
})();
