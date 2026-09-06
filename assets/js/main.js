(function () {
  // Motas de fondo - mismo patron que AmsetParticles.jsx (posiciones random,
  // solo se generan en cliente para no chocar con nada renderizado en servidor
  // aqui no aplica al ser HTML estatico, pero se mantiene la logica identica).
  const field = document.querySelector('[data-amset-particles]');
  if (field) {
    const count = 24;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      const big = i % 5 === 0;
      dot.className = 'particle';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 100 + '%';
      dot.style.width = (big ? 3 : 1.5) + 'px';
      dot.style.height = (big ? 3 : 1.5) + 'px';
      dot.style.opacity = big ? 0.35 : 0.2;
      dot.style.boxShadow = big ? '0 0 6px rgba(0,212,255,0.6)' : 'none';
      dot.style.animationDelay = Math.random() * 6 + 's';
      dot.style.animationDuration = 5 + Math.random() * 5 + 's';
      field.appendChild(dot);
    }
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // Menu movil
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelector('[data-nav-links]');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
    });
  }

  // Ano dinamico del footer
  document.querySelectorAll('[data-amset-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Reloj en vivo de la barra de estado - localizado segun el idioma de la pagina
  const clockEl = document.querySelector('[data-amset-clock]');
  if (clockEl) {
    const locale = document.documentElement.lang === 'en' ? 'en-GB' : 'es-ES';
    const fmt = new Intl.DateTimeFormat(locale, {
      timeZone: 'Europe/Madrid',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
    const tick = () => { clockEl.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 30000);
  }
})();
