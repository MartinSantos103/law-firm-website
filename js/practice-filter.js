/* ==========================================================================
   DR. ALEJANDRO VALENZUELA - ABOGADO
   PRACTICE FILTER & MODAL DETAILS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const practiceCards = document.querySelectorAll('.practice-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      practiceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  const practiceDetails = {
    civil: {
      title: "Derecho Civil & Comercial",
      content: `
        <p>Patrocinio jurídico integral en litigios civiles, contratación patrimonial y resolución de disputas comerciales.</p>
        <h4 style="color:var(--accent-primary); margin:1rem 0 0.5rem 0;">Servicios Comprendidos:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>Redacción y análisis de contratos comerciales y civiles.</li>
          <li>Juicios por daños y perjuicios e incumplimiento contractual.</li>
          <li>Acciones de cobro ejecutivo y ejecuciones bancarias.</li>
          <li>Desalojos y derechos reales sobre inmuebles.</li>
        </ul>
        <div style="margin-top:1.5rem; text-align:right;">
          <a href="#contacto" onclick="closeModal()" class="btn btn-primary">Solicitar Asesoramiento</a>
        </div>
      `
    },
    corporativo: {
      title: "Derecho Corporativo & Empresa",
      content: `
        <p>Asesoramiento jurídico preventivo y estratégico a particulares y pequeñas/medianas empresas.</p>
        <h4 style="color:var(--accent-primary); margin:1rem 0 0.5rem 0;">Servicios Comprendidos:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>Constitución e inscripción de sociedades (SA, SRL, SAS).</li>
          <li>Pactos entre socios y acuerdos comerciales.</li>
          <li>Auditoría de contratos y cumplimiento regulatorio.</li>
          <li>Reestructuración de pasivos y mediaciones empresariales.</li>
        </ul>
        <div style="margin-top:1.5rem; text-align:right;">
          <a href="#contacto" onclick="closeModal()" class="btn btn-primary">Solicitar Asesoramiento</a>
        </div>
      `
    },
    laboral: {
      title: "Derecho Laboral",
      content: `
        <p>Defensa técnica de derechos laborales en situaciones de despido, acuerdos o reclamos.</p>
        <h4 style="color:var(--accent-primary); margin:1rem 0 0.5rem 0;">Servicios Comprendidos:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>Indemnizaciones por despido incausado o no registrado.</li>
          <li>Accidentes de trabajo y enfermedades profesionales (ART).</li>
          <li>Conciliaciones y mediaciones laborales.</li>
        </ul>
        <div style="margin-top:1.5rem; text-align:right;">
          <a href="#contacto" onclick="closeModal()" class="btn btn-primary">Solicitar Asesoramiento</a>
        </div>
      `
    },
    penal: {
      title: "Derecho Penal & Defensas",
      content: `
        <p>Asistencia legal técnica y defensas en causas penales con estricto secreto profesional.</p>
        <h4 style="color:var(--accent-primary); margin:1rem 0 0.5rem 0;">Servicios Comprendidos:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>Asistencia y representación en fuero penal.</li>
          <li>Constitución como Querellante Particular.</li>
          <li>Recursos de apelación y eximición de prisión.</li>
        </ul>
        <div style="margin-top:1.5rem; text-align:right;">
          <a href="#contacto" onclick="closeModal()" class="btn btn-primary">Solicitar Asesoramiento</a>
        </div>
      `
    },
    familia: {
      title: "Familia & Sucesiones",
      content: `
        <p>Abordaje ético y profesional en juicios sucesorios y cuestiones de derecho de familia.</p>
        <h4 style="color:var(--accent-primary); margin:1rem 0 0.5rem 0;">Servicios Comprendidos:</h4>
        <ul style="padding-left:1.2rem; color:var(--text-muted); line-height:1.7;">
          <li>Tramitación de juicios sucesorios y división de herencias.</li>
          <li>Divorcios, cuota alimentaria y convenios reguladores.</li>
          <li>Liquidación de sociedad conyugal.</li>
        </ul>
        <div style="margin-top:1.5rem; text-align:right;">
          <a href="#contacto" onclick="closeModal()" class="btn btn-primary">Solicitar Asesoramiento</a>
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
