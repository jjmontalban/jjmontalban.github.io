(function () {
  // Show section with fade
  function showSection(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('is-visible');
  }

  // Hide section with fade
  function hideSection(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('is-visible');
  }

  // Hide all top sections
  function resetSectionVisibility() {
    hideSection('short');
    hideSection('work');
    hideSection('contact');
  }

  // Close Work and return to home sections
  function closeSection() {
    resetSectionVisibility();
    showSection('short');
    showSection('contact');
  }
  window.closeSection = closeSection;

  // Event delegation for all clicks
  document.addEventListener('click', (e) => {
    // Open Work from "Check Success Stories" / "Ver Casos de Éxito"
    const workBtn = e.target.closest('.work-button');
    if (workBtn) {
      resetSectionVisibility();
      showSection('work');
      return;
    }

    // Open case detail
    const openBtn = e.target.closest('.ver-detalle');
    if (openBtn) {
      const caseId = openBtn.getAttribute('data-case');
      const detalle = document.getElementById('detalle-' + caseId);
      if (detalle) {
        detalle.classList.add('is-visible'); // fade in detail

        // fade out and then hide the open button
        openBtn.classList.add('fade-out');
        setTimeout(() => {
          openBtn.classList.add('hidden');
          openBtn.classList.remove('fade-out');
        }, 300);
      }
      return;
    }

    // Close case detail
    const closeBtn = e.target.closest('.cerrar-detalle');
    if (closeBtn) {
      document.querySelectorAll('.detalle-caso.is-visible').forEach((el) => {
        el.classList.remove('is-visible'); // fade out detail
      });

      // bring back all "open detail" buttons
      document.querySelectorAll('.ver-detalle.hidden').forEach((btn) => {
        btn.classList.remove('hidden');
        btn.classList.add('fade-out'); // quick fade-in effect
        setTimeout(() => btn.classList.remove('fade-out'), 50);
      });
    }
  });

  // Language switcher
  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('toggle-language');
    const savedLang = localStorage.getItem('lang') || 'es';

    function switchLanguage(lang) {
      const spanish = document.querySelectorAll('[data-lang="spanish"]');
      const english = document.querySelectorAll('[data-lang="english"]');
      const leftLabel = document.querySelector('.lang-left');
      const rightLabel = document.querySelector('.lang-right');

      const show = (nodes) => nodes.forEach((el) => el.classList.add('lang-visible'));
      const hide = (nodes) =>
        nodes.forEach((el) => {
          el.classList.remove('lang-visible');
          setTimeout(() => {
            el.style.display = 'none';
          }, 400);
        });
      const unhide = (nodes) => nodes.forEach((el) => (el.style.display = ''));

      if (lang === 'es') {
        unhide(spanish);
        hide(english);
        setTimeout(() => show(spanish), 50);
        localStorage.setItem('lang', 'es');
        leftLabel.style.opacity = '1';
        rightLabel.style.opacity = '0.3';
      } else {
        unhide(english);
        hide(spanish);
        setTimeout(() => show(english), 50);
        localStorage.setItem('lang', 'en');
        leftLabel.style.opacity = '0.3';
        rightLabel.style.opacity = '1';
      }
    }

    if (toggle) {
      toggle.checked = savedLang === 'en';
      switchLanguage(savedLang);
      // No need to rebind click handlers thanks to event delegation
      toggle.addEventListener('change', function () {
        const newLang = this.checked ? 'en' : 'es';
        switchLanguage(newLang);
      });
    }
  });
})();
