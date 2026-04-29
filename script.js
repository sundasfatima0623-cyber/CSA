const navItems = [
  { key: 'home', href: 'index.html', label: 'Home' },
  { key: 'gift-gardens', href: 'gift-gardens.html', label: 'Gift Gardens' },
  { key: 'compassionate-women', href: 'compassionate-women.html', label: 'Compassionate Women' },
  { key: 'good-trouble', href: 'good-trouble.html', label: 'Good Trouble' },
  { key: 'purple-bench', href: 'purple-bench.html', label: 'Purple Bench' },
  { key: 'casa', href: 'casa.html', label: 'CASA' },
];

function buildHeader(activePage) {
  const navLinks = navItems
    .map(({ key, href, label }) => `<a class="nav-link ${activePage === key ? 'active' : ''}" href="${href}" ${activePage === key ? 'aria-current="page"' : ''}>${label}</a>`)
    .join('');

  return `
    <header class="site-header">
      <div class="container nav-inner">
        <a class="brand" href="index.html" aria-label="Compassionate St. Augustine home page">
          <img class="brand-mark" src="assets/logo.jpeg" alt="Compassionate St. Augustine logo showing the Bridge of Lions with birds in flight">
          <span class="brand-copy">
            <span class="brand-name">Compassionate St. Augustine</span>
            <span class="brand-tag">Advocacy, awareness, and action</span>
          </span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation menu">
          <span class="hamburger" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        <nav id="site-nav" class="nav-menu" aria-label="Primary navigation">
          ${navLinks}
          <a class="nav-link nav-link-accent" href="mailto:hello@compassionatestaugustine.org?subject=Donate%20to%20CSA">Donate</a>
        </nav>
      </div>
    </header>
  `;
}

function buildFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-copy">
          <strong>Compassionate St. Augustine</strong>
          <span>147 Martin Luther King Ave, St. Augustine, FL 32084</span>
        </div>
        <div class="footer-links" aria-label="Footer links">
          <a href="index.html">Home</a>
          <a href="events.html">Events</a>
          <a href="mailto:hello@compassionatestaugustine.org?subject=Volunteer%20with%20CSA">Volunteer</a>
        </div>
        <div class="social-links" aria-label="Social media links">
          <a class="social-link" href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Visit CSA on Facebook">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6H16.7V3.8c-.3 0-1.3-.1-2.5-.1-2.4 0-4 1.5-4 4.2V10H7.5v3h2.7v8h3.3Z" /></svg>
          </a>
          <a class="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Visit CSA on Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8a2.7 2.7 0 0 0-2.7 2.7v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.6 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.8A4.2 4.2 0 1 1 7.8 12 4.2 4.2 0 0 1 12 7.8Zm0 1.8A2.4 2.4 0 1 0 14.4 12 2.4 2.4 0 0 0 12 9.6Z" /></svg>
          </a>
        </div>
      </div>
    </footer>
  `;
}

function setupNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });
}

function setupReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('revealed'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealElements.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  const activePage = document.body.dataset.page || 'home';
  const headerTarget = document.getElementById('site-header');
  const footerTarget = document.getElementById('site-footer');
  if (headerTarget) headerTarget.innerHTML = buildHeader(activePage);
  if (footerTarget) footerTarget.innerHTML = buildFooter();
  setupNavigation();
  setupReveal();
});
