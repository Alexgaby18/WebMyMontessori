/**
 * MI MONTESSORI - PRIVACY POLICY SCRIPTS
 * Control de scroll-spy, filtrado en vivo de artículos, atajo de impresión y botón de volver arriba.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Botón flotante "Volver Arriba"
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Scroll Spy para el Índice de Contenidos (TOC)
  const tocLinks = document.querySelectorAll('.toc-link');
  const articles = document.querySelectorAll('.privacy-article');

  if (tocLinks.length > 0 && articles.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    articles.forEach(article => observer.observe(article));
  }

  // 4. Filtrado en vivo de artículos en el buscador
  const searchInput = document.getElementById('privacy-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();

      articles.forEach(article => {
        const title = article.querySelector('.article-title')?.textContent.toLowerCase() || '';
        const body = article.querySelector('.article-body')?.textContent.toLowerCase() || '';
        const id = article.getAttribute('id');
        const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);

        if (title.includes(term) || body.includes(term)) {
          article.style.display = 'block';
          if (tocLink) tocLink.style.display = 'flex';
        } else {
          article.style.display = 'none';
          if (tocLink) tocLink.style.display = 'none';
        }
      });
    });
  }

  // 5. Copiar correo al portapapeles
  const copyEmailBtns = document.querySelectorAll('.js-copy-email');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.dataset.email || 'alex1819.dev@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>¡Correo copiado! ✓</span>';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2200);
      }).catch(err => {
        console.error('Error al copiar:', err);
        window.location.href = `mailto:${email}`;
      });
    });
  });
});
