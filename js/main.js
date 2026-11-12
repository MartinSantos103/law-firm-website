/* ==========================================================================
   DR. ALEJANDRO VALENZUELA - ABOGADO
   MAIN JS - NAVBAR INTELIGENTE, SCROLL REVEAL & MICRO-INTERACCIONES
   --------------------------------------------------------------------------
   DOCUMENTACIÓN TÉCNICA:
   - IntersectionObserver para Scroll Reveal suave y escalonado sin ralentizar el DOM.
   - Smart Navbar con control de delta para evitar parpadeos en bordes de scroll.
   - Tooltip dinámico de WhatsApp que aparece suavemente para invitar a la acción.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. SMART NAVBAR (OCULTAR AL BAJAR / MOSTRAR AL SUBIR)
  const header = document.getElementById('main-header');
  let lastScrollTop = 0;
  const delta = 8;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll < 0) return;
    if (Math.abs(lastScrollTop - currentScroll) <= delta) return;

    if (currentScroll > lastScrollTop && currentScroll > 90) {
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }

    lastScrollTop = currentScroll;
  }, { passive: true });

  // 2. SCROLL REVEAL CON INTERSECTION OBSERVER
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Dejar de observar una vez animado
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback para navegadores antiguos
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 3. MENÚ HAMBURGUESA RESPONSIVE
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // 4. SCROLLSPY (INDICADOR DE SECCIÓN ACTIVA)
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollPosition = window.scrollY + 130;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 5. TOOLTIP DINÁMICO DE WHATSAPP CON AUTO-DESVANECIMIENTO SUAVE
  const waTooltip = document.getElementById('wa-tooltip');

  if (waTooltip) {
    let tooltipShown = false;
    let dismissTimer = null;
    const DISPLAY_DURATION = 5500; // 5.5 segundos de permanencia fijada antes de desaparecer

    function hideTooltip() {
      waTooltip.classList.add('hidden');
    }

    function startDismissTimer() {
      clearTimeout(dismissTimer);
      dismissTimer = setTimeout(hideTooltip, DISPLAY_DURATION);
    }

    function triggerTooltip() {
      if (!tooltipShown) {
        tooltipShown = true;
        waTooltip.classList.remove('hidden');
        startDismissTimer();
      }
    }

    // Mostrar tooltip tras 3 segundos o al hacer scroll de 400px
    setTimeout(triggerTooltip, 3000);
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) triggerTooltip();
    }, { passive: true, once: true });

    // Pausar temporizador si el usuario sitúa el mouse sobre el aviso para leerlo
    waTooltip.addEventListener('mouseenter', () => {
      clearTimeout(dismissTimer);
    });

    waTooltip.addEventListener('mouseleave', () => {
      if (!waTooltip.classList.contains('hidden')) {
        startDismissTimer();
      }
    });

    // Clic en el propio tooltip para abrir la conversación de WhatsApp
    waTooltip.style.cursor = 'pointer';
    waTooltip.addEventListener('click', () => {
      window.open('https://wa.me/5493874005555?text=Hola,%20deseo%20realizar%20una%20consulta%20legal%20con%20el%20Estudio%20Jur%C3%ADdico.', '_blank');
    });
  }

  // 6. PREGUNTAS FRECUENTES (ACORDEÓN)
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const headerBtn = item.querySelector('.accordion-header');

    if (headerBtn) {
      headerBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        accordionItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.accordion-header');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          headerBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 7. CONTROL DE MODAL DE DETALLES
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  window.openModal = function(title, contentHtml) {
    if (modalOverlay && modalTitle && modalBody) {
      modalTitle.innerText = title;
      modalBody.innerHTML = contentHtml;
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
});
