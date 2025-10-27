// router.js
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const toggle = document.getElementById('toggle-language');

  // Detecta base del sitio (vhost vs subcarpeta)
  function getSiteBase() {
    const p = location.pathname;
    if (p.startsWith('/jjmontalban.github.io/')) return '/jjmontalban.github.io/';
    return '/';
  }
  const SITE_BASE = getSiteBase();

  // Analiza pathname → { lang, route }
  function parsePath(pathname) {
    let path = pathname.startsWith(SITE_BASE) ? pathname.slice(SITE_BASE.length - 1) : pathname;
    // Asegura que empieza por /
    if (!path.startsWith('/')) path = '/' + path;

    let lang = 'es';
    if (path.startsWith('/en/')) {
      lang = 'en';
      path = path.replace(/^\/en\//, '/');
    } else if (path === '/en' || path === '/en/') {
      lang = 'en';
      path = '/';
    }

    // Ruta vacía → home
    let route = path.replace(/^\/+|\/+$/g, '');
    if (route === '') route = 'home';

    return { lang, route };
  }

  // Construye URL bonita a partir de {lang, route}
  function buildPrettyUrl(lang, route) {
    const base = SITE_BASE.endsWith('/') ? SITE_BASE : SITE_BASE + '/';
    const prefix = lang === 'en' ? 'en/' : '';
    const tail = route === 'home' ? '' : (route.replace(/\/+$/,'') + '/');
    return base + prefix + tail;
  }

  // Mapea rutas bonitas a partials
  function routeToPartial(route) {
    // Ajusta nombres si lo necesitas (alias)
    const map = {
      home: 'home',
      servicios: 'servicios',
      casos: 'casos',
      contribuciones: 'contribuciones',
      contacto: 'contacto'
    };
    return `partials/${(map[route] || 'home')}.html`;
  }

  // Carga un partial y actualiza idioma + metas
  async function loadPartial(route, lang, pushUrl = null) {
    const file = routeToPartial(route);

    app.classList.remove('fade-in');
    app.classList.add('fade-out');

    try {
      const res = await fetch(file, { cache: 'no-store' });
      if (!res.ok) throw new Error('404');
      const html = await res.text();

      setTimeout(() => {
        app.innerHTML = html;
        app.classList.remove('fade-out');
        app.classList.add('fade-in');

        // Aplica idioma
        updateLanguageState(lang);

        // Actualiza título y description según ruta+idioma
        updateMetaForRoute(route, lang);

        // Actualiza URL bonita con History API
        if (pushUrl) {
          history.pushState({ lang, route }, '', pushUrl);
        }
      }, 120);
    } catch (e) {
      app.innerHTML = `<section class="section-fade fade-in"><h2>Error</h2><p>No se pudo cargar la página.</p></section>`;
    }
  }

  // Muestra solo el bloque del idioma activo
  function updateLanguageState(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(el => {
      const target = lang === 'en' ? 'english' : 'spanish';
      el.classList.toggle('lang-visible', el.getAttribute('data-lang') === target);
    });

    // Inserta hreflang dinámico simple
    Array.from(document.querySelectorAll('link[rel="alternate"]')).forEach(n => n.remove());
    const lEs = document.createElement('link'); lEs.rel = 'alternate'; lEs.hreflang = 'es'; lEs.href = buildPrettyUrl('es', 'home');
    const lEn = document.createElement('link'); lEn.rel = 'alternate'; lEn.hreflang = 'en'; lEn.href = buildPrettyUrl('en', 'home');
    document.head.append(lEs, lEn);
  }

  // Títulos y descriptions por ruta/idioma
  function updateMetaForRoute(route, lang) {
    const M = {
      home: {
        es: { t: 'JJ Montalbán | Desarrollo WordPress Freelance', d: 'Desarrollo avanzado WordPress: plugins, integraciones y automatización para empresas.' },
        en: { t: 'JJ Montalbán | Freelance WordPress Developer', d: 'Advanced WordPress development: custom plugins, API integrations and automation.' }
      },
      servicios: {
        es: { t: 'Servicios WordPress | JJ Montalbán', d: 'Plugins a medida, integraciones API, WooCommerce y mantenimiento.' },
        en: { t: 'WordPress Services | JJ Montalbán', d: 'Custom plugins, API integrations, WooCommerce and maintenance.' }
      },
      casos: {
        es: { t: 'Casos de éxito | JJ Montalbán', d: 'Proyectos reales desarrollados con WordPress.' },
        en: { t: 'Success Stories | JJ Montalbán', d: 'Real projects built with WordPress.' }
      },
      contribuciones: {
        es: { t: 'Contribuciones | JJ Montalbán', d: 'Plugins y aportes al ecosistema WordPress.' },
        en: { t: 'Contributions | JJ Montalbán', d: 'Plugins and open-source contributions.' }
      },
      contacto: {
        es: { t: 'Contacto | JJ Montalbán', d: 'Cuéntame tu proyecto y te respondo con una propuesta.' },
        en: { t: 'Contact | JJ Montalbán', d: 'Tell me about your project and I’ll reply with a proposal.' }
      }
    };
    const meta = (M[route] || M.home)[lang === 'en' ? 'en' : 'es'];

    if (meta) {
      document.title = meta.t;
      let desc = document.querySelector('meta[name="description"]');
      if (!desc) {
        desc = document.createElement('meta'); desc.name = 'description'; document.head.appendChild(desc);
      }
      desc.content = meta.d;
    }
  }

  // Intercepta clics en enlaces internos (con o sin slash inicial)
  document.body.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;

    const href = a.getAttribute('href') || '';
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;

    // Normaliza a ruta relativa limpia (sin base, sin ./)
    let path = href.replace(/^\.\//, '');
    // Si empieza por /, quita base
    if (path.startsWith('/')) path = path.slice(1);
    // Asegura trailing slash
    if (path !== '' && !path.endsWith('/')) path += '/';

    // Detecta idioma en enlace
    let lang = 'es';
    if (path.startsWith('en/')) {
      lang = 'en';
      path = path.replace(/^en\//, '');
    }

    const route = path.replace(/\/+$/,'') || 'home';
    const url = buildPrettyUrl(lang, route);

    e.preventDefault();
    loadPartial(route, lang, url);
  });

  // Soporta navegación del navegador (atrás/adelante)
  window.addEventListener('popstate', () => {
    const { lang, route } = parsePath(location.pathname);
    loadPartial(route, lang, null);
  });

  // Carga inicial según URL bonita
  const initial = parsePath(location.pathname);
  // Sin empujar history en carga inicial
  loadPartial(initial.route, initial.lang, null);

  // Sincroniza el switch de idioma con la URL
  if (toggle) {
    toggle.checked = (initial.lang === 'en');
    toggle.addEventListener('change', () => {
      const lang = toggle.checked ? 'en' : 'es';
      const { route } = parsePath(location.pathname);
      const url = buildPrettyUrl(lang, route);
      loadPartial(route, lang, url);
    });
  }
});
