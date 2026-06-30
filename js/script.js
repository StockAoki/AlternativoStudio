// Nav background on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

function toggleMenu(open) {
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  mobileNav.classList.toggle('open', open);
  mobileNav.setAttribute('aria-hidden', !open);
  nav.classList.toggle('menu-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => {
  toggleMenu(!hamburger.classList.contains('open'));
});

mobileNav.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => toggleMenu(false));
});

// Scroll spy — resalta link activo en nav
const navLinks = document.querySelectorAll('.nav-links a.link');
const spySections = document.querySelectorAll('section[id]');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${e.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

spySections.forEach((s) => spyObserver.observe(s));

// Reveal observer
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('[data-reveal], .lines, [data-step]').forEach((el) => io.observe(el));

// Hero entrance on load (not scroll-dependent)
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero [data-reveal], .hero .lines').forEach((el) => el.classList.add('in'));
  });
});
