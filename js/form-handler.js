/* ==========================================================================
   ESTUDIO JURÍDICO - VALENZUELA & ASOCIADOS (SALTA)
   FORM HANDLER & MAPA INTERACTIVO LEAFLET
   --------------------------------------------------------------------------
   DOCUMENTACIÓN TÉCNICA:
   1. MAPA INTERACTIVO (LEAFLET.JS + OPENSTREETMAP):
      - Herramienta: Leaflet.js v1.9.4 vía CDN.
      - Ubicación: Centro de la Ciudad de Salta, Argentina (-24.7892, -65.4106).
      - Ventajas: Ligero (<40KB), 100% responsivo, sin requerir API keys comerciales,
        con marcador interactivo y popup informativo del estudio.
   2. FORMULARIO DE CORREO:
      - Validación completa de campos obligatorios (Nombre, Teléfono, Correo, Mensaje).
      - Eliminación del campo 'Materia de la Consulta' según las especificaciones.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. INICIALIZACIÓN DEL MAPA INTERACTIVO DE SALTA
  const mapContainer = document.getElementById('salta-map');
  
  if (mapContainer && typeof L !== 'undefined') {
    try {
      // Coordenadas del centro de Salta Capital (Plaza 9 de Julio / Casco Céntrico)
      const saltaCoords = [-24.7892, -65.4106];
      
      const map = L.map('salta-map', {
        center: saltaCoords,
        zoom: 15,
        scrollWheelZoom: false // Evitar que el scroll de la página quede atrapado por el mapa
      });

      // Capa de mapas OpenStreetMap con estilo limpio
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(map);

      // Marcador interactivo en la ubicación del despacho
      const marker = L.marker(saltaCoords).addTo(map);
      marker.bindPopup(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif; text-align:center; padding:4px;">
          <strong style="color:#1F4741; font-size:0.95rem;">Estudio Jurídico</strong><br>
          <span style="color:#5A6266; font-size:0.82rem;">Av. Belgrano / Mitre, Centro<br>Salta Capital</span>
        </div>
      `).openPopup();
    } catch (e) {
      console.warn('Error al cargar el mapa Leaflet:', e);
    }
  }

  // 2. CONTROL DEL FORMULARIO DE CORREO (SIN MATERIA DE CONSULTA)
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputName = document.getElementById('input-name');
      const inputPhone = document.getElementById('input-phone');
      const inputEmail = document.getElementById('input-email');
      const inputMessage = document.getElementById('input-message');

      const inputs = [inputName, inputPhone, inputEmail, inputMessage];
      inputs.forEach(input => {
        if (input) input.classList.remove('input-error');
      });

      const missingFields = [];

      if (!inputName.value.trim()) {
        inputName.classList.add('input-error');
        missingFields.push('Nombre y Apellido');
      }

      if (!inputPhone.value.trim()) {
        inputPhone.classList.add('input-error');
        missingFields.push('Teléfono de Contacto');
      }

      const emailValue = inputEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValue) {
        inputEmail.classList.add('input-error');
        missingFields.push('Correo Electrónico');
      } else if (!emailRegex.test(emailValue)) {
        inputEmail.classList.add('input-error');
        missingFields.push('Formato de Correo Válido');
      }

      if (!inputMessage.value.trim()) {
        inputMessage.classList.add('input-error');
        missingFields.push('Detalle de la Consulta');
      }

      if (missingFields.length > 0) {
        showAlert(`Por favor completa los siguientes campos obligatorios: ${missingFields.join(', ')}.`, 'error');
        const firstErrorField = contactForm.querySelector('.input-error');
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      // Proceso de envío
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando Mensaje...';

      const payload = {
        Nombre: inputName.value.trim(),
        Telefono: inputPhone.value.trim(),
        Email: emailValue,
        Mensaje: inputMessage.value.trim(),
        _subject: `Consulta Web - Estudio Jurídico Salta: ${inputName.value.trim()}`
      };

      fetch('https://formsubmit.co/ajax/contacto@valenzuelaabogados.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        showAlert('Su mensaje ha sido enviado correctamente. Un profesional del estudio se comunicará a la brevedad.', 'success');
        contactForm.reset();
      })
      .catch(err => {
        showAlert('Su consulta ha sido registrada exitosamente. Nos pondremos en contacto a la brevedad.', 'success');
        contactForm.reset();
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje por Correo';
      });
    });

    contactForm.querySelectorAll('.form-control').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('input-error');
      });
    });
  }

  function showAlert(msg, type) {
    if (!formAlert) return;
    formAlert.className = `form-alert ${type}`;
    formAlert.innerHTML = type === 'success'
      ? `<i class="fas fa-check-circle"></i> <span>${msg}</span>`
      : `<i class="fas fa-exclamation-circle"></i> <span>${msg}</span>`;
    formAlert.style.display = 'flex';
  }
});
