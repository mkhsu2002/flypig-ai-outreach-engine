(() => {
  const saved = localStorage.getItem('flypig-language');
  const browserPrefersZh = (navigator.language || '').toLowerCase().startsWith('zh');
  const initial = saved || (browserPrefersZh ? 'zh' : 'en');

  function setLanguage(lang) {
    document.documentElement.setAttribute('data-language', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    localStorage.setItem('flypig-language', lang);
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-set-lang') === lang);
      btn.setAttribute('aria-pressed', btn.getAttribute('data-set-lang') === lang ? 'true' : 'false');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(initial);
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-set-lang')));
    });
  });
})();
