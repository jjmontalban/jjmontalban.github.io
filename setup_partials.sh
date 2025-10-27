#!/bin/bash
# Crea estructura SPA bilingüe con partials
# Ejecutar desde la raíz del proyecto

echo "Creando carpetas necesarias..."
mkdir -p partials

# ---------- HOME ----------
cat > partials/home.html <<'EOF'
<section class="section-fade fade-in" data-page="home">
  <div data-lang="spanish" class="lang-visible">
    <h1>Hola, soy JJ</h1>
    <h2>Desarrollo avanzado en WordPress</h2>
    <p>Plugins personalizados, integraciones y automatización para empresas que necesitan soluciones más allá de una web básica.</p>
    <a href="#/servicios" class="btn btn-primary">Ver servicios</a>
  </div>

  <div data-lang="english">
    <h1>Hello, I'm JJ</h1>
    <h2>Advanced WordPress Development</h2>
    <p>Custom plugins, integrations, and automation for businesses that need more than a basic website.</p>
    <a href="#/servicios" class="btn btn-primary">View services</a>
  </div>
</section>
EOF

# ---------- SERVICIOS ----------
cat > partials/servicios.html <<'EOF'
<section class="section-fade fade-in" data-page="servicios">
  <div data-lang="spanish" class="lang-visible">
    <h1>Servicios WordPress</h1>
    <p>Soluciones personalizadas para empresas y autónomos que necesitan más que una simple web.</p>
    <ul>
      <li>Desarrollo de plugins personalizados</li>
      <li>Integraciones con APIs externas</li>
      <li>Tiendas online con WooCommerce</li>
      <li>Mantenimiento y optimización</li>
    </ul>
  </div>

  <div data-lang="english">
    <h1>WordPress Services</h1>
    <p>Custom WordPress development for businesses and professionals who need more than a simple website.</p>
    <ul>
      <li>Custom plugin development</li>
      <li>External API integrations</li>
      <li>WooCommerce online stores</li>
      <li>Maintenance and optimization</li>
    </ul>
  </div>
</section>
EOF

# ---------- CASOS ----------
cat > partials/casos.html <<'EOF'
<section class="section-fade fade-in" data-page="casos">
  <div data-lang="spanish" class="lang-visible">
    <h1>Casos de éxito</h1>
    <p>Algunos proyectos recientes desarrollados para clientes con necesidades avanzadas en WordPress.</p>
    <ul>
      <li>CRM inmobiliario con sincronización automática (Chipicasa)</li>
      <li>Landing con checkout en 2 clics (EresAgua)</li>
      <li>Plugin de integración CF7-Mailchimp (Brunimarsa)</li>
    </ul>
  </div>

  <div data-lang="english">
    <h1>Success Stories</h1>
    <p>Some recent projects developed for clients with advanced WordPress requirements.</p>
    <ul>
      <li>Real Estate CRM with automatic sync (Chipicasa)</li>
      <li>2-click checkout landing page (EresAgua)</li>
      <li>CF7-Mailchimp integration plugin (Brunimarsa)</li>
    </ul>
  </div>
</section>
EOF

# ---------- CONTRIBUCIONES ----------
cat > partials/contribuciones.html <<'EOF'
<section class="section-fade fade-in" data-page="contribuciones">
  <div data-lang="spanish" class="lang-visible">
    <h1>Contribuciones</h1>
    <p>Proyectos open source publicados en el repositorio oficial de WordPress.</p>
    <ul>
      <li><strong>Woo Product Quantity Settings</strong> — Configura límites de cantidad en productos WooCommerce.</li>
      <li><strong>Simple EU VAT Number</strong> — Gestiona el IVA intracomunitario de forma sencilla.</li>
      <li><strong>Idealista Feed</strong> — Exporta propiedades a Idealista automáticamente.</li>
    </ul>
  </div>

  <div data-lang="english">
    <h1>Contributions</h1>
    <p>Open source projects published in the official WordPress repository.</p>
    <ul>
      <li><strong>Woo Product Quantity Settings</strong> — Set min/max quantity in WooCommerce products.</li>
      <li><strong>Simple EU VAT Number</strong> — Simplify intra-EU VAT management for WooCommerce.</li>
      <li><strong>Idealista Feed</strong> — Export properties automatically to Idealista.</li>
    </ul>
  </div>
</section>
EOF

# ---------- CONTACTO ----------
cat > partials/contacto.html <<'EOF'
<section class="section-fade fade-in" data-page="contacto">
  <div data-lang="spanish" class="lang-visible">
    <h1>Contacto</h1>
    <p>¿Quieres colaborar o necesitas una solución avanzada en WordPress?</p>
    <p>Escríbeme a <a href="mailto:jjmontalban@gmail.com">jjmontalban@gmail.com</a> o conéctate en redes sociales.</p>
  </div>

  <div data-lang="english">
    <h1>Contact</h1>
    <p>Would you like to collaborate or need an advanced WordPress solution?</p>
    <p>Email me at <a href="mailto:jjmontalban@gmail.com">jjmontalban@gmail.com</a> or connect on social media.</p>
  </div>
</section>
EOF

echo "✅ Partials creados con éxito en /partials/"
