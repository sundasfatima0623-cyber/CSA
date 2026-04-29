/* Compassionate St. Augustine — site behavior
   - Mobile nav toggle
   - Scroll fade-in animations
*/

(function () {
  // ---------- Mobile nav ----------
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.site-nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // close mobile menu when a link is tapped
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (links.classList.contains('is-open')) {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ---------- Fade-in on scroll ----------
  const targets = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && targets.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach((t) => t.classList.add('is-visible'));
  }
})();
