/* ==========================================================================
   ESTUDIO JURÍDICO - VALENZUELA & ASOCIADOS (SALTA)
   PRACTICE FILTER & SLIDING PANEL JS
   --------------------------------------------------------------------------
   DOCUMENTACIÓN TÉCNICA:
   - Panel deslizable con botón selector dinámico que actualiza su etiqueta con 
     el nombre de la búsqueda activa.
   - Modales informativos de alta resolución para cada especialidad legal.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('practice-search-toggle-btn');
  const drawerPanel = document.getElementById('practice-drawer-panel');
  const currentFilterLabel = document.getElementById('current-filter-label');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const practiceCards = document.querySelectorAll('.practice-card');

  // 1. ABRIR / CERRAR PANEL DESLIZABLE DE ÁREAS
  if (toggleBtn && drawerPanel) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawerPanel.classList.toggle('open');
      toggleBtn.classList.toggle('panel-open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. FILTRADO Y ACTUALIZACIÓN DEL BOTÓN DE BÚSQUEDA
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      const filterName = btn.innerText.trim();

      // Actualizar el texto del botón selector con la búsqueda activa
      if (currentFilterLabel) {
        currentFilterLabel.innerText = filterValue === 'all' 
          ? 'Todas las Áreas' 
          : filterName;
      }

      // Cerrar suavemente el panel deslizable al elegir una opción en móvil/desktop
      if (drawerPanel && toggleBtn) {
        drawerPanel.classList.remove('open');
        toggleBtn.classList.remove('panel-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }

      // Filtrar las tarjetas de práctica con animación
      practiceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 3. BASE DE DATOS DE DETALLES DE ÁREAS DE PRÁCTICA (MODALES)
  const practiceDetails = {
    penal: {
      title: "Derecho Penal & Defensas Técnicas",
      content: `
        <p>Defensa penal estratégica e inmediata en la Provincia de Salta. Asistencia integral en audiencias, querellas particulares y recursos de impugnación.</p>
        <h4 style="color:var(--accent-primary); margin:1rem 0 0.5rem 0;">Actuaciones Comprendidas:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>Asistencia urgente en detenciones, allanamientos e indagatorias.</li>
          <li>Defensa penal en juicios orales y recursos de casación.</li>
          <li>Constitución como Querellante Particular en representación de víctimas.</li>
          <li>Excarcelaciones, eximición de prisión y hábeas corpus.</li>
        </ul>
        <div style="margin-top:1.5rem; text-align:right;">
          <a href="#contacto" onclick="closeModal()" class="btn btn-primary">Coordinar Asesoramiento</a>
        </div>
      `
    },
    civil: {
      title: "Derecho Civil & Comercial",
      content: `
        <p>Patrocinio y asesoramiento en conflictos patrimoniales, obligaciones, redacción contractual y litigios en fueros ordinarios.</p>
        <h4 style="color:var(--accent-primary); margin:1rem 0 0.5rem 0;">Actuaciones Comprendidas:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>Juicios por daños y perjuicios e incumplimientos de contrato.</li>
          <li>Cobro de pesos, ejecuciones de pagarés y títulos de crédito.</li>
          <li>Acciones reales, prescripción adquisitiva y desalojos.</li>
          <li>Auditoría y redacción de contratos civiles y de alquiler.</li>
        </ul>
        <div style="margin-top:1.5rem; text-align:right;">
          <a href="#contacto" onclick="closeModal()" class="btn btn-primary">Coordinar Asesoramiento</a>
        </div>
      `
    },
    familia: {
      title: "Derecho de Familia & Sucesiones",
      content: `
        <p>Acompañamiento legal humano y riguroso en procesos sucesorios, acuerdos patrimoniales y mediaciones familiares.</p>
        <h4 style="color:var(--accent-primary); margin:1rem 0 0.5rem 0;">Actuaciones Comprendidas:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>Juicios sucesorios, declaratoria de herederos y partición de bienes.</li>
          <li>Divorcios, convenios reguladores y liquidación conyugal.</li>
          <li>Fijación y reclamos de cuota alimentaria y régimen de comunicación.</li>
          <li>Homologaciones judiciales de acuerdos parentales.</li>
        </ul>
        <div style="margin-top:1.5rem; text-align:right;">
          <a href="#contacto" onclick="closeModal()" class="btn btn-primary">Coordinar Asesoramiento</a>
        </div>
      `
    },
    laboral: {
      title: "Derecho Laboral",
      content: `
        <p>Representación técnica en reclamos por despidos, indemnizaciones laborales, accidentes de trabajo y mediaciones administrativas.</p>
        <h4 style="color:var(--accent-primary); margin:1rem 0 0.5rem 0;">Actuaciones Comprendidas:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>Reclamos por despidos incausados, no registrados o diferencias salariales.</li>
          <li>Reclamación ante aseguradoras de riesgos del trabajo (ART).</li>
          <li>Conciliaciones laborales y convenios de desvinculación.</li>
        </ul>
        <div style="margin-top:1.5rem; text-align:right;">
          <a href="#contacto" onclick="closeModal()" class="btn btn-primary">Coordinar Asesoramiento</a>
        </div>
      `
    },
    corporativo: {
      title: "Derecho Corporativo & PyMEs",
      content: `
        <p>Asesoramiento jurídico integral para empresas, estructuración societaria, contratos mercantiles y prevención de contingencias legales.</p>
        <h4 style="color:var(--accent-primary); margin:1rem 0 0.5rem 0;">Actuaciones Comprendidas:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>Constitución, modificación e inscripción de sociedades.</li>
          <li>Pactos de socios, gobernanza y acuerdos comerciales.</li>
          <li>Auditoría legal preventiva y cobranzas corporativas.</li>
        </ul>
        <div style="margin-top:1.5rem; text-align:right;">
          <a href="#contacto" onclick="closeModal()" class="btn btn-primary">Coordinar Asesoramiento</a>
        </div>
      `
    }
  };

  document.querySelectorAll('.practice-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const key = link.getAttribute('data-practice');
      if (practiceDetails[key]) {
        window.openModal(practiceDetails[key].title, practiceDetails[key].content);
      }
    });
  });
});
