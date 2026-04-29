/* ============================================================
   Compassionate St. Augustine — Main Script
   ============================================================ */

(function () {
  'use strict';

  /* ── Mobile navigation toggle ── */
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav when a link is tapped (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Keyboard escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  /* ── Active nav link highlighting ── */
  (function highlightNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  })();

  /* ── Scroll fade-in (Intersection Observer) ── */
  (function initFadeIn() {
    const targets = document.querySelectorAll('.fade-in');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
  })();

  /* ── Smooth nav background on scroll ── */
  (function navScroll() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    const updateNav = () => {
      if (window.scrollY > 60) {
        nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.35)';
      } else {
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.25)';
      }
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  })();

  /* ── "Add to Calendar" helper for events page ── */
  document.querySelectorAll('.btn-add-cal').forEach(btn => {
    btn.addEventListener('click', () => {
      const title   = encodeURIComponent(btn.dataset.title   || 'CSA Event');
      const start   = btn.dataset.start  || '';
      const end     = btn.dataset.end    || '';
      const loc     = encodeURIComponent(btn.dataset.loc     || 'St. Augustine, FL');
      const details = encodeURIComponent(btn.dataset.details || 'Compassionate St. Augustine event');
      const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${loc}&details=${details}&sf=true&output=xml`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

})();
